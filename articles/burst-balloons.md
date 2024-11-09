## 1. Brute Force (Recursion)

::tabs-start

```python
class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        nums = [1] + nums + [1]

        def dfs(nums):
            if len(nums) == 2:
                return 0

            maxCoins = 0
            for i in range(1, len(nums) - 1):
                coins = nums[i - 1] * nums[i] * nums[i + 1]
                coins += dfs(nums[:i] + nums[i + 1:])
                maxCoins = max(maxCoins, coins)
            return maxCoins

        return dfs(nums)
```

```java
public class Solution {
    public int maxCoins(int[] nums) {
        int[] newNums = new int[nums.length + 2];
        newNums[0] = newNums[nums.length + 1] = 1;
        for (int i = 0; i < nums.length; i++) {
            newNums[i + 1] = nums[i];
        }

        return dfs(newNums);
    }

    public int dfs(int[] nums) {
        if (nums.length == 2) {
            return 0;
        }

        int maxCoins = 0;
        for (int i = 1; i < nums.length - 1; i++) {
            int coins = nums[i - 1] * nums[i] * nums[i + 1];
            int[] newNums = new int[nums.length - 1];
            for (int j = 0, k = 0; j < nums.length; j++) {
                if (j != i) {
                    newNums[k++] = nums[j];
                }
            }
            coins += dfs(newNums);
            maxCoins = Math.max(maxCoins, coins);
        }
        return maxCoins;
    }
}
```

```cpp
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        nums.insert(nums.begin(), 1);
        nums.push_back(1);

        return dfs(nums);
    }

    int dfs(vector<int>& nums) {
        if (nums.size() == 2) return 0;

        int maxCoins = 0;
        for (int i = 1; i < nums.size() - 1; i++) {
            int coins = nums[i - 1] * nums[i] * nums[i + 1];
            vector<int> newNums = nums;
            newNums.erase(newNums.begin() + i);
            coins += dfs(newNums);
            maxCoins = max(maxCoins, coins);
        }
        return maxCoins;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxCoins(nums) {
        nums.unshift(1);
        nums.push(1);
        return this.dfs(nums);
    }

    /**
     * @param {number[]} nums
     * @return {number}
     */
    dfs(nums) {
        if (nums.length === 2) return 0;

        let maxCoins = 0;
        for (let i = 1; i < nums.length - 1; i++) {
            let coins = nums[i - 1] * nums[i] * nums[i + 1];
            let newNums = nums.slice(0, i).concat(nums.slice(i + 1));
            coins += this.dfs(newNums);
            maxCoins = Math.max(maxCoins, coins);
        }
        return maxCoins;
    }
}
```

```csharp
public class Solution {
    public int MaxCoins(int[] nums) {
        List<int> newNums = new List<int> {1};
        newNums.AddRange(nums);
        newNums.Add(1);

        return Dfs(newNums);
    }

    public int Dfs(List<int> nums) {
        if (nums.Count == 2) return 0;

        int maxCoins = 0;
        for (int i = 1; i < nums.Count - 1; i++) {
            int coins = nums[i - 1] * nums[i] * nums[i + 1];
            List<int> newNums = new List<int>(nums);
            newNums.RemoveAt(i);
            coins += Dfs(newNums);
            maxCoins = Math.Max(maxCoins, coins);
        }
        return maxCoins;
    }
}
```

```go
func maxCoins(nums []int) int {
    nums = append([]int{1}, nums...)
    nums = append(nums, 1)

    var dfs func(nums []int) int
    dfs = func(nums []int) int {
        if len(nums) == 2 {
            return 0
        }

        maxCoins := 0
        for i := 1; i < len(nums)-1; i++ {
            coins := nums[i-1] * nums[i] * nums[i+1]
            coins += dfs(append(append([]int{}, nums[:i]...), nums[i+1:]...))
            if coins > maxCoins {
                maxCoins = coins
            }
        }
        return maxCoins
    }

    return dfs(nums)
}
```

```kotlin
class Solution {
    fun maxCoins(nums: IntArray): Int {
        val newNums = intArrayOf(1) + nums + intArrayOf(1)

        fun dfs(nums: IntArray): Int {
            if (nums.size == 2) {
                return 0
            }

            var maxCoins = 0
            for (i in 1 until nums.size - 1) {
                val coins = nums[i - 1] * nums[i] * nums[i + 1]
                val nextCoins = dfs(nums.take(i).toIntArray() + 
                                    nums.drop(i + 1).toIntArray())
                maxCoins = maxOf(maxCoins, coins + nextCoins)
            }
            return maxCoins
        }

        return dfs(newNums)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n*2^n)$
* Space complexity: $O(n*2^n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        nums = [1] + nums + [1]
        dp = {}
        def dfs(l, r):
            if l > r:
                return 0
            if (l, r) in dp:
                return dp[(l, r)]

            dp[(l, r)] = 0
            for i in range(l, r + 1):
                coins = nums[l - 1] * nums[i] * nums[r + 1]
                coins += dfs(l, i - 1) + dfs(i + 1, r)
                dp[(l, r)] = max(dp[(l, r)], coins)
            return dp[(l, r)]

        return dfs(1, len(nums) - 2)
```

```java
public class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length;
        int[] newNums = new int[n + 2];
        newNums[0] = newNums[n + 1] = 1;
        for (int i = 0; i < n; i++) {
            newNums[i + 1] = nums[i];
        }

        int[][] dp = new int[n + 2][n + 2];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= n; j++) {
                dp[i][j] = -1;
            }
        }

        return dfs(newNums, 1, newNums.length - 2, dp);
    }

    public int dfs(int[] nums, int l, int r, int[][] dp) {
        if (l > r) {
            return 0;
        }
        if (dp[l][r] != -1) {
            return dp[l][r];
        }

        dp[l][r] = 0;
        for (int i = l; i <= r; i++) {
            int coins = nums[l - 1] * nums[i] * nums[r + 1];
            coins += dfs(nums, l, i - 1, dp) + dfs(nums, i + 1, r, dp);
            dp[l][r] = Math.max(dp[l][r], coins);
        }
        return dp[l][r];
    }
}
```

```cpp
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> newNums(n + 2, 1);
        for (int i = 0; i < n; i++) {
            newNums[i + 1] = nums[i];
        }

        vector<vector<int>> dp(n + 2, vector<int>(n + 2, -1));
        return dfs(newNums, 1, newNums.size() - 2, dp);
    }

    int dfs(vector<int>& nums, int l, int r, vector<vector<int>>& dp) {
        if (l > r) return 0;
        if (dp[l][r] != -1) return dp[l][r];

        dp[l][r] = 0;
        for (int i = l; i <= r; i++) {
            int coins = nums[l - 1] * nums[i] * nums[r + 1];
            coins += dfs(nums, l, i - 1, dp) + dfs(nums, i + 1, r, dp);
            dp[l][r] = max(dp[l][r], coins);
        }
        return dp[l][r];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxCoins(nums) {
        let n = nums.length;
        let newNums = new Array(n + 2).fill(1);
        for (let i = 0; i < n; i++) {
            newNums[i + 1] = nums[i];
        }

        let dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(-1));
        return this.dfs(newNums, 1, newNums.length - 2, dp);
    }

    /**
     * @param {number[]} nums
     * @param {number} l
     * @param {number} r
     * @param {number[][]} dp
     * @return {number}
     */
    dfs(nums, l, r, dp) {
        if (l > r) return 0;
        if (dp[l][r] !== -1) return dp[l][r];

        dp[l][r] = 0;
        for (let i = l; i <= r; i++) {
            let coins = nums[l - 1] * nums[i] * nums[r + 1];
            coins += this.dfs(nums, l, i - 1, dp) + this.dfs(nums, i + 1, r, dp);
            dp[l][r] = Math.max(dp[l][r], coins);
        }
        return dp[l][r];
    }
}
```

```csharp
public class Solution {
    public int MaxCoins(int[] nums) {
        int n = nums.Length;
        int[] newNums = new int[n + 2];
        newNums[0] = newNums[n + 1] = 1;
        for (int i = 0; i < n; i++) {
            newNums[i + 1] = nums[i];
        }

        int[,] dp = new int[n + 2, n + 2];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= n; j++) {
                dp[i, j] = -1;
            }
        }

        return Dfs(newNums, 1, newNums.Length - 2, dp);
    }

    public int Dfs(int[] nums, int l, int r, int[,] dp) {
        if (l > r) return 0;
        if (dp[l, r] != -1) return dp[l, r];

        dp[l, r] = 0;
        for (int i = l; i <= r; i++) {
            int coins = nums[l - 1] * nums[i] * nums[r + 1];
            coins += Dfs(nums, l, i - 1, dp) + Dfs(nums, i + 1, r, dp);
            dp[l, r] = Math.Max(dp[l, r], coins);
        }
        return dp[l, r];
    }
}
```

```go
func maxCoins(nums []int) int {
    nums = append([]int{1}, nums...)
    nums = append(nums, 1)
    n := len(nums)

    dp := make([][]int, n)
    for i := 0; i < n; i++ {
        dp[i] = make([]int, n)
    }

    var dfs func(l, r int) int
    dfs = func(l, r int) int {
        if l > r {
            return 0
        }
        if dp[l][r] > 0 {
            return dp[l][r]
        }

        dp[l][r] = 0
        for i := l; i <= r; i++ {
            coins := nums[l-1] * nums[i] * nums[r+1]
            coins += dfs(l, i-1) + dfs(i+1, r)
            dp[l][r] = max(dp[l][r], coins)
        }
        return dp[l][r]
    }

    return dfs(1, len(nums)-2)
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
    fun maxCoins(nums: IntArray): Int {
        val newNums = intArrayOf(1) + nums + intArrayOf(1)
        val n = newNums.size
        val dp = Array(n) { IntArray(n) }

        fun dfs(l: Int, r: Int): Int {
            if (l > r) return 0
            if (dp[l][r] > 0) return dp[l][r]

            dp[l][r] = 0
            for (i in l..r) {
                val coins = newNums[l - 1] * newNums[i] * newNums[r + 1]
                val totalCoins = coins + dfs(l, i - 1) + dfs(i + 1, r)
                dp[l][r] = maxOf(dp[l][r], totalCoins)
            }
            return dp[l][r]
        }

        return dfs(1, newNums.size - 2)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 3)$
* Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def maxCoins(self, nums):
        n = len(nums)
        new_nums = [1] + nums + [1]

        dp = [[0] * (n + 2) for _ in range(n + 2)]
        for l in range(n, 0, -1):
            for r in range(l, n + 1):
                for i in range(l, r + 1):
                    coins = new_nums[l - 1] * new_nums[i] * new_nums[r + 1]
                    coins += dp[l][i - 1] + dp[i + 1][r]
                    dp[l][r] = max(dp[l][r], coins)

        return dp[1][n]
```

```java
public class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length;
        int[] newNums = new int[n + 2];
        newNums[0] = newNums[n + 1] = 1;
        for (int i = 0; i < n; i++) {
            newNums[i + 1] = nums[i];
        }

        int[][] dp = new int[n + 2][n + 2];
        for (int l = n; l >= 1; l--) {
            for (int r = l; r <= n; r++) {
                for (int i = l; i <= r; i++) {
                    int coins = newNums[l - 1] * newNums[i] * newNums[r + 1];
                    coins += dp[l][i - 1] + dp[i + 1][r];
                    dp[l][r] = Math.max(dp[l][r], coins);
                }
            }
        }

        return dp[1][n];
    }
}
```

```cpp
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> newNums(n + 2, 1);
        for (int i = 0; i < n; i++) {
            newNums[i + 1] = nums[i];
        }

        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        for (int l = n; l >= 1; l--) {
            for (int r = l; r <= n; r++) {
                for (int i = l; i <= r; i++) {
                    int coins = newNums[l - 1] * newNums[i] * newNums[r + 1];
                    coins += dp[l][i - 1] + dp[i + 1][r];
                    dp[l][r] = max(dp[l][r], coins);
                }
            }
        }

        return dp[1][n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxCoins(nums) {
        let n = nums.length;
        let newNums = new Array(n + 2).fill(1);
        for (let i = 0; i < n; i++) {
            newNums[i + 1] = nums[i];
        }

        let dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(0));
        for (let l = n; l >= 1; l--) {
            for (let r = l; r <= n; r++) {
                for (let i = l; i <= r; i++) {
                    let coins = newNums[l - 1] * newNums[i] * newNums[r + 1];
                    coins += dp[l][i - 1] + dp[i + 1][r];
                    dp[l][r] = Math.max(dp[l][r], coins);
                }
            }
        }

        return dp[1][n];
    }
}
```

```csharp
public class Solution {
    public int MaxCoins(int[] nums) {
        int n = nums.Length;
        int[] newNums = new int[n + 2];
        newNums[0] = newNums[n + 1] = 1;
        for (int i = 0; i < n; i++) {
            newNums[i + 1] = nums[i];
        }

        int[,] dp = new int[n + 2, n + 2];
        for (int l = n; l >= 1; l--) {
            for (int r = l; r <= n; r++) {
                for (int i = l; i <= r; i++) {
                    int coins = newNums[l - 1] * newNums[i] * newNums[r + 1];
                    coins += dp[l, i - 1] + dp[i + 1, r];
                    dp[l, r] = Math.Max(dp[l, r], coins);
                }
            }
        }

        return dp[1, n];
    }
}
```

```go
func maxCoins(nums []int) int {
    n := len(nums)
    newNums := append([]int{1}, nums...)
    newNums = append(newNums, 1)

    dp := make([][]int, n+2)
    for i := range dp {
        dp[i] = make([]int, n+2)
    }

    for l := n; l >= 1; l-- {
        for r := l; r <= n; r++ {
            for i := l; i <= r; i++ {
                coins := newNums[l-1] * newNums[i] * newNums[r+1]
                coins += dp[l][i-1] + dp[i+1][r]
                dp[l][r] = max(dp[l][r], coins)
            }
        }
    }

    return dp[1][n]
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
    fun maxCoins(nums: IntArray): Int {
        val n = nums.size
        val newNums = intArrayOf(1) + nums + intArrayOf(1)

        val dp = Array(n + 2) { IntArray(n + 2) }

        for (l in n downTo 1) {
            for (r in l..n) {
                for (i in l..r) {
                    val coins = newNums[l - 1] * newNums[i] * newNums[r + 1]
                    dp[l][r] = maxOf(dp[l][r], coins + dp[l][i - 1] + dp[i + 1][r])
                }
            }
        }

        return dp[1][n]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n^3)$
* Space complexity: $O(n^2)$