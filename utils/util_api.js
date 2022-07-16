'use strict';
var GlobalApp = require('../global/global_app');

exports.errorServer = async function (req, res, error, mensaje, tipo) {
    try {
        mensaje = error.mensaje ?? mensaje;
        if (error.mensaje == undefined) error = error?.toString();
    } catch (error) {
        error = error?.toString();
    }
    var json = {
        mensaje: mensaje ?? GlobalApp.mensaje_error_500,
        tipo: tipo ?? GlobalApp.tipo_error,
        mensaje_alterno: error ?? "",
        url: req.originalUrl,
        ip: req.ip,
    };
    if (GlobalApp.imprimir_logs) {
        console.log("___________________________ INNCIO DE ERROR ___________________________ \n");
        console.log(error);
        console.log("\n ___________________________ FIN DE ERROR ___________________________ \n");
    }
    await set_header(req, res, json);
    res.status(200).json(json);
}

exports.succeesServer = async function (req, res, data, mensaje, mensaje_alterno) {
    var json = {
        mensaje: mensaje ?? GlobalApp.mensaje_success,
        tipo: GlobalApp.tipo_success,
        data: data ?? {},
        mensaje_alterno: mensaje_alterno ?? "",
        url: req.originalUrl,
    };
    await set_header(req, res, json);
    res.status(200).json(json);
}

async function set_header(req, res, json) {
    await res.setHeader("Content-Type", "application/json");
    if (GlobalApp.imprimir_logs) {
        console.log("___________________________ INFORMACIÓN ___________________________ \n");
        console.log(json);
        console.log("\n ___________________________ FIN INFORMACION ___________________________ \n");
    }
}



exports.validarCampos = function (list) {
    var info = "";
    for (const item in list) { if (list[item] == undefined || list[item] == "") info += `${item}, `; }
    if (info != "") {
        info = info.trim().substring(0, info.length - 2)
        throw { mensaje: `Campos obligatorios: ${info}` };
    }
}

exports.validarLongitud = function (list, longitud) {
    var info = "";
    for (const item in list) {
        if (list[item].trim().length < longitud) info += `El campo ${item} debe tener almenos ${longitud} caracteres, \n`;
    }
    if (info != "") {
        info = info.trim().substring(0, info.length - 3)
        throw {
            "mensaje": info
        }
    }
}

exports.validar_cadena_vacia = function (cadena) {
    cadena = cadena ?? "";
    cadena = cadena.trim();
    return cadena == "";
}


exports.fusionarMap = function (obj1, obj2) {
    return merge(obj1, obj2);
}

exports.isEmpetyObjetc = function (obj) {
    obj = obj ?? {};
    return Object.entries(obj).length === 0;
}