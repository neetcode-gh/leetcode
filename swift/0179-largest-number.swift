class Solution {
    func largestNumber(_ nums: [Int]) -> String {
        return nums.reduce(into: Bool(false), { $0 = $0 || $1 > 0 }) ? nums.map { String($0) }.sorted { $0 + $1 > $1 + $0 }.joined() : "0"
    }
}