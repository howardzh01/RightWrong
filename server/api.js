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
  
  
//   socket.on('connect', function() {
//     // Connected, let's sign-up for to receive messages for this room
//     socket.getSocketFromUserID(req.user._id).emit('room', req.roomId);
//     res.send(req.user)
//  });


router.post('/createGame', auth.ensureLoggedIn, (req, res) => {
  const userSocket = socket.getSocketFromUserID(req.user._id);
  userSocket.join(req.body.game_id);
  // userSocket.emit("room", req.body.game_id);
  new_game = new gameObject(req.body.game_id);
  gameCodeToGameMap[req.body.game_id] = new_game;
  new_game.users.push(req.user);
  socket.getIo().in(req.body.game_id).emit('displayUsers', gameCodeToGameMap[req.body.game_id].users);
  res.send(new_game)
})

router.post('/joinGame', auth.ensureLoggedIn, (req, res) => {
  const userSocket = socket.getSocketFromUserID(req.user._id);
  if (req.body.game_id in gameCodeToGameMap && gameCodeToGameMap[req.body.game_id].can_join){
    gameCodeToGameMap[req.body.game_id].users.push(req.user);
    userSocket.join(req.body.game_id); //asdf = roomnumber
    // userSocket.emit(req.body.game_id, 'yo whats yo', req.user);
    socket.getIo().in(req.body.game_id).emit('displayUsers', gameCodeToGameMap[req.body.game_id].users);
    res.send({id:req.body.game_id}); 
  }
  else{
    res.send({id:""});
  }

});

router.post('/updateGameInfo', auth.ensureLoggedIn, (req, res) => {
  gameObj = gameCodeToGameMap[req.body.game_id]
  gameObj.can_join = false;
  gameObj.total_rounds = req.body.rounds
  gameObj.initializeLeaderBoard();

  socket.getIo().in(req.body.game_id).emit('totalRounds', req.body.rounds);
  res.send(gameObj)
})

router.get('/gameObject', auth.ensureLoggedIn, (req, res) => {
  res.send(gameCodeToGameMap[req.query.game_id])
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

router.get('/isJudge', auth.ensureLoggedIn, (req, res) => {
  gameObj = gameCodeToGameMap[req.query.game_id]
  if(gameObj.isJudge(req.user)){
    socket.getIo().in(req.body.game_id).emit('judge', req.user.name)
  }
  res.send({isJudge: gameObj.isJudge(req.user)});

})

router.post('/startRound', auth.ensureLoggedIn, (req, res) => {
  gameObj = gameCodeToGameMap[req.body.game_id]
  gameObj.addNewRound()
  // console.log('after', gameObj)
  // console.log(gameObj.rounds.length)
  socket.getIo().in(req.body.game_id).emit('leaderboard', gameObj.usersToScore)
  socket.getIo().in(req.body.game_id).emit('updateRoundNumber', gameObj.rounds.length)
  res.send({});
})

router.post('/updateIntroSentence', auth.ensureLoggedIn, (req, res) => {
  gameObj = gameCodeToGameMap[req.body.game_id]
  gameObj.updateRoundIntro(req.body.intro)
  socket.getIo().in(req.body.game_id).emit('getIntro', req.body.intro);
  console.log('socket submitted')
  res.send({});
})

router.post('/updateWinner', auth.ensureLoggedIn, (req, res) => {
  console.log(req.user.name, 'called updated winner')
  gameObj = gameCodeToGameMap[req.body.game_id]
  gameObj.getCurrentRound().winner_userId = req.body.winner_id
  gameObj.usersToScore[req.body.winner_id] +=1 
  socket.getIo().in(req.body.game_id).emit('leaderboard', gameObj.usersToScore)
  socket.getIo().in(req.body.game_id).emit('revealWinner', req.body.winner_name)
  // console.log(gameObj.getCurrentRound())
  res.send({});
})

router.post('/endRound', auth.ensureLoggedIn, (req, res) => {
  gameObj = gameCodeToGameMap[req.body.game_id]
  // gameObject.rounds[gameObject.length - 1].is_active = false
  socket.getIo().in(req.body.game_id).emit('roundOver', {});
  res.send({});
})


// require game_id and content
router.post('/submitSentence', auth.ensureLoggedIn, (req, res) => {
  gameObj = gameCodeToGameMap[req.body.game_id];
  gameObj.getCurrentRound().mapUserToSentence[req.user._id] = req.body.sentence;
  socket.getIo().in(req.body.game_id).emit('displaySentences', gameObj.getCurrentRound().mapUserToSentence);
  res.send({})
})
//will write to mongoDB
router.post('/gameOver', auth.ensureLoggedIn, (req, res) => {
  gameObj = gameCodeToGameMap[req.body.game_id];
  const game = new Game({
    creator_name: gameObj.users[0].name,
    total_rounds: gameObj.total_rounds,
    users: gameObj.users.map((user) => user._id),
    rounds: gameObj.rounds.slice(0, -1),
    usersToScore: gameObj.usersToScore,
    userIdMap: gameObj.mapUserIdToUser,
  })
  console.log('gameSaved')
  game.save().then(res.send({}))
  
})

router.get('/displayGames', auth.ensureLoggedIn, (req, res)=> {
  Game.find({users: req.user._id}).then((games) =>{
    // Game.find({}).then((gam) => {console.log(gam)})
    res.send(games);
  });

})

// router.get('/getSentence', auth.ensureLoggedIn, (req, res) => {
//   Sentence.find({game_id: req.query.game_id})
//     .populate("writer")
//     .then((sentences) => {
//     res.send(sentences) //return lists of Sentence objects
//   });
// })

// router.get('/writerName', auth.ensureLoggedIn, (req, res) => {
//   Sentence
// })

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
