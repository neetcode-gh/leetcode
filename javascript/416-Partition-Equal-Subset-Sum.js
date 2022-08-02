/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    var sum = nums.reduce((a, b) => a + b, 0);    
    if (sum % 2) {
        return false;
    }
    
    var dp = new Set();
    dp.add(0);
    var target = sum / 2;
    
    for (var i = 0; i < nums.length; i++) {
        var targetPresent = false;
        var nextDP = new Set();
        dp.forEach(t => {
            if ((t + nums[i]) === target) {
                targetPresent = true;
            }
            
            nextDP.add(t + nums[i]);
            nextDP.add(t);
        });
        
        if (targetPresent) {
            return true;
        }
        
        dp = nextDP;
    }
    
    if (dp.has(target)) {
        return true;
    }
    
    return false;
};
