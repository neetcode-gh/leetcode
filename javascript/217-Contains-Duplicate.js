/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const numsSet =  new Set()
    for(const i of nums){
        if(numsSet.has(i)){
            return true
        } 
        numsSet.add(i)
    }
    return false
};