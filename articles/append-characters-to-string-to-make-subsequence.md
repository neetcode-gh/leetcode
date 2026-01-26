## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Two Pointers** - Used to traverse both strings simultaneously while matching characters
- **Subsequences** - Understanding what makes one string a subsequence of another
- **Greedy Algorithms** - Recognizing that matching characters from left to right is optimal

---

## 1. Two Pointers

### Intuition

To make `t` a subsequence of `s` by appending characters, we first need to figure out how much of `t` is already a subsequence of `s`. We can greedily match characters from `t` in `s` from left to right. Once we know how many characters of `t` we can match, the remaining characters must be appended.

The greedy approach works because matching earlier characters in `s` never hurts. If a character from `t` appears multiple times in `s`, taking the first occurrence leaves more room for matching subsequent characters.

### Algorithm

1. Use two pointers: `i` for string `s` and `j` for string `t`.
2. Iterate through `s`. Whenever `s[i]` matches `t[j]`, move both pointers forward. Otherwise, only advance `i`.
3. After scanning `s`, `j` represents how many characters of `t` are already matched.
4. Return `len(t) - j`, the number of characters that need to be appended to make the match.

::tabs-start

```python
class Solution:
    def appendCharacters(self, s: str, t: str) -> int:
        i, j = 0, 0

        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
                j += 1
            else:
                i += 1
        return len(t) - j
```

```java
public class Solution {
    public int appendCharacters(String s, String t) {
        int i = 0, j = 0;

        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
                j++;
            } else {
                i++;
            }
        }
        return t.length() - j;
    }
}
```

```cpp
class Solution {
public:
    int appendCharacters(string s, string t) {
        int i = 0, j = 0;

        while (i < s.length() && j < t.length()) {
            if (s[i] == t[j]) {
                i++;
                j++;
            } else {
                i++;
            }
        }
        return t.length() - j;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {number}
     */
    appendCharacters(s, t) {
        let i = 0,
            j = 0;

        while (i < s.length && j < t.length) {
            if (s[i] === t[j]) {
                i++;
                j++;
            } else {
                i++;
            }
        }
        return t.length - j;
    }
}
```

```csharp
public class Solution {
    public int AppendCharacters(string s, string t) {
        int i = 0, j = 0;

        while (i < s.Length && j < t.Length) {
            if (s[i] == t[j]) {
                i++;
                j++;
            } else {
                i++;
            }
        }

        return t.Length - j;
    }
}
```

```go
func appendCharacters(s string, t string) int {
    i, j := 0, 0

    for i < len(s) && j < len(t) {
        if s[i] == t[j] {
            i++
            j++
        } else {
            i++
        }
    }

    return len(t) - j
}
```

```kotlin
class Solution {
    fun appendCharacters(s: String, t: String): Int {
        var i = 0
        var j = 0

        while (i < s.length && j < t.length) {
            if (s[i] == t[j]) {
                i++
                j++
            } else {
                i++
            }
        }

        return t.length - j
    }
}
```

```swift
class Solution {
    func appendCharacters(_ s: String, _ t: String) -> Int {
        let sArr = Array(s)
        let tArr = Array(t)
        var i = 0, j = 0

        while i < sArr.count && j < tArr.count {
            if sArr[i] == tArr[j] {
                i += 1
                j += 1
            } else {
                i += 1
            }
        }

        return tArr.count - j
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ and $m$ are the lengths of the strings $s$ and $t$, respectively.

---

## 2. Index Jumping

### Intuition

The two-pointer approach scans `s` character by character, which can be slow if `s` is long and the characters we need are sparse. We can speed this up by precomputing where each character appears in `s`. For any position, we can instantly jump to the next occurrence of the character we need.

We build a table where `store[i][c]` tells us the nearest index at or after position `i` where character `c` appears. This lets us skip over irrelevant characters in constant time.

### Algorithm

1. Build a 2D array `store` where `store[i][c]` holds the first occurrence of character `c` at or after index `i` in `s`.
2. Fill this table by iterating backward through `s`. Each position inherits the next position's data, then updates the current character's entry.
3. Use two pointers `i` and `j` for `s` and `t`. For each character in `t`, use `store` to jump directly to its next occurrence in `s`.
4. If a character from `t` cannot be found (returns sentinel value), stop matching.
5. Return `len(t) - j`.

::tabs-start

```python
class Solution:
    def appendCharacters(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        store = [[n + 1] * 26 for _ in range(n)]
        store[n - 1][ord(s[n - 1]) - ord('a')] = n - 1

        for i in range(n - 2, -1, -1):
            store[i] = store[i + 1][:]
            store[i][ord(s[i]) - ord('a')] = i

        i, j = 0, 0
        while i < n and j < m:
            if store[i][ord(t[j]) - ord('a')] == n + 1:
                break

            i = store[i][ord(t[j]) - ord('a')] + 1
            j += 1

        return m - j
```

```java
public class Solution {
    public int appendCharacters(String s, String t) {
        int n = s.length(), m = t.length();
        int[][] store = new int[n][26];
        for (int[] row : store) {
            Arrays.fill(row, n + 1);
        }
        store[n - 1][s.charAt(n - 1) - 'a'] = n - 1;

        for (int i = n - 2; i >= 0; i--) {
            store[i] = store[i + 1].clone();
            store[i][s.charAt(i) - 'a'] = i;
        }

        int i = 0, j = 0;
        while (i < n && j < m) {
            if (store[i][t.charAt(j) - 'a'] == n + 1) {
                break;
            }
            i = store[i][t.charAt(j) - 'a'] + 1;
            j++;
        }

        return m - j;
    }
}
```

```cpp
class Solution {
public:
    int appendCharacters(string s, string t) {
        int n = s.length(), m = t.length();
        vector<vector<int>> store(n, vector<int>(26, n + 1));
        store[n - 1][s[n - 1] - 'a'] = n - 1;

        for (int i = n - 2; i >= 0; i--) {
            store[i] = store[i + 1];
            store[i][s[i] - 'a'] = i;
        }

        int i = 0, j = 0;
        while (i < n && j < m) {
            if (store[i][t[j] - 'a'] == n + 1) {
                break;
            }
            i = store[i][t[j] - 'a'] + 1;
            j++;
        }

        return m - j;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {number}
     */
    appendCharacters(s, t) {
        const n = s.length,
            m = t.length;
        const store = Array.from({ length: n }, () => Array(26).fill(n + 1));
        store[n - 1][s.charCodeAt(n - 1) - 97] = n - 1;

        for (let i = n - 2; i >= 0; i--) {
            store[i] = store[i + 1].slice();
            store[i][s.charCodeAt(i) - 97] = i;
        }

        let i = 0,
            j = 0;
        while (i < n && j < m) {
            if (store[i][t.charCodeAt(j) - 97] === n + 1) {
                break;
            }
            i = store[i][t.charCodeAt(j) - 97] + 1;
            j++;
        }

        return m - j;
    }
}
```

```csharp
public class Solution {
    public int AppendCharacters(string s, string t) {
        int n = s.Length, m = t.Length;
        int[,] store = new int[n, 26];

        for (int i = 0; i < n; i++) {
            for (int c = 0; c < 26; c++) {
                store[i, c] = n + 1;
            }
        }

        store[n - 1, s[n - 1] - 'a'] = n - 1;

        for (int i = n - 2; i >= 0; i--) {
            for (int c = 0; c < 26; c++) {
                store[i, c] = store[i + 1, c];
            }
            store[i, s[i] - 'a'] = i;
        }

        int iPtr = 0, jPtr = 0;
        while (iPtr < n && jPtr < m) {
            int idx = store[iPtr, t[jPtr] - 'a'];
            if (idx == n + 1) {
                break;
            }
            iPtr = idx + 1;
            jPtr++;
        }

        return m - jPtr;
    }
}
```

```go
func appendCharacters(s string, t string) int {
    n, m := len(s), len(t)

    store := make([][]int, n)
    for i := 0; i < n; i++ {
        store[i] = make([]int, 26)
        for c := 0; c < 26; c++ {
            store[i][c] = n + 1
        }
    }

    store[n-1][s[n-1]-'a'] = n - 1

    for i := n - 2; i >= 0; i-- {
        for c := 0; c < 26; c++ {
            store[i][c] = store[i+1][c]
        }
        store[i][s[i]-'a'] = i
    }

    i, j := 0, 0
    for i < n && j < m {
        idx := store[i][t[j]-'a']
        if idx == n+1 {
            break
        }
        i = idx + 1
        j++
    }

    return m - j
}
```

```kotlin
class Solution {
    fun appendCharacters(s: String, t: String): Int {
        val n = s.length
        val m = t.length
        val store = Array(n) { IntArray(26) { n + 1 } }
        store[n - 1][s[n - 1] - 'a'] = n - 1

        for (i in n - 2 downTo 0) {
            store[i] = store[i + 1].copyOf()
            store[i][s[i] - 'a'] = i
        }

        var i = 0
        var j = 0
        while (i < n && j < m) {
            val idx = store[i][t[j] - 'a']
            if (idx == n + 1) break
            i = idx + 1
            j++
        }

        return m - j
    }
}
```

```swift
class Solution {
    func appendCharacters(_ s: String, _ t: String) -> Int {
        let sArr = Array(s)
        let tArr = Array(t)
        let n = sArr.count
        let m = tArr.count

        var store = [[Int]](repeating: [Int](repeating: n + 1, count: 26), count: n)
        store[n - 1][Int(sArr[n - 1].asciiValue!) - 97] = n - 1

        for i in stride(from: n - 2, through: 0, by: -1) {
            store[i] = store[i + 1]
            store[i][Int(sArr[i].asciiValue!) - 97] = i
        }

        var i = 0, j = 0
        while i < n && j < m {
            let idx = store[i][Int(tArr[j].asciiValue!) - 97]
            if idx == n + 1 { break }
            i = idx + 1
            j += 1
        }

        return m - j
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ and $m$ are the lengths of the strings $s$ and $t$, respectively.

---

## Common Pitfalls

### Returning the Wrong Value After Matching
The result should be the number of unmatched characters in `t`, not the number of matched characters. After the loop, `j` represents how many characters were matched, so you need to return `len(t) - j`, not `j`.
```python
# Wrong: returning matched count
return j  # Returns how many matched, not how many to append

# Correct: return remaining characters
return len(t) - j
```

### Advancing Both Pointers on Mismatch
When characters do not match, only the pointer for `s` should advance. The pointer for `t` should stay in place waiting for its character to appear later in `s`. Advancing both pointers skips characters in `t` that might match later.
```python
# Wrong: advancing both pointers
if s[i] != t[j]:
    i += 1
    j += 1  # Skips a character in t that might match later

# Correct: only advance s pointer
if s[i] != t[j]:
    i += 1
```
