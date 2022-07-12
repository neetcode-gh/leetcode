function spiralOrder(matrix: number[][]): number[] {
  const res: number[] = [];
  let left = 0;
  let right = matrix[0].length;
  let top = 0;
  let bottom = matrix.length;

  while (left < right && top < bottom) {
    // get every i in the top row
    for (let i = left; i < right; i++) {
      res.push(matrix[top][i]);
    }
    top += 1;

    // get every i in the right column
    for (let i = top; i < bottom; i++) {
      res.push(matrix[i][right - 1]);
    }
    right -= 1;

    if (!(left < right && top < bottom)) {
      break;
    }

    // get ever i in the bottom row
    for (let i = right - 1; i > left - 1; i--) {
      res.push(matrix[bottom - 1][i]);
    }
    bottom -= 1;

    // get evet i in the left column
    for (let i = bottom - 1; i > top - 1; i--) {
      res.push(matrix[i][left]);
    }
    left += 1;
  }

  return res;
}
