/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
    let l = 0;
    let r = nums.length - 1;
    let i = 0;

    function swap(a: number, b: number) {
        let temp = nums[a];
        nums[a] = nums[b];
        nums[b] = temp;
    }

    while (i <= r) {
        if (nums[i] == 0) {
            swap(l, i);
            l += 1;
        } else if (nums[i] == 2) {
            swap(r, i);
            r -= 1;
            i -= 1;
        }
        i += 1;
    }
}
