// a and b are playing hand, c and d are non playing hand
// 0,1,2,3 means the player whose turn it is now has the hand [0,1]
// starting position is 1,1,1,1
const possibleMoves = (a, b, c, d) => {
  const arr = ['ac', 'ad', 'bc', 'bd'];
  const splitsandtransfers = [
    's02',
    's03',
    's04a',
    's04b',
    't13',
    't22',
    't14',
    't23',
    't24',
    't33',
  ];
  moves = [...arr];
  if (a == 0) {
    // A cannot attack
    removeItemOnce(moves, 'ac');
    removeItemOnce(moves, 'ad');
    if (b == 2) {
      moves.push('s02');
    } else if (b == 3) {
      moves.push('s03');
    } else if (b == 4) {
      moves.push('s04a');
      moves.push('s04b');
    }
  }
  if (c == 0) {
    // C cannot attack
    removeItemOnce(moves, 'ac');
    removeItemOnce(moves, 'bc');
  }
  if (a + b == 4) {
    if (a == 1) {
      moves.push('t13');
    } else {
      moves.push('t22');
    }
  }
  if (a + b == 5) {
    if (a == 1) {
      moves.push('t14');
    } else {
      moves.push('t23');
    }
  }
  if (a + b == 6) {
    if (a == 2) {
      moves.push('t24');
    } else {
      moves.push('t33');
    }
  }
  console.log(moves);
  return moves;
};
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
const buttons = document.querySelector('.possible-moves');
const A = document.getElementById('scoreA');
const B = document.getElementById('scoreB');
const C = document.getElementById('scoreC');
const D = document.getElementById('scoreD');
const turn = document.getElementById('turn');
const leftSide = document.getElementById('leftSide');
const leftcol = document.getElementById('leftcol');
const rightSide = document.getElementById('rightSide');
const rightcol = document.getElementById('rightcol');

// All Buttons

// Attacks
const acButton = document.getElementById('ac');
const adButton = document.getElementById('ad');
const bcButton = document.getElementById('bc');
const bdButton = document.getElementById('bd');

// Splits
const s02Button = document.getElementById('s02');
const s03Button = document.getElementById('s03');
const s04aButton = document.getElementById('s04a');
const s04bButton = document.getElementById('s04b');

// Transferss
const t13Button = document.getElementById('t13');
const t22Button = document.getElementById('t22');
const t14Button = document.getElementById('t14');
const t23Button = document.getElementById('t23');
const t24Button = document.getElementById('t24');
const t33Button = document.getElementById('t33');
const buttonsArr = [
  acButton,
  adButton,
  bcButton,
  bdButton,
  s02Button,
  s03Button,
  s04aButton,
  s04bButton,
  t13Button,
  t22Button,
  t14Button,
  t23Button,
  t24Button,
  t33Button,
];
const playablemoves = possibleMoves(+A.value, +B.value, +C.value, +D.value);
// leftSide.style.color = turn.innerText == '1' ? 'red' : 'green';
leftcol.style.backgroundColor = turn.innerText == '1' ? '#77DD77' : '#ff6961';

// rightSide.style.color = turn.innerText == '1' ? 'green' : 'red';
rightcol.style.backgroundColor = turn.innerText == '1' ? '#ff6961' : '#77DD77';
createButtonsForMoves(playablemoves);
buttons.addEventListener(
  'click',
  (handler = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    console.log(turn.parentElement);
    turn.parentElement.style.color =
      turn.innerText == '1' ? '#ff6961' : '#77DD77';
    leftcol.style.backgroundColor =
      turn.innerText == '1' ? '#ff6961' : '#77DD77';
    rightcol.style.backgroundColor =
      turn.innerText == '1' ? '#77DD77' : '#ff6961';
    // leftSide.style.color = turn.innerText == '1' ? 'red' : 'green';
    // rightSide.style.color = turn.innerText == '1' ? 'green' : 'red';
    const id = e.target.id;
    console.log(id);

    if (id === 'ac') {
      C.value = +C.value + +A.value;
    }
    if (id === 'ad') {
      D.value = +D.value + +A.value;
    }
    if (id === 'bc') {
      C.value = +C.value + +B.value;
    }
    if (id === 'bd') {
      D.value = +D.value + +B.value;
    }
    if (id == 't13') {
      A.value = 2;
      B.value = 2;
    }
    if (id == 't22') {
      A.value = 1;
      B.value = 3;
    }
    if (id == 't14') {
      A.value = 2;
      B.value = 3;
    }
    if (id == 't23') {
      A.value = 1;
      B.value = 4;
    }
    if (id == 't24') {
      A.value = 3;
      B.value = 3;
    }
    if (id == 't33') {
      A.value = 2;
      B.value = 4;
    }
    if (id == 's02') {
      A.value = 1;
      B.value = 1;
    }
    if (id == 's03') {
      A.value = 1;
      B.value = 2;
    }
    if (id == 's04a') {
      A.value = 2;
      B.value = 2;
    }
    if (id == 's04b') {
      A.value = 1;
      B.value = 3;
    }
    if (+C.value >= 5) {
      C.value = +C.value - 5;
    }
    if (+D.value >= 5) {
      D.value = +D.value - 5;
    }
    if (A.value > B.value) {
      [A.value, B.value] = [B.value, A.value];
    }
    if (C.value > D.value) {
      [C.value, D.value] = [D.value, C.value];
    }
    switchPlayers();
    console.log(+A.value, +B.value, +C.value, +D.value);
    if (A.value == 0 && B.value == 0) {
      document.querySelector('.game').classList.add('hidden');
      document.querySelector('.win').classList.remove('hidden');
      if (turn.innerText == '1') {
        document.querySelector('#winner').innerText = '2';
      } else {
        document.querySelector('#winner').innerText = '1';
      }
    }
    const moves = possibleMoves(+A.value, +B.value, +C.value, +D.value);
    createButtonsForMoves(moves);
    drawHands(+A.value, +B.value, +C.value, +D.value);
  })
);

const switchPlayers = () => {
  turn.innerText = turn.innerText == '1' ? '2' : '1';

  let temp = leftSide.innerText;
  leftSide.innerText = rightSide.innerText;
  rightSide.innerText = temp;
  [A.value, C.value] = [C.value, A.value];
  [B.value, D.value] = [D.value, B.value];
};

function createButtonsForMoves(moves) {
  buttonsArr.forEach((button) => {
    button.classList.add('hidden');
  });
  moves.forEach((move) => {
    document.getElementById(move).classList.remove('hidden');
  });
}

const playAgainBtn = document.getElementById('playAgain');
playAgainBtn.addEventListener('click', () => {
  console.log('hi pls reload page');
  location.reload();
});

const imgA = document.getElementById('imgA');
const imgB = document.getElementById('imgB');
const imgC = document.getElementById('imgC');
const imgD = document.getElementById('imgD');

const drawHands = (a, b, c, d) => {
  imgA.src = `media/media/points-${a}-unselected.svg`;
  imgB.src = `media/media/points-${b}-unselected.svg`;
  imgC.src = `media/media/points-${c}-unselected.svg`;
  imgD.src = `media/media/points-${d}-unselected.svg`;
};
