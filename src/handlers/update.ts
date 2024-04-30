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
      id: req.body.productId,
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

// Update an update
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      id: req.body.productId,
    },
    include: {
      updates: true,
    },
  });

  // Flatten the updates array
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  // Find the update
  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.status(404).json({ error: "Update not found" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

// Delete an update
export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      id: req.body.productId,
    },
    include: {
      updates: true,
    },
  });

  // Flatten the updates array
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  // Find the update
  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.status(404).json({ error: "Update not found" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
