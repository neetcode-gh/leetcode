/**
 * @param {number[]} nums
 * Time O (N) | Space O(N)
 * @return {number}
 */
var longestConsecutive = function(nums, longestStreak = 0) {
    const numSet = new Set(nums);
    
    for (const num of [ ...numSet ]) {
        if (numSet.has(num - 1)) continue;

        let [ currentNum, currentStreak ] = [ num, 1 ];

        while (numSet.has(currentNum + 1)) {
            currentNum += 1;
            currentStreak += 1;
        }

        longestStreak = Math.max(longestStreak, currentStreak);
    }

    return longestStreak;
}