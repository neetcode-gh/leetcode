## 1. Dynamic Programming (Top-Down)

### Intuition

At each step, we can eat one orange, half the oranges (if divisible by `2`), or two-thirds of the oranges (if divisible by `3`). A naive recursion explores all three options at each state and picks the minimum.

The challenge is that `n` can be very large, but memoization helps by caching results for previously computed values. However, this approach still explores too many states because eating one orange at a time creates many intermediate values.

### Algorithm

1. Use a hash map to memoize results for each value of `n`.
2. Base case: if `n` is `0`, return `0` (no days needed).
3. For each state, compute the minimum of:
   - Eating one orange and solving for `n - 1`
   - If divisible by `2`, eating half and solving for `n / 2`
   - If divisible by `3`, eating two-thirds and solving for `n / 3`
4. Store and return the minimum result plus one day.

::tabs-start

```python
class Solution:
    def minDays(self, n: int) -> int:
        dp = {}

        def dfs(n):
            if n == 0:
                return 0
            if n in dp:
                return dp[n]

            res = 1 + dfs(n - 1)
            if n % 3 == 0:
                res = min(res, 1 + dfs(n // 3))
            if n % 2 == 0:
                res = min(res, 1 + dfs(n // 2))

            dp[n] = res
            return res

        return dfs(n)
```

```java
public class Solution {
    private Map<Integer, Integer> dp = new HashMap<>();

    public int minDays(int n) {
        return dfs(n);
    }

    private int dfs(int n) {
        if (n == 0) return 0;
        if (dp.containsKey(n)) return dp.get(n);

        int res = 1 + dfs(n - 1);
        if (n % 3 == 0) res = Math.min(res, 1 + dfs(n / 3));
        if (n % 2 == 0) res = Math.min(res, 1 + dfs(n / 2));

        dp.put(n, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    unordered_map<int, int> dp;

    int minDays(int n) {
        return dfs(n);
    }

    int dfs(int n) {
        if (n == 0) return 0;
        if (dp.count(n)) return dp[n];

        int res = 1 + dfs(n - 1);
        if (n % 3 == 0) res = min(res, 1 + dfs(n / 3));
        if (n % 2 == 0) res = min(res, 1 + dfs(n / 2));

        return dp[n] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    minDays(n) {
        const dp = new Map();

        const dfs = (n) => {
            if (n === 0) return 0;
            if (dp.has(n)) return dp.get(n);

            let res = 1 + dfs(n - 1);
            if (n % 3 === 0) res = Math.min(res, 1 + dfs(n / 3));
            if (n % 2 === 0) res = Math.min(res, 1 + dfs(n / 2));

            dp.set(n, res);
            return res;
        };

        return dfs(n);
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, int> dp = new Dictionary<int, int>();

    public int MinDays(int n) {
        return Dfs(n);
    }

    private int Dfs(int n) {
        if (n == 0) return 0;
        if (dp.ContainsKey(n)) return dp[n];

        int res = 1 + Dfs(n - 1);
        if (n % 3 == 0) res = Math.Min(res, 1 + Dfs(n / 3));
        if (n % 2 == 0) res = Math.Min(res, 1 + Dfs(n / 2));

        dp[n] = res;
        return res;
    }
}
```

```go
func minDays(n int) int {
    dp := make(map[int]int)

    var dfs func(n int) int
    dfs = func(n int) int {
        if n == 0 {
            return 0
        }
        if val, ok := dp[n]; ok {
            return val
        }

        res := 1 + dfs(n-1)
        if n%3 == 0 {
            res = min(res, 1+dfs(n/3))
        }
        if n%2 == 0 {
            res = min(res, 1+dfs(n/2))
        }

        dp[n] = res
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
    private val dp = hashMapOf<Int, Int>()

    fun minDays(n: Int): Int {
        return dfs(n)
    }

    private fun dfs(n: Int): Int {
        if (n == 0) return 0
        if (n in dp) return dp[n]!!

        var res = 1 + dfs(n - 1)
        if (n % 3 == 0) res = minOf(res, 1 + dfs(n / 3))
        if (n % 2 == 0) res = minOf(res, 1 + dfs(n / 2))

        dp[n] = res
        return res
    }
}
```

```swift
class Solution {
    private var dp = [Int: Int]()

    func minDays(_ n: Int) -> Int {
        return dfs(n)
    }

    private func dfs(_ n: Int) -> Int {
        if n == 0 { return 0 }
        if let val = dp[n] { return val }

        var res = 1 + dfs(n - 1)
        if n % 3 == 0 { res = min(res, 1 + dfs(n / 3)) }
        if n % 2 == 0 { res = min(res, 1 + dfs(n / 2)) }

        dp[n] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Greedy + Dynamic Programming (Top-Down)

### Intuition

The key optimization is recognizing that we should always try to divide rather than subtract one repeatedly. Instead of exploring `n - 1` recursively (which creates exponentially many states), we can directly compute how many subtractions are needed to reach a divisible number.

To reach a number divisible by `2`, we need `n % 2` subtractions. To reach a number divisible by `3`, we need `n % 3` subtractions. By adding these remainder costs upfront, we only need to recurse on `n / 2` and `n / 3`, drastically reducing the state space to O(log `n`).

### Algorithm

1. Use a hash map with base cases: `0` oranges takes `0` days, `1` orange takes `1` day.
2. For each state `n`:
   - Compute cost to divide by `2`: `(n % 2)` remainder days + `1` division day + solve for `n / 2`
   - Compute cost to divide by `3`: `(n % 3)` remainder days + `1` division day + solve for `n / 3`
   - Take the minimum of both options.
3. Memoize and return the result.

::tabs-start

```python
class Solution:
    def minDays(self, n: int) -> int:
        dp = {0: 0, 1: 1}

        def dfs(n):
            if n in dp:
                return dp[n]

            res = 1 + (n % 2) + dfs(n // 2)
            res = min(res, 1 + (n % 3) + dfs(n // 3))
            dp[n] = res
            return res

        return dfs(n)
```

```java
public class Solution {
    private Map<Integer, Integer> dp = new HashMap<>();

    public int minDays(int n) {
        dp.put(0, 0);
        dp.put(1, 1);
        return dfs(n);
    }

    private int dfs(int n) {
        if (dp.containsKey(n)) return dp.get(n);

        int res = 1 + (n % 2) + dfs(n / 2);
        res = Math.min(res, 1 + (n % 3) + dfs(n / 3));

        dp.put(n, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    unordered_map<int, int> dp;

    int minDays(int n) {
        dp[0] = 0;
        dp[1] = 1;
        return dfs(n);
    }

private:
    int dfs(int n) {
        if (dp.count(n)) return dp[n];

        int res = 1 + (n % 2) + dfs(n / 2);
        res = min(res, 1 + (n % 3) + dfs(n / 3));

        return dp[n] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    minDays(n) {
        const dp = new Map();
        dp.set(0, 0);
        dp.set(1, 1);

        const dfs = (n) => {
            if (dp.has(n)) return dp.get(n);

            let res = 1 + (n % 2) + dfs(Math.floor(n / 2));
            res = Math.min(res, 1 + (n % 3) + dfs(Math.floor(n / 3)));

            dp.set(n, res);
            return res;
        };

        return dfs(n);
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, int> dp = new Dictionary<int, int>();

    public int MinDays(int n) {
        dp[0] = 0;
        dp[1] = 1;
        return Dfs(n);
    }

    private int Dfs(int n) {
        if (dp.ContainsKey(n)) return dp[n];

        int res = 1 + (n % 2) + Dfs(n / 2);
        res = Math.Min(res, 1 + (n % 3) + Dfs(n / 3));

        dp[n] = res;
        return res;
    }
}
```

```go
func minDays(n int) int {
    dp := map[int]int{0: 0, 1: 1}

    var dfs func(n int) int
    dfs = func(n int) int {
        if val, ok := dp[n]; ok {
            return val
        }

        res := 1 + (n % 2) + dfs(n/2)
        res = min(res, 1+(n%3)+dfs(n/3))

        dp[n] = res
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
    private val dp = hashMapOf(0 to 0, 1 to 1)

    fun minDays(n: Int): Int {
        return dfs(n)
    }

    private fun dfs(n: Int): Int {
        if (n in dp) return dp[n]!!

        var res = 1 + (n % 2) + dfs(n / 2)
        res = minOf(res, 1 + (n % 3) + dfs(n / 3))

        dp[n] = res
        return res
    }
}
```

```swift
class Solution {
    private var dp = [0: 0, 1: 1]

    func minDays(_ n: Int) -> Int {
        return dfs(n)
    }

    private func dfs(_ n: Int) -> Int {
        if let val = dp[n] { return val }

        var res = 1 + (n % 2) + dfs(n / 2)
        res = min(res, 1 + (n % 3) + dfs(n / 3))

        dp[n] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

---

## 3. Breadth First Search

### Intuition

BFS naturally finds the shortest path in an unweighted graph. Here, each state (number of oranges) is a node, and each valid operation is an edge. Since all edges have equal cost (one day), BFS will find the minimum days when we first reach `0`.

We use a visited set to avoid reprocessing the same orange count. From each state, we explore eating one orange, and optionally dividing by `2` or `3` if applicable.

### Algorithm

1. Initialize a queue with `n` and a visited set.
2. Process level by level (each level represents one day):
   - For each current orange count, try all three operations.
   - If any operation results in `0`, return the current day count.
   - Add unvisited new states to the queue.
3. Continue until reaching `0`.

::tabs-start

```python
class Solution:
    def minDays(self, n: int) -> int:
        q = deque([n])
        visit = set()
        res = 0

        while q:
            res += 1
            for _ in range(len(q)):
                node = q.popleft()
                nei = node - 1
                if nei == 0:
                    return res
                if nei not in visit:
                    visit.add(nei)
                    q.append(nei)
                for d in range(2, 4):
                    if node % d == 0:
                        nei = node // d
                        if nei == 0:
                            return res
                        if nei not in visit:
                            visit.add(nei)
                            q.append(nei)
        return res
```

```java
public class Solution {
    public int minDays(int n) {
        Queue<Integer> q = new LinkedList<>();
        Set<Integer> visit = new HashSet<>();
        q.offer(n);
        int res = 0;

        while (!q.isEmpty()) {
            res++;
            for (int i = q.size(); i > 0; i--) {
                int node = q.poll();
                int nei = node - 1;
                if (nei == 0) return res;
                if (!visit.contains(nei)) {
                    visit.add(nei);
                    q.offer(nei);
                }
                for (int d = 2; d <= 3; d++) {
                    if (node % d == 0) {
                        nei = node / d;
                        if (nei == 0) return res;
                        if (!visit.contains(nei)) {
                            visit.add(nei);
                            q.offer(nei);
                        }
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
    int minDays(int n) {
        queue<int> q;
        unordered_set<int> visit;
        q.push(n);
        int res = 0;

        while (!q.empty()) {
            res++;
            for (int i = q.size(); i > 0; i--) {
                int node = q.front(); q.pop();
                int nei = node - 1;
                if (nei == 0) return res;
                if (visit.find(nei) == visit.end()) {
                    visit.insert(nei);
                    q.push(nei);
                }
                for (int d = 2; d <= 3; d++) {
                    if (node % d == 0) {
                        nei = node / d;
                        if (nei == 0) return res;
                        if (visit.find(nei) == visit.end()) {
                            visit.insert(nei);
                            q.push(nei);
                        }
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
    minDays(n) {
        const q = new Queue([n]);
        const visit = new Set();
        let res = 0;

        while (!q.isEmpty()) {
            res++;
            for (let i = q.size(); i > 0; i--) {
                let node = q.pop();
                let nei = node - 1;
                if (nei === 0) return res;
                if (!visit.has(nei)) {
                    visit.add(nei);
                    q.push(nei);
                }
                for (let d = 2; d <= 3; d++) {
                    if (node % d === 0) {
                        nei = Math.floor(node / d);
                        if (nei === 0) return res;
                        if (!visit.has(nei)) {
                            visit.add(nei);
                            q.push(nei);
                        }
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
    public int MinDays(int n) {
        Queue<int> q = new Queue<int>();
        HashSet<int> visit = new HashSet<int>();
        q.Enqueue(n);
        int res = 0;

        while (q.Count > 0) {
            res++;
            for (int i = q.Count; i > 0; i--) {
                int node = q.Dequeue();
                int nei = node - 1;
                if (nei == 0) return res;
                if (!visit.Contains(nei)) {
                    visit.Add(nei);
                    q.Enqueue(nei);
                }
                for (int d = 2; d <= 3; d++) {
                    if (node % d == 0) {
                        nei = node / d;
                        if (nei == 0) return res;
                        if (!visit.Contains(nei)) {
                            visit.Add(nei);
                            q.Enqueue(nei);
                        }
                    }
                }
            }
        }
        return res;
    }
}
```

```go
func minDays(n int) int {
    q := []int{n}
    visit := make(map[int]bool)
    res := 0

    for len(q) > 0 {
        res++
        for i := len(q); i > 0; i-- {
            node := q[0]
            q = q[1:]
            nei := node - 1
            if nei == 0 {
                return res
            }
            if !visit[nei] {
                visit[nei] = true
                q = append(q, nei)
            }
            for d := 2; d <= 3; d++ {
                if node%d == 0 {
                    nei = node / d
                    if nei == 0 {
                        return res
                    }
                    if !visit[nei] {
                        visit[nei] = true
                        q = append(q, nei)
                    }
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun minDays(n: Int): Int {
        val q = ArrayDeque<Int>()
        val visit = hashSetOf<Int>()
        q.addLast(n)
        var res = 0

        while (q.isNotEmpty()) {
            res++
            repeat(q.size) {
                val node = q.removeFirst()
                var nei = node - 1
                if (nei == 0) return res
                if (nei !in visit) {
                    visit.add(nei)
                    q.addLast(nei)
                }
                for (d in 2..3) {
                    if (node % d == 0) {
                        nei = node / d
                        if (nei == 0) return res
                        if (nei !in visit) {
                            visit.add(nei)
                            q.addLast(nei)
                        }
                    }
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func minDays(_ n: Int) -> Int {
        var q = [n]
        var visit = Set<Int>()
        var res = 0

        while !q.isEmpty {
            res += 1
            for _ in 0..<q.count {
                let node = q.removeFirst()
                var nei = node - 1
                if nei == 0 { return res }
                if !visit.contains(nei) {
                    visit.insert(nei)
                    q.append(nei)
                }
                for d in 2...3 {
                    if node % d == 0 {
                        nei = node / d
                        if nei == 0 { return res }
                        if !visit.contains(nei) {
                            visit.insert(nei)
                            q.append(nei)
                        }
                    }
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

---

## Common Pitfalls

### Recursing on n-1 Directly Causes TLE

The naive approach of recursively calling `dfs(n-1)` for the "eat one orange" option explores O(n) states, causing Time Limit Exceeded for large inputs. The key optimization is to never recurse on `n-1` directly. Instead, compute the cost to reach the nearest divisible number: `(n % 2) + 1 + dfs(n // 2)` or `(n % 3) + 1 + dfs(n // 3)`. This reduces the state space from O(n) to O(log n).

### Missing Base Cases in Memoization

The optimized solution requires explicit base cases for `n = 0` and `n = 1` before computing the recursive formula. Forgetting `dp[1] = 1` will cause infinite recursion or incorrect results since the formula `1 + (n % 2) + dfs(n // 2)` does not naturally terminate at 1. Always initialize the memoization cache with `{0: 0, 1: 1}`.

### Integer Division Confusion Across Languages

In the optimized recurrence, you compute `dfs(n // 2)` and `dfs(n // 3)`. Be careful with integer division semantics. In Python, `//` performs floor division. In JavaScript, you need `Math.floor(n / 2)`. Using regular division `/` in languages like JavaScript or Python 2 will produce floating-point results, causing cache misses and incorrect behavior.

### Forgetting That All Three Options Must Be Considered

Even in the optimized solution, you must consider both paths: reducing to a multiple of 2 and reducing to a multiple of 3. Some solutions incorrectly assume one division is always better. For example, with `n = 7`, going via 6 (divide by 3) takes 3 days, but going via 6 then 3 then 1 needs careful comparison. Always take the minimum of both division paths.
