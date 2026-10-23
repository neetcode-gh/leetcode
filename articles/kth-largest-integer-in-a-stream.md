## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Heap Data Structure** - Understanding min-heaps and how they maintain the smallest element at the root
- **Priority Queues** - Using built-in heap implementations for efficient insertion and extraction
- **Sorting Algorithms** - Understanding basic sorting as a baseline approach

---

## 1. Sorting

### Intuition

We want the **k-th largest number** in a stream of values.
The simplest approach:
Every time a new value comes in, **insert it**, sort the list, and then pick the element at position `len(arr) - k`.

Sorting keeps the numbers in increasing order, so the k-th largest element will always sit at the same index.  
This method is easy to understand but slow because sorting happens every time `add()` is called.

### Algorithm

#### Initialization

- Store `k`.
- Store the initial numbers in an array.

#### add(val)

1. Append `val` to the array.
2. Sort the array.
3. Return the element at index `len(arr) - k` (the k-th largest).

::tabs-start

```python
class KthLargest:

    def __init__(self, k: int, nums: List[int]):
        self.k = k
        self.arr = nums

    def add(self, val: int) -> int:
        self.arr.append(val)
        self.arr.sort()
        return self.arr[len(self.arr) - self.k]
```

```java
class KthLargest {
    List<Integer> arr;
    int K;
    public KthLargest(int k, int[] nums) {
        K = k;
        arr = new ArrayList();
        for (int i = 0; i < nums.length; i++) {
            arr.add(nums[i]);
        }
    }

    public int add(int val) {
        arr.add(val);
        Collections.sort(arr);
        return arr.get(arr.size() - K);
    }
}
```

```cpp
class KthLargest {
public:
    vector<int> arr;
    int k;
    KthLargest(int k, vector<int>& nums) {
        this->arr = nums;
        this->k = k;
    }

    int add(int val) {
        arr.push_back(val);
        sort(arr.begin(), arr.end());
        return arr[arr.size() - k];
    }
};
```

```javascript
class KthLargest {
    /**
     * @param {number} k
     * @param {number[]} nums
     */
    constructor(k, nums) {
        this.arr = nums;
        this.k = k;
    }

    /**
     * @param {number} val
     * @return {number}
     */
    add(val) {
        this.arr.push(val);
        this.arr.sort((a, b) => a - b);
        return this.arr[this.arr.length - this.k];
    }
}
```

```csharp
public class KthLargest {
    private List<int> arr;
    private int K;

    public KthLargest(int k, int[] nums) {
        arr = new List<int>(nums);
        K = k;
    }

    public int Add(int val) {
        arr.Add(val);
        arr.Sort();
        return arr[arr.Count - K];
    }
}
```

```go
type KthLargest struct {
    k   int
    arr []int
}

func Constructor(k int, nums []int) KthLargest {
    return KthLargest{k: k, arr: nums}
}

func (this *KthLargest) Add(val int) int {
    this.arr = append(this.arr, val)
    sort.Ints(this.arr)
    return this.arr[len(this.arr)-this.k]
}
```

```kotlin
class KthLargest(k: Int, nums: IntArray) {
    private val k = k
    private val arr = nums.toMutableList()

    fun add(`val`: Int): Int {
        arr.add(`val`)
        arr.sort()
        return arr[arr.size - k]
    }
}
```

```swift
class KthLargest {
    private var k: Int
    private var arr: [Int]

    init(_ k: Int, _ nums: [Int]) {
        self.k = k
        self.arr = nums
    }

    func add(_ val: Int) -> Int {
        arr.append(val)
        arr.sort()
        return arr[arr.count - k]
    }
}
```

```rust
struct KthLargest {
    k: usize,
    arr: Vec<i32>,
}

impl KthLargest {
    fn new(k: i32, nums: Vec<i32>) -> Self {
        KthLargest { k: k as usize, arr: nums }
    }

    fn add(&mut self, val: i32) -> i32 {
        self.arr.push(val);
        self.arr.sort();
        self.arr[self.arr.len() - self.k]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n\log n)$
- Space complexity:
    - $O(m)$ extra space.
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.

> Where $m$ is the number of calls made to $add()$ and $n$ is the current size of the array.

---

## 2. Min-Heap

### Intuition

To maintain the **k-th largest element** in a stream of numbers, we do **not** need to store all values.  
Instead, we only need to keep track of the **k largest elements seen so far**.

A **min-heap of size at most `k`** is perfect for this:

- A min-heap always keeps the **smallest value at the top**.
- If the heap contains the `k` largest elements,
  then the **smallest among them** is exactly the **k-th largest overall**.
- Whenever a new number arrives:
    - If we add it and the heap grows beyond `k`,
      we remove the smallest element - because it cannot be in the top `k` anymore.

After trimming, the heap holds at most `k` elements. Once at least `k` values have arrived, it holds exactly the **top `k` elements**, and retrieving the k-th largest takes `O(1)`.

### Algorithm

#### Initialization

1. Insert all initial numbers into a min-heap.
2. If the heap size becomes greater than `k`, repeatedly remove the smallest element.
    - After this, the heap contains at most `k` elements.

#### add(value)

1. Insert the new value into the min-heap.
2. If heap size > `k`:
    - Remove the smallest element (the heap root).
3. Return the heap's smallest element (the root), which is now the **k-th largest**.

::tabs-start

```python
class KthLargest:

    def __init__(self, k: int, nums: List[int]):
        self.minHeap, self.k = nums, k
        heapq.heapify(self.minHeap)
        while len(self.minHeap) > k:
            heapq.heappop(self.minHeap)

    def add(self, val: int) -> int:
        heapq.heappush(self.minHeap, val)
        if len(self.minHeap) > self.k:
            heapq.heappop(self.minHeap)
        return self.minHeap[0]
```

```java
class KthLargest {

    private PriorityQueue<Integer> minHeap;
    private int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        this.minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
    }

    public int add(int val) {
        minHeap.offer(val);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
        return minHeap.peek();
    }
}
```

```cpp
class KthLargest {
private:
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int k;

public:
    KthLargest(int k, vector<int>& nums) {
        this->k = k;
        for (int num : nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
    }

    int add(int val) {
        minHeap.push(val);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
        return minHeap.top();
    }
};
```

```javascript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */

class KthLargest {
    /**
     * @param {number} k
     * @param {number[]} nums
     */
    constructor(k, nums) {
        this.minHeap = new MinPriorityQueue();
        this.k = k;

        for (const num of nums) {
            this.minHeap.enqueue(num);
        }

        while (this.minHeap.size() > k) {
            this.minHeap.dequeue();
        }
    }

    /**
     * @param {number} val
     * @return {number}
     */
    add(val) {
        this.minHeap.enqueue(val);
        if (this.minHeap.size() > this.k) {
            this.minHeap.dequeue();
        }
        return this.minHeap.front();
    }
}
```

```csharp
public class KthLargest {

    private PriorityQueue<int, int> minHeap;
    private int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        this.minHeap = new PriorityQueue<int, int>();
        foreach (int num in nums) {
            minHeap.Enqueue(num, num);
            if (minHeap.Count > k) {
                minHeap.Dequeue();
            }
        }
    }

    public int Add(int val) {
        minHeap.Enqueue(val, val);
        if (minHeap.Count > k) {
            minHeap.Dequeue();
        }
        return minHeap.Peek();
    }
}
```

```go
type MinHeap []int

func (h MinHeap) Len() int            { return len(h) }
func (h MinHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MinHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}

type KthLargest struct {
    minHeap *MinHeap
    k       int
}

func Constructor(k int, nums []int) KthLargest {
    minHeap := &MinHeap{}
    heap.Init(minHeap)
    for _, num := range nums {
        heap.Push(minHeap, num)
    }
    for minHeap.Len() > k {
        heap.Pop(minHeap)
    }
    return KthLargest{minHeap: minHeap, k: k}
}

func (this *KthLargest) Add(val int) int {
    heap.Push(this.minHeap, val)
    if this.minHeap.Len() > this.k {
        heap.Pop(this.minHeap)
    }
    return (*this.minHeap)[0]
}
```

```kotlin
class KthLargest(k: Int, nums: IntArray) {
    private val k = k
    private val minHeap = PriorityQueue<Int>()

    init {
        for (num in nums) {
            minHeap.offer(num)
        }
        while (minHeap.size > k) {
            minHeap.poll()
        }
    }

    fun add(`val`: Int): Int {
        minHeap.offer(`val`)
        if (minHeap.size > k) {
            minHeap.poll()
        }
        return minHeap.peek()
    }
}
```

```swift
class KthLargest {
    private var minHeap: Heap<Int>
    private let k: Int

    init(_ k: Int, _ nums: [Int]) {
        self.k = k
        self.minHeap = Heap<Int>()
        for num in nums {
            minHeap.insert(num)
            if minHeap.count > k {
                minHeap.popMin()
            }
        }
    }

    func add(_ val: Int) -> Int {
        minHeap.insert(val)
        if minHeap.count > k {
            minHeap.popMin()
        }
        return minHeap.min!
    }
}
```

```rust
struct KthLargest {
    min_heap: BinaryHeap<Reverse<i32>>,
    k: usize,
}

impl KthLargest {
    fn new(k: i32, nums: Vec<i32>) -> Self {
        let k = k as usize;
        let mut min_heap = BinaryHeap::new();
        for num in nums {
            min_heap.push(Reverse(num));
            if min_heap.len() > k {
                min_heap.pop();
            }
        }
        KthLargest { min_heap, k }
    }

    fn add(&mut self, val: i32) -> i32 {
        self.min_heap.push(Reverse(val));
        if self.min_heap.len() > self.k {
            self.min_heap.pop();
        }
        self.min_heap.peek().unwrap().0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - Python: $O(n + (n-k) \log n + m \log(k + 1))$ when $n > k$, or $O(n + m \log(k + 1))$ otherwise. Heapifying takes $O(n)$, followed by $n-k$ heap removals when $n > k$.
    - Java, C++, C#, Swift, Rust: $O((n + m) \log(k + 1))$. Trimming after each initial insertion keeps the heap at most $k+1$ elements during insertion and at most $k$ afterward.
    - JavaScript, Go, Kotlin: $O(n \log(n + 1) + m \log(k + 1))$. These versions insert all $n$ initial values before trimming the heap, so initialization takes $O(n \log(n + 1))$.
- Space complexity (peak heap storage):
    - Java, C++, C#, Swift, Rust: $O(k)$, since the heap is trimmed after each initial insertion.
    - Python, JavaScript, Go, Kotlin: $O(n + k)$, equivalently $O(\max(n, k))$, since the heap initially holds all $n$ values and can later grow to $k+1$ during an insertion. Python reuses the input list, so its peak heap storage includes that existing list rather than a separate $n$-element heap.

Each $add()$ call takes $O(\log(k + 1))$ amortized time, accounting for occasional backing-array resizing. Using $\log(k + 1)$ also covers $k = 1$.

> Where $n$ is the initial array length, $m$ is the number of calls made to $add()$, and $k$ is the rank being tracked.

---

## Common Pitfalls

### Using a Max-Heap Instead of Min-Heap

A common mistake is using a max-heap to find the k-th largest element. While it seems intuitive to keep the largest elements at the top, a max-heap would require storing all elements and repeatedly extracting the maximum k times for each query. A min-heap of size k is the correct choice because the root always holds the k-th largest element directly, allowing O(1) retrieval after each insertion.

### Forgetting to Maintain Heap Size

When using a min-heap, it is essential to remove the smallest element whenever the heap size exceeds k. Failing to do so means the heap grows unbounded, and the root no longer represents the k-th largest element. Always check and pop after each insertion to keep at most k elements in the heap.
