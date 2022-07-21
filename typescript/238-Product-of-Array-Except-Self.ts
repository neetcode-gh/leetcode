function productExceptSelf(nums: number[]): number[] {
  const array: Array<number> = [];
  let product: number = 1;

  for (let idx = 0; idx < nums.length; idx++) {
    array[idx] = product;
    product *= nums[idx];
  }

  product = 1;

  for (let idx = nums.length - 1; idx >= 0; idx--) {
    array[idx] *= product;
    product *= nums[idx];
  }

  return array;
}
