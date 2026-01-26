## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Recursion** - The foundation for building the brute-force and memoized solutions
- **Dynamic Programming** - Understanding both top-down (memoization) and bottom-up approaches for optimization
- **Breadth-First Search (BFS)** - Used to model the problem as a shortest path search
- **Math (Number Theory)** - Understanding perfect squares and Lagrange's four square theorem for the optimal solution

---

## 1. Recursion

### Intuition

We want to express `n` as a sum of the fewest perfect squares. At each step, we can subtract any perfect square that fits, then recursively solve for the remainder. By trying all possible perfect squares and taking the minimum, we find the optimal answer. This brute-force approach explores all combinations but results in repeated subproblems.

### Algorithm

1. Define a recursive function that takes a target value.
2. Base case: if target is `0`, return `0` (no squares needed).
3. Initialize the result to target (the worst case is using all `1`s).
4. For each perfect square `i*i` that does not exceed target, recursively solve for `(target - i*i)` and update the result with `1 +` the recursive result.
5. Return the minimum count found.

::tabs-start

```python
class Solution:
    def numSquares(self, n: int) -> int:
        def dfs(target):
            if target == 0:
                return 0

            res = target
            for i in range(1, target):
                if i * i > target:
                    break
                res = min(res, 1 + dfs(target - i * i))
            return res

        return dfs(n)
```

```java
public class Solution {
    public int numSquares(int n) {
        return dfs(n);
    }

    private int dfs(int target) {
        if (target == 0) {
            return 0;
        }

        int res = target;
        for (int i = 1; i * i <= target; i++) {
            res = Math.min(res, 1 + dfs(target - i * i));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSquares(int n) {
        return dfs(n);
    }

private:
    int dfs(int target) {
        if (target == 0) {
            return 0;
        }

        int res = target;
        for (int i = 1; i * i <= target; i++) {
            res = min(res, 1 + dfs(target - i * i));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    numSquares(n) {
        const dfs = (target) => {
            if (target === 0) return 0;

            let res = target;
            for (let i = 1; i * i <= target; i++) {
                res = Math.min(res, 1 + dfs(target - i * i));
            }
            return res;
        };

        return dfs(n);
    }
}
```

```csharp
public class Solution {
    public int NumSquares(int n) {
        return Dfs(n);
    }

    private int Dfs(int target) {
        if (target == 0) return 0;

        int res = target;
        for (int i = 1; i * i <= target; i++) {
            res = Math.Min(res, 1 + Dfs(target - i * i));
        }

        return res;
    }
}
```

```go
func numSquares(n int) int {
    var dfs func(target int) int
    dfs = func(target int) int {
        if target == 0 {
            return 0
        }

        res := target
        for i := 1; i*i <= target; i++ {
            res = min(res, 1+dfs(target-i*i))
        }
        return res
    }

    return dfs(n)
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
    fun numSquares(n: Int): Int {
        fun dfs(target: Int): Int {
            if (target == 0) return 0

            var res = target
            var i = 1
            while (i * i <= target) {
                res = minOf(res, 1 + dfs(target - i * i))
                i++
            }
            return res
        }

        return dfs(n)
    }
}
```

```swift
class Solution {
    func numSquares(_ n: Int) -> Int {
        func dfs(_ target: Int) -> Int {
            if target == 0 {
                return 0
            }

            var res = target
            var i = 1
            while i * i <= target {
                res = min(res, 1 + dfs(target - i * i))
                i += 1
            }
            return res
        }

        return dfs(n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ {\sqrt {n}})$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution recomputes the same subproblems many times. By caching results in a memoization table, we avoid redundant work. Each unique target value is solved once, and subsequent calls return the cached result. This transforms the exponential time complexity into polynomial.

### Algorithm

1. Create a memoization dictionary to store results for each target value.
2. Define a recursive function. If target is `0`, return `0`. If target is in `memo`, return the cached value.
3. Initialize result to target.
4. For each perfect square `i*i` up to target, compute `1 + dfs(target - i*i)` and track the minimum.
5. Store the result in `memo` and return it.
6. Call the recursive function with `n`.

::tabs-start

```python
class Solution:
    def numSquares(self, n: int) -> int:
        memo = {}

        def dfs(target):
            if target == 0:
                return 0
            if target in memo:
                return memo[target]

            res = target
            for i in range(1, target + 1):
                if i * i > target:
                    break
                res = min(res, 1 + dfs(target - i * i))

            memo[target] = res
            return res

        return dfs(n)
```

```java
public class Solution {
    Map<Integer, Integer> memo = new HashMap<>();

    private int dfs(int target) {
        if (target == 0) return 0;
        if (memo.containsKey(target)) return memo.get(target);

        int res = target;
        for (int i = 1; i * i <= target; i++) {
            res = Math.min(res, 1 + dfs(target - i * i));
        }

        memo.put(target, res);
        return res;
    }

    public int numSquares(int n) {
        return dfs(n);
    }
}
```

```cpp
class Solution {
public:
    unordered_map<int, int> memo;

    int dfs(int target) {
        if (target == 0) return 0;
        if (memo.count(target)) return memo[target];

        int res = target;
        for (int i = 1; i * i <= target; i++) {
            res = min(res, 1 + dfs(target - i * i));
        }

        return memo[target] = res;
    }

    int numSquares(int n) {
        return dfs(n);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    numSquares(n) {
        const memo = new Map();

        const dfs = (target) => {
            if (target === 0) return 0;
            if (memo.has(target)) {
                return memo.get(target);
            }

            let res = target;
            for (let i = 1; i * i <= target; i++) {
                res = Math.min(res, 1 + dfs(target - i * i));
            }
            memo.set(target, res);
            return res;
        };

        return dfs(n);
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, int> memo = new Dictionary<int, int>();

    public int NumSquares(int n) {
        return Dfs(n);
    }

    private int Dfs(int target) {
        if (target == 0) return 0;
        if (memo.ContainsKey(target)) return memo[target];

        int res = target;
        for (int i = 1; i * i <= target; i++) {
            res = Math.Min(res, 1 + Dfs(target - i * i));
        }

        memo[target] = res;
        return res;
    }
}
```

```go
func numSquares(n int) int {
    memo := make(map[int]int)

    var dfs func(target int) int
    dfs = func(target int) int {
        if target == 0 {
            return 0
        }
        if val, ok := memo[target]; ok {
            return val
        }

        res := target
        for i := 1; i*i <= target; i++ {
            res = min(res, 1+dfs(target-i*i))
        }

        memo[target] = res
        return res
    }

    return dfs(n)
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
    fun numSquares(n: Int): Int {
        val memo = mutableMapOf<Int, Int>()

        fun dfs(target: Int): Int {
            if (target == 0) return 0
            if (memo.containsKey(target)) return memo[target]!!

            var res = target
            var i = 1
            while (i * i <= target) {
                res = minOf(res, 1 + dfs(target - i * i))
                i++
            }

            memo[target] = res
            return res
        }

        return dfs(n)
    }
}
```

```swift
class Solution {
    func numSquares(_ n: Int) -> Int {
        var memo = [Int: Int]()

        func dfs(_ target: Int) -> Int {
            if target == 0 {
                return 0
            }
            if let cached = memo[target] {
                return cached
            }

            var res = target
            var i = 1
            while i * i <= target {
                res = min(res, 1 + dfs(target - i * i))
                i += 1
            }

            memo[target] = res
            return res
        }

        return dfs(n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * \sqrt {n})$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of solving top-down with recursion, we can build the solution bottom-up. We compute the minimum number of squares for every value from `1` to `n`, using previously computed results. For each target, we try subtracting every perfect square and take the minimum result plus one.

### Algorithm

1. Create a `dp` array of size `n+1`, initialized to `n` (worst case of all `1`s). Set `dp[0] = 0`.
2. For each target from `1` to `n`, iterate through all perfect squares `s*s` that do not exceed target.
3. Update `dp[target] = min(dp[target], 1 + dp[target - s*s])`.
4. Return `dp[n]`.

::tabs-start

```python
class Solution:
    def numSquares(self, n: int) -> int:
        dp = [n] * (n + 1)
        dp[0] = 0

        for target in range(1, n + 1):
            for s in range(1, target + 1):
                square = s * s
                if target - square < 0:
                    break
                dp[target] = min(dp[target], 1 + dp[target - square])

        return dp[n]
```

```java
public class Solution {
    public int numSquares(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, n);
        dp[0] = 0;

        for (int target = 1; target <= n; target++) {
            for (int s = 1; s * s <= target; s++) {
                dp[target] = Math.min(dp[target], 1 + dp[target - s * s]);
            }
        }

        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    int numSquares(int n) {
        vector<int> dp(n + 1, n);
        dp[0] = 0;

        for (int target = 1; target <= n; target++) {
            for (int s = 1; s * s <= target; s++) {
                dp[target] = min(dp[target], 1 + dp[target - s * s]);
            }
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
    numSquares(n) {
        const dp = Array(n + 1).fill(n);
        dp[0] = 0;

        for (let target = 1; target <= n; target++) {
            for (let s = 1; s * s <= target; s++) {
                dp[target] = Math.min(dp[target], 1 + dp[target - s * s]);
            }
        }

        return dp[n];
    }
}
```

```csharp
public class Solution {
    public int NumSquares(int n) {
        int[] dp = new int[n + 1];
        Array.Fill(dp, n);
        dp[0] = 0;

        for (int target = 1; target <= n; target++) {
            for (int s = 1; s * s <= target; s++) {
                int square = s * s;
                dp[target] = Math.Min(dp[target], 1 + dp[target - square]);
            }
        }

        return dp[n];
    }
}
```

```go
func numSquares(n int) int {
    dp := make([]int, n+1)
    for i := range dp {
        dp[i] = n
    }
    dp[0] = 0

    for target := 1; target <= n; target++ {
        for s := 1; s*s <= target; s++ {
            dp[target] = min(dp[target], 1+dp[target-s*s])
        }
    }

    return dp[n]
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
    fun numSquares(n: Int): Int {
        val dp = IntArray(n + 1) { n }
        dp[0] = 0

        for (target in 1..n) {
            var s = 1
            while (s * s <= target) {
                dp[target] = minOf(dp[target], 1 + dp[target - s * s])
                s++
            }
        }

        return dp[n]
    }
}
```

```swift
class Solution {
    func numSquares(_ n: Int) -> Int {
        var dp = [Int](repeating: n, count: n + 1)
        dp[0] = 0

        for target in 1...n {
            var s = 1
            while s * s <= target {
                dp[target] = min(dp[target], 1 + dp[target - s * s])
                s += 1
            }
        }

        return dp[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * \sqrt {n})$
- Space complexity: $O(n)$

---

## 4. Breadth First Search

### Intuition

We can view this as a shortest path problem. Starting from `0`, each step adds a perfect square. BFS explores all sums reachable with `1` square, then `2` squares, and so on. The first time we reach `n`, we have found the minimum number of squares. Using a set to track visited values prevents processing the same sum multiple times.

### Algorithm

1. Initialize a queue with `0` and a set to track seen values.
2. Process the queue level by level, incrementing the count at each level.
3. For each current sum, try adding every perfect square `s*s` such that `current + s*s <= n`.
4. If `current + s*s` equals `n`, return the current count.
5. If the new sum has not been seen, add it to the set and enqueue it.
6. Continue until `n` is reached.

::tabs-start

```python
class Solution:
    def numSquares(self, n: int) -> int:
        q = deque()
        seen = set()

        res = 0
        q.append(0)
        while q:
            res += 1
            for _ in range(len(q)):
                cur = q.popleft()
                s = 1
                while s * s + cur <= n:
                    nxt = cur + s * s
                    if nxt == n:
                        return res
                    if nxt not in seen:
                        seen.add(nxt)
                        q.append(nxt)
                    s += 1

        return res
```

```java
public class Solution {
    public int numSquares(int n) {
        Queue<Integer> q = new LinkedList<>();
        Set<Integer> seen = new HashSet<>();

        int res = 0;
        q.offer(0);
        while (!q.isEmpty()) {
            res++;
            for (int i = q.size(); i > 0; i--) {
                int cur = q.poll();
                for (int s = 1; s * s + cur <= n; s++) {
                    int next = cur + s * s;
                    if (next == n) return res;
                    if (!seen.contains(next)) {
                        q.offer(next);
                        seen.add(next);
                    }
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
    int numSquares(int n) {
        queue<int> q;
        unordered_set<int> seen;

        int res = 0;
        q.push(0);
        while (!q.empty()) {
            res++;
            for (int i = q.size(); i > 0; i--) {
                int cur = q.front(); q.pop();
                for (int s = 1; s * s + cur <= n; s++) {
                    int next = cur + s * s;
                    if (next == n) return res;
                    if (seen.find(next) == seen.end()) {
                        q.push(next);
                        seen.insert(next);
                    }
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
     * @param {number} n
     * @return {number}
     */
    numSquares(n) {
        const q = new Queue();
        const seen = new Set();

        let res = 0;
        q.push(0);
        while (!q.isEmpty()) {
            res++;
            for (let i = q.size(); i > 0; i--) {
                const cur = q.pop();
                for (let s = 1; s * s + cur <= n; s++) {
                    const next = cur + s * s;
                    if (next === n) return res;
                    if (!seen.has(next)) {
                        q.push(next);
                        seen.add(next);
                    }
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSquares(int n) {
        Queue<int> q = new Queue<int>();
        HashSet<int> seen = new HashSet<int>();

        int res = 0;
        q.Enqueue(0);

        while (q.Count > 0) {
            res++;
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                int cur = q.Dequeue();
                int s = 1;
                while (s * s + cur <= n) {
                    int nxt = cur + s * s;
                    if (nxt == n) {
                        return res;
                    }
                    if (!seen.Contains(nxt)) {
                        seen.Add(nxt);
                        q.Enqueue(nxt);
                    }
                    s++;
                }
            }
        }

        return res;
    }
}
```

```go
func numSquares(n int) int {
    queue := []int{0}
    seen := make(map[int]bool)

    res := 0
    for len(queue) > 0 {
        res++
        size := len(queue)
        for i := 0; i < size; i++ {
            cur := queue[0]
            queue = queue[1:]
            for s := 1; s*s+cur <= n; s++ {
                next := cur + s*s
                if next == n {
                    return res
                }
                if !seen[next] {
                    seen[next] = true
                    queue = append(queue, next)
                }
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun numSquares(n: Int): Int {
        val queue = ArrayDeque<Int>()
        val seen = mutableSetOf<Int>()

        var res = 0
        queue.add(0)

        while (queue.isNotEmpty()) {
            res++
            val size = queue.size
            repeat(size) {
                val cur = queue.removeFirst()
                var s = 1
                while (s * s + cur <= n) {
                    val next = cur + s * s
                    if (next == n) return res
                    if (next !in seen) {
                        seen.add(next)
                        queue.add(next)
                    }
                    s++
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func numSquares(_ n: Int) -> Int {
        var queue = [0]
        var seen = Set<Int>()

        var res = 0
        while !queue.isEmpty {
            res += 1
            let size = queue.count
            for _ in 0..<size {
                let cur = queue.removeFirst()
                var s = 1
                while s * s + cur <= n {
                    let next = cur + s * s
                    if next == n {
                        return res
                    }
                    if !seen.contains(next) {
                        seen.insert(next)
                        queue.append(next)
                    }
                    s += 1
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * \sqrt {n})$
- Space complexity: $O(n)$

---

## 5. Math

### Intuition

Lagrange's four square theorem states that every positive integer can be expressed as the sum of at most four perfect squares. Using additional number theory, we can determine the exact answer in constant time. If `n` is a perfect square, the answer is `1`. If `n` can be written as the sum of two squares, the answer is `2`. If `n` is of the form `4^k(8m+7)`, the answer is `4`. Otherwise, the answer is `3`.

### Algorithm

1. Remove all factors of `4` from `n` (divide by `4` while divisible).
2. If the reduced `n` is congruent to `7 mod 8`, return `4`.
3. Check if the original `n` is a perfect square. If so, return `1`.
4. Check if `n` can be expressed as the sum of two squares by testing all possible first squares. If so, return `2`.
5. Otherwise, return `3`.

::tabs-start

```python
class Solution:
    def numSquares(self, n: int) -> int:
        while n % 4 == 0:
            n //= 4

        if n % 8 == 7:
            return 4

        def isSquareNum(num):
            s = int(math.sqrt(num))
            return s * s == num

        if isSquareNum(n):
            return 1

        i = 1
        while i * i <= n:
            if isSquareNum(n - i * i):
                return 2
            i += 1

        return 3
```

```java
public class Solution {
    public int numSquares(int n) {
        while (n % 4 == 0) {
            n /= 4;
        }

        if (n % 8 == 7) {
            return 4;
        }

        if (isSquareNum(n)) {
            return 1;
        }

        for (int i = 1; i * i <= n; i++) {
            if (isSquareNum(n - i * i)) {
                return 2;
            }
        }

        return 3;
    }

    private boolean isSquareNum(int num) {
        int s = (int) Math.sqrt(num);
        return s * s == num;
    }
}
```

```cpp
class Solution {
public:
    int numSquares(int n) {
        while (n % 4 == 0) {
            n /= 4;
        }

        if (n % 8 == 7) {
            return 4;
        }

        if (isSquareNum(n)) {
            return 1;
        }

        for (int i = 1; i * i <= n; i++) {
            if (isSquareNum(n - i * i)) {
                return 2;
            }
        }

        return 3;
    }

private:
    bool isSquareNum(int num) {
        int s = (int) sqrt(num);
        return s * s == num;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    numSquares(n) {
        while (n % 4 === 0) {
            n = Math.floor(n / 4);
        }

        if (n % 8 === 7) {
            return 4;
        }

        const isSquareNum = (num) => {
            const s = Math.floor(Math.sqrt(num));
            return s * s === num;
        };

        if (isSquareNum(n)) {
            return 1;
        }

        for (let i = 1; i * i <= n; i++) {
            if (isSquareNum(n - i * i)) {
                return 2;
            }
        }

        return 3;
    }
}
```

```csharp
public class Solution {
    public int NumSquares(int n) {
        while (n % 4 == 0) {
            n /= 4;
        }

        if (n % 8 == 7) {
            return 4;
        }

        bool IsSquareNum(int num) {
            int s = (int)Math.Sqrt(num);
            return s * s == num;
        }

        if (IsSquareNum(n)) {
            return 1;
        }

        for (int i = 1; i * i <= n; i++) {
            if (IsSquareNum(n - i * i)) {
                return 2;
            }
        }

        return 3;
    }
}
```

```go
func numSquares(n int) int {
    for n%4 == 0 {
        n /= 4
    }

    if n%8 == 7 {
        return 4
    }

    isSquareNum := func(num int) bool {
        s := int(math.Sqrt(float64(num)))
        return s*s == num
    }

    if isSquareNum(n) {
        return 1
    }

    for i := 1; i*i <= n; i++ {
        if isSquareNum(n - i*i) {
            return 2
        }
    }

    return 3
}
```

```kotlin
class Solution {
    fun numSquares(n: Int): Int {
        var num = n
        while (num % 4 == 0) {
            num /= 4
        }

        if (num % 8 == 7) {
            return 4
        }

        fun isSquareNum(x: Int): Boolean {
            val s = kotlin.math.sqrt(x.toDouble()).toInt()
            return s * s == x
        }

        if (isSquareNum(num)) {
            return 1
        }

        var i = 1
        while (i * i <= num) {
            if (isSquareNum(num - i * i)) {
                return 2
            }
            i++
        }

        return 3
    }
}
```

```swift
class Solution {
    func numSquares(_ n: Int) -> Int {
        var num = n
        while num % 4 == 0 {
            num /= 4
        }

        if num % 8 == 7 {
            return 4
        }

        func isSquareNum(_ x: Int) -> Bool {
            let s = Int(sqrt(Double(x)))
            return s * s == x
        }

        if isSquareNum(num) {
            return 1
        }

        var i = 1
        while i * i <= num {
            if isSquareNum(num - i * i) {
                return 2
            }
            i += 1
        }

        return 3
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\sqrt {n})$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Not Recognizing Overlapping Subproblems

A common mistake is implementing plain recursion without memoization. The recursive solution recomputes the same subproblems many times (e.g., `dfs(5)` might be called from multiple paths). Without caching results, the solution becomes exponentially slow and will time out on larger inputs.

### Incorrect Base Case or Initialization

Forgetting to handle the base case `dp[0] = 0` or initializing the DP array incorrectly leads to wrong answers. The value `dp[0] = 0` is crucial because it represents that zero squares are needed to sum to zero. Similarly, initializing other values to `n` (worst case of all 1s) ensures the minimum is correctly computed.

### Iterating Over Non-Perfect-Squares

Some implementations mistakenly iterate through all numbers from 1 to target instead of only perfect squares. This wastes computation and can lead to incorrect state transitions. Always ensure the inner loop only considers values `i` where `i * i <= target`.
