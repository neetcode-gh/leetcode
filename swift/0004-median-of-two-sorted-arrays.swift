class Solution {
    func findMedianSortedArrays(_ nums1: [Int], _ nums2: [Int]) -> Double {
        if nums1.count > nums2.count {
            return findMedianSortedArrays(nums2, nums1)
        }

        var m = nums1.count
        var n = nums2.count
        var l = 0
        var r = m

        while l <= r {
            var pa = (l + r) / 2
            var pb = (m + n + 1) / 2 - pa

            var maxLeftA = pa == 0 ? Int.min : nums1[pa - 1]
            var minRightA = pa == m ? Int.max : nums1[pa]
            var maxLeftB = pb == 0 ? Int.min : nums2[pb - 1]
            var minRightB = pb == n ? Int.max : nums2[pb]

            if maxLeftA <= minRightB && maxLeftB <= minRightA {
                if (m + n) % 2 == 0 {
                    return Double((max(maxLeftA, maxLeftB) + min(minRightA, minRightB))) / 2.0
                } else {
                    return Double(max(maxLeftA, maxLeftB))
                }
            } else if maxLeftA > minRightB {
                r = pa - 1
            } else {
                l = pa + 1
            }
        }

        return 0.0
    }
}