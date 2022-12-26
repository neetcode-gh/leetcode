class Solution {
    func minDistance(_ word1: String, _ word2: String) -> Int {
        // No operations needed if strings match
        if word1 == word2 {
            return 0
        }
        
        let m = word1.count, n = word2.count
        
        // if one word has no characters, min operations is length of other word
        if m == 0 {
            return n
        }
        if n == 0 {
            return m
        }
        
        var prev = 0
        var curr = Array(repeating: 0, count: n + 1)
        
        // convert the strings into an array
        let newWord1 = Array(word1)
        let newWord2 = Array(word2)
        
        for j in 1...n {
            curr[j] = j
        }
        
        for i in 1...m {
            var prev = curr[0]
            curr[0] = i
            for j in 1...n {
                let temp = curr[j]
                if newWord1[i - 1] == newWord2[j - 1] {
                    curr[j] = prev
                }
                else {
                    curr[j] = min(prev, min(curr[j - 1], curr[j])) + 1
                }
                prev = temp
            }
        }
        return curr[n]
    }
}