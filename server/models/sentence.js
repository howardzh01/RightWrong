const mongoose = require("mongoose");

//define a game schema for the database
const SentenceSchema = new mongoose.Schema({
  game_id: mongoose.Schema.ObjectId,
  round_id: mongoose.Schema.ObjectId,  //links to _id of games
  writer: { type: mongoose.Schema.ObjectId, ref: "user" }, // links to the _id of a player
  content: String,
});

// compile model from schema
module.exports = mongoose.model("sentence", SentenceSchema);
