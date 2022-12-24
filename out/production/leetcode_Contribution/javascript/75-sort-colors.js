// problem link https://leetcode.com/problems/sort-colors

// brute force approche O(n^2);
var sortColors = function(nums) {

    for(let i = 0; i < nums.length; i++) {
        for(let j = i +1; j < nums.length;  j++) {
            if(nums[j] < nums[i]) {
                swap(nums, j, i);
            }
        }
    }  
  
    return nums;
  };
  
function swap(nums, j, i) {

    const temp = nums[j];
    nums[j] = nums[i];
    nums[i] = temp;
}

// optimized approche O(n);

function sortColors(nums) {
 
    let i = 0;
    let l = 0;
    let r = nums.length - 1;
   
    while(i <= r) {
        const num = nums[i];
        if(num ===  0) {
            swap(nums,i,l);
            i++;
            l++;
        } else if(num === 2) {
            swap(nums,i,r);
            r--;
        } else {
            i++;
        }
    } 
   
    return nums;
   }
   
   function swap(nums,i,j) {
       [nums[i], nums[j]] = [nums[j],nums[i]];
   }
