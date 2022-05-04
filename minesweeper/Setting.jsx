import React, { useState, useCallback, useContext, memo } from 'react';
import { TableContext } from './Minesweeper';
import { START_GAME } from './Minesweeper';

const Setting = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  // Minesweeper.jsx에서 설정한 context API를 declare
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);
  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);
  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
  }, [row, cell, mine]);

  return (
    <div>
      <label>세로: </label>
      <input
        type="number"
        placeholder="세로"
        value={row}
        onChange={onChangeRow}
      />

      <label>가로: </label>
      <input
        type="number"
        placeholder="가로"
        value={cell}
        onChange={onChangeCell}
      />

      <label>지뢰: </label>
      <input
        type="number"
        placeholder="지뢰"
        value={mine}
        onChange={onChangeMine}
      />
      <button onClick={onClickBtn}>START</button>
    </div>
  );
});

export default Setting;
