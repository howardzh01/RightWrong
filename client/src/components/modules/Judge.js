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
      };
    }
  
    componentDidMount() {
      console.log('judge remounted')
      post('/api/startRound', {game_id: this.props.game_id});
      socket.on('displaySentences', (sentenceMap) => {
        this.setState({sentenceMap: sentenceMap});
      })
    }

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
      // post('/api/startRound', {game_id: this.props.game_id}).then((rounds) => {
      //   // this.props.updateRound(rounds.length);

      //   post('/api/endRound', {game_id: this.props.game_id})
      // });
      
    };
      
      // window.location.replace("/game/" + this.props.game_id) //buggy
      // navigate(`/Game/${this.props.game_id}`));

      

    render() {
      if(this.state.round_finished)
      {
        return(<> <div> Round is finished.  </div>
        <button type="submit" onClick={this.nextRound} className = "myButton">Start Next Round</button>
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
          <div>
            The intro is {this.state.intro}
          </div>

          <div>
            {Object.keys(this.state.sentenceMap).map((userId, index) => (<div key = {userId}> {index +1}. {this.props.userMap[userId]} wrote: {this.state.sentenceMap[userId]}</div>))}
          </div>
          <div className = 'centeredText'>
          Type the number of the best sentence

          <input
              type="number"
              value={this.state.winner_sentence}
              onChange={this.handleWinnerChange}
              className = "css-input"
          />  
          <button type="submit" onClick={this.submitWinner} className = "myButton">Submit</button>
    
          </div>
        </>
      )
        
    }

}
export default Judge;
