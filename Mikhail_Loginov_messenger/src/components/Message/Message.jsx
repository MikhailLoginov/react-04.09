import './Message.css';

import React, {PureComponent} from 'react';
import ClassNames from 'classnames';

export default class Message extends PureComponent {
  render() {
    const messageClass = ClassNames({
      'message': null == undefined,
      'message-yours': this.props.author.firstName === 'You'
    })
    let date = new Date(this.props.message.createdAt);
    return (
      <div className={messageClass}>
        <div className="message__text">
          {this.props.message.text}
        </div>
        <div className="message__name">
          {this.props.author.firstName}
          , at {date.getDate()}/{date.getMonth()+1}
        </div>
      </div>
    );
  }
}
