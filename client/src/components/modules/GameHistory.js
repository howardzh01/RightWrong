import React, { Component } from "react";


class GameHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    console.log(this.props.game)
    return (
      <>    
      <div> Hello</div>
      <div className = "centeredText">
      {(this.props.game) && Object.keys(this.props.game.usersToScore).map((userId) =>
      
       (<div key = {userId}> {this.props.game.userIdMap[userId]}: {this.props.game.usersToScore[userId]}</div>)
       )}
      </div>
      </>
    );
  }
}

export default GameHistory;
