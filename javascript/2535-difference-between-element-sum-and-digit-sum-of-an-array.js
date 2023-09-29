/**
 * @param {number[]} nums
 * @return {number}
 */
var differenceOfSum = function (nums) {
    let elementSum = eval(nums.join("+")); // element sum of nums using eval()
    let digitSum = 0; // initialize digitSum to zero
    for (let i = 0; i < nums.length; i++) { // iterate through the every element of the array
        if (nums[i] > 9) { // if number is greater than 9
            let sum = eval(String(nums[i]).split("").join("+")); // conver number to string and then array and again to string and sum using eval()
            digitSum = digitSum + sum;
        } else {
            digitSum = digitSum + nums[i]; // add nums[i] to digitsum if number is less than 9
        }
    }
    let ans = Math.abs(elementSum - digitSum); // find absolute difference of elementSum and digitSum
    return ans; // return answer
};