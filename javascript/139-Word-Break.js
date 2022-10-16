/**
 * Brute Force - DFS
 * Hash Set - Distinct Keys
 * Time O(2^N) | Space O(N)
 * https://leetcode.com/problems/word-break/
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
 var wordBreak = (s, wordDict) => {
    const wordSet = new Set(wordDict);/* Time O(N)   | Space O(N) */

    return canBreak(s, wordSet);      /* Time O(2^N) | Space O(N) */
};

var canBreak = (s, wordSet, start = 0) => {
    const isBaseCase = (start === s.length);
    if (isBaseCase) return true;

    return dfs(s, wordSet, start);/* Time O(2^N) | Space O(N) */
}

var dfs = (s, wordSet, start) => {
    for (let end = (start + 1); end <= s.length; end++) {/* Time O(N) */
        const word = s.slice(start, end);                    /* Time O(N)   | Space O(N) */

        const _canBreak = wordSet.has(word)
            && canBreak(s, wordSet, end);                    /* Time O(2^N) | Space O(N) */
        if (_canBreak) return true;
    }

    return false;
}

/**
 * DP - Top Down
 * Array - Memoization
 * Hash Set - Distinct Keys
 * Time O(N^3) | Space O(N)
 * https://leetcode.com/problems/word-break/
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = (s, wordDict) => {
    const wordSet = new Set(wordDict);           /* Time O(N)         | Space O(N) */
    const memo = new Array(s.length).fill(null); /*                   | Space O(N) */
    const start = 0;

    return canBreak(s, wordSet, start, memo);    /* Time O(N * N * N) | Space O(N) */
}

var canBreak = (s, wordSet, start, memo) => {
    const isBaseCase1 = (s.length === start);
    if (isBaseCase1) return true;

    const hasSeen = (memo[start] !== null);
    if (hasSeen) return memo[start];

    return dfs(s, wordSet, start, memo);/* Time O(N * N * N) | Space O(N) */
}

var dfs = (s, wordSet, start, memo) => {
    for (let end = (start + 1); (end <= s.length); end++) {/* Time O(N) */
        const word = s.slice(start, end);                      /* Time O(N) | Space O(N) */

        const _canBreak = wordSet.has(word)
            && canBreak(s, wordSet, end, memo);                /* Time O(N * N) */
        if (_canBreak) {
            memo[start] = true;
            return true;
        }
    }

    memo[start] = false;
    return false;
}

/**
 * DP - Bottom Up
 * Array - Tabulation
 * Hash Set - Distinct Keys
 * Time O(N^3) | Space O(N)
 * https://leetcode.com/problems/word-break/
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
 var wordBreak = (s, wordDict) => {
    const wordSet = new Set(wordDict);/* Time O(N)         | Space O(N) */
    const tabu = initTabu(s);         /*                   | Space O(N) */

    canBreak(s, wordSet, tabu);       /* Time O(N * N * N) | Space O(N) */

    return tabu[s.length];
}

const initTabu = (s) => {
    const tabu = new Array((s.length + 1)).fill(false);/* Space O(N) */

    tabu[0] = true;

    return tabu;
}

var canBreak = (s, wordSet, tabu) => {
    for (let end = 1; (end <= s.length); end++) {/* Time O(N) */
        checkWord(s, wordSet, end, tabu);            /* Time O(N * N) | Space O(N) */
    }
}

var checkWord = (s, wordSet, end, tabu) => {
    for (let start = 0; (start < end); start++) {/* Time O(N) */
        const word = s.slice(start, end);            /* Time O(N) | Space O(N) */

        const canBreak = tabu[start] && wordSet.has(word);
        if (!canBreak) continue;

        tabu[end] = true;

        return;
    }
}

/**
 * Tree Traversal - BFS
 * Queue - Level Order Space O(WIDTH)
 * Hash Set - Distinct Keys
 * Array - Seen
 * Time O(N^3) | Space O(N)
 * https://leetcode.com/problems/word-break/
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    const wordSet = new Set(wordDict);           /* Time O(N)         | Space O(N) */
    const queue = new Queue([ 0 ]);              /*                   | Space O(N) */
    const seen = new Array(s.length).fill(false);/*                   | Space O(N) */

    return bfs(queue, s, wordSet, seen);         /* Time O(N * N * N) | Space O(N + WIDTH) */
}

const bfs = (queue, s, wordSet, seen) => {
    while (!queue.isEmpty()) {
        for (let level = (queue.size() - 1); (0 <= level); level--) {/* Time O(N) */
            if (canWordBreak(queue, s, wordSet, seen)) return true;      /* Time O(N * N) | Space O(N + WIDTH) */
        }
    }

    return false;
}

var canWordBreak = (queue, s, wordSet, seen) => {
    const start = queue.dequeue();

    const hasSeen = seen[start];
    if (hasSeen) return false;

    if (canBreak(queue, s, start, wordSet)) return true;/* Time O(N * N) | Space O(N + WIDTH) */

    seen[start] = true;                                 /*               | Space O(N) */
    return false;
}

var canBreak = (queue, s, start, wordSet) => {
    for (let end = start + 1; end <= s.length; end++) {/* Time O(N) */
        const word = s.slice(start, end);                  /* Time O(N) | Space O(N) */

        if (!wordSet.has(word)) continue;

        queue.enqueue(end);                                /*           | Space O(WIDTH) */

        const _canBreak = end === s.length;
        if (_canBreak) return true;
    }

    return false
}
