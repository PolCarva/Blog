import axios from "axios";

import { stable } from "../../constants";

const baseURL = stable.BASE_URL;

const api = axios.create({
  baseURL,
});

export const getPopularTags = async () => {
    try {
      const { data } = await api.get(`/api/post-tags/popular`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  }