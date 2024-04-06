class UnionFind (val n: Int) {
    val parent = IntArray (n) { it }
    val size = IntArray (n) { 1 }
    var count = n

    fun find(x: Int): Int {
        if (x != parent[x])
            parent[x] = find(parent[x])
        return parent[x]
    }

    fun union(x: Int, y: Int) {
        val px = find(x)
        val py = find(y)
        if (px != py) {
            if (size[px] > size[py]) {
                parent[py] = px
                size[px] += size[py]
            } else {
                parent[px] = py
                size[py] += size[px]
            }
            count--
        }
    }
}

class Solution {
    fun canTraverseAllPairs(nums: IntArray): Boolean {
        val uf = UnionFind (nums.size)
        val factorIndex = HashMap<Int, Int>()

        for (i in nums.indices) {
            var n = nums[i]
            var f = 2

            while (f * f <= n) {
                if (n % f == 0) {
                    if (f in factorIndex)
                        uf.union(i, factorIndex[f]!!)
                    else
                        factorIndex[f] = i
                    while (n % f == 0)
                        n /= f
                }
                f++
            }

            if (n > 1) {
                if (n in factorIndex)
                    uf.union(i, factorIndex[n]!!)
                else
                    factorIndex[n] = i
            }
        }
        
        return uf.count == 1
    }
}
