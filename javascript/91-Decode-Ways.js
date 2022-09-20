/**
 * DP - Top Down
 * Hash Map - Memoization
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/decode-ways/
 * @param {string} s
 * @return {number}
 */
var numDecodings = (str, index = 0, memo = new Map()) => {
    const isBaseCase1 = !str.length || (str[index] === '0');
    if (isBaseCase1) return 0;

    const isisBaseCase2 = index === str.length;
    if (isisBaseCase2) return 1;

    if (memo.has(index)) return memo.get(index);

    return dfs(str, index, memo);
};

const dfs = (str, index, memo) => {
    let count = numDecodings(str, (index + 1), memo);

    if (isTwoDigit(str, index)) {
        count += numDecodings(str, (index + 2), memo);
    }

    memo.set(index, count);

    return count;
}

var isTwoDigit = (str, index) => {
    const twoDigit = Number(str.slice(index, (index + 2)));

    return (10 <= twoDigit) && (twoDigit <= 26);
}

/**
 * DP - Bottom Up
 * Array - Tabulation
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/decode-ways/
 * @param {string} s
 * @return {number}
 */
var numDecodings = (s) => {
    const isBaseCase = !s.length || s[0] === '0'
    if (isBaseCase) return 0;

    const tabu = getTabu(s);

    decode(s, tabu);

    return tabu[s.length];
}

const getTabu = (s) => {
    const tabu = new Array(s.length + 1).fill(0);

    tabu[0] = 1;
    tabu[1] = (s[1] === '0')
        ? 0
        : 1;

    return tabu;
}

var decode = (s, tabu) => {
    for (let curr = 2; curr < tabu.length; curr++) {
        const [ prev, prevPrev ] = [ (curr - 1), (curr - 2) ];
        const isEqual = s[prev] === '0';
        if (!isEqual) tabu[curr] += tabu[prev];

        if (isTwoDigit(s, curr)) tabu[curr] += tabu[prevPrev];
    }
}

var isTwoDigit = (s, index) => {
    const twoDigit = Number(s.slice((index - 2), index));

    return 10 <= twoDigit && twoDigit <= 26;
}

/**
 * 2 Pointer - previous + previousPrevious
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/decode-ways/
 * @param {string} s
 * @return {number}
 */
var numDecodings = (s) => {
    const isBaseCase = !s.length || s[0] === '0';
    if (isBaseCase) return 0;

    return decode(s);
}

var decode = (s) => {
    let [ prev, prevPrev ] = [ 1, 1 ];

    for (let curr = 1; curr < s.length; curr++) {
        const temp = prev;

        const isEqual = s[curr] === '0';
        if (isEqual) prev = 0;

        if (isTwoDigit(s, curr)) prev += prevPrev;

        prevPrev = temp;
    }

    return prev;
}

var isTwoDigit = (s, i) => {
    const [ prevChar, curChar ] = [ (s[i - 1]), s[i] ];
    const is10 = prevChar === '1';
    const is20 = (prevChar === '2' && curChar <= '6');

    return is10 || is20;
}