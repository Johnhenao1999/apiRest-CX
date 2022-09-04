const { Router } = require('express');
const router = Router();
const products = require('../products.json');
module.exports = router;


// Creacion del metodo listar productos, vista administrador
router.get('/admin/producto', (req, res) => {
    const items = [];
    for (const item of products) {
        items.push({ 'sku': item.sku, 'nombre': item.nombre, 'URL': item.url, 'marca': item.marca, 'iva': item.iva, 'inventario': item.inventario });
    }
    res.json(items);
})

