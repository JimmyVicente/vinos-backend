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
      botella: { type: Schema.Types.ObjectId, ref: "botella" },
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
