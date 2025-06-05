import { Context } from "hono";
import { PrismaClient } from "../../../../generated/prisma";

/**
 * ! Ideas
 * Controller for searching
 * 
 * 
 */

// This will have filters and pagination
export const getAllPages = async (c: Context) => {
  const prisma = new PrismaClient();
  const allPages = await prisma.page.findMany();
  prisma.$disconnect();
  return c.json(allPages);
};

// This is the only one that does not need auth
export const getPageById = (c: Context) => {

};

export const createPage = async (c: Context) => {
  const prisma = new PrismaClient();
  console.log("hej");
  const page = await prisma.page.create({
    data: {
      path: '/svejsan'
    }
  });
  prisma.$disconnect();

  return c.json(page);

};

export const updatePage = (c: Context) => {

};

export const deletePage = (c: Context) => {

};