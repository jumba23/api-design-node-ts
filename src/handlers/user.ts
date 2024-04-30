import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
\

// Create a new user
export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

// Sign in a user
export const signin = async (req, res) => {
  // Find the user
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  // If the user exists, compare the password
  const isValid = await comparePasswords(req.body.password, user.password);

  // If the user does not exist, return 401
  if (!isValid) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
