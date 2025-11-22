import { db } from "@/db";
import { productTable } from "@/db/schemas/product-schema";
import type { Request, Response } from "express";

export const getAllPorducts = async (req: Request, res: Response) => {
  console.log(req.path);
  try {
    const produts = await db.select().from(productTable);
    res.json(produts);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
