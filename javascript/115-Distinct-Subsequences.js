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
