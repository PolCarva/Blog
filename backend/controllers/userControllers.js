import { uploadPicture } from "../middleware/uploadPicturMiddleware";
import User from "../models/User";
import { fileRemover } from "../utils/fileRemover";
import Comment from "../models/Comment";
import Post from "../models/Post";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      op: user.op,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email not found");
    }

    // Check if password is correct
    if (await user.comparePassword(password)) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        op: user.op,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);

    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        op: user.op,
      });
    } else {
      let error = new Error("User not found");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userToUpdate = req.params.userId;
    let userId = req.user._id;

    if (!req.user.admin && userId === userToUpdate) {
      let error = new Error("You are not authorized to update this user");
      error.statusCode = 403;
      throw error;
    }

    let user = await User.findById(userToUpdate);

    //Si el usuario no existe
    if (!user) {
      let error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (req.body.admin !== undefined || req.body.op !== undefined || req.body.verified !== undefined) {
      //Si se intenta actualizar un op
      if (user.op) {
        let error = new Error("You can't update an OP user");
        error.statusCode = 403;
        throw error;
      }

      //Si un admin (no op) intenta actualizar otro admin
      if (!req.user.op && req.user.admin && user.admin) {
        let error = new Error("You can't update another admin user");
        error.statusCode = 403;
        throw error;
      }
    }

    if (typeof req.body.admin !== "undefined" && req.user.admin) {
      user.admin = req.body.admin;
      if (req.body.admin === true && !user.verified) {
        user.verified = true;
      }
    }

    if (typeof req.body.verified !== 'undefined') {
      user.verified = req.body.verified;
  }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    } else if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUserProfile = await user.save();

    res.json({
      _id: user._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      op: updatedUserProfile.op,
      token: await updatedUserProfile.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred when uploading " + err.message
        );
        next(error);
      } else {
        // Everything went fine
        if (req.file) {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          if (filename) {
            fileRemover(filename);
          }
          updatedUser.avatar = req.file.filename;
          await updatedUser.save();
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            op: updatedUser.op,
            token: await updatedUser.generateJWT(),
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          fileRemover(filename);
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            op: updatedUser.op,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    const userId = req.query.userId;

    let where = {};

    if (userId) {
      where.user = userId;
    }

    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }

    let query = User.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await User.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .sort({ updatedAt: "desc" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error("User not found");
    }

    const postsToDelete = await Post.find({ user: user._id });
    const postIdsToDelete = postsToDelete.map(post => post._id);

    await Comment.deleteMany({ post: { $in: postIdsToDelete } });

    await Post.deleteMany({ _id: { $in: postIdsToDelete } });

    postsToDelete.forEach(post => {
      fileRemover(post.photo);
    });

    await user.remove();

    fileRemover(user.avatar);

    res.status(204).json({ message: "User removed" });
  }
  catch (error) {
    next(error);
  }
}

export {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
  getAllUsers,
  deleteUser,
};
