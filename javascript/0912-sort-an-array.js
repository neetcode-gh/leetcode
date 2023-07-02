/**
 * https://leetcode.com/problems/sort-an-array/
 * Merge Sort
 * Time O(n*log(n)) | Space O(n)
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = function(nums) {
    return mergeSort(0, nums.length  - 1, nums);
};  

const mergeSort = (left, right, nums) => {

    if(left === right) return nums;
    
    const mid = Math.floor((left+right)/2);
    mergeSort(left, mid, nums);
    mergeSort(mid+1, right, nums);
    return merge(left, right, mid, nums);
}

const merge = (left, right, mid, nums) => {
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
