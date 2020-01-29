import React, { Component } from "react";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket";
import { navigate } from "@reach/router";

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
        round: undefined,
        round_started: false,
        sentenceMap: {},
        winner_id: '',
        round_finished: false,
      };
    }
  
    componentDidMount() {
      post('/api/startRound', {game_id: this.props.game_id}).then((round) => {
        this.setState({round: round});
      })
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
        winner_id: value
      });
    }
    submitWinner = (event) => {
      post('/api/updateWinner', {game_id: this.props.game_id, winner_id: this.state.winner_id, winner_name: this.props.userMap[this.state.winner_id]}).then(()=>{
        this.setState({round_finished: true, winner_id: ''});
      })
    }

    nextRound = (event) => {
      post('/api/endRound', {game_id: this.props.game_id}).then(() => 
      window.location.replace("/game/" + this.props.game_id) //buggy
      // navigate(`/Game/${this.props.game_id}`));

      )}

    render() {
      if(this.state.round_finished)
      {
        return(<> <div> Game is finished.  </div>
        <button type="submit" onClick={this.nextRound} className = "myButton">Submit</button>
        </>
        )
      }
      else if(!this.state.round_started)
      {
        return (<> 
          <div> Please submit introduction of sentence</div>
          <input
              type="text"
              value={this.state.intro}
              onChange={this.handleInputChange}
              className = "css-input"
          />  
          <button type="submit" onClick={this.submitIntro} className = "myButton">Submit</button>
          </>
          )
      }
      // console.log(this.state.s)
      // console.log(Object.keys(this.state.sentenceMap))
      return(
        <>
          <div>
            The intro is {this.state.intro}
          </div>

          <div>
            {Object.keys(this.state.sentenceMap).map((userId) => (<div key = {userId}> {userId} {this.props.userMap[userId]}: {this.state.sentenceMap[userId]} </div>))}
          </div>

          <div> Type the winning userId </div>
          <input
              type="text"
              value={this.state.winner_id}
              onChange={this.handleWinnerChange}
              className = "css-input"
          />  
          <button type="submit" onClick={this.submitWinner} className = "myButton">Submit</button>
        </>
      )
        
    }

}
export default Judge;
