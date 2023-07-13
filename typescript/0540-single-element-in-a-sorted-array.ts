// Time Complexity: O(log n)
// Space Complexity: O(1)

function singleNonDuplicate(nums: number[]): number {
    let left = 0,
        right = nums.length - 2;

    while (left <= right) {
        const mid = (left + right) >> 1;

        if (nums[mid] === nums[mid ^ 1]) left = mid + 1;
        else right = mid - 1;
    }

    return nums[left];
}
