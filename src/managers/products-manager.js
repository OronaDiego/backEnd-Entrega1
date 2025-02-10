import fs from 'node:fs';
import { v4 as uuidv4 } from "uuid";


class ProductManager{
    constructor(path){
        this.path=path;
    }

    async getAllProducts(){
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path,'utf-8');
                return JSON.parse(products);
            }else return []
        } catch (error) {
            throw new Error(error)
        }
    }
    async getProductsById(id){
        try {
            const products = await this.getAllProducts();
            const productsExists = products.find((p)=>p.id === id);
            if(!productsExists) throw new Error("Product does noe exist");
            return productsExists;
        } catch (error) {
            throw error;
        }
    }
    async createProducts(obj){
        try {
            const product = {
                id: uuidv4(),
                ...obj,
            }
            const products = await this.getAllProducts();     
            const productExists = products.find((p)=> p.id === product.id);            
            if(productExists) throw new Error("Product already exists");
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(obj,id){
        try {
            const products = await this.getAllProducts();
            let productExist = await this.getProductsById(id);
            productExist = {...productExist,...obj};
            const newArray = products.filter((p)=>p.id !== id);
            newArray.push(productExist);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return productExist;
        } catch (error) {
            throw error;
        }
    }
    async deleteProducts(id){
        try {
            const products = await this.getAllProducts();
            if(!products.length) throw new Error('Products is empty');
            const productExists = await this.getProductsById(id);
            const newArray = products.filter((p)=>p.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray))
            return productExists;
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const manager = new ProductManager("./products.json");