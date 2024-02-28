import express from "express";
const router = express.Router();

import {
  getPopularTags,
} from "../controllers/postTagsControllers";

router.route("/popular").get(getPopularTags);

export default router;
