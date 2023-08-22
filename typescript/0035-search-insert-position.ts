function searchInsert(nums: number[], target: number): number {
    let [left, right] = [0, nums.length - 1];

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        if (nums[middle] == target) {
            return middle;
        } else if (nums[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return left;
}
