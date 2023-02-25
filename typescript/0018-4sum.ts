function fourSum(nums: number[], target: number): number[][] {
    const sortedNums: number[] = nums.sort((a: number, b: number) => a - b);
    const res: number[][] = [];
    const quad: number[] = [];

    const kSum = (k: number, start: number, target: number): void => {
        if (k > 2) {
            for (let i = start; i < sortedNums.length; i++) {
                if (i !== start && sortedNums[i] === sortedNums[i - 1]) {
                    continue;
                }
                quad.push(sortedNums[i]);
                kSum(k - 1, i + 1, target - sortedNums[i]);
                quad.pop();
            }
        } else {
            let left: number = start;
            let right: number = sortedNums.length - 1;

            while (left < right) {
                const sum = sortedNums[left] + sortedNums[right];
                if (sum < target) {
                    left++;
                } else if (sum > target) {
                    right--;
                } else {
                    res.push(
                        quad.concat([sortedNums[left], sortedNums[right]])
                    );
                    left++;
                    while (
                        left < right &&
                        sortedNums[left] === sortedNums[left - 1]
                    ) {
                        left++;
                    }
                }
            }
        }
    };
    kSum(4, 0, target);
    return res;
}
