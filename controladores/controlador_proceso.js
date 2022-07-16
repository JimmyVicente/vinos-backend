//Models
var MateriaPrima = require('../modelos/1materia_prima');
var Extraccion = require('../modelos/2extraccion');
var Pasteurizacion = require('../modelos/3pasteurizacion');
var Fermentacion = require('../modelos/4fermentacion');
var Clarificacion = require('../modelos/5clarificacion');
var Trasiego = require('../modelos/6trasiego');
var Envasado = require('../modelos/7envasado');
var Proceso = require('../modelos/proceso');
//Modules
var GlobalApp = require('../global/global_app');
var UtilApi = require('../utils/util_api');

/** @api {post} /proceso/listar_proceso Listar proceso
 @apiName Listar proceso
 @apiGroup controlador.proceso
 @apiDescription Permite listar proceso
 @apiSuccess {Object} object { message: "¡Bienvenido!" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Datos incorrectos" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Cuenta inactiva" }*/
exports.listar_proceso = async function (req, res) {
    try {
        var procesos = await Proceso.find()
            .populate("materia_prima")
            .populate("extraccion")
            .populate("pasteurizacion")
            .populate("fermentacion")
            .populate("clarificacion")
            .populate("trasiego")
            .populate("envasado");
        UtilApi.succeesServer(req, res, { procesos });
    } catch (error) {
        UtilApi.errorServer(req, res, error);
    }
};


/** @api {post} /proceso/encontrar_proceso Encontrar proceso
 @apiName Encontrar proceso
 @apiGroup controlador.proceso
 @apiDescription Permite encontrar proceso
 @apiSuccess {Object} object { message: "¡Bienvenido!" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Datos incorrectos" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Cuenta inactiva" }*/
exports.encontrar_proceso = async function (req, res) {
    try {
        let { id_proceso } = req.body;
        var proceso = await encontrar_proceso(id_proceso);
        UtilApi.succeesServer(req, res, proceso);
    } catch (error) {
        UtilApi.errorServer(req, res, error);
    }
};


/** @api {post} /proceso/crear_editar_proceso Crear editar proceso
 @apiName Crear editar proceso
 @apiGroup controlador.proceso
 @apiDescription Permite editar proceso
 @apiParam {String} email Correo electrónico o número de celular.
 @apiSuccess {Object} object { message: "¡Bienvenido!" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Datos incorrectos" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Cuenta inactiva" }*/
exports.crear_editar_proceso = async function (req, res) {
    try {
        let { proceso, id_proceso } = req.body;
        UtilApi.validarCampos({ proceso });
        switch (proceso) {
            case 1:
                let { nro_cosecha, lugar_procedencia, nombre_propietario, gadros_brix } = req.body;
                UtilApi.validarCampos({ nro_cosecha, lugar_procedencia, nombre_propietario, gadros_brix });
                if (id_proceso != undefined) {
                    var proceso_validar = await encontrar_proceso(id_proceso); //para validar si existe proceso
                    var _id = proceso_validar.materia_prima?._id;
                    await MateriaPrima.updateOne({ _id }, { nro_cosecha, lugar_procedencia, nombre_propietario, gadros_brix });
                } else {
                    var materia_prima = await MateriaPrima.create({ nro_cosecha, lugar_procedencia, nombre_propietario, gadros_brix });
                    var proceso_c = await Proceso.create({ materia_prima: materia_prima._id });
                    id_proceso = proceso_c._id;
                }
                break;
            case 2:
                var proceso_validar = await encontrar_proceso(id_proceso); //para validar si existe proceso
                let { tipo } = req.body;
                UtilApi.validarCampos({ tipo });
                var _id = proceso_validar.extraccion?._id;
                if (_id != undefined) {
                    await Extraccion.updateOne({ _id }, { tipo });
                } else {
                    var extraccion = await Extraccion.create({ tipo });
                    await Proceso.updateOne({ _id: id_proceso }, { extraccion: extraccion._id });
                }
                break;
            case 3:
                var proceso_validar = await encontrar_proceso(id_proceso); //para validar si existe proceso
                let { temperatura_caliente, temperatura_fria, tiempo_proceso } = req.body;
                var data = { temperatura_caliente, temperatura_fria, tiempo_proceso };
                UtilApi.validarCampos(data);
                var _id = proceso_validar.pasteurizacion?._id;
                if (_id != undefined) {
                    await Pasteurizacion.updateOne({ _id }, data);
                } else {
                    var pasteurizacion = await Pasteurizacion.create(data);
                    await Proceso.updateOne({ _id: id_proceso }, { pasteurizacion: pasteurizacion._id });
                }
                break;
            case 4:
                var proceso_validar = await encontrar_proceso(id_proceso); //para validar si existe proceso
                let { fecha_inicio, fecha_final, grados_invertidos } = req.body;
                var data = { fecha_inicio, fecha_final, grados_invertidos };
                UtilApi.validarCampos(data);
                var _id = proceso_validar.fermentacion?._id;
                if (_id != undefined) {
                    await Fermentacion.updateOne({ _id }, data);
                } else {
                    var fermentacion = await Fermentacion.create(data);
                    await Proceso.updateOne({ _id: id_proceso }, { fermentacion: fermentacion._id });
                }
                break;
            case 5:
                var proceso_validar = await encontrar_proceso(id_proceso); //para validar si existe proceso
                let { turbidez } = req.body;
                var data = { turbidez };
                UtilApi.validarCampos(data);
                var _id = proceso_validar.clarificacion?._id;
                if (_id != undefined) {
                    await Clarificacion.updateOne({ _id }, data);
                } else {
                    var clarificacion = await Clarificacion.create(data);
                    await Proceso.updateOne({ _id: id_proceso }, { clarificacion: clarificacion._id });
                }
                break;
            case 6:
                var proceso_validar = await encontrar_proceso(id_proceso); //para validar si existe proceso
                let { liquido_claro, liquido_oscuro } = req.body;
                var data = { liquido_claro, liquido_oscuro };
                UtilApi.validarCampos(data);
                var _id = proceso_validar.trasiego?._id;
                if (_id != undefined) {
                    await Trasiego.updateOne({ _id }, data);
                } else {
                    var trasiego = await Trasiego.create(data);
                    await Proceso.updateOne({ _id: id_proceso }, { trasiego: trasiego._id });
                }
                break;
            case 7:
                var proceso_validar = await encontrar_proceso(id_proceso); //para validar si existe proceso
                let { nro_lote, nro_botellas, nro_botellas_especiales } = req.body;
                var data = { nro_lote, nro_botellas, nro_botellas_especiales };
                UtilApi.validarCampos(data);
                if (nro_botellas_especiales > nro_botellas) throw { mensaje: GlobalApp.mensaje_botellas_max_error }
                var _id = proceso_validar.envasado?._id;
                if (_id != undefined) {
                    await Envasado.updateOne({ _id }, data);
                } else {
                    var envasado = await Envasado.create(data);
                    await Proceso.updateOne({ _id: id_proceso }, { envasado: envasado._id });
                }
                break;
            default:
                throw { mensaje: GlobalApp.mensaje_error_proceso };
        }
        UtilApi.succeesServer(req, res, id_proceso, GlobalApp.mensaje_guardar_ok);
    } catch (error) {
        UtilApi.errorServer(req, res, error);
    }
};


/** @api {post} /proceso/aprobar_proceso Aprobar proceso
 @apiName Aprobarr proceso
 @apiGroup controlador.proceso
 @apiDescription Permite aprobar proceso
 @apiParam {String} email Correo electrónico o número de celular.
 @apiSuccess {Object} object { message: "¡Bienvenido!" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Datos incorrectos" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Cuenta inactiva" }*/
exports.aprobar_proceso = async function (req, res) {
    try {
        let { proceso, id_proceso } = req.body;
        UtilApi.validarCampos({ proceso, id_proceso });
        var proceso_validar = await encontrar_proceso(id_proceso);
        switch (proceso) {
            case 1:
                var _id = proceso_validar.materia_prima?._id;
                await MateriaPrima.updateOne({ _id }, { aprobado: true });
                break;
            case 2:
                var _id = proceso_validar.extraccion?._id;
                await Extraccion.updateOne({ _id }, { aprobado: true });
                break;
            case 3:
                var _id = proceso_validar.pasteurizacion?._id;
                await Pasteurizacion.updateOne({ _id }, { aprobado: true });
                break;
            case 4:
                var _id = proceso_validar.fermentacion?._id;
                await Fermentacion.updateOne({ _id }, { aprobado: true });
                break;
            case 5:
                var _id = proceso_validar.clarificacion?._id;
                await Clarificacion.updateOne({ _id }, { aprobado: true });
                break;
            case 6:
                var _id = proceso_validar.trasiego?._id;
                await Trasiego.updateOne({ _id }, { aprobado: true });
                break;
            case 7:
                var _id = proceso_validar.envasado?._id;
                // var envasado = proceso_validar.envasado;
                await Envasado.updateOne({ _id }, { aprobado: true });
                break;
            default:
                throw { mensaje: GlobalApp.mensaje_error_proceso };
        }
        UtilApi.succeesServer(req, res, id_proceso, GlobalApp.mensaje_aprobar_proceso);
    } catch (error) {
        UtilApi.errorServer(req, res, error);
    }
};


async function encontrar_proceso(id_proceso) {
    UtilApi.validarCampos({ id_proceso });
    try {
        var proceso = await Proceso.findOne({ _id: id_proceso })
            .populate("materia_prima")
            .populate("extraccion")
            .populate("pasteurizacion")
            .populate("fermentacion")
            .populate("clarificacion")
            .populate("trasiego")
            .populate("envasado");
        return proceso;
    } catch (error) {
        throw { mensaje: GlobalApp.mensaje_error_proceso, error: error }
    }
}
