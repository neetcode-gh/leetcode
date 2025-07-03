## 1. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        cache = {}  # (i, prevIndex) -> List

        def dfs(i, prevIndex):
            if i == len(nums):
                return []
            if (i, prevIndex) in cache:
                return cache[(i, prevIndex)]

            res = dfs(i + 1, prevIndex)  # Skip nums[i]
            if prevIndex == -1 or nums[i] % nums[prevIndex] == 0:
                tmp = [nums[i]] + dfs(i + 1, i)  # Include nums[i]
                res = tmp if len(tmp) > len(res) else res

            cache[(i, prevIndex)] = res
            return res

        return dfs(0, -1)
```

```java
public class Solution {
    private List<Integer>[][] cache;

    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        cache = new ArrayList[n][n + 1];
        return dfs(0, -1, nums);
    }

    private List<Integer> dfs(int i, int prevIndex, int[] nums) {
        if (i == nums.length) return new ArrayList<>();
        if (cache[i][prevIndex + 1] != null) return cache[i][prevIndex + 1];

        List<Integer> res = dfs(i + 1, prevIndex, nums);

        if (prevIndex == -1 || nums[i] % nums[prevIndex] == 0) {
            List<Integer> tmp = new ArrayList<>();
            tmp.add(nums[i]);
            tmp.addAll(dfs(i + 1, i, nums));
            if (tmp.size() > res.size()) res = tmp;
        }

        cache[i][prevIndex + 1] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<vector<int>>> cache;

public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        cache = vector<vector<vector<int>>>(n, vector<vector<int>>(n + 1));
        return dfs(0, -1, nums);
    }

    vector<int> dfs(int i, int prevIndex, vector<int>& nums) {
        if (i == nums.size()) return {};
        if (!cache[i][prevIndex + 1].empty()) return cache[i][prevIndex + 1];

        vector<int> res = dfs(i + 1, prevIndex, nums);

        if (prevIndex == -1 || nums[i] % nums[prevIndex] == 0) {
            vector<int> tmp = {nums[i]};
            vector<int> next = dfs(i + 1, i, nums);
            tmp.insert(tmp.end(), next.begin(), next.end());
            if (tmp.size() > res.size()) res = tmp;
        }

        return cache[i][prevIndex + 1] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    largestDivisibleSubset(nums) {
        nums.sort((a, b) => a - b);
        const cache = new Map();

        const dfs = (i, prevIndex) => {
            if (i === nums.length) return [];

            let key = `${i},${prevIndex}`;
            if (cache.has(key)) return cache.get(key);

            let res = dfs(i + 1, prevIndex);
            if (prevIndex === -1 || nums[i] % nums[prevIndex] === 0) {
                let tmp = [nums[i], ...dfs(i + 1, i)];
                if (tmp.length > res.length) res = tmp;
            }

            cache.set(key, res);
            return res;
        };

        return dfs(0, -1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Dynamic Programming (Top-Down) Space Optimized

::tabs-start

```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        cache = {}

        def dfs(i):
            if i in cache:
                return cache[i]

            res = [nums[i]]
            for j in range(i + 1, len(nums)):
                if nums[j] % nums[i] == 0:
                    tmp = [nums[i]] + dfs(j)
                    if len(tmp) > len(res):
                        res = tmp

            cache[i] = res
            return res

        res = []
        for i in range(len(nums)):
            tmp = dfs(i)
            if len(tmp) > len(res):
                res = tmp
        return res
```

```java
public class Solution {
    private List<Integer>[] cache;

    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        cache = new ArrayList[n];

        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            List<Integer> tmp = dfs(i, nums);
            if (tmp.size() > res.size()) {
                res = tmp;
            }
        }
        return res;
    }

    private List<Integer> dfs(int i, int[] nums) {
        if (cache[i] != null) return cache[i];

        List<Integer> res = new ArrayList<>();
        res.add(nums[i]);
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] % nums[i] == 0) {
                List<Integer> tmp = new ArrayList<>();
                tmp.add(nums[i]);
                tmp.addAll(dfs(j, nums));

                if (tmp.size() > res.size()) {
                    res = tmp;
                }
            }
        }
        return cache[i] = res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> cache;

public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        cache.resize(n, vector<int>());

        vector<int> res;
        for (int i = 0; i < n; i++) {
            vector<int> tmp = dfs(i, nums);
            if (tmp.size() > res.size()) {
                res = tmp;
            }
        }
        return res;
    }

    vector<int> dfs(int i, vector<int>& nums) {
        if (!cache[i].empty()) return cache[i];

        vector<int> res = {nums[i]};
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[j] % nums[i] == 0) {
                vector<int> tmp = {nums[i]};
                vector<int> next = dfs(j, nums);
                tmp.insert(tmp.end(), next.begin(), next.end());

                if (tmp.size() > res.size()) {
                    res = tmp;
                }
            }
        }
        return cache[i] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    largestDivisibleSubset(nums) {
        nums.sort((a, b) => a - b);
        const n = nums.length;
        const cache = new Array(n).fill(null);

        const dfs = (i) => {
            if (cache[i] !== null) return cache[i];

            let res = [nums[i]];
            for (let j = i + 1; j < n; j++) {
                if (nums[j] % nums[i] === 0) {
                    let tmp = [nums[i], ...dfs(j)];
                    if (tmp.length > res.length) {
                        res = tmp;
                    }
                }
            }
            return (cache[i] = res);
        };

        let res = [];
        for (let i = 0; i < n; i++) {
            let tmp = dfs(i);
            if (tmp.length > res.length) {
                res = tmp;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        dp = [[num] for num in nums]  # dp[i] = longest start at i
        res = []
        for i in range(len(nums) - 1, -1, -1):
            for j in range(i + 1, len(nums)):
                if nums[j] % nums[i] == 0:
                    tmp = [nums[i]] + dp[j]
                    dp[i] = tmp if len(tmp) > len(dp[i]) else dp[i]
            res = dp[i] if len(dp[i]) > len(res) else res
        return res
```

```java
public class Solution {
    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        List<Integer>[] dp = new ArrayList[n];
        List<Integer> res = new ArrayList<>();

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = new ArrayList<>();
            dp[i].add(nums[i]);

            for (int j = i + 1; j < n; j++) {
                if (nums[j] % nums[i] == 0) {
                    List<Integer> tmp = new ArrayList<>();
                    tmp.add(nums[i]);
                    tmp.addAll(dp[j]);

                    if (tmp.size() > dp[i].size()) {
                        dp[i] = tmp;
                    }
                }
            }
            if (dp[i].size() > res.size()) {
                res = dp[i];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        vector<vector<int>> dp(n);
        vector<int> res;

        for (int i = n - 1; i >= 0; i--) {
            dp[i].push_back(nums[i]);

            for (int j = i + 1; j < n; j++) {
                if (nums[j] % nums[i] == 0) {
                    vector<int> tmp = dp[j];
                    tmp.insert(tmp.begin(), nums[i]);

                    if (tmp.size() > dp[i].size()) {
                        dp[i] = tmp;
                    }
                }
            }
            if (dp[i].size() > res.size()) {
                res = dp[i];
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
     * @return {number[]}
     */
    largestDivisibleSubset(nums) {
        nums.sort((a, b) => a - b);
        const n = nums.length;
        const dp = new Array(n).fill(0).map(() => []);
        let res = [];

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = [nums[i]];

            for (let j = i + 1; j < n; j++) {
                if (nums[j] % nums[i] === 0) {
                    let tmp = [nums[i], ...dp[j]];

                    if (tmp.length > dp[i].length) {
                        dp[i] = tmp;
                    }
                }
            }
            if (dp[i].length > res.length) {
                res = dp[i];
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Top-Down) + Tracing

::tabs-start

```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        n = len(nums)
        dp = [[-1, -1] for _ in range(n)]  # dp[i] = [maxLen, prevIdx]

        def dfs(i):
            if dp[i][0] != -1:
                return dp[i][0]

            dp[i][0] = 1
            for j in range(i + 1, n):
                if nums[j] % nums[i] == 0:
                    length = dfs(j) + 1
                    if length > dp[i][0]:
                        dp[i][0] = length
                        dp[i][1] = j

            return dp[i][0]

        max_len, start_index = 1, 0
        for i in range(n):
            if dfs(i) > max_len:
                max_len = dfs(i)
                start_index = i

        subset = []
        while start_index != -1:
            subset.append(nums[start_index])
            start_index = dp[start_index][1]

        return subset
```

```java
public class Solution {
    private int[][] dp;

    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        dp = new int[n][2];
        for (int i = 0; i < n; i++) {
            dp[i][0] = -1;
            dp[i][1] = -1;
        }

        int maxLen = 1, startIndex = 0;
        for (int i = 0; i < n; i++) {
            if (dfs(i, nums) > maxLen) {
                maxLen = dp[i][0];
                startIndex = i;
            }
        }

        List<Integer> subset = new ArrayList<>();
        while (startIndex != -1) {
            subset.add(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }

    private int dfs(int i, int[] nums) {
        if (dp[i][0] != -1) return dp[i][0];

        dp[i][0] = 1;
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] % nums[i] == 0) {
                int length = dfs(j, nums) + 1;
                if (length > dp[i][0]) {
                    dp[i][0] = length;
                    dp[i][1] = j;
                }
            }
        }
        return dp[i][0];
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;

public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        dp.assign(n, vector<int>(2, -1));

        int maxLen = 1, startIndex = 0;
        for (int i = 0; i < n; i++) {
            if (dfs(i, nums) > maxLen) {
                maxLen = dp[i][0];
                startIndex = i;
            }
        }

        vector<int> subset;
        while (startIndex != -1) {
            subset.push_back(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }

private:
    int dfs(int i, vector<int>& nums) {
        if (dp[i][0] != -1) return dp[i][0];

        dp[i][0] = 1;
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[j] % nums[i] == 0) {
                int length = dfs(j, nums) + 1;
                if (length > dp[i][0]) {
                    dp[i][0] = length;
                    dp[i][1] = j;
                }
            }
        }
        return dp[i][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    largestDivisibleSubset(nums) {
        nums.sort((a, b) => a - b);
        let n = nums.length;
        let dp = Array.from({ length: n }, () => [-1, -1]); // dp[i] = [maxLen, prevIdx]

        const dfs = (i) => {
            if (dp[i][0] !== -1) return dp[i][0];

            dp[i][0] = 1;
            for (let j = i + 1; j < n; j++) {
                if (nums[j] % nums[i] === 0) {
                    let length = dfs(j) + 1;
                    if (length > dp[i][0]) {
                        dp[i][0] = length;
                        dp[i][1] = j;
                    }
                }
            }
            return dp[i][0];
        };

        let maxLen = 1,
            startIndex = 0;
        for (let i = 0; i < n; i++) {
            if (dfs(i) > maxLen) {
                maxLen = dfs(i);
                startIndex = i;
            }
        }

        let subset = [];
        while (startIndex !== -1) {
            subset.push(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 5. Dynamic Programming (Bottom-Up) + Tracing

::tabs-start

```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        n = len(nums)
        dp = [[1, -1] for _ in range(n)]  # dp[i] = [maxLen, prevIdx]

        max_len, start_index = 1, 0

        for i in range(n):
            for j in range(i):
                if nums[i] % nums[j] == 0 and dp[j][0] + 1 > dp[i][0]:
                    dp[i][0] = dp[j][0] + 1
                    dp[i][1] = j

            if dp[i][0] > max_len:
                max_len = dp[i][0]
                start_index = i

        subset = []
        while start_index != -1:
            subset.append(nums[start_index])
            start_index = dp[start_index][1]
        return subset
```

```java
public class Solution {
    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        int[][] dp = new int[n][2]; // dp[i] = {maxLen, prevIdx}

        int maxLen = 1, startIndex = 0;
        for (int i = 0; i < n; i++) {
            dp[i][0] = 1;
            dp[i][1] = -1;
            for (int j = 0; j < i; j++) {
                if (nums[i] % nums[j] == 0 && dp[j][0] + 1 > dp[i][0]) {
                    dp[i][0] = dp[j][0] + 1;
                    dp[i][1] = j;
                }
            }

            if (dp[i][0] > maxLen) {
                maxLen = dp[i][0];
                startIndex = i;
            }
        }

        List<Integer> subset = new ArrayList<>();
        while (startIndex != -1) {
            subset.add(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }
}
```

```cpp
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(2, -1)); // dp[i] = {maxLen, prevIdx}

        int maxLen = 1, startIndex = 0;
        for (int i = 0; i < n; i++) {
            dp[i][0] = 1;
            dp[i][1] = -1;
            for (int j = 0; j < i; j++) {
                if (nums[i] % nums[j] == 0 && dp[j][0] + 1 > dp[i][0]) {
                    dp[i][0] = dp[j][0] + 1;
                    dp[i][1] = j;
                }
            }

            if (dp[i][0] > maxLen) {
                maxLen = dp[i][0];
                startIndex = i;
            }
        }

        vector<int> subset;
        while (startIndex != -1) {
            subset.push_back(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    largestDivisibleSubset(nums) {
        nums.sort((a, b) => a - b);
        let n = nums.length;
        let dp = Array.from({ length: n }, () => [1, -1]); // dp[i] = [maxLen, prevIdx]

        let maxLen = 1,
            startIndex = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[i] % nums[j] === 0 && dp[j][0] + 1 > dp[i][0]) {
                    dp[i][0] = dp[j][0] + 1;
                    dp[i][1] = j;
                }
            }

            if (dp[i][0] > maxLen) {
                maxLen = dp[i][0];
                startIndex = i;
            }
        }

        let subset = [];
        while (startIndex !== -1) {
            subset.push(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$
