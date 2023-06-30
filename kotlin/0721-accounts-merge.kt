class DSU(val n: Int) {

    val parent = IntArray(n) {it}
    val rank = IntArray(n) {1}

    fun find(x: Int): Int {
        if (x != parent[x])
            parent[x] = find(parent[x])
        return parent[x]
    }

    fun union(x: Int, y: Int): Boolean {
        val pX = find(x)
        val pY = find(y)

        if(pX == pY)
            return false
        
        if (rank[pX] > rank[pY]) {
            parent[pY] = pX
            rank[pX] += rank[pY]
        } else {
            parent[pX] = pY
            rank[pY] += rank[pX]
        }

        return true
    }
}

class Solution {
    fun accountsMerge(accounts: List<List<String>>): List<List<String>> {
        val uf = DSU(accounts.size)
        val emailToAcc = HashMap<String, Int>()

        for ((i,accs) in accounts.withIndex()) {
            for (j in 1..accs.lastIndex) {
                val e = accs[j]
                if (e in emailToAcc.keys) {
                    uf.union(i, emailToAcc[e]!!)
                } else {
                    emailToAcc[e] = i
                }
            }
        }

        val emails = hashMapOf<Int, ArrayList<String>>()
        for ((e, i) in emailToAcc) {
            val main = uf.find(i)
            emails[main] = emails.getOrDefault(main, ArrayList<String>()).apply { this.add(e) }
        }

        val res = ArrayList<ArrayList<String>>()
        for ((i, em) in emails.entries) {
            em.sort()
            em.add(0, accounts[i][0])
            res.add(em)
        }

        return res
    }
}
