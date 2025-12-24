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

A **min-heap of size k** is perfect for this:

- A min-heap always keeps the **smallest value at the top**.
- If the heap contains the **k largest elements**,  
  then the **smallest among them** is exactly the **k-th largest overall**.
- Whenever a new number arrives:
  - If we add it and the heap grows beyond k,  
    we remove the smallest element — because it cannot be in the top k anymore.

This way, the heap always holds exactly the **top k elements**, and retrieving the k-th largest is O(1).

### Algorithm

#### Initialization
1. Insert all initial numbers into a min-heap.
2. If the heap size becomes greater than **k**, repeatedly remove the smallest element.
   - After this, the heap contains exactly **k** elements.

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
type KthLargest struct {
    minHeap *priorityqueue.Queue
    k       int
}

func Constructor(k int, nums []int) KthLargest {
    minHeap := priorityqueue.NewWith(utils.IntComparator)
    for _, num := range nums {
        minHeap.Enqueue(num)
    }
    for minHeap.Size() > k {
        minHeap.Dequeue()
    }
    return KthLargest{minHeap: minHeap, k: k}
}

func (this *KthLargest) Add(val int) int {
    this.minHeap.Enqueue(val)
    if this.minHeap.Size() > this.k {
        this.minHeap.Dequeue()
    }
    top, _ := this.minHeap.Peek()
    return top.(int)
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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * \log k)$
- Space complexity: $O(k)$

> Where $m$ is the number of calls made to $add()$.
