import kotlin.math.max

class Solution {
    fun longestConsecutive(nums: IntArray): Int {
        if (nums.isEmpty()) return 0
        if (nums.size == 1) return 1
        val hashSet = HashSet<Int>()
        nums.forEach { hashSet.add(it) }
        var longestSize = 0
        var isNumberStartOfSequence: Boolean
        for (num in nums) {
            isNumberStartOfSequence = !hashSet.contains(num - 1)
            if (isNumberStartOfSequence) {
                var nextConsecutiveNumber = num + 1
                var currentSize = 1
                while (hashSet.contains(nextConsecutiveNumber)) {
                    nextConsecutiveNumber++
                    currentSize++
                }
                longestSize = max(longestSize, currentSize)
            }
        }
        return longestSize
    }
}

// Alternative solution using Union Find
class Solution {

    class DSU(val n: Int) {
        val parent = IntArray(n) { it }
        val size = IntArray(n) { 1 }

        fun find(x: Int): Int {
            if (parent[x] != x)
                parent[x] = find(parent[x])
            return parent[x]
        }

        fun union(x: Int, y: Int) {
            val px = find(x)
            val py = find(y)
            if (px != py) {
                parent[py] = px
                size[px] += size[py]
            }
        }

        fun getLongest(): Int {
            var res = 0
            for (i in parent.indices) {
                if (parent[i] == i)
                    res = maxOf(res, size[i])
            }
            return res
        }
    }
    

    fun longestConsecutive(nums: IntArray): Int {
        val hm = HashMap<Int, Int>()
        val dsu = DSU(nums.size)

        for ((i,n) in nums.withIndex()) {
            if (n in hm) continue

            hm[n - 1]?.let { dsu.union(i, it) }
            hm[n + 1]?.let { dsu.union(i, it) }

            hm[n] = i
        }

        return dsu.getLongest()
    }
}
