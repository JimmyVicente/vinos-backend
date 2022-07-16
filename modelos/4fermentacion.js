const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  fecha_inicio: {
    type: Date,
    required: true,
  },
  fecha_final: {
    type: Date,
    required: true,
  },
  grados_invertidos: {
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

module.exports = model("fermentacion", roleSchema);
