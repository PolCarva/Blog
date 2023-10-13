const LOCAL_URL = "http://localhost:5000/";
const SOCIALMULTIMEDIA_URL = "https://msm-api.vercel.app/";

const isProduction = process.env.NODE_ENV === "production";

const BASE_URL = isProduction ? SOCIALMULTIMEDIA_URL : LOCAL_URL;

const UPLOAD_FOLDER_BASE_URL = `${BASE_URL}uploads/`;

const stables = {
  UPLOAD_FOLDER_BASE_URL,
  BASE_URL,
};

export default stables;
