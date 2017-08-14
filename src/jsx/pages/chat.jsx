import React from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

import ModalChooseName from '../components/chat-modal-choose-name';
import chatioApp from '../../js/chatio/chatio-app';

/* eslint-disable react/no-multi-comp */

class UserListDisplay extends React.Component {

  render() {
    const userRows = [];
    const curUser = this.props.userData.curUserName;

    // eslint-disable-next-line prefer-arrow-callback
    const users = this.props.userData.list.filter(function(user) { return user !== curUser; });
    users.forEach((user) => {
      userRows.push(<li key={user}>{user}</li>);
    });
    return (
      <div className="user-list-info">
        { this.props.userData.list.length > 0 &&
        <div>
          <p>Welcome <strong>{this.props.userData.curUserName}</strong></p>
          <p>Other Users Online ({users.length} online)</p>
        </div>
        }
        <ul>
          {userRows}
        </ul>
      </div>
    );
  }
}
UserListDisplay.propTypes = {
  userData: PropTypes.shape({
    curUserName: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
  }).isRequired
};


class MessageRow extends React.Component {

  render() {
    const msg = this.props.messageData;
    const divClasses = msg.isMe ? 'row message self' : 'row message';
    return (
      <div className={divClasses}>
        <p className="message-info">
          <span className="user">{msg.name}, </span>
          <time className="date" title={msg.date}>{msg.date}</time>
        </p>
        <p className="message-text">{msg.message}</p>
      </div>
    );
  }
}
MessageRow.propTypes = {
  messageData: PropTypes.shape({
    name: PropTypes.name,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired
};


class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      message: ''
    };
  }

  handleChange(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    const self = this;
    e.preventDefault();

    chatioApp.sendMessage(this.state.message, (success) => {
      if (success) {
        self.props.addMessage({
          message: self.state.message,
          name: 'Me',
          date: new Date().toISOString(),
          isMe: true
        });
        self.setState({ message: '' });
      }
    });
  }

  render() {
    return (
      <div className="message-form-div">
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="input-group">
            <input
              name="message"
              type="text"
              className="form-control"
              placeholder="Enter a message"
              onChange={this.handleChange}
              value={this.state.message}
              autoComplete="off" />
            <span className="input-group-btn">
              <button className="btn btn-success" type="submit" disabled={!this.state.message}>Send</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.addMessage = this.addMessage.bind(this);

    this.state = {
      messages: [],
      userListData: {
        curUserName: '', // Name of this current user
        list: []
      }
    };

  }

  // Subscribe for pubsub from main app. External messages are subscribed to here
  // Pubsub w/ react and pubsub-js
  //   See: https://anthonymineo.com/communication-between-independent-components-in-react-using-pubsubjs/
  componentWillMount() {
    this.messageToken = PubSub.subscribe('NewMessage', this.externalMessage.bind(this));
    this.userDataToke = PubSub.subscribe('UserListData', this.userDataUpdate.bind(this));
  }
  componentDidMount() {
    chatioApp.init();
  }
  componentDidUpdate() {
    // Wire up jquery.timeago plugin to chat timestamps after render
    chatioApp.timeAgo();

    // Publish a message that the chat box has been rendered
    PubSub.publish('ChatBoxRendered', {});
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.messageToken);
  }

  // External messages recieved here
  externalMessage(msg, data) {
    this.addMessage(data);
  }

  // External pubsub user data update recieved here
  userDataUpdate(msg, data) {
    this.setState({
      userListData: {
        curUserName: data.curUserName,
        list: data.list
      }
    });
  }

  addMessage(data) {
    // eslint-disable-next-line prefer-arrow-callback
    const newMessages = this.state.messages.map(function(msg) { return msg; });
    newMessages.push(data);
    this.setState({ messages: newMessages });
  }

  render() {

    const messageRows = [];
    this.state.messages.forEach((msg) => {
      messageRows.push(<MessageRow key={msg.date} messageData={msg} />);
    });

    return (
      <div id="chat-section">
        <div>
          <div className="col-lg-6">
            <div id="chat-box">
              {messageRows}
            </div>
          </div>
          <div className="col-lg-6">
            <MessageForm addMessage={this.addMessage} />
            <UserListDisplay userData={this.state.userListData} />
          </div>
        </div>
        <div>
          <ModalChooseName />
        </div>
      </div>
    );
  }
}

export default Chat;
