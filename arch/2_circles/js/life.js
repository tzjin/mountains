// optimizations (super CPU intensive atm)
// only redraw changes
// implement list life

var cellSize,
    width,
    height,
    cvs,
    ctx,
    board,
    newBoard;

function init() {
  cellSize = 12;
  width = Math.round(document.body.clientWidth / cellSize);
  height = Math.round(document.body.clientHeight / cellSize);
  cvs = document.getElementById('bg');
  cvs.width = cellSize * width;
  cvs.height = cellSize * height;
  ctx = cvs.getContext('2d');
  board = [];
  newBoard = [];
};


function reset() {
   board = [];
   for (var i = 0; i < width; i++) {
      var arr = [];
      for (var j = 0; j < height; j++) {
         arr.push(false);
      };
      board.push(arr);
   };
}

function manual () {
  board[5][5] = true;
  board[4][4] = true;
  board[4][5] = true;
  board[5][4] = true;

  board[11][3] = true;
  board[12][3] = true;
  board[13][3] = true;
}

function display() {
   for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        ctx.beginPath();
        ctx.arc((i + 0.5) * cellSize, (j + 0.5) * cellSize, cellSize / 2.4, 0, 2 * Math.PI);
        ctx.fillStyle = (board[i][j]) ? chooseColor() : 'blue';
        ctx.fill();
      };
   };
}

function chooseColor() {
  return 'white';
}

function testDisp() {
  ctx.beginPath();
  ctx.rect(100, 100, 100, 100);
  ctx.fillStyle = 'black';
  ctx.fill();
}


function step() {
//  newBoard = new Array(width);
//  for (var i = 0; i < width; i++) {
//    newBoard = new Array(height);
//  }

  // reset newBoard
  newBoard = [];
   for (var i = 0; i < width; i++) {
      var arr = [];
      for (var j = 0; j < height; j++) {
         arr.push(false);
      };
      newBoard.push(arr);
   };

  // set newBoard
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < width; j++) {
      newBoard[i][j] = countNeighbors(i, j);
    }
  }

  // display
  board = newBoard;
  display();
};

function countNeighbors (x, y) {
  var count = 0;
  var neighbors = [ board[(x + 1) % width][(y + 1) % height],
                    board[(x + 1) % width][y],
                    board[(x + 1) % width][(y + height - 1) % height],
                    board[x][(y + height - 1) % height],
                    board[(x + width - 1) % width][(y + height - 1) % height],
                    board[(x + width - 1) % width][y],
                    board[(x + width - 1) % width][(y + 1) % height],
                    board[x][(y + 1) % height]
                  ];

  for (var i = 0; i < neighbors.length; i++) {
    if (neighbors[i] === true) {
      count++;
    }
  }

  return (count === 3) || (count === 2 && board[x][y]);
}


function run(arr) {
  setInterval(function() {
                var newArr = step(arr);
                display(newArr);
                arr = newArr;
}, 100);
}

$(document).ready(function () {
  init();
  reset();
  manual();
  run(board);
//  testDisp();
});
