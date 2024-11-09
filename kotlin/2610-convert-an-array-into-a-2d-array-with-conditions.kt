class Solution {
    fun findMatrix(nums: IntArray): List<List<Int>> {
        val count = HashMap<Int, Int>()
        val res = mutableListOf<MutableList<Int>>()

        for (n in nums) {
            var row = count[n] ?: 0
            if (res.size == row)
                res.add(mutableListOf<Int>())
            res[row].add(n)
            count[n] = (count[n] ?: 0) + 1
        }

        return res
    }
}
