class Solution {
    fun longestDiverseString(a: Int, b: Int, c: Int): String {
        val maxHeap = PriorityQueue<Pair<Char, Int>> { a, b ->
            b.second - a.second
         }.apply {
            if (a > 0) add('a' to a)
            if (b > 0) add('b' to b)
            if (c > 0) add('c' to c)
        }

        val res = StringBuilder()
        while (maxHeap.isNotEmpty()) {
            var (c, v) = maxHeap.poll()
            var n = res.length

            if (n > 1 && res.get(n - 1) == c && res.get(n - 2) == c) {
                if (maxHeap.isEmpty()) break
                var (c2, v2) = maxHeap.poll()
                res.append(c2)
                v2--
                if (v2 > 0) maxHeap.add(c2 to v2)
            } else {
                res.append(c)
                v--
            }

            if (v > 0) maxHeap.add(c to v)
        }
        
        return res.toString()
    }
}
