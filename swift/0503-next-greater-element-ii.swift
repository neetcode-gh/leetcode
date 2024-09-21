class Solution {
    func nextGreaterElements(_ nums: [Int]) -> [Int] {
        var res = Array(repeating: -1, count: nums.count)
        var stack = [Int]()

        for i in 0..<nums.count * 2 {
            let index = i % nums.count

            while !stack.isEmpty && nums[stack.last!] < nums[index] {
                let top = stack.removeLast()
                res[top] = nums[index]
            }

            stack.append(index)
        }

        return res
    }
}