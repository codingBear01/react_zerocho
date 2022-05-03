import React, { Component } from 'react';

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

class RockScissorsPaper extends Component {
  state = {
    result: '',
    score: 0,
    imgCoord: coords.rock,
  };

  interval;

  changeHands = () => {
    const { imgCoord } = this.state;
    if (imgCoord === coords.rock) {
      this.setState({
        imgCoord: coords.scissors,
      });
    } else if (imgCoord === coords.scissors) {
      this.setState({
        imgCoord: coords.paper,
      });
    } else if (imgCoord === coords.paper) {
      this.setState({
        imgCoord: coords.rock,
      });
    }
  };

  // component가 첫 rendering 되고 난 직후 실행. 주로 asynchronous request에 사용.
  componentDidMount() {
    this.interval = setInterval(this.changeHands, 100);
  }

  // rerendering(whenever state/props changed) 후 실행
  // componentDidUpdate() {}

  // component가 제거되기 직전 실행. componentDidMount()의 not completed asynchronous request 정리에 사용.
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onClickBtn = (choice) => () => {
    clearInterval(this.interval);
    const { imgCoord } = this.state;
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다!',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHands, 100);
    }, 1000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        ></div>
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>
            ROCK
          </button>
          <button
            id="scissors"
            className="btn"
            onClick={this.onClickBtn('scissors')}
          >
            SCISSORS
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>
            PAPER
          </button>
        </div>
        <div>{result}</div>
        <div>점수: {score}</div>
      </>
    );
  }
}

export default RockScissorsPaper;
