class MedianFinder() {

    /** initialize your data structure here. */
    val smaller = PriorityQueue<Int>(Comparator { a, b -> b - a })
    val larger  = PriorityQueue<Int>()

    fun addNum(num: Int) {
        if (smaller.isEmpty() || num <= smaller.peek()) smaller.offer(num)
        else larger.offer(num)
        if (smaller.size > larger.size + 1) larger.offer(smaller.poll())
        else if (larger.size > smaller.size) smaller.offer(larger.poll())
    }

    fun findMedian(): Double {
        val even = (larger.size + smaller.size) % 2 == 0
        return if (even) (larger.peek() + smaller.peek()) / 2.0
               else smaller.peek().toDouble()
    }
}