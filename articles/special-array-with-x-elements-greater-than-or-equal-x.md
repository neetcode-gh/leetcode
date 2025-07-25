## 1. Brute Force

::tabs-start

```python
class Solution:
    def specialArray(self, nums: List[int]) -> int:
        for i in range(1, len(nums) + 1):
            cnt = 0
            for num in nums:
                if num >= i:
                    cnt += 1

            if cnt == i:
                return i

        return -1
```

```java
public class Solution {
    public int specialArray(int[] nums) {
        for (int i = 1; i <= nums.length; i++) {
            int count = 0;
            for (int num : nums) {
                if (num >= i) {
                    count++;
                }
            }
            if (count == i) {
                return i;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        for (int i = 1; i <= nums.size(); i++) {
            int count = 0;
            for (int num : nums) {
                if (num >= i) {
                    count++;
                }
            }
            if (count == i) {
                return i;
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
    specialArray(nums) {
        for (let i = 1; i <= nums.length; i++) {
            let count = 0;
            for (let num of nums) {
                if (num >= i) {
                    count++;
                }
            }
            if (count === i) {
                return i;
            }
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def specialArray(self, nums: List[int]) -> int:
        l, r = 1, len(nums)
        while l <= r:
            mid = (l + r) >> 1
            cnt = sum(1 for num in nums if num >= mid)

            if cnt == mid:
                return mid

            if cnt < mid:
                r = mid - 1
            else:
                l = mid + 1

        return -1
```

```java
public class Solution {
    public int specialArray(int[] nums) {
        int l = 1, r = nums.length;
        while (l <= r) {
            int mid = (l + r) / 2;
            int cnt = 0;
            for (int num : nums) {
                if (num >= mid) cnt++;
            }

            if (cnt == mid) return mid;

            if (cnt < mid) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        int l = 1, r = nums.size();
        while (l <= r) {
            int mid = (l + r) / 2;
            int cnt = 0;
            for (int num : nums) {
                if (num >= mid) cnt++;
            }

            if (cnt == mid) return mid;

            if (cnt < mid) {
                r = mid - 1;
            } else {
                l = mid + 1;
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
    specialArray(nums) {
        let l = 1,
            r = nums.length;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            const cnt = nums.filter((num) => num >= mid).length;

            if (cnt === mid) return mid;

            if (cnt < mid) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$

---

## 3. Sorting

::tabs-start

```python
class Solution:
    def specialArray(self, nums: List[int]) -> int:
        nums.sort()
        i = 0
        prev = -1
        total_right = len(nums)
        while i < len(nums):
            if nums[i] == total_right or (prev < total_right < nums[i]):
                return total_right

            while i + 1 < len(nums) and nums[i] == nums[i + 1]:
                i += 1

            prev = nums[i]
            i += 1
            total_right = len(nums) - i

        return -1
```

```java
public class Solution {
    public int specialArray(int[] nums) {
        Arrays.sort(nums);
        int i = 0, prev = -1, totalRight = nums.length;

        while (i < nums.length) {
            if (nums[i] == totalRight ||
               (prev < totalRight && totalRight < nums[i])) {
                return totalRight;
            }

            while (i + 1 < nums.length && nums[i] == nums[i + 1]) {
                i++;
            }

            prev = nums[i];
            i++;
            totalRight = nums.length - i;
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int i = 0, prev = -1, totalRight = nums.size();

        while (i < nums.size()) {
            if (nums[i] == totalRight ||
               (prev < totalRight && totalRight < nums[i])) {
                return totalRight;
            }

            while (i + 1 < nums.size() && nums[i] == nums[i + 1]) {
                i++;
            }

            prev = nums[i];
            i++;
            totalRight = nums.size() - i;
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
    specialArray(nums) {
        nums.sort((a, b) => a - b);
        let i = 0,
            prev = -1,
            totalRight = nums.length;

        while (i < nums.length) {
            if (
                nums[i] === totalRight ||
                (prev < totalRight && totalRight < nums[i])
            ) {
                return totalRight;
            }

            while (i + 1 < nums.length && nums[i] === nums[i + 1]) {
                i++;
            }

            prev = nums[i];
            i++;
            totalRight = nums.length - i;
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Sorting + Two Pointers

::tabs-start

```python
class Solution:
    def specialArray(self, nums: List[int]) -> int:
        nums.sort()
        n = len(nums)
        i, j = 0, 1

        while i < n and j <= n:
            while i < n and j > nums[i]:
                i += 1

            if j == n - i:
                return j
            j += 1

        return -1
```

```java
public class Solution {
    public int specialArray(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        int i = 0, j = 1;

        while (i < n && j <= n) {
            while (i < n && j > nums[i]) i++;

            if (j == n - i) {
                return j;
            }
            j++;
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int i = 0, j = 1;

        while (i < n && j <= n) {
            while (i < n && j > nums[i]) i++;

            if (j == n - i) {
                return j;
            }
            j++;
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
    specialArray(nums) {
        nums.sort((a, b) => a - b);
        const n = nums.length;
        let i = 0,
            j = 1;

        while (i < n && j <= n) {
            while (i < n && j > nums[i]) i++;

            if (j == n - i) {
                return j;
            }
            j++;
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 5. Counting Sort

::tabs-start

```python
class Solution:
    def specialArray(self, nums: List[int]) -> int:
        count = [0] * (len(nums) + 1)
        for num in nums:
            index = min(num, len(nums))
            count[index] += 1

        total_right = 0
        for i in range(len(nums), -1, -1):
            total_right += count[i]
            if i == total_right:
                return total_right
        return -1
```

```java
public class Solution {
    public int specialArray(int[] nums) {
        int[] count = new int[nums.length + 1];
        for (int num : nums) {
            int index = Math.min(num, nums.length);
            count[index]++;
        }

        int totalRight = 0;
        for (int i = nums.length; i >= 0; i--) {
            totalRight += count[i];
            if (i == totalRight) {
                return totalRight;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        vector<int> count(nums.size() + 1, 0);
        for (int num : nums) {
            int index = min(num, (int)nums.size());
            count[index]++;
        }

        int totalRight = 0;
        for (int i = nums.size(); i >= 0; --i) {
            totalRight += count[i];
            if (i == totalRight) {
                return totalRight;
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
    specialArray(nums) {
        const count = new Array(nums.length + 1).fill(0);
        for (const num of nums) {
            const index = Math.min(num, nums.length);
            count[index]++;
        }

        let totalRight = 0;
        for (let i = nums.length; i >= 0; i--) {
            totalRight += count[i];
            if (i === totalRight) {
                return totalRight;
            }
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
