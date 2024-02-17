// Use of buckets
class Solution {
    fun findLeastNumOfUniqueInts(arr: IntArray, k: Int): Int {
        val n = arr.size
        val counts = HashMap<Int, Int> ()
        val buckets = HashMap<Int, Int> ()

        arr.forEach { n ->
            counts[n] = (counts[n] ?: 0) + 1
        }

        counts.values.forEach { count -> 
            buckets[count] = (buckets[count] ?: 0) + 1
        }

        var k = k
        var res = counts.size
        for (n in 1 until buckets.size) {
            var remove = buckets[n] ?: 0
            val total = n * remove
            if (k >= total) {
                k -= total
                res -= remove
            } else {
                remove = k / n
                res -= remove
                break
            }
        }

        return res
    }
}

// Use a heap
 class Solution {
    fun findLeastNumOfUniqueInts(arr: IntArray, k: Int): Int {
        val freq = HashMap<Int, Int> ()
        arr.forEach { n ->
            freq[n] = (freq[n] ?: 0) + 1
        }

        val heap = PriorityQueue<Int> { a, b -> a - b }
        heap.addAll(freq.values)

        var k = k
        var res = heap.size
        while (k > 0 && heap.isNotEmpty()) {
            val f = heap.poll()
            if (k >= f) {
                k -= f
                res -= 1
            }
        }

        return res
    }
}
