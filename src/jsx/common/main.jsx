import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/home';
import MarkdownEdit from '../pages/markdown-edit';
import StockWatch from '../pages/stock-watch';
import Chat from '../pages/chat';
import NotFound from '../pages/not-found';

class Main extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/stock-watch" component={StockWatch} />
        <Route path="/chat" component={Chat} />
        <Route path="/markdown-edit" component={MarkdownEdit} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default Main;
