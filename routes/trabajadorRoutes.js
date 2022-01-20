const TrabajadorController = require('../controllers/trabajadorController');

module.exports = (app) => {
    // Traer datos
    app.get('/api/trabajador/getAll', TrabajadorController.getAll);

    // Guardar datos
    app.post('/api/trabajador/create', TrabajadorController.register);

}