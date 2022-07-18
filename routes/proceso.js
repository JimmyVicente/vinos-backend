var express = require('express');
var router = express.Router();

var ControladorProceso = require('../controladores/controlador_proceso');

/* GET home page. */
router.post("/listar_proceso", ControladorProceso.listar_proceso);
router.post("/crear_editar_proceso", ControladorProceso.crear_editar_proceso);
router.post("/encontrar_proceso", ControladorProceso.encontrar_proceso);
router.post("/aprobar_proceso", ControladorProceso.aprobar_proceso);
router.post("/firmar_proceso", ControladorProceso.firmar_proceso);

module.exports = router;
