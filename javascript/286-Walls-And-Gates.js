/**
 * https://leetcode.com/problems/walls-and-gates/
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function(rooms) {
    const [ rows, cols ] = [ rooms.length, rooms[0].length ];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const isGate = rooms[row][col] === 0;
            if (!isGate) continue;

            dfs(rooms, row, col);
        }
    }
}

const dfs = (rooms, row, col) => {
    const [ rows, cols ] = [ rooms.length, rooms[0].length ];

    for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
        const isPreviousDistanceGreater = rooms[_row][_col] <= (rooms[row][col] + 1);
        if (isPreviousDistanceGreater) continue;

        rooms[_row][_col] = (rooms[row][col] + 1);

        dfs(rooms, _row, _col);
    }
}

var getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ],[ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]
    .map(([ _row, _col ]) => [ (row + _row), (col + _col) ])
    .filter(([ _row, _col ]) => (0 <= _row) && (0 <= _col) && (_row < rows) && (_col < cols));

/**
 * https://leetcode.com/problems/walls-and-gates/
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function(rooms) {
    const queue = searchGrid(rooms);

    bfs(rooms, queue);
};

const searchGrid = (rooms, queue = new Queue([])) => {
    const [ rows, cols ] = [ rooms.length, rooms[0].length ];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const isGate = rooms[row][col] === 0;
            if (!isGate) continue;

            queue.enqueue([ row, col ]);
        }
    }

    return queue;
}

const bfs = (rooms, queue) => {
    while (!queue.isEmpty()) {
        for (let i = (queue.size() - 1); 0 <= i; i--) {
            checkNeighbors(rooms, queue);
        }
    }
}

const checkNeighbors = (rooms, queue) => {
    const [ rows, cols ] = [ rooms.length, rooms[0].length ];
    const [ row, col ] = queue.dequeue();

    for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
        const isINF = rooms[_row][_col] === 2147483647; /* (2 ** 31) - 1 */
        if (!isINF) continue;

        rooms[_row][_col] = (rooms[row][col] + 1);
        queue.enqueue([ _row, _col ]);
    }
}

var getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ],[ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]
    .map(([ _row, _col ]) => [ (row + _row), (col + _col) ])
    .filter(([ _row, _col ]) => (0 <= _row) && (0 <= _col) && (_row < rows) && (_col < cols));
