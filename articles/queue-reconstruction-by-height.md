## 1. Brute Force

::tabs-start

```python
class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        n = len(people)
        mp = defaultdict(list)

        for p in people:
            mp[p[1]].append(p[0])
        for key in mp:
            mp[key].sort(reverse=True)

        res = []
        for i in range(n):
            mini = -1
            for k in mp:
                if k > i:
                    continue
                cnt = 0
                j = len(res) - 1
                while j >= 0:
                    if res[j][0] >= mp[k][-1]:
                        cnt += 1
                    j -= 1
                if cnt == k and (mini == -1 or mp[k][-1] < mp[mini][-1]):
                    mini = k

            res.append([mp[mini].pop(), mini])
            if not mp[mini]:
                mp.pop(mini)
        return res
```

```java
public class Solution {
    public int[][] reconstructQueue(int[][] people) {
        int n = people.length;
        Map<Integer, List<Integer>> mp = new HashMap<>();

        for (int[] p : people) {
            mp.computeIfAbsent(p[1], k -> new ArrayList<>()).add(p[0]);
        }
        for (int key : mp.keySet()) {
            Collections.sort(mp.get(key), Collections.reverseOrder());
        }

        List<int[]> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int mini = -1;
            for (int k : mp.keySet()) {
                if (k > i) continue;

                int cnt = 0;
                for (int j = res.size() - 1; j >= 0; j--) {
                    if (res.get(j)[0] >= mp.get(k).get(mp.get(k).size() - 1)) {
                        cnt++;
                    }
                }

                if (cnt == k && (mini == -1 || mp.get(k).get(mp.get(k).size() - 1) <
                    mp.get(mini).get(mp.get(mini).size() - 1))) {
                    mini = k;
                }
            }

            List<Integer> list = mp.get(mini);
            res.add(new int[]{list.get(list.size() - 1), mini});
            list.remove(list.size() - 1);
            if (list.isEmpty()) {
                mp.remove(mini);
            }
        }

        return res.toArray(new int[n][2]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        int n = people.size();
        unordered_map<int, vector<int>> mp;

        for (const auto& p : people) {
            mp[p[1]].push_back(p[0]);
        }
        for (auto& pair : mp) {
            sort(pair.second.rbegin(), pair.second.rend());
        }

        vector<vector<int>> res;
        for (int i = 0; i < n; i++) {
            int mini = -1;
            for (const auto& pair : mp) {
                int k = pair.first;
                if (k > i) continue;

                int cnt = 0;
                for (int j = res.size() - 1; j >= 0; j--) {
                    if (res[j][0] >= mp[k].back()) {
                        cnt++;
                    }
                }

                if (cnt == k && (mini == -1 || mp[k].back() < mp[mini].back())) {
                    mini = k;
                }
            }

            res.push_back({mp[mini].back(), mini});
            mp[mini].pop_back();
            if (mp[mini].empty()) {
                mp.erase(mini);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} people
     * @return {number[][]}
     */
    reconstructQueue(people) {
        const n = people.length;
        const mp = new Map();

        for (const [h, k] of people) {
            if (!mp.has(k)) mp.set(k, []);
            mp.get(k).push(h);
        }
        for (const [k, heights] of mp) {
            heights.sort((a, b) => b - a);
        }

        const res = [];
        for (let i = 0; i < n; i++) {
            let mini = -1;
            for (const [k, heights] of mp) {
                if (k > i) continue;

                let cnt = 0;
                for (let j = res.length - 1; j >= 0; j--) {
                    if (res[j][0] >= heights[heights.length - 1]) cnt++;
                }

                if (
                    cnt === k &&
                    (mini === -1 ||
                        heights[heights.length - 1] <
                            mp.get(mini)[mp.get(mini).length - 1])
                ) {
                    mini = k;
                }
            }

            res.push([mp.get(mini).pop(), mini]);
            if (mp.get(mini).length === 0) {
                mp.delete(mini);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + n ^ 3)$
- Space complexity: $O(n)$

---

## 2. Sorting by Height in Descending Order

::tabs-start

```python
class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        res = []
        people.sort(key=lambda x: (-x[0], x[1]))
        for p in people:
            res.insert(p[1], p)
        return res
```

```java
public class Solution {
    public int[][] reconstructQueue(int[][] people) {
        Arrays.sort(people, (a, b) -> a[0] == b[0] ? a[1] - b[1] : b[0] - a[0]);
        List<int[]> res = new ArrayList<>();
        for (int[] person : people) {
            res.add(person[1], person);
        }
        return res.toArray(new int[res.size()][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        sort(people.begin(), people.end(), [](auto& a, auto& b) {
            return a[0] == b[0] ? a[1] < b[1] : a[0] > b[0];
        });

        list<vector<int>> res;
        for (const auto& p : people) {
            auto it = res.begin();
            advance(it, p[1]);
            res.insert(it, p);
        }

        return vector<vector<int>>(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} people
     * @return {number[][]}
     */
    reconstructQueue(people) {
        people.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]));
        const res = [];
        for (const [h, k] of people) {
            res.splice(k, 0, [h, k]);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n + n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Sorting by Height in Ascending Order

::tabs-start

```python
class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        n = len(people)
        people.sort(key=lambda x: (x[0], -x[1]))
        res = [[] for _ in range(n)]

        for p in people:
            cnt = i = 0
            while i < n:
                if not res[i]:
                    if cnt == p[1]:
                        break
                    cnt += 1
                i += 1
            res[i] = p

        return res
```

```java
public class Solution {
    public int[][] reconstructQueue(int[][] people) {
        int n = people.length;
        Arrays.sort(people, (a, b) -> a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);
        int[][] res = new int[n][2];
        boolean[] used = new boolean[n];

        for (int[] p : people) {
            int cnt = 0, i = 0;
            while (i < n) {
                if (!used[i]) {
                    if (cnt == p[1]) break;
                    cnt++;
                }
                i++;
            }
            used[i] = true;
            res[i] = p;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        sort(people.begin(), people.end(), [](auto& a, auto& b) {
            return a[0] == b[0] ? a[1] > b[1] : a[0] < b[0];
        });

        vector<vector<int>> res(people.size(), vector<int>());
        for (const auto& p : people) {
            int cnt = 0, i = 0;
            while (i < people.size()) {
                if (res[i].empty()) {
                    if (cnt == p[1]) break;
                    cnt++;
                }
                i++;
            }
            res[i] = p;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} people
     * @return {number[][]}
     */
    reconstructQueue(people) {
        people.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
        const res = Array(people.length).fill(null);

        for (const p of people) {
            let cnt = 0,
                i = 0;

            while (i < people.length) {
                if (res[i] === null) {
                    if (cnt === p[1]) break;
                    cnt++;
                }
                i++;
            }
            res[i] = p;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n + n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Binary Search + Segment Tree

::tabs-start

```python
class SegmentTree:
    def __init__(self, N):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.build(N)

    def build(self, N):
        self.tree = [0] * (2 * self.n)
        for i in range(N):
            self.tree[self.n + i] = 1
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[i << 1] + self.tree[i << 1 | 1]

    def update(self, i, val):
        self.tree[self.n + i] = val
        j = (self.n + i) >> 1
        while j >= 1:
            self.tree[j] = self.tree[j << 1] + self.tree[j << 1 | 1]
            j >>= 1

    def query(self, l, r):
        res = 0
        l += self.n
        r += self.n + 1
        while l < r:
            if l & 1:
                res += self.tree[l]
                l += 1
            if r & 1:
                r -= 1
                res += self.tree[r]
            l >>= 1
            r >>= 1
        return res

class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        n = len(people)
        people.sort(key=lambda x: (x[0], -x[1]))
        res = [[] for _ in range(n)]

        segTree = SegmentTree(n)
        for p in people:
            l, r = 0, n - 1
            idx = 0
            while l <= r:
                mid = (l + r) >> 1
                cnt = segTree.query(0, mid)
                if cnt > p[1]:
                    idx = mid
                    r = mid - 1
                else:
                    l = mid + 1

            res[idx] = p
            segTree.update(idx, 0)

        return res
```

```java
class SegmentTree {
    int n;
    int[] tree;

    SegmentTree(int N) {
        this.n = N;
        while (Integer.bitCount(n) != 1) {
            n++;
        }
        build(N);
    }

    void build(int N) {
        tree = new int[2 * n];
        for (int i = 0; i < N; i++) {
            tree[n + i] = 1;
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = tree[i << 1] + tree[i << 1 | 1];
        }
    }

    void update(int i, int val) {
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = tree[j << 1] + tree[j << 1 | 1];
        }
    }

    int query(int l, int r) {
        int res = 0;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
            if ((l & 1) == 1) res += tree[l++];
            if ((r & 1) == 1) res += tree[--r];
        }
        return res;
    }
}

public class Solution {
    public int[][] reconstructQueue(int[][] people) {
        int n = people.length;
        Arrays.sort(people, (a, b) -> a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);
        int[][] res = new int[n][2];

        SegmentTree segTree = new SegmentTree(n);
        for (int[] p : people) {
            int l = 0, r = n - 1, idx = 0;
            while (l <= r) {
                int mid = (l + r) >> 1;
                int cnt = segTree.query(0, mid);
                if (cnt > p[1]) {
                    idx = mid;
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }

            res[idx] = p;
            segTree.update(idx, 0);
        }

        return res;
    }
}
```

```cpp
class SegmentTree {
public:
    int n;
    vector<int> tree;

    SegmentTree(int N) {
        this->n = N;
        while (__builtin_popcount(n) != 1) {
            n++;
        }
        build(N);
    }

    void build(int N) {
        tree.resize(2 * n);
        for (int i = 0; i < N; i++) {
            tree[n + i] = 1;
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = tree[i << 1] + tree[i << 1 | 1];
        }
    }

    void update(int i, int val) {
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = tree[j << 1] + tree[j << 1 | 1];
        }
    }

    int query(int l, int r) {
        int res = 0;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
            if (l & 1) res += tree[l++];
            if (r & 1) res += tree[--r];
        }
        return res;
    }
};

class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        int n = people.size();
        sort(people.begin(), people.end(), [](auto& a, auto& b) {
            return a[0] == b[0] ? a[1] > b[1] : a[0] < b[0];
        });
        vector<vector<int>> res(n, vector<int>());

        SegmentTree segTree(n);
        for (const auto& p : people) {
            int l = 0, r = n - 1, idx = 0;
            while (l <= r) {
                int mid = (l + r) >> 1;
                int cnt = segTree.query(0, mid);
                if (cnt > p[1]) {
                    idx = mid;
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }

            res[idx] = p;
            segTree.update(idx, 0);
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
        this.build(N);
    }

    /**
     * @param {number} N
     * @return {void}
     */
    build(N) {
        this.tree = new Int32Array(2 * this.n);
        for (let i = 0; i < N; i++) {
            this.tree[this.n + i] = 1;
        }
        for (let i = this.n - 1; i > 0; i--) {
            this.tree[i] = this.tree[i << 1] + this.tree[(i << 1) | 1];
        }
    }

    /**
     * @param {number} i
     * @param {number} val
     * @return {void}
     */
    update(i, val) {
        this.tree[this.n + i] = val;
        for (let j = (this.n + i) >> 1; j >= 1; j >>= 1) {
            this.tree[j] = this.tree[j << 1] + this.tree[(j << 1) | 1];
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
            if (l & 1) res += this.tree[l++];
            if (r & 1) res += this.tree[--r];
            l >>= 1;
            r >>= 1;
        }

        return res;
    }
}

class Solution {
    /**
     * @param {number[][]} people
     * @return {number[][]}
     */
    reconstructQueue(people) {
        const n = people.length;
        people.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
        const res = Array(n).fill(null);

        const segTree = new SegmentTree(n);
        for (const p of people) {
            let l = 0,
                r = n - 1,
                idx = 0;
            while (l <= r) {
                let mid = (l + r) >> 1;
                let cnt = segTree.query(0, mid);
                if (cnt > p[1]) {
                    idx = mid;
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }

            res[idx] = p;
            segTree.update(idx, 0);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log ^ 2 n)$
- Space complexity: $O(n)$

---

## 5. Binary Search + Binary Indexed Tree (Fenwick Tree)

::tabs-start

```python
class BIT:
    def __init__(self, N):
        self.n = N + 1
        self.tree = [0] * self.n
        for i in range(self.n - 1):
            self.update(i, 1)

    def update(self, index, val):
        index += 1
        while index < self.n:
            self.tree[index] += val
            index += index & -index

    def prefix_sum(self, index):
        total_sum = 0
        while index > 0:
            total_sum += self.tree[index]
            index -= index & -index
        return total_sum

    def query(self, left, right):
        return self.prefix_sum(right + 1) - self.prefix_sum(left)

class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        n = len(people)
        people.sort(key=lambda x: (x[0], -x[1]))
        res = [[] for _ in range(n)]

        bit = BIT(n)
        for p in people:
            l, r = 0, n - 1
            idx = 0
            while l <= r:
                mid = (l + r) >> 1
                cnt = bit.query(0, mid)
                if cnt > p[1]:
                    idx = mid
                    r = mid - 1
                else:
                    l = mid + 1

            res[idx] = p
            bit.update(idx, -1)

        return res
```

```java
class BIT {
    private int[] tree;
    private int n;

    public BIT(int N) {
        this.n = N + 1;
        this.tree = new int[n];
        for (int i = 0; i < n - 1; i++) {
            update(i, 1);
        }
    }

    public void update(int index, int val) {
        index++;
        while (index < n) {
            tree[index] += val;
            index += index & -index;
        }
    }

    public int prefixSum(int index) {
        int totalSum = 0;
        while (index > 0) {
            totalSum += tree[index];
            index -= index & -index;
        }
        return totalSum;
    }

    public int query(int left, int right) {
        return prefixSum(right + 1) - prefixSum(left);
    }
}

public class Solution {
    public int[][] reconstructQueue(int[][] people) {
        int n = people.length;
        Arrays.sort(people, (a, b) -> a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);
        int[][] res = new int[n][2];

        BIT bit = new BIT(n);
        for (int[] p : people) {
            int l = 0, r = n - 1, idx = 0;
            while (l <= r) {
                int mid = (l + r) >> 1;
                int cnt = bit.query(0, mid);
                if (cnt > p[1]) {
                    idx = mid;
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }

            res[idx] = p;
            bit.update(idx, -1);
        }

        return res;
    }
}
```

```cpp
class BIT {
    vector<int> tree;
    int n;

public:
    BIT(int N) {
        n = N + 1;
        tree.resize(n, 0);
        for (int i = 0; i < n - 1; i++) {
            update(i, 1);
        }
    }

    void update(int index, int val) {
        index++;
        while (index < n) {
            tree[index] += val;
            index += index & -index;
        }
    }

    int prefixSum(int index) {
        int totalSum = 0;
        while (index > 0) {
            totalSum += tree[index];
            index -= index & -index;
        }
        return totalSum;
    }

    int query(int left, int right) {
        return prefixSum(right + 1) - prefixSum(left);
    }
};

class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        int n = people.size();
        sort(people.begin(), people.end(), [](auto& a, auto& b) {
            return a[0] == b[0] ? a[1] > b[1] : a[0] < b[0];
        });
        vector<vector<int>> res(n, vector<int>());

        BIT bit(n);
        for (const auto& p : people) {
            int l = 0, r = n - 1, idx = 0;
            while (l <= r) {
                int mid = (l + r) >> 1;
                int cnt = bit.query(0, mid);
                if (cnt > p[1]) {
                    idx = mid;
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }

            res[idx] = p;
            bit.update(idx, -1);
        }

        return res;
    }
};
```

```javascript
class BIT {
    /**
     * @constructor
     * @param {number} N
     */
    constructor(N) {
        this.n = N + 1;
        this.tree = new Int32Array(this.n);
        for (let i = 0; i < this.n - 1; i++) {
            this.update(i, 1);
        }
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        index++;
        while (index < this.n) {
            this.tree[index] += val;
            index += index & -index;
        }
    }

    /**
     * @param {number} index
     * @return {number}
     */
    prefixSum(index) {
        let totalSum = 0;
        while (index > 0) {
            totalSum += this.tree[index];
            index -= index & -index;
        }
        return totalSum;
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    query(left, right) {
        return this.prefixSum(right + 1) - this.prefixSum(left);
    }
}

class Solution {
    /**
     * @param {number[][]} people
     * @return {number[][]}
     */
    reconstructQueue(people) {
        const n = people.length;
        people.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
        const res = Array(n).fill(null);

        const bit = new BIT(n);
        for (const p of people) {
            let l = 0,
                r = n - 1,
                idx = 0;
            while (l <= r) {
                let mid = (l + r) >> 1;
                let cnt = bit.query(0, mid);
                if (cnt > p[1]) {
                    idx = mid;
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }

            res[idx] = p;
            bit.update(idx, -1);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log ^ 2 n)$
- Space complexity: $O(n)$

---

## 6. Binary Indexed Tree (Fenwick Tree)

::tabs-start

```python
class BIT:
    def __init__(self, N):
        self.n = N + 1
        self.tree = [0] * self.n
        for i in range(self.n - 1):
            self.update(i, 1)

    def update(self, index, val):
        index += 1
        while index < self.n:
            self.tree[index] += val
            index += index & -index

    def getIdx(self, cnt, MSB):
        idx = 0
        while MSB:
            nxtIdx = idx + MSB
            if nxtIdx < self.n and cnt >= self.tree[nxtIdx]:
                idx = nxtIdx
                cnt -= self.tree[nxtIdx]
            MSB >>= 1
        return idx

class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        n = len(people)
        people.sort(key=lambda x: (x[0], -x[1]))
        res = [[] for _ in range(n)]

        bit = BIT(n)
        MSB = 1 << int(math.log(n, 2))
        for p in people:
            idx = bit.getIdx(p[1], MSB)
            res[idx] = p
            bit.update(idx, -1)

        return res
```

```java
class BIT {
    private int[] tree;
    private int n;

    public BIT(int N) {
        this.n = N + 1;
        this.tree = new int[n];
        for (int i = 0; i < n - 1; i++) {
            update(i, 1);
        }
    }

    public void update(int index, int val) {
        index++;
        while (index < n) {
            tree[index] += val;
            index += index & -index;
        }
    }

    public int getIdx(int cnt, int MSB) {
        int idx = 0;
        while (MSB != 0) {
            int nxtIdx = idx + MSB;
            if (nxtIdx < n && cnt >= tree[nxtIdx]) {
                idx = nxtIdx;
                cnt -= tree[nxtIdx];
            }
            MSB >>= 1;
        }
        return idx;
    }
}

public class Solution {
    public int[][] reconstructQueue(int[][] people) {
        int n = people.length;
        Arrays.sort(people, (a, b) -> a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);
        int[][] res = new int[n][2];

        BIT bit = new BIT(n);
        int MSB = 1 << (31 - Integer.numberOfLeadingZeros(n));
        for (int[] p : people) {
            int idx = bit.getIdx(p[1], MSB);
            res[idx] = p;
            bit.update(idx, -1);
        }

        return res;
    }
}
```

```cpp
class BIT {
    vector<int> tree;
    int n;

public:
    BIT(int N) {
        n = N + 1;
        tree.resize(n, 0);
        for (int i = 0; i < n - 1; i++) {
            update(i, 1);
        }
    }

    void update(int index, int val) {
        index++;
        while (index < n) {
            tree[index] += val;
            index += index & -index;
        }
    }

    int getIdx(int cnt, int MSB) {
        int idx = 0;
        while (MSB != 0) {
            int nxtIdx = idx + MSB;
            if (nxtIdx < n && cnt >= tree[nxtIdx]) {
                idx = nxtIdx;
                cnt -= tree[nxtIdx];
            }
            MSB >>= 1;
        }
        return idx;
    }
};

class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        int n = people.size();
        sort(people.begin(), people.end(), [](auto& a, auto& b) {
            return a[0] == b[0] ? a[1] > b[1] : a[0] < b[0];
        });
        vector<vector<int>> res(n, vector<int>());

        BIT bit(n);
        int MSB = 1 << (31 - __builtin_clz(n));
        for (const auto& p : people) {
            int idx = bit.getIdx(p[1], MSB);
            res[idx] = p;
            bit.update(idx, -1);
        }

        return res;
    }
};
```

```javascript
class BIT {
    /**
     * @constructor
     * @param {number} N
     */
    constructor(N) {
        this.n = N + 1;
        this.tree = new Int32Array(this.n);
        for (let i = 0; i < this.n - 1; i++) {
            this.update(i, 1);
        }
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        index++;
        while (index < this.n) {
            this.tree[index] += val;
            index += index & -index;
        }
    }

    /**
     * @param {number} cnt
     * @param {number} MSB
     * @return {number}
     */
    getIdx(cnt, MSB) {
        let idx = 0;
        while (MSB != 0) {
            let nxtIdx = idx + MSB;
            if (nxtIdx < this.n && cnt >= this.tree[nxtIdx]) {
                idx = nxtIdx;
                cnt -= this.tree[nxtIdx];
            }
            MSB >>= 1;
        }
        return idx;
    }
}

class Solution {
    /**
     * @param {number[][]} people
     * @return {number[][]}
     */
    reconstructQueue(people) {
        const n = people.length;
        people.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
        const res = Array(n).fill(null);

        const bit = new BIT(n);
        const MSB = 1 << Math.floor(Math.log2(n));
        for (const p of people) {
            let idx = bit.getIdx(p[1], MSB);
            res[idx] = p;
            bit.update(idx, -1);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n)$
- Space complexity: $O(n)$
