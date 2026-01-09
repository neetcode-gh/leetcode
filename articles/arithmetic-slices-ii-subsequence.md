## 1. Brute Force

::tabs-start

```python
class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 3:
            return 0

        INF = float('inf')
        dp = {}

        def dfs(i, j, diff, flag):
            if i == n:
                return flag
            if (i, j, diff, flag) in dp:
                return dp[(i, j, diff, flag)]

            res = dfs(i + 1, j, diff, flag)
            if j == -1:
                res += dfs(i + 1, i, INF, flag)
            else:
                if diff == INF:
                    res += dfs(i + 1, i, nums[i] - nums[j], flag)
                elif diff == nums[i] - nums[j]:
                    res += dfs(i + 1, i, diff, 1)

            dp[(i, j, diff, flag)] = res
            return res

        return dfs(0, -1, INF, 0)
```

```java
public class Solution {
    private static final long INF = (long) 1e15;
    private Map<String, Integer> dp = new HashMap<>();

    public int numberOfArithmeticSlices(int[] nums) {
        int n = nums.length;
        if (n < 3) return 0;

        return dfs(nums, 0, -1, INF, 0);
    }

    private int dfs(int[] nums, int i, int j, long diff, int flag) {
        if (i == nums.length) {
            return flag;
        }
        String key = i + "," + j + "," + diff + "," + flag;
        if (dp.containsKey(key)) {
            return dp.get(key);
        }

        int res = dfs(nums, i + 1, j, diff, flag);
        if (j == -1) {
            res += dfs(nums, i + 1, i, INF, flag);
        } else {
            if (diff == INF) {
                res += dfs(nums, i + 1, i, nums[i] - 0L - nums[j], flag);
            } else if (diff == nums[i] - 0L - nums[j]) {
                res += dfs(nums, i + 1, i, diff, 1);
            }
        }

        dp.put(key, res);
        return res;
    }
}
```

```cpp
class Solution {
    static const long long INF = 1e15;
    unordered_map<string, int> dp;

    int dfs(vector<int>& nums, int i, int j, long long diff, int flag) {
        if (i == nums.size()) {
            return flag;
        }

        string key = to_string(i) + "," + to_string(j) + "," + to_string(diff) + "," + to_string(flag);
        if (dp.count(key)) {
            return dp[key];
        }

        int res = dfs(nums, i + 1, j, diff, flag);
        if (j == -1) {
            res += dfs(nums, i + 1, i, INF, flag);
        } else {
            if (diff == INF) {
                res += dfs(nums, i + 1, i, nums[i] - 0LL - nums[j], flag);
            } else if (diff == nums[i] - 0LL - nums[j]) {
                res += dfs(nums, i + 1, i, diff, 1);
            }
        }

        dp[key] = res;
        return res;
    }

public:
    int numberOfArithmeticSlices(vector<int>& nums) {
        if (nums.size() < 3) return 0;
        return dfs(nums, 0, -1, INF, 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    numberOfArithmeticSlices(nums) {
        const n = nums.length;
        if (n < 3) return 0;

        const INF = Infinity;
        const dp = new Map();

        const dfs = (i, j, diff, flag) => {
            if (i === n) {
                return flag;
            }
            const key = `${i},${j},${diff},${flag}`;
            if (dp.has(key)) {
                return dp.get(key);
            }

            let res = dfs(i + 1, j, diff, flag);
            if (j === -1) {
                res += dfs(i + 1, i, INF, flag);
            } else {
                if (diff === INF) {
                    res += dfs(i + 1, i, nums[i] - nums[j], flag);
                } else if (diff === nums[i] - nums[j]) {
                    res += dfs(i + 1, i, diff, 1);
                }
            }

            dp.set(key, res);
            return res;
        };

        return dfs(0, -1, INF, 0);
    }
}
```

```csharp
public class Solution {
    private const long INF = (long)1e15;
    private Dictionary<string, int> dp = new Dictionary<string, int>();

    public int NumberOfArithmeticSlices(int[] nums) {
        int n = nums.Length;
        if (n < 3) return 0;
        return Dfs(nums, 0, -1, INF, 0);
    }

    private int Dfs(int[] nums, int i, int j, long diff, int flag) {
        if (i == nums.Length) return flag;

        string key = $"{i},{j},{diff},{flag}";
        if (dp.ContainsKey(key)) return dp[key];

        int res = Dfs(nums, i + 1, j, diff, flag);
        if (j == -1) {
            res += Dfs(nums, i + 1, i, INF, flag);
        } else {
            if (diff == INF) {
                res += Dfs(nums, i + 1, i, (long)nums[i] - nums[j], flag);
            } else if (diff == (long)nums[i] - nums[j]) {
                res += Dfs(nums, i + 1, i, diff, 1);
            }
        }

        dp[key] = res;
        return res;
    }
}
```

```go
func numberOfArithmeticSlices(nums []int) int {
    n := len(nums)
    if n < 3 {
        return 0
    }

    const INF = int64(1e15)
    dp := make(map[string]int)

    var dfs func(i, j int, diff int64, flag int) int
    dfs = func(i, j int, diff int64, flag int) int {
        if i == n {
            return flag
        }

        key := fmt.Sprintf("%d,%d,%d,%d", i, j, diff, flag)
        if val, ok := dp[key]; ok {
            return val
        }

        res := dfs(i+1, j, diff, flag)
        if j == -1 {
            res += dfs(i+1, i, INF, flag)
        } else {
            if diff == INF {
                res += dfs(i+1, i, int64(nums[i])-int64(nums[j]), flag)
            } else if diff == int64(nums[i])-int64(nums[j]) {
                res += dfs(i+1, i, diff, 1)
            }
        }

        dp[key] = res
        return res
    }

    return dfs(0, -1, INF, 0)
}
```

```kotlin
class Solution {
    private val INF = Long.MAX_VALUE / 2
    private val dp = HashMap<String, Int>()

    fun numberOfArithmeticSlices(nums: IntArray): Int {
        if (nums.size < 3) return 0
        return dfs(nums, 0, -1, INF, 0)
    }

    private fun dfs(nums: IntArray, i: Int, j: Int, diff: Long, flag: Int): Int {
        if (i == nums.size) return flag

        val key = "$i,$j,$diff,$flag"
        if (dp.containsKey(key)) return dp[key]!!

        var res = dfs(nums, i + 1, j, diff, flag)
        if (j == -1) {
            res += dfs(nums, i + 1, i, INF, flag)
        } else {
            if (diff == INF) {
                res += dfs(nums, i + 1, i, nums[i].toLong() - nums[j], flag)
            } else if (diff == nums[i].toLong() - nums[j]) {
                res += dfs(nums, i + 1, i, diff, 1)
            }
        }

        dp[key] = res
        return res
    }
}
```

```swift
class Solution {
    private let INF: Int64 = Int64(1e15)
    private var dp = [String: Int]()

    func numberOfArithmeticSlices(_ nums: [Int]) -> Int {
        if nums.count < 3 { return 0 }
        return dfs(nums, 0, -1, INF, 0)
    }

    private func dfs(_ nums: [Int], _ i: Int, _ j: Int, _ diff: Int64, _ flag: Int) -> Int {
        if i == nums.count { return flag }

        let key = "\(i),\(j),\(diff),\(flag)"
        if let cached = dp[key] { return cached }

        var res = dfs(nums, i + 1, j, diff, flag)
        if j == -1 {
            res += dfs(nums, i + 1, i, INF, flag)
        } else {
            if diff == INF {
                res += dfs(nums, i + 1, i, Int64(nums[i]) - Int64(nums[j]), flag)
            } else if diff == Int64(nums[i]) - Int64(nums[j]) {
                res += dfs(nums, i + 1, i, diff, 1)
            }
        }

        dp[key] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 3)$

---

## 2. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        res, n = 0, len(nums)
        dp = [defaultdict(int) for _ in range(n)]

        for i in range(n):
            for j in range(i):
                diff = nums[i] - nums[j]
                dp[i][diff] += 1 + dp[j][diff]
                res += dp[j][diff]

        return res
```

```java
public class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        int n = nums.length;
        int res = 0;
        Map<Long, Integer>[] dp = new HashMap[n];

        for (int i = 0; i < n; i++) {
            dp[i] = new HashMap<>();
            for (int j = 0; j < i; j++) {
                long diff = (long) nums[i] - nums[j];
                int count = dp[j].getOrDefault(diff, 0);
                dp[i].put(diff, dp[i].getOrDefault(diff, 0) + count + 1);
                res += count;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& nums) {
        int n = nums.size();
        int res = 0;
        vector<unordered_map<long long, int>> dp(n);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long long diff = (long long) nums[i] - nums[j];
                int count = dp[j][diff];
                dp[i][diff] += count + 1;
                res += count;
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
     * @return {number}
     */
    numberOfArithmeticSlices(nums) {
        const n = nums.length;
        let res = 0;
        const dp = Array.from({ length: n }, () => new Map());

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                const diff = nums[i] - nums[j];
                const count = dp[j].get(diff) || 0;
                dp[i].set(diff, (dp[i].get(diff) || 0) + count + 1);
                res += count;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumberOfArithmeticSlices(int[] nums) {
        int n = nums.Length;
        int res = 0;
        Dictionary<long, int>[] dp = new Dictionary<long, int>[n];

        for (int i = 0; i < n; i++) {
            dp[i] = new Dictionary<long, int>();
            for (int j = 0; j < i; j++) {
                long diff = (long)nums[i] - nums[j];
                int count = dp[j].ContainsKey(diff) ? dp[j][diff] : 0;
                dp[i][diff] = dp[i].ContainsKey(diff) ? dp[i][diff] + count + 1 : count + 1;
                res += count;
            }
        }
        return res;
    }
}
```

```go
func numberOfArithmeticSlices(nums []int) int {
    n := len(nums)
    res := 0
    dp := make([]map[int64]int, n)

    for i := 0; i < n; i++ {
        dp[i] = make(map[int64]int)
        for j := 0; j < i; j++ {
            diff := int64(nums[i]) - int64(nums[j])
            count := dp[j][diff]
            dp[i][diff] += count + 1
            res += count
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun numberOfArithmeticSlices(nums: IntArray): Int {
        val n = nums.size
        var res = 0
        val dp = Array(n) { mutableMapOf<Long, Int>() }

        for (i in 0 until n) {
            for (j in 0 until i) {
                val diff = nums[i].toLong() - nums[j]
                val count = dp[j].getOrDefault(diff, 0)
                dp[i][diff] = dp[i].getOrDefault(diff, 0) + count + 1
                res += count
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func numberOfArithmeticSlices(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = 0
        var dp = [[Int64: Int]](repeating: [:], count: n)

        for i in 0..<n {
            for j in 0..<i {
                let diff = Int64(nums[i]) - Int64(nums[j])
                let count = dp[j][diff] ?? 0
                dp[i][diff, default: 0] += count + 1
                res += count
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Optimization) - I

::tabs-start

```python
class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        res, n = 0, len(nums)
        s = set(nums)
        dp = [defaultdict(int) for _ in range(n)]

        for i in range(n):
            for j in range(i):
                diff = nums[i] - nums[j]
                cnt = dp[j].get(diff, 0)
                if nums[i] + diff in s:
                    dp[i][diff] += cnt + 1
                res += cnt

        return res
```

```java
public class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        int res = 0, n = nums.length;
        Set<Integer> s = new HashSet<>();
        for (int num : nums) s.add(num);

        Map<Long, Integer>[] dp = new HashMap[n];
        for (int i = 0; i < n; i++) dp[i] = new HashMap<>();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long diff = (long) nums[i] - nums[j];
                int cnt = dp[j].getOrDefault(diff, 0);
                if (s.contains((int) (nums[i] + diff))) {
                    dp[i].put(diff, dp[i].getOrDefault(diff, 0) + cnt + 1);
                }
                res += cnt;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& nums) {
        int res = 0, n = nums.size();
        unordered_set<int> s(nums.begin(), nums.end());
        vector<unordered_map<long long, int>> dp(n);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long long diff = (long long)nums[i] - nums[j];
                int cnt = dp[j].count(diff) ? dp[j][diff] : 0;
                if (s.count(nums[i] + diff)) {
                    dp[i][diff] += cnt + 1;
                }
                res += cnt;
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
     * @return {number}
     */
    numberOfArithmeticSlices(nums) {
        let res = 0,
            n = nums.length;
        const s = new Set(nums);
        const dp = Array.from({ length: n }, () => new Map());

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                const diff = nums[i] - nums[j];
                const cnt = dp[j].get(diff) || 0;
                if (s.has(nums[i] + diff)) {
                    dp[i].set(diff, (dp[i].get(diff) || 0) + cnt + 1);
                }
                res += cnt;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumberOfArithmeticSlices(int[] nums) {
        int res = 0, n = nums.Length;
        HashSet<int> s = new HashSet<int>(nums);
        Dictionary<long, int>[] dp = new Dictionary<long, int>[n];
        for (int i = 0; i < n; i++) dp[i] = new Dictionary<long, int>();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long diff = (long)nums[i] - nums[j];
                int cnt = dp[j].ContainsKey(diff) ? dp[j][diff] : 0;
                if (s.Contains((int)(nums[i] + diff))) {
                    dp[i][diff] = dp[i].ContainsKey(diff) ? dp[i][diff] + cnt + 1 : cnt + 1;
                }
                res += cnt;
            }
        }
        return res;
    }
}
```

```go
func numberOfArithmeticSlices(nums []int) int {
    res := 0
    n := len(nums)
    s := make(map[int]bool)
    for _, num := range nums {
        s[num] = true
    }
    dp := make([]map[int64]int, n)

    for i := 0; i < n; i++ {
        dp[i] = make(map[int64]int)
        for j := 0; j < i; j++ {
            diff := int64(nums[i]) - int64(nums[j])
            cnt := dp[j][diff]
            if s[nums[i]+int(diff)] {
                dp[i][diff] += cnt + 1
            }
            res += cnt
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun numberOfArithmeticSlices(nums: IntArray): Int {
        var res = 0
        val n = nums.size
        val s = nums.toSet()
        val dp = Array(n) { mutableMapOf<Long, Int>() }

        for (i in 0 until n) {
            for (j in 0 until i) {
                val diff = nums[i].toLong() - nums[j]
                val cnt = dp[j].getOrDefault(diff, 0)
                if ((nums[i] + diff).toInt() in s) {
                    dp[i][diff] = dp[i].getOrDefault(diff, 0) + cnt + 1
                }
                res += cnt
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func numberOfArithmeticSlices(_ nums: [Int]) -> Int {
        var res = 0
        let n = nums.count
        let s = Set(nums)
        var dp = [[Int64: Int]](repeating: [:], count: n)

        for i in 0..<n {
            for j in 0..<i {
                let diff = Int64(nums[i]) - Int64(nums[j])
                let cnt = dp[j][diff] ?? 0
                if s.contains(nums[i] + Int(diff)) {
                    dp[i][diff, default: 0] += cnt + 1
                }
                res += cnt
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Optimization) - II

::tabs-start

```python
class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        res = 0
        mpIdx = defaultdict(list)
        n = len(nums)
        dp = [[0] * n for _ in range(n)]

        for i in range(n):
            mpIdx[nums[i]].append(i)

        for i in range(n):
            for j in range(i):
                prev = 2 * nums[j] - nums[i]
                if prev in mpIdx:
                    for k in mpIdx[prev]:
                        if k >= j:
                            break
                        dp[i][j] += dp[j][k] + 1
                res += dp[i][j]

        return res
```

```java
public class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        int res = 0;
        Map<Integer, List<Integer>> mpIdx = new HashMap<>();
        int n = nums.length;
        int[][] dp = new int[n][n];

        for (int i = 0; i < n; i++) {
            mpIdx.putIfAbsent(nums[i], new ArrayList<>());
            mpIdx.get(nums[i]).add(i);
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long prev = 2L * nums[j] - nums[i];
                if (prev < Integer.MIN_VALUE || prev > Integer.MAX_VALUE) {
                    continue;
                }

                if (mpIdx.containsKey((int) prev)) {
                    for (int k : mpIdx.get((int) prev)) {
                        if (k >= j) break;
                        dp[i][j] += dp[j][k] + 1;
                    }
                }
                res += dp[i][j];
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& nums) {
        int res = 0;
        unordered_map<int, vector<int>> mpIdx;
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));

        for (int i = 0; i < n; i++) {
            mpIdx[nums[i]].push_back(i);
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long prev = 2L * nums[j] - nums[i];
                if (prev < INT_MIN || prev > INT_MAX) continue;

                if (mpIdx.count(prev)) {
                    for (int k : mpIdx[prev]) {
                        if (k >= j) break;
                        dp[i][j] += dp[j][k] + 1;
                    }
                }
                res += dp[i][j];
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
     * @return {number}
     */
    numberOfArithmeticSlices(nums) {
        let res = 0;
        const mpIdx = new Map();
        const n = nums.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(0));

        for (let i = 0; i < n; i++) {
            if (!mpIdx.has(nums[i])) mpIdx.set(nums[i], []);
            mpIdx.get(nums[i]).push(i);
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                const prev = 2 * nums[j] - nums[i];

                if (mpIdx.has(prev)) {
                    for (const k of mpIdx.get(prev)) {
                        if (k >= j) break;
                        dp[i][j] += dp[j][k] + 1;
                    }
                }
                res += dp[i][j];
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumberOfArithmeticSlices(int[] nums) {
        int res = 0;
        Dictionary<int, List<int>> mpIdx = new Dictionary<int, List<int>>();
        int n = nums.Length;
        int[,] dp = new int[n, n];

        for (int i = 0; i < n; i++) {
            if (!mpIdx.ContainsKey(nums[i])) mpIdx[nums[i]] = new List<int>();
            mpIdx[nums[i]].Add(i);
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long prev = 2L * nums[j] - nums[i];
                if (prev < int.MinValue || prev > int.MaxValue) continue;

                if (mpIdx.ContainsKey((int)prev)) {
                    foreach (int k in mpIdx[(int)prev]) {
                        if (k >= j) break;
                        dp[i, j] += dp[j, k] + 1;
                    }
                }
                res += dp[i, j];
            }
        }

        return res;
    }
}
```

```go
func numberOfArithmeticSlices(nums []int) int {
    res := 0
    mpIdx := make(map[int][]int)
    n := len(nums)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, n)
    }

    for i := 0; i < n; i++ {
        mpIdx[nums[i]] = append(mpIdx[nums[i]], i)
    }

    for i := 0; i < n; i++ {
        for j := 0; j < i; j++ {
            prev := 2*nums[j] - nums[i]

            if indices, ok := mpIdx[prev]; ok {
                for _, k := range indices {
                    if k >= j {
                        break
                    }
                    dp[i][j] += dp[j][k] + 1
                }
            }
            res += dp[i][j]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun numberOfArithmeticSlices(nums: IntArray): Int {
        var res = 0
        val mpIdx = mutableMapOf<Int, MutableList<Int>>()
        val n = nums.size
        val dp = Array(n) { IntArray(n) }

        for (i in 0 until n) {
            mpIdx.getOrPut(nums[i]) { mutableListOf() }.add(i)
        }

        for (i in 0 until n) {
            for (j in 0 until i) {
                val prev = 2L * nums[j] - nums[i]
                if (prev < Int.MIN_VALUE || prev > Int.MAX_VALUE) continue

                mpIdx[prev.toInt()]?.let { indices ->
                    for (k in indices) {
                        if (k >= j) break
                        dp[i][j] += dp[j][k] + 1
                    }
                }
                res += dp[i][j]
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func numberOfArithmeticSlices(_ nums: [Int]) -> Int {
        var res = 0
        var mpIdx = [Int: [Int]]()
        let n = nums.count
        var dp = [[Int]](repeating: [Int](repeating: 0, count: n), count: n)

        for i in 0..<n {
            mpIdx[nums[i], default: []].append(i)
        }

        for i in 0..<n {
            for j in 0..<i {
                let prev = 2 * nums[j] - nums[i]

                if let indices = mpIdx[prev] {
                    for k in indices {
                        if k >= j { break }
                        dp[i][j] += dp[j][k] + 1
                    }
                }
                res += dp[i][j]
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
