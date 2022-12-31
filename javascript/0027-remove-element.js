/**
 * Time O(N) | Space O(1)
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let ptr1 = nums.length - 2;
    let ptr2 = nums.length - 1;
    
    if(!nums) return 0;
    if(nums.length === 1) {
        if(nums[0] === val) return 0;
        return 1;
    }
    
    while(ptr1 > -1) {
        if(nums[ptr2] === val) {
            ptr2--;
            
            while(nums[ptr1] === val) {
                ptr2--;
                ptr1--;
            }  
        }
        else if(nums[ptr1] === val) {
            let temp = nums[ptr1];
            nums[ptr1] = nums[ptr2];
            nums[ptr2] = temp;
            ptr2--;
            
        }

        ptr1--;
    }
    
    return ptr2 + 1;
};


/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] === val) {
            nums.splice(i, 1);
            i--;            
        }
    }
    
    return nums.length;
};
