## 1. Backtracking

::tabs-start

```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        def backtrack(i, A, B):
            if i == len(nums):
                if not A or not B:
                    return False
                return sum(A) * len(B) == sum(B) * len(A)

            A.append(nums[i])
            if backtrack(i + 1, A, B):
                return True
            B.append(nums[i])
            A.pop()
            res = backtrack(i + 1, A, B)
            B.pop()
            return res

        return backtrack(0, [], [])
```

```java
public class Solution {
    public boolean splitArraySameAverage(int[] nums) {
        return backtrack(nums, 0, new ArrayList<>(), new ArrayList<>());
    }

    private boolean backtrack(int[] nums, int i, List<Integer> A, List<Integer> B) {
        if (i == nums.length) {
            if (A.isEmpty() || B.isEmpty()) return false;
            int sumA = A.stream().mapToInt(x -> x).sum();
            int sumB = B.stream().mapToInt(x -> x).sum();
            return sumA * B.size() == sumB * A.size();
        }

        A.add(nums[i]);
        if (backtrack(nums, i + 1, A, B)) return true;
        A.remove(A.size() - 1);

        B.add(nums[i]);
        boolean res = backtrack(nums, i + 1, A, B);
        B.remove(B.size() - 1);

        return res;
    }
}
```

```cpp
class Solution {
public:
    bool splitArraySameAverage(vector<int>& nums) {
        vector<int> A, B;
        return backtrack(nums, 0, A, B);
    }

    bool backtrack(vector<int>& nums, int i, vector<int>& A, vector<int>& B) {
        if (i == nums.size()) {
            if (A.empty() || B.empty()) return false;
            int sumA = accumulate(A.begin(), A.end(), 0);
            int sumB = accumulate(B.begin(), B.end(), 0);
            return sumA * B.size() == sumB * A.size();
        }

        A.push_back(nums[i]);
        if (backtrack(nums, i + 1, A, B)) return true;
        A.pop_back();

        B.push_back(nums[i]);
        bool res = backtrack(nums, i + 1, A, B);
        B.pop_back();

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
    splitArraySameAverage(nums) {
        const backtrack = (i, A, B) => {
            if (i === nums.length) {
                if (A.length === 0 || B.length === 0) return false;
                const sumA = A.reduce((a, b) => a + b, 0);
                const sumB = B.reduce((a, b) => a + b, 0);
                return sumA * B.length === sumB * A.length;
            }

            A.push(nums[i]);
            if (backtrack(i + 1, A, B)) return true;
            A.pop();

            B.push(nums[i]);
            const res = backtrack(i + 1, A, B);
            B.pop();

            return res;
        };

        return backtrack(0, [], []);
    }
}
```

```csharp
public class Solution {
    public bool SplitArraySameAverage(int[] nums) {
        return Backtrack(nums, 0, new List<int>(), new List<int>());
    }

    private bool Backtrack(int[] nums, int i, List<int> A, List<int> B) {
        if (i == nums.Length) {
            if (A.Count == 0 || B.Count == 0) return false;
            int sumA = A.Sum();
            int sumB = B.Sum();
            return sumA * B.Count == sumB * A.Count;
        }

        A.Add(nums[i]);
        if (Backtrack(nums, i + 1, A, B)) return true;
        A.RemoveAt(A.Count - 1);

        B.Add(nums[i]);
        bool res = Backtrack(nums, i + 1, A, B);
        B.RemoveAt(B.Count - 1);

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(n)$

---

## 2. Memoization (Brute Force)

::tabs-start

```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        total = sum(nums)
        n = len(nums)
        memo = {}

        def dfs(i, size, curr_sum):
            if (i, size, curr_sum) in memo:
                return memo[(i, size, curr_sum)]

            if size > 0 and size < n and curr_sum * (n - size) == (total - curr_sum) * size:
                return True

            if i == n:
                return False

            # include nums[i] in A
            if dfs(i + 1, size + 1, curr_sum + nums[i]):
                memo[(i, size, curr_sum)] = True
                return True

            # include nums[i] in B
            if dfs(i + 1, size, curr_sum):
                memo[(i, size, curr_sum)] = True
                return True

            memo[(i, size, curr_sum)] = False
            return False

        return dfs(0, 0, 0)
```

```java
public class Solution {
    public boolean splitArraySameAverage(int[] nums) {
        int total = 0, n = nums.length;
        for (int num : nums) total += num;
        Map<String, Boolean> memo = new HashMap<>();

        return dfs(0, 0, 0, nums, total, n, memo);
    }

    private boolean dfs(int i, int size, int currSum, int[] nums, int total, int n, Map<String, Boolean> memo) {
        String key = i + "," + size + "," + currSum;
        if (memo.containsKey(key)) return memo.get(key);

        if (size > 0 && size < n && currSum * (n - size) == (total - currSum) * size)
            return true;
        if (i == n) return false;

        if (dfs(i + 1, size + 1, currSum + nums[i], nums, total, n, memo) ||
            dfs(i + 1, size, currSum, nums, total, n, memo)) {
            memo.put(key, true);
            return true;
        }

        memo.put(key, false);
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitArraySameAverage(vector<int>& nums) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        int n = nums.size();
        unordered_map<string, bool> memo;

        function<bool(int, int, int)> dfs = [&](int i, int size, int currSum) {
            string key = to_string(i) + "," + to_string(size) + "," + to_string(currSum);
            if (memo.count(key)) return memo[key];

            if (size > 0 && size < n && currSum * (n - size) == (total - currSum) * size)
                return true;
            if (i == n) return false;

            if (dfs(i + 1, size + 1, currSum + nums[i]) || dfs(i + 1, size, currSum))
                return memo[key] = true;

            return memo[key] = false;
        };

        return dfs(0, 0, 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    splitArraySameAverage(nums) {
        const total = nums.reduce((a, b) => a + b, 0);
        const n = nums.length;
        const memo = new Map();

        const dfs = (i, size, currSum) => {
        const key = `${i},${size},${currSum}`;
            if (memo.has(key)) return memo.get(key);

            if (size > 0 && size < n && currSum * (n - size) === (total - currSum) * size)
                return true;
            if (i === n) return false;

            if (dfs(i + 1, size + 1, currSum + nums[i]) || dfs(i + 1, size, currSum)) {
                memo.set(key, true);
                return true;
            }

            memo.set(key, false);
            return false;
        };

        return dfs(0, 0, 0);
    }
}
```

```csharp
public class Solution {
    public bool SplitArraySameAverage(int[] nums) {
        int total = nums.Sum(), n = nums.Length;
        var memo = new Dictionary<string, bool>();

        bool Dfs(int i, int size, int currSum) {
            string key = $"{i},{size},{currSum}";
            if (memo.ContainsKey(key)) return memo[key];

            if (size > 0 && size < n && currSum * (n - size) == (total - currSum) * size)
                return true;
            if (i == n) return false;

            if (Dfs(i + 1, size + 1, currSum + nums[i]) || Dfs(i + 1, size, currSum)) {
                memo[key] = true;
                return true;
            }

            memo[key] = false;
            return false;
        }

        return Dfs(0, 0, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 * s)$
* Space complexity: $O(n ^ 2 * s)$

> Where $n$ is the size of the input array $nums$, and $s$ is the sum of the elements of the array.

---

## 3. Memoization (Optimal)

::tabs-start

```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        n, total = len(nums), sum(nums)
        # len(A) = a, len(B) = b, let a <= b
        # avg(A) = avg(B)
        # sum(A) / a = sum(B) / b = sum(nums) / n
        # sum(A) / a = avg => sum(A) = a * avg
        # sum(A) = a * sum(nums) / n
        # Find if any subset exists with a * sum(nums) / n
        # a is in the range [1, (n//2)]

        memo = {}
        def dfs(i, a, s):
            if (i, a, s) in memo:
                return memo[(i, a, s)]
            if a == 0:
                return s == 0
            if i == n or a < 0:
                return False
            memo[(i, a, s)] = dfs(i + 1, a, s) or dfs(i + 1, a - 1, s - nums[i])
            return memo[(i, a, s)]

        for a in range(1, n // 2 + 1):
            if total * a % n == 0:
                if dfs(0, a, total * a // n):
                    return True

        return False
```

```java
public class Solution {
    int[] nums;
    int n, total;
    Map<String, Boolean> memo;

    public boolean splitArraySameAverage(int[] nums) {
        this.nums = nums;
        this.n = nums.length;
        this.total = 0;
        for (int num : nums) total += num;
        this.memo = new HashMap<>();

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        for (int a = 1; a <= n / 2; a++) {
            if ((total * a) % n == 0) {
                if (dfs(0, a, (total * a) / n)) return true;
            }
        }
        return false;
    }

    private boolean dfs(int i, int a, int s) {
        String key = i + "," + a + "," + s;
        if (memo.containsKey(key)) return memo.get(key);
        if (a == 0) return s == 0;
        if (i == n || a < 0 || s < 0) return false;
        boolean res = dfs(i + 1, a, s) || dfs(i + 1, a - 1, s - nums[i]);
        memo.put(key, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    bool splitArraySameAverage(vector<int>& nums) {
        int n = nums.size();
        int total = accumulate(nums.begin(), nums.end(), 0);

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        vector<vector<vector<int>>> memo(n + 1,
            vector<vector<int>>(n / 2 + 1, vector<int>(total + 1, -1)));

        function<bool(int, int, int)> dfs = [&](int i, int a, int s) -> bool {
            if (a == 0) return s == 0;
            if (i == n || s < 0 || a < 0) return false;
            if (memo[i][a][s] != -1) return memo[i][a][s];

            bool res = dfs(i + 1, a, s) || dfs(i + 1, a - 1, s - nums[i]);
            memo[i][a][s] = res;
            return res;
        };

        for (int a = 1; a <= n / 2; ++a) {
            if ((total * a) % n == 0) {
                int target = (total * a) / n;
                if (dfs(0, a, target)) return true;
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    splitArraySameAverage(nums) {
        const n = nums.length, total = nums.reduce((a, b) => a + b, 0);

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        const memo = new Map();

        const dfs = (i, a, s) => {
            const key = `${i},${a},${s}`;
            if (memo.has(key)) return memo.get(key);
            if (a === 0) return s === 0;
            if (i === n || a < 0) return false;
            const res = dfs(i + 1, a, s) || dfs(i + 1, a - 1, s - nums[i]);
            memo.set(key, res);
            return res;
        };

        for (let a = 1; a <= Math.floor(n / 2); a++) {
            if ((total * a) % n === 0) {
                if (dfs(0, a, Math.floor((total * a) / n))) return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool SplitArraySameAverage(int[] nums) {
        int n = nums.Length;
        int total = nums.Sum();

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        int[,,] memo = new int[n + 1, n / 2 + 1, total + 1];
        for (int i = 0; i <= n; i++)
            for (int j = 0; j <= n / 2; j++)
                for (int k = 0; k <= total; k++)
                    memo[i, j, k] = -1;

        for (int a = 1; a <= n / 2; a++) {
            if ((total * a) % n == 0) {
                int target = (total * a) / n;
                if (Dfs(0, a, target, nums, memo)) return true;
            }
        }

        return false;
    }

    private bool Dfs(int i, int a, int s, int[] nums, int[,,] memo) {
        if (a == 0) return s == 0;
        if (i == nums.Length || a < 0 || s < 0) return false;
        if (memo[i, a, s] != -1) return memo[i, a, s] == 1;

        bool res = Dfs(i + 1, a, s, nums, memo) || Dfs(i + 1, a - 1, s - nums[i], nums, memo);
        memo[i, a, s] = res ? 1 : 0;
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 * s)$
* Space complexity: $O(n ^ 2 * s)$

> Where $n$ is the size of the input array $nums$, and $s$ is the sum of the elements of the array.

---

## 4. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        n = len(nums)
        # len(A) = a, len(B) = b, let a <= b
        # avg(A) = avg(B)
        # sum(A) / a = sum(B) / b = sum(nums) / n
        # sum(A) / a = avg => sum(A) = a * avg
        # sum(A) = a * sum(nums) / n
        # Find if any subset exists with a * sum(nums) / n
        # a is in the range [1, (n//2)]

        total = sum(nums)
        dp = [set() for _ in range(n // 2 + 1)]

        dp[0].add(0)
        for num in nums:
            for a in range(n // 2, 0, -1):
                for prev in dp[a - 1]:
                    dp[a].add(prev + num)

        for a in range(1, n // 2 + 1):
            if (a * total % n == 0) and (a * total // n) in dp[a]:
                return True

        return False
```

```java
public class Solution {
    public boolean splitArraySameAverage(int[] nums) {
        int n = nums.length;

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        int total = 0;
        for (int num : nums) total += num;

        List<Set<Integer>> dp = new ArrayList<>();
        for (int i = 0; i <= n / 2; i++) {
            dp.add(new HashSet<>());
        }
        dp.get(0).add(0);

        for (int num : nums) {
            for (int a = n / 2; a >= 1; a--) {
                for (int prev : dp.get(a - 1)) {
                    dp.get(a).add(prev + num);
                }
            }
        }

        for (int a = 1; a <= n / 2; a++) {
            if ((a * total) % n == 0 && dp.get(a).contains((a * total) / n)) {
                return true;
            }
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitArraySameAverage(vector<int>& nums) {
        int n = nums.size();

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        int total = accumulate(nums.begin(), nums.end(), 0);
        vector<unordered_set<int>> dp(n / 2 + 1);
        dp[0].insert(0);

        for (int num : nums) {
            for (int a = n / 2; a >= 1; a--) {
                for (int prev : dp[a - 1]) {
                    dp[a].insert(prev + num);
                }
            }
        }

        for (int a = 1; a <= n / 2; ++a) {
            if ((a * total) % n == 0 && dp[a].count((a * total) / n)) {
                return true;
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    splitArraySameAverage(nums) {
        const n = nums.length;

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        const total = nums.reduce((a, b) => a + b, 0);
        const dp = Array.from({ length: Math.floor(n / 2) + 1 }, () => new Set());
        dp[0].add(0);

        for (const num of nums) {
            for (let a = Math.floor(n / 2); a >= 1; a--) {
                for (const prev of dp[a - 1]) {
                    dp[a].add(prev + num);
                }
            }
        }

        for (let a = 1; a <= Math.floor(n / 2); a++) {
            if ((a * total) % n === 0 && dp[a].has((a * total) / n)) {
                return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool SplitArraySameAverage(int[] nums) {
        int n = nums.Length;

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        int total = nums.Sum();
        List<HashSet<int>> dp = new List<HashSet<int>>();
        for (int i = 0; i <= n / 2; i++) {
            dp.Add(new HashSet<int>());
        }
        dp[0].Add(0);

        foreach (int num in nums) {
            for (int a = n / 2; a >= 1; a--) {
                foreach (int prev in dp[a - 1]) {
                    dp[a].Add(prev + num);
                }
            }
        }

        for (int a = 1; a <= n / 2; a++) {
            if ((a * total) % n == 0 && dp[a].Contains((a * total) / n)) {
                return true;
            }
        }

        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 * s)$
* Space complexity: $O(n ^ 2 * s)$

> Where $n$ is the size of the input array $nums$, and $s$ is the sum of the elements of the array.