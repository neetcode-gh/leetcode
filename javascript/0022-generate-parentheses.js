/**
 * DFS
 * Time O(((4^N) / (N * SQRT(N)))) | Space O(((4^N) / (N * SQRT(N))))
 * Time O(2^N) | Space O(2^N)
 * https://leetcode.com/problems/generate-parentheses
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = (n) => dfs(n);

const dfs = (n, combos = [], open = 0, close = 0, path = []) => {
    const isBaseCase = (path.length === (n * 2));
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
    path.push('(');/* Space O(N) */
        dfs(n, combos, (open + 1), close, path);/* Time O(2^N) | Space O(2^N) */
    path.pop();
}

const backTrackClose = (n, combos, open, close, path) => {
    path.push(')');/* Space O(N) */
        dfs(n, combos, open, (close + 1), path);/* Time O(2^N) | Space O(2^N) */
    path.pop();
}

/**
 * BFS
 * Time O(((4^N) / (N * SQRT(N)))) | Space O(((4^N) / (N * SQRT(N))))
 * Time O(2^N) | Space O(2^N)
 * https://leetcode.com/problems/generate-parentheses
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = (n) => bfs(n);

const bfs = (n, combos = []) => {
    const queue = new Queue([ ['', 0, 0] ]);

    while (!queue.isEmpty()) {/* Time O(2^N) */
        const [ str, open, close ] = queue.dequeue();
        
        const isBaseCase = ((open === n) && (close === n));
        if (isBaseCase) {
            combos.push(str);                                       /* Space O(N) */

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
 * DFS
 * Time O(((4^N) / (N * SQRT(N)))) | Space O(((4^N) / (N * SQRT(N))))
 * Time O(2^N) | Space O(2^N)
 * https://leetcode.com/problems/generate-parentheses
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = (n, combos = []) => {
    const isBaseCase = (n === 0);
    if (isBaseCase) {
        combos.push('');

        return combos
    }

    for (let c = 0; (c < n); c++) {
        for (const left of generateParenthesis(c)) {
            for (const right of generateParenthesis(((n - 1) - c))) {
                combos.push(`(${left})${right}`);
            }
        }
    }

    return combos
}
