## 1. Recursion

::tabs-start

```python
class Solution:
    def minCut(self, s: str) -> int:
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

            res = n
            for j in range(i, n):
                if isPalindrome(i, j):
                    res = min(res, 1 + dfs(j + 1))
            return res

        return dfs(0) - 1
```

```java
public class Solution {
    public int minCut(String s) {
        return dfs(s, 0) - 1;
    }

    private int dfs(String s, int i) {
        if (i == s.length()) {
            return 0;
        }

        int res = s.length();
        for (int j = i; j < s.length(); j++) {
            if (isPalindrome(s, i, j)) {
                res = Math.min(res, 1 + dfs(s, j + 1));
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
    int minCut(string s) {
        return dfs(s, 0) - 1;
    }

private:
    int dfs(const string& s, int i) {
        int n = s.size();
        if (i == n) {
            return 0;
        }

        int res = n;
        for (int j = i; j < n; j++) {
            if (isPalindrome(s, i, j)) {
                res = min(res, 1 + dfs(s, j + 1));
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
     * @return {number}
     */
    minCut(s) {
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

            let res = n;
            for (let j = i; j < n; j++) {
                if (isPalindrome(i, j)) {
                    res = Math.min(res, 1 + dfs(j + 1));
                }
            }
            return res;
        };

        return dfs(0) - 1;
    }
}
```

```csharp
public class Solution {
    public int MinCut(string s) {
        return Dfs(s, 0) - 1;
    }

    private int Dfs(string s, int i) {
        if (i == s.Length) {
            return 0;
        }

        int res = s.Length;
        for (int j = i; j < s.Length; j++) {
            if (IsPalindrome(s, i, j)) {
                res = Math.Min(res, 1 + Dfs(s, j + 1));
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
func minCut(s string) int {
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

        res := n
        for j := i; j < n; j++ {
            if isPalindrome(i, j) {
                res = min(res, 1+dfs(j+1))
            }
        }
        return res
    }

    return dfs(0) - 1
}
```

```kotlin
class Solution {
    fun minCut(s: String): Int {
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

            var res = n
            for (j in i until n) {
                if (isPalindrome(i, j)) {
                    res = minOf(res, 1 + dfs(j + 1))
                }
            }
            return res
        }

        return dfs(0) - 1
    }
}
```

```swift
class Solution {
    func minCut(_ s: String) -> Int {
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

            var res = n
            for j in i..<n {
                if isPalindrome(i, j) {
                    res = min(res, 1 + dfs(j + 1))
                }
            }
            return res
        }

        return dfs(0) - 1
    }
}
```

```rust
impl Solution {
    pub fn min_cut(s: String) -> i32 {
        let s = s.as_bytes();
        Self::dfs(s, 0) - 1
    }

    fn dfs(s: &[u8], i: usize) -> i32 {
        if i == s.len() {
            return 0;
        }

        let mut res = s.len() as i32;
        for j in i..s.len() {
            if Self::is_palindrome(s, i, j) {
                res = res.min(1 + Self::dfs(s, j + 1));
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
     * @return {number}
     */
    minCut(s: string): number {
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

            let res = n;
            for (let j = i; j < n; j++) {
                if (isPalindrome(i, j)) {
                    res = Math.min(res, 1 + dfs(j + 1));
                }
            }
            return res;
        };

        return dfs(0) - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(n)$ for the recursion stack.

> Where $n$ is the length of the string $s$.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def minCut(self, s: str) -> int:
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

            res = n
            for j in range(i, n):
                if isPalindrome(i, j):
                    res = min(res, 1 + dfs(j + 1))
            dp[i] = res
            return res

        return dfs(0) - 1
```

```java
public class Solution {
    private Boolean[][] isPal;
    private int[] dp;

    public int minCut(String s) {
        int n = s.length();
        isPal = new Boolean[n][n];
        dp = new int[n];
        Arrays.fill(dp, -1);
        return dfs(s, 0) - 1;
    }

    private int dfs(String s, int i) {
        if (i == s.length()) {
            return 0;
        }
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = s.length();
        for (int j = i; j < s.length(); j++) {
            if (isPalindrome(s, i, j)) {
                res = Math.min(res, 1 + dfs(s, j + 1));
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
    int minCut(string s) {
        int n = s.size();
        isPal.assign(n, vector<int>(n, -1));
        dp.assign(n, -1);
        return dfs(s, 0) - 1;
    }

private:
    vector<vector<int>> isPal;
    vector<int> dp;

    int dfs(const string& s, int i) {
        int n = s.size();
        if (i == n) {
            return 0;
        }
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = n;
        for (int j = i; j < n; j++) {
            if (isPalindrome(s, i, j)) {
                res = min(res, 1 + dfs(s, j + 1));
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
     * @return {number}
     */
    minCut(s) {
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

            let res = n;
            for (let j = i; j < n; j++) {
                if (isPalindrome(i, j)) {
                    res = Math.min(res, 1 + dfs(j + 1));
                }
            }
            dp[i] = res;
            return res;
        };

        return dfs(0) - 1;
    }
}
```

```csharp
public class Solution {
    private bool?[,] isPal;
    private int[] dp;

    public int MinCut(string s) {
        int n = s.Length;
        isPal = new bool?[n, n];
        dp = new int[n];
        Array.Fill(dp, -1);
        return Dfs(s, 0) - 1;
    }

    private int Dfs(string s, int i) {
        if (i == s.Length) {
            return 0;
        }
        if (dp[i] != -1) {
            return dp[i];
        }

        int res = s.Length;
        for (int j = i; j < s.Length; j++) {
            if (IsPalindrome(s, i, j)) {
                res = Math.Min(res, 1 + Dfs(s, j + 1));
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
func minCut(s string) int {
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

        res := n
        for j := i; j < n; j++ {
            if isPalindrome(i, j) {
                res = min(res, 1+dfs(j+1))
            }
        }
        dp[i] = res
        return res
    }

    return dfs(0) - 1
}
```

```kotlin
class Solution {
    fun minCut(s: String): Int {
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

            var res = n
            for (j in i until n) {
                if (isPalindrome(i, j)) {
                    res = minOf(res, 1 + dfs(j + 1))
                }
            }
            dp[i] = res
            return res
        }

        return dfs(0) - 1
    }
}
```

```swift
class Solution {
    func minCut(_ s: String) -> Int {
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

            var res = n
            for j in i..<n {
                if isPalindrome(i, j) {
                    res = min(res, 1 + dfs(j + 1))
                }
            }
            dp[i] = res
            return res
        }

        return dfs(0) - 1
    }
}
```

```rust
impl Solution {
    pub fn min_cut(s: String) -> i32 {
        let s = s.as_bytes();
        let n = s.len();
        let mut is_pal = vec![vec![None; n]; n];
        let mut dp = vec![-1; n];
        Self::dfs(s, 0, &mut dp, &mut is_pal) - 1
    }

    fn dfs(s: &[u8], i: usize, dp: &mut Vec<i32>, is_pal: &mut Vec<Vec<Option<bool>>>) -> i32 {
        if i == s.len() {
            return 0;
        }
        if dp[i] != -1 {
            return dp[i];
        }

        let mut res = s.len() as i32;
        for j in i..s.len() {
            if Self::is_palindrome(s, i, j, is_pal) {
                res = res.min(1 + Self::dfs(s, j + 1, dp, is_pal));
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
     * @return {number}
     */
    minCut(s: string): number {
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

            let res = n;
            for (let j = i; j < n; j++) {
                if (isPalindrome(i, j)) {
                    res = Math.min(res, 1 + dfs(j + 1));
                }
            }
            dp[i] = res;
            return res;
        };

        return dfs(0) - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

> Where $n$ is the length of the string $s$.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        isPal = [[False] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            for j in range(i, n):
                if s[i] == s[j] and (j - i < 2 or isPal[i + 1][j - 1]):
                    isPal[i][j] = True

        dp = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            dp[i] = n
            for j in range(i, n):
                if isPal[i][j]:
                    dp[i] = min(dp[i], 1 + dp[j + 1])

        return dp[0] - 1
```

```java
public class Solution {
    public int minCut(String s) {
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
            dp[i] = n;
            for (int j = i; j < n; j++) {
                if (isPal[i][j]) {
                    dp[i] = Math.min(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0] - 1;
    }
}
```

```cpp
class Solution {
public:
    int minCut(string s) {
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
            dp[i] = n;
            for (int j = i; j < n; j++) {
                if (isPal[i][j]) {
                    dp[i] = min(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0] - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minCut(s) {
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
            dp[i] = n;
            for (let j = i; j < n; j++) {
                if (isPal[i][j]) {
                    dp[i] = Math.min(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0] - 1;
    }
}
```

```csharp
public class Solution {
    public int MinCut(string s) {
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
            dp[i] = n;
            for (int j = i; j < n; j++) {
                if (isPal[i, j]) {
                    dp[i] = Math.Min(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0] - 1;
    }
}
```

```go
func minCut(s string) int {
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
        dp[i] = n
        for j := i; j < n; j++ {
            if isPal[i][j] {
                dp[i] = min(dp[i], 1+dp[j+1])
            }
        }
    }

    return dp[0] - 1
}
```

```kotlin
class Solution {
    fun minCut(s: String): Int {
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
            dp[i] = n
            for (j in i until n) {
                if (isPal[i][j]) {
                    dp[i] = minOf(dp[i], 1 + dp[j + 1])
                }
            }
        }

        return dp[0] - 1
    }
}
```

```swift
class Solution {
    func minCut(_ s: String) -> Int {
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
            dp[i] = n
            for j in i..<n {
                if isPal[i][j] {
                    dp[i] = min(dp[i], 1 + dp[j + 1])
                }
            }
        }

        return dp[0] - 1
    }
}
```

```rust
impl Solution {
    pub fn min_cut(s: String) -> i32 {
        let s = s.as_bytes();
        let n = s.len();
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
            dp[i] = n as i32;
            for j in i..n {
                if is_pal[i][j] {
                    dp[i] = dp[i].min(1 + dp[j + 1]);
                }
            }
        }

        dp[0] - 1
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minCut(s: string): number {
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
            dp[i] = n;
            for (let j = i; j < n; j++) {
                if (isPal[i][j]) {
                    dp[i] = Math.min(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0] - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

> Where $n$ is the length of the string $s$.

---

## 4. Dynamic Programming (Bottom-Up Optimized)

::tabs-start

```python
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        isPal = [[False] * n for _ in range(n)]
        dp = [0] * (n + 1)

        for i in range(n - 1, -1, -1):
            dp[i] = n
            for j in range(i, n):
                if s[i] == s[j] and (j - i < 2 or isPal[i + 1][j - 1]):
                    isPal[i][j] = True
                    dp[i] = min(dp[i], 1 + dp[j + 1])

        return dp[0] - 1
```

```java
public class Solution {
    public int minCut(String s) {
        int n = s.length();
        boolean[][] isPal = new boolean[n][n];
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = n;
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j) && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true;
                    dp[i] = Math.min(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0] - 1;
    }
}
```

```cpp
class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        vector<vector<bool>> isPal(n, vector<bool>(n, false));
        vector<int> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = n;
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true;
                    dp[i] = min(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0] - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minCut(s) {
        const n = s.length;
        const isPal = Array.from({ length: n }, () => Array(n).fill(false));
        const dp = new Array(n + 1).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = n;
            for (let j = i; j < n; j++) {
                if (s[i] === s[j] && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true;
                    dp[i] = Math.min(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0] - 1;
    }
}
```

```csharp
public class Solution {
    public int MinCut(string s) {
        int n = s.Length;
        bool[,] isPal = new bool[n, n];
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = n;
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && (j - i < 2 || isPal[i + 1, j - 1])) {
                    isPal[i, j] = true;
                    dp[i] = Math.Min(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0] - 1;
    }
}
```

```go
func minCut(s string) int {
    n := len(s)
    isPal := make([][]bool, n)
    for i := range isPal {
        isPal[i] = make([]bool, n)
    }
    dp := make([]int, n+1)

    for i := n - 1; i >= 0; i-- {
        dp[i] = n
        for j := i; j < n; j++ {
            if s[i] == s[j] && (j-i < 2 || isPal[i+1][j-1]) {
                isPal[i][j] = true
                dp[i] = min(dp[i], 1+dp[j+1])
            }
        }
    }

    return dp[0] - 1
}
```

```kotlin
class Solution {
    fun minCut(s: String): Int {
        val n = s.length
        val isPal = Array(n) { BooleanArray(n) }
        val dp = IntArray(n + 1)

        for (i in n - 1 downTo 0) {
            dp[i] = n
            for (j in i until n) {
                if (s[i] == s[j] && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true
                    dp[i] = minOf(dp[i], 1 + dp[j + 1])
                }
            }
        }

        return dp[0] - 1
    }
}
```

```swift
class Solution {
    func minCut(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var isPal = [[Bool]](repeating: [Bool](repeating: false, count: n), count: n)
        var dp = [Int](repeating: 0, count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            dp[i] = n
            for j in i..<n {
                if chars[i] == chars[j] && (j - i < 2 || isPal[i + 1][j - 1]) {
                    isPal[i][j] = true
                    dp[i] = min(dp[i], 1 + dp[j + 1])
                }
            }
        }

        return dp[0] - 1
    }
}
```

```rust
impl Solution {
    pub fn min_cut(s: String) -> i32 {
        let s = s.as_bytes();
        let n = s.len();
        let mut is_pal = vec![vec![false; n]; n];
        let mut dp = vec![0; n + 1];

        for i in (0..n).rev() {
            dp[i] = n as i32;
            for j in i..n {
                if s[i] == s[j] && (j - i < 2 || is_pal[i + 1][j - 1]) {
                    is_pal[i][j] = true;
                    dp[i] = dp[i].min(1 + dp[j + 1]);
                }
            }
        }

        dp[0] - 1
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minCut(s: string): number {
        const n = s.length;
        const isPal: boolean[][] = Array.from({ length: n }, () =>
            Array(n).fill(false),
        );
        const dp: number[] = new Array(n + 1).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = n;
            for (let j = i; j < n; j++) {
                if (s[i] === s[j] && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true;
                    dp[i] = Math.min(dp[i], 1 + dp[j + 1]);
                }
            }
        }

        return dp[0] - 1;
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
    def minCut(self, s: str) -> int:
        n = len(s)
        dp = [i for i in range(n + 1)]

        def expand(l, r):
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r + 1] = min(dp[r + 1], dp[l] + 1)
                l -= 1
                r += 1

        for mid in range(n):
            expand(mid, mid)
            expand(mid - 1, mid)

        return dp[n] - 1
```

```java
public class Solution {
    public int minCut(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = i;
        }

        for (int mid = 0; mid < n; mid++) {
            expand(s, mid, mid, dp);
            expand(s, mid - 1, mid, dp);
        }

        return dp[n] - 1;
    }

    private void expand(String s, int l, int r, int[] dp) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            dp[r + 1] = Math.min(dp[r + 1], dp[l] + 1);
            l--;
            r++;
        }
    }
}
```

```cpp
class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n + 1);
        for (int i = 0; i <= n; i++) {
            dp[i] = i;
        }

        for (int mid = 0; mid < n; mid++) {
            expand(s, mid, mid, dp);
            expand(s, mid - 1, mid, dp);
        }

        return dp[n] - 1;
    }

private:
    void expand(const string& s, int l, int r, vector<int>& dp) {
        int n = s.size();
        while (l >= 0 && r < n && s[l] == s[r]) {
            dp[r + 1] = min(dp[r + 1], dp[l] + 1);
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
     * @return {number}
     */
    minCut(s) {
        const n = s.length;
        const dp = Array.from({ length: n + 1 }, (_, i) => i);

        const expand = (l, r) => {
            while (l >= 0 && r < n && s[l] === s[r]) {
                dp[r + 1] = Math.min(dp[r + 1], dp[l] + 1);
                l--;
                r++;
            }
        };

        for (let mid = 0; mid < n; mid++) {
            expand(mid, mid);
            expand(mid - 1, mid);
        }

        return dp[n] - 1;
    }
}
```

```csharp
public class Solution {
    public int MinCut(string s) {
        int n = s.Length;
        int[] dp = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = i;
        }

        for (int mid = 0; mid < n; mid++) {
            Expand(s, mid, mid, dp);
            Expand(s, mid - 1, mid, dp);
        }

        return dp[n] - 1;
    }

    private void Expand(string s, int l, int r, int[] dp) {
        while (l >= 0 && r < s.Length && s[l] == s[r]) {
            dp[r + 1] = Math.Min(dp[r + 1], dp[l] + 1);
            l--;
            r++;
        }
    }
}
```

```go
func minCut(s string) int {
    n := len(s)
    dp := make([]int, n+1)
    for i := range dp {
        dp[i] = i
    }

    expand := func(l, r int) {
        for l >= 0 && r < n && s[l] == s[r] {
            dp[r+1] = min(dp[r+1], dp[l]+1)
            l--
            r++
        }
    }

    for mid := 0; mid < n; mid++ {
        expand(mid, mid)
        expand(mid-1, mid)
    }

    return dp[n] - 1
}
```

```kotlin
class Solution {
    fun minCut(s: String): Int {
        val n = s.length
        val dp = IntArray(n + 1) { it }

        fun expand(left: Int, right: Int) {
            var l = left
            var r = right
            while (l >= 0 && r < n && s[l] == s[r]) {
                dp[r + 1] = minOf(dp[r + 1], dp[l] + 1)
                l--
                r++
            }
        }

        for (mid in 0 until n) {
            expand(mid, mid)
            expand(mid - 1, mid)
        }

        return dp[n] - 1
    }
}
```

```swift
class Solution {
    func minCut(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var dp = Array(0...n)

        func expand(_ left: Int, _ right: Int) {
            var l = left
            var r = right
            while l >= 0 && r < n && chars[l] == chars[r] {
                dp[r + 1] = min(dp[r + 1], dp[l] + 1)
                l -= 1
                r += 1
            }
        }

        for mid in 0..<n {
            expand(mid, mid)
            expand(mid - 1, mid)
        }

        return dp[n] - 1
    }
}
```

```rust
impl Solution {
    pub fn min_cut(s: String) -> i32 {
        let s = s.as_bytes();
        let n = s.len() as i32;
        let mut dp: Vec<i32> = (0..=n).collect();

        for mid in 0..n {
            Self::expand(s, mid, mid, &mut dp);
            Self::expand(s, mid - 1, mid, &mut dp);
        }

        dp[n as usize] - 1
    }

    fn expand(s: &[u8], mut l: i32, mut r: i32, dp: &mut Vec<i32>) {
        let n = s.len() as i32;
        while l >= 0 && r < n && s[l as usize] == s[r as usize] {
            let (li, ri) = (l as usize, r as usize);
            dp[ri + 1] = dp[ri + 1].min(dp[li] + 1);
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
     * @return {number}
     */
    minCut(s: string): number {
        const n = s.length;
        const dp: number[] = Array.from({ length: n + 1 }, (_, i) => i);

        const expand = (l: number, r: number): void => {
            while (l >= 0 && r < n && s[l] === s[r]) {
                dp[r + 1] = Math.min(dp[r + 1], dp[l] + 1);
                l--;
                r++;
            }
        };

        for (let mid = 0; mid < n; mid++) {
            expand(mid, mid);
            expand(mid - 1, mid);
        }

        return dp[n] - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$.
