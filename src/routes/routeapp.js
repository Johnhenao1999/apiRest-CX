const { Router } = require('express');
const router = Router();
const products = require('../products.json');
module.exports = router;


// Creacion del metodo listar productos, vista administrador
router.get('/admin/producto', (req, res)=>{
    res.json(products);
})