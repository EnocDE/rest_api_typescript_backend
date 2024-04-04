import { Router } from "express";
import { body, check, validationResult } from "express-validator";
import { createProduct, getProducts } from "./handlers/product";
import { handleInputErrors } from "./middleware";
const router = Router()

//routing
router.get("/", getProducts);

router.post("/", 

  // Validación # Check se usa en funciones async y body en funciones que no lo sn
   body('name')
  .notEmpty().withMessage('El nombre de producto no puede ir vacio'),


   body('price')
  .notEmpty().withMessage('El precio de producto no puede ir vacio')
  .isNumeric().withMessage('Valor no válido')
  .custom(value => value > 0).withMessage('Precio no válido'),
  handleInputErrors,
  createProduct
);

router.put("/", (req, res) => {
	
	res.send('Desde PUT');
});

router.patch("/", (req, res) => {
	
	res.send('Desde PATCH');
});

router.delete("/", (req, res) => {
	
	res.send('Desde DELETE');
});

export default router