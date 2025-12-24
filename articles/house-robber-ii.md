## 1. Recursion

### Intuition
This is **House Robber II**, where houses are in a **circle**.  
So the **first and last house cannot both be robbed**.

To handle the circular constraint, we split the problem into **two linear cases**:
1. **Rob from house 0 to n-2** (exclude last house)
2. **Rob from house 1 to n-1** (exclude first house)

The recursive function explores:
- **Skip the current house**
- **Rob the current house** and jump two steps ahead

A flag is used to ensure that **if the first house is robbed, the last house is not allowed**.

Finally, we take the **maximum result from the two cases**.

### Algorithm
1. If there is only one house, return its value.
2. Define a recursive function that:
   - Stops when index goes out of bounds
   - Prevents robbing the last house if the first was robbed
   - Chooses the max of:
     - skipping the current house
     - robbing the current house and moving two steps ahead
3. Run recursion in two scenarios:
   - Start from index `0` (first house considered)
   - Start from index `1` (first house skipped)
4. Return the maximum of both results.

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
            if (i >= nums.length || (flag && i === nums.length - 1)) return 0;

            return Math.max(
                dfs(i + 1, flag),
                nums[i] + dfs(i + 2, flag || i === 0),
            );
        };

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

```swift
class Solution {
    func rob(_ nums: [Int]) -> Int {
        if nums.count == 1 {
            return nums[0]
        }

        func dfs(_ i: Int, _ flag: Bool) -> Int {
            if i >= nums.count || (flag && i == nums.count - 1) {
                return 0
            }
            return max(dfs(i + 1, flag), nums[i] + dfs(i + 2, flag || i == 0))
        }

        return max(dfs(0, true), dfs(1, false))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

### Intuition
This is **House Robber II (circular houses)** with **Top-Down DP**.

Because houses form a **circle**, the **first and last houses cannot both be robbed**.  
We handle this by tracking a **flag** that tells us whether the **first house was robbed**.

At each house, we have two choices:
- **Skip the house**
- **Rob the house** (then skip the next one)

Memoization is used so each state `(index, flag)` is solved only once.

### Algorithm
1. If there is only one house, return its value.
2. Use a DP table `memo[index][flag]`:
   - `index` → current house
   - `flag` → whether the first house was robbed
3. Define a recursive function:
   - Stop if index is out of bounds
   - Stop if trying to rob the last house while the first was already robbed
4. At each step, compute:
   - Max of skipping the house
   - Robbing the house and jumping two steps
5. Run two cases:
   - Start from house `0` (first house included)
   - Start from house `1` (first house excluded)
6. Return the maximum of both cases.

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
            if (i >= n || (flag && i === n - 1)) return 0;
            if (memo[i][flag] !== -1) return memo[i][flag];

            memo[i][flag] = Math.max(
                dfs(i + 1, flag),
                nums[i] + dfs(i + 2, flag | (i === 0)),
            );
            return memo[i][flag];
        };

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

```swift
class Solution {
    func rob(_ nums: [Int]) -> Int {
        if nums.count == 1 {
            return nums[0]
        }

        var memo = Array(repeating: Array(repeating: -1, count: 2), count: nums.count)

        func dfs(_ i: Int, _ flag: Bool) -> Int {
            if i >= nums.count || (flag && i == nums.count - 1) {
                return 0
            }
            if memo[i][flag ? 1 : 0] != -1 {
                return memo[i][flag ? 1 : 0]
            }

            memo[i][flag ? 1 : 0] = max(
                dfs(i + 1, flag), nums[i] + dfs(i + 2, flag || i == 0)
            )

            return memo[i][flag ? 1 : 0]
        }

        return max(dfs(0, true), dfs(1, false))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition
This is **House Robber II (circular houses)** solved using **Bottom-Up Dynamic Programming**.

Because houses are in a **circle**, you **cannot rob both the first and last house**.  
So we split the problem into **two linear cases**:
- Rob houses from **index 1 to n-1** (exclude first house)
- Rob houses from **index 0 to n-2** (exclude last house)

Each case becomes the normal **House Robber I** problem.

### Algorithm
1. If there is only one house, return its value.
2. Solve two cases:
   - Case 1: Rob houses `nums[1:]`
   - Case 2: Rob houses `nums[:-1]`
3. For each case, use bottom-up DP:
   - `dp[i]` = maximum money up to house `i`
   - Transition:
     ```
     dp[i] = max(dp[i-1], nums[i] + dp[i-2])
     ```
4. Return the **maximum** of both cases.

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

        return Math.max(
            this.helper(nums.slice(1)),
            this.helper(nums.slice(0, -1)),
        );
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

```swift
class Solution {
    func rob(_ nums: [Int]) -> Int {
        if nums.count == 1 {
            return nums[0]
        }
        return max(helper(Array(nums[1...])), helper(Array(nums[..<(nums.count - 1)])))
    }

    func helper(_ nums: [Int]) -> Int {
        if nums.isEmpty {
            return 0
        }
        if nums.count == 1 {
            return nums[0]
        }

        var dp = [Int](repeating: 0, count: nums.count)
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])

        for i in 2..<nums.count {
            dp[i] = max(dp[i - 1], nums[i] + dp[i - 2])
        }

        return dp.last!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition
This is **House Robber II**, where houses are arranged in a **circle**.  
Because of the circular setup, **you cannot rob both the first and last house**.

To handle this, split the problem into **two linear subproblems**:
1. Rob houses **excluding the first house**.
2. Rob houses **excluding the last house**.

Each subproblem becomes the classic **House Robber I**, which can be solved using **two variables** instead of a full DP array.

### Algorithm
1. If there is only one house, return its value.
2. Compute the maximum money for:
   - Houses `nums[1:]` (skip first)
   - Houses `nums[:-1]` (skip last)
3. For each linear list:
   - Maintain two variables:
     - `rob1` → best up to house `i-2`
     - `rob2` → best up to house `i-1`
   - For each house:
     ```
     newRob = max(rob1 + current_house, rob2)
     rob1 = rob2
     rob2 = newRob
     ```
4. Return the maximum of the two cases.

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

```swift
class Solution {
    func rob(_ nums: [Int]) -> Int {
        if nums.isEmpty {
            return 0
        }
        if nums.count == 1 {
            return nums[0]
        }

        let candidate1 = nums[0]
        let candidate2 = helper(Array(nums[1..<nums.count]))
        let candidate3 = helper(Array(nums[0..<(nums.count - 1)]))

        return max(max(candidate1, candidate2), candidate3)
    }

    func helper(_ nums: [Int]) -> Int {
        var rob1 = 0
        var rob2 = 0

        for num in nums {
            let newRob = max(rob1 + num, rob2)
            rob1 = rob2
            rob2 = newRob
        }

        return rob2
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
