const { Router } = require('express');
const router = Router();
const products = require('../products.json');
module.exports = router;
const fs = require('fs');
const _ = require('underscore');


// Metodo para eliminar un producto, vista administrador
router.delete('/admin/producto/:sku', (req, res) => {
    const { sku } = req.params;
    // Nos permite recorrer el arreglo
    _.each(products, (product, i) => {  
        if (product.sku == sku) {
            products.splice(i, 1);
            // Nos permite eliminar el producto de nuestro archivo JSON
            const json_products = JSON.stringify(products);
            fs.writeFileSync('src/products.json', json_products, 'utf-8');
            res.send('El producto ha sido eliminado con exito');
        } 
    }); 
});