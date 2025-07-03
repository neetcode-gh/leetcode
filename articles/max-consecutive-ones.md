## 1. Brute Force

::tabs-start

```python
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        n, res = len(nums), 0

        for i in range(n):
            cnt = 0
            for j in range(i, n):
                if nums[j] == 0: break
                cnt += 1
            res = max(res, cnt)
        
        return res
```

```java
public class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int n = nums.length, res = 0;
        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == 0) break;
                cnt++;
            }
            res = Math.max(res, cnt);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == 0) break;
                cnt++;
            }
            res = max(res, cnt);
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
    findMaxConsecutiveOnes(nums) {
        const n = nums.length;
        let res = 0;
        for (let i = 0; i < n; i++) {
            let cnt = 0;
            for (let j = i; j < n; j++) {
                if (nums[j] === 0) break;
                cnt++;
            }
            res = Math.max(res, cnt);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int FindMaxConsecutiveOnes(int[] nums) {
        int n = nums.Length, res = 0;
        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == 0) break;
                cnt++;
            }
            res = Math.Max(res, cnt);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Iteration - I

::tabs-start

```python
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        res = cnt = 0
        for num in nums:
            if num == 0:
                res = max(res, cnt)
                cnt = 0
            else:
                cnt += 1

        return max(cnt, res)
```

```java
public class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int res = 0, cnt = 0;
        for (int num : nums) {
            if (num == 0) {
                res = Math.max(res, cnt);
                cnt = 0;
            } else {
                cnt++;
            }
        }
        return Math.max(res, cnt);
    }
}
```

```cpp
class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int res = 0, cnt = 0;
        for (int num : nums) {
            if (num == 0) {
                res = max(res, cnt);
                cnt = 0;
            } else {
                cnt++;
            }
        }
        return max(res, cnt);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMaxConsecutiveOnes(nums) {
        let res = 0, cnt = 0;
        for (const num of nums) {
            if (num === 0) {
                res = Math.max(res, cnt);
                cnt = 0;
            } else {
                cnt++;
            }
        }
        return Math.max(res, cnt);
    }
}
```

```csharp
public class Solution {
    public int FindMaxConsecutiveOnes(int[] nums) {
        int res = 0, cnt = 0;
        foreach (int num in nums) {
            if (num == 0) {
                res = Math.Max(res, cnt);
                cnt = 0;
            } else {
                cnt++;
            }
        }
        return Math.Max(res, cnt);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 3. Iteration - II

::tabs-start

```python
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        res = cnt = 0
        for num in nums:
            cnt += 1 if num else -cnt
            res = max(res, cnt)
        return res
```

```java
public class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int res = 0, cnt = 0;
        for (int num : nums) {
            cnt = (num == 1) ? cnt + 1 : 0;
            res = Math.max(res, cnt);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int res = 0, cnt = 0;
        for (int num : nums) {
            cnt = num ? cnt + 1 : 0;
            res = max(res, cnt);
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
    findMaxConsecutiveOnes(nums) {
        let res = 0, cnt = 0;
        for (const num of nums) {
            cnt = num === 1 ? cnt + 1 : 0;
            res = Math.max(res, cnt);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int FindMaxConsecutiveOnes(int[] nums) {
        int res = 0, cnt = 0;
        foreach (int num in nums) {
            cnt = (num == 1) ? cnt + 1 : 0;
            res = Math.Max(res, cnt);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$