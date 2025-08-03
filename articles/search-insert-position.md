## 1. Linear Search

::tabs-start

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        for i in range(len(nums)):
            if nums[i] >= target:
                return i
        return len(nums)
```

```java
public class Solution {
    public int searchInsert(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] >= target) {
                return i;
            }
        }
        return nums.length;
    }
}
```

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] >= target) {
                return i;
            }
        }
        return nums.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    searchInsert(nums, target) {
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] >= target) {
                return i;
            }
        }
        return nums.length;
    }
}
```

```csharp
public class Solution {
    public int SearchInsert(int[] nums, int target) {
        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] >= target) {
                return i;
            }
        }
        return nums.Length;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 2. Binary Search - I

::tabs-start

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        res = len(nums)
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] > target:
                res = mid
                r = mid - 1
            else:
                l = mid + 1
        return res
```

```java
public class Solution {
    public int searchInsert(int[] nums, int target) {
        int res = nums.length;
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int res = nums.size();
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
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
     * @param {number} target
     * @return {number}
     */
    searchInsert(nums, target) {
        let res = nums.length;
        let l = 0,
            r = nums.length - 1;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (nums[mid] === target) {
                return mid;
            }
            if (nums[mid] > target) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int SearchInsert(int[] nums, int target) {
        int res = nums.Length;
        int l = 0, r = nums.Length - 1;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$ extra space.

---

## 3. Binary Search - II

::tabs-start

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] > target:
                r = mid - 1
            else:
                l = mid + 1
        return l
```

```java
public class Solution {
    public int searchInsert(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    searchInsert(nums, target) {
        let l = 0,
            r = nums.length - 1;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (nums[mid] === target) {
                return mid;
            }
            if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
}
```

```csharp
public class Solution {
    public int SearchInsert(int[] nums, int target) {
        int l = 0, r = nums.Length - 1;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return l;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Binary Search (Lower Bound)

::tabs-start

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)
        while l < r:
            m = l + ((r - l) // 2)
            if nums[m] >= target:
                r = m
            elif nums[m] < target:
                l = m + 1
        return l
```

```java
public class Solution {
    public int searchInsert(int[] nums, int target) {
        int l = 0, r = nums.length;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int l = 0, r = nums.size();
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    searchInsert(nums, target) {
        let l = 0,
            r = nums.length;
        while (l < r) {
            let m = l + Math.floor((r - l) / 2);
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    }
}
```

```csharp
public class Solution {
    public int SearchInsert(int[] nums, int target) {
        int l = 0, r = nums.Length;

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }

        return l;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 5. Built-In Binary Search Function

::tabs-start

```python
import bisect
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        return bisect.bisect_left(nums, target)
```

```java
public class Solution {
    public int searchInsert(int[] nums, int target) {
        int index = Arrays.binarySearch(nums, target);
        return index >= 0 ? index : -index - 1;
    }
}
```

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        return lower_bound(nums.begin(), nums.end(), target) - nums.begin();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    searchInsert(nums, target) {
        // There is no built in Binary Search function for JS.
        let index = nums.findIndex((x) => x >= target);
        return index !== -1 ? index : nums.length;
    }
}
```

```csharp
public class Solution {
    public int SearchInsert(int[] nums, int target) {
        int idx = Array.BinarySearch(nums, target);
        return idx >= 0 ? idx : ~idx;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
