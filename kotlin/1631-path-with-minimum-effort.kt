//dijkstra
class Solution {
    fun minimumEffortPath(h: Array<IntArray>): Int {
        val minHeap = PriorityQueue<IntArray> { a, b -> a[2] - b[2] }
        val dirs = intArrayOf(0, 1, 0, -1, 0)
        val n = h.size
        val m = h[0].size
        val visited = Array (n) { BooleanArray (m) }

        fun isValid(x: Int, y: Int) = x in (0 until n) && y in (0 until m)

        minHeap.add(intArrayOf(0, 0, 0))
        while (minHeap.isNotEmpty()) {
            val (i, j, e) = minHeap.poll()
            
            if (i == n - 1 && j == m - 1) return e
            visited[i][j] = true

            for (k in 0..3) {
                val i2 = i + dirs[k]
                val j2 = j + dirs[k + 1]
                if (isValid(i2, j2) && !visited[i2][j2]) {
                    val e2 = Math.abs(h[i][j] - h[i2][j2])
                    minHeap.add(intArrayOf(i2, j2, maxOf(e, e2)))
                }
            }
        }

        return 0
    }
}

// binary search + dfs to find min effort to reach end from start
class Solution {
    fun minimumEffortPath(h: Array<IntArray>): Int {
        val dirs = intArrayOf(0, 1, 0, -1, 0)
        val n = h.size
        val m = h[0].size
        var visited = Array (n) { BooleanArray (m) }

        fun isValid(x: Int, y: Int) = x in (0 until n) && y in (0 until m)

        fun dfs(x: Int, y: Int, k: Int): Boolean {
            if (x == n - 1 && y == m - 1) return true

            visited[x][y] = true

            for (i in 0..3) {
                val x2 = x + dirs[i]
                val y2 = y + dirs[i + 1]
                if (isValid(x2, y2) && !visited[x2][y2] && Math.abs(h[x][y] - h[x2][y2]) <= k) {
                    if (dfs(x2, y2, k))
                        return true
                }
            }

            return false
        }

        var left = 0
        var right = 1000000
        var res = right
        while (left <= right) {
            val mid = (right + left) / 2
            visited = Array (n) { BooleanArray (m) }
            if (dfs(0, 0, mid)) {
                res = mid
                right = mid - 1
            } else {
                left = mid + 1
            }
        }

        return res
    }
}

//MST with kruskals algorith (using DSU)
class Solution {
    fun minimumEffortPath(h: Array<IntArray>): Int {
        val n = h.size
        val m = h[0].size
        val dsu = DSU(n * m)
        val edges = mutableListOf<IntArray>()

        fun c(x: Int, y: Int) = x * m + y

        for (i in 0 until n) {
            for (j in 0 until m) {
                if (i + 1 < n) {
                    val e = Math.abs(h[i][j] - h[i + 1][j])
                    edges.add(intArrayOf(c(i, j), c(i + 1, j), e))
                }
                if (j + 1 < m) {
                    val e = Math.abs(h[i][j] - h[i][j + 1])
                    edges.add(intArrayOf(c(i, j), c(i, j + 1), e))
                }
            }
        }

        edges.sortWith { a, b -> a[2] - b[2] }

        for ((u, v, e) in edges) {
            if (dsu.union(u, v)) {
                if (dsu.find(c(0, 0)) == dsu.find(c(n - 1, m - 1))) {
                    return e
                }
            }
        }

        return 0
    }
}

class DSU(val n: Int) {
    val parent = IntArray (n) { it }
    val size = IntArray (n) { 1 }

    fun find(x: Int): Int {
        if (parent[x] != x)
            parent[x] = find(parent[x])
        return parent[x]
    }

    fun union(x: Int, y: Int): Boolean {
        val p1 = find(x)
        val p2 = find(y)

        if (p1 == p2) return false

        if (size[p1] > size[p2]) {
            parent[p2] = p1
            size[p1] += size[p2]
        } else {
            parent[p1] = p2
            size[p2] += size[p1]
        }

        return true
    }
}
