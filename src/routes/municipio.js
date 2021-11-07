const routerm = require('express').Router();

const municipioController = require('../controllers/municipioController');

routerm.get('/', municipioController.listm);
routerm.post('/addm', municipioController.savem);
routerm.get('/updatem/:id', municipioController.editm);
routerm.post('/updatem/:id', municipioController.updatem);
routerm.get('/deletem/:id', municipioController.deletem);


module.exports = routerm;

