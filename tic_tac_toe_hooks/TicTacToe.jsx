import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

// action type은 상수로 관리
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

// action을 dispatch할 때마다 reducer가 실행되어 state를 변경
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // winner = action.winner X. can change only indirectly
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL:
      const tableData = [...tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: turn === 'O' ? 'X' : 'O',
      };
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner } = state;

  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([
  //   ['', '', ''],
  //   ['', '', ''],
  //   ['', '', ''],
  // ]);

  const onClickTable = useCallback(() => {
    /* dispatch 안의 값들을 action이라고 함(redux에서 따온 개념)
    dispatch를 쓰면 child component에 일일이 dispatch를 props로 넘겨줘야 하기 때문에 
    context API를 사용해서 해당 dispatch를 활용하는 child component에 directly pass함. */
    dispatch({ type: SET_WINNER, winner: 'O' });
  }, []);

  useEffect =
    (() => {
      let win = false;

      if (
        tableData[row][0] === turn &&
        tableData[row][1] === turn &&
        tableData[row][2] === turn
      )
        win = true;
      if (
        tableData[0][cell] === turn &&
        tableData[1][cell] === turn &&
        tableData[2][cell] === turn
      )
        win = true;
      if (
        tableData[0][0] === turn &&
        tableData[1][1] === turn &&
        tableData[2][2] === turn
      )
        win = true;
      if (
        tableData[0][2] === turn &&
        tableData[1][1] === turn &&
        tableData[2][0] === turn
      )
        win = true;
    },
    [tableData]);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
