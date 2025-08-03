## 1. Depth First Search

::tabs-start

```python
class Solution:
    def maximumValueSum(self, nums: List[int], k: int, edges: List[List[int]]) -> int:
        adj = [[] for _ in range(len(nums))]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        def dfs(node, par):
            res = [nums[node], nums[node] ^ k]
            for child in adj[node]:
                if child == par:
                    continue

                cur = dfs(child, node)
                tmp = []
                tmp.append(max(res[0] + cur[0], res[1] + cur[1]))
                tmp.append(max(res[1] + cur[0], res[0] + cur[1]))
                res = tmp

            return res

        return dfs(0, -1)[0]
```

```java
public class Solution {
    public long maximumValueSum(int[] nums, int k, int[][] edges) {
        int n = nums.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
        }

        return dfs(0, -1, nums, k, adj)[0];
    }

    private long[] dfs(int node, int parent, int[] nums, int k, List<Integer>[] adj) {
        long[] res = { nums[node], nums[node] ^ k };
        for (int child : adj[node]) {
            if (child == parent) continue;

            long[] cur = dfs(child, node, nums, k, adj);
            long[] tmp = new long[2];
            tmp[0] = Math.max(res[0] + cur[0], res[1] + cur[1]);
            tmp[1] = Math.max(res[1] + cur[0], res[0] + cur[1]);
            res = tmp;
        }
        return res;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> adj;

public:
    long long maximumValueSum(vector<int>& nums, int k, vector<vector<int>>& edges) {
        int n = nums.size();
        adj.resize(n);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        return dfs(0, -1, nums, k)[0];
    }

private:
    vector<long long> dfs(int node, int parent, vector<int>& nums, int k) {
        vector<long long> res = { nums[node], nums[node] ^ k };
        for (int child : adj[node]) {
            if (child == parent) continue;

            vector<long long> cur = dfs(child, node, nums, k);
            vector<long long> tmp(2);
            tmp[0] = max(res[0] + cur[0], res[1] + cur[1]);
            tmp[1] = max(res[1] + cur[0], res[0] + cur[1]);
            res = tmp;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @param {number[][]} edges
     * @return {number}
     */
    maximumValueSum(nums, k, edges) {
        const n = nums.length;
        const adj = Array.from({ length: n }, () => []);

        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const dfs = (node, parent) => {
            let res = [nums[node], nums[node] ^ k];

            for (const child of adj[node]) {
                if (child === parent) continue;

                const cur = dfs(child, node);
                const tmp = [];
                tmp[0] = Math.max(res[0] + cur[0], res[1] + cur[1]);
                tmp[1] = Math.max(res[1] + cur[0], res[0] + cur[1]);
                res = tmp;
            }

            return res;
        };

        return dfs(0, -1)[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def maximumValueSum(self, nums: List[int], k: int, edges: List[List[int]]) -> int:
        dp = [[None] * 2 for _ in range(len(nums))] + [[0, float("-inf")]]

        def dfs(i, xorCnt):
            if dp[i][xorCnt] is not None:
                return dp[i][xorCnt]

            res = nums[i] + dfs(i + 1, xorCnt)
            res = max(res, (nums[i] ^ k) + dfs(i + 1, xorCnt ^ 1))
            dp[i][xorCnt] = res
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    private long[][] dp;

    public long maximumValueSum(int[] nums, int k, int[][] edges) {
        int n = nums.length;
        dp = new long[n + 1][2];
        for (long[] row : dp) Arrays.fill(row, Long.MIN_VALUE);
        dp[n][0] = 0;
        dp[n][1] = Integer.MIN_VALUE;

        return dfs(0, 0, nums, k);
    }

    private long dfs(int i, int xorCnt, int[] nums, int k) {
        if (dp[i][xorCnt] != Long.MIN_VALUE) {
            return dp[i][xorCnt];
        }

        long res = nums[i] + dfs(i + 1, xorCnt, nums, k);
        res = Math.max(res, (nums[i] ^ k) + dfs(i + 1, xorCnt ^ 1, nums, k));

        return dp[i][xorCnt] = res;
    }
}
```

```cpp
class Solution {
    vector<vector<long long>> dp;

public:
    long long maximumValueSum(vector<int>& nums, int k, vector<vector<int>>& edges) {
        int n = nums.size();
        dp.assign(n + 1, vector<long long>(2, LLONG_MIN));
        dp[n][0] = 0;
        dp[n][1] = INT_MIN;

        return dfs(0, 0, nums, k);
    }

private:
    long long dfs(int i, int xorCnt, vector<int>& nums, int k) {
        if (dp[i][xorCnt] != LLONG_MIN) {
            return dp[i][xorCnt];
        }

        long long res = nums[i] + dfs(i + 1, xorCnt, nums, k);
        res = max(res, (nums[i] ^ k) + dfs(i + 1, xorCnt ^ 1, nums, k));
        return dp[i][xorCnt] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @param {number[][]} edges
     * @return {number}
     */
    maximumValueSum(nums, k, edges) {
        const n = nums.length;
        const dp = Array.from({ length: n + 1 }, () => [null, null]);
        dp[n][0] = 0;
        dp[n][1] = -Infinity;

        const dfs = (i, xorCnt) => {
            if (dp[i][xorCnt] !== null) return dp[i][xorCnt];

            let res = nums[i] + dfs(i + 1, xorCnt);
            res = Math.max(res, (nums[i] ^ k) + dfs(i + 1, xorCnt ^ 1));
            return (dp[i][xorCnt] = res);
        };

        return dfs(0, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def maximumValueSum(self, nums: List[int], k: int, edges: List[List[int]]) -> int:
        n = len(nums)
        dp = [[0, 0] for _ in range(n + 1)]
        dp[n][1] = float("-inf")

        for i in range(n - 1, -1, -1):
            dp[i][0] = max(nums[i] + dp[i + 1][0], (nums[i] ^ k) + dp[i + 1][1])
            dp[i][1] = max(nums[i] + dp[i + 1][1], (nums[i] ^ k) + dp[i + 1][0])

        return dp[0][0]
```

```java
public class Solution {
    public long maximumValueSum(int[] nums, int k, int[][] edges) {
        int n = nums.length;
        long[][] dp = new long[n + 1][2];
        dp[n][1] = Integer.MIN_VALUE;

        for (int i = n - 1; i >= 0; i--) {
            dp[i][0] = Math.max(nums[i] + dp[i + 1][0], (nums[i] ^ k) + dp[i + 1][1]);
            dp[i][1] = Math.max(nums[i] + dp[i + 1][1], (nums[i] ^ k) + dp[i + 1][0]);
        }

        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    long long maximumValueSum(vector<int>& nums, int k, vector<vector<int>>& edges) {
        int n = nums.size();
        vector<vector<long long>> dp(n + 1, vector<long long>(2));
        dp[n][1] = INT_MIN;

        for (int i = n - 1; i >= 0; i--) {
            dp[i][0] = max(nums[i] + dp[i + 1][0], (nums[i] ^ k) + dp[i + 1][1]);
            dp[i][1] = max(nums[i] + dp[i + 1][1], (nums[i] ^ k) + dp[i + 1][0]);
        }

        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @param {number[][]} edges
     * @return {number}
     */
    maximumValueSum(nums, k, edges) {
        const n = nums.length;
        const dp = Array.from({ length: n + 1 }, () => [0, 0]);
        dp[n][1] = -Infinity;

        for (let i = n - 1; i >= 0; i--) {
            dp[i][0] = Math.max(
                nums[i] + dp[i + 1][0],
                (nums[i] ^ k) + dp[i + 1][1],
            );
            dp[i][1] = Math.max(
                nums[i] + dp[i + 1][1],
                (nums[i] ^ k) + dp[i + 1][0],
            );
        }

        return dp[0][0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def maximumValueSum(self, nums: List[int], k: int, edges: List[List[int]]) -> int:
        dp = [0, float("-inf")]

        for i in range(len(nums) - 1, -1, -1):
            next_dp = [0, 0]
            next_dp[0] = max(nums[i] + dp[0], (nums[i] ^ k) + dp[1])
            next_dp[1] = max(nums[i] + dp[1], (nums[i] ^ k) + dp[0])
            dp = next_dp

        return dp[0]
```

```java
public class Solution {
    public long maximumValueSum(int[] nums, int k, int[][] edges) {
        int n = nums.length;
        long[] dp = {0, Long.MIN_VALUE};

        for (int i = n - 1; i >= 0; i--) {
            long[] nextDp = new long[2];
            nextDp[0] = Math.max(nums[i] + dp[0], (nums[i] ^ k) + dp[1]);
            nextDp[1] = Math.max(nums[i] + dp[1], (nums[i] ^ k) + dp[0]);
            dp = nextDp;
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    long long maximumValueSum(vector<int>& nums, int k, vector<vector<int>>& edges) {
        int n = nums.size();
        vector<long long> dp = {0, LLONG_MIN};

        for (int i = n - 1; i >= 0; i--) {
            vector<long long> nextDp(2);
            nextDp[0] = max(nums[i] + dp[0], (nums[i] ^ k) + dp[1]);
            nextDp[1] = max(nums[i] + dp[1], (nums[i] ^ k) + dp[0]);
            dp = nextDp;
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @param {number[][]} edges
     * @return {number}
     */
    maximumValueSum(nums, k, edges) {
        const n = nums.length;
        let dp = [0, -Infinity];

        for (let i = n - 1; i >= 0; i--) {
            let nextDp = [0, 0];
            nextDp[0] = Math.max(nums[i] + dp[0], (nums[i] ^ k) + dp[1]);
            nextDp[1] = Math.max(nums[i] + dp[1], (nums[i] ^ k) + dp[0]);
            dp = nextDp;
        }

        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 5. Greedy

::tabs-start

```python
class Solution:
    def maximumValueSum(self, nums: List[int], k: int, edges: List[List[int]]) -> int:
        delta = [(num ^ k) - num for num in nums]
        delta.sort(reverse=True)
        res = sum(nums)

        for i in range(0, len(nums), 2):
            if i == len(nums) - 1:
                break
            path_delta = delta[i] + delta[i + 1]
            if path_delta <= 0:
                break
            res += path_delta

        return res
```

```java
public class Solution {
    public long maximumValueSum(int[] nums, int k, int[][] edges) {
        int n = nums.length;
        int[] delta = new int[n];
        long res = 0;
        for (int i = 0; i < n; i++) {
            res += nums[i];
            delta[i] = (nums[i] ^ k) - nums[i];
        }

        Arrays.sort(delta);
        for (int i = n - 1; i > 0; i -= 2) {
            int pathDelta = delta[i] + delta[i - 1];
            if (pathDelta <= 0) {
                break;
            }
            res += pathDelta;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long maximumValueSum(vector<int>& nums, int k, vector<vector<int>>& edges) {
        int n = nums.size();
        vector<int> delta(n);
        long long res = 0;
        for (int i = 0; i < n; i++) {
            res += nums[i];
            delta[i] = (nums[i] ^ k) - nums[i];
        }

        sort(delta.rbegin(), delta.rend());

        for (int i = 0; i + 1 < n; i += 2) {
            int pathDelta = delta[i] + delta[i + 1];
            if (pathDelta <= 0) {
                break;
            }
            res += pathDelta;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @param {number[][]} edges
     * @return {number}
     */
    maximumValueSum(nums, k, edges) {
        const n = nums.length;
        let res = 0;
        let delta = [];
        for (let i = 0; i < n; i++) {
            res += nums[i];
            delta.push((nums[i] ^ k) - nums[i]);
        }

        delta.sort((a, b) => b - a);
        for (let i = 0; i + 1 < n; i += 2) {
            let pathDelta = delta[i] + delta[i + 1];
            if (pathDelta <= 0) {
                break;
            }
            res += pathDelta;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 6. Greedy (Optimal)

::tabs-start

```python
class Solution:
    def maximumValueSum(self, nums: List[int], k: int, edges: List[List[int]]) -> int:
        xorCnt = res = 0
        minDiff = 1 << 30

        for num in nums:
            xorNum = num ^ k
            if xorNum > num:
                res += xorNum
                xorCnt ^= 1
            else:
                res += num
            minDiff = min(minDiff, abs(xorNum - num))

        return res - xorCnt * minDiff
```

```java
public class Solution {
    public long maximumValueSum(int[] nums, int k, int[][] edges) {
        int xorCnt = 0, minDiff = 1 << 30;
        long res = 0;

        for (int num : nums) {
            int xorNum = num ^ k;
            if (xorNum > num) {
                res += xorNum;
                xorCnt ^= 1;
            } else {
                res += num;
            }
            minDiff = Math.min(minDiff, Math.abs(xorNum - num));
        }

        return res - xorCnt * minDiff;
    }
}
```

```cpp
class Solution {
public:
    long long maximumValueSum(vector<int>& nums, int k, vector<vector<int>>& edges) {
        int xorCnt = 0, minDiff = 1 << 30;
        long long res = 0;

        for (int& num : nums) {
            int xorNum = num ^ k;
            if (xorNum > num) {
                res += xorNum;
                xorCnt ^= 1;
            } else {
                res += num;
            }
            minDiff = min(minDiff, abs(xorNum - num));
        }

        return res - (xorCnt * minDiff);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @param {number[][]} edges
     * @return {number}
     */
    maximumValueSum(nums, k, edges) {
        let xorCnt = 0,
            res = 0,
            minDiff = 1 << 30;

        for (let num of nums) {
            let xorNum = num ^ k;
            if (xorNum > num) {
                res += xorNum;
                xorCnt ^= 1;
            } else {
                res += num;
            }
            minDiff = Math.min(minDiff, Math.abs(xorNum - num));
        }

        return res - xorCnt * minDiff;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
