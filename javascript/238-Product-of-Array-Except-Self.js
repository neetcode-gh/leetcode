/**
 * @param {number[]} nums
 * Time O(N) | Space O(N)
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const products = new Array(nums.length).fill(1);
    
    carryForward(nums, products);
    carryBackward(nums, products);

    return products;
};

const carryForward = (nums, products, product = 1) => {
    for (let index = 0; index < nums.length; index++) {
        products[index] = product;
        product *= nums[index];
    }
}

const carryBackward = (nums, products, product = 1) => {
    for (let index = (nums.length - 1); 0 <= index; index--) {
        products[index] *= product;
        product *= nums[index];
    }
}
