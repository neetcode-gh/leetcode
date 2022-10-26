// problem link
// https://leetcode.com/problems/subarray-sum-equals-k/


// time complexity O(n);
var subarraySum = function(nums, k) {
    

const prefixMap = {};
let totalSubArray = 0;
let ongoingSum = 0;

prefixMap[0] = 1;
for(let i = 0; i < nums.length; i++) {
    ongoingSum += nums[i];
    if(prefixMap[ongoingSum - k]){
        totalSubArray += prefixMap[ongoingSum - k];
    }
    prefixMap[ongoingSum] = (prefixMap[ongoingSum] ? prefixMap[ongoingSum] + 1: 1);
}

return totalSubArray;
};
