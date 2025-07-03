## 1. Brute Force

::tabs-start

```python
class Solution:
    def longestMonotonicSubarray(self, nums: List[int]) -> int:
        n = len(nums)
        res = 1

        for i in range(n - 1):
            curLen = 1
            for j in range(i + 1, n):
                if nums[j] == nums[j - 1] or ((nums[i] < nums[i + 1]) != (nums[j - 1] < nums[j])):
                    break
                curLen += 1

            res = max(res, curLen)

        return res
```

```java
public class Solution {
    public int longestMonotonicSubarray(int[] nums) {
        int n = nums.length;
        int res = 1;

        for (int i = 0; i < n - 1; i++) {
            int curLen = 1;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] == nums[j - 1] || ((nums[i] < nums[i + 1]) != (nums[j - 1] < nums[j]))) {
                    break;
                }
                curLen++;
            }
            res = Math.max(res, curLen);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestMonotonicSubarray(vector<int>& nums) {
        int n = nums.size();
        int res = 1;

        for (int i = 0; i < n - 1; i++) {
            int curLen = 1;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] == nums[j - 1] || ((nums[i] < nums[i + 1]) != (nums[j - 1] < nums[j]))) {
                    break;
                }
                curLen++;
            }
            res = max(res, curLen);
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
    longestMonotonicSubarray(nums) {
        let n = nums.length;
        let res = 1;

        for (let i = 0; i < n - 1; i++) {
            let curLen = 1;
            for (let j = i + 1; j < n; j++) {
                if (
                    nums[j] === nums[j - 1] ||
                    nums[i] < nums[i + 1] !== nums[j - 1] < nums[j]
                ) {
                    break;
                }
                curLen++;
            }
            res = Math.max(res, curLen);
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

## 2. Iteration - I

::tabs-start

```python
class Solution:
    def longestMonotonicSubarray(self, nums: List[int]) -> int:
        cur = 1
        res = 1
        increasing = 0

        for i in range(1, len(nums)):
            if nums[i - 1] < nums[i]:
                if increasing > 0:
                    cur += 1
                else:
                    cur = 2
                    increasing = 1
            elif nums[i - 1] > nums[i]:
                if increasing < 0:
                    cur += 1
                else:
                    cur = 2
                    increasing = -1
            else:
                cur = 1
                increasing = 0
            res = max(res, cur)

        return res
```

```java
public class Solution {
    public int longestMonotonicSubarray(int[] nums) {
        int cur = 1;
        int res = 1;
        int increasing = 0;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i - 1] < nums[i]) {
                if (increasing > 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = 1;
                }
            } else if (nums[i - 1] > nums[i]) {
                if (increasing < 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = -1;
                }
            } else {
                cur = 1;
                increasing = 0;
            }
            res = Math.max(res, cur);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestMonotonicSubarray(vector<int>& nums) {
        int cur = 1;
        int res = 1;
        int increasing = 0;

        for (int i = 1; i < nums.size(); i++) {
            if (nums[i - 1] < nums[i]) {
                if (increasing > 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = 1;
                }
            } else if (nums[i - 1] > nums[i]) {
                if (increasing < 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = -1;
                }
            } else {
                cur = 1;
                increasing = 0;
            }
            res = max(res, cur);
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
    longestMonotonicSubarray(nums) {
        let cur = 1;
        let res = 1;
        let increasing = 0;

        for (let i = 1; i < nums.length; i++) {
            if (nums[i - 1] < nums[i]) {
                if (increasing > 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = 1;
                }
            } else if (nums[i - 1] > nums[i]) {
                if (increasing < 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = -1;
                }
            } else {
                cur = 1;
                increasing = 0;
            }
            res = Math.max(res, cur);
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

## 3. Iteration - II

::tabs-start

```python
class Solution:
    def longestMonotonicSubarray(self, nums: List[int]) -> int:
        inc = dec = 1
        res = 1

        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                inc = dec = 1
            elif nums[i] > nums[i - 1]:
                inc, dec = inc + 1, 1
            else:
                inc, dec = 1, dec + 1

            res = max(res, inc, dec)

        return res
```

```java
public class Solution {
    public int longestMonotonicSubarray(int[] nums) {
        int inc = 1, dec = 1, res = 1;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1]) {
                inc = dec = 1;
            } else if (nums[i] > nums[i - 1]) {
                inc = inc + 1;
                dec = 1;
            } else {
                inc = 1;
                dec = dec + 1;
            }
            res = Math.max(res, Math.max(inc, dec));
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestMonotonicSubarray(vector<int>& nums) {
        int inc = 1, dec = 1, res = 1;

        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) {
                inc = dec = 1;
            } else if (nums[i] > nums[i - 1]) {
                inc = inc + 1;
                dec = 1;
            } else {
                inc = 1;
                dec = dec + 1;
            }
            res = max(res, max(inc, dec));
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
    longestMonotonicSubarray(nums) {
        let inc = 1,
            dec = 1,
            res = 1;

        for (let i = 1; i < nums.length; i++) {
            if (nums[i] === nums[i - 1]) {
                inc = dec = 1;
            } else if (nums[i] > nums[i - 1]) {
                inc = inc + 1;
                dec = 1;
            } else {
                inc = 1;
                dec = dec + 1;
            }
            res = Math.max(res, inc, dec);
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

## 4. Iteration - III

::tabs-start

```python
class Solution:
    def longestMonotonicSubarray(self, nums: List[int]) -> int:
        curLen = res = 1

        for i in range(1, len(nums)):
            if (nums[i] == nums[i - 1] or
                ((nums[i - curLen] < nums[i - curLen + 1]) != (nums[i - 1] < nums[i]))
            ):
                curLen = 1 if (nums[i] == nums[i - 1]) else 2
                continue

            curLen += 1
            res = max(res, curLen)

        return res
```

```java
public class Solution {
    public int longestMonotonicSubarray(int[] nums) {
        int curLen = 1, res = 1;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1] ||
                ((nums[i - curLen] < nums[i - curLen + 1]) != (nums[i - 1] < nums[i]))) {
                curLen = (nums[i] == nums[i - 1]) ? 1 : 2;
                continue;
            }

            curLen++;
            res = Math.max(res, curLen);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestMonotonicSubarray(vector<int>& nums) {
        int curLen = 1, res = 1;

        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1] ||
                ((nums[i - curLen] < nums[i - curLen + 1]) != (nums[i - 1] < nums[i]))) {
                curLen = (nums[i] == nums[i - 1]) ? 1 : 2;
                continue;
            }

            curLen++;
            res = max(res, curLen);
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
    longestMonotonicSubarray(nums) {
        let curLen = 1,
            res = 1;

        for (let i = 1; i < nums.length; i++) {
            if (
                nums[i] === nums[i - 1] ||
                nums[i - curLen] < nums[i - curLen + 1] !==
                    nums[i - 1] < nums[i]
            ) {
                curLen = nums[i] === nums[i - 1] ? 1 : 2;
                continue;
            }

            curLen++;
            res = Math.max(res, curLen);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
