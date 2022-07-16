const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  nro_cosecha: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  lugar_procedencia: {
    type: String,
    required: true,
    trim: true
  },
  nombre_propietario: {
    type: String,
    required: true,
    trim: true
  },
  gadros_brix: {
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

module.exports = model("materia_prima", roleSchema);
