## 1. Two Pointers - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$ for the output string.

> Where $n$ and $m$ are the lengths of the strings $word1$ and $word2$ respectively.

---

## 2. Two Pointers - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$ for the output string.

> Where $n$ and $m$ are the lengths of the strings $word1$ and $word2$ respectively.

---

## 3. One Pointer

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$ for the output string.

> Where $n$ and $m$ are the lengths of the strings $word1$ and $word2$ respectively.
