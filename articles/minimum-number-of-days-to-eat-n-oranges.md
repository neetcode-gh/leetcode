## 1. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Greedy + Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

---

## 3. Breadth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$
