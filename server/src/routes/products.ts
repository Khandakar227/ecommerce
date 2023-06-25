import express from "express";
import { body } from "express-validator";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product";
import { csrfProtect } from "../libs";
import { checkAdmin } from "../middlewares/checkAdmin";

const productRoutes = express.Router();

const createProductValidations = [
  body("title").exists().withMessage("Title is required"),
  body("desc").exists().withMessage("Description is required"),
  body("vendor").exists().withMessage("Vendor is required"),
  body("category").exists().withMessage("Category is required"),
  body("price").exists().withMessage("Price is required"),
  body("available")
    .exists()
    .withMessage("Number of available product is required"),
  body("imageSrc")
    .exists()
    .withMessage("Atleast 1 product image is required")
    .isArray({ min: 1, max: 5 })
    .withMessage("Must include atleast 1 picture and maximum 5"),
  body("tags")
    .exists()
    .withMessage("You must add atleast 1 tag")
    .isArray({ min: 1, max: 10 })
    .withMessage("Must include atleast 1 tag and maximum 10"),
];

const updateProductValidations = [
  ...["tags"].map(field =>
    body(field).custom((value) => {
      if (!value) return true;
      if (!Array.isArray(value)) throw new Error("Invalid format for tags");
      return true;
    })
  ),
  ...["desc", "title", "vendor", "category", "unit"].map((field) =>
    body(field).custom((desc) => {
      if (typeof desc === "object")
        throw new Error(`Invalid type of product ${field}`);
      if ((!desc && typeof desc === "string") || (desc && !desc.trim()))
        throw new Error(`Product ${field} is given as empty string`);

      return true;
    })
  ),
];

productRoutes.get("/", getProducts);
productRoutes.post(
  "/create",
  csrfProtect,
  ...createProductValidations,
  checkAdmin,
  addProduct
);
productRoutes.get("/:id", getProduct);
productRoutes.put(
  "/:id",
  csrfProtect,
  ...updateProductValidations,
  checkAdmin,
  updateProduct
);
productRoutes.delete("/:id", checkAdmin, csrfProtect, deleteProduct);


export default productRoutes;
