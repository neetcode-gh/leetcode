function permuteUnique(nums: number[]): number[][] {
    const results: number[][] = [];
    const numsCount = new Map();
    for (let n of nums) {
        numsCount.set(n, (numsCount.get(n) ?? 0) + 1);
    }

    function traverse(sequence: number[] = []) {
        if (sequence.length === nums.length) {
            results.push([...sequence]);
            return;
        }

        for (let [n, count] of numsCount) {
            if (count === 0) continue;

            numsCount.set(n, count - 1);
            sequence.push(n);
            traverse(sequence);
            sequence.pop();
            numsCount.set(n, count);
        }
    }
    traverse();

    return results;
};
