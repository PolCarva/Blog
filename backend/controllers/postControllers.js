import { uploadPicture } from "../middleware/uploadPicturMiddleware";
import Post from "../models/Post";
import { fileRemover } from "../utils/fileRemover";
import { v4 as uuidv4 } from "uuid";
import Comment from "../models/Comment";
import PostCategories from "../models/PostCategories";

const createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: "Sample Title",
      caption: "Sample Caption",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
      url: req.body.url || "",
    });

    const createdPost = await post.save();
    res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post not found");
      next(error);
      return;
    }

    const upload = uploadPicture.single("postPicture");

    const handleUploadPostData = async (data) => {
      const { title, caption, slug, body, tags, categories, url } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;
      post.url = url || post.url;
      post.isNew = false;

      const updatedPost = await post.save();
      return res.json(updatedPost);
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred when uploading " + err.message
        );
        next(error);
      } else {
        // Everything went fine
        if (req.file) {
          let filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
          await handleUploadPostData(req.body.document);
        } else {
          let filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = "";
          await handleUploadPostData(req.body.document);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post not found");
      return next(error);
    }

    fileRemover(post.photo);

    await Comment.deleteMany({ post: post._id });

    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "categories",
        select: ["title"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"],
              },
            ],
          },
        ],
      },
    ]);
    if (!post) {
      const error = new Error("Post not found");
      return next(error);
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    const userId = req.query.userId;
    const categoryTitle = req.query.category;

    let where = {};

    if (userId) {
      where.user = userId;
    }

    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }

    if (categoryTitle) { // Cambiar el nombre a categoryTitle
      // Buscar la categoría por título
      const category = await PostCategories.findOne({ title: categoryTitle });
      if (category) {
        where.categories = category._id; // Usar el _id de la categoría encontrada
      } else {
        // Si no se encuentra la categoría, devolver un array vacío de resultados
        return res.json([]);
      }
    }


    let query = Post.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Post.find(where).countDocuments();
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
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },
        {
          path: "categories",
          select: ["title"],
        },
      ])
      .sort({ updatedAt: "desc" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export { createPost, updatePost, deletePost, getPost, getAllPosts };
