## 1. Recursion

::tabs-start

```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        nums.sort()

        def dfs(i):
            if i >= len(nums):
                return 0

            cur = nums[i]
            pick = 0
            while i < len(nums) and nums[i] == cur:
                pick += nums[i]
                i += 1

            res = dfs(i)
            while i < len(nums) and nums[i] == 1 + cur:
                i += 1

            res = max(res, pick + dfs(i))
            return res

        return dfs(0)
```

```java
public class Solution {
    public int deleteAndEarn(int[] nums) {
        Arrays.sort(nums);
        return dfs(nums, 0);
    }

    private int dfs(int[] nums, int i) {
        if (i >= nums.length) return 0;

        int cur = nums[i], pick = 0;
        while (i < nums.length && nums[i] == cur) {
            pick += nums[i];
            i++;
        }

        int res = dfs(nums, i);
        while (i < nums.length && nums[i] == cur + 1) {
            i++;
        }

        res = Math.max(res, pick + dfs(nums, i));
        return res;
    }
}
```

```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        return dfs(nums, 0);
    }

private:
    int dfs(const vector<int>& nums, int i) {
        if (i >= nums.size()) return 0;

        int cur = nums[i], pick = 0;
        while (i < nums.size() && nums[i] == cur) {
            pick += nums[i];
            i++;
        }

        int res = dfs(nums, i);
        while (i < nums.size() && nums[i] == cur + 1) {
            i++;
        }

        res = max(res, pick + dfs(nums, i));
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
    deleteAndEarn(nums) {
        nums.sort((a, b) => a - b);

        const dfs = (i) => {
            if (i >= nums.length) return 0;

            let cur = nums[i],
                pick = 0;
            while (i < nums.length && nums[i] === cur) {
                pick += nums[i];
                i++;
            }

            let res = dfs(i);
            while (i < nums.length && nums[i] === cur + 1) {
                i++;
            }

            res = Math.max(res, pick + dfs(i));
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
    def deleteAndEarn(self, nums: List[int]) -> int:
        val = defaultdict(int)
        for num in nums:
            val[num] += num
        nums = sorted(list(set(nums)))
        memo = [-1] * len(nums)

        def dfs(i):
            if i >= len(nums):
                return 0
            if memo[i] != -1:
                return memo[i]

            res = val[nums[i]]
            if i + 1 < len(nums) and nums[i] + 1 == nums[i + 1]:
                res += dfs(i + 2)
            else:
                res += dfs(i + 1)

            res = max(res, dfs(i + 1))
            memo[i] = res
            return res

        return dfs(0)
```

```java
public class Solution {
    private Map<Integer, Integer> val;
    private int[] memo;

    public int deleteAndEarn(int[] nums) {
        val = new HashMap<>();
        for (int num : nums) {
            val.put(num, val.getOrDefault(num, 0) + num);
        }

        List<Integer> uniqueNums = new ArrayList<>(val.keySet());
        Collections.sort(uniqueNums);
        memo = new int[uniqueNums.size()];
        Arrays.fill(memo, -1);

        return dfs(uniqueNums, 0);
    }

    private int dfs(List<Integer> nums, int i) {
        if (i >= nums.size()) return 0;
        if (memo[i] != -1) return memo[i];

        int res = val.get(nums.get(i));
        if (i + 1 < nums.size() && nums.get(i) + 1 == nums.get(i + 1)) {
            res += dfs(nums, i + 2);
        } else {
            res += dfs(nums, i + 1);
        }

        res = Math.max(res, dfs(nums, i + 1));
        memo[i] = res;
        return res;
    }
}
```

```cpp
class Solution {
    unordered_map<int, int> val;
    vector<int> memo;

public:
    int deleteAndEarn(vector<int>& nums) {
        for (int num : nums) {
            val[num] += num;
        }

        vector<int> uniqueNums;
        for (auto& pair : val) {
            uniqueNums.push_back(pair.first);
        }
        sort(uniqueNums.begin(), uniqueNums.end());
        memo.resize(uniqueNums.size(), -1);

        return dfs(uniqueNums, 0);
    }

private:
    int dfs(vector<int>& nums, int i) {
        if (i >= nums.size()) return 0;
        if (memo[i] != -1) return memo[i];

        int res = val[nums[i]];
        if (i + 1 < nums.size() && nums[i] + 1 == nums[i + 1]) {
            res += dfs(nums, i + 2);
        } else {
            res += dfs(nums, i + 1);
        }

        res = max(res, dfs(nums, i + 1));
        memo[i] = res;
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
    deleteAndEarn(nums) {
        const val = new Map();
        nums.forEach((num) => {
            val.set(num, (val.get(num) || 0) + num);
        });
        const uniqueNums = Array.from(new Set(nums)).sort((a, b) => a - b);
        const memo = Array(uniqueNums.length).fill(-1);

        const dfs = (nums, i) => {
            if (i >= nums.length) return 0;
            if (memo[i] !== -1) return memo[i];

            let res = val.get(nums[i]);
            if (i + 1 < nums.length && nums[i] + 1 === nums[i + 1]) {
                res += dfs(nums, i + 2);
            } else {
                res += dfs(nums, i + 1);
            }

            res = Math.max(res, dfs(nums, i + 1));
            memo[i] = res;
            return res;
        };

        return dfs(uniqueNums, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up) - I

::tabs-start

```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        val = defaultdict(int)
        for num in nums:
            val[num] += num
        nums = sorted(list(set(nums)))

        dp = [0] * (len(nums) + 1)
        for i in range(len(nums) - 1, -1, -1):
            take = val[nums[i]]
            if i + 1 < len(nums) and nums[i + 1] == nums[i] + 1:
                take += dp[i + 2]
            else:
                take += dp[i + 1]
            dp[i] = max(dp[i + 1], take)

        return dp[0]
```

```java
public class Solution {
    public int deleteAndEarn(int[] nums) {
        Map<Integer, Integer> val = new HashMap<>();
        for (int num : nums) val.put(num, val.getOrDefault(num, 0) + num);
        List<Integer> sortedNums = new ArrayList<>(val.keySet());
        Collections.sort(sortedNums);

        int[] dp = new int[sortedNums.size() + 1];
        for (int i = sortedNums.size() - 1; i >= 0; i--) {
            int take = val.get(sortedNums.get(i));
            if (i + 1 < sortedNums.size() && sortedNums.get(i + 1) == sortedNums.get(i) + 1) {
                take += dp[i + 2];
            } else {
                take += dp[i + 1];
            }
            dp[i] = Math.max(dp[i + 1], take);
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        unordered_map<int, int> val;
        for (int num : nums) val[num] += num;
        vector<int> sortedNums;
        for (auto& [key, _] : val) sortedNums.push_back(key);
        sort(sortedNums.begin(), sortedNums.end());

        vector<int> dp(sortedNums.size() + 1);
        for (int i = sortedNums.size() - 1; i >= 0; i--) {
            int take = val[sortedNums[i]];
            if (i + 1 < sortedNums.size() && sortedNums[i + 1] == sortedNums[i] + 1) {
                take += dp[i + 2];
            } else {
                take += dp[i + 1];
            }
            dp[i] = max(dp[i + 1], take);
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    deleteAndEarn(nums) {
        const val = new Map();
        nums.forEach((num) => val.set(num, (val.get(num) || 0) + num));
        const sortedNums = Array.from(val.keys()).sort((a, b) => a - b);

        const dp = Array(sortedNums.length + 1).fill(0);
        for (let i = sortedNums.length - 1; i >= 0; i--) {
            let take = val.get(sortedNums[i]);
            if (
                i + 1 < sortedNums.length &&
                sortedNums[i + 1] === sortedNums[i] + 1
            ) {
                take += dp[i + 2];
            } else {
                take += dp[i + 1];
            }
            dp[i] = Math.max(dp[i + 1], take);
        }

        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Bottom-Up) - II

::tabs-start

```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        m = max(nums)
        dp = [0] * (m + 2)

        for num in nums:
            dp[num] += num
        for i in range(m - 1, 0, -1):
            dp[i] = max(dp[i + 1], dp[i + 2] + dp[i])

        return dp[1]
```

```java
public class Solution {
    public int deleteAndEarn(int[] nums) {
        int m = 0;
        for (int num : nums) m = Math.max(m, num);

        int[] dp = new int[m + 2];
        for (int num : nums) dp[num] += num;
        for (int i = m - 1; i > 0; i--) {
            dp[i] = Math.max(dp[i + 1], dp[i + 2] + dp[i]);
        }
        return dp[1];
    }
}
```

```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int m = *max_element(nums.begin(), nums.end());
        vector<int> dp(m + 2);
        for (auto& num : nums) {
            dp[num] += num;
        }

        for (int i = m - 1; i > 0; i--) {
            dp[i] = max(dp[i + 1], dp[i + 2] + dp[i]);
        }
        return dp[1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    deleteAndEarn(nums) {
        const m = Math.max(...nums);
        const dp = new Int32Array(m + 2);
        for (let num of nums) {
            dp[num] += num;
        }

        for (let i = m - 1; i > 0; i--) {
            dp[i] = Math.max(dp[i + 1], dp[i + 2] + dp[i]);
        }
        return dp[1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(m)$

> Where $m$ is the maximum element in the array and $n$ is the size of the array.

---

## 5. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        count = Counter(nums)
        nums = sorted(list(set(nums)))

        earn1, earn2 = 0, 0
        for i in range(len(nums)):
            curEarn = nums[i] * count[nums[i]]
            if i > 0 and nums[i] == nums[i - 1] + 1:
                temp = earn2
                earn2 = max(curEarn + earn1, earn2)
                earn1 = temp
            else:
                temp = earn2
                earn2 = curEarn + earn2
                earn1 = temp
        return earn2
```

```java
public class Solution {
    public int deleteAndEarn(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) count.put(num, count.getOrDefault(num, 0) + num);
        List<Integer> uniqueNums = new ArrayList<>(count.keySet());
        Collections.sort(uniqueNums);

        int earn1 = 0, earn2 = 0;
        for (int i = 0; i < uniqueNums.size(); i++) {
            int curEarn = count.get(uniqueNums.get(i));
            if (i > 0 && uniqueNums.get(i) == uniqueNums.get(i - 1) + 1) {
                int temp = earn2;
                earn2 = Math.max(curEarn + earn1, earn2);
                earn1 = temp;
            } else {
                int temp = earn2;
                earn2 = curEarn + earn2;
                earn1 = temp;
            }
        }
        return earn2;
    }
}
```

```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) count[num] += num;
        vector<int> uniqueNums;
        for (auto& pair : count) uniqueNums.push_back(pair.first);
        sort(uniqueNums.begin(), uniqueNums.end());

        int earn1 = 0, earn2 = 0;
        for (int i = 0; i < uniqueNums.size(); i++) {
            int curEarn = count[uniqueNums[i]];
            if (i > 0 && uniqueNums[i] == uniqueNums[i - 1] + 1) {
                int temp = earn2;
                earn2 = max(curEarn + earn1, earn2);
                earn1 = temp;
            } else {
                int temp = earn2;
                earn2 = curEarn + earn2;
                earn1 = temp;
            }
        }
        return earn2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    deleteAndEarn(nums) {
        const count = new Map();
        nums.forEach((num) => count.set(num, (count.get(num) || 0) + num));
        const uniqueNums = [...count.keys()].sort((a, b) => a - b);

        let earn1 = 0,
            earn2 = 0;
        for (let i = 0; i < uniqueNums.length; i++) {
            const curEarn = count.get(uniqueNums[i]);
            if (i > 0 && uniqueNums[i] === uniqueNums[i - 1] + 1) {
                const temp = earn2;
                earn2 = Math.max(curEarn + earn1, earn2);
                earn1 = temp;
            } else {
                const temp = earn2;
                earn2 = curEarn + earn2;
                earn1 = temp;
            }
        }
        return earn2;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
