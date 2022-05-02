import React, { Component } from 'react';

const RenderArr = (props) => {
  return props.arr.length === 0 ? null : (
    <>
      <div>{props.arr}</div>
      <button onClick={props.reset}>button</button>
    </>
  );
};

// class RenderArr extends Component {
//   render() {
//     const { props } = this.props;
//     return props[0].length === 0 ? null : (
//       <>
//         <div>{props[0]}</div>
//         <button onClick={props[1]}>button</button>
//       </>
//     );
//   }
// }

export default RenderArr;
