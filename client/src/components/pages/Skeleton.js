import React, { Component } from "react";
import { Link } from "@reach/router";

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
        <div className = "subtitle"> Right Wrong: An Interactive Story Writing Game</div>
        <div className="margin container"> 
          <Link to= "/CreateGame/" className ="card one"> Create Story</Link>
          <Link to = "/JoinGame/" className="card two"> Join a Game</Link>
        </div>
        <hr className = "horizontal-line"></hr>
        <div className = "subtitle"> How it works </div>
        <div className = 'centeredText'>
          <ol>
            <li>A player completes a sentence and writes the beginning of the next sentence</li>
            <li>The next player finishes that sentence and starts the next one</li>
            <li>After everyone writes one sentence, the complete story is revealed</li>
            <li>Did they <span className = 'italics'>right wrong? </span></li>
          </ol>
        </div>
        




        {/* <h2 class = 'document'> What you need to change</h2>
        <ul>
          <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>
          <li>Change the Server CLIENT_ID for Google Auth (auth.js)</li>
        </ul> */}
      </>
      
    );
  }
}

export default Skeleton;
