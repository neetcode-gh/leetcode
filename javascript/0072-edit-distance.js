/**
 * Brute Force - DFS
 * Time O(2^(N + M)) | Space O(N * M)
 * https://leetcode.com/problems/edit-distance/
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
 var minDistance = (word1, word2, i = 0, j = 0) => {
    const isBaseCase1 = ((word1.length * word2.length) === 0);
    if (isBaseCase1) return (word1.length + word2.length);

    const isBaseCase2 = (word1.length === i);
    if (isBaseCase2) return (word2.length - j);

    const isBaseCase3 = (word2.length === j);
    if (isBaseCase3) return (word1.length - i);

    return dfs(word1, word2, i, j);/* Time O(2^(N + M)) | Space O((N * M) + HEIGHT) */
}

var dfs = (word1, word2, i, j) => {
    const isEqual = (word1[i] === word2[j]);
    if (isEqual) return minDistance(word1, word2, (i + 1), (j + 1));/* Time O(2^(N + M)) | Space O((N * M) + HEIGHT) */

    const insert = minDistance(word1, word2, i, (j + 1));           /* Time O(2^(N + M)) | Space O((N * M) + HEIGHT) */
    const _delete = minDistance(word1, word2, (i + 1), j);          /* Time O(2^(N + M)) | Space O((N * M) + HEIGHT) */
    const replace = minDistance(word1, word2, (i + 1), (j + 1));    /* Time O(2^(N + M)) | Space O((N * M) + HEIGHT) */

    return (Math.min(insert, _delete, replace) + 1);
}

/**
 * DP - Top Down
 * Matrix - Memoization
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/edit-distance/
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
 var minDistance = (word1, word2, i = 0, j = 0, memo = initMemo(word1, word2)) => {
    const isBaseCase1 = ((word1.length * word2.length) === 0);
    if (isBaseCase1) return (word1.length + word2.length);

    const isBaseCase2 = (word1.length === i);
    if (isBaseCase2) return (word2.length - j);

    const isBaseCase3 = (word2.length === j);
    if (isBaseCase3) return (word1.length - i);

    const hasSeen = (memo[i][j] !== -1);
    if (hasSeen) return memo[i][j];

    return dfs(word1, word2, i, j, memo);/* Time O(N * M) | Space O((N * M) + HEIGHT) */
}

var initMemo = (word1, word2) =>  new Array(word1.length).fill()/* Time O(N) | Space O(N) */
    .map(() => new Array(word2.length).fill(-1));                   /* Time O(N) | Space O(N) */

var dfs = (word1, word2, i, j, memo) => {
    const isEqual = (word1[i] === word2[j]);
    if (isEqual) {
        memo[i][j] = minDistance(word1, word2, (i + 1), (j + 1), memo);/* Time O(N * M) | Space O(HEIGHT) */
        return memo[i][j];
    }

    const insert = minDistance(word1, word2, i, (j + 1), memo);        /* Time O(N * M) | Space O(HEIGHT) */
    const _delete = minDistance(word1, word2, (i + 1), j, memo);       /* Time O(N * M) | Space O(HEIGHT) */
    const replace = minDistance(word1, word2, (i + 1), (j + 1), memo); /* Time O(N * M) | Space O(HEIGHT) */

    memo[i][j] = (Math.min(insert, _delete, replace) + 1);             /*               | Space O(N * M) */
    return memo[i][j];
}

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/edit-distance/
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = (word1, word2) => {
    const isEmpty = ((word1.length * word2.length) === 0);
    if (isEmpty) return (word1.length + word2.length);

    const tabu = initTabu(word1, word2);/* Time O(N * M) | Space O(N * M) */

    search(word1, word2, tabu);         /* Time O(N * M) | Space O(N * M) */

    return tabu[word1.length][word2.length];
}

var initTabu = (word1, word2) => {
    const tabu = new Array((word1.length + 1)).fill()/* Time O(N) | Space O(N) */
        .map(() => new Array((word2.length + 1)).fill(0));/* Time O(M) | Space O(M) */

    for (let i = 0; (i < (word1.length + 1)); i++) { /* Time O(N) */
        tabu[i][0] = i;                                  /*        | Space O(N * M) */
    }

    for (let j = 0; (j < (word2.length + 1)); j++) { /* Time O(M) */
        tabu[0][j] = j;                                  /*        | Space O(N * M) */
    }

    return tabu;
}

var search = (word1, word2, tabu) => {
    for (let i = 1; (i < (word1.length + 1)); i++) {/* Time O(N) */
        for (let j = 1; (j < (word2.length + 1)); j++) {/* Time O(M) */
            const left = (tabu[(i - 1)][j] + 1);
            const down = (tabu[i][(j - 1)] + 1);

            const isEqual = (word1[(i - 1)] === word2[(j - 1)]);
            const leftDown = (tabu[(i - 1)][(j - 1)] + Number(!isEqual));

            tabu[i][j] = Math.min(left, down, leftDown);    /* Space O(N * M) */
        }
    }
}

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N * M) | Space O(M)
 * https://leetcode.com/problems/edit-distance/
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
 var minDistance = (word1, word2) => {
    const tabu = initTabu(word2);/* Time O(M) | Space O(M) */

    search(word1, word2, tabu);  /* Time O(N * M) | Space O(M) */

    return tabu[word2.length];
}

var initTabu = (word2) => {
    const tabu = new Array((word2.length + 1)).fill(0);/* Time O(M) | Space O(M) */

    for (let j = 1; (j <= word2.length); j++) {        /* Time O(M) */
        tabu[j] = j;                                   /*           | Space O(M) */
    }

    return tabu;
}

var search = (word1, word2, tabu) => {
    for (let i = 1; (i <= word1.length); i++) {/* Time O(N) */
        tabu[word2.length] = update(word1, word2, i, tabu);/* Time O(M) | Space (M) */
    }
}

const update = (word1, word2, i, tabu) => {
    let temp = i;

    for (let j = 1; (j <= word2.length); ++j) {/* Time O(M  */
        const isEqual = (word1[(i - 1)] === word2[(j - 1)])
        const cur = isEqual
            ? tabu[(j - 1)]
            : (Math.min(tabu[(j - 1)], tabu[j], temp) + 1);

        tabu[(j - 1)] = temp;                      /* Space (M) */
        temp = cur;
    }

    return temp;
}