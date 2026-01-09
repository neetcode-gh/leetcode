## 1. Recursion

::tabs-start

```python
class Solution:
    def maxUncrossedLines(self, nums1: List[int], nums2: List[int]) -> int:
        def dfs(i, j):
            if i == len(nums1) or j == len(nums2):
                return 0

            if nums1[i] == nums2[j]:
                return 1 + dfs(i + 1, j + 1)
            return max(dfs(i, j + 1), dfs(i + 1, j))

        return dfs(0, 0)
```

```java
public class Solution {
    public int maxUncrossedLines(int[] nums1, int[] nums2) {
        int n1 = nums1.length, n2 = nums2.length;

        return dfs(nums1, nums2, 0, 0);
    }

    private int dfs(int[] nums1, int[] nums2, int i, int j) {
        if (i == nums1.length || j == nums2.length) return 0;

        if (nums1[i] == nums2[j]) {
            return 1 + dfs(nums1, nums2, i + 1, j + 1);
        }
        return Math.max(dfs(nums1, nums2, i, j + 1), dfs(nums1, nums2, i + 1, j));
    }
}
```

```cpp
class Solution {
public:
    int dfs(vector<int>& nums1, vector<int>& nums2, int i, int j) {
        if (i == nums1.size() || j == nums2.size()) return 0;

        if (nums1[i] == nums2[j]) {
            return 1 + dfs(nums1, nums2, i + 1, j + 1);
        }
        return max(dfs(nums1, nums2, i, j + 1), dfs(nums1, nums2, i + 1, j));
    }

    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {
        return dfs(nums1, nums2, 0, 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    maxUncrossedLines(nums1, nums2) {
        const dfs = (i, j) => {
            if (i === nums1.length || j === nums2.length) {
                return 0;
            }
            if (nums1[i] === nums2[j]) {
                return 1 + dfs(i + 1, j + 1);
            }
            return Math.max(dfs(i, j + 1), dfs(i + 1, j));
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int MaxUncrossedLines(int[] nums1, int[] nums2) {
        return Dfs(nums1, nums2, 0, 0);
    }

    private int Dfs(int[] nums1, int[] nums2, int i, int j) {
        if (i == nums1.Length || j == nums2.Length) return 0;
        if (nums1[i] == nums2[j]) {
            return 1 + Dfs(nums1, nums2, i + 1, j + 1);
        }
        return Math.Max(Dfs(nums1, nums2, i, j + 1), Dfs(nums1, nums2, i + 1, j));
    }
}
```

```go
func maxUncrossedLines(nums1 []int, nums2 []int) int {
    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == len(nums1) || j == len(nums2) {
            return 0
        }
        if nums1[i] == nums2[j] {
            return 1 + dfs(i+1, j+1)
        }
        return max(dfs(i, j+1), dfs(i+1, j))
    }
    return dfs(0, 0)
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
    fun maxUncrossedLines(nums1: IntArray, nums2: IntArray): Int {
        fun dfs(i: Int, j: Int): Int {
            if (i == nums1.size || j == nums2.size) return 0
            if (nums1[i] == nums2[j]) {
                return 1 + dfs(i + 1, j + 1)
            }
            return maxOf(dfs(i, j + 1), dfs(i + 1, j))
        }
        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func maxUncrossedLines(_ nums1: [Int], _ nums2: [Int]) -> Int {
        func dfs(_ i: Int, _ j: Int) -> Int {
            if i == nums1.count || j == nums2.count {
                return 0
            }
            if nums1[i] == nums2[j] {
                return 1 + dfs(i + 1, j + 1)
            }
            return max(dfs(i, j + 1), dfs(i + 1, j))
        }
        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ {n + m})$
- Space complexity: $O(n + m)$ for recursion stack.

> Where $n$ and $m$ are the sizes of the arrays $nums1$ and $nums2$ respectively.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def maxUncrossedLines(self, nums1: List[int], nums2: List[int]) -> int:
        dp = {}

        def dfs(i, j):
            if i == len(nums1) or j == len(nums2):
                return 0

            if (i, j) in dp:
                return dp[(i, j)]

            if nums1[i] == nums2[j]:
                dp[(i, j)] = 1 + dfs(i + 1, j + 1)
            else:
                dp[(i, j)] = max(dfs(i, j + 1), dfs(i + 1, j))

            return dp[(i, j)]

        return dfs(0, 0)
```

```java
public class Solution {
    public int maxUncrossedLines(int[] nums1, int[] nums2) {
        int n = nums1.length, m = nums2.length;
        int[][] dp = new int[n][m];

        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        return dfs(0, 0, nums1, nums2, dp);
    }

    private int dfs(int i, int j, int[] nums1, int[] nums2, int[][] dp) {
        if (i == nums1.length || j == nums2.length) {
            return 0;
        }

        if (dp[i][j] != -1) {
            return dp[i][j];
        }

        if (nums1[i] == nums2[j]) {
            dp[i][j] = 1 + dfs(i + 1, j + 1, nums1, nums2, dp);
        } else {
            dp[i][j] = Math.max(dfs(i, j + 1, nums1, nums2, dp), dfs(i + 1, j, nums1, nums2, dp));
        }

        return dp[i][j];
    }
}
```

```cpp
class Solution {
public:
    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size(), m = nums2.size();
        vector<vector<int>> dp(n, vector<int>(m, -1));

        return dfs(0, 0, nums1, nums2, dp);
    }

private:
    int dfs(int i, int j, vector<int>& nums1, vector<int>& nums2, vector<vector<int>>& dp) {
        if (i == nums1.size() || j == nums2.size()) {
            return 0;
        }

        if (dp[i][j] != -1) {
            return dp[i][j];
        }

        if (nums1[i] == nums2[j]) {
            dp[i][j] = 1 + dfs(i + 1, j + 1, nums1, nums2, dp);
        } else {
            dp[i][j] = max(dfs(i, j + 1, nums1, nums2, dp), dfs(i + 1, j, nums1, nums2, dp));
        }

        return dp[i][j];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    maxUncrossedLines(nums1, nums2) {
        const n = nums1.length,
            m = nums2.length;
        const dp = Array.from({ length: n }, () => Array(m).fill(-1));

        const dfs = (i, j) => {
            if (i === n || j === m) {
                return 0;
            }

            if (dp[i][j] !== -1) {
                return dp[i][j];
            }

            if (nums1[i] === nums2[j]) {
                dp[i][j] = 1 + dfs(i + 1, j + 1);
            } else {
                dp[i][j] = Math.max(dfs(i, j + 1), dfs(i + 1, j));
            }

            return dp[i][j];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public int MaxUncrossedLines(int[] nums1, int[] nums2) {
        int n = nums1.Length, m = nums2.Length;
        dp = new int[n, m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                dp[i, j] = -1;
            }
        }
        return Dfs(nums1, nums2, 0, 0);
    }

    private int Dfs(int[] nums1, int[] nums2, int i, int j) {
        if (i == nums1.Length || j == nums2.Length) return 0;
        if (dp[i, j] != -1) return dp[i, j];

        if (nums1[i] == nums2[j]) {
            dp[i, j] = 1 + Dfs(nums1, nums2, i + 1, j + 1);
        } else {
            dp[i, j] = Math.Max(Dfs(nums1, nums2, i, j + 1), Dfs(nums1, nums2, i + 1, j));
        }
        return dp[i, j];
    }
}
```

```go
func maxUncrossedLines(nums1 []int, nums2 []int) int {
    n, m := len(nums1), len(nums2)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, m)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == n || j == m {
            return 0
        }
        if dp[i][j] != -1 {
            return dp[i][j]
        }
        if nums1[i] == nums2[j] {
            dp[i][j] = 1 + dfs(i+1, j+1)
        } else {
            dp[i][j] = max(dfs(i, j+1), dfs(i+1, j))
        }
        return dp[i][j]
    }
    return dfs(0, 0)
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
    fun maxUncrossedLines(nums1: IntArray, nums2: IntArray): Int {
        val n = nums1.size
        val m = nums2.size
        val dp = Array(n) { IntArray(m) { -1 } }

        fun dfs(i: Int, j: Int): Int {
            if (i == n || j == m) return 0
            if (dp[i][j] != -1) return dp[i][j]

            dp[i][j] = if (nums1[i] == nums2[j]) {
                1 + dfs(i + 1, j + 1)
            } else {
                maxOf(dfs(i, j + 1), dfs(i + 1, j))
            }
            return dp[i][j]
        }
        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func maxUncrossedLines(_ nums1: [Int], _ nums2: [Int]) -> Int {
        let n = nums1.count, m = nums2.count
        var dp = [[Int]](repeating: [Int](repeating: -1, count: m), count: n)

        func dfs(_ i: Int, _ j: Int) -> Int {
            if i == n || j == m { return 0 }
            if dp[i][j] != -1 { return dp[i][j] }

            if nums1[i] == nums2[j] {
                dp[i][j] = 1 + dfs(i + 1, j + 1)
            } else {
                dp[i][j] = max(dfs(i, j + 1), dfs(i + 1, j))
            }
            return dp[i][j]
        }
        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ and $m$ are the sizes of the arrays $nums1$ and $nums2$ respectively.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def maxUncrossedLines(self, nums1: List[int], nums2: List[int]) -> int:
        n, m = len(nums1), len(nums2)
        dp = [[0] * (m + 1) for _ in range(n + 1)]

        for i in range(n):
            for j in range(m):
                if nums1[i] == nums2[j]:
                    dp[i + 1][j + 1] = 1 + dp[i][j]
                else:
                    dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j])

        return dp[n][m]
```

```java
public class Solution {
    public int maxUncrossedLines(int[] nums1, int[] nums2) {
        int n = nums1.length, m = nums2.length;
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (nums1[i] == nums2[j]) {
                    dp[i + 1][j + 1] = 1 + dp[i][j];
                } else {
                    dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
                }
            }
        }

        return dp[n][m];
    }
}
```

```cpp
class Solution {
public:
    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size(), m = nums2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (nums1[i] == nums2[j]) {
                    dp[i + 1][j + 1] = 1 + dp[i][j];
                } else {
                    dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j]);
                }
            }
        }

        return dp[n][m];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    maxUncrossedLines(nums1, nums2) {
        const n = nums1.length,
            m = nums2.length;
        const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (nums1[i] === nums2[j]) {
                    dp[i + 1][j + 1] = 1 + dp[i][j];
                } else {
                    dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
                }
            }
        }

        return dp[n][m];
    }
}
```

```csharp
public class Solution {
    public int MaxUncrossedLines(int[] nums1, int[] nums2) {
        int n = nums1.Length, m = nums2.Length;
        int[,] dp = new int[n + 1, m + 1];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (nums1[i] == nums2[j]) {
                    dp[i + 1, j + 1] = 1 + dp[i, j];
                } else {
                    dp[i + 1, j + 1] = Math.Max(dp[i, j + 1], dp[i + 1, j]);
                }
            }
        }

        return dp[n, m];
    }
}
```

```go
func maxUncrossedLines(nums1 []int, nums2 []int) int {
    n, m := len(nums1), len(nums2)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, m+1)
    }

    for i := 0; i < n; i++ {
        for j := 0; j < m; j++ {
            if nums1[i] == nums2[j] {
                dp[i+1][j+1] = 1 + dp[i][j]
            } else {
                dp[i+1][j+1] = max(dp[i][j+1], dp[i+1][j])
            }
        }
    }

    return dp[n][m]
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
    fun maxUncrossedLines(nums1: IntArray, nums2: IntArray): Int {
        val n = nums1.size
        val m = nums2.size
        val dp = Array(n + 1) { IntArray(m + 1) }

        for (i in 0 until n) {
            for (j in 0 until m) {
                if (nums1[i] == nums2[j]) {
                    dp[i + 1][j + 1] = 1 + dp[i][j]
                } else {
                    dp[i + 1][j + 1] = maxOf(dp[i][j + 1], dp[i + 1][j])
                }
            }
        }

        return dp[n][m]
    }
}
```

```swift
class Solution {
    func maxUncrossedLines(_ nums1: [Int], _ nums2: [Int]) -> Int {
        let n = nums1.count, m = nums2.count
        var dp = [[Int]](repeating: [Int](repeating: 0, count: m + 1), count: n + 1)

        for i in 0..<n {
            for j in 0..<m {
                if nums1[i] == nums2[j] {
                    dp[i + 1][j + 1] = 1 + dp[i][j]
                } else {
                    dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j])
                }
            }
        }

        return dp[n][m]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ and $m$ are the sizes of the arrays $nums1$ and $nums2$ respectively.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def maxUncrossedLines(self, nums1: List[int], nums2: List[int]) -> int:
        prev = [0] * (len(nums2) + 1)

        for i in range(len(nums1)):
            dp = [0] * (len(nums2) + 1)
            for j in range(len(nums2)):
                if nums1[i] == nums2[j]:
                    dp[j + 1] = 1 + prev[j]
                else:
                    dp[j + 1] = max(dp[j], prev[j + 1])
            prev = dp

        return prev[len(nums2)]
```

```java
public class Solution {
    public int maxUncrossedLines(int[] nums1, int[] nums2) {
        int[] prev = new int[nums2.length + 1];

        for (int i = 0; i < nums1.length; i++) {
            int[] dp = new int[nums2.length + 1];
            for (int j = 0; j < nums2.length; j++) {
                if (nums1[i] == nums2[j]) {
                    dp[j + 1] = 1 + prev[j];
                } else {
                    dp[j + 1] = Math.max(dp[j], prev[j + 1]);
                }
            }
            prev = dp;
        }

        return prev[nums2.length];
    }
}
```

```cpp
class Solution {
public:
    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {
        vector<int> prev(nums2.size() + 1, 0);

        for (int i = 0; i < nums1.size(); i++) {
            vector<int> dp(nums2.size() + 1, 0);
            for (int j = 0; j < nums2.size(); j++) {
                if (nums1[i] == nums2[j]) {
                    dp[j + 1] = 1 + prev[j];
                } else {
                    dp[j + 1] = max(dp[j], prev[j + 1]);
                }
            }
            prev = dp;
        }

        return prev[nums2.size()];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    maxUncrossedLines(nums1, nums2) {
        let prev = new Array(nums2.length + 1).fill(0);

        for (let i = 0; i < nums1.length; i++) {
            const dp = new Array(nums2.length + 1).fill(0);
            for (let j = 0; j < nums2.length; j++) {
                if (nums1[i] === nums2[j]) {
                    dp[j + 1] = 1 + prev[j];
                } else {
                    dp[j + 1] = Math.max(dp[j], prev[j + 1]);
                }
            }
            prev = dp;
        }

        return prev[nums2.length];
    }
}
```

```csharp
public class Solution {
    public int MaxUncrossedLines(int[] nums1, int[] nums2) {
        int[] prev = new int[nums2.Length + 1];

        for (int i = 0; i < nums1.Length; i++) {
            int[] dp = new int[nums2.Length + 1];
            for (int j = 0; j < nums2.Length; j++) {
                if (nums1[i] == nums2[j]) {
                    dp[j + 1] = 1 + prev[j];
                } else {
                    dp[j + 1] = Math.Max(dp[j], prev[j + 1]);
                }
            }
            prev = dp;
        }

        return prev[nums2.Length];
    }
}
```

```go
func maxUncrossedLines(nums1 []int, nums2 []int) int {
    prev := make([]int, len(nums2)+1)

    for i := 0; i < len(nums1); i++ {
        dp := make([]int, len(nums2)+1)
        for j := 0; j < len(nums2); j++ {
            if nums1[i] == nums2[j] {
                dp[j+1] = 1 + prev[j]
            } else {
                dp[j+1] = max(dp[j], prev[j+1])
            }
        }
        prev = dp
    }

    return prev[len(nums2)]
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
    fun maxUncrossedLines(nums1: IntArray, nums2: IntArray): Int {
        var prev = IntArray(nums2.size + 1)

        for (i in nums1.indices) {
            val dp = IntArray(nums2.size + 1)
            for (j in nums2.indices) {
                if (nums1[i] == nums2[j]) {
                    dp[j + 1] = 1 + prev[j]
                } else {
                    dp[j + 1] = maxOf(dp[j], prev[j + 1])
                }
            }
            prev = dp
        }

        return prev[nums2.size]
    }
}
```

```swift
class Solution {
    func maxUncrossedLines(_ nums1: [Int], _ nums2: [Int]) -> Int {
        var prev = [Int](repeating: 0, count: nums2.count + 1)

        for i in 0..<nums1.count {
            var dp = [Int](repeating: 0, count: nums2.count + 1)
            for j in 0..<nums2.count {
                if nums1[i] == nums2[j] {
                    dp[j + 1] = 1 + prev[j]
                } else {
                    dp[j + 1] = max(dp[j], prev[j + 1])
                }
            }
            prev = dp
        }

        return prev[nums2.count]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(m)$

> Where $n$ and $m$ are the sizes of the arrays $nums1$ and $nums2$ respectively.

---

## 5. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def maxUncrossedLines(self, nums1: List[int], nums2: List[int]) -> int:
        n, m = len(nums1), len(nums2)
        if m > n:
            n, m = m, n
            nums1, nums2 = nums2, nums1

        dp = [0] * (m + 1)

        for i in range(n):
            prev = 0
            for j in range(m):
                temp = dp[j + 1]
                if nums1[i] == nums2[j]:
                    dp[j + 1] = 1 + prev
                else:
                    dp[j + 1] = max(dp[j + 1], dp[j])
                prev = temp

        return dp[m]
```

```java
public class Solution {
    public int maxUncrossedLines(int[] nums1, int[] nums2) {
        int n = nums1.length, m = nums2.length;
        if (m > n) {
            int[] tempArr = nums1;
            nums1 = nums2;
            nums2 = tempArr;
            int temp = n;
            n = m;
            m = temp;
        }

        int[] dp = new int[m + 1];

        for (int i = 0; i < n; i++) {
            int prev = 0;
            for (int j = 0; j < m; j++) {
                int temp = dp[j + 1];
                if (nums1[i] == nums2[j]) {
                    dp[j + 1] = 1 + prev;
                } else {
                    dp[j + 1] = Math.max(dp[j + 1], dp[j]);
                }
                prev = temp;
            }
        }

        return dp[m];
    }
}
```

```cpp
class Solution {
public:
    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size(), m = nums2.size();
        if (m > n) {
            swap(nums1, nums2);
            swap(n, m);
        }

        vector<int> dp(m + 1, 0);

        for (int i = 0; i < n; i++) {
            int prev = 0;
            for (int j = 0; j < m; j++) {
                int temp = dp[j + 1];
                if (nums1[i] == nums2[j]) {
                    dp[j + 1] = 1 + prev;
                } else {
                    dp[j + 1] = max(dp[j + 1], dp[j]);
                }
                prev = temp;
            }
        }

        return dp[m];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    maxUncrossedLines(nums1, nums2) {
        let n = nums1.length,
            m = nums2.length;
        if (m > n) {
            [nums1, nums2] = [nums2, nums1];
            [n, m] = [m, n];
        }

        const dp = Array(m + 1).fill(0);

        for (let i = 0; i < n; i++) {
            let prev = 0;
            for (let j = 0; j < m; j++) {
                const temp = dp[j + 1];
                if (nums1[i] === nums2[j]) {
                    dp[j + 1] = 1 + prev;
                } else {
                    dp[j + 1] = Math.max(dp[j + 1], dp[j]);
                }
                prev = temp;
            }
        }

        return dp[m];
    }
}
```

```csharp
public class Solution {
    public int MaxUncrossedLines(int[] nums1, int[] nums2) {
        int n = nums1.Length, m = nums2.Length;
        if (m > n) {
            var temp = nums1;
            nums1 = nums2;
            nums2 = temp;
            (n, m) = (m, n);
        }

        int[] dp = new int[m + 1];

        for (int i = 0; i < n; i++) {
            int prev = 0;
            for (int j = 0; j < m; j++) {
                int temp = dp[j + 1];
                if (nums1[i] == nums2[j]) {
                    dp[j + 1] = 1 + prev;
                } else {
                    dp[j + 1] = Math.Max(dp[j + 1], dp[j]);
                }
                prev = temp;
            }
        }

        return dp[m];
    }
}
```

```go
func maxUncrossedLines(nums1 []int, nums2 []int) int {
    n, m := len(nums1), len(nums2)
    if m > n {
        nums1, nums2 = nums2, nums1
        n, m = m, n
    }

    dp := make([]int, m+1)

    for i := 0; i < n; i++ {
        prev := 0
        for j := 0; j < m; j++ {
            temp := dp[j+1]
            if nums1[i] == nums2[j] {
                dp[j+1] = 1 + prev
            } else {
                dp[j+1] = max(dp[j+1], dp[j])
            }
            prev = temp
        }
    }

    return dp[m]
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
    fun maxUncrossedLines(nums1: IntArray, nums2: IntArray): Int {
        var arr1 = nums1
        var arr2 = nums2
        var n = arr1.size
        var m = arr2.size
        if (m > n) {
            arr1 = nums2.also { arr2 = nums1 }
            n = m.also { m = n }
        }

        val dp = IntArray(m + 1)

        for (i in 0 until n) {
            var prev = 0
            for (j in 0 until m) {
                val temp = dp[j + 1]
                if (arr1[i] == arr2[j]) {
                    dp[j + 1] = 1 + prev
                } else {
                    dp[j + 1] = maxOf(dp[j + 1], dp[j])
                }
                prev = temp
            }
        }

        return dp[m]
    }
}
```

```swift
class Solution {
    func maxUncrossedLines(_ nums1: [Int], _ nums2: [Int]) -> Int {
        var arr1 = nums1
        var arr2 = nums2
        var n = arr1.count
        var m = arr2.count
        if m > n {
            swap(&arr1, &arr2)
            swap(&n, &m)
        }

        var dp = [Int](repeating: 0, count: m + 1)

        for i in 0..<n {
            var prev = 0
            for j in 0..<m {
                let temp = dp[j + 1]
                if arr1[i] == arr2[j] {
                    dp[j + 1] = 1 + prev
                } else {
                    dp[j + 1] = max(dp[j + 1], dp[j])
                }
                prev = temp
            }
        }

        return dp[m]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(min(n, m))$

> Where $n$ and $m$ are the sizes of the arrays $nums1$ and $nums2$ respectively.
