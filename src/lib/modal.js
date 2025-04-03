import prisma from "../../server.js";

export const getAlldata = async (namaTabel) => {
  const data = await prisma[namaTabel].findMany();
  return data;
};

export const getDataById = async (namaTabel, dataId) => {
  const data = await prisma[namaTabel].findUnique({
    where: dataId,
  });

  if (!data) {
    throw new Error("Data tidak di temukan");
  }

  return data;
};

export const createData = async (namaTabel, newData) => {
  const data = await prisma[namaTabel].create({
    data: newData,
  });
  return data;
};

export const updateData = async (namaTabel, dataId, newData) => {
  await getDataById(namaTabel, dataId);
  const data = await prisma[namaTabel].update({
    where: dataId,
    data: newData,
  });
  return data;
};

export const deleteData = async (namaTabel, dataId) => {
  await getDataById(namaTabel, dataId);
  const data = await prisma[namaTabel].delete({
    where: dataId,
  });
  return data;
};
