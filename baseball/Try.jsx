import React, { Component } from 'react';

class Try extends Component {
  render() {
    return (
      <li key={this.props.value.fruit + this.props.value.taste}>
        <div>번호: {this.props.index + 1}</div>
        <div>과일 이름: {this.props.value.fruit}</div>
        <div>맛: {this.props.value.taste}</div>
        <div>ㅎㅅaㅎ1</div>
        <div>ㅇㅅaㅇ2</div>
      </li>
    );
  }
}

export default Try;
