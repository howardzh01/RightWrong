import React, { Component } from "react";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import { Redirect } from "react-router-dom";


class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputText: '',
    };
  }

  componentDidMount() {
    document.title = "Game"; //hows componentDidMount special
    // get("/api/ongoingGames").then((gameObjs) => {
    //     gameObjs.map((gameObj) => {
    //       this.setState({ stories: this.state.stories.concat([gameObj])});
    //     });
    // })
  }

  handleInputChange = (event) =>{
    const value  =event.target.value;
    this.setState({
      inputText: value
    });
  }

  

  submitGameRequest = () => {
    const query = {creator_name: this.state.inputText};
    //need to handle invalid inputs with failed promise
    get("/api/joinGame", query).then((game_id) => {
        this.props.setGame(game_id);
        return <Redirect to={`/Game`} />
    })
    this.setState({
      inputText: ""
    });
  };

  render() {
    
    return (
        <>  
            <div> Enter Creator Name</div>
            <div>   
                <input
                    type="text"
                    value={this.state.inputText}
                    onChange={this.handleInputChange}
                />  
                <button type="submit" onClick={this.submitGameRequest}>Submit</button>
            </div>
            <Link to = "/Game/"> hello </Link>
        </>
    );
  }
}

export default JoinGame;
