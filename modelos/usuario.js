const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  billetera: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  rol: {
    type: Number,
    required: true,
  },
  permisos: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = model("usuario", roleSchema);
