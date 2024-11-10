## 1. Recursion

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
        }

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n!)$
* Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

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
        }

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 4. Greedy

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$