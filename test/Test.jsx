import React, { Component, useState } from 'react';
import RenderArr from './RenderArr';

const Test = () => {
  const [arr, setArr] = useState([]);

  const _onClick = (e) => {
    e.preventDefault();
    setArr((prevArr) => [...prevArr, 'test']);
  };

  const reset = () => setArr([]);

  return (
    <>
      <button onClick={_onClick}>TEST PAGE</button>
      <RenderArr arr={arr} reset={reset} />
    </>
  );
};

// class Test extends Component {
//   state = {
//     arr: [],
//   };

//   _onClick = (e) => {
//     e.preventDefault();
//     this.setState((prevState) => {
//       return { arr: [...prevState.arr, 'test'] };
//     });
//   };

//   reset = () => {
//     this.setState({
//       arr: [],
//     });
//   };

//   render() {
//     const { arr } = this.state;

//     return (
//       <>
//         <button onClick={this._onClick}>TEST PAGE</button>
//         <RenderArr props={[arr, this.reset]} />
//       </>
//     );
//   }
// }

export default Test;
