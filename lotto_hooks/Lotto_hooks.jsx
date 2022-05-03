import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import Ball from './Ball';

const getWinNums = () => {
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNum = shuffle[shuffle.length - 1];
  const winNums = shuffle.slice(0, 6).sort((a, b) => a - b);
  return [...winNums, bonusNum];
};

const Lotto = () => {
  const lottoNums = useMemo(() => getWinNums(), []);
  const [winNums, setWinNums] = useState(lottoNums);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    for (let i = 0; i < winNums.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNums[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[winNums.length - 1] = setTimeout(() => {
      setBonus(winNums[winNums.length - 1]);
      setRedo(true);
    }, winNums.length * 1000);

    return () => {
      timeouts.current.forEach((v) => clearTimeout(v));
    };
  }, [timeouts.current]);
  // 두 번째 parameter가 empty array라면 componentDidMount()수행
  // array에 elements가 있으면 componentDidMount() & componentDidUpdate 둘 다 수행

  const onClickRedo = useCallback(() => {
    setWinNums(getWinNums());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNums]);

  return (
    <>
      <div>Win Nums</div>
      <div id="result">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>Bonus</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>Try Again?</button>}
    </>
  );
};

export default Lotto;
