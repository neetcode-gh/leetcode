class Solution {
    func getConcatenation(_ nums: [Int]) -> [Int] {
        var ans: [Int] = []

        for i in 0..<2 {
            for n in nums {
                ans.append(n)
            }
        }
    
        return ans
    }
}