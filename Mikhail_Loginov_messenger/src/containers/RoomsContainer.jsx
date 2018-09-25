import React, {PureComponent, Fragment} from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container
} from 'reactstrap';

import Room from 'components/Room';
import app from '../index';

export default class RoomsContainer extends PureComponent {
  state = {
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

  render() {
    let renderedRooms = '';
    if (this.state.authors.length !== 0) {
      renderedRooms = this.state.authors.map((user, index) => {
        let messageCounter = 0;
        this.state.messages.forEach(message => {
          if (message.authorID === user.id) {
            messageCounter++;
          }
        })
        return <Room key={index} user={user} messageCounter={messageCounter}/>
      });
    };
    return (
      <Fragment>
        {renderedRooms}
      </Fragment>
    )
  }
}
