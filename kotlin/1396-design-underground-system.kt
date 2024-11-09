class UndergroundSystem() {

    val checkIn = HashMap<Int, Pair<String, Int>>() // id -> (startStation to time)
    val averageTime = HashMap<String, Pair<Double, Int>>() // startion -> (TotalTime to countOfTrips)

    fun checkIn(id: Int, start: String, startTime: Int) {
        checkIn[id] = start to startTime
    }

    fun checkOut(id: Int, end: String, endTime: Int) {
        val (start, startTime) = checkIn[id]!!
        val fromTo = "$start:$end"
        val (total, count) = averageTime.getOrDefault(fromTo, 0.0 to 0)
        averageTime[fromTo] = (total + endTime - startTime) to (count + 1)
    }

    fun getAverageTime(start: String, end: String): Double {
        val (total, count) = averageTime.getOrDefault("$start:$end", 0.0 to 0)
        return total / count
    }

}
