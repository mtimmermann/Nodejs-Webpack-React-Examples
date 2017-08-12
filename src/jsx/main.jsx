import '../js/imports';

// import React, { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './common/home.component';
//import AboutModal from './common/modal.about.component';

window.app = window.app || {};
window.app = $.extend({}, window.app,
  (function () {

    /**
     * Public methods
     */
    return {

      init: () => {
        ReactDOM.render(<Home />, document.querySelector('#container-main'));

        // ReactDOM.render(
        //   <div>
        //     <AboutModal />
        //   </div>
        //   , document.querySelector('#container-modals'));
      }

    };
  }())
);


$(() => {
  window.app.init();
});
