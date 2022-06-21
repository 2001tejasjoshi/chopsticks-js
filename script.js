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
    // C cannot be attacked
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
const rightSide = document.getElementById('rightSide');

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
createButtonsForMoves(playablemoves);
buttons.addEventListener(
  'click',
  (handler = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    const id = e.target.id;
    console.log(id);
    switchPlayers();

    if (id === 'ac') {
      const total = +C.value + +A.value;
      if (total >= 5) {
        A.value = 5 - total;
      } else {
        A.value = total;
      }
    }
    if (id === 'ad') {
      const total = +D.value + +A.value;
      if (total >= 5) {
        B.value = 5 - total;
      } else {
        B.value = total;
      }
    }
    if (id === 'bc') {
      const total = +C.value + +B.value;
      if (total >= 5) {
        A.value = 5 - total;
      } else {
        A.value = total;
      }
    }
    if (id === 'bd') {
      const total = +D.value + +B.value;
      if (total >= 5) {
        B.value = 5 - total;
      } else {
        B.value = total;
      }
    }
    if (id == 't13') {
      C.value = 2;
      D.value = 2;
    }
    if (id == 't22') {
      C.value = 1;
      D.value = 3;
    }
    if (id == 't14') {
      C.value = 2;
      D.value = 3;
    }
    if (id == 't23') {
      C.value = 1;
      D.value = 4;
    }
    if (id == 't24') {
      C.value = 3;
      D.value = 3;
    }
    if (id == 't33') {
      C.value = 2;
      D.value = 4;
    }
    if (id == 's02') {
      C.value = 1;
      D.value = 1;
    }
    if (id == 's03') {
      C.value = 1;
      D.value = 2;
    }
    if (id == 's04a') {
      C.value = 2;
      D.value = 2;
    }
    if (id == 's04b') {
      C.value = 1;
      D.value = 3;
    }
    if (A.value > B.value) {
      [A.value, B.value] = [B.value, A.value];
    }
    if (C.value > D.value) {
      [C.value, D.value] = [D.value, C.value];
    }
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
