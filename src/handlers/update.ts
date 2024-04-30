import prisma from "../db";

// Get all updates
export const getOneUpdate = async (req, res) => {
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

// Get one update
export const getUpdates = async (req, res) => {
  const updates = await prisma.update.findMany();

  res.json({ data: updates });
};

// Create a new update
export const updateUpdate = async (req, res) => {
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

export const deleteUpdate = async (req, res) => {};
