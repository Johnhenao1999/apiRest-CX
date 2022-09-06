const { Router } = require('express');
const router = Router();
const products = require('../products.json');
const fs = require('fs');
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



// Creacion metodo insertar producto
router.post('/admin/producto', (req, res) => {
    const { sku, nombre, precio, url, marca, descripcion, iva, descuento, inventario, fecha_creacion } = req.body;
   // Validamos cada campo
    if (!sku) {
        res.status(403)
        res.send({ error: 'sku vacio' })

    } if (!nombre) {
        res.status(403)
        res.send({ error: 'nombre vacio' })

    } if (!precio) {
        res.status(403)
        res.send({ error: 'precio vacio' })
    }
    if (!url) {
        res.status(403)
        res.send({ error: 'precio vacio' })
    }
    if (!marca) {
        res.status(403)
        res.send({ error: 'marca vacio' })

    } if (!descripcion) {
        res.status(403)
        res.send({ error: 'descripcion vacio' })
    } if (!iva) {
        res.status(403)
        res.send({ error: 'descripcion vacio' })

    } if (!descuento) {
        res.status(403)
        res.send({ error: 'descripcion vacio' })

    } if (!inventario) {
        res.status(403)
        res.send({ error: 'descripcion vacio' })

    } if (!fecha_creacion) {
        res.status(403)
        res.send({ error: 'fecha vacio' })
    }
    {
        const newProducts = { ...req.body };
        products.push(newProducts);

        //Creamos una nueva constante para almacenar nuestra lista de productos
        const json_products = JSON.stringify(products)
        //Permite leer la ruta de nuestro archivo products
        fs.writeFileSync('src/products.json', json_products, 'utf-8')
        res.send('El producto ha sido insertado correctamente');
    }

})

module.exports = router;