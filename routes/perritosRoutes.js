const perritosController = require('../controllers/perritosController');

module.exports = (app , upload) => {
    // Traer datos
    app.get('/api/perritos/getAll', perritosController.getAll);

    // Guardar datos
    app.post('/api/perritos/create', upload.array('image',1), perritosController.register);

}
