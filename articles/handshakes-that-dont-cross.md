## 1. Bottom-Up Dynamic Programming

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
