import React, { Component } from "react";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket";
import "./Judge.css";

/**
 * JUdge is a component that creates the intro for the round
 *
 * Proptypes
 * @param {string} game_id
 * @param {string} judge
 * @param {string} round_number
 */
class Judge extends Component {
    constructor(props) {
      super(props);
      this.state = {
        intro: '',
        round_started: false,
        sentenceMap: {},
        winner_sentence: '',
        round_finished: false,
        winner_name: undefined,
      };
    }
  
    componentDidMount() {
      console.log('judge remounted')
      post('/api/startRound', {game_id: this.props.game_id});
      socket.on('displaySentences', (sentenceMap) => {
        this.setState({sentenceMap: sentenceMap});
      })
      socket.on('revealWinner', (winner_name) => {
        this.setState({winner_name: winner_name});
      })
    }
    // componentWillUnmount(){
    //   socket.removeAllListeners();
    // }

    handleInputChange = (event) =>{
        const value  =event.target.value;
        this.setState({
          intro: value
        });
      }
      // bug this.props.judge is not passed due to probel in App.js
    submitIntro = (event) => {
      post('/api/updateIntroSentence', {game_id: this.props.game_id, intro: this.state.intro}).then(()=>{
        this.setState({round_started: true});
      })
    }

    handleWinnerChange = (event) =>{
      const value  =event.target.value;
      this.setState({
        winner_sentence: value
      });
    }
    submitWinner = (event) => {
      if(Object.keys(this.state.sentenceMap).length < 1){
          alert("Wait for more submissions!")
        }
      else if(this.state.winner_sentence < 1 || this.state.winner_sentence > Object.keys(this.state.sentenceMap).length){
        alert("Invalid sentence number!")
      }
      else{
        const winner_id = Object.keys(this.state.sentenceMap)[this.state.winner_sentence-1]
        console.log(winner_id)
        post('/api/updateWinner', {game_id: this.props.game_id, winner_id: winner_id, winner_name: this.props.userMap[winner_id]}).then(()=>{
          this.setState({round_finished: true, winner_sentence: ''});
        })
      }
    }

    nextRound = (event) => {
      console.log('next round is called')
      post('/api/endRound', {game_id: this.props.game_id})   
    };
      
      

    render() {
      if(this.state.round_finished)
      {
        return(<> 
        <div className = 'subtitle' >Congrats <span className = 'orange-font'>{this.state.winner_name}</span></div>
        <div className = "margin-top">
        <button type="submit" onClick={this.nextRound} className = "myButton" >Start Next Round</button></div>
        </>
        )
      }
      else if(!this.state.round_started)
      {
        return (<> 
          <div className = 'centeredText'> Please submit the beginning of a sentence.
          <div>
          <input
              type="text"
              value={this.state.intro}
              onChange={this.handleInputChange}
              className = "css-input"
          />  
          <button type="submit" onClick={this.submitIntro} className = "myButton">Submit</button>
          </div>
          </div>
          </>
          )
      }

      return(
        <>
          <div className= 'prompt'>
            {this.state.intro}...
          </div>

          <div className = 'centeredText'>
            {Object.keys(this.state.sentenceMap).map((userId, index) => (<div key = {userId}> {index +1}. 
            <span className = 'response'> {this.state.intro} {this.state.sentenceMap[userId]}</span></div>))}
          </div>
          {Object.keys(this.state.sentenceMap).length < 1 && <div className = 'centeredText'> Waiting for responses</div>}
          {Object.keys(this.state.sentenceMap).length >= 1 && <div className = 'centeredText' className = 'margin-top'>
          <div className = 'centeredText'>
          Please type the winning sentence number 
          </div>
          <div>
          <input
              type="number"
              value={this.state.winner_sentence}
              onChange={this.handleWinnerChange}
              className = "css-input"
          />  
          <button type="submit" onClick={this.submitWinner} className = "myButton">Submit</button>
          </div>
          </div>
          }
        </>
      )
        
    }

}
export default Judge;
