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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Heap

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log k)$
* Space complexity: $O(k)$

> Where $n$ is the length of the array $nums$.

---

## 3. Recursive Quick Select

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ in average case, $O(n ^ 2)$ in worst case.
* Space complexity: $O(n)$

---

## 4. Iterative Quick Select

::tabs-start

```python
class Solution:

    def findKthLargest(self, nums: List[int], k: int) -> int:
        k = len(nums) - k
        left, right = 0, len(nums) - 1

        while left < right:
            pivot = self.partition(nums, left, right)

            if pivot < k:
                left = pivot + 1
            elif pivot > k:
                right = pivot - 1
            else:
                break

        return nums[k]

    def partition(self, nums: List[int], left: int, right: int) -> int:
        pivot, fill = nums[right], left

        for i in range(left, right):
            if nums[i] <= pivot:
                nums[fill], nums[i] = nums[i], nums[fill]
                fill += 1

        nums[fill], nums[right] = nums[right], nums[fill]

        return fill
```

```java
public class Solution {  
    public int findKthLargest(int[] nums, int k) {
        k = nums.length - k;
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int pivot = partition(nums, left, right);
            if (pivot < k)
                left = pivot + 1;
            else if (pivot > k)
                right = pivot - 1;
            else
                break;
        }
        return nums[k];
    }

    private int partition(int[] nums, int left, int right) {
        int pivot = nums[right], fill = left;
        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                int temp = nums[fill];
                nums[fill++] = nums[i];
                nums[i] = temp;
            }
        }
        nums[right] = nums[fill];
        nums[fill] = pivot;
        return fill;
    }
}
```

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        k = nums.size() - k;
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            int pivot = partition(nums, left, right);
            if (pivot < k)
                left = pivot + 1;
            else if (pivot > k)
                right = pivot - 1;
            else
                break;
        }
        return nums[k];
    }

private:
    int partition(vector<int>& nums, int left, int right) {
        int pivot = nums[right], fill = left;
        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                swap(nums[fill++], nums[i]);
            }
        }
        swap(nums[right], nums[fill]);
        return fill;
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
        let left = 0;
        let right = nums.length - 1;
        while (left < right) {
            const pivot = this.partition(nums, left, right);
            if (pivot < k) left = pivot + 1;
            else if (pivot > k) right = pivot - 1;
            else break;
        }
        return nums[k];
    }

    /**
     * @param {number[]} nums
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    partition(nums, left, right) {
        const pivot = nums[right];
        let fill = left;
        for (let i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                [nums[fill], nums[i]] = [nums[i], nums[fill]];
                fill++;
            }
        }
        [nums[right], nums[fill]] = [nums[fill], nums[right]];
        return fill;
    }
}
```

```csharp
public class Solution {
    
    public int FindKthLargest(int[] nums, int k) {
        k = nums.Length - k;
        int left = 0, right = nums.Length - 1;
        while (left < right) {
            int pivot = Partition(nums, left, right);
            if (pivot < k)
                left = pivot + 1;
            else if (pivot > k)
                right = pivot - 1;
            else
                break;
        }
        return nums[k];
    }

    private int Partition(int[] nums, int left, int right) {
        int pivot = nums[right], fill = left;
        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                int temp = nums[fill];
                nums[fill++] = nums[i];
                nums[i] = temp;
            }
        }
        nums[right] = nums[fill];
        nums[fill] = pivot;
        return fill;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ in average case, $O(n ^ 2)$ in worst case.
* Space complexity: $O(1)$