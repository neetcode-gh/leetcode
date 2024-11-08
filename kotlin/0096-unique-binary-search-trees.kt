//"pure" dp
class Solution {
    fun numTrees(n: Int): Int {
        val cache = IntArray (n + 1) { 1 }

        for (node in 2..n) {
            var res = 0
            for (root in 1..node) {
                val left = root - 1
                val right = node - root
                res += cache[left] * cache[right]
            }
            cache[node] = res
        }

        return cache[n]
    }
}

//recursion + memoization
class Solution {
    fun numTrees(n: Int): Int {
        val cache = IntArray (n + 1) { -1 }

        fun count(root: Int): Int {
            if (root == 0) return 1
            if (cache[root] != -1) return cache[root]

            var res = 0
            for (left in 0 until root) {
                val right = root - left - 1
                res += count(left) * count(right)
            }

            cache[root] = res
            return res
        }

        return count(n)
    }
}
