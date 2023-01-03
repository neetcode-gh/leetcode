/**
 * Brute Force - DFS
 * Time O(2^N) | Space O(HEIGHT)
 * https://leetcode.com/problems/unique-paths/
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 var uniquePaths = (row, col) => {
    const isBaseCase = ((row == 1) || (col == 1));
    if (isBaseCase) return 1;

    return dfs(row, col);/* Time O(2^N) | Space O(HEIGHT) */
}

var dfs = (row, col) => {
    const left = uniquePaths((row - 1), col); /* Time O(2^N) | Space O(HEIGHT) */
    const right = uniquePaths(row, (col - 1));/* Time O(2^N) | Space O(HEIGHT) */

    return (left + right);
}

/**
 * DP - Top Down
 * Matrix - Memoization
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * https://leetcode.com/problems/unique-paths/
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = (row, col, memo = getMemo(row, col)) => {
    const isBaseCase = ((row === 1) || (col === 1));
    if (isBaseCase) return 1;

    const hasSeen = (memo[row][col] !== 0);
    if (hasSeen) return memo[row][col];

    return dfs(row, col, memo);/* Time O(ROWS * COLS) | Space O((ROWS * COLS) + HEIGHT) */
};

var getMemo = (row, col) => new Array((row + 1)).fill()/* Time O(ROWS)| Space O(ROWS) */
    .map(() => new Array((col + 1)).fill(0));                /* Time O(COLS)| Space O(COLS) */

var dfs = (row, col, memo) => {
    const left = uniquePaths((row - 1), col, memo); /* Time O(ROWS * COLS) | Space O(HEIGHT) */
    const right = uniquePaths(row, (col - 1), memo);/* Time O(ROWS * COLS) | Space O(HEIGHT) */

    memo[row][col] = (left + right);                /*                     | Space O(ROWS * COLS) */
    return memo[row][col];
}

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * https://leetcode.com/problems/unique-paths/
 * @param {number} row
 * @param {number} col
 * @return {number}
 */
var uniquePaths = (row, col) => {
    const tabu = initTabu(row, col);/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */

    search(row, col, tabu);         /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */

    return tabu[row - 1][col - 1];
};

var search = (row, col, tabu) => {
    for (let _row = 1; (_row < row); _row++) {/* Time O(ROWS)*/
        for (let _col = 1; (_col < col); _col++) {/* Time O(COLS)*/
            const left = (tabu[(_row - 1)][_col])
            const right = (tabu[_row][(_col - 1)]);

            tabu[_row][_col] = (left + right);        /* Space O(ROWS * COLS) */
        }
    }
}

var initTabu = (row, col) => {
    const tabu = new Array(row).fill()        /* Time O(ROWS)     | Space O(ROWS) */ 
        .map(() => new Array(col).fill(0));       /* Time O(COLS) | Space O(COLS) */ 
    
    for (let _row = 0; (_row < row); _row++) {/* Time O(ROWS) */ 
        tabu[_row][0] = 1;                        /*              | Space O(ROWS * COLS) */ 
    }

    for (let _col = 0; (_col < col); _col++) {/* Time O(COLS) */ 
        tabu[0][_col] = 1;                        /*              | Space O(ROWS * COLS) */ 
    }

    return tabu;
}

/**
 * DP - Bottom Up
 * Array - Tabulation
 * Time O(ROWS * COLS) | Space O(COLS)
 * https://leetcode.com/problems/unique-paths/
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = (row, col) => {
    const tabu = initTabu(col);/* Time O(COLS)        | Space O(COLS) */ 

    search(row, col, tabu);    /* Time O(ROWS * COLS) | Space O(COLS) */ 

    return tabu[(col - 1)];
};

var initTabu = (col) => new Array(col).fill(1); /* Time O(COLS) | Space O(COLS) */ 

var search = (row, col, tabu) => {
    for (let _row = 1; (_row < row); _row++) {/* Time O(ROWS) */ 
        for (let _col = 1; (_col < col); _col++) {/* Time O(COLS) */ 
            const prev = tabu[(_col - 1)];

            tabu[_col] += prev;                     /* Space O(COLS) */ 
        }
    }
}