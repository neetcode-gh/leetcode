/**
 * @param {number} n
 * @return {number}
 */
var pivotInteger = function (n) {

    // calculate the total sum fo n
    const totalSum = n * (n + 1) / 2;

    // find the square root of totalSum using Math.sqrt()
    const sqrtVal = Math.sqrt(totalSum);

    // if sqrtVal is equal to round down value of sqrtVal then return round down value of sqrtVal otherwise -1
    return Math.floor(sqrtVal) === sqrtVal ? Math.floor(sqrtVal) : -1;
};