/**
 * https://leetcode.com/problems/max-area-of-island
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {number[][]} grid
 * @return {number}
 */
 var maxAreaOfIsland = function(grid, maxArea = 0) {
    const [ rows, cols ] = [ grid.length, grid[0].length ];
    const seen = new Array(rows).fill().map(() => new Array(cols));

    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        for (let col = 0; col < cols; col++) {/* Time O(COLS) */
            const area = getArea(grid, row, rows, col, cols, seen);/* Space O(ROWS * COLS) */

            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea;
};

var getArea = (grid, row, rows, col, cols, seen) => {
    const isBaseCase = grid[row][col] === 0;
    if (isBaseCase) return 0;

    if (seen[row][col]) return 0;
    seen[row][col] = true;                                          /* Space O(ROWS * COLS) */

    return dfs(grid, row, rows, col, cols, seen) + 1;               /* Space O(ROWS * COLS) */
}

const dfs = (grid, row, rows, col, cols, seen, area = 0) => {
    for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
        area += getArea(grid, _row, rows, _col, cols, seen);
    }

    return area
} 

var getNeighbors = (row, rows, col, cols) => [[ 0, 1 ], [ 0, -1 ], [ 1, 0 ], [ -1, 0 ]]
    .map(([ _row, _col]) => [ (row + _row), (col + _col) ])
    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols))

 /**
 * https://leetcode.com/problems/number-of-islands/
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {character[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = (grid, maxArea = 0) => {
    const [ rows, cols ] = [ grid.length, grid[0].length ]
    const seen = new Array(rows).fill().map(() => new Array(cols));

    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        for (let col = 0; col < cols; col++) {/* Time O(COLS) */
            const isBaseCase = grid[row][col] === 0
            if (isBaseCase) continue;

            if (seen[row][col]) continue;
            seen[row][col] = true;                                      /* Space O(ROWS * COLS) */

            const area = getArea(new Queue([[ row, col ]]), grid, seen);/* Space O(ROWS * COLS) */

            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea
}

var getArea = (queue, grid, seen, area = 0) => {
    const [ rows, cols ] = [ grid.length, grid[0].length ];

    while (!queue.isEmpty()) {
        for (let i = (queue.size() - 1); 0 <= i; i--) {/* Time O(WIDTH) */
            const [ row, col ] = queue.dequeue();

            for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
                const isBaseCase = grid[_row][_col] === 0;
                if (isBaseCase) continue;

                if (seen[_row][_col]) continue;
                seen[_row][_col] = true;                                /* Space O(ROWS * COLS) */
    
                queue.enqueue([ _row, _col ]);                          /* Space O(HEIGHT) */
            }

            area++;
        }
    }

    return area;
}

var getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ], [ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]
    .map(([ _row, _col]) => [ (row + _row), (col + _col) ])
    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols))