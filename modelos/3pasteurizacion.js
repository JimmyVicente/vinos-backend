const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  temperatura_caliente: {
    type: String,
    required: true,
    trim: true
  },
  temperatura_fria: {
    type: String,
    required: true,
    trim: true
  },
  tiempo_proceso: {
    type: String,
    required: true,
    trim: true
  },
  aprobado: { 
    type: Boolean,
    default: false,
  },
},
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = model("pasteurizacion", roleSchema);
