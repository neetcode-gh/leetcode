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

// same as above but using Kotlin's Aggregate operation fold()
class Solution {
    fun maximumElementAfterDecrementingAndRearranging(arr: IntArray) = arr.sorted()
        .fold(0) { acc, num -> minOf(acc + 1, num) }
}
