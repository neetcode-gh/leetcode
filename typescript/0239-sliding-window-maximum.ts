function maxSlidingWindow(nums: number[], k: number): number[] {
    const res: number[] = [];
    let l = 0;
    let r = 0;

    const queue: number[] = [];

    while (r < nums.length) {
        while (queue.length > 0 && nums[queue[queue.length - 1]] < nums[r]) {
            queue.pop();
        }
        queue.push(r);

        if (l > queue[0]) {
            queue.shift();
        }

        if (r + 1 >= k) {
            res.push(nums[queue[0]]);
            l += 1;
        }

        r += 1;
    }

    return res;
}
