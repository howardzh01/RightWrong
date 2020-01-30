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
        <div className = "title">Right Wrong</div>
        <div className = "subtitle">Fill-in-the-Blanks. Wrong Answers Only.</div>
        <div className="container"> 
          <Link to= "/JoinGame/" href="#" className ="button join"> Join Game</Link>
        </div>
        <div className="container"> 
          <Link to = "/CreateGame/" href="#" className="button"> Create Game</Link>
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
