const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  materia_prima: {
    type: Schema.Types.ObjectId,
    ref: "materia_prima",
  },
  extraccion: {
    type: Schema.Types.ObjectId,
    ref: "extraccion",
  },
  pasteurizacion: {
    type: Schema.Types.ObjectId,
    ref: "pasteurizacion",
  },
  fermentacion: {
    type: Schema.Types.ObjectId,
    ref: "fermentacion",
  },
  clarificacion: {
    type: Schema.Types.ObjectId,
    ref: "clarificacion",
  },
  trasiego: {
    type: Schema.Types.ObjectId,
    ref: "trasiego",
  },
  envasado: {
    type: Schema.Types.ObjectId,
    ref: "envasado",
  },
  aprobado: {
    type: Boolean,
    default: false,
  },
  hash: {
    type: String,
    trim: true
  },
},
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = model("proceso", roleSchema);
