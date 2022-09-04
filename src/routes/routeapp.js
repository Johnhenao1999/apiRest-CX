const { Router } = require('express');
const router = Router();
const products = require('../products.json');
module.exports = router;


/* Metodo que nos permite listar los productos
con su precio final y los items correspondientes */

router.get('/producto', (req, res) => {
    const newItems = [];
    for (const item of products) {
        const precioFinal =  parseInt(item.precio) - (parseInt(item.precio) * parseFloat(item.descuento)) + (parseInt(item.precio) * parseFloat(item.iva));
        newItems.push({ 'sku': item.sku, 'nombre': item.nombre, 'URL': item.url, 'marca': item.marca, 'Precio final': precioFinal });
    }
    res.json((newItems));

})