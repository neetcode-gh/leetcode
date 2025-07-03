## 1. Recursion

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ {\sqrt {n}})$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * \sqrt {n})$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * \sqrt {n})$
- Space complexity: $O(n)$

---

## 4. Breadth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * \sqrt {n})$
- Space complexity: $O(n)$

---

## 5. Math

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\sqrt {n})$
- Space complexity: $O(1)$
