import React, { useReducer, useEffect, createContext, useMemo } from 'react';
import Table from './Table';
import Setting from './Setting';

export const CODE = {
  OPENED: 0,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  MINE: -7,
};

// context API
export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

// dispatch
const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCnt: 0,
};

const createMines = (row, cell, mine) => {
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });

  // 입력한 숫자만큼 지뢰 생성
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }

  // 가로 * 세로만큼 NORMAL cell 생성
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // 앞서 생성한 NORMAL cell에다 지뢰 심기
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  return data;
};

// actions
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

// action 발생 시 reducer에서 state 처리
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: createMines(action.row, action.cell, action.mine),
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        timer: 0,
        result: '',
        halted: false,
        openedCnt: 0,
      };

    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });

      const checked = [];
      let openedCnt = 0;

      const checkAround = (row, cell) => {
        // 상하좌우 칸이 없을 경우 제외
        if (
          row < 0 ||
          row >= tableData.length ||
          cell < 0 ||
          cell >= tableData[0].length
        )
          return;

        // 이미 클릭된 칸 제외
        if (
          [
            CODE.OPENED,
            CODE.FLAG_MINE,
            CODE.FLAG,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(tableData[row][cell])
        )
          return;
        // 이미 탐색한 칸은 pass. call stack over 방지
        if (checked.includes(row + '/' + cell)) {
          return;
        } else {
          checked.push(row + '/' + cell);
        }

        // 클릭한 칸에 주위 8칸 내 존재하는 지뢰 개수 표시
        let around = [tableData[row][cell - 1], tableData[row][cell + 1]];

        if (tableData[row - 1]) {
          around = around.concat([
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          ]);
        }
        if (tableData[row + 1]) {
          around = around.concat([
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          ]);
        }

        const count = around.filter((v) =>
          [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
        ).length;

        // 빈 칸 클릭 시 지뢰와 접할 때까지 모든 빈 칸 열기
        if (count === 0) {
          if (row > -1) {
            const near = [];
            // 제일 위 칸 클릭하는 경우
            if (row - 1 > -1) {
              near.push([row - 1, cell - 1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            // 제일 아래 칸 클릭하는 경우
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED)
                checkAround(n[0], n[1]);
            });
          }
        }
        if (tableData[row][cell] === CODE.NORMAL) openedCnt += 1;
        tableData[row][cell] = count;
      };
      checkAround(action.row, action.cell);
      console.log(state.openedCnt + openedCnt);
      // 승리 조건 설정
      let halted = false;
      let result = '';
      if (
        state.data.row * state.data.cell - state.data.mine ===
        state.openedCnt + openedCnt
      ) {
        halted = true;
        result = `YOU WON! It takes to only ${state.timer}sec to win!`;
      }

      return {
        ...state,
        tableData,
        openedCnt: state.openedCnt + openedCnt,
        halted,
        result,
      };
    }

    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;

      return {
        ...state,
        tableData,
        halted: true,
        result: 'YOU LOST!',
      };
    }

    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }

    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }

    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }

    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }

    default:
      return state;
  }
};

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, timer, result, halted } = state;
  // context API data를 TableContext.Provider에 바로 입력하면 rendering될 때마다 data도 같이 불러와 성능 저하 일어나기 때문에 useMemo()를 활용하여 tableData가 변경될 때만 data load.
  const value = useMemo(
    () => ({ tableData, halted, dispatch }),
    [tableData, halted]
  );

  useEffect(() => {
    let timer;
    if (halted === false) {
      timer = setInterval(() => dispatch({ type: INCREMENT_TIMER }), 1000);
    }
    return () => clearInterval(timer);
  }, [halted]);

  return (
    // context API에서 접근할 data를 TableContext.Provider로 묶어줘야 함
    <TableContext.Provider value={value}>
      <Setting />
      <div>{timer}초 경과</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default Minesweeper;
