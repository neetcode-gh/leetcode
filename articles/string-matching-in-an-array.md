## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Substring Search** - Checking if one string appears within another using built-in methods or algorithms
- **Sorting** - Ordering elements by a custom criterion (e.g., string length) to optimize comparisons
- **String Matching Algorithms** - KMP, Rabin-Karp, or Z-Algorithm for efficient pattern matching (for advanced solutions)
- **Trie Data Structure** - Building a suffix trie to efficiently find substring relationships (for optimal solution)

---

## 1. Brute Force

### Intuition

For each word, we check if it appears as a substring in any other word. If it does, we add it to our result. Since we need to check every word against every other word, we use two nested loops. Once we find that a word is a substring of another, we can stop checking and move to the next word.

### Algorithm

1. Initialize an empty result list.
2. For each word at index `i`, iterate through all words at index `j` where `j != i`.
3. Check if `words[i]` is a substring of `words[j]` using the built-in substring check.
4. If found, add `words[i]` to the result and `break` the inner loop.
5. Return the result list.

::tabs-start

```python
class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        res = []

        for i in range(len(words)):
            for j in range(len(words)):
                if i == j:
                    continue

                if words[i] in words[j]:
                    res.append(words[i])
                    break

        return res
```

```java
public class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();

        for (int i = 0; i < words.length; i++) {
            for (int j = 0; j < words.length; j++) {
                if (i == j) {
                    continue;
                }

                if (words[j].contains(words[i])) {
                    res.add(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;

        for (int i = 0; i < words.size(); i++) {
            for (int j = 0; j < words.size(); j++) {
                if (i == j) {
                    continue;
                }

                if (words[j].find(words[i]) != string::npos) {
                    res.push_back(words[i]);
                    break;
                }
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
    stringMatching(words) {
        let res = [];

        for (let i = 0; i < words.length; i++) {
            for (let j = 0; j < words.length; j++) {
                if (i === j) {
                    continue;
                }

                if (words[j].includes(words[i])) {
                    res.push(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> StringMatching(string[] words) {
        List<string> res = new List<string>();

        for (int i = 0; i < words.Length; i++) {
            for (int j = 0; j < words.Length; j++) {
                if (i == j) {
                    continue;
                }

                if (words[j].Contains(words[i])) {
                    res.Add(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```go
func stringMatching(words []string) []string {
    res := []string{}

    for i := 0; i < len(words); i++ {
        for j := 0; j < len(words); j++ {
            if i == j {
                continue
            }

            if strings.Contains(words[j], words[i]) {
                res = append(res, words[i])
                break
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun stringMatching(words: Array<String>): List<String> {
        val res = mutableListOf<String>()

        for (i in words.indices) {
            for (j in words.indices) {
                if (i == j) {
                    continue
                }

                if (words[j].contains(words[i])) {
                    res.add(words[i])
                    break
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func stringMatching(_ words: [String]) -> [String] {
        var res = [String]()

        for i in 0..<words.count {
            for j in 0..<words.count {
                if i == j {
                    continue
                }

                if words[j].contains(words[i]) {
                    res.append(words[i])
                    break
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m ^ 2)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.

---

## 2. Sorting

### Intuition

A shorter word can only be a substring of a longer word, never the other way around. By sorting words by length, we only need to check each word against longer words that come after it. This gives a minor optimization by reducing unnecessary comparisons, though the worst-case complexity remains the same.

### Algorithm

1. Sort the words array by length in ascending order.
2. For each word at index `i`, check if it's a substring of any word at index `j` where `j > i`.
3. If found, add the word to the result and `break` the inner loop.
4. Return the result list.

::tabs-start

```python
class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        res = []
        words.sort(key=len)

        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                if words[i] in words[j]:
                    res.append(words[i])
                    break

        return res
```

```java
public class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();
        Arrays.sort(words, Comparator.comparingInt(String::length));

        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                if (words[j].contains(words[i])) {
                    res.add(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.length() < b.length();
        });

        for (int i = 0; i < words.size(); i++) {
            for (int j = i + 1; j < words.size(); j++) {
                if (words[j].find(words[i]) != string::npos) {
                    res.push_back(words[i]);
                    break;
                }
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
    stringMatching(words) {
        let res = [];
        words.sort((a, b) => a.length - b.length);

        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (words[j].includes(words[i])) {
                    res.push(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> StringMatching(string[] words) {
        List<string> res = new List<string>();
        Array.Sort(words, (a, b) => a.Length.CompareTo(b.Length));

        for (int i = 0; i < words.Length; i++) {
            for (int j = i + 1; j < words.Length; j++) {
                if (words[j].Contains(words[i])) {
                    res.Add(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```go
func stringMatching(words []string) []string {
    res := []string{}
    sort.Slice(words, func(i, j int) bool {
        return len(words[i]) < len(words[j])
    })

    for i := 0; i < len(words); i++ {
        for j := i + 1; j < len(words); j++ {
            if strings.Contains(words[j], words[i]) {
                res = append(res, words[i])
                break
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun stringMatching(words: Array<String>): List<String> {
        val res = mutableListOf<String>()
        val sortedWords = words.sortedBy { it.length }

        for (i in sortedWords.indices) {
            for (j in i + 1 until sortedWords.size) {
                if (sortedWords[j].contains(sortedWords[i])) {
                    res.add(sortedWords[i])
                    break
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func stringMatching(_ words: [String]) -> [String] {
        var res = [String]()
        let sortedWords = words.sorted { $0.count < $1.count }

        for i in 0..<sortedWords.count {
            for j in (i + 1)..<sortedWords.count {
                if sortedWords[j].contains(sortedWords[i]) {
                    res.append(sortedWords[i])
                    break
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m ^ 2)$
- Space complexity:
    - $O(1)$ or $O(n)$ depending on the sorting algorithm.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.

---

## 3. Knuth-Morris-Pratt (KMP) Algorithm

### Intuition

Instead of using the built-in substring search, we can use the KMP algorithm which preprocesses the pattern to enable efficient matching. KMP builds a "longest proper prefix which is also suffix" (LPS) array that allows us to skip characters during mismatches rather than starting over. This improves substring matching to linear time in the combined length of the strings.

### Algorithm

1. Implement KMP: build the LPS array for the pattern, then scan the text using the LPS to avoid redundant comparisons.
2. Sort words by length.
3. For each word at index `i`, use KMP to check if it's a substring of any word at index `j > i`.
4. If KMP returns a valid index (not `-1`), add the word to the result and `break`.
5. Return the result list.

::tabs-start

```python
class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        def kmp(word1: str, word2: str) -> int:
            lps = [0] * len(word2)
            prevLPS, i = 0, 1

            while i < len(word2):
                if word2[i] == word2[prevLPS]:
                    lps[i] = prevLPS + 1
                    prevLPS += 1
                    i += 1
                elif prevLPS == 0:
                    lps[i] = 0
                    i += 1
                else:
                    prevLPS = lps[prevLPS - 1]

            i = j = 0
            while i < len(word1):
                if word1[i] == word2[j]:
                    i += 1
                    j += 1
                else:
                    if j == 0:
                        i += 1
                    else:
                        j = lps[j - 1]

                if j == len(word2):
                    return i - len(word2)

            return -1

        res = []
        words.sort(key=len)

        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                if kmp(words[j], words[i]) != -1:
                    res.append(words[i])
                    break

        return res
```

```java
public class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();
        Arrays.sort(words, Comparator.comparingInt(String::length));

        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                if (kmp(words[j], words[i]) != -1) {
                    res.add(words[i]);
                    break;
                }
            }
        }

        return res;
    }

    private int kmp(String word1, String word2) {
        int[] lps = new int[word2.length()];
        int prevLPS = 0, i = 1;

        while (i < word2.length()) {
            if (word2.charAt(i) == word2.charAt(prevLPS)) {
                lps[i] = prevLPS + 1;
                prevLPS++;
                i++;
            } else if (prevLPS == 0) {
                lps[i] = 0;
                i++;
            } else {
                prevLPS = lps[prevLPS - 1];
            }
        }

        i = 0;
        int j = 0;
        while (i < word1.length()) {
            if (word1.charAt(i) == word2.charAt(j)) {
                i++;
                j++;
            } else {
                if (j == 0) {
                    i++;
                } else {
                    j = lps[j - 1];
                }
            }

            if (j == word2.length()) {
                return i - word2.length();
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.length() < b.length();
        });

        for (int i = 0; i < words.size(); i++) {
            for (int j = i + 1; j < words.size(); j++) {
                if (kmp(words[j], words[i]) != -1) {
                    res.push_back(words[i]);
                    break;
                }
            }
        }

        return res;
    }

private:
    int kmp(const string& word1, const string& word2) {
        vector<int> lps(word2.size(), 0);
        int prevLPS = 0, i = 1;

        while (i < word2.size()) {
            if (word2[i] == word2[prevLPS]) {
                lps[i++] = ++prevLPS;
            } else if (prevLPS == 0) {
                lps[i++] = 0;
            } else {
                prevLPS = lps[prevLPS - 1];
            }
        }

        i = 0;
        int j = 0;
        while (i < word1.size()) {
            if (word1[i] == word2[j]) {
                i++;
                j++;
            } else {
                if (j == 0) {
                    i++;
                } else {
                    j = lps[j - 1];
                }
            }

            if (j == word2.size()) {
                return i - word2.size();
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    stringMatching(words) {
        const kmp = (word1, word2) => {
            const lps = Array(word2.length).fill(0);
            let prevLPS = 0,
                i = 1;

            while (i < word2.length) {
                if (word2[i] === word2[prevLPS]) {
                    lps[i++] = ++prevLPS;
                } else if (prevLPS === 0) {
                    lps[i++] = 0;
                } else {
                    prevLPS = lps[prevLPS - 1];
                }
            }

            i = 0;
            let j = 0;
            while (i < word1.length) {
                if (word1[i] === word2[j]) {
                    i++;
                    j++;
                } else {
                    if (j === 0) {
                        i++;
                    } else {
                        j = lps[j - 1];
                    }
                }

                if (j === word2.length) {
                    return i - word2.length;
                }
            }

            return -1;
        };

        let res = [];
        words.sort((a, b) => a.length - b.length);

        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (kmp(words[j], words[i]) !== -1) {
                    res.push(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> StringMatching(string[] words) {
        List<string> res = new List<string>();
        Array.Sort(words, (a, b) => a.Length.CompareTo(b.Length));

        for (int i = 0; i < words.Length; i++) {
            for (int j = i + 1; j < words.Length; j++) {
                if (Kmp(words[j], words[i]) != -1) {
                    res.Add(words[i]);
                    break;
                }
            }
        }

        return res;
    }

    private int Kmp(string word1, string word2) {
        int[] lps = new int[word2.Length];
        int prevLPS = 0, i = 1;

        while (i < word2.Length) {
            if (word2[i] == word2[prevLPS]) {
                lps[i] = prevLPS + 1;
                prevLPS++;
                i++;
            } else if (prevLPS == 0) {
                lps[i] = 0;
                i++;
            } else {
                prevLPS = lps[prevLPS - 1];
            }
        }

        i = 0;
        int j = 0;
        while (i < word1.Length) {
            if (word1[i] == word2[j]) {
                i++;
                j++;
            } else {
                if (j == 0) {
                    i++;
                } else {
                    j = lps[j - 1];
                }
            }

            if (j == word2.Length) {
                return i - word2.Length;
            }
        }

        return -1;
    }
}
```

```go
func stringMatching(words []string) []string {
    kmp := func(word1, word2 string) int {
        lps := make([]int, len(word2))
        prevLPS, i := 0, 1

        for i < len(word2) {
            if word2[i] == word2[prevLPS] {
                lps[i] = prevLPS + 1
                prevLPS++
                i++
            } else if prevLPS == 0 {
                lps[i] = 0
                i++
            } else {
                prevLPS = lps[prevLPS-1]
            }
        }

        i, j := 0, 0
        for i < len(word1) {
            if word1[i] == word2[j] {
                i++
                j++
            } else {
                if j == 0 {
                    i++
                } else {
                    j = lps[j-1]
                }
            }

            if j == len(word2) {
                return i - len(word2)
            }
        }

        return -1
    }

    res := []string{}
    sort.Slice(words, func(i, j int) bool {
        return len(words[i]) < len(words[j])
    })

    for i := 0; i < len(words); i++ {
        for j := i + 1; j < len(words); j++ {
            if kmp(words[j], words[i]) != -1 {
                res = append(res, words[i])
                break
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun stringMatching(words: Array<String>): List<String> {
        fun kmp(word1: String, word2: String): Int {
            val lps = IntArray(word2.length)
            var prevLPS = 0
            var i = 1

            while (i < word2.length) {
                if (word2[i] == word2[prevLPS]) {
                    lps[i] = prevLPS + 1
                    prevLPS++
                    i++
                } else if (prevLPS == 0) {
                    lps[i] = 0
                    i++
                } else {
                    prevLPS = lps[prevLPS - 1]
                }
            }

            i = 0
            var j = 0
            while (i < word1.length) {
                if (word1[i] == word2[j]) {
                    i++
                    j++
                } else {
                    if (j == 0) {
                        i++
                    } else {
                        j = lps[j - 1]
                    }
                }

                if (j == word2.length) {
                    return i - word2.length
                }
            }

            return -1
        }

        val res = mutableListOf<String>()
        val sortedWords = words.sortedBy { it.length }

        for (i in sortedWords.indices) {
            for (j in i + 1 until sortedWords.size) {
                if (kmp(sortedWords[j], sortedWords[i]) != -1) {
                    res.add(sortedWords[i])
                    break
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func stringMatching(_ words: [String]) -> [String] {
        func kmp(_ word1: String, _ word2: String) -> Int {
            let arr1 = Array(word1)
            let arr2 = Array(word2)
            var lps = [Int](repeating: 0, count: arr2.count)
            var prevLPS = 0
            var i = 1

            while i < arr2.count {
                if arr2[i] == arr2[prevLPS] {
                    lps[i] = prevLPS + 1
                    prevLPS += 1
                    i += 1
                } else if prevLPS == 0 {
                    lps[i] = 0
                    i += 1
                } else {
                    prevLPS = lps[prevLPS - 1]
                }
            }

            i = 0
            var j = 0
            while i < arr1.count {
                if arr1[i] == arr2[j] {
                    i += 1
                    j += 1
                } else {
                    if j == 0 {
                        i += 1
                    } else {
                        j = lps[j - 1]
                    }
                }

                if j == arr2.count {
                    return i - arr2.count
                }
            }

            return -1
        }

        var res = [String]()
        let sortedWords = words.sorted { $0.count < $1.count }

        for i in 0..<sortedWords.count {
            for j in (i + 1)..<sortedWords.count {
                if kmp(sortedWords[j], sortedWords[i]) != -1 {
                    res.append(sortedWords[i])
                    break
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity:
    - $O(m)$ extra space.
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.

---

## 4. Rabin-Karp Algorithm (Rolling Hash)

### Intuition

Rabin-Karp uses hashing to speed up substring matching. We compute a hash of the pattern and then slide a window over the text, computing the hash of each window using a rolling hash technique. If the hashes match, we have a potential match (with possible false positives). Using double hashing with two different bases and moduli reduces false positive probability to near zero.

### Algorithm

1. Implement Rabin-Karp: compute the hash of the pattern, precompute the power values for the window size, then slide over the text updating the hash in `O(1)` per step.
2. Use two independent hash functions to minimize false positives.
3. Sort words by length.
4. For each word at index `i`, use Rabin-Karp to check if it's a substring of any word at index `j > i`.
5. If a match is found, add the word to the result and `break`.
6. Return the result list.

::tabs-start

```python
class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        def rabinKarp(word1: str, word2: str) -> int:
            base1, mod1 = 31, 768258391
            base2, mod2 = 37, 685683731
            n, m = len(word1), len(word2)

            power1, power2 = 1, 1
            for _ in range(m):
                power1 = (power1 * base1) % mod1
                power2 = (power2 * base2) % mod2

            word1_hash1 = word1_hash2 = 0
            word2_hash1 = word2_hash2 = 0

            for i in range(m):
                word1_hash1 = (word1_hash1 * base1 + ord(word2[i])) % mod1
                word1_hash2 = (word1_hash2 * base2 + ord(word2[i])) % mod2
                word2_hash1 = (word2_hash1 * base1 + ord(word1[i])) % mod1
                word2_hash2 = (word2_hash2 * base2 + ord(word1[i])) % mod2

            for i in range(n - m + 1):
                if word2_hash1 == word1_hash1 and word2_hash2 == word1_hash2:
                    return i

                if i + m < n:
                    word2_hash1 = (word2_hash1 * base1 - ord(word1[i]) * power1 + ord(word1[i + m])) % mod1
                    word2_hash2 = (word2_hash2 * base2 - ord(word1[i]) * power2 + ord(word1[i + m])) % mod2

                    word2_hash1 = (word2_hash1 + mod1) % mod1
                    word2_hash2 = (word2_hash2 + mod2) % mod2

            return -1

        res = []
        words.sort(key=len)

        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                if rabinKarp(words[j], words[i]) != -1:
                    res.append(words[i])
                    break

        return res
```

```java
public class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();
        Arrays.sort(words, Comparator.comparingInt(String::length));

        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                if (rabinKarp(words[j], words[i]) != -1) {
                    res.add(words[i]);
                    break;
                }
            }
        }

        return res;
    }

    private int rabinKarp(String word1, String word2) {
        int base1 = 31, mod1 = 768258391;
        int base2 = 37, mod2 = 685683731;
        int n = word1.length(), m = word2.length();

        long power1 = 1, power2 = 1;
        for (int k = 0; k < m; k++) {
            power1 = (power1 * base1) % mod1;
            power2 = (power2 * base2) % mod2;
        }

        long word1Hash1 = 0, word1Hash2 = 0;
        long word2Hash1 = 0, word2Hash2 = 0;

        for (int i = 0; i < m; i++) {
            word1Hash1 = (word1Hash1 * base1 + word2.charAt(i)) % mod1;
            word1Hash2 = (word1Hash2 * base2 + word2.charAt(i)) % mod2;
            word2Hash1 = (word2Hash1 * base1 + word1.charAt(i)) % mod1;
            word2Hash2 = (word2Hash2 * base2 + word1.charAt(i)) % mod2;
        }

        for (int i = 0; i <= n - m; i++) {
            if (word2Hash1 == word1Hash1 && word2Hash2 == word1Hash2) {
                return i;
            }

            if (i + m < n) {
                word2Hash1 = (word2Hash1 * base1 - word1.charAt(i) * power1 + word1.charAt(i + m)) % mod1;
                word2Hash2 = (word2Hash2 * base2 - word1.charAt(i) * power2 + word1.charAt(i + m)) % mod2;

                if (word2Hash1 < 0) word2Hash1 += mod1;
                if (word2Hash2 < 0) word2Hash2 += mod2;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.length() < b.length();
        });

        for (int i = 0; i < words.size(); i++) {
            for (int j = i + 1; j < words.size(); j++) {
                if (rabinKarp(words[j], words[i]) != -1) {
                    res.push_back(words[i]);
                    break;
                }
            }
        }

        return res;
    }

private:
    int rabinKarp(const string& word1, const string& word2) {
        int base1 = 31, mod1 = 768258391;
        int base2 = 37, mod2 = 685683731;
        int n = word1.size(), m = word2.size();

        long long power1 = 1, power2 = 1;
        for (int i = 0; i < m; i++) {
            power1 = (power1 * base1) % mod1;
            power2 = (power2 * base2) % mod2;
        }

        long long word1Hash1 = 0, word1Hash2 = 0;
        long long word2Hash1 = 0, word2Hash2 = 0;

        for (int i = 0; i < m; i++) {
            word1Hash1 = (word1Hash1 * base1 + word2[i]) % mod1;
            word1Hash2 = (word1Hash2 * base2 + word2[i]) % mod2;
            word2Hash1 = (word2Hash1 * base1 + word1[i]) % mod1;
            word2Hash2 = (word2Hash2 * base2 + word1[i]) % mod2;
        }

        for (int i = 0; i <= n - m; i++) {
            if (word2Hash1 == word1Hash1 && word2Hash2 == word1Hash2) {
                return i;
            }

            if (i + m < n) {
                word2Hash1 = (word2Hash1 * base1 - word1[i] * power1 + word1[i + m]) % mod1;
                word2Hash2 = (word2Hash2 * base2 - word1[i] * power2 + word1[i + m]) % mod2;

                if (word2Hash1 < 0) word2Hash1 += mod1;
                if (word2Hash2 < 0) word2Hash2 += mod2;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    stringMatching(words) {
        const rabinKarp = (word1, word2) => {
            const base1 = 31,
                mod1 = 768258391;
            const base2 = 37,
                mod2 = 685683731;
            const n = word1.length,
                m = word2.length;

            let power1 = 1,
                power2 = 1;
            for (let k = 0; k < m; k++) {
                power1 = (power1 * base1) % mod1;
                power2 = (power2 * base2) % mod2;
            }

            let hash1 = 0,
                hash2 = 0;
            let cur1 = 0,
                cur2 = 0;

            for (let i = 0; i < m; i++) {
                hash1 = (hash1 * base1 + word2.charCodeAt(i)) % mod1;
                hash2 = (hash2 * base2 + word2.charCodeAt(i)) % mod2;
                cur1 = (cur1 * base1 + word1.charCodeAt(i)) % mod1;
                cur2 = (cur2 * base2 + word1.charCodeAt(i)) % mod2;
            }

            for (let i = 0; i <= n - m; i++) {
                if (cur1 === hash1 && cur2 === hash2) {
                    return i;
                }

                if (i + m < n) {
                    cur1 =
                        (cur1 * base1 -
                            word1.charCodeAt(i) * power1 +
                            word1.charCodeAt(i + m)) %
                        mod1;
                    cur2 =
                        (cur2 * base2 -
                            word1.charCodeAt(i) * power2 +
                            word1.charCodeAt(i + m)) %
                        mod2;

                    cur1 = (cur1 + mod1) % mod1;
                    cur2 = (cur2 + mod2) % mod2;
                }
            }

            return -1;
        };

        words.sort((a, b) => a.length - b.length);
        let res = [];

        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (rabinKarp(words[j], words[i]) !== -1) {
                    res.push(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> StringMatching(string[] words) {
        List<string> res = new List<string>();
        Array.Sort(words, (a, b) => a.Length.CompareTo(b.Length));

        for (int i = 0; i < words.Length; i++) {
            for (int j = i + 1; j < words.Length; j++) {
                if (RabinKarp(words[j], words[i]) != -1) {
                    res.Add(words[i]);
                    break;
                }
            }
        }

        return res;
    }

    private int RabinKarp(string word1, string word2) {
        int base1 = 31, mod1 = 768258391;
        int base2 = 37, mod2 = 685683731;
        int n = word1.Length, m = word2.Length;

        long power1 = 1, power2 = 1;
        for (int k = 0; k < m; k++) {
            power1 = (power1 * base1) % mod1;
            power2 = (power2 * base2) % mod2;
        }

        long word1Hash1 = 0, word1Hash2 = 0;
        long word2Hash1 = 0, word2Hash2 = 0;

        for (int i = 0; i < m; i++) {
            word1Hash1 = (word1Hash1 * base1 + word2[i]) % mod1;
            word1Hash2 = (word1Hash2 * base2 + word2[i]) % mod2;
            word2Hash1 = (word2Hash1 * base1 + word1[i]) % mod1;
            word2Hash2 = (word2Hash2 * base2 + word1[i]) % mod2;
        }

        for (int i = 0; i <= n - m; i++) {
            if (word2Hash1 == word1Hash1 && word2Hash2 == word1Hash2) {
                return i;
            }

            if (i + m < n) {
                word2Hash1 = (word2Hash1 * base1 - (long)word1[i] * power1 + word1[i + m]) % mod1;
                word2Hash2 = (word2Hash2 * base2 - (long)word1[i] * power2 + word1[i + m]) % mod2;

                if (word2Hash1 < 0) word2Hash1 += mod1;
                if (word2Hash2 < 0) word2Hash2 += mod2;
            }
        }

        return -1;
    }
}
```

```go
func stringMatching(words []string) []string {
    rabinKarp := func(word1, word2 string) int {
        base1, mod1 := int64(31), int64(768258391)
        base2, mod2 := int64(37), int64(685683731)
        n, m := len(word1), len(word2)

        power1, power2 := int64(1), int64(1)
        for k := 0; k < m; k++ {
            power1 = (power1 * base1) % mod1
            power2 = (power2 * base2) % mod2
        }

        word1Hash1, word1Hash2 := int64(0), int64(0)
        word2Hash1, word2Hash2 := int64(0), int64(0)

        for i := 0; i < m; i++ {
            word1Hash1 = (word1Hash1*base1 + int64(word2[i])) % mod1
            word1Hash2 = (word1Hash2*base2 + int64(word2[i])) % mod2
            word2Hash1 = (word2Hash1*base1 + int64(word1[i])) % mod1
            word2Hash2 = (word2Hash2*base2 + int64(word1[i])) % mod2
        }

        for i := 0; i <= n-m; i++ {
            if word2Hash1 == word1Hash1 && word2Hash2 == word1Hash2 {
                return i
            }

            if i+m < n {
                word2Hash1 = (word2Hash1*base1 - int64(word1[i])*power1 + int64(word1[i+m])) % mod1
                word2Hash2 = (word2Hash2*base2 - int64(word1[i])*power2 + int64(word1[i+m])) % mod2

                word2Hash1 = (word2Hash1 + mod1) % mod1
                word2Hash2 = (word2Hash2 + mod2) % mod2
            }
        }

        return -1
    }

    res := []string{}
    sort.Slice(words, func(i, j int) bool {
        return len(words[i]) < len(words[j])
    })

    for i := 0; i < len(words); i++ {
        for j := i + 1; j < len(words); j++ {
            if rabinKarp(words[j], words[i]) != -1 {
                res = append(res, words[i])
                break
            }
        }
    }

    return res
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.

---

## 5. Z-Algorithm

### Intuition

The Z-algorithm builds a Z-array where Z[i] represents the length of the longest substring starting at position i that matches a prefix of the string. By concatenating the pattern, a separator, and the text, we can find all occurrences of the pattern by looking for positions where Z[i] equals the pattern length.

### Algorithm

1. Implement the Z-algorithm: concatenate `pattern + "$" + text` and compute the Z-array.
2. Any position after the separator where `Z[i] == len(pattern)` indicates a match.
3. Sort words by length.
4. For each word at index `i`, use the Z-algorithm to check if it's a substring of any word at index `j > i`.
5. If a match is found, add the word to the result and `break`.
6. Return the result list.

::tabs-start

```python
class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        def zAlgorithm(word1: str, word2: str) -> int:
            s = word2 + "$" + word1
            n = len(s)
            z = [0] * n
            l, r = 0, 0

            for i in range(1, n):
                if i <= r:
                    z[i] = min(r - i + 1, z[i - l])
                while i + z[i] < n and s[z[i]] == s[i + z[i]]:
                    z[i] += 1
                if i + z[i] - 1 > r:
                    l, r = i, i + z[i] - 1

            for i in range(len(word2) + 1, n):
                if z[i] == len(word2):
                    return i - len(word2) - 1

            return -1

        res = []
        words.sort(key=len)

        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                if zAlgorithm(words[j], words[i]) != -1:
                    res.append(words[i])
                    break

        return res
```

```java
public class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();
        Arrays.sort(words, Comparator.comparingInt(String::length));

        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                if (zAlgorithm(words[j], words[i]) != -1) {
                    res.add(words[i]);
                    break;
                }
            }
        }

        return res;
    }

    private int zAlgorithm(String word1, String word2) {
        String s = word2 + "$" + word1;
        int n = s.length();
        int[] z = new int[n];
        int l = 0, r = 0;

        for (int i = 1; i < n; i++) {
            if (i <= r) {
                z[i] = Math.min(r - i + 1, z[i - l]);
            }
            while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) {
                z[i]++;
            }
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }

        for (int i = word2.length() + 1; i < n; i++) {
            if (z[i] == word2.length()) {
                return i - word2.length() - 1;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.length() < b.length();
        });

        for (int i = 0; i < words.size(); i++) {
            for (int j = i + 1; j < words.size(); j++) {
                if (zAlgorithm(words[j], words[i]) != -1) {
                    res.push_back(words[i]);
                    break;
                }
            }
        }

        return res;
    }

private:
    int zAlgorithm(const string& word1, const string& word2) {
        string s = word2 + "$" + word1;
        int n = s.size();
        vector<int> z(n, 0);
        int l = 0, r = 0;

        for (int i = 1; i < n; i++) {
            if (i <= r) {
                z[i] = min(r - i + 1, z[i - l]);
            }
            while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
                z[i]++;
            }
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }

        for (int i = word2.size() + 1; i < n; i++) {
            if (z[i] == word2.size()) {
                return i - word2.size() - 1;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    stringMatching(words) {
        const zAlgorithm = (word1, word2) => {
            const s = word2 + '$' + word1;
            const n = s.length;
            const z = Array(n).fill(0);
            let l = 0,
                r = 0;

            for (let i = 1; i < n; i++) {
                if (i <= r) {
                    z[i] = Math.min(r - i + 1, z[i - l]);
                }
                while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
                    z[i]++;
                }
                if (i + z[i] - 1 > r) {
                    l = i;
                    r = i + z[i] - 1;
                }
            }

            for (let i = word2.length + 1; i < n; i++) {
                if (z[i] === word2.length) {
                    return i - word2.length - 1;
                }
            }

            return -1;
        };

        words.sort((a, b) => a.length - b.length);
        let res = [];

        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (zAlgorithm(words[j], words[i]) !== -1) {
                    res.push(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> StringMatching(string[] words) {
        int ZAlgorithm(string word1, string word2) {
            string s = word2 + "$" + word1;
            int n = s.Length;
            int[] z = new int[n];
            int l = 0, r = 0;

            for (int i = 1; i < n; i++) {
                if (i <= r) {
                    z[i] = Math.Min(r - i + 1, z[i - l]);
                }
                while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
                    z[i]++;
                }
                if (i + z[i] - 1 > r) {
                    l = i;
                    r = i + z[i] - 1;
                }
            }

            for (int i = word2.Length + 1; i < n; i++) {
                if (z[i] == word2.Length) {
                    return i - word2.Length - 1;
                }
            }

            return -1;
        }

        List<string> res = new List<string>();
        Array.Sort(words, (a, b) => a.Length.CompareTo(b.Length));

        for (int i = 0; i < words.Length; i++) {
            for (int j = i + 1; j < words.Length; j++) {
                if (ZAlgorithm(words[j], words[i]) != -1) {
                    res.Add(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```go
func stringMatching(words []string) []string {
    zAlgorithm := func(word1, word2 string) int {
        s := word2 + "$" + word1
        n := len(s)
        z := make([]int, n)
        l, r := 0, 0

        for i := 1; i < n; i++ {
            if i <= r {
                if z[i-l] < r-i+1 {
                    z[i] = z[i-l]
                } else {
                    z[i] = r - i + 1
                }
            }
            for i+z[i] < n && s[z[i]] == s[i+z[i]] {
                z[i]++
            }
            if i+z[i]-1 > r {
                l = i
                r = i + z[i] - 1
            }
        }

        for i := len(word2) + 1; i < n; i++ {
            if z[i] == len(word2) {
                return i - len(word2) - 1
            }
        }

        return -1
    }

    res := []string{}
    sort.Slice(words, func(i, j int) bool {
        return len(words[i]) < len(words[j])
    })

    for i := 0; i < len(words); i++ {
        for j := i + 1; j < len(words); j++ {
            if zAlgorithm(words[j], words[i]) != -1 {
                res = append(res, words[i])
                break
            }
        }
    }

    return res
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity:
    - $O(m)$ extra space.
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.

---

## 6. Trie

### Intuition

We can use a suffix trie to solve this problem. For each word, we insert all its suffixes into the trie. Each node tracks how many times it has been visited. When searching for a word, if the terminal node has been visited more than once, the word appears as a substring in another word (since we inserted all suffixes, any substring of any word is a prefix of some suffix).

### Algorithm

1. Build a Trie with a count at each node.
2. For each word, insert all its suffixes. For each character traversed, increment the count.
3. For each word, search the trie by following the characters.
4. If the count at the final node is greater than `1`, the word is a substring of another word (or appears multiple times). Add it to the result.
5. Return the result list.

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = [None] * 26
        self.cnt = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert_suffixes(self, word: str) -> None:
        for i in range(len(word)):
            node = self.root
            for j in range(i, len(word)):
                idx = ord(word[j]) - ord('a')
                if not node.children[idx]:
                    node.children[idx] = TrieNode()

                node = node.children[idx]
                node.cnt += 1

    def search(self, word: str) -> bool:
        node = self.root
        for c in word:
            idx = ord(c) - ord('a')
            node = node.children[idx]
        return node.cnt > 1

class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        res = []
        trie = Trie()

        for word in words:
            trie.insert_suffixes(word)

        for word in words:
            if trie.search(word):
                res.append(word)

        return res
```

```java
class TrieNode {
    TrieNode[] children;
    int cnt;

    TrieNode() {
        children = new TrieNode[26];
        cnt = 0;
    }
}

class Trie {
    TrieNode root;

    Trie() {
        root = new TrieNode();
    }

    void insertSuffixes(String word) {
        for (int i = 0; i < word.length(); i++) {
            TrieNode node = root;
            for (int j = i; j < word.length(); j++) {
                int idx = word.charAt(j) - 'a';
                if (node.children[idx] == null) {
                    node.children[idx] = new TrieNode();
                }

                node = node.children[idx];
                node.cnt++;
            }
        }
    }

    boolean search(String word) {
        TrieNode node = root;
        for (int i = 0; i < word.length(); i++) {
            int idx = word.charAt(i) - 'a';
            node = node.children[idx];
        }
        return node.cnt > 1;
    }
}

class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();
        Trie trie = new Trie();

        for (String word : words) {
            trie.insertSuffixes(word);
        }

        for (String word : words) {
            if (trie.search(word)) {
                res.add(word);
            }
        }

        return res;
    }
}
```

```cpp
class TrieNode {
public:
    TrieNode* children[26];
    int cnt;

    TrieNode() {
        for (int i = 0; i < 26; i++) children[i] = nullptr;
        cnt = 0;
    }
};

class Trie {
public:
    TrieNode* root;

    Trie() {
        root = new TrieNode();
    }

    void insertSuffixes(const string& word) {
        for (int i = 0; i < word.size(); i++) {
            TrieNode* node = root;
            for (int j = i; j < word.size(); j++) {
                int idx = word[j] - 'a';
                if (!node->children[idx]) {
                    node->children[idx] = new TrieNode();
                }

                node = node->children[idx];
                node->cnt++;
            }
        }
    }

    bool search(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            int idx = c - 'a';
            node = node->children[idx];
        }
        return node->cnt > 1;
    }
};

class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;
        Trie trie;

        for (const string& word : words) {
            trie.insertSuffixes(word);
        }

        for (const string& word : words) {
            if (trie.search(word)) {
                res.push_back(word);
            }
        }

        return res;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = new Array(26).fill(null);
        this.cnt = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    insertSuffixes(word) {
        for (let i = 0; i < word.length; i++) {
            let node = this.root;
            for (let j = i; j < word.length; j++) {
                let idx = word.charCodeAt(j) - 97;
                if (!node.children[idx]) {
                    node.children[idx] = new TrieNode();
                }

                node = node.children[idx];
                node.cnt++;
            }
        }
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            let idx = word.charCodeAt(i) - 97;
            node = node.children[idx];
        }
        return node.cnt > 1;
    }
}

class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    stringMatching(words) {
        const res = [];
        const trie = new Trie();

        for (let word of words) {
            trie.insertSuffixes(word);
        }

        for (let word of words) {
            if (trie.search(word)) {
                res.push(word);
            }
        }

        return res;
    }
}
```

```csharp
public class TrieNode {
    public TrieNode[] children;
    public int cnt;

    public TrieNode() {
        children = new TrieNode[26];
        cnt = 0;
    }
}

public class Trie {
    public TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void InsertSuffixes(string word) {
        for (int i = 0; i < word.Length; i++) {
            TrieNode node = root;
            for (int j = i; j < word.Length; j++) {
                int idx = word[j] - 'a';
                if (node.children[idx] == null) {
                    node.children[idx] = new TrieNode();
                }

                node = node.children[idx];
                node.cnt++;
            }
        }
    }

    public bool Search(string word) {
        TrieNode node = root;
        for (int i = 0; i < word.Length; i++) {
            int idx = word[i] - 'a';
            node = node.children[idx];
        }
        return node.cnt > 1;
    }
}

public class Solution {
    public List<string> StringMatching(string[] words) {
        List<string> res = new List<string>();
        Trie trie = new Trie();

        foreach (string word in words) {
            trie.InsertSuffixes(word);
        }

        foreach (string word in words) {
            if (trie.Search(word)) {
                res.Add(word);
            }
        }

        return res;
    }
}
```

```go
type TrieNode struct {
    children [26]*TrieNode
    cnt      int
}

type Trie struct {
    root *TrieNode
}

func NewTrie() *Trie {
    return &Trie{root: &TrieNode{}}
}

func (t *Trie) insertSuffixes(word string) {
    for i := 0; i < len(word); i++ {
        node := t.root
        for j := i; j < len(word); j++ {
            idx := word[j] - 'a'
            if node.children[idx] == nil {
                node.children[idx] = &TrieNode{}
            }
            node = node.children[idx]
            node.cnt++
        }
    }
}

func (t *Trie) search(word string) bool {
    node := t.root
    for i := 0; i < len(word); i++ {
        idx := word[i] - 'a'
        node = node.children[idx]
    }
    return node.cnt > 1
}

func stringMatching(words []string) []string {
    res := []string{}
    trie := NewTrie()

    for _, word := range words {
        trie.insertSuffixes(word)
    }

    for _, word := range words {
        if trie.search(word) {
            res = append(res, word)
        }
    }

    return res
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 2)$
- Space complexity:
    - $O(n * m ^ 2)$ extra space.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.

---

## Common Pitfalls

### Comparing a Word Against Itself

When checking if a word is a substring of another, you must skip the case where `i == j` (the same word). Without this check, every word would be found as a substring of itself and incorrectly added to the result.

### Adding Duplicate Words to the Result

If a word appears as a substring in multiple other words, you should add it to the result only once. Using a `break` statement after finding the first match, or using a set to track added words, prevents duplicates in the output.
