import React, { Component } from 'react';

export default class TodoItem extends Component {
  state = {
    isEdit: false,
  };

  renderText = () => {
    const { data, onCheck, onEdit } = this.props;

    if (!this.state.isEdit) {
      return (
        <>
          <span
            className={`border border-primary ${
              data.isDo === true ? 'bg-primary' : ''
            }`}
            style={{
              display: 'inline',
              width: 100,
              height: 100,
              padding: '3px 12px',
              borderRadius: 50,
              marginRight: 5,
            }}
            onClick={onCheck}
          ></span>
          {data.isDo === true ? <del>{data.text}</del> : data.text}
        </>
      );
    }

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();

          onEdit(event.target[0].value);

          this.setState({ isEdit: false });
        }}
      >
        <div className="form-row">
          <div className="col-8">
            <input
              type="text"
              className="form-control form-control-sm"
              name="text"
              defaultValue={data.text}
            />
          </div>
          <div className="col-4">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                  this.setState({ isEdit: false });
                }}
              >
                Cancle
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  render() {
    const { onDelete } = this.props;

    return (
      <div className="card mb-2">
        <div className="card-body">
          <div className="row">
            <div className="col-10">{this.renderText()}</div>
            <div className="col-2 text-right">
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  ...
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      this.setState({ isEdit: true });
                    }}
                  >
                    Update
                  </button>
                  <button className="dropdown-item" onClick={onDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
