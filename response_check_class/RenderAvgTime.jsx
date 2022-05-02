import React, { PureComponent } from 'react';

class RenderAvgTime extends PureComponent {
  render() {
    const { avgTime, reset } = this.props;

    return avgTime.length === 0 ? null : (
      <>
        <div>
          평균 시간:{' '}
          {Math.floor(avgTime.reduce((a, c) => a + c) / avgTime.length)}
          ms
        </div>
        <button onClick={reset}>Reset</button>
      </>
    );
  }
}

export default RenderAvgTime;
