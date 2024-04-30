import prisma from "../db";

// Get all updates
export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

// Get one update
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.params.id,
    },
    include: {
      updates: true,
    },
  });

  // Flatten the updates array
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  res.json({ data: updates });
};

// Create a new update
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.id,
    },
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {};
export const deleteUpdate = async (req, res) => {};
