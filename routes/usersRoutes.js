const UsersController = require('../controllers/usersController');

module.exports = (app) => {
    // Traer datos
    app.get('/api/users/getAll', UsersController.getAll);

    // Guardar datos
    app.post('/api/users/create', UsersController.register);
    app.post('/api/users/login', UsersController.login);
}