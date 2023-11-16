const LOCAL_URL = "http://localhost:5000/";
const SOCIALMULTIMEDIA_URL = "https://blog-production-8da6.up.railway.app/";

const isProduction = process.env.NODE_ENV === "production";

const BASE_URL = isProduction ? SOCIALMULTIMEDIA_URL : LOCAL_URL;

const UPLOAD_FOLDER_BASE_URL = `${BASE_URL}uploads/`;

const stables = {
  UPLOAD_FOLDER_BASE_URL,
  BASE_URL,
};

export default stables;
