const { Router } = require('express');
const router = Router();
const products = require('../products.json');
module.exports = router;
const _ = require('underscore');

// Metodo que nos permite consultar el producto por SKU, vista usuario

router.get('/producto/:sku', (req, res) => {
    const { sku } = req.params;
    const productSku = [];
    //Recorremos el arreglo y comparamos el sku de entrada con el que 
    _.each(products, (product, i) => {
        if (product.sku == sku) {
            const precioFinal = parseInt(product.precio) - (parseInt(product.precio) * parseFloat(product.descuento)) + (parseInt(product.precio) * parseFloat(product.iva));
            productSku.push({ "sku": product.sku, "nombre": product.nombre, "precio": product.precio, "url": product.url, "marca": product.marca, "descripcion": product.descripcion, "iva": product.iva, "descuento": product.descuento, "Precio final": precioFinal });
            res.json((productSku));
        }
    });
});
