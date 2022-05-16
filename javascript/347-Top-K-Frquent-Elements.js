/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const counter = {}
    
    for(let i = 0; i < nums.length; i++){
        counter[nums[i]] = 1 + (counter[nums[i]] || 0)
        
    }
    
    return(Object.keys(counter).sort((a,b) => counter[b] - counter[a]).slice(0, k))
};
