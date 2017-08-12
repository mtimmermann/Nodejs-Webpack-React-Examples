import '../js/imports';

// import React, { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './common/home';

window.app = window.app || {};
window.app = $.extend({}, window.app,
  (function () {

    /**
     * Public methods
     */
    return {

      init: () => {
        ReactDOM.render(<Home />, document.querySelector('#container-main'));
      }

    };
  }())
);


$(() => {
  window.app.init();
});
