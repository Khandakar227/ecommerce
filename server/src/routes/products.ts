import express from "express";
import { body } from "express-validator";
import { addProduct, getProduct, getProducts } from '../controllers/product';
import { csrfProtect } from "../libs";
import { checkAdmin } from "../middlewares/checkAdmin";

const productRoutes = express.Router();

const createProductValidations = [
    body("title").exists().withMessage("Title is required"),
    body("desc").exists().withMessage("Description is required"),
    body("vendor").exists().withMessage("Vendor is required"),
    body("category").exists().withMessage("Category is required"),
    body("price").exists().withMessage("Price is required"),
    body("available").exists().withMessage("Number of available product is required"),
    body("imageSrc").exists().withMessage("Atleast 1 product image is required").isArray({min: 1, max: 5}).withMessage("Must include atleast 1 picture and maximum 5"),
    body("tags").exists().withMessage("You must add atleast 1 tag").isArray({min: 1, max: 10}).withMessage("Must include atleast 1 tag and maximum 10"),
    body('options')
    .isArray({ min: 0 }).withMessage('Options should be an array')
    .custom((value: any[]) => {
      // Check each element in the options array
      for (const option of value) {
        if (!option || typeof option !== 'object' || Array.isArray(option)) {
          throw new Error('Options are of invalid type');
        }

        if (typeof option.name !== 'string') {
          throw new Error('Option name should be a string');
        }

        if (!Array.isArray(option.value) || option.value.some((item: any) => typeof item !== 'string')) {
          throw new Error('Option value should be an array of strings');
        }
      }

      return true;
    }),

];

productRoutes.get('/', getProducts);
productRoutes.post('/create',
    ...createProductValidations,
    checkAdmin,
    addProduct);
productRoutes.get('/:id', getProduct);

export default productRoutes;