//////////////////////////////////////////////////////////////////////////////
// 1D Dynamic Programming
// Time: O(n*m)
// Space: O(m)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
function numDistinct(s, t) {
    
    const sLen = s.length;
    const tLen = t.length;
    
    if (sLen < tLen) {
        return 0;
    }
    
    const cache = new Array(tLen).fill(0);
    
    for (let r = sLen - 1; r >= 0; --r) {
        let prev = 1;
        for (let c = tLen - 1; c >= 0; --c) {
            const curr = cache[c];
            if (s[r] === t[c]) {
                cache[c] += prev;
            }
            prev = curr;
        }
    }
    
    return cache[0];
}

//////////////////////////////////////////////////////////////////////////////
// 2D Dynamic Programming
// Time: O(n*m)
// Space: O(n*m)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
function numDistinct(s, t) {
    
    const sLen = s.length;
    const tLen = t.length;
    
    if (sLen < tLen) {
        return 0;
    }
    
    const cache = new Array(sLen + 1).fill()
        .map(() => new Array(tLen + 1));
    
    cache[sLen].fill(0);
    for (let r = 0; r <= sLen; ++r) {
        cache[r][tLen] = 1;
    }
    
    for (let r = sLen - 1; r >= 0; --r) {
        for (let c = tLen - 1; c >= 0; --c) {
            cache[r][c] = cache[r + 1][c] + (
                s[r] === t[c]
                    ? cache[r + 1][c + 1]
                    : 0
            );
        }
    }
    
    return cache[0][0];
}

//////////////////////////////////////////////////////////////////////////////
// Depth First Search Recursion With Memoization
// Time: O(n*m)
// Space: O(n*m)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
function numDistinct(s, t) {
    
    const sLen = s.length;
    const tLen = t.length;
    
    if (sLen < tLen) {
        return 0;
    }
    
    const cache = new Array(sLen).fill()
        .map(() => new Array(tLen));
    
    return countDistincts();
    
    /**
     * @param {number=} i = `0`
     * @param {number=} j = `0`
     * @return {number}
     */
    function countDistincts(i = 0, j = 0) {
        return j === tLen
            ? 1
            : i === sLen
                ? 0
                : cache[i][j] !== undefined
                    ? cache[i][j]
                    : cache[i][j] = countDistincts(i + 1, j) + (
                        s[i] === t[j]
                            ? countDistincts(i + 1, j + 1)
                            : 0
                    );
    }
}
