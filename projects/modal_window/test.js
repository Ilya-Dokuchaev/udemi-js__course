//6th kata validate Sudoku



function validateSudoku(board) {



  let rows = [];
  let columns = [];
  for (let i = 0; i < 9; i++) {
    rows.push([]);
    columns.push([]);
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {

      let cell = board[i][j];
      if(cell!==0) {
        console.log(cell);
        if (rows[i].includes(cell) ){
          return false
        } else rows[i].push(cell);

        if (columns[j].includes(cell)) {
          return false;
        } else columns[j].push(cell);
      }else return false
    }
  }

  return true;

}
const board = [[8,4,7,2,6,5,1,0,3],
  [1,3,6,7,0,8,2,4,5],
  [0,5,2,1,4,3,8,6,7],
  [4,2,0,6,7,1,5,3,8],
  [6,7,8,5,3,2,0,1,4],
  [3,1,5,4,8,0,7,2,6],
  [5,6,4,0,1,7,3,8,2],
  [7,8,1,3,2,4,6,5,0],
  [2,0,3,8,5,6,4,7,1]]
console.log(validateSudoku(board));