## 1. Recursion

::tabs-start

```python
class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        nums.sort()

        def dfs(total):
            if total == 0:
                return 1

            res = 0
            for i in range(len(nums)):
                if total < nums[i]:
                    break
                res += dfs(total - nums[i])
            return res

        return dfs(target)
```

```java
public class Solution {
    public int combinationSum4(int[] nums, int target) {
        Arrays.sort(nums);

        return dfs(nums, target);
    }

    private int dfs(int[] nums, int total) {
        if (total == 0) {
            return 1;
        }

        int res = 0;
        for (int num : nums) {
            if (total < num) {
                break;
            }
            res += dfs(nums, total - num);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        return dfs(nums, target);
    }

    int dfs(vector<int>& nums, int total) {
        if (total == 0) {
            return 1;
        }

        int res = 0;
        for (int num : nums) {
            if (total < num) {
                break;
            }
            res += dfs(nums, total - num);
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
    combinationSum4(nums, target) {
        nums.sort((a, b) => a - b);

        const dfs = (total) => {
            if (total === 0) return 1;

            let res = 0;
            for (let num of nums) {
                if (total < num) break;
                res += dfs(total - num);
            }
            return res;
        };

        return dfs(target);
    }
}
```

```csharp
public class Solution {
    public int CombinationSum4(int[] nums, int target) {
        Array.Sort(nums);
        return Dfs(nums, target);
    }

    private int Dfs(int[] nums, int total) {
        if (total == 0) {
            return 1;
        }

        int res = 0;
        foreach (int num in nums) {
            if (total < num) {
                break;
            }
            res += Dfs(nums, total - num);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ t)$
- Space complexity: $O(t)$

> Where $n$ is the size of the array $nums$ and $t$ is the given target.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        nums.sort()
        memo = { 0 : 1 }

        def dfs(total):
            if total in memo:
                return memo[total]

            res = 0
            for num in nums:
                if total < num:
                    break
                res += dfs(total - num)
            memo[total] = res
            return res

        return dfs(target)
```

```java
public class Solution {
    private Map<Integer, Integer> memo;

    public int combinationSum4(int[] nums, int target) {
        Arrays.sort(nums);
        memo = new HashMap<>();
        memo.put(0, 1);
        return dfs(nums, target);
    }

    private int dfs(int[] nums, int total) {
        if (memo.containsKey(total)) {
            return memo.get(total);
        }

        int res = 0;
        for (int num : nums) {
            if (total < num) {
                break;
            }
            res += dfs(nums, total - num);
        }
        memo.put(total, res);
        return res;
    }
}
```

```cpp
class Solution {
private:
    unordered_map<int, int> memo;

public:
    int combinationSum4(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        memo[0] = 1;
        return dfs(nums, target);
    }

    int dfs(vector<int>& nums, int total) {
        if (memo.count(total)) {
            return memo[total];
        }

        int res = 0;
        for (int num : nums) {
            if (total < num) {
                break;
            }
            res += dfs(nums, total - num);
        }
        memo[total] = res;
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
    combinationSum4(nums, target) {
        nums.sort((a, b) => a - b);
        const memo = { 0: 1 };

        const dfs = (total) => {
            if (memo[total] !== undefined) {
                return memo[total];
            }

            let res = 0;
            for (let num of nums) {
                if (total < num) break;
                res += dfs(total - num);
            }
            memo[total] = res;
            return res;
        };

        return dfs(target);
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, int> memo;

    public int CombinationSum4(int[] nums, int target) {
        Array.Sort(nums);
        memo = new Dictionary<int, int>();
        memo[0] = 1;
        return Dfs(nums, target);
    }

    private int Dfs(int[] nums, int total) {
        if (memo.ContainsKey(total)) {
            return memo[total];
        }

        int res = 0;
        foreach (int num in nums) {
            if (total < num) {
                break;
            }
            res += Dfs(nums, total - num);
        }

        memo[total] = res;
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * t)$
- Space complexity: $O(t)$

> Where $n$ is the size of the array $nums$ and $t$ is the given target.

---

## 3. Dynamic Programming (Bottom-Up) - I

::tabs-start

```python
class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        dp = { 0 : 1 }

        for total in range(1, target + 1):
            dp[total] = 0
            for num in nums:
                dp[total] += dp.get(total - num, 0)

        return dp[target]
```

```java
public class Solution {
    public int combinationSum4(int[] nums, int target) {
        Map<Integer, Integer> dp = new HashMap<>();
        dp.put(0, 1);

        for (int total = 1; total <= target; total++) {
            dp.put(total, 0);
            for (int num : nums) {
                dp.put(total, dp.get(total) + dp.getOrDefault(total - num, 0));
            }
        }
        return dp.get(target);
    }
}
```

```cpp
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        unordered_map<int, long long> dp;
        dp[0] = 1;

        for (int total = 1; total <= target; total++) {
            dp[total] = 0;
            for (int num : nums) {
                if (total >= num) {
                    dp[total] += dp[total - num];
                }
            }
            if (dp[total] > INT_MAX) {
                dp[total] = 0;
            }
        }
        return dp[target];
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
    combinationSum4(nums, target) {
        let dp = { 0: 1 };
        for (let total = 1; total <= target; total++) {
            dp[total] = 0;
            for (let num of nums) {
                dp[total] += dp[total - num] || 0;
            }
        }
        return dp[target];
    }
}
```

```csharp
public class Solution {
    public int CombinationSum4(int[] nums, int target) {
        Dictionary<int, int> dp = new Dictionary<int, int>();
        dp[0] = 1;

        for (int total = 1; total <= target; total++) {
            dp[total] = 0;
            foreach (int num in nums) {
                if (dp.ContainsKey(total - num)) {
                    dp[total] += dp[total - num];
                }
            }
        }

        return dp[target];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * t)$
- Space complexity: $O(t)$

> Where $n$ is the size of the array $nums$ and $t$ is the given target.

---

## 4. Dynamic Programming (Bottom-Up) - II

::tabs-start

```python
class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        nums.sort()
        dp = defaultdict(int)
        dp[target] = 1
        for total in range(target, 0, -1):
            for num in nums:
                if total < num:
                    break
                dp[total - num] += dp[total]
        return dp[0]
```

```java
public class Solution {
    public int combinationSum4(int[] nums, int target) {
        Arrays.sort(nums);
        Map<Integer, Integer> dp = new HashMap<>();
        dp.put(target, 1);
        for (int total = target; total > 0; total--) {
            for (int num : nums) {
                if (total < num) break;
                dp.put(total - num, dp.getOrDefault(total, 0) + dp.getOrDefault(total - num, 0));
            }
        }
        return dp.getOrDefault(0, 0);
    }
}
```

```cpp
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        unordered_map<int, int> dp;
        dp[target] = 1;

        for (int total = target; total > 0; total--) {
            if (dp[total] == -1) continue;
            for (auto& num : nums) {
                if (total < num) break;
                if (dp[total - num] + 0LL + dp[total] > INT_MAX) {
                    dp[total - num] = -1;
                    break;
                }
                dp[total - num] += dp[total];
            }
        }
        return dp[0];
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
    combinationSum4(nums, target) {
        nums.sort((a, b) => a - b);
        const dp = new Map();
        dp.set(target, 1);

        for (let total = target; total > 0; total--) {
            for (const num of nums) {
                if (total < num) break;
                dp.set(
                    total - num,
                    (dp.get(total - num) || 0) + (dp.get(total) || 0),
                );
            }
        }
        return dp.get(0) || 0;
    }
}
```

```csharp
public class Solution {
    public int CombinationSum4(int[] nums, int target) {
        Array.Sort(nums);
        Dictionary<int, int> dp = new Dictionary<int, int>();
        dp[target] = 1;

        for (int total = target; total > 0; total--) {
            if (!dp.ContainsKey(total)) continue;
            foreach (int num in nums) {
                if (total < num) break;
                int key = total - num;
                if (!dp.ContainsKey(key)) {
                    dp[key] = 0;
                }
                dp[key] += dp[total];
            }
        }

        return dp.ContainsKey(0) ? dp[0] : 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * t)$
- Space complexity: $O(t)$

> Where $n$ is the size of the array $nums$ and $t$ is the given target.
