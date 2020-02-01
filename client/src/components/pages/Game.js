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
      users: [],
      next_round: 0,
      hard_refresh: false
    };
  }

  componentDidMount() {
    
    document.title = "Game";
    console.log('remounteD?')
    if (window.performance && performance.navigation.type == 1) {
      get('/api/gameObject', {game_id: this.props.game_id}).then((game) => {
        let current_round = game.rounds[game.rounds.length-1]
        this.setState({game: game, users: game.users, total_rounds: game.total_rounds, 
          round_number: game.rounds.length, leaderboard: game.usersToScore, 
        });
        get('/api/whoami').then((user)=>{
          this.setState({isJudge: current_round.judge._id === user._id})

        console.log('is judge', current_round.judge._id, user._id)
        })
      });
      this.setState({hard_refresh: true})
      
      this.setState({next_round: this.state.next_round+1})
    }
    else{
      get('/api/gameObject', {game_id: this.props.game_id}).then((game) => {
        this.setState({game: game, users: game.users, total_rounds: game.total_rounds});
  
      });
      get('/api/isJudge', {game_id: this.props.game_id}).then((obj) => {
        this.setState({isJudge: obj.isJudge});
      });
    }
  socket.on('roundOver', () =>{
    console.log('roundOver')
    this.nextRound();
  })
  socket.on('updateRoundNumber', (round_number) =>{
    console.log('updated round number', round_number)
    this.setState({round_number: round_number});
  })
  socket.on('totalRounds', (total_rounds) =>{
    this.setState({total_rounds: total_rounds})
  })
  socket.on('leaderboard', (leaderboard) =>{
    this.setState({leaderboard: leaderboard});
    console.log(this.state.leaderboard);
})
  socket.on('displayUsers', (users) =>{
    this.setState({users: users});
  })
}

nextRound = () => {
    this.setState({hard_refresh: false})
    get('/api/isJudge', {game_id: this.props.game_id}).then((obj) => {
      console.log('is judge', obj.isJudge)
      console.log('nextnow', obj.isJudge, this.state.isJudge)
      if(!obj.isJudge && !this.state.isJudge){ 
        console.log('reload')
        this.setState({next_round: this.state.next_round+1})
      }
      else{
        console.log('reload to judge')
        this.setState({isJudge: obj.isJudge});
      }
    })
    get('/api/gameObject', {game_id: this.props.game_id}).then((game) => {
    this.setState({game: game});
    })
};

  componentWillUnmount(){
    socket.removeAllListeners();
  }

  generateUserIdMap = () =>{
    if (!this.state.game || !this.state.game.users){
      return {};
    }
    let userIdMap = {}
    this.state.users.map((user) => userIdMap[user._id] = user.name)
    return userIdMap
  }



  render() {
    // const leaderboard = (<Leaderboard userMap = {this.generateUserIdMap()}> </Leaderboard>)
    if (!this.state.game || this.state.isJudge === undefined) {
      return <div>loading</div>
    }
    else if(this.state.round_number > this.state.total_rounds)
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

          <div className = 'subtitle'> You are the judge of round {this.state.round_number} of {this.state.total_rounds}</div>
          {/* <div>We are on round {this.state.round_number} of {this.state.game.total_rounds}</div> */}
          {this.state.users && Object.keys(this.state.leaderboard).length === 0 && (<div id = "judgeBorderDemo" className = "centeredText">
          <div>Players include: {this.state.users.map((user) => (<div key = {user._id}> {user.name} </div>))}</div>}
          </div>)}
          {this.state.leaderboard !== 0 && (<div id = "judgeBorderDemo" className = "centeredText">
          {Object.keys(this.state.leaderboard).map((userId) => (<div key = {userId}> {this.generateUserIdMap()[userId]}: {this.state.leaderboard[userId]}</div>))}
          </div>)}
          <Judge game_id = {this.props.game_id} hard_refresh = {this.state.hard_refresh} userMap = {this.generateUserIdMap()} ></Judge>
          </>
        )
      }
    //screen for the players
    return (
      <> 
        <span key = {this.state.next_round}>
        {!this.state.total_rounds && <div className = 'subtitle'> This Round You are a Player. Waiting for Judge ...</div>}
        {this.state.total_rounds && <div className = 'subtitle'> You are playing round {this.state.round_number} of {this.state.total_rounds}</div>}
        {this.state.users && Object.keys(this.state.leaderboard).length <=1 && (<div id = "playerBorderDemo" className = "centeredText">
        <div>Players include: {this.state.users.map((user) => (<div key = {user._id}> {user.name} </div>))}</div>
        </div>)}
        {Object.keys(this.state.leaderboard).length >1 && (<div id = "playerBorderDemo" className = "centeredText">
        {Object.keys(this.state.leaderboard).map((userId) => (<div key = {userId}> {this.generateUserIdMap()[userId]}: {this.state.leaderboard[userId]}</div>))}
        </div>)}
        {<Player key = {this.state.next_round} game_id = {this.props.game_id} userMap = {this.generateUserIdMap()}></Player>}
        </span>
      </>
        
    );
  }
}

export default Game;
