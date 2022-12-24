/**
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/plus-one/
 * @param {number[]} digits
 * @return {number[]}
 */
 var plusOne = (digits) => {
    add(digits);
    carry(digits);     /* Time O(N) */
    addLeading(digits);/*           | Space O(N) */

    return digits;
};

var add = (digits) => digits[digits.length - 1] += 1;

var carry = (digits) => {
    for (let digit = (digits.length - 1); (0 < digit); digit--) {/* Time O(N) */
        const canCarry = (digits[digit] === 10);
        if (!canCarry) break;
        
        digits[digit] = 0;
        digits[(digit - 1)] += 1;
    }
}

const addLeading = (digits) => {
    const canCarry = (digits[0] === 10);
    if (!canCarry) return;

    digits[0] = 1;
    digits.push(0);/* Space O(N) */
}

/**
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/plus-one/
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = (digits) => {
    for (let digit = (digits.length - 1); (0 <= digit); digit--) {/* Time O(N) */
        const canCarry = digits[digit] === 9;
        if (canCarry) { digits[digit] = 0; continue; }

        digits[digit]++;

        return digits;
    }

    digits.unshift(1);                                            /* Time O(N) | Space O(N) */

    return digits;
};
