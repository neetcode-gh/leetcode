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

```csharp
public class Solution {
    private Dictionary<string, int> wordIndex;
    private int[] dp;
    private string[] words;

    public int LongestStrChain(string[] words) {
        Array.Sort(words, (a, b) => b.Length.CompareTo(a.Length));
        this.words = words;
        wordIndex = new Dictionary<string, int>();
        for (int i = 0; i < words.Length; i++) {
            wordIndex[words[i]] = i;
        }

        dp = new int[words.Length];
        Array.Fill(dp, -1);

        int maxChain = 1;
        for (int i = 0; i < words.Length; i++) {
            maxChain = Math.Max(maxChain, Dfs(i));
        }
        return maxChain;
    }

    private int Dfs(int i) {
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = 1;
        string w = words[i];
        for (int j = 0; j < w.Length; j++) {
            string pred = w.Substring(0, j) + w.Substring(j + 1);
            if (wordIndex.ContainsKey(pred)) {
                res = Math.Max(res, 1 + Dfs(wordIndex[pred]));
            }
        }
        dp[i] = res;
        return res;
    }
}
```

```go
func longestStrChain(words []string) int {
    sort.Slice(words, func(i, j int) bool {
        return len(words[i]) > len(words[j])
    })

    wordIndex := make(map[string]int)
    for i, w := range words {
        wordIndex[w] = i
    }

    dp := make([]int, len(words))
    for i := range dp {
        dp[i] = -1
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if dp[i] != -1 {
            return dp[i]
        }

        res := 1
        w := words[i]
        for j := 0; j < len(w); j++ {
            pred := w[:j] + w[j+1:]
            if idx, ok := wordIndex[pred]; ok {
                if val := 1 + dfs(idx); val > res {
                    res = val
                }
            }
        }
        dp[i] = res
        return res
    }

    maxChain := 1
    for i := range words {
        if val := dfs(i); val > maxChain {
            maxChain = val
        }
    }
    return maxChain
}
```

```kotlin
class Solution {
    fun longestStrChain(words: Array<String>): Int {
        words.sortByDescending { it.length }
        val wordIndex = mutableMapOf<String, Int>()
        for (i in words.indices) {
            wordIndex[words[i]] = i
        }

        val dp = IntArray(words.size) { -1 }

        fun dfs(i: Int): Int {
            if (dp[i] != -1) {
                return dp[i]
            }

            var res = 1
            val w = words[i]
            for (j in w.indices) {
                val pred = w.substring(0, j) + w.substring(j + 1)
                if (pred in wordIndex) {
                    res = maxOf(res, 1 + dfs(wordIndex[pred]!!))
                }
            }
            dp[i] = res
            return res
        }

        var maxChain = 1
        for (i in words.indices) {
            maxChain = maxOf(maxChain, dfs(i))
        }
        return maxChain
    }
}
```

```swift
class Solution {
    func longestStrChain(_ words: [String]) -> Int {
        var words = words.sorted { $0.count > $1.count }
        var wordIndex = [String: Int]()
        for i in 0..<words.count {
            wordIndex[words[i]] = i
        }

        var dp = [Int](repeating: -1, count: words.count)

        func dfs(_ i: Int) -> Int {
            if dp[i] != -1 {
                return dp[i]
            }

            var res = 1
            let w = Array(words[i])
            for j in 0..<w.count {
                let pred = String(w[0..<j]) + String(w[(j+1)...])
                if let idx = wordIndex[pred] {
                    res = max(res, 1 + dfs(idx))
                }
            }
            dp[i] = res
            return res
        }

        var maxChain = 1
        for i in 0..<words.count {
            maxChain = max(maxChain, dfs(i))
        }
        return maxChain
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

```csharp
public class Solution {
    public int LongestStrChain(string[] words) {
        Array.Sort(words, (a, b) => a.Length.CompareTo(b.Length));
        int n = words.Length;
        int[] dp = new int[n];
        Array.Fill(dp, 1);

        for (int i = 1; i < n; i++) {
            for (int j = i - 1; j >= 0; j--) {
                if (words[j].Length + 1 < words[i].Length) {
                    break;
                }
                if (words[j].Length + 1 > words[i].Length || !IsPred(words[j], words[i])) {
                    continue;
                }
                dp[i] = Math.Max(dp[i], 1 + dp[j]);
            }
        }

        int maxChain = 0;
        foreach (int chain in dp) {
            maxChain = Math.Max(maxChain, chain);
        }
        return maxChain;
    }

    private bool IsPred(string w1, string w2) {
        int i = 0;
        foreach (char c in w2) {
            if (i == w1.Length) {
                return true;
            }
            if (w1[i] == c) {
                i++;
            }
        }
        return i == w1.Length;
    }
}
```

```go
func longestStrChain(words []string) int {
    sort.Slice(words, func(i, j int) bool {
        return len(words[i]) < len(words[j])
    })

    n := len(words)
    dp := make([]int, n)
    for i := range dp {
        dp[i] = 1
    }

    isPred := func(w1, w2 string) bool {
        i := 0
        for _, c := range w2 {
            if i == len(w1) {
                return true
            }
            if rune(w1[i]) == c {
                i++
            }
        }
        return i == len(w1)
    }

    for i := 1; i < n; i++ {
        for j := i - 1; j >= 0; j-- {
            if len(words[j])+1 < len(words[i]) {
                break
            }
            if len(words[j])+1 > len(words[i]) || !isPred(words[j], words[i]) {
                continue
            }
            if dp[j]+1 > dp[i] {
                dp[i] = dp[j] + 1
            }
        }
    }

    maxChain := 0
    for _, v := range dp {
        if v > maxChain {
            maxChain = v
        }
    }
    return maxChain
}
```

```kotlin
class Solution {
    fun longestStrChain(words: Array<String>): Int {
        words.sortBy { it.length }
        val n = words.size
        val dp = IntArray(n) { 1 }

        fun isPred(w1: String, w2: String): Boolean {
            var i = 0
            for (c in w2) {
                if (i == w1.length) {
                    return true
                }
                if (w1[i] == c) {
                    i++
                }
            }
            return i == w1.length
        }

        for (i in 1 until n) {
            for (j in i - 1 downTo 0) {
                if (words[j].length + 1 < words[i].length) {
                    break
                }
                if (words[j].length + 1 > words[i].length || !isPred(words[j], words[i])) {
                    continue
                }
                dp[i] = maxOf(dp[i], 1 + dp[j])
            }
        }

        return dp.max()
    }
}
```

```swift
class Solution {
    func longestStrChain(_ words: [String]) -> Int {
        var words = words.sorted { $0.count < $1.count }
        let n = words.count
        var dp = [Int](repeating: 1, count: n)

        func isPred(_ w1: String, _ w2: String) -> Bool {
            var i = 0
            let w1Arr = Array(w1)
            for c in w2 {
                if i == w1Arr.count {
                    return true
                }
                if w1Arr[i] == c {
                    i += 1
                }
            }
            return i == w1Arr.count
        }

        for i in 1..<n {
            for j in stride(from: i - 1, through: 0, by: -1) {
                if words[j].count + 1 < words[i].count {
                    break
                }
                if words[j].count + 1 > words[i].count || !isPred(words[j], words[i]) {
                    continue
                }
                dp[i] = max(dp[i], 1 + dp[j])
            }
        }

        return dp.max()!
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

```csharp
public class Solution {
    public int LongestStrChain(string[] words) {
        Array.Sort(words, (a, b) => a.Length.CompareTo(b.Length));
        var dp = new Dictionary<string, int>();
        int res = 0;

        foreach (string word in words) {
            dp[word] = 1;
            for (int i = 0; i < word.Length; i++) {
                string pred = word.Substring(0, i) + word.Substring(i + 1);
                if (dp.ContainsKey(pred)) {
                    dp[word] = Math.Max(dp[word], dp[pred] + 1);
                }
            }
            res = Math.Max(res, dp[word]);
        }

        return res;
    }
}
```

```go
func longestStrChain(words []string) int {
    sort.Slice(words, func(i, j int) bool {
        return len(words[i]) < len(words[j])
    })

    dp := make(map[string]int)
    res := 0

    for _, word := range words {
        dp[word] = 1
        for i := 0; i < len(word); i++ {
            pred := word[:i] + word[i+1:]
            if val, ok := dp[pred]; ok {
                if val+1 > dp[word] {
                    dp[word] = val + 1
                }
            }
        }
        if dp[word] > res {
            res = dp[word]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun longestStrChain(words: Array<String>): Int {
        words.sortBy { it.length }
        val dp = mutableMapOf<String, Int>()
        var res = 0

        for (word in words) {
            dp[word] = 1
            for (i in word.indices) {
                val pred = word.substring(0, i) + word.substring(i + 1)
                if (pred in dp) {
                    dp[word] = maxOf(dp[word]!!, dp[pred]!! + 1)
                }
            }
            res = maxOf(res, dp[word]!!)
        }

        return res
    }
}
```

```swift
class Solution {
    func longestStrChain(_ words: [String]) -> Int {
        var words = words.sorted { $0.count < $1.count }
        var dp = [String: Int]()
        var res = 0

        for word in words {
            dp[word] = 1
            let w = Array(word)
            for i in 0..<w.count {
                let pred = String(w[0..<i]) + String(w[(i+1)...])
                if let predVal = dp[pred] {
                    dp[word] = max(dp[word]!, predVal + 1)
                }
            }
            res = max(res, dp[word]!)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 2)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of words and $m$ is the average length of each word.
