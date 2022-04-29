import React, { useState, useRef } from 'react';

const GooGooDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [input, setInput] = useState('');
  const [point, setPoint] = useState(0);
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const _onSubmit = (e) => {
    e.preventDefault();

    if (parseInt(input) === first * second) {
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setInput('');
      setPoint((p) => p + 1);
      setResult(`${first} * ${second} = ${input} 정답!`);
      inputRef.current.focus();
    } else {
      setInput('');
      setPoint((p) => p - 1);
      setResult('땡!');
      inputRef.current.focus();
    }
  };

  const _onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div>
        {first} 곱하기 {second}는?
      </div>

      <form onSubmit={_onSubmit}>
        <input
          type="number"
          value={input}
          onChange={_onChange}
          ref={inputRef}
        />
        <button>결과 확인!</button>
      </form>

      <div>점수: {point}</div>
      <div>{result}</div>
    </>
  );
};

export default GooGooDan;
