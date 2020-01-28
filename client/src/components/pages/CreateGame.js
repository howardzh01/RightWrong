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
      rounds: 0,
      joinedUsers: [],
    };
  }

  generateGameId = () => {
    let game_id = Math.floor((Math.random() * 1000))
    return game_id
  }
  

  componentDidMount() {
    document.title = "Game";
    console.log("create game mounted");
    socket.on("room", (roomId) => {
      // do stuff
      console.log(roomId);
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
      post("/api/createGame", {roomId: 'asdf'}).then((game) => {
        console.log('hello')
        console.log(game)
        this.state.joinedUsers.push(this.props.userId); 
        this.props.setGame(game);
        this.setState({game: game, total_rounds: this.state.rounds, can_join: false});
        navigate(`/Game/${this.state.game_id}`);
      });
    } 
  }

  handleRoundInput = (event) =>{
    console.log(this.state.rounds)
    this.setState({
      rounds: event.target.value,
    });
  }
  

  render() {

    return (
      <> 

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
