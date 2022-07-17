var express = require('express');
var router = express.Router();

var controlador_usuario = require('../controladores/controlador_usuario');

/* GET home page. */
router.post("/listar_usuario", controlador_usuario.listar_usuario);
router.post("/crear_editar_usuario", controlador_usuario.crear_editar_usuario);
router.post("/encontrar_usuario", controlador_usuario.encontrar_usuario);
router.post("/eliminar_usuario", controlador_usuario.eliminar_usuario);

module.exports = router;
