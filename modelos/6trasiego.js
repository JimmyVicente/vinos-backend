const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  liquido_claro: {
    type: String,
    required: true,
    trim: true
  },
  liquido_oscuro: {
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

module.exports = model("trasiego", roleSchema);
