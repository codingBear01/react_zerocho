import React, { memo } from 'react';

// const Try = ((props)) => {}
const Try = memo(({ tryInfo }) => {
  return (
    <li>
      {/* <div>{props.ryInfo.try}</div> */}
      {/* <div>{props.tryInfo.result}</div> */}
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

// class Try extends PureComponent {
//   render() {
//     const { tryInfo } = this.props;
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     );
//   }
// }

export default Try;
