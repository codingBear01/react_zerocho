import React, { Component } from 'react';

const RenderArr = (props) => {
  console.log(props.props[0]);
  return props.props[0].length === 0 ? null : (
    <>
      <div>{props.props[0]}</div>
      <button onClick={props.props[1]}>button</button>
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
