const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  nro_lote: {
    type: String,
    required: true,
    unique: true,
  },
  nro_botellas: {
    type: Number,
    required: true,
  },
  nro_botellas_especiales: {
    type: Number,
    required: true,
  },
  botellas: [
    {
      nro_botella: {
        type: Number,
        required: true,
      },
      hash_botella: {
        type: String,
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
        }
      ],
    },
  ],
  aprobado: {
    type: Boolean,
    default: false,
  },
},
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = model("envasado", roleSchema);
