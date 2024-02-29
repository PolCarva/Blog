import express from "express";
const router = express.Router();
import {
  sendAdminRequestEmail
} from "../controllers/mailControllers";

router.post("/admin-request", sendAdminRequestEmail);


export default router;
