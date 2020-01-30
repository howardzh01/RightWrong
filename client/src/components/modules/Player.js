import React, { Component } from "react";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket.js";

import "./Judge.css";

/**
 * Player is a component that creates the intro for the round
 *
 * Proptypes
 * @param {string} game_id
 * @param {Object} round
 */
class Player extends Component {
    constructor(props) {
      super(props);
      this.state = {
        intro: undefined,
        inputText: "",
        submitted: false,
        sentenceMap: {},
        winner_name: undefined,
        judge_name: undefined,
        
      };
    }
  
    componentDidMount() {
      console.log('mount player')
      socket.on('getIntro', (intro) => {
        this.setState({intro: intro});
      })
      socket.on('displaySentences', (sentenceMap) => {
        this.setState({sentenceMap: sentenceMap});
      })
      socket.on('revealWinner', (winner_name) => {
        this.setState({winner_name: winner_name});
      })
      socket.on('judge', (judge) =>{
        this.setState({judge_name: judge});

      })
      // socket.on('roundOver', () =>{
      //   window.location.reload(true)
      //   // window.location.replace("/game/" + this.props.game_id)
      //   // navigate(`/Game/${this.props.game_id}`);
      // })
    }

    handleInputChange = (event) =>{
        const value  =event.target.value;
        this.setState({
          inputText: value
        });
      }
    
    submitSentence = () => {
    const body = {game_id: this.props.game_id, sentence: this.state.inputText}; 
    console.log(this.state.inputText)
    post("/api/submitSentence", body).then(() => {
        this.setState({inputText: "", submitted: true});
    });
    };

      
    render() {

      if(!this.state.intro) {
        return(<>
        <div className = 'centeredText'>Waiting for the judge to write the intro </div>
         </>)
      }

      else if(this.state.winner_name){
        return(<>
        <div className = 'subtitle' >Congrats <span className = 'orange-font'>{this.state.winner_name}</span></div>
        </>)

      }
      else if(this.state.submitted) {
          // let sentenceList = this.state.sentence_arr.map((sentence) => (<div> {sentence.writer.name} wrote {sentence.content}. </div>))
          return (<> 
          <div className = 'centeredText'> Waiting for the judge to decide winner </div>
          <hr></hr>
          <div className= 'prompt'>
            {this.state.intro}...
          </div>
          <div className = 'centeredText'>
            {Object.keys(this.state.sentenceMap).map((userId, index) => (<div key = {userId}> {index+1}. {this.props.userMap[userId]} wrote: <span className = 'response'>{this.state.intro} {this.state.sentenceMap[userId]}</span></div>))}
          </div>
          
          </>)

        }

        return (<> 
        <div className = 'centeredText'>Complete the sentence</div>
        <div className= 'prompt'>
            {this.state.intro}...
        </div>
        <div className = 'centeredText'>
        <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
            className = "css-input"
        />  
        <button type="submit" onClick={this.submitSentence} className = "myButton">Submit</button>
        </div>
        </>
        )
    }

}
export default Player;
