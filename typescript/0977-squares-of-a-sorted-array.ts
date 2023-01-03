function sortedSquares(nums: number[]): number[] {
    let left: number = 0;
    let right: number = nums.length - 1;

    const answer: number[] = [];

    while (left <= right) {
        const leftSqr = nums[left] * nums[left];
        const rightSqr = nums[right] * nums[right];

        if (leftSqr > rightSqr) {
            answer.push(leftSqr);
            left++;
        } else {
            answer.push(rightSqr);
            right--;
        }
    }
    return answer.reverse();
}
