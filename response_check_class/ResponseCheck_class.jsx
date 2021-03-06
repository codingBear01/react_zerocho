import React, { Component } from 'react';
import RenderAvgTime from './RenderAvgTime';

class ResponseCheck extends Component {
  state = {
    status: 'waiting',
    message: 'Click to Start!',
    avgTime: [],
  };

  // 변수는 값이 바뀌어도 rendering 안 됨.
  timeout;
  startTime;
  endTime;

  onClickScreen = (e) => {
    const { status, message, avgTime } = this.state;
    if (status === 'waiting') {
      // click to start
      this.setState({
        status: 'ready',
        message: 'Click on the screen when the color turns to red',
      });
      this.timeout = setTimeout(() => {
        this.setState({
          status: 'now',
          message: 'CLICK NOW!',
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (status === 'ready') {
      // click too early
      this.setState({
        status: 'waiting',
        message:
          'You have clicked too early! Click on the screen when the color turns to red',
      });
      // cancel setTimeout()
      clearTimeout(this.timeout);
    } else if (status === 'now') {
      this.endTime = new Date();
      // record response time
      this.setState((prevState) => {
        return {
          status: 'waiting',
          message: 'Click to Start!',
          avgTime: [...prevState.avgTime, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => this.setState({ avgTime: [] });

  render() {
    const { status, message, avgTime } = this.state;
    return (
      <>
        <div id="screen" className={status} onClick={this.onClickScreen}>
          {message}
        </div>
        <RenderAvgTime avgTime={avgTime} reset={this.onReset} />
      </>
    );
  }
}

export default ResponseCheck;
