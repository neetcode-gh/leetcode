class FreqStack() {

    val countMap = HashMap<Int, Int>()
    var max = 0
    val stackMap = HashMap<Int, ArrayDeque<Int>>()

    fun push(`val`: Int) {
        val count = countMap.getOrDefault(`val`, 0) + 1
        countMap[`val`] = count
        if (count > max) {
            max = count
            stackMap.put(max, ArrayDeque())
        }
        stackMap[count]!!.addFirst(`val`)
    }

    fun pop(): Int {
        val res = stackMap[max]!!.removeFirst()
        countMap[res] = countMap[res]!! - 1
        if(stackMap[max]!!.isEmpty()) max--
        return res
    }

}

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = FreqStack()
 * obj.push(`val`)
 * var param_2 = obj.pop()
 */
