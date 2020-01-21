const mongoose = require("mongoose");

//define a game schema for the database
const SentenceSchema = new mongoose.Schema({
  game_id: mongoose.Schema.ObjectId, //links to _id of games
  writer: mongoose.Schema.ObjectId, // links to the _id of a player
  content: String,
});

// compile model from schema
module.exports = mongoose.model("sentence", SentenceSchema);
