import React, { Component } from "react";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket.js";


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
        console.log(this.state.winner_name)
      })
      socket.on('judge', (judge) =>{
        this.setState({judge_name: judge});

      })
      // socket.on('roundOver', () =>{
      //   window.location.reload(true)
      //   // window.location.replace("/game/" + this.props.game_id)
      //   // navigate(`/Game/${this.props.game_id}`);
      // })

      console.log('mounted player', this.state.intro)
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
        <div>
          Please wait for the judge {this.state.judge_name} to give the beginning of the sentence
        </div></>)
      }

      else if(this.state.winner_name){
        return(<>
        <div>The winner is {this.state.winner_name}</div>
        </>)

      }
      else if(this.state.submitted) {
          // let sentenceList = this.state.sentence_arr.map((sentence) => (<div> {sentence.writer.name} wrote {sentence.content}. </div>))
          return (<> 
          <div>Waiting for judge {this.state.judge_name} </div>
          <div>
              Good job submitting your sentence! For this round, the sentences submitted so far are
          </div>
          <div>
            {Object.keys(this.state.sentenceMap).map((userId, index) => (<div key = {userId}> {index+1}. {this.props.userMap[userId]} wrote: {this.state.sentenceMap[userId]}</div>))}
          </div>
          
          </>)

        }

        return (<> 
        <div>
            The beginning of your sentence must be <div>{this.state.intro}</div>
        </div> 
        <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
            className = "css-input"
        />  
        <button type="submit" onClick={this.submitSentence} className = "myButton">Submit</button>
        </>
        )
    }

}
export default Player;
