## 1. Brute Force (Recursion)

### Intuition

This problem asks us to find the **maximum coins** we can collect by bursting balloons in the best possible order.

When we burst a balloon, the number of coins we gain depends on its **current neighbors**. Since bursting one balloon changes the neighbors of others, the order of bursting matters a lot.

A brute-force way to solve this is to **try every possible balloon as the last one to burst** in the current array:
- If we choose a balloon to burst now, we earn coins based on its left and right neighbors.
- Then the problem reduces to bursting the remaining balloons.

The recursive function represents:  
**“What is the maximum number of coins we can collect from the current list of balloons?”**

To simplify edge cases, we add `1` to both ends of the array so every balloon always has two neighbors.

---

### Algorithm

1. Add `1` to the beginning and end of the array to handle boundaries safely.
2. Define a recursive function `dfs(nums)`:
   - `nums` represents the current list of remaining balloons
3. If only the two boundary `1`s are left:
   - Return `0` since no real balloons remain
4. Initialize `maxCoins = 0`
5. For each balloon index `i` between the boundaries:
   - Calculate coins gained by bursting `nums[i]`:
     - `nums[i - 1] * nums[i] * nums[i + 1]`
   - Recursively compute the maximum coins from the remaining balloons:
     - Remove `nums[i]` and call `dfs` on the new list
   - Update `maxCoins` with the best result
6. Return `maxCoins` for the current configuration
7. Start the recursion with the full padded array and return the result

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

```swift
class Solution {
    func maxCoins(_ nums: [Int]) -> Int {
        var nums = [1] + nums + [1]

        func dfs(_ nums: [Int]) -> Int {
            if nums.count == 2 {
                return 0
            }

            var maxCoins = 0
            for i in 1..<(nums.count - 1) {
                let coins = nums[i - 1] * nums[i] * nums[i + 1] +
                            dfs(Array(nums[..<i]) + Array(nums[(i + 1)...]))
                maxCoins = max(maxCoins, coins)
            }
            return maxCoins
        }

        return dfs(nums)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n*2^n)$
- Space complexity: $O(n*2^n)$

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The brute-force recursion tries every possible bursting order, which repeats the same work many times.

A useful way to think about this problem is:  
instead of choosing the **first** balloon to burst, choose the **last** balloon to burst in a subarray.

Why this helps:
- If balloon `i` is the last one to burst between indices `l` and `r`, then at that moment:
  - everything inside `(l..r)` except `i` is already gone
  - the neighbors of `i` are fixed: `nums[l - 1]` on the left and `nums[r + 1]` on the right
- So the coins gained from bursting `i` last are:
  - `nums[l - 1] * nums[i] * nums[r + 1]`
- And the remaining work splits cleanly into two independent parts:
  - best coins from `(l..i-1)`
  - best coins from `(i+1..r)`

This creates overlapping subproblems, so we store results in a memo table (`dp`) keyed by `(l, r)`.

---

### Algorithm

1. Add `1` to both ends of the array to avoid boundary checks.
2. Use a memo table `dp` where:
   - `dp[(l, r)]` stores the maximum coins obtainable by bursting balloons in the range `[l, r]`
3. Define a recursive function `dfs(l, r)`:
   - If `l > r`, return `0` (no balloons to burst)
   - If `(l, r)` is already computed, return it
4. Try every balloon `i` in `[l, r]` as the **last balloon to burst**:
   - Coins from bursting `i` last:
     - `nums[l - 1] * nums[i] * nums[r + 1]`
   - Plus the best coins from the left side:
     - `dfs(l, i - 1)`
   - Plus the best coins from the right side:
     - `dfs(i + 1, r)`
   - Take the maximum over all choices of `i`
5. Store the best value in `dp[(l, r)]` and return it
6. The final answer is `dfs(1, len(nums) - 2)` (the original balloons, excluding the added boundaries)

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
            coins +=
                this.dfs(nums, l, i - 1, dp) + this.dfs(nums, i + 1, r, dp);
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

```swift
class Solution {
    func maxCoins(_ nums: [Int]) -> Int {
        var nums = [1] + nums + [1]
        let n = nums.count
        var dp = Array(repeating: Array(repeating: -1, count: n), count: n)

        func dfs(_ l: Int, _ r: Int) -> Int {
            if l > r {
                return 0
            }
            if dp[l][r] != -1 {
                return dp[l][r]
            }

            dp[l][r] = 0
            for i in l...r {
                let coins = nums[l - 1] * nums[i] * nums[r + 1] + dfs(l, i - 1) + dfs(i + 1, r)
                dp[l][r] = max(dp[l][r], coins)
            }
            return dp[l][r]
        }

        return dfs(1, n - 2)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We want the maximum coins we can get by bursting balloons in the best order.  
The key trick is to think in reverse:

Instead of choosing which balloon to burst first, we choose which balloon is **burst last** in a range.

If we are only looking at balloons between `l` and `r`, and balloon `i` is the last one burst in that range, then:
- all balloons inside `(l..r)` except `i` are already gone
- so the neighbors of `i` are fixed as `new_nums[l - 1]` and `new_nums[r + 1]`
- coins gained from bursting `i` last are:
  - `new_nums[l - 1] * new_nums[i] * new_nums[r + 1]`

After bursting `i` last, the remaining problem splits into two independent subproblems:
- best coins for `[l .. i-1]`
- best coins for `[i+1 .. r]`

This makes the problem perfect for interval DP.

---

### Algorithm

1. Create a new array `new_nums = [1] + nums + [1]` to handle boundaries easily.
2. Let `dp[l][r]` represent the maximum coins we can collect by bursting balloons from index `l` to `r` (inside `new_nums`).
3. Initialize `dp` with zeros since empty ranges give 0 coins.
4. Fill the DP table by increasing interval size:
   - iterate `l` from `n` down to `1`
   - iterate `r` from `l` up to `n`
5. For each interval `[l, r]`, try every balloon `i` in `[l, r]` as the **last** balloon to burst:
   - coins from bursting `i` last:
     - `new_nums[l - 1] * new_nums[i] * new_nums[r + 1]`
   - plus the best coins from the left sub-interval:
     - `dp[l][i - 1]`
   - plus the best coins from the right sub-interval:
     - `dp[i + 1][r]`
   - take the maximum over all `i`
6. The final answer is stored in `dp[1][n]`, representing bursting all original balloons.

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

```swift
class Solution {
    func maxCoins(_ nums: [Int]) -> Int {
        let n = nums.count
        var newNums = [1] + nums + [1]

        var dp = Array(repeating: Array(repeating: 0, count: n + 2), count: n + 2)

        for l in stride(from: n, through: 1, by: -1) {
            for r in l...n {
                for i in l...r {
                    let coins = (newNums[l - 1] * newNums[i] * newNums[r + 1]) +
                                dp[l][i - 1] + dp[i + 1][r]
                    dp[l][r] = max(dp[l][r], coins)
                }
            }
        }

        return dp[1][n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^3)$
- Space complexity: $O(n^2)$
