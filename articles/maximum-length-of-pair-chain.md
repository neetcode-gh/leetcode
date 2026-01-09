## 1. Recursion

::tabs-start

```python
class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        n = len(pairs)
        pairs.sort(key=lambda x: x[1])

        def dfs(i, j):
            if i == n:
                return 0

            res = dfs(i + 1, j)
            if j == -1 or pairs[j][1] < pairs[i][0]:
                res = max(res, 1 + dfs(i + 1, i))

            return res

        return dfs(0, -1)
```

```java
public class Solution {
    public int findLongestChain(int[][] pairs) {
        int n = pairs.length;
        Arrays.sort(pairs, (a, b) -> Integer.compare(a[1], b[1]));
        return dfs(pairs, 0, -1, n);
    }

    private int dfs(int[][] pairs, int i, int j, int n) {
        if (i == n) {
            return 0;
        }

        int res = dfs(pairs, i + 1, j, n);
        if (j == -1 || pairs[j][1] < pairs[i][0]) {
            res = Math.max(res, 1 + dfs(pairs, i + 1, i, n));
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int findLongestChain(vector<vector<int>>& pairs) {
        int n = pairs.size();
        sort(pairs.begin(), pairs.end(), [](const auto& a, const auto& b) {
            return a[1] < b[1];
        });

        return dfs(pairs, 0, -1, n);
    }

private:
    int dfs(vector<vector<int>>& pairs, int i, int j, int n) {
        if (i == n) {
            return 0;
        }

        int res = dfs(pairs, i + 1, j, n);
        if (j == -1 || pairs[j][1] < pairs[i][0]) {
            res = max(res, 1 + dfs(pairs, i + 1, i, n));
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} pairs
     * @return {number}
     */
    findLongestChain(pairs) {
        pairs.sort((a, b) => a[1] - b[1]);
        let n = pairs.length;

        const dfs = (i, j) => {
            if (i === n) {
                return 0;
            }

            let res = dfs(i + 1, j);
            if (j === -1 || pairs[j][1] < pairs[i][0]) {
                res = Math.max(res, 1 + dfs(i + 1, i));
            }

            return res;
        };

        return dfs(0, -1);
    }
}
```

```csharp
public class Solution {
    public int FindLongestChain(int[][] pairs) {
        int n = pairs.Length;
        Array.Sort(pairs, (a, b) => a[1].CompareTo(b[1]));
        return Dfs(pairs, 0, -1, n);
    }

    private int Dfs(int[][] pairs, int i, int j, int n) {
        if (i == n) {
            return 0;
        }

        int res = Dfs(pairs, i + 1, j, n);
        if (j == -1 || pairs[j][1] < pairs[i][0]) {
            res = Math.Max(res, 1 + Dfs(pairs, i + 1, i, n));
        }

        return res;
    }
}
```

```go
func findLongestChain(pairs [][]int) int {
    n := len(pairs)
    sort.Slice(pairs, func(i, j int) bool {
        return pairs[i][1] < pairs[j][1]
    })

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == n {
            return 0
        }

        res := dfs(i+1, j)
        if j == -1 || pairs[j][1] < pairs[i][0] {
            take := 1 + dfs(i+1, i)
            if take > res {
                res = take
            }
        }

        return res
    }

    return dfs(0, -1)
}
```

```kotlin
class Solution {
    fun findLongestChain(pairs: Array<IntArray>): Int {
        val n = pairs.size
        pairs.sortBy { it[1] }

        fun dfs(i: Int, j: Int): Int {
            if (i == n) {
                return 0
            }

            var res = dfs(i + 1, j)
            if (j == -1 || pairs[j][1] < pairs[i][0]) {
                res = maxOf(res, 1 + dfs(i + 1, i))
            }

            return res
        }

        return dfs(0, -1)
    }
}
```

```swift
class Solution {
    func findLongestChain(_ pairs: [[Int]]) -> Int {
        var pairs = pairs.sorted { $0[1] < $1[1] }
        let n = pairs.count

        func dfs(_ i: Int, _ j: Int) -> Int {
            if i == n {
                return 0
            }

            var res = dfs(i + 1, j)
            if j == -1 || pairs[j][1] < pairs[i][0] {
                res = max(res, 1 + dfs(i + 1, i))
            }

            return res
        }

        return dfs(0, -1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        n = len(pairs)
        pairs.sort(key=lambda x: x[1])
        dp = [[-1] * (n + 1) for _ in range(n)]

        def dfs(i, j):
            if i == n:
                return 0
            if dp[i][j + 1] != -1:
                return dp[i][j + 1]

            res = dfs(i + 1, j)
            if j == -1 or pairs[j][1] < pairs[i][0]:
                res = max(res, 1 + dfs(i + 1, i))

            dp[i][j + 1] = res
            return res

        return dfs(0, -1)
```

```java
public class Solution {
    private int[][] dp;

    public int findLongestChain(int[][] pairs) {
        int n = pairs.length;
        Arrays.sort(pairs, (a, b) -> Integer.compare(a[1], b[1]));
        dp = new int[n][n + 1];

        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        return dfs(pairs, 0, -1, n);
    }

    private int dfs(int[][] pairs, int i, int j, int n) {
        if (i == n) {
            return 0;
        }
        if (dp[i][j + 1] != -1) {
            return dp[i][j + 1];
        }

        int res = dfs(pairs, i + 1, j, n);
        if (j == -1 || pairs[j][1] < pairs[i][0]) {
            res = Math.max(res, 1 + dfs(pairs, i + 1, i, n));
        }

        dp[i][j + 1] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> dp;

    int findLongestChain(vector<vector<int>>& pairs) {
        int n = pairs.size();
        sort(pairs.begin(), pairs.end(), [](const auto& a, const auto& b) {
            return a[1] < b[1];
        });

        dp = vector<vector<int>>(n, vector<int>(n + 1, -1));
        return dfs(pairs, 0, -1, n);
    }

private:
    int dfs(vector<vector<int>>& pairs, int i, int j, int n) {
        if (i == n) {
            return 0;
        }
        if (dp[i][j + 1] != -1) {
            return dp[i][j + 1];
        }

        int res = dfs(pairs, i + 1, j, n);
        if (j == -1 || pairs[j][1] < pairs[i][0]) {
            res = max(res, 1 + dfs(pairs, i + 1, i, n));
        }

        dp[i][j + 1] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} pairs
     * @return {number}
     */
    findLongestChain(pairs) {
        pairs.sort((a, b) => a[1] - b[1]);
        let n = pairs.length;
        let dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

        const dfs = (i, j) => {
            if (i === n) {
                return 0;
            }
            if (dp[i][j + 1] !== -1) {
                return dp[i][j + 1];
            }

            let res = dfs(i + 1, j);
            if (j === -1 || pairs[j][1] < pairs[i][0]) {
                res = Math.max(res, 1 + dfs(i + 1, i));
            }

            dp[i][j + 1] = res;
            return res;
        };

        return dfs(0, -1);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public int FindLongestChain(int[][] pairs) {
        int n = pairs.Length;
        Array.Sort(pairs, (a, b) => a[1].CompareTo(b[1]));
        dp = new int[n, n + 1];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= n; j++) {
                dp[i, j] = -1;
            }
        }
        return Dfs(pairs, 0, -1, n);
    }

    private int Dfs(int[][] pairs, int i, int j, int n) {
        if (i == n) {
            return 0;
        }
        if (dp[i, j + 1] != -1) {
            return dp[i, j + 1];
        }

        int res = Dfs(pairs, i + 1, j, n);
        if (j == -1 || pairs[j][1] < pairs[i][0]) {
            res = Math.Max(res, 1 + Dfs(pairs, i + 1, i, n));
        }

        dp[i, j + 1] = res;
        return res;
    }
}
```

```go
func findLongestChain(pairs [][]int) int {
    n := len(pairs)
    sort.Slice(pairs, func(i, j int) bool {
        return pairs[i][1] < pairs[j][1]
    })

    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == n {
            return 0
        }
        if dp[i][j+1] != -1 {
            return dp[i][j+1]
        }

        res := dfs(i+1, j)
        if j == -1 || pairs[j][1] < pairs[i][0] {
            take := 1 + dfs(i+1, i)
            if take > res {
                res = take
            }
        }

        dp[i][j+1] = res
        return res
    }

    return dfs(0, -1)
}
```

```kotlin
class Solution {
    fun findLongestChain(pairs: Array<IntArray>): Int {
        val n = pairs.size
        pairs.sortBy { it[1] }
        val dp = Array(n) { IntArray(n + 1) { -1 } }

        fun dfs(i: Int, j: Int): Int {
            if (i == n) {
                return 0
            }
            if (dp[i][j + 1] != -1) {
                return dp[i][j + 1]
            }

            var res = dfs(i + 1, j)
            if (j == -1 || pairs[j][1] < pairs[i][0]) {
                res = maxOf(res, 1 + dfs(i + 1, i))
            }

            dp[i][j + 1] = res
            return res
        }

        return dfs(0, -1)
    }
}
```

```swift
class Solution {
    func findLongestChain(_ pairs: [[Int]]) -> Int {
        var pairs = pairs.sorted { $0[1] < $1[1] }
        let n = pairs.count
        var dp = [[Int]](repeating: [Int](repeating: -1, count: n + 1), count: n)

        func dfs(_ i: Int, _ j: Int) -> Int {
            if i == n {
                return 0
            }
            if dp[i][j + 1] != -1 {
                return dp[i][j + 1]
            }

            var res = dfs(i + 1, j)
            if j == -1 || pairs[j][1] < pairs[i][0] {
                res = max(res, 1 + dfs(i + 1, i))
            }

            dp[i][j + 1] = res
            return res
        }

        return dfs(0, -1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        n = len(pairs)
        pairs.sort(key=lambda x: x[1])
        dp = [1] * n

        for i in range(n):
            for j in range(i):
                if pairs[j][1] < pairs[i][0]:
                    dp[i] = max(dp[i], dp[j] + 1)

        return max(dp)
```

```java
public class Solution {
    public int findLongestChain(int[][] pairs) {
        int n = pairs.length;
        Arrays.sort(pairs, (a, b) -> Integer.compare(a[1], b[1]));
        int[] dp = new int[n];
        Arrays.fill(dp, 1);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (pairs[j][1] < pairs[i][0]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }

        return Arrays.stream(dp).max().getAsInt();
    }
}
```

```cpp
class Solution {
public:
    int findLongestChain(vector<vector<int>>& pairs) {
        int n = pairs.size();
        sort(pairs.begin(), pairs.end(), [](const auto& a, const auto& b) {
            return a[1] < b[1];
        });

        vector<int> dp(n, 1);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (pairs[j][1] < pairs[i][0]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
        }

        return *max_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} pairs
     * @return {number}
     */
    findLongestChain(pairs) {
        let n = pairs.length;
        pairs.sort((a, b) => a[1] - b[1]);
        let dp = new Array(n).fill(1);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (pairs[j][1] < pairs[i][0]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }

        return Math.max(...dp);
    }
}
```

```csharp
public class Solution {
    public int FindLongestChain(int[][] pairs) {
        int n = pairs.Length;
        Array.Sort(pairs, (a, b) => a[1].CompareTo(b[1]));
        int[] dp = new int[n];
        Array.Fill(dp, 1);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (pairs[j][1] < pairs[i][0]) {
                    dp[i] = Math.Max(dp[i], dp[j] + 1);
                }
            }
        }

        return dp.Max();
    }
}
```

```go
func findLongestChain(pairs [][]int) int {
    n := len(pairs)
    sort.Slice(pairs, func(i, j int) bool {
        return pairs[i][1] < pairs[j][1]
    })

    dp := make([]int, n)
    for i := range dp {
        dp[i] = 1
    }

    for i := 0; i < n; i++ {
        for j := 0; j < i; j++ {
            if pairs[j][1] < pairs[i][0] {
                if dp[j]+1 > dp[i] {
                    dp[i] = dp[j] + 1
                }
            }
        }
    }

    maxVal := dp[0]
    for _, v := range dp {
        if v > maxVal {
            maxVal = v
        }
    }
    return maxVal
}
```

```kotlin
class Solution {
    fun findLongestChain(pairs: Array<IntArray>): Int {
        val n = pairs.size
        pairs.sortBy { it[1] }
        val dp = IntArray(n) { 1 }

        for (i in 0 until n) {
            for (j in 0 until i) {
                if (pairs[j][1] < pairs[i][0]) {
                    dp[i] = maxOf(dp[i], dp[j] + 1)
                }
            }
        }

        return dp.max()
    }
}
```

```swift
class Solution {
    func findLongestChain(_ pairs: [[Int]]) -> Int {
        let n = pairs.count
        var pairs = pairs.sorted { $0[1] < $1[1] }
        var dp = [Int](repeating: 1, count: n)

        for i in 0..<n {
            for j in 0..<i {
                if pairs[j][1] < pairs[i][0] {
                    dp[i] = max(dp[i], dp[j] + 1)
                }
            }
        }

        return dp.max()!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Bianry Search)

::tabs-start

```python
class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        pairs.sort(key=lambda x: x[0])
        dp = []

        for a, b in pairs:
            pos = bisect_left(dp, a)
            if pos == len(dp):
                dp.append(b)
            else:
                dp[pos] = min(dp[pos], b)

        return len(dp)
```

```java
public class Solution {
    public int findLongestChain(int[][] pairs) {
        Arrays.sort(pairs, Comparator.comparingInt(a -> a[0]));
        List<Integer> dp = new ArrayList<>();

        for (int[] pair : pairs) {
            int pos = binarySearch(dp, pair[0]);
            if (pos == dp.size()) {
                dp.add(pair[1]);
            } else {
                dp.set(pos, Math.min(dp.get(pos), pair[1]));
            }
        }

        return dp.size();
    }

    private int binarySearch(List<Integer> dp, int target) {
        int left = 0, right = dp.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (dp.get(mid) < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
}
```

```cpp
class Solution {
public:
    int findLongestChain(vector<vector<int>>& pairs) {
        sort(pairs.begin(), pairs.end());
        vector<int> dp;

        for (auto& pair : pairs) {
            auto it = lower_bound(dp.begin(), dp.end(), pair[0]);
            if (it == dp.end()) {
                dp.push_back(pair[1]);
            } else {
                *it = min(*it, pair[1]);
            }
        }

        return dp.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} pairs
     * @return {number}
     */
    findLongestChain(pairs) {
        pairs.sort((a, b) => a[0] - b[0]);
        let dp = [];

        const binarySearch = (target) => {
            let left = 0,
                right = dp.length - 1;
            while (left <= right) {
                let mid = Math.floor((left + right) / 2);
                if (dp[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return left;
        };

        for (let i = 0; i < pairs.length; i++) {
            let pos = binarySearch(pairs[i][0]);
            if (pos === dp.length) {
                dp.push(pairs[i][1]);
            } else {
                dp[pos] = Math.min(dp[pos], pairs[i][1]);
            }
        }

        return dp.length;
    }
}
```

```csharp
public class Solution {
    public int FindLongestChain(int[][] pairs) {
        Array.Sort(pairs, (a, b) => a[0].CompareTo(b[0]));
        List<int> dp = new List<int>();

        foreach (var pair in pairs) {
            int pos = BinarySearch(dp, pair[0]);
            if (pos == dp.Count) {
                dp.Add(pair[1]);
            } else {
                dp[pos] = Math.Min(dp[pos], pair[1]);
            }
        }

        return dp.Count;
    }

    private int BinarySearch(List<int> dp, int target) {
        int left = 0, right = dp.Count - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (dp[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
}
```

```go
func findLongestChain(pairs [][]int) int {
    sort.Slice(pairs, func(i, j int) bool {
        return pairs[i][0] < pairs[j][0]
    })
    dp := []int{}

    binarySearch := func(target int) int {
        left, right := 0, len(dp)-1
        for left <= right {
            mid := left + (right-left)/2
            if dp[mid] < target {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        return left
    }

    for _, pair := range pairs {
        pos := binarySearch(pair[0])
        if pos == len(dp) {
            dp = append(dp, pair[1])
        } else {
            if pair[1] < dp[pos] {
                dp[pos] = pair[1]
            }
        }
    }

    return len(dp)
}
```

```kotlin
class Solution {
    fun findLongestChain(pairs: Array<IntArray>): Int {
        pairs.sortBy { it[0] }
        val dp = mutableListOf<Int>()

        fun binarySearch(target: Int): Int {
            var left = 0
            var right = dp.size - 1
            while (left <= right) {
                val mid = left + (right - left) / 2
                if (dp[mid] < target) {
                    left = mid + 1
                } else {
                    right = mid - 1
                }
            }
            return left
        }

        for (pair in pairs) {
            val pos = binarySearch(pair[0])
            if (pos == dp.size) {
                dp.add(pair[1])
            } else {
                dp[pos] = minOf(dp[pos], pair[1])
            }
        }

        return dp.size
    }
}
```

```swift
class Solution {
    func findLongestChain(_ pairs: [[Int]]) -> Int {
        let pairs = pairs.sorted { $0[0] < $1[0] }
        var dp = [Int]()

        func binarySearch(_ target: Int) -> Int {
            var left = 0
            var right = dp.count - 1
            while left <= right {
                let mid = left + (right - left) / 2
                if dp[mid] < target {
                    left = mid + 1
                } else {
                    right = mid - 1
                }
            }
            return left
        }

        for pair in pairs {
            let pos = binarySearch(pair[0])
            if pos == dp.count {
                dp.append(pair[1])
            } else {
                dp[pos] = min(dp[pos], pair[1])
            }
        }

        return dp.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 5. Greedy

::tabs-start

```python
class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        pairs.sort(key=lambda p: p[1])
        length = 1
        end = pairs[0][1]

        for i in range(1, len(pairs)):
            if end < pairs[i][0]:
                length += 1
                end = pairs[i][1]

        return length
```

```java
public class Solution {
    public int findLongestChain(int[][] pairs) {
        Arrays.sort(pairs, (a, b) -> Integer.compare(a[1], b[1]));
        int length = 1;
        int end = pairs[0][1];

        for (int i = 1; i < pairs.length; i++) {
            if (end < pairs[i][0]) {
                length++;
                end = pairs[i][1];
            }
        }

        return length;
    }
}
```

```cpp
class Solution {
public:
    int findLongestChain(vector<vector<int>>& pairs) {
        sort(pairs.begin(), pairs.end(), [](const auto& a, const auto& b) {
            return a[1] < b[1];
        });

        int length = 1, end = pairs[0][1];

        for (int i = 1; i < pairs.size(); i++) {
            if (end < pairs[i][0]) {
                length++;
                end = pairs[i][1];
            }
        }

        return length;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} pairs
     * @return {number}
     */
    findLongestChain(pairs) {
        pairs.sort((a, b) => a[1] - b[1]);
        let length = 1;
        let end = pairs[0][1];

        for (let i = 1; i < pairs.length; i++) {
            if (end < pairs[i][0]) {
                length++;
                end = pairs[i][1];
            }
        }

        return length;
    }
}
```

```csharp
public class Solution {
    public int FindLongestChain(int[][] pairs) {
        Array.Sort(pairs, (a, b) => a[1].CompareTo(b[1]));
        int length = 1;
        int end = pairs[0][1];

        for (int i = 1; i < pairs.Length; i++) {
            if (end < pairs[i][0]) {
                length++;
                end = pairs[i][1];
            }
        }

        return length;
    }
}
```

```go
func findLongestChain(pairs [][]int) int {
    sort.Slice(pairs, func(i, j int) bool {
        return pairs[i][1] < pairs[j][1]
    })

    length := 1
    end := pairs[0][1]

    for i := 1; i < len(pairs); i++ {
        if end < pairs[i][0] {
            length++
            end = pairs[i][1]
        }
    }

    return length
}
```

```kotlin
class Solution {
    fun findLongestChain(pairs: Array<IntArray>): Int {
        pairs.sortBy { it[1] }
        var length = 1
        var end = pairs[0][1]

        for (i in 1 until pairs.size) {
            if (end < pairs[i][0]) {
                length++
                end = pairs[i][1]
            }
        }

        return length
    }
}
```

```swift
class Solution {
    func findLongestChain(_ pairs: [[Int]]) -> Int {
        let pairs = pairs.sorted { $0[1] < $1[1] }
        var length = 1
        var end = pairs[0][1]

        for i in 1..<pairs.count {
            if end < pairs[i][0] {
                length += 1
                end = pairs[i][1]
            }
        }

        return length
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
