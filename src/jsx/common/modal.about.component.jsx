import React from 'react';

class AboutModal extends React.Component {
  render() {
    return (
      <div id="modalAbout" className="modal fade" role="dialog" aria-labelledby="modalAbout" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h3>About - React Bootstrap Webpack</h3>
            </div>
            <div className="modal-body">

              <h4>Static website boilterplate project template built using Webpack 3</h4>
              <ul>
                <li>Webpack
                  <ul>
                    <li>ESLint</li>
                    <li>Browsersync live client source to browser reloading</li>
                  </ul>
                </li>
                <li>React 15.6</li>
                <li>ES6</li>
                <li>Bootstrap 3.3.7</li>
                <li>Font Awesome 4.6.3</li>
                <li>Sass</li>
              </ul>
            </div>
            <div className="modal-footer">
              <a href="https://github.com/mtimmermann/boilerplate-react-bootstrap-webpack">Source Code on GitHub</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutModal;
