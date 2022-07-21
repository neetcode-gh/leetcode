//////////////////////////////////////////////////////////////////////////////
// Depth First Search (DFS)
// Time: Theta(mn) O(mnk)  Space: Theta(mn) O(mn)
// Theoretically the BFS implementation should be faster as it calculates the
// distance from the gate for each cell exactly once, but in practice the DFS
// solution outperforms it. I'm guessing the implementation of the queue,
// specifically `queue.shift()`, costs more than the few extra DFS
// calculations that occur.
//////////////////////////////////////////////////////////////////////////////

const INF = 2 ** 31 - 1;

/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
function wallsAndGates(rooms) {
    for (let i = 0; i < rooms.length; ++i) {
        for (let j = 0; j < rooms[0].length; ++j) {
            if (rooms[i][j] === 0) {
                fillRooms(rooms, i - 1, j);
                fillRooms(rooms, i + 1, j);
                fillRooms(rooms, i, j - 1);
                fillRooms(rooms, i, j + 1);
            }
        }
    }
}

/**
 * @param {number[][]} rooms
 * @param {number} i
 * @param {number} j
 * @param {number=} count = `0`
 * @return {void}
 */
function fillRooms(rooms, i, j, count = 0) {
    if (!inBounds(rooms, i, j) || rooms[i][j] < 1) {
        return;
    }

    ++count;

    if (rooms[i][j] !== INF && rooms[i][j] <= count) {
        return;
    }

    rooms[i][j] = count;

    fillRooms(rooms, i - 1, j, count);
    fillRooms(rooms, i + 1, j, count);
    fillRooms(rooms, i, j - 1, count);
    fillRooms(rooms, i, j + 1, count);
}

/**
 * @param {number[][]} rooms
 * @param {number} i
 * @param {number} j
 * @return {boolean}
 */
function inBounds(rooms, i, j) {
    return i >= 0 && j >= 0 && i < rooms.length && j < rooms[0].length;
}

//////////////////////////////////////////////////////////////////////////////
// Breadth First Search (BFS)
// Time: Theta(mn) O(mn)  Space: Theta(mn) O(mn)
// Theoretically the BFS implementation should be faster as it calculates the
// distance from the gate for each cell exactly once, but in practice the DFS
// solution outperforms it. I'm guessing the implementation of the queue,
// specifically `queue.shift()`, costs more than the few extra DFS
// calculations that occur.
//////////////////////////////////////////////////////////////////////////////

const INF = 2 ** 31 - 1;
const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

/**
 * @param {number[][]} rooms
 * @return {void}
 */
function wallsAndGates(rooms) {
    const queue = [];

    for (let i = 0; i < rooms.length; ++i) {
        for (let j = 0; j < rooms[0].length; ++j) {
            if (rooms[i][j] === 0) {
                queue.push([i, j]);
            }
        }
    }

    let count = 1;

    while (queue.length) {
        let length = queue.length;

        while (length--) {
            [i, j] = queue.shift();

            for ([k, l] of DIRECTIONS) {
                k += i;
                l += j;
                if (inBounds(rooms, k, l) && rooms[k][l] === INF) {
                    rooms[k][l] = count;
                    queue.push([k, l]);
                }
            }
        }

        ++count;
    }
}

/**
 * @param {number[][]} rooms
 * @param {number} i
 * @param {number} j
 * @return {boolean}
 */
function inBounds(rooms, i, j) {
    return i >= 0 && j >= 0 && i < rooms.length && j < rooms[0].length;
}
