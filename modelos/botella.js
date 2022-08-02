const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  id_proceso: {
    type: String,
    required: true,
  },
  nro_botella: {
    type: Number,
    required: true,
  },
  estados: [
    {
      fecha: {
        type: Date,
        required: true,
        trim: true,
      },
      estado: {
        type: String,
        required: true,
      },
      billetera: {
        type: String,
        required: true,
      },
    }
  ],
},
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = model("botella", roleSchema);
