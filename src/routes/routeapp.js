const { Router } = require('express');
const router = Router();
const products = require('../products.json');
module.exports = router;
const fs = require('fs');

// Creacion del metodo para actualizar un producto


router.put('/admin/producto/:sku', (req, res) => {
    const { sku } = req.params;
    const {  nombre, precio, url, marca, descripcion, iva, descuento, inventario, fecha_creacion } = req.body;
    if (sku && nombre && precio && url && marca && descripcion && iva && descuento && inventario && fecha_creacion) {
        array.forEach(products, (producto, i) => {
            if (producto.id == id) {
                producto.sku = sku;
                producto.nombre = nombre;
                producto.precio = precio;
                producto.url = url;
                producto.marca = marca;
                producto.descripcion = descripcion;
                producto.iva = iva;
                producto.descuento = descuento;
                producto.inventario = inventario;
                producto.fecha_creacion = fecha_creacion;
            }

        });res.json(products);
    }else{
        res.status (500).json({error: 'Malo'});

    }
});
