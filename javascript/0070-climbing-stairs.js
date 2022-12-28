/**
 * Brute Force - DFS
 * Time O(2^N) | Space O(N)
 * https://leetcode.com/problems/climbing-stairs/
 * @param {number} n
 * @return {number}
 */
 var climbStairs = (n, index = 0) => {
    const isBaseCase1 = (n < index);
    if (isBaseCase1) return 0;

    const isBaseCase2 = (index === n);
    if (isBaseCase2) return 1;

    const [ next, nextNext ] = [ (index + 1), (index + 2) ];
    const left = climbStairs(n, next);     /* Time O(2^N) | Space O(N) */
    const right = climbStairs(n, nextNext);/* Time O(2^N) | Space O(N) */

    return (left + right);
}

/**
 * DP - Top Down
 * Array - Memoization
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/climbing-stairs/
 * @param {number} n
 * @return {number}
 */
var climbStairs = (n, index = 0, memo = Array(n + 1).fill(0)) => {
    const isBaseCase1 = (n < index);
    if (isBaseCase1) return 0;

    const isBaseCase2 = (index === n);
    if (isBaseCase2) return 1;

    const hasSeen = (memo[index] !== 0);
    if (hasSeen) return memo[index];

    const [ next, nextNext ] = [ (index + 1), (index + 2) ];
    const left = climbStairs(n, next, memo);     /* Time O(N) | Space O(N) */
    const right = climbStairs(n, nextNext, memo);/* Time O(N) | Space O(N) */

    memo[index] = (left + right);                /*           | Space O(N) */
    return memo[index];
};

/**
 * DP - Bottom Up
 * Array - Tabulation
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/climbing-stairs/
 * @param {number} n
 * @return {number}
 */
var climbStairs = (n) => {
    const isBaseCase = (n === 1);
    if (isBaseCase) return 1;

    const tabu = initTabu(n);/* Space O(N) */

    search(n, tabu);

    return tabu[n];
};

var initTabu = (n) => {
    const tabu = new Array(n + 1).fill(0);

    tabu[1] = 1;
    tabu[2] = 2;

    return tabu;
}

var search = (n, tabu) => {
    for (let index = 3; (index <= n); index++) {/* Time O(N) */
        const [ prev, prevPrev ] = [ (index - 1), (index - 2) ];

        tabu[index] = (tabu[prev] + tabu[prevPrev]);/* Space O(N) */
    }
}

/**
 * DP - Fibonacci Number
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/climbing-stairs/
 * @param {number} n
 * @return {number}
 */
var climbStairs = (n) => {
    const isBaseCase = (n === 1);
    if (isBaseCase) return 1;

    let [ next, nextNext ] = [ 1, 2 ];

    for (let index = 3; (index <= n); index++) {/* Time O(N) */
        const temp = (next + nextNext);
        
        next = nextNext;
        nextNext = temp;
    }

    return nextNext;
};

/**
 * Matrix - Bitnets Method
 * Time O(log(N)) | Space O(1)
 * https://leetcode.com/problems/climbing-stairs/
 * @param {number} n
 * @return {number}
 */
 var climbStairs = (n) => {
    const prev = [ [1, 1], [1, 0] ];
    const next = power(n, prev);/* Time O(log(N)) */

    return next[0][0];
}

const power = (n, prev)  => {
    let next = [ [1, 0], [0, 1] ];

    const isEmpty = () => n === 0;
    while (!isEmpty()) {/* Time O(log(N)) */
        const isBit = (n & 1) === 1;
        if (isBit) next = multiply(next, prev);/* Time O(1) | Space O(1) */

        n >>= 1;
        prev = multiply(prev, prev);           /* Time O(1) | Space O(1) */
    }

    return next;
}

const multiply = (prev, next) => {
    const [ rows, cols ] = [ 2, 2 ];
    const matrix = new Array(rows).fill()
        .map(() => new Array(cols).fill(0));

    for (let row = 0; (row < rows); row++) {
        for (let col = 0; (col < cols); col++) {
            const left = (prev[row][0] * next[0][col]);
            const right = (prev[row][1] * next[1][col]);

            matrix[row][col] = (left + right);
        }
    }

    return matrix;
}

/**
 * Math - Fibonacci Formula
 * Time O(log(N)) | Space O(1)
 * https://leetcode.com/problems/climbing-stairs/
 * @param {number} n
 * @return {number}
 */
var climbStairs = (n, sqrt5 = Math.sqrt(5)) => {
    const phi = ((sqrt5 + 1) / 2);
    const psi = ((sqrt5 - 1) / 2);

    const phiPow = Math.pow(phi, (n + 1));
    const psiPow = Math.pow(psi, (n + 1));

    return ((phiPow - psiPow) / sqrt5);
}
