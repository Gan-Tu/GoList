import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = { message: null};
  }

  callAPI() {
    fetch(`/message/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ message: res.message }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <p>This message is generated from backend using your URL parameter</p>
      </div>
    );
  }
}

export default Message;
