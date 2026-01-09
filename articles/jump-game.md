## 1. Recursion

### Intuition

This problem asks whether we can reach the **last index** of the array starting from the first index.

At every position `i`, the value `nums[i]` tells us the **maximum jump length** from that index.
So from index `i`, we can jump to **any index between `i + 1` and `i + nums[i]`**.

Using recursion, we try **all possible jumps** from the current index and see if **any path** eventually reaches the last index.

The recursive function represents:
**"Is it possible to reach the last index starting from index `i`?"**

If we ever reach the last index, we know the answer is `true`.

### Algorithm

1. Define a recursive function `dfs(i)`:
   - `i` is the current index
2. If `i` is already at the last index:
   - Return `true`
3. Compute the farthest index we can jump to from `i`:
   - `end = min(last_index, i + nums[i])`
4. Try all possible next positions from `i + 1` to `end`:
   - Recursively call `dfs(j)`
   - If any call returns `true`, return `true`
5. If none of the jumps lead to the end:
   - Return `false`
6. Start the recursion from index `0`
7. Return the final result

::tabs-start

```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        def dfs(i):
            if i == len(nums) - 1:
                return True
            end = min(len(nums) - 1, i + nums[i])
            for j in range(i + 1, end + 1):
                if dfs(j):
                    return True
            return False

        return dfs(0)
```

```java
public class Solution {
    public boolean canJump(int[] nums) {
        return dfs(nums, 0);
    }

    private boolean dfs(int[] nums, int i) {
        if (i == nums.length - 1) {
            return true;
        }
        int end = Math.min(nums.length - 1, i + nums[i]);
        for (int j = i + 1; j <= end; j++) {
            if (dfs(nums, j)) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        return dfs(nums, 0);
    }

private:
    bool dfs(vector<int>& nums, int i) {
        if (i == nums.size() - 1) {
            return true;
        }
        int end = min((int)nums.size() - 1, i + nums[i]);
        for (int j = i + 1; j <= end; ++j) {
            if (dfs(nums, j)) {
                return true;
            }
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
    canJump(nums) {
        const dfs = (i) => {
            if (i === nums.length - 1) {
                return true;
            }
            const end = Math.min(nums.length - 1, i + nums[i]);
            for (let j = i + 1; j <= end; j++) {
                if (dfs(j)) {
                    return true;
                }
            }
            return false;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public bool CanJump(int[] nums) {
        return Dfs(nums, 0);
    }

    private bool Dfs(int[] nums, int i) {
        if (i == nums.Length - 1) {
            return true;
        }
        int end = Math.Min(nums.Length - 1, i + nums[i]);
        for (int j = i + 1; j <= end; j++) {
            if (Dfs(nums, j)) {
                return true;
            }
        }
        return false;
    }
}
```

```go
func canJump(nums []int) bool {
    var dfs func(i int) bool
    dfs = func(i int) bool {
        if i == len(nums)-1 {
            return true
        }

        end := min(len(nums)-1, i+nums[i])
        for j := i + 1; j <= end; j++ {
            if dfs(j) {
                return true
            }
        }
        return false
    }

    return dfs(0)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun canJump(nums: IntArray): Boolean {
        fun dfs(i: Int): Boolean {
            if (i == nums.size - 1) {
                return true
            }

            val end = minOf(nums.size - 1, i + nums[i])
            for (j in (i + 1)..end) {
                if (dfs(j)) {
                    return true
                }
            }
            return false
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func canJump(_ nums: [Int]) -> Bool {

        func dfs(_ i: Int) -> Bool {
            if i == nums.count - 1 {
                return true
            }

            let end = min(nums.count - 1, i + nums[i])
            for j in i + 1..<(end + 1) {
                if dfs(j) {
                    return true
                }
            }
            return false
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n!)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

### Intuition

This problem asks whether we can reach the **last index** of the array starting from index `0`.

At each index `i`, the value `nums[i]` tells us how far we can jump. From there, we can choose **any next index within that jump range**.

The plain recursive approach explores all possible jumps, but it repeats the same work many times.
To avoid this, we use **top-down dynamic programming (memoization)**.

The recursive function represents:
**"Can we reach the last index starting from index `i`?"**

Once we know the answer for an index, we store it so we never recompute it.

### Algorithm

1. Create a memo map `memo`:
   - `memo[i]` stores whether the last index is reachable from index `i`
2. Define a recursive function `dfs(i)`:
   - `i` is the current index
3. If `i` is already in `memo`:
   - Return the stored result
4. If `i` is the last index:
   - Return `true`
5. If `nums[i] == 0`:
   - No jumps are possible, so return `false`
6. Compute the farthest index we can jump to from `i`
7. Try all next indices within the jump range:
   - If any recursive call returns `true`, store `true` in `memo[i]` and return it
8. If none of the jumps work:
   - Store `false` in `memo[i]` and return it
9. Start the recursion from index `0`
10. Return the final result

::tabs-start

```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        memo = {}

        def dfs(i):
            if i in memo:
                return memo[i]
            if i == len(nums) - 1:
                return True
            if nums[i] == 0:
                return False

            end = min(len(nums), i + nums[i] + 1)
            for j in range(i + 1, end):
                if dfs(j):
                    memo[i] = True
                    return True
            memo[i] = False
            return False

        return dfs(0)
```

```java
public class Solution {
    public boolean canJump(int[] nums) {
        Map<Integer, Boolean> memo = new HashMap<>();
        return dfs(nums, 0, memo);
    }

    private boolean dfs(int[] nums, int i, Map<Integer, Boolean> memo) {
        if (memo.containsKey(i)) {
            return memo.get(i);
        }
        if (i == nums.length - 1) {
            return true;
        }
        if (nums[i] == 0) {
            return false;
        }

        int end = Math.min(nums.length, i + nums[i] + 1);
        for (int j = i + 1; j < end; j++) {
            if (dfs(nums, j, memo)) {
                memo.put(i, true);
                return true;
            }
        }
        memo.put(i, false);
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        unordered_map<int, bool> memo;
        return dfs(nums, 0, memo);
    }

private:
    bool dfs(vector<int>& nums, int i, unordered_map<int, bool>& memo) {
        if (memo.count(i)) {
            return memo[i];
        }
        if (i == nums.size() - 1) {
            return true;
        }
        if (nums[i] == 0) {
            return false;
        }

        int end = min((int)nums.size(), i + nums[i] + 1);
        for (int j = i + 1; j < end; j++) {
            if (dfs(nums, j, memo)) {
                memo[i] = true;
                return true;
            }
        }
        memo[i] = false;
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
    canJump(nums) {
        const memo = new Map();
        const dfs = (i) => {
            if (memo.has(i)) {
                return memo.get(i);
            }
            if (i == nums.length - 1) {
                return true;
            }
            if (nums[i] === 0) {
                return false;
            }
            const end = Math.min(nums.length - 1, i + nums[i]);
            for (let j = i + 1; j <= end; j++) {
                if (dfs(j)) {
                    memo.set(i, true);
                    return true;
                }
            }
            memo.set(i, false);
            return false;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public bool CanJump(int[] nums) {
        var memo = new Dictionary<int, bool>();
        return Dfs(nums, 0, memo);
    }

    private bool Dfs(int[] nums, int i, Dictionary<int, bool> memo) {
        if (memo.ContainsKey(i)) {
            return memo[i];
        }
        if (i >= nums.Length - 1) {
            return true;
        }
        if (nums[i] == 0) {
            return false;
        }

        int end = Math.Min(nums.Length, i + nums[i] + 1);
        for (int j = i + 1; j < end; j++) {
            if (Dfs(nums, j, memo)) {
                memo[i] = true;
                return true;
            }
        }
        memo[i] = false;
        return false;
    }
}
```

```go
func canJump(nums []int) bool {
    memo := make(map[int]bool)

    var dfs func(i int) bool
    dfs = func(i int) bool {
        if result, exists := memo[i]; exists {
            return result
        }

        if i == len(nums)-1 {
            return true
        }
        if nums[i] == 0 {
            memo[i] = false
            return false
        }

        end := min(len(nums), i+nums[i]+1)
        for j := i + 1; j < end; j++ {
            if dfs(j) {
                memo[i] = true
                return true
            }
        }

        memo[i] = false
        return false
    }

    return dfs(0)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun canJump(nums: IntArray): Boolean {
        val memo = HashMap<Int, Boolean>()

        fun dfs(i: Int): Boolean {
            memo[i]?.let { return it }

            if (i == nums.size - 1) {
                return true
            }
            if (nums[i] == 0) {
                memo[i] = false
                return false
            }

            val end = minOf(nums.size, i + nums[i] + 1)
            for (j in (i + 1) until end) {
                if (dfs(j)) {
                    memo[i] = true
                    return true
                }
            }

            memo[i] = false
            return false
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func canJump(_ nums: [Int]) -> Bool {
        var memo: [Int: Bool] = [:]

        func dfs(_ i: Int) -> Bool {
            if let cachedResult = memo[i] {
                return cachedResult
            }
            if i == nums.count - 1 {
                return true
            }
            if nums[i] == 0 {
                return false
            }

            let end = min(nums.count, i + nums[i] + 1)
            for j in i + 1..<end {
                if dfs(j) {
                    memo[i] = true
                    return true
                }
            }

            memo[i] = false
            return false
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We want to know if we can reach the **last index** starting from index `0`.

Instead of using recursion, we can solve this using **bottom-up dynamic programming** by working backwards from the end of the array.

The idea is simple:
- mark positions that can reach the end
- then check earlier positions to see if they can jump to any of those “good” positions

If index `i` can jump to **any index `j` that is already reachable**, then `i` is also reachable.

### Algorithm

1. Let `n` be the length of the array.
2. Create a boolean array `dp` of size `n`:
   - `dp[i] = true` means the last index is reachable from index `i`
3. Set the base case:
   - `dp[n - 1] = true` since the last index can trivially reach itself
4. Iterate `i` from `n - 2` down to `0`:
5. For each index `i`:
   - Compute the farthest index we can jump to: `end = min(n, i + nums[i] + 1)`
   - Check all reachable positions from `i`:
     - if any `dp[j]` is `true`, then set `dp[i] = true`
6. After filling the array, return `dp[0]`

::tabs-start

```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        n = len(nums)
        dp = [False] * n
        dp[-1] = True

        for i in range(n - 2, -1, -1):
            end = min(n, i + nums[i] + 1)
            for j in range(i + 1, end):
                if dp[j]:
                    dp[i] = True
                    break
        return dp[0]
```

```java
public class Solution {
    public boolean canJump(int[] nums) {
        int n = nums.length;
        boolean[] dp = new boolean[n];
        dp[n - 1] = true;

        for (int i = n - 2; i >= 0; i--) {
            int end = Math.min(nums.length, i + nums[i] + 1);
            for (int j = i + 1; j < end; j++) {
                if (dp[j]) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int n = nums.size();
        vector<bool> dp(n, false);
        dp[n - 1] = true;

        for (int i = n - 2; i >= 0; i--) {
            int end = min((int)nums.size(), i + nums[i] + 1);
            for (int j = i + 1; j < end; j++) {
                if (dp[j]) {
                    dp[i] = true;
                    break;
                }
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
     * @return {boolean}
     */
    canJump(nums) {
        const n = nums.length;
        const dp = new Array(n).fill(false);
        dp[n - 1] = true;

        for (let i = n - 2; i >= 0; i--) {
            const end = Math.min(nums.length, i + nums[i] + 1);
            for (let j = i + 1; j < end; j++) {
                if (dp[j]) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[0];
    }
}
```

```csharp
public class Solution {
    public bool CanJump(int[] nums) {
        int n = nums.Length;
        bool[] dp = new bool[n];
        dp[n - 1] = true;

        for (int i = n - 2; i >= 0; i--) {
            int end = Math.Min(nums.Length, i + nums[i] + 1);
            for (int j = i + 1; j < end; j++) {
                if (dp[j]) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[0];
    }
}
```

```go
func canJump(nums []int) bool {
    n := len(nums)
    dp := make([]bool, n)
    dp[n-1] = true

    for i := n - 2; i >= 0; i-- {
        end := min(n, i + nums[i] + 1)
        for j := i + 1; j < end; j++ {
            if dp[j] {
                dp[i] = true
                break
            }
        }
    }
    return dp[0]
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun canJump(nums: IntArray): Boolean {
        val n = nums.size
        val dp = BooleanArray(n)
        dp[n - 1] = true

        for (i in n - 2 downTo 0) {
            val end = minOf(n, i + nums[i] + 1)
            for (j in i + 1 until end) {
                if (dp[j]) {
                    dp[i] = true
                    break
                }
            }
        }
        return dp[0]
    }
}
```

```swift
class Solution {
    func canJump(_ nums: [Int]) -> Bool {
        let n = nums.count
        var dp = [Bool](repeating: false, count: n)
        dp[n - 1] = true

        for i in (0..<n - 1).reversed() {
            let end = min(n, i + nums[i] + 1)
            for j in (i + 1..<end) {
                if dp[j] {
                    dp[i] = true
                    break
                }
            }
        }
        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Greedy

### Intuition

We want to check if we can reach the **last index** starting from index `0`.

Instead of trying all possible jumps, we can think about the problem **in reverse**:
- ask which positions can eventually reach the end
- then move backward to see if earlier positions can reach those positions

We keep a variable called `goal`:
- it represents the **leftmost index** that we must be able to reach
- initially, the goal is the last index itself

As we move backward through the array:
- if from index `i` we can jump to the current `goal` (or beyond), then index `i` becomes the new goal

At the end, if index `0` becomes the goal, it means we can reach the last index.

### Algorithm

1. Initialize `goal` as the last index of the array.
2. Iterate from the second last index down to index `0`.
3. For each index `i`:
   - Check if `i + nums[i] >= goal`
   - If yes, update `goal = i` because index `i` can reach the previous goal
4. After the loop finishes:
   - If `goal == 0`, return `true`
   - Otherwise, return `false`

::tabs-start

```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        goal = len(nums) - 1

        for i in range(len(nums) - 2, -1, -1):
            if i + nums[i] >= goal:
                goal = i
        return goal == 0
```

```java
public class Solution {
    public boolean canJump(int[] nums) {
        int goal = nums.length - 1;

        for (int i = nums.length - 2; i >= 0; i--) {
            if (i + nums[i] >= goal) {
                goal = i;
            }
        }

        return goal == 0;
    }
}
```

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int goal = nums.size() - 1;

        for (int i = nums.size() - 2; i >= 0; i--) {
            if (i + nums[i] >= goal) {
                goal = i;
            }
        }

        return goal == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canJump(nums) {
        let goal = nums.length - 1;

        for (let i = nums.length - 2; i >= 0; i--) {
            if (i + nums[i] >= goal) {
                goal = i;
            }
        }

        return goal === 0;
    }
}
```

```csharp
public class Solution {
    public bool CanJump(int[] nums) {
        int goal = nums.Length - 1;

        for (int i = nums.Length - 2; i >= 0; i--) {
            if (i + nums[i] >= goal) {
                goal = i;
            }
        }

        return goal == 0;
    }
}
```

```go
func canJump(nums []int) bool {
    goal := len(nums) - 1

    for i := len(nums) - 2; i >= 0; i-- {
        if i + nums[i] >= goal {
            goal = i
        }
    }
    return goal == 0
}
```

```kotlin
class Solution {
    fun canJump(nums: IntArray): Boolean {
        var goal = nums.size - 1

        for (i in nums.size - 2 downTo 0) {
            if (i + nums[i] >= goal) {
                goal = i
            }
        }
        return goal == 0
    }
}
```

```swift
class Solution {
    func canJump(_ nums: [Int]) -> Bool {
        var goal = nums.count - 1

        for i in stride(from: nums.count - 2, through: 0, by: -1) {
            if i + nums[i] >= goal {
                goal = i
            }
        }

        return goal == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
