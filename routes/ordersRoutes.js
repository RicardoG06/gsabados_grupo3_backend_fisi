const ordersController = require('../controllers/ordersController');

module.exports = (app) => {
    // Traer datos
    //app.get('/api/users/getAll', UsersController.getAll);

    // Guardar datos
    app.post('/api/orders/create', ordersController.create);

}

