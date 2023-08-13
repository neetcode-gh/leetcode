/*
* Short answer
*/
class Solution {
    fun findDifference(nums1: IntArray, nums2: IntArray) =  listOf(
            (nums1.toSet() subtract nums2.toSet()).toList(),
            (nums2.toSet() subtract nums1.toSet()).toList()
        )
}

/*
* Or if you are interested in the "logic"
*/
class Solution {
    fun findDifference(nums1: IntArray, nums2: IntArray): List<List<Int>> {
        val nums1Set = nums1.toSet()
        val nums2Set = nums2.toSet()
        val res1 = HashSet<Int>()
        val res2 = HashSet<Int>()

        for (n in nums1) {
            if (n !in nums2Set)
                res1.add(n)
        }

        for (n in nums2) {
            if (n !in nums1Set)
                res2.add(n)
        }

        return listOf(
            res1.toList(),
            res2.toList()
        )
    }
}
