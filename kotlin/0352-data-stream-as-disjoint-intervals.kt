// Using TreeSet and linear scan in getIntervals() method
class SummaryRanges() {
    val ranges = TreeSet<Int>()

    fun addNum(value: Int) {
        ranges.add(value)
    }

    fun getIntervals(): Array<IntArray> {
        val res = LinkedList<IntArray>()
        ranges.forEach {
            if (res.isNotEmpty() && res.peekLast()[1] + 1 == it)
                res.peekLast()[1] = it
            else
                res.addLast(intArrayOf(it, it))
        }
        return res.toTypedArray()
    }
}

// Using TreeMap and binary search scan in getIntervals() method, small optimization technically but still same time complexity as above solution
class SummaryRanges() {
    val rgs = TreeMap<Int, IntArray>()

    fun addNum(v: Int) {
        if (rgs.containsKey(v)) return

        val l = rgs.lowerKey(v)
        val h = rgs.higherKey(v)

        if (l != null && h != null && rgs.get(l)!![1] + 1 == v && h == v + 1 ) {
            rgs.get(l)!![1] = rgs.get(h)!![1]
            rgs.remove(h)
        } else if (l != null && rgs.get(l)!![1] + 1 >= v) {
           rgs.get(l)!![1] = maxOf(v, rgs.get(l)!![1])
        } else if (h != null && h == v + 1)  {
            rgs.put(v, intArrayOf(v, rgs.get(h)!![1]))
            rgs.remove(h)
        } else {
            rgs.put(v, intArrayOf(v, v))
        }
    }

    fun getIntervals() = rgs.values.toTypedArray()
}

// Using Union Find
class SummaryRanges() {
    val dsu = DSU()

    fun addNum(v: Int) {
        if (dsu.exists(v)) return

        dsu.add(v)
        dsu.union(v, v - 1)
        dsu.union(v, v + 1)
    }

    fun getIntervals() = dsu.getIntervals()

}

class DSU {
    val parent = HashMap<Int, Int>()
    val intervals = TreeMap<Int, IntArray>()

    fun getIntervals() = intervals.values.toTypedArray()

    fun exists(x: Int) = x in parent

    fun add(x: Int) {
        parent[x] = x
        intervals[x] = intArrayOf(x, x)
    }

    fun find(x: Int): Int {
        parent[x]?: return -1

        if (parent[x]!! != x)
            parent[x] = find(parent[x]!!)
        
        return parent[x]!!
    }

    fun union(x: Int, y: Int) {
        val px = find(x)
        val py = find(y)

        if (px == -1 || py == -1) return

        val newX = minOf(intervals[py]!![0], intervals[px]!![0])
        val newY = maxOf(intervals[py]!![1], intervals[px]!![1])

        parent[px] = py
        intervals[py] = intArrayOf(newX, newY)
        intervals.remove(px)
    }
}
