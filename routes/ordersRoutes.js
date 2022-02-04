const ordersController = require('../controllers/ordersController');

module.exports = (app) => {
    // Traer datos
    app.get('/api/orders/findByStatus/:status', ordersController.findByStatus);
    app.get('/api/orders/findByClientAndStatus/:id_user/:status', ordersController.findByClientAndStatus);

    // Guardar datos
    app.post('/api/orders/create', ordersController.create);

}

