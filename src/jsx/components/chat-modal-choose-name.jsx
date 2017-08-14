import React from 'react';

import chatioApp from '../../js/chatio/chatio-app';

class ModalChooseName extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      isError: false
    };
  }

  handleChange(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  // handleSubmit = (e, message) => {
  handleSubmit(e) {
    e.preventDefault();

    const self = this;
    chatioApp.addName(this.state.name, (success) => {
      if (!success) {
        self.setState({ isError: true });
      } else {
        self.setState({
          name: '',
          isError: false
        });
        chatioApp.modals.chooseName.hide();
      }
    });
  }

  render() {
    return (
      <div
        id="modalChooseName"
        className="modal fade"
        role="dialog"
        aria-labelledby="modalChooseName"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false">

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Choose a name</h3>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="input-group">
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter a chat name/handle"
                    onChange={this.handleChange}
                    value={this.state.name}
                    autoComplete="off" />
                  <span className="input-group-btn">
                    <button className="btn btn-success" type="submit" disabled={!this.state.name}>Go to chat</button>
                  </span>
                </div>
              </form>
              <div>
                {this.state.isError ? (
                  <div className="alert alert-danger">
                    This name is taken. Please choose another.
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </div>
            {/* <div className="modal-footer">
              {this.state.isError ? (
              <div className="alert alert-danger">
                This name is taken. Please choose another.
              </div>
              ) : (
              <div></div>
              )}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ModalChooseName;
