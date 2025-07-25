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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
