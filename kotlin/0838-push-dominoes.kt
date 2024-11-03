class Solution {
    fun pushDominoes(d: String): String {
        val domArr = d.toCharArray()
        val q = LinkedList<Pair<Int, Char>>()

        for ((i, v) in domArr.withIndex()) {
            if (v != '.')
                q.addLast(i to v)
        }

        while (q.isNotEmpty()) {
            val (i, v) = q.removeFirst()
            if (v == 'L' && i > 0 && domArr[i - 1] == '.') { 
                q.addLast(i - 1 to 'L')
                domArr[i - 1] = 'L'
            } else if (v == 'R') {
                if (i + 1 < domArr.size && domArr[i + 1] == '.') {
                    if (i + 2 < domArr.size && domArr[i + 2] == 'L') {
                        q.removeFirst()
                    } else {
                        q.addLast(i + 1 to 'R')
                        domArr[i + 1] = 'R'
                    }
                }
            }
        }

        return String(domArr)
    }
}
