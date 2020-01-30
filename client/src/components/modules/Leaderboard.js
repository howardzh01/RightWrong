import React, { Component } from "react";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket";


class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: {},
    };

  }

  componentDidMount() {
      socket.on('leaderboard', (leaderboard) =>{
          this.setState({leaderboard: leaderboard});
      })
  }

  

  render() {
      console.log(this.state)
    return (
      <>    
      <div id = "borderDemo" className = "centeredText">
      {Object.keys(this.state.leaderboard).map((userId) => (<div key = {userId}> {this.props.userMap[userId]}: {this.state.leaderboard[userId]}</div>))}
      </div>
      </>
    );
  }
}

export default Leaderboard;
