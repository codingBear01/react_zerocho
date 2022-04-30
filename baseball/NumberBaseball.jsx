import React, { Component } from 'react';
import { render } from 'react-dom';
import Try from './Try';

const getNumbers = () => {
  console.log('get random numbers!');
};

class NumberBaseball extends Component {
  state = {
    result: '',
    input: '',
    numbers: getNumbers(),
    tries: 0,
  };

  _onSubmit = (e) => e.preventDefault();

  _onChange = (e) => setInput(e.target.value);

  _input;

  inpiutRef = (c) => (this._input = c);

  fruits = [
    { fruit: '사과', taste: '맛나다' },
    { fruit: '배', taste: '달다' },
    { fruit: '대추', taste: '노맛' },
    { fruit: '밤', taste: '꼬소하다' },
    { fruit: '귤', taste: '쌔그럽다' },
  ];

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this._onSubmit}>
          <input
            type="number"
            value={this.state.input}
            onChange={this._onChange}
            maxLength={4}
            ref={this.inputRef}
          />
          <button>확인</button>
        </form>
        <div>시도 횟수: {this.state.tries}</div>
        <ul>
          {this.fruits.map((v, i) => (
            <Try value={v} index={i} />
          ))}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
