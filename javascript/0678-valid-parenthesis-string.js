/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
    var leftMin = 0;
    var leftMax = 0;

    for (var c of s) {
        if (c === '(') {
            leftMin++;
            leftMax++;
        } else if (c === ')') {
            leftMin--;
            leftMax--;
        } else {
            leftMin--;
            leftMax++;
        }

        if (leftMax < 0) {
            return false;
        }

        if (leftMin < 0) {
            leftMin = 0;
        }
    }

    return leftMin === 0;
};

/**
 * https://leetcode.com/problems/valid-parenthesis-string/
 * Time O(N^3) | Space O(N^2)
 * @param {string} s
 * @return {boolean}
 */
 var checkValidString = function(s) {
    const isBaseCase = s.length === 0;
    if (isBaseCase) return true;

    const dp = new Array(s.length).fill()
        .map(() => new Array(s.length).fill(false));

    for (let i = 0; i < s.length; i++) {/* Time O(N) */
        if (isStar(s[i])) dp[i][i] = true;
        
        const isInBound = i < (s.length - 1)
        const isOpenedOrStar = isOpened(s[i]) || isStar(s[i])
        const isClosedOrStar = isClosed(s[i + 1]) || isStar(s[i + 1])
        
        const isValid = isInBound && isOpenedOrStar && isClosedOrStar
        if (isValid) dp[i][i + 1] = true;/* Space O(N^2) */
    }

    for (let size = 2; size < s.length; size++) {/* Time O() */
        for (let i = 0; i + size < s.length; i++) {/* Time O(N) */
            const isStarOrDP = isStar(s[i]) && isDP(dp, (i + 1), (i + size))
            if (isStarOrDP) { dp[i][i + size] = true; continue; }
        
            const isOpenedOrStar = isOpened(s[i]) || isStar(s[i])
            if (isOpenedOrStar) check(dp, size, i); /* Time O(N) */
        }
    }
    
    return dp[0][s.length - 1];
}

const check = (dp, size, i) => {    
    for (let k = (i + 1); k <= (i + size); k++) {/* Time O(N) */
        const isClosedOrStar = isClosed(s[k]) || isStar(s[k])
        const isKOrDP = isKEqual(k, i, 1) || isDP(dp, (i + 1), (k - 1))
        const isKOrDPSize = isKEqual(k, i, size) || isDP(dp, (k + 1), (i + size))

        const isValid = isClosedOrStar && isKOrDP && isKOrDPSize
        if (isValid) dp[i][i + size] = true;/* Space O(N^2) */
    }
}

var isStar = (char) => char === '*'
var isOpened = (char) => char === '('
var isClosed = (char) => char === ')'
const isKEqual = (k, i, size) => k === (i + size)
const isDP = (dp, i, k) => dp[i][k]


/**
 * Time O(N) | Space O(1)
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function(s) {
   let [ left, right ] = [ 0, 0 ];

   for (const char of s) {/* Time O(N) */
       left += isOpened(char) ? 1 : -1;
       right += !isClosed(char) ? 1 : -1;
       
       const isNegative = right < 0;
       if (isNegative) break;

       left = Math.max(left, 0);
   }
    
   return left === 0;
}

var isOpened = (char) => char === '('
var isClosed = (char) => char === ')'


