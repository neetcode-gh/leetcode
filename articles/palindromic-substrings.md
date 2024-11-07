## 1. Brute Force

::tabs-start

```python
class Solution:
    def countSubstrings(self, s: str) -> int:
        res = 0
        
        for i in range(len(s)):
            for j in range(i, len(s)):
                l, r = i, j
                while l < r and s[l] == s[r]:
                    l += 1
                    r -= 1
                res += (l >= r)
                
        return res
```

```java
public class Solution {
    public int countSubstrings(String s) {
        int res = 0;

        for (int i = 0; i < s.length(); i++) {
            for (int j = i; j < s.length(); j++) {
                int l = i, r = j;
                while (l < r && s.charAt(l) == s.charAt(r)) {
                    l++;
                    r--;
                }
                res += (l >= r) ? 1 : 0;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countSubstrings(string s) {
        int res = 0;

        for (int i = 0; i < s.size(); i++) {
            for (int j = i; j < s.size(); j++) {
                int l = i, r = j;
                while (l < r && s[l] == s[r]) {
                    l++;
                    r--;
                }
                res += (l >= r);
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
    countSubstrings(s) {
        let res = 0;

        for (let i = 0; i < s.length; i++) {
            for (let j = i; j < s.length; j++) {
                let l = i, r = j;
                while (l < r && s[l] === s[r]) {
                    l++;
                    r--;
                }
                res += (l >= r) ? 1 : 0;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountSubstrings(string s) {
        int res = 0;

        for (int i = 0; i < s.Length; i++) {
            for (int j = i; j < s.Length; j++) {
                int l = i, r = j;
                while (l < r && s[l] == s[r]) {
                    l++;
                    r--;
                }
                res += (l >= r) ? 1 : 0;
            }
        }

        return res;
    }
}
```

```go
func countSubstrings(s string) int {
    res := 0
    for i := range s {
        for j := i; j < len(s); j++ {
            l, r := i, j
            for l < r && s[l] == s[r] {
                l++
                r--
            }
            if l >= r {
                res++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countSubstrings(s: String): Int {
        var res = 0
        for (i in s.indices) {
            for (j in i until s.length) {
                var l = i
                var r = j
                while (l < r && s[l] == s[r]) {
                    l++
                    r--
                }
                if (l >= r) {
                    res++
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
    def countSubstrings(self, s: str) -> int:
        n, res = len(s), 0
        dp = [[False] * n for _ in range(n)]

        for i in range(n - 1, -1, -1):
            for j in range(i, n):
                if s[i] == s[j] and (j - i <= 2 or dp[i + 1][j - 1]):
                    dp[i][j] = True
                    res += 1

        return res
```

```java
public class Solution {
    public int countSubstrings(String s) {
        int res = 0, n = s.length();
        boolean[][] dp = new boolean[n][n];

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j) && 
                    (j - i <= 2 || dp[i + 1][j - 1])) {
                        
                    dp[i][j] = true;
                    res++;
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
    int countSubstrings(string s) {
        int res = 0, n = s.length();
        vector<vector<bool>> dp(n, vector<bool>(n, false));

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && 
                    (j - i <= 2 || dp[i + 1][j - 1])) {

                    dp[i][j] = true;
                    res++;
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
    countSubstrings(s) {
        let res = 0;
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(false));

        for (let i = n - 1; i >= 0; i--) {
            for (let j = i; j < n; j++) {
                if (s[i] === s[j] && 
                    (j - i <= 2 || dp[i + 1][j - 1])) {
                        
                    dp[i][j] = true;
                    res++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountSubstrings(string s) {
        int res = 0, n = s.Length;
        bool[,] dp = new bool[n, n];

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && 
                   (j - i <= 2 || dp[i + 1, j - 1])) {
                    
                    dp[i, j] = true;
                    res++;
                }
            }
        }

        return res;
    }
}
```

```go
func countSubstrings(s string) int {
    n := len(s)
    res := 0
    dp := make([][]bool, n)
    for i := range dp {
        dp[i] = make([]bool, n)
    }

    for i := n - 1; i >= 0; i-- {
        for j := i; j < n; j++ {
            if s[i] == s[j] && (j-i <= 2 || dp[i+1][j-1]) {
                dp[i][j] = true
                res++
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubstrings(s: String): Int {
        val n = s.length
        var res = 0
        val dp = Array(n) { BooleanArray(n) }

        for (i in n - 1 downTo 0) {
            for (j in i until n) {
                if (s[i] == s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
                    dp[i][j] = true
                    res++
                }
            }
        }

        return res
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
    def countSubstrings(self, s: str) -> int:
        res = 0
        
        for i in range(len(s)):
            # odd length
            l, r = i, i
            while l >= 0 and r < len(s) and s[l] == s[r]:
                res += 1
                l -= 1
                r += 1

            # even length
            l, r = i, i + 1
            while l >= 0 and r < len(s) and s[l] == s[r]:
                res += 1
                l -= 1
                r += 1
        
        return res
```

```java
public class Solution {
    public int countSubstrings(String s) {
        int res = 0;
        
        for (int i = 0; i < s.length(); i++) {
            // odd length
            int l = i, r = i;
            while (l >= 0 && r < s.length() && 
                   s.charAt(l) == s.charAt(r)) {
                res++;
                l--;
                r++;
            }

            // even length
            l = i;
            r = i + 1;
            while (l >= 0 && r < s.length() && 
                   s.charAt(l) == s.charAt(r)) {
                res++;
                l--;
                r++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countSubstrings(string s) {
        int res = 0;

        for (int i = 0; i < s.size(); i++) {
            // odd length
            int l = i, r = i;
            while (l >= 0 && r < s.size() &&
                   s[l] == s[r]) {
                res++;
                l--;
                r++;
            }

            // even length
            l = i;
            r = i + 1;
            while (l >= 0 && r < s.size() &&
                   s[l] == s[r]) {
                res++;
                l--;
                r++;
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
    countSubstrings(s) {
        let res = 0;
        
        for (let i = 0; i < s.length; i++) {
            // odd length
            let l = i;
                let r = i;
            while (l >= 0 && r < s.length &&
                   s.charAt(l) === s.charAt(r)) {
                res++;
                l--;
                r++;
            }

            // even length
            l = i;
            r = i + 1;
            while (l >= 0 && r < s.length &&
                   s.charAt(l) === s.charAt(r)) {
                res++;
                l--;
                r++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountSubstrings(string s) {
        int res = 0;
        
        for (int i = 0; i < s.Length; i++) {
            // odd length
            int l = i, r = i;
            while (l >= 0 && r < s.Length &&
                   s[l] == s[r]) {
                res++;
                l--;
                r++;
            }

            // even length
            l = i;
            r = i + 1;
            while (l >= 0 && r < s.Length &&
                   s[l] == s[r]) {
                res++;
                l--;
                r++;
            }
        }

        return res;
    }
}
```

```go
func countSubstrings(s string) int {
    res := 0

    for i := 0; i < len(s); i++ {
        // Odd-length
        l, r := i, i
        for l >= 0 && r < len(s) && s[l] == s[r] {
            res++
            l--
            r++
        }

        // Even-length
        l, r = i, i+1
        for l >= 0 && r < len(s) && s[l] == s[r] {
            res++
            l--
            r++
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubstrings(s: String): Int {
        var res = 0

        for (i in s.indices) {
            // Odd-length
            var l = i
            var r = i
            while (l >= 0 && r < s.length && s[l] == s[r]) {
                res++
                l--
                r++
            }

            // Even-length
            l = i
            r = i + 1
            while (l >= 0 && r < s.length && s[l] == s[r]) {
                res++
                l--
                r++
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 4. Two Pointers (Optimal)

::tabs-start

```python
class Solution:
    
    def countSubstrings(self, s: str) -> int:
        res = 0

        for i in range(len(s)):
            res += self.countPali(s, i, i)
            res += self.countPali(s, i, i + 1)
        return res

    def countPali(self, s, l, r):
        res = 0
        while l >= 0 and r < len(s) and s[l] == s[r]:
            res += 1
            l -= 1
            r += 1
        return res
```

```java
public class Solution {
    
    public int countSubstrings(String s) {
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            res += countPali(s, i, i);
            res += countPali(s, i, i + 1);
        }
        return res;
    }

    private int countPali(String s, int l, int r) {
        int res = 0;
        while (l >= 0 && r < s.length() &&
               s.charAt(l) == s.charAt(r)) {
            res++;
            l--;
            r++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countSubstrings(string s) {
        int res = 0;
        for (int i = 0; i < s.size(); i++) {
            res += countPali(s, i, i);
            res += countPali(s, i, i + 1);
        }
        return res;
    }

private:
    int countPali(string s, int l, int r) {
        int res = 0;
        while (l >= 0 && r < s.size() && s[l] == s[r]) {
            res++;
            l--;
            r++;
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
    countSubstrings(s) {
        let res = 0;
        for (let i = 0; i < s.length; i++) {
            res += this.countPali(s, i, i);
            res += this.countPali(s, i, i + 1);
        }
        return res;
    }

    /**
     * @param {string} s
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    countPali(s, l, r) {
        let res = 0;
        while (l >= 0 && r < s.length &&
               s.charAt(l) === s.charAt(r)) {
            res++;
            l--;
            r++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    
    public int CountSubstrings(string s) {
        int res = 0;
        for (int i = 0; i < s.Length; i++) {
            res += CountPali(s, i, i);
            res += CountPali(s, i, i + 1);
        }
        return res;
    }

    private int CountPali(string s, int l, int r) {
        int res = 0;
        while (l >= 0 && r < s.Length && s[l] == s[r]) {
            res++;
            l--;
            r++;
        }
        return res;
    }
}
```

```go
func countSubstrings(s string) int {
    res := 0
    for i := 0; i < len(s); i++ {
        res += countPali(s, i, i)   
        res += countPali(s, i, i+1) 
    }
    return res
}

func countPali(s string, l, r int) int {
    res := 0
    for l >= 0 && r < len(s) && s[l] == s[r] {
        res++
        l--
        r++
    }
    return res
}
```

```kotlin
class Solution {
    fun countSubstrings(s: String): Int {
        var res = 0
        for (i in s.indices) {
            res += countPali(s, i, i)   
            res += countPali(s, i, i + 1) 
        }
        return res
    }

    private fun countPali(s: String, l: Int, r: Int): Int {
        var left = l
        var right = r
        var res = 0
        while (left >= 0 && right < s.length && s[left] == s[right]) {
            res++
            left--
            right++
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 5. Manacher's Algorithm

::tabs-start

```python
class Solution:
    def countSubstrings(self, s: str) -> int:

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
        res = 0
        for i in p:
            res += (i + 1) // 2
        return res
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

    public int countSubstrings(String s) {
        int res = 0;
        int[] p = manacher(s);
        for (int i : p) {
            res += (i + 1) / 2;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> manacher(string& s) {
        if (!s.size()) return {};
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

    int countSubstrings(string s) {
        vector<int> p = manacher(s);
        int res = 0;
        for (int i : p) {
            res += (i + 1) / 2;
        }
        return res;
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
     * @return {number}
     */
    countSubstrings(s) {
        const p = this.manacher(s);
        let res = 0;
        for (let i of p) {
            res += Math.floor((i + 1) / 2);
        }
        return res;
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

    public int CountSubstrings(string s) {
        int[] p = Manacher(s);
        int res = 0;
        foreach (int i in p) {
            res += (i + 1) / 2;
        }
        return res;
    }
}
```

```go
func countSubstrings(s string) int {
    manacher := func(s string) []int {
        t := "#" + joinWithSeparator(s, "#") + "#"
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
            if i+p[i] > r {
                l, r = i-p[i], i+p[i]
            }
        }
        return p
    }
    
    p := manacher(s)
    res := 0
    for _, val := range p {
        res += (val + 1) / 2
    }
    return res
}

func joinWithSeparator(s, sep string) string {
    result := ""
    for i := 0; i < len(s); i++ {
        result += string(s[i]) + sep
    }
    return result[:len(result)-1]
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
    fun countSubstrings(s: String): Int {
        fun manacher(s: String): IntArray {
            val t = "#" + s.toCharArray().joinToString("#") + "#"
            val n = t.length
            val p = IntArray(n)
            var l = 0
            var r = 0
            for (i in 0 until n) {
                if (i < r) {
                    p[i] = minOf(r - i, p[l + (r - i)])
                }
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
        var res = 0
        for (i in p) {
            res += (i + 1) / 2
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$