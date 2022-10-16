/**
 * Matrix - Spiral Traversal Pre Update
 * Array - Ignore Auxilary Space O(ROWS * COLS)
 * Time O(ROWS * COLS) | Space O(1)
 * https://leetcode.com/problems/spiral-matrix/
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix, order = []) {
    const [ rows, cols ] = [ (matrix.length - 1), (matrix[0].length - 1) ];
    let [ top, bot, left, right ] = [ 0, rows, 0, cols ];

    const isInBounds = () => ((left <= right) && (top <= bot));
    while (isInBounds()) {/* Time O(ROWS * COLS) */
        addTop(
            matrix, top, bot, left, right, order
        );                /* Time O(COLS)        | Ignore Auxilary Spsace O(ROWS * COLS) */
        top++;

        addRight(
            matrix, top, bot, left, right, order
        );                /* Time O(ROWS)        | Ignore Auxilary Spsace O(ROWS * COLS) */
        right--;

        const hasRow = (top <= bot);
        if (hasRow) {
            addBot(
                matrix, top, bot, left, right, order
            );           /* Time O(COLS)         | Ignore Auxilary Spsace O(ROWS * COLS) */
            bot--;
        }

        const hasCol = (left <= right);
        if (hasCol) {
            addLeft(
                matrix, top, bot, left, right, order
            );            /* Time O(ROWS)        | Ignore Auxilary Spsace O(ROWS * COLS) */
            left++;
        }
    }
    
    return order;
};

var addTop = (matrix, top, bot, left, right, order) => {
    for (let col = left; col <= right; col++) {/* Time O(COLS) */
        order.push(matrix[top][col]);              /* Ignore Auxilary Spsace O(ROWS * COLS) */
    }
}

var addRight = (matrix, top, bot, left, right, order) => {
    for (let row = top; row <= bot; row++) {/* Time O(ROWS) */
        order.push(matrix[row][right]);         /* Ignore Auxilary Spsace O(ROWS * COLS) */
    }
}

var addBot = (matrix, top, bot, left, right, order) => {
    for (let col = right; left <= col; col--) {/* Time O(COLS) */
        order.push(matrix[bot][col]);              /* Ignore Auxilary Spsace O(ROWS * COLS) */
    }
}

var addLeft = (matrix, top, bot, left, right, order) => {
    for (let row = bot; top <= row; row--) {/* Time O(ROWS) */
        order.push(matrix[row][left]);          /* Ignore Auxilary Spsace O(ROWS * COLS) */
    }
}

/**
 * Matrix - Spiral Traversal Post Update
 * Array - Ignore Auxilary Space O(ROWS * COLS)
 * Time O(ROWS * COLS) | Space O(1)
 * https://leetcode.com/problems/spiral-matrix/
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = (matrix, order = []) => {
    const [ rows, cols ] = [ matrix.length, matrix[0].length ];
    const cells = (rows * cols);
    let [ top, bot, left, right ] = [ 0, (rows - 1), 0, (cols - 1) ];

    while (order.length < cells) {/* Time O(ROWS * COLS) */
        traverse(
            matrix, top, bot, left, right, order
        );                        /* Time O(ROWS * COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */

        top++; bot--;
        left++; right--;
    }
    
    return order;
}

var traverse = (matrix, top, bot, left, right, order) => {
    addTop(matrix, top, bot, left, right, order);  /* Time O(COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */
    addRight(matrix, top, bot, left, right, order);/* Time O(ROWS) | Ignore Auxilary Spsace O(ROWS * COLS)*/
    addBot(matrix, top, bot, left, right, order);  /* Time O(COLS) | Ignore Auxilary Spsace O(ROWS * COLS)*/
    addLeft(matrix, top, bot, left, right, order); /* Time O(ROWS) | Ignore Auxilary Spsace O(ROWS * COLS. */
}

var addTop = (matrix, top, bot, left, right, order) => {
    for (let col = left; (col <= right); col++) {/* Time O(COLS) */
        order.push(matrix[top][col]);                /* Ignore Auxilary Spsace O(ROWS * COLS) */
    }
}

var addRight = (matrix, top, bot, left, right, order) => {
    for (let row = (top + 1); (row <= bot); row++) {/* Time O(ROWS) */
        order.push(matrix[row][right]);                 /* Ignore Auxilary Spsace O(ROWS * COLS) */
    }
}

var addBot = (matrix, top, bot, left, right, order) => {
    for (let col = (right - 1); (left <= col); col--) {/* Time O(COLS) */
        const isOutOfBounds = top === bot;
        if (isOutOfBounds) return;
        
        order.push(matrix[bot][col]);                      /* Ignore Auxilary Spsace O(ROWS * COLS) */
    }
}

var addLeft = (matrix, top, bot, left, right, order) => {
    for (let row = bot - 1; row >= top + 1; row--) {/* Time O(ROWS) */
        const isOutOfBounds = left === right;
        if (isOutOfBounds) return;

        order.push(matrix[row][left]);                  /* Ignore Auxilary Spsace O(ROWS * COLS) */
    }
}

/**
 * Matrix - Mark Visited In Place
 * Array - Ignore Auxilary Space O(ROWS * COLS)
 * Time O(ROWS * COLS) | Space O(1)
 * https://leetcode.com/problems/spiral-matrix/
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = (matrix) => {
    const order = initOrder(matrix);/*                     | Ignore Auxilary Spsace O(ROWS * COLS) */

    spiral(matrix, order);          /* Time O(ROWS * COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */

    return order;
}

const initOrder = (matrix, VISITED = 101) => {
    const order = [ matrix[0][0] ];/* Ignore Auxilary Spsace O(ROWS * COLS) */

    matrix[0][0] = VISITED;        /* Ignore Auxilary Spsace O(ROWS * COLS) */

    return order;
}

var spiral = (matrix, order) => {
    let [ row, col, direction, changeDirection ]  = [ 0, 0, 0, 0 ];

    while (changeDirection < 2) {                 /* Time O(ROWS * COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */
        [ row, col, direction, changeDirection ] =/* Time O(ROWS * COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */
            getPointers(matrix, row, col, direction, changeDirection, order);
    }
}

const getPointers = (matrix, row, col, direction, changeDirection, order) => {
    [ row, col, direction, changeDirection ] =/* Time O(ROWS * COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */
        move(matrix, row, col, direction, changeDirection, order);

    direction = ((direction + 1) % 4);
    changeDirection += 1;

    return [ row, col, direction, changeDirection ];
}

const move = (matrix, row, col, direction, changeDirection, order, VISITED = 101) => {
    const [ rows, cols ] = [ matrix.length, matrix[0].length ];

    while (canMove(matrix, row, rows, col, cols, direction)) {/* Time O(ROWS * COLS) */
        [ row, col ] = getCell(row, col, direction);

        order.push(matrix[row][col]);                         /*                     | Ignore Auxilary Spsace O(ROWS * COLS) */
        matrix[row][col] = VISITED;

        changeDirection = 0;
    }

    return [ row, col, direction, changeDirection ];
}

const canMove = (matrix, row, rows, col, cols, direction) => {
    if (!isInBounds(row, rows, col, cols, direction)) return false;

    return !hasSeen(matrix, row, col, direction)
}

const isInBounds = (row, rows, col, cols, direction) => {
    const [ _row, _col ] = getCell(row, col, direction);
    const isRowInBounds = ((0 <= _row) && (_row < rows));
    const isColInBounds = ((0 <= _col) && (_col < cols));

    return (isRowInBounds && isColInBounds);
}

const hasSeen = (matrix, row, col, direction, VISITED = 101) => {
    const [ _row, _col ] = getCell(row, col, direction);

    return (matrix[_row][_col] === VISITED);
}

const getDirection = (direction) => {
    const directions = [ [0, 1], [1, 0], [0, -1], [-1, 0] ];
                       /* RIGHT    BOT     LEFT     TOP  */
    return directions[direction];
}

const getCell = (row, col, direction) => {
    const [ _row, _col ] = getDirection(direction);

    return [ (row + _row), (col + _col) ];
}
