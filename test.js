import {promises as fs} from "fs"


class ProductManager {
    constructor() {
        this.patch = "./productos.txt"
    }

    static id = 0

    addProduct(title, description, price, thumbnail, code, stock){
        for (let i = 0; i < this.products.length;i++) {
            if(this.products[i].code === code) {
                console.log(`El codigo ${code} esta repetido`);
                break;
            }
        }

        const newProduct ={
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }

        if (!Object.values(newProduct).includes(undefined)) {

            ProductManager.id++
            this.products.push ({
                ...newProduct,
                id:ProductManager.id,
            });
        }else {
            console.log("Todos los campos son requeridos")
        }
    }

    getProduct(){
        return this.products;
    }

    exists (id) {
       return this.products.find((product) => product.id === id) 
    }

    getProductById(id){
        !this.exists(id) ? console.log("Not Found") : console.log(this.exists(id));    
      }
  }  


const products = new ProductManager()
//First call = empty array
console.log(products.getProduct());

//Add Product
products.addProduct('title1', 'description1', 101, "thumbnail1", "qwerty1", 1);
products.addProduct('title2', 'description2', 202, "thumbnail2", "qwerty2", 2);

//Second call = Array with product
console.log(products.getProduct());

//Repeated code validation
products.addProduct('title2', 'description2', 102, "thumbnail2", "qwerty1", 212);

//Search by ID
products.getProductById(2)

//Search by ID not found
products.getProductById(400)



