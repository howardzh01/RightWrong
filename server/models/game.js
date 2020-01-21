const mongoose = require("mongoose");

//define a game schema for the database
const GameSchema = new mongoose.Schema({
  game_name: String,
  creator_name: String, // links to the name of player
  creator_id: mongoose.Schema.ObjectId,
  content: [mongoose.Schema.ObjectId],
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
