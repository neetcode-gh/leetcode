## 1. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def numWays(self, steps: int, arrLen: int) -> int:
        mod = 10**9 + 7
        arrLen = min(arrLen, steps)
        dp = {}

        def dfs(i, steps):
            if steps == 0:
                return i == 0
            if (i, steps) in dp:
                return dp[(i, steps)]

            res = dfs(i, steps - 1)
            if i > 0:
                res = (res + dfs(i - 1, steps - 1)) % mod
            if i < arrLen - 1:
                res = (res + dfs(i + 1, steps - 1)) % mod

            dp[(i, steps)] = res
            return res

        return dfs(0, steps)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;
    private int[][] dp;

    public int numWays(int steps, int arrLen) {
        int maxPos = Math.min(steps, arrLen);
        dp = new int[maxPos + 1][steps + 1];
        for (int i = 0; i <= maxPos; i++) {
            for (int j = 0; j <= steps; j++) {
                dp[i][j] = -1;
            }
        }
        return dfs(0, steps, maxPos);
    }

    private int dfs(int i, int steps, int maxPos) {
        if (steps == 0) {
            return i == 0 ? 1 : 0;
        }
        if (dp[i][steps] != -1) {
            return dp[i][steps];
        }

        int res = dfs(i, steps - 1, maxPos);
        if (i > 0) {
            res = (res + dfs(i - 1, steps - 1, maxPos)) % MOD;
        }
        if (i < maxPos - 1) {
            res = (res + dfs(i + 1, steps - 1, maxPos)) % MOD;
        }

        dp[i][steps] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;
    vector<vector<int>> dp;

    int dfs(int i, int steps, int maxPos) {
        if (steps == 0) {
            return i == 0 ? 1 : 0;
        }
        if (dp[i][steps] != -1) {
            return dp[i][steps];
        }

        int res = dfs(i, steps - 1, maxPos);
        if (i > 0) {
            res = (res + dfs(i - 1, steps - 1, maxPos)) % MOD;
        }
        if (i < maxPos - 1) {
            res = (res + dfs(i + 1, steps - 1, maxPos)) % MOD;
        }

        dp[i][steps] = res;
        return res;
    }

public:
    int numWays(int steps, int arrLen) {
        int maxPos = min(steps, arrLen);
        dp.assign(maxPos + 1, vector<int>(steps + 1, -1));
        return dfs(0, steps, maxPos);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} steps
     * @param {number} arrLen
     * @return {number}
     */
    numWays(steps, arrLen) {
        const MOD = 1e9 + 7;
        const maxPos = Math.min(steps, arrLen);
        const dp = Array.from({ length: maxPos + 1 }, () =>
            Array(steps + 1).fill(-1),
        );

        const dfs = (i, steps) => {
            if (steps === 0) return i === 0 ? 1 : 0;
            if (dp[i][steps] !== -1) return dp[i][steps];

            let res = dfs(i, steps - 1);
            if (i > 0) res = (res + dfs(i - 1, steps - 1)) % MOD;
            if (i < maxPos - 1) res = (res + dfs(i + 1, steps - 1)) % MOD;

            dp[i][steps] = res;
            return res;
        };

        return dfs(0, steps);
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;
    private int[,] dp;

    public int NumWays(int steps, int arrLen) {
        int maxPos = Math.Min(steps, arrLen);
        dp = new int[maxPos + 1, steps + 1];
        for (int i = 0; i <= maxPos; i++) {
            for (int j = 0; j <= steps; j++) {
                dp[i, j] = -1;
            }
        }
        return Dfs(0, steps, maxPos);
    }

    private int Dfs(int i, int steps, int maxPos) {
        if (steps == 0) return i == 0 ? 1 : 0;
        if (dp[i, steps] != -1) return dp[i, steps];

        int res = Dfs(i, steps - 1, maxPos);
        if (i > 0) res = (res + Dfs(i - 1, steps - 1, maxPos)) % MOD;
        if (i < maxPos - 1) res = (res + Dfs(i + 1, steps - 1, maxPos)) % MOD;

        dp[i, steps] = res;
        return res;
    }
}
```

```go
func numWays(steps int, arrLen int) int {
    MOD := int(1e9 + 7)
    maxPos := min(steps, arrLen)
    dp := make([][]int, maxPos+1)
    for i := range dp {
        dp[i] = make([]int, steps+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, steps int) int
    dfs = func(i, steps int) int {
        if steps == 0 {
            if i == 0 {
                return 1
            }
            return 0
        }
        if dp[i][steps] != -1 {
            return dp[i][steps]
        }

        res := dfs(i, steps-1)
        if i > 0 {
            res = (res + dfs(i-1, steps-1)) % MOD
        }
        if i < maxPos-1 {
            res = (res + dfs(i+1, steps-1)) % MOD
        }

        dp[i][steps] = res
        return res
    }

    return dfs(0, steps)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007
    private lateinit var dp: Array<IntArray>

    fun numWays(steps: Int, arrLen: Int): Int {
        val maxPos = minOf(steps, arrLen)
        dp = Array(maxPos + 1) { IntArray(steps + 1) { -1 } }
        return dfs(0, steps, maxPos)
    }

    private fun dfs(i: Int, steps: Int, maxPos: Int): Int {
        if (steps == 0) return if (i == 0) 1 else 0
        if (dp[i][steps] != -1) return dp[i][steps]

        var res = dfs(i, steps - 1, maxPos)
        if (i > 0) res = (res + dfs(i - 1, steps - 1, maxPos)) % MOD
        if (i < maxPos - 1) res = (res + dfs(i + 1, steps - 1, maxPos)) % MOD

        dp[i][steps] = res
        return res
    }
}
```

```swift
class Solution {
    func numWays(_ steps: Int, _ arrLen: Int) -> Int {
        let MOD = 1_000_000_007
        let maxPos = min(steps, arrLen)
        var dp = [[Int]](repeating: [Int](repeating: -1, count: steps + 1), count: maxPos + 1)

        func dfs(_ i: Int, _ steps: Int) -> Int {
            if steps == 0 { return i == 0 ? 1 : 0 }
            if dp[i][steps] != -1 { return dp[i][steps] }

            var res = dfs(i, steps - 1)
            if i > 0 { res = (res + dfs(i - 1, steps - 1)) % MOD }
            if i < maxPos - 1 { res = (res + dfs(i + 1, steps - 1)) % MOD }

            dp[i][steps] = res
            return res
        }

        return dfs(0, steps)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * min(n, m))$
- Space complexity: $O(n * min(n, m))$

> Where $n$ is the number of steps and $m$ is the size of the array.

---

## 2. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def numWays(self, steps: int, arrLen: int) -> int:
        mod = 10**9 + 7
        arrLen = min(arrLen, steps)
        dp = [[0] * (arrLen + 1) for _ in range(steps + 1)]
        dp[0][0] = 1

        for step in range(1, steps + 1):
            for i in range(arrLen):
                res = dp[step - 1][i]
                if i > 0:
                    res = (res + dp[step - 1][i - 1]) % mod
                if i < arrLen - 1:
                    res = (res + dp[step - 1][i + 1]) % mod
                dp[step][i] = res

        return dp[steps][0]
```

```java
public class Solution {
    public int numWays(int steps, int arrLen) {
        final int MOD = 1_000_000_007;
        arrLen = Math.min(arrLen, steps);
        int[][] dp = new int[steps + 1][arrLen + 1];
        dp[0][0] = 1;

        for (int step = 1; step <= steps; step++) {
            for (int i = 0; i < arrLen; i++) {
                int res = dp[step - 1][i];
                if (i > 0) {
                    res = (res + dp[step - 1][i - 1]) % MOD;
                }
                if (i < arrLen - 1) {
                    res = (res + dp[step - 1][i + 1]) % MOD;
                }
                dp[step][i] = res;
            }
        }

        return dp[steps][0];
    }
}
```

```cpp
class Solution {
public:
    int numWays(int steps, int arrLen) {
        const int MOD = 1e9 + 7;
        arrLen = min(arrLen, steps);
        vector<vector<int>> dp(steps + 1, vector<int>(arrLen + 1, 0));
        dp[0][0] = 1;

        for (int step = 1; step <= steps; step++) {
            for (int i = 0; i < arrLen; i++) {
                int res = dp[step - 1][i];
                if (i > 0) {
                    res = (res + dp[step - 1][i - 1]) % MOD;
                }
                if (i < arrLen - 1) {
                    res = (res + dp[step - 1][i + 1]) % MOD;
                }
                dp[step][i] = res;
            }
        }

        return dp[steps][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} steps
     * @param {number} arrLen
     * @return {number}
     */
    numWays(steps, arrLen) {
        const MOD = 1e9 + 7;
        arrLen = Math.min(arrLen, steps);
        const dp = Array.from({ length: steps + 1 }, () =>
            Array(arrLen + 1).fill(0),
        );
        dp[0][0] = 1;

        for (let step = 1; step <= steps; step++) {
            for (let i = 0; i < arrLen; i++) {
                let res = dp[step - 1][i];
                if (i > 0) {
                    res = (res + dp[step - 1][i - 1]) % MOD;
                }
                if (i < arrLen - 1) {
                    res = (res + dp[step - 1][i + 1]) % MOD;
                }
                dp[step][i] = res;
            }
        }

        return dp[steps][0];
    }
}
```

```csharp
public class Solution {
    public int NumWays(int steps, int arrLen) {
        int MOD = 1_000_000_007;
        arrLen = Math.Min(arrLen, steps);
        int[,] dp = new int[steps + 1, arrLen + 1];
        dp[0, 0] = 1;

        for (int step = 1; step <= steps; step++) {
            for (int i = 0; i < arrLen; i++) {
                int res = dp[step - 1, i];
                if (i > 0) {
                    res = (res + dp[step - 1, i - 1]) % MOD;
                }
                if (i < arrLen - 1) {
                    res = (res + dp[step - 1, i + 1]) % MOD;
                }
                dp[step, i] = res;
            }
        }

        return dp[steps, 0];
    }
}
```

```go
func numWays(steps int, arrLen int) int {
    MOD := int(1e9 + 7)
    if arrLen > steps {
        arrLen = steps
    }
    dp := make([][]int, steps+1)
    for i := range dp {
        dp[i] = make([]int, arrLen+1)
    }
    dp[0][0] = 1

    for step := 1; step <= steps; step++ {
        for i := 0; i < arrLen; i++ {
            res := dp[step-1][i]
            if i > 0 {
                res = (res + dp[step-1][i-1]) % MOD
            }
            if i < arrLen-1 {
                res = (res + dp[step-1][i+1]) % MOD
            }
            dp[step][i] = res
        }
    }

    return dp[steps][0]
}
```

```kotlin
class Solution {
    fun numWays(steps: Int, arrLen: Int): Int {
        val MOD = 1_000_000_007
        val len = minOf(arrLen, steps)
        val dp = Array(steps + 1) { IntArray(len + 1) }
        dp[0][0] = 1

        for (step in 1..steps) {
            for (i in 0 until len) {
                var res = dp[step - 1][i]
                if (i > 0) {
                    res = (res + dp[step - 1][i - 1]) % MOD
                }
                if (i < len - 1) {
                    res = (res + dp[step - 1][i + 1]) % MOD
                }
                dp[step][i] = res
            }
        }

        return dp[steps][0]
    }
}
```

```swift
class Solution {
    func numWays(_ steps: Int, _ arrLen: Int) -> Int {
        let MOD = 1_000_000_007
        let len = min(arrLen, steps)
        var dp = [[Int]](repeating: [Int](repeating: 0, count: len + 1), count: steps + 1)
        dp[0][0] = 1

        for step in 1...steps {
            for i in 0..<len {
                var res = dp[step - 1][i]
                if i > 0 {
                    res = (res + dp[step - 1][i - 1]) % MOD
                }
                if i < len - 1 {
                    res = (res + dp[step - 1][i + 1]) % MOD
                }
                dp[step][i] = res
            }
        }

        return dp[steps][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * min(n, m))$
- Space complexity: $O(n * min(n, m))$

> Where $n$ is the number of steps and $m$ is the size of the array.

---

## 3. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def numWays(self, steps: int, arrLen: int) -> int:
        mod = 10**9 + 7
        arrLen = min(steps, arrLen)
        dp = [0] * arrLen
        dp[0] = 1

        for _ in range(steps):
            next_dp = [0] * arrLen
            for i in range(arrLen):
                next_dp[i] = dp[i]
                if i > 0:
                    next_dp[i] = (next_dp[i] + dp[i - 1]) % mod
                if i < arrLen - 1:
                    next_dp[i] = (next_dp[i] + dp[i + 1]) % mod
            dp = next_dp

        return dp[0]
```

```java
public class Solution {
    public int numWays(int steps, int arrLen) {
        final int MOD = 1_000_000_007;
        arrLen = Math.min(steps, arrLen);
        int[] dp = new int[arrLen];
        dp[0] = 1;

        for (int step = 0; step < steps; step++) {
            int[] nextDp = new int[arrLen];
            for (int i = 0; i < arrLen; i++) {
                nextDp[i] = dp[i];
                if (i > 0) {
                    nextDp[i] = (nextDp[i] + dp[i - 1]) % MOD;
                }
                if (i < arrLen - 1) {
                    nextDp[i] = (nextDp[i] + dp[i + 1]) % MOD;
                }
            }
            dp = nextDp;
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int numWays(int steps, int arrLen) {
        const int MOD = 1e9 + 7;
        arrLen = min(steps, arrLen);
        vector<int> dp(arrLen, 0);
        dp[0] = 1;

        for (int step = 0; step < steps; step++) {
            vector<int> nextDp(arrLen, 0);
            for (int i = 0; i < arrLen; i++) {
                nextDp[i] = dp[i];
                if (i > 0) {
                    nextDp[i] = (nextDp[i] + dp[i - 1]) % MOD;
                }
                if (i < arrLen - 1) {
                    nextDp[i] = (nextDp[i] + dp[i + 1]) % MOD;
                }
            }
            dp = nextDp;
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} steps
     * @param {number} arrLen
     * @return {number}
     */
    numWays(steps, arrLen) {
        const MOD = 1e9 + 7;
        arrLen = Math.min(steps, arrLen);
        let dp = new Array(arrLen).fill(0);
        dp[0] = 1;

        for (let step = 0; step < steps; step++) {
            const nextDp = new Array(arrLen).fill(0);
            for (let i = 0; i < arrLen; i++) {
                nextDp[i] = dp[i];
                if (i > 0) {
                    nextDp[i] = (nextDp[i] + dp[i - 1]) % MOD;
                }
                if (i < arrLen - 1) {
                    nextDp[i] = (nextDp[i] + dp[i + 1]) % MOD;
                }
            }
            dp = nextDp;
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int NumWays(int steps, int arrLen) {
        int MOD = 1_000_000_007;
        arrLen = Math.Min(steps, arrLen);
        int[] dp = new int[arrLen];
        dp[0] = 1;

        for (int step = 0; step < steps; step++) {
            int[] nextDp = new int[arrLen];
            for (int i = 0; i < arrLen; i++) {
                nextDp[i] = dp[i];
                if (i > 0) {
                    nextDp[i] = (nextDp[i] + dp[i - 1]) % MOD;
                }
                if (i < arrLen - 1) {
                    nextDp[i] = (nextDp[i] + dp[i + 1]) % MOD;
                }
            }
            dp = nextDp;
        }

        return dp[0];
    }
}
```

```go
func numWays(steps int, arrLen int) int {
    MOD := int(1e9 + 7)
    if arrLen > steps {
        arrLen = steps
    }
    dp := make([]int, arrLen)
    dp[0] = 1

    for step := 0; step < steps; step++ {
        nextDp := make([]int, arrLen)
        for i := 0; i < arrLen; i++ {
            nextDp[i] = dp[i]
            if i > 0 {
                nextDp[i] = (nextDp[i] + dp[i-1]) % MOD
            }
            if i < arrLen-1 {
                nextDp[i] = (nextDp[i] + dp[i+1]) % MOD
            }
        }
        dp = nextDp
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun numWays(steps: Int, arrLen: Int): Int {
        val MOD = 1_000_000_007
        val len = minOf(steps, arrLen)
        var dp = IntArray(len)
        dp[0] = 1

        repeat(steps) {
            val nextDp = IntArray(len)
            for (i in 0 until len) {
                nextDp[i] = dp[i]
                if (i > 0) {
                    nextDp[i] = (nextDp[i] + dp[i - 1]) % MOD
                }
                if (i < len - 1) {
                    nextDp[i] = (nextDp[i] + dp[i + 1]) % MOD
                }
            }
            dp = nextDp
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func numWays(_ steps: Int, _ arrLen: Int) -> Int {
        let MOD = 1_000_000_007
        let len = min(steps, arrLen)
        var dp = [Int](repeating: 0, count: len)
        dp[0] = 1

        for _ in 0..<steps {
            var nextDp = [Int](repeating: 0, count: len)
            for i in 0..<len {
                nextDp[i] = dp[i]
                if i > 0 {
                    nextDp[i] = (nextDp[i] + dp[i - 1]) % MOD
                }
                if i < len - 1 {
                    nextDp[i] = (nextDp[i] + dp[i + 1]) % MOD
                }
            }
            dp = nextDp
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * min(n, m))$
- Space complexity: $O(min(n, m))$

> Where $n$ is the number of steps and $m$ is the size of the array.

---

## 4. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def numWays(self, steps: int, arrLen: int) -> int:
        mod = 10**9 + 7
        arrLen = min(steps, arrLen)
        dp = [0] * arrLen
        dp[0] = 1

        for _ in range(steps):
            prev = 0
            for i in range(arrLen):
                cur = dp[i]
                if i > 0:
                    dp[i] = (dp[i] + prev) % mod
                if i < arrLen - 1:
                    dp[i] = (dp[i] + dp[i + 1]) % mod
                prev = cur

        return dp[0]
```

```java
public class Solution {
    public int numWays(int steps, int arrLen) {
        final int MOD = 1_000_000_007;
        arrLen = Math.min(steps, arrLen);
        int[] dp = new int[arrLen];
        dp[0] = 1;

        for (int step = 0; step < steps; step++) {
            int prev = 0;
            for (int i = 0; i < arrLen; i++) {
                int cur = dp[i];
                if (i > 0) {
                    dp[i] = (dp[i] + prev) % MOD;
                }
                if (i < arrLen - 1) {
                    dp[i] = (dp[i] + dp[i + 1]) % MOD;
                }
                prev = cur;
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int numWays(int steps, int arrLen) {
        const int MOD = 1e9 + 7;
        arrLen = min(steps, arrLen);
        vector<int> dp(arrLen, 0);
        dp[0] = 1;

        for (int step = 0; step < steps; step++) {
            int prev = 0;
            for (int i = 0; i < arrLen; i++) {
                int cur = dp[i];
                if (i > 0) {
                    dp[i] = (dp[i] + prev) % MOD;
                }
                if (i < arrLen - 1) {
                    dp[i] = (dp[i] + dp[i + 1]) % MOD;
                }
                prev = cur;
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} steps
     * @param {number} arrLen
     * @return {number}
     */
    numWays(steps, arrLen) {
        const MOD = 1e9 + 7;
        arrLen = Math.min(steps, arrLen);
        const dp = new Array(arrLen).fill(0);
        dp[0] = 1;

        for (let step = 0; step < steps; step++) {
            for (let i = 0; i < arrLen; i++) {
                const cur = dp[i];
                if (i > 0) {
                    dp[i] = (dp[i] + prev) % MOD;
                }
                if (i < arrLen - 1) {
                    dp[i] = (dp[i] + dp[i + 1]) % MOD;
                }
                prev = cur;
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int NumWays(int steps, int arrLen) {
        int MOD = 1_000_000_007;
        arrLen = Math.Min(steps, arrLen);
        int[] dp = new int[arrLen];
        dp[0] = 1;

        for (int step = 0; step < steps; step++) {
            int prev = 0;
            for (int i = 0; i < arrLen; i++) {
                int cur = dp[i];
                if (i > 0) {
                    dp[i] = (dp[i] + prev) % MOD;
                }
                if (i < arrLen - 1) {
                    dp[i] = (dp[i] + dp[i + 1]) % MOD;
                }
                prev = cur;
            }
        }

        return dp[0];
    }
}
```

```go
func numWays(steps int, arrLen int) int {
    MOD := int(1e9 + 7)
    if arrLen > steps {
        arrLen = steps
    }
    dp := make([]int, arrLen)
    dp[0] = 1

    for step := 0; step < steps; step++ {
        prev := 0
        for i := 0; i < arrLen; i++ {
            cur := dp[i]
            if i > 0 {
                dp[i] = (dp[i] + prev) % MOD
            }
            if i < arrLen-1 {
                dp[i] = (dp[i] + dp[i+1]) % MOD
            }
            prev = cur
        }
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun numWays(steps: Int, arrLen: Int): Int {
        val MOD = 1_000_000_007
        val len = minOf(steps, arrLen)
        val dp = IntArray(len)
        dp[0] = 1

        repeat(steps) {
            var prev = 0
            for (i in 0 until len) {
                val cur = dp[i]
                if (i > 0) {
                    dp[i] = (dp[i] + prev) % MOD
                }
                if (i < len - 1) {
                    dp[i] = (dp[i] + dp[i + 1]) % MOD
                }
                prev = cur
            }
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func numWays(_ steps: Int, _ arrLen: Int) -> Int {
        let MOD = 1_000_000_007
        let len = min(steps, arrLen)
        var dp = [Int](repeating: 0, count: len)
        dp[0] = 1

        for _ in 0..<steps {
            var prev = 0
            for i in 0..<len {
                let cur = dp[i]
                if i > 0 {
                    dp[i] = (dp[i] + prev) % MOD
                }
                if i < len - 1 {
                    dp[i] = (dp[i] + dp[i + 1]) % MOD
                }
                prev = cur
            }
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * min(n, m))$
- Space complexity: $O(min(n, m))$

> Where $n$ is the number of steps and $m$ is the size of the array.
