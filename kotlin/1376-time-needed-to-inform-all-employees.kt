class Solution {
    fun numOfMinutes(n: Int, headID: Int, manager: IntArray, informTime: IntArray): Int {
        val adj = HashMap<Int, ArrayList<Int>>().apply {
            for (i in 0 until n)
                this[manager[i]] = getOrDefault(manager[i], ArrayList<Int>()).apply { add(i) }
        }

        var res = 0
        with (LinkedList<Pair<Int, Int>>()){
            addLast(headID to 0)
            while(isNotEmpty()) {
                val (id, time) = removeFirst()
                res = maxOf(res, time)
                adj[id]?.forEach {
                    addLast(it to (time + informTime[id]))
                }
            }
        }

        return res
    }
}
