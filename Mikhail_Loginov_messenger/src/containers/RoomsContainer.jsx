import React, {PureComponent} from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container
} from 'reactstrap';

import app from '../../index';
import Message from 'components/Message';

const USER_ID = 1; // Hardcoded current user ID

export default class Content extends PureComponent {
  state = {
    messages: [],
    authors: [],
  }

  componentDidMount() {
    app.get('messages').then(res => {
      res.json().then(res => {
        this.setState({messages: res});
      })
    });
    app.get('users').then(res => {
      res.json().then(res => {
        this.setState({authors: res});
      })
    })
  }

  render() {
    let renderedMessages = '';
    if (this.state.authors.length !== 0 ) {
      renderedMessages = this.state.messages.map((message, index) => {
        let author = this.state.authors[message.authorID-1];
        if (author.id === USER_ID) {
          author.firstName = 'You';
        }
        return <Message key={index} message={message} author={author}/>;
      });
    }
    return (
      <main>
        <Container>
          <div className="chat-wrapper">
            {renderedMessages}
          </div >
        </Container>
      </main >
    );
  }
}
