import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

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
        <div class="margin container"> 
          <div class="card one"> Create Story</div>
          <div class="card two"> Join a Game</div>
        </div>

        {/* how to test if icon works */}
        <h2 class = 'document'> What you need to change</h2>
        <ul>
          <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>
          <li>Change the Server CLIENT_ID for Google Auth (auth.js)</li>
          <li>Change the Database SRV for Atlas (server.js)</li>
          <li>Change the Database Name for MongoDB (server.js)</li>
        </ul>
      </>
      
    );
  }
}

export default Skeleton;
