## 1. Brute Force

::tabs-start

```python
class Solution:
    def findMaximums(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n
        for i in range(n):
            curMin = nums[i]
            for j in range(i, n):
                curMin = min(curMin, nums[j])
                res[j - i] = max(res[j - i], curMin)
        return res
```

```java
public class Solution {
    public int[] findMaximums(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            int curMin = nums[i];
            for (int j = i; j < n; j++) {
                curMin = Math.min(curMin, nums[j]);
                res[j - i] = Math.max(res[j - i], curMin);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findMaximums(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 0);
        for (int i = 0; i < n; i++) {
            int curMin = nums[i];
            for (int j = i; j < n; j++) {
                curMin = min(curMin, nums[j]);
                res[j - i] = max(res[j - i], curMin);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findMaximums(nums) {
        const n = nums.length;
        const res = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            let curMin = nums[i];
            for (let j = i; j < n; j++) {
                curMin = Math.min(curMin, nums[j]);
                res[j - i] = Math.max(res[j - i], curMin);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FindMaximums(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            int curMin = nums[i];
            for (int j = i; j < n; j++) {
                curMin = Math.Min(curMin, nums[j]);
                res[j - i] = Math.Max(res[j - i], curMin);
            }
        }
        return res;
    }
}
```

```go
func findMaximums(nums []int) []int {
    n := len(nums)
    res := make([]int, n)
    for i := 0; i < n; i++ {
        curMin := nums[i]
        for j := i; j < n; j++ {
            curMin = min(curMin, nums[j])
            res[j-i] = max(res[j-i], curMin)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findMaximums(nums: IntArray): IntArray {
        val n = nums.size
        val res = IntArray(n)
        for (i in 0 until n) {
            var curMin = nums[i]
            for (j in i until n) {
                curMin = minOf(curMin, nums[j])
                res[j - i] = maxOf(res[j - i], curMin)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findMaximums(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var res = [Int](repeating: 0, count: n)
        for i in 0..<n {
            var curMin = nums[i]
            for j in i..<n {
                curMin = min(curMin, nums[j])
                res[j - i] = max(res[j - i], curMin)
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn find_maximums(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut res = vec![0; n];
        for i in 0..n {
            let mut cur_min = nums[i];
            for j in i..n {
                cur_min = cur_min.min(nums[j]);
                res[j - i] = res[j - i].max(cur_min);
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findMaximums(nums: number[]): number[] {
        const n = nums.length;
        const res: number[] = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            let curMin = nums[i];
            for (let j = i; j < n; j++) {
                curMin = Math.min(curMin, nums[j]);
                res[j - i] = Math.max(res[j - i], curMin);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the array $nums$.

---

## 2. Sliding Window (Monotonic Deque)

::tabs-start

```python
class Solution:
    def findMaximums(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n
        for k in range(1, n + 1):
            q = deque()
            for r in range(n):
                while q and nums[q[-1]] >= nums[r]:
                    q.pop()
                q.append(r)
                if q[0] <= r - k:
                    q.popleft()
                if r >= k - 1:
                    res[k - 1] = max(res[k - 1], nums[q[0]])
        return res
```

```java
public class Solution {
    public int[] findMaximums(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        for (int k = 1; k <= n; k++) {
            Deque<Integer> q = new ArrayDeque<>();
            for (int r = 0; r < n; r++) {
                while (!q.isEmpty() && nums[q.peekLast()] >= nums[r]) {
                    q.pollLast();
                }
                q.addLast(r);
                if (q.peekFirst() <= r - k) {
                    q.pollFirst();
                }
                if (r >= k - 1) {
                    res[k - 1] = Math.max(res[k - 1], nums[q.peekFirst()]);
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
    vector<int> findMaximums(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 0);
        for (int k = 1; k <= n; k++) {
            deque<int> q;
            for (int r = 0; r < n; r++) {
                while (!q.empty() && nums[q.back()] >= nums[r]) {
                    q.pop_back();
                }
                q.push_back(r);
                if (q.front() <= r - k) {
                    q.pop_front();
                }
                if (r >= k - 1) {
                    res[k - 1] = max(res[k - 1], nums[q.front()]);
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
     * @param {number[]} nums
     * @return {number[]}
     */
    findMaximums(nums) {
        const n = nums.length;
        const res = new Array(n).fill(0);
        for (let k = 1; k <= n; k++) {
            const q = new Deque();
            for (let r = 0; r < n; r++) {
                while (!q.isEmpty() && nums[q.back()] >= nums[r]) {
                    q.popBack();
                }
                q.pushBack(r);
                if (q.front() <= r - k) {
                    q.popFront();
                }
                if (r >= k - 1) {
                    res[k - 1] = Math.max(res[k - 1], nums[q.front()]);
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FindMaximums(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];
        for (int k = 1; k <= n; k++) {
            var q = new LinkedList<int>();
            for (int r = 0; r < n; r++) {
                while (q.Count > 0 && nums[q.Last.Value] >= nums[r]) {
                    q.RemoveLast();
                }
                q.AddLast(r);
                if (q.First.Value <= r - k) {
                    q.RemoveFirst();
                }
                if (r >= k - 1) {
                    res[k - 1] = Math.Max(res[k - 1], nums[q.First.Value]);
                }
            }
        }
        return res;
    }
}
```

```go
func findMaximums(nums []int) []int {
    n := len(nums)
    res := make([]int, n)
    for k := 1; k <= n; k++ {
        q := []int{}
        for r := 0; r < n; r++ {
            for len(q) > 0 && nums[q[len(q)-1]] >= nums[r] {
                q = q[:len(q)-1]
            }
            q = append(q, r)
            if q[0] <= r-k {
                q = q[1:]
            }
            if r >= k-1 {
                res[k-1] = max(res[k-1], nums[q[0]])
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findMaximums(nums: IntArray): IntArray {
        val n = nums.size
        val res = IntArray(n)
        val q = IntArray(n)
        for (k in 1..n) {
            var head = 0
            var tail = 0
            for (r in 0 until n) {
                while (tail > head && nums[q[tail - 1]] >= nums[r]) {
                    tail--
                }
                q[tail] = r
                tail++
                if (q[head] <= r - k) {
                    head++
                }
                if (r >= k - 1) {
                    res[k - 1] = maxOf(res[k - 1], nums[q[head]])
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findMaximums(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var res = [Int](repeating: 0, count: n)
        var q = [Int](repeating: 0, count: n)
        for k in 1...n {
            var head = 0
            var tail = 0
            for r in 0..<n {
                while tail > head && nums[q[tail - 1]] >= nums[r] {
                    tail -= 1
                }
                q[tail] = r
                tail += 1
                if q[head] <= r - k {
                    head += 1
                }
                if r >= k - 1 {
                    res[k - 1] = max(res[k - 1], nums[q[head]])
                }
            }
        }
        return res
    }
}
```

```rust
use std::collections::VecDeque;

impl Solution {
    pub fn find_maximums(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut res = vec![0; n];
        for k in 1..=n {
            let mut q: VecDeque<usize> = VecDeque::new();
            for r in 0..n {
                while let Some(&back) = q.back() {
                    if nums[back] >= nums[r] {
                        q.pop_back();
                    } else {
                        break;
                    }
                }
                q.push_back(r);
                if *q.front().unwrap() + k <= r {
                    q.pop_front();
                }
                if r + 1 >= k {
                    res[k - 1] = res[k - 1].max(nums[*q.front().unwrap()]);
                }
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findMaximums(nums: number[]): number[] {
        const n = nums.length;
        const res: number[] = new Array(n).fill(0);
        for (let k = 1; k <= n; k++) {
            const q = new Deque();
            for (let r = 0; r < n; r++) {
                while (!q.isEmpty() && nums[q.back() as number] >= nums[r]) {
                    q.popBack();
                }
                q.pushBack(r);
                if ((q.front() as number) <= r - k) {
                    q.popFront();
                }
                if (r >= k - 1) {
                    res[k - 1] = Math.max(res[k - 1], nums[q.front() as number]);
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

> Where $n$ is the length of the array $nums$.

---

## 3. Disjoint Set Union

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n

    def find(self, node):
        cur = node
        while cur != self.parent[cur]:
            self.parent[cur] = self.parent[self.parent[cur]]
            cur = self.parent[cur]
        return cur

    def union(self, u, v):
        pu = self.find(u)
        pv = self.find(v)
        if pu == pv:
            return False
        if self.size[pv] > self.size[pu]:
            pu, pv = pv, pu
        self.parent[pv] = pu
        self.size[pu] += self.size[pv]
        return True

    def getSize(self, node):
        return self.size[self.find(node)]


class Solution:
    def findMaximums(self, nums: List[int]) -> List[int]:
        n = len(nums)
        order = sorted(range(n), key=lambda i: -nums[i])
        dsu = DSU(n)
        active = [False] * n
        res = [0] * n
        filled = 0
        for i in order:
            active[i] = True
            if i > 0 and active[i - 1]:
                dsu.union(i, i - 1)
            if i < n - 1 and active[i + 1]:
                dsu.union(i, i + 1)
            size = dsu.getSize(i)
            while filled < size:
                res[filled] = nums[i]
                filled += 1
        return res
```

```java
class DSU {
    int[] parent;
    int[] size;

    public DSU(int n) {
        parent = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }

    public int find(int node) {
        int cur = node;
        while (cur != parent[cur]) {
            parent[cur] = parent[parent[cur]];
            cur = parent[cur];
        }
        return cur;
    }

    public boolean union(int u, int v) {
        int pu = find(u);
        int pv = find(v);
        if (pu == pv) {
            return false;
        }
        if (size[pv] > size[pu]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        parent[pv] = pu;
        size[pu] += size[pv];
        return true;
    }

    public int getSize(int node) {
        return size[find(node)];
    }
}

public class Solution {
    public int[] findMaximums(int[] nums) {
        int n = nums.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(nums[b], nums[a]));

        DSU dsu = new DSU(n);
        boolean[] active = new boolean[n];
        int[] res = new int[n];
        int filled = 0;
        for (int i : order) {
            active[i] = true;
            if (i > 0 && active[i - 1]) {
                dsu.union(i, i - 1);
            }
            if (i < n - 1 && active[i + 1]) {
                dsu.union(i, i + 1);
            }
            int size = dsu.getSize(i);
            while (filled < size) {
                res[filled] = nums[i];
                filled++;
            }
        }
        return res;
    }
}
```

```cpp
class DSU {
public:
    vector<int> parent;
    vector<int> size;

    DSU(int n) {
        parent.resize(n);
        size.resize(n, 1);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    int find(int node) {
        int cur = node;
        while (cur != parent[cur]) {
            parent[cur] = parent[parent[cur]];
            cur = parent[cur];
        }
        return cur;
    }

    bool unionSets(int u, int v) {
        int pu = find(u);
        int pv = find(v);
        if (pu == pv) {
            return false;
        }
        if (size[pv] > size[pu]) {
            swap(pu, pv);
        }
        parent[pv] = pu;
        size[pu] += size[pv];
        return true;
    }

    int getSize(int node) {
        return size[find(node)];
    }
};

class Solution {
public:
    vector<int> findMaximums(vector<int>& nums) {
        int n = nums.size();
        vector<int> order(n);
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        sort(order.begin(), order.end(), [&](int a, int b) {
            return nums[a] > nums[b];
        });

        DSU dsu(n);
        vector<bool> active(n, false);
        vector<int> res(n, 0);
        int filled = 0;
        for (int i : order) {
            active[i] = true;
            if (i > 0 && active[i - 1]) {
                dsu.unionSets(i, i - 1);
            }
            if (i < n - 1 && active[i + 1]) {
                dsu.unionSets(i, i + 1);
            }
            int size = dsu.getSize(i);
            while (filled < size) {
                res[filled] = nums[i];
                filled++;
            }
        }
        return res;
    }
};
```

```javascript
class DSU {
    /**
     * @param {number} n
     */
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = Array(n).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        let cur = node;
        while (cur !== this.parent[cur]) {
            this.parent[cur] = this.parent[this.parent[cur]];
            cur = this.parent[cur];
        }
        return cur;
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) {
            return false;
        }
        if (this.size[pv] > this.size[pu]) {
            [pu, pv] = [pv, pu];
        }
        this.parent[pv] = pu;
        this.size[pu] += this.size[pv];
        return true;
    }

    /**
     * @param {number} node
     * @return {number}
     */
    getSize(node) {
        return this.size[this.find(node)];
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findMaximums(nums) {
        const n = nums.length;
        const order = Array.from({ length: n }, (_, i) => i);
        order.sort((a, b) => nums[b] - nums[a]);

        const dsu = new DSU(n);
        const active = new Array(n).fill(false);
        const res = new Array(n).fill(0);
        let filled = 0;
        for (const i of order) {
            active[i] = true;
            if (i > 0 && active[i - 1]) {
                dsu.union(i, i - 1);
            }
            if (i < n - 1 && active[i + 1]) {
                dsu.union(i, i + 1);
            }
            const size = dsu.getSize(i);
            while (filled < size) {
                res[filled] = nums[i];
                filled++;
            }
        }
        return res;
    }
}
```

```csharp
public class DSU {
    private int[] parent;
    private int[] size;

    public DSU(int n) {
        parent = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }

    public int Find(int node) {
        int cur = node;
        while (cur != parent[cur]) {
            parent[cur] = parent[parent[cur]];
            cur = parent[cur];
        }
        return cur;
    }

    public bool Union(int u, int v) {
        int pu = Find(u);
        int pv = Find(v);
        if (pu == pv) {
            return false;
        }
        if (size[pv] > size[pu]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        parent[pv] = pu;
        size[pu] += size[pv];
        return true;
    }

    public int GetSize(int node) {
        return size[Find(node)];
    }
}

public class Solution {
    public int[] FindMaximums(int[] nums) {
        int n = nums.Length;
        int[] order = new int[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Array.Sort(order, (a, b) => nums[b].CompareTo(nums[a]));

        DSU dsu = new DSU(n);
        bool[] active = new bool[n];
        int[] res = new int[n];
        int filled = 0;
        foreach (int i in order) {
            active[i] = true;
            if (i > 0 && active[i - 1]) {
                dsu.Union(i, i - 1);
            }
            if (i < n - 1 && active[i + 1]) {
                dsu.Union(i, i + 1);
            }
            int size = dsu.GetSize(i);
            while (filled < size) {
                res[filled] = nums[i];
                filled++;
            }
        }
        return res;
    }
}
```

```go
type DSU struct {
    parent []int
    size   []int
}

func NewDSU(n int) *DSU {
    dsu := &DSU{
        parent: make([]int, n),
        size:   make([]int, n),
    }
    for i := 0; i < n; i++ {
        dsu.parent[i] = i
        dsu.size[i] = 1
    }
    return dsu
}

func (dsu *DSU) Find(node int) int {
    cur := node
    for cur != dsu.parent[cur] {
        dsu.parent[cur] = dsu.parent[dsu.parent[cur]]
        cur = dsu.parent[cur]
    }
    return cur
}

func (dsu *DSU) Union(u, v int) bool {
    pu := dsu.Find(u)
    pv := dsu.Find(v)
    if pu == pv {
        return false
    }
    if dsu.size[pv] > dsu.size[pu] {
        pu, pv = pv, pu
    }
    dsu.parent[pv] = pu
    dsu.size[pu] += dsu.size[pv]
    return true
}

func (dsu *DSU) GetSize(node int) int {
    return dsu.size[dsu.Find(node)]
}

func findMaximums(nums []int) []int {
    n := len(nums)
    order := make([]int, n)
    for i := 0; i < n; i++ {
        order[i] = i
    }
    sort.Slice(order, func(a, b int) bool {
        return nums[order[a]] > nums[order[b]]
    })

    dsu := NewDSU(n)
    active := make([]bool, n)
    res := make([]int, n)
    filled := 0
    for _, i := range order {
        active[i] = true
        if i > 0 && active[i-1] {
            dsu.Union(i, i-1)
        }
        if i < n-1 && active[i+1] {
            dsu.Union(i, i+1)
        }
        size := dsu.GetSize(i)
        for filled < size {
            res[filled] = nums[i]
            filled++
        }
    }
    return res
}
```

```kotlin
class DSU(n: Int) {
    val parent = IntArray(n) { it }
    val size = IntArray(n) { 1 }

    fun find(node: Int): Int {
        var cur = node
        while (cur != parent[cur]) {
            parent[cur] = parent[parent[cur]]
            cur = parent[cur]
        }
        return cur
    }

    fun union(u: Int, v: Int): Boolean {
        var pu = find(u)
        var pv = find(v)
        if (pu == pv) {
            return false
        }
        if (size[pv] > size[pu]) {
            val temp = pu
            pu = pv
            pv = temp
        }
        parent[pv] = pu
        size[pu] += size[pv]
        return true
    }

    fun getSize(node: Int): Int {
        return size[find(node)]
    }
}

class Solution {
    fun findMaximums(nums: IntArray): IntArray {
        val n = nums.size
        val order = (0 until n).sortedByDescending { nums[it] }

        val dsu = DSU(n)
        val active = BooleanArray(n)
        val res = IntArray(n)
        var filled = 0
        for (i in order) {
            active[i] = true
            if (i > 0 && active[i - 1]) {
                dsu.union(i, i - 1)
            }
            if (i < n - 1 && active[i + 1]) {
                dsu.union(i, i + 1)
            }
            val size = dsu.getSize(i)
            while (filled < size) {
                res[filled] = nums[i]
                filled++
            }
        }
        return res
    }
}
```

```swift
class DSU {
    var parent: [Int]
    var size: [Int]

    init(_ n: Int) {
        parent = Array(0..<n)
        size = Array(repeating: 1, count: n)
    }

    func find(_ node: Int) -> Int {
        var cur = node
        while cur != parent[cur] {
            parent[cur] = parent[parent[cur]]
            cur = parent[cur]
        }
        return cur
    }

    @discardableResult
    func union(_ u: Int, _ v: Int) -> Bool {
        var pu = find(u)
        var pv = find(v)
        if pu == pv {
            return false
        }
        if size[pv] > size[pu] {
            swap(&pu, &pv)
        }
        parent[pv] = pu
        size[pu] += size[pv]
        return true
    }

    func getSize(_ node: Int) -> Int {
        return size[find(node)]
    }
}

class Solution {
    func findMaximums(_ nums: [Int]) -> [Int] {
        let n = nums.count
        let order = (0..<n).sorted { nums[$0] > nums[$1] }

        let dsu = DSU(n)
        var active = [Bool](repeating: false, count: n)
        var res = [Int](repeating: 0, count: n)
        var filled = 0
        for i in order {
            active[i] = true
            if i > 0 && active[i - 1] {
                dsu.union(i, i - 1)
            }
            if i < n - 1 && active[i + 1] {
                dsu.union(i, i + 1)
            }
            let size = dsu.getSize(i)
            while filled < size {
                res[filled] = nums[i]
                filled += 1
            }
        }
        return res
    }
}
```

```rust
struct DSU {
    parent: Vec<usize>,
    size: Vec<usize>,
}

impl DSU {
    fn new(n: usize) -> Self {
        DSU {
            parent: (0..n).collect(),
            size: vec![1; n],
        }
    }

    fn find(&mut self, node: usize) -> usize {
        let mut cur = node;
        while cur != self.parent[cur] {
            self.parent[cur] = self.parent[self.parent[cur]];
            cur = self.parent[cur];
        }
        cur
    }

    fn union(&mut self, u: usize, v: usize) -> bool {
        let mut pu = self.find(u);
        let mut pv = self.find(v);
        if pu == pv {
            return false;
        }
        if self.size[pv] > self.size[pu] {
            std::mem::swap(&mut pu, &mut pv);
        }
        self.parent[pv] = pu;
        self.size[pu] += self.size[pv];
        true
    }

    fn get_size(&mut self, node: usize) -> usize {
        let root = self.find(node);
        self.size[root]
    }
}

impl Solution {
    pub fn find_maximums(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by(|&a, &b| nums[b].cmp(&nums[a]));

        let mut dsu = DSU::new(n);
        let mut active = vec![false; n];
        let mut res = vec![0; n];
        let mut filled = 0;
        for &i in &order {
            active[i] = true;
            if i > 0 && active[i - 1] {
                dsu.union(i, i - 1);
            }
            if i + 1 < n && active[i + 1] {
                dsu.union(i, i + 1);
            }
            let size = dsu.get_size(i);
            while filled < size {
                res[filled] = nums[i];
                filled += 1;
            }
        }
        res
    }
}
```

```typescript
class DSU {
    parent: number[];
    size: number[];

    /**
     * @param {number} n
     */
    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = Array(n).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node: number): number {
        let cur = node;
        while (cur !== this.parent[cur]) {
            this.parent[cur] = this.parent[this.parent[cur]];
            cur = this.parent[cur];
        }
        return cur;
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    union(u: number, v: number): boolean {
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) {
            return false;
        }
        if (this.size[pv] > this.size[pu]) {
            [pu, pv] = [pv, pu];
        }
        this.parent[pv] = pu;
        this.size[pu] += this.size[pv];
        return true;
    }

    /**
     * @param {number} node
     * @return {number}
     */
    getSize(node: number): number {
        return this.size[this.find(node)];
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findMaximums(nums: number[]): number[] {
        const n = nums.length;
        const order: number[] = Array.from({ length: n }, (_, i) => i);
        order.sort((a, b) => nums[b] - nums[a]);

        const dsu = new DSU(n);
        const active: boolean[] = new Array(n).fill(false);
        const res: number[] = new Array(n).fill(0);
        let filled = 0;
        for (const i of order) {
            active[i] = true;
            if (i > 0 && active[i - 1]) {
                dsu.union(i, i - 1);
            }
            if (i < n - 1 && active[i + 1]) {
                dsu.union(i, i + 1);
            }
            const size = dsu.getSize(i);
            while (filled < size) {
                res[filled] = nums[i];
                filled++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the array $nums$.

---

## 4. Monotonic Stack

::tabs-start

```python
class Solution:
    def findMaximums(self, nums: List[int]) -> List[int]:
        n = len(nums)
        left, right = [-1] * n, [n] * n
        stack = []
        for i in range(n):
            while stack and nums[stack[-1]] >= nums[i]:
                stack.pop()
            if stack:
                left[i] = stack[-1]
            stack.append(i)

        stack = []
        for i in range(n - 1, -1, -1):
            while stack and nums[stack[-1]] >= nums[i]:
                stack.pop()
            if stack:
                right[i] = stack[-1]
            stack.append(i)

        res = [0] * n
        for i in range(n):
            length = right[i] - left[i] - 1
            res[length - 1] = max(res[length - 1], nums[i])

        for i in range(n - 2, -1, -1):
            res[i] = max(res[i], res[i + 1])
        return res
```

```java
public class Solution {
    public int[] findMaximums(int[] nums) {
        int n = nums.length;
        int[] left = new int[n];
        int[] right = new int[n];
        Arrays.fill(left, -1);
        Arrays.fill(right, n);

        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && nums[stack.peek()] >= nums[i]) {
                stack.pop();
            }
            if (!stack.isEmpty()) {
                left[i] = stack.peek();
            }
            stack.push(i);
        }

        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && nums[stack.peek()] >= nums[i]) {
                stack.pop();
            }
            if (!stack.isEmpty()) {
                right[i] = stack.peek();
            }
            stack.push(i);
        }

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            int length = right[i] - left[i] - 1;
            res[length - 1] = Math.max(res[length - 1], nums[i]);
        }

        for (int i = n - 2; i >= 0; i--) {
            res[i] = Math.max(res[i], res[i + 1]);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findMaximums(vector<int>& nums) {
        int n = nums.size();
        vector<int> left(n, -1), right(n, n);
        vector<int> stack;
        for (int i = 0; i < n; i++) {
            while (!stack.empty() && nums[stack.back()] >= nums[i]) {
                stack.pop_back();
            }
            if (!stack.empty()) {
                left[i] = stack.back();
            }
            stack.push_back(i);
        }

        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.empty() && nums[stack.back()] >= nums[i]) {
                stack.pop_back();
            }
            if (!stack.empty()) {
                right[i] = stack.back();
            }
            stack.push_back(i);
        }

        vector<int> res(n, 0);
        for (int i = 0; i < n; i++) {
            int length = right[i] - left[i] - 1;
            res[length - 1] = max(res[length - 1], nums[i]);
        }

        for (int i = n - 2; i >= 0; i--) {
            res[i] = max(res[i], res[i + 1]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findMaximums(nums) {
        const n = nums.length;
        const left = new Array(n).fill(-1);
        const right = new Array(n).fill(n);
        let stack = [];
        for (let i = 0; i < n; i++) {
            while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) {
                stack.pop();
            }
            if (stack.length) {
                left[i] = stack[stack.length - 1];
            }
            stack.push(i);
        }

        stack = [];
        for (let i = n - 1; i >= 0; i--) {
            while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) {
                stack.pop();
            }
            if (stack.length) {
                right[i] = stack[stack.length - 1];
            }
            stack.push(i);
        }

        const res = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            const length = right[i] - left[i] - 1;
            res[length - 1] = Math.max(res[length - 1], nums[i]);
        }

        for (let i = n - 2; i >= 0; i--) {
            res[i] = Math.max(res[i], res[i + 1]);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FindMaximums(int[] nums) {
        int n = nums.Length;
        int[] left = new int[n];
        int[] right = new int[n];
        Array.Fill(left, -1);
        Array.Fill(right, n);

        var stack = new Stack<int>();
        for (int i = 0; i < n; i++) {
            while (stack.Count > 0 && nums[stack.Peek()] >= nums[i]) {
                stack.Pop();
            }
            if (stack.Count > 0) {
                left[i] = stack.Peek();
            }
            stack.Push(i);
        }

        stack.Clear();
        for (int i = n - 1; i >= 0; i--) {
            while (stack.Count > 0 && nums[stack.Peek()] >= nums[i]) {
                stack.Pop();
            }
            if (stack.Count > 0) {
                right[i] = stack.Peek();
            }
            stack.Push(i);
        }

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            int length = right[i] - left[i] - 1;
            res[length - 1] = Math.Max(res[length - 1], nums[i]);
        }

        for (int i = n - 2; i >= 0; i--) {
            res[i] = Math.Max(res[i], res[i + 1]);
        }
        return res;
    }
}
```

```go
func findMaximums(nums []int) []int {
    n := len(nums)
    left := make([]int, n)
    right := make([]int, n)
    for i := 0; i < n; i++ {
        left[i] = -1
        right[i] = n
    }

    stack := []int{}
    for i := 0; i < n; i++ {
        for len(stack) > 0 && nums[stack[len(stack)-1]] >= nums[i] {
            stack = stack[:len(stack)-1]
        }
        if len(stack) > 0 {
            left[i] = stack[len(stack)-1]
        }
        stack = append(stack, i)
    }

    stack = []int{}
    for i := n - 1; i >= 0; i-- {
        for len(stack) > 0 && nums[stack[len(stack)-1]] >= nums[i] {
            stack = stack[:len(stack)-1]
        }
        if len(stack) > 0 {
            right[i] = stack[len(stack)-1]
        }
        stack = append(stack, i)
    }

    res := make([]int, n)
    for i := 0; i < n; i++ {
        length := right[i] - left[i] - 1
        res[length-1] = max(res[length-1], nums[i])
    }

    for i := n - 2; i >= 0; i-- {
        res[i] = max(res[i], res[i+1])
    }
    return res
}
```

```kotlin
class Solution {
    fun findMaximums(nums: IntArray): IntArray {
        val n = nums.size
        val left = IntArray(n) { -1 }
        val right = IntArray(n) { n }

        var stack = mutableListOf<Int>()
        for (i in 0 until n) {
            while (stack.isNotEmpty() && nums[stack.last()] >= nums[i]) {
                stack.removeAt(stack.lastIndex)
            }
            if (stack.isNotEmpty()) {
                left[i] = stack.last()
            }
            stack.add(i)
        }

        stack = mutableListOf()
        for (i in n - 1 downTo 0) {
            while (stack.isNotEmpty() && nums[stack.last()] >= nums[i]) {
                stack.removeAt(stack.lastIndex)
            }
            if (stack.isNotEmpty()) {
                right[i] = stack.last()
            }
            stack.add(i)
        }

        val res = IntArray(n)
        for (i in 0 until n) {
            val length = right[i] - left[i] - 1
            res[length - 1] = maxOf(res[length - 1], nums[i])
        }

        for (i in n - 2 downTo 0) {
            res[i] = maxOf(res[i], res[i + 1])
        }
        return res
    }
}
```

```swift
class Solution {
    func findMaximums(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var left = [Int](repeating: -1, count: n)
        var right = [Int](repeating: n, count: n)

        var stack = [Int]()
        for i in 0..<n {
            while !stack.isEmpty && nums[stack.last!] >= nums[i] {
                stack.removeLast()
            }
            if let top = stack.last {
                left[i] = top
            }
            stack.append(i)
        }

        stack = []
        for i in stride(from: n - 1, through: 0, by: -1) {
            while !stack.isEmpty && nums[stack.last!] >= nums[i] {
                stack.removeLast()
            }
            if let top = stack.last {
                right[i] = top
            }
            stack.append(i)
        }

        var res = [Int](repeating: 0, count: n)
        for i in 0..<n {
            let length = right[i] - left[i] - 1
            res[length - 1] = max(res[length - 1], nums[i])
        }

        for i in stride(from: n - 2, through: 0, by: -1) {
            res[i] = max(res[i], res[i + 1])
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn find_maximums(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut left = vec![-1i32; n];
        let mut right = vec![n as i32; n];

        let mut stack: Vec<usize> = Vec::new();
        for i in 0..n {
            while let Some(&top) = stack.last() {
                if nums[top] >= nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            if let Some(&top) = stack.last() {
                left[i] = top as i32;
            }
            stack.push(i);
        }

        stack.clear();
        for i in (0..n).rev() {
            while let Some(&top) = stack.last() {
                if nums[top] >= nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            if let Some(&top) = stack.last() {
                right[i] = top as i32;
            }
            stack.push(i);
        }

        let mut res = vec![0; n];
        for i in 0..n {
            let length = (right[i] - left[i] - 1) as usize;
            res[length - 1] = res[length - 1].max(nums[i]);
        }

        for i in (0..n - 1).rev() {
            res[i] = res[i].max(res[i + 1]);
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findMaximums(nums: number[]): number[] {
        const n = nums.length;
        const left: number[] = new Array(n).fill(-1);
        const right: number[] = new Array(n).fill(n);
        let stack: number[] = [];
        for (let i = 0; i < n; i++) {
            while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) {
                stack.pop();
            }
            if (stack.length) {
                left[i] = stack[stack.length - 1];
            }
            stack.push(i);
        }

        stack = [];
        for (let i = n - 1; i >= 0; i--) {
            while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) {
                stack.pop();
            }
            if (stack.length) {
                right[i] = stack[stack.length - 1];
            }
            stack.push(i);
        }

        const res: number[] = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            const length = right[i] - left[i] - 1;
            res[length - 1] = Math.max(res[length - 1], nums[i]);
        }

        for (let i = n - 2; i >= 0; i--) {
            res[i] = Math.max(res[i], res[i + 1]);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the array $nums$.

---

## 5. Monotonic Stack (One Pass)

::tabs-start

```python
class Solution:
    def findMaximums(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n
        stack = []
        for i in range(n + 1):
            while stack and (i == n or nums[stack[-1]] >= nums[i]):
                j = stack.pop()
                l = stack[-1] if stack else -1
                length = i - l - 1
                res[length - 1] = max(res[length - 1], nums[j])
            stack.append(i)

        for i in range(n - 2, -1, -1):
            res[i] = max(res[i], res[i + 1])
        return res
```

```java
public class Solution {
    public int[] findMaximums(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i <= n; i++) {
            while (!stack.isEmpty() && (i == n || nums[stack.peek()] >= nums[i])) {
                int j = stack.pop();
                int l = stack.isEmpty() ? -1 : stack.peek();
                int length = i - l - 1;
                res[length - 1] = Math.max(res[length - 1], nums[j]);
            }
            stack.push(i);
        }

        for (int i = n - 2; i >= 0; i--) {
            res[i] = Math.max(res[i], res[i + 1]);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findMaximums(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 0);
        vector<int> stack;
        for (int i = 0; i <= n; i++) {
            while (!stack.empty() && (i == n || nums[stack.back()] >= nums[i])) {
                int j = stack.back();
                stack.pop_back();
                int l = stack.empty() ? -1 : stack.back();
                int length = i - l - 1;
                res[length - 1] = max(res[length - 1], nums[j]);
            }
            stack.push_back(i);
        }

        for (int i = n - 2; i >= 0; i--) {
            res[i] = max(res[i], res[i + 1]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findMaximums(nums) {
        const n = nums.length;
        const res = new Array(n).fill(0);
        const stack = [];
        for (let i = 0; i <= n; i++) {
            while (
                stack.length &&
                (i === n || nums[stack[stack.length - 1]] >= nums[i])
            ) {
                const j = stack.pop();
                const l = stack.length ? stack[stack.length - 1] : -1;
                const length = i - l - 1;
                res[length - 1] = Math.max(res[length - 1], nums[j]);
            }
            stack.push(i);
        }

        for (let i = n - 2; i >= 0; i--) {
            res[i] = Math.max(res[i], res[i + 1]);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FindMaximums(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];
        var stack = new Stack<int>();
        for (int i = 0; i <= n; i++) {
            while (stack.Count > 0 && (i == n || nums[stack.Peek()] >= nums[i])) {
                int j = stack.Pop();
                int l = stack.Count > 0 ? stack.Peek() : -1;
                int length = i - l - 1;
                res[length - 1] = Math.Max(res[length - 1], nums[j]);
            }
            stack.Push(i);
        }

        for (int i = n - 2; i >= 0; i--) {
            res[i] = Math.Max(res[i], res[i + 1]);
        }
        return res;
    }
}
```

```go
func findMaximums(nums []int) []int {
    n := len(nums)
    res := make([]int, n)
    stack := []int{}
    for i := 0; i <= n; i++ {
        for len(stack) > 0 && (i == n || nums[stack[len(stack)-1]] >= nums[i]) {
            j := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            l := -1
            if len(stack) > 0 {
                l = stack[len(stack)-1]
            }
            length := i - l - 1
            res[length-1] = max(res[length-1], nums[j])
        }
        stack = append(stack, i)
    }

    for i := n - 2; i >= 0; i-- {
        res[i] = max(res[i], res[i+1])
    }
    return res
}
```

```kotlin
class Solution {
    fun findMaximums(nums: IntArray): IntArray {
        val n = nums.size
        val res = IntArray(n)
        val stack = mutableListOf<Int>()
        for (i in 0..n) {
            while (stack.isNotEmpty() && (i == n || nums[stack.last()] >= nums[i])) {
                val j = stack.removeAt(stack.lastIndex)
                val l = if (stack.isNotEmpty()) stack.last() else -1
                val length = i - l - 1
                res[length - 1] = maxOf(res[length - 1], nums[j])
            }
            stack.add(i)
        }

        for (i in n - 2 downTo 0) {
            res[i] = maxOf(res[i], res[i + 1])
        }
        return res
    }
}
```

```swift
class Solution {
    func findMaximums(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var res = [Int](repeating: 0, count: n)
        var stack = [Int]()
        for i in 0...n {
            while !stack.isEmpty && (i == n || nums[stack.last!] >= nums[i]) {
                let j = stack.removeLast()
                let l = stack.last ?? -1
                let length = i - l - 1
                res[length - 1] = max(res[length - 1], nums[j])
            }
            stack.append(i)
        }

        for i in stride(from: n - 2, through: 0, by: -1) {
            res[i] = max(res[i], res[i + 1])
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn find_maximums(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut res = vec![0; n];
        let mut stack: Vec<usize> = Vec::new();
        for i in 0..=n {
            while let Some(&top) = stack.last() {
                if i < n && nums[top] < nums[i] {
                    break;
                }
                stack.pop();
                let length = match stack.last() {
                    Some(&l) => i - l - 1,
                    None => i,
                };
                res[length - 1] = res[length - 1].max(nums[top]);
            }
            stack.push(i);
        }

        for i in (0..n - 1).rev() {
            res[i] = res[i].max(res[i + 1]);
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findMaximums(nums: number[]): number[] {
        const n = nums.length;
        const res: number[] = new Array(n).fill(0);
        const stack: number[] = [];
        for (let i = 0; i <= n; i++) {
            while (
                stack.length &&
                (i === n || nums[stack[stack.length - 1]] >= nums[i])
            ) {
                const j = stack.pop() as number;
                const l = stack.length ? stack[stack.length - 1] : -1;
                const length = i - l - 1;
                res[length - 1] = Math.max(res[length - 1], nums[j]);
            }
            stack.push(i);
        }

        for (let i = n - 2; i >= 0; i--) {
            res[i] = Math.max(res[i], res[i + 1]);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the array $nums$.
