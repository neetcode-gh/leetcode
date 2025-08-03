## 1. Recursion

::tabs-start

```python
class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        def dfs(i, even):
            if i == len(nums):
                return 0
            total = nums[i] if even else -nums[i]
            return max(total + dfs(i + 1, not even), dfs(i + 1, even))

        return dfs(0, True)
```

```java
public class Solution {
    public long maxAlternatingSum(int[] nums) {
        return dfs(nums, 0, true);
    }

    private long dfs(int[] nums, int i, boolean even) {
        if (i == nums.length) {
            return 0;
        }
        long total = even ? nums[i] : -nums[i];
        return Math.max(total + dfs(nums, i + 1, !even), dfs(nums, i + 1, even));
    }
}
```

```cpp
class Solution {
public:
    long long maxAlternatingSum(vector<int>& nums) {
        return dfs(nums, 0, true);
    }

private:
    long long dfs(vector<int>& nums, int i, bool even) {
        if (i == nums.size()) {
            return 0;
        }
        long long total = even ? nums[i] : -nums[i];
        return max(total + dfs(nums, i + 1, !even), dfs(nums, i + 1, even));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxAlternatingSum(nums) {
        const dfs = (i, even) => {
            if (i === nums.length) {
                return 0;
            }

            const total = even ? nums[i] : -nums[i];
            return Math.max(total + dfs(i + 1, !even), dfs(i + 1, even));
        };

        return dfs(0, true);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        dp = {}

        def dfs(i, even):
            if i == len(nums):
                return 0
            if (i, even) in dp:
                return dp[(i, even)]

            total = nums[i] if even else -nums[i]
            dp[(i, even)] = max(total + dfs(i + 1, not even), dfs(i + 1, even))
            return dp[(i, even)]

        return dfs(0, True)
```

```java
public class Solution {
    private long dp[][];

    public long maxAlternatingSum(int[] nums) {
        int n = nums.length;
        dp = new long[n][2];
        for (int i = 0; i < n; i++) {
            dp[i][0] = -1;
            dp[i][1] = -1;
        }
        return dfs(nums, 0, 1);
    }

    private long dfs(int[] nums, int i, int even) {
        if (i == nums.length) {
            return 0;
        }
        if (dp[i][even] != -1) {
            return dp[i][even];
        }

        long total = even == 1 ? nums[i] : -nums[i];
        dp[i][even] = Math.max(total + dfs(nums, i + 1, 1 - even), dfs(nums, i + 1, even));
        return dp[i][even];
    }
}
```

```cpp
class Solution {
    vector<vector<long long>> dp;

public:
    long long maxAlternatingSum(vector<int>& nums) {
        dp.assign(nums.size(), vector<long long>(2, -1));
        return dfs(nums, 0, true);
    }

private:
    long long dfs(vector<int>& nums, int i, bool even) {
        if (i == nums.size()) {
            return 0;
        }
        if (dp[i][even] != -1) {
            return dp[i][even];
        }
        long long total = even ? nums[i] : -nums[i];
        dp[i][even] = max(total + dfs(nums, i + 1, !even), dfs(nums, i + 1, even));
        return dp[i][even];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxAlternatingSum(nums) {
        const n = nums.length;
        const dp = Array.from({ length: n }, () => Array(2).fill(-1));

        const dfs = (i, even) => {
            if (i === n) {
                return 0;
            }
            if (dp[i][even] !== -1) {
                return dp[i][even];
            }

            const total = even === 1 ? nums[i] : -nums[i];
            dp[i][even] = Math.max(
                total + dfs(i + 1, 1 - even),
                dfs(i + 1, even),
            );
            return dp[i][even];
        };

        return dfs(0, 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [[0] * 2 for _ in range(n + 1)]  # dp[i][0] -> odd, dp[i][1] -> even

        for i in range(n - 1, -1, -1):
            dp[i][1] = max(nums[i] + dp[i + 1][0], dp[i + 1][1])  # even
            dp[i][0] = max(-nums[i] + dp[i + 1][1], dp[i + 1][0])  # odd

        return dp[0][1]
```

```java
public class Solution {
    public long maxAlternatingSum(int[] nums) {
        int n = nums.length;
        long[][] dp = new long[n + 1][2]; // dp[i][0] -> odd, dp[i][1] -> even

        for (int i = n - 1; i >= 0; i--) {
            dp[i][1] = Math.max(nums[i] + dp[i + 1][0], dp[i + 1][1]); // even
            dp[i][0] = Math.max(-nums[i] + dp[i + 1][1], dp[i + 1][0]); // odd
        }

        return dp[0][1];
    }
}
```

```cpp
class Solution {
public:
    long long maxAlternatingSum(vector<int>& nums) {
        int n = nums.size();
        vector<vector<long long>> dp(n + 1, vector<long long>(2, 0)); // dp[i][0] -> odd, dp[i][1] -> even

        for (int i = n - 1; i >= 0; i--) {
            dp[i][1] = max(nums[i] + dp[i + 1][0], dp[i + 1][1]); // even
            dp[i][0] = max(-nums[i] + dp[i + 1][1], dp[i + 1][0]); // odd
        }

        return dp[0][1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxAlternatingSum(nums) {
        const n = nums.length;
        const dp = Array.from({ length: n + 1 }, () => [0, 0]); // dp[i][0] -> odd, dp[i][1] -> even

        for (let i = n - 1; i >= 0; i--) {
            dp[i][1] = Math.max(nums[i] + dp[i + 1][0], dp[i + 1][1]); // even
            dp[i][0] = Math.max(-nums[i] + dp[i + 1][1], dp[i + 1][0]); // odd
        }

        return dp[0][1]; // Result starts with even index
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        sumEven = sumOdd = 0

        for i in range(len(nums) - 1, -1, -1):
            tmpEven = max(sumOdd + nums[i], sumEven)
            tmpOdd = max(sumEven - nums[i], sumOdd)
            sumEven, sumOdd = tmpEven, tmpOdd

        return sumEven
```

```java
public class Solution {
    public long maxAlternatingSum(int[] nums) {
        long sumEven = 0, sumOdd = 0;

        for (int i = nums.length - 1; i >= 0; i--) {
            long tmpEven = Math.max(nums[i] + sumOdd, sumEven);
            long tmpOdd = Math.max(-nums[i] + sumEven, sumOdd);
            sumEven = tmpEven;
            sumOdd = tmpOdd;
        }

        return sumEven;
    }
}
```

```cpp
class Solution {
public:
    long long maxAlternatingSum(vector<int>& nums) {
        long long sumEven = 0, sumOdd = 0;

        for (int i = nums.size() - 1; i >= 0; i--) {
            long long tmpEven = max(nums[i] + sumOdd, sumEven);
            long long tmpOdd = max(-nums[i] + sumEven, sumOdd);
            sumEven = tmpEven;
            sumOdd = tmpOdd;
        }

        return sumEven;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxAlternatingSum(nums) {
        let sumEven = 0,
            sumOdd = 0;

        for (let i = nums.length - 1; i >= 0; i--) {
            let tmpEven = Math.max(nums[i] + sumOdd, sumEven);
            let tmpOdd = Math.max(-nums[i] + sumEven, sumOdd);
            sumEven = tmpEven;
            sumOdd = tmpOdd;
        }

        return sumEven;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
