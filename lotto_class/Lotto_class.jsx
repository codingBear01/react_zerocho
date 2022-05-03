import React, { Component } from 'react';
import Ball from './Ball';

const getWinNums = () => {
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNum = shuffle[shuffle.length - 1];
  const winNums = shuffle.slice(0, 6).sort((a, b) => a - b);
  return [...winNums, bonusNum];
};

class Lotto extends Component {
  state = {
    winNums: getWinNums(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  showNums = () => {
    const { winNums } = this.state;
    for (let i = 0; i < this.state.winNums.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return { winBalls: [...prevState.winBalls, winNums[i]] };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[winNums.length - 1] = setTimeout(() => {
      this.setState({
        bonus: winNums[winNums.length - 1],
        redo: true,
      });
    }, winNums.length * 1000);
  };

  componentDidMount() {
    this.showNums();
  }

  // prevState와 current State를 비교하여 바뀌는 부분을 조건으로 설정
  componentDidUpdate(prevProps, prevState) {
    const { winBalls } = this.state;
    if (winBalls.length === 0) this.showNums();
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => clearTimeout(v));
  }

  onClickRedo = () => {
    this.setState({
      winNums: getWinNums(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>Win Nums</div>
        <div id="result">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>Bonus</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>Try Again?</button>}
      </>
    );
  }
}

export default Lotto;
