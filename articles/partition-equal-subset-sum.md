## 1. Recursion

::tabs-start

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        if sum(nums) % 2:
            return False
        
        def dfs(i, target):
            if i >= len(nums):
                return target == 0
            if target < 0:
                return False
            
            return dfs(i + 1, target) or dfs(i + 1, target - nums[i])
        
        return dfs(0, sum(nums) // 2)
```

```java
public class Solution {
    public boolean canPartition(int[] nums) {
        int n = nums.length;
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += nums[i];
        }
        if (sum % 2 != 0) {
            return false;
        }
        
        return dfs(nums, 0, sum / 2);
    }

    public boolean dfs(int[] nums, int i, int target) {
        if (i == nums.length) {
            return target == 0;
        }
        if (target < 0) {
            return false;
        }

        return dfs(nums, i + 1, target) || 
               dfs(nums, i + 1, target - nums[i]);
    }
}
```

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }
        
        return dfs(nums, 0, sum / 2);
    }

    bool dfs(vector<int>& nums, int i, int target) {
        if (i == nums.size()) {
            return target == 0;
        }
        if (target < 0) {
            return false;
        }

        return dfs(nums, i + 1, target) || 
               dfs(nums, i + 1, target - nums[i]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canPartition(nums) {
        let sum = nums.reduce((a, b) => a + b, 0);
        if (sum % 2 !== 0) {
            return false;
        }
        
        return this.dfs(nums, 0, sum / 2);
    }

    /**
     * @params {number[]} nums
     * @params {number} i
     * @params {number} target
     * @return {boolean}
     */
    dfs(nums, i, target) {
        if (i === nums.length) {
            return target === 0;
        }
        if (target < 0) {
            return false;
        }

        return this.dfs(nums, i + 1, target) || 
               this.dfs(nums, i + 1, target - nums[i]);
    }
}
```

```csharp
public class Solution {
    public bool CanPartition(int[] nums) {
        int sum = 0;
        for (int i = 0; i < nums.Length; i++) {
            sum += nums[i];
        }
        if (sum % 2 != 0) {
            return false;
        }
        
        return Dfs(nums, 0, sum / 2);
    }

    public bool Dfs(int[] nums, int i, int target) {
        if (i == nums.Length) {
            return target == 0;
        }
        if (target < 0) {
            return false;
        }

        return Dfs(nums, i + 1, target) || 
               Dfs(nums, i + 1, target - nums[i]);
    }
}
```

```go
func canPartition(nums []int) bool {
    sum := 0
    for _, num := range nums {
        sum += num
    }
    if sum%2 != 0 {
        return false
    }
    
    target := sum / 2
    
    var dfs func(int, int) bool
    dfs = func(i int, target int) bool {
        if target == 0 {
            return true
        }
        if i >= len(nums) || target < 0 {
            return false
        }
        
        return dfs(i+1, target) || dfs(i+1, target-nums[i])
    }
    
    return dfs(0, target)
}
```

```kotlin
class Solution {
    fun canPartition(nums: IntArray): Boolean {
        val sum = nums.sum()
        if (sum % 2 != 0) {
            return false
        }
        
        val target = sum / 2
        
        fun dfs(i: Int, target: Int): Boolean {
            if (target == 0) {
                return true
            }
            if (i >= nums.size || target < 0) {
                return false
            }
            
            return dfs(i + 1, target) || dfs(i + 1, target - nums[i])
        }
        
        return dfs(0, target)
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
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2 != 0:
            return False
        
        target = total // 2
        n = len(nums)
        memo = [[-1] * (target + 1) for _ in range(n + 1)]

        def dfs(i, target):
            if target == 0:
                return True
            if i >= n or target < 0:
                return False
            if memo[i][target] != -1:
                return memo[i][target]
            
            memo[i][target] = (dfs(i + 1, target) or 
                               dfs(i + 1, target - nums[i]))
            return memo[i][target]

        return dfs(0, target)
```

```java
public class Solution {
    Boolean[][] memo;
    public boolean canPartition(int[] nums) {
        int n = nums.length;
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += nums[i];
        }
        if (sum % 2 != 0) {
            return false;
        }
        memo = new Boolean[n][sum / 2 + 1];
        
        return dfs(nums, 0, sum / 2);
    }

    public boolean dfs(int[] nums, int i, int target) {
        if (i == nums.length) {
            return target == 0;
        }
        if (target < 0) {
            return false;
        }
        if (memo[i][target] != null) {
            return memo[i][target];
        }

        memo[i][target] = dfs(nums, i + 1, target) || 
                          dfs(nums, i + 1, target - nums[i]);
        return memo[i][target];
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> memo;
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }
        memo.resize(nums.size(), vector<int>(sum / 2 + 1, -1));
        
        return dfs(nums, 0, sum / 2);
    }

    bool dfs(vector<int>& nums, int i, int target) {
        if (i == nums.size()) {
            return target == 0;
        }
        if (target < 0) {
            return false;
        }
        if (memo[i][target] != -1) {
            return memo[i][target];
        }

        memo[i][target] =  dfs(nums, i + 1, target) || 
                           dfs(nums, i + 1, target - nums[i]);
        return memo[i][target];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canPartition(nums) {
        let sum = nums.reduce((a, b) => a + b, 0);
        if (sum % 2 !== 0) {
            return false;
        }
        const n = nums.length;
        this.memo = Array.from(Array(n + 1), () => 
                     Array(sum / 2 + 1).fill(null));
        
        return this.dfs(nums, 0, sum / 2);
    }

    /**
     * @params {number[]} nums
     * @params {number} i
     * @params {number} target
     * @return {boolean}
     */
    dfs(nums, i, target) {
        if (i === nums.length) {
            return target === 0;
        }
        if (target < 0) {
            return false;
        }
        if (this.memo[i][target] != null) {
            return this.memo[i][target];
        }

        this.memo[i][target] =  this.dfs(nums, i + 1, target) || 
                                this.dfs(nums, i + 1, target - nums[i]);
        return this.memo[i][target];
    }
}
```

```csharp
public class Solution {
    private bool?[,] memo;

    public bool CanPartition(int[] nums) {
        int sum = 0;
        for (int i = 0; i < nums.Length; i++) {
            sum += nums[i];
        }
        if (sum % 2 != 0) {
            return false;
        }

        memo = new bool?[nums.Length + 1, sum / 2 + 1];
        return Dfs(nums, 0, sum / 2);
    }

    public bool Dfs(int[] nums, int i, int target) {
        if (target == 0) {
            return true;
        }
        if (i == nums.Length || target < 0) {
            return false;
        }
        if (memo[i, target] != null) {
            return memo[i, target] == true;
        }

        bool result = Dfs(nums, i + 1, target) || 
                      Dfs(nums, i + 1, target - nums[i]);

        memo[i, target] = result;
        return result;
    }
}
```

```go
func canPartition(nums []int) bool {
    total := 0
    for _, num := range nums {
        total += num
    }
    if total%2 != 0 {
        return false
    }
    
    target := total / 2
    n := len(nums)
    memo := make([][]int, n+1)
    for i := range memo {
        memo[i] = make([]int, target+1)
        for j := range memo[i] {
            memo[i][j] = -1
        }
    }

    var dfs func(int, int) bool
    dfs = func(i, target int) bool {
        if target == 0 {
            return true
        }
        if i >= n || target < 0 {
            return false
        }
        if memo[i][target] != -1 {
            return memo[i][target] == 1
        }
        
        found := dfs(i+1, target) || dfs(i+1, target-nums[i])
        if found {
            memo[i][target] = 1
        } else {
            memo[i][target] = 0
        }
        
        return found
    }

    return dfs(0, target)
}
```

```kotlin
class Solution {
    fun canPartition(nums: IntArray): Boolean {
        val total = nums.sum()
        if (total % 2 != 0) return false
        
        val target = total / 2
        val n = nums.size
        val memo = Array(n + 1) { IntArray(target + 1) { -1 } }

        fun dfs(i: Int, target: Int): Boolean {
            if (target == 0) return true
            if (i >= n || target < 0) return false
            if (memo[i][target] != -1) return memo[i][target] == 1
            
            val found = dfs(i + 1, target) || dfs(i + 1, target - nums[i])
            memo[i][target] = if (found) 1 else 0
            
            return found
        }

        return dfs(0, target)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * target)$
* Space complexity: $O(n * target)$

> Where $n$ is the length of the array $nums$ and $target$ is the sum of array elements divided by 2.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2 != 0:
            return False

        target = total // 2
        n = len(nums)
        dp = [[False] * (target + 1) for _ in range(n + 1)]

        for i in range(n + 1):
            dp[i][0] = True

        for i in range(1, n + 1):
            for j in range(1, target + 1):
                if nums[i - 1] <= j:
                    dp[i][j] = (dp[i - 1][j] or 
                                dp[i - 1][j - nums[i - 1]])
                else:
                    dp[i][j] = dp[i - 1][j]

        return dp[n][target]
```

```java
public class Solution {
    public boolean canPartition(int[] nums) {
        int n = nums.length;
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }
        
        int target = sum / 2;
        boolean[][] dp = new boolean[n + 1][target + 1];

        for (int i = 0; i <= n; i++) {
            dp[i][0] = true;
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= target; j++) {
                if (nums[i - 1] <= j) {
                    dp[i][j] = dp[i - 1][j] || 
                               dp[i - 1][j - nums[i - 1]];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }

        return dp[n][target];
    }
}
```

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }
        
        int target = sum / 2;
        int n = nums.size();
        vector<vector<bool>> dp(n + 1, vector<bool>(target + 1, false));
        
        for (int i = 0; i <= n; i++) {
            dp[i][0] = true; 
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= target; j++) {
                if (nums[i - 1] <= j) {
                    dp[i][j] = dp[i - 1][j] || 
                               dp[i - 1][j - nums[i - 1]];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
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
     * @return {boolean}
     */
    canPartition(nums) {
        let sum = nums.reduce((a, b) => a + b, 0);
        if (sum % 2 !== 0) {
            return false;
        }
        const target = sum / 2;
        const n = nums.length;

        const dp = Array.from(Array(n + 1), () => 
                   Array(target + 1).fill(false));

        for (let i = 0; i <= n; i++) {
            dp[i][0] = true; 
        }

        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= target; j++) {
                if (nums[i - 1] <= j) {
                    dp[i][j] = dp[i - 1][j] || 
                               dp[i - 1][j - nums[i - 1]];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }

        return dp[n][target]; 
    }
}
```

```csharp
public class Solution {
    public bool CanPartition(int[] nums) {
        int sum = 0;
        foreach (var num in nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }

        int target = sum / 2;
        int n = nums.Length;

        bool[,] dp = new bool[n + 1, target + 1];

        for (int i = 0; i <= n; i++) {
            dp[i, 0] = true;
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= target; j++) {
                if (nums[i - 1] <= j) {
                    dp[i, j] = dp[i - 1, j] || 
                               dp[i - 1, j - nums[i - 1]];
                } else {
                    dp[i, j] = dp[i - 1, j];
                }
            }
        }

        return dp[n, target]; 
    }
}
```

```go
func canPartition(nums []int) bool {
    total := 0
    for _, num := range nums {
        total += num
    }
    if total%2 != 0 {
        return false
    }

    target := total / 2
    n := len(nums)
    dp := make([][]bool, n+1)
    for i := range dp {
        dp[i] = make([]bool, target+1)
    }

    for i := 0; i <= n; i++ {
        dp[i][0] = true
    }

    for i := 1; i <= n; i++ {
        for j := 1; j <= target; j++ {
            if nums[i-1] <= j {
                dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i-1]]
            } else {
                dp[i][j] = dp[i-1][j]
            }
        }
    }

    return dp[n][target]
}
```

```kotlin
class Solution {
    fun canPartition(nums: IntArray): Boolean {
        val total = nums.sum()
        if (total % 2 != 0) return false

        val target = total / 2
        val n = nums.size
        val dp = Array(n + 1) { BooleanArray(target + 1) }

        for (i in 0..n) {
            dp[i][0] = true
        }

        for (i in 1..n) {
            for (j in 1..target) {
                dp[i][j] = if (nums[i - 1] <= j) {
                    dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
                } else {
                    dp[i - 1][j]
                }
            }
        }

        return dp[n][target]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * target)$
* Space complexity: $O(n * target)$

> Where $n$ is the length of the array $nums$ and $target$ is the sum of array elements divided by 2.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        if sum(nums) % 2:
            return False

        target = sum(nums) // 2
        dp = [False] * (target + 1)
        nextDp = [False] * (target + 1)

        dp[0] = True 
        for i in range(len(nums)):
            for j in range(1, target + 1):
                if j >= nums[i]:
                    nextDp[j] = dp[j] or dp[j - nums[i]]
                else:
                    nextDp[j] = dp[j]
            dp, nextDp = nextDp, dp
            
        return dp[target]
```

```java
public class Solution {
    public boolean canPartition(int[] nums) {
        if (sum(nums) % 2 != 0) {
            return false;
        }

        int target = sum(nums) / 2;
        boolean[] dp = new boolean[target + 1];
        boolean[] nextDp = new boolean[target + 1];

        dp[0] = true;
        for (int i = 0; i < nums.length; i++) {
            for (int j = 1; j <= target; j++) {
                if (j >= nums[i]) {
                    nextDp[j] = dp[j] || dp[j - nums[i]];
                } else {
                    nextDp[j] = dp[j];
                }
            }
            boolean[] temp = dp;
            dp = nextDp;
            nextDp = temp;
        }
        
        return dp[target];
    }

    private int sum(int[] nums) {
        int total = 0;
        for (int num : nums) {
            total += num;
        }
        return total;
    }
}
```

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        if (sum(nums) % 2 != 0) {
            return false;
        }

        int target = sum(nums) / 2;
        vector<bool> dp(target + 1, false);
        vector<bool> nextDp(target + 1, false);

        dp[0] = true;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = 1; j <= target; j++) {
                if (j >= nums[i]) {
                    nextDp[j] = dp[j] || dp[j - nums[i]];
                } else {
                    nextDp[j] = dp[j];
                }
            }
            swap(dp, nextDp);
        }
        
        return dp[target];
    }

private:
    int sum(vector<int>& nums) {
        int total = 0;
        for (int num : nums) {
            total += num;
        }
        return total;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canPartition(nums) {
        if (nums.reduce((a, b) => a + b, 0) % 2) {
            return false;
        }

        const target = nums.reduce((a, b) => a + b, 0) / 2;
        let dp = Array(target + 1).fill(false);
        let nextDp = Array(target + 1).fill(false);

        dp[0] = true;
        for (let i = 0; i < nums.length; i++) {
            for (let j = 1; j <= target; j++) {
                if (j >= nums[i]) {
                    nextDp[j] = dp[j] || dp[j - nums[i]];
                } else {
                    nextDp[j] = dp[j];
                }
            }
            [dp, nextDp] = [nextDp, dp];
        }
        
        return dp[target];
    }
}
```

```csharp
public class Solution {
    public bool CanPartition(int[] nums) {
        if (Sum(nums) % 2 != 0) {
            return false;
        }

        int target = Sum(nums) / 2;
        bool[] dp = new bool[target + 1];
        bool[] nextDp = new bool[target + 1];

        dp[0] = true;
        for (int i = 0; i < nums.Length; i++) {
            for (int j = 1; j <= target; j++) {
                if (j >= nums[i]) {
                    nextDp[j] = dp[j] || dp[j - nums[i]];
                } else {
                    nextDp[j] = dp[j];
                }
            }
            bool[] temp = dp;
            dp = nextDp;
            nextDp = temp;
        }
        
        return dp[target];
    }

    private int Sum(int[] nums) {
        int total = 0;
        foreach (var num in nums) {
            total += num;
        }
        return total;
    }
}
```

```go
func canPartition(nums []int) bool {
    total := 0
    for _, num := range nums {
        total += num
    }
    if total%2 != 0 {
        return false
    }

    target := total / 2
    dp := make([]bool, target+1)
    nextDp := make([]bool, target+1)
    dp[0] = true

    for i := 0; i < len(nums); i++ {
        for j := 1; j <= target; j++ {
            if j >= nums[i] {
                nextDp[j] = dp[j] || dp[j-nums[i]]
            } else {
                nextDp[j] = dp[j]
            }
        }
        dp, nextDp = nextDp, dp
    }

    return dp[target]
}
```

```kotlin
class Solution {
    fun canPartition(nums: IntArray): Boolean {
        val total = nums.sum()
        if (total % 2 != 0) return false

        val target = total / 2
        var dp = BooleanArray(target + 1)
        var nextDp = BooleanArray(target + 1)
        dp[0] = true

        for (i in nums.indices) {
            for (j in 1..target) {
                nextDp[j] = if (j >= nums[i]) dp[j] || dp[j - nums[i]] else dp[j]
            }
            val temp = dp
            dp = nextDp
            nextDp = temp
        }

        return dp[target]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * target)$
* Space complexity: $O(target)$

> Where $n$ is the length of the array $nums$ and $target$ is the sum of array elements divided by 2.

---

## 5. Dynamic Programming (Hash Set)

::tabs-start

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        if sum(nums) % 2:
            return False

        dp = set()
        dp.add(0)
        target = sum(nums) // 2

        for i in range(len(nums) - 1, -1, -1):
            nextDP = set()
            for t in dp:
                if (t + nums[i]) == target:
                    return True
                nextDP.add(t + nums[i])
                nextDP.add(t)
            dp = nextDP
        return False
```

```java
public class Solution {
    public boolean canPartition(int[] nums) {
        if (Arrays.stream(nums).sum() % 2 != 0) {
            return false;
        }

        Set<Integer> dp = new HashSet<>();
        dp.add(0);
        int target = Arrays.stream(nums).sum() / 2;

        for (int i = nums.length - 1; i >= 0; i--) {
            Set<Integer> nextDP = new HashSet<>();
            for (int t : dp) {
                if (t + nums[i] == target) {
                    return true;
                }
                nextDP.add(t + nums[i]);
                nextDP.add(t);
            }
            dp = nextDP;
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }

        unordered_set<int> dp;
        dp.insert(0);
        int target = sum / 2;

        for (int i = nums.size() - 1; i >= 0; i--) {
            unordered_set<int> nextDP;
            for (int t : dp) {
                if (t + nums[i] == target) {
                    return true;
                }
                nextDP.insert(t + nums[i]);
                nextDP.insert(t);
            }
            dp = nextDP;
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
    canPartition(nums) {
        const sum = nums.reduce((acc, num) => acc + num, 0);
        if (sum % 2 !== 0) {
            return false;
        }

        let dp = new Set();
        dp.add(0);
        const target = sum / 2;

        for (let i = nums.length - 1; i >= 0; i--) {
            const nextDP = new Set();
            for (const t of dp) {
                if (t + nums[i] === target) {
                    return true;
                }
                nextDP.add(t + nums[i]);
                nextDP.add(t);
            }
            dp = nextDP;
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool CanPartition(int[] nums) {
        if (nums.Sum() % 2 != 0) {
            return false;
        }

        HashSet<int> dp = new HashSet<int>();
        dp.Add(0);
        int target = nums.Sum() / 2;

        for (int i = nums.Length - 1; i >= 0; i--) {
            HashSet<int> nextDP = new HashSet<int>();
            foreach (int t in dp) {
                if (t + nums[i] == target) {
                    return true;
                }
                nextDP.Add(t + nums[i]);
                nextDP.Add(t);
            }
            dp = nextDP;
        }
        return false;
    }
}
```

```go
func canPartition(nums []int) bool {
    total := 0
    for _, num := range nums {
        total += num
    }
    if total%2 != 0 {
        return false
    }

    target := total / 2
    dp := map[int]bool{0: true}

    for i := len(nums) - 1; i >= 0; i-- {
        nextDP := map[int]bool{}
        for t := range dp {
            if t+nums[i] == target {
                return true
            }
            nextDP[t+nums[i]] = true
            nextDP[t] = true
        }
        dp = nextDP
    }

    return false
}
```

```kotlin
class Solution {
    fun canPartition(nums: IntArray): Boolean {
        val total = nums.sum()
        if (total % 2 != 0) return false

        val target = total / 2
        var dp = hashSetOf(0)

        for (i in nums.size - 1 downTo 0) {
            val nextDP = HashSet<Int>()
            for (t in dp) {
                if (t + nums[i] == target) return true
                nextDP.add(t + nums[i])
                nextDP.add(t)
            }
            dp = nextDP
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * target)$
* Space complexity: $O(target)$

> Where $n$ is the length of the array $nums$ and $target$ is the sum of array elements divided by 2.

---

## 6. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        if sum(nums) % 2:
            return False

        target = sum(nums) // 2
        dp = [False] * (target + 1)

        dp[0] = True
        for num in nums:
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]
                
        return dp[target]
```

```java
public class Solution {
    public boolean canPartition(int[] nums) {
        if (sum(nums) % 2 != 0) {
            return false;
        }

        int target = sum(nums) / 2;
        boolean[] dp = new boolean[target + 1];

        dp[0] = true;
        for (int i = 0; i < nums.length; i++) {
            for (int j = target; j >= nums[i]; j--) {
                dp[j] = dp[j] || dp[j - nums[i]];
            }
        }
        
        return dp[target];
    }

    private int sum(int[] nums) {
        int total = 0;
        for (int num : nums) {
            total += num;
        }
        return total;
    }
}
```

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        if (sum(nums) % 2 != 0) {
            return false;
        }

        int target = sum(nums) / 2;
        vector<bool> dp(target + 1, false);

        dp[0] = true;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = target; j >= nums[i]; j--) {
                dp[j] = dp[j] || dp[j - nums[i]];
            }
        }
        
        return dp[target];
    }

private:
    int sum(vector<int>& nums) {
        int total = 0;
        for (int num : nums) {
            total += num;
        }
        return total;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canPartition(nums) {
        if (nums.reduce((a, b) => a + b, 0) % 2) {
            return false;
        }

        const target = nums.reduce((a, b) => a + b, 0) / 2;
        const dp = Array(target + 1).fill(false);

        dp[0] = true;
        for (let i = 0; i < nums.length; i++) {
            for (let j = target; j >= nums[i]; j--) {
                dp[j] = dp[j] || dp[j - nums[i]];
            }
        }
        
        return dp[target];
    }
}
```

```csharp
public class Solution {
    public bool CanPartition(int[] nums) {
        if (Sum(nums) % 2 != 0) {
            return false;
        }

        int target = Sum(nums) / 2;
        bool[] dp = new bool[target + 1];

        dp[0] = true;
        for (int i = 0; i < nums.Length; i++) {
            for (int j = target; j >= nums[i]; j--) {
                dp[j] = dp[j] || dp[j - nums[i]];
            }
        }
        
        return dp[target];
    }

    private int Sum(int[] nums) {
        int total = 0;
        foreach (var num in nums) {
            total += num;
        }
        return total;
    }
}
```

```go
func canPartition(nums []int) bool {
    total := 0
    for _, num := range nums {
        total += num
    }
    if total%2 != 0 {
        return false
    }

    target := total / 2
    dp := make([]bool, target+1)
    dp[0] = true

    for _, num := range nums {
        for j := target; j >= num; j-- {
            dp[j] = dp[j] || dp[j-num]
        }
    }

    return dp[target]
}
```

```kotlin
class Solution {
    fun canPartition(nums: IntArray): Boolean {
        val total = nums.sum()
        if (total % 2 != 0) return false

        val target = total / 2
        val dp = BooleanArray(target + 1)
        dp[0] = true

        for (num in nums) {
            for (j in target downTo num) {
                dp[j] = dp[j] || dp[j - num]
            }
        }

        return dp[target]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * target)$
* Space complexity: $O(target)$

> Where $n$ is the length of the array $nums$ and $target$ is the sum of array elements divided by 2.

---

## 7. Dynamic Programming (Bitset)

::tabs-start

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total = sum(nums)
        if total % 2 != 0:
            return False

        target = total // 2
        dp = 1 << 0
        
        for num in nums:
            dp |= dp << num
            
        return (dp & (1 << target)) != 0
```

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }
        
        int target = sum / 2;
        bitset<10001> dp; 
        dp[0] = 1;

        for (int num : nums) {
            dp |= dp << num;
        }

        return dp[target];
    }
};
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * target)$
* Space complexity: $O(target)$

> Where $n$ is the length of the array $nums$ and $target$ is the sum of array elements divided by 2.