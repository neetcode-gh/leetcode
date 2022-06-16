//Brute force. Straight forward nested for loops,
//both for loops count right. O(n^2)
var containsDuplicate = function(nums) {
    for (let i=0; i<nums.length; i++) {
        for (let j=1; j<nums.length; j++){
            if(nums[i] === nums[j]) {
                return true;
            }
        }
    }
    return false;
};
    
//Brute force, the for loops start at opposite ends and
//count towards each other. With j>i they don't cross over
var containsDuplicate = function(nums) {
    for (let i=0; i<nums.length-2; i++) {
        for (let j=nums.length-1; j>i; j--){
            if(nums[i] === nums[j]) return true;
        }
    }
    return false;
};

/*
Using: 
-HashMap Object in JS
-arrayMap = {} to map occurrences instead of nested for loops
-.hasOwnProperty() function
Improve to O(log n) - I believe, I'm very new to Big O
*/
var containsDuplicate = function(nums) {
    arrayMap = {};
    let hasDuplicate = false;
    
    for(i=0; i<nums.length; i++) {
        if(!arrayMap.hasOwnProperty(nums[i])) arrayMap[nums[i]] = 1;
        else {
            hasDuplicate = true;
            break;
        }
    }
    return hasDuplicate;
};