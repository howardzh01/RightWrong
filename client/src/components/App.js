import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import CreateGame from "./pages/CreateGame.js";
import JoinGame from "./pages/JoinGame.js";
import Game from "./pages/Game.js";


import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import NavBar from "./pages/NavBar.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      game_id: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  setGameId = (game_id) => {
    this.setState({game_id})
  }

  render() {
    return (
      <>
        <NavBar path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId} 
        />
        <Router>
          <Skeleton path="/"/>
          <Profile path="/Profile/:userID"/>
          <JoinGame path = "/JoinGame" setGame = {this.setGameId}/>
          <CreateGame path = '/CreateGame' setGame = {this.setGameId}/>
          <Game path = '/Game' game_id = {this.state.game_id}/>
          <NotFound default userId = {this.state.userId}/>
        </Router>
      </>
    );
  }
}

export default App;
