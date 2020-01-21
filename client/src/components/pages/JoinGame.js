import React, { Component } from "react";
import { get } from "../../utilities";


class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
        games: [],
    };
  }

  componentDidMount() {
    document.title = "Game";
    get("/api/ongoingGames").then((gameObjs) => {
        gameObjs.map((gameObj) => {
          this.setState({ stories: this.state.stories.concat([gameObj])});
        });
    })
  }

  addNewGame = (gameObj) => {
    this.setState({
        games: [gameObj].concat(this.state.games),
    })
  }

  render() {
    return (
      <> Enter Code
      </>
        
    );
  }
}

export default JoinGame;
