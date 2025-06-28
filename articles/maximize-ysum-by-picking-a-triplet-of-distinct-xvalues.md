## 1. Hash Map

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 2. Hash Map + Min-Heap

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Greedy

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$