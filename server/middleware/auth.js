import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers("Authorization");

    if (!token) {
      return res.status(403).json({ message: "You are not authorized." });
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ message: "Token verification failed." });
    }
    req.user = verified.id;
    next();

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
