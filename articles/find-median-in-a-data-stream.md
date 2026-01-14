## 1. Sorting

### Intuition

The simplest way to find the median is to keep all numbers in a list and
sort them whenever we need the median. After sorting, the numbers are in
increasing order, making it easy to pick the "middle" value(s).

- If we have an **odd** number of elements, the median is the **middle** element.
- If we have an **even** number of elements, the median is the **average**
  of the two middle elements.

This approach is slow because sorting happens every time we query the median,
but it is the easiest to understand and implement.

### Algorithm

1. **Initialize**
   - Create an empty list `data`.

2. **addNum(x)**
   - Append `x` to the list.

3. **findMedian()**
   - Sort the list.
   - Let `n = length of data`.
   - If `n` is odd:
     - Return `data[n // 2]`.
   - Else:
     - Return `(data[n // 2] + data[n // 2 - 1]) / 2`.

::tabs-start

```python
class MedianFinder:

    def __init__(self):
        self.data = []

    def addNum(self, num: int) -> None:
        self.data.append(num)

    def findMedian(self) -> float:
        self.data.sort()
        n = len(self.data)
        return (self.data[n // 2] if (n & 1) else
                (self.data[n // 2] + self.data[n // 2 - 1]) / 2)
```

```java
public class MedianFinder {
    private ArrayList<Integer> data;

    public MedianFinder() {
        data = new ArrayList<>();
    }

    public void addNum(int num) {
        data.add(num);
    }

    public double findMedian() {
        Collections.sort(data);
        int n = data.size();
        if ((n & 1) == 1) {
            return data.get(n / 2);
        } else {
            return (data.get(n / 2) + data.get(n / 2 - 1)) / 2.0;
        }
    }
}
```

```cpp
class MedianFinder {
    vector<int> data;

public:
    MedianFinder() {}

    void addNum(int num) {
        data.push_back(num);
    }

    double findMedian() {
        sort(data.begin(), data.end());
        int n = data.size();
        if (n & 1) {
            return data[n / 2];
        } else {
            return (data[n / 2] + data[n / 2 - 1]) / 2.0;
        }
    }
};
```

```javascript
class MedianFinder {
    constructor() {
        this.data = [];
    }

    /**
     *
     * @param {number} num
     * @return {void}
     */
    addNum(num) {
        this.data.push(num);
    }

    /**
     * @return {number}
     */
    findMedian() {
        this.data.sort((a, b) => a - b);
        let n = this.data.length;
        if (n & 1) {
            return this.data[Math.floor(n / 2)];
        } else {
            return (this.data[n / 2] + this.data[n / 2 - 1]) / 2;
        }
    }
}
```

```csharp
class MedianFinder {
    private List<int> data;

    public MedianFinder() {
        data = new List<int>();
    }

    public void AddNum(int num) {
        data.Add(num);
    }

    public double FindMedian() {
        data.Sort();
        int n = data.Count;
        if ((n & 1) == 1) {
            return data[n / 2];
        } else {
            return (data[n / 2] + data[n / 2 - 1]) / 2.0;
        }
    }
}
```

```go
type MedianFinder struct {
    data []int
}

func Constructor() MedianFinder {
    return MedianFinder{}
}

func (this *MedianFinder) AddNum(num int) {
    this.data = append(this.data, num)
}

func (this *MedianFinder) FindMedian() float64 {
    sort.Ints(this.data)
    n := len(this.data)
    if n%2 == 1 {
        return float64(this.data[n/2])
    }
    return float64(this.data[n/2-1]+this.data[n/2]) / 2.0
}
```

```kotlin
class MedianFinder() {
    private val data = mutableListOf<Int>()

    fun addNum(num: Int) {
        data.add(num)
    }

    fun findMedian(): Double {
        data.sort()
        val n = data.size
        return if (n % 2 == 1) {
            data[n / 2].toDouble()
        } else {
            (data[n / 2] + data[n / 2 - 1]) / 2.0
        }
    }
}
```

```swift
class MedianFinder {
    private var data: [Int]

    init() {
        self.data = []
    }

    func addNum(_ num: Int) {
        data.append(num)
    }

    func findMedian() -> Double {
        data.sort()
        let n = data.count
        if n % 2 == 1 {
            return Double(data[n / 2])
        } else {
            return (Double(data[n / 2]) + Double(data[n / 2 - 1])) / 2.0
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m)$ for $addNum()$, $O(m * n \log n)$ for $findMedian()$.
- Space complexity: $O(n)$

> Where $m$ is the number of function calls and $n$ is the length of the array.

---

## 2. Heap

### Intuition

To efficiently find the median while numbers keep coming, we split the
stream into two halves:

- A **max-heap** (`small`) that stores the *smaller half* of the numbers.
  - The largest number of this half is on top.
- A **min-heap** (`large`) that stores the *larger half* of the numbers.
  - The smallest number of this half is on top.

The goal:
- Ensure both heaps are balanced in size (difference at most 1).
- Ensure all numbers in `small` are ≤ all numbers in `large`.

This setup allows:
- Median = top of the bigger heap (if odd count)
- Median = average of both tops (if even count)

This gives **O(log n)** insert and **O(1)** median lookup.

### Algorithm

1. **Initialize**
   - Create two heaps:
     - `small` -> max-heap for lower half
     - `large` -> min-heap for upper half

2. **addNum(x)**
   - If `large` is not empty and `x` is greater than the smallest element in `large`,
     insert into `large`.
   - Otherwise insert into `small`.
   - Rebalance:
     - If one heap becomes larger than the other by more than `1`,
       move the top element to the other heap.

3. **findMedian()**
   - If one heap has more elements:
     - Median = top of that heap.
   - If both heaps have equal elements:
     - Median = average of both heap tops.

::tabs-start

```python
class MedianFinder:
    def __init__(self):
        # two heaps, large, small, minheap, maxheap
        # heaps should be equal size
        self.small, self.large = [], []

    def addNum(self, num: int) -> None:
        if self.large and num > self.large[0]:
            heapq.heappush(self.large, num)
        else:
            heapq.heappush(self.small, -1 * num)

        if len(self.small) > len(self.large) + 1:
            val = -1 * heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small) + 1:
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -1 * val)

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return -1 * self.small[0]
        elif len(self.large) > len(self.small):
            return self.large[0]
        return (-1 * self.small[0] + self.large[0]) / 2.0
```

```java
public class MedianFinder {

    private Queue<Integer> smallHeap; //small elements - maxHeap
    private Queue<Integer> largeHeap; //large elements - minHeap

    public MedianFinder() {
        smallHeap = new PriorityQueue<>((a, b) -> b - a);
        largeHeap = new PriorityQueue<>((a, b) -> a - b);
    }

    public void addNum(int num) {
        smallHeap.add(num);
        if (
            smallHeap.size() - largeHeap.size() > 1 ||
            !largeHeap.isEmpty() &&
            smallHeap.peek() > largeHeap.peek()
        ) {
            largeHeap.add(smallHeap.poll());
        }
        if (largeHeap.size() - smallHeap.size() > 1) {
            smallHeap.add(largeHeap.poll());
        }
    }

    public double findMedian() {
        if (smallHeap.size() == largeHeap.size()) {
            return (double) (largeHeap.peek() + smallHeap.peek()) / 2;
        } else if (smallHeap.size() > largeHeap.size()) {
            return (double) smallHeap.peek();
        } else {
            return (double) largeHeap.peek();
        }
    }
}
```

```cpp
class MedianFinder {
    priority_queue<int, vector<int>, less<int>> smallHeap;
    priority_queue<int, vector<int>, greater<int>> largeHeap;

public:
    MedianFinder() {}

    void addNum(int num) {
        smallHeap.push(num);
        if (!largeHeap.empty() && smallHeap.top() > largeHeap.top()) {
            largeHeap.push(smallHeap.top());
            smallHeap.pop();
        }
        if (smallHeap.size() > largeHeap.size() + 1) {
            largeHeap.push(smallHeap.top());
            smallHeap.pop();
        }
        if (largeHeap.size() > smallHeap.size() + 1) {
            smallHeap.push(largeHeap.top());
            largeHeap.pop();
        }
    }

    double findMedian() {
        if (smallHeap.size() == largeHeap.size()) {
            return (largeHeap.top() + smallHeap.top()) / 2.0;
        } else if (smallHeap.size() > largeHeap.size()) {
            return smallHeap.top();
        } else {
            return largeHeap.top();
        }
    }
};
```

```javascript
/**
 * const { PriorityQueue, MaxPriorityQueue, MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */

class MedianFinder {
    constructor() {
        this.small = new PriorityQueue((a, b) => b - a); // Max heap for smaller half
        this.large = new PriorityQueue((a, b) => a - b); // Min heap for larger half
    }

    /**
     * @param {number} num
     */
    addNum(num) {
        if (this.large.isEmpty() || num > this.large.front()) {
            this.large.enqueue(num);
        } else {
            this.small.enqueue(num);
        }

        if (this.small.size() > this.large.size() + 1) {
            this.large.enqueue(this.small.dequeue());
        } else if (this.large.size() > this.small.size() + 1) {
            this.small.enqueue(this.large.dequeue());
        }
    }

    /**
     * @return {number}
     */
    findMedian() {
        if (this.small.size() > this.large.size()) {
            return this.small.front();
        } else if (this.large.size() > this.small.size()) {
            return this.large.front();
        } else {
            return (this.small.front() + this.large.front()) / 2.0;
        }
    }
}
```

```csharp
public class MedianFinder {

    private PriorityQueue<int, int> small; // Max heap for the smaller half
    private PriorityQueue<int, int> large; // Min heap for the larger half

    public MedianFinder() {
        small = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
        large = new PriorityQueue<int, int>();
    }

    public void AddNum(int num) {
        if (large.Count != 0 && num > large.Peek()) {
            large.Enqueue(num, num);
        } else {
            small.Enqueue(num, num);
        }

        if (small.Count > large.Count + 1) {
            int val = small.Dequeue();
            large.Enqueue(val, val);
        } else if (large.Count > small.Count + 1) {
            int val = large.Dequeue();
            small.Enqueue(val, val);
        }
    }

    public double FindMedian() {
        if (small.Count > large.Count) {
            return small.Peek();
        } else if (large.Count > small.Count) {
            return large.Peek();
        }

        int smallTop = small.Peek();
        return (smallTop + large.Peek()) / 2.0;
    }
}
```

```go
type MedianFinder struct {
    small *priorityqueue.Queue // maxHeap
    large *priorityqueue.Queue // minHeap
}

func Constructor() MedianFinder {
    small := priorityqueue.NewWith(func(a, b interface{}) int {
        return b.(int) - a.(int)  // maxHeap
    })
    large := priorityqueue.NewWith(func(a, b interface{}) int {
        return a.(int) - b.(int)  // minHeap
    })
    return MedianFinder{small: small, large: large}
}

func (this *MedianFinder) AddNum(num int) {
    if this.large.Size() > 0 {
        largeTop, _ := this.large.Peek()
        if num > largeTop.(int) {
            this.large.Enqueue(num)
        } else {
            this.small.Enqueue(num)
        }
    } else {
        this.small.Enqueue(num)
    }

    // Rebalance
    if this.small.Size() > this.large.Size()+1 {
        val, _ := this.small.Dequeue()
        this.large.Enqueue(val)
    }
    if this.large.Size() > this.small.Size()+1 {
        val, _ := this.large.Dequeue()
        this.small.Enqueue(val)
    }
}

func (this *MedianFinder) FindMedian() float64 {
    if this.small.Size() > this.large.Size() {
        val, _ := this.small.Peek()
        return float64(val.(int))
    }
    if this.large.Size() > this.small.Size() {
        val, _ := this.large.Peek()
        return float64(val.(int))
    }
    smallVal, _ := this.small.Peek()
    largeVal, _ := this.large.Peek()
    return float64(smallVal.(int)+largeVal.(int)) / 2.0
}
```

```kotlin
class MedianFinder() {
    // small is maxHeap, large is minHeap
    private val small = PriorityQueue<Int>(compareByDescending { it })
    private val large = PriorityQueue<Int>()

    fun addNum(num: Int) {
        if (large.isNotEmpty() && num > large.peek()) {
            large.add(num)
        } else {
            small.add(num)
        }

        // Rebalance
        if (small.size > large.size + 1) {
            large.add(small.poll())
        }
        if (large.size > small.size + 1) {
            small.add(large.poll())
        }
    }

    fun findMedian(): Double {
        return when {
            small.size > large.size -> small.peek().toDouble()
            large.size > small.size -> large.peek().toDouble()
            else -> (small.peek() + large.peek()) / 2.0
        }
    }
}
```

```swift
class MedianFinder {
    // two heaps, large, small, minheap, maxheap
    // heaps should be equal size
    private var small: Heap<Int>
    private var large: Heap<Int>

    init() {
        self.small = Heap<Int>()
        self.large = Heap<Int>()
    }

    func addNum(_ num: Int) {
        if let top = large.min, num > top {
            large.insert(num)
        } else {
            small.insert(num)
        }
        if small.count > large.count + 1 {
            if let val = small.popMax() {
                large.insert(val)
            }
        }
        if large.count > small.count + 1 {
            if let val = large.popMin() {
                small.insert(val)
            }
        }
    }

    func findMedian() -> Double {
        if small.count > large.count {
            return Double(small.max!)
        } else if large.count > small.count {
            return Double(large.min!)
        }
        return (Double(small.max!) + Double(large.min!)) / 2.0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * \log n)$ for $addNum()$, $O(m)$ for $findMedian()$.
- Space complexity: $O(n)$

> Where $m$ is the number of function calls and $n$ is the length of the array.

---

## Common Pitfalls

### Using Wrong Heap Types

The two-heap solution requires a max-heap for the smaller half and a min-heap for the larger half. Swapping these or using two min-heaps produces incorrect medians. In languages like Python where `heapq` only provides min-heaps, you must negate values to simulate a max-heap for the smaller half.

### Failing to Maintain Heap Balance

The heaps must differ in size by at most one element. Forgetting to rebalance after insertions leads to incorrect median calculations. After every `addNum` call, check if one heap has more than one extra element and transfer the top element to the other heap.

### Incorrect Median Calculation for Even Count

When both heaps have equal size, the median is the average of both tops, not just one of them. Returning only the top of one heap or using integer division instead of floating-point division produces wrong results. Always check heap sizes and compute `(smallTop + largeTop) / 2.0` for the even case.

### Integer Overflow in Sum Calculation

When computing the average of two heap tops, adding two large integers can cause overflow in languages like Java or C++. Cast to a larger type before adding, or compute as `a + (b - a) / 2.0` to avoid overflow while still getting the correct floating-point result.

### Inserting Into Wrong Heap Initially

The first element must go into one of the heaps, but subsequent elements must be compared against the appropriate heap top to determine placement. Inserting all elements into one heap first and then rebalancing works, but directly inserting into the wrong heap without proper comparison breaks the invariant that all elements in the small heap are less than or equal to all elements in the large heap.
