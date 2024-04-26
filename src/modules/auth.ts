import jwt from "jsonwebtoken";

export const createJWT = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return token;
};

export const protect = (req, res) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
