## 1. Greedy + Max-Heap

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * (\log n + \log k))$
- Space complexity: $O(n)$

> Where $n$ is the number of workers, and $k$ is the number of workers to be hired.
