function longestConsecutive(nums: number[]): number {
    const number = new Set(nums);
    let longest = 0;

    for (const n of nums) {
        if (!number.has(n - 1)) {
            let length = 0;
            while (number.has(n + length)) {
                length += 1;
            }
            longest = Math.max(length, longest);
        }
    }

    return longest;
}
