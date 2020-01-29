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
    
    socket.on('displayUsers', (users) => {
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
          The game id is {this.state.game_id}
        </div>
        <div>
          {this.state.joined_users.map((user) => (<div key = {user._id}> {user.name} </div>))}
        </div>
        <div>
          Enter the number of rounds
        </div>
        {/* <div className = "centeredText"> Number of players: {this.state.game.players.length}</div> */}
        <input
            type="number"
            className="css-input"
            onChange={this.handleRoundInput}   
          /> 
          <button type="submit" onClick={this.startGame} className = "myButton">Submit</button> 
      </>
        
    );
  }
}

export default CreateGame;
