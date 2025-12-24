## 1. Brute Force

### Intuition
A substring is **palindromic** if it reads the same forwards and backwards.

The brute-force idea is simple:
- Generate **all possible substrings**
- For each substring, **check if it is a palindrome**
- Count how many substrings satisfy this condition

To check a palindrome, use **two pointers**:
- One starting from the left
- One starting from the right
- Move inward while characters match

If the pointers cross (or meet), the substring is a palindrome.

### Algorithm
1. Initialize a counter `res = 0`
2. Use two loops:
   - First loop picks the **start index `i`**
   - Second loop picks the **end index `j`**
3. For each substring `s[i : j+1]`:
   - Set two pointers `l = i`, `r = j`
   - While `l < r` and characters match:
     - Move `l` right and `r` left
   - If pointers cross (`l >= r`), it is a palindrome
     - Increment the count
4. After checking all substrings, return the count

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
                let l = i,
                    r = j;
                while (l < r && s[l] === s[r]) {
                    l++;
                    r--;
                }
                res += l >= r ? 1 : 0;
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

```swift
class Solution {
    func countSubstrings(_ s: String) -> Int {
        let chars = Array(s)
        var res = 0

        for i in 0..<chars.count {
            for j in i..<chars.count {
                var l = i, r = j
                while l < r && chars[l] == chars[r] {
                    l += 1
                    r -= 1
                }
                if l >= r {
                    res += 1
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(1)$

---

## 2. Dynamic Programming

### Intuition
A substring `s[i..j]` is **palindromic** if:
- The end characters match: `s[i] == s[j]`
- The inside substring `s[i+1..j-1]` is also a palindrome  
  (or the length is ≤ 2, which is always a palindrome if ends match)

So instead of re-checking characters every time, we **reuse previous results**:
- Store whether a substring is palindromic in a DP table
- Build solutions for longer substrings using shorter ones

### Algorithm
1. Create a 2D DP table `dp[i][j]`
   - `dp[i][j] = True` if substring `s[i..j]` is a palindrome
2. Initialize a counter `res = 0`
3. Traverse the string **from bottom to top** for `i`
   - This ensures `dp[i+1][j-1]` is already computed
4. For each `(i, j)` where `j >= i`:
   - If `s[i] == s[j]` AND  
     `(j - i <= 2 OR dp[i+1][j-1] == True)`
     - Mark `dp[i][j] = True`
     - Increment `res`
5. Return `res`

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
                if (s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
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

```swift
class Solution {
    func countSubstrings(_ s: String) -> Int {
        let n = s.count
        var res = 0
        var dp = Array(repeating: Array(repeating: false, count: n), count: n)
        let chars = Array(s)

        for i in stride(from: n - 1, through: 0, by: -1) {
            for j in i..<n {
                if chars[i] == chars[j] && (j - i <= 2 || dp[i + 1][j - 1]) {
                    dp[i][j] = true
                    res += 1
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
- Space complexity: $O(n ^ 2)$

---

## 3. Two Pointers

### Intuition
Every palindrome has a **center**:
- For **odd-length** palindromes, the center is a single character
- For **even-length** palindromes, the center is between two characters

Instead of checking all substrings, we:
- Fix a center
- Expand **outwards** as long as characters match
- Each successful expansion forms **one palindrome**

This way, we count palindromes directly while expanding.

### Algorithm
1. Initialize `res = 0`
2. For each index `i` in the string:
   - **Odd-length palindromes**
     - Set `l = i`, `r = i`
     - While `l >= 0`, `r < n`, and `s[l] == s[r]`:
       - Increment `res`
       - Expand: `l--`, `r++`
   - **Even-length palindromes**
     - Set `l = i`, `r = i + 1`
     - While `l >= 0`, `r < n`, and `s[l] == s[r]`:
       - Increment `res`
       - Expand: `l--`, `r++`
3. Return `res`

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
            while (l >= 0 && r < s.length && s.charAt(l) === s.charAt(r)) {
                res++;
                l--;
                r++;
            }

            // even length
            l = i;
            r = i + 1;
            while (l >= 0 && r < s.length && s.charAt(l) === s.charAt(r)) {
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

```swift
class Solution {
    func countSubstrings(_ s: String) -> Int {
        let chars = Array(s)
        var res = 0

        for i in 0..<chars.count {
            // Odd length palindromes
            var l = i, r = i
            while l >= 0 && r < chars.count && chars[l] == chars[r] {
                res += 1
                l -= 1
                r += 1
            }

            // Even length palindromes
            l = i
            r = i + 1
            while l >= 0 && r < chars.count && chars[l] == chars[r] {
                res += 1
                l -= 1
                r += 1
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

## 4. Two Pointers (Optimal)

### Intuition
Every palindromic substring can be identified by **expanding from its center**.

There are only **two possible centers** for any palindrome:
1. A **single character** → odd-length palindromes  
2. The **gap between two characters** → even-length palindromes  

Instead of duplicating logic for both cases, we extract the expansion logic into a helper function (`countPali`).  
This keeps the solution **clean, reusable, and optimal**.

For each index `i`, we:
- Count palindromes centered at `(i, i)`
- Count palindromes centered at `(i, i + 1)`

Each successful expansion corresponds to **one valid palindrome**.

### Algorithm
1. Initialize `res = 0`
2. For each index `i` in the string:
   - Add palindromes from **odd center**: `countPali(s, i, i)`
   - Add palindromes from **even center**: `countPali(s, i, i + 1)`
3. In `countPali(s, l, r)`:
   - While `l >= 0`, `r < n`, and `s[l] == s[r]`:
     - Increment count
     - Expand outward: `l--`, `r++`
4. Return total count

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
        while (l >= 0 && r < s.length && s.charAt(l) === s.charAt(r)) {
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

```swift
class Solution {
    func countSubstrings(_ s: String) -> Int {
        var res = 0
        let chars = Array(s)

        for i in 0..<chars.count {
            res += countPali(chars, i, i)
            res += countPali(chars, i, i + 1)
        }
        return res
    }

    private func countPali(_ s: [Character], _ l: Int, _ r: Int) -> Int {
        var res = 0
        var left = l, right = r

        while left >= 0 && right < s.count && s[left] == s[right] {
            res += 1
            left -= 1
            right += 1
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

## 5. Manacher's Algorithm

### Intuition
The “expand around center” idea is great, but it can redo the same comparisons many times, making it `O(n^2)`.

**Manacher’s Algorithm** speeds this up to **O(n)** by using two tricks:

1. **Normalize odd/even palindromes**
   - Insert a separator like `#` between characters:  
     `"abba"` → `"#a#b#b#a#"`
   - Now every palindrome in this new string has an **odd-length center**, so we only handle one case.

2. **Reuse information using a “current best palindrome window”**
   - Maintain a palindrome window `[l, r]` (the farthest-reaching palindrome found so far).
   - For a new position `i` inside `[l, r]`, we know its **mirror position** `mirror = l + (r - i)`.
   - The palindrome radius at `i` can be **at least** the smaller of:
     - how much space remains inside the window (`r - i`)
     - the palindrome radius at `mirror` (`p[mirror]`)
   - Then we try to expand further only if possible.

This avoids repeated expansions and ensures total work is linear.

### Algorithm
1. Build transformed string `t` by inserting `#` between characters and at ends.
2. Create array `p` where `p[i]` = radius of palindrome centered at `i` in `t`.
3. Track the current palindrome boundaries `[l, r]`.
4. For each index `i`:
   - If `i` is inside `[l, r]`, initialize `p[i]` using its mirror.
   - Expand outward while characters match.
   - If palindrome at `i` extends beyond `r`, update `[l, r]`.
5. Convert radii in `p` into the number of palindromic substrings in the original string:
   - Each center contributes `(p[i] + 1) // 2`
6. Sum contributions and return.

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
        let l = 0,
            r = 0;
        for (let i = 0; i < n; i++) {
            p[i] = i < r ? Math.min(r - i, p[l + (r - i)]) : 0;
            while (
                i + p[i] + 1 < n &&
                i - p[i] - 1 >= 0 &&
                t[i + p[i] + 1] === t[i - p[i] - 1]
            ) {
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

```swift
class Solution {
    func countSubstrings(_ s: String) -> Int {
        func manacher(_ s: String) -> [Int] {
            let t = "#" + s.map { "\($0)#" }.joined()
            let chars = Array(t)
            let n = chars.count
            var p = Array(repeating: 0, count: n)
            var l = 0, r = 0

            for i in 0..<n {
                if i < r {
                    p[i] = min(r - i, p[l + (r - i)])
                }
                while i + p[i] + 1 < n, i - p[i] - 1 >= 0,
                      chars[i + p[i] + 1] == chars[i - p[i] - 1] {
                    p[i] += 1
                }
                if i + p[i] > r {
                    l = i - p[i]
                    r = i + p[i]
                }
            }
            return p
        }

        let p = manacher(s)
        var res = 0
        for i in p {
            res += (i + 1) / 2
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
