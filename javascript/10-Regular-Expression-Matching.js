/**
 * Brute Force - DFS
 * Time O((N + M) * 2^(N + (M / 2))) | Space O(N^2 + M^2)
 * https://leetcode.com/problems/regular-expression-matching/
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = (text, pattern) => {
    const isBaseCase = (pattern.length === 0);
    if (isBaseCase) return (text.length === 0);

    const isTextAndPatternEqual = (pattern[0] === text[0]),
        isPatternPeriod = (pattern[0] === '.'),
        isFirstMatch = (text && (isTextAndPatternEqual || isPatternPeriod)),
        isNextPatternWildCard = (pattern.length >= 2 && pattern[1] === '*');

    return isNextPatternWildCard/* Time O((N + M) * 2^(N + (M / 2))) | Space O(N^2 + M^2) */
        ? (isMatch(text, pattern.slice(2)) || (isFirstMatch && isMatch(text.slice(1), pattern)))
        : (isFirstMatch && isMatch(text.slice(1), pattern.slice(1)));
};

/**
 * DP - Top Down
 * Matrix - Memoization
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/regular-expression-matching/
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = (text, pattern, row = 0, col = 0, memo = initMemo(text, pattern)) => {
    const hasSeen = (memo[row][col]);
    if (hasSeen) return memo[row][col];

    const isEqual = (col === pattern.length);
    const ans = isEqual
        ? row === text.length
        : check(text, pattern, row, col, memo);/* Time O(N * M) | Space O(N * M) */

    memo[row][col] = ans;
    return ans;
}

var initMemo = (text, pattern) => new Array((text.length + 1)).fill()/* Time O(N) | Space O(N) */
    .map(() => new Array((pattern.length + 1)).fill(false))              /* Time O(M) | Space O(M) */

var check = (text, pattern, row, col, memo) => {
    const isTextDefined = (row < text.length),
        isTextAndPatternEqual = (pattern[col] === text[row]),
        isPatternPeriod = (pattern[col] === '.'),
        isFirstMatch = (isTextDefined && (isTextAndPatternEqual || isPatternPeriod)),
        isNextPatternWildCard = (((col + 1) < pattern.length) && pattern[col + 1] === '*');

    return isNextPatternWildCard/* Time O(N * M) | Space O(N * M) */
        ? (isMatch(text, pattern, row, (col + 2), memo) || isFirstMatch && isMatch(text, pattern, (row + 1), col, memo))
        : (isFirstMatch && isMatch(text, pattern, (row + 1), (col + 1), memo));
}

/**
 * Time O(N * M) | Space O(N * M)
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = (text, pattern) => {
    const tabu = initTabu(text, pattern);/* Time O(N * M) | Space O(N * M) */

    search(text, pattern, tabu);         /* Time O(N * M) | Space O(N * M) */

    return tabu[0][0];

}

var initTabu = (text, pattern) => {
    const tabu = new Array((text.length + 1)).fill()        /* Time O(N) | Space O(N) */
        .map(() => new Array((pattern.length + 1)).fill(false));/* Time O(M) | Space O(M) */

    tabu[text.length][pattern.length] = true;               /*           | Space O(N * M) */

    return tabu
}

var search = (text, pattern, tabu) => {
    for (let row = text.length; 0 <= row; row--){           /* Time O(N) */
        for (let col = (pattern.length - 1); (0 <= col); col--){/* Time O(M) */
            const isTextDefined = row < text.length,
                isTextAndPatternEqual = pattern[col] === text[row],
                isPatternPeriod = pattern[col] === '.',
                isFirstMatch = isTextDefined && (isTextAndPatternEqual || isPatternPeriod),
                isNextPatternWildCard = col + 1 < pattern.length && pattern[col + 1] === '*';

            tabu[row][col] = isNextPatternWildCard                   /* Space O(N * M) */
                ? tabu[row][col + 2] || (isFirstMatch && tabu[row + 1][col])
                : isFirstMatch && tabu[row + 1][col + 1];
        }
    }
}