const { Router } = require('express');
const router = Router();
const products = require('../products.json');
module.exports = router;
const _ = require('underscore');


// Creacion del metodo listar productos, vista administrador
router.get('/admin/producto', (req, res) => {
    const items = [];
    for (const item of products) {
        items.push({ 'sku': item.sku, 'nombre': item.nombre, 'URL': item.url, 'marca': item.marca, 'iva': item.iva, 'inventario': item.inventario });
    }
    res.json(items);
})


// Metodo para consultar un producto segun el SKU, vista administrador
router.get('/admin/producto/:sku',(req, res) => {
    const {sku} = req.params;
    //Recorremos nuestro arreglo e imprimimos el producto que coincida con el SKU
    _.each(products, (product, i) =>{
        if (product.sku == sku)
        res.json(product);
    })
})


