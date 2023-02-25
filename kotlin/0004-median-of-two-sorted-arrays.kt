class Solution {
    fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {
        var i1 = 0
        var i2 = 0
        fun getNext() = when {
            i1 < nums1.size && i2 < nums2.size -> if (nums1[i1] < nums2[i2]) nums1[i1++] else nums2[i2++]
            i1 < nums1.size -> nums1[i1++]
            else -> nums2[i2++]
        }
        val arr = IntArray(nums1.size + nums2.size) { getNext() }
        return if (arr.size % 2 == 1) arr[arr.size / 2].toDouble()
        else  (arr[arr.size / 2] + arr[arr.size / 2 - 1]) / 2.0
    }
}