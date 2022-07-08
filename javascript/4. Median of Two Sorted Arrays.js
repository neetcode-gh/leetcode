/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

const findMedianSortedArrays = function(nums1, nums2) {
  const mergedArr = merge(nums1, nums2)
  const midIdx = mergedArr.length / 2
  return (midIdx % 1 === 0) ? (mergedArr[midIdx] + mergedArr[midIdx - 1]) / 2 : mergedArr[parseInt(midIdx)]
};

const merge = (arr1, arr2) => {
  let i = 0
  let j = 0
  const res = []
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i])
      i++
    } else {
      res.push(arr2[j])
      j++
    }
  }
  while (i < arr1.length) {
    res.push(arr1[i])
    i++
  }
  while (j < arr2.length) {
    res.push(arr2[j])
    j++
  }
  return res
}