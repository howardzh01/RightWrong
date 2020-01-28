import React, { Component } from "react";
import { get } from "../../utilities";
import { navigate } from "@reach/router";

import "./JoinGame.css";


class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputText: '',
    };
  }

  componentDidMount() {
    document.title = "Join!!!"; 
  }

  handleInputChange = (event) =>{
    const value  =event.target.value;
    this.setState({
      inputText: value
    });
  }

  submitGameRequest = () => {
    const query = {creator_name: this.state.inputText};
    //need to handle invalid inputs with failed promise
    get("/api/joinGame", query).then((game_id) => {
        this.props.setGame(game_id);
        navigate(`/Game/${game_id}`);
    })
    this.setState({
      inputText: ""
    });
  };

  render() {
    return (
        <>  
          <div className = 'subtitle'> Join Game </div>
          <div className = 'centeredText'>   
          <div> Enter Name of Who You Want to Play With</div>
          <div>
          <input
          type="text"
          className="css-input"
          value={this.state.inputText} 
          onChange={this.handleInputChange}
          />  
          <button type="submit" onClick={this.submitGameRequest} className = 'myButton'>Submit</button>
          </div>
          </div>
        </>
    );
  }
}

export default JoinGame;
