## 1. Sorting

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n\log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

> Where $m$ is the number of calls made to $add()$ and $n$ is the current size of the array.

---

## 2. Min-Heap

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * \log k)$
* Space complexity: $O(k)$

> Where $m$ is the number of calls made to $add()$.