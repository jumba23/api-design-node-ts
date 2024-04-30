import prisma from "../db";

// Get all products
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

// Get one product
export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id,
      belongsTo: req.user.id,
    },
  });

  res.json({ data: product });
};

// Create a new product
export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product });
};

// Update a product
export const updateProduct = async (req, res) => {
  const update = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: update });
};
