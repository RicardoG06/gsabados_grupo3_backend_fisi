const mercadoPagoController = require('../controllers/mercadoPagoController');

module.exports = (app) => {


    // Guardar datos
    app.post('/api/payments/create', mercadoPagoController.createPayment);

}

