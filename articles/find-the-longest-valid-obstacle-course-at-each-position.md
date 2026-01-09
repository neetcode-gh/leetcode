## 1. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def longestObstacleCourseAtEachPosition(self, obstacles: List[int]) -> List[int]:
        n = len(obstacles)
        dp = [[-1] * (n + 1) for _ in range(n)]

        def dfs(i, prev):
            if i < 0:
                return 0
            if dp[i][prev] != -1:
                return dp[i][prev]

            res = dfs(i - 1, prev)
            if prev == n or obstacles[prev] >= obstacles[i]:
                res = max(res, 1 + dfs(i - 1, i))
            dp[i][prev] = res
            return res

        dfs(n - 1, n)
        return [1] + [1 + dp[i - 1][i] for i in range(1, n)]
```

```java
public class Solution {
    private int[][] dp;

    public int[] longestObstacleCourseAtEachPosition(int[] obstacles) {
        int n = obstacles.length;
        this.dp = new int[n][n + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        dfs(n - 1, n, obstacles);

        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = 1 + dp[i - 1][i];
        }
        return res;
    }

    private int dfs(int i, int prev, int[] obstacles) {
        if (i < 0) {
            return 0;
        }
        if (dp[i][prev] != -1) {
            return dp[i][prev];
        }

        int res = dfs(i - 1, prev, obstacles);
        if (prev == obstacles.length || obstacles[prev] >= obstacles[i]) {
            res = Math.max(res, 1 + dfs(i - 1, i, obstacles));
        }
        return dp[i][prev] = res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> dp;

    vector<int> longestObstacleCourseAtEachPosition(vector<int>& obstacles) {
        int n = obstacles.size();
        this->dp = vector<vector<int>>(n, vector<int>(n + 1, -1));

        dfs(n - 1, n, obstacles);

        vector<int> res(n, 1);
        for (int i = 1; i < n; i++) {
            res[i] = 1 + dp[i - 1][i];
        }
        return res;
    }

private:
    int dfs(int i, int prev, vector<int>& obstacles) {
        if (i < 0) {
            return 0;
        }
        if (dp[i][prev] != -1) {
            return dp[i][prev];
        }

        int res = dfs(i - 1, prev, obstacles);
        if (prev == obstacles.size() || obstacles[prev] >= obstacles[i]) {
            res = max(res, 1 + dfs(i - 1, i, obstacles));
        }
        return dp[i][prev] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} obstacles
     * @return {number[]}
     */
    longestObstacleCourseAtEachPosition(obstacles) {
        const n = obstacles.length;
        const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

        const dfs = (i, prev) => {
            if (i < 0) {
                return 0;
            }
            if (dp[i][prev] !== -1) {
                return dp[i][prev];
            }

            let res = dfs(i - 1, prev);
            if (prev === n || obstacles[prev] >= obstacles[i]) {
                res = Math.max(res, 1 + dfs(i - 1, i));
            }
            dp[i][prev] = res;
            return res;
        };

        dfs(n - 1, n);

        const res = new Array(n).fill(1);
        for (let i = 1; i < n; i++) {
            res[i] = 1 + dp[i - 1][i];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private int[][] dp;

    public int[] LongestObstacleCourseAtEachPosition(int[] obstacles) {
        int n = obstacles.Length;
        dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[n + 1];
            Array.Fill(dp[i], -1);
        }

        Dfs(n - 1, n, obstacles);

        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = 1 + dp[i - 1][i];
        }
        return res;
    }

    private int Dfs(int i, int prev, int[] obstacles) {
        if (i < 0) return 0;
        if (dp[i][prev] != -1) return dp[i][prev];

        int res = Dfs(i - 1, prev, obstacles);
        if (prev == obstacles.Length || obstacles[prev] >= obstacles[i]) {
            res = Math.Max(res, 1 + Dfs(i - 1, i, obstacles));
        }
        return dp[i][prev] = res;
    }
}
```

```go
func longestObstacleCourseAtEachPosition(obstacles []int) []int {
    n := len(obstacles)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, prev int) int
    dfs = func(i, prev int) int {
        if i < 0 {
            return 0
        }
        if dp[i][prev] != -1 {
            return dp[i][prev]
        }

        res := dfs(i-1, prev)
        if prev == n || obstacles[prev] >= obstacles[i] {
            res = max(res, 1+dfs(i-1, i))
        }
        dp[i][prev] = res
        return res
    }

    dfs(n-1, n)

    res := make([]int, n)
    res[0] = 1
    for i := 1; i < n; i++ {
        res[i] = 1 + dp[i-1][i]
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
    private lateinit var dp: Array<IntArray>

    fun longestObstacleCourseAtEachPosition(obstacles: IntArray): IntArray {
        val n = obstacles.size
        dp = Array(n) { IntArray(n + 1) { -1 } }

        dfs(n - 1, n, obstacles)

        val res = IntArray(n) { 1 }
        for (i in 1 until n) {
            res[i] = 1 + dp[i - 1][i]
        }
        return res
    }

    private fun dfs(i: Int, prev: Int, obstacles: IntArray): Int {
        if (i < 0) return 0
        if (dp[i][prev] != -1) return dp[i][prev]

        var res = dfs(i - 1, prev, obstacles)
        if (prev == obstacles.size || obstacles[prev] >= obstacles[i]) {
            res = maxOf(res, 1 + dfs(i - 1, i, obstacles))
        }
        dp[i][prev] = res
        return res
    }
}
```

```swift
class Solution {
    private var dp: [[Int]] = []

    func longestObstacleCourseAtEachPosition(_ obstacles: [Int]) -> [Int] {
        let n = obstacles.count
        dp = Array(repeating: Array(repeating: -1, count: n + 1), count: n)

        dfs(n - 1, n, obstacles)

        var res = Array(repeating: 1, count: n)
        for i in 1..<n {
            res[i] = 1 + dp[i - 1][i]
        }
        return res
    }

    private func dfs(_ i: Int, _ prev: Int, _ obstacles: [Int]) -> Int {
        if i < 0 { return 0 }
        if dp[i][prev] != -1 { return dp[i][prev] }

        var res = dfs(i - 1, prev, obstacles)
        if prev == obstacles.count || obstacles[prev] >= obstacles[i] {
            res = max(res, 1 + dfs(i - 1, i, obstacles))
        }
        dp[i][prev] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Dynamic Programming (Binary Search) - I

::tabs-start

```python
class Solution:
    def longestObstacleCourseAtEachPosition(self, obstacles: List[int]) -> List[int]:
        res = []
        dp = [10**8] * (len(obstacles) + 1)

        for num in obstacles:
            index = bisect.bisect(dp, num)
            res.append(index + 1)
            dp[index] = num

        return res
```

```java
public class Solution {
    public int[] longestObstacleCourseAtEachPosition(int[] obstacles) {
        int n = obstacles.length;
        int[] res = new int[n];
        int[] dp = new int[n + 1];
        Arrays.fill(dp, (int) 1e8);

        for (int i = 0; i < n; i++) {
            int index = upperBound(dp, obstacles[i]);
            res[i] = index + 1;
            dp[index] = obstacles[i];
        }

        return res;
    }

    private int upperBound(int[] dp, int target) {
        int left = 0, right = dp.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (dp[mid] > target) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
}
```

```cpp
class Solution {
public:
    vector<int> longestObstacleCourseAtEachPosition(vector<int>& obstacles) {
        int n = obstacles.size();
        vector<int> res(n);
        vector<int> dp(n + 1, 1e8);

        for (int i = 0; i < n; i++) {
            int index = upper_bound(dp.begin(), dp.end(), obstacles[i]) - dp.begin();
            res[i] = index + 1;
            dp[index] = obstacles[i];
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} obstacles
     * @return {number[]}
     */
    longestObstacleCourseAtEachPosition(obstacles) {
        let n = obstacles.length;
        let res = new Array(n).fill(0);
        let dp = new Array(n + 1).fill(1e8);

        const upperBound = (dp, target) => {
            let left = 0,
                right = dp.length;
            while (left < right) {
                let mid = Math.floor((left + right) / 2);
                if (dp[mid] > target) {
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }
            return left;
        };

        for (let i = 0; i < n; i++) {
            let index = upperBound(dp, obstacles[i]);
            res[i] = index + 1;
            dp[index] = obstacles[i];
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] LongestObstacleCourseAtEachPosition(int[] obstacles) {
        int n = obstacles.Length;
        int[] res = new int[n];
        int[] dp = new int[n + 1];
        Array.Fill(dp, (int)1e8);

        for (int i = 0; i < n; i++) {
            int index = UpperBound(dp, obstacles[i]);
            res[i] = index + 1;
            dp[index] = obstacles[i];
        }

        return res;
    }

    private int UpperBound(int[] dp, int target) {
        int left = 0, right = dp.Length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (dp[mid] > target) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
}
```

```go
import "sort"

func longestObstacleCourseAtEachPosition(obstacles []int) []int {
    n := len(obstacles)
    res := make([]int, n)
    dp := make([]int, n+1)
    for i := range dp {
        dp[i] = 1e8
    }

    for i := 0; i < n; i++ {
        index := sort.Search(len(dp), func(j int) bool {
            return dp[j] > obstacles[i]
        })
        res[i] = index + 1
        dp[index] = obstacles[i]
    }

    return res
}
```

```kotlin
class Solution {
    fun longestObstacleCourseAtEachPosition(obstacles: IntArray): IntArray {
        val n = obstacles.size
        val res = IntArray(n)
        val dp = IntArray(n + 1) { 1e8.toInt() }

        for (i in 0 until n) {
            val index = upperBound(dp, obstacles[i])
            res[i] = index + 1
            dp[index] = obstacles[i]
        }

        return res
    }

    private fun upperBound(dp: IntArray, target: Int): Int {
        var left = 0
        var right = dp.size
        while (left < right) {
            val mid = left + (right - left) / 2
            if (dp[mid] > target) {
                right = mid
            } else {
                left = mid + 1
            }
        }
        return left
    }
}
```

```swift
class Solution {
    func longestObstacleCourseAtEachPosition(_ obstacles: [Int]) -> [Int] {
        let n = obstacles.count
        var res = [Int](repeating: 0, count: n)
        var dp = [Int](repeating: Int(1e8), count: n + 1)

        for i in 0..<n {
            let index = upperBound(dp, obstacles[i])
            res[i] = index + 1
            dp[index] = obstacles[i]
        }

        return res
    }

    private func upperBound(_ dp: [Int], _ target: Int) -> Int {
        var left = 0
        var right = dp.count
        while left < right {
            let mid = left + (right - left) / 2
            if dp[mid] > target {
                right = mid
            } else {
                left = mid + 1
            }
        }
        return left
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Binary Search) - II

::tabs-start

```python
class Solution:
    def longestObstacleCourseAtEachPosition(self, obstacles: List[int]) -> List[int]:
        res = []
        dp = []

        for num in obstacles:
            index = bisect.bisect_right(dp, num)
            res.append(index + 1)

            if index == len(dp):
                dp.append(num)
            else:
                dp[index] = num

        return res
```

```java
public class Solution {
    public int[] longestObstacleCourseAtEachPosition(int[] obstacles) {
        int n = obstacles.length;
        int[] res = new int[n];
        List<Integer> dp = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            int index = upperBound(dp, obstacles[i]);
            res[i] = index + 1;

            if (index == dp.size()) {
                dp.add(obstacles[i]);
            } else {
                dp.set(index, obstacles[i]);
            }
        }

        return res;
    }

    private int upperBound(List<Integer> dp, int target) {
        int left = 0, right = dp.size();
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (dp.get(mid) > target) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
}
```

```cpp
class Solution {
public:
    vector<int> longestObstacleCourseAtEachPosition(vector<int>& obstacles) {
        int n = obstacles.size();
        vector<int> res(n);
        vector<int> dp;

        for (int i = 0; i < n; i++) {
            int index = upper_bound(dp.begin(), dp.end(), obstacles[i]) - dp.begin();
            res[i] = index + 1;

            if (index == dp.size()) {
                dp.push_back(obstacles[i]);
            } else {
                dp[index] = obstacles[i];
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} obstacles
     * @return {number[]}
     */
    longestObstacleCourseAtEachPosition(obstacles) {
        let n = obstacles.length;
        let res = new Array(n).fill(0);
        let dp = [];

        const upperBound = (dp, target) => {
            let left = 0,
                right = dp.length;
            while (left < right) {
                let mid = Math.floor((left + right) / 2);
                if (dp[mid] > target) {
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }
            return left;
        };

        for (let i = 0; i < n; i++) {
            let index = upperBound(dp, obstacles[i]);
            res[i] = index + 1;

            if (index === dp.length) {
                dp.push(obstacles[i]);
            } else {
                dp[index] = obstacles[i];
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] LongestObstacleCourseAtEachPosition(int[] obstacles) {
        int n = obstacles.Length;
        int[] res = new int[n];
        List<int> dp = new List<int>();

        for (int i = 0; i < n; i++) {
            int index = UpperBound(dp, obstacles[i]);
            res[i] = index + 1;

            if (index == dp.Count) {
                dp.Add(obstacles[i]);
            } else {
                dp[index] = obstacles[i];
            }
        }

        return res;
    }

    private int UpperBound(List<int> dp, int target) {
        int left = 0, right = dp.Count;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (dp[mid] > target) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
}
```

```go
import "sort"

func longestObstacleCourseAtEachPosition(obstacles []int) []int {
    n := len(obstacles)
    res := make([]int, n)
    dp := []int{}

    for i := 0; i < n; i++ {
        index := sort.Search(len(dp), func(j int) bool {
            return dp[j] > obstacles[i]
        })
        res[i] = index + 1

        if index == len(dp) {
            dp = append(dp, obstacles[i])
        } else {
            dp[index] = obstacles[i]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun longestObstacleCourseAtEachPosition(obstacles: IntArray): IntArray {
        val n = obstacles.size
        val res = IntArray(n)
        val dp = mutableListOf<Int>()

        for (i in 0 until n) {
            val index = upperBound(dp, obstacles[i])
            res[i] = index + 1

            if (index == dp.size) {
                dp.add(obstacles[i])
            } else {
                dp[index] = obstacles[i]
            }
        }

        return res
    }

    private fun upperBound(dp: List<Int>, target: Int): Int {
        var left = 0
        var right = dp.size
        while (left < right) {
            val mid = left + (right - left) / 2
            if (dp[mid] > target) {
                right = mid
            } else {
                left = mid + 1
            }
        }
        return left
    }
}
```

```swift
class Solution {
    func longestObstacleCourseAtEachPosition(_ obstacles: [Int]) -> [Int] {
        let n = obstacles.count
        var res = [Int](repeating: 0, count: n)
        var dp = [Int]()

        for i in 0..<n {
            let index = upperBound(dp, obstacles[i])
            res[i] = index + 1

            if index == dp.count {
                dp.append(obstacles[i])
            } else {
                dp[index] = obstacles[i]
            }
        }

        return res
    }

    private func upperBound(_ dp: [Int], _ target: Int) -> Int {
        var left = 0
        var right = dp.count
        while left < right {
            let mid = left + (right - left) / 2
            if dp[mid] > target {
                right = mid
            } else {
                left = mid + 1
            }
        }
        return left
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
