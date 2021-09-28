const { Schema, model } = require("mongoose");

const serverSchema = new Schema(
  {
    serverName: { type: String, required: true },
    serverIP: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Server", serverSchema);
