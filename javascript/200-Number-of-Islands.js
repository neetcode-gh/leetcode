/**
 * https://leetcode.com/problems/number-of-islands/
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid, connectedComponents = 0) {
    const [ rows, cols ] = [ grid.length, grid[0].length ]

    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        for (let col = 0; col < cols; col++) {/* Time O(COLS) */
            const isIsland = grid[row][col] === '1'
            if (isIsland) connectedComponents++

            dfs(grid, row, rows, col, cols);    /* Space O(ROWS * COLS) */
        }
    }

    return connectedComponents
};

const dfs = (grid, row, rows, col, cols) => {
    const isBaseCase = grid[row][col] === '0';
    if (isBaseCase) return;

    grid[row][col] = '0';

    for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
        dfs(grid, _row, rows, _col, cols);      /* Space O(ROWS * COLS) */
    }
}

var getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ], [ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]
    .map(([ _row, _col ]) => [ (row + _row), (col + _col) ])
    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols))

/**
 * https://leetcode.com/problems/number-of-islands/
 * Time O(ROWS * COLS) | Space O(MIN(ROWS,COLS))
 * @param {character[][]} grid
 * @return {number}
 */
 var numIslands = function(grid, connectedComponents = 0) {
    const [ rows, cols ] = [ grid.length, grid[0].length ]

    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        for (let col = 0; col < cols; col++) {/* Time O(COLS) */
            const isIsland = grid[row][col] === '1';
            if (isIsland) connectedComponents++;

            bfs(grid, rows, cols, new Queue([ [ row, col ] ]));/* Space O(MIN(ROWS,COLS)) */
        }
    }

    return connectedComponents
 }

 const bfs = (grid, rows, cols, queue) => {
    while (!queue.isEmpty()) {
        for (let i = (queue.size() - 1); 0 <= i; i--) {/* Time O(WIDTH) */
            const [ row, col ] = queue.dequeue();

            const isWater = grid[row][col] === '0';
            if (isWater) continue;

            grid[row][col] = '0';

            for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
                queue.enqueue([ _row, _col ]);             /* Space O(MIN(ROWS,COLS)) */
            }
        }
    }
 }

var getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ], [ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]
    .map(([ _row, _col]) => [ (row + _row), (col + _col) ])
    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols));

/**
 * https://leetcode.com/problems/number-of-islands/
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    const unionFind = new UnionFind(grid);/* Time O(ROWS * COLS) | Space O(ROWS * COLS) */

    searchGrid(grid, unionFind);          /* Time O(ROWS * COLS) */

    return unionFind.connectedComponents;
}

var searchGrid = (grid, unionFind) => {
    const [ rows, cols ] = [ grid.length, grid[0].length ];

    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        for (let col = 0; col < cols; col++) {/* Time O(COLS) */
            const isWater = grid[row][col] === '0';
            if (isWater) continue;

            grid[row][col] = '0';

            searchRows(unionFind, grid, row, rows, col, cols);
            searchCols(unionFind, grid, row, rows, col, cols);
        }
    }
}

const searchRows = (unionFind, grid, row, rows, col, cols) => [ 1, -1 ]
    .map((_row) => row + _row)
    .filter((_row) => isInBound(_row, rows) && isIsland(grid[_row][col]))
    .map((_row) => [ index(row, cols, col), index(_row, cols, col) ])
    .forEach(([ x, y ]) => unionFind.union(x, y));

const isInBound = (val, vals) => (0 <= val) && (val < vals)
const isIsland = (cell) => cell === '1'
const index = (row, cols, col) => ((row * cols) + col)

const searchCols = (unionFind, grid, row, rows, col, cols) => [ 1, -1 ]
    .map((_col) => col + _col)
    .filter((_col) => isInBound(_col, cols) && isIsland(grid[row][_col]))
    .map((_col) => [ index(row, cols, col), index(row, cols, _col) ])
    .forEach(([ x, y ]) => unionFind.union(x, y));

class UnionFind {
    constructor (grid) {
        const [ rows, cols ] = [ grid.length, grid[0].length ];

        this.connectedComponents = 0;
        this.grid = grid;
        this.rows = rows;
        this.cols = cols;
        this.parent = new Array(rows * cols).fill(0);
        this.rank = new Array(rows * cols).fill(0);

        this.findIslands();
    }

    findIslands ({ grid, rows, cols, parent } = this) {
        for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
            for (let col = 0; col < cols; col++) {/* Time O(COLS) */
                const isWater = grid[row][col] === '0';
                if (isWater) continue;

                const index = (row * cols) + col;

                parent[index] = index;/* Space O(ROWS * COLS) */
                this.connectedComponents++;
            }
        }
    }

    find (index, { parent } = this) {
        const isEqual = () => parent[index] === index;
        while (!isEqual()) {
            index = parent[index];
        }

        return parent[index];
    }

    union (x, y, { parent, rank } = this) {
        const [ rootX, rootY ] = [ this.find(x), this.find(y) ];

        const hasCycle = rootX === rootY;
        if (hasCycle) return;

        this.connectedComponents--;

        const isXGreater = rank[rootY] < rank[rootX];
        if (isXGreater) return parent[rootY] = rootX;

        const isYGreater = rank[rootX] < rank[rootY];
        if (isYGreater) return parent[rootX] = rootY;

        parent[rootY] = rootX;      /* Space O(ROWS * COLS) */
        rank[rootX]++;              /* Space O(ROWS * COLS) */
    }
}
