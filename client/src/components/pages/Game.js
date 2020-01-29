import React, { Component } from "react";
import { get, post } from "../../utilities";
import Judge from "../modules/Judge.js"
import Player from "../modules/Player.js"


import "./CreateGame.css";
import { socket } from "../../client-socket";


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      game: {},
      round_number: 0,
      isJudge: undefined,
    };
  }

  componentDidMount() {
    
    document.title = "Game";
    this.setState({round_number: this.state.round_number +1});
    get('/api/gameObject', {game_id: this.props.game_id}).then((game) => {
      this.setState({game: game});
    })
    get('/api/isJudge', {game_id: this.props.game_id}).then((obj) => {
      this.setState({isJudge: obj.isJudge});
      // if(this.state.isJudge) {
      //   post('/api/startRound', {game_id: this.props.game_id})
      // }
  });
}

  componentWillUnmount(){
    socket.removeAllListeners();
  }

  generateUserIdMap = () =>{
    let userIdMap = {}
    this.state.game.users.map((user) => userIdMap[user._id] = user.name)
    return userIdMap
  }
  //how/where will we check when round.active == false?

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

    else if (this.state.isJudge)
      {
        //render starter page
        return (
          <>
          
          <div className = 'subtitle'> You are the judge of game {this.state.game.gameId}</div>
          <div>The number of rounds is {this.state.round_number}</div>
          {this.state.game.users && <div>You are playing with {this.state.game.users.map((user) => (<div key = {user._id}> {user.name} </div>))}</div>}
          <Judge game_id = {this.props.game_id} userMap = {this.generateUserIdMap()} judge = {this.props.userId} round_number = {this.state.round_number} ></Judge>
          </>
        )
      }
    //screen for the players
    return (
      <> 
        <div className = 'subtitle'> You are playing the game {this.state.game.gameId}</div>
        <div>The number of rounds is {this.state.round_number}</div>
        <div>You are playing with {this.state.game.users.map((user) => (<div key = {user._id}> {user.name} </div>))}</div>
        {<Player game_id = {this.props.game_id} userMap = {this.generateUserIdMap()}  judge = {this.props.userId} round_number = {this.state.round_number}></Player>}

      </>
        
    );
  }
}

export default Game;
