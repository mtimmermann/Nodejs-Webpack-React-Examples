import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/home';
import Page1 from '../pages/page1';
import Page2 from '../pages/page2';
import NotFound from '../pages/not-found';

class Main extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default Main;
