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

export default class ChatContainer extends PureComponent {
  state = {
    messageAuthor: '',
    messageText: '',
    messages: [],
    author: [],
    user: []
  }

  componentDidMount() {
    app.get('messagesToYou').then(res => {
      res.json().then(messages => {
        messages.forEach(message => {
          if (+message.authorID === +this.props.authorID) {
            this.setState({messages: this.state.messages.concat(message)});
          }
        })
      })
    });
    app.get('messagesFromYou').then(res => {
      res.json().then(messages => {
        messages.forEach(message => {
          if (+message.toUserID === +this.props.authorID) {
            this.setState({messages: this.state.messages.concat(message)});
          }
        })
      })
    });
    app.get('contacts').then(res => {
      res.json().then(res => {
        this.setState({
          author: res[this.props.authorID-1],
          user: res[USER_ID-1]
        });
      })
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmitClick = () => {
    let message = {
      text: this.state.messageText,
      toUserID: +this.props.authorID,
      createdAt: Date.now()
    }
    app.post('messagesFromYou', JSON.stringify(message)).then(res => {
      res.json().then(res => {
        this.setState({messages: this.state.messages.concat(res)});
      })
    });
    this.setState({messageAuthor: '', messageText: ''});
  }

  render() {
    let renderedMessages = '';
    if (this.state.messages && this.state.user) {
      this.setState({messages: this.state.messages
        .sort((a, b) => a.createdAt > b.createdAt)
      })
      renderedMessages = this.state.messages.map((message, index) => {
        if (message.toUserID) {
          let author = this.state.user;
          author.firstName = 'You';
          return <Message key={index} message={message} author={author}/>;
        }
        return <Message key={index} message={message} author={this.state.author}/>;
      });
    }
    return (
      <main>
        <Container>
          <div className="chat-wrapper">
            {renderedMessages}
          </div>
          <Form>
            <div className="name-input-group">
              <FormGroup>
                <Label for="userName" hidden>Name</Label>
                <Input
                  type="text"
                  name="messageAuthor"
                  id="userName"
                  placeholder="Enter your name"
                  onChange={this.handleChange}
                  value={this.state.messageAuthor}/>
              </FormGroup>
              <Button onClick={this.handleSubmitClick}>Submit</Button>
            </div>
            <FormGroup>
              <Label for="commentInput" hidden>Message</Label>
              <Input
                type="textarea"
                name="messageText"
                id="messageInput"
                placeholder="Your message"
                onChange={this.handleChange}
                value={this.state.messageText}/>
            </FormGroup>
          </Form>
        </Container>
      </main>
    );
  }
}
