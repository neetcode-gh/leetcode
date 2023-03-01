/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    this.array = nums
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    this.sum = 0
    
    while(left<=right && right < this.array.length){
      
        this.sum += this.array[left]
        left +=1

    }

    return this.sum
};

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
