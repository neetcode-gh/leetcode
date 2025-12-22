## 1. Recursion

### Intuition

This problem asks for the **minimum number of jumps** needed to reach the last index of the array.

From any index `i`, the value `nums[i]` tells us how far we can jump.  
So at index `i`, we can choose to jump to **any index between `i + 1` and `i + nums[i]`**.

Using recursion, we try **all possible jumps** from the current index and choose the one that leads to the end using the **fewest total jumps**.

The recursive function represents:  
**“What is the minimum number of jumps required to reach the last index starting from index `i`?”**

If we ever reach the last index, no more jumps are needed.  
If we get stuck at an index with `0` jump length, that path is invalid.

---

### Algorithm

1. Define a recursive function `dfs(i)`:
   - `i` is the current index
2. If `i` is already the last index:
   - Return `0` because no more jumps are needed
3. If `nums[i] == 0`:
   - We cannot move forward, so return infinity (invalid path)
4. Determine the farthest index we can jump to:
   - `end = min(last_index, i + nums[i])`
5. Initialize `res` to infinity
6. Try all possible next positions from `i + 1` to `end`:
   - For each `j`, compute `1 + dfs(j)`
   - Update `res` with the minimum value found
7. Return `res` as the minimum jumps needed from index `i`
8. Start the recursion from index `0` and return the result

::tabs-start

```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        def dfs(i):
            if i == len(nums) - 1:
                return 0
            if nums[i] == 0:
                return float('inf')

            end = min(len(nums) - 1, i + nums[i])
            res = float('inf')
            for j in range(i + 1, end + 1):
                res = min(res, 1 + dfs(j))
            return res

        return dfs(0)
```

```java
public class Solution {
    public int jump(int[] nums) {
        return dfs(nums, 0);
    }

    private int dfs(int[] nums, int i) {
        if (i == nums.length - 1) {
            return 0;
        }
        if (nums[i] == 0) {
            return 1000000;
        }
        int res = 1000000;
        int end = Math.min(nums.length - 1, i + nums[i]);
        for (int j = i + 1; j <= end; j++) {
            res = Math.min(res, 1 + dfs(nums, j));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        return dfs(nums, 0);
    }

private:
    int dfs(vector<int>& nums, int i) {
        if (i == nums.size() - 1) {
            return 0;
        }
        if (nums[i] == 0) {
            return 1000000;
        }

        int res = 1000000;
        int end = min((int)nums.size() - 1, i + nums[i]);
        for (int j = i + 1; j <= end; ++j) {
            res = min(res, 1 + dfs(nums, j));
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
    jump(nums) {
        const dfs = (i) => {
            if (i === nums.length - 1) {
                return 0;
            }
            if (nums[i] === 0) return 1000000;
            let res = 1000000;
            const end = Math.min(nums.length - 1, i + nums[i]);
            for (let j = i + 1; j <= end; j++) {
                res = Math.min(res, 1 + dfs(j));
            }
            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public int Jump(int[] nums) {
        return Dfs(nums, 0);
    }

    private int Dfs(int[] nums, int i) {
        if (i == nums.Length - 1) {
            return 0;
        }
        if (nums[i] == 0) return 1000000;
        int res = 1000000;
        int end = Math.Min(nums.Length - 1, i + nums[i]);
        for (int j = i + 1; j <= end; j++) {
            res = Math.Min(res, 1 + Dfs(nums, j));
        }
        return res;
    }
}
```

```go
func jump(nums []int) int {
    var dfs func(int) int
    dfs = func(i int) int {
        if i == len(nums)-1 {
            return 0
        }
        if nums[i] == 0 {
            return math.MaxInt32
        }
        end := min(len(nums)-1, i+nums[i])
        res := math.MaxInt32
        for j := i + 1; j <= end; j++ {
            res = min(res, 1+dfs(j))
        }
        return res
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
    fun jump(nums: IntArray): Int {
        fun dfs(i: Int): Int {
            if (i == nums.size - 1) {
                return 0
            }
            if (nums[i] == 0) {
                return 1000000
            }
            val end = minOf(nums.size - 1, i + nums[i])
            var minJumps = 1000000
            for (j in i + 1..end) {
                minJumps = minOf(minJumps, 1 + dfs(j))
            }
            return minJumps
        }
        return dfs(0)
    }
}
```

```swift
class Solution {
    func jump(_ nums: [Int]) -> Int {
        func dfs(_ i: Int) -> Int {
            if i == nums.count - 1 {
                return 0
            }
            if nums[i] == 0 {
                return 1000000
            }

            let end = min(nums.count - 1, i + nums[i])
            var res = 1000000
            for j in i + 1..<(end + 1) {
                res = min(res, 1 + dfs(j))
            }

            return res
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

This problem asks for the **minimum number of jumps** required to reach the last index.

At any index `i`, the value `nums[i]` tells us the **maximum jump length** from that position.  
So from index `i`, we can try jumping to any index in the range `(i + 1)` to `(i + nums[i])`.

The pure recursive solution tries all possibilities, but it recomputes the same results for the same indices many times.  
To avoid this repetition, we use **top-down dynamic programming (memoization)**.

The recursive function answers the question:  
**“What is the minimum number of jumps needed to reach the end starting from index `i`?”**

Once we compute the answer for an index, we store it and reuse it whenever needed.

---

### Algorithm

1. Create a memo map `memo`:
   - `memo[i]` stores the minimum jumps needed to reach the end from index `i`
2. Define a recursive function `dfs(i)`:
   - `i` is the current index
3. If `i` is already in `memo`:
   - Return the stored result
4. If `i` is the last index:
   - Return `0` since no more jumps are required
5. If `nums[i] == 0`:
   - We cannot move forward, so return a very large value to indicate an invalid path
6. Compute the farthest index we can jump to from `i`
7. Try all possible next positions within the jump range:
   - For each `j`, compute `1 + dfs(j)`
   - Keep track of the minimum value among all choices
8. Store the result in `memo[i]` and return it
9. Start the recursion from index `0`
10. Return the final result

::tabs-start

```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        memo = {}

        def dfs(i):
            if i in memo:
                return memo[i]
            if i == len(nums) - 1:
                return 0
            if nums[i] == 0:
                return 1000000

            res = 1000000
            end = min(len(nums), i + nums[i] + 1)
            for j in range(i + 1, end):
                res = min(res, 1 + dfs(j))
            memo[i] = res
            return res

        return dfs(0)
```

```java
public class Solution {
    public int jump(int[] nums) {
        Map<Integer, Integer> memo = new HashMap<>();
        return dfs(nums, 0, memo);
    }

    private int dfs(int[] nums, int i, Map<Integer, Integer> memo) {
        if (memo.containsKey(i)) {
            return memo.get(i);
        }
        if (i == nums.length - 1) {
            return 0;
        }
        if (nums[i] == 0) {
            return 1000000;
        }

        int res = 1000000;
        int end = Math.min(nums.length, i + nums[i] + 1);
        for (int j = i + 1; j < end; j++) {
            res = Math.min(res, 1 + dfs(nums, j, memo));
        }
        memo.put(i, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        unordered_map<int, int> memo;
        return dfs(nums, 0, memo);
    }

private:
    int dfs(vector<int>& nums, int i, unordered_map<int, int>& memo) {
        if (memo.count(i)) {
            return memo[i];
        }
        if (i == nums.size() - 1) {
            return 0;
        }
        if (nums[i] == 0) {
            return 1000000;
        }

        int res = 1000000;
        int end = min((int)nums.size(), i + nums[i] + 1);
        for (int j = i + 1; j < end; j++) {
            res = min(res, 1 + dfs(nums, j, memo));
        }
        memo[i] = res;
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
    jump(nums) {
        const memo = new Map();
        const dfs = (i) => {
            if (memo.has(i)) {
                return memo.get(i);
            }
            if (i == nums.length - 1) {
                return 0;
            }
            if (nums[i] === 0) {
                return 1000000;
            }
            let res = 1000000;
            const end = Math.min(nums.length - 1, i + nums[i]);
            for (let j = i + 1; j <= end; j++) {
                res = Math.min(res, 1 + dfs(j));
            }
            memo.set(i, res);
            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public int Jump(int[] nums) {
        var memo = new Dictionary<int, int>();
        return Dfs(nums, 0, memo);
    }

    private int Dfs(int[] nums, int i, Dictionary<int, int> memo) {
        if (memo.ContainsKey(i)) {
            return memo[i];
        }
        if (i == nums.Length - 1) {
            return 0;
        }
        if (nums[i] == 0) {
            return 1000000;
        }

        int res = 1000000;
        int end = Math.Min(nums.Length, i + nums[i] + 1);
        for (int j = i + 1; j < end; j++) {
            res = Math.Min(res, 1 + Dfs(nums, j, memo));
        }
        memo[i] = res;
        return res;
    }
}
```

```go
func jump(nums []int) int {
    memo := make(map[int]int)

    var dfs func(int) int
    dfs = func(i int) int {
        if val, ok := memo[i]; ok {
            return val
        }
        if i == len(nums)-1 {
            return 0
        }
        if nums[i] == 0 {
            return 1000000
        }
        res := 1000000
        end := min(len(nums), i+nums[i]+1)
        for j := i + 1; j < end; j++ {
            res = min(res, 1+dfs(j))
        }
        memo[i] = res
        return res
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
    fun jump(nums: IntArray): Int {
        val memo = HashMap<Int, Int>()

        fun dfs(i: Int): Int {
            if (i in memo) {
                return memo[i]!!
            }
            if (i == nums.size - 1) {
                return 0
            }
            if (nums[i] == 0) {
                return 1000000
            }
            var res = 1000000
            val end = minOf(nums.size, i + nums[i] + 1)
            for (j in i + 1 until end) {
                res = minOf(res, 1 + dfs(j))
            }
            memo[i] = res
            return res
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    var memo: [Int: Int] = [:]

    func jump(_ nums: [Int]) -> Int {
        return dfs(nums, 0)
    }

    private func dfs(_ nums: [Int], _ i: Int) -> Int {
        if let cachedResult = memo[i] {
            return cachedResult
        }
        if i == nums.count - 1 {
            return 0
        }
        if nums[i] == 0 {
            return 1000000
        }

        var res = 1000000
        let end = min(nums.count, i + nums[i] + 1)
        for j in i + 1..<end {
            res = min(res, 1 + dfs(nums, j))
        }

        memo[i] = res
        return res
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

This problem asks for the **minimum number of jumps** needed to reach the last index of the array.

Instead of using recursion, we can solve this using **bottom-up dynamic programming** by working backwards from the end.

The key idea is:
- for each index `i`, we want to know the minimum number of jumps needed to reach the end **starting from `i`**
- from index `i`, we can jump to any index in the range  
  `[i + 1, i + nums[i]]`
- so the answer for `i` is:
  - `1 + minimum(dp[j])` for all reachable `j`

By filling the DP array from right to left, all future states are already computed when needed.

---

### Algorithm

1. Let `n` be the length of the array.
2. Create a DP array `dp` of size `n`:
   - `dp[i]` represents the minimum number of jumps needed to reach the last index from index `i`
3. Initialize:
   - `dp[n - 1] = 0` since we are already at the last index
   - all other values to a large number (representing unreachable initially)
4. Iterate `i` from `n - 2` down to `0`:
5. For each index `i`:
   - Compute the farthest index we can jump to:
     - `end = min(n, i + nums[i] + 1)`
   - Try all next positions `j` from `i + 1` to `end - 1`
   - Update `dp[i] = min(dp[i], 1 + dp[j])`
6. After filling the array, `dp[0]` contains the minimum number of jumps from the start
7. Return `dp[0]`

::tabs-start

```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [1000000] * n
        dp[-1] = 0

        for i in range(n - 2, -1, -1):
            end = min(n, i + nums[i] + 1)
            for j in range(i + 1, end):
                dp[i] = min(dp[i], 1 + dp[j])
        return dp[0]
```

```java
public class Solution {
    public int jump(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1000000);
        dp[n - 1] = 0;

        for (int i = n - 2; i >= 0; i--) {
            int end = Math.min(nums.length, i + nums[i] + 1);
            for (int j = i + 1; j < end; j++) {
                dp[i] = Math.min(dp[i], 1 + dp[j]);
            }
        }
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1000000);
        dp[n - 1] = 0;

        for (int i = n - 2; i >= 0; i--) {
            int end = min((int)nums.size(), i + nums[i] + 1);
            for (int j = i + 1; j < end; j++) {
                dp[i] = min(dp[i], 1 + dp[j]);
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
     * @return {number}
     */
    jump(nums) {
        const n = nums.length;
        const dp = new Array(n).fill(1000000);
        dp[n - 1] = 0;

        for (let i = n - 2; i >= 0; i--) {
            const end = Math.min(nums.length, i + nums[i] + 1);
            for (let j = i + 1; j < end; j++) {
                dp[i] = Math.min(dp[i], 1 + dp[j]);
            }
        }
        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int Jump(int[] nums) {
        int n = nums.Length;
        int[] dp = new int[n];
        Array.Fill(dp, 1000000);
        dp[n - 1] = 0;

        for (int i = n - 2; i >= 0; i--) {
            int end = Math.Min(nums.Length, i + nums[i] + 1);
            for (int j = i + 1; j < end; j++) {
                dp[i] = Math.Min(dp[i], 1 + dp[j]);
            }
        }
        return dp[0];
    }
}
```

```go
func jump(nums []int) int {
    n := len(nums)
    dp := make([]int, n)
    for i := range dp {
        dp[i] = 1000000
    }
    dp[n-1] = 0

    for i := n - 2; i >= 0; i-- {
        end := min(n, i+nums[i]+1)
        for j := i + 1; j < end; j++ {
            dp[i] = min(dp[i], 1+dp[j])
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
    fun jump(nums: IntArray): Int {
        val n = nums.size
        val dp = IntArray(n) { 1000000 }
        dp[n - 1] = 0

        for (i in n - 2 downTo 0) {
            val end = minOf(n, i + nums[i] + 1)
            for (j in i + 1 until end) {
                dp[i] = minOf(dp[i], 1 + dp[j])
            }
        }
        return dp[0]
    }
}
```

```swift
class Solution {
    func jump(_ nums: [Int]) -> Int {
        let n = nums.count
        var dp = Array(repeating: 1000000, count: n)
        dp[n - 1] = 0

        for i in stride(from: n - 2, through: 0, by: -1) {
            let end = min(n, i + nums[i] + 1)
            for j in i + 1..<end {
                dp[i] = min(dp[i], 1 + dp[j])
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

## 4. Breadth First Search (Greedy)

### Intuition

This problem asks for the **minimum number of jumps** needed to reach the last index.

We can think of this problem as moving **level by level**, similar to **Breadth First Search (BFS)**:
- each “level” represents all positions we can reach using the same number of jumps
- from those positions, we compute how far we can reach in **one more jump**

Instead of explicitly using a queue, we use a **greedy window**:
- `[l, r]` represents the range of indices reachable with the current number of jumps
- from this range, we find the **farthest index** we can reach in the next jump

Once we finish scanning the current range, we move to the next range and increase the jump count.

---

### Algorithm

1. Initialize:
   - `res = 0` to count the number of jumps
   - `l = 0`, `r = 0` to represent the current reachable range
2. While the right boundary `r` has not reached the last index:
3. For all indices `i` in the current range `[l, r]`:
   - Compute the farthest index reachable using one more jump:
     - `farthest = max(i + nums[i])`
4. After scanning the range:
   - Update the next range:
     - `l = r + 1`
     - `r = farthest`
   - Increment the jump count `res`
5. Repeat until the last index is included in the range
6. Return `res`

::tabs-start

```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        res = 0
        l = r = 0

        while r < len(nums) - 1:
            farthest = 0
            for i in range(l, r + 1):
                farthest = max(farthest, i + nums[i])
            l = r + 1
            r = farthest
            res += 1
        return res
```

```java
public class Solution {
    public int jump(int[] nums) {
        int res = 0, l = 0, r = 0;

        while (r < nums.length - 1) {
            int farthest = 0;
            for (int i = l; i <= r; i++) {
                farthest = Math.max(farthest, i + nums[i]);
            }
            l = r + 1;
            r = farthest;
            res++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int res = 0, l = 0, r = 0;

        while (r < nums.size() - 1) {
            int farthest = 0;
            for (int i = l; i <= r; i++) {
                farthest = max(farthest, i + nums[i]);
            }
            l = r + 1;
            r = farthest;
            res++;
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
    jump(nums) {
        let res = 0,
            l = 0,
            r = 0;

        while (r < nums.length - 1) {
            let farthest = 0;
            for (let i = l; i <= r; i++) {
                farthest = Math.max(farthest, i + nums[i]);
            }
            l = r + 1;
            r = farthest;
            res++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int Jump(int[] nums) {
        int res = 0, l = 0, r = 0;

        while (r < nums.Length - 1) {
            int farthest = 0;
            for (int i = l; i <= r; i++) {
                farthest = Math.Max(farthest, i + nums[i]);
            }
            l = r + 1;
            r = farthest;
            res++;
        }
        return res;
    }
}
```

```go
func jump(nums []int) int {
    res := 0
    l, r := 0, 0

    for r < len(nums)-1 {
        farthest := 0
        for i := l; i <= r; i++ {
            farthest = max(farthest, i+nums[i])
        }
        l = r + 1
        r = farthest
        res++
    }

    return res
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
    fun jump(nums: IntArray): Int {
        var res = 0
        var l = 0
        var r = 0

        while (r < nums.size - 1) {
            var farthest = 0
            for (i in l..r) {
                farthest = maxOf(farthest, i + nums[i])
            }
            l = r + 1
            r = farthest
            res++
        }

        return res
    }
}
```

```swift
class Solution {
    func jump(_ nums: [Int]) -> Int {
        var res = 0
        var l = 0
        var r = 0

        while r < nums.count - 1 {
            var farthest = 0
            for i in l...r {
                farthest = max(farthest, i + nums[i])
            }
            l = r + 1
            r = farthest
            res += 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
