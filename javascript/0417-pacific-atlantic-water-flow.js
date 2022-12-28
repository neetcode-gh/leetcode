/**
 * https://leetcode.com/problems/pacific-atlantic-water-flow/
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    const [ pacificReachable, atlanticReachable ] = search(heights);   /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */

    return searchGrid(heights, pacificReachable, atlanticReachable);/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
};

var search = (heights) => {
    const [ rows, cols ] = [ heights.length, heights[0].length ];
    const [ pacificReachable, atlanticReachable ] = [ getMatrix(rows, cols), getMatrix(rows, cols) ];/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */

    searchRows(heights, rows, cols, pacificReachable, atlanticReachable);
    searchCols(heights, rows, cols, pacificReachable, atlanticReachable);

    return [ pacificReachable, atlanticReachable ];
}

var getMatrix = (rows, cols) => new Array(rows).fill()/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
    .map(() => new Array(cols).fill(false));

var searchRows = (heights, rows, cols, pacificReachable, atlanticReachable) => {
   for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        const [ pacificStart, atlanticStart ] = [ 0, (cols - 1) ];

        dfs(row, pacificStart, rows, cols, pacificReachable, heights);   /* Space O(ROWS * COLS) */
        dfs(row, atlanticStart, rows, cols, atlanticReachable, heights); /* Space O(ROWS * COLS) */
    }
}

var searchCols = (heights, rows, cols, pacificReachable, atlanticReachable) => {
    for (let col = 0; col < cols; col++) {/* Time O(COLS) */
        const [ pacificStart, atlanticStart ] = [ 0, (rows - 1) ];

        dfs(pacificStart, col, rows, cols, pacificReachable, heights);   /* Space O(ROWS * COLS) */
        dfs(atlanticStart, col, rows, cols, atlanticReachable, heights); /* Space O(ROWS * COLS) */
    }
}

const dfs = (row, col, rows, cols, isReachable, heights) => {
    isReachable[row][col] = true;

    for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
        if (isReachable[_row][_col]) continue;

        const isLower = heights[_row][_col] < heights[row][col];
        if (isLower) continue;


        dfs(_row, _col, rows, cols, isReachable, heights);              /* Space O(ROWS * COLS) */
    }
}

var searchGrid = (heights, pacificReachable, atlanticReachable, intersection = []) => {
    const [ rows, cols ] = [ heights.length, heights[0].length ];

    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        for (let col = 0; col < cols; col++) {/* Time O(COLS) */
            const isReachable = pacificReachable[row][col] && atlanticReachable[row][col]
            if (!isReachable) continue

            intersection.push([ row, col ]);                             /* Space O(ROWS * COLS) */
        }
    }

    return intersection;
}

var getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ], [ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]
    .map(([ _row, _col ]) => [ (row + _row), (col + _col)])
    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols))

/**
 * https://leetcode.com/problems/pacific-atlantic-water-flow/
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {number[][]} heights
 * @return {number[][]}
 */
 var pacificAtlantic = function(heights) {
    const [ pacificQueue, atlanticQueue ] = search(heights);                                                    /* Time O(ROWS + COLS) | Space O(ROWS + COLS) */
    const [ pacificReachable, atlanticReachable ] = [ bfs(heights, pacificQueue), bfs(heights, atlanticQueue) ];/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */

    return getIntersection(heights, pacificReachable, atlanticReachable);                                       /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
}

var search = (heights, pacificQueue = new Queue([]), atlanticQueue = new Queue([])) => {
    searchRows(heights, pacificQueue, atlanticQueue);
    searchCols(heights, pacificQueue, atlanticQueue);

    return [ pacificQueue, atlanticQueue ]
}

var searchRows = (heights, pacificQueue, atlanticQueue) => {
    const [ rows, cols ] = [ heights.length, heights[0].length ];

    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        pacificQueue.enqueue([ row, 0 ]);          /* Space O(ROWS) */
        atlanticQueue.enqueue([ row, (cols - 1) ]);/* Space O(ROWS) */
    }
}

var searchCols = (heights, pacificQueue, atlanticQueue) => {
    const [ rows, cols ] = [ heights.length, heights[0].length ];

    for (let col = 0; col < cols; col++) {/* Time O(COLS) */
        pacificQueue.enqueue([ 0, col ]);          /* Space O(COLS) */
        atlanticQueue.enqueue([ (rows - 1), col ]);/* Space O(COLS) */
    }
}

const bfs = (heights, queue) => {
    const [ rows, cols ] = [ heights.length, heights[0].length ];
    const isReachable = getMatrix(rows, cols);         /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */

    while (!queue.isEmpty()) {
        for (let i = (queue.size() - 1); 0 <= i; i--) {/*                     | Space O(WIDTH) */
            const [ row, col ] = queue.dequeue();

            checkNeighbor(heights, row, rows, col, cols, isReachable, queue);
        }
    }

    return isReachable;
}

var getMatrix = (rows, cols) => new Array(rows).fill()/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
    .map(() => new Array(cols).fill(false));

var checkNeighbor = (heights, row, rows, col, cols, isReachable, queue) => {
    isReachable[row][col] = true;

    for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
        if (isReachable[_row][_col]) continue;

        const isLower = heights[_row][_col] < heights[row][col];
        if (isLower) continue;

        queue.enqueue([ _row, _col ]);
    }
}

var getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ], [ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]
    .map(([ _row, _col ]) => [ (row + _row), (col + _col)])
    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols))

const getIntersection = (heights, pacificReachable, atlanticReachable, intersection = []) => {
    const [ rows, cols ] = [ heights.length, heights[0].length ];

    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        for (let col = 0; col < cols; col++) {/* Time O(COLS) */
            const isReachable = pacificReachable[row][col] && atlanticReachable[row][col];
            if (!isReachable) continue;

            intersection.push([ row, col ]);  /* Space O(ROWS * COLS) */
        }
    }

    return intersection;
}