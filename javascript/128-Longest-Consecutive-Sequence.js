/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    const set = new Set();

    for (num of nums) {
        set.add(num)
    }
    
    let longestStreak = 0;

    for (n of set) {
        if (!set.has(n-1)) {
            let currentStreak = 1;
            let currentNum = n;

            while (set.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }
            
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }
    
    return longestStreak;
};
