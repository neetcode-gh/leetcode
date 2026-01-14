## 1. Brute Force

### Intuition

A string is consistent if every character in it appears in the `allowed` string. The straightforward approach is to check each word character by character. For each character, we scan through the `allowed` string to see if it exists. If any character is not found, the word is inconsistent.

### Algorithm

1. Initialize a counter `res` to `0`.
2. For each word in `words`:
   - Set a flag to `true` (assuming the word is consistent).
   - For each character in the word, check if it exists in `allowed` by scanning through `allowed`.
   - If any character is not found, set the flag to `false` and break out of the inner loop.
   - If the flag is still `true` after checking all characters, increment `res`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def countConsistentStrings(self, allowed: str, words: List[str]) -> int:
        res = 0

        for w in words:
            flag = 1
            for c in w:
                if c not in allowed:
                    flag = 0
                    break
            res += flag

        return res
```

```java
public class Solution {
    public int countConsistentStrings(String allowed, String[] words) {
        int res = 0;

        for (String w : words) {
            boolean flag = true;
            for (char c : w.toCharArray()) {
                if (allowed.indexOf(c) == -1) {
                    flag = false;
                    break;
                }
            }
            if (flag) res++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countConsistentStrings(string allowed, vector<string>& words) {
        int res = 0;

        for (string& w : words) {
            bool flag = true;
            for (char c : w) {
                if (allowed.find(c) == string::npos) {
                    flag = false;
                    break;
                }
            }
            res += flag;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} allowed
     * @param {string[]} words
     * @return {number}
     */
    countConsistentStrings(allowed, words) {
        let res = 0;

        for (let w of words) {
            let flag = 1;
            for (let c of w) {
                if (!allowed.includes(c)) {
                    flag = 0;
                    break;
                }
            }
            res += flag;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountConsistentStrings(string allowed, string[] words) {
        int res = 0;

        foreach (string w in words) {
            bool flag = true;
            foreach (char c in w) {
                if (!allowed.Contains(c)) {
                    flag = false;
                    break;
                }
            }
            if (flag) res++;
        }

        return res;
    }
}
```

```go
func countConsistentStrings(allowed string, words []string) int {
    res := 0

    for _, w := range words {
        flag := true
        for _, c := range w {
            if !strings.ContainsRune(allowed, c) {
                flag = false
                break
            }
        }
        if flag {
            res++
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countConsistentStrings(allowed: String, words: Array<String>): Int {
        var res = 0

        for (w in words) {
            var flag = true
            for (c in w) {
                if (c !in allowed) {
                    flag = false
                    break
                }
            }
            if (flag) res++
        }

        return res
    }
}
```

```swift
class Solution {
    func countConsistentStrings(_ allowed: String, _ words: [String]) -> Int {
        var res = 0

        for w in words {
            var flag = true
            for c in w {
                if !allowed.contains(c) {
                    flag = false
                    break
                }
            }
            if flag { res += 1 }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * l)$
- Space complexity: $O(1)$

> Where $n$ is the number of words, $m$ is the length of the string $allowed$, and $l$ is the length of the longest word.

---

## 2. Hash Set

### Intuition

The brute force approach is slow because we scan through `allowed` for every character lookup. We can speed this up by storing all allowed characters in a hash set, which provides O(1) average lookup time. Instead of counting consistent words, we can start with the total count and subtract whenever we find an inconsistent word.

### Algorithm

1. Convert `allowed` into a hash set for O(1) character lookups.
2. Initialize `res` to the total number of words.
3. For each word in `words`:
   - For each character in the word, check if it exists in the hash set.
   - If any character is not found, decrement `res` and break out of the inner loop.
4. Return `res`.

::tabs-start

```python
class Solution:
    def countConsistentStrings(self, allowed: str, words: List[str]) -> int:
        allowed = set(allowed)

        res = len(words)
        for w in words:
            for c in w:
                if c not in allowed:
                    res -= 1
                    break

        return res
```

```java
public class Solution {
    public int countConsistentStrings(String allowed, String[] words) {
        Set<Character> allowedSet = new HashSet<>();
        for (char c : allowed.toCharArray()) {
            allowedSet.add(c);
        }

        int res = words.length;
        for (String w : words) {
            for (char c : w.toCharArray()) {
                if (!allowedSet.contains(c)) {
                    res--;
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
    int countConsistentStrings(string allowed, vector<string>& words) {
        unordered_set<char> allowedSet(allowed.begin(), allowed.end());

        int res = words.size();
        for (string& w : words) {
            for (char c : w) {
                if (allowedSet.find(c) == allowedSet.end()) {
                    res--;
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
     * @param {string} allowed
     * @param {string[]} words
     * @return {number}
     */
    countConsistentStrings(allowed, words) {
        const allowedSet = new Set(allowed);
        let res = words.length;

        for (let w of words) {
            for (let c of w) {
                if (!allowedSet.has(c)) {
                    res--;
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
    public int CountConsistentStrings(string allowed, string[] words) {
        HashSet<char> allowedSet = new HashSet<char>(allowed);

        int res = words.Length;
        foreach (string w in words) {
            foreach (char c in w) {
                if (!allowedSet.Contains(c)) {
                    res--;
                    break;
                }
            }
        }

        return res;
    }
}
```

```go
func countConsistentStrings(allowed string, words []string) int {
    allowedSet := make(map[rune]bool)
    for _, c := range allowed {
        allowedSet[c] = true
    }

    res := len(words)
    for _, w := range words {
        for _, c := range w {
            if !allowedSet[c] {
                res--
                break
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countConsistentStrings(allowed: String, words: Array<String>): Int {
        val allowedSet = allowed.toSet()

        var res = words.size
        for (w in words) {
            for (c in w) {
                if (c !in allowedSet) {
                    res--
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
    func countConsistentStrings(_ allowed: String, _ words: [String]) -> Int {
        let allowedSet = Set(allowed)

        var res = words.count
        for w in words {
            for c in w {
                if !allowedSet.contains(c) {
                    res -= 1
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

- Time complexity: $O(n * l + m)$
- Space complexity: $O(m)$

> Where $n$ is the number of words, $m$ is the length of the string $allowed$, and $l$ is the length of the longest word.

---

## 3. Boolean Array

### Intuition

Since we are only dealing with lowercase English letters (26 characters), we can use a boolean array of size 26 instead of a hash set. Each index represents a letter (`'a' = 0`, `'b' = 1`, ..., `'z' = 25`). This provides the same O(1) lookup time as a hash set but with slightly better constant factors due to simpler memory access patterns.

### Algorithm

1. Create a boolean array of size 26, initialized to `false`.
2. For each character in `allowed`, mark the corresponding index as `true`.
3. Initialize `res` to the total number of words.
4. For each word in `words`:
   - For each character in the word, check if the corresponding index in the boolean array is `true`.
   - If any character maps to `false`, decrement `res` and break out of the inner loop.
5. Return `res`.

::tabs-start

```python
class Solution:
    def countConsistentStrings(self, allowed: str, words: List[str]) -> int:
        allowedArr = [False] * 26
        for c in allowed:
            allowedArr[ord(c) - ord('a')] = True

        res = len(words)
        for w in words:
            for c in w:
                if not allowedArr[ord(c) - ord('a')]:
                    res -= 1
                    break

        return res
```

```java
public class Solution {
    public int countConsistentStrings(String allowed, String[] words) {
        Set<Character> allowedSet = new HashSet<>();
        for (char c : allowed.toCharArray()) {
            allowedSet.add(c);
        }

        int res = words.length;
        for (String w : words) {
            for (char c : w.toCharArray()) {
                if (!allowedSet.contains(c)) {
                    res--;
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
    int countConsistentStrings(string allowed, vector<string>& words) {
        bool allowedArr[26] = {};
        for (char c : allowed) {
            allowedArr[c - 'a'] = true;
        }

        int res = words.size();
        for (const string& w : words) {
            for (char c : w) {
                if (!allowedArr[c - 'a']) {
                    res--;
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
     * @param {string} allowed
     * @param {string[]} words
     * @return {number}
     */
    countConsistentStrings(allowed, words) {
        const allowedArr = new Array(26).fill(false);
        for (let c of allowed) {
            allowedArr[c.charCodeAt(0) - 97] = true;
        }

        let res = words.length;
        for (let w of words) {
            for (let c of w) {
                if (!allowedArr[c.charCodeAt(0) - 97]) {
                    res--;
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
    public int CountConsistentStrings(string allowed, string[] words) {
        bool[] allowedArr = new bool[26];
        foreach (char c in allowed) {
            allowedArr[c - 'a'] = true;
        }

        int res = words.Length;
        foreach (string w in words) {
            foreach (char c in w) {
                if (!allowedArr[c - 'a']) {
                    res--;
                    break;
                }
            }
        }

        return res;
    }
}
```

```go
func countConsistentStrings(allowed string, words []string) int {
    allowedArr := make([]bool, 26)
    for _, c := range allowed {
        allowedArr[c-'a'] = true
    }

    res := len(words)
    for _, w := range words {
        for _, c := range w {
            if !allowedArr[c-'a'] {
                res--
                break
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countConsistentStrings(allowed: String, words: Array<String>): Int {
        val allowedArr = BooleanArray(26)
        for (c in allowed) {
            allowedArr[c - 'a'] = true
        }

        var res = words.size
        for (w in words) {
            for (c in w) {
                if (!allowedArr[c - 'a']) {
                    res--
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
    func countConsistentStrings(_ allowed: String, _ words: [String]) -> Int {
        var allowedArr = [Bool](repeating: false, count: 26)
        for c in allowed {
            allowedArr[Int(c.asciiValue!) - 97] = true
        }

        var res = words.count
        for w in words {
            for c in w {
                if !allowedArr[Int(c.asciiValue!) - 97] {
                    res -= 1
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

- Time complexity: $O(n * l + m)$
- Space complexity: $O(m)$

> Where $n$ is the number of words, $m$ is the length of the string $allowed$, and $l$ is the length of the longest word.

---

## 4. Bitmask

### Intuition

We can compress the boolean array into a single 32-bit integer using bit manipulation. Each bit position represents whether a character is allowed (bit `i` represents the character `'a' + i`). This approach uses constant space (just one integer) and leverages fast bitwise operations for lookups.

### Algorithm

1. Initialize a bitmask integer to `0`.
2. For each character in `allowed`, set the corresponding bit using OR operation: `bit_mask |= (1 << (char - 'a'))`.
3. Initialize `res` to the total number of words.
4. For each word in `words`:
   - For each character in the word, compute its bit position and check if that bit is set in the bitmask using AND operation.
   - If the result is `0` (bit not set), decrement `res` and break out of the inner loop.
5. Return `res`.

::tabs-start

```python
class Solution:
    def countConsistentStrings(self, allowed: str, words: List[str]) -> int:
        bit_mask = 0
        for c in allowed:
            bit = 1 << (ord(c) - ord('a'))
            bit_mask = bit_mask | bit

        res = len(words)
        for w in words:
            for c in w:
                bit = 1 << (ord(c) - ord('a'))
                if bit & bit_mask == 0:
                    res -= 1
                    break

        return res
```

```java
public class Solution {
    public int countConsistentStrings(String allowed, String[] words) {
        int bitMask = 0;
        for (char c : allowed.toCharArray()) {
            bitMask |= 1 << (c - 'a');
        }

        int res = words.length;
        for (String w : words) {
            for (char c : w.toCharArray()) {
                int bit = 1 << (c - 'a');
                if ((bit & bitMask) == 0) {
                    res--;
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
    int countConsistentStrings(string allowed, vector<string>& words) {
        int bitMask = 0;
        for (char c : allowed) {
            bitMask |= (1 << (c - 'a'));
        }

        int res = words.size();
        for (const string& w : words) {
            for (char c : w) {
                int bit = 1 << (c - 'a');
                if ((bit & bitMask) == 0) {
                    res--;
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
     * @param {string} allowed
     * @param {string[]} words
     * @return {number}
     */
    countConsistentStrings(allowed, words) {
        let bitMask = 0;
        for (let c of allowed) {
            bitMask |= 1 << (c.charCodeAt(0) - 97);
        }

        let res = words.length;
        for (let w of words) {
            for (let c of w) {
                const bit = 1 << (c.charCodeAt(0) - 97);
                if ((bit & bitMask) === 0) {
                    res--;
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
    public int CountConsistentStrings(string allowed, string[] words) {
        int bitMask = 0;
        foreach (char c in allowed) {
            bitMask |= 1 << (c - 'a');
        }

        int res = words.Length;
        foreach (string w in words) {
            foreach (char c in w) {
                int bit = 1 << (c - 'a');
                if ((bit & bitMask) == 0) {
                    res--;
                    break;
                }
            }
        }

        return res;
    }
}
```

```go
func countConsistentStrings(allowed string, words []string) int {
    bitMask := 0
    for _, c := range allowed {
        bitMask |= 1 << (c - 'a')
    }

    res := len(words)
    for _, w := range words {
        for _, c := range w {
            bit := 1 << (c - 'a')
            if bit&bitMask == 0 {
                res--
                break
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countConsistentStrings(allowed: String, words: Array<String>): Int {
        var bitMask = 0
        for (c in allowed) {
            bitMask = bitMask or (1 shl (c - 'a'))
        }

        var res = words.size
        for (w in words) {
            for (c in w) {
                val bit = 1 shl (c - 'a')
                if (bit and bitMask == 0) {
                    res--
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
    func countConsistentStrings(_ allowed: String, _ words: [String]) -> Int {
        var bitMask = 0
        for c in allowed {
            bitMask |= 1 << (Int(c.asciiValue!) - 97)
        }

        var res = words.count
        for w in words {
            for c in w {
                let bit = 1 << (Int(c.asciiValue!) - 97)
                if bit & bitMask == 0 {
                    res -= 1
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

- Time complexity: $O(n * l + m)$
- Space complexity: $O(1)$

> Where $n$ is the number of words, $m$ is the length of the string $allowed$, and $l$ is the length of the longest word.

---

## Common Pitfalls

### Forgetting to Break Early

When a word is found to be inconsistent, failing to break out of the inner loop wastes time checking remaining characters. This does not affect correctness but can significantly impact performance.

```python
# Incorrect - continues checking after finding invalid character
for c in w:
    if c not in allowed:
        flag = False
        # Missing break!

# Correct - exits immediately when inconsistent
for c in w:
    if c not in allowed:
        flag = False
        break
```

### Incorrect Bitmask Check

When using the bitmask approach, a common mistake is checking if the bit equals 1 instead of checking if it is non-zero. The bit position varies, so the result of the AND operation will be a power of 2, not necessarily 1.

```python
# Incorrect - bit & mask could be 2, 4, 8, etc., not 1
if (bit & bit_mask) == 1:
    res -= 1

# Correct - check if the result is zero
if (bit & bit_mask) == 0:
    res -= 1
```
