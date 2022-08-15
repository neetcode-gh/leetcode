package kotlin

class Solution {

        fun findItinerary(tickets: List<List<String>>): List<String> {
            val res = ArrayList<String>()
            val map = HashMap<String, ArrayList<String>>()

            for (t in tickets) {
                if (map[t[0]] == null) {
                    map[t[0]] = ArrayList<String>()
                }
                map[t[0]]!!.add(t[1])
            }

            val sorted = map.mapValues {
                ArrayList(it.value.sortedBy { it })
            }

            fun dfs(from: String) : Boolean {
                res.add(from)
                if (res.size == tickets.size + 1) return true

                val dests = sorted[from] ?: return false
                if (dests.isEmpty()) return false

                val temp = ArrayList(dests)
                for (t in temp) {
                    dests.remove(t)

                    if (dfs(t)) {
                        return true
                    } else {
                        // res.removeLast() // not available in leetcode
                        res.removeAt(res.lastIndex)
                        dests.add(t)
                    }
                }
                return false
            }

            dfs("JFK")
            return res
        }
}