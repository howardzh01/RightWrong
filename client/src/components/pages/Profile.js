import React, { Component } from "react";
import { get } from "../../utilities";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };

  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user } ));
  }

  

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <> 
      <div className = 'subtitle'>
          hello 
        {this.state.user}
      </div>

      </>
        
    );
  }
}

export default Profile;
