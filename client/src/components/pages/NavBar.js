import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get, post } from "../../utilities";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "260290227836-ig44r7nvjojrp6k19a8t1iu28h5fcf54.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <nav className="NavBar-container">
        {/* <img src="../../../dist/favicon.jpg"> </img> */}
        <Link to="/" className="NavBar-title">
            Right Wrong
        </Link>
        <div className="NavBar-linkContainer u-inlineBlock">
          
          <Link to="/JoinGame/" className="NavBar-link">
            Join Game
          </Link>

          <Link to="/CreateGame/" className="NavBar-link">
            Create Game
          </Link>

          {this.props.userId && (
            <Link to= {`/Profile/${this.props.userId}`}className="NavBar-link">Profile</Link>
          )}

          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
