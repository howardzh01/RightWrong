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
const Round = require("./models/rounds");

const gameObject = require("./gameObject");

// new gameObject()


// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

const gameCodeToGameMap = {};

// gameCodeToGameMap[gameCode] = gameObject;
// delete gameCodeToGameMap[gameCode]


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
  if (req.user) {
    socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
    // 
  }
  res.send({});
});

router.post('/joinGame', auth.ensureLoggedIn, (req, res) => {
  const userSocket = socket.getSocketFromUserID(req.user._id);
  if (req.query.roomId in gameCodeToGameMap){
    userSocket.join(req.query.roomId); //asdf = roomnumber
    userSocket.emit('room', 'I joined the game'); 
  }
  
  
//   socket.on('connect', function() {
//     // Connected, let's sign-up for to receive messages for this room
//     socket.getSocketFromUserID(req.user._id).emit('room', req.roomId);
//     res.send(req.user)
//  });
})

router.post('/createGame', auth.ensureLoggedIn, (req, res) => {
  const userSocket = socket.getSocketFromUserID(req.user._id);
  userSocket.join(req.query.roomId);
  userSocket.emit("room", req.query.roomId);
  gameCodeToGameMap[req.query.roomId] = new gameObject(req.query.roomId);
  gameCodeToGameMap[req.query.roomId].users.push(req.user);
  // console.log(gameCodeToGameMap[req.query.roomId])
  res.send(gameCodeToGameMap[req.query.roomId])
})

// setTimeout(() => {
//   // run after 5s
// }, 5000);

router.get("/activeUsers", (req, res) => {
  if (req.user) res.send({ activeUsers: socket.getAllConnectedUsers() });
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


router.get('/getGame', auth.ensureLoggedIn, (req, res) => {
  Game.findById({id: req.game_id}).then(res.send(game));
})

router.post('/newgame', auth.ensureLoggedIn, (req, res) => {
  const newGame = new Game({
    game_name: req.body.game_name,
    creator_name: req.user.name,
    can_join: true,
    round_number: 1, 
    total_rounds: 1,
    players: [req.user._id],
    creator_id: req.user._id,
    content: [],
    rounds: [],
    active: true, 
  });

  newGame.save().then((game) => res.send(game));
});
// require game_id and number_of_rounds
router.post('/disableJoin', auth.ensureLoggedIn, (req, res) => {
  Game.findById({id: req.body.game_id}).then((game) => {
    game.can_join = false;
    game.total_rounds = req.body.number_of_rounds
  })
});

// require game_id, judge, intro_line, round_number
router.post('/startRound', auth.ensureLoggedIn, (req, res) => {
  Game.findById({id: req.body.game_id}).then((game) => {
    const newRound = new Round({
      game_id: req.body.game_id,
      judge: req.body.judge, //consider changing this to find judge based on round number
      intro_line: req.body.intro_line,
      active: true,
      round_number: req.body.round_number
    })
    console.log('accessed api server')
    game.rounds.push(newRound);
    newRound.save().then((round) => res.send(round));
  })
})


router.post('/finishRound', auth.ensureLoggedIn, (req, res) => {
  Round.findById({id: req.body.round_id}).then((round) => {
    round.winner_sentence = req.body.sentence;
    round.active = false;
    Game.findById({id: req.body.game_id}).then((game) => {
      if (round.round_number === game.round_number){
        game.active = false;
      }
      res.send(game)
    })
    
    //need to update leaderboard somehow
  })
})

// require game_id and content
router.post('/submitSentence', auth.ensureLoggedIn, (req, res) => {
  const newSentence = new Sentence({
    game_id: req.body.game_id,
    round_id: req.body.round_id,
    writer: req.user._id,
    content: req.body.content
  }) 
  Round.findById(req.body.round_id).then((round) =>{
    round.content.push(newSentence);
  })
  newSentence.save().then((sentence) => res.send(sentence));
})

router.get('/getSentence', auth.ensureLoggedIn, (req, res) => {
  Sentence.find({game_id: req.query.game_id})
    .populate("writer")
    .then((sentences) => {
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
