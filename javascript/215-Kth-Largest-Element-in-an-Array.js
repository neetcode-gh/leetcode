/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    k = nums.length - k;

    function quickSelect(l, r) {
        const pivot = nums[r];
        let p = l;
        let i = l;
        let temp;
        while (i >= l && i < r) {
            if (nums[i] <= pivot) {
                temp = nums[p];
                nums[p] = nums[i];
                nums[i] = temp;
                p++;
            }

            i++;
        }

        temp = nums[p];
        nums[p] = nums[r];
        nums[r] = temp;

        if (p > k) {
            return quickSelect(l, p - 1);
        } else if (p < k) {
            return quickSelect(p + 1, r);
        } else {
            return nums[p];
        }
    }

    return quickSelect(0, nums.length - 1);
};
