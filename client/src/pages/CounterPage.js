import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/counter';

class CounterPage extends Component {
  render() {
    const { count, increment, decrement } = this.props;

    return (
      <div className="container-fluid">
        <h3 className="mb-3">Counter</h3>

        <p>Number: {count}</p>

        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={increment}
        >
          + increment
        </button>

        <button type="button" className="btn btn-danger" onClick={decrement}>
          - decrement
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.counter,
});

const mapDispatchToProps = {
  increment: CounterActions.increment,
  decrement: CounterActions.decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterPage);
