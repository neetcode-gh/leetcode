## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        n, res = len(nums), nums[0]
        for i in range(n):
            cur = 0
            for j in range(i, n):
                cur += nums[j]
                res = max(res, cur)
        return res
```

```java
public class Solution {
    public int maxSubArray(int[] nums) {
        int n = nums.length, res = nums[0];
        for (int i = 0; i < n; i++) {
            int cur = 0;
            for (int j = i; j < n; j++) {
                cur += nums[j];
                res = Math.max(res, cur);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int n = nums.size(), res = nums[0];
        for (int i = 0; i < n; i++) {
            int cur = 0;
            for (int j = i; j < n; j++) {
                cur += nums[j];
                res = max(res, cur);
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
     * @return {number}
     */
    maxSubArray(nums) {
        let n = nums.length, res = nums[0];
        for (let i = 0; i < n; i++) {
            let cur = 0;
            for (let j = i; j < n; j++) {
                cur += nums[j];
                res = Math.max(res, cur);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxSubArray(int[] nums) {
        int n = nums.Length, res = nums[0];
        for (int i = 0; i < n; i++) {
            int cur = 0;
            for (int j = i; j < n; j++) {
                cur += nums[j];
                res = Math.Max(res, cur);
            }
        }
        return res;
    }
}
```

```go
func maxSubArray(nums []int) int {
    n := len(nums)
    res := nums[0]

    for i := 0; i < n; i++ {
        cur := 0
        for j := i; j < n; j++ {
            cur += nums[j]
            if cur > res {
                res = cur
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxSubArray(nums: IntArray): Int {
        val n = nums.size
        var res = nums[0]

        for (i in 0 until n) {
            var cur = 0
            for (j in i until n) {
                cur += nums[j]
                res = maxOf(res, cur)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Recursion

::tabs-start

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        def dfs(i, flag):
            if i == len(nums):
                return 0 if flag else -1e6
            if flag:
                return max(0, nums[i] + dfs(i + 1, True))
            return max(dfs(i + 1, False), nums[i] + dfs(i + 1, True))
        return dfs(0, False)
```

```java
public class Solution {
    public int maxSubArray(int[] nums) {
        return dfs(nums, 0, false);
    }

    private int dfs(int[] nums, int i, boolean flag) {
        if (i == nums.length) {
            return flag ? 0 : (int) -1e6;
        }
        if (flag) {
            return Math.max(0, nums[i] + dfs(nums, i + 1, true));
        }
        return Math.max(dfs(nums, i + 1, false), 
                        nums[i] + dfs(nums, i + 1, true));
    }
}
```

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        return dfs(nums, 0, false);
    }

private:
    int dfs(vector<int>& nums, int i, bool flag) {
        if (i == nums.size()) return flag ? 0 : -1e6;
        if (flag) return max(0, nums[i] + dfs(nums, i + 1, true));
        return max(dfs(nums, i + 1, false), 
                   nums[i] + dfs(nums, i + 1, true));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        const dfs = (i, flag) => {
            if (i === nums.length) return flag ? 0 : -1e6;
            if (flag) return Math.max(0, nums[i] + dfs(i + 1, true));
            return Math.max(dfs(i + 1, false), 
                            nums[i] + dfs(i + 1, true));
        };
        return dfs(0, false);
    }
}
```

```csharp
public class Solution {
    public int MaxSubArray(int[] nums) {
        return Dfs(nums, 0, false);
    }

    private int Dfs(int[] nums, int i, bool flag) {
        if (i == nums.Length) return flag ? 0 : (int)-1e6;
        if (flag) return Math.Max(0, nums[i] + Dfs(nums, i + 1, true));
        return Math.Max(Dfs(nums, i + 1, false), 
                        nums[i] + Dfs(nums, i + 1, true));
    }
}
```

```go
func maxSubArray(nums []int) int {
    var dfs func(i int, flag bool) int
    dfs = func(i int, flag bool) int {
        if i == len(nums) {
            if flag {
                return 0
            }
            return -1e6 
        }
        if flag {
            return max(0, nums[i] + dfs(i + 1, true))
        }
        return max(dfs(i + 1, false), nums[i] + dfs(i + 1, true))
    }

    return dfs(0, false)
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
    fun maxSubArray(nums: IntArray): Int {
        fun dfs(i: Int, flag: Boolean): Int {
            if (i == nums.size) {
                return if (flag) 0 else Int.MIN_VALUE
            }
            return if (flag) {
                maxOf(0, nums[i] + dfs(i + 1, true))
            } else {
                maxOf(dfs(i + 1, false), nums[i] + dfs(i + 1, true))
            }
        }

        return dfs(0, false)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ n)$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        memo = [[None] * 2 for _ in range(len(nums) + 1)]

        def dfs(i, flag):
            if i == len(nums):
                return 0 if flag else -1e6
            if memo[i][flag] is not None:
                return memo[i][flag]
            if flag:
                memo[i][flag] = max(0, nums[i] + dfs(i + 1, True))
            else:
                memo[i][flag] = max(dfs(i + 1, False), 
                                    nums[i] + dfs(i + 1, True))
            return memo[i][flag]

        return dfs(0, False)
```

```java
public class Solution {
    private int[][] memo;

    public int maxSubArray(int[] nums) {
        memo = new int[nums.length + 1][2];
        for (int[] row : memo) Arrays.fill(row, Integer.MIN_VALUE);
        return dfs(nums, 0, false);
    }

    private int dfs(int[] nums, int i, boolean flag) {
        if (i == nums.length) return flag ? 0 : (int) -1e6;
        int f = flag ? 1 : 0;
        if (memo[i][f] != Integer.MIN_VALUE) return memo[i][f];
        memo[i][f] = flag ? Math.max(0, nums[i] + dfs(nums, i + 1, true))
                          : Math.max(dfs(nums, i + 1, false), 
                                     nums[i] + dfs(nums, i + 1, true));
        return memo[i][f];
    }
}
```

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        vector<vector<int>> memo(nums.size() + 1, vector<int>(2, INT_MIN));
        return dfs(nums, 0, false, memo);
    }
    
private:
    int dfs(vector<int>& nums, int i, bool flag, vector<vector<int>>& memo) {
        if (i == nums.size()) return flag ? 0 : -1e6;
        int f = flag ? 1 : 0;
        if (memo[i][f] != INT_MIN) return memo[i][f];
        if (flag)
            memo[i][f] = max(0, nums[i] + dfs(nums, i + 1, true, memo));
        else
            memo[i][f] = max(dfs(nums, i + 1, false, memo), 
                             nums[i] + dfs(nums, i + 1, true, memo));
        return memo[i][f];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        const memo = Array(nums.length + 1).fill(null).map(
            () => [null, null]
        );

        const dfs = (i, flag) => {
            if (i === nums.length) return flag ? 0 : -1e6;
            if (memo[i][+flag] !== null) return memo[i][+flag];
            memo[i][+flag] = flag ? Math.max(0, nums[i] + dfs(i + 1, true))
                                : Math.max(dfs(i + 1, false), 
                                           nums[i] + dfs(i + 1, true));
            return memo[i][+flag];
        }
        return dfs(0, false);
    }
}
```

```csharp
public class Solution {
    private int[,] memo;

    public int MaxSubArray(int[] nums) {
        memo = new int[nums.Length + 1, 2];
        for (int i = 0; i <= nums.Length; i++) {
            memo[i, 0] = memo[i, 1] = int.MinValue;
        }
        return Dfs(nums, 0, false);
    }

    private int Dfs(int[] nums, int i, bool flag) {
        if (i == nums.Length) return flag ? 0 : -1000000;
        int f = flag ? 1 : 0;
        if (memo[i, f] != int.MinValue) return memo[i, f];
        memo[i, f] = flag ? Math.Max(0, nums[i] + Dfs(nums, i + 1, true))
                          : Math.Max(Dfs(nums, i + 1, false), 
                                     nums[i] + Dfs(nums, i + 1, true));
        return memo[i, f];
    }
}
```

```go
func maxSubArray(nums []int) int {
    memo := make([][2]*int, len(nums)+1)
    for i := range memo {
        memo[i] = [2]*int{nil, nil}
    }

    var dfs func(int, int) int
    dfs = func(i, flag int) int {
        if i == len(nums) {
            if flag == 1 {
                return 0
            }
            return -1000000
        }
        if memo[i][flag] != nil {
            return *memo[i][flag]
        }
        if flag == 1 {
            result := max(0, nums[i]+dfs(i+1, 1))
            memo[i][flag] = &result
        } else {
            result := max(dfs(i+1, 0), nums[i]+dfs(i+1, 1))
            memo[i][flag] = &result
        }
        return *memo[i][flag]
    }

    return dfs(0, 0)
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
    fun maxSubArray(nums: IntArray): Int {
        val memo = Array(nums.size + 1) { arrayOfNulls<Int>(2) }

        fun dfs(i: Int, flag: Int): Int {
            if (i == nums.size) {
                return if (flag == 1) 0 else -1000000
            }
            if (memo[i][flag] != null) {
                return memo[i][flag]!!
            }
            memo[i][flag] = if (flag == 1) {
                maxOf(0, nums[i] + dfs(i + 1, 1))
            } else {
                maxOf(dfs(i + 1, 0), nums[i] + dfs(i + 1, 1))
            }
            return memo[i][flag]!!
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [[0] * 2 for _ in range(n)]
        dp[n - 1][1] = dp[n - 1][0] = nums[n - 1]
        for i in range(n - 2, -1, -1):
            dp[i][1] = max(nums[i], nums[i] + dp[i + 1][1])
            dp[i][0] = max(dp[i + 1][0], dp[i][1])
        
        return dp[0][0]
```

```java
public class Solution {
    public int maxSubArray(int[] nums) {
        int n = nums.length;
        int[][] dp = new int[n + 1][2];
        
        dp[n - 1][1] = dp[n - 1][0] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            dp[i][1] = Math.max(nums[i], nums[i] + dp[i + 1][1]);
            dp[i][0] = Math.max(dp[i + 1][0], dp[i][1]);
        }
        
        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));
        
        dp[n - 1][1] = dp[n - 1][0] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            dp[i][1] = max(nums[i], nums[i] + dp[i + 1][1]);
            dp[i][0] = max(dp[i + 1][0], dp[i][1]);
        }
        
        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        const n = nums.length;
        const dp = Array.from({ length: n + 1 }, () => Array(2).fill(0));
        
        dp[n - 1][1] = dp[n - 1][0] = nums[n - 1];
        for (let i = n - 2; i >= 0; i--) {
            dp[i][1] = Math.max(nums[i], nums[i] + dp[i + 1][1]);
            dp[i][0] = Math.max(dp[i + 1][0], dp[i][1]);
        }
        
        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int MaxSubArray(int[] nums) {
        int n = nums.Length;
        int[,] dp = new int[n + 1, 2];
        
        dp[n - 1, 1] = dp[n - 1, 0] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            dp[i, 1] = Math.Max(nums[i], nums[i] + dp[i + 1, 1]);
            dp[i, 0] = Math.Max(dp[i + 1, 0], dp[i, 1]);
        }
        
        return dp[0, 0];
    }
}
```

```go
func maxSubArray(nums []int) int {
    n := len(nums)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, 2)
    }
    
    dp[n-1][1] = nums[n-1]
    dp[n-1][0] = nums[n-1]
    
    for i := n-2; i >= 0; i-- {
        dp[i][1] = max(nums[i], nums[i] + dp[i+1][1])
        dp[i][0] = max(dp[i+1][0], dp[i][1])
    }
    
    return dp[0][0]
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
    fun maxSubArray(nums: IntArray): Int {
        val n = nums.size
        val dp = Array(n) { IntArray(2) }
        
        dp[n-1][1] = nums[n-1]
        dp[n-1][0] = nums[n-1]
        
        for (i in n-2 downTo 0) {
            dp[i][1] = maxOf(nums[i], nums[i] + dp[i+1][1])
            dp[i][0] = maxOf(dp[i+1][0], dp[i][1])
        }
        
        return dp[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 5. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def maxSubArray(self, nums):
        dp = [*nums]
        for i in range(1, len(nums)):
            dp[i] = max(nums[i], nums[i] + dp[i - 1])
        return max(dp)
```

```java
public class Solution {
    public int maxSubArray(int[] nums) {
        int[] dp = nums.clone();
        for (int i = 1; i < nums.length; i++) {
            dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
        }
        int maxSum = dp[0];
        for (int sum : dp) {
            maxSum = Math.max(maxSum, sum);
        }
        return maxSum;
    }
}
```

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        vector<int> dp(nums);
        for (int i = 1; i < nums.size(); i++) {
            dp[i] = max(nums[i], nums[i] + dp[i - 1]);
        }
        return *max_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        let dp = [...nums];
        for (let i = 1; i < nums.length; i++) {
            dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
        }
        return Math.max(...dp);
    }
}
```

```csharp
public class Solution {
    public int MaxSubArray(int[] nums) {
        int[] dp = (int[])nums.Clone();
        for (int i = 1; i < nums.Length; i++) {
            dp[i] = Math.Max(nums[i], nums[i] + dp[i - 1]);
        }
        int maxSum = dp[0];
        foreach (int sum in dp) {
            maxSum = Math.Max(maxSum, sum);
        }
        return maxSum;
    }
}
```

```go
func maxSubArray(nums []int) int {
    dp := make([]int, len(nums))
    copy(dp, nums)
    
    for i := 1; i < len(nums); i++ {
        dp[i] = max(nums[i], nums[i] + dp[i-1])
    }
    
    maxSum := dp[0]
    for _, v := range dp {
        if v > maxSum {
            maxSum = v
        }
    }
    
    return maxSum
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
    fun maxSubArray(nums: IntArray): Int {
        val dp = nums.copyOf()
        
        for (i in 1 until nums.size) {
            dp[i] = maxOf(nums[i], nums[i] + dp[i-1])
        }
        
        return dp.maxOrNull() ?: nums[0]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 6. Kadane's Algorithm

::tabs-start

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        maxSub, curSum = nums[0], 0
        for num in nums:
            if curSum < 0:
                curSum = 0
            curSum += num
            maxSub = max(maxSub, curSum)
        return maxSub

```

```java
public class Solution {
    public int maxSubArray(int[] nums) {
        int maxSub = nums[0], curSum = 0;
        for (int num : nums) {
            if (curSum < 0) {
                curSum = 0;
            }
            curSum += num;
            maxSub = Math.max(maxSub, curSum);
        }
        return maxSub;
    }
}
```

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSub = nums[0], curSum = 0;
        for (int num : nums) {
            if (curSum < 0) {
                curSum = 0;
            }
            curSum += num;
            maxSub = max(maxSub, curSum);
        }
        return maxSub;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        let maxSub = nums[0], curSum = 0;
        for (const num of nums) {
            if (curSum < 0) {
                curSum = 0;
            }
            curSum += num;
            maxSub = Math.max(maxSub, curSum);
        }
        return maxSub;
    }
}
```

```csharp
public class Solution {
    public int MaxSubArray(int[] nums) {
        int maxSub = nums[0], curSum = 0;
        foreach (int num in nums) {
            if (curSum < 0) {
                curSum = 0;
            }
            curSum += num;
            maxSub = Math.Max(maxSub, curSum);
        }
        return maxSub;
    }
}
```

```go
func maxSubArray(nums []int) int {
    maxSub, curSum := nums[0], 0
    for _, num := range nums {
        if curSum < 0 {
            curSum = 0
        }
        curSum += num
        maxSub = max(maxSub, curSum)
    }
    return maxSub
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
    fun maxSubArray(nums: IntArray): Int {
        var maxSub = nums[0]
        var curSum = 0
        for (num in nums) {
            if (curSum < 0) {
                curSum = 0
            }
            curSum += num
            maxSub = maxOf(maxSub, curSum)
        }
        return maxSub
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 7. Divide & Conquer

::tabs-start

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        def dfs(l, r):
            if l > r:
                return float("-inf")

            m = (l + r) >> 1
            leftSum = rightSum = curSum = 0
            for i in range(m - 1, l - 1, -1):
                curSum += nums[i]
                leftSum = max(leftSum, curSum)

            curSum = 0
            for i in range(m + 1, r + 1):
                curSum += nums[i]
                rightSum = max(rightSum, curSum)

            return (max(dfs(l, m - 1), 
                        dfs(m + 1, r), 
                        leftSum + nums[m] + rightSum))
                        
        return dfs(0, len(nums) - 1)
```

```java
public class Solution {
    public int maxSubArray(int[] nums) {
        return dfs(nums, 0, nums.length - 1);
    }
    
    private int dfs(int[] nums, int l, int r) {
        if (l > r) {
            return Integer.MIN_VALUE;
        }
        int m = (l + r) >> 1;
        int leftSum = 0, rightSum = 0, curSum = 0;
        for (int i = m - 1; i >= l; i--) {
            curSum += nums[i];
            leftSum = Math.max(leftSum, curSum);
        }

        curSum = 0;
        for (int i = m + 1; i <= r; i++) {
            curSum += nums[i];
            rightSum = Math.max(rightSum, curSum);
        }

        return Math.max(dfs(nums, l, m - 1), 
                        Math.max(dfs(nums, m + 1, r), 
                             leftSum + nums[m] + rightSum));
    }
}
```

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        return dfs(nums, 0, nums.size() - 1);
    }

private:
    int dfs(vector<int>& nums, int l, int r) {
        if (l > r) {
            return INT_MIN;
        }
        int m = (l + r) >> 1;
        int leftSum = 0, rightSum = 0, curSum = 0;
        for (int i = m - 1; i >= l; --i) {
            curSum += nums[i];
            leftSum = max(leftSum, curSum);
        }
        curSum = 0;
        for (int i = m + 1; i <= r; ++i) {
            curSum += nums[i];
            rightSum = max(rightSum, curSum);
        }
        return max(dfs(nums, l, m - 1), 
                   max(dfs(nums, m + 1, r), 
                       leftSum + nums[m] + rightSum));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubArray(nums) {
        const dfs = (l, r) => {
            if (l > r) {
                return -Infinity;
            }
            let m = (l + r) >> 1;
            let leftSum = 0, rightSum = 0, curSum = 0;
            for (let i = m - 1; i >= l; i--) {
                curSum += nums[i];
                leftSum = Math.max(leftSum, curSum);
            }

            curSum = 0;
            for (let i = m + 1; i <= r; i++) {
                curSum += nums[i];
                rightSum = Math.max(rightSum, curSum);
            }
            return Math.max(dfs(l, m - 1), 
                        Math.max(dfs(m + 1, r), 
                            leftSum + nums[m] + rightSum));
        }
        
        return dfs(0, nums.length - 1);
    }
}
```

```csharp
public class Solution {
     public int MaxSubArray(int[] nums) {
        return Dfs(nums, 0, nums.Length - 1);
    }
    
    private int Dfs(int[] nums, int l, int r) {
        if (l > r) {
            return int.MinValue;
        }
        int m = (l + r) >> 1;
        int leftSum = 0, rightSum = 0, curSum = 0;
        for (int i = m - 1; i >= l; i--) {
            curSum += nums[i];
            leftSum = Math.Max(leftSum, curSum);
        }

        curSum = 0;
        for (int i = m + 1; i <= r; i++) {
            curSum += nums[i];
            rightSum = Math.Max(rightSum, curSum);
        }

        return Math.Max(Dfs(nums, l, m - 1), 
                        Math.Max(Dfs(nums, m + 1, r), 
                             leftSum + nums[m] + rightSum));
    }
}
```

```go
func maxSubArray(nums []int) int {
    var dfs func(l, r int) int
    dfs = func(l, r int) int {
        if l > r {
            return math.MinInt64
        }
        
        m := (l + r) >> 1
        leftSum, rightSum, curSum := 0, 0, 0
        
        for i := m - 1; i >= l; i-- {
            curSum += nums[i]
            if curSum > leftSum {
                leftSum = curSum
            }
        }
        
        curSum = 0
        for i := m + 1; i <= r; i++ {
            curSum += nums[i]
            if curSum > rightSum {
                rightSum = curSum
            }
        }
        
        maxLeft := dfs(l, m-1)
        maxRight := dfs(m+1, r)
        crossSum := leftSum + nums[m] + rightSum
        
        return max(max(maxLeft, maxRight), crossSum)
    }
    
    return dfs(0, len(nums)-1)
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
    fun maxSubArray(nums: IntArray): Int {
        fun dfs(l: Int, r: Int): Int {
            if (l > r) {
                return Int.MIN_VALUE
            }
            
            val m = (l + r) shr 1
            var leftSum = 0
            var rightSum = 0
            var curSum = 0
            
            for (i in (m - 1) downTo l) {
                curSum += nums[i]
                leftSum = maxOf(leftSum, curSum)
            }
            
            curSum = 0
            for (i in (m + 1)..r) {
                curSum += nums[i]
                rightSum = maxOf(rightSum, curSum)
            }
            
            return maxOf(
                dfs(l, m - 1),
                dfs(m + 1, r),
                leftSum + nums[m] + rightSum
            )
        }
        
        return dfs(0, nums.size - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(\log n)$