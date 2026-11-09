## 1. Brute Force

::tabs-start

```python
class Solution:
    def sumCounts(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0
        for i in range(n):
            for j in range(i, n):
                distinct = len(set(nums[i:j + 1]))
                res += distinct * distinct
        return res
```

```java
public class Solution {
    public int sumCounts(List<Integer> nums) {
        int n = nums.size();
        int res = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                Set<Integer> seen = new HashSet<>();
                for (int k = i; k <= j; k++) {
                    seen.add(nums.get(k));
                }
                res += seen.size() * seen.size();
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int sumCounts(vector<int>& nums) {
        int n = nums.size();
        int res = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                unordered_set<int> seen(nums.begin() + i, nums.begin() + j + 1);
                int distinct = seen.size();
                res += distinct * distinct;
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
     * @return {number}
     */
    sumCounts(nums) {
        const n = nums.length;
        let res = 0;
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                const distinct = new Set(nums.slice(i, j + 1)).size;
                res += distinct * distinct;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int SumCounts(IList<int> nums) {
        int n = nums.Count;
        int res = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                var seen = new HashSet<int>();
                for (int k = i; k <= j; k++) {
                    seen.Add(nums[k]);
                }
                res += seen.Count * seen.Count;
            }
        }
        return res;
    }
}
```

```go
func sumCounts(nums []int) int {
    n := len(nums)
    res := 0
    for i := 0; i < n; i++ {
        for j := i; j < n; j++ {
            seen := map[int]bool{}
            for k := i; k <= j; k++ {
                seen[nums[k]] = true
            }
            res += len(seen) * len(seen)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun sumCounts(nums: List<Int>): Int {
        val n = nums.size
        var res = 0
        for (i in 0 until n) {
            for (j in i until n) {
                val distinct = nums.subList(i, j + 1).toSet().size
                res += distinct * distinct
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func sumCounts(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = 0
        for i in 0..<n {
            for j in i..<n {
                let distinct = Set(nums[i...j]).count
                res += distinct * distinct
            }
        }
        return res
    }
}
```

```rust
use std::collections::HashSet;

impl Solution {
    pub fn sum_counts(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut res = 0;
        for i in 0..n {
            for j in i..n {
                let seen: HashSet<i32> = nums[i..=j].iter().cloned().collect();
                let distinct = seen.len() as i32;
                res += distinct * distinct;
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
     * @return {number}
     */
    sumCounts(nums: number[]): number {
        const n = nums.length;
        let res = 0;
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                const distinct = new Set(nums.slice(i, j + 1)).size;
                res += distinct * distinct;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n)$

> Where $n$ is the length of the array $nums$.

---

## 2. Hash Set

::tabs-start

```python
class Solution:
    def sumCounts(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0
        for i in range(n):
            seen = set()
            for j in range(i, n):
                seen.add(nums[j])
                res += len(seen) * len(seen)
        return res
```

```java
public class Solution {
    public int sumCounts(List<Integer> nums) {
        int n = nums.size();
        int res = 0;
        for (int i = 0; i < n; i++) {
            Set<Integer> seen = new HashSet<>();
            for (int j = i; j < n; j++) {
                seen.add(nums.get(j));
                res += seen.size() * seen.size();
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int sumCounts(vector<int>& nums) {
        int n = nums.size();
        int res = 0;
        for (int i = 0; i < n; i++) {
            unordered_set<int> seen;
            for (int j = i; j < n; j++) {
                seen.insert(nums[j]);
                int distinct = seen.size();
                res += distinct * distinct;
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
     * @return {number}
     */
    sumCounts(nums) {
        const n = nums.length;
        let res = 0;
        for (let i = 0; i < n; i++) {
            const seen = new Set();
            for (let j = i; j < n; j++) {
                seen.add(nums[j]);
                res += seen.size * seen.size;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int SumCounts(IList<int> nums) {
        int n = nums.Count;
        int res = 0;
        for (int i = 0; i < n; i++) {
            var seen = new HashSet<int>();
            for (int j = i; j < n; j++) {
                seen.Add(nums[j]);
                res += seen.Count * seen.Count;
            }
        }
        return res;
    }
}
```

```go
func sumCounts(nums []int) int {
    n := len(nums)
    res := 0
    for i := 0; i < n; i++ {
        seen := map[int]bool{}
        for j := i; j < n; j++ {
            seen[nums[j]] = true
            res += len(seen) * len(seen)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun sumCounts(nums: List<Int>): Int {
        val n = nums.size
        var res = 0
        for (i in 0 until n) {
            val seen = HashSet<Int>()
            for (j in i until n) {
                seen.add(nums[j])
                res += seen.size * seen.size
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func sumCounts(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = 0
        for i in 0..<n {
            var seen = Set<Int>()
            for j in i..<n {
                seen.insert(nums[j])
                res += seen.count * seen.count
            }
        }
        return res
    }
}
```

```rust
use std::collections::HashSet;

impl Solution {
    pub fn sum_counts(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut res = 0;
        for i in 0..n {
            let mut seen = HashSet::new();
            for j in i..n {
                seen.insert(nums[j]);
                let distinct = seen.len() as i32;
                res += distinct * distinct;
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
     * @return {number}
     */
    sumCounts(nums: number[]): number {
        const n = nums.length;
        let res = 0;
        for (let i = 0; i < n; i++) {
            const seen = new Set<number>();
            for (let j = i; j < n; j++) {
                seen.add(nums[j]);
                res += seen.size * seen.size;
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

## 3. Prefix Contribution

::tabs-start

```python
class Solution:
    def sumCounts(self, nums: List[int]) -> int:
        n = len(nums)
        count = [0] * n
        last = [-1] * 101
        cur = res = 0
        for i in range(n):
            for l in range(last[nums[i]] + 1, i + 1):
                cur += 2 * count[l] + 1
                count[l] += 1
            last[nums[i]] = i
            res += cur
        return res
```

```java
public class Solution {
    public int sumCounts(List<Integer> nums) {
        int n = nums.size();
        int[] count = new int[n];
        int[] last = new int[101];
        Arrays.fill(last, -1);
        int cur = 0, res = 0;
        for (int i = 0; i < n; i++) {
            int num = nums.get(i);
            for (int l = last[num] + 1; l <= i; l++) {
                cur += 2 * count[l] + 1;
                count[l]++;
            }
            last[num] = i;
            res += cur;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int sumCounts(vector<int>& nums) {
        int n = nums.size();
        vector<int> count(n, 0);
        vector<int> last(101, -1);
        int cur = 0, res = 0;
        for (int i = 0; i < n; i++) {
            for (int l = last[nums[i]] + 1; l <= i; l++) {
                cur += 2 * count[l] + 1;
                count[l]++;
            }
            last[nums[i]] = i;
            res += cur;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    sumCounts(nums) {
        const n = nums.length;
        const count = new Array(n).fill(0);
        const last = new Array(101).fill(-1);
        let cur = 0,
            res = 0;
        for (let i = 0; i < n; i++) {
            for (let l = last[nums[i]] + 1; l <= i; l++) {
                cur += 2 * count[l] + 1;
                count[l]++;
            }
            last[nums[i]] = i;
            res += cur;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int SumCounts(IList<int> nums) {
        int n = nums.Count;
        int[] count = new int[n];
        int[] last = new int[101];
        Array.Fill(last, -1);
        int cur = 0, res = 0;
        for (int i = 0; i < n; i++) {
            for (int l = last[nums[i]] + 1; l <= i; l++) {
                cur += 2 * count[l] + 1;
                count[l]++;
            }
            last[nums[i]] = i;
            res += cur;
        }
        return res;
    }
}
```

```go
func sumCounts(nums []int) int {
    n := len(nums)
    count := make([]int, n)
    last := make([]int, 101)
    for i := range last {
        last[i] = -1
    }
    cur, res := 0, 0
    for i := 0; i < n; i++ {
        for l := last[nums[i]] + 1; l <= i; l++ {
            cur += 2*count[l] + 1
            count[l]++
        }
        last[nums[i]] = i
        res += cur
    }
    return res
}
```

```kotlin
class Solution {
    fun sumCounts(nums: List<Int>): Int {
        val n = nums.size
        val count = IntArray(n)
        val last = IntArray(101) { -1 }
        var cur = 0
        var res = 0
        for (i in 0 until n) {
            for (l in last[nums[i]] + 1..i) {
                cur += 2 * count[l] + 1
                count[l]++
            }
            last[nums[i]] = i
            res += cur
        }
        return res
    }
}
```

```swift
class Solution {
    func sumCounts(_ nums: [Int]) -> Int {
        let n = nums.count
        var count = [Int](repeating: 0, count: n)
        var last = [Int](repeating: -1, count: 101)
        var cur = 0
        var res = 0
        for i in 0..<n {
            for l in (last[nums[i]] + 1)...i {
                cur += 2 * count[l] + 1
                count[l] += 1
            }
            last[nums[i]] = i
            res += cur
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn sum_counts(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut count = vec![0; n];
        let mut last = vec![-1i32; 101];
        let mut cur = 0;
        let mut res = 0;
        for i in 0..n {
            let num = nums[i] as usize;
            for l in (last[num] + 1) as usize..=i {
                cur += 2 * count[l] + 1;
                count[l] += 1;
            }
            last[num] = i as i32;
            res += cur;
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    sumCounts(nums: number[]): number {
        const n = nums.length;
        const count: number[] = new Array(n).fill(0);
        const last: number[] = new Array(101).fill(-1);
        let cur = 0,
            res = 0;
        for (let i = 0; i < n; i++) {
            for (let l = last[nums[i]] + 1; l <= i; l++) {
                cur += 2 * count[l] + 1;
                count[l]++;
            }
            last[nums[i]] = i;
            res += cur;
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

## 4. Segment Tree (Lazy Propagation)

::tabs-start

```python
class SegmentTree:
    def __init__(self, N):
        self.n = N
        self.tree = [0] * (4 * N)
        self.lazy = [0] * (4 * N)

    def propagate(self, treeidx, lo, hi):
        if self.lazy[treeidx] != 0:
            self.tree[treeidx] += self.lazy[treeidx] * (hi - lo + 1)
            if lo != hi:
                self.lazy[2 * treeidx + 1] += self.lazy[treeidx]
                self.lazy[2 * treeidx + 2] += self.lazy[treeidx]
            self.lazy[treeidx] = 0

    def update(self, treeidx, lo, hi, left, right, val):
        self.propagate(treeidx, lo, hi)
        if lo > right or hi < left:
            return
        if lo >= left and hi <= right:
            self.lazy[treeidx] += val
            self.propagate(treeidx, lo, hi)
            return
        mid = (lo + hi) // 2
        self.update(2 * treeidx + 1, lo, mid, left, right, val)
        self.update(2 * treeidx + 2, mid + 1, hi, left, right, val)
        self.tree[treeidx] = self.tree[2 * treeidx + 1] + self.tree[2 * treeidx + 2]

    def query(self, treeidx, lo, hi, left, right):
        self.propagate(treeidx, lo, hi)
        if lo > right or hi < left:
            return 0
        if lo >= left and hi <= right:
            return self.tree[treeidx]
        mid = (lo + hi) // 2
        return (self.query(2 * treeidx + 1, lo, mid, left, right) +
                self.query(2 * treeidx + 2, mid + 1, hi, left, right))

    def update_range(self, left, right, val):
        self.update(0, 0, self.n - 1, left, right, val)

    def query_range(self, left, right):
        return self.query(0, 0, self.n - 1, left, right)

class Solution:
    def sumCounts(self, nums: List[int]) -> int:
        n = len(nums)
        segTree = SegmentTree(n)
        last = [-1] * 101
        cur = res = 0
        for i in range(n):
            l = last[nums[i]] + 1
            cur += 2 * segTree.query_range(l, i) + (i - l + 1)
            res += cur
            segTree.update_range(l, i, 1)
            last[nums[i]] = i
        return res
```

```java
class SegmentTree {
    int n;
    int[] tree;
    int[] lazy;

    SegmentTree(int N) {
        this.n = N;
        tree = new int[4 * N];
        lazy = new int[4 * N];
    }

    void propagate(int treeidx, int lo, int hi) {
        if (lazy[treeidx] != 0) {
            tree[treeidx] += lazy[treeidx] * (hi - lo + 1);
            if (lo != hi) {
                lazy[2 * treeidx + 1] += lazy[treeidx];
                lazy[2 * treeidx + 2] += lazy[treeidx];
            }
            lazy[treeidx] = 0;
        }
    }

    void update(int treeidx, int lo, int hi, int left, int right, int val) {
        propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return;
        if (lo >= left && hi <= right) {
            lazy[treeidx] += val;
            propagate(treeidx, lo, hi);
            return;
        }
        int mid = (lo + hi) / 2;
        update(2 * treeidx + 1, lo, mid, left, right, val);
        update(2 * treeidx + 2, mid + 1, hi, left, right, val);
        tree[treeidx] = tree[2 * treeidx + 1] + tree[2 * treeidx + 2];
    }

    int query(int treeidx, int lo, int hi, int left, int right) {
        propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return 0;
        if (lo >= left && hi <= right) return tree[treeidx];
        int mid = (lo + hi) / 2;
        return query(2 * treeidx + 1, lo, mid, left, right) +
               query(2 * treeidx + 2, mid + 1, hi, left, right);
    }

    void update(int left, int right, int val) {
        update(0, 0, n - 1, left, right, val);
    }

    int query(int left, int right) {
        return query(0, 0, n - 1, left, right);
    }
}

public class Solution {
    public int sumCounts(List<Integer> nums) {
        int n = nums.size();
        SegmentTree segTree = new SegmentTree(n);
        int[] last = new int[101];
        Arrays.fill(last, -1);
        int cur = 0, res = 0;
        for (int i = 0; i < n; i++) {
            int num = nums.get(i);
            int l = last[num] + 1;
            cur += 2 * segTree.query(l, i) + (i - l + 1);
            res += cur;
            segTree.update(l, i, 1);
            last[num] = i;
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
    vector<int> lazy;

    SegmentTree(int N) {
        this->n = N;
        tree.assign(4 * N, 0);
        lazy.assign(4 * N, 0);
    }

    void propagate(int treeidx, int lo, int hi) {
        if (lazy[treeidx] != 0) {
            tree[treeidx] += lazy[treeidx] * (hi - lo + 1);
            if (lo != hi) {
                lazy[2 * treeidx + 1] += lazy[treeidx];
                lazy[2 * treeidx + 2] += lazy[treeidx];
            }
            lazy[treeidx] = 0;
        }
    }

    void update(int treeidx, int lo, int hi, int left, int right, int val) {
        propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return;
        if (lo >= left && hi <= right) {
            lazy[treeidx] += val;
            propagate(treeidx, lo, hi);
            return;
        }
        int mid = (lo + hi) / 2;
        update(2 * treeidx + 1, lo, mid, left, right, val);
        update(2 * treeidx + 2, mid + 1, hi, left, right, val);
        tree[treeidx] = tree[2 * treeidx + 1] + tree[2 * treeidx + 2];
    }

    int query(int treeidx, int lo, int hi, int left, int right) {
        propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return 0;
        if (lo >= left && hi <= right) return tree[treeidx];
        int mid = (lo + hi) / 2;
        return query(2 * treeidx + 1, lo, mid, left, right) +
               query(2 * treeidx + 2, mid + 1, hi, left, right);
    }

    void update(int left, int right, int val) {
        update(0, 0, n - 1, left, right, val);
    }

    int query(int left, int right) {
        return query(0, 0, n - 1, left, right);
    }
};

class Solution {
public:
    int sumCounts(vector<int>& nums) {
        int n = nums.size();
        SegmentTree segTree(n);
        vector<int> last(101, -1);
        int cur = 0, res = 0;
        for (int i = 0; i < n; i++) {
            int l = last[nums[i]] + 1;
            cur += 2 * segTree.query(l, i) + (i - l + 1);
            res += cur;
            segTree.update(l, i, 1);
            last[nums[i]] = i;
        }
        return res;
    }
};
```

```javascript
class SegmentTree {
    /**
     * @param {number} N
     */
    constructor(N) {
        this.n = N;
        this.tree = new Array(4 * N).fill(0);
        this.lazy = new Array(4 * N).fill(0);
    }

    /**
     * @param {number} treeidx
     * @param {number} lo
     * @param {number} hi
     * @return {void}
     */
    propagate(treeidx, lo, hi) {
        if (this.lazy[treeidx] !== 0) {
            this.tree[treeidx] += this.lazy[treeidx] * (hi - lo + 1);
            if (lo !== hi) {
                this.lazy[2 * treeidx + 1] += this.lazy[treeidx];
                this.lazy[2 * treeidx + 2] += this.lazy[treeidx];
            }
            this.lazy[treeidx] = 0;
        }
    }

    /**
     * @param {number} treeidx
     * @param {number} lo
     * @param {number} hi
     * @param {number} left
     * @param {number} right
     * @param {number} val
     * @return {void}
     */
    update(treeidx, lo, hi, left, right, val) {
        this.propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return;
        if (lo >= left && hi <= right) {
            this.lazy[treeidx] += val;
            this.propagate(treeidx, lo, hi);
            return;
        }
        const mid = Math.floor((lo + hi) / 2);
        this.update(2 * treeidx + 1, lo, mid, left, right, val);
        this.update(2 * treeidx + 2, mid + 1, hi, left, right, val);
        this.tree[treeidx] =
            this.tree[2 * treeidx + 1] + this.tree[2 * treeidx + 2];
    }

    /**
     * @param {number} treeidx
     * @param {number} lo
     * @param {number} hi
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    query(treeidx, lo, hi, left, right) {
        this.propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return 0;
        if (lo >= left && hi <= right) return this.tree[treeidx];
        const mid = Math.floor((lo + hi) / 2);
        return (
            this.query(2 * treeidx + 1, lo, mid, left, right) +
            this.query(2 * treeidx + 2, mid + 1, hi, left, right)
        );
    }

    /**
     * @param {number} left
     * @param {number} right
     * @param {number} val
     * @return {void}
     */
    updateRange(left, right, val) {
        this.update(0, 0, this.n - 1, left, right, val);
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    queryRange(left, right) {
        return this.query(0, 0, this.n - 1, left, right);
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    sumCounts(nums) {
        const n = nums.length;
        const segTree = new SegmentTree(n);
        const last = new Array(101).fill(-1);
        let cur = 0,
            res = 0;
        for (let i = 0; i < n; i++) {
            const l = last[nums[i]] + 1;
            cur += 2 * segTree.queryRange(l, i) + (i - l + 1);
            res += cur;
            segTree.updateRange(l, i, 1);
            last[nums[i]] = i;
        }
        return res;
    }
}
```

```csharp
public class SegmentTree {
    public int n;
    public int[] tree;
    public int[] lazy;

    public SegmentTree(int N) {
        this.n = N;
        tree = new int[4 * N];
        lazy = new int[4 * N];
    }

    public void Propagate(int treeidx, int lo, int hi) {
        if (lazy[treeidx] != 0) {
            tree[treeidx] += lazy[treeidx] * (hi - lo + 1);
            if (lo != hi) {
                lazy[2 * treeidx + 1] += lazy[treeidx];
                lazy[2 * treeidx + 2] += lazy[treeidx];
            }
            lazy[treeidx] = 0;
        }
    }

    public void Update(int treeidx, int lo, int hi, int left, int right, int val) {
        Propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return;
        if (lo >= left && hi <= right) {
            lazy[treeidx] += val;
            Propagate(treeidx, lo, hi);
            return;
        }
        int mid = (lo + hi) / 2;
        Update(2 * treeidx + 1, lo, mid, left, right, val);
        Update(2 * treeidx + 2, mid + 1, hi, left, right, val);
        tree[treeidx] = tree[2 * treeidx + 1] + tree[2 * treeidx + 2];
    }

    public int Query(int treeidx, int lo, int hi, int left, int right) {
        Propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return 0;
        if (lo >= left && hi <= right) return tree[treeidx];
        int mid = (lo + hi) / 2;
        return Query(2 * treeidx + 1, lo, mid, left, right) +
               Query(2 * treeidx + 2, mid + 1, hi, left, right);
    }

    public void Update(int left, int right, int val) {
        Update(0, 0, n - 1, left, right, val);
    }

    public int Query(int left, int right) {
        return Query(0, 0, n - 1, left, right);
    }
}

public class Solution {
    public int SumCounts(IList<int> nums) {
        int n = nums.Count;
        SegmentTree segTree = new SegmentTree(n);
        int[] last = new int[101];
        Array.Fill(last, -1);
        int cur = 0, res = 0;
        for (int i = 0; i < n; i++) {
            int l = last[nums[i]] + 1;
            cur += 2 * segTree.Query(l, i) + (i - l + 1);
            res += cur;
            segTree.Update(l, i, 1);
            last[nums[i]] = i;
        }
        return res;
    }
}
```

```go
type SegmentTree struct {
    n    int
    tree []int
    lazy []int
}

func NewSegmentTree(n int) *SegmentTree {
    return &SegmentTree{
        n:    n,
        tree: make([]int, 4*n),
        lazy: make([]int, 4*n),
    }
}

func (st *SegmentTree) propagate(treeIdx, lo, hi int) {
    if st.lazy[treeIdx] != 0 {
        st.tree[treeIdx] += st.lazy[treeIdx] * (hi - lo + 1)
        if lo != hi {
            st.lazy[2*treeIdx+1] += st.lazy[treeIdx]
            st.lazy[2*treeIdx+2] += st.lazy[treeIdx]
        }
        st.lazy[treeIdx] = 0
    }
}

func (st *SegmentTree) updateRange(treeIdx, lo, hi, left, right, val int) {
    st.propagate(treeIdx, lo, hi)
    if lo > right || hi < left {
        return
    }
    if lo >= left && hi <= right {
        st.lazy[treeIdx] += val
        st.propagate(treeIdx, lo, hi)
        return
    }
    mid := (lo + hi) / 2
    st.updateRange(2*treeIdx+1, lo, mid, left, right, val)
    st.updateRange(2*treeIdx+2, mid+1, hi, left, right, val)
    st.tree[treeIdx] = st.tree[2*treeIdx+1] + st.tree[2*treeIdx+2]
}

func (st *SegmentTree) queryRange(treeIdx, lo, hi, left, right int) int {
    st.propagate(treeIdx, lo, hi)
    if lo > right || hi < left {
        return 0
    }
    if lo >= left && hi <= right {
        return st.tree[treeIdx]
    }
    mid := (lo + hi) / 2
    return st.queryRange(2*treeIdx+1, lo, mid, left, right) +
        st.queryRange(2*treeIdx+2, mid+1, hi, left, right)
}

func (st *SegmentTree) Update(left, right, val int) {
    st.updateRange(0, 0, st.n-1, left, right, val)
}

func (st *SegmentTree) Query(left, right int) int {
    return st.queryRange(0, 0, st.n-1, left, right)
}

func sumCounts(nums []int) int {
    n := len(nums)
    segTree := NewSegmentTree(n)
    last := make([]int, 101)
    for i := range last {
        last[i] = -1
    }
    cur, res := 0, 0
    for i := 0; i < n; i++ {
        l := last[nums[i]] + 1
        cur += 2*segTree.Query(l, i) + (i - l + 1)
        res += cur
        segTree.Update(l, i, 1)
        last[nums[i]] = i
    }
    return res
}
```

```kotlin
class SegmentTree(private val n: Int) {
    private val tree = IntArray(4 * n)
    private val lazy = IntArray(4 * n)

    private fun propagate(treeIdx: Int, lo: Int, hi: Int) {
        if (lazy[treeIdx] != 0) {
            tree[treeIdx] += lazy[treeIdx] * (hi - lo + 1)
            if (lo != hi) {
                lazy[2 * treeIdx + 1] += lazy[treeIdx]
                lazy[2 * treeIdx + 2] += lazy[treeIdx]
            }
            lazy[treeIdx] = 0
        }
    }

    private fun updateRange(treeIdx: Int, lo: Int, hi: Int, left: Int, right: Int, value: Int) {
        propagate(treeIdx, lo, hi)
        if (lo > right || hi < left) return
        if (lo >= left && hi <= right) {
            lazy[treeIdx] += value
            propagate(treeIdx, lo, hi)
            return
        }
        val mid = (lo + hi) / 2
        updateRange(2 * treeIdx + 1, lo, mid, left, right, value)
        updateRange(2 * treeIdx + 2, mid + 1, hi, left, right, value)
        tree[treeIdx] = tree[2 * treeIdx + 1] + tree[2 * treeIdx + 2]
    }

    private fun queryRange(treeIdx: Int, lo: Int, hi: Int, left: Int, right: Int): Int {
        propagate(treeIdx, lo, hi)
        if (lo > right || hi < left) return 0
        if (lo >= left && hi <= right) return tree[treeIdx]
        val mid = (lo + hi) / 2
        return queryRange(2 * treeIdx + 1, lo, mid, left, right) +
            queryRange(2 * treeIdx + 2, mid + 1, hi, left, right)
    }

    fun update(left: Int, right: Int, value: Int) {
        updateRange(0, 0, n - 1, left, right, value)
    }

    fun query(left: Int, right: Int): Int {
        return queryRange(0, 0, n - 1, left, right)
    }
}

class Solution {
    fun sumCounts(nums: List<Int>): Int {
        val n = nums.size
        val segTree = SegmentTree(n)
        val last = IntArray(101) { -1 }
        var cur = 0
        var res = 0
        for (i in 0 until n) {
            val l = last[nums[i]] + 1
            cur += 2 * segTree.query(l, i) + (i - l + 1)
            res += cur
            segTree.update(l, i, 1)
            last[nums[i]] = i
        }
        return res
    }
}
```

```swift
class SegmentTree {
    let n: Int
    var tree: [Int]
    var lazy: [Int]

    init(_ N: Int) {
        self.n = N
        self.tree = [Int](repeating: 0, count: 4 * N)
        self.lazy = [Int](repeating: 0, count: 4 * N)
    }

    func propagate(_ treeidx: Int, _ lo: Int, _ hi: Int) {
        if lazy[treeidx] != 0 {
            tree[treeidx] += lazy[treeidx] * (hi - lo + 1)
            if lo != hi {
                lazy[2 * treeidx + 1] += lazy[treeidx]
                lazy[2 * treeidx + 2] += lazy[treeidx]
            }
            lazy[treeidx] = 0
        }
    }

    func update(_ treeidx: Int, _ lo: Int, _ hi: Int, _ left: Int, _ right: Int, _ val: Int) {
        propagate(treeidx, lo, hi)
        if lo > right || hi < left {
            return
        }
        if lo >= left && hi <= right {
            lazy[treeidx] += val
            propagate(treeidx, lo, hi)
            return
        }
        let mid = (lo + hi) / 2
        update(2 * treeidx + 1, lo, mid, left, right, val)
        update(2 * treeidx + 2, mid + 1, hi, left, right, val)
        tree[treeidx] = tree[2 * treeidx + 1] + tree[2 * treeidx + 2]
    }

    func query(_ treeidx: Int, _ lo: Int, _ hi: Int, _ left: Int, _ right: Int) -> Int {
        propagate(treeidx, lo, hi)
        if lo > right || hi < left {
            return 0
        }
        if lo >= left && hi <= right {
            return tree[treeidx]
        }
        let mid = (lo + hi) / 2
        return query(2 * treeidx + 1, lo, mid, left, right) +
            query(2 * treeidx + 2, mid + 1, hi, left, right)
    }

    func updateRange(_ left: Int, _ right: Int, _ val: Int) {
        update(0, 0, n - 1, left, right, val)
    }

    func queryRange(_ left: Int, _ right: Int) -> Int {
        return query(0, 0, n - 1, left, right)
    }
}

class Solution {
    func sumCounts(_ nums: [Int]) -> Int {
        let n = nums.count
        let segTree = SegmentTree(n)
        var last = [Int](repeating: -1, count: 101)
        var cur = 0
        var res = 0
        for i in 0..<n {
            let l = last[nums[i]] + 1
            cur += 2 * segTree.queryRange(l, i) + (i - l + 1)
            res += cur
            segTree.updateRange(l, i, 1)
            last[nums[i]] = i
        }
        return res
    }
}
```

```rust
struct SegmentTree {
    n: usize,
    tree: Vec<i32>,
    lazy: Vec<i32>,
}

impl SegmentTree {
    fn new(n: usize) -> Self {
        Self {
            n,
            tree: vec![0; 4 * n],
            lazy: vec![0; 4 * n],
        }
    }

    fn propagate(&mut self, ti: usize, lo: usize, hi: usize) {
        if self.lazy[ti] != 0 {
            self.tree[ti] += self.lazy[ti] * (hi - lo + 1) as i32;
            if lo != hi {
                self.lazy[2 * ti + 1] += self.lazy[ti];
                self.lazy[2 * ti + 2] += self.lazy[ti];
            }
            self.lazy[ti] = 0;
        }
    }

    fn update_inner(&mut self, ti: usize, lo: usize, hi: usize, left: usize, right: usize, val: i32) {
        self.propagate(ti, lo, hi);
        if lo > right || hi < left {
            return;
        }
        if lo >= left && hi <= right {
            self.lazy[ti] += val;
            self.propagate(ti, lo, hi);
            return;
        }
        let mid = (lo + hi) / 2;
        self.update_inner(2 * ti + 1, lo, mid, left, right, val);
        self.update_inner(2 * ti + 2, mid + 1, hi, left, right, val);
        self.tree[ti] = self.tree[2 * ti + 1] + self.tree[2 * ti + 2];
    }

    fn query_inner(&mut self, ti: usize, lo: usize, hi: usize, left: usize, right: usize) -> i32 {
        self.propagate(ti, lo, hi);
        if lo > right || hi < left {
            return 0;
        }
        if lo >= left && hi <= right {
            return self.tree[ti];
        }
        let mid = (lo + hi) / 2;
        self.query_inner(2 * ti + 1, lo, mid, left, right)
            + self.query_inner(2 * ti + 2, mid + 1, hi, left, right)
    }

    fn update(&mut self, left: usize, right: usize, val: i32) {
        let n = self.n;
        self.update_inner(0, 0, n - 1, left, right, val);
    }

    fn query(&mut self, left: usize, right: usize) -> i32 {
        let n = self.n;
        self.query_inner(0, 0, n - 1, left, right)
    }
}

impl Solution {
    pub fn sum_counts(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut seg_tree = SegmentTree::new(n);
        let mut last = vec![-1i32; 101];
        let mut cur = 0;
        let mut res = 0;
        for i in 0..n {
            let num = nums[i] as usize;
            let l = (last[num] + 1) as usize;
            cur += 2 * seg_tree.query(l, i) + (i - l + 1) as i32;
            res += cur;
            seg_tree.update(l, i, 1);
            last[num] = i as i32;
        }
        res
    }
}
```

```typescript
class SegmentTree {
    n: number;
    tree: number[];
    lazy: number[];

    /**
     * @param {number} N
     */
    constructor(N: number) {
        this.n = N;
        this.tree = new Array(4 * N).fill(0);
        this.lazy = new Array(4 * N).fill(0);
    }

    /**
     * @param {number} treeidx
     * @param {number} lo
     * @param {number} hi
     * @return {void}
     */
    propagate(treeidx: number, lo: number, hi: number): void {
        if (this.lazy[treeidx] !== 0) {
            this.tree[treeidx] += this.lazy[treeidx] * (hi - lo + 1);
            if (lo !== hi) {
                this.lazy[2 * treeidx + 1] += this.lazy[treeidx];
                this.lazy[2 * treeidx + 2] += this.lazy[treeidx];
            }
            this.lazy[treeidx] = 0;
        }
    }

    /**
     * @param {number} treeidx
     * @param {number} lo
     * @param {number} hi
     * @param {number} left
     * @param {number} right
     * @param {number} val
     * @return {void}
     */
    update(
        treeidx: number,
        lo: number,
        hi: number,
        left: number,
        right: number,
        val: number,
    ): void {
        this.propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return;
        if (lo >= left && hi <= right) {
            this.lazy[treeidx] += val;
            this.propagate(treeidx, lo, hi);
            return;
        }
        const mid = Math.floor((lo + hi) / 2);
        this.update(2 * treeidx + 1, lo, mid, left, right, val);
        this.update(2 * treeidx + 2, mid + 1, hi, left, right, val);
        this.tree[treeidx] =
            this.tree[2 * treeidx + 1] + this.tree[2 * treeidx + 2];
    }

    /**
     * @param {number} treeidx
     * @param {number} lo
     * @param {number} hi
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    query(
        treeidx: number,
        lo: number,
        hi: number,
        left: number,
        right: number,
    ): number {
        this.propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return 0;
        if (lo >= left && hi <= right) return this.tree[treeidx];
        const mid = Math.floor((lo + hi) / 2);
        return (
            this.query(2 * treeidx + 1, lo, mid, left, right) +
            this.query(2 * treeidx + 2, mid + 1, hi, left, right)
        );
    }

    /**
     * @param {number} left
     * @param {number} right
     * @param {number} val
     * @return {void}
     */
    updateRange(left: number, right: number, val: number): void {
        this.update(0, 0, this.n - 1, left, right, val);
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    queryRange(left: number, right: number): number {
        return this.query(0, 0, this.n - 1, left, right);
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    sumCounts(nums: number[]): number {
        const n = nums.length;
        const segTree = new SegmentTree(n);
        const last: number[] = new Array(101).fill(-1);
        let cur = 0,
            res = 0;
        for (let i = 0; i < n; i++) {
            const l = last[nums[i]] + 1;
            cur += 2 * segTree.queryRange(l, i) + (i - l + 1);
            res += cur;
            segTree.updateRange(l, i, 1);
            last[nums[i]] = i;
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
