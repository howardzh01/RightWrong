import React, { Component } from "react";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";
import { socket } from "../../client-socket.js";

import "./JoinGame.css";


class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputText: '',
    };
  }

  componentDidMount() {
    document.title = "Join Game!"; 
  }

  handleInputChange = (event) =>{
    const value  =event.target.value;
    this.setState({
      inputText: value
    });
  }

  submitGameRequest = () => {
    //need to handle invalid inputs with failed promise
    post("/api/joinGame", {game_id: this.state.inputText}).then((game_id) => {
        if(game_id.id ===  ""){
          this.setState({
            inputText: ""
          });
          alert("Invalid code!")
        } else {
          this.props.setGame(game_id.id);
          navigate(`/Game/${game_id.id}`);
        }
    })
    this.setState({
      inputText: ""
    });
  };

  render() {
    if (!this.props.userId){
      return(<div className = 'error'> Please login first</div>)
    }
    return (
        <> 
          <div className = 'joingame-subtitle'> Join Game </div>
          <div className = 'centeredText'>   
          <div> Enter the Game Code</div>
          <div>
          <input
          type="text"
          className="css-input"
          value={this.state.inputText} 
          onChange={this.handleInputChange}
          />  
          <div>
            <div onClick={this.submitGameRequest} className = "inputbutton">
              <a href="#">play!</a>
            </div>
          </div>
          </div>
          </div>
        </>
    );
  }
}

export default JoinGame;
