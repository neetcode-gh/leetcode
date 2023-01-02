function maxFrequency(nums: number[], k: number): number {
    const sortedNums: number[] = nums.sort((a: number, b: number) => a - b);

    let maxLength: number = 0;

    let currentSum: number = 0;
    let leftWindow: number = 0;
    for (let rightWindow: number = 0; rightWindow < sortedNums.length; rightWindow++) {
        const currentLength: number = rightWindow - leftWindow + 1;
        const rightNum: number = sortedNums[rightWindow];
        currentSum += rightNum;

        if (currentSum + k >= rightNum * currentLength) {
            maxLength = currentLength;
        } else {
            const leftNum = sortedNums[leftWindow];
            currentSum -= leftNum;
            leftWindow++;
        }
    }
    return maxLength;
};