/**
 * Array | Simulation | Sorting
 * Time O(n*log(n)) | Space O(n)
 * https://leetcode.com/problems/merge-two-2d-arrays-by-summing-values
 * @param {number[][]} nums1
 * @param {number[][]} nums2
 * @return {number[][]}
 */
var mergeArrays = function(nums1, nums2) {
    
    const idToVal2 = {};
    const result = [];
    const taken = new Set();

    for (let i = 0; i < nums2.length; i++) {
        const [id, val] = nums2[i];
        idToVal2[id] = val;
    }

    for (let i = 0; i < nums1.length; i++) {
        const [id, val] = nums1[i];
        result.push([id, (idToVal2[id] || 0) + val]);
        taken.add(id);
    }

    for (let i = 0; i < nums2.length; i++) {
        const [id, val] = nums2[i];
        if (!taken.has(id)) {
            result.push([id, val]);
        }
        taken.add(id);
    }

    return result.sort((a,b) => a[0] - b[0]);
};
