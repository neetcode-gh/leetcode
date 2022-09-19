class Solution {
    func climbStairs(_ n: Int) -> Int {
        if n <= 3 {
            return n
        }
        var n1 = 2
        var n2 = 3

        for i in 4...n {
            let temp = n1 + n2
            n1 = n2
            n2 = temp
        }
        return n2
    }
}