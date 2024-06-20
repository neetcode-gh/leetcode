/**
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function(nums) {
    let count = 0;
    let totalSubarrays = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            count++;
        } else {
            if (count > 0) {
                totalSubarrays += (count * (count + 1)) / 2;
                count = 0;
            }
        }
    }
    
    if (count > 0) {
        totalSubarrays += (count * (count + 1)) / 2;
    }
    
    return totalSubarrays;
};

// Test cases
console.log(zeroFilledSubarray([1, 3, 0, 0, 2, 0, 0, 4])); 
console.log(zeroFilledSubarray([0, 0, 0, 2, 0, 0]));       
console.log(zeroFilledSubarray([2, 10, 2019]));            
