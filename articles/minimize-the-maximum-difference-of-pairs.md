## 1. Greedy + Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def minimizeMax(self, nums: List[int], p: int) -> int:
        n = len(nums)
        nums.sort()
        dp = {}

        def dfs(i, pairs):
            if pairs == p:
                return 0
            if i >= n - 1:
                return float('inf')
            if (i, pairs) in dp:
                return dp[(i, pairs)]

            take = max(nums[i + 1] - nums[i], dfs(i + 2, pairs + 1))
            skip = dfs(i + 1, pairs)
            dp[(i, pairs)] = min(take, skip)
            return dp[(i, pairs)]

        return dfs(0, 0)
```

```java
public class Solution {
    private Map<String, Integer> dp;

    public int minimizeMax(int[] nums, int p) {
        Arrays.sort(nums);
        dp = new HashMap<>();
        return dfs(0, 0, nums, p);
    }

    private int dfs(int i, int pairs, int[] nums, int p) {
        if (pairs == p) return 0;
        if (i >= nums.length - 1) return Integer.MAX_VALUE;

        String key = i + "," + pairs;
        if (dp.containsKey(key)) return dp.get(key);

        int take = Math.max(nums[i + 1] - nums[i], dfs(i + 2, pairs + 1, nums, p));
        int skip = dfs(i + 1, pairs, nums, p);

        int res = Math.min(take, skip);
        dp.put(key, res);
        return res;
    }
}
```

```cpp
class Solution {
    unordered_map<long long, int> dp;

public:
    int minimizeMax(vector<int>& nums, int p) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        return dfs(0, 0, nums, p);
    }

private:
    int dfs(int i, int pairs, vector<int>& nums, int p) {
        if (pairs == p) return 0;
        if (i >= nums.size() - 1) return INT_MAX;
        long long key = i;
        key = (key << 31) | pairs;
        if (dp.count(key)) return dp[key];

        int take = max(nums[i + 1] - nums[i], dfs(i + 2, pairs + 1, nums, p));
        int skip = dfs(i + 1, pairs, nums, p);

        return dp[key] = min(take, skip);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} p
     * @return {number}
     */
    minimizeMax(nums, p) {
        nums.sort((a, b) => a - b);
        const dp = new Map();

        const dfs = (i, pairs) => {
            if (pairs === p) return 0;
            if (i >= nums.length - 1) return Infinity;

            let key = `${i},${pairs}`;
            if (dp.has(key)) return dp.get(key);

            let take = Math.max(nums[i + 1] - nums[i], dfs(i + 2, pairs + 1));
            let skip = dfs(i + 1, pairs);

            let result = Math.min(take, skip);
            dp.set(key, result);
            return result;
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int n;
    private int p;
    private int[] nums;
    private Dictionary<(int, int), int> dp;

    public int MinimizeMax(int[] nums, int p) {
        Array.Sort(nums);
        this.nums = nums;
        this.p = p;
        this.n = nums.Length;
        dp = new Dictionary<(int, int), int>();
        return Dfs(0, 0);
    }

    private int Dfs(int i, int pairs) {
        if (pairs == p) {
            return 0;
        }
        if (i >= n - 1) {
            return int.MaxValue / 2;
        }
        if (dp.ContainsKey((i, pairs))) {
            return dp[(i, pairs)];
        }

        int take = Math.Max(nums[i + 1] - nums[i], Dfs(i + 2, pairs + 1));
        int skip = Dfs(i + 1, pairs);
        dp[(i, pairs)] = Math.Min(take, skip);
        return dp[(i, pairs)];
    }
}
```

```go
func minimizeMax(nums []int, p int) int {
    n := len(nums)
    sort.Ints(nums)
    dp := make(map[int]int)

    var dfs func(i, pairs int) int
    dfs = func(i, pairs int) int {
        if pairs == p {
            return 0
        }
        if i >= n-1 {
            return math.MaxInt32
        }
        key := i*10001 + pairs
        if val, ok := dp[key]; ok {
            return val
        }

        take := max(nums[i+1]-nums[i], dfs(i+2, pairs+1))
        skip := dfs(i+1, pairs)
        dp[key] = min(take, skip)
        return dp[key]
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun minimizeMax(nums: IntArray, p: Int): Int {
        val n = nums.size
        nums.sort()
        val dp = HashMap<Pair<Int, Int>, Int>()

        fun dfs(i: Int, pairs: Int): Int {
            if (pairs == p) return 0
            if (i >= n - 1) return Int.MAX_VALUE / 2

            val key = Pair(i, pairs)
            if (dp.containsKey(key)) return dp[key]!!

            val take = maxOf(nums[i + 1] - nums[i], dfs(i + 2, pairs + 1))
            val skip = dfs(i + 1, pairs)
            dp[key] = minOf(take, skip)
            return dp[key]!!
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func minimizeMax(_ nums: [Int], _ p: Int) -> Int {
        let n = nums.count
        var nums = nums.sorted()
        var dp = [String: Int]()

        func dfs(_ i: Int, _ pairs: Int) -> Int {
            if pairs == p { return 0 }
            if i >= n - 1 { return Int.max / 2 }

            let key = "\(i),\(pairs)"
            if let val = dp[key] { return val }

            let take = max(nums[i + 1] - nums[i], dfs(i + 2, pairs + 1))
            let skip = dfs(i + 1, pairs)
            dp[key] = min(take, skip)
            return dp[key]!
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * p)$
- Space complexity: $O(n * p)$

> Where $n$ is the size of the input array and $p$ is the number of pairs to select.

---

## 2. Greesy + Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def minimizeMax(self, nums: List[int], p: int) -> int:
        n = len(nums)
        nums.sort()

        dp = [[float('inf')] * (p + 1) for _ in range(n + 1)]
        for i in range(n + 1):
            dp[i][0] = 0

        for i in range(n - 2, -1, -1):
            for pairs in range(1, p + 1):
                take = float('inf')
                if i + 1 < n:
                    take = max(nums[i + 1] - nums[i], dp[i + 2][pairs - 1])

                skip = dp[i + 1][pairs]
                dp[i][pairs] = min(take, skip)

        return dp[0][p]
```

```java
public class Solution {
    public int minimizeMax(int[] nums, int p) {
        int n = nums.length;
        Arrays.sort(nums);

        int[][] dp = new int[n + 1][p + 1];
        for (int i = 0; i <= n; i++) {
            Arrays.fill(dp[i], Integer.MAX_VALUE);
            dp[i][0] = 0;
        }

        for (int i = n - 2; i >= 0; i--) {
            for (int pairs = 1; pairs <= p; pairs++) {
                int take = Integer.MAX_VALUE;
                if (i + 1 < n) {
                    take = Math.max(nums[i + 1] - nums[i], dp[i + 2][pairs - 1]);
                }
                int skip = dp[i + 1][pairs];
                dp[i][pairs] = Math.min(take, skip);
            }
        }

        return dp[0][p];
    }
}
```

```cpp
class Solution {
public:
    int minimizeMax(vector<int>& nums, int p) {
        int n = nums.size();
        sort(nums.begin(), nums.end());

        vector<vector<int>> dp(n + 1, vector<int>(p + 1, INT_MAX));
        for (int i = 0; i <= n; i++) {
            dp[i][0] = 0;
        }

        for (int i = n - 2; i >= 0; i--) {
            for (int pairs = 1; pairs <= p; pairs++) {
                int take = INT_MAX;
                if (i + 1 < n) {
                    take = max(nums[i + 1] - nums[i], dp[i + 2][pairs - 1]);
                }
                int skip = dp[i + 1][pairs];
                dp[i][pairs] = min(take, skip);
            }
        }

        return dp[0][p];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} p
     * @return {number}
     */
    minimizeMax(nums, p) {
        const n = nums.length;
        nums.sort((a, b) => a - b);

        const dp = Array.from({ length: n + 1 }, () =>
            new Array(p + 1).fill(Infinity),
        );
        for (let i = 0; i <= n; i++) {
            dp[i][0] = 0;
        }

        for (let i = n - 2; i >= 0; i--) {
            for (let pairs = 1; pairs <= p; pairs++) {
                let take = Infinity;
                if (i + 1 < n) {
                    take = Math.max(
                        nums[i + 1] - nums[i],
                        dp[i + 2][pairs - 1],
                    );
                }
                const skip = dp[i + 1][pairs];
                dp[i][pairs] = Math.min(take, skip);
            }
        }

        return dp[0][p];
    }
}
```

```csharp
public class Solution {
    public int MinimizeMax(int[] nums, int p) {
        int n = nums.Length;
        Array.Sort(nums);

        int INF = int.MaxValue / 2;
        int[,] dp = new int[n + 1, p + 1];

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= p; j++) {
                dp[i, j] = INF;
            }
        }

        for (int i = 0; i <= n; i++) {
            dp[i, 0] = 0;
        }

        for (int i = n - 2; i >= 0; i--) {
            for (int pairs = 1; pairs <= p; pairs++) {
                int take = INF;
                if (i + 1 < n) {
                    take = Math.Max(nums[i + 1] - nums[i], dp[i + 2, pairs - 1]);
                }

                int skip = dp[i + 1, pairs];
                dp[i, pairs] = Math.Min(take, skip);
            }
        }

        return dp[0, p];
    }
}
```

```go
func minimizeMax(nums []int, p int) int {
    n := len(nums)
    sort.Ints(nums)

    INF := math.MaxInt32
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, p+1)
        for j := range dp[i] {
            dp[i][j] = INF
        }
        dp[i][0] = 0
    }

    for i := n - 2; i >= 0; i-- {
        for pairs := 1; pairs <= p; pairs++ {
            take := INF
            if i+1 < n {
                take = max(nums[i+1]-nums[i], dp[i+2][pairs-1])
            }
            skip := dp[i+1][pairs]
            dp[i][pairs] = min(take, skip)
        }
    }

    return dp[0][p]
}
```

```kotlin
class Solution {
    fun minimizeMax(nums: IntArray, p: Int): Int {
        val n = nums.size
        nums.sort()

        val INF = Int.MAX_VALUE / 2
        val dp = Array(n + 1) { IntArray(p + 1) { INF } }
        for (i in 0..n) {
            dp[i][0] = 0
        }

        for (i in n - 2 downTo 0) {
            for (pairs in 1..p) {
                var take = INF
                if (i + 1 < n) {
                    take = maxOf(nums[i + 1] - nums[i], dp[i + 2][pairs - 1])
                }
                val skip = dp[i + 1][pairs]
                dp[i][pairs] = minOf(take, skip)
            }
        }

        return dp[0][p]
    }
}
```

```swift
class Solution {
    func minimizeMax(_ nums: [Int], _ p: Int) -> Int {
        let n = nums.count
        var nums = nums.sorted()

        let INF = Int.max / 2
        var dp = [[Int]](repeating: [Int](repeating: INF, count: p + 1), count: n + 1)
        for i in 0...n {
            dp[i][0] = 0
        }

        for i in stride(from: n - 2, through: 0, by: -1) {
            for pairs in 1...p {
                var take = INF
                if i + 1 < n {
                    take = max(nums[i + 1] - nums[i], dp[i + 2][pairs - 1])
                }
                let skip = dp[i + 1][pairs]
                dp[i][pairs] = min(take, skip)
            }
        }

        return dp[0][p]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * p)$
- Space complexity: $O(n * p)$

> Where $n$ is the size of the input array and $p$ is the number of pairs to select.

---

## 3. Greesy + Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def minimizeMax(self, nums: List[int], p: int) -> int:
        n = len(nums)
        nums.sort()

        dp = [float('inf')] * (p + 1)
        dp1 = [float('inf')] * (p + 1)
        dp2 = [float('inf')] * (p + 1)

        dp[0] = dp1[0] = dp2[0] = 0
        for i in range(n - 1, -1, -1):
            for pairs in range(1, p + 1):
                take = float('inf')
                if i + 1 < n:
                    take = max(nums[i + 1] - nums[i], dp2[pairs - 1])
                skip = dp1[pairs]
                dp[pairs] = min(take, skip)

            dp2 = dp1[:]
            dp1 = dp[:]
            dp = [float('inf')] * (p + 1)
            dp[0] = 0

        return dp1[p]
```

```java
public class Solution {
    public int minimizeMax(int[] nums, int p) {
        int n = nums.length;
        Arrays.sort(nums);

        int[] dp = new int[p + 1];
        int[] dp1 = new int[p + 1];
        int[] dp2 = new int[p + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        Arrays.fill(dp1, Integer.MAX_VALUE);
        Arrays.fill(dp2, Integer.MAX_VALUE);
        dp[0] = dp1[0] = dp2[0] = 0;

        for (int i = n - 1; i >= 0; i--) {
            for (int pairs = 1; pairs <= p; pairs++) {
                int take = Integer.MAX_VALUE;
                if (i + 1 < n) {
                    take = Math.max(nums[i + 1] - nums[i], dp2[pairs - 1]);
                }
                int skip = dp1[pairs];
                dp[pairs] = Math.min(take, skip);
            }
            dp2 = dp1.clone();
            dp1 = dp.clone();
            Arrays.fill(dp, Integer.MAX_VALUE);
            dp[0] = 0;
        }

        return dp1[p];
    }
}
```

```cpp
class Solution {
public:
    int minimizeMax(vector<int>& nums, int p) {
        int n = nums.size();
        sort(nums.begin(), nums.end());

        vector<int> dp(p + 1, INT_MAX);
        vector<int> dp1(p + 1, INT_MAX);
        vector<int> dp2(p + 1, INT_MAX);

        dp[0] = dp1[0] = dp2[0] = 0;

        for (int i = n - 1; i >= 0; i--) {
            for (int pairs = 1; pairs <= p; pairs++) {
                int take = INT_MAX;
                if (i + 1 < n) {
                    take = max(nums[i + 1] - nums[i], dp2[pairs - 1]);
                }
                int skip = dp1[pairs];
                dp[pairs] = min(take, skip);
            }
            dp2 = dp1;
            dp1 = dp;
            fill(dp.begin(), dp.end(), INT_MAX);
            dp[0] = 0;
        }

        return dp1[p];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} p
     * @return {number}
     */
    minimizeMax(nums, p) {
        const n = nums.length;
        nums.sort((a, b) => a - b);

        let dp = new Array(p + 1).fill(Infinity);
        let dp1 = new Array(p + 1).fill(Infinity);
        let dp2 = new Array(p + 1).fill(Infinity);

        dp[0] = dp1[0] = dp2[0] = 0;

        for (let i = n - 1; i >= 0; i--) {
            for (let pairs = 1; pairs <= p; pairs++) {
                let take = Infinity;
                if (i + 1 < n) {
                    take = Math.max(nums[i + 1] - nums[i], dp2[pairs - 1]);
                }
                let skip = dp1[pairs];
                dp[pairs] = Math.min(take, skip);
            }
            dp2 = dp1.slice();
            dp1 = dp.slice();
            dp.fill(Infinity);
            dp[0] = 0;
        }

        return dp1[p];
    }
}
```

```csharp
public class Solution {
    public int MinimizeMax(int[] nums, int p) {
        int n = nums.Length;
        Array.Sort(nums);

        int INF = int.MaxValue / 2;
        int[] dp = new int[p + 1];
        int[] dp1 = new int[p + 1];
        int[] dp2 = new int[p + 1];

        for (int j = 0; j <= p; j++) {
            dp[j] = INF;
            dp1[j] = INF;
            dp2[j] = INF;
        }

        dp[0] = dp1[0] = dp2[0] = 0;

        for (int i = n - 1; i >= 0; i--) {
            for (int pairs = 1; pairs <= p; pairs++) {
                int take = INF;
                if (i + 1 < n) {
                    take = Math.Max(nums[i + 1] - nums[i], dp2[pairs - 1]);
                }
                int skip = dp1[pairs];
                dp[pairs] = Math.Min(take, skip);
            }

            dp2 = (int[])dp1.Clone();
            dp1 = (int[])dp.Clone();

            dp = new int[p + 1];
            for (int j = 0; j <= p; j++) dp[j] = INF;
            dp[0] = 0;
        }

        return dp1[p];
    }
}
```

```go
func minimizeMax(nums []int, p int) int {
    n := len(nums)
    sort.Ints(nums)

    INF := math.MaxInt32
    dp := make([]int, p+1)
    dp1 := make([]int, p+1)
    dp2 := make([]int, p+1)

    for j := 0; j <= p; j++ {
        dp[j] = INF
        dp1[j] = INF
        dp2[j] = INF
    }
    dp[0], dp1[0], dp2[0] = 0, 0, 0

    for i := n - 1; i >= 0; i-- {
        for pairs := 1; pairs <= p; pairs++ {
            take := INF
            if i+1 < n {
                take = max(nums[i+1]-nums[i], dp2[pairs-1])
            }
            skip := dp1[pairs]
            dp[pairs] = min(take, skip)
        }
        copy(dp2, dp1)
        copy(dp1, dp)
        for j := range dp {
            dp[j] = INF
        }
        dp[0] = 0
    }

    return dp1[p]
}
```

```kotlin
class Solution {
    fun minimizeMax(nums: IntArray, p: Int): Int {
        val n = nums.size
        nums.sort()

        val INF = Int.MAX_VALUE / 2
        var dp = IntArray(p + 1) { INF }
        var dp1 = IntArray(p + 1) { INF }
        var dp2 = IntArray(p + 1) { INF }

        dp[0] = 0
        dp1[0] = 0
        dp2[0] = 0

        for (i in n - 1 downTo 0) {
            for (pairs in 1..p) {
                var take = INF
                if (i + 1 < n) {
                    take = maxOf(nums[i + 1] - nums[i], dp2[pairs - 1])
                }
                val skip = dp1[pairs]
                dp[pairs] = minOf(take, skip)
            }
            dp2 = dp1.copyOf()
            dp1 = dp.copyOf()
            dp = IntArray(p + 1) { INF }
            dp[0] = 0
        }

        return dp1[p]
    }
}
```

```swift
class Solution {
    func minimizeMax(_ nums: [Int], _ p: Int) -> Int {
        let n = nums.count
        var nums = nums.sorted()

        let INF = Int.max / 2
        var dp = [Int](repeating: INF, count: p + 1)
        var dp1 = [Int](repeating: INF, count: p + 1)
        var dp2 = [Int](repeating: INF, count: p + 1)

        dp[0] = 0
        dp1[0] = 0
        dp2[0] = 0

        for i in stride(from: n - 1, through: 0, by: -1) {
            for pairs in 1...p {
                var take = INF
                if i + 1 < n {
                    take = max(nums[i + 1] - nums[i], dp2[pairs - 1])
                }
                let skip = dp1[pairs]
                dp[pairs] = min(take, skip)
            }
            dp2 = dp1
            dp1 = dp
            dp = [Int](repeating: INF, count: p + 1)
            dp[0] = 0
        }

        return dp1[p]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * p)$
- Space complexity: $O(p)$

> Where $n$ is the size of the input array and $p$ is the number of pairs to select.

---

## 4. Greedy + Binary Search

::tabs-start

```python
class Solution:
    def minimizeMax(self, nums: List[int], p: int) -> int:
        if p == 0:
            return 0

        def isValid(threshold):
            i, cnt = 0, 0
            while i < len(nums) - 1:
                if abs(nums[i] - nums[i + 1]) <= threshold:
                    cnt += 1
                    i += 2
                else:
                    i += 1
                if cnt == p:
                    return True
            return False

        nums.sort()
        l, r = 0, nums[-1] - nums[0]
        res = nums[-1] - nums[0]

        while l <= r:
            m = l + (r - l) // 2
            if isValid(m):
                res = m
                r = m - 1
            else:
                l = m + 1

        return res
```

```java
public class Solution {
    public int minimizeMax(int[] nums, int p) {
        if (p == 0) return 0;

        Arrays.sort(nums);
        int left = 0, right = nums[nums.length - 1] - nums[0];
        int result = right;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (isValid(nums, mid, p)) {
                result = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return result;
    }

    private boolean isValid(int[] nums, int threshold, int p) {
        int i = 0, count = 0;
        while (i < nums.length - 1) {
            if (Math.abs(nums[i] - nums[i + 1]) <= threshold) {
                count++;
                i += 2;
            } else {
                i++;
            }
            if (count == p) return true;
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    int minimizeMax(vector<int>& nums, int p) {
        if (p == 0) return 0;

        sort(nums.begin(), nums.end());
        int left = 0, right = nums.back() - nums[0];
        int result = right;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (isValid(nums, mid, p)) {
                result = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return result;
    }

private:
    bool isValid(vector<int>& nums, int threshold, int p) {
        int i = 0, count = 0;
        while (i < nums.size() - 1) {
            if (abs(nums[i] - nums[i + 1]) <= threshold) {
                count++;
                i += 2;
            } else {
                i++;
            }
            if (count == p) return true;
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} p
     * @return {number}
     */
    minimizeMax(nums, p) {
        if (p === 0) return 0;

        nums.sort((a, b) => a - b);
        let l = 0,
            r = nums[nums.length - 1] - nums[0],
            res = r;

        const isValid = (threshold) => {
            let i = 0,
                cnt = 0;
            while (i < nums.length - 1) {
                if (Math.abs(nums[i] - nums[i + 1]) <= threshold) {
                    cnt++;
                    i += 2;
                } else {
                    i++;
                }
                if (cnt === p) return true;
            }
            return false;
        };

        while (l <= r) {
            let m = Math.floor(l + (r - l) / 2);
            if (isValid(m)) {
                res = m;
                r = m - 1;
            } else {
                l = m + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinimizeMax(int[] nums, int p) {
        if (p == 0) return 0;
        Array.Sort(nums);

        bool IsValid(int threshold) {
            int i = 0, cnt = 0;
            while (i < nums.Length - 1) {
                if (Math.Abs(nums[i] - nums[i + 1]) <= threshold) {
                    cnt++;
                    i += 2;
                } else {
                    i++;
                }
                if (cnt == p) return true;
            }
            return false;
        }

        int l = 0, r = nums[nums.Length - 1] - nums[0];
        int res = r;

        while (l <= r) {
            int m = l + (r - l) / 2;
            if (IsValid(m)) {
                res = m;
                r = m - 1;
            } else {
                l = m + 1;
            }
        }

        return res;
    }
}
```

```go
func minimizeMax(nums []int, p int) int {
    if p == 0 {
        return 0
    }

    sort.Ints(nums)
    n := len(nums)

    isValid := func(threshold int) bool {
        i, cnt := 0, 0
        for i < n-1 {
            if abs(nums[i]-nums[i+1]) <= threshold {
                cnt++
                i += 2
            } else {
                i++
            }
            if cnt == p {
                return true
            }
        }
        return false
    }

    l, r := 0, nums[n-1]-nums[0]
    res := r

    for l <= r {
        m := l + (r-l)/2
        if isValid(m) {
            res = m
            r = m - 1
        } else {
            l = m + 1
        }
    }

    return res
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun minimizeMax(nums: IntArray, p: Int): Int {
        if (p == 0) return 0

        nums.sort()
        val n = nums.size

        fun isValid(threshold: Int): Boolean {
            var i = 0
            var cnt = 0
            while (i < n - 1) {
                if (kotlin.math.abs(nums[i] - nums[i + 1]) <= threshold) {
                    cnt++
                    i += 2
                } else {
                    i++
                }
                if (cnt == p) return true
            }
            return false
        }

        var l = 0
        var r = nums[n - 1] - nums[0]
        var res = r

        while (l <= r) {
            val m = l + (r - l) / 2
            if (isValid(m)) {
                res = m
                r = m - 1
            } else {
                l = m + 1
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func minimizeMax(_ nums: [Int], _ p: Int) -> Int {
        if p == 0 { return 0 }

        var nums = nums.sorted()
        let n = nums.count

        func isValid(_ threshold: Int) -> Bool {
            var i = 0
            var cnt = 0
            while i < n - 1 {
                if abs(nums[i] - nums[i + 1]) <= threshold {
                    cnt += 1
                    i += 2
                } else {
                    i += 1
                }
                if cnt == p { return true }
            }
            return false
        }

        var l = 0
        var r = nums[n - 1] - nums[0]
        var res = r

        while l <= r {
            let m = l + (r - l) / 2
            if isValid(m) {
                res = m
                r = m - 1
            } else {
                l = m + 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n + n\log m)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

> Where $n$ is the size of the input array and $m$ is the maximum value in the array.
