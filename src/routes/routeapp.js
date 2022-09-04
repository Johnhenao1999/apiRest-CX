const { Router } = require('express');
const router = Router();
const products = require('../products.json');
module.exports = router;
const fs = require('fs');
const _ = require('underscore');

// Creacion del metodo para actualizar un producto

router.put('/admin/producto/:sku', (req, res) => {
    const { sku } = req.params;
    const { nombre, precio, url, marca, descripcion, iva, descuento, inventario, fecha_creacion } = req.body;
    // Validamos que ningun capo quede faltando
    if (nombre && precio && url && marca && descripcion && iva && descuento && descripcion && inventario && fecha_creacion) {
        // Nos permite recorrer el arreglo productos e ir comparando uno a uno
        _.each(products, (product, i) => {
            if (product.sku == sku) {
                product.nombre = nombre;
                product.precio = precio;
                product.url = marca;
                product.descripcion = descripcion;
                product.iva = iva;
                product.descuento = descuento;
                product.inventario = inventario;
                product.fecha_creacion = fecha_creacion;

                // Nos permite actualizar el archivo 
                const json_products = JSON.stringify(products);
                fs.writeFileSync('src/products.json', json_products, 'utf-8');

            }
        }); res.send('El producto se actualizo satisfactoriamente')
        res.json(products)
    }else{
        res.status(500).json({error: "Verifique los campos nuevamente"})
    }
}) 