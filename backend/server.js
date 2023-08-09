import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import {
  errorResponserHandler,
  invalidRouteHandler,
} from "./middleware/errorHandler";
import cors from "cors"; // Importa el paquete cors
import path from "path";

// Routes
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

const corsOptions = {
  exposedHeaders: [
    "x-totalpagecount",
    "x-filter",
    "x-totalcount",
    "x-currentpage",
    "x-pagesize",
  ],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidRouteHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
