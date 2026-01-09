## 1. Greedy + Max-Heap

### Intuition

Every worker has a minimum wage expectation. If we pay workers proportionally to their quality, the worker with the highest wage-to-quality ratio sets the "rate" for the group. Total cost equals `rate * total_quality`. To minimize cost with a fixed rate, we want workers with the smallest quality values. We sort workers by their rate, then use a max-heap to maintain the k workers with lowest quality seen so far.

### Algorithm

1. Create pairs of `(wage/quality ratio, quality)` for each worker and sort by ratio.
2. Use a max-heap to track the k smallest qualities.
3. Iterate through workers in order of increasing ratio:
   - Add current worker's quality to heap and running total.
   - If heap size exceeds k, remove the largest quality.
   - When heap size equals k, compute `total_quality * current_ratio` and track minimum.
4. Return the minimum cost found.

::tabs-start

```python
class Solution:
    def mincostToHireWorkers(self, quality: List[int], wage: List[int], k: int) -> float:
        pairs = sorted([(w / q, q) for q, w in zip(quality, wage)], key=lambda p: p[0])

        maxHeap = []
        total_quality = 0
        res = float("inf")

        for rate, q in pairs:
            heapq.heappush(maxHeap, -q)
            total_quality += q

            if len(maxHeap) > k:
                total_quality += heapq.heappop(maxHeap)

            if len(maxHeap) == k:
                res = min(res, total_quality * rate)

        return res
```

```java
public class Solution {
    public double mincostToHireWorkers(int[] quality, int[] wage, int k) {
        int n = quality.length;
        double res = Double.MAX_VALUE;
        double totalQuality = 0;

        double[][] workers = new double[n][2];
        for (int i = 0; i < n; i++) {
            workers[i] = new double[]{
                (double) wage[i] / quality[i], (double) quality[i]
            };
        }

        Arrays.sort(workers, Comparator.comparingDouble(a -> a[0]));
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

        for (double[] worker : workers) {
            double ratio = worker[0];
            int q = (int) worker[1];

            maxHeap.add(q);
            totalQuality += q;

            if (maxHeap.size() > k) {
                totalQuality -= maxHeap.poll();
            }

            if (maxHeap.size() == k) {
                res = Math.min(res, totalQuality * ratio);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    double mincostToHireWorkers(vector<int>& quality, vector<int>& wage, int k) {
        int n = quality.size();
        vector<pair<double, int>> workers(n);
        for (int i = 0; i < n; i++) {
            workers[i] = { (double)wage[i] / quality[i], quality[i] };
        }

        sort(workers.begin(), workers.end());
        priority_queue<int> maxHeap;
        double totalQuality = 0, res = DBL_MAX;

        for (auto& worker : workers) {
            double ratio = worker.first;
            int q = worker.second;
            maxHeap.push(q);
            totalQuality += q;

            if (maxHeap.size() > k) {
                totalQuality -= maxHeap.top();
                maxHeap.pop();
            }

            if (maxHeap.size() == k) {
                res = min(res, totalQuality * ratio);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} quality
     * @param {number[]} wage
     * @param {number} k
     * @return {number}
     */
    mincostToHireWorkers(quality, wage, k) {
        const n = quality.length;
        const workers = [];
        for (let i = 0; i < n; i++) {
            workers.push([wage[i] / quality[i], quality[i]]);
        }

        workers.sort((a, b) => a[0] - b[0]);
        const maxHeap = new MaxPriorityQueue();
        let totalQuality = 0,
            res = Number.MAX_VALUE;

        for (let [ratio, q] of workers) {
            maxHeap.enqueue(q);
            totalQuality += q;

            if (maxHeap.size() > k) {
                totalQuality -= maxHeap.dequeue();
            }

            if (maxHeap.size() === k) {
                res = Math.min(res, totalQuality * ratio);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public double MincostToHireWorkers(int[] quality, int[] wage, int k) {
        int n = quality.Length;
        var workers = new List<(double ratio, int q)>();
        for (int i = 0; i < n; i++) {
            workers.Add(((double)wage[i] / quality[i], quality[i]));
        }
        workers.Sort((a, b) => a.ratio.CompareTo(b.ratio));

        var maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b - a));
        double totalQuality = 0, res = double.MaxValue;

        foreach (var (ratio, q) in workers) {
            maxHeap.Enqueue(q, q);
            totalQuality += q;

            if (maxHeap.Count > k) {
                totalQuality -= maxHeap.Dequeue();
            }

            if (maxHeap.Count == k) {
                res = Math.Min(res, totalQuality * ratio);
            }
        }

        return res;
    }
}
```

```go
func mincostToHireWorkers(quality []int, wage []int, k int) float64 {
    n := len(quality)
    workers := make([][2]float64, n)
    for i := 0; i < n; i++ {
        workers[i] = [2]float64{float64(wage[i]) / float64(quality[i]), float64(quality[i])}
    }
    sort.Slice(workers, func(i, j int) bool {
        return workers[i][0] < workers[j][0]
    })

    maxHeap := &MaxHeap{}
    heap.Init(maxHeap)
    totalQuality := 0.0
    res := math.MaxFloat64

    for _, worker := range workers {
        ratio := worker[0]
        q := int(worker[1])
        heap.Push(maxHeap, q)
        totalQuality += float64(q)

        if maxHeap.Len() > k {
            totalQuality -= float64(heap.Pop(maxHeap).(int))
        }

        if maxHeap.Len() == k {
            res = math.Min(res, totalQuality*ratio)
        }
    }

    return res
}

type MaxHeap []int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
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
    fun mincostToHireWorkers(quality: IntArray, wage: IntArray, k: Int): Double {
        val n = quality.size
        val workers = (0 until n).map {
            Pair(wage[it].toDouble() / quality[it], quality[it])
        }.sortedBy { it.first }

        val maxHeap = PriorityQueue<Int>(Collections.reverseOrder())
        var totalQuality = 0.0
        var res = Double.MAX_VALUE

        for ((ratio, q) in workers) {
            maxHeap.add(q)
            totalQuality += q

            if (maxHeap.size > k) {
                totalQuality -= maxHeap.poll()
            }

            if (maxHeap.size == k) {
                res = minOf(res, totalQuality * ratio)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func mincostToHireWorkers(_ quality: [Int], _ wage: [Int], _ k: Int) -> Double {
        let n = quality.count
        var workers = [(Double, Int)]()
        for i in 0..<n {
            workers.append((Double(wage[i]) / Double(quality[i]), quality[i]))
        }
        workers.sort { $0.0 < $1.0 }

        var maxHeap = Heap<Int>(sort: >)
        var totalQuality = 0.0
        var res = Double.greatestFiniteMagnitude

        for (ratio, q) in workers {
            maxHeap.insert(q)
            totalQuality += Double(q)

            if maxHeap.count > k {
                totalQuality -= Double(maxHeap.remove()!)
            }

            if maxHeap.count == k {
                res = min(res, totalQuality * ratio)
            }
        }

        return res
    }
}

struct Heap<T> {
    var elements: [T] = []
    let sort: (T, T) -> Bool

    init(sort: @escaping (T, T) -> Bool) { self.sort = sort }
    var count: Int { elements.count }

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * (\log n + \log k))$
- Space complexity: $O(n)$

> Where $n$ is the number of workers, and $k$ is the number of workers to be hired.
