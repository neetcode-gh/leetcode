class Solution {
    func isPalindrom(_ characters: [Character]) -> Bool {
        guard !characters.isEmpty else { return false }
        var i = 0
        var j = characters.count - 1
        while i < j {
            guard characters[i] == characters[j] else { return false }
            i += 1
            j -= 1
        }
        return true
    }
    func partition(_ s: String) -> [[String]] {
        var substrings: [String] = []
        var result: [[String]] = []
        let characters = s.map { $0 }

        func dfs(_ start: Int) {
            guard start < s.count else {
                result.append(substrings)
                return
            }
            for end in start..<characters.count {
                let substring = Array(characters[start...end])
                guard isPalindrom(substring) else { continue }
                substrings.append(substring.map { String($0) }.joined())
                dfs(end + 1)
                substrings.removeLast()
            }
        }
        dfs(0)
        return result
    }
}