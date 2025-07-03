## 1. Two Heaps

::tabs-start

```python
class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        maxProfit = []  # Max heap
        minCapital = [(c, p) for c, p in zip(capital, profits)]  # Min heap
        heapq.heapify(minCapital)

        for _ in range(k):
            while minCapital and minCapital[0][0] <= w:
                c, p = heapq.heappop(minCapital)
                heapq.heappush(maxProfit, -p)

            if not maxProfit:
                break

            w += -heapq.heappop(maxProfit)

        return w
```

```java
public class Solution {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        PriorityQueue<int[]> minCapital = new PriorityQueue<>((a, b) -> a[0] - b[0]); // Min heap
        PriorityQueue<Integer> maxProfit = new PriorityQueue<>((a, b) -> b - a);      // Max heap

        for (int i = 0; i < capital.length; i++) {
            minCapital.offer(new int[]{capital[i], profits[i]});
        }

        for (int i = 0; i < k; i++) {
            while (!minCapital.isEmpty() && minCapital.peek()[0] <= w) {
                maxProfit.offer(minCapital.poll()[1]);
            }
            if (maxProfit.isEmpty()) {
                break;
            }
            w += maxProfit.poll();
        }

        return w;
    }
}
```

```cpp
class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {
        priority_queue<int> maxProfit; // Max heap
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> minCapital; // Min heap

        for (int i = 0; i < capital.size(); i++) {
            minCapital.emplace(capital[i], profits[i]);
        }

        for (int i = 0; i < k; i++) {
            while (!minCapital.empty() && minCapital.top().first <= w) {
                maxProfit.push(minCapital.top().second);
                minCapital.pop();
            }
            if (maxProfit.empty()) {
                break;
            }
            w += maxProfit.top();
            maxProfit.pop();
        }

        return w;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} k
     * @param {number} w
     * @param {number[]} profits
     * @param {number[]} capital
     * @return {number}
     */
    findMaximizedCapital(k, w, profits, capital) {
        const minCapital = new PriorityQueue((a, b) => a[0] - b[0]); // Min heap
        const maxProfit = new PriorityQueue((a, b) => b - a); // Max heap

        for (let i = 0; i < capital.length; i++) {
            minCapital.enqueue([capital[i], profits[i]]);
        }

        for (let i = 0; i < k; i++) {
            while (!minCapital.isEmpty() && minCapital.front()[0] <= w) {
                maxProfit.enqueue(minCapital.dequeue()[1]);
            }
            if (maxProfit.isEmpty()) {
                break;
            }
            w += maxProfit.dequeue();
        }

        return w;
    }
}
```

```csharp
public class Solution {
    public int FindMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        var minCapital = new List<(int c, int p)>();
        for (int i = 0; i < capital.Length; i++) {
            minCapital.Add((capital[i], profits[i]));
        }

        // Min-heap by capital
        minCapital.Sort((a, b) => a.c.CompareTo(b.c));

        // Max-heap by profit
        var maxProfit = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
        int iPtr = 0;

        for (int i = 0; i < k; i++) {
            while (iPtr < minCapital.Count && minCapital[iPtr].c <= w) {
                maxProfit.Enqueue(minCapital[iPtr].p, minCapital[iPtr].p);
                iPtr++;
            }

            if (maxProfit.Count == 0) {
                break;
            }

            w += maxProfit.Dequeue();
        }

        return w;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Two Heaps (Optimal)

::tabs-start

```python
class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        class Node:
            def __init__(self, idx):
                self.idx = idx

            def __lt__(self, other):
                if capital[self.idx] != capital[other.idx]:
                    return capital[self.idx] < capital[other.idx]
                return self.idx < other.idx

        minCapital = []
        maxProfit = []
        for i in range(len(capital)):
            heapq.heappush(minCapital, Node(i))

        for _ in range(k):
            while minCapital and capital[minCapital[0].idx] <= w:
                idx = heapq.heappop(minCapital).idx
                heapq.heappush(maxProfit, -profits[idx])

            if not maxProfit:
                break
            w += -heapq.heappop(maxProfit)

        return w
```

```java
public class Solution {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        PriorityQueue<Integer> minCapital = new PriorityQueue<>((a, b) -> capital[a] - capital[b]);
        PriorityQueue<Integer> maxProfit = new PriorityQueue<>((a, b) -> profits[b] - profits[a]);

        for (int i = 0; i < capital.length; i++) {
            minCapital.offer(i);
        }

        for (int i = 0; i < k; i++) {
            while (!minCapital.isEmpty() && capital[minCapital.peek()] <= w) {
                maxProfit.offer(minCapital.poll());
            }
            if (maxProfit.isEmpty()) {
                break;
            }
            w += profits[maxProfit.poll()];
        }

        return w;
    }
}
```

```cpp
class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {
        auto cmpCapital = [&](int a, int b) { return capital[a] > capital[b]; };
        auto cmpProfit = [&](int a, int b) { return profits[a] < profits[b]; };

        priority_queue<int, vector<int>, decltype(cmpCapital)> minCapital(cmpCapital);
        priority_queue<int, vector<int>, decltype(cmpProfit)> maxProfit(cmpProfit);

        for (int i = 0; i < capital.size(); i++) {
            minCapital.push(i);
        }

        for (int i = 0; i < k; i++) {
            while (!minCapital.empty() && capital[minCapital.top()] <= w) {
                maxProfit.push(minCapital.top());
                minCapital.pop();
            }
            if (maxProfit.empty()) {
                break;
            }
            w += profits[maxProfit.top()];
            maxProfit.pop();
        }

        return w;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} k
     * @param {number} w
     * @param {number[]} profits
     * @param {number[]} capital
     * @return {number}
     */
    findMaximizedCapital(k, w, profits, capital) {
        const minCapital = new PriorityQueue((a, b) => capital[a] - capital[b]);
        const maxProfit = new PriorityQueue((a, b) => profits[b] - profits[a]);

        for (let i = 0; i < capital.length; i++) {
            minCapital.enqueue(i);
        }

        for (let i = 0; i < k; i++) {
            while (!minCapital.isEmpty() && capital[minCapital.front()] <= w) {
                maxProfit.enqueue(minCapital.dequeue());
            }
            if (maxProfit.isEmpty()) {
                break;
            }
            w += profits[maxProfit.dequeue()];
        }

        return w;
    }
}
```

```csharp
public class Solution {
    public int FindMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        var minCapital = new PriorityQueue<int, int>(); // index with capital as priority
        var maxProfit = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a))); // max heap by profit

        for (int i = 0; i < capital.Length; i++) {
            minCapital.Enqueue(i, capital[i]);
        }

        for (int i = 0; i < k; i++) {
            while (minCapital.Count > 0 && capital[minCapital.Peek()] <= w) {
                int idx = minCapital.Dequeue();
                maxProfit.Enqueue(profits[idx], profits[idx]);
            }

            if (maxProfit.Count == 0) {
                break;
            }

            w += maxProfit.Dequeue();
        }

        return w;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Sorting + Max-Heap

::tabs-start

```python
class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        n = len(profits)
        indices = list(range(n))
        indices.sort(key=lambda i: capital[i])

        maxProfit, idx = [], 0
        for _ in range(k):
            while idx < n and capital[indices[idx]] <= w:
                heapq.heappush(maxProfit, -profits[indices[idx]])
                idx += 1

            if not maxProfit:
                break
            w += -heapq.heappop(maxProfit)

        return w
```

```java
public class Solution {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int n = profits.length;
        Integer[] indices = new Integer[n];
        for (int i = 0; i < n; i++) {
            indices[i] = i;
        }
        Arrays.sort(indices, (a, b) -> Integer.compare(capital[a], capital[b]));

        PriorityQueue<Integer> maxProfit = new PriorityQueue<>(Collections.reverseOrder());
        int idx = 0;
        for (int i = 0; i < k; i++) {
            while (idx < n && capital[indices[idx]] <= w) {
                maxProfit.add(profits[indices[idx]]);
                idx++;
            }
            if (maxProfit.isEmpty()) {
                break;
            }
            w += maxProfit.poll();
        }

        return w;
    }
}
```

```cpp
class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {
        int n = profits.size();
        vector<int> indices(n);
        for (int i = 0; i < n; i++) {
            indices[i] = i;
        }
        sort(indices.begin(), indices.end(), [&](int a, int b) {
            return capital[a] < capital[b];
        });

        priority_queue<int> maxProfit;
        int idx = 0;
        for (int i = 0; i < k; i++) {
            while (idx < n && capital[indices[idx]] <= w) {
                maxProfit.push(profits[indices[idx]]);
                idx++;
            }
            if (maxProfit.empty()) {
                break;
            }
            w += maxProfit.top();
            maxProfit.pop();
        }

        return w;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} k
     * @param {number} w
     * @param {number[]} profits
     * @param {number[]} capital
     * @return {number}
     */
    findMaximizedCapital(k, w, profits, capital) {
        const n = profits.length;
        const indices = Array.from({ length: n }, (_, i) => i);
        indices.sort((a, b) => capital[a] - capital[b]);

        const maxProfit = new MaxPriorityQueue();
        let idx = 0;
        for (let i = 0; i < k; i++) {
            while (idx < n && capital[indices[idx]] <= w) {
                maxProfit.enqueue(profits[indices[idx]]);
                idx++;
            }
            if (maxProfit.isEmpty()) {
                break;
            }
            w += maxProfit.dequeue();
        }

        return w;
    }
}
```

```csharp
public class Solution {
    public int FindMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int n = profits.Length;
        int[] indices = new int[n];
        for (int i = 0; i < n; i++) {
            indices[i] = i;
        }

        Array.Sort(indices, (a, b) => capital[a].CompareTo(capital[b]));

        var maxProfit = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
        int idx = 0;

        for (int i = 0; i < k; i++) {
            while (idx < n && capital[indices[idx]] <= w) {
                maxProfit.Enqueue(profits[indices[idx]], profits[indices[idx]]);
                idx++;
            }

            if (maxProfit.Count == 0) {
                break;
            }

            w += maxProfit.Dequeue();
        }

        return w;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
