// problem link https://leetcode.com/problems/minimum-size-subarray-sum/submissions/612844825/
// time complexity is O(n).

var minSubArrayLen = function(target, nums) {

    let total = 0;
    let min_length = Number.MAX_SAFE_INTEGER;
    let left_pointer = 0;
    for(let i = 0; i < nums.length; i++) {
        
        total += nums[i];
        while(total >= target) {
            min_length = Math.min(min_length, i + 1 - left_pointer);
            total -= nums[left_pointer];
            left_pointer = left_pointer+1;
        }
    }
    
   if(min_length == Number.MAX_SAFE_INTEGER) {
       return 0;
   } else {
       return min_length;
   }
};

