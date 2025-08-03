## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        output = []

        for i in range(len(nums) - k + 1):
            maxi = nums[i]
            for j in range(i, i + k):
                maxi = max(maxi, nums[j])
            output.append(maxi)

        return output
```

```java
public class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] output = new int[n - k + 1];

        for (int i = 0; i <= n - k; i++) {
            int maxi = nums[i];
            for (int j = i; j < i + k; j++) {
                maxi = Math.max(maxi, nums[j]);
            }
            output[i] = maxi;
        }

        return output;
    }
}
```

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> output;
        int n = nums.size();

        for (int i = 0; i <= n - k; i++) {
            int maxi = nums[i];
            for (int j = i; j < i + k; j++) {
                maxi = max(maxi, nums[j]);
            }
            output.push_back(maxi);
        }

        return output;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        let output = [];

        for (let i = 0; i <= nums.length - k; i++) {
            let maxi = nums[i];
            for (let j = i; j < i + k; j++) {
                maxi = Math.max(maxi, nums[j]);
            }
            output.push(maxi);
        }

        return output;
    }
}
```

```csharp
public class Solution {
    public int[] MaxSlidingWindow(int[] nums, int k) {
        int n = nums.Length;
        int[] output = new int[n - k + 1];

        for (int i = 0; i <= n - k; i++) {
            int maxi = nums[i];
            for (int j = i; j < i + k; j++) {
                maxi = Math.Max(maxi, nums[j]);
            }
            output[i] = maxi;
        }

        return output;
    }
}
```

```go
func maxSlidingWindow(nums []int, k int) []int {
    output := make([]int, 0, len(nums)-k+1)

    for i := 0; i <= len(nums)-k; i++ {
        maxi := nums[i]
        for j := i; j < i+k; j++ {
            if nums[j] > maxi {
                maxi = nums[j]
            }
        }
        output = append(output, maxi)
    }

    return output
}
```

```kotlin
class Solution {
    fun maxSlidingWindow(nums: IntArray, k: Int): IntArray {
        val output = mutableListOf<Int>()

        for (i in 0..nums.size - k) {
            var maxi = nums[i]
            for (j in i until i + k) {
                maxi = maxOf(maxi, nums[j])
            }
            output.add(maxi)
        }

        return output.toIntArray()
    }
}
```

```swift
class Solution {
    func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
        var output = [Int]()

        for i in 0...(nums.count - k) {
            var maxi = nums[i]
            for j in i..<(i + k) {
                maxi = max(maxi, nums[j])
            }
            output.append(maxi)
        }

        return output
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n - k + 1)$ space for the output array.

> Where $n$ is the length of the array and $k$ is the size of the window.

---

## 2. Segment Tree

::tabs-start

```python
class SegmentTree:
    def __init__(self, N, A):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.build(N, A)

    def build(self, N, A):
        self.tree = [float('-inf')] * (2 * self.n)
        for i in range(N):
            self.tree[self.n + i] = A[i]
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = max(self.tree[i << 1], self.tree[i << 1 | 1])

    def query(self, l, r):
        res = float('-inf')
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
    def maxSlidingWindow(self, nums, k):
        n = len(nums)
        segTree = SegmentTree(n, nums)
        output = []
        for i in range(n - k + 1):
            output.append(segTree.query(i, i + k - 1))
        return output
```

```java
class SegmentTree {
    int n;
    int[] tree;

    SegmentTree(int N, int[] A) {
        this.n = N;
        while (Integer.bitCount(n) != 1) {
            n++;
        }
        build(N, A);
    }

    void build(int N, int[] A) {
        tree = new int[2 * n];
        Arrays.fill(tree, Integer.MIN_VALUE);
        for (int i = 0; i < N; i++) {
            tree[n + i] = A[i];
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = Math.max(tree[i << 1], tree[i << 1 | 1]);
        }
    }

    int query(int l, int r) {
        int res = Integer.MIN_VALUE;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
            if ((l & 1) == 1) res = Math.max(res, tree[l++]);
            if ((r & 1) == 1) res = Math.max(res, tree[--r]);
        }
        return res;
    }
}

public class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        SegmentTree segTree = new SegmentTree(n, nums);
        int[] output = new int[n - k + 1];
        for (int i = 0; i <= n - k; i++) {
            output[i] = segTree.query(i, i + k - 1);
        }
        return output;
    }
}
```

```cpp
class SegmentTree {
public:
    int n;
    vector<int> tree;

    SegmentTree(int N, vector<int>& A) {
        this->n = N;
        while (__builtin_popcount(n) != 1) {
            n++;
        }
        build(N, A);
    }

    void build(int N, vector<int>& A) {
        tree.resize(2 * n, INT_MIN);
        for (int i = 0; i < N; i++) {
            tree[n + i] = A[i];
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = max(tree[i << 1], tree[i << 1 | 1]);
        }
    }

    int query(int l, int r) {
        int res = INT_MIN;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
            if (l & 1) res = max(res, tree[l++]);
            if (r & 1) res = max(res, tree[--r]);
        }
        return res;
    }
};

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int n = nums.size();
        SegmentTree segTree(n, nums);
        vector<int> output;
        for (int i = 0; i <= n - k; i++) {
            output.push_back(segTree.query(i, i + k - 1));
        }
        return output;
    }
};
```

```javascript
class SegmentTree {
    /**
     * @constructor
     * @param {number} N
     * @param {number[]} A
     */
    constructor(N, A) {
        this.n = N;
        while ((this.n & (this.n - 1)) !== 0) {
            this.n++;
        }
        this.build(N, A);
    }

    /**
     * @param {number} N
     * @param {number[]} A
     * @return {void}
     */
    build(N, A) {
        this.tree = new Array(2 * this.n).fill(-Infinity);
        for (let i = 0; i < N; i++) {
            this.tree[this.n + i] = A[i];
        }
        for (let i = this.n - 1; i > 0; i--) {
            this.tree[i] = Math.max(this.tree[i << 1], this.tree[(i << 1) | 1]);
        }
    }

    /**
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    query(l, r) {
        let res = -Infinity;
        l += this.n;
        r += this.n + 1;

        while (l < r) {
            if (l & 1) res = Math.max(res, this.tree[l++]);
            if (r & 1) res = Math.max(res, this.tree[--r]);
            l >>= 1;
            r >>= 1;
        }

        return res;
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        let n = nums.length;
        let segTree = new SegmentTree(n, nums);
        let output = [];

        for (let i = 0; i <= n - k; i++) {
            output.push(segTree.query(i, i + k - 1));
        }

        return output;
    }
}
```

```csharp
public class SegmentTree {
    public int n;
    public int[] tree;

    public SegmentTree(int N, int[] A) {
        this.n = N;
        while (System.Numerics.BitOperations.PopCount((uint)n) != 1) {
            n++;
        }
        Build(N, A);
    }

    public void Build(int N, int[] A) {
        tree = new int[2 * n];
        Array.Fill(tree, int.MinValue);
        for (int i = 0; i < N; i++) {
            tree[n + i] = A[i];
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = Math.Max(tree[i << 1], tree[i << 1 | 1]);
        }
    }

    public int Query(int l, int r) {
        int res = int.MinValue;
        l += n;
        r += n + 1;
        while (l < r) {
            if ((l & 1) == 1) res = Math.Max(res, tree[l++]);
            if ((r & 1) == 1) res = Math.Max(res, tree[--r]);
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int[] MaxSlidingWindow(int[] nums, int k) {
        int n = nums.Length;
        SegmentTree segTree = new SegmentTree(n, nums);
        int[] output = new int[n - k + 1];
        for (int i = 0; i <= n - k; i++) {
            output[i] = segTree.Query(i, i + k - 1);
        }
        return output;
    }
}
```

```go
type SegmentTree struct {
    n    int
    tree []int
}

func NewSegmentTree(N int, A []int) *SegmentTree {
    n := N
    for bits.OnesCount(uint(n)) != 1 {
        n++
    }

    st := &SegmentTree{
        n: n,
    }
    st.build(N, A)
    return st
}

func (st *SegmentTree) build(N int, A []int) {
    st.tree = make([]int, 2*st.n)
    for i := range st.tree {
        st.tree[i] = math.MinInt
    }
    for i := 0; i < N; i++ {
        st.tree[st.n+i] = A[i]
    }
    for i := st.n - 1; i > 0; i-- {
        st.tree[i] = max(st.tree[i<<1], st.tree[i<<1|1])
    }
}

func (st *SegmentTree) Query(l, r int) int {
    res := math.MinInt
    l += st.n
    r += st.n + 1

    for l < r {
        if l&1 == 1 {
            res = max(res, st.tree[l])
            l++
        }
        if r&1 == 1 {
            r--
            res = max(res, st.tree[r])
        }
        l >>= 1
        r >>= 1
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func maxSlidingWindow(nums []int, k int) []int {
    n := len(nums)
    segTree := NewSegmentTree(n, nums)
    output := make([]int, n-k+1)

    for i := 0; i <= n-k; i++ {
        output[i] = segTree.Query(i, i+k-1)
    }

    return output
}
```

```kotlin
class SegmentTree(N: Int, A: IntArray) {
    private var n: Int = N
    private var tree: IntArray = IntArray(0)

    init {
        var size = N
        while (Integer.bitCount(size) != 1) {
            size++
        }
        n = size
        build(N, A)
    }

    private fun build(N: Int, A: IntArray) {
        tree = IntArray(2 * n)
        tree.fill(Int.MIN_VALUE)
        for (i in 0 until N) {
            tree[n + i] = A[i]
        }
        for (i in n - 1 downTo 1) {
            tree[i] = maxOf(tree[i * 2], tree[i * 2 + 1])
        }
    }

    fun query(l: Int, r: Int): Int {
        var res = Int.MIN_VALUE
        var left = l + n
        var right = r + n + 1

        while (left < right) {
            if (left % 2 == 1) {
                res = maxOf(res, tree[left])
                left++
            }
            if (right % 2 == 1) {
                right--
                res = maxOf(res, tree[right])
            }
            left /= 2
            right /= 2
        }
        return res
    }
}

class Solution {
    fun maxSlidingWindow(nums: IntArray, k: Int): IntArray {
        val n = nums.size
        val segTree = SegmentTree(n, nums)
        val result = IntArray(n - k + 1)
        for (i in 0..n - k) {
            result[i] = segTree.query(i, i + k - 1)
        }
        return result
    }
}
```

```swift
class SegmentTree {
    private var n: Int
    private var tree: [Int]

    init(_ N: Int, _ A: [Int]) {
        self.n = N
        while (self.n & (self.n - 1)) != 0 {
            self.n += 1
        }
        self.tree = [Int](repeating: Int.min, count: 2 * self.n)
        build(N, A)
    }

    private func build(_ N: Int, _ A: [Int]) {
        for i in 0..<N {
            tree[n + i] = A[i]
        }
        for i in stride(from: n - 1, through: 1, by: -1) {
            tree[i] = max(tree[i << 1], tree[i << 1 | 1])
        }
    }

    func query(_ l: Int, _ r: Int) -> Int {
        var res = Int.min
        var l = l + n
        var r = r + n + 1
        while l < r {
            if l & 1 != 0 {
                res = max(res, tree[l])
                l += 1
            }
            if r & 1 != 0 {
                r -= 1
                res = max(res, tree[r])
            }
            l >>= 1
            r >>= 1
        }
        return res
    }
}

class Solution {
    func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
        let n = nums.count
        let segTree = SegmentTree(n, nums)
        var output = [Int]()

        for i in 0...(n - k) {
            output.append(segTree.query(i, i + k - 1))
        }

        return output
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Heap

::tabs-start

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        heap = []
        output = []
        for i in range(len(nums)):
            heapq.heappush(heap, (-nums[i], i))
            if i >= k - 1:
                while heap[0][1] <= i - k:
                    heapq.heappop(heap)
                output.append(-heap[0][0])
        return output
```

```java
public class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        int[] output = new int[nums.length - k + 1];
        int idx = 0;
        for (int i = 0; i < nums.length; i++) {
            heap.offer(new int[]{nums[i], i});
            if (i >= k - 1) {
                while (heap.peek()[1] <= i - k) {
                    heap.poll();
                }
                output[idx++] = heap.peek()[0];
            }
        }
        return output;
    }
}
```

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        priority_queue<pair<int, int>> heap;
        vector<int> output;
        for (int i = 0; i < nums.size(); i++) {
            heap.push({nums[i], i});
            if (i >= k - 1) {
                while (heap.top().second <= i - k) {
                    heap.pop();
                }
                output.push_back(heap.top().first);
            }
        }
        return output;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        const heap = new MaxPriorityQueue((x) => x[0]);
        const output = [];
        const length = nums.length;

        for (let i = 0; i < length; i++) {
            heap.enqueue([nums[i], i]);

            if (i >= k - 1) {
                while (heap.front()[1] <= i - k) {
                    heap.dequeue();
                }
                output.push(heap.front()[0]);
            }
        }

        return output;
    }
}
```

```csharp
public class Solution {
    public int[] MaxSlidingWindow(int[] nums, int k) {
        PriorityQueue<(int val, int idx), int> pq = new PriorityQueue<(int val, int idx), int>(
            Comparer<int>.Create((a, b) => b.CompareTo(a))
        );

        int[] output = new int[nums.Length - k + 1];
        int idx = 0;

        for (int i = 0; i < nums.Length; i++) {
            pq.Enqueue((nums[i], i), nums[i]);

            if (i >= k - 1) {
                while (pq.Peek().idx <= i - k) {
                    pq.Dequeue();
                }
                output[idx++] = pq.Peek().val;
            }
        }

        return output;
    }
}
```

```go
func maxSlidingWindow(nums []int, k int) []int {
   heap := priorityqueue.NewWith(func(a, b interface{}) int {
       return b.([2]int)[0] - a.([2]int)[0]
   })

   output := []int{}
   for i := 0; i < len(nums); i++ {
       heap.Enqueue([2]int{nums[i], i})
       if i >= k - 1 {
           peek, _ := heap.Peek()
           for peek.([2]int)[1] <= i - k {
               heap.Dequeue()
               peek, _ = heap.Peek()
           }
           val, _ := heap.Peek()
           output = append(output, val.([2]int)[0])
       }
   }
   return output
}
```

```kotlin
class Solution {
    fun maxSlidingWindow(nums: IntArray, k: Int): IntArray {
        val output = mutableListOf<Int>()
        val heap = PriorityQueue<Pair<Int, Int>>(compareByDescending { it.first })

        for (i in nums.indices) {
            heap.add(Pair(nums[i], i))
            if (i >= k - 1) {
                while (heap.peek().second <= i - k) {
                    heap.poll()
                }
                output.add(heap.peek().first)
            }
        }
        return output.toIntArray()
    }
}
```

```swift
class Solution {
    func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
        var heap = Heap<Item>()
        var output = [Int]()

        for i in 0..<nums.count {
            heap.insert(Item(num: nums[i], index: i))

            if i >= k - 1 {
                while heap.max!.index <= i - k {
                    heap.removeMax()
                }
                output.append(heap.max!.num)
            }
        }
        return output
    }
}

struct Item: Comparable {
    let num: Int
    let index: Int

    static func < (lhs: Item, rhs: Item) -> Bool {
        return lhs.num < rhs.num
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming

::tabs-start

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        leftMax = [0] * n
        rightMax = [0] * n

        leftMax[0] = nums[0]
        rightMax[n - 1] = nums[n - 1]

        for i in range(1, n):
            if i % k == 0:
                leftMax[i] = nums[i]
            else:
                leftMax[i] = max(leftMax[i - 1], nums[i])

            if (n - 1 - i) % k == 0:
                rightMax[n - 1 - i] = nums[n - 1 - i]
            else:
                rightMax[n - 1 - i] = max(rightMax[n - i], nums[n - 1 - i])

        output = [0] * (n - k + 1)

        for i in range(n - k + 1):
            output[i] = max(leftMax[i + k - 1], rightMax[i])

        return output
```

```java
public class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] leftMax = new int[n];
        int[] rightMax = new int[n];

        leftMax[0] = nums[0];
        rightMax[n - 1] = nums[n - 1];

        for (int i = 1; i < n; i++) {
            if (i % k == 0) {
                leftMax[i] = nums[i];
            } else {
                leftMax[i] = Math.max(leftMax[i - 1], nums[i]);
            }

            if ((n - 1 - i) % k == 0) {
                rightMax[n - 1 - i] = nums[n - 1 - i];
            } else {
                rightMax[n - 1 - i] = Math.max(rightMax[n - i], nums[n - 1 - i]);
            }
        }

        int[] output = new int[n - k + 1];

        for (int i = 0; i < n - k + 1; i++) {
            output[i] = Math.max(leftMax[i + k - 1], rightMax[i]);
        }

        return output;
    }
}
```

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> leftMax(n);
        vector<int> rightMax(n);

        leftMax[0] = nums[0];
        rightMax[n - 1] = nums[n - 1];

        for (int i = 1; i < n; i++) {
            if (i % k == 0) {
                leftMax[i] = nums[i];
            } else {
                leftMax[i] = max(leftMax[i - 1], nums[i]);
            }

            if ((n - 1 - i) % k == 0) {
                rightMax[n - 1 - i] = nums[n - 1 - i];
            } else {
                rightMax[n - 1 - i] = max(rightMax[n - i], nums[n - 1 - i]);
            }
        }

        vector<int> output(n - k + 1);

        for (int i = 0; i < n - k + 1; i++) {
            output[i] = max(leftMax[i + k - 1], rightMax[i]);
        }

        return output;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        const n = nums.length;
        const leftMax = new Array(n);
        const rightMax = new Array(n);

        leftMax[0] = nums[0];
        rightMax[n - 1] = nums[n - 1];

        for (let i = 1; i < n; i++) {
            if (i % k === 0) {
                leftMax[i] = nums[i];
            } else {
                leftMax[i] = Math.max(leftMax[i - 1], nums[i]);
            }

            if ((n - 1 - i) % k === 0) {
                rightMax[n - 1 - i] = nums[n - 1 - i];
            } else {
                rightMax[n - 1 - i] = Math.max(
                    rightMax[n - i],
                    nums[n - 1 - i],
                );
            }
        }

        const output = new Array(n - k + 1);

        for (let i = 0; i < n - k + 1; i++) {
            output[i] = Math.max(leftMax[i + k - 1], rightMax[i]);
        }

        return output;
    }
}
```

```csharp
public class Solution {
    public int[] MaxSlidingWindow(int[] nums, int k) {
        int n = nums.Length;
        int[] leftMax = new int[n];
        int[] rightMax = new int[n];

        leftMax[0] = nums[0];
        rightMax[n - 1] = nums[n - 1];

        for (int i = 1; i < n; i++) {
            if (i % k == 0) {
                leftMax[i] = nums[i];
            } else {
                leftMax[i] = Math.Max(leftMax[i - 1], nums[i]);
            }

            if ((n - 1 - i) % k == 0) {
                rightMax[n - 1 - i] = nums[n - 1 - i];
            } else {
                rightMax[n - 1 - i] = Math.Max(rightMax[n - i], nums[n - 1 - i]);
            }
        }

        int[] output = new int[n - k + 1];

        for (int i = 0; i < n - k + 1; i++) {
            output[i] = Math.Max(leftMax[i + k - 1], rightMax[i]);
        }

        return output;
    }
}
```

```go
func maxSlidingWindow(nums []int, k int) []int {
	n := len(nums)
	leftMax := make([]int, n)
	rightMax := make([]int, n)

	leftMax[0] = nums[0]
	rightMax[n-1] = nums[n-1]

	for i := 1; i < n; i++ {
		if i%k == 0 {
			leftMax[i] = nums[i]
		} else {
			leftMax[i] = max(leftMax[i-1], nums[i])
		}
	}

	for i := 1; i < n; i++ {
		if (n-1-i)%k == 0 {
			rightMax[n-1-i] = nums[n-1-i]
		} else {
			rightMax[n-1-i] = max(rightMax[n-i], nums[n-1-i])
		}
	}

	output := make([]int, n-k+1)

	for i := 0; i < n-k+1; i++ {
		output[i] = max(leftMax[i+k-1], rightMax[i])
	}
	return output
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
    fun maxSlidingWindow(nums: IntArray, k: Int): IntArray {
        val n = nums.size
        val leftMax = IntArray(n)
        val rightMax = IntArray(n)

        leftMax[0] = nums[0]
        rightMax[n - 1] = nums[n - 1]

        for (i in 1 until n) {
            if (i % k == 0) {
                leftMax[i] = nums[i]
            } else {
                leftMax[i] = maxOf(leftMax[i - 1], nums[i])
            }

            if ((n - 1 - i) % k == 0) {
                rightMax[n - 1 - i] = nums[n - 1 - i]
            } else {
                rightMax[n - 1 - i] = maxOf(rightMax[n - i], nums[n - 1 - i])
            }
        }

        val output = IntArray(n - k + 1)
        for (i in 0..n - k) {
            output[i] = maxOf(leftMax[i + k - 1], rightMax[i])
        }

        return output
    }
}
```

```swift
class Solution {
    func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
        let n = nums.count
        var leftMax = [Int](repeating: 0, count: n)
        var rightMax = [Int](repeating: 0, count: n)

        leftMax[0] = nums[0]
        rightMax[n - 1] = nums[n - 1]

        for i in 1..<n {
            if i % k == 0 {
                leftMax[i] = nums[i]
            } else {
                leftMax[i] = max(leftMax[i - 1], nums[i])
            }

            if (n - 1 - i) % k == 0 {
                rightMax[n - 1 - i] = nums[n - 1 - i]
            } else {
                rightMax[n - 1 - i] = max(rightMax[n - i], nums[n - 1 - i])
            }
        }

        var output = [Int](repeating: 0, count: n - k + 1)

        for i in 0..<(n - k + 1) {
            output[i] = max(leftMax[i + k - 1], rightMax[i])
        }

        return output
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Deque

::tabs-start

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        output = []
        q = deque()  # index
        l = r = 0

        while r < len(nums):
            while q and nums[q[-1]] < nums[r]:
                q.pop()
            q.append(r)

            if l > q[0]:
                q.popleft()

            if (r + 1) >= k:
                output.append(nums[q[0]])
                l += 1
            r += 1

        return output
```

```java
public class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] output = new int[n - k + 1];
        Deque<Integer> q = new LinkedList<>();
        int l = 0, r = 0;

        while (r < n) {
            while (!q.isEmpty() && nums[q.getLast()] < nums[r]) {
                q.removeLast();
            }
            q.addLast(r);

            if (l > q.getFirst()) {
                q.removeFirst();
            }

            if ((r + 1) >= k) {
                output[l] = nums[q.getFirst()];
                l++;
            }
            r++;
        }

        return output;
    }
}
```

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> output(n - k + 1);
        deque<int> q;
        int l = 0, r = 0;

        while (r < n) {
            while (!q.empty() && nums[q.back()] < nums[r]) {
                q.pop_back();
            }
            q.push_back(r);

            if (l > q.front()) {
                q.pop_front();
            }

            if ((r + 1) >= k) {
                output[l] = nums[q.front()];
                l++;
            }
            r++;
        }

        return output;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        const n = nums.length;
        const output = new Array(n - k + 1);
        const q = new Deque();
        let l = 0,
            r = 0;

        while (r < n) {
            while (q.size() && nums[q.back()] < nums[r]) {
                q.popBack();
            }
            q.pushBack(r);

            if (l > q.front()) {
                q.popFront();
            }

            if (r + 1 >= k) {
                output[l] = nums[q.front()];
                l++;
            }
            r++;
        }

        return output;
    }
}
```

```csharp
public class Solution {
    public int[] MaxSlidingWindow(int[] nums, int k) {
        int n = nums.Length;
        int[] output = new int[n - k + 1];
        var q = new LinkedList<int>();
        int l = 0, r = 0;

        while (r < n) {
            while (q.Count > 0 && nums[q.Last.Value] < nums[r]) {
                q.RemoveLast();
            }
            q.AddLast(r);

            if (l > q.First.Value) {
                q.RemoveFirst();
            }

            if ((r + 1) >= k) {
                output[l] = nums[q.First.Value];
                l++;
            }
            r++;
        }

        return output;
    }
}
```

```go
func maxSlidingWindow(nums []int, k int) []int {
   output := []int{}
   q := []int{}
   l, r := 0, 0

   for r < len(nums) {
       for len(q) > 0 && nums[q[len(q)-1]] < nums[r] {
           q = q[:len(q)-1]
       }
       q = append(q, r)

       if l > q[0] {
           q = q[1:]
       }

       if (r + 1) >= k {
           output = append(output, nums[q[0]])
           l += 1
       }
       r += 1
   }

   return output
}
```

```kotlin
class Solution {
    fun maxSlidingWindow(nums: IntArray, k: Int): IntArray {
        val output = mutableListOf<Int>()
        val q = ArrayDeque<Int>()
        var l = 0
        var r = 0

        while (r < nums.size) {
            while (q.isNotEmpty() && nums[q.last()] < nums[r]) {
                q.removeLast()
            }
            q.addLast(r)

            if (l > q.first()) {
                q.removeFirst()
            }

            if ((r + 1) >= k) {
                output.add(nums[q.first()])
                l += 1
            }
            r += 1
        }

        return output.toIntArray()
    }
}
```

```swift
class Solution {
    func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
        var output = [Int]()
        var deque = [Int]() // Index
        var l = 0, r = 0

        while r < nums.count {
            while !deque.isEmpty && nums[deque.last!] < nums[r] {
                deque.removeLast()
            }
            deque.append(r)

            if l > deque.first! {
                deque.removeFirst()
            }

            if (r + 1) >= k {
                output.append(nums[deque.first!])
                l += 1
            }
            r += 1
        }

        return output
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
