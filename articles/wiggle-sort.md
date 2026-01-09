## 1. Max-Heap

::tabs-start

```python
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """

        maxHeap = []
        for num in nums:
            heapq.heappush(maxHeap, -num)

        n = len(nums)
        for i in range(1, n, 2):
            nums[i] = -heapq.heappop(maxHeap)
        for i in range(0, n, 2):
            nums[i] = -heapq.heappop(maxHeap)
```

```java
public class Solution {
    public void wiggleSort(int[] nums) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int num : nums) {
            maxHeap.add(num);
        }

        for (int i = 1; i < nums.length; i += 2) {
            nums[i] = maxHeap.poll();
        }
        for (int i = 0; i < nums.length; i += 2) {
            nums[i] = maxHeap.poll();
        }
    }
}
```

```cpp
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        priority_queue<int> maxHeap;
        for (int& num : nums) {
            maxHeap.push(num);
        }

        for (int i = 1; i < nums.size(); i += 2) {
            nums[i] = maxHeap.top();
            maxHeap.pop();
        }
        for (int i = 0; i < nums.size(); i += 2) {
            nums[i] = maxHeap.top();
            maxHeap.pop();
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    wiggleSort(nums) {
        const maxHeap = new PriorityQueue((a, b) => b - a);
        nums.forEach((num) => maxHeap.enqueue(num));

        for (let i = 1; i < nums.length; i += 2) {
            nums[i] = maxHeap.dequeue();
        }
        for (let i = 0; i < nums.length; i += 2) {
            nums[i] = maxHeap.dequeue();
        }
    }
}
```

```csharp
public class Solution {
    public void WiggleSort(int[] nums) {
        var maxHeap = new PriorityQueue<int, int>();
        foreach (int num in nums) {
            maxHeap.Enqueue(num, -num);
        }

        for (int i = 1; i < nums.Length; i += 2) {
            nums[i] = maxHeap.Dequeue();
        }
        for (int i = 0; i < nums.Length; i += 2) {
            nums[i] = maxHeap.Dequeue();
        }
    }
}
```

```go
func wiggleSort(nums []int) {
    maxHeap := &MaxHeap{}
    heap.Init(maxHeap)
    for _, num := range nums {
        heap.Push(maxHeap, num)
    }

    for i := 1; i < len(nums); i += 2 {
        nums[i] = heap.Pop(maxHeap).(int)
    }
    for i := 0; i < len(nums); i += 2 {
        nums[i] = heap.Pop(maxHeap).(int)
    }
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
    fun wiggleSort(nums: IntArray) {
        val maxHeap = PriorityQueue<Int>(Collections.reverseOrder())
        for (num in nums) {
            maxHeap.add(num)
        }

        var i = 1
        while (i < nums.size) {
            nums[i] = maxHeap.poll()
            i += 2
        }
        i = 0
        while (i < nums.size) {
            nums[i] = maxHeap.poll()
            i += 2
        }
    }
}
```

```swift
class Solution {
    func wiggleSort(_ nums: inout [Int]) {
        var sorted = nums.sorted(by: >)
        var idx = 0

        var i = 1
        while i < nums.count {
            nums[i] = sorted[idx]
            idx += 1
            i += 2
        }
        i = 0
        while i < nums.count {
            nums[i] = sorted[idx]
            idx += 1
            i += 2
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """

        nums.sort()
        for i in range(1, len(nums) - 1, 2):
            nums[i], nums[i + 1] = nums[i + 1], nums[i]
```

```java
public class Solution {
    public void wiggleSort(int[] nums) {
        Arrays.sort(nums);
        for (int i = 1; i < nums.length - 1; i += 2) {
            int temp = nums[i];
            nums[i] = nums[i + 1];
            nums[i + 1] = temp;
        }
    }
}
```

```cpp
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for (int i = 1; i < nums.size() - 1; i += 2) {
            swap(nums[i], nums[i + 1]);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    wiggleSort(nums) {
        nums.sort((a, b) => a - b);
        for (let i = 1; i < nums.length - 1; i += 2) {
            [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
        }
    }
}
```

```csharp
public class Solution {
    public void WiggleSort(int[] nums) {
        Array.Sort(nums);
        for (int i = 1; i < nums.Length - 1; i += 2) {
            int temp = nums[i];
            nums[i] = nums[i + 1];
            nums[i + 1] = temp;
        }
    }
}
```

```go
func wiggleSort(nums []int) {
    sort.Ints(nums)
    for i := 1; i < len(nums)-1; i += 2 {
        nums[i], nums[i+1] = nums[i+1], nums[i]
    }
}
```

```kotlin
class Solution {
    fun wiggleSort(nums: IntArray) {
        nums.sort()
        var i = 1
        while (i < nums.size - 1) {
            val temp = nums[i]
            nums[i] = nums[i + 1]
            nums[i + 1] = temp
            i += 2
        }
    }
}
```

```swift
class Solution {
    func wiggleSort(_ nums: inout [Int]) {
        nums.sort()
        var i = 1
        while i < nums.count - 1 {
            nums.swapAt(i, i + 1)
            i += 2
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Greedy - I

::tabs-start

```python
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """

        for i in range(1, len(nums)):
            if ((i % 2 == 1 and nums[i] < nums[i - 1]) or
                (i % 2 == 0 and nums[i] > nums[i - 1])
            ):
                nums[i], nums[i - 1] = nums[i - 1], nums[i]
```

```java
public class Solution {
    public void wiggleSort(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            if ((i % 2 == 1 && nums[i] < nums[i - 1]) ||
                (i % 2 == 0 && nums[i] > nums[i - 1])) {
                int temp = nums[i];
                nums[i] = nums[i - 1];
                nums[i - 1] = temp;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        for (int i = 1; i <nums.size(); i++) {
            if ((i % 2 == 1 && nums[i] < nums[i - 1]) ||
                (i % 2 == 0 && nums[i] > nums[i - 1])) {
                swap(nums[i], nums[i - 1]);
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    wiggleSort(nums) {
        for (let i = 1; i < nums.length; i++) {
            if (
                (i % 2 == 1 && nums[i] < nums[i - 1]) ||
                (i % 2 == 0 && nums[i] > nums[i - 1])
            ) {
                [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
            }
        }
    }
}
```

```csharp
public class Solution {
    public void WiggleSort(int[] nums) {
        for (int i = 1; i < nums.Length; i++) {
            if ((i % 2 == 1 && nums[i] < nums[i - 1]) ||
                (i % 2 == 0 && nums[i] > nums[i - 1])) {
                int temp = nums[i];
                nums[i] = nums[i - 1];
                nums[i - 1] = temp;
            }
        }
    }
}
```

```go
func wiggleSort(nums []int) {
    for i := 1; i < len(nums); i++ {
        if (i%2 == 1 && nums[i] < nums[i-1]) ||
            (i%2 == 0 && nums[i] > nums[i-1]) {
            nums[i], nums[i-1] = nums[i-1], nums[i]
        }
    }
}
```

```kotlin
class Solution {
    fun wiggleSort(nums: IntArray) {
        for (i in 1 until nums.size) {
            if ((i % 2 == 1 && nums[i] < nums[i - 1]) ||
                (i % 2 == 0 && nums[i] > nums[i - 1])) {
                val temp = nums[i]
                nums[i] = nums[i - 1]
                nums[i - 1] = temp
            }
        }
    }
}
```

```swift
class Solution {
    func wiggleSort(_ nums: inout [Int]) {
        for i in 1..<nums.count {
            if (i % 2 == 1 && nums[i] < nums[i - 1]) ||
               (i % 2 == 0 && nums[i] > nums[i - 1]) {
                nums.swapAt(i, i - 1)
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Greedy - II

::tabs-start

```python
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """

        for i in range(1, len(nums)):
            if (i % 2) ^ (nums[i] > nums[i - 1]):
                nums[i], nums[i - 1] = nums[i - 1], nums[i]
```

```java
public class Solution {
    public void wiggleSort(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            if (((i % 2) ^ (nums[i] > nums[i - 1] ? 1 : 0)) != 0) {
                int temp = nums[i];
                nums[i] = nums[i - 1];
                nums[i - 1] = temp;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        for (int i = 1; i <nums.size(); i++) {
            if ((i % 2) ^ (nums[i] > nums[i - 1])) {
                swap(nums[i], nums[i - 1]);
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    wiggleSort(nums) {
        for (var i = 1; i < nums.length; i++) {
            if (i % 2 ^ (nums[i] > nums[i - 1])) {
                [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
            }
        }
    }
}
```

```csharp
public class Solution {
    public void WiggleSort(int[] nums) {
        for (int i = 1; i < nums.Length; i++) {
            if (((i % 2) ^ (nums[i] > nums[i - 1] ? 1 : 0)) != 0) {
                int temp = nums[i];
                nums[i] = nums[i - 1];
                nums[i - 1] = temp;
            }
        }
    }
}
```

```go
func wiggleSort(nums []int) {
    for i := 1; i < len(nums); i++ {
        cmp := 0
        if nums[i] > nums[i-1] {
            cmp = 1
        }
        if (i%2)^cmp != 0 {
            nums[i], nums[i-1] = nums[i-1], nums[i]
        }
    }
}
```

```kotlin
class Solution {
    fun wiggleSort(nums: IntArray) {
        for (i in 1 until nums.size) {
            val cmp = if (nums[i] > nums[i - 1]) 1 else 0
            if ((i % 2) xor cmp != 0) {
                val temp = nums[i]
                nums[i] = nums[i - 1]
                nums[i - 1] = temp
            }
        }
    }
}
```

```swift
class Solution {
    func wiggleSort(_ nums: inout [Int]) {
        for i in 1..<nums.count {
            let cmp = nums[i] > nums[i - 1] ? 1 : 0
            if (i % 2) ^ cmp != 0 {
                nums.swapAt(i, i - 1)
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
