## 1. Recursion

::tabs-start

```python
class Solution:
    def isDecomposable(self, s: str) -> bool:
        n = len(s)

        def same(i, length):
            return i + length <= n and len(set(s[i:i + length])) == 1

        def dfs(i, used):
            if i == n:
                return used
            if same(i, 3) and dfs(i + 3, used):
                return True
            if not used and same(i, 2) and dfs(i + 2, True):
                return True
            return False

        return dfs(0, False)
```

```java
public class Solution {
    private String s;
    private int n;

    public boolean isDecomposable(String s) {
        this.s = s;
        this.n = s.length();
        return dfs(0, false);
    }

    private boolean same(int i, int len) {
        if (i + len > n) {
            return false;
        }
        for (int j = i + 1; j < i + len; j++) {
            if (s.charAt(j) != s.charAt(i)) {
                return false;
            }
        }
        return true;
    }

    private boolean dfs(int i, boolean used) {
        if (i == n) {
            return used;
        }
        if (same(i, 3) && dfs(i + 3, used)) {
            return true;
        }
        if (!used && same(i, 2) && dfs(i + 2, true)) {
            return true;
        }
        return false;
    }
}
```

```cpp
class Solution {
    string s;
    int n;

    bool same(int i, int len) {
        if (i + len > n) {
            return false;
        }
        for (int j = i + 1; j < i + len; j++) {
            if (s[j] != s[i]) {
                return false;
            }
        }
        return true;
    }

    bool dfs(int i, bool used) {
        if (i == n) {
            return used;
        }
        if (same(i, 3) && dfs(i + 3, used)) {
            return true;
        }
        if (!used && same(i, 2) && dfs(i + 2, true)) {
            return true;
        }
        return false;
    }

public:
    bool isDecomposable(string s) {
        this->s = s;
        this->n = s.size();
        return dfs(0, false);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isDecomposable(s) {
        const n = s.length;

        const same = (i, len) => {
            if (i + len > n) {
                return false;
            }
            for (let j = i + 1; j < i + len; j++) {
                if (s[j] !== s[i]) {
                    return false;
                }
            }
            return true;
        };

        const dfs = (i, used) => {
            if (i === n) {
                return used;
            }
            if (same(i, 3) && dfs(i + 3, used)) {
                return true;
            }
            if (!used && same(i, 2) && dfs(i + 2, true)) {
                return true;
            }
            return false;
        };

        return dfs(0, false);
    }
}
```

```csharp
public class Solution {
    private string s;
    private int n;

    public bool IsDecomposable(string s) {
        this.s = s;
        this.n = s.Length;
        return Dfs(0, false);
    }

    private bool Same(int i, int len) {
        if (i + len > n) {
            return false;
        }
        for (int j = i + 1; j < i + len; j++) {
            if (s[j] != s[i]) {
                return false;
            }
        }
        return true;
    }

    private bool Dfs(int i, bool used) {
        if (i == n) {
            return used;
        }
        if (Same(i, 3) && Dfs(i + 3, used)) {
            return true;
        }
        if (!used && Same(i, 2) && Dfs(i + 2, true)) {
            return true;
        }
        return false;
    }
}
```

```go
func isDecomposable(s string) bool {
    n := len(s)

    same := func(i, length int) bool {
        if i+length > n {
            return false
        }
        for j := i + 1; j < i+length; j++ {
            if s[j] != s[i] {
                return false
            }
        }
        return true
    }

    var dfs func(i int, used bool) bool
    dfs = func(i int, used bool) bool {
        if i == n {
            return used
        }
        if same(i, 3) && dfs(i+3, used) {
            return true
        }
        if !used && same(i, 2) && dfs(i+2, true) {
            return true
        }
        return false
    }

    return dfs(0, false)
}
```

```kotlin
class Solution {
    private var s = ""
    private var n = 0

    fun isDecomposable(s: String): Boolean {
        this.s = s
        this.n = s.length
        return dfs(0, false)
    }

    private fun same(i: Int, len: Int): Boolean {
        if (i + len > n) {
            return false
        }
        for (j in i + 1 until i + len) {
            if (s[j] != s[i]) {
                return false
            }
        }
        return true
    }

    private fun dfs(i: Int, used: Boolean): Boolean {
        if (i == n) {
            return used
        }
        if (same(i, 3) && dfs(i + 3, used)) {
            return true
        }
        if (!used && same(i, 2) && dfs(i + 2, true)) {
            return true
        }
        return false
    }
}
```

```swift
class Solution {
    private var chars: [Character] = []
    private var n = 0

    func isDecomposable(_ s: String) -> Bool {
        chars = Array(s)
        n = chars.count
        return dfs(0, false)
    }

    private func same(_ i: Int, _ len: Int) -> Bool {
        if i + len > n {
            return false
        }
        for j in (i + 1)..<(i + len) {
            if chars[j] != chars[i] {
                return false
            }
        }
        return true
    }

    private func dfs(_ i: Int, _ used: Bool) -> Bool {
        if i == n {
            return used
        }
        if same(i, 3) && dfs(i + 3, used) {
            return true
        }
        if !used && same(i, 2) && dfs(i + 2, true) {
            return true
        }
        return false
    }
}
```

```rust
impl Solution {
    pub fn is_decomposable(s: String) -> bool {
        Self::dfs(s.as_bytes(), 0, false)
    }

    fn same(s: &[u8], i: usize, len: usize) -> bool {
        if i + len > s.len() {
            return false;
        }
        for j in i + 1..i + len {
            if s[j] != s[i] {
                return false;
            }
        }
        true
    }

    fn dfs(s: &[u8], i: usize, used: bool) -> bool {
        if i == s.len() {
            return used;
        }
        if Self::same(s, i, 3) && Self::dfs(s, i + 3, used) {
            return true;
        }
        if !used && Self::same(s, i, 2) && Self::dfs(s, i + 2, true) {
            return true;
        }
        false
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isDecomposable(s: string): boolean {
        const n = s.length;

        const same = (i: number, len: number): boolean => {
            if (i + len > n) {
                return false;
            }
            for (let j = i + 1; j < i + len; j++) {
                if (s[j] !== s[i]) {
                    return false;
                }
            }
            return true;
        };

        const dfs = (i: number, used: boolean): boolean => {
            if (i === n) {
                return used;
            }
            if (same(i, 3) && dfs(i + 3, used)) {
                return true;
            }
            if (!used && same(i, 2) && dfs(i + 2, true)) {
                return true;
            }
            return false;
        };

        return dfs(0, false);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for the recursion stack.

> Where $n$ is the length of the string $s$.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def isDecomposable(self, s: str) -> bool:
        n = len(s)
        dp = [[None] * 2 for _ in range(n)]

        def same(i, length):
            return i + length <= n and len(set(s[i:i + length])) == 1

        def dfs(i, used):
            if i == n:
                return used == 1
            if dp[i][used] is not None:
                return dp[i][used]
            res = False
            if same(i, 3) and dfs(i + 3, used):
                res = True
            elif used == 0 and same(i, 2) and dfs(i + 2, 1):
                res = True
            dp[i][used] = res
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    private String s;
    private int n;
    private int[][] dp;

    public boolean isDecomposable(String s) {
        this.s = s;
        this.n = s.length();
        this.dp = new int[n][2];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return dfs(0, 0);
    }

    private boolean same(int i, int len) {
        if (i + len > n) {
            return false;
        }
        for (int j = i + 1; j < i + len; j++) {
            if (s.charAt(j) != s.charAt(i)) {
                return false;
            }
        }
        return true;
    }

    private boolean dfs(int i, int used) {
        if (i == n) {
            return used == 1;
        }
        if (dp[i][used] != -1) {
            return dp[i][used] == 1;
        }
        boolean res = false;
        if (same(i, 3) && dfs(i + 3, used)) {
            res = true;
        } else if (used == 0 && same(i, 2) && dfs(i + 2, 1)) {
            res = true;
        }
        dp[i][used] = res ? 1 : 0;
        return res;
    }
}
```

```cpp
class Solution {
    string s;
    int n;
    vector<vector<int>> dp;

    bool same(int i, int len) {
        if (i + len > n) {
            return false;
        }
        for (int j = i + 1; j < i + len; j++) {
            if (s[j] != s[i]) {
                return false;
            }
        }
        return true;
    }

    bool dfs(int i, int used) {
        if (i == n) {
            return used == 1;
        }
        if (dp[i][used] != -1) {
            return dp[i][used] == 1;
        }
        bool res = false;
        if (same(i, 3) && dfs(i + 3, used)) {
            res = true;
        } else if (used == 0 && same(i, 2) && dfs(i + 2, 1)) {
            res = true;
        }
        dp[i][used] = res ? 1 : 0;
        return res;
    }

public:
    bool isDecomposable(string s) {
        this->s = s;
        this->n = s.size();
        dp.assign(n, vector<int>(2, -1));
        return dfs(0, 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isDecomposable(s) {
        const n = s.length;
        const dp = Array.from({ length: n }, () => [-1, -1]);

        const same = (i, len) => {
            if (i + len > n) {
                return false;
            }
            for (let j = i + 1; j < i + len; j++) {
                if (s[j] !== s[i]) {
                    return false;
                }
            }
            return true;
        };

        const dfs = (i, used) => {
            if (i === n) {
                return used === 1;
            }
            if (dp[i][used] !== -1) {
                return dp[i][used] === 1;
            }
            let res = false;
            if (same(i, 3) && dfs(i + 3, used)) {
                res = true;
            } else if (used === 0 && same(i, 2) && dfs(i + 2, 1)) {
                res = true;
            }
            dp[i][used] = res ? 1 : 0;
            return res;
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private string s;
    private int n;
    private int[][] dp;

    public bool IsDecomposable(string s) {
        this.s = s;
        this.n = s.Length;
        dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[] { -1, -1 };
        }
        return Dfs(0, 0);
    }

    private bool Same(int i, int len) {
        if (i + len > n) {
            return false;
        }
        for (int j = i + 1; j < i + len; j++) {
            if (s[j] != s[i]) {
                return false;
            }
        }
        return true;
    }

    private bool Dfs(int i, int used) {
        if (i == n) {
            return used == 1;
        }
        if (dp[i][used] != -1) {
            return dp[i][used] == 1;
        }
        bool res = false;
        if (Same(i, 3) && Dfs(i + 3, used)) {
            res = true;
        } else if (used == 0 && Same(i, 2) && Dfs(i + 2, 1)) {
            res = true;
        }
        dp[i][used] = res ? 1 : 0;
        return res;
    }
}
```

```go
func isDecomposable(s string) bool {
    n := len(s)
    dp := make([][2]int, n)
    for i := range dp {
        dp[i] = [2]int{-1, -1}
    }

    same := func(i, length int) bool {
        if i+length > n {
            return false
        }
        for j := i + 1; j < i+length; j++ {
            if s[j] != s[i] {
                return false
            }
        }
        return true
    }

    var dfs func(i, used int) bool
    dfs = func(i, used int) bool {
        if i == n {
            return used == 1
        }
        if dp[i][used] != -1 {
            return dp[i][used] == 1
        }
        res := false
        if same(i, 3) && dfs(i+3, used) {
            res = true
        } else if used == 0 && same(i, 2) && dfs(i+2, 1) {
            res = true
        }
        dp[i][used] = 0
        if res {
            dp[i][used] = 1
        }
        return res
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    private var s = ""
    private var n = 0
    private lateinit var dp: Array<IntArray>

    fun isDecomposable(s: String): Boolean {
        this.s = s
        this.n = s.length
        dp = Array(n) { IntArray(2) { -1 } }
        return dfs(0, 0)
    }

    private fun same(i: Int, len: Int): Boolean {
        if (i + len > n) {
            return false
        }
        for (j in i + 1 until i + len) {
            if (s[j] != s[i]) {
                return false
            }
        }
        return true
    }

    private fun dfs(i: Int, used: Int): Boolean {
        if (i == n) {
            return used == 1
        }
        if (dp[i][used] != -1) {
            return dp[i][used] == 1
        }
        var res = false
        if (same(i, 3) && dfs(i + 3, used)) {
            res = true
        } else if (used == 0 && same(i, 2) && dfs(i + 2, 1)) {
            res = true
        }
        dp[i][used] = if (res) 1 else 0
        return res
    }
}
```

```swift
class Solution {
    private var chars: [Character] = []
    private var n = 0
    private var dp: [[Int]] = []

    func isDecomposable(_ s: String) -> Bool {
        chars = Array(s)
        n = chars.count
        dp = [[Int]](repeating: [-1, -1], count: n)
        return dfs(0, 0)
    }

    private func same(_ i: Int, _ len: Int) -> Bool {
        if i + len > n {
            return false
        }
        for j in (i + 1)..<(i + len) {
            if chars[j] != chars[i] {
                return false
            }
        }
        return true
    }

    private func dfs(_ i: Int, _ used: Int) -> Bool {
        if i == n {
            return used == 1
        }
        if dp[i][used] != -1 {
            return dp[i][used] == 1
        }
        var res = false
        if same(i, 3) && dfs(i + 3, used) {
            res = true
        } else if used == 0 && same(i, 2) && dfs(i + 2, 1) {
            res = true
        }
        dp[i][used] = res ? 1 : 0
        return res
    }
}
```

```rust
impl Solution {
    pub fn is_decomposable(s: String) -> bool {
        let s = s.as_bytes();
        let mut dp = vec![[-1i8; 2]; s.len()];
        Self::dfs(s, 0, 0, &mut dp)
    }

    fn same(s: &[u8], i: usize, len: usize) -> bool {
        if i + len > s.len() {
            return false;
        }
        for j in i + 1..i + len {
            if s[j] != s[i] {
                return false;
            }
        }
        true
    }

    fn dfs(s: &[u8], i: usize, used: usize, dp: &mut Vec<[i8; 2]>) -> bool {
        if i == s.len() {
            return used == 1;
        }
        if dp[i][used] != -1 {
            return dp[i][used] == 1;
        }
        let mut res = false;
        if Self::same(s, i, 3) && Self::dfs(s, i + 3, used, dp) {
            res = true;
        } else if used == 0 && Self::same(s, i, 2) && Self::dfs(s, i + 2, 1, dp) {
            res = true;
        }
        dp[i][used] = if res { 1 } else { 0 };
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isDecomposable(s: string): boolean {
        const n = s.length;
        const dp: number[][] = Array.from({ length: n }, () => [-1, -1]);

        const same = (i: number, len: number): boolean => {
            if (i + len > n) {
                return false;
            }
            for (let j = i + 1; j < i + len; j++) {
                if (s[j] !== s[i]) {
                    return false;
                }
            }
            return true;
        };

        const dfs = (i: number, used: number): boolean => {
            if (i === n) {
                return used === 1;
            }
            if (dp[i][used] !== -1) {
                return dp[i][used] === 1;
            }
            let res = false;
            if (same(i, 3) && dfs(i + 3, used)) {
                res = true;
            } else if (used === 0 && same(i, 2) && dfs(i + 2, 1)) {
                res = true;
            }
            dp[i][used] = res ? 1 : 0;
            return res;
        };

        return dfs(0, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def isDecomposable(self, s: str) -> bool:
        n = len(s)

        def same(i, length):
            return i + length <= n and len(set(s[i:i + length])) == 1

        dp = [[False] * 2 for _ in range(n + 1)]
        dp[n][1] = True
        for i in range(n - 1, -1, -1):
            for used in range(2):
                if same(i, 3) and dp[i + 3][used]:
                    dp[i][used] = True
                elif used == 0 and same(i, 2) and dp[i + 2][1]:
                    dp[i][used] = True
        return dp[0][0]
```

```java
public class Solution {
    public boolean isDecomposable(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n + 1][2];
        dp[n][1] = true;
        for (int i = n - 1; i >= 0; i--) {
            for (int used = 0; used < 2; used++) {
                if (same(s, i, 3) && dp[i + 3][used]) {
                    dp[i][used] = true;
                } else if (used == 0 && same(s, i, 2) && dp[i + 2][1]) {
                    dp[i][used] = true;
                }
            }
        }
        return dp[0][0];
    }

    private boolean same(String s, int i, int len) {
        if (i + len > s.length()) {
            return false;
        }
        for (int j = i + 1; j < i + len; j++) {
            if (s.charAt(j) != s.charAt(i)) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
    bool same(const string& s, int i, int len) {
        if (i + len > (int)s.size()) {
            return false;
        }
        for (int j = i + 1; j < i + len; j++) {
            if (s[j] != s[i]) {
                return false;
            }
        }
        return true;
    }

public:
    bool isDecomposable(string s) {
        int n = s.size();
        vector<vector<bool>> dp(n + 1, vector<bool>(2, false));
        dp[n][1] = true;
        for (int i = n - 1; i >= 0; i--) {
            for (int used = 0; used < 2; used++) {
                if (same(s, i, 3) && dp[i + 3][used]) {
                    dp[i][used] = true;
                } else if (used == 0 && same(s, i, 2) && dp[i + 2][1]) {
                    dp[i][used] = true;
                }
            }
        }
        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isDecomposable(s) {
        const n = s.length;

        const same = (i, len) => {
            if (i + len > n) {
                return false;
            }
            for (let j = i + 1; j < i + len; j++) {
                if (s[j] !== s[i]) {
                    return false;
                }
            }
            return true;
        };

        const dp = Array.from({ length: n + 1 }, () => [false, false]);
        dp[n][1] = true;
        for (let i = n - 1; i >= 0; i--) {
            for (let used = 0; used < 2; used++) {
                if (same(i, 3) && dp[i + 3][used]) {
                    dp[i][used] = true;
                } else if (used === 0 && same(i, 2) && dp[i + 2][1]) {
                    dp[i][used] = true;
                }
            }
        }
        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public bool IsDecomposable(string s) {
        int n = s.Length;
        bool[,] dp = new bool[n + 1, 2];
        dp[n, 1] = true;
        for (int i = n - 1; i >= 0; i--) {
            for (int used = 0; used < 2; used++) {
                if (Same(s, i, 3) && dp[i + 3, used]) {
                    dp[i, used] = true;
                } else if (used == 0 && Same(s, i, 2) && dp[i + 2, 1]) {
                    dp[i, used] = true;
                }
            }
        }
        return dp[0, 0];
    }

    private bool Same(string s, int i, int len) {
        if (i + len > s.Length) {
            return false;
        }
        for (int j = i + 1; j < i + len; j++) {
            if (s[j] != s[i]) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func isDecomposable(s string) bool {
    n := len(s)

    same := func(i, length int) bool {
        if i+length > n {
            return false
        }
        for j := i + 1; j < i+length; j++ {
            if s[j] != s[i] {
                return false
            }
        }
        return true
    }

    dp := make([][2]bool, n+1)
    dp[n][1] = true
    for i := n - 1; i >= 0; i-- {
        for used := 0; used < 2; used++ {
            if same(i, 3) && dp[i+3][used] {
                dp[i][used] = true
            } else if used == 0 && same(i, 2) && dp[i+2][1] {
                dp[i][used] = true
            }
        }
    }
    return dp[0][0]
}
```

```kotlin
class Solution {
    fun isDecomposable(s: String): Boolean {
        val n = s.length
        val dp = Array(n + 1) { BooleanArray(2) }
        dp[n][1] = true
        for (i in n - 1 downTo 0) {
            for (used in 0 until 2) {
                if (same(s, i, 3) && dp[i + 3][used]) {
                    dp[i][used] = true
                } else if (used == 0 && same(s, i, 2) && dp[i + 2][1]) {
                    dp[i][used] = true
                }
            }
        }
        return dp[0][0]
    }

    private fun same(s: String, i: Int, len: Int): Boolean {
        if (i + len > s.length) {
            return false
        }
        for (j in i + 1 until i + len) {
            if (s[j] != s[i]) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isDecomposable(_ s: String) -> Bool {
        let chars = Array(s)
        let n = chars.count

        func same(_ i: Int, _ len: Int) -> Bool {
            if i + len > n {
                return false
            }
            for j in (i + 1)..<(i + len) {
                if chars[j] != chars[i] {
                    return false
                }
            }
            return true
        }

        var dp = [[Bool]](repeating: [false, false], count: n + 1)
        dp[n][1] = true
        for i in stride(from: n - 1, through: 0, by: -1) {
            for used in 0..<2 {
                if same(i, 3) && dp[i + 3][used] {
                    dp[i][used] = true
                } else if used == 0 && same(i, 2) && dp[i + 2][1] {
                    dp[i][used] = true
                }
            }
        }
        return dp[0][0]
    }
}
```

```rust
impl Solution {
    pub fn is_decomposable(s: String) -> bool {
        let s = s.as_bytes();
        let n = s.len();
        let mut dp = vec![[false; 2]; n + 1];
        dp[n][1] = true;
        for i in (0..n).rev() {
            for used in 0..2 {
                if Self::same(s, i, 3) && dp[i + 3][used] {
                    dp[i][used] = true;
                } else if used == 0 && Self::same(s, i, 2) && dp[i + 2][1] {
                    dp[i][used] = true;
                }
            }
        }
        dp[0][0]
    }

    fn same(s: &[u8], i: usize, len: usize) -> bool {
        if i + len > s.len() {
            return false;
        }
        for j in i + 1..i + len {
            if s[j] != s[i] {
                return false;
            }
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isDecomposable(s: string): boolean {
        const n = s.length;

        const same = (i: number, len: number): boolean => {
            if (i + len > n) {
                return false;
            }
            for (let j = i + 1; j < i + len; j++) {
                if (s[j] !== s[i]) {
                    return false;
                }
            }
            return true;
        };

        const dp: boolean[][] = Array.from({ length: n + 1 }, () => [
            false,
            false,
        ]);
        dp[n][1] = true;
        for (let i = n - 1; i >= 0; i--) {
            for (let used = 0; used < 2; used++) {
                if (same(i, 3) && dp[i + 3][used]) {
                    dp[i][used] = true;
                } else if (used === 0 && same(i, 2) && dp[i + 2][1]) {
                    dp[i][used] = true;
                }
            }
        }
        return dp[0][0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$.

---

## 4. Greedy

::tabs-start

```python
class Solution:
    def isDecomposable(self, s: str) -> bool:
        n = len(s)
        i = 0
        usedTwo = False
        while i < n:
            if i + 2 < n and s[i] == s[i + 1] == s[i + 2]:
                i += 3
            elif not usedTwo and i + 1 < n and s[i] == s[i + 1]:
                usedTwo = True
                i += 2
            else:
                return False
        return usedTwo
```

```java
public class Solution {
    public boolean isDecomposable(String s) {
        int n = s.length();
        int i = 0;
        boolean usedTwo = false;
        while (i < n) {
            char c = s.charAt(i);
            if (i + 2 < n && s.charAt(i + 1) == c && s.charAt(i + 2) == c) {
                i += 3;
            } else if (!usedTwo && i + 1 < n && s.charAt(i + 1) == c) {
                usedTwo = true;
                i += 2;
            } else {
                return false;
            }
        }
        return usedTwo;
    }
}
```

```cpp
class Solution {
public:
    bool isDecomposable(string s) {
        int n = s.size();
        int i = 0;
        bool usedTwo = false;
        while (i < n) {
            if (i + 2 < n && s[i + 1] == s[i] && s[i + 2] == s[i]) {
                i += 3;
            } else if (!usedTwo && i + 1 < n && s[i + 1] == s[i]) {
                usedTwo = true;
                i += 2;
            } else {
                return false;
            }
        }
        return usedTwo;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isDecomposable(s) {
        const n = s.length;
        let i = 0;
        let usedTwo = false;
        while (i < n) {
            if (i + 2 < n && s[i + 1] === s[i] && s[i + 2] === s[i]) {
                i += 3;
            } else if (!usedTwo && i + 1 < n && s[i + 1] === s[i]) {
                usedTwo = true;
                i += 2;
            } else {
                return false;
            }
        }
        return usedTwo;
    }
}
```

```csharp
public class Solution {
    public bool IsDecomposable(string s) {
        int n = s.Length;
        int i = 0;
        bool usedTwo = false;
        while (i < n) {
            if (i + 2 < n && s[i + 1] == s[i] && s[i + 2] == s[i]) {
                i += 3;
            } else if (!usedTwo && i + 1 < n && s[i + 1] == s[i]) {
                usedTwo = true;
                i += 2;
            } else {
                return false;
            }
        }
        return usedTwo;
    }
}
```

```go
func isDecomposable(s string) bool {
    n := len(s)
    i := 0
    usedTwo := false
    for i < n {
        if i+2 < n && s[i+1] == s[i] && s[i+2] == s[i] {
            i += 3
        } else if !usedTwo && i+1 < n && s[i+1] == s[i] {
            usedTwo = true
            i += 2
        } else {
            return false
        }
    }
    return usedTwo
}
```

```kotlin
class Solution {
    fun isDecomposable(s: String): Boolean {
        val n = s.length
        var i = 0
        var usedTwo = false
        while (i < n) {
            if (i + 2 < n && s[i + 1] == s[i] && s[i + 2] == s[i]) {
                i += 3
            } else if (!usedTwo && i + 1 < n && s[i + 1] == s[i]) {
                usedTwo = true
                i += 2
            } else {
                return false
            }
        }
        return usedTwo
    }
}
```

```swift
class Solution {
    func isDecomposable(_ s: String) -> Bool {
        let chars = Array(s)
        let n = chars.count
        var i = 0
        var usedTwo = false
        while i < n {
            if i + 2 < n && chars[i + 1] == chars[i] && chars[i + 2] == chars[i] {
                i += 3
            } else if !usedTwo && i + 1 < n && chars[i + 1] == chars[i] {
                usedTwo = true
                i += 2
            } else {
                return false
            }
        }
        return usedTwo
    }
}
```

```rust
impl Solution {
    pub fn is_decomposable(s: String) -> bool {
        let s = s.as_bytes();
        let n = s.len();
        let mut i = 0;
        let mut used_two = false;
        while i < n {
            if i + 2 < n && s[i + 1] == s[i] && s[i + 2] == s[i] {
                i += 3;
            } else if !used_two && i + 1 < n && s[i + 1] == s[i] {
                used_two = true;
                i += 2;
            } else {
                return false;
            }
        }
        used_two
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isDecomposable(s: string): boolean {
        const n = s.length;
        let i = 0;
        let usedTwo = false;
        while (i < n) {
            if (i + 2 < n && s[i + 1] === s[i] && s[i + 2] === s[i]) {
                i += 3;
            } else if (!usedTwo && i + 1 < n && s[i + 1] === s[i]) {
                usedTwo = true;
                i += 2;
            } else {
                return false;
            }
        }
        return usedTwo;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the string $s$.

---

## 5. Two Pointers

::tabs-start

```python
class Solution:
    def isDecomposable(self, s: str) -> bool:
        n = len(s)
        twos = 0
        l = 0
        while l < n:
            r = l
            while r < n and s[r] == s[l]:
                r += 1
            length = r - l
            if length % 3 == 1:
                return False
            if length % 3 == 2:
                twos += 1
            l = r
        return twos == 1
```

```java
public class Solution {
    public boolean isDecomposable(String s) {
        int n = s.length();
        int twos = 0;
        int l = 0;
        while (l < n) {
            int r = l;
            while (r < n && s.charAt(r) == s.charAt(l)) {
                r++;
            }
            int length = r - l;
            if (length % 3 == 1) {
                return false;
            }
            if (length % 3 == 2) {
                twos++;
            }
            l = r;
        }
        return twos == 1;
    }
}
```

```cpp
class Solution {
public:
    bool isDecomposable(string s) {
        int n = s.size();
        int twos = 0;
        int l = 0;
        while (l < n) {
            int r = l;
            while (r < n && s[r] == s[l]) {
                r++;
            }
            int length = r - l;
            if (length % 3 == 1) {
                return false;
            }
            if (length % 3 == 2) {
                twos++;
            }
            l = r;
        }
        return twos == 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isDecomposable(s) {
        const n = s.length;
        let twos = 0;
        let l = 0;
        while (l < n) {
            let r = l;
            while (r < n && s[r] === s[l]) {
                r++;
            }
            const length = r - l;
            if (length % 3 === 1) {
                return false;
            }
            if (length % 3 === 2) {
                twos++;
            }
            l = r;
        }
        return twos === 1;
    }
}
```

```csharp
public class Solution {
    public bool IsDecomposable(string s) {
        int n = s.Length;
        int twos = 0;
        int l = 0;
        while (l < n) {
            int r = l;
            while (r < n && s[r] == s[l]) {
                r++;
            }
            int length = r - l;
            if (length % 3 == 1) {
                return false;
            }
            if (length % 3 == 2) {
                twos++;
            }
            l = r;
        }
        return twos == 1;
    }
}
```

```go
func isDecomposable(s string) bool {
    n := len(s)
    twos := 0
    l := 0
    for l < n {
        r := l
        for r < n && s[r] == s[l] {
            r++
        }
        length := r - l
        if length%3 == 1 {
            return false
        }
        if length%3 == 2 {
            twos++
        }
        l = r
    }
    return twos == 1
}
```

```kotlin
class Solution {
    fun isDecomposable(s: String): Boolean {
        val n = s.length
        var twos = 0
        var l = 0
        while (l < n) {
            var r = l
            while (r < n && s[r] == s[l]) {
                r++
            }
            val length = r - l
            if (length % 3 == 1) {
                return false
            }
            if (length % 3 == 2) {
                twos++
            }
            l = r
        }
        return twos == 1
    }
}
```

```swift
class Solution {
    func isDecomposable(_ s: String) -> Bool {
        let chars = Array(s)
        let n = chars.count
        var twos = 0
        var l = 0
        while l < n {
            var r = l
            while r < n && chars[r] == chars[l] {
                r += 1
            }
            let length = r - l
            if length % 3 == 1 {
                return false
            }
            if length % 3 == 2 {
                twos += 1
            }
            l = r
        }
        return twos == 1
    }
}
```

```rust
impl Solution {
    pub fn is_decomposable(s: String) -> bool {
        let s = s.as_bytes();
        let n = s.len();
        let mut twos = 0;
        let mut l = 0;
        while l < n {
            let mut r = l;
            while r < n && s[r] == s[l] {
                r += 1;
            }
            let length = r - l;
            if length % 3 == 1 {
                return false;
            }
            if length % 3 == 2 {
                twos += 1;
            }
            l = r;
        }
        twos == 1
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isDecomposable(s: string): boolean {
        const n = s.length;
        let twos = 0;
        let l = 0;
        while (l < n) {
            let r = l;
            while (r < n && s[r] === s[l]) {
                r++;
            }
            const length = r - l;
            if (length % 3 === 1) {
                return false;
            }
            if (length % 3 === 2) {
                twos++;
            }
            l = r;
        }
        return twos === 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the string $s$.
