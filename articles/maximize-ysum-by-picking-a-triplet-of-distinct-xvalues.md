## 1. Hash Map

### Intuition

We need to pick three indices with distinct x-values and maximize the sum of their corresponding y-values. For each unique x-value, we only care about the maximum y-value associated with it, since choosing a smaller y-value for the same x would never be optimal.

After collecting the best y-value for each distinct x, we simply need the three largest values. If there are fewer than three distinct x-values, the answer is `-1`.

### Algorithm

1. Build a hash map where each key is an x-value and the value is the maximum y-value seen for that x.
2. If the map has fewer than `3` entries, return `-1`.
3. Extract all the y-values from the map and sort them.
4. Return the sum of the three largest y-values.

::tabs-start

```python
class Solution:
    def maxSumDistinctTriplet(self, x: List[int], y: List[int]) -> int:
        mp = {}

        for i in range(len(x)):
            if x[i] not in mp:
                mp[x[i]] = y[i]
            
            mp[x[i]] = max(mp[x[i]], y[i])

        return -1 if len(mp) < 3 else sum(sorted(list(mp.values()))[-3:])
```

```java
public class Solution {
    public int maxSumDistinctTriplet(int[] x, int[] y) {
        Map<Integer, Integer> mp = new HashMap<>();
        for (int i = 0; i < x.length; i++) {
            int key = x[i], val = y[i];
            mp.put(key, Math.max(mp.getOrDefault(key, 0), val));
        }
        if (mp.size() < 3) return -1;
        List<Integer> vals = new ArrayList<>(mp.values());
        Collections.sort(vals);
        int n = vals.size();
        return vals.get(n-1) + vals.get(n-2) + vals.get(n-3);
    }
}
```

```cpp
class Solution {
public:
    int maxSumDistinctTriplet(vector<int>& x, vector<int>& y) {
        unordered_map<int,int> mp;
        for (int i = 0; i < x.size(); i++) {
            int key = x[i], val = y[i];
            mp[key] = max(mp[key], val);
        }
        if (mp.size() < 3) return -1;
        vector<int> vals;
        vals.reserve(mp.size());
        for (auto &p : mp) vals.push_back(p.second);
        sort(vals.begin(), vals.end());
        int n = vals.size();
        return vals[n-1] + vals[n-2] + vals[n-3];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} x
     * @param {number[]} y
     * @return {number}
     */
    maxSumDistinctTriplet(x, y) {
        const mp = new Map();
        for (let i = 0; i < x.length; i++) {
            const key = x[i], val = y[i];
            mp.set(key, Math.max(mp.get(key) || 0, val));
        }
        if (mp.size < 3) return -1;
        const vals = Array.from(mp.values()).sort((a, b) => a - b);
        const n = vals.length;
        return vals[n-1] + vals[n-2] + vals[n-3];
    }
}
```

```csharp
public class Solution {
    public int MaxSumDistinctTriplet(int[] x, int[] y) {
        var mp = new Dictionary<int,int>();
        for (int i = 0; i < x.Length; i++) {
            int key = x[i], val = y[i];
            if (mp.TryGetValue(key, out var existing)) {
                mp[key] = Math.Max(existing, val);
            } else {
                mp[key] = val;
            }
        }
        if (mp.Count < 3) return -1;
        var vals = mp.Values.ToList();
        vals.Sort();
        int n = vals.Count;
        return vals[n-1] + vals[n-2] + vals[n-3];
    }
}
```

```go
func maxSumDistinctTriplet(x []int, y []int) int {
    mp := make(map[int]int)
    for i := 0; i < len(x); i++ {
        key, val := x[i], y[i]
        if existing, ok := mp[key]; ok {
            if val > existing {
                mp[key] = val
            }
        } else {
            mp[key] = val
        }
    }
    if len(mp) < 3 {
        return -1
    }
    vals := make([]int, 0, len(mp))
    for _, v := range mp {
        vals = append(vals, v)
    }
    sort.Ints(vals)
    n := len(vals)
    return vals[n-1] + vals[n-2] + vals[n-3]
}
```

```kotlin
class Solution {
    fun maxSumDistinctTriplet(x: IntArray, y: IntArray): Int {
        val mp = mutableMapOf<Int, Int>()
        for (i in x.indices) {
            val key = x[i]
            val value = y[i]
            mp[key] = maxOf(mp.getOrDefault(key, 0), value)
        }
        if (mp.size < 3) return -1
        val vals = mp.values.sortedDescending()
        return vals[0] + vals[1] + vals[2]
    }
}
```

```swift
class Solution {
    func maxSumDistinctTriplet(_ x: [Int], _ y: [Int]) -> Int {
        var mp = [Int: Int]()
        for i in 0..<x.count {
            let key = x[i], val = y[i]
            mp[key] = max(mp[key] ?? 0, val)
        }
        if mp.count < 3 { return -1 }
        let vals = mp.values.sorted()
        let n = vals.count
        return vals[n-1] + vals[n-2] + vals[n-3]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 2. Hash Map + Min-Heap

### Intuition

Instead of sorting all values to find the top `3`, we can use a min-heap of size `3`. As we iterate through the distinct y-values, we maintain only the three largest seen so far. This avoids the overhead of sorting the entire collection.

Whenever the heap exceeds size `3`, we remove the smallest element. After processing all values, the heap contains exactly the three largest y-values (if at least `3` exist).

### Algorithm

1. Build a hash map mapping each x-value to its maximum y-value.
2. Initialize an empty min-heap.
3. For each y-value in the map:
   - Push it onto the heap.
   - If heap size exceeds `3`, pop the minimum.
4. If the heap has fewer than `3` elements, return `-1`.
5. Return the sum of all elements in the heap.

::tabs-start

```python
class Solution:
    def maxSumDistinctTriplet(self, x: List[int], y: List[int]) -> int:
        mp = {}
        for xi, yi in zip(x, y):
            mp[xi] = max(mp.get(xi, 0), yi)

        minHeap = []
        for val in mp.values():
            heapq.heappush(minHeap, val)
            if len(minHeap) > 3:
                heapq.heappop(minHeap)

        return -1 if len(minHeap) < 3 else sum(minHeap)
```

```java
public class Solution {
    public int maxSumDistinctTriplet(int[] x, int[] y) {
        Map<Integer,Integer> mp = new HashMap<>();
        for (int i = 0; i < x.length; i++) {
            mp.put(x[i], Math.max(mp.getOrDefault(x[i], 0), y[i]));
        }
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int val : mp.values()) {
            pq.offer(val);
            if (pq.size() > 3) {
                pq.poll();
            }
        }

        if (pq.size() < 3) {
            return -1;
        }
        int sum = 0;
        while (!pq.isEmpty()) {
            sum += pq.poll();
        }
        return sum;
    }
}
```

```cpp
class Solution {
public:
    int maxSumDistinctTriplet(vector<int>& x, vector<int>& y) {
        unordered_map<int,int> mp;
        for (int i = 0; i < x.size(); i++) {
            mp[x[i]] = max(mp[x[i]], y[i]);
        }
        priority_queue<int, vector<int>, greater<int>> pq;
        for (auto &p : mp) {
            pq.push(p.second);
            if (pq.size() > 3) {
                pq.pop();
            }
        }

        if (pq.size() < 3) return -1;
        int sum = 0;
        while (!pq.empty()) {
            sum += pq.top();
            pq.pop();
        }
        return sum;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} x
     * @param {number[]} y
     * @return {number}
     */
    maxSumDistinctTriplet(x, y) {
        const mp = new Map();
        for (let i = 0; i < x.length; i++) {
            mp.set(x[i], Math.max(mp.get(x[i])||0, y[i]));
        }
        const heap = new MinPriorityQueue();
        for (const val of mp.values()) {
            heap.enqueue(val);
            if (heap.size() > 3) {
                heap.dequeue();
            }
        }
        if (heap.size() < 3) {
            return -1;
        }
        return heap.dequeue() + heap.dequeue() + heap.dequeue();
    }
}
```

```csharp
public class Solution {
    public int MaxSumDistinctTriplet(int[] x, int[] y) {
        var mp = new Dictionary<int,int>();
        for (int i = 0; i < x.Length; i++) {
            int key = x[i], val = y[i];
            if (mp.TryGetValue(key, out var prev)) {
                mp[key] = Math.Max(prev, val);
            } else {
                mp[key] = val;
            }
        }
        var pq = new PriorityQueue<int,int>();
        foreach (var val in mp.Values) {
            pq.Enqueue(val, val);
            if (pq.Count > 3) {
                pq.Dequeue();
            }
        }

        if (pq.Count < 3) {
            return -1;
        }
        int sum = 0;
        while (pq.Count > 0) {
            sum += pq.Dequeue();
        }
        return sum;
    }
}
```

```go
func maxSumDistinctTriplet(x []int, y []int) int {
    mp := make(map[int]int)
    for i := 0; i < len(x); i++ {
        key, val := x[i], y[i]
        if existing, ok := mp[key]; ok {
            if val > existing {
                mp[key] = val
            }
        } else {
            mp[key] = val
        }
    }

    minHeap := &IntHeap{}
    heap.Init(minHeap)
    for _, val := range mp {
        heap.Push(minHeap, val)
        if minHeap.Len() > 3 {
            heap.Pop(minHeap)
        }
    }

    if minHeap.Len() < 3 {
        return -1
    }
    sum := 0
    for minHeap.Len() > 0 {
        sum += heap.Pop(minHeap).(int)
    }
    return sum
}

type IntHeap []int
func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun maxSumDistinctTriplet(x: IntArray, y: IntArray): Int {
        val mp = mutableMapOf<Int, Int>()
        for (i in x.indices) {
            val key = x[i]
            val value = y[i]
            mp[key] = maxOf(mp.getOrDefault(key, 0), value)
        }

        val pq = PriorityQueue<Int>()
        for (value in mp.values) {
            pq.offer(value)
            if (pq.size > 3) {
                pq.poll()
            }
        }

        if (pq.size < 3) return -1
        var sum = 0
        while (pq.isNotEmpty()) {
            sum += pq.poll()
        }
        return sum
    }
}
```

```swift
class Solution {
    func maxSumDistinctTriplet(_ x: [Int], _ y: [Int]) -> Int {
        var mp = [Int: Int]()
        for i in 0..<x.count {
            let key = x[i], val = y[i]
            mp[key] = max(mp[key] ?? 0, val)
        }

        var vals = Array(mp.values)
        vals.sort()
        if vals.count < 3 { return -1 }

        let n = vals.count
        return vals[n-1] + vals[n-2] + vals[n-3]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Greedy

### Intuition

We can track the top `3` candidates in constant space by maintaining a sorted list of the best `3` (x, y) pairs seen so far. For each new element, we either update an existing entry (if the x-value matches) or insert it if the y-value is large enough to make the top `3`.

The key insight is that we only ever need to compare against at most `3` entries. When an x-value already exists in our top `3`, we update its y-value if the new one is larger and re-sort. Otherwise, we check if the new y-value can replace the smallest of our current top `3`.

### Algorithm

1. Maintain an array `best` of `3` pairs `(x, y)`, initialized with sentinel values (like negative infinity for y).
2. For each `(xi, yi)` in the input:
   - If `xi` matches any x in `best`, update that entry's y-value if `yi` is larger, then re-sort.
   - Otherwise, insert `(xi, yi)` into the appropriate position if `yi` is larger than any of the current top `3` values.
3. If the smallest y-value in `best` is still a sentinel, return `-1`.
4. Return the sum of all three y-values.

::tabs-start

```python
class Solution:
    def maxSumDistinctTriplet(self, x: List[int], y: List[int]) -> int:
        best = [(None, float("-inf"))] * 3
        for xi, yi in zip(x, y):
            for i, (xj, yj) in enumerate(best):
                if xi == xj:
                    if yi > yj:
                        best[i] = (xi, yi)
                        best.sort(key=lambda t: t[1], reverse=True)
                    break
            else:
                if yi > best[0][1]:
                    best = [(xi, yi), best[0], best[1]]
                elif yi > best[1][1]:
                    best = [best[0], (xi, yi), best[1]]
                elif yi > best[2][1]:
                    best[2] = (xi, yi)

        return sum(v for _, v in best) if best[2][1] > float("-inf") else -1
```

```java
public class Solution {
    public int maxSumDistinctTriplet(int[] x, int[] y) {
        List<int[]> best = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            best.add(new int[]{Integer.MIN_VALUE, Integer.MIN_VALUE});
        }
        for (int idx = 0; idx < x.length; idx++) {
            int xi = x[idx], yi = y[idx];
            boolean updated = false;
            for (int i = 0; i < 3; i++) {
                if (best.get(i)[0] == xi) {
                    if (yi > best.get(i)[1]) {
                        best.get(i)[1] = yi;
                        best.sort((a, b) -> Integer.compare(b[1], a[1]));
                    }
                    updated = true;
                    break;
                }
            }
            if (updated) continue;
            if (yi > best.get(0)[1]) {
                best.add(0, new int[]{xi, yi});
                best.remove(3);
            } else if (yi > best.get(1)[1]) {
                best.add(1, new int[]{xi, yi});
                best.remove(3);
            } else if (yi > best.get(2)[1]) {
                best.get(2)[1] = yi;
                best.get(2)[0] = xi;
            }
        }
        if (best.get(2)[1] == Integer.MIN_VALUE) {
            return -1;
        }
        return best.get(0)[1] + best.get(1)[1] + best.get(2)[1];
    }
}
```

```cpp
class Solution {
public:
    int maxSumDistinctTriplet(vector<int>& x, vector<int>& y) {
        vector<pair<int,int>> best(3, {INT_MIN, INT_MIN});
        for (int i = 0; i < x.size(); i++) {
            int xi = x[i], yi = y[i];
            bool updated = false;
            for (int j = 0; j < 3; j++) {
                if (best[j].first == xi) {
                    if (yi > best[j].second) {
                        best[j].second = yi;
                        sort(best.begin(), best.end(),
                             [](auto &a, auto &b){ return a.second > b.second; });
                    }
                    updated = true;
                    break;
                }
            }
            if (updated) continue;
            if (yi > best[0].second) {
                best.insert(best.begin(), {xi, yi});
                best.pop_back();
            } else if (yi > best[1].second) {
                best.insert(best.begin()+1, {xi, yi});
                best.pop_back();
            } else if (yi > best[2].second) {
                best[2] = {xi, yi};
            }
        }
        if (best[2].second == INT_MIN) return -1;
        return best[0].second + best[1].second + best[2].second;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} x
     * @param {number[]} y
     * @return {number}
     */
    maxSumDistinctTriplet(x, y) {
        let best = [
            [null, -Infinity],
            [null, -Infinity],
            [null, -Infinity]
        ];
        for (let i = 0; i < x.length; i++) {
            const xi = x[i], yi = y[i];
            let updated = false;
            for (let j = 0; j < 3; j++) {
                if (best[j][0] === xi) {
                    if (yi > best[j][1]) {
                        best[j][1] = yi;
                        best.sort((a, b) => b[1] - a[1]);
                    }
                    updated = true;
                    break;
                }
            }
            if (updated) continue;
            if (yi > best[0][1]) {
                best = [[xi, yi], best[0], best[1]];
            } else if (yi > best[1][1]) {
                best = [best[0], [xi, yi], best[1]];
            } else if (yi > best[2][1]) {
                best[2] = [xi, yi];
            }
        }
        return best[2][1] === -Infinity
            ? -1
            : best[0][1] + best[1][1] + best[2][1];
    }
}
```

```csharp
public class Solution {
    public int MaxSumDistinctTriplet(int[] x, int[] y) {
        var best = new List<(int xi, int yi)> {
            (int.MinValue, int.MinValue),
            (int.MinValue, int.MinValue),
            (int.MinValue, int.MinValue)
        };
        for (int i = 0; i < x.Length; i++) {
            int xi = x[i], yi = y[i];
            bool updated = false;
            for (int j = 0; j < 3; j++) {
                if (best[j].xi == xi) {
                    if (yi > best[j].yi) {
                        best[j] = (xi, yi);
                        best = best.OrderByDescending(t => t.yi).ToList();
                    }
                    updated = true;
                    break;
                }
            }
            if (updated) continue;
            if (yi > best[0].yi) {
                best = new List<(int,int)> { (xi, yi), best[0], best[1] };
            } else if (yi > best[1].yi) {
                best = new List<(int,int)> { best[0], (xi, yi), best[1] };
            } else if (yi > best[2].yi) {
                best[2] = (xi, yi);
            }
        }
        return best[2].yi == int.MinValue
            ? -1
            : best[0].yi + best[1].yi + best[2].yi;
    }
}
```

```go
func maxSumDistinctTriplet(x []int, y []int) int {
    const minInt = -1 << 31
    best := [][2]int{{minInt, minInt}, {minInt, minInt}, {minInt, minInt}}

    for i := 0; i < len(x); i++ {
        xi, yi := x[i], y[i]
        updated := false
        for j := 0; j < 3; j++ {
            if best[j][0] == xi {
                if yi > best[j][1] {
                    best[j][1] = yi
                    sort.Slice(best, func(a, b int) bool {
                        return best[a][1] > best[b][1]
                    })
                }
                updated = true
                break
            }
        }
        if updated {
            continue
        }
        if yi > best[0][1] {
            best = [][2]int{{xi, yi}, best[0], best[1]}
        } else if yi > best[1][1] {
            best = [][2]int{best[0], {xi, yi}, best[1]}
        } else if yi > best[2][1] {
            best[2] = [2]int{xi, yi}
        }
    }

    if best[2][1] == minInt {
        return -1
    }
    return best[0][1] + best[1][1] + best[2][1]
}
```

```kotlin
class Solution {
    fun maxSumDistinctTriplet(x: IntArray, y: IntArray): Int {
        var best = mutableListOf(
            intArrayOf(Int.MIN_VALUE, Int.MIN_VALUE),
            intArrayOf(Int.MIN_VALUE, Int.MIN_VALUE),
            intArrayOf(Int.MIN_VALUE, Int.MIN_VALUE)
        )

        for (i in x.indices) {
            val xi = x[i]
            val yi = y[i]
            var updated = false
            for (j in 0 until 3) {
                if (best[j][0] == xi) {
                    if (yi > best[j][1]) {
                        best[j][1] = yi
                        best.sortByDescending { it[1] }
                    }
                    updated = true
                    break
                }
            }
            if (updated) continue
            if (yi > best[0][1]) {
                best = mutableListOf(intArrayOf(xi, yi), best[0], best[1])
            } else if (yi > best[1][1]) {
                best = mutableListOf(best[0], intArrayOf(xi, yi), best[1])
            } else if (yi > best[2][1]) {
                best[2] = intArrayOf(xi, yi)
            }
        }

        return if (best[2][1] == Int.MIN_VALUE) -1
               else best[0][1] + best[1][1] + best[2][1]
    }
}
```

```swift
class Solution {
    func maxSumDistinctTriplet(_ x: [Int], _ y: [Int]) -> Int {
        var best: [[Int]] = [[Int.min, Int.min], [Int.min, Int.min], [Int.min, Int.min]]

        for i in 0..<x.count {
            let xi = x[i], yi = y[i]
            var updated = false
            for j in 0..<3 {
                if best[j][0] == xi {
                    if yi > best[j][1] {
                        best[j][1] = yi
                        best.sort { $0[1] > $1[1] }
                    }
                    updated = true
                    break
                }
            }
            if updated { continue }
            if yi > best[0][1] {
                best = [[xi, yi], best[0], best[1]]
            } else if yi > best[1][1] {
                best = [best[0], [xi, yi], best[1]]
            } else if yi > best[2][1] {
                best[2] = [xi, yi]
            }
        }

        return best[2][1] == Int.min ? -1 : best[0][1] + best[1][1] + best[2][1]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## Common Pitfalls

### Not Taking Maximum Y for Each X

When multiple indices share the same x-value, only the maximum corresponding y-value matters. Using any y-value instead of tracking the maximum for each distinct x leads to suboptimal triplet selections.

### Forgetting to Handle Fewer Than Three Distinct X-Values

If there are fewer than 3 distinct x-values in the input, no valid triplet exists. Failing to check this condition before computing the sum causes index-out-of-bounds errors or returns an invalid result instead of `-1`.