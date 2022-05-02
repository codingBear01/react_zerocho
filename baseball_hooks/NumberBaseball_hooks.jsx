import React, { useState, useRef, memo } from 'react';
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

const NumberBaseball = memo(() => {
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');
  const [numbers, setNumbers] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const _onSubmit = (e) => {
    e.preventDefault();

    if (input === numbers.join('')) {
      setResult('홈런');
      setTries((prevTries) => {
        return [...prevTries, { try: input, result: '홈런' }];
      });
      setInput('');
      setNumbers(getNumbers());
      setTries(['']);
      inputRef.current.focus();
    } else {
      const answerArray = input.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) {
        setResult(
          `10번 넘게 틀렸으므로 실패! 답은 ${numbers.join(',')}였다능!ㅇㅅㅇ`
        );
        setInput('');
        setNumbers(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === numbers[i]) {
            strike += 1;
          } else if (numbers.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => {
          return [
            ...prevTries,
            { try: input, result: `${strike} 스크라이크, ${ball} 볼입니다` },
          ];
        });
        setInput('');
        inputRef.current.focus();
      }
    }
  };

  const _onChange = (e) => setInput(e.target.value);

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={_onSubmit}>
        <input
          type="number"
          value={input}
          onChange={_onChange}
          maxLength={4}
          ref={inputRef}
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
});

export default NumberBaseball;
