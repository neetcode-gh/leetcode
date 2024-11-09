class Solution {
    fun mostBooked(n: Int, meetings: Array<IntArray>): Int {
        meetings.sortBy { it[0] }

        val available = PriorityQueue<Int> ().apply {
            for (i in 0 until n)
                add(i)
        }

        val used = PriorityQueue<Pair<Int, Int>> { a, b -> 
            if (a.first == b.first) a.second - b.second
            else a.first - b.first
        }
        
        val count = IntArray (n)

        for (meet in meetings) {
            var (start, end) = meet
            while (used.isNotEmpty() && start >= used.peek().first) {
                val (_, room) = used.poll()
                available.add(room)
            }

            if (available.isEmpty()) {
                val (endTime, room) = used.poll()
                end = endTime + (end - start)
                available.add(room)
            }
            
            val room = available.poll()
            used.add(end to room)
            count[room]++
        }

        return count.indexOfFirst({ it == (count.max() ?: 0) })
    }
}
