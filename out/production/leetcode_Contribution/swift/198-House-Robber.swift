class Solution {
    func rob(_ nums: [Int]) -> Int {
        var rob1 = 0, rob2 = 0
        
        for n in nums {
            let temp = max(n + rob1, rob2)
            rob1 = rob2
            rob2 = temp
        }
        return rob2
    }
}