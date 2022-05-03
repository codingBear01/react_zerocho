import React, { useCallback } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = ({ dispatch, cellData, rowIdx, cellIdx }) => {
  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }

    dispatch({ type: CLICK_CELL, row: rowIdx, cell: cellIdx });
    dispatch({ type: CHANGE_TURN });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;
