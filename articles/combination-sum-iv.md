## 1. Recursion

### Intuition
We need to count all possible combinations (with different orderings counted separately) that sum to the target. At each step, we can pick any number from the array and subtract it from our remaining sum. This naturally leads to a recursive approach where we try every number at each position.

### Algorithm
1. Sort the array to enable early termination when a number exceeds the remaining sum.
2. Define a recursive function that takes the current remaining total.
3. Base case: if total equals 0, we found a valid combination, return 1.
4. For each number in the array, if it does not exceed the current total, recursively count combinations with the reduced total.
5. Sum up all recursive results and return the count.

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

```go
func combinationSum4(nums []int, target int) int {
    sort.Ints(nums)

    var dfs func(total int) int
    dfs = func(total int) int {
        if total == 0 {
            return 1
        }

        res := 0
        for _, num := range nums {
            if total < num {
                break
            }
            res += dfs(total - num)
        }
        return res
    }

    return dfs(target)
}
```

```kotlin
class Solution {
    fun combinationSum4(nums: IntArray, target: Int): Int {
        nums.sort()

        fun dfs(total: Int): Int {
            if (total == 0) return 1

            var res = 0
            for (num in nums) {
                if (total < num) break
                res += dfs(total - num)
            }
            return res
        }

        return dfs(target)
    }
}
```

```swift
class Solution {
    func combinationSum4(_ nums: [Int], _ target: Int) -> Int {
        let nums = nums.sorted()

        func dfs(_ total: Int) -> Int {
            if total == 0 { return 1 }

            var res = 0
            for num in nums {
                if total < num { break }
                res += dfs(total - num)
            }
            return res
        }

        return dfs(target)
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

### Intuition
The recursive solution has overlapping subproblems since the same remaining total can be reached through different paths. By caching results for each total value, we avoid redundant computations. This memoization transforms exponential time complexity into polynomial.

### Algorithm
1. Sort the array and initialize a memoization map with base case: memo[0] = 1.
2. Define a recursive function that checks the memo before computing.
3. For each number that does not exceed the current total, add the result of the recursive call with the reduced total.
4. Store the computed result in the memo before returning.
5. Return the result for the target value.

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

```go
func combinationSum4(nums []int, target int) int {
    sort.Ints(nums)
    memo := map[int]int{0: 1}

    var dfs func(total int) int
    dfs = func(total int) int {
        if val, ok := memo[total]; ok {
            return val
        }

        res := 0
        for _, num := range nums {
            if total < num {
                break
            }
            res += dfs(total - num)
        }
        memo[total] = res
        return res
    }

    return dfs(target)
}
```

```kotlin
class Solution {
    fun combinationSum4(nums: IntArray, target: Int): Int {
        nums.sort()
        val memo = mutableMapOf(0 to 1)

        fun dfs(total: Int): Int {
            memo[total]?.let { return it }

            var res = 0
            for (num in nums) {
                if (total < num) break
                res += dfs(total - num)
            }
            memo[total] = res
            return res
        }

        return dfs(target)
    }
}
```

```swift
class Solution {
    func combinationSum4(_ nums: [Int], _ target: Int) -> Int {
        let nums = nums.sorted()
        var memo: [Int: Int] = [0: 1]

        func dfs(_ total: Int) -> Int {
            if let val = memo[total] {
                return val
            }

            var res = 0
            for num in nums {
                if total < num { break }
                res += dfs(total - num)
            }
            memo[total] = res
            return res
        }

        return dfs(target)
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

### Intuition
Instead of working backwards from the target, we can build up the solution by computing the number of ways to reach each sum from 0 to target. For each sum, we check all numbers in the array and add the ways to reach the sum minus that number.

### Algorithm
1. Initialize a DP map with dp[0] = 1 (one way to make sum 0: use nothing).
2. Iterate through all totals from 1 to target.
3. For each total and each number in the array, if total minus the number exists in dp, add that count to dp[total].
4. Return dp[target] as the final answer.

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

```go
func combinationSum4(nums []int, target int) int {
    dp := make(map[int]int)
    dp[0] = 1

    for total := 1; total <= target; total++ {
        dp[total] = 0
        for _, num := range nums {
            if val, ok := dp[total-num]; ok {
                dp[total] += val
            }
        }
    }

    return dp[target]
}
```

```kotlin
class Solution {
    fun combinationSum4(nums: IntArray, target: Int): Int {
        val dp = mutableMapOf(0 to 1)

        for (total in 1..target) {
            dp[total] = 0
            for (num in nums) {
                dp[total] = dp[total]!! + (dp[total - num] ?: 0)
            }
        }

        return dp[target]!!
    }
}
```

```swift
class Solution {
    func combinationSum4(_ nums: [Int], _ target: Int) -> Int {
        var dp: [Int: Int] = [0: 1]

        for total in 1...target {
            dp[total] = 0
            for num in nums {
                dp[total]! += dp[total - num] ?? 0
            }
        }

        return dp[target]!
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

### Intuition
We can also work backwards from the target. Starting at the target, each number represents how many ways we can reach the target from that sum. When we subtract a number from the current total, we propagate the count to the resulting sum.

### Algorithm
1. Sort the array and initialize dp[target] = 1.
2. Iterate from target down to 1.
3. For each total with a non-zero count, and for each number that does not exceed the total, add dp[total] to dp[total - num].
4. Return dp[0], which accumulates all ways to reach sum 0 starting from target.

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

```go
func combinationSum4(nums []int, target int) int {
    sort.Ints(nums)
    dp := map[int]int{target: 1}

    for total := target; total > 0; total-- {
        if _, ok := dp[total]; !ok {
            continue
        }
        for _, num := range nums {
            if total < num {
                break
            }
            dp[total-num] += dp[total]
        }
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun combinationSum4(nums: IntArray, target: Int): Int {
        nums.sort()
        val dp = mutableMapOf(target to 1)

        for (total in target downTo 1) {
            if (total !in dp) continue
            for (num in nums) {
                if (total < num) break
                dp[total - num] = (dp[total - num] ?: 0) + dp[total]!!
            }
        }

        return dp[0] ?: 0
    }
}
```

```swift
class Solution {
    func combinationSum4(_ nums: [Int], _ target: Int) -> Int {
        let nums = nums.sorted()
        var dp: [Int: Int] = [target: 1]

        for total in stride(from: target, to: 0, by: -1) {
            guard let curr = dp[total] else { continue }
            for num in nums {
                if total < num { break }
                dp[total - num, default: 0] += curr
            }
        }

        return dp[0] ?? 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * t)$
- Space complexity: $O(t)$

> Where $n$ is the size of the array $nums$ and $t$ is the given target.
