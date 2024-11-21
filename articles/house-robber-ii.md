## 1. Recursion

::tabs-start

```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]
        def dfs(i, flag):
            if i >= len(nums) or (flag and i == len(nums) - 1):
                return 0
            
            return max(dfs(i + 1, flag), 
                       nums[i] + dfs(i + 2, flag or i == 0))
        return max(dfs(0, True), dfs(1, False))
```

```java
public class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        return Math.max(dfs(0, true, nums), dfs(1, false, nums));
    }
    
    private int dfs(int i, boolean flag, int[] nums) {
        if (i >= nums.length || (flag && i == nums.length - 1)) 
            return 0;

        return Math.max(dfs(i + 1, flag, nums), 
                        nums[i] + dfs(i + 2, flag || i == 0, nums));
    }
}
```

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        if (nums.size() == 1) return nums[0];
        return max(dfs(0, true, nums), dfs(1, false, nums));
    }

private:
    int dfs(int i, bool flag, vector<int>& nums) {
        if (i >= nums.size() || (flag && i == nums.size() - 1)) 
            return 0;

        return max(dfs(i + 1, flag, nums), 
                   nums[i] + dfs(i + 2, flag || i == 0, nums));
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
        if (nums.length === 1) return nums[0];

        const dfs = (i, flag) => {
            if (i >= nums.length || (flag && i === nums.length - 1)) 
                return 0;

            return Math.max(dfs(i + 1, flag), 
                            nums[i] + dfs(i + 2, flag || i === 0));
        }
        
        return Math.max(dfs(0, true), dfs(1, false));
    }
}
```

```csharp
public class Solution {
    public int Rob(int[] nums) {
        if (nums.Length == 1) return nums[0];
        return Math.Max(Dfs(0, true, nums), Dfs(1, false, nums));
    }
    
    private int Dfs(int i, bool flag, int[] nums) {
        if (i >= nums.Length || (flag && i == nums.Length - 1)) 
            return 0;

        return Math.Max(Dfs(i + 1, flag, nums), 
                        nums[i] + Dfs(i + 2, flag || i == 0, nums));
    }
}
```

```go
func rob(nums []int) int {
    if len(nums) == 1 {
        return nums[0]
    }
    var dfs func(i int, flag bool) int
    dfs = func(i int, flag bool) int {
        if i >= len(nums) || (flag && i == len(nums)-1) {
            return 0
        }
        return max(dfs(i+1, flag), nums[i] + dfs(i+2, flag || i == 0))
    }
    return max(dfs(0, true), dfs(1, false))
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
        if (n == 1) return nums[0]
        fun dfs(i: Int, flag: Boolean): Int {
            if (i >= nums.size || (flag && i == nums.size - 1)) {
                return 0
            }
            return maxOf(dfs(i + 1, flag), 
                         nums[i] + dfs(i + 2, flag || i == 0))
        }
        return maxOf(dfs(0, true), dfs(1, false))
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
        if len(nums) == 1:
            return nums[0]

        memo = [[-1] * 2 for _ in range(len(nums))]

        def dfs(i, flag):
            if i >= len(nums) or (flag and i == len(nums) - 1):
                return 0
            if memo[i][flag] != -1:
                return memo[i][flag]
            memo[i][flag] = max(dfs(i + 1, flag), 
                            nums[i] + dfs(i + 2, flag or (i == 0)))
            return memo[i][flag]

        return max(dfs(0, True), dfs(1, False))
```

```java
public class Solution {
    private int[][] memo;
    
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        
        memo = new int[nums.length][2];
        for (int i = 0; i < nums.length; i++) {
            memo[i][0] = -1;
            memo[i][1] = -1;
        }
        
        return Math.max(dfs(0, 1, nums), dfs(1, 0, nums));
    }
    
    private int dfs(int i, int flag, int[] nums) {
        if (i >= nums.length || (flag == 1 && i == nums.length - 1)) 
            return 0;
        if (memo[i][flag] != -1)
            return memo[i][flag];
        memo[i][flag] = Math.max(dfs(i + 1, flag, nums), 
                        nums[i] + dfs(i + 2, flag | (i == 0 ? 1 : 0), nums));
        return memo[i][flag];
    }
}
```

```cpp
class Solution {
    vector<vector<int>> memo;
    
public:
    int rob(vector<int>& nums) {
        if (nums.size() == 1) return nums[0];
        
        memo.resize(nums.size(), vector<int>(2, -1));
        return max(dfs(0, 1, nums), dfs(1, 0, nums));
    }

private:
    int dfs(int i, int flag, vector<int>& nums) {
        if (i >= nums.size() || (flag == 1 && i == nums.size() - 1)) 
            return 0;
        if (memo[i][flag] != -1) 
            return memo[i][flag];
        memo[i][flag] = max(dfs(i + 1, flag, nums), 
                        nums[i] + dfs(i + 2, flag | (i == 0 ? 1 : 0), nums));
        return memo[i][flag];
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
        if (nums.length === 1) return nums[0];

        const n = nums.length;
        const memo = Array.from({ length: n }, () => Array(2).fill(-1));

        const dfs = (i, flag) => {
            if (i >= n || (flag && (i === n - 1))) 
                return 0;
            if (memo[i][flag] !== -1) 
                return memo[i][flag];

            memo[i][flag] = Math.max(
                dfs(i + 1, flag), 
                nums[i] + dfs(i + 2, flag | (i === 0))
            );
            return memo[i][flag];
        }

        return Math.max(dfs(0, 1), dfs(1, 0));
    }
}
```

```csharp
public class Solution {
    private int[][] memo;

    public int Rob(int[] nums) {
        if (nums.Length == 1) return nums[0];
        
        memo = new int[nums.Length][];
        for (int i = 0; i < nums.Length; i++) {
            memo[i] = new int[] { -1, -1 };
        }
        
        return Math.Max(Dfs(0, 1, nums), Dfs(1, 0, nums));
    }

    private int Dfs(int i, int flag, int[] nums) {
        if (i >= nums.Length || (flag == 1 && i == nums.Length - 1)) 
            return 0;
        if (memo[i][flag] != -1) 
            return memo[i][flag];
        memo[i][flag] = Math.Max(Dfs(i + 1, flag, nums), 
                        nums[i] + Dfs(i + 2, flag | (i == 0 ? 1 : 0), nums));
        return memo[i][flag];
    }
}
```

```go
func rob(nums []int) int {
    if len(nums) == 1 {
        return nums[0]
    }
    memo := make([][2]int, len(nums))
    for i := range memo {
        memo[i][0] = -1
        memo[i][1] = -1
    }

    var dfs func(i, flag int) int
    dfs = func(i, flag int) int {
        if i >= len(nums) || (flag == 1 && i == len(nums)-1) {
            return 0
        }
        if memo[i][flag] != -1 {
            return memo[i][flag]
        }

        tmp := flag
        if i == 0 {
            tmp = 1
        }
        memo[i][flag] = max(dfs(i+1, flag), nums[i] + dfs(i+2, tmp))
        return memo[i][flag]
    }

    return max(dfs(0, 1), dfs(1, 0))
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
        if (nums.size == 1) return nums[0]
        val memo = Array(nums.size) { IntArray(2) { -1 } }

        fun dfs(i: Int, flag: Int): Int {
            if (i >= nums.size || (flag == 1 && i == nums.size - 1)) {
                return 0
            }
            if (memo[i][flag] != -1) {
                return memo[i][flag]
            }
            memo[i][flag] = maxOf(dfs(i + 1, flag), 
                                  nums[i] + dfs(i + 2, flag or if (i == 0) 1 else 0))
            return memo[i][flag]
        }

        return maxOf(dfs(0, 1), dfs(1, 0))
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
        if len(nums) == 1:
            return nums[0]
        return max(self.helper(nums[1:]), 
                   self.helper(nums[:-1]))
    
    def helper(self, nums: List[int]) -> int:
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
        if (nums.length == 1) return nums[0];

        return Math.max(helper(Arrays.copyOfRange(nums, 1, nums.length)),
                        helper(Arrays.copyOfRange(nums, 0, nums.length - 1)));
    }

    private int helper(int[] nums) {
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
    int rob(std::vector<int>& nums) {
        if (nums.size() == 1) return nums[0];

        return max(helper(vector<int>(nums.begin() + 1, nums.end())),
                        helper(vector<int>(nums.begin(), nums.end() - 1)));
    }

    int helper(vector<int> nums) {
        if (nums.empty()) return 0;
        if (nums.size() == 1) return nums[0];

        vector<int> dp(nums.size());
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);

        for (int i = 2; i < nums.size(); i++) {
            dp[i] = max(dp[i - 1], nums[i] + dp[i - 2]);
        }

        return dp.back();
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

        return Math.max(this.helper(nums.slice(1)),
                        this.helper(nums.slice(0, -1)));
    }

    /**
     * @param {number[]} nums
     * @return {number}
     */
    helper(nums) {
        if (nums.length === 0) return 0;
        if (nums.length === 1) return nums[0];

        const dp = new Array(nums.length);
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

        return Math.Max(Helper(nums[1..]), Helper(nums[..^1]));
    }

    private int Helper(int[] nums) {
        if (nums.Length == 0) return 0;
        if (nums.Length == 1) return nums[0];

        int[] dp = new int[nums.Length];
        dp[0] = nums[0];
        dp[1] = Math.Max(nums[0], nums[1]);

        for (int i = 2; i < nums.Length; i++) {
            dp[i] = Math.Max(dp[i - 1], nums[i] + dp[i - 2]);
        }

        return dp[^1];
    }
}
```

```go
func rob(nums []int) int {
    if len(nums) == 1 {
        return nums[0]
    }
    return max(helper(nums[1:]), helper(nums[:len(nums)-1]))
}

func helper(nums []int) int {
    if len(nums) == 0 {
        return 0
    }
    if len(nums) == 1 {
        return nums[0]
    }

    dp := make([]int, len(nums))
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])

    for i := 2; i < len(nums); i++ {
        dp[i] = max(dp[i-1], nums[i] + dp[i-2])
    }

    return dp[len(nums)-1]
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
        if (nums.size == 1) {
            return nums[0]
        }
        return max(helper(nums.copyOfRange(1, nums.size)), 
                   helper(nums.copyOfRange(0, nums.size - 1)))
    }

    fun helper(nums: IntArray): Int {
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
        return max(nums[0], self.helper(nums[1:]), 
                            self.helper(nums[:-1]))

    def helper(self, nums):
        rob1, rob2 = 0, 0

        for num in nums:
            newRob = max(rob1 + num, rob2)
            rob1 = rob2
            rob2 = newRob
        return rob2
```

```java
public class Solution {
    
    public int rob(int[] nums) {
        return Math.max(nums[0], 
               Math.max(helper(Arrays.copyOfRange(nums, 1, nums.length)), 
               helper(Arrays.copyOfRange(nums, 0, nums.length - 1))));
    }

    private int helper(int[] nums) {
        int rob1 = 0, rob2 = 0;

        for (int num : nums) {
            int newRob = Math.max(rob1 + num, rob2);
            rob1 = rob2;
            rob2 = newRob;
        }
        return rob2;
    }
}
```

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        vector<int> nums1(nums.begin() + 1, nums.end());
        vector<int> nums2(nums.begin(), nums.end() - 1);
        return max(nums[0],
               max(helper(nums1), helper(nums2)));
    }

private:
    int helper(vector<int>& nums) {
        int rob1 = 0, rob2 = 0;
        for (int num : nums) {
            int newRob = max(rob1 + num, rob2);
            rob1 = rob2;
            rob2 = newRob;
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
        return Math.max(
            nums[0],
            Math.max(
                this.helper(nums.slice(1)),
                this.helper(nums.slice(0, -1)),
            ),
        );
    }

    /**
     * @param {number[]} nums
     * @return {number}
     */
    helper(nums) {
        let rob1 = 0;
        let rob2 = 0;
        for (const num of nums) {
            const newRob = Math.max(rob1 + num, rob2);
            rob1 = rob2;
            rob2 = newRob;
        }
        return rob2;
    }
}
```

```csharp
public class Solution {
    
    public int Rob(int[] nums) {
        if (nums.Length == 1) 
            return nums[0];

        return Math.Max(Helper(nums[1..]), 
                        Helper(nums[..^1]));
    }

    private int Helper(int[] nums) {
        int rob1 = 0, rob2 = 0;
        foreach (int num in nums) {
            int newRob = Math.Max(rob1 + num, rob2);
            rob1 = rob2;
            rob2 = newRob;
        }
        return rob2;
    }
}
```

```go
func rob(nums []int) int {
    if len(nums) == 0 {
        return 0
    }
    return max(nums[0], max(helper(nums[1:]), 
                            helper(nums[:len(nums)-1])))
}

func helper(nums []int) int {
    rob1, rob2 := 0, 0

    for _, num := range nums {
        newRob := max(rob1+num, rob2)
        rob1 = rob2
        rob2 = newRob
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
        return maxOf(nums[0], 
            maxOf(helper(nums.copyOfRange(1, nums.size)), 
            helper(nums.copyOfRange(0, nums.size - 1))))
    }

    private fun helper(nums: IntArray): Int {
        var rob1 = 0
        var rob2 = 0

        for (num in nums) {
            val newRob = maxOf(rob1 + num, rob2)
            rob1 = rob2
            rob2 = newRob
        }
        return rob2
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$