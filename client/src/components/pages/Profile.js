import React, { Component } from "react";
import { get } from "../../utilities";
import GameHistory from "../modules/GameHistory";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      games: [], //array of MongoDB game objects with that user
    };

  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({user: user } ));
    get('/api/displayGames').then((games) =>{
      this.setState({games: games})
      console.log(this.state.games)
      this.forceUpdate();
    })
  }



  render() {
    if (!this.state.user) {
      return <div className = 'subtitle'> Please Log In </div>;
    }
    else if(this.state.games.length == 0)
    {
      return(<div className = 'subtitle'>
      {this.state.user.name}
      </div>)
    }
    this.state.games.map((game) => 
      console.log(game))
    return (
      <> 
      <div className = 'subtitle'>
        {this.state.user.name}
      </div>
      {this.state.games.map((game, index) => 
      <div key = {game._id}>
      <div id = "gameHistoryDemo" className = "centeredText">
      <div className = "gameHistoryTitle">Game {index}</div>
      {Object.keys(game.usersToScore).map((userId) =>
      
      <div key = {userId}> {game.userIdMap[userId].name}: {game.usersToScore[userId]}</div>
      )}
      </div>
      </div>)}
      
      {/* <GameHistory key = {this.props.userId}> game = {game}></GameHistory>)  */}
      {/* <div>
        Hello
      </div>
      <div className = 'subtitle'>
        {console.log('hello')}
        {console.log(this.state.user)}
        {this.state.user}
      </div> */}

      </>
        
    );
  }
}

export default Profile;
