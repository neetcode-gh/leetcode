//  problem link https://leetcode.com/problems/majority-element
// time complexity O(n)

var majorityElement = function(nums) {
    
    const occuranceOfElement = new Map();
    for(let i = 0; i < nums.length; i++) {
        if(occuranceOfElement.has(nums[i])) {
            let occurance = occuranceOfElement.get(nums[i]);
            occuranceOfElement.set(nums[i], occurance+1);
        } else {
            occuranceOfElement.set(nums[i], 1);
        }
    }

    for(let [key,value] of occuranceOfElement) {
        if(value > nums.length / 2) return key;
    }

};
