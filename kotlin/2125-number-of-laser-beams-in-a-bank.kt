class Solution {
    fun numberOfBeams(bank: Array<String>): Int {
        var prev = bank[0].count { it == '1'}
        var res = 0

        for (i in 1 until bank.size) {
            val cur = bank[i].count { it == '1'}
            if (cur > 0) {
                res += (prev * cur)
                prev = cur
            }
        }

        return res
    }
}

// or do it the kotlin way!
class Solution {
    fun numberOfBeams(bank: Array<String>) = bank
        .map { it.count { it == '1' } }
        .filterNot { it == 0 }
        .zipWithNext { a, b -> a * b }
        .sum()
}
