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
      game: "",
      round_number: 1,
    };
  }

  componentDidMount() {
    
    document.title = "Game";
    get('/api/gameObject', {game_id: this.props.game_id}).then((game) => {
      this.setState({game: game});
    })


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

    // if (!this.state.game) {
    //   return <div>{this.state}</div>
    // }
    // else if (!this.state.game.active){
    //   return (
    //     <> 
    //        Game Over
    //     </>)   
    // }

    // else if (this.props.userId === this.props.game.players[0])
    //   {console.log(this.props)
    //     //render starter page
    //     return (
    //       <>
    //       <div>
    //         You are the judge.
    //       </div>
    //       <Judge game_id = {this.props.gameId} judge = {this.props.userId} round_number = {this.state.round_number} ></Judge>
    //       </>
    //     )
    //   }
    //screen for the players
    return (
      <> 
        <div className = 'subtitle'> You are playing the game</div>
        <div>{this.state.game_id}</div>
        {/* <Player game_id = {this.props.gameId} round = {this.getRound()}></Player> */}

      </>
        
    );
  }
}

export default Game;
