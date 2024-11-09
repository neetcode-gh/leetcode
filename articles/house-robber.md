## 1. Recursion

::tabs-start

```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        
        def dfs(i):
            if i >= len(nums):
                return 0
            return max(dfs(i + 1),
                       nums[i] + dfs(i + 2))
        
        return dfs(0)
```

```java
public class Solution {
    public int rob(int[] nums) {
        return dfs(nums, 0);
    }

    private int dfs(int[] nums, int i) {
        if (i >= nums.length) {
            return 0;
        }
        return Math.max(dfs(nums, i + 1),
                        nums[i] + dfs(nums, i + 2));
    }
}
```

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        return dfs(nums, 0);
    }

    int dfs(vector<int>& nums, int i) {
        if (i >= nums.size()) {
            return 0;
        }
        return max(dfs(nums, i + 1),
                   nums[i] + dfs(nums, i + 2));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        
        const dfs = (i) => {
            if (i >= nums.length) {
                return 0;
            }
            return Math.max(dfs(i + 1), 
                            nums[i] + dfs(i + 2));
        }
        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public int Rob(int[] nums) {
        return Dfs(nums, 0);
    }

    private int Dfs(int[] nums, int i) {
        if (i >= nums.Length) {
            return 0;
        }
        return Math.Max(Dfs(nums, i + 1),
               nums[i] + Dfs(nums, i + 2));
    }
}
```

```go
func rob(nums []int) int {
    var dfs func(i int) int
    dfs = func(i int) int {
        if i >= len(nums) {
            return 0
        }
        return max(dfs(i+1), nums[i] + dfs(i+2))
    }

    return dfs(0)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun rob(nums: IntArray): Int {
        val n = nums.size
        fun dfs(i: Int): Int {
            if (i >= n) return 0
            return maxOf(dfs(i + 1), nums[i] + dfs(i + 2))
        }
        return dfs(0)
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
    def rob(self, nums: List[int]) -> int:
        memo = [-1] * len(nums)

        def dfs(i):
            if i >= len(nums):
                return 0
            if memo[i] != -1:
                return memo[i]
            memo[i] = max(dfs(i + 1), nums[i] + dfs(i + 2))
            return memo[i]
        
        return dfs(0)
```

```java
public class Solution {
    private int[] memo;

    public int rob(int[] nums) {
        memo = new int[nums.length];
        Arrays.fill(memo, -1);
        return dfs(nums, 0);
    }

    private int dfs(int[] nums, int i) {
        if (i >= nums.length) {
            return 0;
        }
        if (memo[i] != -1) {
            return memo[i];
        }
        memo[i] = Math.max(dfs(nums, i + 1), 
                         nums[i] + dfs(nums, i + 2));
        return memo[i];
    }
}
```

```cpp
class Solution {
public:
    vector<int> memo;
    
    int rob(vector<int>& nums) {
        memo.resize(nums.size(), -1);
        return dfs(nums, 0);
    }

    int dfs(vector<int>& nums, int i) {
        if (i >= nums.size()) {
            return 0;
        }
        if (memo[i] != -1) {
            return memo[i];
        }
        memo[i] = max(dfs(nums, i + 1),
                    nums[i] + dfs(nums, i + 2));
        return memo[i];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        const memo = new Int32Array(nums.length).fill(-1);
        const dfs = (i) => {
            if (i >= nums.length) {
                return 0;
            }
            if (memo[i] !== -1) {
                return memo[i];
            }
            return memo[i] = Math.max(dfs(i + 1), 
                            nums[i] + dfs(i + 2));
        }
        return dfs(0);
    }
}
```

```csharp
public class Solution {
    private int[] memo;

    public int Rob(int[] nums) {
        memo = new int[nums.Length];
        for (int i = 0; i < nums.Length; i++) {
            memo[i] = -1;
        }
        return Dfs(nums, 0);
    }

    private int Dfs(int[] nums, int i) {
        if (i >= nums.Length) {
            return 0;
        }
        if (memo[i] != -1) {
            return memo[i];
        }
        memo[i] = Math.Max(Dfs(nums, i + 1),
                         nums[i] + Dfs(nums, i + 2));
        return memo[i];
    }
}
```

```go
func rob(nums []int) int {
    n := len(nums)
    memo := make([]int, n+1)
    for i := 0; i <= n; i++ {
        memo[i] = -1
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if i >= len(nums) {
            return 0
        }
        if memo[i] != -1 {
            return memo[i]
        }
        memo[i] = max(dfs(i+1), nums[i] + dfs(i+2))
        return memo[i]
    }

    return dfs(0)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun rob(nums: IntArray): Int {
        val n = nums.size
        var memo = IntArray(n+1){-1}
        fun dfs(i: Int): Int {
            if (i >= n) return 0
            if (memo[i] != -1) return memo[i]
            memo[i] = maxOf(dfs(i + 1), nums[i] + dfs(i + 2))
            return memo[i]
        }
        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]
        
        dp = [0] * len(nums)
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])
        
        for i in range(2, len(nums)):
            dp[i] = max(dp[i - 1], nums[i] + dp[i - 2])
        
        return dp[-1]
```

```java
public class Solution {
    public int rob(int[] nums) {
        if (nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];

        int[] dp = new int[nums.length];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);

        for (int i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
        }

        return dp[nums.length - 1];
    }
}
```

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        if (nums.empty()) return 0;
        if (nums.size() == 1) return nums[0];

        vector<int> dp(nums.size());
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);

        for (int i = 2; i < nums.size(); i++) {
            dp[i] = max(dp[i - 1], nums[i] + dp[i - 2]);
        }

        return dp[nums.size() - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        if (nums.length === 0) return 0;
        if (nums.length === 1) return nums[0];

        const dp = new Array(nums.length).fill(0);
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);

        for (let i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
        }

        return dp[nums.length - 1];
    }
}
```

```csharp
public class Solution {
    public int Rob(int[] nums) {
        if (nums.Length == 0) return 0;
        if (nums.Length == 1) return nums[0];

        int[] dp = new int[nums.Length];
        dp[0] = nums[0];
        dp[1] = Math.Max(nums[0], nums[1]);

        for (int i = 2; i < nums.Length; i++) {
            dp[i] = Math.Max(dp[i - 1], nums[i] + dp[i - 2]);
        }

        return dp[nums.Length - 1];
    }
}
```

```go
func rob(nums []int) int {
    n := len(nums)
    if n == 0 {
        return 0
    }
    if n == 1 {
        return nums[0]
    }

    dp := make([]int, n)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])

    for i := 2; i < n; i++ {
        dp[i] = max(dp[i-1], nums[i] + dp[i-2])
    }

    return dp[n-1]
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun rob(nums: IntArray): Int {
        if (nums.isEmpty()) {
            return 0
        }
        if (nums.size == 1) {
            return nums[0]
        }

        val dp = IntArray(nums.size)
        dp[0] = nums[0]
        dp[1] = maxOf(nums[0], nums[1])

        for (i in 2 until nums.size) {
            dp[i] = maxOf(dp[i - 1], nums[i] + dp[i - 2])
        }

        return dp[nums.size - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        rob1, rob2 = 0, 0

        for num in nums:
            temp = max(num + rob1, rob2)
            rob1 = rob2
            rob2 = temp
        return rob2
```

```java
public class Solution {
    public int rob(int[] nums) {
        int rob1 = 0, rob2 = 0;

        for (int num : nums) {
            int temp = Math.max(num + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
}
```

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int rob1 = 0, rob2 = 0;

        for (int num : nums) {
            int temp = max(num + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        let rob1 = 0;
        let rob2 = 0;

        for (const num of nums) {
            const temp = Math.max(num + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
}
```

```csharp
public class Solution {
    public int Rob(int[] nums) {
        int rob1 = 0, rob2 = 0;

        foreach (int num in nums) {
            int temp = Math.Max(num + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
}
```

```go
func rob(nums []int) int {
    rob1, rob2 := 0, 0
    for _, num := range nums {
        temp := max(num+rob1, rob2)
        rob1 = rob2
        rob2 = temp
    }
    return rob2
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun rob(nums: IntArray): Int {
        var rob1 = 0
        var rob2 = 0
        for (num in nums) {
            val temp = maxOf(num + rob1, rob2)
            rob1 = rob2
            rob2 = temp
        }
        return rob2
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$