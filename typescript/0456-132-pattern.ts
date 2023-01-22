function find132pattern(nums: number[]): boolean {
    let stack: { num: number; minLeft: number }[] = []; // [num, minLeft]
    let curMin = nums[0];

    for (let n of nums.slice(1)) {
        while (stack.length > 0 && n >= stack[stack.length - 1].num) {
            stack.pop();
        }
        if (stack.length > 0 && n > stack[stack.length - 1].minLeft) {
            return true;
        }

        stack.push({ num: n, minLeft: curMin });
        curMin = Math.min(curMin, n);
    }

    return false;
}
