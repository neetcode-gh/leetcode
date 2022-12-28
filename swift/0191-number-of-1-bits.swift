class Solution {
    func hammingWeight(_ n: Int) -> Int {
        var x = n
        var count = 0
        while x != 0 {
            x = x & (x - 1)
            count += 1
        }
        return count
    }
}
