class Solution {
    func characterReplacement(_ s: String, _ k: Int) -> Int {
        var count: [Character: Int] = [:]
        var strArray = Array(s)
        var result = 0
        var l = 0
        var maxF = 0

        for r in 0...s.count - 1 {
            count[strArray[r]] = count[strArray[r], default: 0] + 1
            maxF = max(maxF, count[strArray[r], default: 0])

            while (r - l + 1) - maxF > k {
                count[strArray[l]] = count[strArray[l], default: 0] - 1
                l += 1 
            }
            result = max(result, r - l + 1)
        }
        return result
    }
}
