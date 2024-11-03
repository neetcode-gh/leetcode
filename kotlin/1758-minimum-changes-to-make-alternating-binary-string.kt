class Solution {
    fun minOperations(s: String): Int {
        var count = 0

        for ((i, c) in s.withIndex()) {
            if (i % 2 == 0)
                count += if (c == '0') 1 else 0
            else
              count += if (c == '1') 1 else 0  
        }

        return minOf(count, s.length - count)
    }
}
