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

```csharp
public class Solution {
    public int[][] ReconstructQueue(int[][] people) {
        int n = people.Length;
        var mp = new Dictionary<int, List<int>>();

        foreach (var p in people) {
            if (!mp.ContainsKey(p[1])) mp[p[1]] = new List<int>();
            mp[p[1]].Add(p[0]);
        }
        foreach (var key in mp.Keys.ToList()) {
            mp[key].Sort((a, b) => b.CompareTo(a));
        }

        var res = new List<int[]>();
        for (int i = 0; i < n; i++) {
            int mini = -1;
            foreach (var k in mp.Keys) {
                if (k > i) continue;

                int cnt = 0;
                for (int j = res.Count - 1; j >= 0; j--) {
                    if (res[j][0] >= mp[k][mp[k].Count - 1]) cnt++;
                }

                if (cnt == k && (mini == -1 || mp[k][mp[k].Count - 1] < mp[mini][mp[mini].Count - 1])) {
                    mini = k;
                }
            }

            res.Add(new int[] { mp[mini][mp[mini].Count - 1], mini });
            mp[mini].RemoveAt(mp[mini].Count - 1);
            if (mp[mini].Count == 0) {
                mp.Remove(mini);
            }
        }

        return res.ToArray();
    }
}
```

```go
func reconstructQueue(people [][]int) [][]int {
    n := len(people)
    mp := make(map[int][]int)

    for _, p := range people {
        mp[p[1]] = append(mp[p[1]], p[0])
    }
    for k := range mp {
        sort.Sort(sort.Reverse(sort.IntSlice(mp[k])))
    }

    res := [][]int{}
    for i := 0; i < n; i++ {
        mini := -1
        for k := range mp {
            if k > i {
                continue
            }

            cnt := 0
            for j := len(res) - 1; j >= 0; j-- {
                if res[j][0] >= mp[k][len(mp[k])-1] {
                    cnt++
                }
            }

            if cnt == k && (mini == -1 || mp[k][len(mp[k])-1] < mp[mini][len(mp[mini])-1]) {
                mini = k
            }
        }

        res = append(res, []int{mp[mini][len(mp[mini])-1], mini})
        mp[mini] = mp[mini][:len(mp[mini])-1]
        if len(mp[mini]) == 0 {
            delete(mp, mini)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun reconstructQueue(people: Array<IntArray>): Array<IntArray> {
        val n = people.size
        val mp = mutableMapOf<Int, MutableList<Int>>()

        for (p in people) {
            mp.getOrPut(p[1]) { mutableListOf() }.add(p[0])
        }
        for (key in mp.keys) {
            mp[key]!!.sortDescending()
        }

        val res = mutableListOf<IntArray>()
        for (i in 0 until n) {
            var mini = -1
            for (k in mp.keys) {
                if (k > i) continue

                var cnt = 0
                for (j in res.indices.reversed()) {
                    if (res[j][0] >= mp[k]!!.last()) cnt++
                }

                if (cnt == k && (mini == -1 || mp[k]!!.last() < mp[mini]!!.last())) {
                    mini = k
                }
            }

            res.add(intArrayOf(mp[mini]!!.removeLast(), mini))
            if (mp[mini]!!.isEmpty()) {
                mp.remove(mini)
            }
        }

        return res.toTypedArray()
    }
}
```

```swift
class Solution {
    func reconstructQueue(_ people: [[Int]]) -> [[Int]] {
        let n = people.count
        var mp = [Int: [Int]]()

        for p in people {
            mp[p[1], default: []].append(p[0])
        }
        for key in mp.keys {
            mp[key]!.sort(by: >)
        }

        var res = [[Int]]()
        for i in 0..<n {
            var mini = -1
            for k in mp.keys {
                if k > i { continue }

                var cnt = 0
                for j in stride(from: res.count - 1, through: 0, by: -1) {
                    if res[j][0] >= mp[k]!.last! {
                        cnt += 1
                    }
                }

                if cnt == k && (mini == -1 || mp[k]!.last! < mp[mini]!.last!) {
                    mini = k
                }
            }

            res.append([mp[mini]!.removeLast(), mini])
            if mp[mini]!.isEmpty {
                mp.removeValue(forKey: mini)
            }
        }

        return res
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

```csharp
public class Solution {
    public int[][] ReconstructQueue(int[][] people) {
        Array.Sort(people, (a, b) => a[0] == b[0] ? a[1] - b[1] : b[0] - a[0]);
        var res = new List<int[]>();
        foreach (var person in people) {
            res.Insert(person[1], person);
        }
        return res.ToArray();
    }
}
```

```go
func reconstructQueue(people [][]int) [][]int {
    sort.Slice(people, func(i, j int) bool {
        if people[i][0] == people[j][0] {
            return people[i][1] < people[j][1]
        }
        return people[i][0] > people[j][0]
    })

    res := [][]int{}
    for _, p := range people {
        res = append(res[:p[1]], append([][]int{p}, res[p[1]:]...)...)
    }
    return res
}
```

```kotlin
class Solution {
    fun reconstructQueue(people: Array<IntArray>): Array<IntArray> {
        people.sortWith(compareBy({ -it[0] }, { it[1] }))
        val res = mutableListOf<IntArray>()
        for (person in people) {
            res.add(person[1], person)
        }
        return res.toTypedArray()
    }
}
```

```swift
class Solution {
    func reconstructQueue(_ people: [[Int]]) -> [[Int]] {
        var people = people.sorted {
            $0[0] == $1[0] ? $0[1] < $1[1] : $0[0] > $1[0]
        }
        var res = [[Int]]()
        for p in people {
            res.insert(p, at: p[1])
        }
        return res
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

```csharp
public class Solution {
    public int[][] ReconstructQueue(int[][] people) {
        int n = people.Length;
        Array.Sort(people, (a, b) => a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);
        int[][] res = new int[n][];

        foreach (var p in people) {
            int cnt = 0, i = 0;
            while (i < n) {
                if (res[i] == null) {
                    if (cnt == p[1]) break;
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

```go
func reconstructQueue(people [][]int) [][]int {
    n := len(people)
    sort.Slice(people, func(i, j int) bool {
        if people[i][0] == people[j][0] {
            return people[i][1] > people[j][1]
        }
        return people[i][0] < people[j][0]
    })

    res := make([][]int, n)
    for _, p := range people {
        cnt, i := 0, 0
        for i < n {
            if res[i] == nil {
                if cnt == p[1] {
                    break
                }
                cnt++
            }
            i++
        }
        res[i] = p
    }

    return res
}
```

```kotlin
class Solution {
    fun reconstructQueue(people: Array<IntArray>): Array<IntArray> {
        val n = people.size
        people.sortWith(compareBy({ it[0] }, { -it[1] }))
        val res = arrayOfNulls<IntArray>(n)

        for (p in people) {
            var cnt = 0
            var i = 0
            while (i < n) {
                if (res[i] == null) {
                    if (cnt == p[1]) break
                    cnt++
                }
                i++
            }
            res[i] = p
        }

        return res.requireNoNulls()
    }
}
```

```swift
class Solution {
    func reconstructQueue(_ people: [[Int]]) -> [[Int]] {
        let n = people.count
        var people = people.sorted {
            $0[0] == $1[0] ? $0[1] > $1[1] : $0[0] < $1[0]
        }
        var res = [[Int]?](repeating: nil, count: n)

        for p in people {
            var cnt = 0, i = 0
            while i < n {
                if res[i] == nil {
                    if cnt == p[1] { break }
                    cnt += 1
                }
                i += 1
            }
            res[i] = p
        }

        return res.compactMap { $0 }
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

```csharp
public class SegmentTree {
    private int n;
    private int[] tree;

    public SegmentTree(int N) {
        n = N;
        while ((n & (n - 1)) != 0) n++;
        Build(N);
    }

    private void Build(int N) {
        tree = new int[2 * n];
        for (int i = 0; i < N; i++) {
            tree[n + i] = 1;
        }
        for (int i = n - 1; i > 0; i--) {
            tree[i] = tree[i << 1] + tree[(i << 1) | 1];
        }
    }

    public void Update(int i, int val) {
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = tree[j << 1] + tree[(j << 1) | 1];
        }
    }

    public int Query(int l, int r) {
        int res = 0;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
            if ((l & 1) == 1) res += tree[l++];
            if ((r & 1) == 1) res += tree[--r];
        }
        return res;
    }
}

public class Solution {
    public int[][] ReconstructQueue(int[][] people) {
        int n = people.Length;
        Array.Sort(people, (a, b) => a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);
        int[][] res = new int[n][];

        var segTree = new SegmentTree(n);
        foreach (var p in people) {
            int l = 0, r = n - 1, idx = 0;
            while (l <= r) {
                int mid = (l + r) >> 1;
                int cnt = segTree.Query(0, mid);
                if (cnt > p[1]) {
                    idx = mid;
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }

            res[idx] = p;
            segTree.Update(idx, 0);
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
    st := &SegmentTree{n: n, tree: make([]int, 2*n)}
    for i := 0; i < N; i++ {
        st.tree[n+i] = 1
    }
    for i := n - 1; i > 0; i-- {
        st.tree[i] = st.tree[i<<1] + st.tree[i<<1|1]
    }
    return st
}

func (st *SegmentTree) Update(i, val int) {
    st.tree[st.n+i] = val
    for j := (st.n + i) >> 1; j >= 1; j >>= 1 {
        st.tree[j] = st.tree[j<<1] + st.tree[j<<1|1]
    }
}

func (st *SegmentTree) Query(l, r int) int {
    res := 0
    for l, r = l+st.n, r+st.n+1; l < r; l, r = l>>1, r>>1 {
        if l&1 == 1 {
            res += st.tree[l]
            l++
        }
        if r&1 == 1 {
            r--
            res += st.tree[r]
        }
    }
    return res
}

func reconstructQueue(people [][]int) [][]int {
    n := len(people)
    sort.Slice(people, func(i, j int) bool {
        if people[i][0] == people[j][0] {
            return people[i][1] > people[j][1]
        }
        return people[i][0] < people[j][0]
    })

    res := make([][]int, n)
    segTree := NewSegmentTree(n)
    for _, p := range people {
        l, r, idx := 0, n-1, 0
        for l <= r {
            mid := (l + r) >> 1
            cnt := segTree.Query(0, mid)
            if cnt > p[1] {
                idx = mid
                r = mid - 1
            } else {
                l = mid + 1
            }
        }

        res[idx] = p
        segTree.Update(idx, 0)
    }

    return res
}
```

```kotlin
class SegmentTree(N: Int) {
    private var n: Int = N
    private lateinit var tree: IntArray

    init {
        while (n and (n - 1) != 0) n++
        build(N)
    }

    private fun build(N: Int) {
        tree = IntArray(2 * n)
        for (i in 0 until N) {
            tree[n + i] = 1
        }
        for (i in n - 1 downTo 1) {
            tree[i] = tree[i shl 1] + tree[i shl 1 or 1]
        }
    }

    fun update(i: Int, value: Int) {
        tree[n + i] = value
        var j = (n + i) shr 1
        while (j >= 1) {
            tree[j] = tree[j shl 1] + tree[j shl 1 or 1]
            j = j shr 1
        }
    }

    fun query(l: Int, r: Int): Int {
        var res = 0
        var left = l + n
        var right = r + n + 1
        while (left < right) {
            if (left and 1 == 1) res += tree[left++]
            if (right and 1 == 1) res += tree[--right]
            left = left shr 1
            right = right shr 1
        }
        return res
    }
}

class Solution {
    fun reconstructQueue(people: Array<IntArray>): Array<IntArray> {
        val n = people.size
        people.sortWith(compareBy({ it[0] }, { -it[1] }))
        val res = arrayOfNulls<IntArray>(n)

        val segTree = SegmentTree(n)
        for (p in people) {
            var l = 0
            var r = n - 1
            var idx = 0
            while (l <= r) {
                val mid = (l + r) shr 1
                val cnt = segTree.query(0, mid)
                if (cnt > p[1]) {
                    idx = mid
                    r = mid - 1
                } else {
                    l = mid + 1
                }
            }

            res[idx] = p
            segTree.update(idx, 0)
        }

        return res.requireNoNulls()
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
        for i in 0..<N {
            tree[n + i] = 1
        }
        for i in stride(from: n - 1, through: 1, by: -1) {
            tree[i] = tree[i << 1] + tree[i << 1 | 1]
        }
    }

    func update(_ i: Int, _ val: Int) {
        tree[n + i] = val
        var j = (n + i) >> 1
        while j >= 1 {
            tree[j] = tree[j << 1] + tree[j << 1 | 1]
            j >>= 1
        }
    }

    func query(_ l: Int, _ r: Int) -> Int {
        var res = 0
        var left = l + n
        var right = r + n + 1
        while left < right {
            if left & 1 == 1 {
                res += tree[left]
                left += 1
            }
            if right & 1 == 1 {
                right -= 1
                res += tree[right]
            }
            left >>= 1
            right >>= 1
        }
        return res
    }
}

class Solution {
    func reconstructQueue(_ people: [[Int]]) -> [[Int]] {
        let n = people.count
        var people = people.sorted {
            $0[0] == $1[0] ? $0[1] > $1[1] : $0[0] < $1[0]
        }
        var res = [[Int]?](repeating: nil, count: n)

        let segTree = SegmentTree(n)
        for p in people {
            var l = 0, r = n - 1, idx = 0
            while l <= r {
                let mid = (l + r) >> 1
                let cnt = segTree.query(0, mid)
                if cnt > p[1] {
                    idx = mid
                    r = mid - 1
                } else {
                    l = mid + 1
                }
            }

            res[idx] = p
            segTree.update(idx, 0)
        }

        return res.compactMap { $0 }
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

```csharp
public class BIT {
    private int[] tree;
    private int n;

    public BIT(int N) {
        n = N + 1;
        tree = new int[n];
        for (int i = 0; i < n - 1; i++) {
            Update(i, 1);
        }
    }

    public void Update(int index, int val) {
        index++;
        while (index < n) {
            tree[index] += val;
            index += index & -index;
        }
    }

    public int PrefixSum(int index) {
        int totalSum = 0;
        while (index > 0) {
            totalSum += tree[index];
            index -= index & -index;
        }
        return totalSum;
    }

    public int Query(int left, int right) {
        return PrefixSum(right + 1) - PrefixSum(left);
    }
}

public class Solution {
    public int[][] ReconstructQueue(int[][] people) {
        int n = people.Length;
        Array.Sort(people, (a, b) => a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);
        int[][] res = new int[n][];

        var bit = new BIT(n);
        foreach (var p in people) {
            int l = 0, r = n - 1, idx = 0;
            while (l <= r) {
                int mid = (l + r) >> 1;
                int cnt = bit.Query(0, mid);
                if (cnt > p[1]) {
                    idx = mid;
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }

            res[idx] = p;
            bit.Update(idx, -1);
        }

        return res;
    }
}
```

```go
type BIT struct {
    tree []int
    n    int
}

func NewBIT(N int) *BIT {
    n := N + 1
    bit := &BIT{tree: make([]int, n), n: n}
    for i := 0; i < n-1; i++ {
        bit.Update(i, 1)
    }
    return bit
}

func (bit *BIT) Update(index, val int) {
    index++
    for index < bit.n {
        bit.tree[index] += val
        index += index & -index
    }
}

func (bit *BIT) PrefixSum(index int) int {
    totalSum := 0
    for index > 0 {
        totalSum += bit.tree[index]
        index -= index & -index
    }
    return totalSum
}

func (bit *BIT) Query(left, right int) int {
    return bit.PrefixSum(right+1) - bit.PrefixSum(left)
}

func reconstructQueue(people [][]int) [][]int {
    n := len(people)
    sort.Slice(people, func(i, j int) bool {
        if people[i][0] == people[j][0] {
            return people[i][1] > people[j][1]
        }
        return people[i][0] < people[j][0]
    })

    res := make([][]int, n)
    bit := NewBIT(n)
    for _, p := range people {
        l, r, idx := 0, n-1, 0
        for l <= r {
            mid := (l + r) >> 1
            cnt := bit.Query(0, mid)
            if cnt > p[1] {
                idx = mid
                r = mid - 1
            } else {
                l = mid + 1
            }
        }

        res[idx] = p
        bit.Update(idx, -1)
    }

    return res
}
```

```kotlin
class BIT(N: Int) {
    private val tree: IntArray
    private val n: Int = N + 1

    init {
        tree = IntArray(n)
        for (i in 0 until n - 1) {
            update(i, 1)
        }
    }

    fun update(index: Int, value: Int) {
        var idx = index + 1
        while (idx < n) {
            tree[idx] += value
            idx += idx and -idx
        }
    }

    fun prefixSum(index: Int): Int {
        var totalSum = 0
        var idx = index
        while (idx > 0) {
            totalSum += tree[idx]
            idx -= idx and -idx
        }
        return totalSum
    }

    fun query(left: Int, right: Int): Int {
        return prefixSum(right + 1) - prefixSum(left)
    }
}

class Solution {
    fun reconstructQueue(people: Array<IntArray>): Array<IntArray> {
        val n = people.size
        people.sortWith(compareBy({ it[0] }, { -it[1] }))
        val res = arrayOfNulls<IntArray>(n)

        val bit = BIT(n)
        for (p in people) {
            var l = 0
            var r = n - 1
            var idx = 0
            while (l <= r) {
                val mid = (l + r) shr 1
                val cnt = bit.query(0, mid)
                if (cnt > p[1]) {
                    idx = mid
                    r = mid - 1
                } else {
                    l = mid + 1
                }
            }

            res[idx] = p
            bit.update(idx, -1)
        }

        return res.requireNoNulls()
    }
}
```

```swift
class BIT {
    private var tree: [Int]
    private var n: Int

    init(_ N: Int) {
        n = N + 1
        tree = [Int](repeating: 0, count: n)
        for i in 0..<(n - 1) {
            update(i, 1)
        }
    }

    func update(_ index: Int, _ val: Int) {
        var idx = index + 1
        while idx < n {
            tree[idx] += val
            idx += idx & -idx
        }
    }

    func prefixSum(_ index: Int) -> Int {
        var totalSum = 0
        var idx = index
        while idx > 0 {
            totalSum += tree[idx]
            idx -= idx & -idx
        }
        return totalSum
    }

    func query(_ left: Int, _ right: Int) -> Int {
        return prefixSum(right + 1) - prefixSum(left)
    }
}

class Solution {
    func reconstructQueue(_ people: [[Int]]) -> [[Int]] {
        let n = people.count
        var people = people.sorted {
            $0[0] == $1[0] ? $0[1] > $1[1] : $0[0] < $1[0]
        }
        var res = [[Int]?](repeating: nil, count: n)

        let bit = BIT(n)
        for p in people {
            var l = 0, r = n - 1, idx = 0
            while l <= r {
                let mid = (l + r) >> 1
                let cnt = bit.query(0, mid)
                if cnt > p[1] {
                    idx = mid
                    r = mid - 1
                } else {
                    l = mid + 1
                }
            }

            res[idx] = p
            bit.update(idx, -1)
        }

        return res.compactMap { $0 }
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

```csharp
public class BIT {
    private int[] tree;
    private int n;

    public BIT(int N) {
        n = N + 1;
        tree = new int[n];
        for (int i = 0; i < n - 1; i++) {
            Update(i, 1);
        }
    }

    public void Update(int index, int val) {
        index++;
        while (index < n) {
            tree[index] += val;
            index += index & -index;
        }
    }

    public int GetIdx(int cnt, int MSB) {
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
    public int[][] ReconstructQueue(int[][] people) {
        int n = people.Length;
        Array.Sort(people, (a, b) => a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);
        int[][] res = new int[n][];

        var bit = new BIT(n);
        int MSB = 1 << (31 - System.Numerics.BitOperations.LeadingZeroCount((uint)n));
        foreach (var p in people) {
            int idx = bit.GetIdx(p[1], MSB);
            res[idx] = p;
            bit.Update(idx, -1);
        }

        return res;
    }
}
```

```go
type BIT struct {
    tree []int
    n    int
}

func NewBIT(N int) *BIT {
    n := N + 1
    bit := &BIT{tree: make([]int, n), n: n}
    for i := 0; i < n-1; i++ {
        bit.Update(i, 1)
    }
    return bit
}

func (bit *BIT) Update(index, val int) {
    index++
    for index < bit.n {
        bit.tree[index] += val
        index += index & -index
    }
}

func (bit *BIT) GetIdx(cnt, MSB int) int {
    idx := 0
    for MSB != 0 {
        nxtIdx := idx + MSB
        if nxtIdx < bit.n && cnt >= bit.tree[nxtIdx] {
            idx = nxtIdx
            cnt -= bit.tree[nxtIdx]
        }
        MSB >>= 1
    }
    return idx
}

func reconstructQueue(people [][]int) [][]int {
    n := len(people)
    sort.Slice(people, func(i, j int) bool {
        if people[i][0] == people[j][0] {
            return people[i][1] > people[j][1]
        }
        return people[i][0] < people[j][0]
    })

    res := make([][]int, n)
    bit := NewBIT(n)
    MSB := 1 << (bits.Len(uint(n)) - 1)
    for _, p := range people {
        idx := bit.GetIdx(p[1], MSB)
        res[idx] = p
        bit.Update(idx, -1)
    }

    return res
}
```

```kotlin
class BIT(N: Int) {
    private val tree: IntArray
    private val n: Int = N + 1

    init {
        tree = IntArray(n)
        for (i in 0 until n - 1) {
            update(i, 1)
        }
    }

    fun update(index: Int, value: Int) {
        var idx = index + 1
        while (idx < n) {
            tree[idx] += value
            idx += idx and -idx
        }
    }

    fun getIdx(cnt: Int, msb: Int): Int {
        var count = cnt
        var idx = 0
        var bit = msb
        while (bit != 0) {
            val nxtIdx = idx + bit
            if (nxtIdx < n && count >= tree[nxtIdx]) {
                idx = nxtIdx
                count -= tree[nxtIdx]
            }
            bit = bit shr 1
        }
        return idx
    }
}

class Solution {
    fun reconstructQueue(people: Array<IntArray>): Array<IntArray> {
        val n = people.size
        people.sortWith(compareBy({ it[0] }, { -it[1] }))
        val res = arrayOfNulls<IntArray>(n)

        val bit = BIT(n)
        val msb = 1 shl (31 - Integer.numberOfLeadingZeros(n))
        for (p in people) {
            val idx = bit.getIdx(p[1], msb)
            res[idx] = p
            bit.update(idx, -1)
        }

        return res.requireNoNulls()
    }
}
```

```swift
class BIT {
    private var tree: [Int]
    private var n: Int

    init(_ N: Int) {
        n = N + 1
        tree = [Int](repeating: 0, count: n)
        for i in 0..<(n - 1) {
            update(i, 1)
        }
    }

    func update(_ index: Int, _ val: Int) {
        var idx = index + 1
        while idx < n {
            tree[idx] += val
            idx += idx & -idx
        }
    }

    func getIdx(_ cnt: Int, _ msb: Int) -> Int {
        var count = cnt
        var idx = 0
        var bit = msb
        while bit != 0 {
            let nxtIdx = idx + bit
            if nxtIdx < n && count >= tree[nxtIdx] {
                idx = nxtIdx
                count -= tree[nxtIdx]
            }
            bit >>= 1
        }
        return idx
    }
}

class Solution {
    func reconstructQueue(_ people: [[Int]]) -> [[Int]] {
        let n = people.count
        var people = people.sorted {
            $0[0] == $1[0] ? $0[1] > $1[1] : $0[0] < $1[0]
        }
        var res = [[Int]?](repeating: nil, count: n)

        let bit = BIT(n)
        let msb = 1 << (Int.bitWidth - n.leadingZeroBitCount - 1)
        for p in people {
            let idx = bit.getIdx(p[1], msb)
            res[idx] = p
            bit.update(idx, -1)
        }

        return res.compactMap { $0 }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n)$
- Space complexity: $O(n)$
