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
    console.log('hello')
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({user: user } ));
  }

  

  render() {
    if (!this.state.user) {
      console.log(this.props)
      console.log(this.props.userId)
      return <div> Loading! </div>;
    }
    return (
      <> 
      <div>
        {this.state.user.name}
      </div>
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
