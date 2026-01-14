## 1. Two Pointers - I

### Intuition

We want to interleave characters from both strings, taking one from each in turn. Using two pointers, we can walk through both strings simultaneously. While both strings have characters remaining, we append one from each. Once one string is exhausted, we append whatever remains from the other string.

### Algorithm

1. Initialize two pointers `i` and `j` at `0`, and an empty result list.
2. While both `i < len(word1)` and `j < len(word2)`:
   - Append `word1[i]` to the result, then increment `i`.
   - Append `word2[j]` to the result, then increment `j`.
3. Append any remaining characters from `word1` (from index `i` to end).
4. Append any remaining characters from `word2` (from index `j` to end).
5. Return the joined result string.

::tabs-start

```python
class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        i, j = 0, 0
        res = []
        while i < len(word1) and j < len(word2):
            res.append(word1[i])
            res.append(word2[j])
            i += 1
            j += 1
        res.append(word1[i:])
        res.append(word2[j:])
        return "".join(res)
```

```java
public class Solution {
    public String mergeAlternately(String word1, String word2) {
        StringBuilder res = new StringBuilder();
        int i = 0, j = 0;
        while (i < word1.length() && j < word2.length()) {
            res.append(word1.charAt(i++));
            res.append(word2.charAt(j++));
        }
        res.append(word1.substring(i));
        res.append(word2.substring(j));
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string mergeAlternately(string word1, string word2) {
        string res;
        int i = 0, j = 0;
        while (i < word1.size() && j < word2.size()) {
            res += word1[i++];
            res += word2[j++];
        }
        res += word1.substr(i);
        res += word2.substr(j);
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} word1
     * @param {string} word2
     * @return {string}
     */
    mergeAlternately(word1, word2) {
        let res = [];
        let i = 0,
            j = 0;
        while (i < word1.length && j < word2.length) {
            res.push(word1[i++], word2[j++]);
        }
        res.push(word1.slice(i));
        res.push(word2.slice(j));
        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string MergeAlternately(string word1, string word2) {
        int i = 0, j = 0;
        StringBuilder res = new StringBuilder();

        while (i < word1.Length && j < word2.Length) {
            res.Append(word1[i]);
            res.Append(word2[j]);
            i++;
            j++;
        }

        res.Append(word1.Substring(i));
        res.Append(word2.Substring(j));

        return res.ToString();
    }
}
```

```go
func mergeAlternately(word1 string, word2 string) string {
    var res strings.Builder
    i, j := 0, 0

    for i < len(word1) && j < len(word2) {
        res.WriteByte(word1[i])
        res.WriteByte(word2[j])
        i++
        j++
    }

    res.WriteString(word1[i:])
    res.WriteString(word2[j:])

    return res.String()
}
```

```kotlin
class Solution {
    fun mergeAlternately(word1: String, word2: String): String {
        val res = StringBuilder()
        var i = 0
        var j = 0

        while (i < word1.length && j < word2.length) {
            res.append(word1[i++])
            res.append(word2[j++])
        }

        res.append(word1.substring(i))
        res.append(word2.substring(j))

        return res.toString()
    }
}
```

```swift
class Solution {
    func mergeAlternately(_ word1: String, _ word2: String) -> String {
        var res = ""
        let arr1 = Array(word1)
        let arr2 = Array(word2)
        var i = 0, j = 0

        while i < arr1.count && j < arr2.count {
            res.append(arr1[i])
            res.append(arr2[j])
            i += 1
            j += 1
        }

        res.append(contentsOf: arr1[i...])
        res.append(contentsOf: arr2[j...])

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$ for the output string.

> Where $n$ and $m$ are the lengths of the strings $word1$ and $word2$ respectively.

---

## 2. Two Pointers - II

### Intuition

Instead of handling the remaining characters separately after the main loop, we can continue the loop as long as either string has characters left. In each iteration, we check if each pointer is still valid before appending. This approach handles unequal length strings naturally within a single loop.

### Algorithm

1. Initialize two pointers `i` and `j` at `0`, and an empty result list.
2. While `i < n` or `j < m` (where `n` and `m` are the lengths of the strings):
   - If `i < n`, append `word1[i]` and increment `i`.
   - If `j < m`, append `word2[j]` and increment `j`.
3. Return the joined result string.

::tabs-start

```python
class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        n, m = len(word1), len(word2)
        res = []
        i = j = 0
        while i < n or j < m:
            if i < n:
                res.append(word1[i])
            if j < m:
                res.append(word2[j])
            i += 1
            j += 1
        return "".join(res)
```

```java
public class Solution {
    public String mergeAlternately(String word1, String word2) {
        int n = word1.length(), m = word2.length();
        StringBuilder res = new StringBuilder();
        int i = 0, j = 0;
        while (i < n || j < m) {
            if (i < n) res.append(word1.charAt(i++));
            if (j < m) res.append(word2.charAt(j++));
        }
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string mergeAlternately(string word1, string word2) {
        int n = word1.size(), m = word2.size();
        string res;
        int i = 0, j = 0;
        while (i < n || j < m) {
            if (i < n) res += word1[i++];
            if (j < m) res += word2[j++];
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} word1
     * @param {string} word2
     * @return {string}
     */
    mergeAlternately(word1, word2) {
        const n = word1.length,
            m = word2.length;
        const res = [];
        let i = 0,
            j = 0;
        while (i < n || j < m) {
            if (i < n) res.push(word1[i++]);
            if (j < m) res.push(word2[j++]);
        }
        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string MergeAlternately(string word1, string word2) {
        int n = word1.Length, m = word2.Length;
        int i = 0, j = 0;
        StringBuilder res = new StringBuilder();

        while (i < n || j < m) {
            if (i < n) {
                res.Append(word1[i]);
            }
            if (j < m) {
                res.Append(word2[j]);
            }
            i++;
            j++;
        }

        return res.ToString();
    }
}
```

```go
func mergeAlternately(word1 string, word2 string) string {
    n, m := len(word1), len(word2)
    var res strings.Builder
    i, j := 0, 0

    for i < n || j < m {
        if i < n {
            res.WriteByte(word1[i])
            i++
        }
        if j < m {
            res.WriteByte(word2[j])
            j++
        }
    }

    return res.String()
}
```

```kotlin
class Solution {
    fun mergeAlternately(word1: String, word2: String): String {
        val n = word1.length
        val m = word2.length
        val res = StringBuilder()
        var i = 0
        var j = 0

        while (i < n || j < m) {
            if (i < n) res.append(word1[i++])
            if (j < m) res.append(word2[j++])
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func mergeAlternately(_ word1: String, _ word2: String) -> String {
        let arr1 = Array(word1)
        let arr2 = Array(word2)
        let n = arr1.count, m = arr2.count
        var res = ""
        var i = 0, j = 0

        while i < n || j < m {
            if i < n {
                res.append(arr1[i])
                i += 1
            }
            if j < m {
                res.append(arr2[j])
                j += 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$ for the output string.

> Where $n$ and $m$ are the lengths of the strings $word1$ and $word2$ respectively.

---

## 3. One Pointer

### Intuition

Since we always process characters at the same index from both strings in each iteration, we can simplify to a single index variable. We iterate up to the length of the longer string, and for each index, we add the character from each string if that index is valid.

### Algorithm

1. Let `n` and `m` be the lengths of `word1` and `word2`.
2. Initialize an empty result list.
3. For each index `i` from `0` to `max(n, m) - 1`:
   - If `i < n`, append `word1[i]` to the result.
   - If `i < m`, append `word2[i]` to the result.
4. Return the joined result string.

::tabs-start

```python
class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        n, m = len(word1), len(word2)
        res = []
        for i in range(max(m, n)):
            if i < n:
                res.append(word1[i])
            if i < m:
                res.append(word2[i])
        return "".join(res)
```

```java
public class Solution {
    public String mergeAlternately(String word1, String word2) {
        int n = word1.length(), m = word2.length();
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < n || i < m; i++) {
            if (i < n) {
                res.append(word1.charAt(i));
            }
            if (i < m) {
                res.append(word2.charAt(i));
            }
        }
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string mergeAlternately(string word1, string word2) {
        int n = word1.size(), m = word2.size();
        string res;
        for (int i = 0; i < n || i < m; i++) {
            if (i < n) {
                res += word1[i];
            }
            if (i < m) {
                res += word2[i];
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} word1
     * @param {string} word2
     * @return {string}
     */
    mergeAlternately(word1, word2) {
        const n = word1.length,
            m = word2.length;
        const res = [];
        for (let i = 0; i < m || i < n; i++) {
            if (i < n) {
                res.push(word1.charAt(i));
            }
            if (i < m) {
                res.push(word2.charAt(i));
            }
        }
        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string MergeAlternately(string word1, string word2) {
        int n = word1.Length, m = word2.Length;
        StringBuilder res = new StringBuilder();

        for (int i = 0; i < Math.Max(n, m); i++) {
            if (i < n) {
                res.Append(word1[i]);
            }
            if (i < m) {
                res.Append(word2[i]);
            }
        }

        return res.ToString();
    }
}
```

```go
func mergeAlternately(word1 string, word2 string) string {
    n, m := len(word1), len(word2)
    var res strings.Builder

    maxLen := n
    if m > maxLen {
        maxLen = m
    }

    for i := 0; i < maxLen; i++ {
        if i < n {
            res.WriteByte(word1[i])
        }
        if i < m {
            res.WriteByte(word2[i])
        }
    }

    return res.String()
}
```

```kotlin
class Solution {
    fun mergeAlternately(word1: String, word2: String): String {
        val n = word1.length
        val m = word2.length
        val res = StringBuilder()

        for (i in 0 until maxOf(n, m)) {
            if (i < n) res.append(word1[i])
            if (i < m) res.append(word2[i])
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func mergeAlternately(_ word1: String, _ word2: String) -> String {
        let arr1 = Array(word1)
        let arr2 = Array(word2)
        let n = arr1.count, m = arr2.count
        var res = ""

        for i in 0..<max(n, m) {
            if i < n {
                res.append(arr1[i])
            }
            if i < m {
                res.append(arr2[i])
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$ for the output string.

> Where $n$ and $m$ are the lengths of the strings $word1$ and $word2$ respectively.

---

## Common Pitfalls

### Forgetting to Append the Remaining Characters

When one string is longer than the other, the remaining characters must be appended after the alternating portion is complete. Stopping the loop when the shorter string ends without handling the leftover characters produces an incomplete result.

### Using String Concatenation in a Loop

In many languages, repeatedly concatenating strings with `+` inside a loop creates a new string object each time, leading to O(n^2) time complexity. Use a `StringBuilder`, list of characters, or similar efficient structure to build the result, then join at the end.
