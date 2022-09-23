/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    let columns = new Set();
    let positiveDiag = new Set();
    let negativeDiag = new Set();
    let result = [];
    
   let board = new Array(n).fill().map(() => new Array(n).fill("."))
    
    const backtrack = (r) => 
    {
      if (r == n)
      {
          let copy = board.map(item => item.join(""))
          result.push(copy)
          return 
      }   
        for (let c = 0; c < n; c++)
        {
            
            if((columns.has(c)) || ( positiveDiag.has(c + r)) || ((negativeDiag.has(c-r)))) continue;
            columns.add(c);
            positiveDiag.add(c+r)
            negativeDiag.add(c-r);
            board[r][c] = "Q";
             
            backtrack(r+1);
            columns.delete(c);
            positiveDiag.delete(c+r)
            negativeDiag.delete(c-r);
            board[r][c] = ".";
        }
    }
    backtrack(0);
    
    return result;
    
};
