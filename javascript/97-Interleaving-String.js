/**
 * Brute Force - DFS
 * Time O(2^(N + M)) | Space O(N + M)
 * https://leetcode.com/problems/interleaving-string/
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
 var isInterleave = (s1, s2, s3, i = 0, j = 0, res = '') => {
    const isBaseCase1 = (s3.length !== (s1.length + s2.length));
    if (isBaseCase1) return false;

    const isBaseCase2 = ((res === s3) && (i == s1.length) && (j == s2.length));
    if (isBaseCase2) return true;

    return dfs(s1, s2, s3, i, j, res);/* Time O(2^(N + M)) | Space O(N + M) */
}

var dfs = (s1, s2, s3, i, j, res, ans = false) => {
    const hasLeft = (i < s1.length);
    if (hasLeft) ans |= isInterleave(s1, s2, s3, (i + 1), j, `${res}${s1[i]}`); /* Time O(2^(N + M)) | Space O(N) */

    const hasRight = (j < s2.length);
    if (hasRight) ans |= isInterleave(s1, s2, s3, i, (j + 1), `${res}${s2[j]}`);/* Time O(2^(N + M)) | Space O(M) */

    return ans;
}

/**
 * DP - Top Down
 * Matrix - Memoization
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/interleaving-string/
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = (s1, s2, s3, i = 0, j = 0, k = 0, memo = initMemo(s1, s2)) => {
    const isBaseCase1 = (s3.length !== (s1.length + s2.length));
    if (isBaseCase1) return false;

    const isBaseCase2 = (i === s1.length);
    if (isBaseCase2) return (s2.slice(j) === s3.slice(k));/* Time O(M + K) | Space O(M + K) */

    const isBaseCase3 = (j === s2.length);
    if (isBaseCase3) return (s1.slice(i) === s3.slice(k));/* Time O(N + K) | Space O(N + K) */

    const hasSeen = (memo[i][j] !== null);
    if (hasSeen) return memo[i][j];

    return dfs(s1, s2, s3, i, j, k, memo);/* Time O(N * M) | Space O((N * M) + HEIGHT) */
}

var initMemo = (s1, s2) => new Array(s1.length).fill()/* Time O(N) | Space O(N) */
    .map(() => new Array(s2.length).fill(null));          /* Time O(M) | Space O(M) */

var dfs = (s1, s2, s3, i, j, k, memo) => {
    const left = ((s3[k] === s1[i]) && isInterleave(s1, s2, s3, (i + 1), j, (k + 1), memo)); /* Time O(N) | Space O(HEIGHT) */
    const right = ((s3[k] === s2[j]) && isInterleave(s1, s2, s3, i, (j + 1), (k + 1), memo));/* Time O(M) | Space O(HEIGHT) */

    memo[i][j] = left || right;                                                              /*           | Space O(N * M) */
    return memo[i][j];
}

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/interleaving-string/
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = (s1, s2, s3) => {
    const isBaseCase = (s3.length !== s1.length + s2.length);
    if (isBaseCase) return false;

    const tabu = initTabu(s1, s2);/* Time O(N * M) | Space O(N * M) */

    search(s1, s2, s3, tabu);     /* Time O(N * M) | Space O(N * M) */

    return tabu[s1.length][s2.length];
}

var initTabu = (s1, s2) => new Array((s1.length + 1)).fill()/* Time O(N) | Space O(N) */
    .map(() => new Array((s2.length + 1)).fill(null))           /* Time O(M) | Space O(M) */

var search = (s1, s2, s3, tabu) => {
    const [ rows, cols ] = [ s1.length, s2.length ];

    for (let row = 0; (row <= rows); row++) {/* Time O(N) */
        for (let col = 0; (col <= cols); col++) {/* Time O(M) */
            tabu[row][col] =                         /* Space O(N * M) */
                hasMatch(s1, s2, s3, row, col, tabu);
        }
    }
}

var hasMatch = (s1, s2, s3, i, j, tabu) => {
    const isBaseCase1 = ((i === 0) && (j === 0));
    if (isBaseCase1) return true;

    const isBaseCase2 = (i === 0);
    if (isBaseCase2) return getRight(i, j, s2, s3, tabu);

    const isBaseCase3 = (j === 0);
    if (isBaseCase3) return getLeft(i, j, s1, s3, tabu);

    const left = getLeft(i, j, s1, s3, tabu);
    const right = getRight(i, j, s2, s3, tabu)

    return (left || right);
}

var getLeft = (i, j, s1, s3, tabu) => ((tabu[(i - 1)][j] && s1[(i - 1)]) === s3[((i + j) - 1)]);

var getRight = (i, j, s2, s3, tabu) => ((tabu[i][(j - 1)] && s2[(j - 1)]) === s3[((i + j) - 1)]);

/**
 * DP - Bottom Up
 * Array - Tabulation
 * Time O(N * M) | Space O(M)
 * https://leetcode.com/problems/interleaving-string/
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = (s1, s2, s3) => {
    const isBaseCase = (s3.length !== (s1.length + s2.length));
    if (isBaseCase) return false;

    const tabu = initTabu(s2);/* Time O(M)     | Space O(M) */

    search(s1, s2, s3, tabu); /* Time O(N * M) | Space O(M) */

    return tabu[s2.length];
};

var initTabu = (s2) => new Array((s2.length + 1)).fill(false);/* Time O(M) | Space O(M) */

var search = (s1, s2, s3, tabu) => {
    const [ rows, cols ] = [ s1.length, s2.length ];

    for (let row = 0; (row <= rows); row++) {/* Time O(N)*/
        for (let col = 0; (col <= cols); col++) {/* Time O(M)*/
            tabu[col] =                              /* Space O(M)*/
                hasMatch(s1, s2, s3, row, col, tabu);
        }
    }
}

var hasMatch = (s1, s2, s3, i, j, tabu) => {
    const isBaseCase1 = ((i === 0) && (j === 0));
    if (isBaseCase1) return true;

    const isBaseCase2 = (i === 0);
    if (isBaseCase2) return getRight(i, j, s2, s3, tabu)

    const isBaseCase3 = (j === 0);
    if (isBaseCase3) return getLeft(i, j, s1, s3, tabu);;

    return getLeft(i, j, s1, s3, tabu) || getRight(i, j, s2, s3, tabu);
}

var getLeft = (i, j, s1, s3, tabu) => (tabu[j] && (s1[(i - 1)] === s3[((i + j) - 1)]));

var getRight = (i, j, s2, s3, tabu) => (tabu[(j - 1)] && (s2[(j - 1)] === s3[((i + j) - 1)]));

