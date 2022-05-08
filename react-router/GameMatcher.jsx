import React, { Component } from 'react';
import NumberBaseball from '../baseball_class/NumberBaseball_class';
import Lotto from '../lotto_class/Lotto_class';
import RockScissorsPaper from '../rock_scissors_paper_class/RockScissorsPaper_class';
import { Route, Routes, useLocation } from 'react-router';

class GameMatcher extends Component {
  render() {
    let urlSearchParams = new URLSearchParams(
      this.props.location.search.slice(1)
    );
    console.log(urlSearchParams.get('page'));
    return (
      <Routes>
        <Route path="number-baseball" element={<NumberBaseball />} />
        <Route path="rock-scissors-paper" element={<RockScissorsPaper />} />
        <Route path="lotto-generator" element={<Lotto />} />
        <Route path="*" element={<div>일치하는 게임이 없습니다.</div>} />
      </Routes>
    );
  }
}

const WrappedComponent = (props) => {
  const location = useLocation();

  return <GameMatcher location={location} {...props} />;
};

export default WrappedComponent;
