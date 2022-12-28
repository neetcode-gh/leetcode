/**
 * https://leetcode.com/problems/surrounded-regions/
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
 var solve = function solve(board) {
    searchRows(board);/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
    searchCols(board);/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
    searchGrid(board);/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
}

var searchRows = (board) => {
    const [ rows, cols ] = [ board.length, board[0].length ];

    for (let row = 0; row < rows; row++) {      /* Time O(ROWS) */
        dfs(board, row, rows, 0, cols);         /* Space O(ROWS) */
        dfs(board, row, rows, (cols - 1), cols);/* Space O(ROWS) */
    }
}

var searchCols = (board) => {
    const [ rows, cols ] = [ board.length, board[0].length ];

    for (let col = 1; col < (cols - 1); col++) {/* Time O(COLS) */
        dfs(board, 0, rows, col, cols);         /* Space O(COLS) */
        dfs(board, (rows - 1), rows, col, cols);/* Space O(COLS) */
    }
}

var searchGrid = (board) => {
    const [ rows, cols ] = [ board.length, board[0].length ];

    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        for (let col = 0; col < cols; col++) {/* Time O(COLS) */
            const isO = board[row][col] === 'O';
            if (isO) board[row][col] = 'X';

            const isStar = board[row][col] === '*';
            if (isStar) board[row][col] = 'O';
        }
    }
}

const dfs = (board, row, rows, col, cols) => {
    const isBaseCase = board[row][col] !== 'O';
    if (isBaseCase) return;

    board[row][col] = '*';

    for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
        dfs(board, _row, rows, _col, cols);/* Time O(HEIGHT) | Space O(HEIGHT) */
    }
}

var getNeighbors = (row, rows, col, cols) => [ [0, 1], [0, -1], [1, 0], [-1, 0] ]
    .map(([ _row, _col ]) => [ (row + _row), (col + _col)])
    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols))


/**
 * https://leetcode.com/problems/surrounded-regions/
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
 var solve = function solve(board, queue = new Queue([])) {
    searchRows(board, queue);/* Time O(ROWS + COLS) | Space O(ROWS + COLS) */
    searchCols(board, queue);/* Time O(ROWS + COLS) | Space O(ROWS + COLS) */
    bfs(board, queue);       /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
    searchGrid(board);       /* Time O(ROWS * COLS) */
}

var searchRows = (board, queue) => {
    const [ rows, cols ] = [ board.length, board[0].length ]

    for (let row = 0; row < rows; row++) { /* Time O(ROWS) */
        queue.enqueue([ row, 0 ]);         /* Space O(ROWS) */
        queue.enqueue([ row, (cols - 1) ]);/* Space O(ROWS) */
    }
}

var searchCols = (board, queue) => {
    const [ rows, cols ] = [ board.length, board[0].length ]

    for (let col = 0; col < (cols - 1); col++) {/* Time O(COLS) */
        queue.enqueue([ 0, col ]);              /* Space O(COLS) */
        queue.enqueue([ (rows - 1), col ]);     /* Space O(COLS) */
    }
}

var bfs = (board, queue) => {
    const [ rows, cols ] = [ board.length, board[0].length ];

    while (!queue.isEmpty()) {
        for (let i = (queue.size() - 1); 0 <= i; i--) {/* Time O(WIDTH) */
            const [ row, col ] = queue.dequeue();

            const isBaseCase = board[row][col] !== 'O';
            if (isBaseCase) continue;

            board[row][col] = '*';

            for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
                queue.enqueue([ _row, _col ]);         /* Space O(WIDTH) */
            }
        }
    } 
}

var searchGrid = (board) => {
    const [ rows, cols ] = [ board.length, board[0].length ];

    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        for (let col = 0; col < cols; col++) {/* Time O(COLS) */
            const isO = board[row][col] === 'O';
            if (isO) board[row][col] = 'X';

            const isStar = board[row][col] === '*';
            if (isStar) board[row][col] = 'O';
        }
    }
}