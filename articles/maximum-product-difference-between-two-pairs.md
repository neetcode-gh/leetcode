## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxProductDifference(self, nums: List[int]) -> int:
        n, res = len(nums), 0
        for a in range(n):
            for b in range(n):
                if a == b: continue
                for c in range(n):
                    if a == c or b == c: continue
                    for d in range(n):
                        if a == d or b == d or c == d: continue
                        res = max(res, nums[a] * nums[b] - nums[c] * nums[d])
        return res
```

```java
public class Solution {
    public int maxProductDifference(int[] nums) {
        int n = nums.length, res = 0;
        for (int a = 0; a < n; a++) {
            for (int b = 0; b < n; b++) {
                if (a == b) continue;
                for (int c = 0; c < n; c++) {
                    if (a == c || b == c) continue;
                    for (int d = 0; d < n; d++) {
                        if (a == d || b == d || c == d) continue;
                        res = Math.max(res, nums[a] * nums[b] - nums[c] * nums[d]);
                    }
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProductDifference(vector<int>& nums) {
        int n = nums.size(), res = 0;
        for (int a = 0; a < n; a++) {
            for (int b = 0; b < n; b++) {
                if (a == b) continue;
                for (int c = 0; c < n; c++) {
                    if (a == c || b == c) continue;
                    for (int d = 0; d < n; d++) {
                        if (a == d || b == d || c == d) continue;
                        res = max(res, nums[a] * nums[b] - nums[c] * nums[d]);
                    }
                }
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
    maxProductDifference(nums) {
        const n = nums.length;
        let res = 0;
        for (let a = 0; a < n; a++) {
            for (let b = 0; b < n; b++) {
                if (a === b) continue;
                for (let c = 0; c < n; c++) {
                    if (a === c || b === c) continue;
                    for (let d = 0; d < n; d++) {
                        if (a === d || b === d || c === d) continue;
                        res = Math.max(
                            res,
                            nums[a] * nums[b] - nums[c] * nums[d],
                        );
                    }
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 4)$
- Space complexity: $O(1)$

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def maxProductDifference(self, nums: List[int]) -> int:
        nums.sort()
        return nums[-1] * nums[-2] - nums[0] * nums[1]
```

```java
public class Solution {
    public int maxProductDifference(int[] nums) {
        Arrays.sort(nums);
        return nums[nums.length - 1] * nums[nums.length - 2] - nums[0] * nums[1];
    }
}
```

```cpp
class Solution {
public:
    int maxProductDifference(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        return nums[nums.size() - 1] * nums[nums.size() - 2] - nums[0] * nums[1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxProductDifference(nums) {
        nums.sort((a, b) => a - b);
        return (
            nums[nums.length - 1] * nums[nums.length - 2] - nums[0] * nums[1]
        );
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Two Maximums and Two Minimums

::tabs-start

```python
class Solution:
    def maxProductDifference(self, nums: List[int]) -> int:
        max1 = max2 = 0
        min1 = min2 = float('inf')

        for num in nums:
            if num > max1:
                max1, max2 = num, max1
            elif num > max2:
                max2 = num
            if num < min1:
                min1, min2 = num, min1
            elif num < min2:
                min2 = num

        return (max1 * max2) - (min1 * min2)
```

```java
public class Solution {
    public int maxProductDifference(int[] nums) {
        int max1 = 0, max2 = 0;
        int min1 = Integer.MAX_VALUE, min2 = Integer.MAX_VALUE;
        for (int num : nums) {
            if (num > max1) {
                max2 = max1;
                max1 = num;
            } else if (num > max2) {
                max2 = num;
            }
            if (num < min1) {
                min2 = min1;
                min1 = num;
            } else if (num < min2) {
                min2 = num;
            }
        }
        return (max1 * max2) - (min1 * min2);
    }
}
```

```cpp
class Solution {
public:
    int maxProductDifference(vector<int>& nums) {
        int max1 = 0, max2 = 0;
        int min1 = INT_MAX, min2 = INT_MAX;
        for (int num : nums) {
            if (num > max1) {
                max2 = max1;
                max1 = num;
            } else if (num > max2) {
                max2 = num;
            }
            if (num < min1) {
                min2 = min1;
                min1 = num;
            } else if (num < min2) {
                min2 = num;
            }
        }
        return (max1 * max2) - (min1 * min2);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxProductDifference(nums) {
        let max1 = 0,
            max2 = 0;
        let min1 = Infinity,
            min2 = Infinity;
        for (const num of nums) {
            if (num > max1) {
                max2 = max1;
                max1 = num;
            } else if (num > max2) {
                max2 = num;
            }
            if (num < min1) {
                min2 = min1;
                min1 = num;
            } else if (num < min2) {
                min2 = num;
            }
        }
        return max1 * max2 - min1 * min2;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
