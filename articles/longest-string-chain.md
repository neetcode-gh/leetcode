## 1. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def longestStrChain(self, words: List[str]) -> int:
        words.sort(key=lambda w: -len(w))
        word_index = {}  # map word to index
        for i, w in enumerate(words):
            word_index[w] = i

        dp = {}  # index of word -> length of longest chain
        def dfs(i):
            if i in dp:
                return dp[i]
            res = 1
            for j in range(len(words[i])):
                w = words[i]
                pred = w[:j] + w[j+1:]
                if pred in word_index:
                    res = max(res, 1 + dfs(word_index[pred]))
            dp[i] = res
            return res

        for i in range(len(words)):
            dfs(i)
        return max(dp.values())
```

```java
public class Solution {
    public int longestStrChain(String[] words) {
        Arrays.sort(words, (a, b) -> Integer.compare(b.length(), a.length()));
        Map<String, Integer> wordIndex = new HashMap<>();
        for (int i = 0; i < words.length; i++) {
            wordIndex.put(words[i], i);
        }

        int[] dp = new int[words.length];
        Arrays.fill(dp, -1);

        int maxChain = 1;
        for (int i = 0; i < words.length; i++) {
            maxChain = Math.max(maxChain, dfs(i, words, wordIndex, dp));
        }
        return maxChain;
    }

    private int dfs(int i, String[] words, Map<String, Integer> wordIndex, int[] dp) {
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = 1;
        String w = words[i];
        for (int j = 0; j < w.length(); j++) {
            String pred = w.substring(0, j) + w.substring(j + 1);
            if (wordIndex.containsKey(pred)) {
                res = Math.max(res, 1 + dfs(wordIndex.get(pred), words, wordIndex, dp));
            }
        }
        dp[i] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return b.length() < a.length();
        });

        unordered_map<string, int> wordIndex;
        for (int i = 0; i < words.size(); i++) {
            wordIndex[words[i]] = i;
        }

        vector<int> dp(words.size(), -1);
        int maxChain = 1;
        for (int i = 0; i < words.size(); i++) {
            maxChain = max(maxChain, dfs(i, words, wordIndex, dp));
        }
        return maxChain;
    }

private:
    int dfs(int i, vector<string>& words, unordered_map<string, int>& wordIndex, vector<int>& dp) {
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = 1;
        string w = words[i];
        for (int j = 0; j < w.length(); j++) {
            string pred = w.substr(0, j) + w.substr(j + 1);
            if (wordIndex.find(pred) != wordIndex.end()) {
                res = max(res, 1 + dfs(wordIndex[pred], words, wordIndex, dp));
            }
        }
        dp[i] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {number}
     */
    longestStrChain(words) {
        words.sort((a, b) => b.length - a.length);
        const wordIndex = new Map();
        for (let i = 0; i < words.length; i++) {
            wordIndex.set(words[i], i);
        }

        const dp = new Array(words.length).fill(-1);

        const dfs = (i) => {
            if (dp[i] !== -1) {
                return dp[i];
            }

            let res = 1;
            const w = words[i];
            for (let j = 0; j < w.length; j++) {
                const pred = w.slice(0, j) + w.slice(j + 1);
                if (wordIndex.has(pred)) {
                    res = Math.max(res, 1 + dfs(wordIndex.get(pred)));
                }
            }
            dp[i] = res;
            return res;
        };

        let maxChain = 1;
        for (let i = 0; i < words.length; i++) {
            maxChain = Math.max(maxChain, dfs(i));
        }
        return maxChain;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 2)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of words and $m$ is the average length of each word.

---

## 2. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def longestStrChain(self, words: List[str]) -> int:
        def isPred(w1, w2):
            i = 0
            for c in w2:
                if i == len(w1):
                    return True
                if w1[i] == c:
                    i += 1
            return i == len(w1)

        words.sort(key=len)
        n = len(words)
        dp = [1] * n

        for i in range(1, n):
            for j in range(i - 1, -1, -1):
                if len(words[j]) + 1 < len(words[i]):
                    break
                if len(words[j]) + 1 > len(words[i]) or not isPred(words[j], words[i]):
                    continue
                dp[i] = max(dp[i], 1 + dp[j])

        return max(dp)
```

```java
public class Solution {
    public int longestStrChain(String[] words) {
        Arrays.sort(words, Comparator.comparingInt(String::length));
        int n = words.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);

        for (int i = 1; i < n; i++) {
            for (int j = i - 1; j >= 0; j--) {
                if (words[j].length() + 1 < words[i].length()) {
                    break;
                }
                if (words[j].length() + 1 > words[i].length() || !isPred(words[j], words[i])) {
                    continue;
                }
                dp[i] = Math.max(dp[i], 1 + dp[j]);
            }
        }

        int maxChain = 0;
        for (int chain : dp) {
            maxChain = Math.max(maxChain, chain);
        }
        return maxChain;
    }

    private boolean isPred(String w1, String w2) {
        int i = 0;
        for (char c : w2.toCharArray()) {
            if (i == w1.length()) {
                return true;
            }
            if (w1.charAt(i) == c) {
                i++;
            }
        }
        return i == w1.length();
    }
}
```

```cpp
class Solution {
public:
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.length() < b.length();
        });

        int n = words.size();
        vector<int> dp(n, 1);

        for (int i = 1; i < n; i++) {
            for (int j = i - 1; j >= 0; j--) {
                if (words[j].length() + 1 < words[i].length()) {
                    break;
                }
                if (words[j].length() + 1 > words[i].length() || !isPred(words[j], words[i])) {
                    continue;
                }
                dp[i] = max(dp[i], 1 + dp[j]);
            }
        }

        return *max_element(dp.begin(), dp.end());
    }

private:
    bool isPred(const string& w1, const string& w2) {
        int i = 0;
        for (char c : w2) {
            if (i == w1.length()) {
                return true;
            }
            if (w1[i] == c) {
                i++;
            }
        }
        return i == w1.length();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {number}
     */
    longestStrChain(words) {
        words.sort((a, b) => a.length - b.length);
        const n = words.length;
        const dp = new Array(n).fill(1);

        const isPred = (w1, w2) => {
            let i = 0;
            for (const c of w2) {
                if (i === w1.length) {
                    return true;
                }
                if (w1[i] === c) {
                    i++;
                }
            }
            return i === w1.length;
        };

        for (let i = 1; i < n; i++) {
            for (let j = i - 1; j >= 0; j--) {
                if (words[j].length + 1 < words[i].length) {
                    break;
                }
                if (
                    words[j].length + 1 > words[i].length ||
                    !isPred(words[j], words[i])
                ) {
                    continue;
                }
                dp[i] = Math.max(dp[i], 1 + dp[j]);
            }
        }

        return Math.max(...dp);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity: $O(n)$

> Where $n$ is the number of words and $m$ is the average length of each word.

---

## 3. Dynamic Programming (Bottom-Up Optimized)

::tabs-start

```python
class Solution:
    def longestStrChain(self, words: List[str]) -> int:
        words.sort(key=len)
        dp = {}
        res = 0

        for word in words:
            dp[word] = 1
            for i in range(len(word)):
                pred = word[:i] + word[i+1:]
                if pred in dp:
                    dp[word] = max(dp[word], dp[pred] + 1)
            res = max(res, dp[word])

        return res
```

```java
public class Solution {
    public int longestStrChain(String[] words) {
        Arrays.sort(words, Comparator.comparingInt(String::length));
        Map<String, Integer> dp = new HashMap<>();
        int res = 0;

        for (String word : words) {
            dp.put(word, 1);
            for (int i = 0; i < word.length(); i++) {
                String pred = word.substring(0, i) + word.substring(i + 1);
                if (dp.containsKey(pred)) {
                    dp.put(word, Math.max(dp.get(word), dp.get(pred) + 1));
                }
            }
            res = Math.max(res, dp.get(word));
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.length() < b.length();
        });

        unordered_map<string, int> dp;
        int res = 0;

        for (const string& word : words) {
            dp[word] = 1;
            for (int i = 0; i < word.length(); i++) {
                string pred = word.substr(0, i) + word.substr(i + 1);
                if (dp.find(pred) != dp.end()) {
                    dp[word] = max(dp[word], dp[pred] + 1);
                }
            }
            res = max(res, dp[word]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {number}
     */
    longestStrChain(words) {
        words.sort((a, b) => a.length - b.length);
        const dp = new Map();
        let res = 0;

        for (const word of words) {
            dp.set(word, 1);
            for (let i = 0; i < word.length; i++) {
                const pred = word.slice(0, i) + word.slice(i + 1);
                if (dp.has(pred)) {
                    dp.set(word, Math.max(dp.get(word), dp.get(pred) + 1));
                }
            }
            res = Math.max(res, dp.get(word));
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 2)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of words and $m$ is the average length of each word.
