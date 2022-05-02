import React, { PureComponent, createRef } from 'react';
import Try from './Try';

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

class NumberBaseball extends PureComponent {
  state = {
    result: '',
    input: '',
    numbers: getNumbers(),
    tries: [],
  };

  _onSubmit = (e) => {
    const { input, tries, numbers } = this.state;
    e.preventDefault();

    if (input === numbers.join('')) {
      this.setState((prevState) => {
        return {
          result: '홈런',
          tries: [...prevState.tries, { try: input, result: '홈런' }],
        };
      });
      this.setState({
        input: '',
        numbers: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else {
      const answerArray = input.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀렸으므로 실패! 답은 ${numbers.join(
            ','
          )}였다능!ㅇㅅㅇ`,
        });
        this.setState({
          input: '',
          numbers: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === numbers[i]) {
            strike += 1;
          } else if (numbers.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              { try: input, result: `${strike} 스크라이크, ${ball} 볼입니다` },
            ],
            input: '',
          };
        });
        this.inputRef.current.focus();
      }
    }
  };

  _onChange = (e) => this.setState({ input: e.target.value });

  inputRef = createRef();

  render() {
    const { input, tries, result } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this._onSubmit}>
          <input
            type="number"
            value={input}
            onChange={this._onChange}
            maxLength={4}
            ref={this.inputRef}
          />
          <button>확인</button>
        </form>
        <div>시도 횟수: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도: `} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
