class Solution {
    fun countOdds(low: Int, high: Int): Int {
        
        var res = 0
        res += (high - low) / 2
        if (low % 2 == 1 || high % 2 == 1) res += 1

        return res
    }
}

//shorter 1 line solution
class Solution {
    fun countOdds(low: Int, high: Int) = (high + 1) / 2 - low / 2       
}
