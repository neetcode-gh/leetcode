## 1. Dynamic Programming (Top-Down)

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
class Solution {
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
        return dfs(newNums, 1, n, dp);
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
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function(nums) {
    let n = nums.length;
    let newNums = new Array(n + 2).fill(1);
    for (let i = 0; i < n; i++) {
        newNums[i + 1] = nums[i];
    }

    let dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(-1));
    return dfs(newNums, 1, n, dp);
};

/**
 * @param {number[]} nums
 * @param {number} l
 * @param {number} r
 * @param {number[][]} dp
 * @return {number}
 */
var dfs = function(nums, l, r, dp) {
    if (l > r) return 0;
    if (dp[l][r] !== -1) return dp[l][r];

    dp[l][r] = 0;
    for (let i = l; i <= r; i++) {
        let coins = nums[l - 1] * nums[i] * nums[r + 1];
        coins += dfs(nums, l, i - 1, dp) + dfs(nums, i + 1, r, dp);
        dp[l][r] = Math.max(dp[l][r], coins);
    }
    return dp[l][r];
};
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

        return Dfs(newNums, 1, n, dp);
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n^3)$
* Space complexity: $O(n^2)$

---

## 2. Dynamic Programming (Bottom-Up)

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
class Solution {
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
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function(nums) {
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
};
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n^3)$
* Space complexity: $O(n^2)$
