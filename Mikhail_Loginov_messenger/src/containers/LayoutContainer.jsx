import React, {PureComponent, Fragment} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from 'components/Header';
import Chat from 'components/Chat';
import RoomsContainer from 'containers/RoomsContainer';
import Footer from 'components/Footer';

export default class LayoutContainer extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header/>
          <Switch>
            <Route exact path='/' component={RoomsContainer}/>
            <Route 
              path='/chat/:authorID' 
              render={(props) => <Chat authorID={props.match.params.authorID}/>}
            />
          </Switch>
          <Footer/>
        </Fragment>
      </BrowserRouter>
    );
  }
}
