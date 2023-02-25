class Solution {
    func countBits(_ n: Int) -> [Int] {
        var result: [Int] = []
        for x in 0 ..< n + 1 {
            result.append(popCount(x))
        }
        return result
    }

    func popCount(_ x: Int) -> Int {
        var x = x
        var count = 0
        while x != 0 {
            x &= x - 1
            count += 1
        }
        return count
    }
}
