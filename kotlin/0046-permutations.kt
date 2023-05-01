class Solution {
    fun permute(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        val queue = ArrayDeque<Int>()

        for (num in nums) {
            queue.add(num)
        }

        // base case
        if (queue.size == 1) {
            return listOf(queue.toList()) // queue.toList() is a deep copy
        }

        for (i in nums.indices) {
            val n = queue.removeFirst()
            val perms = permute(queue.toIntArray())

            for (perm in perms) {
                val mutablePerm = perm.toMutableList()
                mutablePerm.add(n)
                res.add(mutablePerm)
            }
            queue.addLast(n)
        }
        return res
    }
}
