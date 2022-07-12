function searchMatrix(matrix: number[][], target: number): boolean {
  const rows = matrix.length;
  const columns = matrix[0].length;

  let top = 0;
  let bot = rows - 1;

  while (top <= bot) {
    let row = Math.floor((top + bot) / 2);
    if (target > matrix[row][columns - 1]) {
      top = row + 1;
    } else if (target < matrix[row][0]) {
      bot = row - 1;
    } else {
      break;
    }
  }

  if (top > bot) {
    return false;
  }

  let row = Math.floor((top + bot) / 2);
  let l = 0;
  let r = columns - 1;

  while (l <= r) {
    let m = Math.floor((l + r) / 2);
    if (target > matrix[row][m]) {
      l = m + 1;
    } else if (target < matrix[row][m]) {
      r = m - 1;
    } else {
      return true;
    }
  }

  return false;
}
