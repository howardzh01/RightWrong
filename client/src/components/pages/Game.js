import React, { Component } from "react";
import { get, post } from "../../utilities";

import "./CreateGame.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputText: "",
        game_is_finished: false,
        sentence_arr: [],
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
    const body = {game_id: this.props.gameId, content: this.state.inputText}; //gameid is undefined for some reason when passing from APP prop
    post("/api/sentences", body).then(() => {
      this.setState({game_is_finished: true});
      const query = {game_id: this.props.gameId};
      get("/api/getSentence", query).then((sentence_arr) => {
        this.setState({sentence_arr: sentence_arr})
      })
    });
    this.setState({
      inputText: "",
    });
  };




  render() {
    if (this.state.game_is_finished){
      let sentenceList = null
      sentenceList = this.state.sentence_arr.map((sentence) => (<div> {sentence.writer.name} wrote {sentence.content}. </div>))
      // if(this.state.sentence_arr !== []) {
      //   sentenceList = this.state.sentence_arr.map((sentence) => (<div> {this.getUserName(sentence.writer)} wrote {sentence.content}. </div>))
        // let query = null;
        // sentenceList = this.state.sentence_arr.map((sentence) => get('/api/user', query = {userId: sentence.writer}).then((user) => (<div> {user.name} wrote {sentence.content}. </div>)))
      
      console.log(sentenceList);
      return (
        <> 
          {sentenceList}
          hello
        </>)
      
      
    }
    return (
      <> 
        <div className = 'subtitle'> </div>
        <div>
            
            Submit Sentence
        </div>
        <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
            className = "css-input"
        />  
        <button type="submit" onClick={this.submitSentence} className = "myButton">Submit</button>

      </>
        
    );
  }
}

export default Game;
