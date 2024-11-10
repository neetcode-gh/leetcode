## 1. Recursion

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
        if (nums[i] == 0) return 1000000;
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
        }

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n!)$
* Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

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
        }

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 4. Breadth First Search (Greedy)

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
        let res = 0, l = 0, r = 0;

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$