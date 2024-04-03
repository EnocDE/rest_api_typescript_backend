import { Request, Response, request } from "express";
import { check, validationResult } from "express-validator";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
	// Se crea el objeto con los datos y lo guarda en la base de datos
	try {
		const product = await Product.create(req.body);
		res.json({ data: product });
	} catch (error) {
		console.log(error);
	}
};
