## 1. Brute Force

::tabs-start

```python
class Solution:
    def largestPerimeter(self, nums: List[int]) -> int:
        n = len(nums)
        res = -1

        for i, large in enumerate(nums):
            cur = 0
            for j, side in enumerate(nums):
                if i != j and side <= large:
                    cur += side
            if cur > large:
                res = max(res, cur + large)

        return res
```

```java
public class Solution {
    public long largestPerimeter(int[] nums) {
        int n = nums.length;
        long res = -1;

        for (int i = 0; i < n; i++) {
            int large = nums[i];
            long cur = 0;

            for (int j = 0; j < n; j++) {
                if (i != j && nums[j] <= large) {
                    cur += nums[j];
                }
            }

            if (cur > large) {
                res = Math.max(res, cur + large);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long largestPerimeter(vector<int>& nums) {
        int n = nums.size();
        long long res = -1;

        for (int i = 0; i < n; i++) {
            long long large = nums[i];
            long long cur = 0;

            for (int j = 0; j < n; j++) {
                if (i != j && nums[j] <= large) {
                    cur += nums[j];
                }
            }

            if (cur > large) {
                res = max(res, cur + large);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    largestPerimeter(nums) {
        const n = nums.length;
        let res = -1;

        for (let i = 0; i < n; i++) {
            const large = nums[i];
            let cur = 0;

            for (let j = 0; j < n; j++) {
                if (i !== j && nums[j] <= large) {
                    cur += nums[j];
                }
            }

            if (cur > large) {
                res = Math.max(res, cur + large);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long LargestPerimeter(int[] nums) {
        int n = nums.Length;
        long res = -1;

        for (int i = 0; i < n; i++) {
            int large = nums[i];
            long cur = 0;

            for (int j = 0; j < n; j++) {
                if (i != j && nums[j] <= large) {
                    cur += nums[j];
                }
            }

            if (cur > large) {
                res = Math.Max(res, cur + large);
            }
        }

        return res;
    }
}
```

```go
func largestPerimeter(nums []int) int64 {
    n := len(nums)
    var res int64 = -1

    for i := 0; i < n; i++ {
        large := nums[i]
        var cur int64 = 0

        for j := 0; j < n; j++ {
            if i != j && nums[j] <= large {
                cur += int64(nums[j])
            }
        }

        if cur > int64(large) {
            if cur+int64(large) > res {
                res = cur + int64(large)
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun largestPerimeter(nums: IntArray): Long {
        val n = nums.size
        var res: Long = -1

        for (i in 0 until n) {
            val large = nums[i]
            var cur: Long = 0

            for (j in 0 until n) {
                if (i != j && nums[j] <= large) {
                    cur += nums[j]
                }
            }

            if (cur > large) {
                res = maxOf(res, cur + large)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func largestPerimeter(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = -1

        for i in 0..<n {
            let large = nums[i]
            var cur = 0

            for j in 0..<n {
                if i != j && nums[j] <= large {
                    cur += nums[j]
                }
            }

            if cur > large {
                res = max(res, cur + large)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def largestPerimeter(self, nums: List[int]) -> int:
        nums.sort()
        res = -1
        total = 0
        for num in nums:
            if total > num:
                res = total + num
            total += num
        return res
```

```java
public class Solution {
    public long largestPerimeter(int[] nums) {
        Arrays.sort(nums);
        long res = -1;
        long total = 0;

        for (int num : nums) {
            if (total > num) {
                res = total + num;
            }
            total += num;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long largestPerimeter(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        long long res = -1;
        long long total = 0;

        for (int& num : nums) {
            if (total > num) {
                res = total + num;
            }
            total += num;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    largestPerimeter(nums) {
        nums.sort((a, b) => a - b);
        let res = -1;
        let total = 0;

        for (let num of nums) {
            if (total > num) {
                res = total + num;
            }
            total += num;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long LargestPerimeter(int[] nums) {
        Array.Sort(nums);
        long res = -1;
        long total = 0;

        foreach (int num in nums) {
            if (total > num) {
                res = total + num;
            }
            total += num;
        }

        return res;
    }
}
```

```go
func largestPerimeter(nums []int) int64 {
    sort.Ints(nums)
    var res int64 = -1
    var total int64 = 0

    for _, num := range nums {
        if total > int64(num) {
            res = total + int64(num)
        }
        total += int64(num)
    }

    return res
}
```

```kotlin
class Solution {
    fun largestPerimeter(nums: IntArray): Long {
        nums.sort()
        var res: Long = -1
        var total: Long = 0

        for (num in nums) {
            if (total > num) {
                res = total + num
            }
            total += num
        }

        return res
    }
}
```

```swift
class Solution {
    func largestPerimeter(_ nums: [Int]) -> Int {
        let sorted = nums.sorted()
        var res = -1
        var total = 0

        for num in sorted {
            if total > num {
                res = total + num
            }
            total += num
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Max Heap

::tabs-start

```python
class Solution:
    def largestPerimeter(self, nums: List[int]) -> int:
        nums = [-num for num in nums]
        heapq.heapify(nums)
        total = -sum(nums)

        while len(nums) > 2:
            largest = -heapq.heappop(nums)
            total -= largest
            if largest < total:
                return total + largest
        return -1
```

```java
public class Solution {
    public long largestPerimeter(int[] nums) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
        long total = 0;
        for (int num : nums) {
            maxHeap.add(num);
            total += num;
        }

        while (maxHeap.size() > 2) {
            int largest = maxHeap.poll();
            total -= largest;
            if (largest < total) {
                return total + largest;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    long long largestPerimeter(vector<int>& nums) {
        priority_queue<int> maxHeap(nums.begin(), nums.end());
        long long total = accumulate(nums.begin(), nums.end(), 0LL);

        while (maxHeap.size() > 2) {
            int largest = maxHeap.top();
            maxHeap.pop();
            total -= largest;
            if (largest < total) {
                return total + largest;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    largestPerimeter(nums) {
        const maxHeap = new MaxPriorityQueue();
        let total = 0;

        nums.forEach((num) => {
            total += num;
            maxHeap.enqueue(num);
        });

        while (maxHeap.size() > 2) {
            const largest = maxHeap.dequeue().element;
            total -= largest;
            if (largest < total) return total + largest;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public long LargestPerimeter(int[] nums) {
        var maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b - a));
        long total = 0;

        foreach (int num in nums) {
            maxHeap.Enqueue(num, num);
            total += num;
        }

        while (maxHeap.Count > 2) {
            int largest = maxHeap.Dequeue();
            total -= largest;
            if (largest < total) {
                return total + largest;
            }
        }

        return -1;
    }
}
```

```go
func largestPerimeter(nums []int) int64 {
    h := &MaxHeap{}
    heap.Init(h)
    var total int64 = 0

    for _, num := range nums {
        heap.Push(h, num)
        total += int64(num)
    }

    for h.Len() > 2 {
        largest := heap.Pop(h).(int)
        total -= int64(largest)
        if int64(largest) < total {
            return total + int64(largest)
        }
    }

    return -1
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
    fun largestPerimeter(nums: IntArray): Long {
        val maxHeap = PriorityQueue<Int>(compareByDescending { it })
        var total: Long = 0

        for (num in nums) {
            maxHeap.add(num)
            total += num
        }

        while (maxHeap.size > 2) {
            val largest = maxHeap.poll()
            total -= largest
            if (largest < total) {
                return total + largest
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func largestPerimeter(_ nums: [Int]) -> Int {
        var heap = Heap<Int>(comparator: >)
        var total = 0

        for num in nums {
            heap.insert(num)
            total += num
        }

        while heap.count > 2 {
            let largest = heap.remove()!
            total -= largest
            if largest < total {
                return total + largest
            }
        }

        return -1
    }
}

struct Heap<T> {
    private var elements: [T] = []
    private let comparator: (T, T) -> Bool

    init(comparator: @escaping (T, T) -> Bool) {
        self.comparator = comparator
    }

    var count: Int { elements.count }

    mutating func insert(_ element: T) {
        elements.append(element)
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
        while child > 0 && comparator(elements[child], elements[parent]) {
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
            if left < elements.count && comparator(elements[left], elements[candidate]) {
                candidate = left
            }
            if right < elements.count && comparator(elements[right], elements[candidate]) {
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

- Time complexity:
    - $O(n + (30\log n))$ in Python, C++, JS.
    - $O(n \log n)$ in Java.
- Space complexity: $O(n)$
