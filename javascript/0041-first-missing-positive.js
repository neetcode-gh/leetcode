 /**
   * Time O(n) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    //-1 1 3 4
    const swap = (a,b) => {
        const temp = nums[a];
        nums[a] = nums[b];
        nums[b] = temp;
    }
    // swap positions
    for(let i = 0; i < nums.length; i++) {
        const el = nums[i];
        const chair = el - 1;
        if(el >= 1 &&  el <= nums.length + 1 && nums[chair] !== el) {
             swap(chair, i);
                i--; // this decrement is important // check this input [3,4,-1,1]
        }
    }


    for(let i = 0; i < nums.length; i++) {
        if(nums[i] !== i+1) return i+1;
    } 

    return nums.length + 1;
};

/**
 * https://leetcode.com/problems/first-missing-positive/
 * Time O(n) | Space O(n)
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive1 = function(nums) {

    const numberSet = new Set(nums);
      
      let i = 1;
      while(numberSet.has(i)) {
          i++;
      }
  
      return i;
  };
