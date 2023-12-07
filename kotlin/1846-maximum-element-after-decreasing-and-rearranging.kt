// 1. O(nlogn) solution using sorting
class Solution {
    fun maximumElementAfterDecrementingAndRearranging(arr: IntArray): Int {
        arr.sort()
        var prev = 0

        for (n in arr) {
            prev = minOf(prev + 1, n)
        }

        return prev
    }
}

// 2. O(n) solution but at the cost of O(1) -> O(n) space
class Solution {
    fun maximumElementAfterDecrementingAndRearranging(arr: IntArray): Int {
        val n = arr.size
        var count = IntArray (n + 1).apply {
            for (num in arr)
                this[minOf(n, num)]++
        }

        var last = 1
        for (num in 1..n)
            last = minOf(last + count[num], num)

        return last
    }
}

// 3. Same as solution 1, but using Kotlin's Aggregate operation fold()
class Solution {
    fun maximumElementAfterDecrementingAndRearranging(arr: IntArray) = arr.sorted()
        .fold(0) { acc, num -> minOf(acc + 1, num) }
}

// 4. Or alternativly, we could use a runningFold()
class Solution {
    fun maximumElementAfterDecrementingAndRearranging(arr: IntArray) = arr.sorted()
        .runningFold (0) { acc, num -> minOf(acc + 1, num) }
        .last()
}

// 5. Same logic as first solution, but using a minHeap instead of sorting
class Solution {
    fun maximumElementAfterDecrementingAndRearranging(arr: IntArray) = with (PriorityQueue<Int>()) {
        addAll(arr.asSequence())
        var last = 0
        while (isNotEmpty()) {
            if (poll() > last) 
                last++
        }
        last
    }
}
