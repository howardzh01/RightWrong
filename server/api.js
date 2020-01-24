/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Game = require("./models/game");
const Sentence = require("./models/sentence");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case

router.get("/user", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send(user);
  });
});

// router.get('/gamesOfUsers', auth.ensureLoggedIn, (req, res) => {
//   // Game.find({})

// })

router.get('/joinGame', auth.ensureLoggedIn, (req, res) => {
  Game.findOne({creator_name: req.query.creator_name}).then((game) => {
      game.players.concat([req.user._id])
      res.send(game._id)
    
    }) 
})

router.post('/newgame', auth.ensureLoggedIn, (req, res) => {
  const newGame = new Game({
    game_name: req.body.game_name,
    creator_name: req.user.name,
    players: [req.user._id],
    creator_id: req.user._id,
    content: [],
  });

  newGame.save().then((game) => res.send(game._id));
});

// require game_id and content
router.post('/sentences', auth.ensureLoggedIn, (req, res) => {
  const newSentence = new Sentence({
    game_id: req.body.game_id,
    writer: req.user._id,
    content: req.body.content
  }) 
  newSentence.save().then((sentence) => res.send(sentence));
})

router.get('/getSentence', auth.ensureLoggedIn, (req, res) => {
  Sentence.find({game_id: req.query.game_id})
    .populate("writer")
    .then((sentences) => {
      console.log(sentences)
    res.send(sentences) //return lists of Sentence objects
  });
})

// router.get('/writerName', auth.ensureLoggedIn, (req, res) => {
//   Sentence
// })

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
