/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
    let left = 0;

    for (let index in nums) {
        if (nums[index] != 0) {
            const temp = nums[left];
            nums[left] = nums[index];
            nums[index] = temp;
            left++;
        }
    }
}
