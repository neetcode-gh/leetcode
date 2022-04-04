class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        var prevMap = [Int:Int]() // val -> index
        
        for (i, n) in nums.enumerated() {
            let diff = target - n
            if let firstIndex = prevMap[diff] {
                return [firstIndex, i]
            }
            prevMap[n] = i
        }
        return []
    }
}
