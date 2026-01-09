## 1. Backtracking

### Intuition

A subset is beautiful if no two elements have an absolute difference of `k`. We can explore all possible subsets using backtracking. For each element, we decide whether to include it or skip it. Before including an element, we check if adding it would create a conflict with any element already in our current subset.

A hash map tracks the count of each number in the current subset. When considering `nums[i]`, we check if `nums[i] + k` or `nums[i] - k` exists in the map. If neither exists, we can safely include the element and recurse deeper.

### Algorithm

1. Use a recursive helper function starting at index `0` with an empty count map.
2. Base case: when index equals the array length, return `1` to count this valid subset.
3. For each index, first count subsets that skip the current element by recursing to `i + 1`.
4. Check if including `nums[i]` is valid by verifying neither `nums[i] + k` nor `nums[i] - k` exists in the count map.
5. If valid, increment the count for `nums[i]`, recurse, then decrement (backtrack).
6. Subtract `1` from the final result to exclude the empty subset.

::tabs-start

```python
class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        def helper(i, count):
            if i == len(nums):
                return 1

            res = helper(i + 1, count)  # Skip nums[i]
            if not count[nums[i] + k] and not count[nums[i] - k]:
                count[nums[i]] += 1
                res += helper(i + 1, count)
                count[nums[i]] -= 1

            return res

        return helper(0, defaultdict(int)) - 1
```

```java
public class Solution {
    public int beautifulSubsets(int[] nums, int k) {
        return helper(0, new HashMap<>(), nums, k) - 1;
    }

    private int helper(int i, Map<Integer, Integer> count, int[] nums, int k) {
        if (i == nums.length) {
            return 1;
        }

        int res = helper(i + 1, count, nums, k); // Skip nums[i]

        if (!count.containsKey(nums[i] + k) && !count.containsKey(nums[i] - k)) {
            count.put(nums[i], count.getOrDefault(nums[i], 0) + 1);
            res += helper(i + 1, count, nums, k);
            count.put(nums[i], count.get(nums[i]) - 1);
            if (count.get(nums[i]) == 0) {
                count.remove(nums[i]);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int beautifulSubsets(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        return helper(0, count, nums, k) - 1;
    }

private:
    int helper(int i, unordered_map<int, int>& count, vector<int>& nums, int k) {
        if (i == nums.size()) {
            return 1;
        }

        int res = helper(i + 1, count, nums, k); // Skip nums[i]
        if (!count[nums[i] + k] && !count[nums[i] - k]) {
            count[nums[i]]++;
            res += helper(i + 1, count, nums, k);
            count[nums[i]]--;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    beautifulSubsets(nums, k) {
        const helper = (i, count) => {
            if (i === nums.length) {
                return 1;
            }

            let res = helper(i + 1, count); // Skip nums[i]

            if (!count.has(nums[i] + k) && !count.has(nums[i] - k)) {
                count.set(nums[i], (count.get(nums[i]) || 0) + 1);
                res += helper(i + 1, count);
                count.set(nums[i], count.get(nums[i]) - 1);
                if (count.get(nums[i]) === 0) {
                    count.delete(nums[i]);
                }
            }

            return res;
        };

        return helper(0, new Map()) - 1;
    }
}
```

```go
func beautifulSubsets(nums []int, k int) int {
    count := make(map[int]int)

    var helper func(i int) int
    helper = func(i int) int {
        if i == len(nums) {
            return 1
        }

        res := helper(i + 1) // Skip nums[i]

        if count[nums[i]+k] == 0 && count[nums[i]-k] == 0 {
            count[nums[i]]++
            res += helper(i + 1)
            count[nums[i]]--
            if count[nums[i]] == 0 {
                delete(count, nums[i])
            }
        }

        return res
    }

    return helper(0) - 1
}
```

```kotlin
class Solution {
    fun beautifulSubsets(nums: IntArray, k: Int): Int {
        val count = mutableMapOf<Int, Int>()

        fun helper(i: Int): Int {
            if (i == nums.size) {
                return 1
            }

            var res = helper(i + 1) // Skip nums[i]

            if ((count[nums[i] + k] ?: 0) == 0 && (count[nums[i] - k] ?: 0) == 0) {
                count[nums[i]] = (count[nums[i]] ?: 0) + 1
                res += helper(i + 1)
                count[nums[i]] = count[nums[i]]!! - 1
                if (count[nums[i]] == 0) {
                    count.remove(nums[i])
                }
            }

            return res
        }

        return helper(0) - 1
    }
}
```

```swift
class Solution {
    func beautifulSubsets(_ nums: [Int], _ k: Int) -> Int {
        var count = [Int: Int]()

        func helper(_ i: Int) -> Int {
            if i == nums.count {
                return 1
            }

            var res = helper(i + 1) // Skip nums[i]

            if (count[nums[i] + k] ?? 0) == 0 && (count[nums[i] - k] ?? 0) == 0 {
                count[nums[i], default: 0] += 1
                res += helper(i + 1)
                count[nums[i]]! -= 1
                if count[nums[i]] == 0 {
                    count.removeValue(forKey: nums[i])
                }
            }

            return res
        }

        return helper(0) - 1
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

Numbers can only conflict if their difference is exactly `k`. This means numbers that differ by `k` form chains where adjacent elements cannot both appear in a beautiful subset. By grouping numbers into these chains, we transform the problem into independent subproblems.

For each chain, we solve a variation of the house robber problem: at each position, we either skip the current number or include some combination of its duplicates (if the number appears multiple times). If we include any copies of a number, we must skip the next number in the chain.

### Algorithm

1. Count the frequency of each number using a hash map.
2. Build groups where each group contains numbers that form a chain differing by `k` (e.g., `[1, 3, 5]` for `k=2`).
3. For each group, use memoized recursion starting from the smallest number.
4. At each number `n` in a group, either skip it (recurse to `n + k`) or include some of its copies and skip the next (recurse to `n + 2k`).
5. When including a number with count `c`, there are `2^c - 1` ways to choose which copies to include.
6. Multiply the results from all independent groups and subtract `1` for the empty subset.

::tabs-start

```python
class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        cnt = Counter(nums)
        groups = []  # List of dicts
        cache = {}

        def helper(n, g):
            if n not in g:
                return 1
            if n in cache:
                return cache[n]

            skip = helper(n + k, g)
            include = (2**g[n] - 1) * helper(n + 2 * k, g)
            cache[n] = skip + include
            return skip + include

        visit = set()
        for n in cnt.keys():
            if n in visit:
                continue
            g = {}
            while n - k in cnt:
                n -= k
            while n in cnt:
                g[n] = cnt[n]
                visit.add(n)
                n += k
            groups.append(g)

        res = 1
        for g in groups:
            n = min(g.keys())
            res *= helper(n, g)

        return res - 1
```

```java
public class Solution {
    private Map<Integer, Integer> cache;
    private Map<Integer, Integer> cnt;
    private Set<Integer> visit;

    public int beautifulSubsets(int[] nums, int k) {
        List<Map<Integer, Integer>> groups = new ArrayList<>();
        this.cache = new HashMap<>();
        this.cnt = new HashMap<>();
        this.visit = new HashSet<>();

        for (int num : nums) {
            cnt.put(num, cnt.getOrDefault(num, 0) + 1);
        }

        for (int n : cnt.keySet()) {
            if (visit.contains(n)) {
                continue;
            }
            Map<Integer, Integer> g = new HashMap<>();
            while (cnt.containsKey(n - k)) {
                n -= k;
            }
            while (cnt.containsKey(n)) {
                g.put(n, cnt.get(n));
                visit.add(n);
                n += k;
            }
            groups.add(g);
        }

        int res = 1;
        for (Map<Integer, Integer> g : groups) {
            int n = Collections.min(g.keySet());
            res *= helper(n, g, k);
        }

        return res - 1;
    }

    private int helper(int n, Map<Integer, Integer> g, int k) {
        if (!g.containsKey(n)) {
            return 1;
        }
        if (cache.containsKey(n)) {
            return cache.get(n);
        }

        int skip = helper(n + k, g, k);
        int include = (int) ((Math.pow(2, g.get(n)) - 1) * helper(n + 2 * k, g, k));
        int result = skip + include;
        cache.put(n, result);
        return result;
    }
}
```

```cpp
class Solution {
public:
    int beautifulSubsets(vector<int>& nums, int k) {
        vector<unordered_map<int, int>> groups;
        cache.clear();
        cnt.clear();
        visit.clear();

        for (int& num : nums) {
            cnt[num]++;
        }

        for (auto it = cnt.begin(); it != cnt.end(); ++it) {
            int n = it->first;
            if (visit.count(n)) {
                continue;
            }
            unordered_map<int, int> g;
            while (cnt.count(n - k)) {
                n -= k;
            }
            while (cnt.count(n)) {
                g[n] = cnt[n];
                visit.insert(n);
                n += k;
            }
            groups.push_back(g);
        }

        int res = 1;
        for (auto& g : groups) {
            int n = min_element(g.begin(), g.end())->first;
            res *= helper(n, g, k);
        }
        return res - 1;
    }

private:
    unordered_map<int, int> cache;
    unordered_map<int, int> cnt;
    unordered_set<int> visit;

    int helper(int n, unordered_map<int, int>& g, int k) {
        if (!g.count(n)) {
            return 1;
        }
        if (cache.count(n)) {
            return cache[n];
        }

        int skip = helper(n + k, g, k);
        int include = (pow(2, g[n]) - 1) * helper(n + 2 * k, g, k);
        return cache[n] = skip + include;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    beautifulSubsets(nums, k) {
        let cnt = new Map();
        for (const num of nums) {
            cnt.set(num, (cnt.get(num) || 0) + 1);
        }

        let groups = [];
        let cache = new Map();
        let visit = new Set();

        for (let n of cnt.keys()) {
            if (visit.has(n)) {
                continue;
            }
            let g = new Map();
            while (cnt.has(n - k)) {
                n -= k;
            }
            while (cnt.has(n)) {
                g.set(n, cnt.get(n));
                visit.add(n);
                n += k;
            }
            groups.push(g);
        }

        const helper = (n, g) => {
            if (!g.has(n)) {
                return 1;
            }
            if (cache.has(n)) {
                return cache.get(n);
            }

            let skip = helper(n + k, g);
            let include = (2 ** g.get(n) - 1) * helper(n + 2 * k, g);
            let result = skip + include;
            cache.set(n, result);
            return result;
        };

        let res = 1;
        for (const g of groups) {
            let n = Math.min(...g.keys());
            res *= helper(n, g);
        }
        return res - 1;
    }
}
```

```go
func beautifulSubsets(nums []int, k int) int {
    cnt := make(map[int]int)
    for _, num := range nums {
        cnt[num]++
    }

    groups := []map[int]int{}
    visit := make(map[int]bool)

    for n := range cnt {
        if visit[n] {
            continue
        }
        g := make(map[int]int)
        for cnt[n-k] > 0 {
            n -= k
        }
        for cnt[n] > 0 {
            g[n] = cnt[n]
            visit[n] = true
            n += k
        }
        groups = append(groups, g)
    }

    cache := make(map[int]int)

    var helper func(n int, g map[int]int) int
    helper = func(n int, g map[int]int) int {
        if _, ok := g[n]; !ok {
            return 1
        }
        if val, ok := cache[n]; ok {
            return val
        }

        skip := helper(n+k, g)
        include := ((1 << g[n]) - 1) * helper(n+2*k, g)
        cache[n] = skip + include
        return cache[n]
    }

    res := 1
    for _, g := range groups {
        minN := math.MaxInt32
        for n := range g {
            if n < minN {
                minN = n
            }
        }
        cache = make(map[int]int)
        res *= helper(minN, g)
    }

    return res - 1
}
```

```kotlin
class Solution {
    fun beautifulSubsets(nums: IntArray, k: Int): Int {
        val cnt = mutableMapOf<Int, Int>()
        for (num in nums) {
            cnt[num] = (cnt[num] ?: 0) + 1
        }

        val groups = mutableListOf<MutableMap<Int, Int>>()
        val visit = mutableSetOf<Int>()

        for (n in cnt.keys) {
            if (n in visit) continue
            val g = mutableMapOf<Int, Int>()
            var num = n
            while (cnt.containsKey(num - k)) {
                num -= k
            }
            while (cnt.containsKey(num)) {
                g[num] = cnt[num]!!
                visit.add(num)
                num += k
            }
            groups.add(g)
        }

        var res = 1
        for (g in groups) {
            val cache = mutableMapOf<Int, Int>()

            fun helper(n: Int): Int {
                if (!g.containsKey(n)) return 1
                if (cache.containsKey(n)) return cache[n]!!

                val skip = helper(n + k)
                val include = ((1 shl g[n]!!) - 1) * helper(n + 2 * k)
                cache[n] = skip + include
                return cache[n]!!
            }

            val minN = g.keys.minOrNull()!!
            res *= helper(minN)
        }

        return res - 1
    }
}
```

```swift
class Solution {
    func beautifulSubsets(_ nums: [Int], _ k: Int) -> Int {
        var cnt = [Int: Int]()
        for num in nums {
            cnt[num, default: 0] += 1
        }

        var groups = [[Int: Int]]()
        var visit = Set<Int>()

        for n in cnt.keys {
            if visit.contains(n) { continue }
            var g = [Int: Int]()
            var num = n
            while cnt[num - k] != nil {
                num -= k
            }
            while cnt[num] != nil {
                g[num] = cnt[num]!
                visit.insert(num)
                num += k
            }
            groups.append(g)
        }

        var res = 1
        for g in groups {
            var cache = [Int: Int]()

            func helper(_ n: Int) -> Int {
                if g[n] == nil { return 1 }
                if let val = cache[n] { return val }

                let skip = helper(n + k)
                let include = ((1 << g[n]!) - 1) * helper(n + 2 * k)
                cache[n] = skip + include
                return cache[n]!
            }

            let minN = g.keys.min()!
            res *= helper(minN)
        }

        return res - 1
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

Instead of using recursion with memoization, we can build the solution iteratively. After grouping numbers into chains, we process each chain from smallest to largest. At each step, we track the total number of valid subsets we can form using numbers up to the current position.

The key insight is that when processing a number, we need to know how many subsets were possible before the previous number (to combine with including the current number) and how many were possible including the previous number (which we cannot combine with the current number).

### Algorithm

1. Group numbers into chains as in the top-down approach.
2. For each group, sort the numbers and iterate through them.
3. Maintain a DP map where `dp[num]` represents the count of valid subsets ending at or before `num`.
4. If the current number is not consecutive to the previous (differs by more than `k`), we can freely combine all previous subsets with the current number's choices.
5. If consecutive, we can only include the current number with subsets that did not include the previous number.
6. Multiply results from all groups and subtract `1`.

::tabs-start

```python
class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        cnt = Counter(nums)
        groups = []  # List of dicts

        visit = set()
        for n in cnt.keys():
            if n in visit:
                continue
            g = {}
            while n - k in cnt:
                n -= k
            while n in cnt:
                g[n] = cnt[n]
                visit.add(n)
                n += k
            groups.append(g)

        res = 1
        for g in groups:
            dp = {}
            prev = None

            for num in sorted(g):
                count = g[num]
                if prev is None or prev + k != num:
                    dp[num] = (dp.get(prev, 1) * (1 + (2 ** count - 1)))
                else:
                    dp[num] = dp[prev] + (2 ** count - 1) * dp.get(prev - k, 1)
                prev = num

            res *= dp[prev]

        return res - 1
```

```java
class Solution {
    public int beautifulSubsets(int[] nums, int k) {
        Map<Integer, Integer> cnt = new HashMap<>();
        for (int num : nums) {
            cnt.put(num, cnt.getOrDefault(num, 0) + 1);
        }

        List<Map<Integer, Integer>> groups = new ArrayList<>();
        Set<Integer> visit = new HashSet<>();

        for (int n : cnt.keySet()) {
            if (visit.contains(n)) {
                continue;
            }
            Map<Integer, Integer> g = new HashMap<>();
            while (cnt.containsKey(n - k)) {
                n -= k;
            }
            while (cnt.containsKey(n)) {
                g.put(n, cnt.get(n));
                visit.add(n);
                n += k;
            }
            groups.add(g);
        }

        int res = 1;
        for (Map<Integer, Integer> g : groups) {
            Map<Integer, Integer> dp = new HashMap<>();
            Integer prev = null;

            List<Integer> arr = new ArrayList<>(g.keySet());
            Collections.sort(arr);
            for (int num : arr) {
                int count = g.get(num);
                if (prev == null || prev + k != num) {
                    dp.put(num, dp.getOrDefault(prev, 1) * (1 + (int) Math.pow(2, count) - 1));
                } else {
                    dp.put(num, dp.get(prev) +
                          ((int) Math.pow(2, count) - 1) * dp.getOrDefault(prev - k, 1));
                }
                prev = num;
            }

            res *= dp.get(prev);
        }

        return res - 1;
    }
}
```

```cpp
class Solution {
public:
    int beautifulSubsets(vector<int>& nums, int k) {
        unordered_map<int, int> cnt;
        for (int num : nums) {
            cnt[num]++;
        }

        vector<unordered_map<int, int>> groups;
        unordered_set<int> visit;

        for (auto it = cnt.begin(); it != cnt.end(); ++it) {
            int n = it->first;
            if (visit.count(n)) {
                continue;
            }
            unordered_map<int, int> g;
            while (cnt.count(n - k)) {
                n -= k;
            }
            while (cnt.count(n)) {
                g[n] = cnt[n];
                visit.insert(n);
                n += k;
            }
            groups.push_back(g);
        }

        int res = 1;
        for (auto& g : groups) {
            unordered_map<int, int> dp;
            int prev = -1;

            vector<int> keys;
            for (auto& [num, _] : g) {
                keys.push_back(num);
            }
            sort(keys.begin(), keys.end());

            for (int num : keys) {
                int count = g[num];
                if (prev == -1 || prev + k != num) {
                    dp[num] = dp.count(prev) ? dp[prev] * (1 + (1 << count) - 1) :
                                               (1 + (1 << count) - 1);
                } else {
                    dp[num] = dp[prev] + ((1 << count) - 1) *
                              (dp.count(prev - k) ? dp[prev - k] : 1);
                }
                prev = num;
            }

            res *= dp[prev];
        }

        return res - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    beautifulSubsets(nums, k) {
        let cnt = new Map();
        for (const num of nums) {
            cnt.set(num, (cnt.get(num) || 0) + 1);
        }

        let groups = [];
        let visit = new Set();

        for (const n of cnt.keys()) {
            if (visit.has(n)) {
                continue;
            }
            let g = new Map();
            let num = n;
            while (cnt.has(num - k)) {
                num -= k;
            }
            while (cnt.has(num)) {
                g.set(num, cnt.get(num));
                visit.add(num);
                num += k;
            }
            groups.push(g);
        }

        let res = 1;
        for (const g of groups) {
            let dp = new Map();
            let prev = null;

            for (const num of g.keys()) {
                let count = g.get(num);
                if (prev === null || prev + k !== num) {
                    dp.set(num, (dp.get(prev) || 1) * (1 + (2 ** count - 1)));
                } else {
                    dp.set(
                        num,
                        dp.get(prev) +
                            (2 ** count - 1) * (dp.get(prev - k) || 1),
                    );
                }
                prev = num;
            }

            res *= dp.get(prev);
        }

        return res - 1;
    }
}
```

```go
func beautifulSubsets(nums []int, k int) int {
    cnt := make(map[int]int)
    for _, num := range nums {
        cnt[num]++
    }

    groups := []map[int]int{}
    visit := make(map[int]bool)

    for n := range cnt {
        if visit[n] {
            continue
        }
        g := make(map[int]int)
        num := n
        for cnt[num-k] > 0 {
            num -= k
        }
        for cnt[num] > 0 {
            g[num] = cnt[num]
            visit[num] = true
            num += k
        }
        groups = append(groups, g)
    }

    res := 1
    for _, g := range groups {
        dp := make(map[int]int)
        prev := -1

        keys := make([]int, 0, len(g))
        for num := range g {
            keys = append(keys, num)
        }
        sort.Ints(keys)

        for _, num := range keys {
            count := g[num]
            if prev == -1 || prev+k != num {
                prevVal := 1
                if prev != -1 {
                    prevVal = dp[prev]
                }
                dp[num] = prevVal * (1 + (1<<count) - 1)
            } else {
                prevKVal := 1
                if val, ok := dp[prev-k]; ok {
                    prevKVal = val
                }
                dp[num] = dp[prev] + ((1<<count)-1)*prevKVal
            }
            prev = num
        }

        res *= dp[prev]
    }

    return res - 1
}
```

```kotlin
class Solution {
    fun beautifulSubsets(nums: IntArray, k: Int): Int {
        val cnt = mutableMapOf<Int, Int>()
        for (num in nums) {
            cnt[num] = (cnt[num] ?: 0) + 1
        }

        val groups = mutableListOf<MutableMap<Int, Int>>()
        val visit = mutableSetOf<Int>()

        for (n in cnt.keys) {
            if (n in visit) continue
            val g = mutableMapOf<Int, Int>()
            var num = n
            while (cnt.containsKey(num - k)) {
                num -= k
            }
            while (cnt.containsKey(num)) {
                g[num] = cnt[num]!!
                visit.add(num)
                num += k
            }
            groups.add(g)
        }

        var res = 1
        for (g in groups) {
            val dp = mutableMapOf<Int, Int>()
            var prev: Int? = null

            for (num in g.keys.sorted()) {
                val count = g[num]!!
                if (prev == null || prev!! + k != num) {
                    dp[num] = (dp[prev] ?: 1) * (1 + (1 shl count) - 1)
                } else {
                    dp[num] = dp[prev]!! + ((1 shl count) - 1) * (dp[prev!! - k] ?: 1)
                }
                prev = num
            }

            res *= dp[prev]!!
        }

        return res - 1
    }
}
```

```swift
class Solution {
    func beautifulSubsets(_ nums: [Int], _ k: Int) -> Int {
        var cnt = [Int: Int]()
        for num in nums {
            cnt[num, default: 0] += 1
        }

        var groups = [[Int: Int]]()
        var visit = Set<Int>()

        for n in cnt.keys {
            if visit.contains(n) { continue }
            var g = [Int: Int]()
            var num = n
            while cnt[num - k] != nil {
                num -= k
            }
            while cnt[num] != nil {
                g[num] = cnt[num]!
                visit.insert(num)
                num += k
            }
            groups.append(g)
        }

        var res = 1
        for g in groups {
            var dp = [Int: Int]()
            var prev: Int? = nil

            for num in g.keys.sorted() {
                let count = g[num]!
                if prev == nil || prev! + k != num {
                    dp[num] = (prev != nil ? dp[prev!]! : 1) * (1 + (1 << count) - 1)
                } else {
                    dp[num] = dp[prev!]! + ((1 << count) - 1) * (dp[prev! - k] ?? 1)
                }
                prev = num
            }

            res *= dp[prev!]!
        }

        return res - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

We can optimize space by observing that we only need information from the previous two positions in each chain. Instead of storing results for all numbers in a DP map, we use two variables: one for subsets that include the previous number (`dp`) and one for subsets that do not include it (`ndp`).

By grouping numbers based on their remainder when divided by `k`, we naturally partition them into non-interacting groups. Numbers with different remainders can never conflict since their difference cannot be exactly `k`.

### Algorithm

1. Group numbers by `num % k` to identify independent chains.
2. For each group, sort numbers and process them with two state variables: `dp` (subsets including some copies of the previous number) and `ndp` (subsets not including the previous number).
3. For each number with count `c`, compute `have = 2^c - 1` (ways to include at least one copy).
4. If the current number is not adjacent to the previous in the chain, we can combine `have` with both `dp` and `ndp`.
5. If adjacent, we can only combine `have` with `ndp`.
6. Update `ndp` to include the old `dp` (representing subsets that skip the current number).
7. Multiply `(dp + ndp)` across all groups and subtract `1`.

::tabs-start

```python
class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        cnt = Counter(nums)
        groups = defaultdict(dict)

        # Group numbers based on their remainder with k
        for num in nums:
            groups[num % k][num] = cnt[num]

        res = 1
        for g in groups.values():
            prev = 0
            dp, ndp = 0, 1

            for num in sorted(g.keys()):
                count = g[num]
                have = (1 << count) - 1
                tmp = ndp
                ndp += dp

                if prev == 0 or prev + k != num:
                    dp = have * (tmp + dp)
                else:
                    dp = tmp * have

                prev = num

            res *= (dp + ndp)

        return res - 1
```

```java
public class Solution {
    public int beautifulSubsets(int[] nums, int k) {
        Map<Integer, Map<Integer, Integer>> groups = new HashMap<>();
        Map<Integer, Integer> cnt = new HashMap<>();
        for (int num : nums) {
            cnt.put(num, cnt.getOrDefault(num, 0) + 1);
        }

        // Group numbers based on remainder with k
        for (int num : nums) {
            groups.putIfAbsent(num % k, new HashMap<>());
            groups.get(num % k).put(num, cnt.get(num));
        }

        int res = 1;
        for (Map<Integer, Integer> g : groups.values()) {
            int prev = 0, dp = 0, ndp = 1;
            List<Integer> sortedKeys = new ArrayList<>(g.keySet());
            Collections.sort(sortedKeys);

            for (int num : sortedKeys) {
                int count = g.get(num);
                int have = (1 << count) - 1;
                int tmp = ndp;
                ndp += dp;

                if (prev == 0 || prev + k != num) {
                    dp = have * (tmp + dp);
                } else {
                    dp = tmp * have;
                }

                prev = num;
            }

            res *= (dp + ndp);
        }

        return res - 1;
    }
}
```

```cpp
class Solution {
public:
    int beautifulSubsets(vector<int>& nums, int k) {
        unordered_map<int, map<int, int>> groups;
        unordered_map<int, int> cnt;
        for (int& num : nums) {
            cnt[num]++;
        }

        // Group numbers based on remainder with k
        for (int num : nums) {
            groups[num % k][num] = cnt[num];
        }

        int res = 1;
        for (auto& [rem, g] : groups) {
            int prev = 0, dp = 0, ndp = 1;

            for (auto& [num, count] : g) {
                int have = (1 << count) - 1;
                int tmp = ndp;
                ndp += dp;

                if (prev == 0 || prev + k != num) {
                    dp = have * (tmp + dp);
                } else {
                    dp = tmp * have;
                }

                prev = num;
            }

            res *= (dp + ndp);
        }

        return res - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    beautifulSubsets(nums, k) {
        let groups = new Map();
        let cnt = new Map();
        for (const num of nums) {
            cnt.set(num, (cnt.get(num) || 0) + 1);
        }

        // Group numbers based on remainder with k
        for (const num of nums) {
            if (!groups.has(num % k)) {
                groups.set(num % k, new Map());
            }
            groups.get(num % k).set(num, cnt.get(num));
        }

        let res = 1;
        for (const g of groups.values()) {
            let prev = 0,
                dp = 0,
                ndp = 1;
            let sortedKeys = Array.from(g.keys()).sort((a, b) => a - b);

            for (const num of sortedKeys) {
                let count = g.get(num);
                let have = (1 << count) - 1;
                let tmp = ndp;
                ndp += dp;

                if (prev === 0 || prev + k !== num) {
                    dp = have * (tmp + dp);
                } else {
                    dp = tmp * have;
                }

                prev = num;
            }

            res *= dp + ndp;
        }

        return res - 1;
    }
}
```

```go
func beautifulSubsets(nums []int, k int) int {
    groups := make(map[int]map[int]int)
    cnt := make(map[int]int)
    for _, num := range nums {
        cnt[num]++
    }

    // Group numbers based on remainder with k
    for _, num := range nums {
        if groups[num%k] == nil {
            groups[num%k] = make(map[int]int)
        }
        groups[num%k][num] = cnt[num]
    }

    res := 1
    for _, g := range groups {
        prev, dp, ndp := 0, 0, 1
        keys := make([]int, 0, len(g))
        for num := range g {
            keys = append(keys, num)
        }
        sort.Ints(keys)

        for _, num := range keys {
            count := g[num]
            have := (1 << count) - 1
            tmp := ndp
            ndp += dp

            if prev == 0 || prev+k != num {
                dp = have * (tmp + dp)
            } else {
                dp = tmp * have
            }

            prev = num
        }

        res *= (dp + ndp)
    }

    return res - 1
}
```

```kotlin
class Solution {
    fun beautifulSubsets(nums: IntArray, k: Int): Int {
        val groups = mutableMapOf<Int, MutableMap<Int, Int>>()
        val cnt = mutableMapOf<Int, Int>()
        for (num in nums) {
            cnt[num] = (cnt[num] ?: 0) + 1
        }

        // Group numbers based on remainder with k
        for (num in nums) {
            groups.getOrPut(num % k) { mutableMapOf() }[num] = cnt[num]!!
        }

        var res = 1
        for (g in groups.values) {
            var prev = 0
            var dp = 0
            var ndp = 1
            val sortedKeys = g.keys.sorted()

            for (num in sortedKeys) {
                val count = g[num]!!
                val have = (1 shl count) - 1
                val tmp = ndp
                ndp += dp

                dp = if (prev == 0 || prev + k != num) {
                    have * (tmp + dp)
                } else {
                    tmp * have
                }

                prev = num
            }

            res *= (dp + ndp)
        }

        return res - 1
    }
}
```

```swift
class Solution {
    func beautifulSubsets(_ nums: [Int], _ k: Int) -> Int {
        var groups = [Int: [Int: Int]]()
        var cnt = [Int: Int]()
        for num in nums {
            cnt[num, default: 0] += 1
        }

        // Group numbers based on remainder with k
        for num in nums {
            if groups[num % k] == nil {
                groups[num % k] = [Int: Int]()
            }
            groups[num % k]![num] = cnt[num]!
        }

        var res = 1
        for g in groups.values {
            var prev = 0
            var dp = 0
            var ndp = 1
            let sortedKeys = g.keys.sorted()

            for num in sortedKeys {
                let count = g[num]!
                let have = (1 << count) - 1
                let tmp = ndp
                ndp += dp

                if prev == 0 || prev + k != num {
                    dp = have * (tmp + dp)
                } else {
                    dp = tmp * have
                }

                prev = num
            }

            res *= (dp + ndp)
        }

        return res - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
