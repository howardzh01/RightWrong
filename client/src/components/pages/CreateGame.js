import React, { Component } from "react";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";


import "./CreateGame.css";

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      game: undefined,
      rounds: 0,
    };
  }

  componentDidMount() {
    document.title = "Game";
  }

  addNewGame = (gameObj) => {
    const body = {game_name: this.state.inputText};
    post("/api/newgame", body).then((game) => { 
      this.props.setGame(game);
      this.setState({game: game});
    });
    this.setState({inputText: ''});
  }

  handleInputChange = (event) =>{
    const value  =event.target.value;
    this.setState({
      inputText: value
    });
  }

  startGame = (event) => {
    this.state.game.total_rounds = this.state.rounds;
    this.state.game.can_join = false;
    navigate(`/Game/${this.state.game._id}`);
  }

  handleRoundInput = (event) =>{
    this.setState({
      rounds: event.target.value,
    });
  }
  

  render() {
    if(this.state.game !== undefined) {
      return(
        <>
      <div className = "subtitle"> {this.state.game.game_name}</div>
      <div className = "centeredText"> Number of players: {this.state.game.players.length}</div>
      <input
          type="number"
          className="css-input"
          onChange={this.handleRoundInput}   
        /> 
        <button type="submit" onClick={this.startGame} className = "myButton">Submit</button> 
      </>
      )
    }

    return (
      <> 
        <div className = 'subtitle' > Create Game </div>
        <div className = 'centeredText'>
        <div> Enter game title  </div>
        <div> 
        <input
          type="text"
          className="css-input"
          onChange={this.handleInputChange}   
        /> 
        <button type="submit" onClick={this.addNewGame} className = "myButton">Submit</button> 
        </div>
        </div>
      </>
        
    );
  }
}

export default CreateGame;
