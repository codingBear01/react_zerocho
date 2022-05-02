import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
  const [status, setStatus] = useState('waiting');
  const [message, setMessage] = useState('Click to Start');
  const [avgTime, setAvgTime] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = (e) => {
    if (status === 'waiting') {
      setStatus('ready');
      setMessage('Click on the screen when the color turns to red');

      timeout.current = setTimeout(() => {
        setStatus('now');
        setMessage('CLICK NOW');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (status === 'ready') {
      setStatus('waiting');
      setMessage(
        'You have clicked too early! Click on the screen when the color turns to red'
      );
      clearTimeout(timeout.current);
    } else if (status === 'now') {
      endTime.current = new Date();
      setStatus('waiting');
      setMessage('Click to Start!');
      setAvgTime((prevAvgTime) => {
        return [...prevAvgTime, endTime.current - startTime.current];
      });
    }
  };

  const renderAvgTime = () => {
    return avgTime.length === 0 ? null : (
      <>
        <div>
          평균 시간:{' '}
          {Math.floor(avgTime.reduce((a, c) => a + c) / avgTime.length)}
          ms
        </div>
        <button onClick={onReset}>Reset</button>
      </>
    );
  };

  const onReset = () => setAvgTime([]);

  return (
    <>
      <div id="screen" className={status} onClick={onClickScreen}>
        {message}
      </div>
      {renderAvgTime()}
    </>
  );
};

export default ResponseCheck;
