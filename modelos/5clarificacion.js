const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  turbidez: {
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

module.exports = model("clarificacion", roleSchema);
