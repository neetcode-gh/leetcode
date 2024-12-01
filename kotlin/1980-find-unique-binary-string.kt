class Solution {
    fun findDifferentBinaryString(nums: Array<String>): String {
        val hs = nums.toSet()
        val n = nums.size
        var temp = CharArray(nums.size) { '0' }
        

        fun backtrack(i: Int): Boolean {
            if(i == n) {
                return if(!hs.contains(temp.joinToString(""))) true else false
            }
            if(backtrack(i+1)) return true
            temp[i] = '1'
            if(backtrack(i+1)) return true
            return false
        }

        return if(backtrack(0)) temp.joinToString("") else ""
    }
}
