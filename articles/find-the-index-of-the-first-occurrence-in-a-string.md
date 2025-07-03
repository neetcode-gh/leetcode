## 1. Brute Force

::tabs-start

```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        n, m = len(haystack), len(needle)
        for i in range(n - m + 1):
            j = 0
            while j < m:
                if haystack[i + j] != needle[j]:
                    break
                j += 1
            if j == m:
                return i
        return -1
```

```java
public class Solution {
    public int strStr(String haystack, String needle) {
        int n = haystack.length(), m = needle.length();
        for (int i = 0; i < n - m + 1; i++) {
            int j = 0;
            while (j < m) {
                if (haystack.charAt(i + j) != needle.charAt(j)) {
                    break;
                }
                j++;
            }
            if (j == m) return i;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int strStr(string haystack, string needle) {
        int n = haystack.length(), m = needle.length();
        for (int i = 0; i < n - m + 1; i++) {
            int j = 0;
            while (j < m) {
                if (haystack[i + j] != needle[j]) {
                    break;
                }
                j++;
            }
            if (j == m) return i;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} haystack
     * @param {string} needle
     * @return {number}
     */
    strStr(haystack, needle) {
        let n = haystack.length,
            m = needle.length;
        for (let i = 0; i < n - m + 1; i++) {
            let j = 0;
            while (j < m) {
                if (haystack[i + j] !== needle[j]) {
                    break;
                }
                j++;
            }
            if (j === m) return i;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int StrStr(string haystack, string needle) {
        int n = haystack.Length, m = needle.Length;
        for (int i = 0; i <= n - m; i++) {
            int j = 0;
            while (j < m) {
                if (haystack[i + j] != needle[j]) {
                    break;
                }
                j++;
            }
            if (j == m) {
                return i;
            }
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the string $heystack$ and $m$ is the length of the string $needle$.

---

## 2. Knuth-Morris-Pratt (KMP) Algorithm

::tabs-start

```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if needle == "": return 0
        lps = [0] * len(needle)

        prevLPS, i = 0, 1
        while i < len(needle):
            if needle[i] == needle[prevLPS]:
                lps[i] = prevLPS + 1
                prevLPS += 1
                i += 1
            elif prevLPS == 0:
                lps[i] = 0
                i += 1
            else:
                prevLPS = lps[prevLPS - 1]

        i = 0  # ptr for haystack
        j = 0  # ptr for needle
        while i < len(haystack):
            if haystack[i] == needle[j]:
                i, j = i + 1, j + 1
            else:
                if j == 0:
                    i += 1
                else:
                    j = lps[j - 1]

            if j == len(needle):
                return i - len(needle)

        return -1
```

```java
public class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;

        int m = needle.length();
        int[] lps = new int[m];
        int prevLPS = 0, i = 1;

        while (i < m) {
            if (needle.charAt(i) == needle.charAt(prevLPS)) {
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

        i = 0;  // ptr for haystack
        int j = 0;  // ptr for needle
        while (i < haystack.length()) {
            if (haystack.charAt(i) == needle.charAt(j)) {
                i++;
                j++;
            } else {
                if (j == 0) {
                    i++;
                } else {
                    j = lps[j - 1];
                }
            }

            if (j == m) {
                return i - m;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int strStr(string haystack, string needle) {
        if (needle.empty()) return 0;

        int m = needle.size();
        vector<int> lps(m, 0);
        int prevLPS = 0, i = 1;

        while (i < m) {
            if (needle[i] == needle[prevLPS]) {
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

        i = 0;  // ptr for haystack
        int j = 0;  // ptr for needle
        while (i < haystack.size()) {
            if (haystack[i] == needle[j]) {
                i++;
                j++;
            } else {
                if (j == 0) {
                    i++;
                } else {
                    j = lps[j - 1];
                }
            }

            if (j == m) {
                return i - m;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} haystack
     * @param {string} needle
     * @return {number}
     */
    strStr(haystack, needle) {
        if (needle === '') return 0;

        const m = needle.length;
        const lps = new Array(m).fill(0);

        let prevLPS = 0,
            i = 1;
        while (i < m) {
            if (needle[i] === needle[prevLPS]) {
                lps[i] = prevLPS + 1;
                prevLPS++;
                i++;
            } else if (prevLPS === 0) {
                lps[i] = 0;
                i++;
            } else {
                prevLPS = lps[prevLPS - 1];
            }
        }

        i = 0; // ptr for haystack
        let j = 0; // ptr for needle
        while (i < haystack.length) {
            if (haystack[i] === needle[j]) {
                i++;
                j++;
            } else {
                if (j === 0) {
                    i++;
                } else {
                    j = lps[j - 1];
                }
            }

            if (j === m) {
                return i - m;
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int StrStr(string haystack, string needle) {
        if (needle == "") return 0;

        int[] lps = new int[needle.Length];
        int prevLPS = 0, i = 1;

        while (i < needle.Length) {
            if (needle[i] == needle[prevLPS]) {
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

        while (i < haystack.Length) {
            if (haystack[i] == needle[j]) {
                i++;
                j++;
            } else {
                if (j == 0) {
                    i++;
                } else {
                    j = lps[j - 1];
                }
            }

            if (j == needle.Length) {
                return i - needle.Length;
            }
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $heystack$ and $m$ is the length of the string $needle$.

---

## 3. Z-Algorithm

::tabs-start

```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if not needle:
            return 0

        s = needle + "$" + haystack
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

        for i in range(len(needle) + 1, n):
            if z[i] == len(needle):
                return i - len(needle) - 1

        return -1
```

```java
public class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;

        String s = needle + "$" + haystack;
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

        for (int i = needle.length() + 1; i < n; i++) {
            if (z[i] == needle.length()) {
                return i - needle.length() - 1;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int strStr(string haystack, string needle) {
        if (needle.empty()) return 0;

        string s = needle + "$" + haystack;
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

        for (int i = needle.size() + 1; i < n; i++) {
            if (z[i] == needle.size()) {
                return i - needle.size() - 1;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} haystack
     * @param {string} needle
     * @return {number}
     */
    strStr(haystack, needle) {
        if (needle === '') return 0;

        const s = needle + '$' + haystack;
        const n = s.length;
        const z = new Array(n).fill(0);
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

        for (let i = needle.length + 1; i < n; i++) {
            if (z[i] === needle.length) {
                return i - needle.length - 1;
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int StrStr(string haystack, string needle) {
        if (string.IsNullOrEmpty(needle)) return 0;

        string s = needle + "$" + haystack;
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

        int m = needle.Length;
        for (int i = m + 1; i < n; i++) {
            if (z[i] == m) {
                return i - m - 1;
            }
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the length of the string $heystack$ and $m$ is the length of the string $needle$.

---

## 4. Rabin-Karp Algorithm (Rolling Hash)

::tabs-start

```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if not needle:
            return 0

        base1, mod1 = 31, 768258391
        base2, mod2 = 37, 685683731

        n, m = len(haystack), len(needle)
        if m > n:
            return -1

        power1, power2 = 1, 1
        for _ in range(m):
            power1 = (power1 * base1) % mod1
            power2 = (power2 * base2) % mod2

        needle_hash1, needle_hash2 = 0, 0
        haystack_hash1, haystack_hash2 = 0, 0

        for i in range(m):
            needle_hash1 = (needle_hash1 * base1 + ord(needle[i])) % mod1
            needle_hash2 = (needle_hash2 * base2 + ord(needle[i])) % mod2
            haystack_hash1 = (haystack_hash1 * base1 + ord(haystack[i])) % mod1
            haystack_hash2 = (haystack_hash2 * base2 + ord(haystack[i])) % mod2

        for i in range(n - m + 1):
            if haystack_hash1 == needle_hash1 and haystack_hash2 == needle_hash2:
                return i

            if i + m < n:
                haystack_hash1 = (haystack_hash1 * base1 - ord(haystack[i]) * power1 + ord(haystack[i + m])) % mod1
                haystack_hash2 = (haystack_hash2 * base2 - ord(haystack[i]) * power2 + ord(haystack[i + m])) % mod2

                haystack_hash1 = (haystack_hash1 + mod1) % mod1
                haystack_hash2 = (haystack_hash2 + mod2) % mod2

        return -1
```

```java
public class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;

        int base1 = 31, mod1 = 768258391;
        int base2 = 37, mod2 = 685683731;

        int n = haystack.length(), m = needle.length();
        if (m > n) return -1;

        long power1 = 1, power2 = 1;
        for (int i = 0; i < m; i++) {
            power1 = (power1 * base1) % mod1;
            power2 = (power2 * base2) % mod2;
        }

        long needleHash1 = 0, needleHash2 = 0;
        long haystackHash1 = 0, haystackHash2 = 0;

        for (int i = 0; i < m; i++) {
            needleHash1 = (needleHash1 * base1 + needle.charAt(i)) % mod1;
            needleHash2 = (needleHash2 * base2 + needle.charAt(i)) % mod2;
            haystackHash1 = (haystackHash1 * base1 + haystack.charAt(i)) % mod1;
            haystackHash2 = (haystackHash2 * base2 + haystack.charAt(i)) % mod2;
        }

        for (int i = 0; i <= n - m; i++) {
            if (haystackHash1 == needleHash1 && haystackHash2 == needleHash2) {
                return i;
            }

            if (i + m < n) {
                haystackHash1 = (haystackHash1 * base1 - haystack.charAt(i) * power1 + haystack.charAt(i + m)) % mod1;
                haystackHash2 = (haystackHash2 * base2 - haystack.charAt(i) * power2 + haystack.charAt(i + m)) % mod2;

                if (haystackHash1 < 0) haystackHash1 += mod1;
                if (haystackHash2 < 0) haystackHash2 += mod2;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int strStr(string haystack, string needle) {
        if (needle.empty()) return 0;

        long long base1 = 31, mod1 = 768258391;
        long long base2 = 37, mod2 = 685683731;

        int n = haystack.size(), m = needle.size();
        if (m > n) return -1;

        long long power1 = 1, power2 = 1;
        for (int i = 0; i < m; i++) {
            power1 = (power1 * base1) % mod1;
            power2 = (power2 * base2) % mod2;
        }

        long long needleHash1 = 0, needleHash2 = 0;
        long long haystackHash1 = 0, haystackHash2 = 0;

        for (int i = 0; i < m; i++) {
            needleHash1 = (needleHash1 * base1 + needle[i]) % mod1;
            needleHash2 = (needleHash2 * base2 + needle[i]) % mod2;
            haystackHash1 = (haystackHash1 * base1 + haystack[i]) % mod1;
            haystackHash2 = (haystackHash2 * base2 + haystack[i]) % mod2;
        }

        for (int i = 0; i <= n - m; i++) {
            if (haystackHash1 == needleHash1 && haystackHash2 == needleHash2) {
                return i;
            }

            if (i + m < n) {
                haystackHash1 = (haystackHash1 * base1 - haystack[i] * power1 + haystack[i + m]) % mod1;
                haystackHash2 = (haystackHash2 * base2 - haystack[i] * power2 + haystack[i + m]) % mod2;

                if (haystackHash1 < 0) haystackHash1 += mod1;
                if (haystackHash2 < 0) haystackHash2 += mod2;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} haystack
     * @param {string} needle
     * @return {number}
     */
    strStr(haystack, needle) {
        if (needle === '') return 0;

        const base1 = 31,
            mod1 = 768258391;
        const base2 = 37,
            mod2 = 685683731;

        const n = haystack.length,
            m = needle.length;
        if (m > n) return -1;

        let power1 = 1,
            power2 = 1;
        for (let i = 0; i < m; i++) {
            power1 = (power1 * base1) % mod1;
            power2 = (power2 * base2) % mod2;
        }

        let needleHash1 = 0,
            needleHash2 = 0;
        let haystackHash1 = 0,
            haystackHash2 = 0;

        for (let i = 0; i < m; i++) {
            needleHash1 = (needleHash1 * base1 + needle.charCodeAt(i)) % mod1;
            needleHash2 = (needleHash2 * base2 + needle.charCodeAt(i)) % mod2;
            haystackHash1 =
                (haystackHash1 * base1 + haystack.charCodeAt(i)) % mod1;
            haystackHash2 =
                (haystackHash2 * base2 + haystack.charCodeAt(i)) % mod2;
        }

        for (let i = 0; i <= n - m; i++) {
            if (
                haystackHash1 === needleHash1 &&
                haystackHash2 === needleHash2
            ) {
                return i;
            }

            if (i + m < n) {
                haystackHash1 =
                    (haystackHash1 * base1 -
                        haystack.charCodeAt(i) * power1 +
                        haystack.charCodeAt(i + m)) %
                    mod1;
                haystackHash2 =
                    (haystackHash2 * base2 -
                        haystack.charCodeAt(i) * power2 +
                        haystack.charCodeAt(i + m)) %
                    mod2;

                if (haystackHash1 < 0) haystackHash1 += mod1;
                if (haystackHash2 < 0) haystackHash2 += mod2;
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int StrStr(string haystack, string needle) {
        if (string.IsNullOrEmpty(needle)) return 0;

        int base1 = 31, mod1 = 768258391;
        int base2 = 37, mod2 = 685683731;

        int n = haystack.Length, m = needle.Length;
        if (m > n) return -1;

        long power1 = 1, power2 = 1;
        for (int i = 0; i < m; i++) {
            power1 = (power1 * base1) % mod1;
            power2 = (power2 * base2) % mod2;
        }

        long needleHash1 = 0, needleHash2 = 0;
        long haystackHash1 = 0, haystackHash2 = 0;

        for (int i = 0; i < m; i++) {
            needleHash1 = (needleHash1 * base1 + needle[i]) % mod1;
            needleHash2 = (needleHash2 * base2 + needle[i]) % mod2;
            haystackHash1 = (haystackHash1 * base1 + haystack[i]) % mod1;
            haystackHash2 = (haystackHash2 * base2 + haystack[i]) % mod2;
        }

        for (int i = 0; i <= n - m; i++) {
            if (haystackHash1 == needleHash1 && haystackHash2 == needleHash2) {
                return i;
            }

            if (i + m < n) {
                haystackHash1 = (haystackHash1 * base1 - haystack[i] * power1 + haystack[i + m]) % mod1;
                haystackHash2 = (haystackHash2 * base2 - haystack[i] * power2 + haystack[i + m]) % mod2;

                if (haystackHash1 < 0) haystackHash1 += mod1;
                if (haystackHash2 < 0) haystackHash2 += mod2;
            }
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the string $heystack$ and $m$ is the length of the string $needle$.
