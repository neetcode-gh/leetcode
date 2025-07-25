## 1. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the number of marbles, and $k$ is the number of bags.

---

## 2. Greedy + Sorting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

> Where $n$ is the number of marbles, and $k$ is the number of bags.

---

## 3. Heap

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log k)$
- Space complexity: $O(k)$

> Where $n$ is the number of marbles, and $k$ is the number of bags.
