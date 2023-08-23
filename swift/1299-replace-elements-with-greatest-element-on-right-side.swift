class Solution {
    func replaceElements(_ arr: [Int]) -> [Int] {
        // initial max = -1
        var greatestElement: Int = -1
        var ans: [Int] = []

        // Reverse iteration
        for i in (0..<arr.count).reversed() {
            ans.insert(greatestElement, at: 0)
            // new max = max(oldmax, arr[i])
            greatestElement = max(greatestElement, arr[i])
        }

        return ans
    }
}