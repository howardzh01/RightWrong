import React, { Component } from "react";
import { get, post } from "../../utilities";
import Judge from "../modules/Judge.js"
import Player from "../modules/Player.js"


import "./CreateGame.css";
import { socket } from "../../client-socket";
import Leaderboard from "../modules/Leaderboard";


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      game: {},
      round_number: undefined,
      isJudge: undefined,
      total_rounds: undefined,
    };
  }

  componentDidMount() {
    
    document.title = "Game";
    console.log('remounteD?')
    get('/api/gameObject', {game_id: this.props.game_id}).then((game) => {
      this.setState({game: game});
    });
    get('/api/isJudge', {game_id: this.props.game_id}).then((obj) => {
      this.setState({isJudge: obj.isJudge});
      // if(this.state.isJudge) {
      //   post('/api/startRound', {game_id: this.props.game_id})
      // }
    });
    
  socket.on('roundOver', () =>{
    this.nextRound();
    // window.location.replace("/game/" + this.props.game_id)
    // navigate(`/Game/${this.props.game_id}`);
  })
  socket.on('updateRoundNumber', (round_number) =>{
    this.setState({round_number: round_number});
  })
  socket.on('totalRounds', (total_rounds) =>{
    this.setState({total_rounds: total_rounds})
  })
}

nextRound = () => {
    get('/api/isJudge', {game_id: this.props.game_id}).then((obj) => {
      this.setState({isJudge: obj.isJudge});
    })
    get('/api/gameObject', {game_id: this.props.game_id}).then((game) => {
    this.setState({game: game});
    })


    // if(this.state.isJudge) {
    //   post('/api/startRound', {game_id: this.props.game_id})
    // }
};

  componentWillUnmount(){
    socket.removeAllListeners();
  }

  generateUserIdMap = () =>{
    if (!this.state.game || !this.state.game.users){
      return {};
    }
    let userIdMap = {}
    this.state.game.users.map((user) => userIdMap[user._id] = user.name)
    return userIdMap
  }
  //how/where will we check when round.active == false?

  updateRoundNumber = (round_number) =>{
    // this.setState({round_number: round_number})
  }
  render() {
    if (!this.state.game || this.state.isJudge === undefined) {
      return <div>loading</div>
    }
    // else if (!this.state.game.active){
    //   return (
    //     <> 
    //        Game Over
    //     </>)   
    // }
    else if(this.state.round_number > this.state.game.total_rounds)
    {
      return(<><div className = 'subtitle'>
      Game Over
      </div>
      </>)
    }
    else if (this.state.isJudge)
      {
        //render starter page
        return (
          <>

          <div className = 'subtitle'> You are the judge of game {this.state.game.gameId}</div>
          <div>We are on round {this.state.round_number} of {this.state.game.total_rounds}</div>
          {this.state.game.users && <div>You are playing with {this.state.game.users.map((user) => (<div key = {user._id}> {user.name} </div>))}</div>}
          <Judge game_id = {this.props.game_id} userMap = {this.generateUserIdMap()} ></Judge>
          </>
        )
      }
    //screen for the players
    return (
      <> 
        <div className = 'subtitle'> You are playing the game {this.state.game.gameId}</div>
        {this.state.total_rounds && <div>We are on round {this.state.round_number} of {this.state.total_rounds}</div>}
        {this.state.game.users && <div>Players include: {this.state.game.users.map((user) => (<div key = {user._id}> {user.name} </div>))}</div>}
        {!this.state.game.can_join && <Leaderboard userMap = {this.generateUserIdMap()}> </Leaderboard>}
        {<Player game_id = {this.props.game_id} userMap = {this.generateUserIdMap()}></Player>}

      </>
        
    );
  }
}

export default Game;
