class Solution {
    func partitionLabels(_ s: String) -> [Int] {
        var hashmap = [Character: Int]()
        for (i, c) in s.enumerated() {
            hashmap[c] = i
        }

        var res = [Int]()
        var size = 0
        var end = 0
        for (i, c) in s.enumerated() {
            end = max(end, hashmap[c] ?? 0)
            size += 1
            if i == end {
                res.append(size)
                size = 0
            }
        }

        return res
    }
}