import React, { useState, useRef } from 'react';

const WordChain = () => {
  const [word, setWord] = useState('강명모');
  const [input, setInput] = useState('');
  const [point, setPoint] = useState(0);
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const _onSubmit = (e) => {
    e.preventDefault();

    if (word[word.length - 1] === input[0]) {
      setWord(input);
      setInput('');
      setPoint((p) => p + 1);
      setResult('딩동댕!');
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
      <div>{word}</div>
      <form onSubmit={_onSubmit}>
        <input type="text" value={input} onChange={_onChange} ref={inputRef} />
        <button>입력!</button>
      </form>
      <div>점수: {point}</div>
      <div>{result}</div>
    </>
  );
};

export default WordChain;
