## 1. Brute Force

::tabs-start

```python
class Solution:
    def zeroFilledSubarray(self, nums: List[int]) -> int:
        res = 0
        for i in range(len(nums)):
            for j in range(i, len(nums)):
                if nums[j] != 0:
                    break
                res += 1
        return res
```

```java
public class Solution {
    public long zeroFilledSubarray(int[] nums) {
        long res = 0;
        for (int i = 0; i < nums.length; i++) {
            for (int j = i; j < nums.length; j++) {
                if (nums[j] != 0) break;
                res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long zeroFilledSubarray(vector<int>& nums) {
        long long res = 0;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i; j < nums.size(); j++) {
                if (nums[j] != 0) break;
                res++;
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
    zeroFilledSubarray(nums) {
        let res = 0;
        for (let i = 0; i < nums.length; i++) {
            for (let j = i; j < nums.length; j++) {
                if (nums[j] != 0) break;
                res++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Count Consecutive Zeros - I

::tabs-start

```python
class Solution:
    def zeroFilledSubarray(self, nums: List[int]) -> int:
        res = i = 0
        while i < len(nums):
            count = 0
            while i < len(nums) and nums[i] == 0:
                count += 1
                i += 1
                res += count
            i += 1
        return res
```

```java
public class Solution {
    public long zeroFilledSubarray(int[] nums) {
        long res = 0;
        int i = 0;
        while (i < nums.length) {
            long count = 0;
            while (i < nums.length && nums[i] == 0) {
                count++;
                i++;
                res += count;
            }
            i++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long zeroFilledSubarray(vector<int>& nums) {
        long long res = 0;
        int i = 0;
        while (i < nums.size()) {
            long long count = 0;
            while (i < nums.size() && nums[i] == 0) {
                count++;
                i++;
                res += count;
            }
            i++;
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
    zeroFilledSubarray(nums) {
        let res = 0,
            i = 0;
        while (i < nums.length) {
            let count = 0;
            while (i < nums.length && nums[i] === 0) {
                count++;
                i++;
                res += count;
            }
            i++;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Count Consecutive Zeros - II

::tabs-start

```python
class Solution:
    def zeroFilledSubarray(self, nums: List[int]) -> int:
        res = count = 0

        for num in nums:
            if num == 0:
                count += 1
            else:
                count = 0
            res += count

        return res
```

```java
public class Solution {
    public long zeroFilledSubarray(int[] nums) {
        long res = 0;
        int count = 0;

        for (int num : nums) {
            if (num == 0) {
                count++;
            } else {
                count = 0;
            }
            res += count;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long zeroFilledSubarray(vector<int>& nums) {
        long long res = 0;
        int count = 0;

        for (int& num : nums) {
            if (num == 0) {
                count++;
            } else {
                count = 0;
            }
            res += count;
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
    zeroFilledSubarray(nums) {
        let res = 0,
            count = 0;

        for (let num of nums) {
            if (num === 0) {
                count++;
            } else {
                count = 0;
            }
            res += count;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Count Consecutive Zeros (Math)

::tabs-start

```python
class Solution:
    def zeroFilledSubarray(self, nums: List[int]) -> int:
        res = count = 0
        for num in nums:
            if num == 0:
                count += 1
            else:
                res += (count * (count + 1)) // 2
                count = 0
        res += (count * (count + 1)) // 2
        return res
```

```java
public class Solution {
    public long zeroFilledSubarray(int[] nums) {
        long res = 0, count = 0;
        for (int num : nums) {
            if (num == 0) {
                count++;
            } else {
                res += count * (count + 1) / 2;
                count = 0;
            }
        }
        res += count * (count + 1) / 2;
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long zeroFilledSubarray(vector<int>& nums) {
        long long res = 0, count = 0;
        for (int num : nums) {
            if (num == 0) {
                count++;
            } else {
                res += count * (count + 1) / 2;
                count = 0;
            }
        }
        res += count * (count + 1) / 2;
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
    zeroFilledSubarray(nums) {
        let res = 0,
            count = 0;
        for (let num of nums) {
            if (num === 0) {
                count++;
            } else {
                res += (count * (count + 1)) / 2;
                count = 0;
            }
        }
        res += (count * (count + 1)) / 2;
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
