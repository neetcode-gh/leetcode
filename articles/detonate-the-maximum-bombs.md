## 1. Depth First Search

::tabs-start

```python
class Solution:
    def maximumDetonation(self, bombs: list[list[int]]) -> int:
        adj = [[] for _ in range(len(bombs))]

        for i in range(len(bombs)):
            x1, y1, r1 = bombs[i]
            for j in range(i + 1, len(bombs)):
                x2, y2, r2 = bombs[j]
                d = (x1 - x2) ** 2 + (y1 - y2) ** 2

                if d <= r1 ** 2:
                    adj[i].append(j)
                if d <= r2 ** 2:
                    adj[j].append(i)

        def dfs(i, visit):
            if i in visit:
                return 0
            visit.add(i)
            for nei in adj[i]:
                dfs(nei, visit)
            return len(visit)

        res = 0
        for i in range(len(bombs)):
            res = max(res, dfs(i, set()))
        return res
```

```java
public class Solution {
    public int maximumDetonation(int[][] bombs) {
        int n = bombs.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
                int x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long d = (long) (x1 - x2) * (x1 - x2) + (long) (y1 - y2) * (y1 - y2);

                if (d <= (long) r1 * r1) {
                    adj[i].add(j);
                }
                if (d <= (long) r2 * r2) {
                    adj[j].add(i);
                }
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            res = Math.max(res, dfs(i, new HashSet<>(), adj));
        }
        return res;
    }

    private int dfs(int i, Set<Integer> visit, List<Integer>[] adj) {
        if (!visit.add(i)) return 0;
        for (int nei : adj[i]) {
            dfs(nei, visit, adj);
        }
        return visit.size();
    }
}
```

```cpp
class Solution {
public:
    int maximumDetonation(vector<vector<int>>& bombs) {
        int n = bombs.size();
        vector<vector<int>> adj(n);

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long long x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
                long long x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long long d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

                if (d <= r1 * r1) {
                    adj[i].push_back(j);
                }
                if (d <= r2 * r2) {
                    adj[j].push_back(i);
                }
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            unordered_set<int> visit;
            res = max(res, dfs(i, visit, adj));
        }
        return res;
    }

private:
    int dfs(int i, unordered_set<int>& visit, vector<vector<int>>& adj) {
        if (!visit.insert(i).second) return 0;
        for (int nei : adj[i]) {
            dfs(nei, visit, adj);
        }
        return visit.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} bombs
     * @return {number}
     */
    maximumDetonation(bombs) {
        let n = bombs.length;
        let adj = Array.from({ length: n }, () => []);

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                let [x1, y1, r1] = bombs[i];
                let [x2, y2, r2] = bombs[j];
                let d = (x1 - x2) ** 2 + (y1 - y2) ** 2;

                if (d <= r1 ** 2) adj[i].push(j);
                if (d <= r2 ** 2) adj[j].push(i);
            }
        }

        const dfs = (i, visit) => {
            if (visit.has(i)) return 0;
            visit.add(i);
            for (let nei of adj[i]) {
                dfs(nei, visit);
            }
            return visit.size;
        };

        let res = 0;
        for (let i = 0; i < n; i++) {
            res = Math.max(res, dfs(i, new Set()));
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def maximumDetonation(self, bombs: list[list[int]]) -> int:
        n = len(bombs)
        adj = [[] for _ in range(n)]

        for i in range(n):
            x1, y1, r1 = bombs[i]
            for j in range(i + 1, n):
                x2, y2, r2 = bombs[j]
                d = (x1 - x2) ** 2 + (y1 - y2) ** 2

                if d <= r1 ** 2:
                    adj[i].append(j)
                if d <= r2 ** 2:
                    adj[j].append(i)

        res = 0
        for i in range(n):
            q = deque([i])
            visit = [False] * n
            visit[i] = True
            count = 1
            while q:
                node = q.popleft()
                for nei in adj[node]:
                    if not visit[nei]:
                        visit[nei] = True
                        count += 1
                        q.append(nei)
            res = max(res, count)
        return res
```

```java
public class Solution {
    public int maximumDetonation(int[][] bombs) {
        int n = bombs.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int i = 0; i < n; i++) {
            int x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
            for (int j = i + 1; j < n; j++) {
                int x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long d = (long) (x1 - x2) * (x1 - x2) + (long) (y1 - y2) * (y1 - y2);

                if (d <= (long) r1 * r1) adj[i].add(j);
                if (d <= (long) r2 * r2) adj[j].add(i);
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            Queue<Integer> q = new LinkedList<>();
            boolean[] visit = new boolean[n];
            q.offer(i);
            visit[i] = true;
            int count = 1;

            while (!q.isEmpty()) {
                int node = q.poll();
                for (int nei : adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        q.offer(nei);
                    }
                }
            }
            res = Math.max(res, count);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maximumDetonation(vector<vector<int>>& bombs) {
        int n = bombs.size();
        vector<vector<int>> adj(n);

        for (int i = 0; i < n; i++) {
            int x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
            for (int j = i + 1; j < n; j++) {
                int x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long long d = (x1 - x2) * 1LL * (x1 - x2) + (y1 - y2) * 1LL * (y1 - y2);

                if (d <= (long long) r1 * r1) adj[i].push_back(j);
                if (d <= (long long) r2 * r2) adj[j].push_back(i);
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            queue<int> q;
            vector<bool> visit(n, false);
            q.push(i);
            visit[i] = true;
            int count = 1;

            while (!q.empty()) {
                int node = q.front();q.pop();
                for (int& nei : adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        q.push(nei);
                    }
                }
            }
            res = max(res, count);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} bombs
     * @return {number}
     */
    maximumDetonation(bombs) {
        let n = bombs.length;
        let adj = Array.from({ length: n }, () => []);

        for (let i = 0; i < n; i++) {
            let [x1, y1, r1] = bombs[i];
            for (let j = i + 1; j < n; j++) {
                let [x2, y2, r2] = bombs[j];
                let d = (x1 - x2) ** 2 + (y1 - y2) ** 2;

                if (d <= r1 ** 2) adj[i].push(j);
                if (d <= r2 ** 2) adj[j].push(i);
            }
        }

        let res = 0;
        for (let i = 0; i < n; i++) {
            let q = new Queue([i]);
            let visit = new Array(n).fill(false);
            visit[i] = true;
            let count = 1;

            while (!q.isEmpty()) {
                let node = q.pop();
                for (let nei of adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        q.push(nei);
                    }
                }
            }
            res = Math.max(res, count);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 3. Iterative DFS

::tabs-start

```python
class Solution:
    def maximumDetonation(self, bombs: list[list[int]]) -> int:
        n = len(bombs)
        adj = [[] for _ in range(n)]

        for i in range(n):
            x1, y1, r1 = bombs[i]
            for j in range(i + 1, n):
                x2, y2, r2 = bombs[j]
                d = (x1 - x2) ** 2 + (y1 - y2) ** 2

                if d <= r1 ** 2:
                    adj[i].append(j)
                if d <= r2 ** 2:
                    adj[j].append(i)

        res = 0
        for i in range(n):
            stack = [i]
            visit = [False] * n
            visit[i] = True
            count = 1

            while stack:
                node = stack.pop()
                for nei in adj[node]:
                    if not visit[nei]:
                        visit[nei] = True
                        count += 1
                        stack.append(nei)
            res = max(res, count)
        return res
```

```java
public class Solution {
    public int maximumDetonation(int[][] bombs) {
        int n = bombs.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int i = 0; i < n; i++) {
            int x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
            for (int j = i + 1; j < n; j++) {
                int x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long d = (long) (x1 - x2) * (x1 - x2) + (long) (y1 - y2) * (y1 - y2);

                if (d <= (long) r1 * r1) adj[i].add(j);
                if (d <= (long) r2 * r2) adj[j].add(i);
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            Stack<Integer> stack = new Stack<>();
            boolean[] visit = new boolean[n];
            stack.push(i);
            visit[i] = true;
            int count = 1;

            while (!stack.isEmpty()) {
                int node = stack.pop();
                for (int nei : adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        stack.push(nei);
                    }
                }
            }
            res = Math.max(res, count);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maximumDetonation(vector<vector<int>>& bombs) {
        int n = bombs.size();
        vector<vector<int>> adj(n);

        for (int i = 0; i < n; i++) {
            int x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
            for (int j = i + 1; j < n; j++) {
                int x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long long d = (long long)(x1 - x2) * (x1 - x2) + (long long)(y1 - y2) * (y1 - y2);

                if (d <= (long long) r1 * r1) adj[i].push_back(j);
                if (d <= (long long) r2 * r2) adj[j].push_back(i);
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            stack<int> stk;
            vector<bool> visit(n, false);
            stk.push(i);
            visit[i] = true;
            int count = 1;

            while (!stk.empty()) {
                int node = stk.top();stk.pop();
                for (int& nei : adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        stk.push(nei);
                    }
                }
            }
            res = max(res, count);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} bombs
     * @return {number}
     */
    maximumDetonation(bombs) {
        let n = bombs.length;
        let adj = Array.from({ length: n }, () => []);

        for (let i = 0; i < n; i++) {
            let [x1, y1, r1] = bombs[i];
            for (let j = i + 1; j < n; j++) {
                let [x2, y2, r2] = bombs[j];
                let d = (x1 - x2) ** 2 + (y1 - y2) ** 2;

                if (d <= r1 ** 2) adj[i].push(j);
                if (d <= r2 ** 2) adj[j].push(i);
            }
        }

        let res = 0;
        for (let i = 0; i < n; i++) {
            let stack = [i];
            let visit = new Array(n).fill(false);
            visit[i] = true;
            let count = 1;

            while (stack.length) {
                let node = stack.pop();
                for (let nei of adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        stack.push(nei);
                    }
                }
            }
            res = Math.max(res, count);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$
