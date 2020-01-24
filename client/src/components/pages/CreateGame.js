import React, { Component } from "react";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";


import "./CreateGame.css";

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  componentDidMount() {
    document.title = "Game";
  }

  addNewGame = (gameObj) => {
    const body = {game_name: this.state.inputText};
    post("/api/newgame", body).then((game_id) => {
      this.props.setGame(game_id);
      navigate(`/Game/${game_id}`);
      // window.location.replace(`/Game/${game_id}`);
      // return <Redirect to={`/Game`} />
    });
    this.setState({inputText: ''});
  }

  handleInputChange = (event) =>{
    const value  =event.target.value;
    this.setState({
      inputText: value
    });
  }
  

  render() {
    return (
      <> 
        <div className = 'subtitle' > Create Game </div>
        <div className = 'centeredText'>
        <div> Enter game title  </div>
        <div> 
        <input
          type="text"
          className="css-input"
          value={this.state.inputText}
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
