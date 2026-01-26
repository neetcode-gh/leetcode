## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Prefix Sum** - Precomputing cumulative sums to answer range queries in O(1) time
- **Hash Set** - Using sets for O(1) character lookup when checking vowels
- **Bit Manipulation (Optional)** - Using bitmasks as an alternative to hash sets for membership testing

---

## 1. Brute Force

### Intuition

A word is a "vowel string" if it starts and ends with a vowel (a, e, i, o, u). For each query, we need to count how many words in the given range satisfy this condition. The straightforward approach is to iterate through the range for each query and check each word.

### Algorithm

1. Create a set of vowels for O(1) lookup.
2. Initialize an empty result list.
3. For each query `(start, end)`:
   - Initialize a counter to `0`.
   - For each word from index `start` to `end`:
     - Check if the first and last characters are both vowels.
     - If so, increment the counter.
   - Append the counter to the result list.
4. Return the result list.

::tabs-start

```python
class Solution:
    def vowelStrings(self, words: List[str], queries: List[List[int]]) -> List[int]:
        vowels = set("aeiou")
        res = []

        for start, end in queries:
            cnt = 0
            for i in range(start, end + 1):
                if words[i][0] in vowels and words[i][-1] in vowels:
                    cnt += 1
            res.append(cnt)

        return res
```

```java
public class Solution {
    public int[] vowelStrings(String[] words, int[][] queries) {
        Set<Character> vowels = Set.of('a', 'e', 'i', 'o', 'u');
        int[] res = new int[queries.length];

        for (int k = 0; k < queries.length; k++) {
            int start = queries[k][0], end = queries[k][1], count = 0;

            for (int i = start; i <= end; i++) {
                String word = words[i];
                if (vowels.contains(word.charAt(0)) && vowels.contains(word.charAt(word.length() - 1))) {
                    count++;
                }
            }

            res[k] = count;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> vowelStrings(vector<string>& words, vector<vector<int>>& queries) {
        unordered_set<char> vowels = {'a', 'e', 'i', 'o', 'u'};
        vector<int> res;

        for (auto& q : queries) {
            int start = q[0], end = q[1], count = 0;

            for (int i = start; i <= end; i++) {
                if (vowels.count(words[i][0]) && vowels.count(words[i].back())) {
                    count++;
                }
            }

            res.push_back(count);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {number[][]} queries
     * @return {number[]}
     */
    vowelStrings(words, queries) {
        const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
        const res = [];

        for (let [start, end] of queries) {
            let count = 0;
            for (let i = start; i <= end; i++) {
                const word = words[i];
                if (vowels.has(word[0]) && vowels.has(word[word.length - 1])) {
                    count++;
                }
            }
            res.push(count);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] VowelStrings(string[] words, int[][] queries) {
        HashSet<char> vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u' };
        int[] res = new int[queries.Length];

        for (int k = 0; k < queries.Length; k++) {
            int start = queries[k][0], end = queries[k][1], count = 0;

            for (int i = start; i <= end; i++) {
                string word = words[i];
                if (vowels.Contains(word[0]) && vowels.Contains(word[word.Length - 1])) {
                    count++;
                }
            }

            res[k] = count;
        }

        return res;
    }
}
```

```go
func vowelStrings(words []string, queries [][]int) []int {
    vowels := map[byte]bool{'a': true, 'e': true, 'i': true, 'o': true, 'u': true}
    res := make([]int, len(queries))

    for k, q := range queries {
        start, end, count := q[0], q[1], 0

        for i := start; i <= end; i++ {
            word := words[i]
            if vowels[word[0]] && vowels[word[len(word)-1]] {
                count++
            }
        }

        res[k] = count
    }

    return res
}
```

```kotlin
class Solution {
    fun vowelStrings(words: Array<String>, queries: Array<IntArray>): IntArray {
        val vowels = setOf('a', 'e', 'i', 'o', 'u')
        val res = IntArray(queries.size)

        for (k in queries.indices) {
            val (start, end) = queries[k]
            var count = 0

            for (i in start..end) {
                val word = words[i]
                if (word.first() in vowels && word.last() in vowels) {
                    count++
                }
            }

            res[k] = count
        }

        return res
    }
}
```

```swift
class Solution {
    func vowelStrings(_ words: [String], _ queries: [[Int]]) -> [Int] {
        let vowels: Set<Character> = ["a", "e", "i", "o", "u"]
        var res = [Int]()

        for q in queries {
            let start = q[0], end = q[1]
            var count = 0

            for i in start...end {
                let word = words[i]
                if vowels.contains(word.first!) && vowels.contains(word.last!) {
                    count += 1
                }
            }

            res.append(count)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the number of queries.

---

## 2. Prefix Sum + Hash Set

### Intuition

The brute force approach recomputes the count for overlapping or similar ranges repeatedly. We can precompute a prefix sum array where `prefix[i]` stores the count of vowel strings from index `0` to `i-1`. Then any range query `(l, r)` can be answered in O(1) time as `prefix[r+1] - prefix[l]`.

### Algorithm

1. Create a set of vowels for O(1) lookup.
2. Build a prefix sum array of size `n+1`, initialized to `0`.
3. For each word at index `i`:
   - Set `prefix[i+1] = prefix[i]`.
   - If the word starts and ends with a vowel, increment `prefix[i+1]`.
4. For each query `(l, r)`:
   - The answer is `prefix[r+1] - prefix[l]`.
5. Return the results.

::tabs-start

```python
class Solution:
    def vowelStrings(self, words: List[str], queries: List[List[int]]) -> List[int]:
        vowel_set = set("aeiou")
        prefix_cnt = [0] * (len(words) + 1)
        prev = 0

        for i, w in enumerate(words):
            if w[0] in vowel_set and w[-1] in vowel_set:
                prev += 1
            prefix_cnt[i + 1] = prev

        res = [0] * len(queries)
        for i, q in enumerate(queries):
            l, r = q
            res[i] = prefix_cnt[r + 1] - prefix_cnt[l]

        return res
```

```java
public class Solution {
    public int[] vowelStrings(String[] words, int[][] queries) {
        Set<Character> vowels = Set.of('a', 'e', 'i', 'o', 'u');
        int n = words.length;
        int[] prefixCnt = new int[n + 1];

        for (int i = 0; i < n; i++) {
            String w = words[i];
            prefixCnt[i + 1] = prefixCnt[i];
            if (vowels.contains(w.charAt(0)) && vowels.contains(w.charAt(w.length() - 1))) {
                prefixCnt[i + 1]++;
            }
        }

        int[] res = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int l = queries[i][0], r = queries[i][1];
            res[i] = prefixCnt[r + 1] - prefixCnt[l];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> vowelStrings(vector<string>& words, vector<vector<int>>& queries) {
        unordered_set<char> vowels = {'a', 'e', 'i', 'o', 'u'};
        int n = words.size();
        vector<int> prefixCnt(n + 1, 0);

        for (int i = 0; i < n; i++) {
            prefixCnt[i + 1] = prefixCnt[i];
            if (vowels.count(words[i][0]) && vowels.count(words[i].back())) {
                prefixCnt[i + 1]++;
            }
        }

        vector<int> res;
        for (auto& q : queries) {
            int l = q[0], r = q[1];
            res.push_back(prefixCnt[r + 1] - prefixCnt[l]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {number[][]} queries
     * @return {number[]}
     */
    vowelStrings(words, queries) {
        const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
        const n = words.length;
        const prefixCnt = new Array(n + 1).fill(0);

        for (let i = 0; i < n; i++) {
            prefixCnt[i + 1] = prefixCnt[i];
            const w = words[i];
            if (vowels.has(w[0]) && vowels.has(w[w.length - 1])) {
                prefixCnt[i + 1]++;
            }
        }

        const res = new Array(queries.length);
        for (let i = 0; i < queries.length; i++) {
            const [l, r] = queries[i];
            res[i] = prefixCnt[r + 1] - prefixCnt[l];
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] VowelStrings(string[] words, int[][] queries) {
        HashSet<char> vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u' };
        int n = words.Length;
        int[] prefixCnt = new int[n + 1];

        for (int i = 0; i < n; i++) {
            string w = words[i];
            prefixCnt[i + 1] = prefixCnt[i];
            if (vowels.Contains(w[0]) && vowels.Contains(w[w.Length - 1])) {
                prefixCnt[i + 1]++;
            }
        }

        int[] res = new int[queries.Length];
        for (int i = 0; i < queries.Length; i++) {
            int l = queries[i][0], r = queries[i][1];
            res[i] = prefixCnt[r + 1] - prefixCnt[l];
        }

        return res;
    }
}
```

```go
func vowelStrings(words []string, queries [][]int) []int {
    vowels := map[byte]bool{'a': true, 'e': true, 'i': true, 'o': true, 'u': true}
    n := len(words)
    prefixCnt := make([]int, n+1)

    for i := 0; i < n; i++ {
        w := words[i]
        prefixCnt[i+1] = prefixCnt[i]
        if vowels[w[0]] && vowels[w[len(w)-1]] {
            prefixCnt[i+1]++
        }
    }

    res := make([]int, len(queries))
    for i, q := range queries {
        l, r := q[0], q[1]
        res[i] = prefixCnt[r+1] - prefixCnt[l]
    }

    return res
}
```

```kotlin
class Solution {
    fun vowelStrings(words: Array<String>, queries: Array<IntArray>): IntArray {
        val vowels = setOf('a', 'e', 'i', 'o', 'u')
        val n = words.size
        val prefixCnt = IntArray(n + 1)

        for (i in 0 until n) {
            val w = words[i]
            prefixCnt[i + 1] = prefixCnt[i]
            if (w.first() in vowels && w.last() in vowels) {
                prefixCnt[i + 1]++
            }
        }

        val res = IntArray(queries.size)
        for (i in queries.indices) {
            val (l, r) = queries[i]
            res[i] = prefixCnt[r + 1] - prefixCnt[l]
        }

        return res
    }
}
```

```swift
class Solution {
    func vowelStrings(_ words: [String], _ queries: [[Int]]) -> [Int] {
        let vowels: Set<Character> = ["a", "e", "i", "o", "u"]
        let n = words.count
        var prefixCnt = [Int](repeating: 0, count: n + 1)

        for i in 0..<n {
            let w = words[i]
            prefixCnt[i + 1] = prefixCnt[i]
            if vowels.contains(w.first!) && vowels.contains(w.last!) {
                prefixCnt[i + 1] += 1
            }
        }

        var res = [Int]()
        for q in queries {
            let l = q[0], r = q[1]
            res.append(prefixCnt[r + 1] - prefixCnt[l])
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the number of queries.

---

## 3. Prefix Sum + Bitmask

### Intuition

Instead of using a hash set to check vowels, we can use a bitmask. Since there are only 5 vowels and 26 letters, we can represent which characters are vowels using a single integer where bit `i` is set if the character at position `i` (`'a' + i`) is a vowel. Checking if a character is a vowel becomes a simple bitwise AND operation.

### Algorithm

1. Create a bitmask for vowels by setting bits for `'a'`, `'e'`, `'i'`, `'o'`, `'u'`.
2. Build a prefix sum array.
3. For each word:
   - Check if the first character's bit is set in the vowel mask.
   - Check if the last character's bit is set in the vowel mask.
   - If both are `true`, increment the prefix sum.
4. For each query `(l, r)`:
   - The answer is `prefix[r+1] - prefix[l]`.
5. Return the results.

::tabs-start

```python
class Solution:
    def vowelStrings(self, words: List[str], queries: List[List[int]]) -> List[int]:
        vowels = sum(1 << (ord(c) - ord('a')) for c in "aeiou")
        prefix = [0]
        for w in words:
            prefix.append(prefix[-1])
            if (1 << (ord(w[0]) - ord('a'))) & vowels and (1 << (ord(w[-1]) - ord('a'))) & vowels:
                prefix[-1] += 1
        return [prefix[r + 1] - prefix[l] for l, r in queries]
```

```java
public class Solution {
    public int[] vowelStrings(String[] words, int[][] queries) {
        int vowels = 0;
        for (char c : "aeiou".toCharArray()) {
            vowels |= 1 << (c - 'a');
        }

        int[] prefix = new int[words.length + 1];
        for (int i = 0; i < words.length; i++) {
            int f = words[i].charAt(0) - 'a';
            int l = words[i].charAt(words[i].length() - 1) - 'a';
            int isVowel = ((1 << f) & vowels) != 0 && ((1 << l) & vowels) != 0 ? 1 : 0;
            prefix[i + 1] = prefix[i] + isVowel;
        }

        int[] res = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int l = queries[i][0], r = queries[i][1];
            res[i] = prefix[r + 1] - prefix[l];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> vowelStrings(vector<string>& words, vector<vector<int>>& queries) {
        int vowels = 0;
        for (char c : string("aeiou")) {
            vowels |= (1 << (c - 'a'));
        }

        int n = words.size();
        vector<int> prefix(n + 1);
        for (int i = 0; i < n; i++) {
            int f = words[i][0] - 'a';
            int l = words[i].back() - 'a';
            int isVowel = ((1 << f) & vowels) && ((1 << l) & vowels);
            prefix[i + 1] = prefix[i] + isVowel;
        }

        vector<int> res;
        for (auto& q : queries) {
            int l = q[0], r = q[1];
            res.push_back(prefix[r + 1] - prefix[l]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {number[][]} queries
     * @return {number[]}
     */
    vowelStrings(words, queries) {
        let vowels = 0;
        for (let c of 'aeiou') {
            vowels |= 1 << (c.charCodeAt(0) - 97);
        }

        const prefix = [0];
        for (let w of words) {
            const f = w.charCodeAt(0) - 97;
            const l = w.charCodeAt(w.length - 1) - 97;
            const isVowel = (1 << f) & vowels && (1 << l) & vowels ? 1 : 0;
            prefix.push(prefix[prefix.length - 1] + isVowel);
        }

        return queries.map(([l, r]) => prefix[r + 1] - prefix[l]);
    }
}
```

```csharp
public class Solution {
    public int[] VowelStrings(string[] words, int[][] queries) {
        int vowels = 0;
        foreach (char c in "aeiou") {
            vowels |= 1 << (c - 'a');
        }

        int[] prefix = new int[words.Length + 1];
        for (int i = 0; i < words.Length; i++) {
            int f = words[i][0] - 'a';
            int l = words[i][words[i].Length - 1] - 'a';
            int isVowel = ((1 << f) & vowels) != 0 && ((1 << l) & vowels) != 0 ? 1 : 0;
            prefix[i + 1] = prefix[i] + isVowel;
        }

        int[] res = new int[queries.Length];
        for (int i = 0; i < queries.Length; i++) {
            int l = queries[i][0], r = queries[i][1];
            res[i] = prefix[r + 1] - prefix[l];
        }

        return res;
    }
}
```

```go
func vowelStrings(words []string, queries [][]int) []int {
    vowels := 0
    for _, c := range "aeiou" {
        vowels |= 1 << (c - 'a')
    }

    n := len(words)
    prefix := make([]int, n+1)
    for i := 0; i < n; i++ {
        f := int(words[i][0] - 'a')
        l := int(words[i][len(words[i])-1] - 'a')
        isVowel := 0
        if (1<<f)&vowels != 0 && (1<<l)&vowels != 0 {
            isVowel = 1
        }
        prefix[i+1] = prefix[i] + isVowel
    }

    res := make([]int, len(queries))
    for i, q := range queries {
        l, r := q[0], q[1]
        res[i] = prefix[r+1] - prefix[l]
    }

    return res
}
```

```kotlin
class Solution {
    fun vowelStrings(words: Array<String>, queries: Array<IntArray>): IntArray {
        var vowels = 0
        for (c in "aeiou") {
            vowels = vowels or (1 shl (c - 'a'))
        }

        val prefix = IntArray(words.size + 1)
        for (i in words.indices) {
            val f = words[i][0] - 'a'
            val l = words[i].last() - 'a'
            val isVowel = if ((1 shl f) and vowels != 0 && (1 shl l) and vowels != 0) 1 else 0
            prefix[i + 1] = prefix[i] + isVowel
        }

        return IntArray(queries.size) { i ->
            val (lo, hi) = queries[i]
            prefix[hi + 1] - prefix[lo]
        }
    }
}
```

```swift
class Solution {
    func vowelStrings(_ words: [String], _ queries: [[Int]]) -> [Int] {
        var vowels = 0
        for c in "aeiou" {
            vowels |= 1 << (Int(c.asciiValue!) - 97)
        }

        var prefix = [0]
        for w in words {
            let f = Int(w.first!.asciiValue!) - 97
            let l = Int(w.last!.asciiValue!) - 97
            let isVowel = ((1 << f) & vowels != 0 && (1 << l) & vowels != 0) ? 1 : 0
            prefix.append(prefix.last! + isVowel)
        }

        return queries.map { q in
            let l = q[0], r = q[1]
            return prefix[r + 1] - prefix[l]
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the number of queries.

---

## Common Pitfalls

### Off-by-One Error in Prefix Sum Query

A classic mistake is using `prefix[r] - prefix[l]` instead of `prefix[r + 1] - prefix[l]`. The prefix array is 1-indexed to allow easy range queries, so the right endpoint needs the `+1` offset.

```python
# Incorrect - excludes the element at index r
res[i] = prefix[r] - prefix[l]

# Correct - includes the element at index r
res[i] = prefix[r + 1] - prefix[l]
```

### Checking Only First or Last Character

A vowel string must start AND end with a vowel. Checking only one condition will count words that should not be included.

```python
# Incorrect - only checks starting character
if words[i][0] in vowels:
    cnt += 1

# Correct - checks both first and last characters
if words[i][0] in vowels and words[i][-1] in vowels:
    cnt += 1
```

### Hardcoding Vowels Incorrectly

When using a bitmask or set for vowels, omitting one of the five vowels (a, e, i, o, u) leads to incorrect results. This is especially common when manually constructing the bitmask.

```python
# Incorrect - missing 'u'
vowels = set("aeio")

# Correct - all five vowels included
vowels = set("aeiou")
```
