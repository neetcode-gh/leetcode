/**
 * https://leetcode.com/problems/reverse-integer/
 * Time O(log(x)) | Space O(1)
 * @param {number} x
 * @return {number}
 */
var reverse = function(x, result = 0) {
    while (x !== 0) {
        const digit = (x % 10)

        if (isOutOfBounds(digit, result)) return 0;

        x = Math.trunc(x / 10);
        result = (result * 10) + digit;
    }

    return result;
};

const isOutOfBounds = (digit, result) => {
    const [ max, min ] = [ ((2 ** 31) - 1), (-(2 ** 31)) ];
    const [ maxProduct, maxRemainder ] = [ (max / 10), (max % 10) ];
    const [ minProduct, minRemainder ] = [ (min / 10), (min % 10) ];
    const isTarget = result === maxProduct;

    const isMaxOut = ((maxProduct < result) || (isTarget && (maxRemainder <= digit)));
    const isMinOut = ((result < minProduct) || (isTarget && (digit <= minRemainder)));

    return isMaxOut || isMinOut;
}
