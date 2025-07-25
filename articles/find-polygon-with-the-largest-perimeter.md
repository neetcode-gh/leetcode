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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n + (30\log n))$ in Python, C++, JS.
    - $O(n \log n)$ in Java.
- Space complexity: $O(n)$
