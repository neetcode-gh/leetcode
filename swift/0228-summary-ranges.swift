class Solution {
    func summaryRanges(_ nums: [Int]) -> [String] {
        if nums.isEmpty {
            return []
        }
        var l = 0
        var res = [String]()
        for r in 1..<nums.count {
            if nums[r] != nums[r - 1] + 1 { 
                if l == r - 1 {
                    res.append("\(nums[l])")
                } else {
                    res.append("\(nums[l])->\(nums[r - 1])")
                }
                l = r
            } 
        }

        if l == nums.count - 1 {
            res.append("\(nums[l])")
        } else {
            res.append("\(nums[l])->\(nums[nums.count - 1])")
        }

        return res
    }
}