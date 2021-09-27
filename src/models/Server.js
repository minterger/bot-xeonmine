const { Schema, model } = require("mongoose");

const serverSchema = new Schema(
  {
    serverName: { type: String, required: true },
    serverIP: { type: String, required: true },
    port: { type: Number, default: 25565 },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Server", serverSchema);
