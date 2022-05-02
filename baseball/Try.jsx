import React from 'react';
// const Try = ((props)) => {}
const Try = ({ tryInfo }) => {
  return (
    <li>
      {/* <div>{props.ryInfo.try}</div> */}
      {/* <div>{props.tryInfo.result}</div> */}
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
};

export default Try;
