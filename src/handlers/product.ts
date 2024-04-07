import { Request, Response, request } from "express";
import Product from "../models/Product.model";
import colors from "colors";

export const getProducts = async (req: Request, res: Response) => {
	const products = await Product.findAll({
		order: [["id", "DESC"]],
	});
	res.json({ data: products });
};

export const getProductById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const product = await Product.findByPk(id);
	if (!product) {
		return res.status(404).json({
			error: "Producto no encontrado",
		});
	}
	res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
	// Se crea el objeto con los datos y lo guarda en la base de datos

	const product = await Product.create(req.body);
	res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
	const { id } = req.params;
	const product = await Product.findByPk(id);

	if (!product) {
		return res.status(404).json({
			error: "Producto no encontrado",
		});
	}

	// Actualizar
	await product.update(req.body);
	await product.save();

	res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
	const { id } = req.params;
	const product = await Product.findByPk(id);

	if (!product) {
		return res.status(404).json({
			error: "Producto no encontrado",
		});
	}

	// Cambia al valor contrario en availability al llamar al end point # Este valor ya viene de la base de datos
	product.availability = !product.dataValues.availability;
	await product.save();

	res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
	const { id } = req.params;
	const product = await Product.findByPk(id);

	if (!product) {
		return res.status(404).json({
			error: "Producto no encontrado",
		});
	}

	await product.destroy();
	res.json({ data: "Producto eliminado" });
};
