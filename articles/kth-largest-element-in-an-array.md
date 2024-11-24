## 1. Sorting

::tabs-start

```python
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        nums.sort()
        return nums[len(nums) - k]
```

```java
public class Solution {
    public int findKthLargest(int[] nums, int k) {
        Arrays.sort(nums);
        return nums[nums.length - k]; 
    }
}
```

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        return nums[nums.size() - k];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        nums.sort((a, b) => a - b);
        return nums[nums.length - k];
    }
}
```

```csharp
public class Solution {
    public int FindKthLargest(int[] nums, int k) {
        Array.Sort(nums);
        return nums[nums.Length - k];
    }
}
```

```go
func findKthLargest(nums []int, k int) int {
    sort.Ints(nums)
    return nums[len(nums) - k]
}
```

```kotlin
class Solution {
    fun findKthLargest(nums: IntArray, k: Int): Int {
        nums.sort()
        return nums[nums.size - k]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Min-Heap

::tabs-start

```python
class Solution:
    def findKthLargest(self, nums, k):
        return heapq.nlargest(k, nums)[-1]
```

```java
public class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }
}
```

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (int num : nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        return minHeap.top();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        const minHeap = new MinPriorityQueue();
        for (let num of nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        return minHeap.front();
    }
}
```

```csharp
public class Solution {
    public int FindKthLargest(int[] nums, int k) {
        PriorityQueue<int, int> minHeap = new PriorityQueue<int, int>();
        foreach (int num in nums) {
            minHeap.Enqueue(num, num);
            if (minHeap.Count > k) {
                minHeap.Dequeue();
            }
        }
        return minHeap.Peek();
    }
}
```

```go
func findKthLargest(nums []int, k int) int {
    minHeap := priorityqueue.NewWith(utils.IntComparator)
    
    for _, num := range nums {
        minHeap.Enqueue(num)
        if minHeap.Size() > k {
            minHeap.Dequeue()
        }
    }
    
    val, _ := minHeap.Peek()
    return val.(int)
}
```

```kotlin
class Solution {
    fun findKthLargest(nums: IntArray, k: Int): Int {
        val minHeap = PriorityQueue<Int>()
        
        for (num in nums) {
            minHeap.offer(num)
            if (minHeap.size > k) {
                minHeap.poll()
            }
        }
        return minHeap.peek()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log k)$
* Space complexity: $O(k)$

> Where $n$ is the length of the array $nums$.

---

## 3. Quick Select

::tabs-start

```python
class Solution:

    def findKthLargest(self, nums: List[int], k: int) -> int:
        k = len(nums) - k
        
        def quickSelect(l, r):
            pivot, p = nums[r], l
            for i in range(l, r):
                if nums[i] <= pivot:
                    nums[p], nums[i] = nums[i], nums[p]
                    p += 1
            nums[p], nums[r] = nums[r], nums[p]

            if p > k: 
                return quickSelect(l, p - 1)
            elif p < k:
                return quickSelect(p + 1, r)
            else:
                return nums[p]

        return quickSelect(0, len(nums) - 1)
```

```java
public class Solution {
    public int findKthLargest(int[] nums, int k) {
        k = nums.length - k;

        return quickSelect(nums, 0, nums.length - 1, k);
    }

    private int quickSelect(int[] nums, int left, int right, int k) {
        int pivot = nums[right];
        int p = left;

        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                int temp = nums[p];
                nums[p] = nums[i];
                nums[i] = temp;
                p++;
            }
        }

        int temp = nums[p];
        nums[p] = nums[right];
        nums[right] = temp;

        if (p > k) {
            return quickSelect(nums, left, p - 1, k);
        } else if (p < k) {
            return quickSelect(nums, p + 1, right, k);
        } else {
            return nums[p];
        }
    }
}
```

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        k = nums.size() - k;
        return quickSelect(nums, 0, nums.size() - 1, k);
    }
    
    int quickSelect(vector<int>& nums, int left, int right, int k) {
        int pivot = nums[right];
        int p = left;
        
        for (int i = left; i < right; ++i) {
            if (nums[i] <= pivot) {
                swap(nums[p], nums[i]);
                p++;
            }
        }
        swap(nums[p], nums[right]);
        
        if (p > k) {
            return quickSelect(nums, left, p - 1, k);
        } else if (p < k) {
            return quickSelect(nums, p + 1, right, k);
        } else {
            return nums[p];
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        k = nums.length - k;

        const quickSelect = (left, right) => {
            let pivot = nums[right];
            let p = left;

            for (let i = left; i < right; i++) {
                if (nums[i] <= pivot) {
                    [nums[p], nums[i]] = [nums[i], nums[p]];
                    p++;
                }
            }
            [nums[p], nums[right]] = [nums[right], nums[p]];

            if (p > k) {
                return quickSelect(left, p - 1);
            } else if (p < k) {
                return quickSelect(p + 1, right);
            } else {
                return nums[p];
            }
        };

        return quickSelect(0, nums.length - 1);
    }
}
```

```csharp
public class Solution {
    public int FindKthLargest(int[] nums, int k) {
        k = nums.Length - k;
        return QuickSelect(nums, 0, nums.Length - 1, k);
    }

    private int QuickSelect(int[] nums, int left, int right, int k) {
        int pivot = nums[right];
        int p = left;

        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                int temp = nums[p];
                nums[p] = nums[i];
                nums[i] = temp;
                p++;
            }
        }

        int tmp = nums[p];
        nums[p] = nums[right];
        nums[right] = tmp;

        if (p > k) {
            return QuickSelect(nums, left, p - 1, k);
        } else if (p < k) {
            return QuickSelect(nums, p + 1, right, k);
        } else {
            return nums[p];
        }
    }
}
```

```go
func findKthLargest(nums []int, k int) int {
    k = len(nums) - k
    
    var quickSelect func(l, r int) int
    quickSelect = func(l, r int) int {
        pivot, p := nums[r], l
        for i := l; i < r; i++ {
            if nums[i] <= pivot {
                nums[p], nums[i] = nums[i], nums[p]
                p++
            }
        }
        nums[p], nums[r] = nums[r], nums[p]

        if p > k {
            return quickSelect(l, p-1)
        } else if p < k {
            return quickSelect(p+1, r)
        } else {
            return nums[p]
        }
    }

    return quickSelect(0, len(nums)-1)
}
```

```kotlin
class Solution {
    fun findKthLargest(nums: IntArray, k: Int): Int {
        val target = nums.size - k

        fun quickSelect(l: Int, r: Int): Int {
            val pivot = nums[r]
            var p = l
            for (i in l until r) {
                if (nums[i] <= pivot) {
                    nums[p] = nums[i].also { nums[i] = nums[p] }
                    p++
                }
            }
            nums[p] = nums[r].also { nums[r] = nums[p] }

            return when {
                p > target -> quickSelect(l, p - 1)
                p < target -> quickSelect(p + 1, r)
                else -> nums[p]
            }
        }

        return quickSelect(0, nums.size - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ in average case, $O(n ^ 2)$ in worst case.
* Space complexity: $O(n)$

---

## 4. Quick Select (Optimal)

::tabs-start

```python
class Solution:
    def partition(self, nums: List[int], left: int, right: int) -> int:
        mid = (left + right) >> 1
        nums[mid], nums[left + 1] = nums[left + 1], nums[mid]
        
        if nums[left] < nums[right]:
            nums[left], nums[right] = nums[right], nums[left]
        if nums[left + 1] < nums[right]:
            nums[left + 1], nums[right] = nums[right], nums[left + 1]
        if nums[left] < nums[left + 1]:
            nums[left], nums[left + 1] = nums[left + 1], nums[left]
        
        pivot = nums[left + 1]
        i = left + 1
        j = right
        
        while True:
            while True:
                i += 1
                if not nums[i] > pivot:
                    break
            while True:
                j -= 1
                if not nums[j] < pivot:
                    break
            if i > j:
                break
            nums[i], nums[j] = nums[j], nums[i]
        
        nums[left + 1], nums[j] = nums[j], nums[left + 1]
        return j
    
    def quickSelect(self, nums: List[int], k: int) -> int:
        left = 0
        right = len(nums) - 1
        
        while True:
            if right <= left + 1:
                if right == left + 1 and nums[right] > nums[left]:
                    nums[left], nums[right] = nums[right], nums[left]
                return nums[k]
            
            j = self.partition(nums, left, right)
            
            if j >= k:
                right = j - 1
            if j <= k:
                left = j + 1
    
    def findKthLargest(self, nums: List[int], k: int) -> int:
        return self.quickSelect(nums, k - 1)
```

```java
public class Solution {
    private int partition(int[] nums, int left, int right) {
        int mid = (left + right) >> 1;
        swap(nums, mid, left + 1);
        
        if (nums[left] < nums[right]) 
            swap(nums, left, right);
        if (nums[left + 1] < nums[right]) 
            swap(nums, left + 1, right);
        if (nums[left] < nums[left + 1]) 
            swap(nums, left, left + 1);
        
        int pivot = nums[left + 1];
        int i = left + 1;
        int j = right;
        
        while (true) {
            while (nums[++i] > pivot);
            while (nums[--j] < pivot);
            if (i > j) break;
            swap(nums, i, j);
        }
        
        nums[left + 1] = nums[j];
        nums[j] = pivot;
        return j;
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    
    private int quickSelect(int[] nums, int k) {
        int left = 0;
        int right = nums.length - 1;
        
        while (true) {
            if (right <= left + 1) {
                if (right == left + 1 && nums[right] > nums[left])
                    swap(nums, left, right);
                return nums[k];
            }
            
            int j = partition(nums, left, right);
            
            if (j >= k) right = j - 1;
            if (j <= k) left = j + 1;
        }
    }
    
    public int findKthLargest(int[] nums, int k) {
        return quickSelect(nums, k - 1);
    }
}
```

```cpp
class Solution {
public:
    int partition(vector<int>& nums, int left, int right) {
        int mid = (left + right) >> 1;
        swap(nums[mid], nums[left + 1]);
        
        if (nums[left] < nums[right]) 
            swap(nums[left], nums[right]);
        if (nums[left + 1] < nums[right]) 
            swap(nums[left + 1], nums[right]);
        if (nums[left] < nums[left + 1]) 
            swap(nums[left], nums[left + 1]);
        
        int pivot = nums[left + 1];
        int i = left + 1;
        int j = right;
        
        while (true) {
            while (nums[++i] > pivot);
            while (nums[--j] < pivot);
            if (i > j) break;
            swap(nums[i], nums[j]);
        }
        
        nums[left + 1] = nums[j];
        nums[j] = pivot;
        return j;
    }
    
    int quickSelect(vector<int>& nums, int k) {
        int left = 0;
        int right = nums.size() - 1;
        
        while (true) {
            if (right <= left + 1) {
                if (right == left + 1 && nums[right] > nums[left])
                    swap(nums[left], nums[right]);
                return nums[k];
            }
            
            int j = partition(nums, left, right);
            
            if (j >= k) right = j - 1;
            if (j <= k) left = j + 1;
        }
    }
    
    int findKthLargest(vector<int>& nums, int k) {
        return quickSelect(nums, k - 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        function partition(left, right) {
            const mid = (left + right) >> 1;
            [nums[mid], nums[left + 1]] = [nums[left + 1], nums[mid]];
            
            if (nums[left] < nums[right])
                [nums[left], nums[right]] = [nums[right], nums[left]];
            if (nums[left + 1] < nums[right])
                [nums[left + 1], nums[right]] = [nums[right], nums[left + 1]];
            if (nums[left] < nums[left + 1])
                [nums[left], nums[left + 1]] = [nums[left + 1], nums[left]];
            
            const pivot = nums[left + 1];
            let i = left + 1;
            let j = right;
            
            while (true) {
                while (nums[++i] > pivot);
                while (nums[--j] < pivot);
                if (i > j) break;
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
            
            nums[left + 1] = nums[j];
            nums[j] = pivot;
            return j;
        }
        
        function quickSelect(k) {
            let left = 0;
            let right = nums.length - 1;
            
            while (true) {
                if (right <= left + 1) {
                    if (right == left + 1 && nums[right] > nums[left])
                        [nums[left], nums[right]] = [nums[right], nums[left]];
                    return nums[k];
                }
                
                const j = partition(left, right);
                
                if (j >= k) right = j - 1;
                if (j <= k) left = j + 1;
            }
        }
        
        return quickSelect(k - 1);
    }
}
```

```csharp
public class Solution {
    private int Partition(int[] nums, int left, int right) {
        int mid = (left + right) >> 1;
        (nums[mid], nums[left + 1]) = (nums[left + 1], nums[mid]);
        
        if (nums[left] < nums[right])
            (nums[left], nums[right]) = (nums[right], nums[left]);
        if (nums[left + 1] < nums[right])
            (nums[left + 1], nums[right]) = (nums[right], nums[left + 1]);
        if (nums[left] < nums[left + 1])
            (nums[left], nums[left + 1]) = (nums[left + 1], nums[left]);
        
        int pivot = nums[left + 1];
        int i = left + 1;
        int j = right;
        
        while (true) {
            while (nums[++i] > pivot);
            while (nums[--j] < pivot);
            if (i > j) break;
            (nums[i], nums[j]) = (nums[j], nums[i]);
        }
        
        nums[left + 1] = nums[j];
        nums[j] = pivot;
        return j;
    }
    
    private int QuickSelect(int[] nums, int k) {
        int left = 0;
        int right = nums.Length - 1;
        
        while (true) {
            if (right <= left + 1) {
                if (right == left + 1 && nums[right] > nums[left])
                    (nums[left], nums[right]) = (nums[right], nums[left]);
                return nums[k];
            }
            
            int j = Partition(nums, left, right);
            
            if (j >= k) right = j - 1;
            if (j <= k) left = j + 1;
        }
    }
    
    public int FindKthLargest(int[] nums, int k) {
        return QuickSelect(nums, k - 1);
    }
}
```

```go
func findKthLargest(nums []int, k int) int {
    var partition func(left, right int) int
    partition = func(left, right int) int {
        mid := (left + right) >> 1
        nums[mid], nums[left+1] = nums[left+1], nums[mid]
        
        if nums[left] < nums[right] {
            nums[left], nums[right] = nums[right], nums[left]
        }
        if nums[left+1] < nums[right] {
            nums[left+1], nums[right] = nums[right], nums[left+1]
        }
        if nums[left] < nums[left+1] {
            nums[left], nums[left+1] = nums[left+1], nums[left]
        }
        
        pivot := nums[left+1]
        i := left + 1
        j := right
        
        for {
            for i++; nums[i] > pivot; i++ {}
            for j--; nums[j] < pivot; j-- {}
            if i > j {
                break
            }
            nums[i], nums[j] = nums[j], nums[i]
        }
        
        nums[left+1], nums[j] = nums[j], nums[left+1]
        return j
    }
    
    quickSelect := func(k int) int {
        left := 0
        right := len(nums) - 1
        
        for {
            if right <= left+1 {
                if right == left+1 && nums[right] > nums[left] {
                    nums[left], nums[right] = nums[right], nums[left]
                }
                return nums[k]
            }
            
            j := partition(left, right)
            
            if j >= k {
                right = j - 1
            }
            if j <= k {
                left = j + 1
            }
        }
    }
    
    return quickSelect(k - 1)
}
```

```kotlin
class Solution {
    private fun partition(nums: IntArray, left: Int, right: Int): Int {
        val mid = (left + right) shr 1
        nums[mid] = nums[left + 1].also { nums[left + 1] = nums[mid] }
        
        if (nums[left] < nums[right])
            nums[left] = nums[right].also { nums[right] = nums[left] }
        if (nums[left + 1] < nums[right])
            nums[left + 1] = nums[right].also { nums[right] = nums[left + 1] }
        if (nums[left] < nums[left + 1])
            nums[left] = nums[left + 1].also { nums[left + 1] = nums[left] }
        
        val pivot = nums[left + 1]
        var i = left + 1
        var j = right
        
        while (true) {
            while (nums[++i] > pivot);
            while (nums[--j] < pivot);
            if (i > j) break
            nums[i] = nums[j].also { nums[j] = nums[i] }
        }
        
        nums[left + 1] = nums[j]
        nums[j] = pivot
        return j
    }
    
    private fun quickSelect(nums: IntArray, k: Int): Int {
        var left = 0
        var right = nums.size - 1
        
        while (true) {
            if (right <= left + 1) {
                if (right == left + 1 && nums[right] > nums[left])
                    nums[left] = nums[right].also { nums[right] = nums[left] }
                return nums[k]
            }
            
            val j = partition(nums, left, right)
            
            if (j >= k) right = j - 1
            if (j <= k) left = j + 1
        }
    }
    
    fun findKthLargest(nums: IntArray, k: Int): Int {
        return quickSelect(nums, k - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ in average case, $O(n ^ 2)$ in worst case.
* Space complexity: $O(1)$