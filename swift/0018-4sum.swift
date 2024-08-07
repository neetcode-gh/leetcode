class Solution {
    func fourSum(_ nums: [Int], _ target: Int) -> [[Int]] {
        if nums.count < 4 {
            return []
        }

        var nums = nums.sorted()
        var res = [[Int]]()
        var quad = [Int]()

        func kSum(_ k: Int, _ start: Int, _ target: Int) {
            if k != 2 {
                for i in start..<nums.count - k + 1 {
                    if i > start && nums[i] == nums[i - 1] {
                        continue
                    }
                    quad.append(nums[i])
                    kSum(k - 1, i + 1, target - nums[i])
                    quad.popLast()
                }
                return
            } else {
                twoSum(start, target)
                return
            }
        }

        func twoSum(_ start: Int, _ target: Int) {
            var l = start
            var r = nums.count - 1
            while l < r {
                if nums[l] + nums[r] < target {
                    l += 1
                } else if nums[l] + nums[r] > target {
                    r -= 1
                } else {
                    res.append(quad + [nums[l], nums[r]])
                    repeat {
                        l += 1
                    } while l < r && nums[l] == nums[l - 1]
                }
            }
        }

        kSum(4, 0, target)

        return res
    }
}