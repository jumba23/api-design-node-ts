import prisma from "../db";

export const getOneUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.params.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  res.json({ data: updates });
};
export const getUpdates = async (req, res) => {
  const updates = await prisma.update.findMany();

  res.json({ data: updates });
};
export const updateUpdate = async (req, res) => {};
export const deleteUpdate = async (req, res) => {};
