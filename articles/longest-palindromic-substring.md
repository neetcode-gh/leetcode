## 1. Brute Force

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        res, resLen = "", 0

        for i in range(len(s)):
            for j in range(i, len(s)):
                l, r = i, j
                while l < r and s[l] == s[r]:
                    l += 1
                    r -= 1
                
                if l >= r and resLen < (j - i + 1):
                    res = s[i : j + 1]
                    resLen = j - i + 1
        return res
```

```java
public class Solution {
    public String longestPalindrome(String s) {
        String res = "";
        int resLen = 0;

        for (int i = 0; i < s.length(); i++) {
            for (int j = i; j < s.length(); j++) {
                int l = i, r = j;
                while (l < r && s.charAt(l) == s.charAt(r)) {
                    l++;
                    r--;
                }

                if (l >= r && resLen < (j - i + 1)) {
                    res = s.substring(i, j + 1);
                    resLen = j - i + 1;
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
    string longestPalindrome(string s) {
        string res = "";
        int resLen = 0;

        for (int i = 0; i < s.size(); i++) {
            for (int j = i; j < s.size(); j++) {
                int l = i, r = j;
                while (l < r && s[l] == s[r]) {
                    l++;
                    r--;
                }

                if (l >= r && resLen < (j - i + 1)) {
                    res = s.substr(i, j - i + 1);
                    resLen = j - i + 1;
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
     * @return {string}
     */
    longestPalindrome(s) {
        let res = "";
        let resLen = 0;

        for (let i = 0; i < s.length; i++) {
            for (let j = i; j < s.length; j++) {
                let l = i, r = j;
                while (l < r && s[l] === s[r]) {
                    l++;
                    r--;
                }

                if (l >= r && resLen < (j - i + 1)) {
                    res = s.slice(i, j + 1);
                    resLen = j - i + 1;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public string LongestPalindrome(string s) {
        string res = "";
        int resLen = 0;

        for (int i = 0; i < s.Length; i++) {
            for (int j = i; j < s.Length; j++) {
                int l = i, r = j;
                while (l < r && s[l] == s[r]) {
                    l++;
                    r--;
                }

                if (l >= r && resLen < (j - i + 1)) {
                    res = s.Substring(i, j - i + 1);
                    resLen = j - i + 1;
                }
            }
        }

        return res;
    }
}
```

```go
func longestPalindrome(s string) string {
    res := ""
    resLen := 0

    for i := 0; i < len(s); i++ {
        for j := i; j < len(s); j++ {
            l, r := i, j
            for l < r && s[l] == s[r] {
                l++
                r--
            }

            if l >= r && resLen < (j-i+1) {
                res = s[i : j+1]
                resLen = j - i + 1
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun longestPalindrome(s: String): String {
        var res = ""
        var resLen = 0

        for (i in s.indices) {
            for (j in i until s.length) {
                var l = i
                var r = j
                while (l < r && s[l] == s[r]) {
                    l++
                    r--
                }

                if (l >= r && resLen < (j - i + 1)) {
                    res = s.substring(i, j + 1)
                    resLen = j - i + 1
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 3)$
* Space complexity: $O(1)$

---

## 2. Dynamic Programming

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        resIdx, resLen = 0, 0
        n = len(s)

        dp = [[False] * n for _ in range(n)]

        for i in range(n - 1, -1, -1):
            for j in range(i, n):
                if s[i] == s[j] and (j - i <= 2 or dp[i + 1][j - 1]):
                    dp[i][j] = True
                    if resLen < (j - i + 1):
                        resIdx = i
                        resLen = j - i + 1

        return s[resIdx : resIdx + resLen]
```

```java
public class Solution {
    public String longestPalindrome(String s) {
        int resIdx = 0, resLen = 0;
        int n = s.length();

        boolean[][] dp = new boolean[n][n];

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j) && 
                    (j - i <= 2 || dp[i + 1][j - 1])) {
                        
                    dp[i][j] = true;
                    if (resLen < (j - i + 1)) {
                        resIdx = i;
                        resLen = j - i + 1;
                    }
                }
            }
        }

        return s.substring(resIdx, resIdx + resLen);
    }
}
```

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int resIdx = 0, resLen = 0;
        int n = s.size();

        vector<vector<bool>> dp(n, vector<bool>(n, false));

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && 
                    (j - i <= 2 || dp[i + 1][j - 1])) {

                    dp[i][j] = true;
                    if (resLen < (j - i + 1)) {
                        resIdx = i;
                        resLen = j - i + 1;
                    }
                }
            }
        }

        return s.substr(resIdx, resLen);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    longestPalindrome(s) {
        let resIdx = 0, resLen = 0;
        const n = s.length;

        const dp = Array.from({ length: n }, () => Array(n).fill(false));

        for (let i = n - 1; i >= 0; i--) {
            for (let j = i; j < n; j++) {
                if (s[i] === s[j] && 
                    (j - i <= 2 || dp[i + 1][j - 1])) {
                        
                    dp[i][j] = true;
                    if (resLen < (j - i + 1)) {
                        resIdx = i;
                        resLen = j - i + 1;
                    }
                }
            }
        }

        return s.slice(resIdx, resIdx + resLen);
    }
}
```

```csharp
public class Solution {
    public string LongestPalindrome(string s) {
        int resIdx = 0, resLen = 0;
        int n = s.Length;

        bool[,] dp = new bool[n, n];

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && 
                   (j - i <= 2 || dp[i + 1, j - 1])) {
                    
                    dp[i, j] = true;
                    if (resLen < (j - i + 1)) {
                        resIdx = i;
                        resLen = j - i + 1;
                    }
                }
            }
        }

        return s.Substring(resIdx, resLen);
    }
}
```

```go
func longestPalindrome(s string) string {
    n := len(s)
    resIdx, resLen := 0, 0

    dp := make([][]bool, n)
    for i := range dp {
        dp[i] = make([]bool, n)
    }

    for i := n - 1; i >= 0; i-- {
        for j := i; j < n; j++ {
            if s[i] == s[j] && (j-i <= 2 || dp[i+1][j-1]) {
                dp[i][j] = true
                if resLen < (j-i+1) {
                    resIdx = i
                    resLen = j - i + 1
                }
            }
        }
    }

    return s[resIdx : resIdx+resLen]
}
```

```kotlin
class Solution {
    fun longestPalindrome(s: String): String {
        val n = s.length
        var resIdx = 0
        var resLen = 0

        val dp = Array(n) { BooleanArray(n) }

        for (i in n - 1 downTo 0) {
            for (j in i until n) {
                if (s[i] == s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
                    dp[i][j] = true
                    if (resLen < (j - i + 1)) {
                        resIdx = i
                        resLen = j - i + 1
                    }
                }
            }
        }

        return s.substring(resIdx, resIdx + resLen)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n ^ 2)$

---

## 3. Two Pointers

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        resIdx = 0
        resLen = 0

        for i in range(len(s)):
            # odd length
            l, r = i, i
            while l >= 0 and r < len(s) and s[l] == s[r]:
                if (r - l + 1) > resLen:
                    resIdx = l
                    resLen = r - l + 1
                l -= 1
                r += 1

            # even length
            l, r = i, i + 1
            while l >= 0 and r < len(s) and s[l] == s[r]:
                if (r - l + 1) > resLen:
                    resIdx = l
                    resLen = r - l + 1
                l -= 1
                r += 1

        return s[resIdx : resIdx + resLen]
```

```java
class Solution {
    public String longestPalindrome(String s) {
        int resLen = 0, resIdx = 0;

        for (int i = 0; i < s.length(); i++) {
            // odd length
            int l = i, r = i;
            while (l >= 0 && r < s.length() && 
                   s.charAt(l) == s.charAt(r)) {
                if (r - l + 1 > resLen) {
                    resIdx = l;
                    resLen = r - l + 1;
                }
                l--;
                r++;
            }

            // even length
            l = i;
            r = i + 1;
            while (l >= 0 && r < s.length() && 
                   s.charAt(l) == s.charAt(r)) {
                if (r - l + 1 > resLen) {
                    resIdx = l;
                    resLen = r - l + 1;
                }
                l--;
                r++;
            }
        }

        return s.substring(resIdx, resIdx + resLen);
    }
}
```

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int resLen = 0, resIdx = 0;

        for (int i = 0; i < s.size(); i++) {
            // odd length
            int l = i, r = i;
            while (l >= 0 && r < s.size() &&
                   s[l] == s[r]) {
                if (r - l + 1 > resLen) {
                    resIdx = l;
                    resLen = r - l + 1;
                }
                l--;
                r++;
            }

            // even length
            l = i;
            r = i + 1;
            while (l >= 0 && r < s.size() &&
                   s[l] == s[r]) {
                if (r - l + 1 > resLen) {
                    resIdx = l;
                    resLen = r - l + 1;
                }
                l--;
                r++;
            }
        }

        return s.substr(resIdx, resLen);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    longestPalindrome(s) {
        let resIdx = 0;
        let resLen = 0;

        for (let i = 0; i < s.length; i++) {
            // odd length
            let l = i;
                let r = i;
            while (l >= 0 && r < s.length &&
                   s.charAt(l) === s.charAt(r)) {
                if (r - l + 1 > resLen) {
                    resIdx = l;
                    resLen = r - l + 1;
                }
                l--;
                r++;
            }

            // even length
            l = i;
            r = i + 1;
            while (l >= 0 && r < s.length &&
                   s.charAt(l) === s.charAt(r)) {
                if (r - l + 1 > resLen) {
                    resIdx = l;
                    resLen = r - l + 1;
                }
                l--;
                r++;
            }
        }

        return s.substring(resIdx, resIdx + resLen);
    }
}
```

```csharp
public class Solution {
    public string LongestPalindrome(string s) {
        int resLen = 0, resIdx = 0;

        for (int i = 0; i < s.Length; i++) {
            // odd length
            int l = i, r = i;
            while (l >= 0 && r < s.Length &&
                   s[l] == s[r]) {
                if (r - l + 1 > resLen) {
                    resIdx = l;
                    resLen = r - l + 1;
                }
                l--;
                r++;
            }

            // even length
            l = i;
            r = i + 1;
            while (l >= 0 && r < s.Length &&
                   s[l] == s[r]) {
                if (r - l + 1 > resLen) {
                    resIdx = l;
                    resLen = r - l + 1;
                }
                l--;
                r++;
            }
        }

        return s.Substring(resIdx, resLen);
    }
}
```

```go
func longestPalindrome(s string) string {
    resIdx, resLen := 0, 0

    for i := 0; i < len(s); i++ {
        // odd length
        l, r := i, i
        for l >= 0 && r < len(s) && s[l] == s[r] {
            if r-l+1 > resLen {
                resIdx = l
                resLen = r - l + 1
            }
            l--
            r++
        }

        // even length
        l, r = i, i+1
        for l >= 0 && r < len(s) && s[l] == s[r] {
            if r-l+1 > resLen {
                resIdx = l
                resLen = r - l + 1
            }
            l--
            r++
        }
    }

    return s[resIdx : resIdx+resLen]
}
```

```kotlin
class Solution {
    fun longestPalindrome(s: String): String {
        var resIdx = 0
        var resLen = 0

        for (i in s.indices) {
            // odd length
            var l = i
            var r = i
            while (l >= 0 && r < s.length && s[l] == s[r]) {
                if (r - l + 1 > resLen) {
                    resIdx = l
                    resLen = r - l + 1
                }
                l--
                r++
            }

            // even length
            l = i
            r = i + 1
            while (l >= 0 && r < s.length && s[l] == s[r]) {
                if (r - l + 1 > resLen) {
                    resIdx = l
                    resLen = r - l + 1
                }
                l--
                r++
            }
        }

        return s.substring(resIdx, resIdx + resLen)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 4. Manacher's Algorithm

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        def manacher(s):
            t = '#' + '#'.join(s) + '#'
            n = len(t)
            p = [0] * n
            l, r = 0, 0
            for i in range(n):
                p[i] = min(r - i, p[l + (r - i)]) if i < r else 0
                while (i + p[i] + 1 < n and i - p[i] - 1 >= 0 
                       and t[i + p[i] + 1] == t[i - p[i] - 1]):
                    p[i] += 1
                if i + p[i] > r:
                    l, r = i - p[i], i + p[i]
            return p
        
        p = manacher(s)
        resLen, center_idx = max((v, i) for i, v in enumerate(p))
        resIdx = (center_idx - resLen) // 2
        return s[resIdx : resIdx + resLen]
```

```java
public class Solution {
    public int[] manacher(String s) {
        StringBuilder t = new StringBuilder("#");
        for (char c : s.toCharArray()) {
            t.append(c).append("#");
        }
        int n = t.length();
        int[] p = new int[n];
        int l = 0, r = 0;
        for (int i = 0; i < n; i++) {
            p[i] = (i < r) ? Math.min(r - i, p[l + (r - i)]) : 0;
            while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 &&
                   t.charAt(i + p[i] + 1) == t.charAt(i - p[i] - 1)) {
                p[i]++;
            }
            if (i + p[i] > r) {
                l = i - p[i];
                r = i + p[i];
            }
        }
        return p;
    }
    
    public String longestPalindrome(String s) {
        int[] p = manacher(s);
        int resLen = 0, center_idx = 0;
        for (int i = 0; i < p.length; i++) {
            if (p[i] > resLen) {
                resLen = p[i];
                center_idx = i;
            }
        }
        int resIdx = (center_idx - resLen) / 2;
        return s.substring(resIdx, resIdx + resLen);
    }
}
```

```cpp
class Solution {
public:
    vector<int> manacher(string& s) {
        string t = "#" + string(1, s[0]);
        for (int i = 1; i < s.size(); ++i)
            t += "#" + string(1, s[i]);
        t += "#";
        int n = t.size();
        vector<int> p(n, 0);
        int l = 0, r = 0;
        for (int i = 0; i < n; i++) {
            p[i] = (i < r) ? min(r - i, p[l + (r - i)]) : 0;
            while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 &&
                   t[i + p[i] + 1] == t[i - p[i] - 1])
                p[i]++;
            if (i + p[i] > r)
                l = i - p[i], r = i + p[i];
        }
        return p;
    }
    
    string longestPalindrome(string s) {
        vector<int> p = manacher(s);
        int resLen = 0, center_idx = 0;
        for (int i = 0; i < p.size(); i++) {
            if (p[i] > resLen) {
                resLen = p[i];
                center_idx = i;
            }
        }
        int resIdx = (center_idx - resLen) / 2;
        return s.substr(resIdx, resLen);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number[]}
     */
    manacher(s) {
        const t = '#' + s.split('').join('#') + '#';
        const n = t.length;
        const p = new Array(n).fill(0);
        let l = 0, r = 0;
        for (let i = 0; i < n; i++) {
            p[i] = (i < r) ? Math.min(r - i, p[l + (r - i)]) : 0;
            while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 &&
                   t[i + p[i] + 1] === t[i - p[i] - 1]) {
                p[i]++;
            }
            if (i + p[i] > r) {
                l = i - p[i];
                r = i + p[i];
            }
        }
        return p;
    }

    /**
     * @param {string} s
     * @return {string}
     */
    longestPalindrome(s) {
        const p = this.manacher(s);
        let resLen = 0, center_idx = 0;
        for (let i = 0; i < p.length; i++) {
            if (p[i] > resLen) {
                resLen = p[i];
                center_idx = i;
            }
        }
        const resIdx = (center_idx - resLen) / 2;
        return s.substring(resIdx, resIdx + resLen);
    }
}
```

```csharp
public class Solution {
    public int[] Manacher(string s) {
        string t = "#" + string.Join("#", s.ToCharArray()) + "#";
        int n = t.Length;
        int[] p = new int[n];
        int l = 0, r = 0;
        for (int i = 0; i < n; i++) {
            p[i] = (i < r) ? Math.Min(r - i, p[l + (r - i)]) : 0;
            while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 &&
                   t[i + p[i] + 1] == t[i - p[i] - 1]) {
                p[i]++;
            }
            if (i + p[i] > r) {
                l = i - p[i];
                r = i + p[i];
            }
        }
        return p;
    }

    public string LongestPalindrome(string s) {
        int[] p = Manacher(s);
        int resLen = 0, center_idx = 0;
        for (int i = 0; i < p.Length; i++) {
            if (p[i] > resLen) {
                resLen = p[i];
                center_idx = i;
            }
        }
        int resIdx = (center_idx - resLen) / 2;
        return s.Substring(resIdx, resLen);
    }
}
```

```go
func longestPalindrome(s string) string {
    manacher := func(s string) []int {
        t := "#"
        for i := 0; i < len(s); i++ {
            t += string(s[i]) + "#"
        }
        n := len(t)
        p := make([]int, n)
        l, r := 0, 0
        for i := 0; i < n; i++ {
            if i < r {
                p[i] = min(r-i, p[l+(r-i)])
            }
            for i+p[i]+1 < n && i-p[i]-1 >= 0 && t[i+p[i]+1] == t[i-p[i]-1] {
                p[i]++
            }
            if i + p[i] > r {
                l, r = i - p[i], i + p[i]
            }
        }
        return p
    }
    
    p := manacher(s)
    resLen, centerIdx := 0, 0
    for i, v := range p {
        if v > resLen {
            resLen = v
            centerIdx = i
        }
    }
    
    resIdx := (centerIdx - resLen) / 2
    return s[resIdx : resIdx + resLen]
}
```

```kotlin
class Solution {
    fun longestPalindrome(s: String): String {
        fun manacher(s: String): IntArray {
            val t = "#" + s.chunked(1).joinToString("#") + "#"
            val n = t.length
            val p = IntArray(n)
            var l = 0
            var r = 0
            
            for (i in 0 until n) {
                p[i] = if (i < r) Math.min(r - i, p[l + (r - i)]) else 0
                while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 && 
                       t[i + p[i] + 1] == t[i - p[i] - 1]) {
                    p[i]++
                }
                if (i + p[i] > r) {
                    l = i - p[i]
                    r = i + p[i]
                }
            }
            return p
        }
        
        val p = manacher(s)
        var resLen = 0
        var centerIdx = 0
        for (i in p.indices) {
            if (p[i] > resLen) {
                resLen = p[i]
                centerIdx = i
            }
        }
        
        val resIdx = (centerIdx - resLen) / 2
        return s.substring(resIdx, resIdx + resLen)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$