## 1. Recursion

### Intuition

The tribonacci sequence is defined similarly to Fibonacci, but instead of summing the previous two numbers, we sum the previous three. The base cases are T(0) = 0, T(1) = 1, and T(2) = 1. For any n >= 3, we compute T(n) = T(n-1) + T(n-2) + T(n-3).

A straightforward recursive approach directly implements this definition. However, this leads to exponential time complexity because we recompute the same subproblems many times. Each call branches into three more calls, creating a tree with many redundant calculations.

### Algorithm

1. If `n` is `0`, return `0`. If `n` is `1` or `2`, return `1`.
2. Otherwise, recursively compute `tribonacci(n-1)`, `tribonacci(n-2)`, and `tribonacci(n-3)`.
3. Return the sum of these three values.

::tabs-start

```python
class Solution:
    def tribonacci(self, n: int) -> int:
        if n <= 2:
            return 1 if n != 0 else 0
        return self.tribonacci(n - 1) + self.tribonacci(n - 2) + self.tribonacci(n - 3)
```

```java
public class Solution {
    public int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }
        return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
    }
}
```

```cpp
class Solution {
public:
    int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }
        return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    tribonacci(n) {
        if (n <= 2) {
            return n === 0 ? 0 : 1;
        }
        return (
            this.tribonacci(n - 1) +
            this.tribonacci(n - 2) +
            this.tribonacci(n - 3)
        );
    }
}
```

```csharp
public class Solution {
    public int Tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        return Tribonacci(n - 1) + Tribonacci(n - 2) + Tribonacci(n - 3);
    }
}
```

```go
func tribonacci(n int) int {
    if n <= 2 {
        if n == 0 {
            return 0
        }
        return 1
    }
    return tribonacci(n-1) + tribonacci(n-2) + tribonacci(n-3)
}
```

```kotlin
class Solution {
    fun tribonacci(n: Int): Int {
        if (n == 0) return 0
        if (n <= 2) return 1
        return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3)
    }
}
```

```swift
class Solution {
    func tribonacci(_ n: Int) -> Int {
        if n == 0 { return 0 }
        if n <= 2 { return 1 }
        return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(3 ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution wastes time by recomputing the same values over and over. We can fix this with memoization: store each computed result in a cache. Before computing T(n), check if it already exists in the cache. If so, return the cached value immediately. This transforms our exponential algorithm into a linear one, since each unique subproblem is solved only once.

### Algorithm

1. Create a `dp` hash map or dictionary to store computed values.
2. If `n` is `0`, return `0`. If `n` is `1` or `2`, return `1`.
3. If `n` is already in the `dp` cache, return the cached value.
4. Otherwise, compute `tribonacci(n-1) + tribonacci(n-2) + tribonacci(n-3)`, store it in the `dp` cache, and return it.

::tabs-start

```python
class Solution:
    def __init__(self):
        self.dp = {}

    def tribonacci(self, n: int) -> int:
        if n <= 2:
            return 1 if n != 0 else 0
        if n in self.dp:
            return self.dp[n]

        self.dp[n] = self.tribonacci(n - 1) + self.tribonacci(n - 2) + self.tribonacci(n - 3)
        return self.dp[n]
```

```java
public class Solution {
    private HashMap<Integer, Integer> dp = new HashMap<>();

    public int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }
        if (dp.containsKey(n)) {
            return dp.get(n);
        }

        dp.put(n, tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3));
        return dp.get(n);
    }
}
```

```cpp
class Solution {
    unordered_map<int, int> dp;

public:
    int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }
        if (dp.count(n)) return dp[n];

        dp[n] = tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @constructor
     */
    constructor() {
        this.dp = new Map();
    }

    /**
     * @param {number} n
     * @return {number}
     */
    tribonacci(n) {
        if (n <= 2) {
            return n === 0 ? 0 : 1;
        }
        if (this.dp.has(n)) {
            return this.dp.get(n);
        }
        const result =
            this.tribonacci(n - 1) +
            this.tribonacci(n - 2) +
            this.tribonacci(n - 3);
        this.dp.set(n, result);
        return result;
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, int> dp = new Dictionary<int, int>();

    public int Tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        if (dp.ContainsKey(n)) return dp[n];

        dp[n] = Tribonacci(n - 1) + Tribonacci(n - 2) + Tribonacci(n - 3);
        return dp[n];
    }
}
```

```go
func tribonacci(n int) int {
    dp := make(map[int]int)

    var helper func(n int) int
    helper = func(n int) int {
        if n == 0 {
            return 0
        }
        if n <= 2 {
            return 1
        }
        if val, ok := dp[n]; ok {
            return val
        }
        dp[n] = helper(n-1) + helper(n-2) + helper(n-3)
        return dp[n]
    }

    return helper(n)
}
```

```kotlin
class Solution {
    private val dp = HashMap<Int, Int>()

    fun tribonacci(n: Int): Int {
        if (n == 0) return 0
        if (n <= 2) return 1
        if (dp.containsKey(n)) return dp[n]!!

        dp[n] = tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3)
        return dp[n]!!
    }
}
```

```swift
class Solution {
    private var dp = [Int: Int]()

    func tribonacci(_ n: Int) -> Int {
        if n == 0 { return 0 }
        if n <= 2 { return 1 }
        if let val = dp[n] { return val }

        dp[n] = tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3)
        return dp[n]!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of working backwards from n and relying on recursion, we can build up the solution from the base cases. Start with the known values T(0), T(1), and T(2), then iteratively compute each subsequent value until we reach T(n). This eliminates recursion overhead and makes the computation straightforward.

### Algorithm

1. If `n` is `0`, return `0`. If `n` is `1` or `2`, return `1`.
2. Create an array `dp` of size `n+1` and initialize `dp[0] = 0`, `dp[1] = 1`, `dp[2] = 1`.
3. For each `i` from `3` to `n`, compute `dp[i] = dp[i-1] + dp[i-2] + dp[i-3]`.
4. Return `dp[n]`.

::tabs-start

```python
class Solution:
    def tribonacci(self, n: int) -> int:
        if n <= 2:
            return 1 if n != 0 else 0

        dp = [0] * (n + 1)
        dp[1] = dp[2] = 1
        for i in range(3, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]
        return dp[n]
```

```java
public class Solution {
    public int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }

        int[] dp = new int[n + 1];
        dp[1] = dp[2] = 1;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
        }
        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }

        vector<int> dp(n + 1, 0);
        dp[1] = dp[2] = 1;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
        }
        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    tribonacci(n) {
        if (n <= 2) {
            return n === 0 ? 0 : 1;
        }

        const dp = new Array(n + 1).fill(0);
        dp[1] = dp[2] = 1;
        for (let i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
        }
        return dp[n];
    }
}
```

```csharp
public class Solution {
    public int Tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;

        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = dp[2] = 1;

        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
        }

        return dp[n];
    }
}
```

```go
func tribonacci(n int) int {
    if n == 0 {
        return 0
    }
    if n <= 2 {
        return 1
    }

    dp := make([]int, n+1)
    dp[1], dp[2] = 1, 1
    for i := 3; i <= n; i++ {
        dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
    }
    return dp[n]
}
```

```kotlin
class Solution {
    fun tribonacci(n: Int): Int {
        if (n == 0) return 0
        if (n <= 2) return 1

        val dp = IntArray(n + 1)
        dp[1] = 1
        dp[2] = 1
        for (i in 3..n) {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]
        }
        return dp[n]
    }
}
```

```swift
class Solution {
    func tribonacci(_ n: Int) -> Int {
        if n == 0 { return 0 }
        if n <= 2 { return 1 }

        var dp = [Int](repeating: 0, count: n + 1)
        dp[1] = 1
        dp[2] = 1
        for i in 3...n {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]
        }
        return dp[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

Notice that to compute T(n), we only need the three most recent values: T(n-1), T(n-2), and T(n-3). We do not need to store the entire history. By keeping just three variables (or a small fixed-size array), we can reduce space complexity from O(n) to O(1).

A clever trick uses an array of size 3 and the modulo operator. At iteration i, we store the new value at index i % 3, which naturally overwrites the oldest value we no longer need.

### Algorithm

1. Initialize an array `t = [0, 1, 1]` representing the first three tribonacci numbers.
2. If `n < 3`, return `t[n]` directly.
3. For each `i` from `3` to `n`, compute `t[i % 3] = t[0] + t[1] + t[2]`.
4. Return `t[n % 3]`.

::tabs-start

```python
class Solution:
    def tribonacci(self, n: int) -> int:
        t = [0, 1, 1]

        if n < 3:
            return t[n]

        for i in range(3, n + 1):
            t[i % 3] = sum(t)
        return t[n % 3]
```

```java
public class Solution {
    public int tribonacci(int n) {
        int t[] = {0, 1, 1};
        if (n < 3) return t[n];

        for (int i = 3; i <= n; ++i) {
            t[i % 3] = t[0] + t[1] + t[2];
        }
        return t[n % 3];
    }
}
```

```cpp
class Solution {
public:
    int tribonacci(int n) {
        int t[] = {0, 1, 1};
        if (n < 3) return t[n];

        for (int i = 3; i <= n; ++i) {
            t[i % 3] = t[0] + t[1] + t[2];
        }
        return t[n % 3];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    tribonacci(n) {
        const t = [0, 1, 1];
        if (n < 3) return t[n];

        for (let i = 3; i <= n; ++i) {
            t[i % 3] = t[0] + t[1] + t[2];
        }
        return t[n % 3];
    }
}
```

```csharp
public class Solution {
    public int Tribonacci(int n) {
        int[] t = {0, 1, 1};
        if (n < 3) return t[n];

        for (int i = 3; i <= n; i++) {
            t[i % 3] = t[0] + t[1] + t[2];
        }

        return t[n % 3];
    }
}
```

```go
func tribonacci(n int) int {
    t := []int{0, 1, 1}
    if n < 3 {
        return t[n]
    }

    for i := 3; i <= n; i++ {
        t[i%3] = t[0] + t[1] + t[2]
    }
    return t[n%3]
}
```

```kotlin
class Solution {
    fun tribonacci(n: Int): Int {
        val t = intArrayOf(0, 1, 1)
        if (n < 3) return t[n]

        for (i in 3..n) {
            t[i % 3] = t[0] + t[1] + t[2]
        }
        return t[n % 3]
    }
}
```

```swift
class Solution {
    func tribonacci(_ n: Int) -> Int {
        var t = [0, 1, 1]
        if n < 3 { return t[n] }

        for i in 3...n {
            t[i % 3] = t[0] + t[1] + t[2]
        }
        return t[n % 3]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Incorrect Base Cases

The tribonacci sequence has three base cases: T(0) = 0, T(1) = 1, and T(2) = 1. A common mistake is treating it like Fibonacci and only handling two base cases, or incorrectly setting T(0) = 1. Always explicitly check for `n == 0`, `n == 1`, and `n == 2` and return the correct values before entering the main computation loop.

### Integer Overflow in Recursive Solution

The naive recursive solution without memoization has exponential time complexity O(3^n), which causes timeout for even moderate values of n. Additionally, without memoization, the same subproblems are computed repeatedly, leading to massive redundant work. Always use memoization or an iterative approach to achieve linear time complexity.
