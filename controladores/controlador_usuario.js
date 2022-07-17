//Models
var Usuario = require('../modelos/usuario');
//Modules
var GlobalApp = require('../global/global_app');
var UtilApi = require('../utils/util_api');

/** @api {post} /proceso/listar_usuario Listar usuario
 @apiName Listar usuario
 @apiGroup controlador.usuario
 @apiDescription Permite listar usuario
 @apiSuccess {Object} object { message: "¡Bienvenido!" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Datos incorrectos" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Cuenta inactiva" }*/
exports.listar_usuario = async function (req, res) {
    try {
        var usuarios = await Usuario.find();
        UtilApi.succeesServer(req, res, { usuarios });
    } catch (error) {
        UtilApi.errorServer(req, res, error);
    }
};


/** @api {post} /proceso/encontrar_usuario Encontrar usuario
 @apiName Encontrar usuario
 @apiGroup controlador.usuario
 @apiDescription Permite encontrar usuario
 @apiSuccess {Object} object { message: "¡Bienvenido!" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Datos incorrectos" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Cuenta inactiva" }*/
exports.encontrar_usuario = async function (req, res) {
    try {
        let { id_usuario } = req.body;
        var usuario = await encontrar_usuario(id_usuario);
        UtilApi.succeesServer(req, res, usuario);
    } catch (error) {
        UtilApi.errorServer(req, res, error, GlobalApp.mensaje_error_proceso);
    }
};


/** @api {post} /proceso/eliminar_usuario Eliminar usuario
 @apiName Eliminar usuario
 @apiGroup controlador.usuario
 @apiDescription Permite eliminar usuario
 @apiSuccess {Object} object { message: "¡Bienvenido!" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Datos incorrectos" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Cuenta inactiva" }*/
exports.eliminar_usuario = async function (req, res) {
    try {
        let { id_usuario } = req.body;
        await encontrar_usuario(id_usuario);
        await Usuario.remove({ _id: id_usuario });
        UtilApi.succeesServer(req, res);
    } catch (error) {
        UtilApi.errorServer(req, res, error, GlobalApp.mensaje_error_proceso);
    }
};



/** @api {post} /proceso/crear_editar_usuario Crear editar usuario
 @apiName Crear editar usuario
 @apiGroup controlador.usuario
 @apiDescription Permite editar usuario
 @apiParam {String} email Correo electrónico o número de celular.
 @apiSuccess {Object} object { message: "¡Bienvenido!" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Datos incorrectos" }
 @apiError {Object} object { "name": "ValidationError", "status": 400, "message": "Cuenta inactiva" }*/
exports.crear_editar_usuario = async function (req, res) {
    try {
        let { id_usuario, billetera, nombre, rol, permisos } = req.body;
        UtilApi.validarCampos({ billetera, nombre, rol, permisos });
        permisos = JSON.stringify(permisos);
        if (id_usuario != undefined) {
            var usuario_model = await encontrar_usuario(id_usuario);
            var _id = usuario_model._id;
            console.log(_id);
            await Usuario.updateOne({ _id }, { billetera, nombre, rol, permisos });
        } else {
            await Usuario.create({ billetera, nombre, rol, permisos });
        }
        UtilApi.succeesServer(req, res, null, GlobalApp.mensaje_guardar_ok);
    } catch (error) {
        UtilApi.errorServer(req, res, error);
    }
};


async function encontrar_usuario(id_usuario) {
    UtilApi.validarCampos({ id_usuario });
    try {
        var usuario = await Usuario.findOne({ _id: id_usuario });
        if (usuario == undefined) usuario = await Usuario.findOne({ billetera: id_usuario });
        if (usuario == undefined) throw { mensaje: GlobalApp.mensaje_error_proceso }
        return usuario;
    } catch (error) {
        var usuario = await Usuario.findOne({ billetera: id_usuario });
        if (usuario == undefined) throw { mensaje: GlobalApp.mensaje_error_proceso, error: error }
        return usuario;
    }
}