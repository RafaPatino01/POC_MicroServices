const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tomiko@2023",
    database: "shopping"
});

// All Business logic will be here
class ProductService {

    constructor(){
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs){
        try{
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormateData(productResult);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    
    async GetProducts(){
        try{
            const products = await this.repository.Products();
    
            let categories = {};
    
            products.map(({ type }) => {
                categories[type] = type;
            });
            
            return FormateData({
                products,
                categories:  Object.keys(categories) ,
            })

        }catch(err){
            throw new APIError('Data Not found')
        }
    }

    async GetProductDescription(productId){
        try {
            const product = await this.repository.FindById(productId);
            return FormateData(product)
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProductsByCategory(category){
        try {
            const products = await this.repository.FindByCategory(category);
            return FormateData(products)
        } catch (err) {
            throw new APIError('Data Not found')
        }

    }

    async GetSelectedProducts(selectedIds){
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return FormateData(products);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProductById(productId){
        try {
            return await this.repository.FindById(productId);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProductPayload(userId, {productId, qty}, event){
        
        const product = await this.repository.FindById(productId)

        console.log(product)

        if(product){
            const payload = {
                event: event,
                data: { userId, product, qty }
            }
            return FormateData(payload)
        }
        else {
            return FormateData({error: "no product available"})
        }

    }

    // -------------- MYSQL Functions -------------------

    async GetProducts_SQL(){
        
        return await con.promise().query("SELECT * FROM shopping_ms_products")
        .then( result => {

            console.log("[SQL] Getting all products ...")
            
            let res = {};
            res["products"] = result[0];

            let categories = {};

            result[0].map(({ type }) => {
                categories[type] = type;
            });

            res["categories"] = Object.keys(categories);

            let final = {};
            final["data"] = res;

            return final
        }) 

    }

    async CreateProduct_SQL(productInputs){

        return await con.promise().query(`INSERT INTO shopping_ms_products (name, `+"`"+`desc`+"`"+`, `+"`"+`type`+"`"+`, unit, price, available, suplier, banner) VALUES ('${productInputs["name"]}', '${productInputs["desc"]}', '${productInputs["type"]}', ${productInputs["unit"]}, ${productInputs["price"]}, 1, '${productInputs["suplier"]}', '${productInputs["banner"]}')`)
        .then( result => {
            console.log("[SQL] Inserting product ...")
            return "OK"
        }) 
    }

    async GetProductDescription_SQL(productId){
        return await con.promise().query("SELECT * FROM shopping_ms_products WHERE _id='"+productId+"'")
        .then( result => {
            console.log("[SQL] Getting product descr: " + productId)
            
            let final = {}
            final["data"] = result[0][0];
            return final
        })
    }

    async GetProductsByCategory_SQL(category){
        return await con.promise().query("SELECT * FROM shopping_ms_products WHERE type='"+category+"'")
        .then( result => {
            console.log("[SQL] Getting product by category: " + category)
            
            let final = {}
            final["data"] = result[0];
            return final
        })

    }

    async GetSelectedProducts_SQL(selectedIds){
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return FormateData(products);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProductPayload_SQL(userId, {productId, qty}, event){
        
        let product = await con.promise().query("SELECT * FROM shopping_ms_products WHERE _id='"+productId+"'")
        .then( result => {
            console.log("[SQL] Getting product descr: " + productId)
            
            let final = {}
            final["data"] = result[0][0];
            return final
        })

        product = product["data"]

        if(product){
            const payload = {
                event: event,
                data: { userId, product, qty }
            }
            return FormateData(payload)
        }
        else {
            return FormateData({error: "no product available"})
        }

    }
    
  
}

module.exports = ProductService;