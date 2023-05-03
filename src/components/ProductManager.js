import {promises as fs} from "fs"

export default class ProductManager {
    constructor() {
        this.path = "./products.txt"
        this.id = 0 
        this.products = []
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        this.id++

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.id
        }

        this.products.push(newProduct)
        
        await fs.writeFile(this.path, JSON.stringify(this.products));
    }

    readProducts = async () => {
        let data = await fs.readFile(this.path, "utf-8")
        return JSON.parse(data)
    }

    getProducts = async () => {
        let data2 = await this.readProducts()
        return console.log(data2)
    }

    getProductsById = async (id) => {
        let data3 = await this.readProducts()
        if(!data3.find(product => product.id === id)){
            console.log("Product not found")
        }else{
            console.log (data3.find(product => product.id === id))
        }
       
    }

    deleteProductById = async (id) => {
        let data3 = await this.readProducts()
        let productFilter = data3.filter(product => product.id != id)

        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Product deleted successfully")
    }

    updateProducts = async ({id, ...product}) => {
       await this.deleteProductById(id)
       let productOld = await this.readProducts()
        let updatedProducts = [{...product, id}, ...productOld]
        await fs.writeFile(this.path, JSON.stringify(updatedProducts));
    }
}

/* const products = new ProductManager(); */

/* products.addProduct("pan", "lacatal", 700, "image1", "abc123", 1);
products.addProduct("azucar", "blanca", 150, "image2", "abc345", 3);
products.addProduct("queso", "azul", 4350, "image3", "abc4345", 2);
products.addProduct("fideos", "largos", 100, "image4", "abc234", 10);
products.addProduct("arroz", "blanco", 70, "image5", "abc6567", 34);
products.addProduct("sal", "fina", 150, "image6", "abc8945", 1);
products.addProduct("pimienta", "negra", 450, "image7", "ab9342", 999);
products.addProduct("leche", "descremada", 250, "image8", "abcds454", 199);
products.addProduct("agua", "mineral", 200, "image9", "abc6712", 12);
products.addProduct("manteca", "rica", 180, "image10", "abc6894", 22); */

/* products.getProducts() */
/* products.getProductsById(3) */
/* products.deleteProductById(2) */
/* products.updateProducts({
title: 'agua',
description: 'transparente',
price: 1999,
thumbnail: 'sin imagen',
code: '1234567',
stock: 1,
id: 3
}) */
