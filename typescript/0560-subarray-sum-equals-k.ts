function subarraySum(nums: number[], k: number): number {
    let count = 0,
        sum = 0,
        map = new Map<number, number>();
    map.set(0, 1);
    for (const num of nums) {
        sum += num;
        if (map.has(sum - k)) {
            count += map.get(sum - k);
        }
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
}
