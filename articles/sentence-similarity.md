## 1. Using Hash Map and Hash Set

::tabs-start

```python
class Solution(object):
    def areSentencesSimilar(self, sentence1, sentence2, similarPairs):
        if len(sentence1) != len(sentence2):
            return False
        
        wordToSimilarWords = defaultdict(set)

        for word1, word2 in similarPairs:
            wordToSimilarWords[word1].add(word2)
            wordToSimilarWords[word2].add(word1)

        for i in range(len(sentence1)):
            if sentence1[i] == sentence2[i] or sentence2[i] in wordToSimilarWords[sentence1[i]]:
                continue
            return False
        
        return True
```

```java
class Solution {
public boolean areSentencesSimilar(String[] sentence1, String[] sentence2, List<List<String>> similarPairs) {
        if (sentence1.length != sentence2.length) {
            return false;
        }

        Map<String, Set<String>> wordToSimilarWords = new HashMap<>();

        for (List<String> pair : similarPairs) {
            wordToSimilarWords.computeIfAbsent(pair.get(0), value->new HashSet<String>()).add(pair.get(1));
            wordToSimilarWords.computeIfAbsent(pair.get(1), value->new HashSet<String>()).add(pair.get(0));
        }

        for (int i = 0; i < sentence1.length; i++) {
            // If the words are equal, continue.
            if (sentence1[i].equals(sentence2[i])) {
                continue;
            }

            // If the words form a similar pair, continue.
            if (wordToSimilarWords.containsKey(sentence1[i]) &&
                wordToSimilarWords.get(sentence1[i]).contains(sentence2[i])) {
                continue;
            }
            return false;
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool areSentencesSimilar(vector<string>& sentence1, vector<string>& sentence2,
                             vector<vector<string>>& similarPairs) {
        if (sentence1.size() != sentence2.size()) {
            return false;
        }
        unordered_map<string, unordered_set<string>> wordToSimilarWords;
        for (auto& pair : similarPairs) {
            wordToSimilarWords[pair[0]].insert(pair[1]);
            wordToSimilarWords[pair[1]].insert(pair[0]);
        }

        for (int i = 0; i < sentence1.size(); i++) {
            // If the words are equal, continue.
            if (sentence1[i] == sentence2[i]) {
                continue;
            }
            // If the words form a similar pair, continue.
            if (wordToSimilarWords[sentence1[i]].count(sentence2[i])) {
                continue;
            }
            return false;
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} sentence1
     * @param {string[]} sentence2
     * @param {string[][]} similarPairs
     * @return {boolean}
     */
    areSentencesSimilar(sentence1, sentence2, similarPairs) {
        if (sentence1.length !== sentence2.length) {
            return false;
        }

        const wordToSimilarWords = new Map();
        for (const pair of similarPairs) {
            if (!wordToSimilarWords.has(pair[0])) {
                wordToSimilarWords.set(pair[0], new Set());
            }
            wordToSimilarWords.get(pair[0]).add(pair[1]);

            if (!wordToSimilarWords.has(pair[1])) {
                wordToSimilarWords.set(pair[1], new Set());
            }
            wordToSimilarWords.get(pair[1]).add(pair[0]);
        }

        for (let i = 0; i < sentence1.length; i++) {
            // If the words are equal, continue.
            if (sentence1[i] === sentence2[i]) {
                continue;
            }
            // If the words form a similar pair, continue.
            if (wordToSimilarWords.has(sentence1[i]) &&
                wordToSimilarWords.get(sentence1[i]).has(sentence2[i])) {
                continue;
            }
            return false;
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool AreSentencesSimilar(string[] sentence1, string[] sentence2, IList<IList<string>> similarPairs) {
        if (sentence1.Length != sentence2.Length) {
            return false;
        }

        var wordToSimilarWords = new Dictionary<string, HashSet<string>>();

        foreach (var pair in similarPairs) {
            if (!wordToSimilarWords.ContainsKey(pair[0])) {
                wordToSimilarWords[pair[0]] = new HashSet<string>();
            }
            wordToSimilarWords[pair[0]].Add(pair[1]);

            if (!wordToSimilarWords.ContainsKey(pair[1])) {
                wordToSimilarWords[pair[1]] = new HashSet<string>();
            }
            wordToSimilarWords[pair[1]].Add(pair[0]);
        }

        for (int i = 0; i < sentence1.Length; i++) {
            if (sentence1[i] == sentence2[i]) {
                continue;
            }
            if (wordToSimilarWords.ContainsKey(sentence1[i]) &&
                wordToSimilarWords[sentence1[i]].Contains(sentence2[i])) {
                continue;
            }
            return false;
        }

        return true;
    }
}
```

```go
func areSentencesSimilar(sentence1 []string, sentence2 []string, similarPairs [][]string) bool {
    if len(sentence1) != len(sentence2) {
        return false
    }

    wordToSimilarWords := make(map[string]map[string]bool)

    for _, pair := range similarPairs {
        if wordToSimilarWords[pair[0]] == nil {
            wordToSimilarWords[pair[0]] = make(map[string]bool)
        }
        wordToSimilarWords[pair[0]][pair[1]] = true

        if wordToSimilarWords[pair[1]] == nil {
            wordToSimilarWords[pair[1]] = make(map[string]bool)
        }
        wordToSimilarWords[pair[1]][pair[0]] = true
    }

    for i := 0; i < len(sentence1); i++ {
        if sentence1[i] == sentence2[i] {
            continue
        }
        if similarWords, ok := wordToSimilarWords[sentence1[i]]; ok {
            if similarWords[sentence2[i]] {
                continue
            }
        }
        return false
    }

    return true
}
```

```kotlin
class Solution {
    fun areSentencesSimilar(sentence1: Array<String>, sentence2: Array<String>, similarPairs: List<List<String>>): Boolean {
        if (sentence1.size != sentence2.size) {
            return false
        }

        val wordToSimilarWords = HashMap<String, HashSet<String>>()

        for (pair in similarPairs) {
            wordToSimilarWords.getOrPut(pair[0]) { HashSet() }.add(pair[1])
            wordToSimilarWords.getOrPut(pair[1]) { HashSet() }.add(pair[0])
        }

        for (i in sentence1.indices) {
            if (sentence1[i] == sentence2[i]) {
                continue
            }
            if (wordToSimilarWords[sentence1[i]]?.contains(sentence2[i]) == true) {
                continue
            }
            return false
        }

        return true
    }
}
```

```swift
class Solution {
    func areSentencesSimilar(_ sentence1: [String], _ sentence2: [String], _ similarPairs: [[String]]) -> Bool {
        if sentence1.count != sentence2.count {
            return false
        }

        var wordToSimilarWords = [String: Set<String>]()

        for pair in similarPairs {
            wordToSimilarWords[pair[0], default: Set()].insert(pair[1])
            wordToSimilarWords[pair[1], default: Set()].insert(pair[0])
        }

        for i in 0..<sentence1.count {
            if sentence1[i] == sentence2[i] {
                continue
            }
            if let similarWords = wordToSimilarWords[sentence1[i]], similarWords.contains(sentence2[i]) {
                continue
            }
            return false
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n + k) \cdot m)$
- Space complexity: $O(k\cdot m)$ 

>  Where $n$ is the number of words in `sentence1` and `sentence2`, $k$ is the length of `similarPairs`, and $m$ is the average length of words in `sentence1` as well as `similarPairs`.
