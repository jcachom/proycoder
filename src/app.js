 
const ProductManager = require("./productManager");
let path = "./productos.json";
const express = require("express");

const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let oProducto = new ProductManager(path);

app.get("/products/:pid",async (req, res) => {
  let idProd = req.params["pid"];
   
    let response = await oProducto.getProductById(idProd);
    res.json(response);
   
});
//http://localhost:8080/products/7

app.get("/products", async (req, res) => {
  let cantFilas = new Number(req.query.limit ?? 0);

 
    let response = await oProducto.getProducts();

    if (cantFilas > 0 && cantFilas <= response.length) {     
      response = response.slice(0, cantFilas);
    }
    res.json(response);
 
});
//http://localhost:8080/products/?limit=2
 

app.listen(PUERTO, () => {
  console.log(`Servidor arriba en puerto:${PUERTO}  ruta:>localhost:${PUERTO}`);
});
