## 1. Dynamic Programming (Top-Down)

### Intuition

We need to partition marbles into k bags and find the difference between maximum and minimum possible scores. Each bag's cost is the sum of its first and last marble weights. Using memoization, we can explore all possible partition points. At each position, we decide whether to make a cut (starting a new bag) or continue the current bag, tracking both max and min scores simultaneously.

### Algorithm

1. Define a recursive function `dfs(i, k)` that returns `[maxScore, minScore]` for partitioning marbles from index `i` with `k` cuts remaining.
2. Base cases:
   - If `k == 0`, no more cuts needed, return `[0, 0]`.
   - If we reach the end or don't have enough elements for remaining cuts, return invalid values.
3. At each position, we have two choices:
   - Make a partition here: add `weights[i] + weights[i + 1]` to the score and recurse with `k - 1`.
   - Skip this position: recurse with the same `k`.
4. Track both max and min across all choices.
5. Return `maxScore - minScore` from the initial call.

::tabs-start

```python
class Solution:
    def putMarbles(self, weights: List[int], k: int) -> int:
        n = len(weights)
        cache = {}

        def dfs(i, k):
            if (i, k) in cache:
                return cache[(i, k)]
            if k == 0:
                return [0, 0]
            if i == n - 1 or n - i - 1 < k:
                return [-float("inf"), float("inf")]

            res = [0, float("inf")]  # [maxScore, minScore]

            # make partition
            cur = dfs(i + 1, k - 1)
            res[0] = max(res[0], weights[i] + weights[i + 1] + cur[0])
            res[1] = min(res[1], weights[i] + weights[i + 1] + cur[1])

            # skip
            cur = dfs(i + 1, k)
            res[0] = max(res[0], cur[0])
            res[1] = min(res[1], cur[1])

            cache[(i, k)] = res
            return res

        ans = dfs(0, k - 1)
        return ans[0] - ans[1]
```

```java
public class Solution {
    Map<String, long[]> cache = new HashMap<>();

    public long putMarbles(int[] weights, int k) {
        int n = weights.length;
        long[] ans = dfs(0, k - 1, weights, n);
        return ans[0] - ans[1];
    }

    private long[] dfs(int i, int k, int[] weights, int n) {
        String key = i + "," + k;
        if (cache.containsKey(key)) return cache.get(key);
        if (k == 0) return new long[]{0L, 0L};
        if (i == n - 1 || n - i - 1 < k) {
            return new long[]{(long)-1e15, (long)1e15};
        }

        long[] res = new long[]{0L, (long)1e15};

        long[] cur = dfs(i + 1, k - 1, weights, n);
        res[0] = Math.max(res[0], weights[i] + weights[i + 1] + cur[0]);
        res[1] = Math.min(res[1], weights[i] + weights[i + 1] + cur[1]);

        cur = dfs(i + 1, k, weights, n);
        res[0] = Math.max(res[0], cur[0]);
        res[1] = Math.min(res[1], cur[1]);

        cache.put(key, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    unordered_map<string, pair<long long, long long>> cache;

    long long putMarbles(vector<int>& weights, int k) {
        int n = weights.size();
        auto ans = dfs(0, k - 1, weights, n);
        return ans.first - ans.second;
    }

    pair<long long, long long> dfs(int i, int k, vector<int>& weights, int n) {
        string key = to_string(i) + "," + to_string(k);
        if (cache.count(key)) return cache[key];
        if (k == 0) return {0LL, 0LL};
        if (i == n - 1 || n - i - 1 < k) {
            return {-1000000000000000LL, 1000000000000000LL};
        }

        pair<long long, long long> res = {0LL, 1000000000000000LL};

        auto cur = dfs(i + 1, k - 1, weights, n);
        res.first = max(res.first, (long long)weights[i] + weights[i + 1] + cur.first);
        res.second = min(res.second, (long long)weights[i] + weights[i + 1] + cur.second);

        cur = dfs(i + 1, k, weights, n);
        res.first = max(res.first, cur.first);
        res.second = min(res.second, cur.second);

        return cache[key] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} weights
     * @param {number} k
     * @return {number}
     */
    putMarbles(weights, k) {
        const n = weights.length;
        const cache = new Map();

        const dfs = (i, k) => {
            const key = `${i},${k}`;
            if (cache.has(key)) return cache.get(key);
            if (k === 0) return [0, 0];
            if (i === n - 1 || n - i - 1 < k) return [-1e15, 1e15];

            let res = [0, 1e15];

            let cur = dfs(i + 1, k - 1);
            res[0] = Math.max(res[0], weights[i] + weights[i + 1] + cur[0]);
            res[1] = Math.min(res[1], weights[i] + weights[i + 1] + cur[1]);

            cur = dfs(i + 1, k);
            res[0] = Math.max(res[0], cur[0]);
            res[1] = Math.min(res[1], cur[1]);

            cache.set(key, res);
            return res;
        };

        const ans = dfs(0, k - 1);
        return ans[0] - ans[1];
    }
}
```

```csharp
public class Solution {
    Dictionary<string, long[]> cache = new Dictionary<string, long[]>();

    public long PutMarbles(int[] weights, int k) {
        int n = weights.Length;
        long[] ans = Dfs(0, k - 1, weights, n);
        return (int)(ans[0] - ans[1]);
    }

    private long[] Dfs(int i, int k, int[] weights, int n) {
        string key = $"{i},{k}";
        if (cache.ContainsKey(key)) return cache[key];
        if (k == 0) return new long[] { 0L, 0L };
        if (i == n - 1 || n - i - 1 < k) {
            return new long[] { -1000000000000000L, 1000000000000000L };
        }

        long[] res = new long[] { 0L, 1000000000000000L };

        long[] cur = Dfs(i + 1, k - 1, weights, n);
        res[0] = Math.Max(res[0], weights[i] + weights[i + 1] + cur[0]);
        res[1] = Math.Min(res[1], weights[i] + weights[i + 1] + cur[1]);

        cur = Dfs(i + 1, k, weights, n);
        res[0] = Math.Max(res[0], cur[0]);
        res[1] = Math.Min(res[1], cur[1]);

        cache[key] = res;
        return res;
    }
}
```

```go
func putMarbles(weights []int, k int) int64 {
    n := len(weights)
    cache := make(map[string][2]int64)

    var dfs func(i, k int) [2]int64
    dfs = func(i, k int) [2]int64 {
        key := fmt.Sprintf("%d,%d", i, k)
        if val, ok := cache[key]; ok {
            return val
        }
        if k == 0 {
            return [2]int64{0, 0}
        }
        if i == n-1 || n-i-1 < k {
            return [2]int64{-1e15, 1e15}
        }

        res := [2]int64{0, int64(1e15)}

        cur := dfs(i+1, k-1)
        res[0] = max(res[0], int64(weights[i]+weights[i+1])+cur[0])
        res[1] = min(res[1], int64(weights[i]+weights[i+1])+cur[1])

        cur = dfs(i+1, k)
        res[0] = max(res[0], cur[0])
        res[1] = min(res[1], cur[1])

        cache[key] = res
        return res
    }

    ans := dfs(0, k-1)
    return ans[0] - ans[1]
}
```

```kotlin
class Solution {
    private val cache = HashMap<String, LongArray>()

    fun putMarbles(weights: IntArray, k: Int): Long {
        val n = weights.size
        val ans = dfs(0, k - 1, weights, n)
        return ans[0] - ans[1]
    }

    private fun dfs(i: Int, k: Int, weights: IntArray, n: Int): LongArray {
        val key = "$i,$k"
        cache[key]?.let { return it }
        if (k == 0) return longArrayOf(0L, 0L)
        if (i == n - 1 || n - i - 1 < k) {
            return longArrayOf(-1_000_000_000_000_000L, 1_000_000_000_000_000L)
        }

        val res = longArrayOf(0L, 1_000_000_000_000_000L)

        var cur = dfs(i + 1, k - 1, weights, n)
        res[0] = maxOf(res[0], weights[i] + weights[i + 1] + cur[0])
        res[1] = minOf(res[1], weights[i] + weights[i + 1] + cur[1])

        cur = dfs(i + 1, k, weights, n)
        res[0] = maxOf(res[0], cur[0])
        res[1] = minOf(res[1], cur[1])

        cache[key] = res
        return res
    }
}
```

```swift
class Solution {
    private var cache = [String: [Int64]]()

    func putMarbles(_ weights: [Int], _ k: Int) -> Int64 {
        let n = weights.count
        cache.removeAll()
        let ans = dfs(0, k - 1, weights, n)
        return ans[0] - ans[1]
    }

    private func dfs(_ i: Int, _ k: Int, _ weights: [Int], _ n: Int) -> [Int64] {
        let key = "\(i),\(k)"
        if let cached = cache[key] {
            return cached
        }
        if k == 0 {
            return [0, 0]
        }
        if i == n - 1 || n - i - 1 < k {
            return [Int64(-1e15), Int64(1e15)]
        }

        var res: [Int64] = [0, Int64(1e15)]

        var cur = dfs(i + 1, k - 1, weights, n)
        res[0] = max(res[0], Int64(weights[i] + weights[i + 1]) + cur[0])
        res[1] = min(res[1], Int64(weights[i] + weights[i + 1]) + cur[1])

        cur = dfs(i + 1, k, weights, n)
        res[0] = max(res[0], cur[0])
        res[1] = min(res[1], cur[1])

        cache[key] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the number of marbles, and $k$ is the number of bags.

---

## 2. Greedy + Sorting

### Intuition

The key observation is that the first and last marbles always contribute to the total score regardless of how we partition. What matters is where we place the k-1 dividers. Each divider at position i adds `weights[i] + weights[i+1]` to the score. To maximize the score, pick the k-1 largest such sums. To minimize, pick the k-1 smallest. The difference between these gives our answer.

### Algorithm

1. If `k == 1`, return 0 (only one bag, no choices to make).
2. Create an array of all adjacent pair sums: `weights[i] + weights[i+1]` for each valid `i`.
3. Sort this array.
4. Sum the smallest `k-1` values for the minimum score.
5. Sum the largest `k-1` values for the maximum score.
6. Return `maxScore - minScore`.

::tabs-start

```python
class Solution:
    def putMarbles(self, weights: List[int], k: int) -> int:
        if k == 1:
            return 0

        splits = []
        for i in range(len(weights) - 1):
            splits.append(weights[i] + weights[i + 1])

        splits.sort()
        i = k - 1

        max_score = sum(splits[-i:])
        min_score = sum(splits[:i])
        return max_score - min_score
```

```java
public class Solution {
    public long putMarbles(int[] weights, int k) {
        if (k == 1) return 0L;

        int n = weights.length;
        List<Integer> splits = new ArrayList<>();

        for (int i = 0; i < n - 1; i++) {
            splits.add(weights[i] + weights[i + 1]);
        }

        Collections.sort(splits);
        int i = k - 1;
        long maxScore = 0, minScore = 0;

        for (int j = 0; j < i; j++) minScore += splits.get(j);
        for (int j = splits.size() - i; j < splits.size(); j++) {
            maxScore += splits.get(j);
        }

        return maxScore - minScore;
    }
}
```

```cpp
class Solution {
public:
    long long putMarbles(vector<int>& weights, int k) {
        if (k == 1) return 0LL;

        int n = weights.size();
        vector<int> splits;

        for (int i = 0; i < n - 1; ++i) {
            splits.push_back(weights[i] + weights[i + 1]);
        }

        sort(splits.begin(), splits.end());
        int i = k - 1;
        long long minScore = 0, maxScore = 0;

        for (int j = 0; j < i; ++j) minScore += splits[j];
        for (int j = splits.size() - i; j < splits.size(); ++j) {
            maxScore += splits[j];
        }

        return maxScore - minScore;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} weights
     * @param {number} k
     * @return {number}
     */
    putMarbles(weights, k) {
        if (k === 1) return 0;

        const splits = [];
        for (let i = 0; i < weights.length - 1; i++) {
            splits.push(weights[i] + weights[i + 1]);
        }

        splits.sort((a, b) => a - b);
        const i = k - 1;

        let minScore = 0,
            maxScore = 0;
        for (let j = 0; j < i; j++) minScore += splits[j];
        for (let j = splits.length - i; j < splits.length; j++) {
            maxScore += splits[j];
        }

        return maxScore - minScore;
    }
}
```

```csharp
public class Solution {
    public long PutMarbles(int[] weights, int k) {
        if (k == 1) return 0L;

        int n = weights.Length;
        List<int> splits = new List<int>();

        for (int i = 0; i < n - 1; i++) {
            splits.Add(weights[i] + weights[i + 1]);
        }

        splits.Sort();
        int iVal = k - 1;
        long minScore = 0, maxScore = 0;

        for (int j = 0; j < iVal; j++) minScore += splits[j];
        for (int j = splits.Count - iVal; j < splits.Count; j++) {
            maxScore += splits[j];
        }

        return maxScore - minScore;
    }
}
```

```go
func putMarbles(weights []int, k int) int64 {
    if k == 1 {
        return 0
    }

    n := len(weights)
    splits := make([]int, 0, n-1)

    for i := 0; i < n-1; i++ {
        splits = append(splits, weights[i]+weights[i+1])
    }

    sort.Ints(splits)
    cnt := k - 1

    var minScore, maxScore int64
    for j := 0; j < cnt; j++ {
        minScore += int64(splits[j])
    }
    for j := len(splits) - cnt; j < len(splits); j++ {
        maxScore += int64(splits[j])
    }

    return maxScore - minScore
}
```

```kotlin
class Solution {
    fun putMarbles(weights: IntArray, k: Int): Long {
        if (k == 1) return 0L

        val n = weights.size
        val splits = mutableListOf<Int>()

        for (i in 0 until n - 1) {
            splits.add(weights[i] + weights[i + 1])
        }

        splits.sort()
        val cnt = k - 1
        var minScore = 0L
        var maxScore = 0L

        for (j in 0 until cnt) minScore += splits[j]
        for (j in splits.size - cnt until splits.size) {
            maxScore += splits[j]
        }

        return maxScore - minScore
    }
}
```

```swift
class Solution {
    func putMarbles(_ weights: [Int], _ k: Int) -> Int64 {
        if k == 1 { return 0 }

        let n = weights.count
        var splits = [Int]()

        for i in 0..<(n - 1) {
            splits.append(weights[i] + weights[i + 1])
        }

        splits.sort()
        let cnt = k - 1
        var minScore: Int64 = 0
        var maxScore: Int64 = 0

        for j in 0..<cnt {
            minScore += Int64(splits[j])
        }
        for j in (splits.count - cnt)..<splits.count {
            maxScore += Int64(splits[j])
        }

        return maxScore - minScore
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

> Where $n$ is the number of marbles, and $k$ is the number of bags.

---

## 3. Heap

### Intuition

Instead of sorting all adjacent pair sums, we can use two heaps to efficiently track just the k-1 largest and k-1 smallest values. A min-heap keeps the k-1 largest sums (evicting smaller ones), while a max-heap keeps the k-1 smallest sums (evicting larger ones). This is more efficient when k is small relative to n.

### Algorithm

1. If `k == 1`, return 0.
2. Initialize a min-heap and a max-heap, both of size at most `k-1`.
3. For each adjacent pair sum `weights[i] + weights[i+1]`:
   - Add to the min-heap. If size exceeds `k-1`, remove the smallest.
   - Add to the max-heap. If size exceeds `k-1`, remove the largest.
4. Sum all elements in the min-heap for the max score.
5. Sum all elements in the max-heap for the min score.
6. Return `maxScore - minScore`.

::tabs-start

```python
class Solution:
    def putMarbles(self, weights: List[int], k: int) -> int:
        if k == 1:
            return 0

        max_heap = []
        min_heap = []

        for i in range(len(weights) - 1):
            split = weights[i] + weights[i + 1]

            if len(max_heap) < k - 1:
                heapq.heappush(max_heap, split)
            else:
                heapq.heappushpop(max_heap, split)

            if len(min_heap) < k - 1:
                heapq.heappush(min_heap, -split)
            else:
                heapq.heappushpop(min_heap, -split)

        max_score = sum(max_heap)
        min_score = -sum(min_heap)
        return max_score - min_score
```

```java
public class Solution {
    public long putMarbles(int[] weights, int k) {
        if (k == 1) return 0L;

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>();
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(Collections.reverseOrder());

        for (int i = 0; i < weights.length - 1; i++) {
            int split = weights[i] + weights[i + 1];

            if (maxHeap.size() < k - 1) maxHeap.offer(split);
            else if (split > maxHeap.peek()) {
                maxHeap.poll();
                maxHeap.offer(split);
            }

            if (minHeap.size() < k - 1) minHeap.offer(split);
            else if (split < minHeap.peek()) {
                minHeap.poll();
                minHeap.offer(split);
            }
        }

        long maxScore = 0, minScore = 0;
        for (int val : maxHeap) maxScore += val;
        for (int val : minHeap) minScore += val;

        return maxScore - minScore;
    }
}
```

```cpp
class Solution {
public:
    long long putMarbles(vector<int>& weights, int k) {
        if (k == 1) return 0LL;

        priority_queue<int, vector<int>, greater<int>> maxHeap;
        priority_queue<int> minHeap;

        for (int i = 0; i < weights.size() - 1; ++i) {
            int split = weights[i] + weights[i + 1];

            if ((int)maxHeap.size() < k - 1) maxHeap.push(split);
            else if (split > maxHeap.top()) {
                maxHeap.pop();
                maxHeap.push(split);
            }

            if ((int)minHeap.size() < k - 1) minHeap.push(split);
            else if (split < minHeap.top()) {
                minHeap.pop();
                minHeap.push(split);
            }
        }

        long long maxScore = 0, minScore = 0;
        while (!maxHeap.empty()) {
            maxScore += maxHeap.top();
            maxHeap.pop();
        }
        while (!minHeap.empty()) {
            minScore += minHeap.top();
            minHeap.pop();
        }

        return maxScore - minScore;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} weights
     * @param {number} k
     * @return {number}
     */
    putMarbles(weights, k) {
        if (k === 1) return 0;

        const minHeap = new MinPriorityQueue();
        const maxHeap = new MaxPriorityQueue();

        for (let i = 0; i < weights.length - 1; i++) {
            const sum = weights[i] + weights[i + 1];

            minHeap.enqueue(sum);
            if (minHeap.size() > k - 1) minHeap.dequeue();

            maxHeap.enqueue(sum);
            if (maxHeap.size() > k - 1) maxHeap.dequeue();
        }

        let maxScore = 0,
            minScore = 0;
        while (!minHeap.isEmpty()) maxScore += minHeap.dequeue();
        while (!maxHeap.isEmpty()) minScore += maxHeap.dequeue();

        return maxScore - minScore;
    }
}
```

```csharp
public class Solution {
    public long PutMarbles(int[] weights, int k) {
        if (k == 1) return 0L;

        var maxHeap = new PriorityQueue<int, int>();
        var minHeap = new PriorityQueue<int, int>(
            Comparer<int>.Create((a, b) => b.CompareTo(a))
        );

        for (int i = 0; i < weights.Length - 1; i++) {
            int split = weights[i] + weights[i + 1];

            maxHeap.Enqueue(split, split);
            if (maxHeap.Count > k - 1) maxHeap.Dequeue();

            minHeap.Enqueue(split, split);
            if (minHeap.Count > k - 1) minHeap.Dequeue();
        }

        long maxScore = 0, minScore = 0;
        while (maxHeap.Count > 0) maxScore += maxHeap.Dequeue();
        while (minHeap.Count > 0) minScore += minHeap.Dequeue();

        return maxScore - minScore;
    }
}
```

```go
func putMarbles(weights []int, k int) int64 {
    if k == 1 {
        return 0
    }

    maxHeap := &MinHeap{}
    minHeap := &MaxHeap{}
    heap.Init(maxHeap)
    heap.Init(minHeap)

    for i := 0; i < len(weights)-1; i++ {
        split := weights[i] + weights[i+1]

        heap.Push(maxHeap, split)
        if maxHeap.Len() > k-1 {
            heap.Pop(maxHeap)
        }

        heap.Push(minHeap, split)
        if minHeap.Len() > k-1 {
            heap.Pop(minHeap)
        }
    }

    var maxScore, minScore int64
    for maxHeap.Len() > 0 {
        maxScore += int64(heap.Pop(maxHeap).(int))
    }
    for minHeap.Len() > 0 {
        minScore += int64(heap.Pop(minHeap).(int))
    }

    return maxScore - minScore
}

type MinHeap []int
func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *MinHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

type MaxHeap []int
func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *MaxHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun putMarbles(weights: IntArray, k: Int): Long {
        if (k == 1) return 0L

        val maxHeap = PriorityQueue<Int>()
        val minHeap = PriorityQueue<Int>(reverseOrder())

        for (i in 0 until weights.size - 1) {
            val split = weights[i] + weights[i + 1]

            maxHeap.offer(split)
            if (maxHeap.size > k - 1) maxHeap.poll()

            minHeap.offer(split)
            if (minHeap.size > k - 1) minHeap.poll()
        }

        var maxScore = 0L
        var minScore = 0L
        while (maxHeap.isNotEmpty()) maxScore += maxHeap.poll()
        while (minHeap.isNotEmpty()) minScore += minHeap.poll()

        return maxScore - minScore
    }
}
```

```swift
class Solution {
    func putMarbles(_ weights: [Int], _ k: Int) -> Int64 {
        if k == 1 { return 0 }

        var maxHeap = [Int]()
        var minHeap = [Int]()

        for i in 0..<(weights.count - 1) {
            let split = weights[i] + weights[i + 1]

            maxHeap.append(split)
            maxHeap.sort()
            if maxHeap.count > k - 1 {
                maxHeap.removeFirst()
            }

            minHeap.append(split)
            minHeap.sort(by: >)
            if minHeap.count > k - 1 {
                minHeap.removeFirst()
            }
        }

        var maxScore: Int64 = 0
        var minScore: Int64 = 0
        for val in maxHeap { maxScore += Int64(val) }
        for val in minHeap { minScore += Int64(val) }

        return maxScore - minScore
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log k)$
- Space complexity: $O(k)$

> Where $n$ is the number of marbles, and $k$ is the number of bags.

---

## Common Pitfalls

### Misunderstanding the Score Contribution

Each bag's score is the sum of its first and last marble weights. A common mistake is thinking only endpoints matter globally. The key insight is that internal partition points contribute `weights[i] + weights[i+1]` to the total score, while the first and last marbles of the entire array always contribute and cancel out in the difference.

### Off-by-One in Number of Splits

With k bags, we need exactly k-1 partition points (splits), not k. Selecting k splits creates k+1 bags. This off-by-one error leads to selecting too many or too few adjacent pair sums when computing max and min scores.

### Not Handling k=1 Edge Case

When k=1, there are no partition choices since all marbles go into one bag. The max and min scores are identical, so the answer is 0. Forgetting this case and attempting to select 0 elements from the splits array causes errors.

### Integer Overflow in Sum Calculations

Adjacent pair sums can be up to 2 * 10^9, and summing k-1 of them can overflow 32-bit integers. Using 64-bit integers (long in Java, int64 in Go) prevents overflow issues when computing max and min scores.
