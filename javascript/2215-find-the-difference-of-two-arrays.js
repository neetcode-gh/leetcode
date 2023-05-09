/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function(nums1, nums2) {
    
    let diff1 = nums1.filter(x => !nums2.includes(x));
    let diff2 = nums2.filter(x => !nums1.includes(x));

    let item1 = new Set(diff1);
    let item2 = new Set(diff2);
    if(item1===NaN){
        item1 = [];
    }
    if(item2===NaN){
        item2 = [];
    }
    return [[...item1],[...item2]];
};
