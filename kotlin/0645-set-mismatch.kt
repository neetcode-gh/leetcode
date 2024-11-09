// O(n) time and O(1) space
class Solution {
    fun findErrorNums(nums: IntArray): IntArray {
        val n = nums.size

        var x = 0
        var y = 0
        for (i in 1..n) {
            x += nums[i - 1] - i
            y += nums[i - 1] * nums[i - 1] - i * i
        }

        var missing = (y - x * x) / (2 * x)
        var duplicate = missing + x

        return intArrayOf(duplicate, missing)
    }
}

// Inplace data manipulation O(n) time and O(1) space
class Solution {
    fun findErrorNums(nums: IntArray): IntArray {
        val res = IntArray (2)

        for (i in nums.indices) {
            val n = Math.abs(nums[i])
            nums[n - 1] = -1 * nums[n - 1]
            if (nums[n - 1] > 0)
                res[0] = n
        }

        for ((i, n) in nums.withIndex()) {
            if (n > 0 && i + 1 != res[0]) {
                res[1] = i + 1
                break
            }
        }
        
        return res
    }
}

// HashMap O(n) time and O(n) space
class Solution {
    fun findErrorNums(nums: IntArray): IntArray {
        val res = IntArray (2)
        val counts = nums
            .asList()
            .groupingBy { it }
            .eachCount()

        for (num in 1..nums.size) {
            val count = counts[num] ?: 0
            if (count == 0)
                res[1] = num
            if (count == 2)
                res[0] = num
        }

        return res
    }
}

// Use XOR O(n) time and O(1) space
class Solution {
    fun findErrorNums(nums: IntArray): IntArray {
        val res = IntArray (2)

        for (i in nums.indices) {
            val num = Math.abs(nums[i])

            res[1] = res[1] xor ((i + 1) xor num)

            if (nums[num - 1] < 0) res[0] = num
            else nums[num - 1] *= -1
        }
        
        res[1] = res[1] xor res[0]
        return res
    }
}
