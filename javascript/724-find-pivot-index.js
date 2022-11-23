// problem link https://leetcode.com/problems/find-pivot-index
// time coplexity O(n)

var pivotIndex = function(nums) {
    
const sum = nums.reduce((preSum, currentVal) => {
    return preSum + currentVal;
}, 0);


let left = 0;
for(let i = 0; i < nums.length; i++) {
    let right = sum - left - nums[i];
    if(right === left) {
        return i;
    }
    left += nums[i];
}

return -1;
};
