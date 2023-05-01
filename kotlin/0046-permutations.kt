class Solution {
    fun permute(nums: IntArray): List<MutableList<Int>> {
        val res = mutableListOf<MutableList<Int>>()
        val queue = ArrayDeque<Int>(nums.toList())

        // base case
        if (queue.size == 1) {
            return listOf(queue.toMutableList()) // queue.toList() is a deep copy
        }

        for (i in nums.indices) {
            val n = queue.removeFirst()
            val perms = permute(queue.toIntArray())

            for (perm in perms) {
                perm.add(n)
                res.add(perm)
            }
            queue.addLast(n)
        }
        return res
    }
}
