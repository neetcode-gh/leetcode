## 1. Brute Force

::tabs-start

```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            if ((i and nums[i] == nums[i - 1]) or
                (i < n - 1 and nums[i] == nums[i + 1])
            ):
                continue
            return nums[i]
```

```java
public class Solution {
    public int singleNonDuplicate(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i < n - 1 && nums[i] == nums[i + 1])) {
                continue;
            }
            return nums[i];
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i < n - 1 && nums[i] == nums[i + 1])) {
                continue;
            }
            return nums[i];
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
    singleNonDuplicate(nums) {
        const n = nums.length;
        for (let i = 0; i < n; i++) {
            if (
                (i > 0 && nums[i] === nums[i - 1]) ||
                (i < n - 1 && nums[i] === nums[i + 1])
            ) {
                continue;
            }
            return nums[i];
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int SingleNonDuplicate(int[] nums) {
        int n = nums.Length;
        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i < n - 1 && nums[i] == nums[i + 1])) {
                continue;
            }
            return nums[i];
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Brute Force (Bitwise Xor)

::tabs-start

```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        xorr = 0
        for num in nums:
            xorr ^= num
        return xorr
```

```java
public class Solution {
    public int singleNonDuplicate(int[] nums) {
        int xorr = 0;
        for (int num : nums) {
            xorr ^= num;
        }
        return xorr;
    }
}
```

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int xorr = 0;
        for (int num : nums) {
            xorr ^= num;
        }
        return xorr;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    singleNonDuplicate(nums) {
        let xorr = 0;
        for (const num of nums) {
            xorr ^= num;
        }
        return xorr;
    }
}
```

```csharp
public class Solution {
    public int SingleNonDuplicate(int[] nums) {
        int xorr = 0;
        foreach (int num in nums) {
            xorr ^= num;
        }
        return xorr;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Binary Search

::tabs-start

```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1

        while l <= r:
            m = l + ((r - l) // 2)
            if ((m - 1 < 0 or nums[m - 1] != nums[m]) and
                (m + 1 == len(nums) or nums[m] != nums[m + 1])):
                return nums[m]

            leftSize = m - 1 if nums[m - 1] == nums[m] else m
            if leftSize % 2:
                r = m - 1
            else:
                l = m + 1
```

```java
public class Solution {
    public int singleNonDuplicate(int[] nums) {
        int l = 0, r = nums.length - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;
            if ((m - 1 < 0 || nums[m - 1] != nums[m]) &&
                (m + 1 == nums.length || nums[m] != nums[m + 1])) {
                return nums[m];
            }

            int leftSize = (m - 1 >= 0 && nums[m - 1] == nums[m]) ? m - 1 : m;
            if (leftSize % 2 == 1) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;
            if ((m - 1 < 0 || nums[m - 1] != nums[m]) &&
                (m + 1 == nums.size() || nums[m] != nums[m + 1])) {
                return nums[m];
            }

            int leftSize = (m - 1 >= 0 && nums[m - 1] == nums[m]) ? m - 1 : m;
            if (leftSize % 2 == 1) {
                r = m - 1;
            } else {
                l = m + 1;
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
    singleNonDuplicate(nums) {
        let l = 0,
            r = nums.length - 1;

        while (l <= r) {
            let m = l + Math.floor((r - l) / 2);
            if (
                (m - 1 < 0 || nums[m - 1] !== nums[m]) &&
                (m + 1 === nums.length || nums[m] !== nums[m + 1])
            ) {
                return nums[m];
            }

            let leftSize = m - 1 >= 0 && nums[m - 1] === nums[m] ? m - 1 : m;
            if (leftSize % 2 === 1) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
    }
}
```

```csharp
public class Solution {
    public int SingleNonDuplicate(int[] nums) {
        int l = 0, r = nums.Length - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;

            if ((m - 1 < 0 || nums[m - 1] != nums[m]) &&
                (m + 1 == nums.Length || nums[m] != nums[m + 1])) {
                return nums[m];
            }

            int leftSize = (m - 1 >= 0 && nums[m - 1] == nums[m]) ? m - 1 : m;

            if (leftSize % 2 == 1) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. Binary Search On Even Indexes

::tabs-start

```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1

        while l < r:
            m = l + (r - l) // 2
            if m & 1:
                m -= 1
            if nums[m] != nums[m + 1]:
                r = m
            else:
                l = m + 2

        return nums[l]
```

```java
public class Solution {
    public int singleNonDuplicate(int[] nums) {
        int l = 0, r = nums.length - 1;

        while (l < r) {
            int m = l + (r - l) / 2;
            if ((m & 1) == 1) {
                m--;
            }
            if (nums[m] != nums[m + 1]) {
                r = m;
            } else {
                l = m + 2;
            }
        }

        return nums[l];
    }
}
```

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;

        while (l < r) {
            int m = l + (r - l) / 2;
            if (m & 1) {
                m--;
            }
            if (nums[m] != nums[m + 1]) {
                r = m;
            } else {
                l = m + 2;
            }
        }

        return nums[l];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    singleNonDuplicate(nums) {
        let l = 0,
            r = nums.length - 1;

        while (l < r) {
            let m = Math.floor(l + (r - l) / 2);
            if (m & 1) {
                m--;
            }
            if (nums[m] !== nums[m + 1]) {
                r = m;
            } else {
                l = m + 2;
            }
        }

        return nums[l];
    }
}
```

```csharp
public class Solution {
    public int SingleNonDuplicate(int[] nums) {
        int l = 0, r = nums.Length - 1;

        while (l < r) {
            int m = l + (r - l) / 2;
            if ((m & 1) == 1) {
                m--;
            }
            if (nums[m] != nums[m + 1]) {
                r = m;
            } else {
                l = m + 2;
            }
        }

        return nums[l];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 5. Binary Search + Bit Manipulation

::tabs-start

```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1

        while l < r:
            m = (l + r) >> 1
            if nums[m] != nums[m ^ 1]:
                r = m
            else:
                l = m + 1

        return nums[l]
```

```java
public class Solution {
    public int singleNonDuplicate(int[] nums) {
        int l = 0, r = nums.length - 1;

        while (l < r) {
            int m = (l + r) >> 1;
            if (nums[m] != nums[m ^ 1]) {
                r = m;
            } else {
                l = m + 1;
            }
        }

        return nums[l];
    }
}
```

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;

        while (l < r) {
            int m = (l + r) >> 1;
            if (nums[m] != nums[m ^ 1]) {
                r = m;
            } else {
                l = m + 1;
            }
        }

        return nums[l];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    singleNonDuplicate(nums) {
        let l = 0,
            r = nums.length - 1;

        while (l < r) {
            let m = (l + r) >> 1;
            if (nums[m] !== nums[m ^ 1]) {
                r = m;
            } else {
                l = m + 1;
            }
        }

        return nums[l];
    }
}
```

```csharp
public class Solution {
    public int SingleNonDuplicate(int[] nums) {
        int l = 0, r = nums.Length - 1;

        while (l < r) {
            int m = (l + r) >> 1;
            if (nums[m] != nums[m ^ 1]) {
                r = m;
            } else {
                l = m + 1;
            }
        }

        return nums[l];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
