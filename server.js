const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport')
const multer = require('multer');
const serviceAccount = require ('./serviceAccountKey.json');
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const upload = multer({
    storage: multer.memoryStorage()
});


/*    RUTAS      */

const users = require('./routes/usersRoutes');
const trabajador = require('./routes/trabajadorRoutes');
const Perritos = require('./routes/perritosRoutes');
const orders = require('./routes/ordersRoutes');

/* FIN DE RUTAS */

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by')

app.set('port',port);

/* Llamada a la app */

users(app, upload);
trabajador(app);
Perritos(app, upload);
orders(app);

/* Fin de llamada a la app */

server.listen(3000, '192.168.1.73' || 'localhost',function(){
    console.log("Conexion a la base de datos de manera exitosa")
    console.log('Aplicacion de NodeJS ' + process.pid + ' Iniciada...')

});

// ERROR HANDLER

app.use((err, req , res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
})

module.exports = {
    app: app,
    server : server
}

// 200 - Respuesta exitosa
// 400 Significa que la URL no existe
// 500 Error interno del servidor