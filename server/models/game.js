const mongoose = require("mongoose");

//define a game schema for the database
const GameSchema = new mongoose.Schema({
  game_name: String,
  creator_name: String, // links to the name of player
  can_join: Boolean,
  total_rounds: Number,
  players: [mongoose.Schema.ObjectId],
  creator_id: mongoose.Schema.ObjectId,
  rounds: [mongoose.Schema.ObjectId],
  active: Boolean,
  // points: mongoose.Schema.Integer,


});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
