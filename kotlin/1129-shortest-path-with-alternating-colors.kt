class Solution {
    fun shortestAlternatingPaths(n: Int, redEdges: Array<IntArray>, blueEdges: Array<IntArray>): IntArray {
        val redAdj = Array(n) { ArrayList<Int>() }  
        val blueAdj = Array(n) { ArrayList<Int>() } 
        val redVisit = HashSet<Int>()
        val blueVisit = HashSet<Int>()

        for ((from, to) in redEdges) redAdj[from].add(to) 
        for ((from, to) in blueEdges) blueAdj[from].add(to) 

        val res = IntArray(n) { -1 }

        with (LinkedList<Pair<Int, Int>>()) {
            addFirst(0 to 0)

            var len = 0
            while (isNotEmpty()) {
                repeat (size) {
                    val (node, c) = removeLast()
                    if (res[node] == -1) res[node] = len

                    if (c != -1) {
                        redAdj[node].forEach {
                            if (it !in redVisit) {
                                addFirst(it to -1)
                                redVisit.add(it)
                            }
                        }
                    }

                    if (c != 1) {
                        blueAdj[node].forEach {
                            if (it !in blueVisit) {
                                addFirst(it to 1)
                                blueVisit.add(it)
                            }
                        }
                    }
                }

                len++
            } 
        }

        return res
    }
}
