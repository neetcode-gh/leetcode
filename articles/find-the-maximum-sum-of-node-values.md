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

```csharp
public class Solution {
    private List<int>[] adj;

    public long MaximumValueSum(int[] nums, int k, int[][] edges) {
        int n = nums.Length;
        adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        return Dfs(0, -1, nums, k)[0];
    }

    private long[] Dfs(int node, int parent, int[] nums, int k) {
        long[] res = { nums[node], nums[node] ^ k };
        foreach (int child in adj[node]) {
            if (child == parent) continue;

            long[] cur = Dfs(child, node, nums, k);
            long[] tmp = new long[2];
            tmp[0] = Math.Max(res[0] + cur[0], res[1] + cur[1]);
            tmp[1] = Math.Max(res[1] + cur[0], res[0] + cur[1]);
            res = tmp;
        }
        return res;
    }
}
```

```go
func maximumValueSum(nums []int, k int, edges [][]int) int64 {
    n := len(nums)
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
        adj[edge[1]] = append(adj[edge[1]], edge[0])
    }

    var dfs func(node, parent int) [2]int64
    dfs = func(node, parent int) [2]int64 {
        res := [2]int64{int64(nums[node]), int64(nums[node] ^ k)}
        for _, child := range adj[node] {
            if child == parent {
                continue
            }
            cur := dfs(child, node)
            tmp := [2]int64{}
            tmp[0] = max64(res[0]+cur[0], res[1]+cur[1])
            tmp[1] = max64(res[1]+cur[0], res[0]+cur[1])
            res = tmp
        }
        return res
    }

    return dfs(0, -1)[0]
}

func max64(a, b int64) int64 {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<Int>>

    fun maximumValueSum(nums: IntArray, k: Int, edges: Array<IntArray>): Long {
        val n = nums.size
        adj = Array(n) { mutableListOf<Int>() }
        for (edge in edges) {
            adj[edge[0]].add(edge[1])
            adj[edge[1]].add(edge[0])
        }

        return dfs(0, -1, nums, k)[0]
    }

    private fun dfs(node: Int, parent: Int, nums: IntArray, k: Int): LongArray {
        var res = longArrayOf(nums[node].toLong(), (nums[node] xor k).toLong())
        for (child in adj[node]) {
            if (child == parent) continue

            val cur = dfs(child, node, nums, k)
            val tmp = LongArray(2)
            tmp[0] = maxOf(res[0] + cur[0], res[1] + cur[1])
            tmp[1] = maxOf(res[1] + cur[0], res[0] + cur[1])
            res = tmp
        }
        return res
    }
}
```

```swift
class Solution {
    private var adj: [[Int]] = []

    func maximumValueSum(_ nums: [Int], _ k: Int, _ edges: [[Int]]) -> Int {
        let n = nums.count
        adj = Array(repeating: [Int](), count: n)
        for edge in edges {
            adj[edge[0]].append(edge[1])
            adj[edge[1]].append(edge[0])
        }

        return dfs(0, -1, nums, k)[0]
    }

    private func dfs(_ node: Int, _ parent: Int, _ nums: [Int], _ k: Int) -> [Int] {
        var res = [nums[node], nums[node] ^ k]
        for child in adj[node] {
            if child == parent { continue }

            let cur = dfs(child, node, nums, k)
            var tmp = [Int](repeating: 0, count: 2)
            tmp[0] = max(res[0] + cur[0], res[1] + cur[1])
            tmp[1] = max(res[1] + cur[0], res[0] + cur[1])
            res = tmp
        }
        return res
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

```csharp
public class Solution {
    private long[][] dp;

    public long MaximumValueSum(int[] nums, int k, int[][] edges) {
        int n = nums.Length;
        dp = new long[n + 1][];
        for (int i = 0; i <= n; i++) {
            dp[i] = new long[] { long.MinValue, long.MinValue };
        }
        dp[n][0] = 0;
        dp[n][1] = int.MinValue;

        return Dfs(0, 0, nums, k);
    }

    private long Dfs(int i, int xorCnt, int[] nums, int k) {
        if (dp[i][xorCnt] != long.MinValue) {
            return dp[i][xorCnt];
        }

        long res = nums[i] + Dfs(i + 1, xorCnt, nums, k);
        res = Math.Max(res, (nums[i] ^ k) + Dfs(i + 1, xorCnt ^ 1, nums, k));

        return dp[i][xorCnt] = res;
    }
}
```

```go
func maximumValueSum(nums []int, k int, edges [][]int) int64 {
    n := len(nums)
    dp := make([][2]int64, n+1)
    for i := range dp {
        dp[i] = [2]int64{math.MinInt64, math.MinInt64}
    }
    dp[n][0] = 0
    dp[n][1] = math.MinInt32

    var dfs func(i, xorCnt int) int64
    dfs = func(i, xorCnt int) int64 {
        if dp[i][xorCnt] != math.MinInt64 {
            return dp[i][xorCnt]
        }

        res := int64(nums[i]) + dfs(i+1, xorCnt)
        res = max64(res, int64(nums[i]^k)+dfs(i+1, xorCnt^1))
        dp[i][xorCnt] = res
        return res
    }

    return dfs(0, 0)
}

func max64(a, b int64) int64 {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<LongArray>

    fun maximumValueSum(nums: IntArray, k: Int, edges: Array<IntArray>): Long {
        val n = nums.size
        dp = Array(n + 1) { LongArray(2) { Long.MIN_VALUE } }
        dp[n][0] = 0
        dp[n][1] = Int.MIN_VALUE.toLong()

        return dfs(0, 0, nums, k)
    }

    private fun dfs(i: Int, xorCnt: Int, nums: IntArray, k: Int): Long {
        if (dp[i][xorCnt] != Long.MIN_VALUE) {
            return dp[i][xorCnt]
        }

        var res = nums[i] + dfs(i + 1, xorCnt, nums, k)
        res = maxOf(res, (nums[i] xor k) + dfs(i + 1, xorCnt xor 1, nums, k))

        dp[i][xorCnt] = res
        return res
    }
}
```

```swift
class Solution {
    private var dp: [[Int?]] = []

    func maximumValueSum(_ nums: [Int], _ k: Int, _ edges: [[Int]]) -> Int {
        let n = nums.count
        dp = Array(repeating: [nil, nil], count: n + 1)
        dp[n][0] = 0
        dp[n][1] = Int.min / 2

        return dfs(0, 0, nums, k)
    }

    private func dfs(_ i: Int, _ xorCnt: Int, _ nums: [Int], _ k: Int) -> Int {
        if let cached = dp[i][xorCnt] {
            return cached
        }

        var res = nums[i] + dfs(i + 1, xorCnt, nums, k)
        res = max(res, (nums[i] ^ k) + dfs(i + 1, xorCnt ^ 1, nums, k))

        dp[i][xorCnt] = res
        return res
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

```csharp
public class Solution {
    public long MaximumValueSum(int[] nums, int k, int[][] edges) {
        int n = nums.Length;
        long[][] dp = new long[n + 1][];
        for (int i = 0; i <= n; i++) {
            dp[i] = new long[2];
        }
        dp[n][1] = int.MinValue;

        for (int i = n - 1; i >= 0; i--) {
            dp[i][0] = Math.Max(nums[i] + dp[i + 1][0], (nums[i] ^ k) + dp[i + 1][1]);
            dp[i][1] = Math.Max(nums[i] + dp[i + 1][1], (nums[i] ^ k) + dp[i + 1][0]);
        }

        return dp[0][0];
    }
}
```

```go
func maximumValueSum(nums []int, k int, edges [][]int) int64 {
    n := len(nums)
    dp := make([][2]int64, n+1)
    dp[n][1] = math.MinInt32

    for i := n - 1; i >= 0; i-- {
        dp[i][0] = max64(int64(nums[i])+dp[i+1][0], int64(nums[i]^k)+dp[i+1][1])
        dp[i][1] = max64(int64(nums[i])+dp[i+1][1], int64(nums[i]^k)+dp[i+1][0])
    }

    return dp[0][0]
}

func max64(a, b int64) int64 {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maximumValueSum(nums: IntArray, k: Int, edges: Array<IntArray>): Long {
        val n = nums.size
        val dp = Array(n + 1) { LongArray(2) }
        dp[n][1] = Int.MIN_VALUE.toLong()

        for (i in n - 1 downTo 0) {
            dp[i][0] = maxOf(nums[i] + dp[i + 1][0], (nums[i] xor k) + dp[i + 1][1])
            dp[i][1] = maxOf(nums[i] + dp[i + 1][1], (nums[i] xor k) + dp[i + 1][0])
        }

        return dp[0][0]
    }
}
```

```swift
class Solution {
    func maximumValueSum(_ nums: [Int], _ k: Int, _ edges: [[Int]]) -> Int {
        let n = nums.count
        var dp = [[Int]](repeating: [0, 0], count: n + 1)
        dp[n][1] = Int.min / 2

        for i in stride(from: n - 1, through: 0, by: -1) {
            dp[i][0] = max(nums[i] + dp[i + 1][0], (nums[i] ^ k) + dp[i + 1][1])
            dp[i][1] = max(nums[i] + dp[i + 1][1], (nums[i] ^ k) + dp[i + 1][0])
        }

        return dp[0][0]
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

```csharp
public class Solution {
    public long MaximumValueSum(int[] nums, int k, int[][] edges) {
        int n = nums.Length;
        long[] dp = { 0, long.MinValue };

        for (int i = n - 1; i >= 0; i--) {
            long[] nextDp = new long[2];
            nextDp[0] = Math.Max(nums[i] + dp[0], (nums[i] ^ k) + dp[1]);
            nextDp[1] = Math.Max(nums[i] + dp[1], (nums[i] ^ k) + dp[0]);
            dp = nextDp;
        }

        return dp[0];
    }
}
```

```go
func maximumValueSum(nums []int, k int, edges [][]int) int64 {
    n := len(nums)
    dp := [2]int64{0, math.MinInt64}

    for i := n - 1; i >= 0; i-- {
        nextDp := [2]int64{}
        nextDp[0] = max64(int64(nums[i])+dp[0], int64(nums[i]^k)+dp[1])
        nextDp[1] = max64(int64(nums[i])+dp[1], int64(nums[i]^k)+dp[0])
        dp = nextDp
    }

    return dp[0]
}

func max64(a, b int64) int64 {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maximumValueSum(nums: IntArray, k: Int, edges: Array<IntArray>): Long {
        val n = nums.size
        var dp = longArrayOf(0, Long.MIN_VALUE)

        for (i in n - 1 downTo 0) {
            val nextDp = LongArray(2)
            nextDp[0] = maxOf(nums[i] + dp[0], (nums[i] xor k) + dp[1])
            nextDp[1] = maxOf(nums[i] + dp[1], (nums[i] xor k) + dp[0])
            dp = nextDp
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func maximumValueSum(_ nums: [Int], _ k: Int, _ edges: [[Int]]) -> Int {
        let n = nums.count
        var dp = [0, Int.min / 2]

        for i in stride(from: n - 1, through: 0, by: -1) {
            var nextDp = [0, 0]
            nextDp[0] = max(nums[i] + dp[0], (nums[i] ^ k) + dp[1])
            nextDp[1] = max(nums[i] + dp[1], (nums[i] ^ k) + dp[0])
            dp = nextDp
        }

        return dp[0]
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

```csharp
public class Solution {
    public long MaximumValueSum(int[] nums, int k, int[][] edges) {
        int n = nums.Length;
        int[] delta = new int[n];
        long res = 0;

        for (int i = 0; i < n; i++) {
            res += nums[i];
            delta[i] = (nums[i] ^ k) - nums[i];
        }

        Array.Sort(delta);
        Array.Reverse(delta);

        for (int i = 0; i + 1 < n; i += 2) {
            int pathDelta = delta[i] + delta[i + 1];
            if (pathDelta <= 0) break;
            res += pathDelta;
        }

        return res;
    }
}
```

```go
import "sort"

func maximumValueSum(nums []int, k int, edges [][]int) int64 {
    n := len(nums)
    delta := make([]int, n)
    res := int64(0)

    for i := 0; i < n; i++ {
        res += int64(nums[i])
        delta[i] = (nums[i] ^ k) - nums[i]
    }

    sort.Sort(sort.Reverse(sort.IntSlice(delta)))

    for i := 0; i+1 < n; i += 2 {
        pathDelta := delta[i] + delta[i+1]
        if pathDelta <= 0 {
            break
        }
        res += int64(pathDelta)
    }

    return res
}
```

```kotlin
class Solution {
    fun maximumValueSum(nums: IntArray, k: Int, edges: Array<IntArray>): Long {
        val n = nums.size
        val delta = IntArray(n)
        var res = 0L

        for (i in 0 until n) {
            res += nums[i]
            delta[i] = (nums[i] xor k) - nums[i]
        }

        delta.sortDescending()

        var i = 0
        while (i + 1 < n) {
            val pathDelta = delta[i] + delta[i + 1]
            if (pathDelta <= 0) break
            res += pathDelta
            i += 2
        }

        return res
    }
}
```

```swift
class Solution {
    func maximumValueSum(_ nums: [Int], _ k: Int, _ edges: [[Int]]) -> Int {
        let n = nums.count
        var delta = [Int](repeating: 0, count: n)
        var res = 0

        for i in 0..<n {
            res += nums[i]
            delta[i] = (nums[i] ^ k) - nums[i]
        }

        delta.sort(by: >)

        var i = 0
        while i + 1 < n {
            let pathDelta = delta[i] + delta[i + 1]
            if pathDelta <= 0 { break }
            res += pathDelta
            i += 2
        }

        return res
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

```csharp
public class Solution {
    public long MaximumValueSum(int[] nums, int k, int[][] edges) {
        int xorCnt = 0, minDiff = 1 << 30;
        long res = 0;

        foreach (int num in nums) {
            int xorNum = num ^ k;
            if (xorNum > num) {
                res += xorNum;
                xorCnt ^= 1;
            } else {
                res += num;
            }
            minDiff = Math.Min(minDiff, Math.Abs(xorNum - num));
        }

        return res - xorCnt * minDiff;
    }
}
```

```go
func maximumValueSum(nums []int, k int, edges [][]int) int64 {
    xorCnt := 0
    minDiff := 1 << 30
    res := int64(0)

    for _, num := range nums {
        xorNum := num ^ k
        if xorNum > num {
            res += int64(xorNum)
            xorCnt ^= 1
        } else {
            res += int64(num)
        }
        diff := xorNum - num
        if diff < 0 {
            diff = -diff
        }
        if diff < minDiff {
            minDiff = diff
        }
    }

    return res - int64(xorCnt*minDiff)
}
```

```kotlin
class Solution {
    fun maximumValueSum(nums: IntArray, k: Int, edges: Array<IntArray>): Long {
        var xorCnt = 0
        var minDiff = 1 shl 30
        var res = 0L

        for (num in nums) {
            val xorNum = num xor k
            if (xorNum > num) {
                res += xorNum
                xorCnt = xorCnt xor 1
            } else {
                res += num
            }
            minDiff = minOf(minDiff, kotlin.math.abs(xorNum - num))
        }

        return res - xorCnt * minDiff
    }
}
```

```swift
class Solution {
    func maximumValueSum(_ nums: [Int], _ k: Int, _ edges: [[Int]]) -> Int {
        var xorCnt = 0
        var minDiff = 1 << 30
        var res = 0

        for num in nums {
            let xorNum = num ^ k
            if xorNum > num {
                res += xorNum
                xorCnt ^= 1
            } else {
                res += num
            }
            minDiff = min(minDiff, abs(xorNum - num))
        }

        return res - xorCnt * minDiff
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
