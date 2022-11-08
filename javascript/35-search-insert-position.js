// problem link https://leetcode.com/problems/search-insert-position/
// time complexity O(n)


var searchInsert = function(nums, target) {
    

  let low = 0;
  let high = nums.length;
  let middleIndex;
  
do {
         middleIndex = Math.floor(low + ((high - low) / 2));
             if(target !== nums[middleIndex]) {
                if(target > nums[middleIndex]) {
                    low = middleIndex + 1;
                } else {
                    high = middleIndex - 1;
                }         
             } else if(target === nums[middleIndex]){
                 return middleIndex;
             }

        
} while (low <= high);

if(middleIndex <= 0) {
  return target > nums[middleIndex] ? middleIndex + 1  : 0;
} else {
  return target > nums[middleIndex] ? middleIndex + 1 : middleIndex;
}

};
