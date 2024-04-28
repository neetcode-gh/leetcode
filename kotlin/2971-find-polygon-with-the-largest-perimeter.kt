class Solution {
    fun largestPerimeter(nums: IntArray): Long {
        nums.sort()
        var total = 0L
        var res = -1L

        for (n in nums) {
            if (total > n)
                res = total + n
            total += n
        }

        return res
    }
}

// Same logic but a top down approach instead of bottom up as the solution above
class Solution {
    fun largestPerimeter(nums: IntArray): Long {
        nums.sortDescending()

        var sum = 0L
        for (n in nums)
            sum += n

        for (n in nums) {
            val rest = sum - n
            if (rest > n) return sum
            sum -= n
        }

        return -1L
    }
}

/*
 * Same intuition as above but use a maxheap instead of sorting. In Kotlin and Java the time complexity is O(nlogn)
 * but using heapify in Python or priority_queue in C++ this will have a time complexity of O(logn + n) ~ O(n)
 */
class Solution {
    fun largestPerimeter(nums: IntArray): Long {
        val max = PriorityQueue<Int> { a, b -> b - a }
        var sum = 0L

        for (n in nums) {
            sum += n
            max.add(n)
        }
        
        while (max.isNotEmpty() && sum <= max.peek() * 2)
            sum -= max.poll()

        return if (max.size >= 2 && sum > 0L) sum else -1L
    }
}
