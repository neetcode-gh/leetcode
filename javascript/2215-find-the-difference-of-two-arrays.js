/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */

// Time Complexity: O(n), where n is the maximum length between nums1 and nums2.
// Space Complexity: O(m), where m is the length of the resulting difference lists.

var findDifference = function (nums1, nums2) {
    const nums1Set = new Set(nums1);
    const nums2Set = new Set(nums2);

    const lst1 = Array.from(nums1Set).filter((num) => !nums2Set.has(num));
    const lst2 = Array.from(nums2Set).filter((num) => !nums1Set.has(num));

    return [lst1, lst2];
};
