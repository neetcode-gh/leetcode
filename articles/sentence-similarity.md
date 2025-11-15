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

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n + k) \cdot m)$
- Space complexity: $O(k\cdot m)$ 

>  Where $n$ is the number of words in `sentence1` and `sentence2`, $k$ is the length of `similarPairs`, and $m$ is the average length of words in `sentence1` as well as `similarPairs`.
