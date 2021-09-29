const { Schema, model } = require("mongoose");

const serverSchema = new Schema(
  {
    discordId: { type: String, required: true },
    serverName: { type: String, default: null },
    serverIP: [{ type: String, default: null }],
    version: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Server", serverSchema);
