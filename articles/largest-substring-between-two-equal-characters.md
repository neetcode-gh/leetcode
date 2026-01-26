## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps** - Storing and retrieving key-value pairs in O(1) time for tracking character indices
- **String Traversal** - Iterating through characters in a string with their indices
- **Array as Map** - Using a fixed-size array as an efficient alternative to hash maps when keys are bounded (e.g., 26 lowercase letters)

---

## 1. Brute Force

### Intuition

We need to find two equal characters and maximize the number of characters between them. The straightforward approach checks every pair of indices to see if they contain the same character, then computes the distance between them.

### Algorithm

1. Initialize result to `-1` (returned if no matching pair exists).
2. For each index `i`, iterate through all indices `j > i`.
3. If `s[i] == s[j]`, compute the substring length as `j - i - 1`.
4. Update the result with the maximum length found.
5. Return the result.

::tabs-start

```python
class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        n = len(s)
        res = -1

        for i in range(n):
            for j in range(i + 1, n):
                if s[i] == s[j]:
                    res = max(res, j - i - 1)
        return res
```

```java
public class Solution {
    public int maxLengthBetweenEqualCharacters(String s) {
        int n = s.length();
        int res = -1;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    res = Math.max(res, j - i - 1);
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
    int maxLengthBetweenEqualCharacters(string s) {
        int n = s.size();
        int res = -1;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (s[i] == s[j]) {
                    res = max(res, j - i - 1);
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
     * @param {string} s
     * @return {number}
     */
    maxLengthBetweenEqualCharacters(s) {
        const n = s.length;
        let res = -1;

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (s[i] === s[j]) {
                    res = Math.max(res, j - i - 1);
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxLengthBetweenEqualCharacters(string s) {
        int n = s.Length;
        int res = -1;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (s[i] == s[j]) {
                    res = Math.Max(res, j - i - 1);
                }
            }
        }
        return res;
    }
}
```

```go
func maxLengthBetweenEqualCharacters(s string) int {
    n := len(s)
    res := -1

    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if s[i] == s[j] {
                if j-i-1 > res {
                    res = j - i - 1
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxLengthBetweenEqualCharacters(s: String): Int {
        val n = s.length
        var res = -1

        for (i in 0 until n) {
            for (j in i + 1 until n) {
                if (s[i] == s[j]) {
                    res = maxOf(res, j - i - 1)
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxLengthBetweenEqualCharacters(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var res = -1

        for i in 0..<n {
            for j in (i + 1)..<n {
                if chars[i] == chars[j] {
                    res = max(res, j - i - 1)
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. First And Last Index

### Intuition

To maximize the distance between two equal characters, we want the first occurrence and the last occurrence of each character. By recording both indices for every character, we can compute the maximum span in a single pass through the string, followed by a pass through the recorded data.

### Algorithm

1. Create two maps: one for the first index of each character, one for the last index.
2. Iterate through the string:
   - If the character has not been seen, record its first index.
   - Otherwise, update its last index.
3. For each character that has both a first and last index, compute the distance and track the maximum.
4. Return the maximum distance found.

::tabs-start

```python
class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        res = -1
        firstIdx = {}
        lastIdx = {}

        for i, c in enumerate(s):
            if c not in firstIdx:
                firstIdx[c] = i
            else:
                lastIdx[c] = i

        for c in lastIdx:
            res = max(res, lastIdx[c] - firstIdx[c] - 1)

        return res
```

```java
public class Solution {
    public int maxLengthBetweenEqualCharacters(String s) {
        Map<Character, Integer> firstIdx = new HashMap<>();
        Map<Character, Integer> lastIdx = new HashMap<>();
        int res = -1;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (!firstIdx.containsKey(c)) {
                firstIdx.put(c, i);
            } else {
                lastIdx.put(c, i);
            }
        }

        for (char c : lastIdx.keySet()) {
            res = Math.max(res, lastIdx.get(c) - firstIdx.get(c) - 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLengthBetweenEqualCharacters(string s) {
        unordered_map<char, int> firstIdx, lastIdx;
        int res = -1;

        for (int i = 0; i < s.size(); i++) {
            if (firstIdx.find(s[i]) == firstIdx.end()) {
                firstIdx[s[i]] = i;
            } else {
                lastIdx[s[i]] = i;
            }
        }

        for (auto& [c, idx] : lastIdx) {
            res = max(res, lastIdx[c] - firstIdx[c] - 1);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxLengthBetweenEqualCharacters(s) {
        const firstIdx = new Map();
        const lastIdx = new Map();
        let res = -1;

        for (let i = 0; i < s.length; i++) {
            if (!firstIdx.has(s[i])) {
                firstIdx.set(s[i], i);
            } else {
                lastIdx.set(s[i], i);
            }
        }

        for (const [char, idx] of lastIdx) {
            res = Math.max(res, lastIdx.get(char) - firstIdx.get(char) - 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxLengthBetweenEqualCharacters(string s) {
        Dictionary<char, int> firstIdx = new Dictionary<char, int>();
        Dictionary<char, int> lastIdx = new Dictionary<char, int>();
        int res = -1;

        for (int i = 0; i < s.Length; i++) {
            char c = s[i];
            if (!firstIdx.ContainsKey(c)) {
                firstIdx[c] = i;
            } else {
                lastIdx[c] = i;
            }
        }

        foreach (char c in lastIdx.Keys) {
            res = Math.Max(res, lastIdx[c] - firstIdx[c] - 1);
        }

        return res;
    }
}
```

```go
func maxLengthBetweenEqualCharacters(s string) int {
    firstIdx := make(map[byte]int)
    lastIdx := make(map[byte]int)
    res := -1

    for i := 0; i < len(s); i++ {
        c := s[i]
        if _, ok := firstIdx[c]; !ok {
            firstIdx[c] = i
        } else {
            lastIdx[c] = i
        }
    }

    for c := range lastIdx {
        if lastIdx[c]-firstIdx[c]-1 > res {
            res = lastIdx[c] - firstIdx[c] - 1
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxLengthBetweenEqualCharacters(s: String): Int {
        val firstIdx = mutableMapOf<Char, Int>()
        val lastIdx = mutableMapOf<Char, Int>()
        var res = -1

        for (i in s.indices) {
            val c = s[i]
            if (c !in firstIdx) {
                firstIdx[c] = i
            } else {
                lastIdx[c] = i
            }
        }

        for (c in lastIdx.keys) {
            res = maxOf(res, lastIdx[c]!! - firstIdx[c]!! - 1)
        }

        return res
    }
}
```

```swift
class Solution {
    func maxLengthBetweenEqualCharacters(_ s: String) -> Int {
        var firstIdx = [Character: Int]()
        var lastIdx = [Character: Int]()
        var res = -1

        for (i, c) in s.enumerated() {
            if firstIdx[c] == nil {
                firstIdx[c] = i
            } else {
                lastIdx[c] = i
            }
        }

        for c in lastIdx.keys {
            res = max(res, lastIdx[c]! - firstIdx[c]! - 1)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 3. First Index (Hash Map)

### Intuition

We only need to track the first occurrence of each character. As we encounter a character again, we can immediately compute the distance from its first occurrence. This approach uses a single hash map and computes the answer in one pass.

### Algorithm

1. Create a hash map to store the first index of each character.
2. Iterate through the string:
   - If the character exists in the map, compute the distance from its first index and update the maximum.
   - Otherwise, store the current index as the first occurrence.
3. Return the maximum distance found.

::tabs-start

```python
class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        char_index = {}  # char -> first index
        res = -1

        for i, c in enumerate(s):
            if c in char_index:
                res = max(res, i - char_index[c] - 1)
            else:
                char_index[c] = i

        return res
```

```java
public class Solution {
    public int maxLengthBetweenEqualCharacters(String s) {
        Map<Character, Integer> charIndex = new HashMap<>();
        int res = -1;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (charIndex.containsKey(c)) {
                res = Math.max(res, i - charIndex.get(c) - 1);
            } else {
                charIndex.put(c, i);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLengthBetweenEqualCharacters(string s) {
        unordered_map<char, int> charIndex;
        int res = -1;

        for (int i = 0; i < s.size(); i++) {
            if (charIndex.find(s[i]) != charIndex.end()) {
                res = max(res, i - charIndex[s[i]] - 1);
            } else {
                charIndex[s[i]] = i;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxLengthBetweenEqualCharacters(s) {
        const charIndex = new Map();
        let res = -1;

        for (let i = 0; i < s.length; i++) {
            if (charIndex.has(s[i])) {
                res = Math.max(res, i - charIndex.get(s[i]) - 1);
            } else {
                charIndex.set(s[i], i);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxLengthBetweenEqualCharacters(string s) {
        Dictionary<char, int> charIndex = new Dictionary<char, int>();
        int res = -1;

        for (int i = 0; i < s.Length; i++) {
            char c = s[i];
            if (charIndex.ContainsKey(c)) {
                res = Math.Max(res, i - charIndex[c] - 1);
            } else {
                charIndex[c] = i;
            }
        }

        return res;
    }
}
```

```go
func maxLengthBetweenEqualCharacters(s string) int {
    charIndex := make(map[byte]int)
    res := -1

    for i := 0; i < len(s); i++ {
        c := s[i]
        if idx, ok := charIndex[c]; ok {
            if i-idx-1 > res {
                res = i - idx - 1
            }
        } else {
            charIndex[c] = i
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxLengthBetweenEqualCharacters(s: String): Int {
        val charIndex = mutableMapOf<Char, Int>()
        var res = -1

        for (i in s.indices) {
            val c = s[i]
            if (c in charIndex) {
                res = maxOf(res, i - charIndex[c]!! - 1)
            } else {
                charIndex[c] = i
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maxLengthBetweenEqualCharacters(_ s: String) -> Int {
        var charIndex = [Character: Int]()
        var res = -1

        for (i, c) in s.enumerated() {
            if let idx = charIndex[c] {
                res = max(res, i - idx - 1)
            } else {
                charIndex[c] = i
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 4. First Index (Array)

### Intuition

Since the input contains only lowercase letters, we can replace the hash map with a fixed-size array of `26` elements. This provides constant-time lookups and slightly better cache performance.

### Algorithm

1. Create an array of size `26`, initialized to `-1` (indicating unseen characters).
2. Iterate through the string:
   - Convert the character to an index (`0-25`).
   - If the index has been seen (value is not `-1`), compute the distance and update the maximum.
   - Otherwise, store the current position as the first occurrence.
3. Return the maximum distance found.

::tabs-start

```python
class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        firstIdx = [-1] * 26
        res = -1

        for i, c in enumerate(s):
            j = ord(c) - ord('a')
            if firstIdx[j] != -1:
                res = max(res, i - firstIdx[j] - 1)
            else:
                firstIdx[j] = i

        return res
```

```java
public class Solution {
    public int maxLengthBetweenEqualCharacters(String s) {
        int[] firstIdx = new int[26];
        for (int i = 0; i < 26; i++) {
            firstIdx[i] = -1;
        }
        int res = -1;

        for (int i = 0; i < s.length(); i++) {
            int j = s.charAt(i) - 'a';
            if (firstIdx[j] != -1) {
                res = Math.max(res, i - firstIdx[j] - 1);
            } else {
                firstIdx[j] = i;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLengthBetweenEqualCharacters(string s) {
        int firstIdx[26];
        fill(begin(firstIdx), end(firstIdx), -1);
        int res = -1;

        for (int i = 0; i < s.size(); i++) {
            int j = s[i] - 'a';
            if (firstIdx[j] != -1) {
                res = max(res, i - firstIdx[j] - 1);
            } else {
                firstIdx[j] = i;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxLengthBetweenEqualCharacters(s) {
        const firstIdx = Array(26).fill(-1);
        let res = -1;

        for (let i = 0; i < s.length; i++) {
            const j = s.charCodeAt(i) - 'a'.charCodeAt(0);
            if (firstIdx[j] !== -1) {
                res = Math.max(res, i - firstIdx[j] - 1);
            } else {
                firstIdx[j] = i;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxLengthBetweenEqualCharacters(string s) {
        int[] firstIdx = new int[26];
        Array.Fill(firstIdx, -1);
        int res = -1;

        for (int i = 0; i < s.Length; i++) {
            int j = s[i] - 'a';
            if (firstIdx[j] != -1) {
                res = Math.Max(res, i - firstIdx[j] - 1);
            } else {
                firstIdx[j] = i;
            }
        }

        return res;
    }
}
```

```go
func maxLengthBetweenEqualCharacters(s string) int {
    firstIdx := make([]int, 26)
    for i := range firstIdx {
        firstIdx[i] = -1
    }
    res := -1

    for i := 0; i < len(s); i++ {
        j := int(s[i] - 'a')
        if firstIdx[j] != -1 {
            if i-firstIdx[j]-1 > res {
                res = i - firstIdx[j] - 1
            }
        } else {
            firstIdx[j] = i
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxLengthBetweenEqualCharacters(s: String): Int {
        val firstIdx = IntArray(26) { -1 }
        var res = -1

        for (i in s.indices) {
            val j = s[i] - 'a'
            if (firstIdx[j] != -1) {
                res = maxOf(res, i - firstIdx[j] - 1)
            } else {
                firstIdx[j] = i
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maxLengthBetweenEqualCharacters(_ s: String) -> Int {
        var firstIdx = [Int](repeating: -1, count: 26)
        var res = -1
        let aAscii = Character("a").asciiValue!

        for (i, c) in s.enumerated() {
            let j = Int(c.asciiValue! - aAscii)
            if firstIdx[j] != -1 {
                res = max(res, i - firstIdx[j] - 1)
            } else {
                firstIdx[j] = i
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## Common Pitfalls

### Off-by-One in Substring Length

The substring between two equal characters at indices `i` and `j` has length `j - i - 1`, not `j - i`. Using `j - i` includes one of the boundary characters in the count, giving an answer that is one larger than correct.

### Returning Wrong Default Value

When no two equal characters exist in the string, the answer should be `-1`. A common mistake is to initialize the result to `0` and forget to handle the case where no matching pair is found, incorrectly returning `0` instead of `-1`.
