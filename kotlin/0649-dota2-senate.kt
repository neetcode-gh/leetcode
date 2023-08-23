class Solution {
    fun predictPartyVictory(senate: String): String {
        val rQ = LinkedList<Int>()
        val dQ = LinkedList<Int>()
        val n = senate.length

        for (i in senate.indices) {
            if (senate[i] == 'R') rQ.addLast(i)
            else dQ.addLast(i)
        }

        while (rQ.isNotEmpty() && dQ.isNotEmpty()) {
            val r = rQ.removeFirst()
            val d = dQ.removeFirst()

            if (r < d) rQ.addLast(r + n)
            else dQ.addLast(d + n)
        }

        return if (rQ.isEmpty()) "Dire" else "Radiant"
    }
}
