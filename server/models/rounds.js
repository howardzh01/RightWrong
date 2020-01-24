const mongoose = require("mongoose");

//define a game schema for the database
const RoundSchema = new mongoose.Schema({
  game_id: mongoose.Schema.ObjectId, // links to the name of player
  judge: mongoose.Schema.ObjectId,
  intro_line: String,
  content: [mongoose.Schema.ObjectId], //list of sentences
  winner_sentence: mongoose.Schema.ObjectId,
  active: Boolean,
  round_number: Number,
});

// compile model from schema
module.exports = mongoose.model("round", RoundSchema);
