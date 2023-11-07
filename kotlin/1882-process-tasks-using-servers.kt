class Solution {
    fun assignTasks(servers: IntArray, tasks: IntArray): IntArray {
        val res = IntArray (tasks.size)

        val available = PriorityQueue<IntArray>(compareBy ({ it[0] }, { it[1] })).apply {
            for ((index, weight) in servers.withIndex())
                this.add(intArrayOf(weight, index))
        }

        val unAvailable = PriorityQueue<IntArray>(compareBy { it[0] })

        var t = 0
        for (i in tasks.indices) {
            t = maxOf(t, i)

            if (available.isEmpty())
                t = unAvailable.peek()[0]

            while (unAvailable.isNotEmpty() && t >= unAvailable.peek()[0]) {
                val (timeFree, weight, index) = unAvailable.poll()
                available.add(intArrayOf(weight, index))
            }

            val (weight, index) = available.poll()
            res[i] = index
            unAvailable.add(intArrayOf(t + tasks[i], weight, index))
        }
        
        return res
    }
}
