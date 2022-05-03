import React, { memo } from 'react';

const Ball = memo(({ number }) => {
  let background;
  let color;

  if (number <= 10) {
    background = 'yellow';
  } else if (number <= 20) {
    background = 'blue';
  } else if (number <= 30) {
    background = 'red';
  } else if (number <= 40) {
    background = 'black';
    color = 'white';
  } else {
    background = 'green';
  }

  return (
    <div className="ball" style={{ background, color }}>
      {number}
    </div>
  );
});

export default Ball;
