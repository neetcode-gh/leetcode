// two heaps
class Solution {
    fun fullBloomFlowers(flowers: Array<IntArray>, _people: IntArray): IntArray {
        val people = _people.mapIndexed { i, p -> p to i }.sortedBy { it.first }
        val res = IntArray (_people.size)
        var count = 0
        val start = PriorityQueue<Int>()
        val end = PriorityQueue<Int>()

        for ((s, e) in flowers) {
            start.add(s)
            end.add(e)
        }

        for ((p, i) in people) {
            while (start.isNotEmpty() && start.peek() <= p) {
                start.poll()
                count++
            }

            while (end.isNotEmpty() && end.peek() < p) {
                end.poll()
                count--
            }

            res[i] = count
        }
        
        return res
    }
}

// one heap
class Solution {
    fun fullBloomFlowers(flowers: Array<IntArray>, _people: IntArray): IntArray {
        val people = _people.mapIndexed { i, p -> p to i }.sortedBy { it.first }
        val res = IntArray (_people.size)
        flowers.sortBy { it[0] }
        val end = PriorityQueue<Int>()

        var j = 0
        for ((p, i) in people) {
            while (j < flowers.size && flowers[j][0] <= p) {
                end.add(flowers[j][1])
                j++
            }

            while (end.isNotEmpty() && end.peek() < p)
                end.poll()

            res[i] = end.size
        }

        return res
    }
}
