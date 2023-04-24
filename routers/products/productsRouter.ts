import {Router, Request, Response} from 'express';
import * as productController from "../../controllers/productController";
import {body} from "express-validator";
import {tokenVerifier} from "../../middlewares/tokenVerifier";
import {validateForm} from "../../middlewares/validateForm";
import multer from 'multer';
import ProductCollection from '../../schemas/ProductSchema';

const productsRouter: Router = Router();

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, './E-COMMERCE WEBSITE/')
    },
    
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});
const fileFilter = (request: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}
}
const upload = multer({storage: storage, fileFilter : fileFilter});

/**
 * @usage : Create a Product
 * @url : http://localhost:9000/api/products/
 * @params : title, description, imageUrl, brand, price, quantity, categoryId, subCategoryId
 * @method : POST
 * @access : PRIVATE
 */
productsRouter.post("/", [
    body('title').not().isEmpty().withMessage("title is required"),
    body('description').not().isEmpty().withMessage("description is required"),
    body('imageUrl').not().isEmpty().withMessage("imageUrl is required"),
    body('brand').not().isEmpty().withMessage("brand is required"),
    body('price').not().isEmpty().withMessage("price is required"),
    body('quantity').not().isEmpty().withMessage("quantity is required"),
    body('categoryId').not().isEmpty().withMessage("categoryId is required"),
    body('subCategoryId').not().isEmpty().withMessage("subCategoryId is required")


], tokenVerifier, validateForm,upload.array('images',5), async (request: Request, response: Response) => {
   
    await productController.createProduct(request, response);

});


/**
 * @usage : Update a Product
 * @url : http://localhost:9000/api/products/:productId
 * @params : title, description, imageUrl, brand, price, quantity, categoryId, subCategoryId
 * @method : PUT
 * @access : PRIVATE
 */
productsRouter.put("/:productId", [
    body('title').not().isEmpty().withMessage("title is required"),
    body('description').not().isEmpty().withMessage("description is required"),
    body('imageUrl').not().isEmpty().withMessage("imageUrl is required"),
    body('brand').not().isEmpty().withMessage("brand is required"),
    body('price').not().isEmpty().withMessage("price is required"),
    body('quantity').not().isEmpty().withMessage("quantity is required"),
    body('categoryId').not().isEmpty().withMessage("categoryId is required"),
    body('subCategoryId').not().isEmpty().withMessage("subCategoryId is required")
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await productController.updateProduct(request, response);


});

/**
 * @usage : Get all Products
 * @url : http://localhost:9000/api/products/
 * @params : no-params
 * @method : GET
 * @access : PRIVATE
 */
productsRouter.get("/", tokenVerifier, async (request: Request, response: Response) => {
    await productController.getAllProducts(request, response);
});

/**
 * @usage : Get a Product
 * @url : http://localhost:9000/api/products/:productId
 * @params : no-params
 * @method : GET
 * @access : PRIVATE
 */
productsRouter.get("/:productId", tokenVerifier, async (request: Request, response: Response) => {
    await productController.getProduct(request, response);
});


/**
 * @usage : Delete a Product
 * @url : http://localhost:9000/api/products/:productId
 * @params : no-params
 * @method : DELETE
 * @access : PRIVATE
 */
productsRouter.delete("/:productId", tokenVerifier, async (request: Request, response: Response) => {
    await productController.deleteProduct(request, response);
});

/**
 * @usage : Get all products with category Id
 * @url : http://localhost:9000/api/products/categories/:categoryId
 * @params : no-params
 * @method : GET
 * @access : PRIVATE
 */
productsRouter.get("/categories/:categoryId", tokenVerifier, async (request: Request, response: Response) => {
    await productController.getAllProductsWithCategoryId(request, response);
});

export default productsRouter;