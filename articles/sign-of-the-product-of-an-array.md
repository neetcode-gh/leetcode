## 1. Count Negative Numbers

::tabs-start

```python
class Solution:
    def arraySign(self, nums: list[int]) -> int:
        neg = 0
        for num in nums:
            if num == 0:
                return 0
            neg += (1 if num < 0 else 0)
        return -1 if neg % 2 else 1
```

```java
public class Solution {
    public int arraySign(int[] nums) {
        int neg = 0;
        for (int num : nums) {
            if (num == 0) {
                return 0;
            }
            if (num < 0) {
                neg++;
            }
        }
        return neg % 2 == 0 ? 1 : -1;
    }
}
```

```cpp
class Solution {
public:
    int arraySign(vector<int>& nums) {
        int neg = 0;
        for (int num : nums) {
            if (num == 0) {
                return 0;
            }
            if (num < 0) {
                neg++;
            }
        }
        return neg % 2 == 0 ? 1 : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    arraySign(nums) {
        let neg = 0;
        for (const num of nums) {
            if (num === 0) {
                return 0;
            }
            if (num < 0) {
                neg++;
            }
        }
        return neg % 2 === 0 ? 1 : -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Track the Sign of the Product

::tabs-start

```python
class Solution:
    def arraySign(self, nums: list[int]) -> int:
        sign = 1
        for num in nums:
            if num == 0:
                return 0
            if num < 0:
                sign *= -1
        return sign
```

```java
public class Solution {
    public int arraySign(int[] nums) {
        int sign = 1;
        for (int num : nums) {
            if (num == 0) {
                return 0;
            }
            if (num < 0) {
                sign *= -1;
            }
        }
        return sign;
    }
}
```

```cpp
class Solution {
public:
    int arraySign(vector<int>& nums) {
        int sign = 1;
        for (int num : nums) {
            if (num == 0) {
                return 0;
            }
            if (num < 0) {
                sign *= -1;
            }
        }
        return sign;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    arraySign(nums) {
        let sign = 1;
        for (const num of nums) {
            if (num === 0) {
                return 0;
            }
            if (num < 0) {
                sign *= -1;
            }
        }
        return sign;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
