/**
 * https://leetcode.com/problems/generate-parentheses
 * Time O(((4^N) / (N * SQRT(N)))) | Space O(((4^N) / (N * SQRT(N))))
 * Time O(2^N) | Space O(2^N)
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = (n) => dfs(n);/* Time O(2^N) | Space O(2^N) */

const dfs = (n, combos = [], open = 0, close = 0, path = []) => {
    const isBaseCase = path.length === (n * 2);
    if (isBaseCase) {
        combos.push(path.join(''));/* Space O(N + N) */

        return combos; 
    }

    const isOpen = open < n;
    if (isOpen) backTrackOpen(n, combos, open, close, path);  /* Time O(2^N) | Space O(2^N) */

    const isClose = close < open;
    if (isClose) backTrackClose(n, combos, open, close, path);/* Time O(2^N) | Space O(2^N) */

    return combos;
}

const backTrackOpen = (n, combos, open, close, path) => {
    path.push('(');                             /*             | Space O(N) */
        dfs(n, combos, (open + 1), close, path);/* Time O(2^N) | Space O(2^N) */
    path.pop();
}

const backTrackClose = (n, combos, open, close, path) => {
    path.push(')');                             /*             | Space O(N) */
        dfs(n, combos, open, (close + 1), path);/* Time O(2^N) | Space O(2^N) */
    path.pop();
}

/**
 * https://leetcode.com/problems/generate-parentheses
 * Time O(((4^N) / (N * SQRT(N)))) | Space O(((4^N) / (N * SQRT(N))))
 * Time O(2^N) | Space O(2^N)
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = (n) => bfs(n);/* Time O(2^N) | Space O(2^N) */

const bfs = (n, queue, combos = []) => {
    const queue = new Queue([ ['', 0, 0] ]);

    while (!queue.isEmpty()) {/* Time O(2^N) */
        const [ str, open, close ] = queue.dequeue();

        const isBaseCase = (open === n) && (close === n);
        if (isBaseCase) {
            combos.push(str);                                          /* Space O(N) */

            continue;
        }

        const isOpen = open < n;
        if (isOpen) queue.enqueue([ (`${str}(`), (open + 1), close ]); /* Space O(2^N) */

        const isClose = close < open;
        if (isClose) queue.enqueue([ (`${str})`), open, (close + 1) ]);/* Space O(2^N) */
    }

    return combos;
}

/**
 * https://leetcode.com/problems/generate-parentheses
 * Time O(((4^N) / (N * SQRT(N)))) | Space O(((4^N) / (N * SQRT(N))))
 * Time O(2^N) | Space O(2^N)
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = (n, combos = []) => {
    const isBaseCase = n === 0;
    if (isBaseCase) {
        combos.push('');            /*             | Space O(N) */

        return combos;
    }

    return closureNumber(n, combos);/* Time O(2^N) | Space O(2^N) */
}

const closureNumber = (n, combos) => {
    for (let c = 0; c < n; c++) {/* Time O(N) */
        for (const left of generateParenthesis(c)) {                 /* Time O(2^N) | Space O(2^N) */
            for (const right of generateParenthesis(((n - 1) - c))) {/* Time O(2^N) | Space O(2^N) */
                combos.push(`(${left})${right}`);                    /*             | Space O(N) */
            }
        }
    }

    return combos
}