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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * k)$
* Space complexity: $O(1)$

> Where $n$ is the length of the array and $k$ is the size of the window.

---

## 2. Segment Tree

::tabs-start

```python
class SegmentTree:
    def __init__(self, N, a):
        self.n = N
        self.A = a[:]
        while (self.n & (self.n - 1)) != 0:
            self.A.append(float('-inf'))
            self.n += 1
        self.tree = [0] * (2 * self.n)
        self.build()

    def build(self):
        for i in range(self.n):
            self.tree[self.n + i] = self.A[i]
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = max(self.tree[i << 1], self.tree[i << 1 | 1])

    def update(self, i, val):
        self.tree[self.n + i] = val
        j = (self.n + i) >> 1
        while j >= 1:
            self.tree[j] = max(self.tree[j << 1], self.tree[j << 1 | 1])
            j >>= 1

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
public class SegmentTree {
    int n;
    int[] A;
    int[] tree;
    final int NEG_INF = Integer.MIN_VALUE;

    SegmentTree(int N, int[] a) {
        this.n = N;
        while (Integer.bitCount(n) != 1) {
            n++;
        }
        A = new int[n];
        for (int i = 0; i < N; i++) {
            A[i] = a[i];
        }
        for (int i = N; i < n; i++) {
            A[i] = NEG_INF;
        }
        tree = new int[2 * n];
        build();
    }

    void build() {
        for (int i = 0; i < n; i++) {
            tree[n + i] = A[i];
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = Math.max(tree[i << 1], tree[i << 1 | 1]);
        }
    }

    void update(int i, int val) {
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = Math.max(tree[j << 1], tree[j << 1 | 1]);
        }
    }

    int query(int l, int r) {
        int res = NEG_INF;
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
class Segment_tree {
public:
    int n;
    vector<int> A;
    vector<int> tree;
    const int NEG_INF = -1e9;

    Segment_tree(int N, vector<int>& a) {
        this->n = N;
        this->A = a;
        while (__builtin_popcount(n) != 1) {
            A.push_back(NEG_INF);
            n++;
        }
        tree.resize(2 * n);
        build();
    }

    void build() {
        for (int i = 0; i < n; i++) {
            tree[n + i] = A[i];
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = max(tree[i << 1], tree[i << 1 | 1]);
        }
    }

    void update(int i, int val) {
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = max(tree[j << 1], tree[j << 1 | 1]);
        }
    }

    int query(int l, int r) {
        int res = NEG_INF;
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
        Segment_tree segTree(n, nums);
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
     * @param {number[]} a
     */
    constructor(N, a) {
        this.n = N;
        this.A = [...a];
        this.NEG_INF = -Infinity;

        while ((this.n & (this.n - 1)) !== 0) {
            this.A.push(this.NEG_INF);
            this.n++;
        }
        
        this.tree = new Array(2 * this.n).fill(0);
        this.build();
    }

    build() {
        for (let i = 0; i < this.n; i++) {
            this.tree[this.n + i] = this.A[i];
        }
        for (let i = this.n - 1; i > 0; i--) {
            this.tree[i] = Math.max(this.tree[i << 1], this.tree[i << 1 | 1]);
        }
    }

    /**
     * @param {number} i 
     * @param {number} val
     */
    update(i, val) {
        this.tree[this.n + i] = val;
        for (let j = (this.n + i) >> 1; j >= 1; j >>= 1) {
            this.tree[j] = Math.max(this.tree[j << 1], this.tree[j << 1 | 1]);
        }
    }

    /**
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    query(l, r) {
        let res = this.NEG_INF;
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
    public int[] A;
    public int[] tree;
    public const int NEG_INF = int.MinValue;

    public SegmentTree(int N, int[] a) {
        this.n = N;
        while (System.Numerics.BitOperations.PopCount((uint)n) != 1) {
            n++;
        }
        A = new int[n];
        for (int i = 0; i < N; i++) {
            A[i] = a[i];
        }
        for (int i = N; i < n; i++) {
            A[i] = NEG_INF;
        }
        tree = new int[2 * n];
        Build();
    }

    public void Build() {
        for (int i = 0; i < n; i++) {
            tree[n + i] = A[i];
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = Math.Max(tree[i << 1], tree[i << 1 | 1]);
        }
    }

    public void Update(int i, int val) {
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = Math.Max(tree[j << 1], tree[j << 1 | 1]);
        }
    }

    public int Query(int l, int r) {
        int res = NEG_INF;
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

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
        const heap = new MaxPriorityQueue(x => x[0]);
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
        PriorityQueue<(int val, int idx), int> pq = new PriorityQueue<(int val, int idx), int>
        (Comparer<int>.Create((a, b) => b.CompareTo(a)));
        
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

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
                rightMax[n - 1 - i] = Math.max(rightMax[n - i], nums[n - 1 - i]);
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

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
        let l = 0, r = 0;

        while (r < n) {
            while (q.size() && nums[q.back()] < nums[r]) {
                q.popBack();
            }
            q.pushBack(r);

            if (l > q.front()) {
                q.popFront();
            }

            if ((r + 1) >= k) {
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$