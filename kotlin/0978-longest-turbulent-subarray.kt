class Solution {
    fun maxTurbulenceSize(arr: IntArray): Int {
        if (arr.size == 1) return 1
        var previousEqualitySymbol = ' '
        var currentSubArraySize = 1
        var maxSubArraySize = 1
        for (i in 1..arr.lastIndex) {
            if (arr[i - 1] > arr[i] && previousEqualitySymbol != '>') {
                currentSubArraySize++
                maxSubArraySize = maxOf(maxSubArraySize, currentSubArraySize)
                previousEqualitySymbol = '>'
                continue
            }
            if (arr[i - 1] < arr[i] && previousEqualitySymbol != '<') {
                currentSubArraySize++
                maxSubArraySize = maxOf(maxSubArraySize, currentSubArraySize)
                previousEqualitySymbol = '<'
                continue
            }
            currentSubArraySize = if (arr[i - 1] == arr[i]) 1 else 2
            maxSubArraySize = maxOf(maxSubArraySize, currentSubArraySize)
            previousEqualitySymbol = when {
                arr[i - 1] < arr[i] -> '<'
                arr[i - 1] > arr[i] -> '>'
                else -> ' '
            }
        }
        return maxSubArraySize
    }
}