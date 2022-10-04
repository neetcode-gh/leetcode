/**
 * DP - Top Down
 * Matrix - Memoization
 * Time O(N * (M^2)) | Space O(N * M)
 * https://leetcode.com/problems/longest-common-subsequence/
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
 var longestCommonSubsequence = (text1, text2, p1 = 0, p2 = 0, memo = initMemo(text1, text2)) => {
    const isBaseCase = ((p1 === text1.length) || (p2 === text2.length));
    if (isBaseCase) return 0;

    const hasSeen = (memo[p1][p2] !== null);
    if (hasSeen) return memo[p1][p2];

    return dfs(text1, text2, p1, p2, memo);/* Time O((N * M) * M)) | Space O((N * M) + HEIGHT) */
}

var initMemo = (text1, text2) => new Array((text1.length + 1)).fill()/* Time O(N) | Space O(N) */
    .map(() => new Array((text2.length + 1)).fill(null));                /* Time O(M) | Space O(M) */

var dfs = (text1, text2, p1, p2, memo) => {
    const left = longestCommonSubsequence(text1, text2, (p1 + 1), p2, memo);       /* Time O(N * M) | Space O(HEIGHT) */

    const index = text2.indexOf(text1[p1], p2);                                        /* Time O(M) */
    const isPrefix = (index !== -1);

    const right = isPrefix
        ? (longestCommonSubsequence(text1, text2, (p1 + 1), (index + 1), memo) + 1)/* Time O(N * M) | Space O(HEIGHT) */
        : 0;

    memo[p1][p2] = Math.max(left, right);                                          /*               | Space O(N * M) */
    return memo[p1][p2];
}

/**
 * DP - Top Down
 * Matrix - Memoization
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/longest-common-subsequence/
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = (text1, text2, p1 = 0, p2 = 0, memo = initMemo(text1, text2)) => {
    const isBaseCase = ((p1 === text1.length) || (p2 === text2.length));
    if (isBaseCase) return 0;

    const hasSeen = (memo[p1][p2] !== null);
    if (hasSeen) return memo[p1][p2];

    return dfs(text1, text2, p1, p2, memo);/* Time O(N * M) | Space O((N * M) + HEIGHT) */
}

var initMemo = (text1, text2) => new Array((text1.length + 1)).fill()/* Time O(N) | Space O(N) */
    .map(() => new Array((text2.length + 1)).fill(null));                 /* Time O(M) | Space O(M) */

var dfs = (text1, text2, p1, p2, memo) => {
    const left = (longestCommonSubsequence(text1, text2, (p1 + 1), (p2 + 1), memo) + 1);/* Time O(N * M) | Space O(HEIGHT) */
    const right =                                                                       /* Time O(N * M) | Space O(HEIGHT) */
        Math.max(longestCommonSubsequence(text1, text2, p1, (p2 + 1), memo), longestCommonSubsequence(text1, text2, (p1 + 1), p2, memo));

    const isEqual = (text1[p1] == text2[p2]);
    const count = isEqual
        ? left
        : right

    memo[p1][p2] = count;                                                               /*               | Space O(N * M) */
    return memo[p1][p2];
}

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/longest-common-subsequence/
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = (text1, text2) => {
    const tabu = initTabu(text1, text2);/* Time O(N * M) | Space O(N * M) */

    search(text1, text2, tabu);         /* Time O(N * M) | Space O(N * M) */

    return tabu[0][0];
};

var initTabu = (text1, text2) => 
    new Array((text1.length + 1)).fill()                /* Time O(N) | Space O(N) */
        .map(() => new Array((text2.length + 1)).fill(0));/* Time O(M) | Space O(M) */

var search = (text1, text2, tabu) => {
    const [ n, m ] = [ text1.length, text2.length ];
    
    for (let x = (n - 1); (0 <= x); x--) {/* Time O(N) */
        for (let y = (m - 1); (0 <= y); y--) {/* Time O(M) */
            tabu[x][y] = (text1[x] === text2[y])   /* Space O(N * M) */
                ? (tabu[x + 1][y + 1] + 1)
                : Math.max(tabu[x + 1][y], tabu[x][y + 1]);
        }
    }
}

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N * M) | Space O(M)
 * https://leetcode.com/problems/longest-common-subsequence/
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = (text1, text2) => {
    const canSwap = (text2.length < text1.length);
    if (canSwap) [ text1, text2 ] = [ text2, text1 ];

    let tabu = initTabu(text1);       /* Time O(M)     | Space O(M) */

    tabu = search(text1, text2, tabu);/* Time O(N * M) | Space O(M) */

    return tabu[0];
};

var initTabu = (text1) => new Array((text1.length + 1)).fill(0)

var search = (text1, text2, tabu) => {
    for (let col = (text2.length - 1); (0 <= col); col--) {/* Time O(N) */
        const temp = initTabu(text1);                               /* Space O(M) */

        for (let row = (text1.length - 1); (0 <= row); row--) {/* Time O(M) */
            const isEqual = (text1[row] == text2[col]);

            temp[row] = isEqual                                     /* Space O(M) */
                ? (tabu[(row + 1)] + 1)
                : Math.max(tabu[row], temp[(row + 1)]);
        }

        tabu = temp;                                                /* Space O(M) */
    }

    return tabu;
}
