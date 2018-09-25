import './Room.css';

import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

export default class Room extends PureComponent {
  render() {
    return (
      <div>
        <Link to={`chat/${this.props.user.id}`}>
          <h3>{this.props.user.firstName}</h3>
          <p>You have {this.props.messageCounter} messages from this user</p>
        </Link>
      </div>
    );
  }
}
