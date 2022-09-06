const { Router } = require('express');
const router = Router();
const products = require('../products.json');
const fs = require('fs');
module.exports = router;
const fs = require('fs');
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

