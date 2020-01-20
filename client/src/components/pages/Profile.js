import React, { Component } from "react";


class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
  }

  

  render() {
    return (
      <> {this.props.userId}
      </>
        
    );
  }
}

export default Profile;
