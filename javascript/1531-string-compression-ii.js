/**
 * DP | Recursion | Memoization
 * Time O(n^4) | Space O(n^4)
 * https://leetcode.com/problems/string-compression-ii/
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function getLengthOfOptimalCompression(s, k) {
    const cache = new Map();

    const dfs = (i, pre, freqOfSameChar, leftK) => {

        const hash = `${i},${pre},${freqOfSameChar},${leftK}`;
        if (cache.has(hash)) return cache.get(hash);

        if (leftK < 0) return Infinity;
        if (i === s.length) return 0;

        const deleteChar = dfs(i+1, pre, freqOfSameChar, leftK-1);

        let keepChar;

        if (s[i] === pre) {

            const addOneOrZero = (freqOfSameChar === 1 || freqOfSameChar === 9 || freqOfSameChar === 99) ? 1 : 0;
            keepChar = addOneOrZero + dfs(i+1, pre, freqOfSameChar + 1, leftK);
        } else {

            keepChar = 1 + dfs(i+1, s[i], 1, leftK);
        }

        cache.set(hash, Math.min(deleteChar, keepChar));

        return cache.get(hash);
    }

    return dfs(0, -1, 0, k);
}


/**
 * Brute force.
 * Time O(2^n) | Space O(n)
 * https://leetcode.com/problems/string-compression-ii
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var getLengthOfOptimalCompressionBF = function(s, k) {
    
    const runLengthEncoded = (str) => {
        const encodedStr = [];
        let left = 0;
        let right = 1;

        while(right < str.length + 1) {
            while(str[left] === str[right]) {
                right++;
            }
            const len = right - left;
            if(len > 1) {
                encodedStr.push(str[left], len);
            } else {
                encodedStr.push(str[left])
            }
            
            left = right;
            right++;
        }

        return encodedStr.join("").length;
    }

    let min = Infinity;
    const dfs = (i, str, deleteLeft) => {
        // console.log(str)
        const hash = `${i}-${deleteLeft}`;
        
        if(i === s.length) {
            min = Math.min(min, runLengthEncoded(str))
            return;
        }
        if(deleteLeft > 0) {
            return Math.min(dfs(i+1, str+s[i], deleteLeft), dfs(i+1, str, deleteLeft-1));
        }
        return dfs(i+1, str+s[i], deleteLeft);
    }

    dfs(0, "", k);
    return min;
};
