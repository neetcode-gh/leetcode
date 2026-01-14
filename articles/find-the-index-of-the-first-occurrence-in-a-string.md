## 1. Brute Force

### Intuition

The simplest way to find a substring is to try every possible starting position in the haystack. At each position, we compare characters one by one with the needle. If all characters match, we found our answer. If any character doesn't match, we move to the next starting position and try again.

### Algorithm

1. Iterate through each valid starting position `i` in the haystack (from `0` to `n - m`, where `n` is the haystack length and `m` is the needle length).
2. For each starting position, compare characters of the haystack starting at `i` with characters of the needle.
3. If all characters match (we reach the end of the needle), return the starting position `i`.
4. If any character doesn't match, break out of the inner loop and try the next starting position.
5. If no match is found after checking all positions, return `-1`.

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

```go
func strStr(haystack string, needle string) int {
    n, m := len(haystack), len(needle)
    for i := 0; i <= n-m; i++ {
        j := 0
        for j < m {
            if haystack[i+j] != needle[j] {
                break
            }
            j++
        }
        if j == m {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun strStr(haystack: String, needle: String): Int {
        val n = haystack.length
        val m = needle.length
        for (i in 0..n - m) {
            var j = 0
            while (j < m) {
                if (haystack[i + j] != needle[j]) {
                    break
                }
                j++
            }
            if (j == m) {
                return i
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func strStr(_ haystack: String, _ needle: String) -> Int {
        let n = haystack.count
        let m = needle.count
        if m == 0 { return 0 }
        if m > n { return -1 }

        let haystackArr = Array(haystack)
        let needleArr = Array(needle)

        for i in 0...(n - m) {
            var j = 0
            while j < m {
                if haystackArr[i + j] != needleArr[j] {
                    break
                }
                j += 1
            }
            if j == m {
                return i
            }
        }
        return -1
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

### Intuition

The brute force approach wastes work by restarting from scratch after each mismatch. KMP improves this by preprocessing the needle to build a "longest proper prefix which is also suffix" (LPS) array. When a mismatch occurs, the LPS array tells us how many characters we can skip, leveraging the pattern structure to avoid redundant comparisons.

### Algorithm

1. Build the LPS array for the needle:
   - Initialize an array of the same length as the needle, filled with zeros.
   - Use two pointers: `prevLPS` tracks the length of the current longest prefix-suffix, and `i` scans through the needle.
   - If characters match, increment both pointers and store the value. If they don't match and `prevLPS > 0`, fall back to the previous LPS value.
2. Search for the needle in the haystack:
   - Use pointer `i` for the haystack and `j` for the needle.
   - If characters match, advance both pointers.
   - If they don't match and `j > 0`, use the LPS array to determine where to continue matching in the needle.
   - If `j` reaches the needle length, we found a match; return `i - m`.
3. Return `-1` if no match is found.

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

```go
func strStr(haystack string, needle string) int {
    if needle == "" {
        return 0
    }

    m := len(needle)
    lps := make([]int, m)
    prevLPS, i := 0, 1

    for i < m {
        if needle[i] == needle[prevLPS] {
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

    i = 0
    j := 0
    for i < len(haystack) {
        if haystack[i] == needle[j] {
            i++
            j++
        } else {
            if j == 0 {
                i++
            } else {
                j = lps[j-1]
            }
        }

        if j == m {
            return i - m
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun strStr(haystack: String, needle: String): Int {
        if (needle.isEmpty()) return 0

        val m = needle.length
        val lps = IntArray(m)
        var prevLPS = 0
        var i = 1

        while (i < m) {
            if (needle[i] == needle[prevLPS]) {
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
        while (i < haystack.length) {
            if (haystack[i] == needle[j]) {
                i++
                j++
            } else {
                if (j == 0) {
                    i++
                } else {
                    j = lps[j - 1]
                }
            }

            if (j == m) {
                return i - m
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func strStr(_ haystack: String, _ needle: String) -> Int {
        if needle.isEmpty { return 0 }

        let haystackArr = Array(haystack)
        let needleArr = Array(needle)
        let n = haystackArr.count
        let m = needleArr.count

        var lps = [Int](repeating: 0, count: m)
        var prevLPS = 0
        var i = 1

        while i < m {
            if needleArr[i] == needleArr[prevLPS] {
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
        while i < n {
            if haystackArr[i] == needleArr[j] {
                i += 1
                j += 1
            } else {
                if j == 0 {
                    i += 1
                } else {
                    j = lps[j - 1]
                }
            }

            if j == m {
                return i - m
            }
        }

        return -1
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

### Intuition

The Z-algorithm computes, for each position in a string, the length of the longest substring starting from that position that matches a prefix of the string. By concatenating the needle, a separator character, and the haystack, any position where the Z-value equals the needle length indicates a match. The algorithm uses a "Z-box" to track previously computed matches and skip redundant comparisons.

### Algorithm

1. Concatenate the needle, a special separator (like `$`), and the haystack into a single string.
2. Compute the Z-array for this combined string:
   - Maintain a Z-box defined by `[l, r]` representing the rightmost substring that matches a prefix.
   - For each position `i`, use the Z-box to initialize `z[i]` when possible.
   - Extend `z[i]` by comparing characters directly.
   - Update the Z-box if the current match extends beyond the previous bounds.
3. Scan the Z-array starting after the needle and separator. If `z[i]` equals the needle length, return the corresponding position in the haystack.
4. Return `-1` if no match is found.

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

```go
func strStr(haystack string, needle string) int {
    if needle == "" {
        return 0
    }

    s := needle + "$" + haystack
    n := len(s)
    z := make([]int, n)
    l, r := 0, 0

    for i := 1; i < n; i++ {
        if i <= r {
            z[i] = min(r-i+1, z[i-l])
        }
        for i+z[i] < n && s[z[i]] == s[i+z[i]] {
            z[i]++
        }
        if i+z[i]-1 > r {
            l, r = i, i+z[i]-1
        }
    }

    m := len(needle)
    for i := m + 1; i < n; i++ {
        if z[i] == m {
            return i - m - 1
        }
    }

    return -1
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun strStr(haystack: String, needle: String): Int {
        if (needle.isEmpty()) return 0

        val s = needle + "$" + haystack
        val n = s.length
        val z = IntArray(n)
        var l = 0
        var r = 0

        for (i in 1 until n) {
            if (i <= r) {
                z[i] = minOf(r - i + 1, z[i - l])
            }
            while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
                z[i]++
            }
            if (i + z[i] - 1 > r) {
                l = i
                r = i + z[i] - 1
            }
        }

        val m = needle.length
        for (i in m + 1 until n) {
            if (z[i] == m) {
                return i - m - 1
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func strStr(_ haystack: String, _ needle: String) -> Int {
        if needle.isEmpty { return 0 }

        let s = Array(needle + "$" + haystack)
        let n = s.count
        var z = [Int](repeating: 0, count: n)
        var l = 0
        var r = 0

        for i in 1..<n {
            if i <= r {
                z[i] = min(r - i + 1, z[i - l])
            }
            while i + z[i] < n && s[z[i]] == s[i + z[i]] {
                z[i] += 1
            }
            if i + z[i] - 1 > r {
                l = i
                r = i + z[i] - 1
            }
        }

        let m = needle.count
        for i in (m + 1)..<n {
            if z[i] == m {
                return i - m - 1
            }
        }

        return -1
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

### Intuition

Instead of comparing characters one by one, we can compare hash values of substrings. If we compute the hash of the needle and the hash of each window in the haystack, matching hashes suggest a potential match. The key insight is using a rolling hash: when sliding the window by one position, we can update the hash in O(1) time by removing the contribution of the outgoing character and adding the incoming one. Using two different hash functions reduces false positives.

### Algorithm

1. Compute the hash of the needle using two different hash functions (different bases and moduli).
2. Compute the hash of the first window in the haystack (same length as the needle).
3. Precompute the power values needed to remove the leftmost character's contribution.
4. Slide the window through the haystack:
   - If both hashes match the needle's hashes, return the current position.
   - Update the rolling hash by removing the leftmost character and adding the new rightmost character.
   - Handle negative values from the modulo operation.
5. Return `-1` if no match is found.

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

```go
func strStr(haystack string, needle string) int {
    if needle == "" {
        return 0
    }

    base1, mod1 := int64(31), int64(768258391)
    base2, mod2 := int64(37), int64(685683731)

    n, m := len(haystack), len(needle)
    if m > n {
        return -1
    }

    power1, power2 := int64(1), int64(1)
    for i := 0; i < m; i++ {
        power1 = (power1 * base1) % mod1
        power2 = (power2 * base2) % mod2
    }

    var needleHash1, needleHash2 int64
    var haystackHash1, haystackHash2 int64

    for i := 0; i < m; i++ {
        needleHash1 = (needleHash1*base1 + int64(needle[i])) % mod1
        needleHash2 = (needleHash2*base2 + int64(needle[i])) % mod2
        haystackHash1 = (haystackHash1*base1 + int64(haystack[i])) % mod1
        haystackHash2 = (haystackHash2*base2 + int64(haystack[i])) % mod2
    }

    for i := 0; i <= n-m; i++ {
        if haystackHash1 == needleHash1 && haystackHash2 == needleHash2 {
            return i
        }

        if i+m < n {
            haystackHash1 = (haystackHash1*base1 - int64(haystack[i])*power1 + int64(haystack[i+m])) % mod1
            haystackHash2 = (haystackHash2*base2 - int64(haystack[i])*power2 + int64(haystack[i+m])) % mod2

            if haystackHash1 < 0 {
                haystackHash1 += mod1
            }
            if haystackHash2 < 0 {
                haystackHash2 += mod2
            }
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun strStr(haystack: String, needle: String): Int {
        if (needle.isEmpty()) return 0

        val base1 = 31L
        val mod1 = 768258391L
        val base2 = 37L
        val mod2 = 685683731L

        val n = haystack.length
        val m = needle.length
        if (m > n) return -1

        var power1 = 1L
        var power2 = 1L
        for (i in 0 until m) {
            power1 = (power1 * base1) % mod1
            power2 = (power2 * base2) % mod2
        }

        var needleHash1 = 0L
        var needleHash2 = 0L
        var haystackHash1 = 0L
        var haystackHash2 = 0L

        for (i in 0 until m) {
            needleHash1 = (needleHash1 * base1 + needle[i].code) % mod1
            needleHash2 = (needleHash2 * base2 + needle[i].code) % mod2
            haystackHash1 = (haystackHash1 * base1 + haystack[i].code) % mod1
            haystackHash2 = (haystackHash2 * base2 + haystack[i].code) % mod2
        }

        for (i in 0..n - m) {
            if (haystackHash1 == needleHash1 && haystackHash2 == needleHash2) {
                return i
            }

            if (i + m < n) {
                haystackHash1 = (haystackHash1 * base1 - haystack[i].code * power1 + haystack[i + m].code) % mod1
                haystackHash2 = (haystackHash2 * base2 - haystack[i].code * power2 + haystack[i + m].code) % mod2

                if (haystackHash1 < 0) haystackHash1 += mod1
                if (haystackHash2 < 0) haystackHash2 += mod2
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func strStr(_ haystack: String, _ needle: String) -> Int {
        if needle.isEmpty { return 0 }

        let base1: Int64 = 31
        let mod1: Int64 = 768258391
        let base2: Int64 = 37
        let mod2: Int64 = 685683731

        let haystackArr = Array(haystack.utf8).map { Int64($0) }
        let needleArr = Array(needle.utf8).map { Int64($0) }
        let n = haystackArr.count
        let m = needleArr.count

        if m > n { return -1 }

        var power1: Int64 = 1
        var power2: Int64 = 1
        for _ in 0..<m {
            power1 = (power1 * base1) % mod1
            power2 = (power2 * base2) % mod2
        }

        var needleHash1: Int64 = 0
        var needleHash2: Int64 = 0
        var haystackHash1: Int64 = 0
        var haystackHash2: Int64 = 0

        for i in 0..<m {
            needleHash1 = (needleHash1 * base1 + needleArr[i]) % mod1
            needleHash2 = (needleHash2 * base2 + needleArr[i]) % mod2
            haystackHash1 = (haystackHash1 * base1 + haystackArr[i]) % mod1
            haystackHash2 = (haystackHash2 * base2 + haystackArr[i]) % mod2
        }

        for i in 0...(n - m) {
            if haystackHash1 == needleHash1 && haystackHash2 == needleHash2 {
                return i
            }

            if i + m < n {
                haystackHash1 = (haystackHash1 * base1 - haystackArr[i] * power1 + haystackArr[i + m]) % mod1
                haystackHash2 = (haystackHash2 * base2 - haystackArr[i] * power2 + haystackArr[i + m]) % mod2

                if haystackHash1 < 0 { haystackHash1 += mod1 }
                if haystackHash2 < 0 { haystackHash2 += mod2 }
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the string $heystack$ and $m$ is the length of the string $needle$.

---

## Common Pitfalls

### Off-by-One Errors in Loop Bounds

When iterating through the haystack, the loop should run from `0` to `n - m` inclusive. A common mistake is using `n - m - 1` or `n - 1` as the upper bound. The former misses the case where the needle appears at the very end, while the latter causes out-of-bounds access when comparing characters.

### Not Handling Empty Needle

When the needle is an empty string, the expected return value is `0` (the empty string is found at the beginning of any string). Forgetting to check for this edge case can lead to incorrect behavior or infinite loops in some implementations.
