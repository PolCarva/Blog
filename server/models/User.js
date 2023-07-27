import mongoose from "mongoose";

const UseSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 3, max: 20 },
    lastName: { type: String, required: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String, required: true, min: 5 },
    picture: { type: String, default: "" },
    friends: { type: Array, default: [] },
    location: String,
    occupation: String,
    viewdProfileNumber: Number,
    impressions: Number,
  },

  { timestamps: true }
);

const User = mongoose.model("User", UseSchema);
export default User;
