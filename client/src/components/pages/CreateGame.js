import React, { Component } from "react";
import { get, post } from "../../utilities";
import { Redirect } from "react-router-dom";

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
      window.location.replace("/Game");
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
        <h1> Create Game</h1>
        Type name of the game  
        <div> 
            <input
                type="text"
                value={this.state.inputText}
                onChange={this.handleInputChange}
            />  
            <button type="submit" onClick={this.addNewGame}>Submit</button>
          </div>
      </>
        
    );
  }
}

export default CreateGame;
