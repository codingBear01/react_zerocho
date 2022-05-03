const computerChoice = (imgCoord) => {
  return Object.entries(coords).find((v) => {
    return v[1] === imgCoord;
  })[0];
};

const coords = {
  rock: '0',
  scissors: '-142px',
  paper: '-284px',
};

const imgCoord = coords.rock;

console.log(computerChoice(imgCoord));
