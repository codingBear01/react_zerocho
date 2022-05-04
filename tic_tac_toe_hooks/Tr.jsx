import React, { useEffect, useRef, memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIdx, dispatch }) => {
  /* const ref = useRef([]);
  useEffect(() => {
    console.log(
      rowData === ref.current[0],
      rowIdx === ref.current[1],
      dispatch === ref.current[2]
    );
    ref.current = [rowData, rowIdx, dispatch];
  }, [rowData, rowIdx, dispatch]); */

  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td
            key={i}
            dispatch={dispatch}
            cellData={rowData[i]}
            cellIdx={i}
            rowIdx={rowIdx}
          >
            {''}
          </Td>
        ))}
    </tr>
  );
});

export default Tr;
