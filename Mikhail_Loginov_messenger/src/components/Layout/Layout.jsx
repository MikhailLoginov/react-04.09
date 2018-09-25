import './Layout.css';

import React, {PureComponent, Fragment} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';

export default class Layout extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header/>
          <Switch>
            <Route exact path='/' component={Content}/>
            <Route exact path='chat/:id' component={Content}/>
          </Switch>
          <Footer/>
        </Fragment>
      </BrowserRouter>
    );
  }
}
