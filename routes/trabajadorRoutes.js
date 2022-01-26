const TrabajadorController = require('../controllers/trabajadorController');

module.exports = (app) => {
    // Traer datos
    app.get('/api/trabajador/getAll', TrabajadorController.getAll);
    app.get('/api/trabajador/findByrol/:id_rol', TrabajadorController.findByrol);

    // Guardar datos
    app.post('/api/trabajador/create', TrabajadorController.register);
}

