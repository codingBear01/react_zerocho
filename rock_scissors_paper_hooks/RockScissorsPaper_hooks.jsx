import React, { useState, useRef, useEffect } from 'react';

const coords = {
  rock: '0',
  scissors: '-142px',
  paper: '-284px',
};

const scores = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(coords).find((v) => {
    return v[1] === imgCoord;
  })[0];
};

const RockScissorsPaper = () => {
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(coords.rock);
  const interval = useRef();

  // useEffect()를 활용하여 componentDidMount 및 componentDidUpdate method 기능(완전 동일 X)
  useEffect(() => {
    interval.current = setInterval(changeHands, 100);
    // return은 componentWillUnmount 기능
    return () => {
      clearInterval(interval.current);
    };
    // whenever second parameter change useEffect will work
  }, [imgCoord]);
  // setInterval()과 clearInterval()을 한 번씩 번갈아 실행하기 때문에 결국 setTimeout()을 실행했을 때와 같은 결과가 나옴.

  const changeHands = () => {
    if (imgCoord === coords.rock) {
      setImgCoord(coords.scissors);
    } else if (imgCoord === coords.scissors) {
      setImgCoord(coords.paper);
    } else if (imgCoord === coords.paper) {
      setImgCoord(coords.rock);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비겼습니다!');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다!');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHands, 100);
    }, 1000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('rock')}>
          ROCK
        </button>
        <button id="scissors" className="btn" onClick={onClickBtn('scissors')}>
          SCISSORS
        </button>
        <button id="paper" className="btn" onClick={onClickBtn('paper')}>
          PAPER
        </button>
      </div>
      <div>{result}</div>
      <div>점수: {score}</div>
    </>
  );
};

export default RockScissorsPaper;
