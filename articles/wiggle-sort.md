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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
