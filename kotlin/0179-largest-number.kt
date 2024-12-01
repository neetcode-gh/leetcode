class Solution {
    fun largestNumber(nums: IntArray): String {
        if(nums.isEmpty()) return ""
        val strs = nums.map{ it.toString() }.sortedWith( Comparator { a,b -> (b + a).compareTo(a + b) } )
        return if(strs[0][0] == '0') "0" else strs.joinToString("")
    }
}
