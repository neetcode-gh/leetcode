/**
 * Expand Around Center
 * Time O(N^2) | Space O(1)
 * https://leetcode.com/problems/longest-palindromic-substring/
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = (s) => {
    const isEmpty = s.length === 0;
    if (isEmpty) return '';

    const [ left, right ] = search(s);/* Time O(N * N) */

    return s.slice(left, (right + 1));/* Time O(N * N) | Ignore Auxillary Space (N) */
}

const search = (s, left = 0, right = 0) => {
    for (let index = 0; index < s.length; index++) {/* Time O(N) */
        const len1 = getLength(s, index, index);        /* Time O(N) */
        const len2 = getLength(s, index, (index + 1));  /* Time O(N) */
        const [ length, window ] = [ (Math.max(len1, len2)), (right - left) ];

        const canSkip = (length <= window);
        if (canSkip) continue;

        left = (index - ((length - 1) >> 1));
        right = (index + (length >> 1));
    }

    return [ left, right ];
}

const getLength = (s, left, right) => {
    const canExpand = () => ((0 <= left) && (right < s.length));
    const isSame = () => (s[left] === s[right]);

    const isPalindrome = () => (canExpand() && isSame());
    while (isPalindrome()) { left--; right++; }/* Time O(N) */

    const window = ((right - left) - 1);

    return window;
}
