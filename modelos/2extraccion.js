const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  tipo: {
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

module.exports = model("extraccion", roleSchema);
