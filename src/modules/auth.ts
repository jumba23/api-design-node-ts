import jwt from "jsonwebtoken";

export const createJWT = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).json({ message: "not valid token" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "not valid token" });
    return;
  }
};
