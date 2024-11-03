class Solution {
    fun maxPerformance(n: Int, speed: IntArray, efficiency: IntArray, k: Int): Int {
        val mod = 1_000_000_000 + 7
        val eng = efficiency.zip(speed)
            .sortedWith(compareBy({ -it.first }))

        var res = 0L
        var speed = 0L
        val minHeap = PriorityQueue<Int>()
        for ((eff, spd) in eng) {
            if (minHeap.size == k)
                speed -= minHeap.poll()
            speed += spd
            minHeap.add(spd)
            res = maxOf(res, speed * eff)
        }

        return (res % mod).toInt()
    }
}
