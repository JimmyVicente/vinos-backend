'use strict';

class GlobalApp {
    //config globals
    static link = '';
    static imprimir_logs = false;
    static domain = "api";
    //success
    static mensaje_bienvenido = "¡Bienvenido!";
    static mensaje_success = "Consulta exitosa";
    static mensaje_guardar_ok = "Información guardada con éxito";
    static mensaje_guardar_no = "No se pudo guardar la información";
    static mensaje_actualizar_ok = "Información actalizada con éxito";
    static mensaje_actualizar_no = "No se pudo actalizar la información";
    static mensaje_registro_no = "No hay registro";
    static mensaje_error_registros = "No existen registros";
    static mensaje_error_proceso = "Proceso no encontrado";
    static mensaje_aprobar_proceso= "Proceso aprobado con exito";
    //errors
    static mensaje_error_500 = "Ocurrió un problema, intente más tarde.";
    static mensaje_error_404 = "Ruta no encontrada";
    static mensaje_error_usuario_no_existe = "Usuario no encontrado";
    static mensaje_info = "Mensaje informativo";
    static mensaje_warning = "Mensaje de adventencia";

    //variables temporales
    static token_temporal = "";


    //tipo de peticion
    static tipo_success = "success";
    static tipo_error = "error";
    static tipo_info = "info";
    static tipo_warning = "warning";

    //accessos

}
module.exports = GlobalApp;