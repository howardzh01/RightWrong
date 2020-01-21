import React, { Component } from "react";
import { get, post } from "../../utilities";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputText: "",
    };

  }

  componentDidMount() {
    document.title = "Game";


  }

  handleInputChange = (event) =>{
    const value  =event.target.value;
    this.setState({
      inputText: value
    });
  }

  submitSentence = () => {
    const body = {game_id: this.props.game_id, content: this.state.inputText}; //gameid is undefined for some reason
    post("/api/sentences", body);
    this.setState({
      inputText: ""
    });
  };

  render() {
    return (
      <> 
        <div>

        </div>
        <div>
            {this.props.game_id}
            Submit Sentence
        </div>
        <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
        />  
        <button type="submit" onClick={this.submitSentence}>Submit</button>

      </>
        
    );
  }
}

export default Game;
