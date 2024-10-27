class Solution {
    fun sumSubarrayMins(_arr: IntArray): Int {
        val mod = 1_000_000_007
        var res = 0L
        val arr = intArrayOf(Integer.MIN_VALUE) + _arr + intArrayOf(Integer.MIN_VALUE)
        val stack = Stack<Pair<Int, Int>>()

        for ((i, n) in arr.withIndex()) {
            while (stack.isNotEmpty() && n < stack.peek().second) {
                val (j, m) = stack.pop()
                val left = if (stack.isNotEmpty()) j - stack.peek().first else j + 1
                val right = i - j
                res = (res + m.toLong() * left * right) % mod
            }
            stack.push(i to n)
        }

        return res.toInt()
    }
}

// Another and just a little different solution, you can also only push indices to the stack
class Solution {
    fun sumSubarrayMins(arr: IntArray): Int {
        val stack = LinkedList<Int>()
        val mod = 1_000_000_007
        var res = 0L
        
        for (right in 0..arr.size) {  
            val curVal = if (right < arr.size) arr[right] else 0
            
            while (stack.isNotEmpty() && curVal < arr[stack.peekLast()]) {
                val cur = stack.removeLast()
                val left = stack.peekLast() ?: -1
                val noOfSubArrs = (cur.toLong() - left) * (right - cur)
                res = (res + noOfSubArrs * arr[cur]) % mod
            }
            
            stack.addLast(right)
        }
        
        return res.toInt()
    }
}
