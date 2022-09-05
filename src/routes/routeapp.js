const { Router } = require('express');
const router = Router();
const products = require('../products.json');
const fs = require('fs');
module.exports = router;


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