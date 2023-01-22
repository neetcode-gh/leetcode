class Solution {
    func threeSum(_ nums: [Int]) -> [[Int]] {
        let sortedArray = nums.sorted()
        var result: [[Int]] = []
        for i in 0..<sortedArray.count {
            if i > 0 && sortedArray[i] == sortedArray[i - 1] { continue }
            var l = i + 1
            var r = sortedArray.count - 1
            while l < r {
                var threeSum = sortedArray[i] + sortedArray[l] + sortedArray[r]
                if threeSum > 0 {
                    r -= 1
                } else if threeSum < 0 {
                    l += 1
                } else {
                    result.append([sortedArray[i], sortedArray[l], sortedArray[r]])
                    l += 1
                    while sortedArray[l] == sortedArray[l - 1] && l < r {
                        l += 1
                    }
                }
            }
        }
        return result
    }
}
