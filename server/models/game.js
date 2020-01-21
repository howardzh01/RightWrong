const mongoose = require("mongoose");

//define a game schema for the database
const GameSchema = new mongoose.Schema({
  game_name: String,
  writer: String, // links to the _id of a players 
  content: [mongoose.Schema.ObjectId],
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
