import React, { Component } from "react";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";
import { socket } from "../../client-socket.js";


import "./CreateGame.css";

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game_id: this.generateGameId(),
      game: undefined,
      rounds: undefined,
      joined_users: [],
    };
  }

  generateGameId = () => {
    let game_id = Math.floor((Math.random() * 1000))
    return game_id
  }
  

  componentDidMount() {
    document.title = "Game";
    if(this.props.userId){
      // console.log(this.state.game_id)
      post("/api/createGame", {game_id: this.state.game_id}).then((game) => {
        this.setState({game: game});
      })
    }
    
    socket.on('yo', (users) => {
      // do stuff
      this.setState({joined_users: users});
    })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(this.props.userId !== prevProps.userId) {

  //   }
  // }



  startGame = (event) => {
    console.log(this.props.userId)
    if(this.props.userId)
    {
      post("/api/updateGameInfo", {game_id: this.state.game_id, rounds: this.state.rounds}).then((game) => {
        this.props.setGame(this.state.game_id);
        this.setState({game: game});
        navigate(`/Game/${this.state.game_id}`);
      });
    } 
  }

  handleRoundInput = (event) =>{
    this.setState({
      rounds: event.target.value,
    });
  }
  

  render() {

    return (
      <> 
        <div className = "subtitle">
          Your Game ID: {this.state.game_id}
        </div>
        <div>

        </div>
        <div className="centeredText">
          How many rounds do you want to play?
        {/* <div className = "centeredText"> Number of players: {this.state.game.players.length}</div> */}
        </div>
        <div className="centeredText">
          <input
              type="number"
              className="css-input"
              onChange={this.handleRoundInput}   
            /> 
            <div className="centeredText">
              <div type="submit" onClick={this.startGame} className = "inputbutton">
                <a href="#">play!</a>
              </div> 
            </div>
        </div>
      </>
        
    );
  }
}

export default CreateGame;
