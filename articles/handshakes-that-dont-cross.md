## 1. Bottom-Up Dynamic Programming

### Intuition

Consider people standing in a circle. If person `0` shakes hands with person `k` (where `k` is odd, since we need an even number of people on each side), the circle splits into two independent groups: people between `0` and `k`, and people between `k` and the last person. The total ways for this configuration is the product of ways to arrange handshakes in both groups.

By summing over all valid choices for person `0`'s partner, we get a recurrence relation. This is precisely the Catalan number recurrence, which counts non-crossing pair arrangements.

### Algorithm

1. Let `dp[i]` represent the number of valid handshake arrangements for `2*i` people.
2. Base case: `dp[0] = 1` (zero people means one valid arrangement).
3. For each `i` from `1` to `numPeople/2`:
   - Sum over all ways to split: `dp[i] = sum(dp[j] * dp[i-j-1])` for `j` from `0` to `i-1`.
   - Apply modulo at each step to prevent overflow.
4. Return `dp[numPeople/2]`.

::tabs-start

```python
class Solution:
    def numberOfWays(self, numPeople: int) -> int:
        m = 1000000007
        dp = [0] * (numPeople // 2 + 1)
        dp[0] = 1

        for i in range(1, numPeople // 2 + 1):
            for j in range(i):
                dp[i] += dp[j] * dp[i - j - 1]
                dp[i] %= m

        return dp[numPeople // 2]
```

```java
class Solution {
    private static int m = 1000000007;

    public int numberOfWays(int numPeople) {
        int[] dp = new int[numPeople / 2 + 1];
        dp[0] = 1;

        for (int i = 1; i <= numPeople / 2; i++) {
            for (int j = 0; j < i; j++) {
                dp[i] += (long) dp[j] * dp[i - j - 1] % m;
                dp[i] %= m;
            }
        }

        return dp[numPeople / 2];
    }
}
```

```cpp
class Solution {
    const static int m = 1'000'000'007;

public:
    int numberOfWays(int numPeople) {
        vector<int> dp(numPeople / 2 + 1);
        dp[0] = 1;

        for (int i = 1; i <= numPeople / 2; i++) {
            for (int j = 0; j < i; j++) {
                (dp[i] += (long long)dp[j] * dp[i - j - 1] % m) %= m;
            }
        }

        return dp[numPeople / 2];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numPeople
     * @return {number}
     */
    numberOfWays(numPeople) {
        const m = 1000000007n;
        const n = Math.floor(numPeople / 2);
        const dp = new Array(n + 1).fill(0n);
        dp[0] = 1n;

        for (let i = 1; i <= n; i++) {
            for (let j = 0; j < i; j++) {
                dp[i] += dp[j] * dp[i - j - 1];
                dp[i] %= m;
            }
        }

        return Number(dp[n]);
    }
}
```

```go
func numberOfWays(numPeople int) int {
    m := 1000000007
    n := numPeople / 2
    dp := make([]int, n+1)
    dp[0] = 1

    for i := 1; i <= n; i++ {
        for j := 0; j < i; j++ {
            dp[i] += dp[j] * dp[i-j-1] % m
            dp[i] %= m
        }
    }

    return dp[n]
}
```

```kotlin
class Solution {
    fun numberOfWays(numPeople: Int): Int {
        val m = 1000000007L
        val n = numPeople / 2
        val dp = LongArray(n + 1)
        dp[0] = 1L

        for (i in 1..n) {
            for (j in 0 until i) {
                dp[i] += dp[j] * dp[i - j - 1] % m
                dp[i] %= m
            }
        }

        return dp[n].toInt()
    }
}
```

```swift
class Solution {
    func numberOfWays(_ numPeople: Int) -> Int {
        let m = 1000000007
        let n = numPeople / 2
        var dp = [Int](repeating: 0, count: n + 1)
        dp[0] = 1

        for i in 1...n {
            for j in 0..<i {
                dp[i] += dp[j] * dp[i - j - 1] % m
                dp[i] %= m
            }
        }

        return dp[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(numPeople^2)$

- Space complexity: $O(numPeople)$

---

## 2. Top-Down Dynamic Programming (Memoization)

### Intuition

The same recurrence relation can be computed recursively with memoization. Instead of building up from smaller subproblems, we start from the target and recursively compute smaller cases as needed, caching results to avoid redundant work.

This approach is often more intuitive since it directly mirrors the problem structure: to solve for `n` pairs, we try all ways to pair the first person and recursively solve the resulting subproblems.

### Algorithm

1. Create a memoization array `dp` initialized to `-1`, with `dp[0] = 1`.
2. Define a recursive function `calculateDP(i)`:
   - If `dp[i]` is already computed, return it.
   - Otherwise, compute `dp[i] = sum(calculateDP(j) * calculateDP(i-j-1))` for `j` from `0` to `i-1`.
   - Apply modulo and cache the result.
3. Call `calculateDP(numPeople/2)` and return the result.

::tabs-start

```python
class Solution:
    def numberOfWays(self, numPeople: int) -> int:
        m = 1000000007
        dp = [-1] * (numPeople // 2 + 1)
        dp[0] = 1

        def calculate_dp(i):
            if dp[i] != -1:
                return dp[i]
            dp[i] = 0
            for j in range(i):
                dp[i] += calculate_dp(j) * calculate_dp(i - j - 1)
            dp[i] %= m
            return dp[i]

        return calculate_dp(numPeople // 2)
```

```java
class Solution {
    private static int m = 1000000007;
    int[] dp;

    public int numberOfWays(int numPeople) {
        dp = new int[numPeople / 2 + 1];
        Arrays.fill(dp, -1);
        dp[0] = 1;
        return calculateDP(numPeople / 2);
    }

    private int calculateDP(int i) {
        if (dp[i] != -1) {
            return dp[i];
        }

        dp[i] = 0;
        for (int j = 0; j < i; j++) {
            dp[i] += (long) calculateDP(j) * calculateDP(i - j - 1) % m;
            dp[i] %= m;
        }

        return dp[i];
    }
}
```

```cpp
class Solution {
    const static int m = 1'000'000'007;

public:
    int numberOfWays(int numPeople) {
        vector<int> dp(numPeople / 2 + 1, -1);
        dp[0] = 1;

        function<int(int)> calculateDP = [&](int i) -> int {
            if (dp[i] != -1) {
                return dp[i];
            }
            dp[i] = 0;
            for (int j = 0; j < i; j++) {
                (dp[i] += (long long)calculateDP(j) * calculateDP(i - j - 1) % m) %= m;
            }
            return dp[i];
        };

        return calculateDP(numPeople / 2);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numPeople
     * @return {number}
     */
    numberOfWays(numPeople) {
        const m = 1000000007n;
        const n = Math.floor(numPeople / 2);
        const dp = new Array(n + 1).fill(-1n);
        dp[0] = 1n;

        const calculate_dp = (i) => {
            if (dp[i] !== -1n) {
                return dp[i];
            }

            dp[i] = 0n;
            for (let j = 0; j < i; j++) {
                dp[i] += calculate_dp(j) * calculate_dp(i - j - 1);
                dp[i] %= m;
            }

            return dp[i];
        };

        return Number(calculate_dp(n));
    }
}
```

```go
func numberOfWays(numPeople int) int {
    m := 1000000007
    n := numPeople / 2
    dp := make([]int, n+1)
    for i := range dp {
        dp[i] = -1
    }
    dp[0] = 1

    var calculateDP func(i int) int
    calculateDP = func(i int) int {
        if dp[i] != -1 {
            return dp[i]
        }
        dp[i] = 0
        for j := 0; j < i; j++ {
            dp[i] += calculateDP(j) * calculateDP(i-j-1) % m
            dp[i] %= m
        }
        return dp[i]
    }

    return calculateDP(n)
}
```

```kotlin
class Solution {
    private val m = 1000000007L
    private lateinit var dp: LongArray

    fun numberOfWays(numPeople: Int): Int {
        val n = numPeople / 2
        dp = LongArray(n + 1) { -1L }
        dp[0] = 1L
        return calculateDP(n).toInt()
    }

    private fun calculateDP(i: Int): Long {
        if (dp[i] != -1L) {
            return dp[i]
        }
        dp[i] = 0L
        for (j in 0 until i) {
            dp[i] += calculateDP(j) * calculateDP(i - j - 1) % m
            dp[i] %= m
        }
        return dp[i]
    }
}
```

```swift
class Solution {
    func numberOfWays(_ numPeople: Int) -> Int {
        let m = 1000000007
        let n = numPeople / 2
        var dp = [Int](repeating: -1, count: n + 1)
        dp[0] = 1

        func calculateDP(_ i: Int) -> Int {
            if dp[i] != -1 {
                return dp[i]
            }
            dp[i] = 0
            for j in 0..<i {
                dp[i] += calculateDP(j) * calculateDP(i - j - 1) % m
                dp[i] %= m
            }
            return dp[i]
        }

        return calculateDP(n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(numPeople^2)$

- Space complexity: $O(numPeople)$

---

## 3. Catalan Numbers

### Intuition

The number of non-crossing handshake arrangements is exactly the n-th Catalan number, where `n = numPeople/2`. Catalan numbers have a closed-form formula that can be computed iteratively without solving the full recurrence.

Using the formula `C(n) = C(n-1) * 2(2n-1) / (n+1)`, we can compute the result in linear time with constant extra space (aside from precomputing modular inverses).

### Algorithm

1. Precompute modular multiplicative inverses for numbers `1` through `n+1` using the identity `inv[i] = m - (m/i) * inv[m%i] % m`.
2. Initialize the Catalan number `C = 1` (representing `C(0)`).
3. For each `i` from `0` to `n-1`:
   - Update `C = C * 2 * (2i + 1) * inv[i + 2] % m`.
4. Return the final value of `C`.

::tabs-start

```python
class Solution:
    def numberOfWays(self, numPeople: int) -> int:
        m = 1000000007
        n = numPeople // 2
        inv = [None] * (n+2)
        inv[1] = 1
        for i in range(2, n+2):
            k = m // i
            r = m % i
            inv[i] = m - k * inv[r] % m

        C = 1
        for i in range(n):
            C = 2 * (2 * i + 1) * inv[i + 2] * C % m

        return C
```

```java
class Solution {
    private static int m = 1000000007;

    private int mul(int a, int b) {
        return (int) ((long) a * b % m);
    }

    public int numberOfWays(int numPeople) {
        int n = numPeople / 2;
        int[] inv = new int[numPeople / 2 + 2];
        inv[1] = 1;
        for (int i = 2; i < n + 2; i++) {
            int k = m / i, r = m % i;
            inv[i] = m - mul(k, inv[r]);
        }

        int C = 1;
        for (int i = 0; i < n; i++) {
            C = mul(mul(2 * (2 * i + 1), inv[i + 2]), C);
        }

        return C;
    }
}
```

```cpp
class Solution {
    const int m = 1'000'000'007;
    int mul(int a, int b) { return (long long)a * b % m; }

public:
    int numberOfWays(int numPeople) {
        int n = numPeople / 2;
        vector<int> inv(n + 2);
        inv[1] = 1;
        for (int i = 2; i < n + 2; i++) {
            int k = m / i, r = m % i;
            inv[i] = m - mul(k, inv[r]);
        }

        int C = 1;
        for (int i = 0; i < n; i++) {
            C = mul(mul(2 * (2 * i + 1), inv[i + 2]), C);
        }

        return C;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numPeople
     * @return {number}
     */
    numberOfWays(numPeople) {
        const m = 1000000007n;
        const n = Math.floor(numPeople / 2);

        const inv = new Array(n + 2);
        inv[1] = 1n;
        for (let i = 2; i < n + 2; i++) {
            const bi = BigInt(i);
            const k = m / bi;
            const r = m % bi;
            inv[i] = (m - k * inv[Number(r)] % m) % m;
        }

        let C = 1n;
        for (let i = 0; i < n; i++) {
            C = 2n * BigInt(2 * i + 1) * inv[i + 2] % m * C % m;
        }

        return Number(C);
    }
}
```

```go
func numberOfWays(numPeople int) int {
    m := 1000000007
    n := numPeople / 2
    inv := make([]int, n+2)
    inv[1] = 1

    mul := func(a, b int) int {
        return int(int64(a) * int64(b) % int64(m))
    }

    for i := 2; i < n+2; i++ {
        k := m / i
        r := m % i
        inv[i] = m - mul(k, inv[r])
    }

    C := 1
    for i := 0; i < n; i++ {
        C = mul(mul(2*(2*i+1), inv[i+2]), C)
    }

    return C
}
```

```kotlin
class Solution {
    private val m = 1000000007L

    private fun mul(a: Long, b: Long): Long {
        return a * b % m
    }

    fun numberOfWays(numPeople: Int): Int {
        val n = numPeople / 2
        val inv = LongArray(n + 2)
        inv[1] = 1L

        for (i in 2 until n + 2) {
            val k = m / i
            val r = (m % i).toInt()
            inv[i] = m - mul(k, inv[r])
        }

        var C = 1L
        for (i in 0 until n) {
            C = mul(mul((2 * (2 * i + 1)).toLong(), inv[i + 2]), C)
        }

        return C.toInt()
    }
}
```

```swift
class Solution {
    func numberOfWays(_ numPeople: Int) -> Int {
        let m = 1000000007
        let n = numPeople / 2
        var inv = [Int](repeating: 0, count: n + 2)
        inv[1] = 1

        func mul(_ a: Int, _ b: Int) -> Int {
            return Int(Int64(a) * Int64(b) % Int64(m))
        }

        for i in 2..<(n + 2) {
            let k = m / i
            let r = m % i
            inv[i] = m - mul(k, inv[r])
        }

        var C = 1
        for i in 0..<n {
            C = mul(mul(2 * (2 * i + 1), inv[i + 2]), C)
        }

        return C
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(numPeople)$

- Space complexity: $O(numPeople)$

---

## Common Pitfalls

### Forgetting to Apply Modulo at Each Step

The number of valid handshake arrangements grows exponentially and can overflow standard integer types. Applying modulo only at the end results in overflow before the modulo operation occurs. The modulo must be applied after each multiplication and addition to keep intermediate values within bounds.

### Incorrect Indexing in the DP Recurrence

The recurrence `dp[i] = sum(dp[j] * dp[i-j-1])` requires careful indexing. The sum runs from `j = 0` to `j = i-1`, and the index `i-j-1` must always be non-negative. Off-by-one errors in the loop bounds or index calculation lead to accessing invalid array positions or missing terms in the summation.

### Not Recognizing the Catalan Number Pattern

This problem is a classic application of Catalan numbers, but many solvers try to derive the recurrence from scratch without recognizing the pattern. The key insight is that pairing person 0 with person k splits the remaining people into two independent subproblems. Understanding this structure simplifies both the implementation and debugging.

### Integer Overflow in Modular Arithmetic

When computing `dp[j] * dp[i-j-1]`, the product of two values each less than 10^9 can exceed the 32-bit integer limit. Languages like Java, C++, and Go require explicit casting to 64-bit integers before multiplication, followed by the modulo operation. Failing to use 64-bit arithmetic causes silent overflow and incorrect results.

### Miscomputing Modular Inverse for the Catalan Formula

The closed-form Catalan formula requires division, which in modular arithmetic means multiplying by the modular inverse. Computing the inverse incorrectly or using the wrong formula for the inverse leads to wrong answers. The iterative inverse computation `inv[i] = m - (m/i) * inv[m%i] % m` must be implemented precisely with proper order of operations.
