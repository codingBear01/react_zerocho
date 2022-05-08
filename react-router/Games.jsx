import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/baseball">baseball</Link>
        &nbsp;
        <Link to="/game/lotto">lotto</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">rock scissors paper</Link>
        &nbsp;
        <Link to="/game/match">Game Matcher</Link>
      </div>
      <Routes>
        <Route path="/" element={<GameMatcher />} />
        <Route path="/game/:name" element={<GameMatcher />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Games;
