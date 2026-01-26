## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Dynamic Programming** - Breaking problems into overlapping subproblems with optimal substructure
- **Memoization** - Caching recursive results to avoid redundant computation
- **Prefix/Suffix Arrays** - Precomputing cumulative counts for efficient range queries

---

## 1. Dynamic Programming (Top-Down)

### Intuition

A monotone increasing binary string consists of some number of 0s followed by some number of 1s. At each position, we need to decide whether to keep the character as is or flip it. The key insight is that we can track whether we are still in the "all zeros" portion or have transitioned to the "all ones" portion.

If we are still allowed to have zeros (`mono = true`), we can either keep a `0` or flip a `1` to `0`, or we can transition to the ones portion. Once we commit to having only 1s, any `0` we encounter must be flipped. This recursive structure with memoization efficiently explores all valid ways to partition the string.

### Algorithm

1. Use a recursive function `dfs(i, mono)` where `i` is the current index and `mono` indicates whether we can still place zeros.
2. Base case: if `i` equals the string length, return `0` (no more flips needed).
3. If `mono` is `true` and the current character is `'0'`, we can either keep it (continue with zeros) or flip it to `1` and switch to ones-only mode.
4. If `mono` is `true` and the current character is `'1'`, we can either keep it (switch to ones-only) or flip it to `0` (continue with zeros).
5. If `mono` is `false` (ones-only mode), keep 1s as is and flip any 0s.
6. Memoize results to avoid redundant computation.
7. Return the minimum flips starting from index `0` with `mono = true`.

::tabs-start

```python
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        dp = {}

        def dfs(i, mono):
            if (i, mono) in dp:
                return dp[(i, mono)]
            if i == len(s):
                return 0

            if mono and s[i] == "0":
                dp[(i, mono)] = min(1 + dfs(i + 1, False), dfs(i + 1, mono))
            elif mono and s[i] == "1":
                dp[(i, mono)] = min(1 + dfs(i + 1, mono), dfs(i + 1, False))
            elif not mono and s[i] == "1":
                dp[(i, mono)] = dfs(i + 1, mono)
            else:
                dp[(i, mono)] = 1 + dfs(i + 1, mono)

            return dp[(i, mono)]

        return dfs(0, True)
```

```java
public class Solution {
    private int[][] dp;

    public int minFlipsMonoIncr(String s) {
        int n = s.length();
        dp = new int[n][2];
        for (int i = 0; i < n; i++) {
            dp[i][0] = dp[i][1] = -1;
        }
        return dfs(0, 1, s);
    }

    private int dfs(int i, int mono, String s) {
        if (i == s.length()) return 0;
        if (dp[i][mono] != -1) return dp[i][mono];

        if (mono == 1 && s.charAt(i) == '0') {
            dp[i][mono] = Math.min(1 + dfs(i + 1, 0, s), dfs(i + 1, mono, s));
        } else if (mono == 1 && s.charAt(i) == '1') {
            dp[i][mono] = Math.min(1 + dfs(i + 1, mono, s), dfs(i + 1, 0, s));
        } else if (mono == 0 && s.charAt(i) == '1') {
            dp[i][mono] = dfs(i + 1, mono, s);
        } else {
            dp[i][mono] = 1 + dfs(i + 1, mono, s);
        }
        return dp[i][mono];
    }
}
```

```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int n = s.length();
        vector<vector<int>> dp(n, vector<int>(2, -1));
        return dfs(0, 1, s, dp);
    }

private:
    int dfs(int i, int mono, const string& s, vector<vector<int>>& dp) {
        if (i == s.length()) return 0;
        if (dp[i][mono] != -1) return dp[i][mono];

        if (mono == 1 && s[i] == '0') {
            dp[i][mono] = min(1 + dfs(i + 1, 0, s, dp), dfs(i + 1, mono, s, dp));
        } else if (mono == 1 && s[i] == '1') {
            dp[i][mono] = min(1 + dfs(i + 1, mono, s, dp), dfs(i + 1, 0, s, dp));
        } else if (mono == 0 && s[i] == '1') {
            dp[i][mono] = dfs(i + 1, mono, s, dp);
        } else {
            dp[i][mono] = 1 + dfs(i + 1, mono, s, dp);
        }
        return dp[i][mono];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlipsMonoIncr(s) {
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(2).fill(-1));

        const dfs = (i, mono) => {
            if (i === n) return 0;
            if (dp[i][mono] !== -1) return dp[i][mono];

            if (mono === 1 && s[i] === '0') {
                dp[i][mono] = Math.min(1 + dfs(i + 1, 0), dfs(i + 1, mono));
            } else if (mono === 1 && s[i] === '1') {
                dp[i][mono] = Math.min(1 + dfs(i + 1, mono), dfs(i + 1, 0));
            } else if (mono === 0 && s[i] === '1') {
                dp[i][mono] = dfs(i + 1, mono);
            } else {
                dp[i][mono] = 1 + dfs(i + 1, mono);
            }
            return dp[i][mono];
        };

        return dfs(0, 1);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public int MinFlipsMonoIncr(string s) {
        int n = s.Length;
        dp = new int[n, 2];
        for (int i = 0; i < n; i++) {
            dp[i, 0] = dp[i, 1] = -1;
        }
        return Dfs(0, 1, s);
    }

    private int Dfs(int i, int mono, string s) {
        if (i == s.Length) return 0;
        if (dp[i, mono] != -1) return dp[i, mono];

        if (mono == 1 && s[i] == '0') {
            dp[i, mono] = Math.Min(1 + Dfs(i + 1, 0, s), Dfs(i + 1, mono, s));
        } else if (mono == 1 && s[i] == '1') {
            dp[i, mono] = Math.Min(1 + Dfs(i + 1, mono, s), Dfs(i + 1, 0, s));
        } else if (mono == 0 && s[i] == '1') {
            dp[i, mono] = Dfs(i + 1, mono, s);
        } else {
            dp[i, mono] = 1 + Dfs(i + 1, mono, s);
        }
        return dp[i, mono];
    }
}
```

```go
func minFlipsMonoIncr(s string) int {
    n := len(s)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = []int{-1, -1}
    }

    var dfs func(i, mono int) int
    dfs = func(i, mono int) int {
        if i == n {
            return 0
        }
        if dp[i][mono] != -1 {
            return dp[i][mono]
        }

        if mono == 1 && s[i] == '0' {
            dp[i][mono] = min(1+dfs(i+1, 0), dfs(i+1, mono))
        } else if mono == 1 && s[i] == '1' {
            dp[i][mono] = min(1+dfs(i+1, mono), dfs(i+1, 0))
        } else if mono == 0 && s[i] == '1' {
            dp[i][mono] = dfs(i+1, mono)
        } else {
            dp[i][mono] = 1 + dfs(i+1, mono)
        }
        return dp[i][mono]
    }

    return dfs(0, 1)
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<IntArray>

    fun minFlipsMonoIncr(s: String): Int {
        val n = s.length
        dp = Array(n) { IntArray(2) { -1 } }
        return dfs(0, 1, s)
    }

    private fun dfs(i: Int, mono: Int, s: String): Int {
        if (i == s.length) return 0
        if (dp[i][mono] != -1) return dp[i][mono]

        dp[i][mono] = when {
            mono == 1 && s[i] == '0' -> minOf(1 + dfs(i + 1, 0, s), dfs(i + 1, mono, s))
            mono == 1 && s[i] == '1' -> minOf(1 + dfs(i + 1, mono, s), dfs(i + 1, 0, s))
            mono == 0 && s[i] == '1' -> dfs(i + 1, mono, s)
            else -> 1 + dfs(i + 1, mono, s)
        }
        return dp[i][mono]
    }
}
```

```swift
class Solution {
    func minFlipsMonoIncr(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var dp = [[Int]](repeating: [-1, -1], count: n)

        func dfs(_ i: Int, _ mono: Int) -> Int {
            if i == n { return 0 }
            if dp[i][mono] != -1 { return dp[i][mono] }

            if mono == 1 && chars[i] == "0" {
                dp[i][mono] = min(1 + dfs(i + 1, 0), dfs(i + 1, mono))
            } else if mono == 1 && chars[i] == "1" {
                dp[i][mono] = min(1 + dfs(i + 1, mono), dfs(i + 1, 0))
            } else if mono == 0 && chars[i] == "1" {
                dp[i][mono] = dfs(i + 1, mono)
            } else {
                dp[i][mono] = 1 + dfs(i + 1, mono)
            }
            return dp[i][mono]
        }

        return dfs(0, 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Bottom-Up)

### Intuition

Instead of recursion, we can iterate through the string from right to left and build up the solution. For each position, we track the minimum flips needed if that position and everything after it should be all `1`s versus if we are still in the flexible zone where `0`s are allowed.

Processing from right to left lets us use already-computed results for positions ahead of the current one. The state transitions mirror the top-down approach but avoid recursion overhead.

### Algorithm

1. Create a 2D DP array where `dp[i][1]` represents minimum flips from index `i` when we can still have zeros, and `dp[i][0]` when we must have all ones.
2. Initialize the base case: `dp[n][0] = dp[n][1] = 0` (no characters left means no flips).
3. Iterate from index `n-1` down to `0`.
4. For each position, if the character is `'0'`:
   - In flexible mode: either keep it or flip to `1` and switch modes.
   - In ones-only mode: must flip to `1`.
5. If the character is `'1'`:
   - In flexible mode: either flip to `0` or keep it and switch to ones-only.
   - In ones-only mode: keep it as is.
6. Return `dp[0][1]` as the answer.

::tabs-start

```python
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        n = len(s)
        dp = [[0] * 2 for _ in range(n + 1)]

        for i in range(n - 1, -1, -1):
            if s[i] == '0':
                dp[i][1] = min(1 + dp[i + 1][0], dp[i + 1][1])
                dp[i][0] = 1 + dp[i + 1][0]
            else:  # s[i] == '1'
                dp[i][1] = min(1 + dp[i + 1][1], dp[i + 1][0])
                dp[i][0] = dp[i + 1][0]

        return dp[0][1]
```

```java
public class Solution {
    public int minFlipsMonoIncr(String s) {
        int n = s.length();
        int[][] dp = new int[n + 1][2];

        for (int i = n - 1; i >= 0; i--) {
            if (s.charAt(i) == '0') {
                dp[i][1] = Math.min(1 + dp[i + 1][0], dp[i + 1][1]);
                dp[i][0] = 1 + dp[i + 1][0];
            } else { // s.charAt(i) == '1'
                dp[i][1] = Math.min(1 + dp[i + 1][1], dp[i + 1][0]);
                dp[i][0] = dp[i + 1][0];
            }
        }

        return dp[0][1];
    }
}
```

```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int n = s.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));

        for (int i = n - 1; i >= 0; i--) {
            if (s[i] == '0') {
                dp[i][1] = min(1 + dp[i + 1][0], dp[i + 1][1]);
                dp[i][0] = 1 + dp[i + 1][0];
            } else { // s[i] == '1'
                dp[i][1] = min(1 + dp[i + 1][1], dp[i + 1][0]);
                dp[i][0] = dp[i + 1][0];
            }
        }

        return dp[0][1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlipsMonoIncr(s) {
        const n = s.length;
        const dp = Array.from({ length: n + 1 }, () => [0, 0]);

        for (let i = n - 1; i >= 0; i--) {
            if (s[i] === '0') {
                dp[i][1] = Math.min(1 + dp[i + 1][0], dp[i + 1][1]);
                dp[i][0] = 1 + dp[i + 1][0];
            } else {
                // s[i] === '1'
                dp[i][1] = Math.min(1 + dp[i + 1][1], dp[i + 1][0]);
                dp[i][0] = dp[i + 1][0];
            }
        }

        return dp[0][1];
    }
}
```

```csharp
public class Solution {
    public int MinFlipsMonoIncr(string s) {
        int n = s.Length;
        int[,] dp = new int[n + 1, 2];

        for (int i = n - 1; i >= 0; i--) {
            if (s[i] == '0') {
                dp[i, 1] = Math.Min(1 + dp[i + 1, 0], dp[i + 1, 1]);
                dp[i, 0] = 1 + dp[i + 1, 0];
            } else {
                dp[i, 1] = Math.Min(1 + dp[i + 1, 1], dp[i + 1, 0]);
                dp[i, 0] = dp[i + 1, 0];
            }
        }

        return dp[0, 1];
    }
}
```

```go
func minFlipsMonoIncr(s string) int {
    n := len(s)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, 2)
    }

    for i := n - 1; i >= 0; i-- {
        if s[i] == '0' {
            dp[i][1] = min(1+dp[i+1][0], dp[i+1][1])
            dp[i][0] = 1 + dp[i+1][0]
        } else {
            dp[i][1] = min(1+dp[i+1][1], dp[i+1][0])
            dp[i][0] = dp[i+1][0]
        }
    }

    return dp[0][1]
}
```

```kotlin
class Solution {
    fun minFlipsMonoIncr(s: String): Int {
        val n = s.length
        val dp = Array(n + 1) { IntArray(2) }

        for (i in n - 1 downTo 0) {
            if (s[i] == '0') {
                dp[i][1] = minOf(1 + dp[i + 1][0], dp[i + 1][1])
                dp[i][0] = 1 + dp[i + 1][0]
            } else {
                dp[i][1] = minOf(1 + dp[i + 1][1], dp[i + 1][0])
                dp[i][0] = dp[i + 1][0]
            }
        }

        return dp[0][1]
    }
}
```

```swift
class Solution {
    func minFlipsMonoIncr(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var dp = [[Int]](repeating: [0, 0], count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            if chars[i] == "0" {
                dp[i][1] = min(1 + dp[i + 1][0], dp[i + 1][1])
                dp[i][0] = 1 + dp[i + 1][0]
            } else {
                dp[i][1] = min(1 + dp[i + 1][1], dp[i + 1][0])
                dp[i][0] = dp[i + 1][0]
            }
        }

        return dp[0][1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Space Optimized)

### Intuition

The bottom-up solution only needs the DP values from the next position to compute the current position. This means we do not need an entire 2D array; just two variables suffice.

By maintaining only the previous row's values, we reduce space from O(n) to O(1) while preserving the same logic.

### Algorithm

1. Initialize `dp[0]` and `dp[1]` to `0` (representing the state after processing the entire string).
2. Iterate from right to left through the string.
3. For each character, compute `newDp0` (ones-only mode) and `newDp1` (flexible mode) based on the current `dp` values.
4. If the character is `'0'`: flexible mode chooses the minimum between keeping it or flipping; ones-only mode must flip.
5. If the character is `'1'`: flexible mode chooses between flipping to `0` or switching to ones-only; ones-only mode keeps it.
6. Update `dp` with the new values.
7. Return `dp[1]`.

::tabs-start

```python
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        n = len(s)
        dp = [0, 0]

        for i in range(n - 1, -1, -1):
            if s[i] == '0':
                new_dp_1 = min(1 + dp[0], dp[1])
                new_dp_0 = dp[0] + 1
            else:  # s[i] == '1'
                new_dp_1 = min(dp[1] + 1, dp[0])
                new_dp_0 = dp[0]

            dp[1] = new_dp_1
            dp[0] = new_dp_0

        return dp[1]
```

```java
public class Solution {
    public int minFlipsMonoIncr(String s) {
        int[] dp = new int[2];

        for (int i = s.length() - 1; i >= 0; i--) {
            int newDp1, newDp0;
            if (s.charAt(i) == '0') {
                newDp1 = Math.min(1 + dp[0], dp[1]);
                newDp0 = 1 + dp[0];
            } else { // s[i] == '1'
                newDp1 = Math.min(1 + dp[1], dp[0]);
                newDp0 = dp[0];
            }

            dp[1] = newDp1;
            dp[0] = newDp0;
        }

        return dp[1];
    }
}
```

```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        vector<int> dp(2, 0);

        for (int i = s.length() - 1; i >= 0; i--) {
            int newDp1, newDp0;
            if (s[i] == '0') {
                newDp1 = min(1 + dp[0], dp[1]);
                newDp0 = dp[0] + 1;
            } else { // s[i] == '1'
                newDp1 = min(1 + dp[1], dp[0]);
                newDp0 = dp[0];
            }

            dp[1] = newDp1;
            dp[0] = newDp0;
        }

        return dp[1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlipsMonoIncr(s) {
        let dp = [0, 0];

        for (let i = s.length - 1; i >= 0; i--) {
            let newDp1, newDp0;
            if (s[i] === '0') {
                newDp1 = Math.min(1 + dp[0], dp[1]);
                newDp0 = dp[0] + 1;
            } else {
                // s[i] === '1'
                newDp1 = Math.min(1 + dp[1], dp[0]);
                newDp0 = dp[0];
            }

            dp[1] = newDp1;
            dp[0] = newDp0;
        }

        return dp[1];
    }
}
```

```csharp
public class Solution {
    public int MinFlipsMonoIncr(string s) {
        int[] dp = new int[2];

        for (int i = s.Length - 1; i >= 0; i--) {
            int newDp1, newDp0;
            if (s[i] == '0') {
                newDp1 = Math.Min(1 + dp[0], dp[1]);
                newDp0 = 1 + dp[0];
            } else {
                newDp1 = Math.Min(1 + dp[1], dp[0]);
                newDp0 = dp[0];
            }

            dp[1] = newDp1;
            dp[0] = newDp0;
        }

        return dp[1];
    }
}
```

```go
func minFlipsMonoIncr(s string) int {
    dp := [2]int{0, 0}

    for i := len(s) - 1; i >= 0; i-- {
        var newDp1, newDp0 int
        if s[i] == '0' {
            newDp1 = min(1+dp[0], dp[1])
            newDp0 = dp[0] + 1
        } else {
            newDp1 = min(1+dp[1], dp[0])
            newDp0 = dp[0]
        }

        dp[1] = newDp1
        dp[0] = newDp0
    }

    return dp[1]
}
```

```kotlin
class Solution {
    fun minFlipsMonoIncr(s: String): Int {
        var dp = intArrayOf(0, 0)

        for (i in s.length - 1 downTo 0) {
            val newDp1: Int
            val newDp0: Int
            if (s[i] == '0') {
                newDp1 = minOf(1 + dp[0], dp[1])
                newDp0 = dp[0] + 1
            } else {
                newDp1 = minOf(1 + dp[1], dp[0])
                newDp0 = dp[0]
            }

            dp[1] = newDp1
            dp[0] = newDp0
        }

        return dp[1]
    }
}
```

```swift
class Solution {
    func minFlipsMonoIncr(_ s: String) -> Int {
        let chars = Array(s)
        var dp = [0, 0]

        for i in stride(from: chars.count - 1, through: 0, by: -1) {
            let newDp1: Int
            let newDp0: Int
            if chars[i] == "0" {
                newDp1 = min(1 + dp[0], dp[1])
                newDp0 = dp[0] + 1
            } else {
                newDp1 = min(1 + dp[1], dp[0])
                newDp0 = dp[0]
            }

            dp[1] = newDp1
            dp[0] = newDp0
        }

        return dp[1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Prefix & Suffix Arrays

### Intuition

A monotone increasing string is all `0`s followed by all `1`s. We can think of the string as being split at some index: everything before is `0`, everything after is `1`. For each possible split point, we need to flip all `1`s on the left to `0` and all `0`s on the right to `1`.

Precomputing prefix counts of `1`s and suffix counts of `0`s lets us evaluate each split point in O(1) time. The answer is the minimum sum across all split points.

### Algorithm

1. Create a prefix array `leftOnes` where `leftOnes[i]` counts the number of `1`s in indices `0` to `i-1`.
2. Create a suffix array `rightZeros` where `rightZeros[i]` counts the number of `0`s in indices `i` to `n-1`.
3. For each split point `i` from `0` to `n`, the cost is `leftOnes[i] + rightZeros[i]`.
4. Return the minimum cost across all split points.

::tabs-start

```python
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        n = len(s)
        left_ones = [0] * (n + 1)
        right_zeros = [0] * (n + 1)

        for i in range(n):
            left_ones[i + 1] = left_ones[i] + (1 if s[i] == '1' else 0)

        for i in range(n - 1, -1, -1):
            right_zeros[i] = right_zeros[i + 1] + (1 if s[i] == '0' else 0)

        res = float('inf')
        for i in range(n + 1):
            res = min(res, left_ones[i] + right_zeros[i])

        return res
```

```java
public class Solution {
    public int minFlipsMonoIncr(String s) {
        int n = s.length();
        int[] leftOnes = new int[n + 1];
        int[] rightZeros = new int[n + 1];

        for (int i = 0; i < n; i++) {
            leftOnes[i + 1] = leftOnes[i] + (s.charAt(i) == '1' ? 1 : 0);
        }

        for (int i = n - 1; i >= 0; i--) {
            rightZeros[i] = rightZeros[i + 1] + (s.charAt(i) == '0' ? 1 : 0);
        }

        int res = Integer.MAX_VALUE;
        for (int i = 0; i <= n; i++) {
            res = Math.min(res, leftOnes[i] + rightZeros[i]);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int n = s.size();
        vector<int> leftOnes(n + 1, 0), rightZeros(n + 1, 0);

        for (int i = 0; i < n; i++) {
            leftOnes[i + 1] = leftOnes[i] + (s[i] == '1' ? 1 : 0);
        }

        for (int i = n - 1; i >= 0; i--) {
            rightZeros[i] = rightZeros[i + 1] + (s[i] == '0' ? 1 : 0);
        }

        int res = INT_MAX;
        for (int i = 0; i <= n; i++) {
            res = min(res, leftOnes[i] + rightZeros[i]);
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
    minFlipsMonoIncr(s) {
        const n = s.length;
        const leftOnes = Array(n + 1).fill(0);
        const rightZeros = Array(n + 1).fill(0);

        for (let i = 0; i < n; i++) {
            leftOnes[i + 1] = leftOnes[i] + (s[i] === '1' ? 1 : 0);
        }

        for (let i = n - 1; i >= 0; i--) {
            rightZeros[i] = rightZeros[i + 1] + (s[i] === '0' ? 1 : 0);
        }

        let res = Infinity;
        for (let i = 0; i <= n; i++) {
            res = Math.min(res, leftOnes[i] + rightZeros[i]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinFlipsMonoIncr(string s) {
        int n = s.Length;
        int[] leftOnes = new int[n + 1];
        int[] rightZeros = new int[n + 1];

        for (int i = 0; i < n; i++) {
            leftOnes[i + 1] = leftOnes[i] + (s[i] == '1' ? 1 : 0);
        }

        for (int i = n - 1; i >= 0; i--) {
            rightZeros[i] = rightZeros[i + 1] + (s[i] == '0' ? 1 : 0);
        }

        int res = int.MaxValue;
        for (int i = 0; i <= n; i++) {
            res = Math.Min(res, leftOnes[i] + rightZeros[i]);
        }

        return res;
    }
}
```

```go
func minFlipsMonoIncr(s string) int {
    n := len(s)
    leftOnes := make([]int, n+1)
    rightZeros := make([]int, n+1)

    for i := 0; i < n; i++ {
        leftOnes[i+1] = leftOnes[i]
        if s[i] == '1' {
            leftOnes[i+1]++
        }
    }

    for i := n - 1; i >= 0; i-- {
        rightZeros[i] = rightZeros[i+1]
        if s[i] == '0' {
            rightZeros[i]++
        }
    }

    res := 1 << 30
    for i := 0; i <= n; i++ {
        res = min(res, leftOnes[i]+rightZeros[i])
    }

    return res
}
```

```kotlin
class Solution {
    fun minFlipsMonoIncr(s: String): Int {
        val n = s.length
        val leftOnes = IntArray(n + 1)
        val rightZeros = IntArray(n + 1)

        for (i in 0 until n) {
            leftOnes[i + 1] = leftOnes[i] + if (s[i] == '1') 1 else 0
        }

        for (i in n - 1 downTo 0) {
            rightZeros[i] = rightZeros[i + 1] + if (s[i] == '0') 1 else 0
        }

        var res = Int.MAX_VALUE
        for (i in 0..n) {
            res = minOf(res, leftOnes[i] + rightZeros[i])
        }

        return res
    }
}
```

```swift
class Solution {
    func minFlipsMonoIncr(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var leftOnes = [Int](repeating: 0, count: n + 1)
        var rightZeros = [Int](repeating: 0, count: n + 1)

        for i in 0..<n {
            leftOnes[i + 1] = leftOnes[i] + (chars[i] == "1" ? 1 : 0)
        }

        for i in stride(from: n - 1, through: 0, by: -1) {
            rightZeros[i] = rightZeros[i + 1] + (chars[i] == "0" ? 1 : 0)
        }

        var res = Int.max
        for i in 0...n {
            res = min(res, leftOnes[i] + rightZeros[i])
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Dynamic Programming (Optimal)

### Intuition

We can solve this problem in a single pass by maintaining a running count of `1`s seen so far and the minimum flips needed. When we see a `1`, it might need to be flipped later if we decide that position should be `0`. When we see a `0`, we can either flip it to `1` (incrementing our flip count) or flip all previous `1`s to `0`.

The key insight is that the minimum flips at any position equals the minimum of: (1) flipping this `0` plus the previous minimum, or (2) flipping all `1`s seen so far to `0`s.

### Algorithm

1. Initialize `res` (minimum flips) and `cntOne` (count of `1`s seen) to `0`.
2. Iterate through each character in the string.
3. If the character is `'1'`, increment `cntOne`.
4. If the character is `'0'`, update `res = min(res + 1, cntOne)`:
   - `res + 1` means flip this `0` to `1`.
   - `cntOne` means flip all previous `1`s to `0`s instead.
5. Return `res`.

::tabs-start

```python
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        res  = cntOne = 0
        for c in s:
            if c == '1':
                cntOne += 1
            else:
                res = min(res + 1, cntOne)
        return res
```

```java
public class Solution {
    public int minFlipsMonoIncr(String s) {
        int res = 0, cntOne = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '1') {
                cntOne++;
            } else {
                res = Math.min(res + 1, cntOne);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int res = 0, cntOne = 0;
        for (char& c : s) {
            if (c == '1') {
                cntOne++;
            } else {
                res = min(res + 1, cntOne);
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
    minFlipsMonoIncr(s) {
        let res = 0,
            cntOne = 0;
        for (let c of s) {
            if (c === '1') {
                cntOne++;
            } else {
                res = Math.min(res + 1, cntOne);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinFlipsMonoIncr(string s) {
        int res = 0, cntOne = 0;
        foreach (char c in s) {
            if (c == '1') {
                cntOne++;
            } else {
                res = Math.Min(res + 1, cntOne);
            }
        }
        return res;
    }
}
```

```go
func minFlipsMonoIncr(s string) int {
    res, cntOne := 0, 0
    for _, c := range s {
        if c == '1' {
            cntOne++
        } else {
            res = min(res+1, cntOne)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun minFlipsMonoIncr(s: String): Int {
        var res = 0
        var cntOne = 0
        for (c in s) {
            if (c == '1') {
                cntOne++
            } else {
                res = minOf(res + 1, cntOne)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func minFlipsMonoIncr(_ s: String) -> Int {
        var res = 0
        var cntOne = 0
        for c in s {
            if c == "1" {
                cntOne += 1
            } else {
                res = min(res + 1, cntOne)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Misunderstanding the Monotone Increasing Property

A monotone increasing binary string means all `0`s come before all `1`s. Some incorrectly interpret this as strictly increasing values or allow alternating patterns. The valid forms are only: all zeros, all ones, or zeros followed by ones with exactly one transition point.

### Forgetting to Track the Count of Ones

The optimal solution relies on tracking how many `1`s have been seen so far. When encountering a `0`, you must decide whether to flip it to `1` or flip all previous `1`s to `0`. Forgetting to maintain this count leads to incorrect flip calculations.

### Off-by-One Errors in Split Point Logic

When using the prefix-suffix approach, the split point represents where zeros end and ones begin. The valid split points range from `0` (all ones) to `n` (all zeros). Missing the boundary cases or incorrectly indexing the prefix/suffix arrays causes wrong answers.