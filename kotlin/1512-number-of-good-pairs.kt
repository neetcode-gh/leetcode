// rolling count
class Solution {
    fun numIdenticalPairs(nums: IntArray): Int {
        val count = HashMap<Int, Int>()
        var total = 0

        for (n in nums) {
            count[n]?.let {
                total += it
            }
            count[n] = count.getOrDefault(n, 0) + 1
        }

        return total
    }
}

// count and use arithmetic sequence
class Solution {
    fun numIdenticalPairs(nums: IntArray): Int {
        val count = HashMap<Int, Int>().apply {
            for (n in nums) {
                this[n] = getOrDefault(n, 0) + 1
            }
        }

        var res = 0
        for (c in count.values) {
            res += c * (c - 1) / 2
        }
        
        return res
    }
}

// brute force
class Solution {
    fun numIdenticalPairs(nums: IntArray): Int {
        var count = 0

        for (i in 0 until nums.size) {
            for (j in i + 1 until nums.size) {
                if (nums[i] == nums[j]) {
                    count++
                }
            }
        }

        return count
    }
}
