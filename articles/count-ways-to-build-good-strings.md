## 1. Recursion

### Intuition
We can think of building a string as making a series of choices. At each step, we either append `zero` number of '0's or `one` number of '1's. The recursion naturally explores all possible combinations by branching at each decision point. A string is "good" when its length falls within the range [low, high], so we count it whenever we reach a valid length.

### Algorithm
1. Start with an empty string (length 0).
2. At each recursive call, if the current length exceeds `high`, stop and return 0.
3. If the current length is at least `low`, count this as one valid string.
4. Recursively explore two branches: one where we add `zero` characters and one where we add `one` characters.
5. Sum up the counts from both branches and return the result modulo 10^9 + 7.

::tabs-start

```python
class Solution:
    def countGoodStrings(self, low: int, high: int, zero: int, one: int) -> int:
        mod = 10**9 + 7

        def dfs(length):
            if length > high:
                return 0
            res = 1 if length >= low else 0
            res += dfs(length + zero) + dfs(length + one)
            return res % mod

        return dfs(0)
```

```java
public class Solution {
    final int mod = 1_000_000_007;

    public int countGoodStrings(int low, int high, int zero, int one) {
        return dfs(low, high, zero, one, 0);
    }

    private int dfs(int low, int high, int zero, int one, int length) {
        if (length > high) return 0;
        int res = (length >= low) ? 1 : 0;
        res = (res + dfs(low, high, zero, one, length + zero)) % mod;
        res = (res + dfs(low, high, zero, one, length + one)) % mod;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countGoodStrings(int low, int high, int zero, int one) {
        const int mod = 1e9 + 7;

        function<int(int)> dfs = [&](int length) {
            if (length > high) return 0;
            int res = (length >= low) ? 1 : 0;
            res = (res + dfs(length + zero)) % mod;
            res = (res + dfs(length + one)) % mod;
            return res;
        };

        return dfs(0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @param {number} zero
     * @param {number} one
     * @return {number}
     */
    countGoodStrings(low, high, zero, one) {
        const mod = 1e9 + 7;

        const dfs = (length) => {
            if (length > high) return 0;
            let res = length >= low ? 1 : 0;
            res = (res + dfs(length + zero)) % mod;
            res = (res + dfs(length + one)) % mod;
            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    private const int mod = 1_000_000_007;

    public int CountGoodStrings(int low, int high, int zero, int one) {
        return Dfs(low, high, zero, one, 0);
    }

    private int Dfs(int low, int high, int zero, int one, int length) {
        if (length > high) return 0;
        int res = (length >= low) ? 1 : 0;
        res = (res + Dfs(low, high, zero, one, length + zero)) % mod;
        res = (res + Dfs(low, high, zero, one, length + one)) % mod;
        return res;
    }
}
```

```go
func countGoodStrings(low int, high int, zero int, one int) int {
    mod := int(1e9 + 7)

    var dfs func(length int) int
    dfs = func(length int) int {
        if length > high {
            return 0
        }
        res := 0
        if length >= low {
            res = 1
        }
        res = (res + dfs(length+zero)) % mod
        res = (res + dfs(length+one)) % mod
        return res
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    private val mod = 1_000_000_007

    fun countGoodStrings(low: Int, high: Int, zero: Int, one: Int): Int {
        return dfs(low, high, zero, one, 0)
    }

    private fun dfs(low: Int, high: Int, zero: Int, one: Int, length: Int): Int {
        if (length > high) return 0
        var res = if (length >= low) 1 else 0
        res = (res + dfs(low, high, zero, one, length + zero)) % mod
        res = (res + dfs(low, high, zero, one, length + one)) % mod
        return res
    }
}
```

```swift
class Solution {
    private let mod = 1_000_000_007

    func countGoodStrings(_ low: Int, _ high: Int, _ zero: Int, _ one: Int) -> Int {
        func dfs(_ length: Int) -> Int {
            if length > high { return 0 }
            var res = length >= low ? 1 : 0
            res = (res + dfs(length + zero)) % mod
            res = (res + dfs(length + one)) % mod
            return res
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

> Where $n$ is equal to the given $high$ value.

---

## 2. Dynamic Programming (Top-Down)

### Intuition
The recursive solution has overlapping subproblems because we may reach the same string length through different paths. For example, adding `zero` then `one` might give the same length as adding `one` then `zero`. Memoization stores the result for each length we have already computed, avoiding redundant calculations.

### Algorithm
1. Create a memoization structure (hash map or array) to store results for each length.
2. Use the same recursive approach as before, but before computing, check if the result for the current length is already cached.
3. If cached, return the stored value immediately.
4. Otherwise, compute the result by exploring both branches, store it in the cache, and return.
5. Return the final count modulo 10^9 + 7.

::tabs-start

```python
class Solution:
    def countGoodStrings(self, low: int, high: int, zero: int, one: int) -> int:
        mod = 10**9 + 7
        dp = {}

        def dfs(length):
            if length > high:
                return 0
            if length in dp:
                return dp[length]

            dp[length] = 1 if length >= low else 0
            dp[length] += dfs(length + zero) + dfs(length + one)
            return dp[length] % mod

        return dfs(0)
```

```java
public class Solution {
    final int mod = 1_000_000_007;
    private int[] dp;

    public int countGoodStrings(int low, int high, int zero, int one) {
        dp = new int[high + 1];
        Arrays.fill(dp, -1);
        return dfs(low, high, zero, one, 0);
    }

    private int dfs(int low, int high, int zero, int one, int length) {
        if (length > high) return 0;
        if (dp[length] != -1) return dp[length];

        dp[length] = (length >= low) ? 1 : 0;
        dp[length] = (dp[length] + dfs(low, high, zero, one, length + zero)) % mod;
        dp[length] = (dp[length] + dfs(low, high, zero, one, length + one)) % mod;
        return dp[length];
    }
}
```

```cpp
class Solution {
    const int mod = 1e9 + 7;
    vector<int> dp;

public:
    int countGoodStrings(int low, int high, int zero, int one) {
        dp.assign(high + 1, -1);
        return dfs(low, high, zero, one, 0);
    }

private:
    int dfs(int low, int high, int zero, int one, int length) {
        if (length > high) return 0;
        if (dp[length] != -1) return dp[length];
        dp[length] = (length >= low) ? 1 : 0;
        dp[length] = (dp[length] + dfs(low, high, zero, one, length + zero)) % mod;
        dp[length] = (dp[length] + dfs(low, high, zero, one, length + one)) % mod;
        return dp[length];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @param {number} zero
     * @param {number} one
     * @return {number}
     */
    countGoodStrings(low, high, zero, one) {
        const mod = 1e9 + 7;
        const dp = new Array(high + 1).fill(-1);

        const dfs = (length) => {
            if (length > high) return 0;
            if (dp[length] !== -1) return dp[length];
            dp[length] = length >= low ? 1 : 0;
            dp[length] = (dp[length] + dfs(length + zero)) % mod;
            dp[length] = (dp[length] + dfs(length + one)) % mod;
            return dp[length];
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    private const int mod = 1_000_000_007;
    private int[] dp;

    public int CountGoodStrings(int low, int high, int zero, int one) {
        dp = new int[high + 1];
        Array.Fill(dp, -1);
        return Dfs(low, high, zero, one, 0);
    }

    private int Dfs(int low, int high, int zero, int one, int length) {
        if (length > high) return 0;
        if (dp[length] != -1) return dp[length];
        dp[length] = (length >= low) ? 1 : 0;
        dp[length] = (dp[length] + Dfs(low, high, zero, one, length + zero)) % mod;
        dp[length] = (dp[length] + Dfs(low, high, zero, one, length + one)) % mod;
        return dp[length];
    }
}
```

```go
func countGoodStrings(low int, high int, zero int, one int) int {
    mod := int(1e9 + 7)
    dp := make([]int, high+1)
    for i := range dp {
        dp[i] = -1
    }

    var dfs func(length int) int
    dfs = func(length int) int {
        if length > high {
            return 0
        }
        if dp[length] != -1 {
            return dp[length]
        }
        if length >= low {
            dp[length] = 1
        } else {
            dp[length] = 0
        }
        dp[length] = (dp[length] + dfs(length+zero)) % mod
        dp[length] = (dp[length] + dfs(length+one)) % mod
        return dp[length]
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    private val mod = 1_000_000_007
    private lateinit var dp: IntArray

    fun countGoodStrings(low: Int, high: Int, zero: Int, one: Int): Int {
        dp = IntArray(high + 1) { -1 }
        return dfs(low, high, zero, one, 0)
    }

    private fun dfs(low: Int, high: Int, zero: Int, one: Int, length: Int): Int {
        if (length > high) return 0
        if (dp[length] != -1) return dp[length]
        dp[length] = if (length >= low) 1 else 0
        dp[length] = (dp[length] + dfs(low, high, zero, one, length + zero)) % mod
        dp[length] = (dp[length] + dfs(low, high, zero, one, length + one)) % mod
        return dp[length]
    }
}
```

```swift
class Solution {
    private let mod = 1_000_000_007
    private var dp: [Int] = []

    func countGoodStrings(_ low: Int, _ high: Int, _ zero: Int, _ one: Int) -> Int {
        dp = Array(repeating: -1, count: high + 1)

        func dfs(_ length: Int) -> Int {
            if length > high { return 0 }
            if dp[length] != -1 { return dp[length] }
            dp[length] = length >= low ? 1 : 0
            dp[length] = (dp[length] + dfs(length + zero)) % mod
            dp[length] = (dp[length] + dfs(length + one)) % mod
            return dp[length]
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is equal to the given $high$ value.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition
Instead of starting from length 0 and recursing forward, we can build the solution iteratively. For each length `i`, the number of ways to reach it equals the ways to reach length `i - zero` (then add zeros) plus the ways to reach length `i - one` (then add ones). This is similar to the classic coin change problem where we count combinations.

### Algorithm
1. Initialize a DP array where `dp[0] = 1` (one way to have an empty string).
2. Iterate through lengths from 1 to `high`.
3. For each length `i`, set `dp[i] = dp[i - zero] + dp[i - one]` (checking bounds).
4. Sum up all `dp[i]` values for lengths in the range [low, high].
5. Return the sum modulo 10^9 + 7.

::tabs-start

```python
class Solution:
    def countGoodStrings(self, low: int, high: int, zero: int, one: int) -> int:
        dp = { 0 : 1 }
        mod = 10**9 + 7

        for i in range(1, high + 1):
            dp[i] = (dp.get(i - one, 0) + dp.get(i - zero, 0)) % mod

        return sum(dp[i] for i in range(low, high + 1)) % mod
```

```java
public class Solution {
    public int countGoodStrings(int low, int high, int zero, int one) {
        int[] dp = new int[high + 1];
        int mod = 1_000_000_007, res = 0;
        dp[0] = 1;

        for (int i = 1; i <= high; i++) {
            if (i >= zero) dp[i] = (dp[i] + dp[i - zero]) % mod;
            if (i >= one) dp[i] = (dp[i] + dp[i - one]) % mod;
            if (i >= low) res = (res + dp[i]) % mod;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countGoodStrings(int low, int high, int zero, int one) {
        vector<int> dp(high + 1);
        int mod = 1e9 + 7, res = 0;
        dp[0] = 1;

        for (int i = 1; i <= high; i++) {
            if (i >= zero) dp[i] = (dp[i] + dp[i - zero]) % mod;
            if (i >= one) dp[i] = (dp[i] + dp[i - one]) % mod;
            if (i >= low) res = (res + dp[i]) % mod;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @param {number} zero
     * @param {number} one
     * @return {number}
     */
    countGoodStrings(low, high, zero, one) {
        const mod = 1e9 + 7;
        const dp = new Int32Array(high + 1);
        let res = 0;
        dp[0] = 1;

        for (let i = 1; i <= high; i++) {
            if (i >= zero) dp[i] = (dp[i] + dp[i - zero]) % mod;
            if (i >= one) dp[i] = (dp[i] + dp[i - one]) % mod;
            if (i >= low) res = (res + dp[i]) % mod;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountGoodStrings(int low, int high, int zero, int one) {
        int[] dp = new int[high + 1];
        int mod = 1_000_000_007, res = 0;
        dp[0] = 1;

        for (int i = 1; i <= high; i++) {
            if (i >= zero) dp[i] = (dp[i] + dp[i - zero]) % mod;
            if (i >= one) dp[i] = (dp[i] + dp[i - one]) % mod;
            if (i >= low) res = (res + dp[i]) % mod;
        }
        return res;
    }
}
```

```go
func countGoodStrings(low int, high int, zero int, one int) int {
    mod := int(1e9 + 7)
    dp := make([]int, high+1)
    dp[0] = 1
    res := 0

    for i := 1; i <= high; i++ {
        if i >= zero {
            dp[i] = (dp[i] + dp[i-zero]) % mod
        }
        if i >= one {
            dp[i] = (dp[i] + dp[i-one]) % mod
        }
        if i >= low {
            res = (res + dp[i]) % mod
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countGoodStrings(low: Int, high: Int, zero: Int, one: Int): Int {
        val mod = 1_000_000_007
        val dp = IntArray(high + 1)
        dp[0] = 1
        var res = 0

        for (i in 1..high) {
            if (i >= zero) dp[i] = (dp[i] + dp[i - zero]) % mod
            if (i >= one) dp[i] = (dp[i] + dp[i - one]) % mod
            if (i >= low) res = (res + dp[i]) % mod
        }
        return res
    }
}
```

```swift
class Solution {
    func countGoodStrings(_ low: Int, _ high: Int, _ zero: Int, _ one: Int) -> Int {
        let mod = 1_000_000_007
        var dp = [Int](repeating: 0, count: high + 1)
        dp[0] = 1
        var res = 0

        for i in 1...high {
            if i >= zero { dp[i] = (dp[i] + dp[i - zero]) % mod }
            if i >= one { dp[i] = (dp[i] + dp[i - one]) % mod }
            if i >= low { res = (res + dp[i]) % mod }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is equal to the given $high$ value.
