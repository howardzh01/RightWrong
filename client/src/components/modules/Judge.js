import React, { Component } from "react";
import { get, post } from "../../utilities";

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
        round: undefined
      };
    }
  
    componentDidMount() {
      
    }

    handleInputChange = (event) =>{
        const value  =event.target.value;
        this.setState({
          intro: value
        });
      }
      // bug this.props.judge is not passed due to probel in App.js
    addNewRound = (gameObj) => {
        console.log({game_id: this.props.game_id, judge: this.props.judge, intro_line: this.state.intro, round_number: this.props.round_number})
        post('/api/startRound', {game_id: this.props.game_id, judge: this.props.judge, intro_line: this.state.intro, round_number: this.props.round_number}).
            then((round) => {
            this.setState({intro: '', round: round});
        })
    }

    render() {
        return (<> 
        <input
            type="text"
            value={this.state.intro}
            onChange={this.handleInputChange}
            className = "css-input"
        />  
        <button type="submit" onClick={this.addNewRound} className = "myButton">Submit</button>
        </>
        )
    }

}
export default Judge;
