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
      leaderboard: {},
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
  socket.on('leaderboard', (leaderboard) =>{
    this.setState({leaderboard: leaderboard});
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
    // const leaderboard = (<Leaderboard userMap = {this.generateUserIdMap()}> </Leaderboard>)
    if (!this.state.game || this.state.isJudge === undefined) {
      return <div>loading</div>
    }
    else if(this.state.round_number > this.state.game.total_rounds)
    {
      if (this.state.isJudge){
        post('/api/gameOver', {game_id: this.props.game_id})
      }
      return(<><div className = 'subtitle'>
      Game Over
      </div>
      {this.state.leaderboard !== 0 && (<div id = "playerBorderDemo" className = "centeredText">
        {Object.keys(this.state.leaderboard).map((userId) => (<div key = {userId}> {this.generateUserIdMap()[userId]}: {this.state.leaderboard[userId]}</div>))}
        </div>)}
      </>)
    }
    else if (this.state.isJudge)
      {
        //render starter page
        return (
          <>

          <div className = 'subtitle'> You are the judge of round {this.state.round_number} of {this.state.game.total_rounds}</div>
          {/* <div>We are on round {this.state.round_number} of {this.state.game.total_rounds}</div> */}
          {this.state.game.users && Object.keys(this.state.leaderboard).length === 0 && (<div id = "judgeBorderDemo" className = "centeredText">
          <div>Players include: {this.state.game.users.map((user) => (<div key = {user._id}> {user.name} </div>))}</div>}
          </div>)}
          {this.state.leaderboard !== 0 && (<div id = "judgeBorderDemo" className = "centeredText">
          {Object.keys(this.state.leaderboard).map((userId) => (<div key = {userId}> {this.generateUserIdMap()[userId]}: {this.state.leaderboard[userId]}</div>))}
          </div>)}
          <Judge game_id = {this.props.game_id} userMap = {this.generateUserIdMap()} ></Judge>
          </>
        )
      }
    //screen for the players
    return (
      <> 
        {!this.state.total_rounds && <div className = 'subtitle'> This Round You are a Player. Waiting for Judge ...</div>}
        {this.state.total_rounds && <div className = 'subtitle'> You are playing round {this.state.round_number} of {this.state.total_rounds}</div>}
        {this.state.game.users && Object.keys(this.state.leaderboard).length <=1 && (<div id = "playerBorderDemo" className = "centeredText">
        <div>Players include: {this.state.game.users.map((user) => (<div key = {user._id}> {user.name} </div>))}</div>
        </div>)}
        {Object.keys(this.state.leaderboard).length >1 && (<div id = "playerBorderDemo" className = "centeredText">
        {Object.keys(this.state.leaderboard).map((userId) => (<div key = {userId}> {this.generateUserIdMap()[userId]}: {this.state.leaderboard[userId]}</div>))}
        </div>)}
        {<Player game_id = {this.props.game_id} userMap = {this.generateUserIdMap()}></Player>}

      </>
        
    );
  }
}

export default Game;
