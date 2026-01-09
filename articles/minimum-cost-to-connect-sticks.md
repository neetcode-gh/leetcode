## 1. Greedy

### Intuition

When combining two sticks, the cost equals the sum of their lengths, and that combined stick may be used in future combinations. Sticks combined early contribute their length to multiple subsequent operations. To minimize total cost, we should combine the smallest sticks first so that larger values are added fewer times. A `min-heap` lets us efficiently retrieve and combine the two smallest sticks at each step.

### Algorithm

1. Build a min-heap from all stick lengths.
2. While more than one stick remains:
   - Pop the two smallest sticks.
   - Combine them (sum their lengths).
   - Add the combination cost to the total.
   - Push the new stick back into the heap.
3. Return the total cost.

::tabs-start

```python
class Solution:
    def connectSticks(self, sticks: List[int]) -> int:
        min_heap = sticks
        heapq.heapify(min_heap)
        total_cost = 0

        while len(min_heap) > 1:
            new_stick = heapq.heappop(min_heap) + heapq.heappop(min_heap)
            total_cost += new_stick
            heapq.heappush(min_heap, new_stick)

        return total_cost
```

```java
class Solution {
    public int connectSticks(int[] sticks) {
        int totalCost = 0;
 
        PriorityQueue<Integer> pq = new PriorityQueue<>();
 
        for (int stick : sticks) {
            pq.add(stick);
        }
 
        // combine two of the smallest sticks until we are left with just one.
        while (pq.size() > 1) {
            int stick1 = pq.remove();
            int stick2 = pq.remove();
            
            int cost = stick1 + stick2;
            totalCost += cost;
            
            pq.add(stick1 + stick2);
        }
 
        return totalCost;
    }
}
```

```cpp
class Solution {
public:
    int connectSticks(vector<int>& sticks) {
        int totalCost = 0;
        
        priority_queue<int, vector<int>, greater<int>> pq;
        
        for (int i = 0; i < sticks.size(); i++) {
            pq.push(sticks[i]);
        }
        
        // combine two of the smallest sticks until we are left with just one.
        while (pq.size() > 1) {
            int stick1 = pq.top(); 
            pq.pop();
            int stick2 = pq.top(); 
            pq.pop();
            
            int cost = stick1 + stick2;
            totalCost += cost;
            
            pq.push(stick1+stick2);
        }
        
        return totalCost;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} sticks
     * @return {number}
     */
    connectSticks(sticks) {
        let totalCost = 0;

        // Using @datastructures-js/priority-queue
        const pq = MinPriorityQueue.fromArray(sticks);

        while (pq.size() > 1) {
            const stick1 = pq.dequeue();
            const stick2 = pq.dequeue();

            const cost = stick1 + stick2;
            totalCost += cost;

            pq.enqueue(cost);
        }

        return totalCost;
    }
}
```

```csharp
public class Solution {
    public int ConnectSticks(int[] sticks) {
        var pq = new PriorityQueue<int, int>();
        foreach (int stick in sticks) {
            pq.Enqueue(stick, stick);
        }

        int totalCost = 0;

        while (pq.Count > 1) {
            int stick1 = pq.Dequeue();
            int stick2 = pq.Dequeue();

            int cost = stick1 + stick2;
            totalCost += cost;

            pq.Enqueue(cost, cost);
        }

        return totalCost;
    }
}
```

```go
func connectSticks(sticks []int) int {
    h := &IntHeap{}
    heap.Init(h)

    for _, stick := range sticks {
        heap.Push(h, stick)
    }

    totalCost := 0

    for h.Len() > 1 {
        stick1 := heap.Pop(h).(int)
        stick2 := heap.Pop(h).(int)

        cost := stick1 + stick2
        totalCost += cost

        heap.Push(h, cost)
    }

    return totalCost
}

type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *IntHeap) Push(x interface{}) {
    *h = append(*h, x.(int))
}

func (h *IntHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun connectSticks(sticks: IntArray): Int {
        val pq = PriorityQueue<Int>()
        for (stick in sticks) {
            pq.offer(stick)
        }

        var totalCost = 0

        while (pq.size > 1) {
            val stick1 = pq.poll()
            val stick2 = pq.poll()

            val cost = stick1 + stick2
            totalCost += cost

            pq.offer(cost)
        }

        return totalCost
    }
}
```

```swift
class Solution {
    func connectSticks(_ sticks: [Int]) -> Int {
        var heap = Heap<Int>(sort: <)
        for stick in sticks {
            heap.insert(stick)
        }

        var totalCost = 0

        while heap.count > 1 {
            let stick1 = heap.remove()!
            let stick2 = heap.remove()!

            let cost = stick1 + stick2
            totalCost += cost

            heap.insert(cost)
        }

        return totalCost
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
        guard !isEmpty else { return nil }
        elements.swapAt(0, elements.count - 1)
        let removed = elements.removeLast()
        if !isEmpty { siftDown(from: 0) }
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

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

>  Where $N$ is the length of the input array.
