import './Chat.css';

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

export default class Chat extends PureComponent {
  state = {
    messageAuthor: '',
    messageText: '',
    messages: [],
    authors: [],
  }

  componentDidMount() {
    app.get('messagesToYou').then(res => {
      res.json().then(res => {
        this.setState({messages: res});
      })
    });
    app.get('contacts').then(res => {
      res.json().then(res => {
        this.setState({authors: res});
      })
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmitClick = () => {
    let message = {
      text: this.state.messageText,
      authorID: USER_ID
    }
    app.post('messagesFromYou', JSON.stringify(message)).then(res => {
      res
        .json()
        .then(res => {
          let updatedMessages = this.state.messages.concat(res);
          this.setState({messages: updatedMessages});
        })
    });
    this.setState({messageAuthor: '', messageText: ''});
  }

  render() {
    console.log(this.state.authros);
    console.log(this.state.messages);
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
      </main >
    );
  }
}
