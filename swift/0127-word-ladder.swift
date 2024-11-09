class Solution {
    func ladderLength(_ beginWord: String, _ endWord: String, _ wordList: [String]) -> Int {
        var wordList = wordList
        if !wordList.contains(endWord) {
            return 0
        }

        var nei = [String: [String]]()
        wordList.append(beginWord)
        for word in wordList {
            for j in 0..<word.count {
                let pattern = word.prefix(j) + "*" + word.dropFirst(j + 1)
                nei[String(pattern), default: []].append(word)
            }
        }

        var visit = Set([beginWord])
        var q = [beginWord]
        var res = 1
        
        while !q.isEmpty {
            let count = q.count
            for _ in 0..<count {
                let word = q.removeFirst()
                if word == endWord {
                    return res
                }
                for j in 0..<word.count {
                    let pattern = word.prefix(j) + "*" + word.dropFirst(j + 1)
                    if let neiWords = nei[String(pattern)] {
                        for neiWord in neiWords {
                            if !visit.contains(neiWord) {
                                visit.insert(neiWord)
                                q.append(neiWord)
                            }
                        }
                    }
                }
            }
            res += 1
        }
        return 0
    }
}