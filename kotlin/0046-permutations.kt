// solution based on the video
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

// original solution
class Solution {
    fun permute(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        permute(nums, mutableSetOf<Int>(), mutableListOf<Int>(), res)
        return res
    }

    fun permute(nums: IntArray, set: MutableSet<Int>, list: MutableList<Int>, res: MutableList<List<Int>>) {
        if (list.size == nums.size) {
            res.add(ArrayList(list))
            return
        }

        for (i in 0..nums.size-1) {
            if (!set.contains(nums[i])) {
                list.add(nums[i])
                set.add(nums[i])
                permute(nums, set, list, res)
                list.removeAt(list.size-1)
                set.remove(nums[i])
            }
        }
    }
}

