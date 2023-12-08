class Solution {
    fun totalMoney(n: Int): Int {
        val weeks = n / 7
        var res = (weeks * (28 + 28 + 7 * (weeks - 1)) / 2)

        val monday = weeks + 1
        val days = n % 7
        for (i in 0 until days)
            res += i + monday
            
        return res
    }
}

// or alternativly, sum up the n % 7 last days using a formula
class Solution {
    fun totalMoney(n: Int): Int {
        val weeks = n / 7
        val days = n % 7
        var res = (weeks * (28 + 28 + 7 * (weeks - 1)) / 2)
        res += (2 * weeks + days + 1) * days / 2
        return res
    }
}
