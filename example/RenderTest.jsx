import React, { PureComponent } from 'react';

class Test extends PureComponent {
  state = {
    cnt: 0,
    string: 'hello',
    number: 1,
    boolean: true,
    obj: {},
    arr: [],
  };

  onClick = () => {
    this.setState({
      obj: { ...this.state.obj, name: 'kang' },
      arr: [...this.state.arr, 1],
    });
  };

  render() {
    return (
      <>
        <button onClick={this.onClick}>Click</button>
      </>
    );
  }
}

export default Test;
