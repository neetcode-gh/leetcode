class Solution {
    fun majorityElement(nums: IntArray): List<Int> {
        var count = HashMap<Int, Int>()

        for (n in nums) {
            count[n] = count.getOrDefault(n, 0) + 1

            if (count.size <= 2) continue

            var newCount = HashMap<Int, Int>()
            for ((n, c) in count) {
                if (c > 1)
                    newCount[n] = c - 1
            }
            count = newCount
        }

        var res = mutableListOf<Int>()
        
        for ((n, c) in count) {
            var numCount = 0
            for (n2 in nums)
                if (n == n2) 
                    numCount++

            if (numCount > (nums.size / 3)) res.add(n)
        }

        return res
    }
}
