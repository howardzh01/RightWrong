const mongoose = require("mongoose");

//define a game schema for the database
const GameSchema = new mongoose.Schema({
  creator_name: String, // links to the name of player
  total_rounds: Number,
  users: [mongoose.Schema.ObjectId],
  rounds: [],
  usersToScore: {},
  userIdMap: {},


});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
