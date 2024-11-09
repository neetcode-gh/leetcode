/**
 * Question Link: https://leetcode.com/problems/alien-dictionary/
 */

 class Solution {
    func alienOrder(_ words: [String]) -> String {
        var adj = [Character: Set<Character>]()
        for word in words {
            for char in word {
                adj[char] = []
            }
        }
        
        for i in 0..<words.count - 1 {
            let w1 = Array(words[i]), w2 = Array(words[i + 1])
            let minLen = min(w1.count, w2.count)
            if w1.count > w2.count && w1.prefix(minLen) == w2.prefix(minLen) {
                return ""
            }

            for j in 0..<minLen {
                if w1[j] != w2[j] {
                    adj[w1[j], default: Set()].insert(w2[j])
                    break
                }
            }
        }

        var visited = [Character: Bool]()
        var res = ""

        func dfs(_ char: Character) -> Bool {
            if visited[char] != nil {
                return visited[char]!
            }

            visited[char] = true

            for neighChar in adj[char]! {
                if dfs(neighChar) {
                    return true
                }
            }
            visited[char] = false
            res.append(char)
            return false
        }

        for char in adj.keys {
            if dfs(char) {
                return ""
            }
        }

        return String(res.reversed())
    }
}