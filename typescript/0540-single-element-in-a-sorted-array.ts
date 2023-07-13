// Time Complexity: O(log n)
// Space Complexity: O(1)

function singleNonDuplicate(nums: number[]): number {
    let left = 0,
        right = nums.length - 2;

    while (left <= right) {
        const mid1 = (left + right) >> 1;
        const mid2 = mid1 ^ 1;

        if (nums[mid1] === nums[mid2]) left = mid1 + 1;
        else right = mid1 - 1;
    }

    return nums[left];
}
