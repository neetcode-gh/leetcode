## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sorting** - One approach sorts the array first, then swaps adjacent pairs to create the wiggle pattern
- **Heap / Priority Queue** - Max-heap can extract elements in descending order to fill odd indices first
- **Greedy Algorithms** - The optimal O(n) solution uses a single-pass greedy approach, swapping neighbors when the wiggle property is violated

---

## 1. Max-Heap

### Intuition
For a wiggle sorted array, odd indices should hold larger values and even indices should hold smaller values relative to their neighbors. Using a max-heap, we can extract elements in descending order and strategically place the largest values at odd indices first, then fill even indices with the remaining values. This ensures the wiggle property is maintained.

### Algorithm
1. Push all elements from the array into a max-heap.
2. First pass: iterate through odd indices (`1`, `3`, `5`, ...) and pop from the heap to assign values. These positions get the larger elements.
3. Second pass: iterate through even indices (`0`, `2`, `4`, ...) and pop remaining elements from the heap.
4. The array is now wiggle sorted in place.

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

### Intuition
After sorting the array, we can create the wiggle pattern by swapping adjacent pairs starting from index 1. When we swap elements at positions 1 and 2, then 3 and 4, and so on, we create local peaks at odd indices. This works because after sorting, swapping pushes the slightly larger element to the odd index position.

### Algorithm
1. Sort the array in ascending order.
2. Iterate through the array starting at index `1`, incrementing by `2` each time.
3. At each step, swap the current element with the next element.
4. After processing all pairs, the array satisfies the wiggle sort property.

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

### Intuition
We can achieve wiggle sort in a single pass by observing the required relationship at each index. At odd indices, the element should be greater than or equal to its predecessor. At even indices, the element should be less than or equal to its predecessor. If these conditions are violated, we simply swap with the previous element to fix the relationship locally without affecting previously processed elements.

### Algorithm
1. Iterate through the array starting from index `1`.
2. For odd indices: if the current element is less than the previous element, swap them.
3. For even indices: if the current element is greater than the previous element, swap them.
4. Return the modified array which now satisfies the wiggle property.

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

### Intuition
This is an optimized version of the greedy approach using XOR for condition checking. The key observation is that we need to swap when the parity of the index does not match whether the current element is greater than the previous. Using XOR on these two boolean conditions elegantly captures when a swap is needed.

### Algorithm
1. Iterate through the array starting from index `1`.
2. For each position, compute two values: whether the index is odd (`i % 2`) and whether the current element is greater than the previous (`nums[i] > nums[i-1]`).
3. If the XOR of these two values is `true` (they differ), swap the current element with the previous one.
4. The array is wiggle sorted after one complete pass.

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

---

## Common Pitfalls

### Confusing Wiggle Sort with Wiggle Sort II
Wiggle Sort requires `nums[0] <= nums[1] >= nums[2] <= nums[3]...` (non-strict inequalities), while Wiggle Sort II requires strict inequalities. Using the wrong condition will fail test cases with duplicate elements.

```python
# This problem (Wiggle Sort): allows equality
# nums[i] <= nums[i+1] for odd i
# nums[i] >= nums[i+1] for even i

# Wiggle Sort II: requires strict inequality
# nums[i] < nums[i+1] for odd i (different problem!)
```

### Swapping with Wrong Neighbor
The greedy approach compares each element with its previous element (i-1), not the next element (i+1). Swapping with the wrong neighbor breaks the already-established wiggle pattern.

```python
# Wrong: comparing with next element and swapping forward
if i % 2 == 1 and nums[i] < nums[i + 1]:
    nums[i], nums[i + 1] = nums[i + 1], nums[i]

# Correct: comparing with previous element
if i % 2 == 1 and nums[i] < nums[i - 1]:
    nums[i], nums[i - 1] = nums[i - 1], nums[i]
```

### Starting Loop at Index 0 Instead of 1
The greedy approach needs to compare each element with its predecessor, so the loop must start at index 1. Starting at 0 causes an index-out-of-bounds error when accessing `nums[i - 1]`.

```python
# Wrong: causes index error at nums[-1]
for i in range(len(nums)):
    if nums[i] > nums[i - 1]:  # i=0 gives nums[-1]

# Correct: start from index 1
for i in range(1, len(nums)):
    if nums[i] > nums[i - 1]:
```
