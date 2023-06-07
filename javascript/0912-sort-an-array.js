/**
 * https://leetcode.com/problems/sort-an-array/
 * Merge Sort
 * Time O(n*log(n)) | Space O(n)
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    
    const merge = (left, mid, right) => {
        const arr1 = nums.slice(left, mid+1);
        const arr2 = nums.slice(mid+1, right + 1);
        
        let p1 = 0; 
        let p2 = 0;
        let gp = left;

        while(p1 < arr1.length && p2 < arr2.length) {
            if(arr1[p1] < arr2[p2]) {
                nums[gp] = arr1[p1];
                p1++;
            } else {
                nums[gp] = arr2[p2];
                p2++;
            }
            gp++;
        }

        while(p1 < arr1.length) {
            nums[gp] = arr1[p1];
            p1++;
            gp++;
        }

        while(p2 < arr2.length) {
            nums[gp] = arr2[p2];
            p2++;
            gp++;
        }
        return nums;
    }  

    const mergeSort = (left, right) => {

        if(left === right) return nums;
        
        const mid = Math.floor((left+right)/2);
        mergeSort(left, mid);
        mergeSort(mid+1, right);
        return merge(left, mid, right);
    }

    return mergeSort(0, nums.length  - 1);
};  
