import java.util.*

class Solution {
    fun dailyTemperatures(temperatures: IntArray): IntArray {
        if (temperatures.size == 1) return intArrayOf(0)
        val stack = Stack<Int>()
        val resultantArray = IntArray(temperatures.size)
        var poppedElement: Int
        for (i in 0..temperatures.lastIndex) {
            while (stack.isNotEmpty() && temperatures[stack.peek()] < temperatures[i]) {
                poppedElement = stack.pop()
                resultantArray[poppedElement] = i - poppedElement
            }
            stack.push(i)
        }
        return resultantArray
    }
}