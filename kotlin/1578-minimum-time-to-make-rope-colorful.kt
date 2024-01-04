class Solution {
    fun minCost(colors: String, neededTime: IntArray): Int {
        var l = 0
        var res = 0
        for (r in 1 until colors.length) {
            if (colors[l] == colors[r]) {
                if (neededTime[l] < neededTime[r]) {
                    res += neededTime[l]
                    l = r
                } else {
                    res += neededTime[r]
                }
            } else {
                l = r
            }
        }

       return res
    }
}
