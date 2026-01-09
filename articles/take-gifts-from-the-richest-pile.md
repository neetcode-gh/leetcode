## 1. Simulation

### Intuition

The most straightforward approach simulates the process exactly as described. Each second, we find the pile with the most gifts, take gifts from it, and leave behind the floor of its square root. After `k` seconds, we sum up all remaining gifts. Finding the maximum each time requires scanning all piles.

### Algorithm

1. Repeat `k` times:
   - Find the index of the maximum element in the array.
   - Replace that element with the floor of its square root.
2. Return the sum of all elements.

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

```go
func pickGifts(gifts []int, k int) int64 {
    for t := 0; t < k; t++ {
        maxIdx := 0
        for i := 1; i < len(gifts); i++ {
            if gifts[i] > gifts[maxIdx] {
                maxIdx = i
            }
        }
        gifts[maxIdx] = int(math.Floor(math.Sqrt(float64(gifts[maxIdx]))))
    }

    var sum int64 = 0
    for _, g := range gifts {
        sum += int64(g)
    }
    return sum
}
```

```kotlin
class Solution {
    fun pickGifts(gifts: IntArray, k: Int): Long {
        for (t in 0 until k) {
            var maxIdx = 0
            for (i in 1 until gifts.size) {
                if (gifts[i] > gifts[maxIdx]) {
                    maxIdx = i
                }
            }
            gifts[maxIdx] = kotlin.math.floor(kotlin.math.sqrt(gifts[maxIdx].toDouble())).toInt()
        }

        return gifts.sumOf { it.toLong() }
    }
}
```

```swift
class Solution {
    func pickGifts(_ gifts: [Int], _ k: Int) -> Int {
        var gifts = gifts
        for _ in 0..<k {
            var maxIdx = 0
            for i in 1..<gifts.count {
                if gifts[i] > gifts[maxIdx] {
                    maxIdx = i
                }
            }
            gifts[maxIdx] = Int(floor(sqrt(Double(gifts[maxIdx]))))
        }

        return gifts.reduce(0, +)
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

### Intuition

Finding the maximum element repeatedly is expensive with a linear scan. A max-heap keeps the largest element at the top, allowing O(log `n`) extraction and insertion. Each second, we pop the maximum, compute its square root, and push the result back. This is much faster when `k` is large relative to `n`.

### Algorithm

1. Build a max-heap from all gift values.
2. Repeat `k` times:
   - Pop the maximum value from the heap.
   - Push the floor of its square root back into the heap.
3. Sum all elements remaining in the heap and return the total.

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

```go
func pickGifts(gifts []int, k int) int64 {
    h := &MaxHeap{}
    heap.Init(h)
    for _, g := range gifts {
        heap.Push(h, g)
    }

    for t := 0; t < k; t++ {
        n := heap.Pop(h).(int)
        heap.Push(h, int(math.Floor(math.Sqrt(float64(n)))))
    }

    var sum int64 = 0
    for h.Len() > 0 {
        sum += int64(heap.Pop(h).(int))
    }
    return sum
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
    fun pickGifts(gifts: IntArray, k: Int): Long {
        val pq = PriorityQueue<Int>(compareByDescending { it })
        for (g in gifts) pq.offer(g)

        for (t in 0 until k) {
            val n = pq.poll()
            pq.offer(kotlin.math.floor(kotlin.math.sqrt(n.toDouble())).toInt())
        }

        var sum = 0L
        while (pq.isNotEmpty()) {
            sum += pq.poll()
        }
        return sum
    }
}
```

```swift
class Solution {
    func pickGifts(_ gifts: [Int], _ k: Int) -> Int {
        var heap = Heap<Int>(sort: >)
        for g in gifts {
            heap.insert(g)
        }

        for _ in 0..<k {
            if let n = heap.remove() {
                heap.insert(Int(floor(sqrt(Double(n)))))
            }
        }

        var sum = 0
        while !heap.isEmpty {
            if let val = heap.remove() {
                sum += val
            }
        }
        return sum
    }
}

struct Heap<T> {
    var elements: [T] = []
    let sort: (T, T) -> Bool

    init(sort: @escaping (T, T) -> Bool) {
        self.sort = sort
    }

    var isEmpty: Bool { elements.isEmpty }
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
            let left = 2 * parent + 1
            let right = 2 * parent + 2
            var candidate = parent
            if left < elements.count && sort(elements[left], elements[candidate]) {
                candidate = left
            }
            if right < elements.count && sort(elements[right], elements[candidate]) {
                candidate = right
            }
            if candidate == parent { return }
            elements.swapAt(parent, candidate)
            parent = candidate
        }
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