import React, { Component } from "react";
import { get, post } from "../../utilities";

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
        inputText: "",
        submitted: false,
      };
    }
  
    componentDidMount() {
      
    }

      // bug this.props.judge is not passed due to probel in App.js

    handleInputChange = (event) =>{
        const value  =event.target.value;
        this.setState({
          inputText: value
        });
      }
    
    submitSentence = () => {
    const body = {game_id: this.props.game_id, content: this.state.inputText}; 
    post("/api/sentences", body).then(() => {
        this.setState({inputText: "", submitted: true});
    });
    };

      
    render() {
        if (this.state.submitted) {
            // let sentenceList = this.state.sentence_arr.map((sentence) => (<div> {sentence.writer.name} wrote {sentence.content}. </div>))
            return (<> 
            <div>
                Good job submitting your sentence! For this round, the sentences submitted so far are (need socket)
            </div>
            this.props.round.content
            </>)

        }

        return (<> 
        <div>
            Please submit sentence with introduction {this.props.round.intro_line}
        </div> 
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
export default Player;
