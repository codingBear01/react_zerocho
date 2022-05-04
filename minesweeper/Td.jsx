import React, { memo, useContext, useCallback } from 'react';
import {
  TableContext,
  CODE,
  OPEN_CELL,
  CLICK_MINE,
  FLAG_CELL,
  QUESTION_CELL,
  NORMALIZE_CELL,
} from './Minesweeper';

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };

    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white',
      };

    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        background: 'tomato',
      };

    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background: 'yellow',
      };

    default:
      return {
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return '';

    case CODE.MINE:
      return 'X';

    case CODE.CLICKED_MINE:
      return '💥';

    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '🚩';

    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '❓';

    default:
      return code || '';
  }
};

const Td = memo(({ rowIdx, cellIdx }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) return;

    switch (tableData[rowIdx][cellIdx]) {
      case CODE.OPENED:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        return;

      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIdx, cell: cellIdx });
        return;

      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIdx, cell: cellIdx });
        return alert('GAME OVER');

      default:
        return;
    }
  }, [tableData[rowIdx][cellIdx], halted]);

  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault();
      if (halted) return;

      switch (tableData[rowIdx][cellIdx]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIdx, cell: cellIdx });
          return;

        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch({ type: QUESTION_CELL, row: rowIdx, cell: cellIdx });
          return;

        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          dispatch({ type: NORMALIZE_CELL, row: rowIdx, cell: cellIdx });
          return;

        default:
          return;
      }
    },
    [tableData[rowIdx][cellIdx], halted]
  );

  return (
    <td
      style={getTdStyle(tableData[rowIdx][cellIdx])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      {getTdText(tableData[rowIdx][cellIdx])}
    </td>
  );
});

export default Td;
