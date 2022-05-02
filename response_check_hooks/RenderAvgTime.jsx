import React, { memo } from 'react';

const RenderAvgTime = memo((props) => {
  return props.avgTime.length === 0 ? null : (
    <>
      <div>
        평균 시간:{' '}
        {Math.floor(
          props.avgTime.reduce((a, c) => a + c) / props.avgTime.length
        )}
        ms
      </div>
      <button onClick={props.reset}>Reset</button>
    </>
  );
});

export default RenderAvgTime;
