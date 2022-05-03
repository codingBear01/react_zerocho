import React from 'react';
import Td from './Td';

const Tr = ({ rowData, rowIdx, dispatch }) => {
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
};

export default Tr;
