## 1. Brute Force (Max-Heap)

::tabs-start

```python
class Solution:
    def minSumSquareDiff(self, nums1: List[int], nums2: List[int], k1: int, k2: int) -> int:
        diffs = [abs(nums1[i] - nums2[i]) for i in range(len(nums1))]
        maxHeap = [-d for d in diffs]
        heapq.heapify(maxHeap)

        k = k1 + k2
        while k > 0 and maxHeap[0] < 0:
            cur = -heapq.heappop(maxHeap)
            cur -= 1
            heapq.heappush(maxHeap, -cur)
            k -= 1

        return sum(d * d for d in maxHeap)
```

```java
public class Solution {
    public long minSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.length;
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int i = 0; i < n; i++) {
            maxHeap.add(Math.abs(nums1[i] - nums2[i]));
        }

        long k = (long) k1 + k2;
        while (k > 0 && maxHeap.peek() > 0) {
            int cur = maxHeap.poll();
            maxHeap.add(cur - 1);
            k--;
        }

        long res = 0;
        for (int d : maxHeap) res += (long) d * d;
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long minSumSquareDiff(vector<int>& nums1, vector<int>& nums2, int k1, int k2) {
        int n = nums1.size();
        priority_queue<int> maxHeap;
        for (int i = 0; i < n; i++) {
            maxHeap.push(abs(nums1[i] - nums2[i]));
        }

        long long k = (long long) k1 + k2;
        while (k > 0 && maxHeap.top() > 0) {
            int cur = maxHeap.top();
            maxHeap.pop();
            maxHeap.push(cur - 1);
            k--;
        }

        long long res = 0;
        while (!maxHeap.empty()) {
            long long d = maxHeap.top();
            maxHeap.pop();
            res += d * d;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k1
     * @param {number} k2
     * @return {number}
     */
    minSumSquareDiff(nums1, nums2, k1, k2) {
        const n = nums1.length;
        const maxHeap = new MaxPriorityQueue();
        for (let i = 0; i < n; i++) {
            maxHeap.enqueue(Math.abs(nums1[i] - nums2[i]));
        }

        let k = k1 + k2;
        while (k > 0 && maxHeap.front() > 0) {
            const cur = maxHeap.dequeue();
            maxHeap.enqueue(cur - 1);
            k--;
        }

        let res = 0;
        while (!maxHeap.isEmpty()) {
            const d = maxHeap.dequeue();
            res += d * d;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long MinSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.Length;
        var maxHeap = new PriorityQueue<int, int>();
        for (int i = 0; i < n; i++) {
            int d = Math.Abs(nums1[i] - nums2[i]);
            maxHeap.Enqueue(d, -d);
        }

        long k = (long) k1 + k2;
        while (k > 0 && maxHeap.Peek() > 0) {
            int cur = maxHeap.Dequeue();
            maxHeap.Enqueue(cur - 1, -(cur - 1));
            k--;
        }

        long res = 0;
        while (maxHeap.Count > 0) {
            int d = maxHeap.Dequeue();
            res += (long) d * d;
        }
        return res;
    }
}
```

```go
type MaxHeap []int

func (h MaxHeap) Len() int            { return len(h) }
func (h MaxHeap) Less(i, j int) bool  { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func minSumSquareDiff(nums1 []int, nums2 []int, k1 int, k2 int) int64 {
    n := len(nums1)
    maxHeap := &MaxHeap{}
    for i := 0; i < n; i++ {
        d := nums1[i] - nums2[i]
        if d < 0 {
            d = -d
        }
        *maxHeap = append(*maxHeap, d)
    }
    heap.Init(maxHeap)

    k := int64(k1) + int64(k2)
    for k > 0 && (*maxHeap)[0] > 0 {
        cur := heap.Pop(maxHeap).(int)
        heap.Push(maxHeap, cur-1)
        k--
    }

    var res int64
    for _, d := range *maxHeap {
        res += int64(d) * int64(d)
    }
    return res
}
```

```kotlin
class Solution {
    fun minSumSquareDiff(nums1: IntArray, nums2: IntArray, k1: Int, k2: Int): Long {
        val n = nums1.size
        val maxHeap = PriorityQueue<Int>(compareByDescending { it })
        for (i in 0 until n) {
            maxHeap.add(Math.abs(nums1[i] - nums2[i]))
        }

        var k = k1.toLong() + k2
        while (k > 0 && maxHeap.peek() > 0) {
            val cur = maxHeap.poll()
            maxHeap.add(cur - 1)
            k--
        }

        var res = 0L
        for (d in maxHeap) res += d.toLong() * d
        return res
    }
}
```

```swift
class Solution {
    func minSumSquareDiff(_ nums1: [Int], _ nums2: [Int], _ k1: Int, _ k2: Int) -> Int {
        let n = nums1.count
        var maxHeap = Heap<Int>(sort: >)
        for i in 0..<n {
            maxHeap.insert(abs(nums1[i] - nums2[i]))
        }

        var k = k1 + k2
        while k > 0, let top = maxHeap.peek(), top > 0 {
            let cur = maxHeap.remove()!
            maxHeap.insert(cur - 1)
            k -= 1
        }

        var res = 0
        while let d = maxHeap.remove() {
            res += d * d
        }
        return res
    }
}

struct Heap<T> {
    var elements: [T] = []
    let sort: (T, T) -> Bool

    init(sort: @escaping (T, T) -> Bool) { self.sort = sort }
    var count: Int { elements.count }
    func peek() -> T? { elements.first }

    mutating func insert(_ value: T) {
        elements.append(value)
        siftUp(from: elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        elements.swapAt(0, elements.count - 1)
        let removed = elements.removeLast()
        if !elements.isEmpty { siftDown(from: 0) }
        return removed
    }

    private mutating func siftUp(from index: Int) {
        var child = index
        var parent = (child - 1) / 2
        while child > 0 && sort(elements[child], elements[parent]) {
            elements.swapAt(child, parent)
            child = parent
            parent = (child - 1) / 2
        }
    }

    private mutating func siftDown(from index: Int) {
        var parent = index
        while true {
            let left = 2 * parent + 1, right = 2 * parent + 2
            var candidate = parent
            if left < count && sort(elements[left], elements[candidate]) { candidate = left }
            if right < count && sort(elements[right], elements[candidate]) { candidate = right }
            if candidate == parent { return }
            elements.swapAt(parent, candidate)
            parent = candidate
        }
    }
}
```

```rust
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_sum_square_diff(nums1: Vec<i32>, nums2: Vec<i32>, k1: i32, k2: i32) -> i64 {
        let mut max_heap: BinaryHeap<i32> = nums1.iter().zip(nums2.iter())
            .map(|(a, b)| (a - b).abs())
            .collect();

        let mut k = (k1 as i64) + (k2 as i64);
        while k > 0 && *max_heap.peek().unwrap() > 0 {
            let cur = max_heap.pop().unwrap();
            max_heap.push(cur - 1);
            k -= 1;
        }

        max_heap.iter().map(|&d| (d as i64) * (d as i64)).sum()
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k1
     * @param {number} k2
     * @return {number}
     */
    minSumSquareDiff(nums1: number[], nums2: number[], k1: number, k2: number): number {
        const n = nums1.length;
        const maxHeap = new MaxPriorityQueue();
        for (let i = 0; i < n; i++) {
            maxHeap.enqueue(Math.abs(nums1[i] - nums2[i]));
        }

        let k = k1 + k2;
        while (k > 0 && maxHeap.front() > 0) {
            const cur = maxHeap.dequeue();
            maxHeap.enqueue(cur - 1);
            k--;
        }

        let res = 0;
        while (!maxHeap.isEmpty()) {
            const d = maxHeap.dequeue();
            res += d * d;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((k_1 + k_2) \log n)$
- Space complexity: $O(n)$

> Where $n$ is the length of `nums1` and `nums2`.

---

## 2. Greedy + Max-Heap (Amortized)

::tabs-start

```python
class Solution:
    def minSumSquareDiff(self, nums1: List[int], nums2: List[int], k1: int, k2: int) -> int:
        K = k1 + k2
        n = len(nums1)
        maxheap = [-abs(nums1[i] - nums2[i]) for i in range(n)]
        if K > -sum(maxheap):
            return 0

        heapq.heapify(maxheap)

        while K > 0:
            curr = -heapq.heappop(maxheap)
            diff = max(K // n, 1)
            heapq.heappush(maxheap, -(curr - diff))
            K -= diff

        return sum(diff * diff for diff in maxheap)
```

```java
public class Solution {
    public long minSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.length;
        long K = (long) k1 + k2;
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        long total = 0;
        for (int i = 0; i < n; i++) {
            int d = Math.abs(nums1[i] - nums2[i]);
            maxHeap.add(d);
            total += d;
        }
        if (K > total) return 0;

        while (K > 0) {
            int curr = maxHeap.poll();
            long cycleGap = Math.max(K / n, 1);
            maxHeap.add((int) (curr - cycleGap));
            K -= cycleGap;
        }

        long res = 0;
        for (int d : maxHeap) res += (long) d * d;
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long minSumSquareDiff(vector<int>& nums1, vector<int>& nums2, int k1, int k2) {
        int n = nums1.size();
        long long K = (long long) k1 + k2;
        priority_queue<int> maxHeap;
        long long total = 0;
        for (int i = 0; i < n; i++) {
            int d = abs(nums1[i] - nums2[i]);
            maxHeap.push(d);
            total += d;
        }
        if (K > total) return 0;

        while (K > 0) {
            int curr = maxHeap.top();
            maxHeap.pop();
            long long cycleGap = max(K / n, 1LL);
            maxHeap.push((int) (curr - cycleGap));
            K -= cycleGap;
        }

        long long res = 0;
        while (!maxHeap.empty()) {
            long long d = maxHeap.top();
            maxHeap.pop();
            res += d * d;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k1
     * @param {number} k2
     * @return {number}
     */
    minSumSquareDiff(nums1, nums2, k1, k2) {
        const n = nums1.length;
        let K = k1 + k2;
        const maxHeap = new MaxPriorityQueue();
        let total = 0;
        for (let i = 0; i < n; i++) {
            const d = Math.abs(nums1[i] - nums2[i]);
            maxHeap.enqueue(d);
            total += d;
        }
        if (K > total) return 0;

        while (K > 0) {
            const curr = maxHeap.dequeue();
            const cycleGap = Math.max(Math.floor(K / n), 1);
            maxHeap.enqueue(curr - cycleGap);
            K -= cycleGap;
        }

        let res = 0;
        while (!maxHeap.isEmpty()) {
            const d = maxHeap.dequeue();
            res += d * d;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long MinSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.Length;
        long K = (long) k1 + k2;
        var maxHeap = new PriorityQueue<int, int>();
        long total = 0;
        for (int i = 0; i < n; i++) {
            int d = Math.Abs(nums1[i] - nums2[i]);
            maxHeap.Enqueue(d, -d);
            total += d;
        }
        if (K > total) return 0;

        while (K > 0) {
            int curr = maxHeap.Dequeue();
            long cycleGap = Math.Max(K / n, 1);
            int next = (int) (curr - cycleGap);
            maxHeap.Enqueue(next, -next);
            K -= cycleGap;
        }

        long res = 0;
        while (maxHeap.Count > 0) {
            int d = maxHeap.Dequeue();
            res += (long) d * d;
        }
        return res;
    }
}
```

```go
func minSumSquareDiff(nums1 []int, nums2 []int, k1 int, k2 int) int64 {
    n := len(nums1)
    K := int64(k1) + int64(k2)
    maxHeap := &MaxHeap{}
    var total int64
    for i := 0; i < n; i++ {
        d := nums1[i] - nums2[i]
        if d < 0 {
            d = -d
        }
        *maxHeap = append(*maxHeap, d)
        total += int64(d)
    }
    heap.Init(maxHeap)
    if K > total {
        return 0
    }

    for K > 0 {
        curr := heap.Pop(maxHeap).(int)
        cycleGap := K / int64(n)
        if cycleGap < 1 {
            cycleGap = 1
        }
        heap.Push(maxHeap, curr-int(cycleGap))
        K -= cycleGap
    }

    var res int64
    for _, d := range *maxHeap {
        res += int64(d) * int64(d)
    }
    return res
}

type MaxHeap []int

func (h MaxHeap) Len() int            { return len(h) }
func (h MaxHeap) Less(i, j int) bool  { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun minSumSquareDiff(nums1: IntArray, nums2: IntArray, k1: Int, k2: Int): Long {
        val n = nums1.size
        var K = k1.toLong() + k2
        val maxHeap = PriorityQueue<Int>(compareByDescending { it })
        var total = 0L
        for (i in 0 until n) {
            val d = Math.abs(nums1[i] - nums2[i])
            maxHeap.add(d)
            total += d
        }
        if (K > total) return 0

        while (K > 0) {
            val curr = maxHeap.poll()
            val cycleGap = maxOf(K / n, 1L)
            maxHeap.add((curr - cycleGap).toInt())
            K -= cycleGap
        }

        var res = 0L
        for (d in maxHeap) res += d.toLong() * d
        return res
    }
}
```

```swift
class Solution {
    func minSumSquareDiff(_ nums1: [Int], _ nums2: [Int], _ k1: Int, _ k2: Int) -> Int {
        let n = nums1.count
        var K = k1 + k2
        var maxHeap = Heap<Int>(sort: >)
        var total = 0
        for i in 0..<n {
            let d = abs(nums1[i] - nums2[i])
            maxHeap.insert(d)
            total += d
        }
        if K > total { return 0 }

        while K > 0 {
            let curr = maxHeap.remove()!
            let cycleGap = max(K / n, 1)
            maxHeap.insert(curr - cycleGap)
            K -= cycleGap
        }

        var res = 0
        while let d = maxHeap.remove() {
            res += d * d
        }
        return res
    }
}

struct Heap<T> {
    var elements: [T] = []
    let sort: (T, T) -> Bool

    init(sort: @escaping (T, T) -> Bool) { self.sort = sort }
    var count: Int { elements.count }
    func peek() -> T? { elements.first }

    mutating func insert(_ value: T) {
        elements.append(value)
        siftUp(from: elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        elements.swapAt(0, elements.count - 1)
        let removed = elements.removeLast()
        if !elements.isEmpty { siftDown(from: 0) }
        return removed
    }

    private mutating func siftUp(from index: Int) {
        var child = index
        var parent = (child - 1) / 2
        while child > 0 && sort(elements[child], elements[parent]) {
            elements.swapAt(child, parent)
            child = parent
            parent = (child - 1) / 2
        }
    }

    private mutating func siftDown(from index: Int) {
        var parent = index
        while true {
            let left = 2 * parent + 1, right = 2 * parent + 2
            var candidate = parent
            if left < count && sort(elements[left], elements[candidate]) { candidate = left }
            if right < count && sort(elements[right], elements[candidate]) { candidate = right }
            if candidate == parent { return }
            elements.swapAt(parent, candidate)
            parent = candidate
        }
    }
}
```

```rust
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_sum_square_diff(nums1: Vec<i32>, nums2: Vec<i32>, k1: i32, k2: i32) -> i64 {
        let n = nums1.len() as i64;
        let diffs: Vec<i32> = nums1.iter().zip(nums2.iter())
            .map(|(a, b)| (a - b).abs())
            .collect();

        let total: i64 = diffs.iter().map(|&d| d as i64).sum();
        let mut k = (k1 as i64) + (k2 as i64);
        if k > total {
            return 0;
        }

        let mut max_heap: BinaryHeap<i32> = diffs.into_iter().collect();
        while k > 0 {
            let curr = max_heap.pop().unwrap();
            let cycle_gap = (k / n).max(1);
            max_heap.push(curr - cycle_gap as i32);
            k -= cycle_gap;
        }

        max_heap.iter().map(|&d| (d as i64) * (d as i64)).sum()
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k1
     * @param {number} k2
     * @return {number}
     */
    minSumSquareDiff(nums1: number[], nums2: number[], k1: number, k2: number): number {
        const n = nums1.length;
        let K = k1 + k2;
        const maxHeap = new MaxPriorityQueue();
        let total = 0;
        for (let i = 0; i < n; i++) {
            const d = Math.abs(nums1[i] - nums2[i]);
            maxHeap.enqueue(d);
            total += d;
        }
        if (K > total) return 0;

        while (K > 0) {
            const curr = maxHeap.dequeue();
            const cycleGap = Math.max(Math.floor(K / n), 1);
            maxHeap.enqueue(curr - cycleGap);
            K -= cycleGap;
        }

        let res = 0;
        while (!maxHeap.isEmpty()) {
            const d = maxHeap.dequeue();
            res += d * d;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log V \log n)$ (amortized)
- Space complexity: $O(n)$

> Where $n$ is the length of `nums1` and `nums2`, and $V$ is the maximum possible value of $|nums1[i] - nums2[i]|$ (up to $10^5$).

---

## 3. Greedy + Max-Heap (Grouped by Count)

::tabs-start

```python
class Solution:
    def minSumSquareDiff(self, nums1: List[int], nums2: List[int], k1: int, k2: int) -> int:
        diffs = [abs(nums1[i] - nums2[i]) for i in range(len(nums1))]

        res = 0
        for num in diffs:
            res += num * num

        k = k1 + k2
        if res <= k:
            return 0

        count = Counter(diffs)
        maxHeap = [(-val, c) for val, c in count.items()]
        heapq.heapify(maxHeap)

        while k > 0 and maxHeap:
            negTop, cnt = heapq.heappop(maxHeap)
            top = -negTop
            nxt = -maxHeap[0][0] if maxHeap else 0

            reducible = cnt * (top - nxt)
            if k >= reducible:
                k -= reducible
                if maxHeap and -maxHeap[0][0] == nxt:
                    _, nxtCnt = heapq.heappop(maxHeap)
                    heapq.heappush(maxHeap, (-nxt, nxtCnt + cnt))
                elif nxt > 0:
                    heapq.heappush(maxHeap, (-nxt, cnt))
            else:
                q, r = divmod(k, cnt)
                newVal = top - q
                if r > 0:
                    heapq.heappush(maxHeap, (-(newVal - 1), r))
                if cnt - r > 0:
                    heapq.heappush(maxHeap, (-newVal, cnt - r))
                k = 0

        total = 0
        for negVal, cnt in maxHeap:
            total += (-negVal) * (-negVal) * cnt
        return total
```

```java
public class Solution {
    public long minSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.length;
        int[] diffs = new int[n];
        long sumSq = 0;
        for (int i = 0; i < n; i++) {
            diffs[i] = Math.abs(nums1[i] - nums2[i]);
            sumSq += (long) diffs[i] * diffs[i];
        }

        long k = (long) k1 + k2;
        if (sumSq <= k) return 0;

        Map<Integer, Integer> count = new HashMap<>();
        for (int d : diffs) count.merge(d, 1, Integer::sum);

        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        for (Map.Entry<Integer, Integer> e : count.entrySet()) {
            maxHeap.add(new int[]{e.getKey(), e.getValue()});
        }

        while (k > 0 && !maxHeap.isEmpty()) {
            int[] top = maxHeap.poll();
            int val = top[0], cnt = top[1];
            int nxt = maxHeap.isEmpty() ? 0 : maxHeap.peek()[0];

            long reducible = (long) cnt * (val - nxt);
            if (k >= reducible) {
                k -= reducible;
                if (!maxHeap.isEmpty() && maxHeap.peek()[0] == nxt) {
                    int[] nxtGroup = maxHeap.poll();
                    maxHeap.add(new int[]{nxt, nxtGroup[1] + cnt});
                } else if (nxt > 0) {
                    maxHeap.add(new int[]{nxt, cnt});
                }
            } else {
                long q = k / cnt, r = k % cnt;
                int newVal = (int) (val - q);
                if (r > 0) maxHeap.add(new int[]{newVal - 1, (int) r});
                if (cnt - r > 0) maxHeap.add(new int[]{newVal, (int) (cnt - r)});
                k = 0;
            }
        }

        long res = 0;
        for (int[] group : maxHeap) res += (long) group[0] * group[0] * group[1];
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long minSumSquareDiff(vector<int>& nums1, vector<int>& nums2, int k1, int k2) {
        int n = nums1.size();
        vector<int> diffs(n);
        long long sumSq = 0;
        for (int i = 0; i < n; i++) {
            diffs[i] = abs(nums1[i] - nums2[i]);
            sumSq += (long long) diffs[i] * diffs[i];
        }

        long long k = (long long) k1 + k2;
        if (sumSq <= k) return 0;

        unordered_map<int, long long> count;
        for (int d : diffs) count[d]++;

        priority_queue<pair<int, long long>> maxHeap;
        for (auto& [val, cnt] : count) maxHeap.push({val, cnt});

        while (k > 0 && !maxHeap.empty()) {
            auto [val, cnt] = maxHeap.top();
            maxHeap.pop();
            int nxt = maxHeap.empty() ? 0 : maxHeap.top().first;

            long long reducible = cnt * (long long) (val - nxt);
            if (k >= reducible) {
                k -= reducible;
                if (!maxHeap.empty() && maxHeap.top().first == nxt) {
                    auto nxtGroup = maxHeap.top();
                    maxHeap.pop();
                    maxHeap.push({nxt, nxtGroup.second + cnt});
                } else if (nxt > 0) {
                    maxHeap.push({nxt, cnt});
                }
            } else {
                long long q = k / cnt, r = k % cnt;
                int newVal = (int) (val - q);
                if (r > 0) maxHeap.push({newVal - 1, r});
                if (cnt - r > 0) maxHeap.push({newVal, cnt - r});
                k = 0;
            }
        }

        long long res = 0;
        while (!maxHeap.empty()) {
            auto [val, cnt] = maxHeap.top();
            maxHeap.pop();
            res += (long long) val * val * cnt;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k1
     * @param {number} k2
     * @return {number}
     */
    minSumSquareDiff(nums1, nums2, k1, k2) {
        const n = nums1.length;
        const diffs = [];
        let sumSq = 0;
        for (let i = 0; i < n; i++) {
            const d = Math.abs(nums1[i] - nums2[i]);
            diffs.push(d);
            sumSq += d * d;
        }

        let k = k1 + k2;
        if (sumSq <= k) return 0;

        const count = new Map();
        for (const d of diffs) count.set(d, (count.get(d) || 0) + 1);

        const maxHeap = new MaxPriorityQueue((x) => x[0]);
        for (const [val, cnt] of count) maxHeap.enqueue([val, cnt]);

        while (k > 0 && !maxHeap.isEmpty()) {
            const [top, cnt] = maxHeap.dequeue();
            const nxt = maxHeap.isEmpty() ? 0 : maxHeap.front()[0];

            const reducible = cnt * (top - nxt);
            if (k >= reducible) {
                k -= reducible;
                if (!maxHeap.isEmpty() && maxHeap.front()[0] === nxt) {
                    const [, nxtCnt] = maxHeap.dequeue();
                    maxHeap.enqueue([nxt, nxtCnt + cnt]);
                } else if (nxt > 0) {
                    maxHeap.enqueue([nxt, cnt]);
                }
            } else {
                const q = Math.floor(k / cnt), r = k % cnt;
                const newVal = top - q;
                if (r > 0) maxHeap.enqueue([newVal - 1, r]);
                if (cnt - r > 0) maxHeap.enqueue([newVal, cnt - r]);
                k = 0;
            }
        }

        let res = 0;
        while (!maxHeap.isEmpty()) {
            const [val, cnt] = maxHeap.dequeue();
            res += val * val * cnt;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long MinSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.Length;
        int[] diffs = new int[n];
        long sumSq = 0;
        for (int i = 0; i < n; i++) {
            diffs[i] = Math.Abs(nums1[i] - nums2[i]);
            sumSq += (long) diffs[i] * diffs[i];
        }

        long k = (long) k1 + k2;
        if (sumSq <= k) return 0;

        var count = new Dictionary<int, long>();
        foreach (int d in diffs) {
            count[d] = count.GetValueOrDefault(d, 0) + 1;
        }

        var maxHeap = new PriorityQueue<(int val, long cnt), int>();
        foreach (var (val, cnt) in count) {
            maxHeap.Enqueue((val, cnt), -val);
        }

        while (k > 0 && maxHeap.Count > 0) {
            var (top, cnt) = maxHeap.Dequeue();
            int nxt = maxHeap.Count > 0 ? maxHeap.Peek().val : 0;

            long reducible = cnt * (top - nxt);
            if (k >= reducible) {
                k -= reducible;
                if (maxHeap.Count > 0 && maxHeap.Peek().val == nxt) {
                    var nxtGroup = maxHeap.Dequeue();
                    maxHeap.Enqueue((nxt, nxtGroup.cnt + cnt), -nxt);
                } else if (nxt > 0) {
                    maxHeap.Enqueue((nxt, cnt), -nxt);
                }
            } else {
                long q = k / cnt, r = k % cnt;
                int newVal = (int) (top - q);
                if (r > 0) maxHeap.Enqueue((newVal - 1, r), -(newVal - 1));
                if (cnt - r > 0) maxHeap.Enqueue((newVal, cnt - r), -newVal);
                k = 0;
            }
        }

        long res = 0;
        while (maxHeap.Count > 0) {
            var (val, cnt) = maxHeap.Dequeue();
            res += (long) val * val * cnt;
        }
        return res;
    }
}
```

```go
type Group struct {
    val, cnt int
}

type MaxHeap []Group

func (h MaxHeap) Len() int            { return len(h) }
func (h MaxHeap) Less(i, j int) bool  { return h[i].val > h[j].val }
func (h MaxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(Group)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func minSumSquareDiff(nums1 []int, nums2 []int, k1 int, k2 int) int64 {
    n := len(nums1)
    diffs := make([]int, n)
    var sumSq int64
    for i := 0; i < n; i++ {
        d := nums1[i] - nums2[i]
        if d < 0 {
            d = -d
        }
        diffs[i] = d
        sumSq += int64(d) * int64(d)
    }

    k := int64(k1) + int64(k2)
    if sumSq <= k {
        return 0
    }

    count := make(map[int]int)
    for _, d := range diffs {
        count[d]++
    }

    maxHeap := &MaxHeap{}
    for val, cnt := range count {
        *maxHeap = append(*maxHeap, Group{val, cnt})
    }
    heap.Init(maxHeap)

    for k > 0 && maxHeap.Len() > 0 {
        top := heap.Pop(maxHeap).(Group)
        nxt := 0
        if maxHeap.Len() > 0 {
            nxt = (*maxHeap)[0].val
        }

        reducible := int64(top.cnt) * int64(top.val-nxt)
        if k >= reducible {
            k -= reducible
            if maxHeap.Len() > 0 && (*maxHeap)[0].val == nxt {
                nxtGroup := heap.Pop(maxHeap).(Group)
                heap.Push(maxHeap, Group{nxt, nxtGroup.cnt + top.cnt})
            } else if nxt > 0 {
                heap.Push(maxHeap, Group{nxt, top.cnt})
            }
        } else {
            q := k / int64(top.cnt)
            r := k % int64(top.cnt)
            newVal := top.val - int(q)
            if r > 0 {
                heap.Push(maxHeap, Group{newVal - 1, int(r)})
            }
            if int64(top.cnt)-r > 0 {
                heap.Push(maxHeap, Group{newVal, top.cnt - int(r)})
            }
            k = 0
        }
    }

    var res int64
    for _, g := range *maxHeap {
        res += int64(g.val) * int64(g.val) * int64(g.cnt)
    }
    return res
}
```

```kotlin
class Solution {
    fun minSumSquareDiff(nums1: IntArray, nums2: IntArray, k1: Int, k2: Int): Long {
        val n = nums1.size
        val diffs = IntArray(n)
        var sumSq = 0L
        for (i in 0 until n) {
            diffs[i] = Math.abs(nums1[i] - nums2[i])
            sumSq += diffs[i].toLong() * diffs[i]
        }

        var k = k1.toLong() + k2
        if (sumSq <= k) return 0

        val count = HashMap<Int, Long>()
        for (d in diffs) count[d] = (count[d] ?: 0) + 1

        val maxHeap = PriorityQueue<IntArray> { a, b -> b[0] - a[0] }
        for ((v, c) in count) maxHeap.add(intArrayOf(v, c.toInt()))

        while (k > 0 && maxHeap.isNotEmpty()) {
            val (topVal, topCnt) = maxHeap.poll()
            val nxt = if (maxHeap.isNotEmpty()) maxHeap.peek()[0] else 0

            val reducible = topCnt.toLong() * (topVal - nxt)
            if (k >= reducible) {
                k -= reducible
                if (maxHeap.isNotEmpty() && maxHeap.peek()[0] == nxt) {
                    val nxtGroup = maxHeap.poll()
                    maxHeap.add(intArrayOf(nxt, nxtGroup[1] + topCnt))
                } else if (nxt > 0) {
                    maxHeap.add(intArrayOf(nxt, topCnt))
                }
            } else {
                val q = k / topCnt
                val r = k % topCnt
                val newVal = topVal - q.toInt()
                if (r > 0) maxHeap.add(intArrayOf(newVal - 1, r.toInt()))
                if (topCnt - r > 0) maxHeap.add(intArrayOf(newVal, (topCnt - r).toInt()))
                k = 0
            }
        }

        var res = 0L
        for (group in maxHeap) res += group[0].toLong() * group[0] * group[1]
        return res
    }
}
```

```swift
class Solution {
    func minSumSquareDiff(_ nums1: [Int], _ nums2: [Int], _ k1: Int, _ k2: Int) -> Int {
        let n = nums1.count
        var diffs = [Int](repeating: 0, count: n)
        var sumSq = 0
        for i in 0..<n {
            diffs[i] = abs(nums1[i] - nums2[i])
            sumSq += diffs[i] * diffs[i]
        }

        var k = k1 + k2
        if sumSq <= k { return 0 }

        var count = [Int: Int]()
        for d in diffs { count[d, default: 0] += 1 }

        var maxHeap = Heap<(val: Int, cnt: Int)>(sort: { $0.val > $1.val })
        for (val, cnt) in count { maxHeap.insert((val, cnt)) }

        while k > 0 && maxHeap.count > 0 {
            let top = maxHeap.remove()!
            let nxt = maxHeap.peek()?.val ?? 0

            let reducible = top.cnt * (top.val - nxt)
            if k >= reducible {
                k -= reducible
                if maxHeap.peek()?.val == nxt {
                    let nxtGroup = maxHeap.remove()!
                    maxHeap.insert((nxt, nxtGroup.cnt + top.cnt))
                } else if nxt > 0 {
                    maxHeap.insert((nxt, top.cnt))
                }
            } else {
                let q = k / top.cnt, r = k % top.cnt
                let newVal = top.val - q
                if r > 0 { maxHeap.insert((newVal - 1, r)) }
                if top.cnt - r > 0 { maxHeap.insert((newVal, top.cnt - r)) }
                k = 0
            }
        }

        var res = 0
        while let group = maxHeap.remove() {
            res += group.val * group.val * group.cnt
        }
        return res
    }
}

struct Heap<T> {
    var elements: [T] = []
    let sort: (T, T) -> Bool

    init(sort: @escaping (T, T) -> Bool) { self.sort = sort }
    var count: Int { elements.count }
    func peek() -> T? { elements.first }

    mutating func insert(_ value: T) {
        elements.append(value)
        siftUp(from: elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        elements.swapAt(0, elements.count - 1)
        let removed = elements.removeLast()
        if !elements.isEmpty { siftDown(from: 0) }
        return removed
    }

    private mutating func siftUp(from index: Int) {
        var child = index
        var parent = (child - 1) / 2
        while child > 0 && sort(elements[child], elements[parent]) {
            elements.swapAt(child, parent)
            child = parent
            parent = (child - 1) / 2
        }
    }

    private mutating func siftDown(from index: Int) {
        var parent = index
        while true {
            let left = 2 * parent + 1, right = 2 * parent + 2
            var candidate = parent
            if left < count && sort(elements[left], elements[candidate]) { candidate = left }
            if right < count && sort(elements[right], elements[candidate]) { candidate = right }
            if candidate == parent { return }
            elements.swapAt(parent, candidate)
            parent = candidate
        }
    }
}
```

```rust
use std::collections::{BinaryHeap, HashMap};

impl Solution {
    pub fn min_sum_square_diff(nums1: Vec<i32>, nums2: Vec<i32>, k1: i32, k2: i32) -> i64 {
        let diffs: Vec<i32> = nums1.iter().zip(nums2.iter())
            .map(|(a, b)| (a - b).abs())
            .collect();

        let sum_sq: i64 = diffs.iter().map(|&d| (d as i64) * (d as i64)).sum();
        let mut k = (k1 as i64) + (k2 as i64);
        if sum_sq <= k {
            return 0;
        }

        let mut count: HashMap<i32, i64> = HashMap::new();
        for &d in &diffs {
            *count.entry(d).or_insert(0) += 1;
        }

        let mut max_heap: BinaryHeap<(i32, i64)> = count.into_iter().collect();

        while k > 0 && !max_heap.is_empty() {
            let (top, cnt) = max_heap.pop().unwrap();
            let nxt = max_heap.peek().map(|&(v, _)| v).unwrap_or(0);

            let reducible = cnt * (top - nxt) as i64;
            if k >= reducible {
                k -= reducible;
                if max_heap.peek().map(|&(v, _)| v) == Some(nxt) {
                    let (_, nxt_cnt) = max_heap.pop().unwrap();
                    max_heap.push((nxt, nxt_cnt + cnt));
                } else if nxt > 0 {
                    max_heap.push((nxt, cnt));
                }
            } else {
                let q = k / cnt;
                let r = k % cnt;
                let new_val = top - q as i32;
                if r > 0 {
                    max_heap.push((new_val - 1, r));
                }
                if cnt - r > 0 {
                    max_heap.push((new_val, cnt - r));
                }
                k = 0;
            }
        }

        max_heap.iter().map(|&(v, c)| (v as i64) * (v as i64) * c).sum()
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k1
     * @param {number} k2
     * @return {number}
     */
    minSumSquareDiff(nums1: number[], nums2: number[], k1: number, k2: number): number {
        const n = nums1.length;
        const diffs: number[] = [];
        let sumSq = 0;
        for (let i = 0; i < n; i++) {
            const d = Math.abs(nums1[i] - nums2[i]);
            diffs.push(d);
            sumSq += d * d;
        }

        let k = k1 + k2;
        if (sumSq <= k) return 0;

        const count = new Map<number, number>();
        for (const d of diffs) count.set(d, (count.get(d) || 0) + 1);

        const maxHeap = new MaxPriorityQueue((x: number[]) => x[0]);
        for (const [val, cnt] of count) maxHeap.enqueue([val, cnt]);

        while (k > 0 && !maxHeap.isEmpty()) {
            const [top, cnt] = maxHeap.dequeue();
            const nxt = maxHeap.isEmpty() ? 0 : maxHeap.front()[0];

            const reducible = cnt * (top - nxt);
            if (k >= reducible) {
                k -= reducible;
                if (!maxHeap.isEmpty() && maxHeap.front()[0] === nxt) {
                    const [, nxtCnt] = maxHeap.dequeue();
                    maxHeap.enqueue([nxt, nxtCnt + cnt]);
                } else if (nxt > 0) {
                    maxHeap.enqueue([nxt, cnt]);
                }
            } else {
                const q = Math.floor(k / cnt), r = k % cnt;
                const newVal = top - q;
                if (r > 0) maxHeap.enqueue([newVal - 1, r]);
                if (cnt - r > 0) maxHeap.enqueue([newVal, cnt - r]);
                k = 0;
            }
        }

        let res = 0;
        while (!maxHeap.isEmpty()) {
            const [val, cnt] = maxHeap.dequeue();
            res += val * val * cnt;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

> Where $n$ is the length of `nums1` and `nums2`.

---

## 4. Greedy + Sorting

::tabs-start

```python
class Solution:
    def minSumSquareDiff(self, nums1: List[int], nums2: List[int], k1: int, k2: int) -> int:
        diffs = sorted((abs(a - b) for a, b in zip(nums1, nums2)), reverse=True)
        diffs.append(0)
        n = len(diffs) - 1
        k = k1 + k2

        res = 0
        i = 0
        carry = 0
        while i < n:
            j = i
            while j < n and diffs[j] == diffs[i]:
                j += 1
            cnt = (j - i) + carry
            nxt = diffs[j]
            cost = cnt * (diffs[i] - nxt)

            if k >= cost:
                k -= cost
                carry = cnt
                i = j
            else:
                q, r = divmod(k, cnt)
                res += r * (diffs[i] - q - 1) ** 2
                res += (cnt - r) * (diffs[i] - q) ** 2
                i = j
                break

        for d in diffs[i:n]:
            res += d * d

        return res
```

```java
public class Solution {
    public long minSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.length;
        Integer[] diffs = new Integer[n + 1];
        for (int i = 0; i < n; i++) diffs[i] = Math.abs(nums1[i] - nums2[i]);
        diffs[n] = 0;
        Arrays.sort(diffs, Collections.reverseOrder());

        long k = (long) k1 + k2;
        long res = 0;
        int i = 0;
        long carry = 0;

        while (i < n) {
            int j = i;
            while (j < n && diffs[j].equals(diffs[i])) j++;
            long cnt = (j - i) + carry;
            int nxt = diffs[j];
            long cost = cnt * (diffs[i] - nxt);

            if (k >= cost) {
                k -= cost;
                carry = cnt;
                i = j;
            } else {
                long q = k / cnt, r = k % cnt;
                res += r * (long) (diffs[i] - q - 1) * (diffs[i] - q - 1);
                res += (cnt - r) * (long) (diffs[i] - q) * (diffs[i] - q);
                i = j;
                break;
            }
        }

        for (int idx = i; idx < n; idx++) res += (long) diffs[idx] * diffs[idx];
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long minSumSquareDiff(vector<int>& nums1, vector<int>& nums2, int k1, int k2) {
        int n = nums1.size();
        vector<int> diffs(n);
        for (int i = 0; i < n; i++) diffs[i] = abs(nums1[i] - nums2[i]);
        sort(diffs.rbegin(), diffs.rend());
        diffs.push_back(0);

        long long k = (long long) k1 + k2;
        long long res = 0;
        int i = 0;
        long long carry = 0;

        while (i < n) {
            int j = i;
            while (j < n && diffs[j] == diffs[i]) j++;
            long long cnt = (j - i) + carry;
            int nxt = diffs[j];
            long long cost = cnt * (long long) (diffs[i] - nxt);

            if (k >= cost) {
                k -= cost;
                carry = cnt;
                i = j;
            } else {
                long long q = k / cnt, r = k % cnt;
                res += r * (long long) (diffs[i] - q - 1) * (diffs[i] - q - 1);
                res += (cnt - r) * (long long) (diffs[i] - q) * (diffs[i] - q);
                i = j;
                break;
            }
        }

        for (int idx = i; idx < n; idx++) res += (long long) diffs[idx] * diffs[idx];
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k1
     * @param {number} k2
     * @return {number}
     */
    minSumSquareDiff(nums1, nums2, k1, k2) {
        const n = nums1.length;
        const diffs = nums1.map((a, i) => Math.abs(a - nums2[i]));
        diffs.sort((a, b) => b - a);
        diffs.push(0);

        let k = k1 + k2;
        let res = 0;
        let i = 0,
            carry = 0;

        while (i < n) {
            let j = i;
            while (j < n && diffs[j] === diffs[i]) j++;
            const cnt = j - i + carry;
            const nxt = diffs[j];
            const cost = cnt * (diffs[i] - nxt);

            if (k >= cost) {
                k -= cost;
                carry = cnt;
                i = j;
            } else {
                const q = Math.floor(k / cnt),
                    r = k % cnt;
                res += r * (diffs[i] - q - 1) ** 2;
                res += (cnt - r) * (diffs[i] - q) ** 2;
                i = j;
                break;
            }
        }

        for (let idx = i; idx < n; idx++) res += diffs[idx] * diffs[idx];
        return res;
    }
}
```

```csharp
public class Solution {
    public long MinSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.Length;
        int[] diffs = new int[n + 1];
        for (int idx = 0; idx < n; idx++) diffs[idx] = Math.Abs(nums1[idx] - nums2[idx]);
        diffs[n] = 0;
        Array.Sort(diffs);
        Array.Reverse(diffs);

        long k = (long) k1 + k2;
        long res = 0;
        int i = 0;
        long carry = 0;

        while (i < n) {
            int j = i;
            while (j < n && diffs[j] == diffs[i]) j++;
            long cnt = (j - i) + carry;
            int nxt = diffs[j];
            long cost = cnt * (long) (diffs[i] - nxt);

            if (k >= cost) {
                k -= cost;
                carry = cnt;
                i = j;
            } else {
                long q = k / cnt, r = k % cnt;
                res += r * (long) (diffs[i] - q - 1) * (diffs[i] - q - 1);
                res += (cnt - r) * (long) (diffs[i] - q) * (diffs[i] - q);
                i = j;
                break;
            }
        }

        for (int idx = i; idx < n; idx++) res += (long) diffs[idx] * diffs[idx];
        return res;
    }
}
```

```go
func minSumSquareDiff(nums1 []int, nums2 []int, k1 int, k2 int) int64 {
    n := len(nums1)
    diffs := make([]int, n+1)
    for i := 0; i < n; i++ {
        d := nums1[i] - nums2[i]
        if d < 0 {
            d = -d
        }
        diffs[i] = d
    }
    diffs[n] = 0
    sort.Sort(sort.Reverse(sort.IntSlice(diffs)))

    k := int64(k1) + int64(k2)
    var res int64
    i := 0
    var carry int64

    for i < n {
        j := i
        for j < n && diffs[j] == diffs[i] {
            j++
        }
        cnt := int64(j-i) + carry
        nxt := diffs[j]
        cost := cnt * int64(diffs[i]-nxt)

        if k >= cost {
            k -= cost
            carry = cnt
            i = j
        } else {
            q := k / cnt
            r := k % cnt
            res += r * int64(diffs[i]-int(q)-1) * int64(diffs[i]-int(q)-1)
            res += (cnt - r) * int64(diffs[i]-int(q)) * int64(diffs[i]-int(q))
            i = j
            break
        }
    }

    for idx := i; idx < n; idx++ {
        res += int64(diffs[idx]) * int64(diffs[idx])
    }
    return res
}
```

```kotlin
class Solution {
    fun minSumSquareDiff(nums1: IntArray, nums2: IntArray, k1: Int, k2: Int): Long {
        val n = nums1.size
        val diffs = IntArray(n + 1)
        for (i in 0 until n) diffs[i] = Math.abs(nums1[i] - nums2[i])
        diffs[n] = 0
        diffs.sortDescending()

        var k = k1.toLong() + k2
        var res = 0L
        var i = 0
        var carry = 0L

        while (i < n) {
            var j = i
            while (j < n && diffs[j] == diffs[i]) j++
            val cnt = (j - i) + carry
            val nxt = diffs[j]
            val cost = cnt * (diffs[i] - nxt)

            if (k >= cost) {
                k -= cost
                carry = cnt
                i = j
            } else {
                val q = k / cnt
                val r = k % cnt
                res += r * (diffs[i] - q - 1) * (diffs[i] - q - 1)
                res += (cnt - r) * (diffs[i] - q) * (diffs[i] - q)
                i = j
                break
            }
        }

        for (idx in i until n) res += diffs[idx].toLong() * diffs[idx]
        return res
    }
}
```

```swift
class Solution {
    func minSumSquareDiff(_ nums1: [Int], _ nums2: [Int], _ k1: Int, _ k2: Int) -> Int {
        let n = nums1.count
        var diffs = (0..<n).map { abs(nums1[$0] - nums2[$0]) }
        diffs.sort(by: >)
        diffs.append(0)

        var k = k1 + k2
        var res = 0
        var i = 0
        var carry = 0

        while i < n {
            var j = i
            while j < n && diffs[j] == diffs[i] { j += 1 }
            let cnt = (j - i) + carry
            let nxt = diffs[j]
            let cost = cnt * (diffs[i] - nxt)

            if k >= cost {
                k -= cost
                carry = cnt
                i = j
            } else {
                let q = k / cnt, r = k % cnt
                res += r * (diffs[i] - q - 1) * (diffs[i] - q - 1)
                res += (cnt - r) * (diffs[i] - q) * (diffs[i] - q)
                i = j
                break
            }
        }

        for idx in i..<n { res += diffs[idx] * diffs[idx] }
        return res
    }
}
```

```rust
impl Solution {
    pub fn min_sum_square_diff(nums1: Vec<i32>, nums2: Vec<i32>, k1: i32, k2: i32) -> i64 {
        let n = nums1.len();
        let mut diffs: Vec<i64> = nums1.iter().zip(nums2.iter())
            .map(|(a, b)| (a - b).abs() as i64)
            .collect();
        diffs.sort_unstable_by(|a, b| b.cmp(a));
        diffs.push(0);

        let mut k = (k1 as i64) + (k2 as i64);
        let mut res: i64 = 0;
        let mut i = 0;
        let mut carry: i64 = 0;

        while i < n {
            let mut j = i;
            while j < n && diffs[j] == diffs[i] {
                j += 1;
            }
            let cnt = (j - i) as i64 + carry;
            let nxt = diffs[j];
            let cost = cnt * (diffs[i] - nxt);

            if k >= cost {
                k -= cost;
                carry = cnt;
                i = j;
            } else {
                let q = k / cnt;
                let r = k % cnt;
                res += r * (diffs[i] - q - 1) * (diffs[i] - q - 1);
                res += (cnt - r) * (diffs[i] - q) * (diffs[i] - q);
                i = j;
                break;
            }
        }

        for idx in i..n {
            res += diffs[idx] * diffs[idx];
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k1
     * @param {number} k2
     * @return {number}
     */
    minSumSquareDiff(nums1: number[], nums2: number[], k1: number, k2: number): number {
        const n = nums1.length;
        const diffs = nums1.map((a, i) => Math.abs(a - nums2[i]));
        diffs.sort((a, b) => b - a);
        diffs.push(0);

        let k = k1 + k2;
        let res = 0;
        let i = 0,
            carry = 0;

        while (i < n) {
            let j = i;
            while (j < n && diffs[j] === diffs[i]) j++;
            const cnt = j - i + carry;
            const nxt = diffs[j];
            const cost = cnt * (diffs[i] - nxt);

            if (k >= cost) {
                k -= cost;
                carry = cnt;
                i = j;
            } else {
                const q = Math.floor(k / cnt),
                    r = k % cnt;
                res += r * (diffs[i] - q - 1) ** 2;
                res += (cnt - r) * (diffs[i] - q) ** 2;
                i = j;
                break;
            }
        }

        for (let idx = i; idx < n; idx++) res += diffs[idx] * diffs[idx];
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

> Where $n$ is the length of `nums1` and `nums2`.

---

## 5. Binary Search

::tabs-start

```python
class Solution:
    def minSumSquareDiff(self, nums1: List[int], nums2: List[int], k1: int, k2: int) -> int:
        diffs = [abs(a - b) for a, b in zip(nums1, nums2)]
        k = k1 + k2

        def cost(cap: int) -> int:
            return sum(d - cap for d in diffs if d > cap)

        lo, hi = 0, max(diffs)
        while lo < hi:
            mid = (lo + hi) // 2
            if cost(mid) <= k:
                hi = mid
            else:
                lo = mid + 1

        cap = lo
        extra = k - cost(cap) if cap > 0 else 0

        res = 0
        for d in diffs:
            if d < cap:
                res += d * d
            elif extra > 0:
                res += (cap - 1) ** 2
                extra -= 1
            else:
                res += cap * cap
        return res
```

```java
public class Solution {
    public long minSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.length;
        int[] diffs = new int[n];
        int maxDiff = 0;
        for (int i = 0; i < n; i++) {
            diffs[i] = Math.abs(nums1[i] - nums2[i]);
            maxDiff = Math.max(maxDiff, diffs[i]);
        }
        long k = (long) k1 + k2;

        int lo = 0, hi = maxDiff;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (cost(diffs, mid) <= k) hi = mid;
            else lo = mid + 1;
        }

        int cap = lo;
        long extra = cap > 0 ? k - cost(diffs, cap) : 0;

        long res = 0;
        for (int d : diffs) {
            if (d < cap) {
                res += (long) d * d;
            } else if (extra > 0) {
                res += (long) (cap - 1) * (cap - 1);
                extra--;
            } else {
                res += (long) cap * cap;
            }
        }
        return res;
    }

    private long cost(int[] diffs, int cap) {
        long total = 0;
        for (int d : diffs) if (d > cap) total += d - cap;
        return total;
    }
}
```

```cpp
class Solution {
public:
    long long minSumSquareDiff(vector<int>& nums1, vector<int>& nums2, int k1, int k2) {
        int n = nums1.size();
        vector<int> diffs(n);
        int maxDiff = 0;
        for (int i = 0; i < n; i++) {
            diffs[i] = abs(nums1[i] - nums2[i]);
            maxDiff = max(maxDiff, diffs[i]);
        }
        long long k = (long long) k1 + k2;

        int lo = 0, hi = maxDiff;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (cost(diffs, mid) <= k) hi = mid;
            else lo = mid + 1;
        }

        int cap = lo;
        long long extra = cap > 0 ? k - cost(diffs, cap) : 0;

        long long res = 0;
        for (int d : diffs) {
            if (d < cap) {
                res += (long long) d * d;
            } else if (extra > 0) {
                res += (long long) (cap - 1) * (cap - 1);
                extra--;
            } else {
                res += (long long) cap * cap;
            }
        }
        return res;
    }

private:
    long long cost(vector<int>& diffs, int cap) {
        long long total = 0;
        for (int d : diffs) if (d > cap) total += d - cap;
        return total;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k1
     * @param {number} k2
     * @return {number}
     */
    minSumSquareDiff(nums1, nums2, k1, k2) {
        const diffs = nums1.map((a, i) => Math.abs(a - nums2[i]));
        const k = k1 + k2;

        const cost = (cap) => diffs.reduce((sum, d) => sum + Math.max(0, d - cap), 0);

        let lo = 0,
            hi = Math.max(...diffs);
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (cost(mid) <= k) hi = mid;
            else lo = mid + 1;
        }

        const cap = lo;
        let extra = cap > 0 ? k - cost(cap) : 0;

        let res = 0;
        for (const d of diffs) {
            if (d < cap) {
                res += d * d;
            } else if (extra > 0) {
                res += (cap - 1) ** 2;
                extra--;
            } else {
                res += cap * cap;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long MinSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.Length;
        int[] diffs = new int[n];
        int maxDiff = 0;
        for (int i = 0; i < n; i++) {
            diffs[i] = Math.Abs(nums1[i] - nums2[i]);
            maxDiff = Math.Max(maxDiff, diffs[i]);
        }
        long k = (long) k1 + k2;

        int lo = 0, hi = maxDiff;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (Cost(diffs, mid) <= k) hi = mid;
            else lo = mid + 1;
        }

        int cap = lo;
        long extra = cap > 0 ? k - Cost(diffs, cap) : 0;

        long res = 0;
        foreach (int d in diffs) {
            if (d < cap) {
                res += (long) d * d;
            } else if (extra > 0) {
                res += (long) (cap - 1) * (cap - 1);
                extra--;
            } else {
                res += (long) cap * cap;
            }
        }
        return res;
    }

    private long Cost(int[] diffs, int cap) {
        long total = 0;
        foreach (int d in diffs) if (d > cap) total += d - cap;
        return total;
    }
}
```

```go
func costAtCap(diffs []int, cap int) int64 {
    var total int64
    for _, d := range diffs {
        if d > cap {
            total += int64(d - cap)
        }
    }
    return total
}

func minSumSquareDiff(nums1 []int, nums2 []int, k1 int, k2 int) int64 {
    n := len(nums1)
    diffs := make([]int, n)
    maxDiff := 0
    for i := 0; i < n; i++ {
        d := nums1[i] - nums2[i]
        if d < 0 {
            d = -d
        }
        diffs[i] = d
        if d > maxDiff {
            maxDiff = d
        }
    }
    k := int64(k1) + int64(k2)

    lo, hi := 0, maxDiff
    for lo < hi {
        mid := (lo + hi) / 2
        if costAtCap(diffs, mid) <= k {
            hi = mid
        } else {
            lo = mid + 1
        }
    }

    capVal := lo
    var extra int64
    if capVal > 0 {
        extra = k - costAtCap(diffs, capVal)
    }

    var res int64
    for _, d := range diffs {
        if d < capVal {
            res += int64(d) * int64(d)
        } else if extra > 0 {
            res += int64(capVal-1) * int64(capVal-1)
            extra--
        } else {
            res += int64(capVal) * int64(capVal)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun minSumSquareDiff(nums1: IntArray, nums2: IntArray, k1: Int, k2: Int): Long {
        val n = nums1.size
        val diffs = IntArray(n)
        var maxDiff = 0
        for (i in 0 until n) {
            diffs[i] = Math.abs(nums1[i] - nums2[i])
            maxDiff = maxOf(maxDiff, diffs[i])
        }
        val k = k1.toLong() + k2

        fun cost(cap: Int): Long {
            var total = 0L
            for (d in diffs) if (d > cap) total += d - cap
            return total
        }

        var lo = 0
        var hi = maxDiff
        while (lo < hi) {
            val mid = (lo + hi) / 2
            if (cost(mid) <= k) hi = mid else lo = mid + 1
        }

        val cap = lo
        var extra = if (cap > 0) k - cost(cap) else 0

        var res = 0L
        for (d in diffs) {
            if (d < cap) {
                res += d.toLong() * d
            } else if (extra > 0) {
                res += (cap - 1).toLong() * (cap - 1)
                extra--
            } else {
                res += cap.toLong() * cap
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func minSumSquareDiff(_ nums1: [Int], _ nums2: [Int], _ k1: Int, _ k2: Int) -> Int {
        let n = nums1.count
        var diffs = [Int](repeating: 0, count: n)
        var maxDiff = 0
        for i in 0..<n {
            diffs[i] = abs(nums1[i] - nums2[i])
            maxDiff = max(maxDiff, diffs[i])
        }
        let k = k1 + k2

        func cost(_ cap: Int) -> Int {
            var total = 0
            for d in diffs where d > cap { total += d - cap }
            return total
        }

        var lo = 0, hi = maxDiff
        while lo < hi {
            let mid = (lo + hi) / 2
            if cost(mid) <= k { hi = mid } else { lo = mid + 1 }
        }

        let cap = lo
        var extra = cap > 0 ? k - cost(cap) : 0

        var res = 0
        for d in diffs {
            if d < cap {
                res += d * d
            } else if extra > 0 {
                res += (cap - 1) * (cap - 1)
                extra -= 1
            } else {
                res += cap * cap
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn min_sum_square_diff(nums1: Vec<i32>, nums2: Vec<i32>, k1: i32, k2: i32) -> i64 {
        let diffs: Vec<i64> = nums1.iter().zip(nums2.iter())
            .map(|(a, b)| (a - b).abs() as i64)
            .collect();
        let max_diff = *diffs.iter().max().unwrap();
        let k = (k1 as i64) + (k2 as i64);

        let cost = |cap: i64| -> i64 {
            diffs.iter().filter(|&&d| d > cap).map(|&d| d - cap).sum()
        };

        let mut lo = 0i64;
        let mut hi = max_diff;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if cost(mid) <= k {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }

        let cap = lo;
        let mut extra = if cap > 0 { k - cost(cap) } else { 0 };

        let mut res: i64 = 0;
        for &d in &diffs {
            if d < cap {
                res += d * d;
            } else if extra > 0 {
                res += (cap - 1) * (cap - 1);
                extra -= 1;
            } else {
                res += cap * cap;
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k1
     * @param {number} k2
     * @return {number}
     */
    minSumSquareDiff(nums1: number[], nums2: number[], k1: number, k2: number): number {
        const diffs = nums1.map((a, i) => Math.abs(a - nums2[i]));
        const k = k1 + k2;

        const cost = (cap: number): number =>
            diffs.reduce((sum, d) => sum + Math.max(0, d - cap), 0);

        let lo = 0,
            hi = Math.max(...diffs);
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (cost(mid) <= k) hi = mid;
            else lo = mid + 1;
        }

        const cap = lo;
        let extra = cap > 0 ? k - cost(cap) : 0;

        let res = 0;
        for (const d of diffs) {
            if (d < cap) {
                res += d * d;
            } else if (extra > 0) {
                res += (cap - 1) ** 2;
                extra--;
            } else {
                res += cap * cap;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log V)$
- Space complexity: $O(n)$

> Where $n$ is the length of `nums1` and `nums2`, and $V$ is the maximum possible value of $|nums1[i] - nums2[i]|$ (up to $10^5$).
