class Solution {
    func majorityElement(_ nums: [Int]) -> Int {
        guard !nums.isEmpty else {
            return 0
        }

        var seen = [Int : Int]()

        for num in nums {
            let newOccurance = seen[num, default: 0] + 1
            seen[num] = newOccurance

            if newOccurance > nums.count / 2 {
                return num
            }
        }

        return -1
    }
}
