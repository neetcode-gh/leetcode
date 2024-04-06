class Solution {
    fun intersection(nums1: IntArray, nums2: IntArray): IntArray {
        val seen = nums1.toSet()

        val res = mutableSetOf<Int> ()
        for (n in nums2) {
            if (n in seen)
                res.add(n)
        }

        return res.toIntArray()
    }
}
