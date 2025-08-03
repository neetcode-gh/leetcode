## 1. Brute Force (Backtracking)

::tabs-start

```python
class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        n = len(words)
        res = []
        wordSet = set(words)
        maxLen = 0
        for w in words:
            maxLen = max(maxLen, len(w))

        def dfs(concatWord, totLen):
            if len(concatWord) > 1:
                word = "".join(concatWord)
                if word in wordSet:
                    res.append(word)
                    wordSet.remove(word)

            for i in range(len(words)):
                if totLen + len(words[i]) > maxLen:
                    continue
                concatWord.append(words[i])
                dfs(concatWord, totLen + len(words[i]))
                concatWord.pop()

        dfs([], 0)
        return res
```

```java
public class Solution {
    private Set<String> wordSet;
    private int maxLen;
    private List<String> res;
    private String[] words;

    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        this.words = words;
        this.wordSet = new HashSet<>(Arrays.asList(words));
        this.maxLen = 0;
        this.res = new ArrayList<>();

        for (String w : words) {
            maxLen = Math.max(maxLen, w.length());
        }

        dfs(new ArrayList<>(), 0);
        return res;
    }

    private void dfs(List<String> concatWord, int totLen) {
        if (concatWord.size() > 1) {
            String word = String.join("", concatWord);
            if (wordSet.contains(word)) {
                res.add(word);
                wordSet.remove(word);
            }
        }

        for (String word : words) {
            if (totLen + word.length() > maxLen) continue;
            concatWord.add(word);
            dfs(concatWord, totLen + word.length());
            concatWord.remove(concatWord.size() - 1);
        }
    }
}
```

```cpp
class Solution {
private:
    unordered_set<string> wordSet;
    int maxLen;
    vector<string> res;
    vector<string> words;

public:
    vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {
        this->words = words;
        wordSet = unordered_set<string>(words.begin(), words.end());
        maxLen = 0;
        res.clear();

        for (const string& w : words) {
            maxLen = max(maxLen, (int)w.length());
        }

        vector<string> concatWord;
        dfs(concatWord, 0);
        return res;
    }

private:
    void dfs(vector<string>& concatWord, int totLen) {
        if (concatWord.size() > 1) {
            string word = accumulate(concatWord.begin(), concatWord.end(), string(""));
            if (wordSet.count(word)) {
                res.push_back(word);
                wordSet.erase(word);
            }
        }

        for (const string& word : words) {
            if (totLen + word.size() > maxLen) continue;
            concatWord.push_back(word);
            dfs(concatWord, totLen + word.length());
            concatWord.pop_back();
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    findAllConcatenatedWordsInADict(words) {
        let n = words.length;
        let res = [];
        let wordSet = new Set(words);
        let maxLen = 0;

        for (let w of words) {
            maxLen = Math.max(maxLen, w.length);
        }

        const dfs = (concatWord, totLen) => {
            if (concatWord.length > 1) {
                let word = concatWord.join('');
                if (wordSet.has(word)) {
                    res.push(word);
                    wordSet.delete(word);
                }
            }

            for (let i = 0; i < words.length; i++) {
                if (totLen + words[i].length > maxLen) continue;
                concatWord.push(words[i]);
                dfs(concatWord, totLen + words[i].length);
                concatWord.pop();
            }
        };

        dfs([], 0);
        return res;
    }
}
```

```csharp
public class Solution {
    private HashSet<string> wordSet;
    private int maxLen;
    private List<string> res;
    private string[] words;

    public List<string> FindAllConcatenatedWordsInADict(string[] words) {
        this.words = words;
        this.wordSet = new HashSet<string>(words);
        this.maxLen = 0;
        this.res = new List<string>();

        foreach (var w in words) {
            maxLen = Math.Max(maxLen, w.Length);
        }

        Dfs(new List<string>(), 0);
        return res;
    }

    private void Dfs(List<string> concatWord, int totLen) {
        if (concatWord.Count > 1) {
            string word = string.Concat(concatWord);
            if (wordSet.Contains(word)) {
                res.Add(word);
                wordSet.Remove(word);
            }
        }

        foreach (var word in words) {
            if (totLen + word.Length > maxLen) continue;
            concatWord.Add(word);
            Dfs(concatWord, totLen + word.Length);
            concatWord.RemoveAt(concatWord.Count - 1);
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n ^ n)$
- Space complexity: $O(m * n)$

> Where $n$ is the size of the string array $words$ and $m$ is the length of the longest word in the array.

---

## 2. Recursion

::tabs-start

```python
class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        wordSet = set(words)

        def dfs(word):
            for i in range(1, len(word)):
                prefix, suffix = word[:i], word[i:]
                if ((prefix in wordSet and suffix in wordSet) or
                    (prefix in wordSet and dfs(suffix))
                ):
                    return True
            return False

        res = []
        for w in words:
            if dfs(w):
                res.append(w)
        return res
```

```java
public class Solution {
    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        Set<String> wordSet = new HashSet<>(Arrays.asList(words));
        List<String> res = new ArrayList<>();

        for (String w : words) {
            if (dfs(w, wordSet)) {
                res.add(w);
            }
        }
        return res;
    }

    private boolean dfs(String word, Set<String> wordSet) {
        for (int i = 1; i < word.length(); i++) {
            String prefix = word.substring(0, i);
            String suffix = word.substring(i);

            if ((wordSet.contains(prefix) && wordSet.contains(suffix)) ||
                (wordSet.contains(prefix) && dfs(suffix, wordSet))) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {
        unordered_set<string> wordSet(words.begin(), words.end());
        vector<string> res;

        for (const string& w : words) {
            if (dfs(w, wordSet)) {
                res.push_back(w);
            }
        }
        return res;
    }

private:
    bool dfs(const string& word, unordered_set<string>& wordSet) {
        for (int i = 1; i < word.size(); i++) {
            string prefix = word.substr(0, i);
            string suffix = word.substr(i);

            if ((wordSet.count(prefix) && wordSet.count(suffix)) ||
                (wordSet.count(prefix) && dfs(suffix, wordSet))) {
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    findAllConcatenatedWordsInADict(words) {
        const wordSet = new Set(words);

        const dfs = (word) => {
            for (let i = 1; i < word.length; i++) {
                const prefix = word.substring(0, i);
                const suffix = word.substring(i);

                if (
                    (wordSet.has(prefix) && wordSet.has(suffix)) ||
                    (wordSet.has(prefix) && dfs(suffix))
                ) {
                    return true;
                }
            }
            return false;
        };

        const res = [];
        for (let w of words) {
            if (dfs(w)) {
                res.push(w);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private HashSet<string> wordSet;

    public List<string> FindAllConcatenatedWordsInADict(string[] words) {
        wordSet = new HashSet<string>(words);
        var res = new List<string>();
        foreach (var w in words) {
            if (Dfs(w)) {
                res.Add(w);
            }
        }
        return res;
    }

    private bool Dfs(string word) {
        for (int i = 1; i < word.Length; i++) {
            string prefix = word.Substring(0, i);
            string suffix = word.Substring(i);
            if ((wordSet.Contains(prefix) && wordSet.Contains(suffix)) ||
                (wordSet.Contains(prefix) && Dfs(suffix))) {
                return true;
            }
        }
        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 4)$
- Space complexity: $O(n * m)$

> Where $n$ is the size of the string array $words$ and $m$ is the length of the longest word in the array.

---

## 3. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        wordSet = set(words)
        dp = {}

        def dfs(word):
            if word in dp:
                return dp[word]

            for i in range(1, len(word)):
                prefix, suffix = word[:i], word[i:]
                if ((prefix in wordSet and suffix in wordSet) or
                    (prefix in wordSet and dfs(suffix))
                ):
                    dp[word] = True
                    return True
            dp[word] = False
            return False

        res = []
        for w in words:
            if dfs(w):
                res.append(w)
        return res
```

```java
public class Solution {
    private Map<String, Boolean> dp;

    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        Set<String> wordSet = new HashSet<>(Arrays.asList(words));
        List<String> res = new ArrayList<>();
        dp = new HashMap<>();

        for (String w : words) {
            if (dfs(w, wordSet)) {
                res.add(w);
            }
        }
        return res;
    }

    private boolean dfs(String word, Set<String> wordSet) {
        if (dp.containsKey(word)) {
            return dp.get(word);
        }

        for (int i = 1; i < word.length(); i++) {
            String prefix = word.substring(0, i);
            String suffix = word.substring(i);

            if ((wordSet.contains(prefix) && wordSet.contains(suffix)) ||
                (wordSet.contains(prefix) && dfs(suffix, wordSet))) {
                dp.put(word, true);
                return true;
            }
        }
        dp.put(word, false);
        return false;
    }
}
```

```cpp
class Solution {
    unordered_map<string, bool> dp;

public:
    vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {
        unordered_set<string> wordSet(words.begin(), words.end());
        vector<string> res;

        for (const string& w : words) {
            if (dfs(w, wordSet)) {
                res.push_back(w);
            }
        }
        return res;
    }

private:
    bool dfs(const string& word, unordered_set<string>& wordSet) {
        if (dp.count(word)) {
            return dp[word];
        }

        for (int i = 1; i < word.size(); i++) {
            string prefix = word.substr(0, i);
            string suffix = word.substr(i);

            if ((wordSet.count(prefix) && wordSet.count(suffix)) ||
                (wordSet.count(prefix) && dfs(suffix, wordSet))) {
                dp[word] = true;
                return true;
            }
        }
        dp[word] = false;
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    findAllConcatenatedWordsInADict(words) {
        const wordSet = new Set(words);
        const dp = new Map();

        const dfs = (word) => {
            if (dp.has(word)) {
                return dp.get(word);
            }

            for (let i = 1; i < word.length; i++) {
                const prefix = word.substring(0, i);
                const suffix = word.substring(i);

                if (
                    (wordSet.has(prefix) && wordSet.has(suffix)) ||
                    (wordSet.has(prefix) && dfs(suffix))
                ) {
                    dp.set(word, true);
                    return true;
                }
            }
            dp.set(word, false);
            return false;
        };

        const res = [];
        for (let w of words) {
            if (dfs(w)) {
                res.push(w);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private HashSet<string> wordSet;
    private Dictionary<string, bool> dp;

    public List<string> FindAllConcatenatedWordsInADict(string[] words) {
        wordSet = new HashSet<string>(words);
        dp = new Dictionary<string, bool>();
        var res = new List<string>();
        foreach (var w in words) {
            if (Dfs(w)) {
                res.Add(w);
            }
        }
        return res;
    }

    private bool Dfs(string word) {
        if (dp.TryGetValue(word, out bool val)) {
            return val;
        }
        for (int i = 1; i < word.Length; i++) {
            string prefix = word.Substring(0, i);
            string suffix = word.Substring(i);
            if ((wordSet.Contains(prefix) && wordSet.Contains(suffix)) ||
                (wordSet.Contains(prefix) && Dfs(suffix))) {
                dp[word] = true;
                return true;
            }
        }
        dp[word] = false;
        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 3)$
- Space complexity: $O(n * m)$

> Where $n$ is the size of the string array $words$ and $m$ is the length of the longest word in the array.

---

## 4. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        wordSet = set(words)
        res = []

        for word in words:
            m = len(word)

            dp = [False] * (m + 1)
            dp[0] = True

            for i in range(1, m + 1):
                for j in range(i):
                    if j == 0 and i == m:
                        continue
                    if dp[j] and word[j:i] in wordSet:
                        dp[i] = True
                        break

            if dp[m]:
                res.append(word)

        return res
```

```java
public class Solution {
    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        Set<String> wordSet = new HashSet<>(Arrays.asList(words));
        List<String> res = new ArrayList<>();

        for (String word : words) {
            int m = word.length();
            boolean[] dp = new boolean[m + 1];
            dp[0] = true;

            for (int i = 1; i <= m; i++) {
                for (int j = 0; j < i; j++) {
                    if (j == 0 && i == m) continue;
                    if (dp[j] && wordSet.contains(word.substring(j, i))) {
                        dp[i] = true;
                        break;
                    }
                }
            }

            if (dp[m]) {
                res.add(word);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {
        unordered_set<string> wordSet(words.begin(), words.end());
        vector<string> res;

        for (string& word : words) {
            int m = word.length();
            vector<bool> dp(m + 1, false);
            dp[0] = true;

            for (int i = 1; i <= m; i++) {
                for (int j = 0; j < i; j++) {
                    if (j == 0 && i == m) continue;
                    if (dp[j] && wordSet.count(word.substr(j, i - j))) {
                        dp[i] = true;
                        break;
                    }
                }
            }

            if (dp[m]) {
                res.push_back(word);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    findAllConcatenatedWordsInADict(words) {
        const wordSet = new Set(words);
        const res = [];

        for (const word of words) {
            const m = word.length;
            const dp = new Array(m + 1).fill(false);
            dp[0] = true;

            for (let i = 1; i <= m; i++) {
                for (let j = 0; j < i; j++) {
                    if (j === 0 && i === m) continue;
                    if (dp[j] && wordSet.has(word.substring(j, i))) {
                        dp[i] = true;
                        break;
                    }
                }
            }

            if (dp[m]) {
                res.push(word);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> FindAllConcatenatedWordsInADict(string[] words) {
        var wordSet = new HashSet<string>(words);
        var res = new List<string>();

        foreach (var word in words) {
            int m = word.Length;
            var dp = new bool[m + 1];
            dp[0] = true;

            for (int i = 1; i <= m; i++) {
                for (int j = 0; j < i; j++) {
                    if (j == 0 && i == m) continue;
                    if (dp[j] && wordSet.Contains(word.Substring(j, i - j))) {
                        dp[i] = true;
                        break;
                    }
                }
            }

            if (dp[m]) {
                res.Add(word);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 3)$
- Space complexity: $O(n * m)$

> Where $n$ is the size of the string array $words$ and $m$ is the length of the longest word in the array.
