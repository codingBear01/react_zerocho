import React, { useContext, memo } from 'react';
import Tr from './Tr';
import { TableContext } from './Minesweeper';

const Table = memo(() => {
  // value.Table.Context 불러오기
  const { tableData } = useContext(TableContext);

  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr key={i} rowIdx={i} />
          ))}
      </tbody>
    </table>
  );
});

export default Table;
