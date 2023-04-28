import {promises as fs} from "fs"

class ProductManager {
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

const products = new ProductManager();

/*  products.addProduct("pan", "lacatal", 700, "image1", "abc123", 1);
 products.addProduct("azucar", "blanca", 150, "image2", "abc345", 3);
products.addProduct("queso", "azul", 4350, "image2", "abc4345", 2);  */

/* products.getProducts() */
/* products.getProductsById(3) */
/* products.deleteProductById(2) */
products.updateProducts({
title: 'agua',
description: 'transparente',
price: 1999,
thumbnail: 'sin imagen',
code: '1234567',
stock: 1,
id: 3
})
