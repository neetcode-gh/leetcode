## 1. Recursion

::tabs-start

```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        
        def backtrack(i, total):
            if i ==len(nums):
                return  total == target
            
            return (backtrack(i + 1, total + nums[i]) + 
                    backtrack(i + 1, total - nums[i]))
                
        return backtrack(0, 0)
```

```java
public class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        return backtrack(0, 0, nums, target);
    }

    private int backtrack(int i, int total, int[] nums, int target) {
        if (i == nums.length) {
            return total == target ? 1 : 0;
        }
        return backtrack(i + 1, total + nums[i], nums, target) + 
               backtrack(i + 1, total - nums[i], nums, target);
    }
}
```

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        return backtrack(0, 0, nums, target);
    }
    
    int backtrack(int i, int total, vector<int>& nums, int target) {
        if (i == nums.size()) {
            return total == target;
        }
        return backtrack(i + 1, total + nums[i], nums, target) + 
               backtrack(i + 1, total - nums[i], nums, target);
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
    findTargetSumWays(nums, target) {

        const backtrack = (i, total) => {
            if (i === nums.length) {
                return total === target ? 1 : 0;
            }
            return backtrack(i + 1, total + nums[i]) + 
                backtrack(i + 1, total - nums[i]);
        }

        return backtrack(0, 0);
    }
}
```

```csharp
public class Solution {
    public int FindTargetSumWays(int[] nums, int target) {
        return Backtrack(0, 0, nums, target);
    }

    private int Backtrack(int i, int total, int[] nums, int target) {
        if (i == nums.Length) {
            return total == target ? 1 : 0;
        }
        return Backtrack(i + 1, total + nums[i], nums, target) + 
               Backtrack(i + 1, total - nums[i], nums, target);
    }
}
```

```go
func findTargetSumWays(nums []int, target int) int {
    var backtrack func(i int, total int) int
    backtrack = func(i int, total int) int {
        if i == len(nums) {
            if total == target {
                return 1
            }
            return 0
        }
        return backtrack(i+1, total+nums[i]) + backtrack(i+1, total-nums[i])
    }
    
    return backtrack(0, 0)
}
```

```kotlin
class Solution {
    fun findTargetSumWays(nums: IntArray, target: Int): Int {
        fun backtrack(i: Int, total: Int): Int {
            if (i == nums.size) {
                return if (total == target) 1 else 0
            }
            return backtrack(i + 1, total + nums[i]) + 
                   backtrack(i + 1, total - nums[i])
        }
        
        return backtrack(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ n)$
* Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        dp = {}  # (index, total) -> # of ways

        def backtrack(i, total):
            if i == len(nums):
                return 1 if total == target else 0
            if (i, total) in dp:
                return dp[(i, total)]

            dp[(i, total)] = (backtrack(i + 1, total + nums[i]) + 
                              backtrack(i + 1, total - nums[i]))
            return dp[(i, total)]

        return backtrack(0, 0)
```

```java
public class Solution {
    private int[][] dp;
    private int totalSum;

    public int findTargetSumWays(int[] nums, int target) {
        totalSum = 0;
        for (int num : nums) totalSum += num;
        dp = new int[nums.length][2 * totalSum + 1];
        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < 2 * totalSum + 1; j++) {
                dp[i][j] = Integer.MIN_VALUE;
            }
        }
        return backtrack(0, 0, nums, target);
    }

    private int backtrack(int i, int total, int[] nums, int target) {
        if (i == nums.length) {
            return total == target ? 1 : 0;
        }
        if (dp[i][total + totalSum] != Integer.MIN_VALUE) {
            return dp[i][total + totalSum];
        }
        dp[i][total + totalSum] = backtrack(i + 1, total + nums[i], nums, target) + 
                                  backtrack(i + 1, total - nums[i], nums, target);
        return dp[i][total + totalSum];
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;
    int totalSum;

public:
    int findTargetSumWays(vector<int>& nums, int target) {
        totalSum = accumulate(nums.begin(), nums.end(), 0);
        dp = vector<vector<int>>(nums.size(), vector<int>(2 * totalSum + 1, INT_MIN));
        return backtrack(0, 0, nums, target);
    }
    
    int backtrack(int i, int total, vector<int>& nums, int target) {
        if (i == nums.size()) {
            return total == target;
        }
        if (dp[i][total + totalSum] != INT_MIN) {
            return dp[i][total + totalSum];
        }
        dp[i][total + totalSum] = backtrack(i + 1, total + nums[i], nums, target) + 
                                  backtrack(i + 1, total - nums[i], nums, target);
        return dp[i][total + totalSum];
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
    findTargetSumWays(nums, target) {
        const NEG_INF = Number.MIN_SAFE_INTEGER;
        const totalSum = nums.reduce((a, b) => a + b, 0);
        const dp = Array.from({ length: nums.length }, () => 
                   Array(2 * totalSum + 1).fill(NEG_INF));

        const backtrack = (i, total) => {
            if (i === nums.length) {
                return total === target ? 1 : 0;
            }
            if (dp[i][total + totalSum] !== NEG_INF) {
                return dp[i][total + totalSum];
            }
            dp[i][total + totalSum] = backtrack(i + 1, total + nums[i]) + 
                                      backtrack(i + 1, total - nums[i]);
            return dp[i][total + totalSum];
        }

        return backtrack(0, 0);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;
    private int totalSum;

    public int FindTargetSumWays(int[] nums, int target) {
        totalSum = 0;
        foreach (var num in nums) totalSum += num;
        dp = new int[nums.Length, 2 * totalSum + 1];
        for (int i = 0; i < nums.Length; i++) {
            for (int j = 0; j < 2 * totalSum + 1; j++) {
                dp[i, j] = int.MinValue;  
            }
        }
        return Backtrack(0, 0, nums, target);
    }

    private int Backtrack(int i, int total, int[] nums, int target) {
        if (i == nums.Length) {
            return total == target ? 1 : 0;
        }

        if (dp[i, total + totalSum] != int.MinValue) {
            return dp[i, total + totalSum];  
        }

        dp[i, total + totalSum] = Backtrack(i + 1, total + nums[i], nums, target) + 
                                  Backtrack(i + 1, total - nums[i], nums, target);  
        return dp[i, total + totalSum];
    }
}
```

```go
func findTargetSumWays(nums []int, target int) int {
    totalSum := 0
    for _, num := range nums {
        totalSum += num
    }

    dp := make([][]int, len(nums))
    for i := range dp {
        dp[i] = make([]int, 2*totalSum+1)
        for j := range dp[i] {
            dp[i][j] = math.MinInt32
        }
    }

    var backtrack func(i, total int) int
    backtrack = func(i, total int) int {
        if i == len(nums) {
            if total == target {
                return 1
            }
            return 0
        }

        if dp[i][total+totalSum] != math.MinInt32 {
            return dp[i][total+totalSum]
        }

        dp[i][total+totalSum] = (backtrack(i+1, total+nums[i]) + 
                                 backtrack(i+1, total-nums[i]))
        return dp[i][total+totalSum]
    }

    return backtrack(0, 0)
}
```

```kotlin
class Solution {
    fun findTargetSumWays(nums: IntArray, target: Int): Int {
        var totalSum = nums.sum()
        var dp = Array(nums.size) { IntArray(2 * totalSum + 1) { Int.MIN_VALUE } }

        fun backtrack(i: Int, total: Int): Int {
            if (i == nums.size) {
                return if (total == target) 1 else 0
            }
            if (dp[i][total + totalSum] != Int.MIN_VALUE) {
                return dp[i][total + totalSum]
            }
            dp[i][total + totalSum] = backtrack(i + 1, total + nums[i]) + 
                                      backtrack(i + 1, total - nums[i])
            return dp[i][total + totalSum]
        }
        
        return backtrack(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * t)$
* Space complexity: $O(n * t)$

> Where $n$ is the length of the array $nums$ and $t$ is the sum of all the elements in the array.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        n = len(nums)
        dp = [defaultdict(int) for _ in range(n + 1)]
        dp[0][0] = 1

        for i in range(n):
            for total, count in dp[i].items():
                dp[i + 1][total + nums[i]] += count
                dp[i + 1][total - nums[i]] += count

        return dp[n][target]
```

```java
public class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int n = nums.length;
        Map<Integer, Integer>[] dp = new HashMap[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = new HashMap<>();
        }
        dp[0].put(0, 1);

        for (int i = 0; i < n; i++) {
            for (Map.Entry<Integer, Integer> entry : dp[i].entrySet()) {
                int total = entry.getKey();
                int count = entry.getValue();
                dp[i + 1].put(total + nums[i], 
                          dp[i + 1].getOrDefault(total + nums[i], 0) + count);
                dp[i + 1].put(total - nums[i], 
                          dp[i + 1].getOrDefault(total - nums[i], 0) + count);
            }
        }
        return dp[n].getOrDefault(target, 0);
    }
}
```

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int n = nums.size();
        vector<unordered_map<int, int>> dp(n + 1);
        dp[0][0] = 1;

        for (int i = 0; i < n; i++) {
            for (auto &p : dp[i]) {
                dp[i + 1][p.first + nums[i]] += p.second;
                dp[i + 1][p.first - nums[i]] += p.second;
            }
        }
        return dp[n][target];
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
    findTargetSumWays(nums, target) {
        const n = nums.length;
        let dp = Array.from({ length: n + 1 }, () => ({}));
        dp[0][0] = 1;

        for (let i = 0; i < n; i++) {
            for (let total in dp[i]) {
                total = Number(total);
                let count = dp[i][total];
                dp[i + 1][total + nums[i]] = (dp[i + 1][total + nums[i]] || 0) + count;
                dp[i + 1][total - nums[i]] = (dp[i + 1][total - nums[i]] || 0) + count;
            }
        }
        return dp[n][target] || 0;
    }
}
```

```csharp
public class Solution {
    public int FindTargetSumWays(int[] nums, int S) {
        int n = nums.Length;
        Dictionary<int, int>[] dp = new Dictionary<int, int>[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = new Dictionary<int, int>();
        }
        dp[0][0] = 1;

        for (int i = 0; i < n; i++) {
            foreach (var entry in dp[i]) {
                int total = entry.Key;
                int count = entry.Value;
                if (!dp[i + 1].ContainsKey(total + nums[i])) {
                    dp[i + 1][total + nums[i]] = 0;
                }
                dp[i + 1][total + nums[i]] += count;

                if (!dp[i + 1].ContainsKey(total - nums[i])) {
                    dp[i + 1][total - nums[i]] = 0;
                }
                dp[i + 1][total - nums[i]] += count;
            }
        }
        return dp[n].ContainsKey(S) ? dp[n][S] : 0;
    }
}
```

```go
func findTargetSumWays(nums []int, target int) int {
    n := len(nums)
    dp := make([]map[int]int, n+1)

    for i := 0; i <= n; i++ {
        dp[i] = make(map[int]int)
    }

    dp[0][0] = 1 

    for i := 0; i < n; i++ {
        for total, count := range dp[i] {
            dp[i+1][total+nums[i]] += count
            dp[i+1][total-nums[i]] += count
        }
    }

    return dp[n][target]
}
```

```kotlin
class Solution {
    fun findTargetSumWays(nums: IntArray, target: Int): Int {
        val n = nums.size
        val dp = Array(n + 1) { mutableMapOf<Int, Int>() }

        dp[0][0] = 1 

        for (i in 0 until n) {
            for ((total, count) in dp[i]) {
                dp[i + 1][total + nums[i]] = dp[i + 1].getOrDefault(total + nums[i], 0) + count
                dp[i + 1][total - nums[i]] = dp[i + 1].getOrDefault(total - nums[i], 0) + count
            }
        }

        return dp[n][target] ?: 0
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * t)$
* Space complexity: $O(n * t)$

> Where $n$ is the length of the array $nums$ and $t$ is the sum of all the elements in the array.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        dp = defaultdict(int)
        dp[0] = 1

        for num in nums:
            next_dp = defaultdict(int)
            for total, count in dp.items():
                next_dp[total + num] += count
                next_dp[total - num] += count
            dp = next_dp
            
        return dp[target]
```

```java
public class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        Map<Integer, Integer> dp = new HashMap<>();
        dp.put(0, 1);

        for (int num : nums) {
            Map<Integer, Integer> nextDp = new HashMap<>();
            for (Map.Entry<Integer, Integer> entry : dp.entrySet()) {
                int total = entry.getKey();
                int count = entry.getValue();
                nextDp.put(total + num, 
                           nextDp.getOrDefault(total + num, 0) + count);
                nextDp.put(total - num, 
                           nextDp.getOrDefault(total - num, 0) + count);
            }
            dp = nextDp;
        }
        return dp.getOrDefault(target, 0);
    }
}
```

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        unordered_map<int, int> dp;
        dp[0] = 1;

        for (int num : nums) {
            unordered_map<int, int> nextDp;
            for (auto& entry : dp) {
                int total = entry.first;
                int count = entry.second;
                nextDp[total + num] += count;
                nextDp[total - num] += count;
            }
            dp = nextDp;
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
    findTargetSumWays(nums, target) {
        let dp = new Map();
        dp.set(0, 1);

        for (let num of nums) {
            let nextDp = new Map();
            for (let [total, count] of dp) {
                nextDp.set((total + num), 
                           (nextDp.get((total + num)) || 0) + count);
                nextDp.set((total - num), 
                           (nextDp.get((total - num)) || 0) + count);
            }
            dp = nextDp;
        }
        return dp.get(target) || 0;
    }
}
```

```csharp
public class Solution {
    public int FindTargetSumWays(int[] nums, int target) {
        Dictionary<int, int> dp = new Dictionary<int, int>();
        dp[0] = 1;

        foreach (int num in nums) {
            Dictionary<int, int> nextDp = new Dictionary<int, int>();
            foreach (var entry in dp) {
                int total = entry.Key;
                int count = entry.Value;

                if (!nextDp.ContainsKey(total + num)) {
                    nextDp[total + num] = 0;
                }
                nextDp[total + num] += count;

                if (!nextDp.ContainsKey(total - num)) {
                    nextDp[total - num] = 0;
                }
                nextDp[total - num] += count;
            }
            dp = nextDp;
        }
        return dp.ContainsKey(target) ? dp[target] : 0;
    }
}
```

```go
func findTargetSumWays(nums []int, target int) int {
    dp := make(map[int]int)
    dp[0] = 1 

    for _, num := range nums {
        nextDp := make(map[int]int)
        for total, count := range dp {
            nextDp[total+num] += count
            nextDp[total-num] += count
        }
        dp = nextDp
    }

    return dp[target]
}
```

```kotlin
class Solution {
    fun findTargetSumWays(nums: IntArray, target: Int): Int {
        val dp = mutableMapOf(0 to 1) 

        for (num in nums) {
            val nextDp = mutableMapOf<Int, Int>()
            for ((total, count) in dp) {
                nextDp[total + num] = nextDp.getOrDefault(total + num, 0) + count
                nextDp[total - num] = nextDp.getOrDefault(total - num, 0) + count
            }
            dp.clear()
            dp.putAll(nextDp)
        }

        return dp[target] ?: 0
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * t)$
* Space complexity: $O(t)$

> Where $n$ is the length of the array $nums$ and $t$ is the sum of all the elements in the array.