import axios from "axios";

const baseURL = "http://localhost:5000";

const api = axios.create({
  baseURL,
});

export const getAllPosts = async () => {
  try {
    const { data } = await api.get("/api/posts");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await api.get(`/api/posts/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
