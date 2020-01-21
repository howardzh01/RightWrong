import React, { Component } from "react";
import { get, post } from "../../utilities";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputText: "",
        sentences: [],
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
    const body = {game_id: this.props.game_id}
    post("/api/sentences", body)
    const { sentences, inputText } = this.state;
    const newTodos = todos.concat([inputText]);
    this.setState({
      todos: newTodos,
      inputText: ""
    });
  };

  render() {
    return (
      <> 
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
