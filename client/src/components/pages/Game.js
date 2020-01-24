import React, { Component } from "react";
import { get, post } from "../../utilities";
import Judge from "../modules/Judge.js"
import Player from "../modules/Player.js"

import "./CreateGame.css";


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      judge: this.props.game.players[0],
      round_number: 1,
    };
    // get('/getGame').then((game) => {
    //   this.state = {
    //     inputText: "",
    //     game_is_finished: false,
    //     judge: game.players[0],
    //     round_number: 1,
    //     game: game,
    //   };
    // });
  }

  componentDidMount() {
    document.title = "Game";


  }

  getRound = () => {
    if (this.props.game.rounds.length < this.state.round_number)
    {
      return undefined //this issue must be resolved with sockets as new round has not been created yet
    }
    else {
      return this.props.game.rounds[this.state.round_number-1]
    }
  }

  //how/where will we check when round.active == false?

  render() {
    if (!this.props.game.active){
      return (
        <> 
           Game Over
        </>)   
    }

    else if (this.props.userId === this.judge)
    {console.log(this.props)
      //render starter page
      return (
        <>
        <div>
          You are the judge.
        </div>
        <Judge game_id = {this.props.gameId} judge = {this.props.userId} round_number = {this.state.round_number} ></Judge>
        </>
      )
    }
    //screen for the players
    return (
      <> 
        <div className = 'subtitle'> You are playing the game</div>
        <Player game_id = {this.props.gameId} round = {this.getRound()}></Player>

      </>
        
    );
  }
}

export default Game;
