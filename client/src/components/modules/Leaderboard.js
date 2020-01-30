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
    return (
      <>    
      {Object.keys(this.state.leaderboard).map((userId) => (<div key = {userId}> {this.props.userMap[userId]} wrote: {this.state.leaderboard[userId]}</div>))}
      </>
    );
  }
}

export default Leaderboard;
