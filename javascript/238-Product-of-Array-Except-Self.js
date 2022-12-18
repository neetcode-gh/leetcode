/**
 * Array
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/product-of-array-except-self/
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = (nums) => {
    const products = 2;
    const [ leftProduct, rightProduct ] = getProducts(products, nums);

    carryForward(nums, leftProduct);                         /* Time O(N) | Space O(N) */
    carryBackward(nums, rightProduct);                       /* Time O(N) | Space O(N) */

    return combineProducts(nums, leftProduct, rightProduct); /* Time O(N) | Ignore Auxillary Space O(N) */
}

const getProducts = (products, nums) => new Array(products).fill()
    .map(() => new Array(nums.length).fill(1));

var carryForward = (nums, leftProduct) => {
    for (let index = 1; index < nums.length; index++) {/* Time O(N) */
        leftProduct[index] = nums[index - 1] * leftProduct[index - 1];/* Space O(N) */
    }
}

var carryBackward = (nums, rightProduct) => {
    for (let index = (nums.length - 2); 0 <= index; index--) {/* Time O(N) */
       rightProduct[index] = nums[index + 1] * rightProduct[index + 1];/* Space O(N) */
    }
}

const combineProducts = (nums, leftProduct, rightProduct) => {
    const products = new Array(nums.length).fill(1);/* Ignore Auxillary Space O(N) */

    for (let index = 0; index < nums.length; index++) {/* Time O(N) */
       products[index] = leftProduct[index] * rightProduct[index];/* Ignore Auxillary Space O(N) */
    }

    return products;
}

/**
 * Array - Ignore Auxillary Space
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/product-of-array-except-self/
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = (nums) => {
    const products = new Array(nums.length).fill(1);/* Ignore Auxillary Space O(N) */

    carryForward(nums, products); /* Time O(N) | Ignore Auxillary Space O(N) */
    carryBackward(nums, products);/* Time O(N) | Ignore Auxillary Space O(N) */

    return products;
};

var carryForward = (nums, products, product = 1) => {
    for (let index = 0; index < nums.length; index++) {/* Time O(N) */
        products[index] = product;                         /* Ignore Auxillary Space O(N) */
        product *= nums[index];
    }
}

var carryBackward = (nums, products, product = 1) => {
    for (let index = (nums.length - 1); 0 <= index; index--) {/* Time O(N) */
        products[index] *= product;                               /* Ignore Auxillary Space O(N) */
        product *= nums[index];
    }
}
