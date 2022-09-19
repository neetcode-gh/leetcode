function findKthLargest(nums: number[], k: number): number {
    k = nums.length - k;

    function quickSelect(l: number, r: number): number {
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
        }
        if (p < k) {
            return quickSelect(p + 1, r);
        }
        return nums[p];
    }

    return quickSelect(0, nums.length - 1);
}
