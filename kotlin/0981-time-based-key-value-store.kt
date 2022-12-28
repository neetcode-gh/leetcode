class TimeMap {
    private data class TimeStampValuePair(
        val timestamp: Int,
        val value: String
    )

    private val keyMap = mutableMapOf<String, MutableList<TimeStampValuePair>>()

    fun set(key: String, value: String, timestamp: Int) {
        keyMap.getOrPut(key, ::mutableListOf).add(TimeStampValuePair(timestamp, value))
    }

    fun get(key: String, timestamp: Int): String {
        if (key !in keyMap.keys) return ""
        val searchList = keyMap.getValue(key)
        if (searchList.isEmpty()) return ""
        return binarySearch(
            list = searchList,
            targetTimeStamp = timestamp
        )
    }

    private fun binarySearch(
        list: List<TimeStampValuePair>,
        targetTimeStamp: Int
    ): String {
        if (list.first().timestamp > targetTimeStamp) return ""
        if (list.last().timestamp < targetTimeStamp) return list.last().value
        var startIndex = 0
        var endIndex = list.lastIndex
        var midIndex: Int
        var result = ""
        while (startIndex <= endIndex) {
            midIndex = startIndex + (endIndex - startIndex) / 2
            when {
                list[midIndex].timestamp <= targetTimeStamp -> {
                    if (list[midIndex].timestamp == targetTimeStamp) return list[midIndex].value
                    result = list[midIndex].value
                    startIndex = midIndex + 1
                }

                else -> endIndex = midIndex - 1
            }
        }
        return result
    }
}