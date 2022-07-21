/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    let start = 0;
    let end = numbers.length - 1;
    while (start < end) {
        let currSum = numbers[start] + numbers[end];
        if (currSum > target) end--;
        else if (currSum < target) start++;
        else return [start + 1, end + 1];
    }
    return [];
};
