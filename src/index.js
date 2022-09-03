const express = require('express');
const morgan = require('morgan');
const app = express();


app.set('port', 3000);
app.set('json spaces', 2)

// Nos permite observa la informacion de alguna peticion
app.use(morgan('dev'));

app.use(express.json());
//Permite entender los datos sencillos
app.use(express.urlencoded({extended:false}));

// Definimo previamente la ruta que usaremos en nuestra app
app.use(require('./routes/routeapp'));

// Inicializamos el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});