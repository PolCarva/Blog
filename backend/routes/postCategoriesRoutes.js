import express from "express";
const router = express.Router();

import {
  createPostCategory,
  deletePostCategory,
  getAllPostCategories,
  updatePostCategory,
  getSingleCategory,
  getPopularCategories,
} from "../controllers/postCategoriesControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";

router
  .route("/")
  .post(authGuard, adminGuard, createPostCategory)
  .get(getAllPostCategories);

router.route("/popular").get(getPopularCategories);

router
  .route("/:postCategoryId")
  .get(getSingleCategory)
  .put(authGuard, adminGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory);

export default router;
