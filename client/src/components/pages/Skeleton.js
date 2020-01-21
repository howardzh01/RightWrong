import React, { Component } from "react";


import "../../utilities.css";
import "./Skeleton.css";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (

      <> 
        <div class = "subtitle"> Right Wrong: An Interactive Story Writing Game</div>
        <div class="margin container"> 
          <div class="card one"> Create Story</div>
          <div class="card two"> Join a Game</div>
        </div>
        <hr class = "horizontal-line"></hr>
        <div class = "subtitle"> How it works </div>
        <div class = 'centeredText'>
          <ol>
            <li>A player completes a setence and writes the beginning of the next sentence</li>
            <li>The next player finishes that sentence and starts the next one</li>
            <li>After everyone writes one sentence, the complete story is revealed</li>
            <li>Did they <span class = 'italics'>right wrong? </span></li>
          </ol>
        </div>
        



        {/* how to test if icon works */}
        <h2 class = 'document'> What you need to change</h2>
        <ul>
          <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>
          <li>Change the Server CLIENT_ID for Google Auth (auth.js)</li>
        </ul>
      </>
      
    );
  }
}

export default Skeleton;
