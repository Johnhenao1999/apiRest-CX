const { Router, json } = require('express');
const router = Router();
const products = require('../products.json');
module.exports = router;


// Metodo que nos permite ver el resumen de compra, vista usuario

router.post('/resumen', (req, res) => {
    const { sku } = req.body;
    const productSku = [];
    let valorTotal = 0;
    //Recorremos los sku que ingresan por el body
    for (const i of sku) {
        //Recorremos nuestros productos y compramos el sku entrante con los existentes
        for (const j of products)
            if (j.sku == i) {
                const precioFinal = parseInt(j.precio) - (parseInt(j.precio) * parseFloat(j.descuento)) + (parseInt(j.precio) * parseFloat(j.iva));
                productSku.push({ "sku": j.sku, "nombre": j.nombre, "Precio final": precioFinal });
                valorTotal = valorTotal + precioFinal;
                
            }
    }
    productSku.push({"Valor total compra": valorTotal});
    res.json(productSku);
});

