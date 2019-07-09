import React, { Component } from 'react';
import './App.css';


function Total(props) {
  return (
    <div className='total'>
      TOTAL: {props.total}
    </div>
  );
}

class AlternativeCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 0
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  render() {
    const{ value, onChange } = this.props;
    const { input } = this.state;

    return (
      <div className="counter alternative-counter">
        <b>{value}</b>
        <form onSubmit={(e) => {
          e.preventDefault();
          onChange(input);
        }}>
          <input type='number' onChange={this.onInputChange} placeholder={input}/>
          <button type='submit'>Update counter</button>
        </form>
      </div>
    );
  }
}

class Counter extends Component {
  render() {
    const{ value, onIncrement, onDecrement } = this.props;
    return (
      <div className="counter">
        <b>{value}</b>
        <div className="counter-controls">
          <button className="button is-danger is-small" onClick={() => onDecrement(-1)}> - </button>
          <button className="button is-success is-small" onClick={() => onIncrement(1)}> + </button>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      counters: [
        { id: 1 , value: 0 },
        { id: 2 , value: 0 },
        { id: 3 , value: 0 },
        { id: 4 , value: 0 },
        { id: 5 , value: 0 }
      ]
    }
  }

  onIncrement = (ref, num) => {
    this.setState({ counters: this.updateCounters(this.state, ref, num) });
  }

  onDecrement = (ref, num) => {
    this.setState({ counters: this.updateCounters(this.state, ref, num) });
  }

  updateCounters = (state, ref, num) => {
    return state.counters.map(counter => {
      if (counter.id === ref) {
        return { ...counter, value: counter.value + num }
      }
      return { ...counter }
    })
  }

  onChange = (num) => {
    const updatedCounter = {...this.state.counters[this.state.counters.length - 1]};
    updatedCounter.value = +num;
    this.setState({ counters: this.state.counters.slice(0,4).concat(updatedCounter) });
  }

  render() {
    const { counters } = this.state;

    const total = counters.reduce((acc, count) => {
      return acc += count.value;
    }, 0);

    return (
      <div>
        {counters.map((counter, ind) => {
          if (ind === counters.length - 1) {
            return  <AlternativeCounter
                      key={counter.id}
                      value={counter.value}
                      onChange={this.onChange}
                    />
          } else {
            return  <Counter
                      key={counter.id}
                      ref={counter.id}
                      value={counter.value}
                      onDecrement={this.onDecrement.bind(this, counter.id)}
                      onIncrement={this.onIncrement.bind(this, counter.id)}
                    />
          }
        })}
        <Total total={total}/>
      </div>
    );
  }
}

export default App;
