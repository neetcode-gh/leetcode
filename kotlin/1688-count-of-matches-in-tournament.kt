// O(1) using summation of series
class Solution {
    fun numberOfMatches(n: Int) = n - 1
}

// log(n)
class Solution {
    fun numberOfMatches(n: Int): Int {
        var x = n
        var res = 0
        while (x > 1) {
            res += x / 2
            x = (x + 1) / 2
        }
        return res
    }
}
