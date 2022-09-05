const { Router } = require('express');
const router = Router();
const products = require('../products.json');
module.exports = router;
const orders = require('../orders.json');
const fs = require('fs');

// Este metodo le permite al usuario realizar una compra

router.post('/comprar', (req, res) => {
    const { nombre, apellido, productos } = req.body;
    const newOrders = [];
    let valorTotal = 0;
    if (nombre && apellido) {
        const id = orders.length + 1;
        newOrders.push({ nombre, apellido })
        for (const i of productos) {
            for (const j of products)
                if (j.sku == i) {
                    const precioFinal = parseInt(j.precio) - (parseInt(j.precio) * parseFloat(j.descuento)) + (parseInt(j.precio) * parseFloat(j.iva));
                    newOrders.push({ "Nombre": j.nombre, "Precio final producto": precioFinal })
                    valorTotal = valorTotal + precioFinal;
                }
        } newOrders.push({ "Valor total compra": valorTotal, "id":id });

        orders.push(newOrders);

        //Creamos una nueva constante para almacenar nuestras ordenes
        const json_products = JSON.stringify(orders)

        //Permite leer la ruta de nuestro archivo ordenes
        fs.writeFileSync('src/orders.json', json_products, 'utf-8')
        res.send('Tu compra se ha generado con exito, orden de compra numero: ' + id)
    }
});