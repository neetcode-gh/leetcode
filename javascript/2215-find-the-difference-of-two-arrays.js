/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */

// Time Complexity: O(m + n), we check each element of nums1Set and nums2Set
// Space Complexity: O(m + n), where m and n are length sets in worst case.

var findDifference = function (nums1, nums2) {
    const nums1Set = new Set(nums1);
    const nums2Set = new Set(nums2);

    const lst1 = Array.from(nums1Set).filter((num) => !nums2Set.has(num));
    const lst2 = Array.from(nums2Set).filter((num) => !nums1Set.has(num));

    return [lst1, lst2];
};
