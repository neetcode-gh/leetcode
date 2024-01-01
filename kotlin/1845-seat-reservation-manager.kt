class SeatManager(n: Int) {
    val unres = PriorityQueue<Int>()

    init {
        for (i in 1..n)
            unres.add(i)
    }

    fun reserve() = unres.poll()

    fun unreserve(seatNumber: Int) {
        unres.add(seatNumber)
    }

}
