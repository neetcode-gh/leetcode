## 1. Recursion

::tabs-start

```python
class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        n = len(s)

        def isPalindrome(l, r):
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        def dfs(i):
            if i == n:
                return 0

            res = dfs(i + 1)
            for j in range(i + k - 1, n):
                if isPalindrome(i, j):
                    res = max(res, 1 + dfs(j + 1))
            return res

        return dfs(0)
```

```java
public class Solution {
    public int maxPalindromes(String s, int k) {
        return dfs(s, k, 0);
    }

    private int dfs(String s, int k, int i) {
        if (i == s.length()) {
            return 0;
        }

        int res = dfs(s, k, i + 1);
        for (int j = i + k - 1; j < s.length(); j++) {
            if (isPalindrome(s, i, j)) {
                res = Math.max(res, 1 + dfs(s, k, j + 1));
            }
        }
        return res;
    }

    private boolean isPalindrome(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    int maxPalindromes(string s, int k) {
        return dfs(s, k, 0);
    }

private:
    int dfs(const string& s, int k, int i) {
        int n = s.size();
        if (i == n) {
            return 0;
        }

        int res = dfs(s, k, i + 1);
        for (int j = i + k - 1; j < n; j++) {
            if (isPalindrome(s, i, j)) {
                res = max(res, 1 + dfs(s, k, j + 1));
            }
        }
        return res;
    }

    bool isPalindrome(const string& s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s, k) {
        const n = s.length;

        const isPalindrome = (l, r) => {
            while (l < r) {
                if (s[l] !== s[r]) {
                    return false;
                }
                l++;
                r--;
            }
            return true;
        };

        const dfs = (i) => {
            if (i === n) {
                return 0;
            }

            let res = dfs(i + 1);
            for (let j = i + k - 1; j < n; j++) {
                if (isPalindrome(i, j)) {
                    res = Math.max(res, 1 + dfs(j + 1));
                }
            }
            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public int MaxPalindromes(string s, int k) {
        return Dfs(s, k, 0);
    }

    private int Dfs(string s, int k, int i) {
        if (i == s.Length) {
            return 0;
        }

        int res = Dfs(s, k, i + 1);
        for (int j = i + k - 1; j < s.Length; j++) {
            if (IsPalindrome(s, i, j)) {
                res = Math.Max(res, 1 + Dfs(s, k, j + 1));
            }
        }
        return res;
    }

    private bool IsPalindrome(string s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```go
func maxPalindromes(s string, k int) int {
    n := len(s)

    isPalindrome := func(l, r int) bool {
        for l < r {
            if s[l] != s[r] {
                return false
            }
            l++
            r--
        }
        return true
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if i == n {
            return 0
        }

        res := dfs(i + 1)
        for j := i + k - 1; j < n; j++ {
            if isPalindrome(i, j) {
                res = max(res, 1+dfs(j+1))
            }
        }
        return res
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun maxPalindromes(s: String, k: Int): Int {
        val n = s.length

        fun isPalindrome(i: Int, j: Int): Boolean {
            var l = i
            var r = j
            while (l < r) {
                if (s[l] != s[r]) {
                    return false
                }
                l++
                r--
            }
            return true
        }

        fun dfs(i: Int): Int {
            if (i == n) {
                return 0
            }

            var res = dfs(i + 1)
            for (j in i + k - 1 until n) {
                if (isPalindrome(i, j)) {
                    res = maxOf(res, 1 + dfs(j + 1))
                }
            }
            return res
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func maxPalindromes(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)
        let n = chars.count

        func isPalindrome(_ i: Int, _ j: Int) -> Bool {
            var l = i
            var r = j
            while l < r {
                if chars[l] != chars[r] {
                    return false
                }
                l += 1
                r -= 1
            }
            return true
        }

        func dfs(_ i: Int) -> Int {
            if i == n {
                return 0
            }

            var res = dfs(i + 1)
            for j in stride(from: i + k - 1, to: n, by: 1) {
                if isPalindrome(i, j) {
                    res = max(res, 1 + dfs(j + 1))
                }
            }
            return res
        }

        return dfs(0)
    }
}
```

```rust
impl Solution {
    pub fn max_palindromes(s: String, k: i32) -> i32 {
        let s = s.as_bytes();
        Self::dfs(s, k as usize, 0)
    }

    fn dfs(s: &[u8], k: usize, i: usize) -> i32 {
        if i == s.len() {
            return 0;
        }

        let mut res = Self::dfs(s, k, i + 1);
        for j in (i + k - 1)..s.len() {
            if Self::is_palindrome(s, i, j) {
                res = res.max(1 + Self::dfs(s, k, j + 1));
            }
        }
        res
    }

    fn is_palindrome(s: &[u8], mut l: usize, mut r: usize) -> bool {
        while l < r {
            if s[l] != s[r] {
                return false;
            }
            l += 1;
            r -= 1;
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s: string, k: number): number {
        const n = s.length;

        const isPalindrome = (l: number, r: number): boolean => {
            while (l < r) {
                if (s[l] !== s[r]) {
                    return false;
                }
                l++;
                r--;
            }
            return true;
        };

        const dfs = (i: number): number => {
            if (i === n) {
                return 0;
            }

            let res = dfs(i + 1);
            for (let j = i + k - 1; j < n; j++) {
                if (isPalindrome(i, j)) {
                    res = Math.max(res, 1 + dfs(j + 1));
                }
            }
            return res;
        };

        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(n)$ for the recursion stack.

> Where $n$ is the length of the string $s$.

---

## 2. Dynamic Programming (Top-Down) - I

::tabs-start

```python
class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        n = len(s)
        dp = [-1] * n

        def isPalindrome(l, r):
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        def dfs(i):
            if i == n:
                return 0
            if dp[i] != -1:
                return dp[i]

            res = dfs(i + 1)
            for j in range(i + k - 1, n):
                if isPalindrome(i, j):
                    res = max(res, 1 + dfs(j + 1))
            dp[i] = res
            return res

        return dfs(0)
```

```java
public class Solution {
    private int[] dp;

    public int maxPalindromes(String s, int k) {
        dp = new int[s.length()];
        Arrays.fill(dp, -1);
        return dfs(s, k, 0);
    }

    private int dfs(String s, int k, int i) {
        if (i == s.length()) {
            return 0;
        }
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = dfs(s, k, i + 1);
        for (int j = i + k - 1; j < s.length(); j++) {
            if (isPalindrome(s, i, j)) {
                res = Math.max(res, 1 + dfs(s, k, j + 1));
            }
        }
        dp[i] = res;
        return res;
    }

    private boolean isPalindrome(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    int maxPalindromes(string s, int k) {
        dp.assign(s.size(), -1);
        return dfs(s, k, 0);
    }

private:
    vector<int> dp;

    int dfs(const string& s, int k, int i) {
        int n = s.size();
        if (i == n) {
            return 0;
        }
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = dfs(s, k, i + 1);
        for (int j = i + k - 1; j < n; j++) {
            if (isPalindrome(s, i, j)) {
                res = max(res, 1 + dfs(s, k, j + 1));
            }
        }
        dp[i] = res;
        return res;
    }

    bool isPalindrome(const string& s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s, k) {
        const n = s.length;
        const dp = new Array(n).fill(-1);

        const isPalindrome = (l, r) => {
            while (l < r) {
                if (s[l] !== s[r]) {
                    return false;
                }
                l++;
                r--;
            }
            return true;
        };

        const dfs = (i) => {
            if (i === n) {
                return 0;
            }
            if (dp[i] !== -1) {
                return dp[i];
            }

            let res = dfs(i + 1);
            for (let j = i + k - 1; j < n; j++) {
                if (isPalindrome(i, j)) {
                    res = Math.max(res, 1 + dfs(j + 1));
                }
            }
            dp[i] = res;
            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    private int[] dp;

    public int MaxPalindromes(string s, int k) {
        dp = new int[s.Length];
        Array.Fill(dp, -1);
        return Dfs(s, k, 0);
    }

    private int Dfs(string s, int k, int i) {
        if (i == s.Length) {
            return 0;
        }
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = Dfs(s, k, i + 1);
        for (int j = i + k - 1; j < s.Length; j++) {
            if (IsPalindrome(s, i, j)) {
                res = Math.Max(res, 1 + Dfs(s, k, j + 1));
            }
        }
        dp[i] = res;
        return res;
    }

    private bool IsPalindrome(string s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```go
func maxPalindromes(s string, k int) int {
    n := len(s)
    dp := make([]int, n)
    for i := range dp {
        dp[i] = -1
    }

    isPalindrome := func(l, r int) bool {
        for l < r {
            if s[l] != s[r] {
                return false
            }
            l++
            r--
        }
        return true
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if i == n {
            return 0
        }
        if dp[i] != -1 {
            return dp[i]
        }

        res := dfs(i + 1)
        for j := i + k - 1; j < n; j++ {
            if isPalindrome(i, j) {
                res = max(res, 1+dfs(j+1))
            }
        }
        dp[i] = res
        return res
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun maxPalindromes(s: String, k: Int): Int {
        val n = s.length
        val dp = IntArray(n) { -1 }

        fun isPalindrome(i: Int, j: Int): Boolean {
            var l = i
            var r = j
            while (l < r) {
                if (s[l] != s[r]) {
                    return false
                }
                l++
                r--
            }
            return true
        }

        fun dfs(i: Int): Int {
            if (i == n) {
                return 0
            }
            if (dp[i] != -1) {
                return dp[i]
            }

            var res = dfs(i + 1)
            for (j in i + k - 1 until n) {
                if (isPalindrome(i, j)) {
                    res = maxOf(res, 1 + dfs(j + 1))
                }
            }
            dp[i] = res
            return res
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func maxPalindromes(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)
        let n = chars.count
        var dp = [Int](repeating: -1, count: n)

        func isPalindrome(_ i: Int, _ j: Int) -> Bool {
            var l = i
            var r = j
            while l < r {
                if chars[l] != chars[r] {
                    return false
                }
                l += 1
                r -= 1
            }
            return true
        }

        func dfs(_ i: Int) -> Int {
            if i == n {
                return 0
            }
            if dp[i] != -1 {
                return dp[i]
            }

            var res = dfs(i + 1)
            for j in stride(from: i + k - 1, to: n, by: 1) {
                if isPalindrome(i, j) {
                    res = max(res, 1 + dfs(j + 1))
                }
            }
            dp[i] = res
            return res
        }

        return dfs(0)
    }
}
```

```rust
impl Solution {
    pub fn max_palindromes(s: String, k: i32) -> i32 {
        let s = s.as_bytes();
        let mut dp = vec![-1; s.len()];
        Self::dfs(s, k as usize, 0, &mut dp)
    }

    fn dfs(s: &[u8], k: usize, i: usize, dp: &mut Vec<i32>) -> i32 {
        if i == s.len() {
            return 0;
        }
        if dp[i] != -1 {
            return dp[i];
        }

        let mut res = Self::dfs(s, k, i + 1, dp);
        for j in (i + k - 1)..s.len() {
            if Self::is_palindrome(s, i, j) {
                res = res.max(1 + Self::dfs(s, k, j + 1, dp));
            }
        }
        dp[i] = res;
        res
    }

    fn is_palindrome(s: &[u8], mut l: usize, mut r: usize) -> bool {
        while l < r {
            if s[l] != s[r] {
                return false;
            }
            l += 1;
            r -= 1;
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s: string, k: number): number {
        const n = s.length;
        const dp: number[] = new Array(n).fill(-1);

        const isPalindrome = (l: number, r: number): boolean => {
            while (l < r) {
                if (s[l] !== s[r]) {
                    return false;
                }
                l++;
                r--;
            }
            return true;
        };

        const dfs = (i: number): number => {
            if (i === n) {
                return 0;
            }
            if (dp[i] !== -1) {
                return dp[i];
            }

            let res = dfs(i + 1);
            for (let j = i + k - 1; j < n; j++) {
                if (isPalindrome(i, j)) {
                    res = Math.max(res, 1 + dfs(j + 1));
                }
            }
            dp[i] = res;
            return res;
        };

        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$.

---

## 3. Dynamic Programming (Top-Down) - II

::tabs-start

```python
class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        n = len(s)
        isPal = [[None] * n for _ in range(n)]
        dp = [-1] * n

        def isPalindrome(l, r):
            if l >= r:
                return True
            if isPal[l][r] is not None:
                return isPal[l][r]
            isPal[l][r] = s[l] == s[r] and isPalindrome(l + 1, r - 1)
            return isPal[l][r]

        def dfs(i):
            if i == n:
                return 0
            if dp[i] != -1:
                return dp[i]

            res = dfs(i + 1)
            for j in range(i + k - 1, n):
                if isPalindrome(i, j):
                    res = max(res, 1 + dfs(j + 1))
            dp[i] = res
            return res

        return dfs(0)
```

```java
public class Solution {
    private Boolean[][] isPal;
    private int[] dp;

    public int maxPalindromes(String s, int k) {
        int n = s.length();
        isPal = new Boolean[n][n];
        dp = new int[n];
        Arrays.fill(dp, -1);
        return dfs(s, k, 0);
    }

    private int dfs(String s, int k, int i) {
        if (i == s.length()) {
            return 0;
        }
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = dfs(s, k, i + 1);
        for (int j = i + k - 1; j < s.length(); j++) {
            if (isPalindrome(s, i, j)) {
                res = Math.max(res, 1 + dfs(s, k, j + 1));
            }
        }
        dp[i] = res;
        return res;
    }

    private boolean isPalindrome(String s, int l, int r) {
        if (l >= r) {
            return true;
        }
        if (isPal[l][r] != null) {
            return isPal[l][r];
        }
        isPal[l][r] = s.charAt(l) == s.charAt(r) && isPalindrome(s, l + 1, r - 1);
        return isPal[l][r];
    }
}
```

```cpp
class Solution {
public:
    int maxPalindromes(string s, int k) {
        int n = s.size();
        isPal.assign(n, vector<int>(n, -1));
        dp.assign(n, -1);
        return dfs(s, k, 0);
    }

private:
    vector<vector<int>> isPal;
    vector<int> dp;

    int dfs(const string& s, int k, int i) {
        int n = s.size();
        if (i == n) {
            return 0;
        }
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = dfs(s, k, i + 1);
        for (int j = i + k - 1; j < n; j++) {
            if (isPalindrome(s, i, j)) {
                res = max(res, 1 + dfs(s, k, j + 1));
            }
        }
        dp[i] = res;
        return res;
    }

    bool isPalindrome(const string& s, int l, int r) {
        if (l >= r) {
            return true;
        }
        if (isPal[l][r] != -1) {
            return isPal[l][r];
        }
        isPal[l][r] = s[l] == s[r] && isPalindrome(s, l + 1, r - 1);
        return isPal[l][r];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s, k) {
        const n = s.length;
        const isPal = Array.from({ length: n }, () => Array(n).fill(null));
        const dp = new Array(n).fill(-1);

        const isPalindrome = (l, r) => {
            if (l >= r) {
                return true;
            }
            if (isPal[l][r] !== null) {
                return isPal[l][r];
            }
            isPal[l][r] = s[l] === s[r] && isPalindrome(l + 1, r - 1);
            return isPal[l][r];
        };

        const dfs = (i) => {
            if (i === n) {
                return 0;
            }
            if (dp[i] !== -1) {
                return dp[i];
            }

            let res = dfs(i + 1);
            for (let j = i + k - 1; j < n; j++) {
                if (isPalindrome(i, j)) {
                    res = Math.max(res, 1 + dfs(j + 1));
                }
            }
            dp[i] = res;
            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    private bool?[,] isPal;
    private int[] dp;

    public int MaxPalindromes(string s, int k) {
        int n = s.Length;
        isPal = new bool?[n, n];
        dp = new int[n];
        Array.Fill(dp, -1);
        return Dfs(s, k, 0);
    }

    private int Dfs(string s, int k, int i) {
        if (i == s.Length) {
            return 0;
        }
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = Dfs(s, k, i + 1);
        for (int j = i + k - 1; j < s.Length; j++) {
            if (IsPalindrome(s, i, j)) {
                res = Math.Max(res, 1 + Dfs(s, k, j + 1));
            }
        }
        dp[i] = res;
        return res;
    }

    private bool IsPalindrome(string s, int l, int r) {
        if (l >= r) {
            return true;
        }
        if (isPal[l, r].HasValue) {
            return isPal[l, r].Value;
        }
        isPal[l, r] = s[l] == s[r] && IsPalindrome(s, l + 1, r - 1);
        return isPal[l, r].Value;
    }
}
```

```go
func maxPalindromes(s string, k int) int {
    n := len(s)
    isPal := make([][]int, n)
    for i := range isPal {
        isPal[i] = make([]int, n)
        for j := range isPal[i] {
            isPal[i][j] = -1
        }
    }
    dp := make([]int, n)
    for i := range dp {
        dp[i] = -1
    }

    var isPalindrome func(l, r int) bool
    isPalindrome = func(l, r int) bool {
        if l >= r {
            return true
        }
        if isPal[l][r] != -1 {
            return isPal[l][r] == 1
        }
        isPal[l][r] = 0
        if s[l] == s[r] && isPalindrome(l+1, r-1) {
            isPal[l][r] = 1
        }
        return isPal[l][r] == 1
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if i == n {
            return 0
        }
        if dp[i] != -1 {
            return dp[i]
        }

        res := dfs(i + 1)
        for j := i + k - 1; j < n; j++ {
            if isPalindrome(i, j) {
                res = max(res, 1+dfs(j+1))
            }
        }
        dp[i] = res
        return res
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun maxPalindromes(s: String, k: Int): Int {
        val n = s.length
        val isPal = Array(n) { arrayOfNulls<Boolean>(n) }
        val dp = IntArray(n) { -1 }

        fun isPalindrome(l: Int, r: Int): Boolean {
            if (l >= r) {
                return true
            }
            val cached = isPal[l][r]
            if (cached != null) {
                return cached
            }
            val res = s[l] == s[r] && isPalindrome(l + 1, r - 1)
            isPal[l][r] = res
            return res
        }

        fun dfs(i: Int): Int {
            if (i == n) {
                return 0
            }
            if (dp[i] != -1) {
                return dp[i]
            }

            var res = dfs(i + 1)
            for (j in i + k - 1 until n) {
                if (isPalindrome(i, j)) {
                    res = maxOf(res, 1 + dfs(j + 1))
                }
            }
            dp[i] = res
            return res
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func maxPalindromes(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)
        let n = chars.count
        var isPal = [[Bool?]](repeating: [Bool?](repeating: nil, count: n), count: n)
        var dp = [Int](repeating: -1, count: n)

        func isPalindrome(_ l: Int, _ r: Int) -> Bool {
            if l >= r {
                return true
            }
            if let cached = isPal[l][r] {
                return cached
            }
            let res = chars[l] == chars[r] && isPalindrome(l + 1, r - 1)
            isPal[l][r] = res
            return res
        }

        func dfs(_ i: Int) -> Int {
            if i == n {
                return 0
            }
            if dp[i] != -1 {
                return dp[i]
            }

            var res = dfs(i + 1)
            for j in stride(from: i + k - 1, to: n, by: 1) {
                if isPalindrome(i, j) {
                    res = max(res, 1 + dfs(j + 1))
                }
            }
            dp[i] = res
            return res
        }

        return dfs(0)
    }
}
```

```rust
impl Solution {
    pub fn max_palindromes(s: String, k: i32) -> i32 {
        let s = s.as_bytes();
        let n = s.len();
        let mut is_pal = vec![vec![None; n]; n];
        let mut dp = vec![-1; n];
        Self::dfs(s, k as usize, 0, &mut dp, &mut is_pal)
    }

    fn dfs(
        s: &[u8],
        k: usize,
        i: usize,
        dp: &mut Vec<i32>,
        is_pal: &mut Vec<Vec<Option<bool>>>,
    ) -> i32 {
        if i == s.len() {
            return 0;
        }
        if dp[i] != -1 {
            return dp[i];
        }

        let mut res = Self::dfs(s, k, i + 1, dp, is_pal);
        for j in (i + k - 1)..s.len() {
            if Self::is_palindrome(s, i, j, is_pal) {
                res = res.max(1 + Self::dfs(s, k, j + 1, dp, is_pal));
            }
        }
        dp[i] = res;
        res
    }

    fn is_palindrome(s: &[u8], l: usize, r: usize, is_pal: &mut Vec<Vec<Option<bool>>>) -> bool {
        if l >= r {
            return true;
        }
        if let Some(cached) = is_pal[l][r] {
            return cached;
        }
        let res = s[l] == s[r] && Self::is_palindrome(s, l + 1, r - 1, is_pal);
        is_pal[l][r] = Some(res);
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s: string, k: number): number {
        const n = s.length;
        const isPal: (boolean | null)[][] = Array.from({ length: n }, () =>
            Array(n).fill(null),
        );
        const dp: number[] = new Array(n).fill(-1);

        const isPalindrome = (l: number, r: number): boolean => {
            if (l >= r) {
                return true;
            }
            if (isPal[l][r] !== null) {
                return isPal[l][r] as boolean;
            }
            isPal[l][r] = s[l] === s[r] && isPalindrome(l + 1, r - 1);
            return isPal[l][r] as boolean;
        };

        const dfs = (i: number): number => {
            if (i === n) {
                return 0;
            }
            if (dp[i] !== -1) {
                return dp[i];
            }

            let res = dfs(i + 1);
            for (let j = i + k - 1; j < n; j++) {
                if (isPalindrome(i, j)) {
                    res = Math.max(res, 1 + dfs(j + 1));
                }
            }
            dp[i] = res;
            return res;
        };

        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

> Where $n$ is the length of the string $s$.

---

## 4. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        n = len(s)
        isPal = [[False] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            for j in range(i, n):
                if s[i] == s[j] and (j - i < 2 or isPal[i + 1][j - 1]):
                    isPal[i][j] = True

        dp = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            dp[i] = dp[i + 1]
            for j in range(i + k - 1, n):
                if isPal[i][j]:
                    dp[i] = max(dp[i], 1 + dp[j + 1])

        return dp[0]
```

```java
public class Solution {
    public int maxPalindromes(String s, int k) {
        int n = s.length();
        boolean[][] isPal = new boolean[n][n];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j) && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true;
                }
            }
        }

        int[] dp = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            dp[i] = dp[i + 1];
            for (int j = i + k - 1; j < n; j++) {
                if (isPal[i][j]) {
                    dp[i] = Math.max(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int maxPalindromes(string s, int k) {
        int n = s.size();
        vector<vector<bool>> isPal(n, vector<bool>(n, false));
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true;
                }
            }
        }

        vector<int> dp(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) {
            dp[i] = dp[i + 1];
            for (int j = i + k - 1; j < n; j++) {
                if (isPal[i][j]) {
                    dp[i] = max(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s, k) {
        const n = s.length;
        const isPal = Array.from({ length: n }, () => Array(n).fill(false));
        for (let i = n - 1; i >= 0; i--) {
            for (let j = i; j < n; j++) {
                if (s[i] === s[j] && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true;
                }
            }
        }

        const dp = new Array(n + 1).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            dp[i] = dp[i + 1];
            for (let j = i + k - 1; j < n; j++) {
                if (isPal[i][j]) {
                    dp[i] = Math.max(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int MaxPalindromes(string s, int k) {
        int n = s.Length;
        bool[,] isPal = new bool[n, n];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && (j - i < 2 || isPal[i + 1, j - 1])) {
                    isPal[i, j] = true;
                }
            }
        }

        int[] dp = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            dp[i] = dp[i + 1];
            for (int j = i + k - 1; j < n; j++) {
                if (isPal[i, j]) {
                    dp[i] = Math.Max(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
}
```

```go
func maxPalindromes(s string, k int) int {
    n := len(s)
    isPal := make([][]bool, n)
    for i := range isPal {
        isPal[i] = make([]bool, n)
    }
    for i := n - 1; i >= 0; i-- {
        for j := i; j < n; j++ {
            if s[i] == s[j] && (j-i < 2 || isPal[i+1][j-1]) {
                isPal[i][j] = true
            }
        }
    }

    dp := make([]int, n+1)
    for i := n - 1; i >= 0; i-- {
        dp[i] = dp[i+1]
        for j := i + k - 1; j < n; j++ {
            if isPal[i][j] {
                dp[i] = max(dp[i], 1+dp[j+1])
            }
        }
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun maxPalindromes(s: String, k: Int): Int {
        val n = s.length
        val isPal = Array(n) { BooleanArray(n) }
        for (i in n - 1 downTo 0) {
            for (j in i until n) {
                if (s[i] == s[j] && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true
                }
            }
        }

        val dp = IntArray(n + 1)
        for (i in n - 1 downTo 0) {
            dp[i] = dp[i + 1]
            for (j in i + k - 1 until n) {
                if (isPal[i][j]) {
                    dp[i] = maxOf(dp[i], 1 + dp[j + 1])
                }
            }
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func maxPalindromes(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)
        let n = chars.count
        var isPal = [[Bool]](repeating: [Bool](repeating: false, count: n), count: n)
        for i in stride(from: n - 1, through: 0, by: -1) {
            for j in i..<n {
                if chars[i] == chars[j] && (j - i < 2 || isPal[i + 1][j - 1]) {
                    isPal[i][j] = true
                }
            }
        }

        var dp = [Int](repeating: 0, count: n + 1)
        for i in stride(from: n - 1, through: 0, by: -1) {
            dp[i] = dp[i + 1]
            for j in stride(from: i + k - 1, to: n, by: 1) {
                if isPal[i][j] {
                    dp[i] = max(dp[i], 1 + dp[j + 1])
                }
            }
        }

        return dp[0]
    }
}
```

```rust
impl Solution {
    pub fn max_palindromes(s: String, k: i32) -> i32 {
        let s = s.as_bytes();
        let n = s.len();
        let k = k as usize;
        let mut is_pal = vec![vec![false; n]; n];
        for i in (0..n).rev() {
            for j in i..n {
                if s[i] == s[j] && (j - i < 2 || is_pal[i + 1][j - 1]) {
                    is_pal[i][j] = true;
                }
            }
        }

        let mut dp = vec![0; n + 1];
        for i in (0..n).rev() {
            dp[i] = dp[i + 1];
            for j in (i + k - 1)..n {
                if is_pal[i][j] {
                    dp[i] = dp[i].max(1 + dp[j + 1]);
                }
            }
        }

        dp[0]
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s: string, k: number): number {
        const n = s.length;
        const isPal: boolean[][] = Array.from({ length: n }, () =>
            Array(n).fill(false),
        );
        for (let i = n - 1; i >= 0; i--) {
            for (let j = i; j < n; j++) {
                if (s[i] === s[j] && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true;
                }
            }
        }

        const dp: number[] = new Array(n + 1).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            dp[i] = dp[i + 1];
            for (let j = i + k - 1; j < n; j++) {
                if (isPal[i][j]) {
                    dp[i] = Math.max(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

> Where $n$ is the length of the string $s$.

---

## 5. Expand Around Center

::tabs-start

```python
class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        n = len(s)
        dp = [0] * (n + 1)

        def expand(l, r):
            while l >= 0 and r < n and s[l] == s[r]:
                if r - l + 1 >= k:
                    dp[r + 1] = max(dp[r + 1], dp[l] + 1)
                    break
                l -= 1
                r += 1

        for mid in range(n):
            dp[mid + 1] = max(dp[mid + 1], dp[mid])
            expand(mid, mid)
            expand(mid - 1, mid)

        return dp[n]
```

```java
public class Solution {
    public int maxPalindromes(String s, int k) {
        int n = s.length();
        int[] dp = new int[n + 1];

        for (int mid = 0; mid < n; mid++) {
            dp[mid + 1] = Math.max(dp[mid + 1], dp[mid]);
            expand(s, k, mid, mid, dp);
            expand(s, k, mid - 1, mid, dp);
        }

        return dp[n];
    }

    private void expand(String s, int k, int l, int r, int[] dp) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            if (r - l + 1 >= k) {
                dp[r + 1] = Math.max(dp[r + 1], dp[l] + 1);
                break;
            }
            l--;
            r++;
        }
    }
}
```

```cpp
class Solution {
public:
    int maxPalindromes(string s, int k) {
        int n = s.size();
        vector<int> dp(n + 1, 0);

        for (int mid = 0; mid < n; mid++) {
            dp[mid + 1] = max(dp[mid + 1], dp[mid]);
            expand(s, k, mid, mid, dp);
            expand(s, k, mid - 1, mid, dp);
        }

        return dp[n];
    }

private:
    void expand(const string& s, int k, int l, int r, vector<int>& dp) {
        int n = s.size();
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 >= k) {
                dp[r + 1] = max(dp[r + 1], dp[l] + 1);
                break;
            }
            l--;
            r++;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s, k) {
        const n = s.length;
        const dp = new Array(n + 1).fill(0);

        const expand = (l, r) => {
            while (l >= 0 && r < n && s[l] === s[r]) {
                if (r - l + 1 >= k) {
                    dp[r + 1] = Math.max(dp[r + 1], dp[l] + 1);
                    break;
                }
                l--;
                r++;
            }
        };

        for (let mid = 0; mid < n; mid++) {
            dp[mid + 1] = Math.max(dp[mid + 1], dp[mid]);
            expand(mid, mid);
            expand(mid - 1, mid);
        }

        return dp[n];
    }
}
```

```csharp
public class Solution {
    public int MaxPalindromes(string s, int k) {
        int n = s.Length;
        int[] dp = new int[n + 1];

        for (int mid = 0; mid < n; mid++) {
            dp[mid + 1] = Math.Max(dp[mid + 1], dp[mid]);
            Expand(s, k, mid, mid, dp);
            Expand(s, k, mid - 1, mid, dp);
        }

        return dp[n];
    }

    private void Expand(string s, int k, int l, int r, int[] dp) {
        while (l >= 0 && r < s.Length && s[l] == s[r]) {
            if (r - l + 1 >= k) {
                dp[r + 1] = Math.Max(dp[r + 1], dp[l] + 1);
                break;
            }
            l--;
            r++;
        }
    }
}
```

```go
func maxPalindromes(s string, k int) int {
    n := len(s)
    dp := make([]int, n+1)

    expand := func(l, r int) {
        for l >= 0 && r < n && s[l] == s[r] {
            if r-l+1 >= k {
                dp[r+1] = max(dp[r+1], dp[l]+1)
                break
            }
            l--
            r++
        }
    }

    for mid := 0; mid < n; mid++ {
        dp[mid+1] = max(dp[mid+1], dp[mid])
        expand(mid, mid)
        expand(mid-1, mid)
    }

    return dp[n]
}
```

```kotlin
class Solution {
    fun maxPalindromes(s: String, k: Int): Int {
        val n = s.length
        val dp = IntArray(n + 1)

        fun expand(left: Int, right: Int) {
            var l = left
            var r = right
            while (l >= 0 && r < n && s[l] == s[r]) {
                if (r - l + 1 >= k) {
                    dp[r + 1] = maxOf(dp[r + 1], dp[l] + 1)
                    break
                }
                l--
                r++
            }
        }

        for (mid in 0 until n) {
            dp[mid + 1] = maxOf(dp[mid + 1], dp[mid])
            expand(mid, mid)
            expand(mid - 1, mid)
        }

        return dp[n]
    }
}
```

```swift
class Solution {
    func maxPalindromes(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)
        let n = chars.count
        var dp = [Int](repeating: 0, count: n + 1)

        func expand(_ left: Int, _ right: Int) {
            var l = left
            var r = right
            while l >= 0 && r < n && chars[l] == chars[r] {
                if r - l + 1 >= k {
                    dp[r + 1] = max(dp[r + 1], dp[l] + 1)
                    break
                }
                l -= 1
                r += 1
            }
        }

        for mid in 0..<n {
            dp[mid + 1] = max(dp[mid + 1], dp[mid])
            expand(mid, mid)
            expand(mid - 1, mid)
        }

        return dp[n]
    }
}
```

```rust
impl Solution {
    pub fn max_palindromes(s: String, k: i32) -> i32 {
        let s = s.as_bytes();
        let n = s.len() as i32;
        let mut dp = vec![0; n as usize + 1];

        for mid in 0..n {
            let m = mid as usize;
            dp[m + 1] = dp[m + 1].max(dp[m]);
            Self::expand(s, k, mid, mid, &mut dp);
            Self::expand(s, k, mid - 1, mid, &mut dp);
        }

        dp[n as usize]
    }

    fn expand(s: &[u8], k: i32, mut l: i32, mut r: i32, dp: &mut Vec<i32>) {
        let n = s.len() as i32;
        while l >= 0 && r < n && s[l as usize] == s[r as usize] {
            if r - l + 1 >= k {
                let (li, ri) = (l as usize, r as usize);
                dp[ri + 1] = dp[ri + 1].max(dp[li] + 1);
                break;
            }
            l -= 1;
            r += 1;
        }
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s: string, k: number): number {
        const n = s.length;
        const dp: number[] = new Array(n + 1).fill(0);

        const expand = (l: number, r: number): void => {
            while (l >= 0 && r < n && s[l] === s[r]) {
                if (r - l + 1 >= k) {
                    dp[r + 1] = Math.max(dp[r + 1], dp[l] + 1);
                    break;
                }
                l--;
                r++;
            }
        };

        for (let mid = 0; mid < n; mid++) {
            dp[mid + 1] = Math.max(dp[mid + 1], dp[mid]);
            expand(mid, mid);
            expand(mid - 1, mid);
        }

        return dp[n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$ and $k$ is the minimum length of a selected palindrome.

---

## 6. Greedy

::tabs-start

```python
class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        n = len(s)

        def isPalindrome(l, r):
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        res = 0
        start = 0
        for i in range(k - 1, n):
            if i - k + 1 >= start and isPalindrome(i - k + 1, i):
                res += 1
                start = i + 1
            elif i - k >= start and isPalindrome(i - k, i):
                res += 1
                start = i + 1

        return res
```

```java
public class Solution {
    public int maxPalindromes(String s, int k) {
        int n = s.length();
        int res = 0, start = 0;
        for (int i = k - 1; i < n; i++) {
            if (i - k + 1 >= start && isPalindrome(s, i - k + 1, i)) {
                res++;
                start = i + 1;
            } else if (i - k >= start && isPalindrome(s, i - k, i)) {
                res++;
                start = i + 1;
            }
        }

        return res;
    }

    private boolean isPalindrome(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    int maxPalindromes(string s, int k) {
        int n = s.size();
        int res = 0, start = 0;
        for (int i = k - 1; i < n; i++) {
            if (i - k + 1 >= start && isPalindrome(s, i - k + 1, i)) {
                res++;
                start = i + 1;
            } else if (i - k >= start && isPalindrome(s, i - k, i)) {
                res++;
                start = i + 1;
            }
        }

        return res;
    }

private:
    bool isPalindrome(const string& s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s, k) {
        const n = s.length;

        const isPalindrome = (l, r) => {
            while (l < r) {
                if (s[l] !== s[r]) {
                    return false;
                }
                l++;
                r--;
            }
            return true;
        };

        let res = 0;
        let start = 0;
        for (let i = k - 1; i < n; i++) {
            if (i - k + 1 >= start && isPalindrome(i - k + 1, i)) {
                res++;
                start = i + 1;
            } else if (i - k >= start && isPalindrome(i - k, i)) {
                res++;
                start = i + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxPalindromes(string s, int k) {
        int n = s.Length;
        int res = 0, start = 0;
        for (int i = k - 1; i < n; i++) {
            if (i - k + 1 >= start && IsPalindrome(s, i - k + 1, i)) {
                res++;
                start = i + 1;
            } else if (i - k >= start && IsPalindrome(s, i - k, i)) {
                res++;
                start = i + 1;
            }
        }

        return res;
    }

    private bool IsPalindrome(string s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```go
func maxPalindromes(s string, k int) int {
    n := len(s)

    isPalindrome := func(l, r int) bool {
        for l < r {
            if s[l] != s[r] {
                return false
            }
            l++
            r--
        }
        return true
    }

    res, start := 0, 0
    for i := k - 1; i < n; i++ {
        if i-k+1 >= start && isPalindrome(i-k+1, i) {
            res++
            start = i + 1
        } else if i-k >= start && isPalindrome(i-k, i) {
            res++
            start = i + 1
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxPalindromes(s: String, k: Int): Int {
        val n = s.length

        fun isPalindrome(i: Int, j: Int): Boolean {
            var l = i
            var r = j
            while (l < r) {
                if (s[l] != s[r]) {
                    return false
                }
                l++
                r--
            }
            return true
        }

        var res = 0
        var start = 0
        for (i in k - 1 until n) {
            if (i - k + 1 >= start && isPalindrome(i - k + 1, i)) {
                res++
                start = i + 1
            } else if (i - k >= start && isPalindrome(i - k, i)) {
                res++
                start = i + 1
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maxPalindromes(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)
        let n = chars.count

        func isPalindrome(_ i: Int, _ j: Int) -> Bool {
            var l = i
            var r = j
            while l < r {
                if chars[l] != chars[r] {
                    return false
                }
                l += 1
                r -= 1
            }
            return true
        }

        var res = 0
        var start = 0
        for i in (k - 1)..<n {
            if i - k + 1 >= start && isPalindrome(i - k + 1, i) {
                res += 1
                start = i + 1
            } else if i - k >= start && isPalindrome(i - k, i) {
                res += 1
                start = i + 1
            }
        }

        return res
    }
}
```

```rust
impl Solution {
    pub fn max_palindromes(s: String, k: i32) -> i32 {
        let s = s.as_bytes();
        let n = s.len();
        let k = k as usize;
        let (mut res, mut start) = (0, 0);
        for i in (k - 1)..n {
            if i + 1 >= start + k && Self::is_palindrome(s, i + 1 - k, i) {
                res += 1;
                start = i + 1;
            } else if i >= start + k && Self::is_palindrome(s, i - k, i) {
                res += 1;
                start = i + 1;
            }
        }

        res
    }

    fn is_palindrome(s: &[u8], mut l: usize, mut r: usize) -> bool {
        while l < r {
            if s[l] != s[r] {
                return false;
            }
            l += 1;
            r -= 1;
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxPalindromes(s: string, k: number): number {
        const n = s.length;

        const isPalindrome = (l: number, r: number): boolean => {
            while (l < r) {
                if (s[l] !== s[r]) {
                    return false;
                }
                l++;
                r--;
            }
            return true;
        };

        let res = 0;
        let start = 0;
        for (let i = k - 1; i < n; i++) {
            if (i - k + 1 >= start && isPalindrome(i - k + 1, i)) {
                res++;
                start = i + 1;
            } else if (i - k >= start && isPalindrome(i - k, i)) {
                res++;
                start = i + 1;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the string $s$ and $k$ is the minimum length of a selected palindrome.
