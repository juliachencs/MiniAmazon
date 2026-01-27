import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http-error.js";

const products = [
  {
    id: 1,
    name: "product1",
    price: 100,
    description: "This is a fake product with id 1",
    imageURI: "http://product1.png",
    category: "mobile",
    inStockQuant: 100,
    createdAt: "0116",
    updatedAt: "0116",
  },
  {
    id: 2,
    name: "Meta Quest2 VR headset",
    price: 299,
    description:
      "Hundreds of hit games, one-of-a-kid experiences, live events, new ways to stay fit and  a growing community. Hundreds of hit games, one-of-a-kid experiences, live events, new ways to stay fit and  a growing community",
    imageURI:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR_DIKTAsmXNCKkbVNL5I_nMZ9Ar3H3Hm-TGtTspQ68W00ViMIAABLRkIqYEkNw7A-wse2vd0OiSPHif8r9C3Sjo7tPDZYrcQ",
    category: "mobile",
    inStockQuant: 100,
    createdAt: "0116",
    updatedAt: "0116",
  },
];
export async function ProductsController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const offset = req.query.offset; // 'express'
    const limit = req.query.limit; // 'asc'
    const sortby = req.query.sortby; // '2'

    console.log(
      `Request to get products with parameters offset=${offset}, limit=${limit}, sortby=${sortby}`,
    );

    //setTimeout(()=>{throw new HttpError("server error", 500)}, 1000*3);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

export async function ProductController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = req.params.id;
    console.log(`Request to get the product with ${id}`);
    res.status(200).json();
  } catch (error) {
    next(error);
  }
}

export async function ProductCountController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    console.log("Request to get the total number of product");

    res.status(200).json({
      count: 500,
    });
  } catch (error) {
    next(error);
  }
}

export async function ProductCreateController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    console.log("Request to add a product");
    res.status(200).json({
      message: "product added",
    });
  } catch (error) {
    next(error);
  }
}

export async function ProductUpdateController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    console.log("Request to update a product");
    res.status(200).json({
      message: "product update",
    });
  } catch (error) {
    next(error);
  }
}
