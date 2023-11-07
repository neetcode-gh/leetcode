class LockingTree(val parent: IntArray) {
    val locked = IntArray (parent.size) { -1 }
    val child = HashMap<Int, MutableList<Int>>()

    init {
        for (i in 1 until parent.size) {
            child[parent[i]] = child.getOrDefault(parent[i], mutableListOf<Int>()).apply { add(i) }
        }
    }

    fun lock(num: Int, user: Int): Boolean {
        if (locked[num] != -1) 
            return false
        locked[num] = user
        return true
    }

    fun unlock(num: Int, user: Int): Boolean {
        if (locked[num] != user)
            return false
        locked[num] = -1
        return true
    }

    fun upgrade(num: Int, user: Int): Boolean {
        var i = num
        while (i != -1) {
            if (locked[i] != -1)
                return false
            i = parent[i]
        }

        var lockedCount = 0
        var q = LinkedList<Int>()
        q.add(num)
        while (q.isNotEmpty()) {
            var n = q.removeLast()
            if (locked[n] != -1) {
                locked[n] = -1
                lockedCount++
            }
            child[n]?.forEach {
                q.addFirst(it)
            }
        }

        if (lockedCount > 0)
            locked[num] = user
        
        return lockedCount > 0
    }

}
