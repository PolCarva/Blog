import Post from "../models/Post";
import PostCategories from "../models/PostCategories";

const createPostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    const postCategory = await PostCategories.findOne({ title });

    if (postCategory) {
      const error = new Error("This category already exists");
      return next(error);
    }

    const newPostCategory = new PostCategories({ title });

    const savedPostCategory = await newPostCategory.save();

    return res.status(201).json(savedPostCategory);
  } catch (error) {
    next(error);
  }
};

const getSingleCategory = async (req, res, next) => {
  try {
    const postCategory = await PostCategories.findById(
      req.params.postCategoryId
    );

    if (!postCategory) {
      const error = new Error("Category not found");
      return next(error);
    }

    return res.json(postCategory);
  } catch (error) {
    next(error);
  }
};

const getAllPostCategories = async (req, res, next) => {
  try {
    const filter = req.query.search;
    const userId = req.query.userId;

    let where = {};

    if (userId) {
      where.user = userId;
    }

    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }

    let query = PostCategories.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await PostCategories.find(where).countDocuments();
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
};

const updatePostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    const postCategory = await PostCategories.findByIdAndUpdate(
      req.params.postCategoryId,
      { title: title },
      { new: true }
    );

    if (!postCategory) {
      const error = new Error("This category does not exist");
      return next(error);
    }

    return res.json(postCategory);
  } catch (error) {
    next(error);
  }
};

const deletePostCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.postCategoryId;

    await Post.updateMany(
      { categories: { $in: [categoryId] } },
      { $pull: { categories: categoryId } }
    );

    await PostCategories.deleteOne({ _id: categoryId });

    res.send({
      message: "Post category deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

const getPopularCategories = async (req, res, next) => {
  try {
    const categories = await PostCategories.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "categories",
          as: "posts",
        },
      },
      {
        $project: {
          title: 1,
          count: { $size: "$posts" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    return res.json(categories);
  } catch (error) {
    next(error);
  }
}

export {
  createPostCategory,
  getAllPostCategories,
  updatePostCategory,
  deletePostCategory,
  getSingleCategory,
  getPopularCategories,
};
