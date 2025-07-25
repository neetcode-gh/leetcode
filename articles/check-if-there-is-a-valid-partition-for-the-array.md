## 1. Recursion

::tabs-start

```python
class Solution:
    def validPartition(self, nums: List[int]) -> bool:
        def dfs(i):
            if i == len(nums):
                return True

            res = False
            if i < len(nums) - 1 and nums[i] == nums[i + 1]:
                res = dfs(i + 2)
            if i < len(nums) - 2:
                if ((nums[i] == nums[i + 1] == nums[i + 2]) or
                    (nums[i] + 1 == nums[i + 1] and nums[i + 1] + 1 == nums[i + 2])
                ):
                    res = res or dfs(i + 3)
            return res

        return dfs(0)
```

```java
public class Solution {
    public boolean validPartition(int[] nums) {
        return dfs(nums, 0);
    }

    private boolean dfs(int[] nums, int i) {
        if (i == nums.length) return true;

        boolean res = false;
        if (i < nums.length - 1 && nums[i] == nums[i + 1]) {
            res = dfs(nums, i + 2);
        }
        if (i < nums.length - 2) {
            if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                res = res || dfs(nums, i + 3);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    bool validPartition(vector<int>& nums) {
        return dfs(nums, 0);
    }

private:
    bool dfs(vector<int>& nums, int i) {
        if (i == nums.size()) return true;

        bool res = false;
        if (i < nums.size() - 1 && nums[i] == nums[i + 1]) {
            res = dfs(nums, i + 2);
        }
        if (i < nums.size() - 2) {
            if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                res = res || dfs(nums, i + 3);
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
     * @return {boolean}
     */
    validPartition(nums) {
        const dfs = (i) => {
            if (i === nums.length) return true;

            let res = false;
            if (i < nums.length - 1 && nums[i] === nums[i + 1]) {
                res = dfs(i + 2);
            }
            if (i < nums.length - 2) {
                if (
                    (nums[i] === nums[i + 1] && nums[i + 1] === nums[i + 2]) ||
                    (nums[i] + 1 === nums[i + 1] &&
                        nums[i + 1] + 1 === nums[i + 2])
                ) {
                    res = res || dfs(i + 3);
                }
            }
            return res;
        };

        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def validPartition(self, nums: List[int]) -> bool:
        dp = { len(nums) : True }
        def dfs(i):
            if i in dp:
                return dp[i]

            res = False
            if i < len(nums) - 1 and nums[i] == nums[i + 1]:
                res = dfs(i + 2)
            if i < len(nums) - 2:
                if ((nums[i] == nums[i + 1] == nums[i + 2]) or
                    (nums[i] + 1 == nums[i + 1] and nums[i + 1] + 1 == nums[i + 2])
                ):
                    res = res or dfs(i + 3)

            dp[i] = res
            return res

        return dfs(0)
```

```java
public class Solution {
    private Map<Integer, Boolean> memo = new HashMap<>();

    public boolean validPartition(int[] nums) {
        return dfs(nums, 0);
    }

    private boolean dfs(int[] nums, int i) {
        if (i == nums.length) return true;
        if (memo.containsKey(i)) return memo.get(i);

        boolean res = false;
        if (i < nums.length - 1 && nums[i] == nums[i + 1]) {
            res = dfs(nums, i + 2);
        }
        if (i < nums.length - 2) {
            if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                res = res || dfs(nums, i + 3);
            }
        }

        memo.put(i, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    unordered_map<int, bool> memo;

    bool validPartition(vector<int>& nums) {
        return dfs(nums, 0);
    }

private:
    bool dfs(vector<int>& nums, int i) {
        if (i == nums.size()) return true;
        if (memo.count(i)) return memo[i];

        bool res = false;
        if (i < nums.size() - 1 && nums[i] == nums[i + 1]) {
            res = dfs(nums, i + 2);
        }
        if (i < nums.size() - 2) {
            if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                res = res || dfs(nums, i + 3);
            }
        }

        return memo[i] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    validPartition(nums) {
        const memo = new Map();

        const dfs = (i) => {
            if (i === nums.length) return true;
            if (memo.has(i)) return memo.get(i);

            let res = false;
            if (i < nums.length - 1 && nums[i] === nums[i + 1]) {
                res = dfs(i + 2);
            }
            if (i < nums.length - 2) {
                if (
                    (nums[i] === nums[i + 1] && nums[i + 1] === nums[i + 2]) ||
                    (nums[i] + 1 === nums[i + 1] &&
                        nums[i + 1] + 1 === nums[i + 2])
                ) {
                    res = res || dfs(i + 3);
                }
            }

            memo.set(i, res);
            return res;
        };

        return dfs(0);
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
    def validPartition(self, nums: List[int]) -> bool:
        dp = [False] * (len(nums) + 1)
        dp[0] = True

        for i in range(2, len(nums) + 1):
            if nums[i - 1] == nums[i - 2]:
                dp[i] = dp[i] or dp[i - 2]
            if i > 2 and ((nums[i - 1] == nums[i - 2] == nums[i - 3]) or
                          (nums[i - 3] + 1 == nums[i - 2] and nums[i - 2] + 1 == nums[i - 1])):
                dp[i] = dp[i] or dp[i - 3]

        return dp[len(nums)]
```

```java
public class Solution {
    public boolean validPartition(int[] nums) {
        boolean[] dp = new boolean[nums.length + 1];
        dp[0] = true;

        for (int i = 2; i <= nums.length; i++) {
            if (nums[i - 1] == nums[i - 2]) {
                dp[i] = dp[i] || dp[i - 2];
            }
            if (i > 2 && ((nums[i - 1] == nums[i - 2] && nums[i - 2] == nums[i - 3]) ||
                          (nums[i - 3] + 1 == nums[i - 2] && nums[i - 2] + 1 == nums[i - 1]))) {
                dp[i] = dp[i] || dp[i - 3];
            }
        }

        return dp[nums.length];
    }
}
```

```cpp
class Solution {
public:
    bool validPartition(vector<int>& nums) {
        vector<bool> dp(nums.size() + 1, false);
        dp[0] = true;

        for (int i = 2; i <= nums.size(); i++) {
            if (nums[i - 1] == nums[i - 2]) {
                dp[i] = dp[i] || dp[i - 2];
            }
            if (i > 2 && ((nums[i - 1] == nums[i - 2] && nums[i - 2] == nums[i - 3]) ||
                          (nums[i - 3] + 1 == nums[i - 2] && nums[i - 2] + 1 == nums[i - 1]))) {
                dp[i] = dp[i] || dp[i - 3];
            }
        }

        return dp[nums.size()];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    validPartition(nums) {
        const dp = Array(nums.length + 1).fill(false);
        dp[0] = true;

        for (let i = 2; i <= nums.length; i++) {
            if (nums[i - 1] === nums[i - 2]) {
                dp[i] = dp[i] || dp[i - 2];
            }
            if (
                i > 2 &&
                ((nums[i - 1] === nums[i - 2] && nums[i - 2] === nums[i - 3]) ||
                    (nums[i - 3] + 1 === nums[i - 2] &&
                        nums[i - 2] + 1 === nums[i - 1]))
            ) {
                dp[i] = dp[i] || dp[i - 3];
            }
        }

        return dp[nums.length];
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
    def validPartition(self, nums: List[int]) -> bool:
        dp = [False, True, True]

        for i in range(len(nums) - 2, -1, -1):
            dp1 = dp[0]
            if nums[i] == nums[i + 1] and dp[1]:
                dp[0] = True
            elif i < len(nums) - 2 and dp[2] and (
                (nums[i] == nums[i + 1] == nums[i + 2]) or
                (nums[i] + 1 == nums[i + 1] and nums[i + 1] == nums[i + 2] - 1)
            ):
                dp[0] = True
            else:
                dp[0] = False
            dp[2] = dp[1]
            dp[1] = dp1

        return dp[0]
```

```java
public class Solution {
    public boolean validPartition(int[] nums) {
        boolean[] dp = new boolean[3];
        dp[2] = true;
        dp[1] = true;
        dp[0] = false;

        for (int i = nums.length - 2; i >= 0; i--) {
            boolean dp1 = dp[0];
            if (nums[i] == nums[i + 1] && dp[1]) {
                dp[0] = true;
            } else if (i < nums.length - 2 && dp[2] &&
                      ((nums[i] == nums[i + 1] && nums[i] == nums[i + 2]) ||
                      (nums[i] + 1 == nums[i + 1] && nums[i + 1] == nums[i + 2] - 1))) {
                dp[0] = true;
            } else {
                dp[0] = false;
            }
            dp[2] = dp[1];
            dp[1] = dp1;
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    bool validPartition(vector<int>& nums) {
        bool dp[3] = {false, true, true};

        for (int i = nums.size() - 2; i >= 0; --i) {
            bool dp1 = dp[0];
            if (nums[i] == nums[i + 1] && dp[1]) {
                dp[0] = true;
            } else if (i < nums.size() - 2 && dp[2] &&
                      ((nums[i] == nums[i + 1] && nums[i] == nums[i + 2]) ||
                      (nums[i] + 1 == nums[i + 1] && nums[i + 1] == nums[i + 2] - 1))) {
                dp[0] = true;
            } else {
                dp[0] = false;
            }
            dp[2] = dp[1];
            dp[1] = dp1;
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    validPartition(nums) {
        let dp = [false, true, true];

        for (let i = nums.length - 2; i >= 0; i--) {
            let dp1 = dp[0];
            if (nums[i] === nums[i + 1] && dp[1]) {
                dp[0] = true;
            } else if (
                i < nums.length - 2 &&
                dp[2] &&
                ((nums[i] === nums[i + 1] && nums[i] === nums[i + 2]) ||
                    (nums[i] + 1 === nums[i + 1] &&
                        nums[i + 1] === nums[i + 2] - 1))
            ) {
                dp[0] = true;
            } else {
                dp[0] = false;
            }
            dp[2] = dp[1];
            dp[1] = dp1;
        }

        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
