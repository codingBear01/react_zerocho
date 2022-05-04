import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ dispatch, cellData, rowIdx, cellIdx }) => {
  /* useEffect() 및 useRef() 활용하여 어떤 props가 변경되어 rendering 일으키는지 확인
  const ref = useRef([]);
  useEffect(() => {
    console.log(
      dispatch === ref.current[0],
      cellData === ref.current[1],
      rowIdx === ref.current[2],
      cellIdx === ref.current[3]
    );
    ref.current = [dispatch, cellData, rowIdx, cellIdx];
  }, [dispatch, cellData, rowIdx, cellIdx]); */

  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIdx, cell: cellIdx });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
