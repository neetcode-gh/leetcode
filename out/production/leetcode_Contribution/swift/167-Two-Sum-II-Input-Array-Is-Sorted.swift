class Solution {
    func twoSum(_ numbers: [Int], _ target: Int) -> [Int] {
        var rp = numbers.count - 1
        var lp = 0
        while lp < rp {
            if numbers[lp] + numbers[rp] == target {
                return [lp + 1, rp + 1]
            }
            if numbers[lp] + numbers[rp] > target {
                rp -= 1
            } else {
                lp += 1
            }
        }
        return []
    }
}
