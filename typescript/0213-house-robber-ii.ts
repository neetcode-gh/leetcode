function helper(nums: number[]): number {
    let rob1 = 0;
    let rob2 = 0;

    for (const n of nums) {
        let temp = Math.max(n + rob1, rob2);
        rob1 = rob2;
        rob2 = temp;
    }

    return rob2;
}

function rob(nums: number[]): number {
    return Math.max(
        nums[0],
        helper(nums.slice(0, nums.length - 1)),
        helper(nums.slice(1))
    );
}
