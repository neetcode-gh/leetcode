## 1. Recursion

### Intuition

We need to partition the array into subarrays where each subarray is either two equal elements, three equal elements, or three consecutive increasing elements. At each position, we can try taking 2 or 3 elements if they form a valid pattern, then recursively check if the remainder can also be validly partitioned.

### Algorithm

1. Define a recursive function starting at index `0`.
2. Base case: if we reach the end of the array, return `true` (valid partition found).
3. At each position, try two options:
   - If the next two elements are equal, recursively check from index `i+2`.
   - If the next three elements are either all equal or form consecutive increasing values, recursively check from index `i+3`.
4. Return `true` if any recursive path leads to a valid partition.
5. Return `false` if no valid partition is possible from the current position.

::tabs-start

```python
class Solution:
    def validPartition(self, nums: List[int]) -> bool:
        def dfs(i):
            if i == len(nums):
                return True

            res = False
            if i < len(nums) - 1 and nums[i] == nums[i + 1]:
                res = dfs(i + 2)
            if i < len(nums) - 2:
                if ((nums[i] == nums[i + 1] == nums[i + 2]) or
                    (nums[i] + 1 == nums[i + 1] and nums[i + 1] + 1 == nums[i + 2])
                ):
                    res = res or dfs(i + 3)
            return res

        return dfs(0)
```

```java
public class Solution {
    public boolean validPartition(int[] nums) {
        return dfs(nums, 0);
    }

    private boolean dfs(int[] nums, int i) {
        if (i == nums.length) return true;

        boolean res = false;
        if (i < nums.length - 1 && nums[i] == nums[i + 1]) {
            res = dfs(nums, i + 2);
        }
        if (i < nums.length - 2) {
            if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                res = res || dfs(nums, i + 3);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    bool validPartition(vector<int>& nums) {
        return dfs(nums, 0);
    }

private:
    bool dfs(vector<int>& nums, int i) {
        if (i == nums.size()) return true;

        bool res = false;
        if (i < nums.size() - 1 && nums[i] == nums[i + 1]) {
            res = dfs(nums, i + 2);
        }
        if (i < nums.size() - 2) {
            if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                res = res || dfs(nums, i + 3);
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
     * @return {boolean}
     */
    validPartition(nums) {
        const dfs = (i) => {
            if (i === nums.length) return true;

            let res = false;
            if (i < nums.length - 1 && nums[i] === nums[i + 1]) {
                res = dfs(i + 2);
            }
            if (i < nums.length - 2) {
                if (
                    (nums[i] === nums[i + 1] && nums[i + 1] === nums[i + 2]) ||
                    (nums[i] + 1 === nums[i + 1] &&
                        nums[i + 1] + 1 === nums[i + 2])
                ) {
                    res = res || dfs(i + 3);
                }
            }
            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public bool ValidPartition(int[] nums) {
        return Dfs(nums, 0);
    }

    private bool Dfs(int[] nums, int i) {
        if (i == nums.Length) return true;

        bool res = false;
        if (i < nums.Length - 1 && nums[i] == nums[i + 1]) {
            res = Dfs(nums, i + 2);
        }
        if (i < nums.Length - 2) {
            if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                res = res || Dfs(nums, i + 3);
            }
        }
        return res;
    }
}
```

```go
func validPartition(nums []int) bool {
    var dfs func(i int) bool
    dfs = func(i int) bool {
        if i == len(nums) {
            return true
        }

        res := false
        if i < len(nums)-1 && nums[i] == nums[i+1] {
            res = dfs(i + 2)
        }
        if i < len(nums)-2 {
            if (nums[i] == nums[i+1] && nums[i+1] == nums[i+2]) ||
               (nums[i]+1 == nums[i+1] && nums[i+1]+1 == nums[i+2]) {
                res = res || dfs(i+3)
            }
        }
        return res
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun validPartition(nums: IntArray): Boolean {
        fun dfs(i: Int): Boolean {
            if (i == nums.size) return true

            var res = false
            if (i < nums.size - 1 && nums[i] == nums[i + 1]) {
                res = dfs(i + 2)
            }
            if (i < nums.size - 2) {
                if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                    (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                    res = res || dfs(i + 3)
                }
            }
            return res
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func validPartition(_ nums: [Int]) -> Bool {
        func dfs(_ i: Int) -> Bool {
            if i == nums.count { return true }

            var res = false
            if i < nums.count - 1 && nums[i] == nums[i + 1] {
                res = dfs(i + 2)
            }
            if i < nums.count - 2 {
                if (nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                   (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2]) {
                    res = res || dfs(i + 3)
                }
            }
            return res
        }

        return dfs(0)
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

The recursive solution has overlapping subproblems because we might reach the same index through different partition choices. By memoizing results for each starting index, we avoid redundant computations. Once we compute whether a valid partition exists from index `i`, we store it and reuse it.

### Algorithm

1. Create a memoization map to store results for each starting index.
2. Define a recursive function that first checks if the result for the current index is already computed.
3. Base case: if we reach the end of the array, return `true`.
4. Try forming a valid subarray of length `2` (two equal elements) and recurse.
5. Try forming a valid subarray of length `3` (three equal or three consecutive) and recurse.
6. Store the result in the memo before returning.
7. Return the result for index `0`.

::tabs-start

```python
class Solution:
    def validPartition(self, nums: List[int]) -> bool:
        dp = { len(nums) : True }
        def dfs(i):
            if i in dp:
                return dp[i]

            res = False
            if i < len(nums) - 1 and nums[i] == nums[i + 1]:
                res = dfs(i + 2)
            if i < len(nums) - 2:
                if ((nums[i] == nums[i + 1] == nums[i + 2]) or
                    (nums[i] + 1 == nums[i + 1] and nums[i + 1] + 1 == nums[i + 2])
                ):
                    res = res or dfs(i + 3)

            dp[i] = res
            return res

        return dfs(0)
```

```java
public class Solution {
    private Map<Integer, Boolean> memo = new HashMap<>();

    public boolean validPartition(int[] nums) {
        return dfs(nums, 0);
    }

    private boolean dfs(int[] nums, int i) {
        if (i == nums.length) return true;
        if (memo.containsKey(i)) return memo.get(i);

        boolean res = false;
        if (i < nums.length - 1 && nums[i] == nums[i + 1]) {
            res = dfs(nums, i + 2);
        }
        if (i < nums.length - 2) {
            if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                res = res || dfs(nums, i + 3);
            }
        }

        memo.put(i, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    unordered_map<int, bool> memo;

    bool validPartition(vector<int>& nums) {
        return dfs(nums, 0);
    }

private:
    bool dfs(vector<int>& nums, int i) {
        if (i == nums.size()) return true;
        if (memo.count(i)) return memo[i];

        bool res = false;
        if (i < nums.size() - 1 && nums[i] == nums[i + 1]) {
            res = dfs(nums, i + 2);
        }
        if (i < nums.size() - 2) {
            if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                res = res || dfs(nums, i + 3);
            }
        }

        return memo[i] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    validPartition(nums) {
        const memo = new Map();

        const dfs = (i) => {
            if (i === nums.length) return true;
            if (memo.has(i)) return memo.get(i);

            let res = false;
            if (i < nums.length - 1 && nums[i] === nums[i + 1]) {
                res = dfs(i + 2);
            }
            if (i < nums.length - 2) {
                if (
                    (nums[i] === nums[i + 1] && nums[i + 1] === nums[i + 2]) ||
                    (nums[i] + 1 === nums[i + 1] &&
                        nums[i + 1] + 1 === nums[i + 2])
                ) {
                    res = res || dfs(i + 3);
                }
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
    private Dictionary<int, bool> memo = new Dictionary<int, bool>();

    public bool ValidPartition(int[] nums) {
        return Dfs(nums, 0);
    }

    private bool Dfs(int[] nums, int i) {
        if (i == nums.Length) return true;
        if (memo.ContainsKey(i)) return memo[i];

        bool res = false;
        if (i < nums.Length - 1 && nums[i] == nums[i + 1]) {
            res = Dfs(nums, i + 2);
        }
        if (i < nums.Length - 2) {
            if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                res = res || Dfs(nums, i + 3);
            }
        }

        memo[i] = res;
        return res;
    }
}
```

```go
func validPartition(nums []int) bool {
    memo := make(map[int]bool)

    var dfs func(i int) bool
    dfs = func(i int) bool {
        if i == len(nums) {
            return true
        }
        if val, ok := memo[i]; ok {
            return val
        }

        res := false
        if i < len(nums)-1 && nums[i] == nums[i+1] {
            res = dfs(i + 2)
        }
        if i < len(nums)-2 {
            if (nums[i] == nums[i+1] && nums[i+1] == nums[i+2]) ||
               (nums[i]+1 == nums[i+1] && nums[i+1]+1 == nums[i+2]) {
                res = res || dfs(i+3)
            }
        }

        memo[i] = res
        return res
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    private val memo = HashMap<Int, Boolean>()

    fun validPartition(nums: IntArray): Boolean {
        return dfs(nums, 0)
    }

    private fun dfs(nums: IntArray, i: Int): Boolean {
        if (i == nums.size) return true
        memo[i]?.let { return it }

        var res = false
        if (i < nums.size - 1 && nums[i] == nums[i + 1]) {
            res = dfs(nums, i + 2)
        }
        if (i < nums.size - 2) {
            if ((nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2])) {
                res = res || dfs(nums, i + 3)
            }
        }

        memo[i] = res
        return res
    }
}
```

```swift
class Solution {
    func validPartition(_ nums: [Int]) -> Bool {
        var memo = [Int: Bool]()

        func dfs(_ i: Int) -> Bool {
            if i == nums.count { return true }
            if let val = memo[i] { return val }

            var res = false
            if i < nums.count - 1 && nums[i] == nums[i + 1] {
                res = dfs(i + 2)
            }
            if i < nums.count - 2 {
                if (nums[i] == nums[i + 1] && nums[i + 1] == nums[i + 2]) ||
                   (nums[i] + 1 == nums[i + 1] && nums[i + 1] + 1 == nums[i + 2]) {
                    res = res || dfs(i + 3)
                }
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

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of starting from the beginning and recursing forward, we can build our solution from the ground up. We define `dp[i]` as whether the first `i` elements can be validly partitioned. We iterate through the array and for each position, check if we can extend a valid partition by adding a valid 2-element or 3-element subarray.

### Algorithm

1. Create a DP array of size `n+1`, initialized to `false`.
2. Set `dp[0] = true` (empty prefix is valid).
3. Iterate from index `2` to `n`:
   - If elements at positions `i-1` and `i-2` are equal, and `dp[i-2]` is `true`, set `dp[i] = true`.
   - If `i > 2` and the last three elements form a valid pattern (all equal or consecutive), and `dp[i-3]` is `true`, set `dp[i] = true`.
4. Return `dp[n]`.

::tabs-start

```python
class Solution:
    def validPartition(self, nums: List[int]) -> bool:
        dp = [False] * (len(nums) + 1)
        dp[0] = True

        for i in range(2, len(nums) + 1):
            if nums[i - 1] == nums[i - 2]:
                dp[i] = dp[i] or dp[i - 2]
            if i > 2 and ((nums[i - 1] == nums[i - 2] == nums[i - 3]) or
                          (nums[i - 3] + 1 == nums[i - 2] and nums[i - 2] + 1 == nums[i - 1])):
                dp[i] = dp[i] or dp[i - 3]

        return dp[len(nums)]
```

```java
public class Solution {
    public boolean validPartition(int[] nums) {
        boolean[] dp = new boolean[nums.length + 1];
        dp[0] = true;

        for (int i = 2; i <= nums.length; i++) {
            if (nums[i - 1] == nums[i - 2]) {
                dp[i] = dp[i] || dp[i - 2];
            }
            if (i > 2 && ((nums[i - 1] == nums[i - 2] && nums[i - 2] == nums[i - 3]) ||
                          (nums[i - 3] + 1 == nums[i - 2] && nums[i - 2] + 1 == nums[i - 1]))) {
                dp[i] = dp[i] || dp[i - 3];
            }
        }

        return dp[nums.length];
    }
}
```

```cpp
class Solution {
public:
    bool validPartition(vector<int>& nums) {
        vector<bool> dp(nums.size() + 1, false);
        dp[0] = true;

        for (int i = 2; i <= nums.size(); i++) {
            if (nums[i - 1] == nums[i - 2]) {
                dp[i] = dp[i] || dp[i - 2];
            }
            if (i > 2 && ((nums[i - 1] == nums[i - 2] && nums[i - 2] == nums[i - 3]) ||
                          (nums[i - 3] + 1 == nums[i - 2] && nums[i - 2] + 1 == nums[i - 1]))) {
                dp[i] = dp[i] || dp[i - 3];
            }
        }

        return dp[nums.size()];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    validPartition(nums) {
        const dp = Array(nums.length + 1).fill(false);
        dp[0] = true;

        for (let i = 2; i <= nums.length; i++) {
            if (nums[i - 1] === nums[i - 2]) {
                dp[i] = dp[i] || dp[i - 2];
            }
            if (
                i > 2 &&
                ((nums[i - 1] === nums[i - 2] && nums[i - 2] === nums[i - 3]) ||
                    (nums[i - 3] + 1 === nums[i - 2] &&
                        nums[i - 2] + 1 === nums[i - 1]))
            ) {
                dp[i] = dp[i] || dp[i - 3];
            }
        }

        return dp[nums.length];
    }
}
```

```csharp
public class Solution {
    public bool ValidPartition(int[] nums) {
        bool[] dp = new bool[nums.Length + 1];
        dp[0] = true;

        for (int i = 2; i <= nums.Length; i++) {
            if (nums[i - 1] == nums[i - 2]) {
                dp[i] = dp[i] || dp[i - 2];
            }
            if (i > 2 && ((nums[i - 1] == nums[i - 2] && nums[i - 2] == nums[i - 3]) ||
                          (nums[i - 3] + 1 == nums[i - 2] && nums[i - 2] + 1 == nums[i - 1]))) {
                dp[i] = dp[i] || dp[i - 3];
            }
        }

        return dp[nums.Length];
    }
}
```

```go
func validPartition(nums []int) bool {
    dp := make([]bool, len(nums)+1)
    dp[0] = true

    for i := 2; i <= len(nums); i++ {
        if nums[i-1] == nums[i-2] {
            dp[i] = dp[i] || dp[i-2]
        }
        if i > 2 && ((nums[i-1] == nums[i-2] && nums[i-2] == nums[i-3]) ||
                     (nums[i-3]+1 == nums[i-2] && nums[i-2]+1 == nums[i-1])) {
            dp[i] = dp[i] || dp[i-3]
        }
    }

    return dp[len(nums)]
}
```

```kotlin
class Solution {
    fun validPartition(nums: IntArray): Boolean {
        val dp = BooleanArray(nums.size + 1)
        dp[0] = true

        for (i in 2..nums.size) {
            if (nums[i - 1] == nums[i - 2]) {
                dp[i] = dp[i] || dp[i - 2]
            }
            if (i > 2 && ((nums[i - 1] == nums[i - 2] && nums[i - 2] == nums[i - 3]) ||
                          (nums[i - 3] + 1 == nums[i - 2] && nums[i - 2] + 1 == nums[i - 1]))) {
                dp[i] = dp[i] || dp[i - 3]
            }
        }

        return dp[nums.size]
    }
}
```

```swift
class Solution {
    func validPartition(_ nums: [Int]) -> Bool {
        var dp = [Bool](repeating: false, count: nums.count + 1)
        dp[0] = true

        for i in 2...nums.count {
            if nums[i - 1] == nums[i - 2] {
                dp[i] = dp[i] || dp[i - 2]
            }
            if i > 2 && ((nums[i - 1] == nums[i - 2] && nums[i - 2] == nums[i - 3]) ||
                         (nums[i - 3] + 1 == nums[i - 2] && nums[i - 2] + 1 == nums[i - 1])) {
                dp[i] = dp[i] || dp[i - 3]
            }
        }

        return dp[nums.count]
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

Since each DP state only depends on the previous three states (`dp[i-1]`, `dp[i-2]`, `dp[i-3]`), we do not need to store the entire DP array. We can use just three variables and rotate them as we iterate through the array from right to left.

### Algorithm

1. Use three variables to represent the DP states for positions `i`, `i+1`, and `i+2`.
2. Initialize them to represent the base cases (`true` for positions at or beyond the array end).
3. Iterate from the second-to-last index down to `0`.
4. At each position, compute the new DP value based on:
   - Whether taking `2` elements forms a valid subarray and the state two positions ahead is `true`.
   - Whether taking `3` elements forms a valid subarray and the state three positions ahead is `true`.
5. Shift the variables to prepare for the next iteration.
6. Return the final value which represents whether the entire array can be partitioned.

::tabs-start

```python
class Solution:
    def validPartition(self, nums: List[int]) -> bool:
        dp = [False, True, True]

        for i in range(len(nums) - 2, -1, -1):
            dp1 = dp[0]
            if nums[i] == nums[i + 1] and dp[1]:
                dp[0] = True
            elif i < len(nums) - 2 and dp[2] and (
                (nums[i] == nums[i + 1] == nums[i + 2]) or
                (nums[i] + 1 == nums[i + 1] and nums[i + 1] == nums[i + 2] - 1)
            ):
                dp[0] = True
            else:
                dp[0] = False
            dp[2] = dp[1]
            dp[1] = dp1

        return dp[0]
```

```java
public class Solution {
    public boolean validPartition(int[] nums) {
        boolean[] dp = new boolean[3];
        dp[2] = true;
        dp[1] = true;
        dp[0] = false;

        for (int i = nums.length - 2; i >= 0; i--) {
            boolean dp1 = dp[0];
            if (nums[i] == nums[i + 1] && dp[1]) {
                dp[0] = true;
            } else if (i < nums.length - 2 && dp[2] &&
                      ((nums[i] == nums[i + 1] && nums[i] == nums[i + 2]) ||
                      (nums[i] + 1 == nums[i + 1] && nums[i + 1] == nums[i + 2] - 1))) {
                dp[0] = true;
            } else {
                dp[0] = false;
            }
            dp[2] = dp[1];
            dp[1] = dp1;
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    bool validPartition(vector<int>& nums) {
        bool dp[3] = {false, true, true};

        for (int i = nums.size() - 2; i >= 0; --i) {
            bool dp1 = dp[0];
            if (nums[i] == nums[i + 1] && dp[1]) {
                dp[0] = true;
            } else if (i < nums.size() - 2 && dp[2] &&
                      ((nums[i] == nums[i + 1] && nums[i] == nums[i + 2]) ||
                      (nums[i] + 1 == nums[i + 1] && nums[i + 1] == nums[i + 2] - 1))) {
                dp[0] = true;
            } else {
                dp[0] = false;
            }
            dp[2] = dp[1];
            dp[1] = dp1;
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
    validPartition(nums) {
        let dp = [false, true, true];

        for (let i = nums.length - 2; i >= 0; i--) {
            let dp1 = dp[0];
            if (nums[i] === nums[i + 1] && dp[1]) {
                dp[0] = true;
            } else if (
                i < nums.length - 2 &&
                dp[2] &&
                ((nums[i] === nums[i + 1] && nums[i] === nums[i + 2]) ||
                    (nums[i] + 1 === nums[i + 1] &&
                        nums[i + 1] === nums[i + 2] - 1))
            ) {
                dp[0] = true;
            } else {
                dp[0] = false;
            }
            dp[2] = dp[1];
            dp[1] = dp1;
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public bool ValidPartition(int[] nums) {
        bool[] dp = new bool[] { false, true, true };

        for (int i = nums.Length - 2; i >= 0; i--) {
            bool dp1 = dp[0];
            if (nums[i] == nums[i + 1] && dp[1]) {
                dp[0] = true;
            } else if (i < nums.Length - 2 && dp[2] &&
                      ((nums[i] == nums[i + 1] && nums[i] == nums[i + 2]) ||
                      (nums[i] + 1 == nums[i + 1] && nums[i + 1] == nums[i + 2] - 1))) {
                dp[0] = true;
            } else {
                dp[0] = false;
            }
            dp[2] = dp[1];
            dp[1] = dp1;
        }

        return dp[0];
    }
}
```

```go
func validPartition(nums []int) bool {
    dp := []bool{false, true, true}

    for i := len(nums) - 2; i >= 0; i-- {
        dp1 := dp[0]
        if nums[i] == nums[i+1] && dp[1] {
            dp[0] = true
        } else if i < len(nums)-2 && dp[2] &&
                  ((nums[i] == nums[i+1] && nums[i] == nums[i+2]) ||
                  (nums[i]+1 == nums[i+1] && nums[i+1] == nums[i+2]-1)) {
            dp[0] = true
        } else {
            dp[0] = false
        }
        dp[2] = dp[1]
        dp[1] = dp1
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun validPartition(nums: IntArray): Boolean {
        val dp = booleanArrayOf(false, true, true)

        for (i in nums.size - 2 downTo 0) {
            val dp1 = dp[0]
            if (nums[i] == nums[i + 1] && dp[1]) {
                dp[0] = true
            } else if (i < nums.size - 2 && dp[2] &&
                      ((nums[i] == nums[i + 1] && nums[i] == nums[i + 2]) ||
                      (nums[i] + 1 == nums[i + 1] && nums[i + 1] == nums[i + 2] - 1))) {
                dp[0] = true
            } else {
                dp[0] = false
            }
            dp[2] = dp[1]
            dp[1] = dp1
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func validPartition(_ nums: [Int]) -> Bool {
        var dp = [false, true, true]

        for i in stride(from: nums.count - 2, through: 0, by: -1) {
            let dp1 = dp[0]
            if nums[i] == nums[i + 1] && dp[1] {
                dp[0] = true
            } else if i < nums.count - 2 && dp[2] &&
                      ((nums[i] == nums[i + 1] && nums[i] == nums[i + 2]) ||
                      (nums[i] + 1 == nums[i + 1] && nums[i + 1] == nums[i + 2] - 1)) {
                dp[0] = true
            } else {
                dp[0] = false
            }
            dp[2] = dp[1]
            dp[1] = dp1
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Confusing Consecutive with Equal Elements
The three-element partition allows either three equal elements OR three consecutive increasing elements, but not both conditions mixed. Writing `nums[i] == nums[i+1] + 1` instead of `nums[i] + 1 == nums[i+1]` reverses the direction and checks for decreasing sequences.
```python
# Wrong: nums[i] == nums[i+1] + 1 (checks decreasing)
# Correct:
nums[i] + 1 == nums[i + 1] and nums[i + 1] + 1 == nums[i + 2]
```

### Forgetting to Check Both 2-Element and 3-Element Options
At each position, you must consider both taking 2 elements (if they're equal) AND taking 3 elements (if they form a valid pattern). Only checking one option or using `else if` when both could be valid may miss the correct partition path.
```python
# Must use OR logic to try both options:
res = dfs(i + 2) if valid_pair else False
res = res or dfs(i + 3) if valid_triple else res
```

### Off-by-One Errors in DP Array Indexing
In the bottom-up DP approach, `dp[i]` represents whether the first `i` elements can be partitioned. When checking if elements form a valid pattern, you must use `nums[i-1]`, `nums[i-2]`, `nums[i-3]` (0-indexed array access) rather than `nums[i]`, which would be out of bounds or reference the wrong elements.
