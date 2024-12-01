// optimal solution
class Solution {
    fun minFlipsMonoIncr(s: String): Int {

       var noOfOnes = 0
        var noOfFlips = 0

        for (bit in s) {
            if (bit == '1') noOfOnes++
            else noOfFlips = minOf(noOfOnes, noOfFlips + 1)
        }

        return minOf(noOfOnes, noOfFlips)
    }
}
