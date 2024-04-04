import { Router } from "express";
import { body, param } from "express-validator";
import {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
	updateAvailability,
  deleteProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";
const router = Router();

//routing
router.get("/", getProducts);

router.get(
	"/:id",
	param("id").isInt().withMessage("ID no válido"),
	handleInputErrors,
	getProductById
);

router.post(
	"/",

	// Validación # Check se usa en funciones async y body en funciones que no lo sn
	body("name")
		.notEmpty()
		.withMessage("El nombre de producto no puede ir vacio"),
	body("price")
		.notEmpty()
		.withMessage("El precio de producto no puede ir vacio")
		.isNumeric()
		.withMessage("Valor no válido")
		.custom((value) => value > 0)
		.withMessage("Precio no válido"),
	handleInputErrors,
	createProduct
);

router.put(
	"/:id",
	param("id").isInt().withMessage("ID no válido"),
	body("name")
		.notEmpty()
		.withMessage("El nombre de producto no puede ir vacio"),
	body("price")
		.notEmpty()
		.withMessage("El precio de producto no puede ir vacio")
		.isNumeric()
		.withMessage("Valor no válido")
		.custom((value) => value > 0)
		.withMessage("Precio no válido"),
	body("availability")
		.isBoolean()
		.withMessage("Valor para disponibilidad no válido"),
	handleInputErrors,
	updateProduct
);

router.patch(
	"/:id",
	param("id").isInt().withMessage("ID no válido"),
	handleInputErrors,
	updateAvailability
);

router.delete(
	"/:id",
	param("id").isInt().withMessage("ID no válido"),
	handleInputErrors,
  deleteProduct
);



export default router;
