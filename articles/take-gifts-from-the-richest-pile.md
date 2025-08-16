## 1. Simulation

::tabs-start

```python
class Solution:
    def pickGifts(self, gifts: List[int], k: int) -> int:
        for _ in range(k):
            maxIdx = 0
            for i in range(1, len(gifts)):
                if gifts[i] > gifts[maxIdx]:
                    maxIdx = i
            gifts[maxIdx] = int(sqrt(gifts[maxIdx]))
        return sum(gifts)
```

```java
public class Solution {
    public long pickGifts(int[] gifts, int k) {
        for (int t = 0; t < k; t++) {
            int maxIdx = 0;
            for (int i = 1; i < gifts.length; i++) {
                if (gifts[i] > gifts[maxIdx]) {
                    maxIdx = i;
                }
            }
            gifts[maxIdx] = (int) Math.floor(Math.sqrt(gifts[maxIdx]));
        }

        long sum = 0;
        for (int g : gifts) sum += g;
        return sum;
    }
}
```

```cpp
class Solution {
public:
    long long pickGifts(vector<int>& gifts, int k) {
        for (int t = 0; t < k; t++) {
            int maxIdx = 0;
            for (int i = 1; i < gifts.size(); i++) {
                if (gifts[i] > gifts[maxIdx]) {
                    maxIdx = i;
                }
            }
            gifts[maxIdx] = floor(sqrt(gifts[maxIdx]));
        }

        long long sum = 0;
        for (int g : gifts) sum += g;
        return sum;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} gifts
     * @param {number} k
     * @return {number}
     */
    pickGifts(gifts, k) {
        for (let t = 0; t < k; t++) {
            let maxIdx = 0;
            for (let i = 1; i < gifts.length; i++) {
                if (gifts[i] > gifts[maxIdx]) {
                    maxIdx = i;
                }
            }
            gifts[maxIdx] = Math.floor(Math.sqrt(gifts[maxIdx]));
        }

        return gifts.reduce((a, b) => a + b, 0);
    }
}
```

```csharp
public class Solution {
    public long PickGifts(int[] gifts, int k) {
        for (int t = 0; t < k; t++) {
            int maxIdx = 0;
            for (int i = 1; i < gifts.Length; i++) {
                if (gifts[i] > gifts[maxIdx]) {
                    maxIdx = i;
                }
            }
            gifts[maxIdx] = (int)Math.Floor(Math.Sqrt(gifts[maxIdx]));
        }

        long sum = 0;
        foreach (var g in gifts) sum += g;
        return sum;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * k)$
* Space complexity: $O(1)$ extra space.

> Where $n$ is the size of input array, $k$ is the number of seconds.

---

## 2. Max-Heap

::tabs-start

```python
class Solution:
    def pickGifts(self, gifts: List[int], k: int) -> int:
        for i in range(len(gifts)):
            gifts[i] = -gifts[i]
        heapq.heapify(gifts)

        for _ in range(k):
            n = -heapq.heappop(gifts)
            heapq.heappush(gifts, -floor(sqrt(n)))

        return -sum(gifts)
```

```java
public class Solution {
    public long pickGifts(int[] gifts, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int g : gifts) pq.offer(g);

        for (int t = 0; t < k; t++) {
            int n = pq.poll();
            pq.offer((int) Math.floor(Math.sqrt(n)));
        }

        long sum = 0;
        while (!pq.isEmpty()) sum += pq.poll();
        return sum;
    }
}
```

```cpp
class Solution {
public:
    long long pickGifts(vector<int>& gifts, int k) {
        priority_queue<int> pq(gifts.begin(), gifts.end());

        for (int t = 0; t < k; t++) {
            int n = pq.top(); pq.pop();
            pq.push((int)floor(sqrt(n)));
        }

        long long sum = 0;
        while (!pq.empty()) {
            sum += pq.top(); pq.pop();
        }
        return sum;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} gifts
     * @param {number} k
     * @return {number}
     */
    pickGifts(gifts, k) {
        const pq = new MaxPriorityQueue();
        gifts.forEach(g => pq.enqueue(g));

        for (let t = 0; t < k; t++) {
            const n = pq.dequeue();
            pq.enqueue(Math.floor(Math.sqrt(n)));
        }

        let sum = 0;
        while (!pq.isEmpty()) {
            sum += pq.dequeue();
        }
        return sum;
    }
}
```

```csharp
public class Solution {
    public long PickGifts(int[] gifts, int k) {
        var pq = new PriorityQueue<int, int>();

        foreach (var g in gifts) {
            pq.Enqueue(g, -g);
        }

        for (int t = 0; t < k; t++) {
            int n = pq.Dequeue();
            pq.Enqueue((int)Math.Floor(Math.Sqrt(n)), -(int)Math.Floor(Math.Sqrt(n)));
        }

        long sum = 0;
        while (pq.Count > 0) {
            sum += pq.Dequeue();
        }
        return sum;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: 
    - $O(n + k \log n)$ in Python.
    - $O(n \log n + k \log n)$ in other languages.
* Space complexity: $O(n)$

> Where $n$ is the size of input array, $k$ is the number of seconds.