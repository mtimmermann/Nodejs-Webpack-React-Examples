import React from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <NavLink to="/" className="navbar-brand">React Node.js Webpack</NavLink>
          </div>

          {/* Collect the nav links, forms, and other content for toggling */}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><NavLink to="/stock-watch" activeClassName="active">Stock Watch</NavLink></li>
              <li><NavLink to="/chat" activeClassName="active">Chat Socket.io</NavLink></li>
              <li><NavLink to="/markdown-edit" activeClassName="active">Markdown Edit</NavLink></li>
              <li><a href="/example">Example Pug Template</a></li>
              <li className="dropdown">
                <a className="dropdown-toggle" href="#" data-toggle="dropdown">
                  About
                  <b className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="" data-toggle="modal" data-target="#modal-about">About: React Node.js Webpack</a>
                  </li>
                  <li>
                    <a href="https://github.com/mtimmermann/Nodejs-Webpack-React-Examples" target="_blank" rel="noopener noreferrer">Source Code on GitHub</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>{/* /.navbar-collapse */}
        </div>{/* /.container-fluid */}
      </nav>
    );
  }
}

export default NavBar;
