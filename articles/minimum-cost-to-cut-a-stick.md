## 1. Recursion

### Intuition

Each cut costs the length of the current stick segment. The order of cuts matters because earlier cuts determine the lengths of segments for later cuts. We need to try all possible orderings of cuts and find the one with minimum total cost. For a segment from position `l` to `r`, we try each valid cut point, pay the segment length, then recursively solve the resulting sub-segments.

### Algorithm

1. Define `dfs(l, r)` to return the minimum cost to make all cuts within the segment `[l, r]`.
2. Base case: If `r - l == 1`, no cuts are possible, return 0.
3. For each cut point `c` between `l` and `r`:
   - Calculate cost as `(r - l) + dfs(l, c) + dfs(c, r)`.
   - Track the minimum across all choices.
4. Return 0 if no cuts exist in the range, otherwise return the minimum cost.

::tabs-start

```python
class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        def dfs(l, r):
            if r - l == 1:
                return 0
            res = float("inf")
            for c in cuts:
                if l < c < r:
                    res = min(res, (r - l) + dfs(l, c) + dfs(c, r))
            res = 0 if res == float("inf") else res
            return res

        return dfs(0, n)
```

```java
public class Solution {
    public int minCost(int n, int[] cuts) {
        return dfs(0, n, cuts);
    }

    private int dfs(int l, int r, int[] cuts) {
        if (r - l == 1) {
            return 0;
        }
        int res = Integer.MAX_VALUE;
        for (int c : cuts) {
            if (l < c && c < r) {
                res = Math.min(res, (r - l) + dfs(l, c, cuts) + dfs(c, r, cuts));
            }
        }
        return res == Integer.MAX_VALUE ? 0 : res;
    }
}
```

```cpp
class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        return dfs(0, n, cuts);
    }

private:
    int dfs(int l, int r, vector<int>& cuts) {
        if (r - l == 1) {
            return 0;
        }
        int res = INT_MAX;
        for (int c : cuts) {
            if (l < c && c < r) {
                res = min(res, (r - l) + dfs(l, c, cuts) + dfs(c, r, cuts));
            }
        }
        return res == INT_MAX ? 0 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} cuts
     * @return {number}
     */
    minCost(n, cuts) {
        const dfs = (l, r) => {
            if (r - l === 1) {
                return 0;
            }
            let res = Infinity;
            for (const c of cuts) {
                if (l < c && c < r) {
                    res = Math.min(res, r - l + dfs(l, c) + dfs(c, r));
                }
            }
            return res === Infinity ? 0 : res;
        };

        return dfs(0, n);
    }
}
```

```csharp
public class Solution {
    public int MinCost(int n, int[] cuts) {
        return Dfs(0, n, cuts);
    }

    private int Dfs(int l, int r, int[] cuts) {
        if (r - l == 1) return 0;
        int res = int.MaxValue;
        foreach (int c in cuts) {
            if (l < c && c < r) {
                res = Math.Min(res, (r - l) + Dfs(l, c, cuts) + Dfs(c, r, cuts));
            }
        }
        return res == int.MaxValue ? 0 : res;
    }
}
```

```go
func minCost(n int, cuts []int) int {
    var dfs func(l, r int) int
    dfs = func(l, r int) int {
        if r-l == 1 {
            return 0
        }
        res := math.MaxInt32
        for _, c := range cuts {
            if l < c && c < r {
                cur := (r - l) + dfs(l, c) + dfs(c, r)
                if cur < res {
                    res = cur
                }
            }
        }
        if res == math.MaxInt32 {
            return 0
        }
        return res
    }
    return dfs(0, n)
}
```

```kotlin
class Solution {
    fun minCost(n: Int, cuts: IntArray): Int {
        fun dfs(l: Int, r: Int): Int {
            if (r - l == 1) return 0
            var res = Int.MAX_VALUE
            for (c in cuts) {
                if (l < c && c < r) {
                    res = minOf(res, (r - l) + dfs(l, c) + dfs(c, r))
                }
            }
            return if (res == Int.MAX_VALUE) 0 else res
        }
        return dfs(0, n)
    }
}
```

```swift
class Solution {
    func minCost(_ n: Int, _ cuts: [Int]) -> Int {
        func dfs(_ l: Int, _ r: Int) -> Int {
            if r - l == 1 { return 0 }
            var res = Int.max
            for c in cuts {
                if l < c && c < r {
                    res = min(res, (r - l) + dfs(l, c) + dfs(c, r))
                }
            }
            return res == Int.max ? 0 : res
        }
        return dfs(0, n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m ^ N)$
- Space complexity: $O(N)$ for recursion stack.

> Where $m$ is the size of the $cuts$ array, $n$ is the length of the stick, and $N = min(n, m)$.

---

## 2. Dynamic Programming (Top-Down) - I

### Intuition

The recursive solution has overlapping subproblems since many segment pairs `(l, r)` are computed multiple times. By caching results for each unique `(l, r)` pair, we avoid redundant computation. The state depends only on the segment boundaries, not on how we arrived at that segment.

### Algorithm

1. Create a memoization dictionary keyed by `(l, r)` pairs.
2. Define `dfs(l, r)` that returns cached results when available.
3. For each cut point in the range, compute the cost recursively.
4. Store and return the minimum cost for each segment.

::tabs-start

```python
class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        dp = {}

        def dfs(l, r):
            if r - l == 1:
                return 0
            if (l, r) in dp:
                return dp[(l, r)]

            res = float("inf")
            for c in cuts:
                if l < c < r:
                    res = min(res, (r - l) + dfs(l, c) + dfs(c, r))
            res = 0 if res == float("inf") else res
            dp[(l, r)] = res
            return res

        return dfs(0, n)
```

```java
public class Solution {
    private Map<String, Integer> dp;

    public int minCost(int n, int[] cuts) {
        dp = new HashMap<>();
        return dfs(0, n, cuts);
    }

    private int dfs(int l, int r, int[] cuts) {
        if (r - l == 1) {
            return 0;
        }
        String key = l + "," + r;
        if (dp.containsKey(key)) {
            return dp.get(key);
        }

        int res = Integer.MAX_VALUE;
        for (int c : cuts) {
            if (l < c && c < r) {
                res = Math.min(res, (r - l) + dfs(l, c, cuts) + dfs(c, r, cuts));
            }
        }
        res = res == Integer.MAX_VALUE ? 0 : res;
        dp.put(key, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        return dfs(0, n, cuts);
    }

private:
    unordered_map<string, int> dp;

    int dfs(int l, int r, vector<int>& cuts) {
        if (r - l == 1) {
            return 0;
        }
        string key = to_string(l) + "," + to_string(r);
        if (dp.find(key) != dp.end()) {
            return dp[key];
        }

        int res = INT_MAX;
        for (int c : cuts) {
            if (l < c && c < r) {
                res = min(res, (r - l) + dfs(l, c, cuts) + dfs(c, r, cuts));
            }
        }
        res = res == INT_MAX ? 0 : res;
        dp[key] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} cuts
     * @return {number}
     */
    minCost(n, cuts) {
        const dp = new Map();

        const dfs = (l, r) => {
            if (r - l === 1) {
                return 0;
            }
            const key = `${l},${r}`;
            if (dp.has(key)) {
                return dp.get(key);
            }

            let res = Infinity;
            for (const c of cuts) {
                if (l < c && c < r) {
                    res = Math.min(res, r - l + dfs(l, c) + dfs(c, r));
                }
            }
            res = res === Infinity ? 0 : res;
            dp.set(key, res);
            return res;
        };

        return dfs(0, n);
    }
}
```

```csharp
public class Solution {
    private Dictionary<string, int> dp;

    public int MinCost(int n, int[] cuts) {
        dp = new Dictionary<string, int>();
        return Dfs(0, n, cuts);
    }

    private int Dfs(int l, int r, int[] cuts) {
        if (r - l == 1) return 0;
        string key = $"{l},{r}";
        if (dp.ContainsKey(key)) return dp[key];

        int res = int.MaxValue;
        foreach (int c in cuts) {
            if (l < c && c < r) {
                res = Math.Min(res, (r - l) + Dfs(l, c, cuts) + Dfs(c, r, cuts));
            }
        }
        res = res == int.MaxValue ? 0 : res;
        dp[key] = res;
        return res;
    }
}
```

```go
func minCost(n int, cuts []int) int {
    dp := make(map[string]int)

    var dfs func(l, r int) int
    dfs = func(l, r int) int {
        if r-l == 1 {
            return 0
        }
        key := fmt.Sprintf("%d,%d", l, r)
        if val, ok := dp[key]; ok {
            return val
        }

        res := math.MaxInt32
        for _, c := range cuts {
            if l < c && c < r {
                cur := (r - l) + dfs(l, c) + dfs(c, r)
                if cur < res {
                    res = cur
                }
            }
        }
        if res == math.MaxInt32 {
            res = 0
        }
        dp[key] = res
        return res
    }

    return dfs(0, n)
}
```

```kotlin
class Solution {
    fun minCost(n: Int, cuts: IntArray): Int {
        val dp = mutableMapOf<String, Int>()

        fun dfs(l: Int, r: Int): Int {
            if (r - l == 1) return 0
            val key = "$l,$r"
            if (dp.containsKey(key)) return dp[key]!!

            var res = Int.MAX_VALUE
            for (c in cuts) {
                if (l < c && c < r) {
                    res = minOf(res, (r - l) + dfs(l, c) + dfs(c, r))
                }
            }
            res = if (res == Int.MAX_VALUE) 0 else res
            dp[key] = res
            return res
        }

        return dfs(0, n)
    }
}
```

```swift
class Solution {
    func minCost(_ n: Int, _ cuts: [Int]) -> Int {
        var dp = [String: Int]()

        func dfs(_ l: Int, _ r: Int) -> Int {
            if r - l == 1 { return 0 }
            let key = "\(l),\(r)"
            if let val = dp[key] { return val }

            var res = Int.max
            for c in cuts {
                if l < c && c < r {
                    res = min(res, (r - l) + dfs(l, c) + dfs(c, r))
                }
            }
            res = res == Int.max ? 0 : res
            dp[key] = res
            return res
        }

        return dfs(0, n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * N ^ 2)$
- Space complexity: $O(N ^ 2)$

> Where $m$ is the size of the $cuts$ array, $n$ is the length of the stick, and $N = min(n, m)$.

---

## 3. Dynamic Programming (Top-Down) - II

### Intuition

Instead of using arbitrary segment boundaries, we can index by cut positions. After sorting cuts, we define states by cut indices rather than positions. This reduces the state space from potentially O(n^2) to O(m^2) where m is the number of cuts. We pass indices `i` and `j` representing the range of cuts to consider, plus the actual segment boundaries `l` and `r`.

### Algorithm

1. Sort the cuts array.
2. Create a 2D memoization table indexed by cut indices `i` and `j`.
3. Define `dfs(l, r, i, j)` where `i` to `j` are the cut indices within segment `[l, r]`.
4. Base case: If `i > j`, no cuts in this range, return 0.
5. Try each cut index `mid` from `i` to `j`, recursively solve both sides.
6. Return the minimum cost.

::tabs-start

```python
class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        m = len(cuts)
        cuts.sort()
        dp = [[-1] * (m + 1) for _ in range(m + 1)]

        def dfs(l, r, i, j):
            if i > j:
                return 0
            if dp[i][j] != -1:
                return dp[i][j]

            res = float("inf")
            for mid in range(i, j + 1):
                cur = (r - l) + dfs(l, cuts[mid], i, mid - 1) + dfs(cuts[mid], r, mid + 1, j)
                res = min(res, cur)

            dp[i][j] = res
            return res

        return dfs(0, n, 0, m - 1)
```

```java
public class Solution {
    private int[][] dp;

    public int minCost(int n, int[] cuts) {
        int m = cuts.length;
        Arrays.sort(cuts);
        dp = new int[m + 1][m + 1];

        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        return dfs(0, n, 0, m - 1, cuts);
    }

    private int dfs(int l, int r, int i, int j, int[] cuts) {
        if (i > j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int res = Integer.MAX_VALUE;
        for (int mid = i; mid <= j; mid++) {
            int cur = (r - l) + dfs(l, cuts[mid], i, mid - 1, cuts) + dfs(cuts[mid], r, mid + 1, j, cuts);
            res = Math.min(res, cur);
        }

        dp[i][j] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int minCost(int n, vector<int>& cuts) {
        int m = cuts.size();
        sort(cuts.begin(), cuts.end());
        dp = vector<vector<int>>(m + 1, vector<int>(m + 1, -1));
        return dfs(0, n, 0, m - 1, cuts);
    }

private:
    int dfs(int l, int r, int i, int j, vector<int>& cuts) {
        if (i > j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int res = INT_MAX;
        for (int mid = i; mid <= j; mid++) {
            int cur = (r - l) + dfs(l, cuts[mid], i, mid - 1, cuts) + dfs(cuts[mid], r, mid + 1, j, cuts);
            res = min(res, cur);
        }

        dp[i][j] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} cuts
     * @return {number}
     */
    minCost(n, cuts) {
        const m = cuts.length;
        cuts.sort((a, b) => a - b);
        const dp = Array.from({ length: m + 1 }, () => Array(m + 1).fill(-1));

        const dfs = (l, r, i, j) => {
            if (i > j) return 0;
            if (dp[i][j] !== -1) return dp[i][j];

            let res = Infinity;
            for (let mid = i; mid <= j; mid++) {
                const cur =
                    r -
                    l +
                    dfs(l, cuts[mid], i, mid - 1) +
                    dfs(cuts[mid], r, mid + 1, j);
                res = Math.min(res, cur);
            }

            dp[i][j] = res;
            return res;
        };

        return dfs(0, n, 0, m - 1);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public int MinCost(int n, int[] cuts) {
        int m = cuts.Length;
        Array.Sort(cuts);
        dp = new int[m + 1, m + 1];
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= m; j++) {
                dp[i, j] = -1;
            }
        }
        return Dfs(0, n, 0, m - 1, cuts);
    }

    private int Dfs(int l, int r, int i, int j, int[] cuts) {
        if (i > j) return 0;
        if (dp[i, j] != -1) return dp[i, j];

        int res = int.MaxValue;
        for (int mid = i; mid <= j; mid++) {
            int cur = (r - l) + Dfs(l, cuts[mid], i, mid - 1, cuts) + Dfs(cuts[mid], r, mid + 1, j, cuts);
            res = Math.Min(res, cur);
        }

        dp[i, j] = res;
        return res;
    }
}
```

```go
func minCost(n int, cuts []int) int {
    m := len(cuts)
    sort.Ints(cuts)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, m+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(l, r, i, j int) int
    dfs = func(l, r, i, j int) int {
        if i > j {
            return 0
        }
        if dp[i][j] != -1 {
            return dp[i][j]
        }

        res := math.MaxInt32
        for mid := i; mid <= j; mid++ {
            cur := (r - l) + dfs(l, cuts[mid], i, mid-1) + dfs(cuts[mid], r, mid+1, j)
            if cur < res {
                res = cur
            }
        }

        dp[i][j] = res
        return res
    }

    return dfs(0, n, 0, m-1)
}
```

```kotlin
class Solution {
    fun minCost(n: Int, cuts: IntArray): Int {
        val m = cuts.size
        cuts.sort()
        val dp = Array(m + 1) { IntArray(m + 1) { -1 } }

        fun dfs(l: Int, r: Int, i: Int, j: Int): Int {
            if (i > j) return 0
            if (dp[i][j] != -1) return dp[i][j]

            var res = Int.MAX_VALUE
            for (mid in i..j) {
                val cur = (r - l) + dfs(l, cuts[mid], i, mid - 1) + dfs(cuts[mid], r, mid + 1, j)
                res = minOf(res, cur)
            }

            dp[i][j] = res
            return res
        }

        return dfs(0, n, 0, m - 1)
    }
}
```

```swift
class Solution {
    func minCost(_ n: Int, _ cuts: [Int]) -> Int {
        let m = cuts.count
        let sortedCuts = cuts.sorted()
        var dp = [[Int]](repeating: [Int](repeating: -1, count: m + 1), count: m + 1)

        func dfs(_ l: Int, _ r: Int, _ i: Int, _ j: Int) -> Int {
            if i > j { return 0 }
            if dp[i][j] != -1 { return dp[i][j] }

            var res = Int.max
            for mid in i...j {
                let cur = (r - l) + dfs(l, sortedCuts[mid], i, mid - 1) + dfs(sortedCuts[mid], r, mid + 1, j)
                res = min(res, cur)
            }

            dp[i][j] = res
            return res
        }

        return dfs(0, n, 0, m - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m\log m + m ^ 3)$
- Space complexity: $O(m ^ 2)$

> Where $m$ is the size of the $cuts$ array and $n$ is the length of the stick.

---

## 4. Dynamic Programming (Bottom-Up)

### Intuition

We can solve this iteratively by building up from smaller segments to larger ones. First, add 0 and n as boundary points to the sorted cuts. Then `dp[i][j]` represents the minimum cost to cut the segment between cuts[i] and cuts[j]. We fill the table by increasing segment length, since longer segments depend on solutions for shorter ones.

### Algorithm

1. Create extended cuts array: `[0] + sorted(cuts) + [n]`.
2. Initialize a 2D DP table with zeros.
3. For each segment length from 2 to m+1:
   - For each starting index `i`:
     - Set `j = i + length`.
     - Try each cut point `mid` between `i` and `j`.
     - `dp[i][j] = min(cuts[j] - cuts[i] + dp[i][mid] + dp[mid][j])`.
4. Return `dp[0][m + 1]`.

::tabs-start

```python
class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        m = len(cuts)
        cuts = [0] + sorted(cuts) + [n]
        dp = [[0] * (m + 2) for _ in range(m + 2)]

        for length in range(2, m + 2):
            for i in range(m + 2 - length):
                j = i + length
                dp[i][j] = float("inf")
                for mid in range(i + 1, j):
                    dp[i][j] = min(
                        dp[i][j],
                        cuts[j] - cuts[i] + dp[i][mid] + dp[mid][j]
                    )

        return dp[0][m + 1]
```

```java
public class Solution {
    public int minCost(int n, int[] cuts) {
        int m = cuts.length;
        int[] newCuts = new int[m + 2];
        System.arraycopy(cuts, 0, newCuts, 1, m);
        newCuts[0] = 0;
        newCuts[m + 1] = n;
        Arrays.sort(newCuts);

        int[][] dp = new int[m + 2][m + 2];

        for (int length = 2; length <= m + 1; length++) {
            for (int i = 0; i + length <= m + 1; i++) {
                int j = i + length;
                dp[i][j] = Integer.MAX_VALUE;
                for (int mid = i + 1; mid < j; mid++) {
                    dp[i][j] = Math.min(dp[i][j],
                        newCuts[j] - newCuts[i] + dp[i][mid] + dp[mid][j]);
                }
            }
        }

        return dp[0][m + 1];
    }
}
```

```cpp
class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        int m = cuts.size();
        cuts.push_back(0);
        cuts.push_back(n);
        sort(cuts.begin(), cuts.end());

        vector<vector<int>> dp(m + 2, vector<int>(m + 2, 0));

        for (int length = 2; length <= m + 1; length++) {
            for (int i = 0; i + length <= m + 1; i++) {
                int j = i + length;
                dp[i][j] = INT_MAX;
                for (int mid = i + 1; mid < j; mid++) {
                    dp[i][j] = min(dp[i][j],
                        cuts[j] - cuts[i] + dp[i][mid] + dp[mid][j]);
                }
            }
        }

        return dp[0][m + 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} cuts
     * @return {number}
     */
    minCost(n, cuts) {
        const m = cuts.length;
        cuts = [0, ...cuts.sort((a, b) => a - b), n];
        const dp = Array.from({ length: m + 2 }, () => Array(m + 2).fill(0));

        for (let length = 2; length <= m + 1; length++) {
            for (let i = 0; i + length <= m + 1; i++) {
                const j = i + length;
                dp[i][j] = Infinity;
                for (let mid = i + 1; mid < j; mid++) {
                    dp[i][j] = Math.min(
                        dp[i][j],
                        cuts[j] - cuts[i] + dp[i][mid] + dp[mid][j],
                    );
                }
            }
        }

        return dp[0][m + 1];
    }
}
```

```csharp
public class Solution {
    public int MinCost(int n, int[] cuts) {
        int m = cuts.Length;
        int[] newCuts = new int[m + 2];
        Array.Copy(cuts, 0, newCuts, 1, m);
        newCuts[0] = 0;
        newCuts[m + 1] = n;
        Array.Sort(newCuts);

        int[,] dp = new int[m + 2, m + 2];

        for (int length = 2; length <= m + 1; length++) {
            for (int i = 0; i + length <= m + 1; i++) {
                int j = i + length;
                dp[i, j] = int.MaxValue;
                for (int mid = i + 1; mid < j; mid++) {
                    dp[i, j] = Math.Min(dp[i, j],
                        newCuts[j] - newCuts[i] + dp[i, mid] + dp[mid, j]);
                }
            }
        }

        return dp[0, m + 1];
    }
}
```

```go
func minCost(n int, cuts []int) int {
    m := len(cuts)
    newCuts := make([]int, m+2)
    copy(newCuts[1:], cuts)
    newCuts[0] = 0
    newCuts[m+1] = n
    sort.Ints(newCuts)

    dp := make([][]int, m+2)
    for i := range dp {
        dp[i] = make([]int, m+2)
    }

    for length := 2; length <= m+1; length++ {
        for i := 0; i+length <= m+1; i++ {
            j := i + length
            dp[i][j] = math.MaxInt32
            for mid := i + 1; mid < j; mid++ {
                val := newCuts[j] - newCuts[i] + dp[i][mid] + dp[mid][j]
                if val < dp[i][j] {
                    dp[i][j] = val
                }
            }
        }
    }

    return dp[0][m+1]
}
```

```kotlin
class Solution {
    fun minCost(n: Int, cuts: IntArray): Int {
        val m = cuts.size
        val newCuts = IntArray(m + 2)
        newCuts[0] = 0
        newCuts[m + 1] = n
        for (i in cuts.indices) newCuts[i + 1] = cuts[i]
        newCuts.sort()

        val dp = Array(m + 2) { IntArray(m + 2) }

        for (length in 2..m + 1) {
            for (i in 0..m + 1 - length) {
                val j = i + length
                dp[i][j] = Int.MAX_VALUE
                for (mid in i + 1 until j) {
                    dp[i][j] = minOf(dp[i][j],
                        newCuts[j] - newCuts[i] + dp[i][mid] + dp[mid][j])
                }
            }
        }

        return dp[0][m + 1]
    }
}
```

```swift
class Solution {
    func minCost(_ n: Int, _ cuts: [Int]) -> Int {
        let m = cuts.count
        var newCuts = [0] + cuts.sorted() + [n]

        var dp = [[Int]](repeating: [Int](repeating: 0, count: m + 2), count: m + 2)

        for length in 2...m + 1 {
            for i in 0...(m + 1 - length) {
                let j = i + length
                dp[i][j] = Int.max
                for mid in (i + 1)..<j {
                    dp[i][j] = min(dp[i][j],
                        newCuts[j] - newCuts[i] + dp[i][mid] + dp[mid][j])
                }
            }
        }

        return dp[0][m + 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m\log m + m ^ 3)$
- Space complexity: $O(m ^ 2)$

> Where $m$ is the size of the $cuts$ array and $n$ is the length of the stick.
