import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// This function will compare the password with the hash
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// This function will hash the password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 5);
};

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

  // try-catch will catch the error if the token is invalid and NOT break the server
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
