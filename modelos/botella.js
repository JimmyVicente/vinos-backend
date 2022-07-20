const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
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
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = model("botella", roleSchema);
