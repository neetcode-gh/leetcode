## 1. Recursion

### Intuition
When you pick a number `x`, you earn all points from every occurrence of `x`, but you must delete all instances of `x - 1` and `x + 1`. This creates a choice at each distinct value: either take it (and skip the next consecutive value) or skip it. Sorting helps group identical values together, making it easy to sum all occurrences. We recursively explore both choices at each group of identical numbers.

### Algorithm
1. Sort the array to group identical numbers together.
2. Define a recursive function `dfs(i)` starting at index `i`:
   - If `i` is out of bounds, return `0`.
   - Sum all occurrences of `nums[i]` and move `i` past this group.
   - Compute the result of skipping this group: `dfs(new_i)`.
   - Skip any numbers equal to `nums[i] + 1` (they would be deleted if we pick).
   - Compute the result of picking this group: `pick + dfs(after_skipping)`.
   - Return the maximum of picking vs skipping.
3. Call `dfs(0)` and return the result.

::tabs-start

```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        nums.sort()

        def dfs(i):
            if i >= len(nums):
                return 0

            cur = nums[i]
            pick = 0
            while i < len(nums) and nums[i] == cur:
                pick += nums[i]
                i += 1

            res = dfs(i)
            while i < len(nums) and nums[i] == 1 + cur:
                i += 1

            res = max(res, pick + dfs(i))
            return res

        return dfs(0)
```

```java
public class Solution {
    public int deleteAndEarn(int[] nums) {
        Arrays.sort(nums);
        return dfs(nums, 0);
    }

    private int dfs(int[] nums, int i) {
        if (i >= nums.length) return 0;

        int cur = nums[i], pick = 0;
        while (i < nums.length && nums[i] == cur) {
            pick += nums[i];
            i++;
        }

        int res = dfs(nums, i);
        while (i < nums.length && nums[i] == cur + 1) {
            i++;
        }

        res = Math.max(res, pick + dfs(nums, i));
        return res;
    }
}
```

```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        return dfs(nums, 0);
    }

private:
    int dfs(const vector<int>& nums, int i) {
        if (i >= nums.size()) return 0;

        int cur = nums[i], pick = 0;
        while (i < nums.size() && nums[i] == cur) {
            pick += nums[i];
            i++;
        }

        int res = dfs(nums, i);
        while (i < nums.size() && nums[i] == cur + 1) {
            i++;
        }

        res = max(res, pick + dfs(nums, i));
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
    deleteAndEarn(nums) {
        nums.sort((a, b) => a - b);

        const dfs = (i) => {
            if (i >= nums.length) return 0;

            let cur = nums[i],
                pick = 0;
            while (i < nums.length && nums[i] === cur) {
                pick += nums[i];
                i++;
            }

            let res = dfs(i);
            while (i < nums.length && nums[i] === cur + 1) {
                i++;
            }

            res = Math.max(res, pick + dfs(i));
            return res;
        };

        return dfs(0);
    }
}
```

```go
func deleteAndEarn(nums []int) int {
    sort.Ints(nums)

    var dfs func(i int) int
    dfs = func(i int) int {
        if i >= len(nums) {
            return 0
        }

        cur := nums[i]
        pick := 0
        for i < len(nums) && nums[i] == cur {
            pick += nums[i]
            i++
        }

        res := dfs(i)
        for i < len(nums) && nums[i] == cur+1 {
            i++
        }

        res = max(res, pick+dfs(i))
        return res
    }

    return dfs(0)
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
    fun deleteAndEarn(nums: IntArray): Int {
        nums.sort()
        return dfs(nums, 0)
    }

    private fun dfs(nums: IntArray, idx: Int): Int {
        var i = idx
        if (i >= nums.size) return 0

        val cur = nums[i]
        var pick = 0
        while (i < nums.size && nums[i] == cur) {
            pick += nums[i]
            i++
        }

        var res = dfs(nums, i)
        while (i < nums.size && nums[i] == cur + 1) {
            i++
        }

        res = maxOf(res, pick + dfs(nums, i))
        return res
    }
}
```

```swift
class Solution {
    func deleteAndEarn(_ nums: [Int]) -> Int {
        let sortedNums = nums.sorted()

        func dfs(_ i: Int) -> Int {
            var i = i
            if i >= sortedNums.count { return 0 }

            let cur = sortedNums[i]
            var pick = 0
            while i < sortedNums.count && sortedNums[i] == cur {
                pick += sortedNums[i]
                i += 1
            }

            var res = dfs(i)
            while i < sortedNums.count && sortedNums[i] == cur + 1 {
                i += 1
            }

            res = max(res, pick + dfs(i))
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
The recursive solution has overlapping subproblems since we may revisit the same index multiple times. By precomputing the total value for each unique number (sum of all occurrences) and using memoization, we avoid redundant calculations. The problem reduces to: for each unique number, decide whether to take it (earning its total value but skipping the next consecutive number) or skip it.

### Algorithm
1. Build a map where each unique number maps to the sum of all its occurrences.
2. Extract and sort the unique numbers.
3. Create a memo array initialized to `-1`.
4. Define `dfs(i)`:
   - If `i` is out of bounds, return `0`.
   - If `memo[i]` is set, return it.
   - Compute the value of taking `nums[i]`: its total value plus `dfs(i + 2)` if the next number is consecutive, else `dfs(i + 1)`.
   - The result is `max(take, dfs(i + 1))`.
   - Store in memo and return.
5. Return `dfs(0)`.

::tabs-start

```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        val = defaultdict(int)
        for num in nums:
            val[num] += num
        nums = sorted(list(set(nums)))
        memo = [-1] * len(nums)

        def dfs(i):
            if i >= len(nums):
                return 0
            if memo[i] != -1:
                return memo[i]

            res = val[nums[i]]
            if i + 1 < len(nums) and nums[i] + 1 == nums[i + 1]:
                res += dfs(i + 2)
            else:
                res += dfs(i + 1)

            res = max(res, dfs(i + 1))
            memo[i] = res
            return res

        return dfs(0)
```

```java
public class Solution {
    private Map<Integer, Integer> val;
    private int[] memo;

    public int deleteAndEarn(int[] nums) {
        val = new HashMap<>();
        for (int num : nums) {
            val.put(num, val.getOrDefault(num, 0) + num);
        }

        List<Integer> uniqueNums = new ArrayList<>(val.keySet());
        Collections.sort(uniqueNums);
        memo = new int[uniqueNums.size()];
        Arrays.fill(memo, -1);

        return dfs(uniqueNums, 0);
    }

    private int dfs(List<Integer> nums, int i) {
        if (i >= nums.size()) return 0;
        if (memo[i] != -1) return memo[i];

        int res = val.get(nums.get(i));
        if (i + 1 < nums.size() && nums.get(i) + 1 == nums.get(i + 1)) {
            res += dfs(nums, i + 2);
        } else {
            res += dfs(nums, i + 1);
        }

        res = Math.max(res, dfs(nums, i + 1));
        memo[i] = res;
        return res;
    }
}
```

```cpp
class Solution {
    unordered_map<int, int> val;
    vector<int> memo;

public:
    int deleteAndEarn(vector<int>& nums) {
        for (int num : nums) {
            val[num] += num;
        }

        vector<int> uniqueNums;
        for (auto& pair : val) {
            uniqueNums.push_back(pair.first);
        }
        sort(uniqueNums.begin(), uniqueNums.end());
        memo.resize(uniqueNums.size(), -1);

        return dfs(uniqueNums, 0);
    }

private:
    int dfs(vector<int>& nums, int i) {
        if (i >= nums.size()) return 0;
        if (memo[i] != -1) return memo[i];

        int res = val[nums[i]];
        if (i + 1 < nums.size() && nums[i] + 1 == nums[i + 1]) {
            res += dfs(nums, i + 2);
        } else {
            res += dfs(nums, i + 1);
        }

        res = max(res, dfs(nums, i + 1));
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
    deleteAndEarn(nums) {
        const val = new Map();
        nums.forEach((num) => {
            val.set(num, (val.get(num) || 0) + num);
        });
        const uniqueNums = Array.from(new Set(nums)).sort((a, b) => a - b);
        const memo = Array(uniqueNums.length).fill(-1);

        const dfs = (nums, i) => {
            if (i >= nums.length) return 0;
            if (memo[i] !== -1) return memo[i];

            let res = val.get(nums[i]);
            if (i + 1 < nums.length && nums[i] + 1 === nums[i + 1]) {
                res += dfs(nums, i + 2);
            } else {
                res += dfs(nums, i + 1);
            }

            res = Math.max(res, dfs(nums, i + 1));
            memo[i] = res;
            return res;
        };

        return dfs(uniqueNums, 0);
    }
}
```

```go
func deleteAndEarn(nums []int) int {
    val := make(map[int]int)
    for _, num := range nums {
        val[num] += num
    }

    uniqueSet := make(map[int]bool)
    for _, num := range nums {
        uniqueSet[num] = true
    }
    uniqueNums := make([]int, 0, len(uniqueSet))
    for num := range uniqueSet {
        uniqueNums = append(uniqueNums, num)
    }
    sort.Ints(uniqueNums)
    memo := make([]int, len(uniqueNums))
    for i := range memo {
        memo[i] = -1
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if i >= len(uniqueNums) {
            return 0
        }
        if memo[i] != -1 {
            return memo[i]
        }

        res := val[uniqueNums[i]]
        if i+1 < len(uniqueNums) && uniqueNums[i]+1 == uniqueNums[i+1] {
            res += dfs(i + 2)
        } else {
            res += dfs(i + 1)
        }

        res = max(res, dfs(i+1))
        memo[i] = res
        return res
    }

    return dfs(0)
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
    private lateinit var valMap: MutableMap<Int, Int>
    private lateinit var memo: IntArray

    fun deleteAndEarn(nums: IntArray): Int {
        valMap = mutableMapOf()
        for (num in nums) {
            valMap[num] = valMap.getOrDefault(num, 0) + num
        }

        val uniqueNums = valMap.keys.sorted()
        memo = IntArray(uniqueNums.size) { -1 }

        return dfs(uniqueNums, 0)
    }

    private fun dfs(nums: List<Int>, i: Int): Int {
        if (i >= nums.size) return 0
        if (memo[i] != -1) return memo[i]

        var res = valMap[nums[i]]!!
        res += if (i + 1 < nums.size && nums[i] + 1 == nums[i + 1]) {
            dfs(nums, i + 2)
        } else {
            dfs(nums, i + 1)
        }

        res = maxOf(res, dfs(nums, i + 1))
        memo[i] = res
        return res
    }
}
```

```swift
class Solution {
    func deleteAndEarn(_ nums: [Int]) -> Int {
        var val = [Int: Int]()
        for num in nums {
            val[num, default: 0] += num
        }

        let uniqueNums = Array(Set(nums)).sorted()
        var memo = [Int](repeating: -1, count: uniqueNums.count)

        func dfs(_ i: Int) -> Int {
            if i >= uniqueNums.count { return 0 }
            if memo[i] != -1 { return memo[i] }

            var res = val[uniqueNums[i]]!
            if i + 1 < uniqueNums.count && uniqueNums[i] + 1 == uniqueNums[i + 1] {
                res += dfs(i + 2)
            } else {
                res += dfs(i + 1)
            }

            res = max(res, dfs(i + 1))
            memo[i] = res
            return res
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up) - I

### Intuition
We can convert the top-down solution to bottom-up by processing unique numbers from right to left. At each position, we compute the maximum points achievable from that position onward. If the current and next numbers are consecutive, taking the current means skipping the next; otherwise, we can take the current and continue from the next.

### Algorithm
1. Build a map of each unique number to the sum of all its occurrences.
2. Extract and sort the unique numbers.
3. Create a DP array of size `n + 1` initialized to `0`.
4. Iterate from the last unique number to the first:
   - Compute `take` as the value of the current number plus `dp[i + 2]` if the next is consecutive, else `dp[i + 1]`.
   - Set `dp[i] = max(dp[i + 1], take)`.
5. Return `dp[0]`.

::tabs-start

```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        val = defaultdict(int)
        for num in nums:
            val[num] += num
        nums = sorted(list(set(nums)))

        dp = [0] * (len(nums) + 1)
        for i in range(len(nums) - 1, -1, -1):
            take = val[nums[i]]
            if i + 1 < len(nums) and nums[i + 1] == nums[i] + 1:
                take += dp[i + 2]
            else:
                take += dp[i + 1]
            dp[i] = max(dp[i + 1], take)

        return dp[0]
```

```java
public class Solution {
    public int deleteAndEarn(int[] nums) {
        Map<Integer, Integer> val = new HashMap<>();
        for (int num : nums) val.put(num, val.getOrDefault(num, 0) + num);
        List<Integer> sortedNums = new ArrayList<>(val.keySet());
        Collections.sort(sortedNums);

        int[] dp = new int[sortedNums.size() + 1];
        for (int i = sortedNums.size() - 1; i >= 0; i--) {
            int take = val.get(sortedNums.get(i));
            if (i + 1 < sortedNums.size() && sortedNums.get(i + 1) == sortedNums.get(i) + 1) {
                take += dp[i + 2];
            } else {
                take += dp[i + 1];
            }
            dp[i] = Math.max(dp[i + 1], take);
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        unordered_map<int, int> val;
        for (int num : nums) val[num] += num;
        vector<int> sortedNums;
        for (auto& [key, _] : val) sortedNums.push_back(key);
        sort(sortedNums.begin(), sortedNums.end());

        vector<int> dp(sortedNums.size() + 1);
        for (int i = sortedNums.size() - 1; i >= 0; i--) {
            int take = val[sortedNums[i]];
            if (i + 1 < sortedNums.size() && sortedNums[i + 1] == sortedNums[i] + 1) {
                take += dp[i + 2];
            } else {
                take += dp[i + 1];
            }
            dp[i] = max(dp[i + 1], take);
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
    deleteAndEarn(nums) {
        const val = new Map();
        nums.forEach((num) => val.set(num, (val.get(num) || 0) + num));
        const sortedNums = Array.from(val.keys()).sort((a, b) => a - b);

        const dp = Array(sortedNums.length + 1).fill(0);
        for (let i = sortedNums.length - 1; i >= 0; i--) {
            let take = val.get(sortedNums[i]);
            if (
                i + 1 < sortedNums.length &&
                sortedNums[i + 1] === sortedNums[i] + 1
            ) {
                take += dp[i + 2];
            } else {
                take += dp[i + 1];
            }
            dp[i] = Math.max(dp[i + 1], take);
        }

        return dp[0];
    }
}
```

```go
func deleteAndEarn(nums []int) int {
    val := make(map[int]int)
    for _, num := range nums {
        val[num] += num
    }
    sortedNums := make([]int, 0, len(val))
    for key := range val {
        sortedNums = append(sortedNums, key)
    }
    sort.Ints(sortedNums)

    dp := make([]int, len(sortedNums)+1)
    for i := len(sortedNums) - 1; i >= 0; i-- {
        take := val[sortedNums[i]]
        if i+1 < len(sortedNums) && sortedNums[i+1] == sortedNums[i]+1 {
            take += dp[i+2]
        } else {
            take += dp[i+1]
        }
        dp[i] = max(dp[i+1], take)
    }

    return dp[0]
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
    fun deleteAndEarn(nums: IntArray): Int {
        val valMap = mutableMapOf<Int, Int>()
        for (num in nums) {
            valMap[num] = valMap.getOrDefault(num, 0) + num
        }
        val sortedNums = valMap.keys.sorted()

        val dp = IntArray(sortedNums.size + 1)
        for (i in sortedNums.size - 1 downTo 0) {
            var take = valMap[sortedNums[i]]!!
            take += if (i + 1 < sortedNums.size && sortedNums[i + 1] == sortedNums[i] + 1) {
                dp[i + 2]
            } else {
                dp[i + 1]
            }
            dp[i] = maxOf(dp[i + 1], take)
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func deleteAndEarn(_ nums: [Int]) -> Int {
        var val = [Int: Int]()
        for num in nums {
            val[num, default: 0] += num
        }
        let sortedNums = val.keys.sorted()

        var dp = [Int](repeating: 0, count: sortedNums.count + 1)
        for i in stride(from: sortedNums.count - 1, through: 0, by: -1) {
            var take = val[sortedNums[i]]!
            if i + 1 < sortedNums.count && sortedNums[i + 1] == sortedNums[i] + 1 {
                take += dp[i + 2]
            } else {
                take += dp[i + 1]
            }
            dp[i] = max(dp[i + 1], take)
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Bottom-Up) - II

### Intuition
Instead of working with unique sorted numbers, we can use an array indexed by the numbers themselves (`0` to max). Each index stores the total points for that number. This transforms the problem into the classic House Robber problem: you cannot take adjacent indices. We iterate backward, and at each position, choose the maximum of skipping it or taking it plus the result two positions ahead.

### Algorithm
1. Find the maximum value `m` in the array.
2. Create a DP array of size `m + 2` initialized to `0`.
3. For each number in the input, add it to `dp[num]` (accumulating total points per number).
4. Iterate from `m - 1` down to `1`:
   - Set `dp[i] = max(dp[i + 1], dp[i + 2] + dp[i])`.
5. Return `dp[1]`.

::tabs-start

```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        m = max(nums)
        dp = [0] * (m + 2)

        for num in nums:
            dp[num] += num
        for i in range(m - 1, 0, -1):
            dp[i] = max(dp[i + 1], dp[i + 2] + dp[i])

        return dp[1]
```

```java
public class Solution {
    public int deleteAndEarn(int[] nums) {
        int m = 0;
        for (int num : nums) m = Math.max(m, num);

        int[] dp = new int[m + 2];
        for (int num : nums) dp[num] += num;
        for (int i = m - 1; i > 0; i--) {
            dp[i] = Math.max(dp[i + 1], dp[i + 2] + dp[i]);
        }
        return dp[1];
    }
}
```

```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int m = *max_element(nums.begin(), nums.end());
        vector<int> dp(m + 2);
        for (auto& num : nums) {
            dp[num] += num;
        }

        for (int i = m - 1; i > 0; i--) {
            dp[i] = max(dp[i + 1], dp[i + 2] + dp[i]);
        }
        return dp[1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    deleteAndEarn(nums) {
        const m = Math.max(...nums);
        const dp = new Int32Array(m + 2);
        for (let num of nums) {
            dp[num] += num;
        }

        for (let i = m - 1; i > 0; i--) {
            dp[i] = Math.max(dp[i + 1], dp[i + 2] + dp[i]);
        }
        return dp[1];
    }
}
```

```go
func deleteAndEarn(nums []int) int {
    m := 0
    for _, num := range nums {
        if num > m {
            m = num
        }
    }

    dp := make([]int, m+2)
    for _, num := range nums {
        dp[num] += num
    }

    for i := m - 1; i > 0; i-- {
        dp[i] = max(dp[i+1], dp[i+2]+dp[i])
    }
    return dp[1]
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
    fun deleteAndEarn(nums: IntArray): Int {
        val m = nums.maxOrNull()!!
        val dp = IntArray(m + 2)

        for (num in nums) {
            dp[num] += num
        }

        for (i in m - 1 downTo 1) {
            dp[i] = maxOf(dp[i + 1], dp[i + 2] + dp[i])
        }
        return dp[1]
    }
}
```

```swift
class Solution {
    func deleteAndEarn(_ nums: [Int]) -> Int {
        let m = nums.max()!
        var dp = [Int](repeating: 0, count: m + 2)

        for num in nums {
            dp[num] += num
        }

        for i in stride(from: m - 1, through: 1, by: -1) {
            dp[i] = max(dp[i + 1], dp[i + 2] + dp[i])
        }
        return dp[1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(m)$

> Where $m$ is the maximum element in the array and $n$ is the size of the array.

---

## 5. Dynamic Programming (Space Optimized)

### Intuition
We only need to track the maximum earnings for the previous two positions, similar to the space-optimized House Robber solution. By iterating through sorted unique numbers and maintaining two variables, we can reduce space complexity. When consecutive numbers differ by more than `1`, there is no conflict, so we can add the current earnings directly.

### Algorithm
1. Build a map of each unique number to the sum of all its occurrences.
2. Sort the unique numbers.
3. Initialize `earn1 = 0` and `earn2 = 0` to track the max earnings at the previous two positions.
4. Iterate through the sorted unique numbers:
   - If the current number is consecutive to the previous, we have a choice: `earn2 = max(curEarn + earn1, earn2)`.
   - If not consecutive, we can freely take the current: `earn2 = curEarn + earn2`.
   - Update `earn1` to the old `earn2` before modifying.
5. Return `earn2`.

::tabs-start

```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        count = Counter(nums)
        nums = sorted(list(set(nums)))

        earn1, earn2 = 0, 0
        for i in range(len(nums)):
            curEarn = nums[i] * count[nums[i]]
            if i > 0 and nums[i] == nums[i - 1] + 1:
                temp = earn2
                earn2 = max(curEarn + earn1, earn2)
                earn1 = temp
            else:
                temp = earn2
                earn2 = curEarn + earn2
                earn1 = temp
        return earn2
```

```java
public class Solution {
    public int deleteAndEarn(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) count.put(num, count.getOrDefault(num, 0) + num);
        List<Integer> uniqueNums = new ArrayList<>(count.keySet());
        Collections.sort(uniqueNums);

        int earn1 = 0, earn2 = 0;
        for (int i = 0; i < uniqueNums.size(); i++) {
            int curEarn = count.get(uniqueNums.get(i));
            if (i > 0 && uniqueNums.get(i) == uniqueNums.get(i - 1) + 1) {
                int temp = earn2;
                earn2 = Math.max(curEarn + earn1, earn2);
                earn1 = temp;
            } else {
                int temp = earn2;
                earn2 = curEarn + earn2;
                earn1 = temp;
            }
        }
        return earn2;
    }
}
```

```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) count[num] += num;
        vector<int> uniqueNums;
        for (auto& pair : count) uniqueNums.push_back(pair.first);
        sort(uniqueNums.begin(), uniqueNums.end());

        int earn1 = 0, earn2 = 0;
        for (int i = 0; i < uniqueNums.size(); i++) {
            int curEarn = count[uniqueNums[i]];
            if (i > 0 && uniqueNums[i] == uniqueNums[i - 1] + 1) {
                int temp = earn2;
                earn2 = max(curEarn + earn1, earn2);
                earn1 = temp;
            } else {
                int temp = earn2;
                earn2 = curEarn + earn2;
                earn1 = temp;
            }
        }
        return earn2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    deleteAndEarn(nums) {
        const count = new Map();
        nums.forEach((num) => count.set(num, (count.get(num) || 0) + num));
        const uniqueNums = [...count.keys()].sort((a, b) => a - b);

        let earn1 = 0,
            earn2 = 0;
        for (let i = 0; i < uniqueNums.length; i++) {
            const curEarn = count.get(uniqueNums[i]);
            if (i > 0 && uniqueNums[i] === uniqueNums[i - 1] + 1) {
                const temp = earn2;
                earn2 = Math.max(curEarn + earn1, earn2);
                earn1 = temp;
            } else {
                const temp = earn2;
                earn2 = curEarn + earn2;
                earn1 = temp;
            }
        }
        return earn2;
    }
}
```

```go
func deleteAndEarn(nums []int) int {
    count := make(map[int]int)
    for _, num := range nums {
        count[num] += num
    }
    uniqueNums := make([]int, 0, len(count))
    for key := range count {
        uniqueNums = append(uniqueNums, key)
    }
    sort.Ints(uniqueNums)

    earn1, earn2 := 0, 0
    for i := 0; i < len(uniqueNums); i++ {
        curEarn := count[uniqueNums[i]]
        if i > 0 && uniqueNums[i] == uniqueNums[i-1]+1 {
            temp := earn2
            earn2 = max(curEarn+earn1, earn2)
            earn1 = temp
        } else {
            temp := earn2
            earn2 = curEarn + earn2
            earn1 = temp
        }
    }
    return earn2
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
    fun deleteAndEarn(nums: IntArray): Int {
        val count = mutableMapOf<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + num
        }
        val uniqueNums = count.keys.sorted()

        var earn1 = 0
        var earn2 = 0
        for (i in uniqueNums.indices) {
            val curEarn = count[uniqueNums[i]]!!
            if (i > 0 && uniqueNums[i] == uniqueNums[i - 1] + 1) {
                val temp = earn2
                earn2 = maxOf(curEarn + earn1, earn2)
                earn1 = temp
            } else {
                val temp = earn2
                earn2 = curEarn + earn2
                earn1 = temp
            }
        }
        return earn2
    }
}
```

```swift
class Solution {
    func deleteAndEarn(_ nums: [Int]) -> Int {
        var count = [Int: Int]()
        for num in nums {
            count[num, default: 0] += num
        }
        let uniqueNums = count.keys.sorted()

        var earn1 = 0
        var earn2 = 0
        for i in 0..<uniqueNums.count {
            let curEarn = count[uniqueNums[i]]!
            if i > 0 && uniqueNums[i] == uniqueNums[i - 1] + 1 {
                let temp = earn2
                earn2 = max(curEarn + earn1, earn2)
                earn1 = temp
            } else {
                let temp = earn2
                earn2 = curEarn + earn2
                earn1 = temp
            }
        }
        return earn2
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
