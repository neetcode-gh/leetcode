## 1. Recursion

### Intuition

We need to cover all travel days with the minimum cost using 1-day, 7-day, or 30-day passes. At each travel day, we have three choices: buy a 1-day pass (covers today), buy a 7-day pass (covers 7 days starting today), or buy a 30-day pass (covers 30 days starting today). We try all possibilities recursively and pick the minimum cost.

### Algorithm

1. Define a recursive function `dfs(i)` that returns the minimum cost to cover all days starting from index `i`.
2. Base case: If `i` equals the number of travel days, return 0 (no more days to cover).
3. For each pass type (1-day, 7-day, 30-day):
   - Find the next day index `j` that is not covered by this pass.
   - Calculate the cost as the pass price plus `dfs(j)`.
4. Return the minimum cost among all three options.

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        n = len(days)

        def dfs(i):
            if i == n:
                return 0

            res = costs[0] + dfs(i + 1)
            j = i
            while j < n and days[j] < days[i] + 7:
                j += 1
            res = min(res, costs[1] + dfs(j))

            j = i
            while j < n and days[j] < days[i] + 30:
                j += 1
            res = min(res, costs[2] + dfs(j))

            return res

        return dfs(0)
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        return dfs(0, days.length, days, costs);
    }

    private int dfs(int i, int n, int[] days, int[] costs) {
        if (i == n) return 0;

        int res = costs[0] + dfs(i + 1, n, days, costs);
        int j = i;
        while (j < n && days[j] < days[i] + 7) {
            j++;
        }
        res = Math.min(res, costs[1] + dfs(j, n, days, costs));

        j = i;
        while (j < n && days[j] < days[i] + 30) {
            j++;
        }
        res = Math.min(res, costs[2] + dfs(j, n, days, costs));

        return res;
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        int n = days.size();

        function<int(int)> dfs = [&](int i) -> int {
            if (i == n) return 0;

            int res = costs[0] + dfs(i + 1);

            int j = i;
            while (j < n && days[j] < days[i] + 7) {
                j++;
            }
            res = min(res, costs[1] + dfs(j));

            j = i;
            while (j < n && days[j] < days[i] + 30) {
                j++;
            }
            res = min(res, costs[2] + dfs(j));

            return res;
        };

        return dfs(0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const n = days.length;

        const dfs = (i) => {
            if (i === n) return 0;

            let res = costs[0] + dfs(i + 1);

            let j = i;
            while (j < n && days[j] < days[i] + 7) {
                j++;
            }
            res = Math.min(res, costs[1] + dfs(j));

            j = i;
            while (j < n && days[j] < days[i] + 30) {
                j++;
            }
            res = Math.min(res, costs[2] + dfs(j));

            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    int[] days, costs;
    int n;

    public int MincostTickets(int[] days, int[] costs) {
        this.days = days;
        this.costs = costs;
        n = days.Length;
        return Dfs(0);
    }

    private int Dfs(int i) {
        if (i == n)
            return 0;

        int res = costs[0] + Dfs(i + 1);

        int j = i;
        while (j < n && days[j] < days[i] + 7)
            j++;
        res = Math.Min(res, costs[1] + Dfs(j));

        j = i;
        while (j < n && days[j] < days[i] + 30)
            j++;
        res = Math.Min(res, costs[2] + Dfs(j));

        return res;
    }
}
```

```go
func mincostTickets(days []int, costs []int) int {
    n := len(days)

    var dfs func(i int) int
    dfs = func(i int) int {
        if i == n {
            return 0
        }

        res := costs[0] + dfs(i+1)

        j := i
        for j < n && days[j] < days[i]+7 {
            j++
        }
        res = min(res, costs[1]+dfs(j))

        j = i
        for j < n && days[j] < days[i]+30 {
            j++
        }
        res = min(res, costs[2]+dfs(j))

        return res
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun mincostTickets(days: IntArray, costs: IntArray): Int {
        val n = days.size

        fun dfs(i: Int): Int {
            if (i == n) return 0

            var res = costs[0] + dfs(i + 1)

            var j = i
            while (j < n && days[j] < days[i] + 7) {
                j++
            }
            res = minOf(res, costs[1] + dfs(j))

            j = i
            while (j < n && days[j] < days[i] + 30) {
                j++
            }
            res = minOf(res, costs[2] + dfs(j))

            return res
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func mincostTickets(_ days: [Int], _ costs: [Int]) -> Int {
        let n = days.count

        func dfs(_ i: Int) -> Int {
            if i == n { return 0 }

            var res = costs[0] + dfs(i + 1)

            var j = i
            while j < n && days[j] < days[i] + 7 {
                j += 1
            }
            res = min(res, costs[1] + dfs(j))

            j = i
            while j < n && days[j] < days[i] + 30 {
                j += 1
            }
            res = min(res, costs[2] + dfs(j))

            return res
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(3 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution recomputes the same subproblems many times. Since the minimum cost from day `i` onward depends only on `i`, we can cache these results. This transforms our exponential solution into a linear one by ensuring each state is computed only once.

### Algorithm

1. Create a memoization dictionary `dp` to store computed results.
2. Define `dfs(i)` that returns the minimum cost from index `i`.
3. If `i` is already in `dp`, return the cached value.
4. For each pass duration (1, 7, 30 days):
   - Find the first uncovered day index `j`.
   - Update the minimum cost as `min(current_min, cost + dfs(j))`.
5. Store and return the result.

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        dp = {}

        def dfs(i):
            if i == len(days):
                return 0
            if i in dp:
                return dp[i]

            dp[i] = float("inf")
            j = i
            for d, c in zip([1, 7, 30], costs):
                while j < len(days) and days[j] < days[i] + d:
                    j += 1
                dp[i] = min(dp[i], c + dfs(j))

            return dp[i]

        return dfs(0)
```

```java
public class Solution {
    private int[] dp;

    public int mincostTickets(int[] days, int[] costs) {
        dp = new int[days.length];
        Arrays.fill(dp, -1);
        return dfs(0, days, costs);
    }

    private int dfs(int i, int[] days, int[] costs) {
        if (i == days.length) {
            return 0;
        }
        if (dp[i] != -1) {
            return dp[i];
        }

        dp[i] = Integer.MAX_VALUE;
        int idx = 0, j = i;
        for (int d : new int[]{1, 7, 30}) {
            while (j < days.length && days[j] < days[i] + d) {
                j++;
            }
            dp[i] = Math.min(dp[i], costs[idx] + dfs(j, days, costs));
            idx++;
        }
        return dp[i];
    }
}
```

```cpp
class Solution {
private:
    vector<int> dp;

    int dfs(int i, const vector<int>& days, const vector<int>& costs) {
        if (i == days.size()) return 0;
        if (dp[i] != -1) return dp[i];

        dp[i] = INT_MAX;
        int idx = 0, j = i;
        for (int d : {1, 7, 30}) {
            while (j < days.size() && days[j] < days[i] + d) {
                j++;
            }
            dp[i] = min(dp[i], costs[idx] + dfs(j, days, costs));
            idx++;
        }
        return dp[i];
    }

public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        dp = vector<int>(days.size(), -1);
        return dfs(0, days, costs);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const dp = new Array(days.length).fill(-1);

        const dfs = (i) => {
            if (i === days.length) return 0;
            if (dp[i] !== -1) return dp[i];

            dp[i] = Infinity;
            let j = i;
            [1, 7, 30].forEach((d, idx) => {
                while (j < days.length && days[j] < days[i] + d) {
                    j++;
                }
                dp[i] = Math.min(dp[i], costs[idx] + dfs(j));
            });

            return dp[i];
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    int[] days, costs;
    Dictionary<int, int> dp = new Dictionary<int, int>();

    public int MincostTickets(int[] days, int[] costs) {
        this.days = days;
        this.costs = costs;
        return Dfs(0);
    }

    private int Dfs(int i) {
        if (i == days.Length)
            return 0;
        if (dp.ContainsKey(i))
            return dp[i];

        dp[i] = int.MaxValue;
        int j;

        int[] durations = {1, 7, 30};
        for (int k = 0; k < 3; k++) {
            j = i;
            while (j < days.Length && days[j] < days[i] + durations[k])
                j++;
            dp[i] = Math.Min(dp[i], costs[k] + Dfs(j));
        }

        return dp[i];
    }
}
```

```go
func mincostTickets(days []int, costs []int) int {
    n := len(days)
    dp := make([]int, n)
    for i := range dp {
        dp[i] = -1
    }

    durations := []int{1, 7, 30}

    var dfs func(i int) int
    dfs = func(i int) int {
        if i == n {
            return 0
        }
        if dp[i] != -1 {
            return dp[i]
        }

        dp[i] = math.MaxInt32
        j := i
        for k, d := range durations {
            for j < n && days[j] < days[i]+d {
                j++
            }
            dp[i] = min(dp[i], costs[k]+dfs(j))
        }
        return dp[i]
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun mincostTickets(days: IntArray, costs: IntArray): Int {
        val n = days.size
        val dp = IntArray(n) { -1 }
        val durations = intArrayOf(1, 7, 30)

        fun dfs(i: Int): Int {
            if (i == n) return 0
            if (dp[i] != -1) return dp[i]

            dp[i] = Int.MAX_VALUE
            var j = i
            for (k in 0..2) {
                while (j < n && days[j] < days[i] + durations[k]) {
                    j++
                }
                dp[i] = minOf(dp[i], costs[k] + dfs(j))
            }
            return dp[i]
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func mincostTickets(_ days: [Int], _ costs: [Int]) -> Int {
        let n = days.count
        var dp = [Int: Int]()
        let durations = [1, 7, 30]

        func dfs(_ i: Int) -> Int {
            if i == n { return 0 }
            if let val = dp[i] { return val }

            dp[i] = Int.max
            var j = i
            for k in 0..<3 {
                while j < n && days[j] < days[i] + durations[k] {
                    j += 1
                }
                dp[i] = min(dp[i]!, costs[k] + dfs(j))
            }
            return dp[i]!
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

Instead of recursing from day 0 forward, we can build the solution backwards. Starting from the last travel day, we compute the minimum cost for each position. When we reach day 0, we have the answer. This eliminates recursion overhead and makes the solution iterative.

### Algorithm

1. Create a DP array where `dp[i]` represents the minimum cost from day index `i` to the end.
2. Initialize `dp[n] = 0` (no cost after the last day).
3. Iterate from `i = n - 1` down to 0.
4. For each pass type, find where coverage ends and compute `cost + dp[j]`.
5. Set `dp[i]` to the minimum of all options.
6. Return `dp[0]`.

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        n = len(days)
        dp = [0] * (n + 1)

        for i in range(n - 1, -1, -1):
            dp[i] = float('inf')
            j = i
            for d, c in zip([1, 7, 30], costs):
                while j < n and days[j] < days[i] + d:
                    j += 1
                dp[i] = min(dp[i], c + dp[j])

        return dp[0]
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        int n = days.length;
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = Integer.MAX_VALUE;
            int idx = 0, j = i;
            for (int d : new int[]{1, 7, 30}) {
                while (j < n && days[j] < days[i] + d) {
                    j++;
                }
                dp[i] = Math.min(dp[i], costs[idx] + dp[j]);
                idx++;
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        int n = days.size();
        vector<int> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = INT_MAX;
            int j = i;
            for (int k = 0; k < 3; ++k) {
                while (j < n && days[j] < days[i] + (k == 0 ? 1 : k == 1 ? 7 : 30)) {
                    j++;
                }
                dp[i] = min(dp[i], costs[k] + dp[j]);
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const n = days.length;
        const dp = new Array(n + 1).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = Infinity;
            let j = i;
            [1, 7, 30].forEach((d, idx) => {
                while (j < n && days[j] < days[i] + d) {
                    j++;
                }
                dp[i] = Math.min(dp[i], costs[idx] + dp[j]);
            });
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int MincostTickets(int[] days, int[] costs) {
        int n = days.Length;
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = int.MaxValue;
            int j = i;
            for (int k = 0; k < 3; k++) {
                int d = k == 0 ? 1 : k == 1 ? 7 : 30;
                int c = costs[k];
                while (j < n && days[j] < days[i] + d) {
                    j++;
                }
                dp[i] = Math.Min(dp[i], c + dp[j]);
            }
        }

        return dp[0];
    }
}
```

```go
func mincostTickets(days []int, costs []int) int {
    n := len(days)
    dp := make([]int, n+1)
    durations := []int{1, 7, 30}

    for i := n - 1; i >= 0; i-- {
        dp[i] = math.MaxInt32
        j := i
        for k := 0; k < 3; k++ {
            for j < n && days[j] < days[i]+durations[k] {
                j++
            }
            dp[i] = min(dp[i], costs[k]+dp[j])
        }
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun mincostTickets(days: IntArray, costs: IntArray): Int {
        val n = days.size
        val dp = IntArray(n + 1)
        val durations = intArrayOf(1, 7, 30)

        for (i in n - 1 downTo 0) {
            dp[i] = Int.MAX_VALUE
            var j = i
            for (k in 0..2) {
                while (j < n && days[j] < days[i] + durations[k]) {
                    j++
                }
                dp[i] = minOf(dp[i], costs[k] + dp[j])
            }
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func mincostTickets(_ days: [Int], _ costs: [Int]) -> Int {
        let n = days.count
        var dp = [Int](repeating: 0, count: n + 1)
        let durations = [1, 7, 30]

        for i in stride(from: n - 1, through: 0, by: -1) {
            dp[i] = Int.max
            var j = i
            for k in 0..<3 {
                while j < n && days[j] < days[i] + durations[k] {
                    j += 1
                }
                dp[i] = min(dp[i], costs[k] + dp[j])
            }
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Bottom-Up) + Two Pointers

### Intuition

In the previous approach, we search for coverage boundaries repeatedly. Since we iterate backwards and the days array is sorted, we can maintain two pointers that track where 7-day and 30-day passes would end. As we move backwards, these pointers only need to move backwards as well, avoiding redundant searches.

### Algorithm

1. Append a sentinel day to handle boundary conditions.
2. Initialize pointers `last7` and `last30` at the end of the array.
3. Iterate backwards through travel days.
4. For 7-day and 30-day passes, move the respective pointer backwards while it points to a covered day.
5. Compute the minimum of: 1-day pass cost, 7-day pass + `dp[last7]`, and 30-day pass + `dp[last30]`.
6. Return `dp[0]`.

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        days.append(days[-1] + 30)
        n = len(days)
        dp = [0] * n
        last7 = last30 = n

        for i in range(n - 2, -1, -1):
            dp[i] = dp[i + 1] + costs[0]

            while last7 > i + 1 and days[last7 - 1] >= days[i] + 7:
                last7 -= 1
            dp[i] = min(dp[i], costs[1] + dp[last7])

            while last30 > i + 1 and days[last30 - 1] >= days[i] + 30:
                last30 -= 1
            dp[i] = min(dp[i], costs[2] + dp[last30])

        return dp[0]
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        int n = days.length;
        int[] dp = new int[n + 1];
        int last7 = n, last30 = n;
        int[] extendedDays = Arrays.copyOf(days, n + 1);
        extendedDays[n] = days[n - 1] + 30;

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = dp[i + 1] + costs[0];

            while (last7 > i + 1 && extendedDays[last7 - 1] >= days[i] + 7) {
                last7--;
            }
            dp[i] = Math.min(dp[i], costs[1] + dp[last7]);

            while (last30 > i + 1 && extendedDays[last30 - 1] >= days[i] + 30) {
                last30--;
            }
            dp[i] = Math.min(dp[i], costs[2] + dp[last30]);
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        days.push_back(days.back() + 30);
        int n = days.size();
        vector<int> dp(n, 0);
        int last7 = n, last30 = n;

        for (int i = n - 2; i >= 0; --i) {
            dp[i] = dp[i + 1] + costs[0];

            while (last7 > i + 1 && days[last7 - 1] >= days[i] + 7) {
                --last7;
            }
            dp[i] = min(dp[i], costs[1] + dp[last7]);

            while (last30 > i + 1 && days[last30 - 1] >= days[i] + 30) {
                --last30;
            }
            dp[i] = min(dp[i], costs[2] + dp[last30]);
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        days.push(days[days.length - 1] + 30);
        const n = days.length;
        const dp = new Array(n).fill(0);
        let last7 = n,
            last30 = n;

        for (let i = n - 2; i >= 0; i--) {
            dp[i] = dp[i + 1] + costs[0];

            while (last7 > i + 1 && days[last7 - 1] >= days[i] + 7) {
                last7--;
            }
            dp[i] = Math.min(dp[i], costs[1] + dp[last7]);

            while (last30 > i + 1 && days[last30 - 1] >= days[i] + 30) {
                last30--;
            }
            dp[i] = Math.min(dp[i], costs[2] + dp[last30]);
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int MincostTickets(int[] days, int[] costs) {
        int n = days.Length;
        int[] newDays = new int[n + 1];
        Array.Copy(days, newDays, n);
        newDays[n] = days[n - 1] + 30;
        n += 1;

        int[] dp = new int[n];
        int last7 = n, last30 = n;

        for (int i = n - 2; i >= 0; i--) {
            dp[i] = dp[i + 1] + costs[0];

            while (last7 > i + 1 && newDays[last7 - 1] >= newDays[i] + 7) {
                last7--;
            }
            dp[i] = Math.Min(dp[i], costs[1] + dp[last7]);

            while (last30 > i + 1 && newDays[last30 - 1] >= newDays[i] + 30) {
                last30--;
            }
            dp[i] = Math.Min(dp[i], costs[2] + dp[last30]);
        }

        return dp[0];
    }
}
```

```go
func mincostTickets(days []int, costs []int) int {
    days = append(days, days[len(days)-1]+30)
    n := len(days)
    dp := make([]int, n)
    last7, last30 := n, n

    for i := n - 2; i >= 0; i-- {
        dp[i] = dp[i+1] + costs[0]

        for last7 > i+1 && days[last7-1] >= days[i]+7 {
            last7--
        }
        dp[i] = min(dp[i], costs[1]+dp[last7])

        for last30 > i+1 && days[last30-1] >= days[i]+30 {
            last30--
        }
        dp[i] = min(dp[i], costs[2]+dp[last30])
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun mincostTickets(days: IntArray, costs: IntArray): Int {
        val newDays = days.toMutableList().apply { add(days.last() + 30) }.toIntArray()
        val n = newDays.size
        val dp = IntArray(n)
        var last7 = n
        var last30 = n

        for (i in n - 2 downTo 0) {
            dp[i] = dp[i + 1] + costs[0]

            while (last7 > i + 1 && newDays[last7 - 1] >= newDays[i] + 7) {
                last7--
            }
            dp[i] = minOf(dp[i], costs[1] + dp[last7])

            while (last30 > i + 1 && newDays[last30 - 1] >= newDays[i] + 30) {
                last30--
            }
            dp[i] = minOf(dp[i], costs[2] + dp[last30])
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func mincostTickets(_ days: [Int], _ costs: [Int]) -> Int {
        var days = days + [days.last! + 30]
        let n = days.count
        var dp = [Int](repeating: 0, count: n)
        var last7 = n
        var last30 = n

        for i in stride(from: n - 2, through: 0, by: -1) {
            dp[i] = dp[i + 1] + costs[0]

            while last7 > i + 1 && days[last7 - 1] >= days[i] + 7 {
                last7 -= 1
            }
            dp[i] = min(dp[i], costs[1] + dp[last7])

            while last30 > i + 1 && days[last30 - 1] >= days[i] + 30 {
                last30 -= 1
            }
            dp[i] = min(dp[i], costs[2] + dp[last30])
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Dynamic Programming (Space Optimized) - I

### Intuition

We can process days forward instead of backward. At each day, we only need to know the minimum cost to reach that day using passes bought on earlier days. We use two queues to track when 7-day and 30-day passes expire. Passes that have expired (started more than 7 or 30 days ago) are removed from consideration.

### Algorithm

1. Use two queues to store `(day, cost)` pairs for 7-day and 30-day passes.
2. For each travel day:
   - Remove expired passes from both queues.
   - Add new pass options: buying a 7-day or 30-day pass today.
   - Calculate minimum cost: 1-day pass from yesterday, or cheapest valid 7-day or 30-day pass.
3. Return the final cost after processing all days.

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        dp7, dp30 = deque(), deque()
        dp = 0

        for d in days:
            while dp7 and dp7[0][0] + 7 <= d:
                dp7.popleft()

            while dp30 and dp30[0][0] + 30 <= d:
                dp30.popleft()

            dp7.append([d, dp + costs[1]])
            dp30.append([d, dp + costs[2]])
            dp = min(dp + costs[0], dp7[0][1], dp30[0][1])

        return dp
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        Queue<int[]> dp7 = new LinkedList<>();
        Queue<int[]> dp30 = new LinkedList<>();
        int dp = 0;

        for (int d : days) {
            while (!dp7.isEmpty() && dp7.peek()[0] + 7 <= d) {
                dp7.poll();
            }

            while (!dp30.isEmpty() && dp30.peek()[0] + 30 <= d) {
                dp30.poll();
            }

            dp7.offer(new int[]{d, dp + costs[1]});
            dp30.offer(new int[]{d, dp + costs[2]});
            dp = Math.min(dp + costs[0], Math.min(dp7.peek()[1], dp30.peek()[1]));
        }

        return dp;
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        queue<pair<int, int>> dp7, dp30;
        int dp = 0;

        for (int& d : days) {
            while (!dp7.empty() && dp7.front().first + 7 <= d) {
                dp7.pop();
            }

            while (!dp30.empty() && dp30.front().first + 30 <= d) {
                dp30.pop();
            }

            dp7.emplace(d, dp + costs[1]);
            dp30.emplace(d, dp + costs[2]);
            dp = min({dp + costs[0], dp7.front().second, dp30.front().second});
        }

        return dp;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const dp7 = new Queue();
        const dp30 = new Queue();
        let dp = 0;

        for (const d of days) {
            while (!dp7.isEmpty() && dp7.front()[0] + 7 <= d) {
                dp7.pop();
            }

            while (!dp30.isEmpty() && dp30.front()[0] + 30 <= d) {
                dp30.pop();
            }

            dp7.push([d, dp + costs[1]]);
            dp30.push([d, dp + costs[2]]);

            dp = Math.min(dp + costs[0], dp7.front()[1], dp30.front()[1]);
        }

        return dp;
    }
}
```

```csharp
public class Solution {
    public int MincostTickets(int[] days, int[] costs) {
        Queue<(int day, int cost)> dp7 = new Queue<(int, int)>();
        Queue<(int day, int cost)> dp30 = new Queue<(int, int)>();
        int dp = 0;

        foreach (int d in days) {
            while (dp7.Count > 0 && dp7.Peek().day + 7 <= d) {
                dp7.Dequeue();
            }

            while (dp30.Count > 0 && dp30.Peek().day + 30 <= d) {
                dp30.Dequeue();
            }

            dp7.Enqueue((d, dp + costs[1]));
            dp30.Enqueue((d, dp + costs[2]));

            int cost1 = dp + costs[0];
            int cost7 = dp7.Peek().cost;
            int cost30 = dp30.Peek().cost;

            dp = Math.Min(cost1, Math.Min(cost7, cost30));
        }

        return dp;
    }
}
```

```go
func mincostTickets(days []int, costs []int) int {
    dp7 := [][2]int{}
    dp30 := [][2]int{}
    dp := 0

    for _, d := range days {
        for len(dp7) > 0 && dp7[0][0]+7 <= d {
            dp7 = dp7[1:]
        }
        for len(dp30) > 0 && dp30[0][0]+30 <= d {
            dp30 = dp30[1:]
        }

        dp7 = append(dp7, [2]int{d, dp + costs[1]})
        dp30 = append(dp30, [2]int{d, dp + costs[2]})

        dp = min(dp+costs[0], min(dp7[0][1], dp30[0][1]))
    }

    return dp
}
```

```kotlin
class Solution {
    fun mincostTickets(days: IntArray, costs: IntArray): Int {
        val dp7 = ArrayDeque<IntArray>()
        val dp30 = ArrayDeque<IntArray>()
        var dp = 0

        for (d in days) {
            while (dp7.isNotEmpty() && dp7.first()[0] + 7 <= d) {
                dp7.removeFirst()
            }
            while (dp30.isNotEmpty() && dp30.first()[0] + 30 <= d) {
                dp30.removeFirst()
            }

            dp7.addLast(intArrayOf(d, dp + costs[1]))
            dp30.addLast(intArrayOf(d, dp + costs[2]))

            dp = minOf(dp + costs[0], minOf(dp7.first()[1], dp30.first()[1]))
        }

        return dp
    }
}
```

```swift
class Solution {
    func mincostTickets(_ days: [Int], _ costs: [Int]) -> Int {
        var dp7 = [(Int, Int)]()
        var dp30 = [(Int, Int)]()
        var dp = 0

        for d in days {
            while !dp7.isEmpty && dp7.first!.0 + 7 <= d {
                dp7.removeFirst()
            }
            while !dp30.isEmpty && dp30.first!.0 + 30 <= d {
                dp30.removeFirst()
            }

            dp7.append((d, dp + costs[1]))
            dp30.append((d, dp + costs[2]))

            dp = min(dp + costs[0], min(dp7.first!.1, dp30.first!.1))
        }

        return dp
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we keep at most $30$ values in the queue.

---

## 6. Dynamic Programming (Space Optimized) - II

### Intuition

Similar to the previous approach but processing backwards. We use deques to track costs for 7-day and 30-day passes. As we move backwards, we pop entries that would now be within coverage range of the current day, keeping track of the last popped cost which represents the best option for that pass type.

### Algorithm

1. Use two deques for 7-day and 30-day pass tracking.
2. Process days from last to first.
3. Add the 1-day pass cost to the running total.
4. For 7-day and 30-day passes, pop entries that fall within range and track the best cost.
5. Take the minimum of all three options.
6. Add the current day and cost to both deques.

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        dp7, dp30 = deque(), deque()
        dp = 0

        last7 = last30 = 0
        for i in range(len(days) - 1, -1, -1):
            dp += costs[0]
            while dp7 and dp7[-1][0] >= days[i] + 7:
                last7 = dp7.pop()[1]
            dp = min(dp, costs[1] + last7)

            while dp30 and dp30[-1][0] >= days[i] + 30:
                last30 = dp30.pop()[1]
            dp = min(dp, costs[2] + last30)

            dp7.appendleft([days[i], dp])
            dp30.appendleft([days[i], dp])

        return dp
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        Deque<int[]> dp7 = new ArrayDeque<>();
        Deque<int[]> dp30 = new ArrayDeque<>();
        int dp = 0, last7 = 0, last30 = 0;

        for (int i = days.length - 1; i >= 0; i--) {
            dp += costs[0];

            while (!dp7.isEmpty() && dp7.peekLast()[0] >= days[i] + 7) {
                last7 = dp7.pollLast()[1];
            }
            dp = Math.min(dp, costs[1] + last7);

            while (!dp30.isEmpty() && dp30.peekLast()[0] >= days[i] + 30) {
                last30 = dp30.pollLast()[1];
            }
            dp = Math.min(dp, costs[2] + last30);

            dp7.offerFirst(new int[]{days[i], dp});
            dp30.offerFirst(new int[]{days[i], dp});
        }
        return dp;
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        deque<pair<int, int>> dp7, dp30;
        int dp = 0, last7 = 0, last30 = 0;

        for (int i = days.size() - 1; i >= 0; --i) {
            dp += costs[0];

            while (!dp7.empty() && dp7.back().first >= days[i] + 7) {
                last7 = dp7.back().second;
                dp7.pop_back();
            }
            dp = min(dp, costs[1] + last7);

            while (!dp30.empty() && dp30.back().first >= days[i] + 30) {
                last30 = dp30.back().second;
                dp30.pop_back();
            }
            dp = min(dp, costs[2] + last30);

            dp7.push_front({days[i], dp});
            dp30.push_front({days[i], dp});
        }
        return dp;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const dp7 = new Deque();
        const dp30 = new Deque();
        let dp = 0,
            last7 = 0,
            last30 = 0;

        for (let i = days.length - 1; i >= 0; i--) {
            dp += costs[0];

            while (!dp7.isEmpty() && dp7.back()[0] >= days[i] + 7) {
                last7 = dp7.popBack()[1];
            }
            dp = Math.min(dp, costs[1] + last7);

            while (!dp30.isEmpty() && dp30.back()[0] >= days[i] + 30) {
                last30 = dp30.popBack()[1];
            }
            dp = Math.min(dp, costs[2] + last30);

            dp7.pushFront([days[i], dp]);
            dp30.pushFront([days[i], dp]);
        }
        return dp;
    }
}
```

```csharp
public class Solution {
    public int MincostTickets(int[] days, int[] costs) {
        Queue<(int day, int cost)> dp7 = new Queue<(int, int)>();
        Queue<(int day, int cost)> dp30 = new Queue<(int, int)>();
        int dp = 0;
        int last7 = 0, last30 = 0;

        for (int i = days.Length - 1; i >= 0; i--) {
            dp += costs[0];

            while (dp7.Count > 0 && dp7.Peek().day >= days[i] + 7) {
                last7 = dp7.Dequeue().cost;
            }
            dp = Math.Min(dp, costs[1] + last7);

            while (dp30.Count > 0 && dp30.Peek().day >= days[i] + 30) {
                last30 = dp30.Dequeue().cost;
            }
            dp = Math.Min(dp, costs[2] + last30);

            dp7.Enqueue((days[i], dp));
            dp30.Enqueue((days[i], dp));
        }

        return dp;
    }
}
```

```go
func mincostTickets(days []int, costs []int) int {
    dp7 := [][2]int{}
    dp30 := [][2]int{}
    dp := 0
    last7, last30 := 0, 0

    for i := len(days) - 1; i >= 0; i-- {
        dp += costs[0]

        for len(dp7) > 0 && dp7[len(dp7)-1][0] >= days[i]+7 {
            last7 = dp7[len(dp7)-1][1]
            dp7 = dp7[:len(dp7)-1]
        }
        dp = min(dp, costs[1]+last7)

        for len(dp30) > 0 && dp30[len(dp30)-1][0] >= days[i]+30 {
            last30 = dp30[len(dp30)-1][1]
            dp30 = dp30[:len(dp30)-1]
        }
        dp = min(dp, costs[2]+last30)

        dp7 = append([][2]int{{days[i], dp}}, dp7...)
        dp30 = append([][2]int{{days[i], dp}}, dp30...)
    }

    return dp
}
```

```kotlin
class Solution {
    fun mincostTickets(days: IntArray, costs: IntArray): Int {
        val dp7 = ArrayDeque<IntArray>()
        val dp30 = ArrayDeque<IntArray>()
        var dp = 0
        var last7 = 0
        var last30 = 0

        for (i in days.size - 1 downTo 0) {
            dp += costs[0]

            while (dp7.isNotEmpty() && dp7.last()[0] >= days[i] + 7) {
                last7 = dp7.removeLast()[1]
            }
            dp = minOf(dp, costs[1] + last7)

            while (dp30.isNotEmpty() && dp30.last()[0] >= days[i] + 30) {
                last30 = dp30.removeLast()[1]
            }
            dp = minOf(dp, costs[2] + last30)

            dp7.addFirst(intArrayOf(days[i], dp))
            dp30.addFirst(intArrayOf(days[i], dp))
        }

        return dp
    }
}
```

```swift
class Solution {
    func mincostTickets(_ days: [Int], _ costs: [Int]) -> Int {
        var dp7 = [(Int, Int)]()
        var dp30 = [(Int, Int)]()
        var dp = 0
        var last7 = 0
        var last30 = 0

        for i in stride(from: days.count - 1, through: 0, by: -1) {
            dp += costs[0]

            while !dp7.isEmpty && dp7.last!.0 >= days[i] + 7 {
                last7 = dp7.removeLast().1
            }
            dp = min(dp, costs[1] + last7)

            while !dp30.isEmpty && dp30.last!.0 >= days[i] + 30 {
                last30 = dp30.removeLast().1
            }
            dp = min(dp, costs[2] + last30)

            dp7.insert((days[i], dp), at: 0)
            dp30.insert((days[i], dp), at: 0)
        }

        return dp
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we keep at most $30$ values in the deque.

---

## 7. Dynamic Programming (Space Optimized) - III

### Intuition

Instead of indexing by travel day positions, we can index by actual calendar days (1 to 365). For non-travel days, the cost stays the same as the previous day. For travel days, we consider all three pass options. This approach is efficient when travel days are sparse across the year.

### Algorithm

1. Create a DP array of size 366 for each day of the year.
2. Keep a pointer `i` to track the current travel day index.
3. For each calendar day from 1 to 365:
   - If not a travel day, copy the previous day's cost.
   - If it is a travel day, compute the minimum of:
     - `dp[d-1] + cost[0]` (1-day pass)
     - `dp[max(0, d-7)] + cost[1]` (7-day pass)
     - `dp[max(0, d-30)] + cost[2]` (30-day pass)
4. Return the cost at the last travel day.

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        dp = [0] * 366
        i = 0

        for d in range(1, 366):
            dp[d] = dp[d - 1]
            if i == len(days):
                return dp[d]

            if d == days[i]:
                dp[d] += costs[0]
                dp[d] = min(dp[d], costs[1] + dp[max(0, d - 7)])
                dp[d] = min(dp[d], costs[2] + dp[max(0, d - 30)])
                i += 1

        return dp[365]
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        int[] dp = new int[366];
        int i = 0;

        for (int d = 1; d < 366; d++) {
            dp[d] = dp[d - 1];

            if (i == days.length) {
                return dp[d];
            }

            if (d == days[i]) {
                dp[d] += costs[0];
                dp[d] = Math.min(dp[d], costs[1] + dp[Math.max(0, d - 7)]);
                dp[d] = Math.min(dp[d], costs[2] + dp[Math.max(0, d - 30)]);
                i++;
            }
        }
        return dp[365];
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        vector<int> dp(366, 0);
        int i = 0;

        for (int d = 1; d < 366; d++) {
            dp[d] = dp[d - 1];

            if (i == days.size()) {
                return dp[d];
            }

            if (d == days[i]) {
                dp[d] += costs[0];
                dp[d] = min(dp[d], costs[1] + dp[max(0, d - 7)]);
                dp[d] = min(dp[d], costs[2] + dp[max(0, d - 30)]);
                i++;
            }
        }
        return dp[365];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const dp = new Array(366).fill(0);
        let i = 0;

        for (let d = 1; d < 366; d++) {
            dp[d] = dp[d - 1];

            if (i === days.length) {
                return dp[d];
            }

            if (d === days[i]) {
                dp[d] += costs[0];
                dp[d] = Math.min(dp[d], costs[1] + dp[Math.max(0, d - 7)]);
                dp[d] = Math.min(dp[d], costs[2] + dp[Math.max(0, d - 30)]);
                i++;
            }
        }
        return dp[365];
    }
}
```

```csharp
public class Solution {
    public int MincostTickets(int[] days, int[] costs) {
        int[] dp = new int[366];
        int i = 0;

        for (int d = 1; d <= 365; d++) {
            dp[d] = dp[d - 1];
            if (i == days.Length) {
                return dp[d];
            }

            if (d == days[i]) {
                dp[d] += costs[0];
                dp[d] = Math.Min(dp[d], costs[1] + dp[Math.Max(0, d - 7)]);
                dp[d] = Math.Min(dp[d], costs[2] + dp[Math.Max(0, d - 30)]);
                i++;
            }
        }

        return dp[365];
    }
}
```

```go
func mincostTickets(days []int, costs []int) int {
    dp := make([]int, 366)
    i := 0

    for d := 1; d < 366; d++ {
        dp[d] = dp[d-1]
        if i == len(days) {
            return dp[d]
        }

        if d == days[i] {
            dp[d] += costs[0]
            d7 := d - 7
            if d7 < 0 {
                d7 = 0
            }
            dp[d] = min(dp[d], costs[1]+dp[d7])
            d30 := d - 30
            if d30 < 0 {
                d30 = 0
            }
            dp[d] = min(dp[d], costs[2]+dp[d30])
            i++
        }
    }

    return dp[365]
}
```

```kotlin
class Solution {
    fun mincostTickets(days: IntArray, costs: IntArray): Int {
        val dp = IntArray(366)
        var i = 0

        for (d in 1..365) {
            dp[d] = dp[d - 1]
            if (i == days.size) {
                return dp[d]
            }

            if (d == days[i]) {
                dp[d] += costs[0]
                dp[d] = minOf(dp[d], costs[1] + dp[maxOf(0, d - 7)])
                dp[d] = minOf(dp[d], costs[2] + dp[maxOf(0, d - 30)])
                i++
            }
        }

        return dp[365]
    }
}
```

```swift
class Solution {
    func mincostTickets(_ days: [Int], _ costs: [Int]) -> Int {
        var dp = [Int](repeating: 0, count: 366)
        var i = 0

        for d in 1...365 {
            dp[d] = dp[d - 1]
            if i == days.count {
                return dp[d]
            }

            if d == days[i] {
                dp[d] += costs[0]
                dp[d] = min(dp[d], costs[1] + dp[max(0, d - 7)])
                dp[d] = min(dp[d], costs[2] + dp[max(0, d - 30)])
                i += 1
            }
        }

        return dp[365]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since the size of the $dp$ array is $366$.

---

## 8. Dynamic Programming (Space Optimized) - IV

### Intuition

The previous approach uses 366 slots, but we only ever look back at most 30 days. By using modular arithmetic with a size-31 array, we can reduce space to constant while still accessing the necessary previous states. The index `d % 31` ensures we have access to all values within the 30-day window.

### Algorithm

1. Create a DP array of size 31.
2. For each calendar day, use modular indexing `d % 31`.
3. For non-travel days, copy from `(d - 1) % 31`.
4. For travel days, compute the minimum using modular indices for lookback.
5. Return `dp[last_travel_day % 31]`.

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        dp = [0] * 31
        i = 0

        for d in range(1, 366):
            if i >= len(days):
                break

            dp[d % 31] = dp[(d - 1) % 31]

            if d == days[i]:
                dp[d % 31] += costs[0]
                dp[d % 31] = min(dp[d % 31], costs[1] + dp[max(0, d - 7) % 31])
                dp[d % 31] = min(dp[d % 31], costs[2] + dp[max(0, d - 30) % 31])
                i += 1

        return dp[days[-1] % 31]
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        int[] dp = new int[31];
        int i = 0;

        for (int d = 1; d <= 365; d++) {
            if (i >= days.length) break;

            dp[d % 31] = dp[(d - 1) % 31];

            if (d == days[i]) {
                dp[d % 31] += costs[0];
                dp[d % 31] = Math.min(dp[d % 31], costs[1] + dp[Math.max(0, d - 7) % 31]);
                dp[d % 31] = Math.min(dp[d % 31], costs[2] + dp[Math.max(0, d - 30) % 31]);
                i++;
            }
        }

        return dp[days[days.length - 1] % 31];
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        vector<int> dp(31, 0);
        int i = 0;

        for (int d = 1; d <= 365; d++) {
            if (i >= days.size()) break;

            dp[d % 31] = dp[(d - 1) % 31];

            if (d == days[i]) {
                dp[d % 31] += costs[0];
                dp[d % 31] = min(dp[d % 31], costs[1] + dp[max(0, d - 7) % 31]);
                dp[d % 31] = min(dp[d % 31], costs[2] + dp[max(0, d - 30) % 31]);
                i++;
            }
        }

        return dp[days.back() % 31];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const dp = new Array(31).fill(0);
        let i = 0;

        for (let d = 1; d <= 365; d++) {
            if (i >= days.length) break;

            dp[d % 31] = dp[(d - 1) % 31];

            if (d === days[i]) {
                dp[d % 31] += costs[0];
                dp[d % 31] = Math.min(
                    dp[d % 31],
                    costs[1] + dp[Math.max(0, d - 7) % 31],
                );
                dp[d % 31] = Math.min(
                    dp[d % 31],
                    costs[2] + dp[Math.max(0, d - 30) % 31],
                );
                i++;
            }
        }

        return dp[days[days.length - 1] % 31];
    }
}
```

```csharp
public class Solution {
    public int MincostTickets(int[] days, int[] costs) {
        int[] dp = new int[31];
        int i = 0;

        for (int d = 1; d <= 365; d++) {
            if (i >= days.Length) {
                break;
            }

            dp[d % 31] = dp[(d - 1) % 31];

            if (d == days[i]) {
                dp[d % 31] += costs[0];
                dp[d % 31] = Math.Min(dp[d % 31], costs[1] + dp[Math.Max(0, d - 7) % 31]);
                dp[d % 31] = Math.Min(dp[d % 31], costs[2] + dp[Math.Max(0, d - 30) % 31]);
                i++;
            }
        }

        return dp[days[days.Length - 1] % 31];
    }
}
```

```go
func mincostTickets(days []int, costs []int) int {
    dp := make([]int, 31)
    i := 0

    for d := 1; d <= 365; d++ {
        if i >= len(days) {
            break
        }

        dp[d%31] = dp[(d-1+31)%31]

        if d == days[i] {
            dp[d%31] += costs[0]
            d7 := d - 7
            if d7 < 0 {
                d7 = 0
            }
            dp[d%31] = min(dp[d%31], costs[1]+dp[d7%31])
            d30 := d - 30
            if d30 < 0 {
                d30 = 0
            }
            dp[d%31] = min(dp[d%31], costs[2]+dp[d30%31])
            i++
        }
    }

    return dp[days[len(days)-1]%31]
}
```

```kotlin
class Solution {
    fun mincostTickets(days: IntArray, costs: IntArray): Int {
        val dp = IntArray(31)
        var i = 0

        for (d in 1..365) {
            if (i >= days.size) break

            dp[d % 31] = dp[(d - 1) % 31]

            if (d == days[i]) {
                dp[d % 31] += costs[0]
                dp[d % 31] = minOf(dp[d % 31], costs[1] + dp[maxOf(0, d - 7) % 31])
                dp[d % 31] = minOf(dp[d % 31], costs[2] + dp[maxOf(0, d - 30) % 31])
                i++
            }
        }

        return dp[days.last() % 31]
    }
}
```

```swift
class Solution {
    func mincostTickets(_ days: [Int], _ costs: [Int]) -> Int {
        var dp = [Int](repeating: 0, count: 31)
        var i = 0

        for d in 1...365 {
            if i >= days.count { break }

            dp[d % 31] = dp[(d - 1) % 31]

            if d == days[i] {
                dp[d % 31] += costs[0]
                dp[d % 31] = min(dp[d % 31], costs[1] + dp[max(0, d - 7) % 31])
                dp[d % 31] = min(dp[d % 31], costs[2] + dp[max(0, d - 30) % 31])
                i += 1
            }
        }

        return dp[days.last! % 31]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since the size of the $dp$ array is $31$.
