/**
 * DP - Top Down
 * Matrix - Memoization
 * Time O(N * M) | Space (N * M)
 * https://leetcode.com/problems/distinct-subsequences/
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
 var numDistinct = (s, t, i = 0, j = 0, memo = initMemo(s, t)) => {
    const isBaseCase1 = (s.length < t.length);
    if (isBaseCase1) return 0;

    const isBaseCase2 = (j === t.length);
    if (isBaseCase2) return 1;

    const isBaseCase3 = (i === s.length);
    if (isBaseCase3) return 0;

    const hasSeen = (memo[i][j] !== null);
    if (hasSeen) return memo[i][j];

    return dfs(s, t, i, j, memo);/* Time O(N * M) | Space O((N * M) + HEIGHT) */
}

var initMemo = (s, t) => new Array(s.length).fill()
    .map(() => new Array(t.length).fill(null));

var dfs = (s, t, i, j, memo) => {
    const left = numDistinct(s, t, (i + 1), j, memo);/* Time O(N * M) | Space O(HEIGHT) */

    const isEqual = (s[i] === t[j]);

    const right = isEqual
        ? numDistinct(s, t, (i + 1), (j + 1), memo)  /* Time O(N * M) | Space O(HEIGHT) */
        : 0;

    memo[i][j] = (left + right);                     /*               | Space O(N * M) */
    return memo[i][j];
}

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N * M) | Space (N * M)
 * https://leetcode.com/problems/distinct-subsequences/
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = (s, t) => {
    const tabu = initTabu(s, t);/* Time O(N * M) | Space O(N * M) */

    search(s, t, tabu);         /* Time O(N * M) | Space O(N * M) */

    return tabu[0][0];
}

var initTabu = (s, t) => {
    const tabu = new Array(s.length + 1).fill()/* Time O(N) | Space O(N) */
        .map(() => new Array(t.length + 1));       /* Time O(M) | Space O(M) */

    tabu[s.length].fill(0);                    /*           | Space O(N * M) */

    for (let r = 0; r <= s.length; ++r) {      /* Time O(N) */
        tabu[r][t.length] = 1;                     /*       | Space O(N * M) */
    }

    return tabu;
}

var search = (s, t, tabu) => {
    for (let r = (s.length - 1); (0 <= r); r--) {/* Time O(N) */
        for (let c = (t.length - 1); (0 <= c); c--) {/* Time O(M) */
            const left = tabu[r + 1][c];

            const isEqual = (s[r] === t[c]);

            const right = isEqual
                ? tabu[r + 1][c + 1] 
                : 0
            
            tabu[r][c] = left + right;                     /* Space O(N * M) */
        }
    }
}

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N * M) | Space O(M)
 * https://leetcode.com/problems/distinct-subsequences/
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = (s, t) => {
    const tabu = initTabu(t);/* Time O(M) | Space O(M) */

    search(s, t, tabu);      /* Time O(N * M) | Space O(M) */

    return tabu[0];
}

var initTabu = (t) => new Array(t.length).fill(0);/* Time O(M) | Space O(M) */

var search = (s, t, tabu) => {
    for (let row = (s.length - 1); (0 <= row); row--) {/* Time O(N) */
        let prev = 1;

        for (let col = (t.length - 1); (0 <= col); col--) {/* Time O(M) */
            const curr = tabu[col];

            const isEqual = (s[row] === t[col]);
            if (isEqual) tabu[col] += prev;                     /* Space O(M) */

            prev = curr;
        }
    }
}
