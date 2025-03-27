import MongoDao from "./mongo-dao.js";
import { productModel } from "./product-model";

class ProductDaoMongo extends MongoDao {
    constructor(model){
        super(model);
    }
}

export const productDao = new ProductDaoMongo(productModel);
