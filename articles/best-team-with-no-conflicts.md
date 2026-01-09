## 1. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def bestTeamScore(self, scores: List[int], ages: List[int]) -> int:
        pairs = [[scores[i], ages[i]] for i in range(len(scores))]
        pairs.sort()
        dp = {}

        def dfs(i, j):
            if i == len(pairs):
                return 0
            if (i, j) in dp:
                return dp[(i, j)]

            mScore, mAge = pairs[j] if j >= 0 else [0, 0]
            score, age = pairs[i]
            res = 0
            if not (score > mScore and age < mAge):
                res = dfs(i + 1, i) + score  # add score
            dp[(i, j)] = max(res, dfs(i + 1, j))  # skip score
            return dp[(i, j)]

        return dfs(0, -1)
```

```java
public class Solution {
    private int[][] pairs;
    private int[][] dp;

    public int bestTeamScore(int[] scores, int[] ages) {
        int n = scores.length;
        pairs = new int[n][2];
        for (int i = 0; i < n; i++) {
            pairs[i][0] = scores[i];
            pairs[i][1] = ages[i];
        }
        Arrays.sort(pairs, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));

        dp = new int[n][n + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        return dfs(0, -1);
    }

    private int dfs(int i, int j) {
        if (i == pairs.length) {
            return 0;
        }
        if (dp[i][j + 1] != -1) {
            return dp[i][j + 1];
        }

        int mScore = j >= 0 ? pairs[j][0] : 0;
        int mAge = j >= 0 ? pairs[j][1] : 0;
        int score = pairs[i][0];
        int age = pairs[i][1];

        int res = 0;
        if (!(score > mScore && age < mAge)) {
            res = dfs(i + 1, i) + score;
        }
        dp[i][j + 1] = Math.max(res, dfs(i + 1, j));
        return dp[i][j + 1];
    }
}
```

```cpp
class Solution {
private:
    vector<pair<int, int>> pairs;
    vector<vector<int>> dp;

public:
    int bestTeamScore(vector<int>& scores, vector<int>& ages) {
        int n = scores.size();
        pairs.resize(n);
        for (int i = 0; i < n; i++) {
            pairs[i] = {scores[i], ages[i]};
        }
        sort(pairs.begin(), pairs.end());

        dp = vector<vector<int>>(n, vector<int>(n + 1, -1));
        return dfs(0, -1);
    }

private:
    int dfs(int i, int j) {
        if (i == pairs.size()) {
            return 0;
        }
        if (dp[i][j + 1] != -1) {
            return dp[i][j + 1];
        }

        int mScore = j >= 0 ? pairs[j].first : 0;
        int mAge = j >= 0 ? pairs[j].second : 0;
        int score = pairs[i].first;
        int age = pairs[i].second;

        int res = 0;
        if (!(score > mScore && age < mAge)) {
            res = dfs(i + 1, i) + score;
        }
        dp[i][j + 1] = max(res, dfs(i + 1, j));
        return dp[i][j + 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} scores
     * @param {number[]} ages
     * @return {number}
     */
    bestTeamScore(scores, ages) {
        const n = scores.length;
        const pairs = [];
        for (let i = 0; i < n; i++) {
            pairs.push([scores[i], ages[i]]);
        }
        pairs.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

        const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

        const dfs = (i, j) => {
            if (i === n) {
                return 0;
            }
            if (dp[i][j + 1] !== -1) {
                return dp[i][j + 1];
            }

            const [mScore, mAge] = j >= 0 ? pairs[j] : [0, 0];
            const [score, age] = pairs[i];

            let res = 0;
            if (!(score > mScore && age < mAge)) {
                res = dfs(i + 1, i) + score;
            }
            dp[i][j + 1] = Math.max(res, dfs(i + 1, j));
            return dp[i][j + 1];
        };

        return dfs(0, -1);
    }
}
```

```csharp
public class Solution {
    private int[][] pairs;
    private int[,] dp;

    public int BestTeamScore(int[] scores, int[] ages) {
        int n = scores.Length;
        pairs = new int[n][];
        for (int i = 0; i < n; i++) {
            pairs[i] = new int[] { scores[i], ages[i] };
        }
        Array.Sort(pairs, (a, b) => a[0] == b[0] ? a[1].CompareTo(b[1]) : a[0].CompareTo(b[0]));

        dp = new int[n, n + 1];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= n; j++) {
                dp[i, j] = -1;
            }
        }

        return Dfs(0, -1);
    }

    private int Dfs(int i, int j) {
        if (i == pairs.Length) return 0;
        if (dp[i, j + 1] != -1) return dp[i, j + 1];

        int mScore = j >= 0 ? pairs[j][0] : 0;
        int mAge = j >= 0 ? pairs[j][1] : 0;
        int score = pairs[i][0];
        int age = pairs[i][1];

        int res = 0;
        if (!(score > mScore && age < mAge)) {
            res = Dfs(i + 1, i) + score;
        }
        dp[i, j + 1] = Math.Max(res, Dfs(i + 1, j));
        return dp[i, j + 1];
    }
}
```

```go
func bestTeamScore(scores []int, ages []int) int {
    n := len(scores)
    pairs := make([][2]int, n)
    for i := 0; i < n; i++ {
        pairs[i] = [2]int{scores[i], ages[i]}
    }
    sort.Slice(pairs, func(i, j int) bool {
        if pairs[i][0] == pairs[j][0] {
            return pairs[i][1] < pairs[j][1]
        }
        return pairs[i][0] < pairs[j][0]
    })

    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == n {
            return 0
        }
        if dp[i][j+1] != -1 {
            return dp[i][j+1]
        }

        mScore, mAge := 0, 0
        if j >= 0 {
            mScore, mAge = pairs[j][0], pairs[j][1]
        }
        score, age := pairs[i][0], pairs[i][1]

        res := 0
        if !(score > mScore && age < mAge) {
            res = dfs(i+1, i) + score
        }
        dp[i][j+1] = max(res, dfs(i+1, j))
        return dp[i][j+1]
    }

    return dfs(0, -1)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var pairs: Array<IntArray>
    private lateinit var dp: Array<IntArray>

    fun bestTeamScore(scores: IntArray, ages: IntArray): Int {
        val n = scores.size
        pairs = Array(n) { intArrayOf(scores[it], ages[it]) }
        pairs.sortWith(compareBy({ it[0] }, { it[1] }))

        dp = Array(n) { IntArray(n + 1) { -1 } }
        return dfs(0, -1)
    }

    private fun dfs(i: Int, j: Int): Int {
        if (i == pairs.size) return 0
        if (dp[i][j + 1] != -1) return dp[i][j + 1]

        val mScore = if (j >= 0) pairs[j][0] else 0
        val mAge = if (j >= 0) pairs[j][1] else 0
        val score = pairs[i][0]
        val age = pairs[i][1]

        var res = 0
        if (!(score > mScore && age < mAge)) {
            res = dfs(i + 1, i) + score
        }
        dp[i][j + 1] = maxOf(res, dfs(i + 1, j))
        return dp[i][j + 1]
    }
}
```

```swift
class Solution {
    private var pairs: [[Int]] = []
    private var dp: [[Int]] = []

    func bestTeamScore(_ scores: [Int], _ ages: [Int]) -> Int {
        let n = scores.count
        pairs = (0..<n).map { [scores[$0], ages[$0]] }
        pairs.sort { $0[0] == $1[0] ? $0[1] < $1[1] : $0[0] < $1[0] }

        dp = Array(repeating: Array(repeating: -1, count: n + 1), count: n)
        return dfs(0, -1)
    }

    private func dfs(_ i: Int, _ j: Int) -> Int {
        if i == pairs.count { return 0 }
        if dp[i][j + 1] != -1 { return dp[i][j + 1] }

        let mScore = j >= 0 ? pairs[j][0] : 0
        let mAge = j >= 0 ? pairs[j][1] : 0
        let score = pairs[i][0]
        let age = pairs[i][1]

        var res = 0
        if !(score > mScore && age < mAge) {
            res = dfs(i + 1, i) + score
        }
        dp[i][j + 1] = max(res, dfs(i + 1, j))
        return dp[i][j + 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def bestTeamScore(self, scores: List[int], ages: List[int]) -> int:
        pairs = [[scores[i], ages[i]] for i in range(len(scores))]
        pairs.sort()
        dp = [pairs[i][0] for i in range(len(pairs))]

        for i in range(len(pairs)):
            mScore, mAge = pairs[i]
            for j in range(i):
                score, age = pairs[j]
                if mAge >= age:
                    dp[i] = max(dp[i], mScore + dp[j])

        return max(dp)
```

```java
public class Solution {
    public int bestTeamScore(int[] scores, int[] ages) {
        int n = scores.length;
        int[][] pairs = new int[n][2];
        for (int i = 0; i < n; i++) {
            pairs[i][0] = scores[i];
            pairs[i][1] = ages[i];
        }
        Arrays.sort(pairs, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));

        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = pairs[i][0];
        }

        for (int i = 0; i < n; i++) {
            int mScore = pairs[i][0], mAge = pairs[i][1];
            for (int j = 0; j < i; j++) {
                int score = pairs[j][0], age = pairs[j][1];
                if (mAge >= age) {
                    dp[i] = Math.max(dp[i], mScore + dp[j]);
                }
            }
        }

        int maxScore = 0;
        for (int score : dp) {
            maxScore = Math.max(maxScore, score);
        }
        return maxScore;
    }
}
```

```cpp
class Solution {
public:
    int bestTeamScore(vector<int>& scores, vector<int>& ages) {
        int n = scores.size();
        vector<pair<int, int>> pairs(n);
        for (int i = 0; i < n; i++) {
            pairs[i] = {scores[i], ages[i]};
        }
        sort(pairs.begin(), pairs.end());

        vector<int> dp(n);
        for (int i = 0; i < n; i++) {
            dp[i] = pairs[i].first;
        }

        for (int i = 0; i < n; i++) {
            int mScore = pairs[i].first, mAge = pairs[i].second;
            for (int j = 0; j < i; j++) {
                int score = pairs[j].first, age = pairs[j].second;
                if (mAge >= age) {
                    dp[i] = max(dp[i], mScore + dp[j]);
                }
            }
        }

        return *max_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} scores
     * @param {number[]} ages
     * @return {number}
     */
    bestTeamScore(scores, ages) {
        const n = scores.length;
        const pairs = [];
        for (let i = 0; i < n; i++) {
            pairs.push([scores[i], ages[i]]);
        }
        pairs.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

        const dp = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            dp[i] = pairs[i][0];
        }

        for (let i = 0; i < n; i++) {
            const [mScore, mAge] = pairs[i];
            for (let j = 0; j < i; j++) {
                const [score, age] = pairs[j];
                if (mAge >= age) {
                    dp[i] = Math.max(dp[i], mScore + dp[j]);
                }
            }
        }

        return Math.max(...dp);
    }
}
```

```csharp
public class Solution {
    public int BestTeamScore(int[] scores, int[] ages) {
        int n = scores.Length;
        int[][] pairs = new int[n][];
        for (int i = 0; i < n; i++) {
            pairs[i] = new int[] { scores[i], ages[i] };
        }
        Array.Sort(pairs, (a, b) => a[0] == b[0] ? a[1].CompareTo(b[1]) : a[0].CompareTo(b[0]));

        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = pairs[i][0];
        }

        for (int i = 0; i < n; i++) {
            int mScore = pairs[i][0], mAge = pairs[i][1];
            for (int j = 0; j < i; j++) {
                int score = pairs[j][0], age = pairs[j][1];
                if (mAge >= age) {
                    dp[i] = Math.Max(dp[i], mScore + dp[j]);
                }
            }
        }

        return dp.Max();
    }
}
```

```go
func bestTeamScore(scores []int, ages []int) int {
    n := len(scores)
    pairs := make([][2]int, n)
    for i := 0; i < n; i++ {
        pairs[i] = [2]int{scores[i], ages[i]}
    }
    sort.Slice(pairs, func(i, j int) bool {
        if pairs[i][0] == pairs[j][0] {
            return pairs[i][1] < pairs[j][1]
        }
        return pairs[i][0] < pairs[j][0]
    })

    dp := make([]int, n)
    for i := 0; i < n; i++ {
        dp[i] = pairs[i][0]
    }

    for i := 0; i < n; i++ {
        mScore, mAge := pairs[i][0], pairs[i][1]
        for j := 0; j < i; j++ {
            age := pairs[j][1]
            if mAge >= age {
                if mScore+dp[j] > dp[i] {
                    dp[i] = mScore + dp[j]
                }
            }
        }
    }

    res := 0
    for _, v := range dp {
        if v > res {
            res = v
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun bestTeamScore(scores: IntArray, ages: IntArray): Int {
        val n = scores.size
        val pairs = Array(n) { intArrayOf(scores[it], ages[it]) }
        pairs.sortWith(compareBy({ it[0] }, { it[1] }))

        val dp = IntArray(n) { pairs[it][0] }

        for (i in 0 until n) {
            val mScore = pairs[i][0]
            val mAge = pairs[i][1]
            for (j in 0 until i) {
                val age = pairs[j][1]
                if (mAge >= age) {
                    dp[i] = maxOf(dp[i], mScore + dp[j])
                }
            }
        }

        return dp.maxOrNull() ?: 0
    }
}
```

```swift
class Solution {
    func bestTeamScore(_ scores: [Int], _ ages: [Int]) -> Int {
        let n = scores.count
        var pairs = (0..<n).map { [scores[$0], ages[$0]] }
        pairs.sort { $0[0] == $1[0] ? $0[1] < $1[1] : $0[0] < $1[0] }

        var dp = pairs.map { $0[0] }

        for i in 0..<n {
            let mScore = pairs[i][0]
            let mAge = pairs[i][1]
            for j in 0..<i {
                let age = pairs[j][1]
                if mAge >= age {
                    dp[i] = max(dp[i], mScore + dp[j])
                }
            }
        }

        return dp.max() ?? 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Segment Tree)

::tabs-start

```python
class SegmentTree:
    def __init__(self, N):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.build()

    def build(self):
        self.tree = [0] * (2 * self.n)

    def update(self, i, val):
        pos = self.n + i
        self.tree[pos] = max(self.tree[pos], val)
        pos >>= 1
        while pos >= 1:
            self.tree[pos] = max(self.tree[pos << 1], self.tree[pos << 1 | 1])
            pos >>= 1

    def query(self, l, r):
        res = 0
        l += self.n
        r += self.n + 1
        while l < r:
            if l & 1:
                res = max(res, self.tree[l])
                l += 1
            if r & 1:
                r -= 1
                res = max(res, self.tree[r])
            l >>= 1
            r >>= 1
        return res

class Solution:
    def bestTeamScore(self, scores: list[int], ages: list[int]) -> int:
        pairs = [[scores[i], ages[i]] for i in range(len(scores))]
        pairs.sort()

        dp = [pairs[i][0] for i in range(len(pairs))]
        unique_ages = sorted({ age for _, age in pairs })
        ageId = { val: idx for idx, val in enumerate(unique_ages) }

        segtree = SegmentTree(len(pairs))

        res = 0
        for i in range(len(pairs)):
            mScore, mAge = pairs[i]
            idx = ageId[mAge]
            j = segtree.query(0, idx)
            dp[i] = j + mScore
            segtree.update(idx, dp[i])
            res = max(res, dp[i])

        return res
```

```java
class SegmentTree {
    private int n;
    private int[] tree;

    public SegmentTree(int N) {
        n = N;
        while ((n & (n - 1)) != 0) {
            n++;
        }
        build();
    }

    private void build() {
        tree = new int[2 * n];
    }

    public void update(int i, int val) {
        int pos = n + i;
        tree[pos] = Math.max(tree[pos], val);
        pos >>= 1;
        while (pos >= 1) {
            tree[pos] = Math.max(tree[pos << 1], tree[pos << 1 | 1]);
            pos >>= 1;
        }
    }

    public int query(int l, int r) {
        int res = 0;
        l += n;
        r += n + 1;
        while (l < r) {
            if ((l & 1) == 1) {
                res = Math.max(res, tree[l]);
                l++;
            }
            if ((r & 1) == 1) {
                r--;
                res = Math.max(res, tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int bestTeamScore(int[] scores, int[] ages) {
        int n = scores.length;
        int[][] pairs = new int[n][2];
        for (int i = 0; i < n; i++) {
            pairs[i][0] = scores[i];
            pairs[i][1] = ages[i];
        }
        Arrays.sort(pairs, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));

        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = pairs[i][0];
        }

        Set<Integer> uniqueAgesSet = new TreeSet<>();
        for (int[] pair : pairs) {
            uniqueAgesSet.add(pair[1]);
        }
        List<Integer> uniqueAges = new ArrayList<>(uniqueAgesSet);
        Map<Integer, Integer> ageId = new HashMap<>();
        for (int i = 0; i < uniqueAges.size(); i++) {
            ageId.put(uniqueAges.get(i), i);
        }

        SegmentTree segtree = new SegmentTree(uniqueAges.size());

        int res = 0;
        for (int i = 0; i < n; i++) {
            int mScore = pairs[i][0];
            int mAge = pairs[i][1];
            int idx = ageId.get(mAge);
            int j = segtree.query(0, idx);
            dp[i] = j + mScore;
            segtree.update(idx, dp[i]);
            res = Math.max(res, dp[i]);
        }

        return res;
    }
}
```

```cpp
class SegmentTree {
private:
    int n;
    vector<int> tree;

public:
    SegmentTree(int N) {
        n = N;
        while ((n & (n - 1)) != 0) {
            n++;
        }
        build();
    }

    void build() {
        tree.resize(2 * n, 0);
    }

    void update(int i, int val) {
        int pos = n + i;
        tree[pos] = max(tree[pos], val);
        pos >>= 1;
        while (pos >= 1) {
            tree[pos] = max(tree[pos << 1], tree[pos << 1 | 1]);
            pos >>= 1;
        }
    }

    int query(int l, int r) {
        int res = 0;
        l += n;
        r += n + 1;
        while (l < r) {
            if (l & 1) {
                res = max(res, tree[l]);
                l++;
            }
            if (r & 1) {
                r--;
                res = max(res, tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
};

class Solution {
public:
    int bestTeamScore(vector<int>& scores, vector<int>& ages) {
        int n = scores.size();
        vector<pair<int, int>> pairs(n);
        for (int i = 0; i < n; i++) {
            pairs[i] = {scores[i], ages[i]};
        }
        sort(pairs.begin(), pairs.end());

        vector<int> dp(n);
        for (int i = 0; i < n; i++) {
            dp[i] = pairs[i].first;
        }

        set<int> uniqueAgesSet;
        for (auto& pair : pairs) {
            uniqueAgesSet.insert(pair.second);
        }
        vector<int> uniqueAges(uniqueAgesSet.begin(), uniqueAgesSet.end());
        map<int, int> ageId;
        for (int i = 0; i < uniqueAges.size(); i++) {
            ageId[uniqueAges[i]] = i;
        }

        SegmentTree segtree(uniqueAges.size());

        int res = 0;
        for (int i = 0; i < n; i++) {
            int mScore = pairs[i].first;
            int mAge = pairs[i].second;
            int idx = ageId[mAge];
            int j = segtree.query(0, idx);
            dp[i] = j + mScore;
            segtree.update(idx, dp[i]);
            res = max(res, dp[i]);
        }

        return res;
    }
};
```

```javascript
class SegmentTree {
    /**
     * @constructor
     * @param {number} N
     */
    constructor(N) {
        this.n = N;
        while ((this.n & (this.n - 1)) !== 0) {
            this.n++;
        }
        this.build();
    }

    /**
     * @return {void}
     */
    build() {
        this.tree = new Array(2 * this.n).fill(0);
    }

    /**
     * @param {number} i
     * @param {number} val
     * @return {void}
     */
    update(i, val) {
        let pos = this.n + i;
        this.tree[pos] = Math.max(this.tree[pos], val);
        pos >>= 1;
        while (pos >= 1) {
            this.tree[pos] = Math.max(
                this.tree[pos << 1],
                this.tree[(pos << 1) | 1],
            );
            pos >>= 1;
        }
    }

    /**
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    query(l, r) {
        let res = 0;
        l += this.n;
        r += this.n + 1;
        while (l < r) {
            if (l & 1) {
                res = Math.max(res, this.tree[l]);
                l++;
            }
            if (r & 1) {
                r--;
                res = Math.max(res, this.tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

class Solution {
    /**
     * @param {number[]} scores
     * @param {number[]} ages
     * @return {number}
     */
    bestTeamScore(scores, ages) {
        const n = scores.length;
        const pairs = [];

        for (let i = 0; i < n; i++) {
            pairs.push([scores[i], ages[i]]);
        }
        pairs.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

        const dp = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            dp[i] = pairs[i][0];
        }

        const uniqueAges = [...new Set(pairs.map((p) => p[1]))].sort(
            (a, b) => a - b,
        );
        const ageId = new Map();
        uniqueAges.forEach((val, idx) => ageId.set(val, idx));

        const segtree = new SegmentTree(uniqueAges.length);

        let res = 0;

        for (let i = 0; i < n; i++) {
            const [mScore, mAge] = pairs[i];
            const idx = ageId.get(mAge);
            const j = segtree.query(0, idx);
            dp[i] = j + mScore;
            segtree.update(idx, dp[i]);
            res = Math.max(res, dp[i]);
        }

        return res;
    }
}
```

```csharp
public class SegmentTree {
    private int n;
    private int[] tree;

    public SegmentTree(int N) {
        n = N;
        while ((n & (n - 1)) != 0) n++;
        tree = new int[2 * n];
    }

    public void Update(int i, int val) {
        int pos = n + i;
        tree[pos] = Math.Max(tree[pos], val);
        pos >>= 1;
        while (pos >= 1) {
            tree[pos] = Math.Max(tree[pos << 1], tree[(pos << 1) | 1]);
            pos >>= 1;
        }
    }

    public int Query(int l, int r) {
        int res = 0;
        l += n; r += n + 1;
        while (l < r) {
            if ((l & 1) == 1) res = Math.Max(res, tree[l++]);
            if ((r & 1) == 1) res = Math.Max(res, tree[--r]);
            l >>= 1; r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int BestTeamScore(int[] scores, int[] ages) {
        int n = scores.Length;
        int[][] pairs = new int[n][];
        for (int i = 0; i < n; i++) {
            pairs[i] = new int[] { scores[i], ages[i] };
        }
        Array.Sort(pairs, (a, b) => a[0] == b[0] ? a[1].CompareTo(b[1]) : a[0].CompareTo(b[0]));

        var uniqueAges = pairs.Select(p => p[1]).Distinct().OrderBy(x => x).ToList();
        var ageId = new Dictionary<int, int>();
        for (int i = 0; i < uniqueAges.Count; i++) {
            ageId[uniqueAges[i]] = i;
        }

        var segtree = new SegmentTree(uniqueAges.Count);
        int res = 0;

        for (int i = 0; i < n; i++) {
            int mScore = pairs[i][0], mAge = pairs[i][1];
            int idx = ageId[mAge];
            int j = segtree.Query(0, idx);
            int dp = j + mScore;
            segtree.Update(idx, dp);
            res = Math.Max(res, dp);
        }

        return res;
    }
}
```

```go
type SegmentTree struct {
    n    int
    tree []int
}

func NewSegmentTree(N int) *SegmentTree {
    n := N
    for n&(n-1) != 0 {
        n++
    }
    return &SegmentTree{n: n, tree: make([]int, 2*n)}
}

func (st *SegmentTree) Update(i, val int) {
    pos := st.n + i
    if val > st.tree[pos] {
        st.tree[pos] = val
    }
    pos >>= 1
    for pos >= 1 {
        st.tree[pos] = max(st.tree[pos<<1], st.tree[pos<<1|1])
        pos >>= 1
    }
}

func (st *SegmentTree) Query(l, r int) int {
    res := 0
    l += st.n
    r += st.n + 1
    for l < r {
        if l&1 == 1 {
            if st.tree[l] > res {
                res = st.tree[l]
            }
            l++
        }
        if r&1 == 1 {
            r--
            if st.tree[r] > res {
                res = st.tree[r]
            }
        }
        l >>= 1
        r >>= 1
    }
    return res
}

func bestTeamScore(scores []int, ages []int) int {
    n := len(scores)
    pairs := make([][2]int, n)
    for i := 0; i < n; i++ {
        pairs[i] = [2]int{scores[i], ages[i]}
    }
    sort.Slice(pairs, func(i, j int) bool {
        if pairs[i][0] == pairs[j][0] {
            return pairs[i][1] < pairs[j][1]
        }
        return pairs[i][0] < pairs[j][0]
    })

    ageSet := make(map[int]struct{})
    for _, p := range pairs {
        ageSet[p[1]] = struct{}{}
    }
    uniqueAges := make([]int, 0, len(ageSet))
    for age := range ageSet {
        uniqueAges = append(uniqueAges, age)
    }
    sort.Ints(uniqueAges)
    ageId := make(map[int]int)
    for i, age := range uniqueAges {
        ageId[age] = i
    }

    segtree := NewSegmentTree(len(uniqueAges))
    res := 0

    for i := 0; i < n; i++ {
        mScore, mAge := pairs[i][0], pairs[i][1]
        idx := ageId[mAge]
        j := segtree.Query(0, idx)
        dp := j + mScore
        segtree.Update(idx, dp)
        if dp > res {
            res = dp
        }
    }

    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class SegmentTree(N: Int) {
    private var n: Int = N
    private var tree: IntArray

    init {
        while (n and (n - 1) != 0) n++
        tree = IntArray(2 * n)
    }

    fun update(i: Int, value: Int) {
        var pos = n + i
        tree[pos] = maxOf(tree[pos], value)
        pos = pos shr 1
        while (pos >= 1) {
            tree[pos] = maxOf(tree[pos shl 1], tree[pos shl 1 or 1])
            pos = pos shr 1
        }
    }

    fun query(l: Int, r: Int): Int {
        var left = l + n
        var right = r + n + 1
        var res = 0
        while (left < right) {
            if (left and 1 == 1) res = maxOf(res, tree[left++])
            if (right and 1 == 1) res = maxOf(res, tree[--right])
            left = left shr 1
            right = right shr 1
        }
        return res
    }
}

class Solution {
    fun bestTeamScore(scores: IntArray, ages: IntArray): Int {
        val n = scores.size
        val pairs = Array(n) { intArrayOf(scores[it], ages[it]) }
        pairs.sortWith(compareBy({ it[0] }, { it[1] }))

        val uniqueAges = pairs.map { it[1] }.distinct().sorted()
        val ageId = uniqueAges.withIndex().associate { it.value to it.index }

        val segtree = SegmentTree(uniqueAges.size)
        var res = 0

        for (i in 0 until n) {
            val mScore = pairs[i][0]
            val mAge = pairs[i][1]
            val idx = ageId[mAge]!!
            val j = segtree.query(0, idx)
            val dp = j + mScore
            segtree.update(idx, dp)
            res = maxOf(res, dp)
        }

        return res
    }
}
```

```swift
class SegmentTree {
    private var n: Int
    private var tree: [Int]

    init(_ N: Int) {
        n = N
        while n & (n - 1) != 0 { n += 1 }
        tree = [Int](repeating: 0, count: 2 * n)
    }

    func update(_ i: Int, _ val: Int) {
        var pos = n + i
        tree[pos] = max(tree[pos], val)
        pos >>= 1
        while pos >= 1 {
            tree[pos] = max(tree[pos << 1], tree[pos << 1 | 1])
            pos >>= 1
        }
    }

    func query(_ l: Int, _ r: Int) -> Int {
        var res = 0
        var left = l + n
        var right = r + n + 1
        while left < right {
            if left & 1 == 1 {
                res = max(res, tree[left])
                left += 1
            }
            if right & 1 == 1 {
                right -= 1
                res = max(res, tree[right])
            }
            left >>= 1
            right >>= 1
        }
        return res
    }
}

class Solution {
    func bestTeamScore(_ scores: [Int], _ ages: [Int]) -> Int {
        let n = scores.count
        var pairs = (0..<n).map { [scores[$0], ages[$0]] }
        pairs.sort { $0[0] == $1[0] ? $0[1] < $1[1] : $0[0] < $1[0] }

        let uniqueAges = Array(Set(pairs.map { $0[1] })).sorted()
        var ageId = [Int: Int]()
        for (i, age) in uniqueAges.enumerated() {
            ageId[age] = i
        }

        let segtree = SegmentTree(uniqueAges.count)
        var res = 0

        for i in 0..<n {
            let mScore = pairs[i][0]
            let mAge = pairs[i][1]
            let idx = ageId[mAge]!
            let j = segtree.query(0, idx)
            let dp = j + mScore
            segtree.update(idx, dp)
            res = max(res, dp)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
