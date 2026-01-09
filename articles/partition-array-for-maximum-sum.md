## 1. Recursion

::tabs-start

```python
class Solution:
    def maxSumAfterPartitioning(self, arr: List[int], k: int) -> int:
        def dfs(i):
            if i >= len(arr):
                return 0

            cur_max = 0
            res = 0
            for j in range(i, min(len(arr), i + k)):
                cur_max = max(cur_max, arr[j])
                window_size = j - i + 1
                res = max(res, dfs(j + 1) + cur_max * window_size)

            return res

        return dfs(0)
```

```java
public class Solution {
    public int maxSumAfterPartitioning(int[] arr, int k) {
        return dfs(0, arr, k);
    }

    private int dfs(int i, int[] arr, int k) {
        if (i >= arr.length) {
            return 0;
        }

        int cur_max = 0;
        int res = 0;
        for (int j = i; j < Math.min(arr.length, i + k); j++) {
            cur_max = Math.max(cur_max, arr[j]);
            int window_size = j - i + 1;
            res = Math.max(res, dfs(j + 1, arr, k) + cur_max * window_size);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        return dfs(0, arr, k);
    }

private:
    int dfs(int i, vector<int>& arr, int k) {
        if (i >= arr.size()) {
            return 0;
        }

        int cur_max = 0, res = 0;
        for (int j = i; j < min((int)arr.size(), i + k); j++) {
            cur_max = max(cur_max, arr[j]);
            int window_size = j - i + 1;
            res = max(res, dfs(j + 1, arr, k) + cur_max * window_size);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @return {number}
     */
    maxSumAfterPartitioning(arr, k) {
        const dfs = (i) => {
            if (i >= arr.length) {
                return 0;
            }

            let cur_max = 0,
                res = 0;
            for (let j = i; j < Math.min(arr.length, i + k); j++) {
                cur_max = Math.max(cur_max, arr[j]);
                let window_size = j - i + 1;
                res = Math.max(res, dfs(j + 1) + cur_max * window_size);
            }

            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public int MaxSumAfterPartitioning(int[] arr, int k) {
        return Dfs(0, arr, k);
    }

    private int Dfs(int i, int[] arr, int k) {
        if (i >= arr.Length) {
            return 0;
        }

        int curMax = 0, res = 0;
        for (int j = i; j < Math.Min(arr.Length, i + k); j++) {
            curMax = Math.Max(curMax, arr[j]);
            int windowSize = j - i + 1;
            res = Math.Max(res, Dfs(j + 1, arr, k) + curMax * windowSize);
        }

        return res;
    }
}
```

```go
func maxSumAfterPartitioning(arr []int, k int) int {
    var dfs func(i int) int
    dfs = func(i int) int {
        if i >= len(arr) {
            return 0
        }

        curMax, res := 0, 0
        for j := i; j < min(len(arr), i+k); j++ {
            curMax = max(curMax, arr[j])
            windowSize := j - i + 1
            res = max(res, dfs(j+1)+curMax*windowSize)
        }

        return res
    }

    return dfs(0)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
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
    fun maxSumAfterPartitioning(arr: IntArray, k: Int): Int {
        fun dfs(i: Int): Int {
            if (i >= arr.size) {
                return 0
            }

            var curMax = 0
            var res = 0
            for (j in i until minOf(arr.size, i + k)) {
                curMax = maxOf(curMax, arr[j])
                val windowSize = j - i + 1
                res = maxOf(res, dfs(j + 1) + curMax * windowSize)
            }

            return res
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func maxSumAfterPartitioning(_ arr: [Int], _ k: Int) -> Int {
        func dfs(_ i: Int) -> Int {
            if i >= arr.count {
                return 0
            }

            var curMax = 0
            var res = 0
            for j in i..<min(arr.count, i + k) {
                curMax = max(curMax, arr[j])
                let windowSize = j - i + 1
                res = max(res, dfs(j + 1) + curMax * windowSize)
            }

            return res
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k ^ n)$
- Space complexity: $O(n)$ for recursion stack.

> Where $k$ is the maximum length of the subarray and $n$ is the size of the array $arr$.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def maxSumAfterPartitioning(self, arr: List[int], k: int) -> int:
        cache = { len(arr) : 0 }

        def dfs(i):
            if i in cache:
                return cache[i]

            cur_max = 0
            res = 0
            for j in range(i, min(len(arr), i + k)):
                cur_max = max(cur_max, arr[j])
                window_size = j - i + 1
                res = max(res, dfs(j + 1) + cur_max * window_size)

            cache[i] = res
            return res

        return dfs(0)
```

```java
public class Solution {
    public int maxSumAfterPartitioning(int[] arr, int k) {
        int[] cache = new int[arr.length + 1];
        Arrays.fill(cache, -1);
        cache[arr.length] = 0;
        return dfs(0, arr, k, cache);
    }

    private int dfs(int i, int[] arr, int k, int[] cache) {
        if (cache[i] != -1) {
            return cache[i];
        }

        int cur_max = 0, res = 0;
        for (int j = i; j < Math.min(arr.length, i + k); j++) {
            cur_max = Math.max(cur_max, arr[j]);
            int window_size = j - i + 1;
            res = Math.max(res, dfs(j + 1, arr, k, cache) + cur_max * window_size);
        }

        cache[i] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        vector<int> cache(arr.size() + 1, -1);
        cache[arr.size()] = 0;
        return dfs(0, arr, k, cache);
    }

private:
    int dfs(int i, vector<int>& arr, int k, vector<int>& cache) {
        if (cache[i] != -1) {
            return cache[i];
        }

        int cur_max = 0, res = 0;
        for (int j = i; j < min((int)arr.size(), i + k); j++) {
            cur_max = max(cur_max, arr[j]);
            int window_size = j - i + 1;
            res = max(res, dfs(j + 1, arr, k, cache) + cur_max * window_size);
        }

        return cache[i] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @return {number}
     */
    maxSumAfterPartitioning(arr, k) {
        const cache = new Array(arr.length + 1).fill(-1);
        cache[arr.length] = 0;

        const dfs = (i) => {
            if (cache[i] !== -1) {
                return cache[i];
            }

            let cur_max = 0,
                res = 0;
            for (let j = i; j < Math.min(arr.length, i + k); j++) {
                cur_max = Math.max(cur_max, arr[j]);
                let window_size = j - i + 1;
                res = Math.max(res, dfs(j + 1) + cur_max * window_size);
            }

            return (cache[i] = res);
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public int MaxSumAfterPartitioning(int[] arr, int k) {
        int[] cache = new int[arr.Length + 1];
        Array.Fill(cache, -1);
        cache[arr.Length] = 0;
        return Dfs(0, arr, k, cache);
    }

    private int Dfs(int i, int[] arr, int k, int[] cache) {
        if (cache[i] != -1) {
            return cache[i];
        }

        int curMax = 0, res = 0;
        for (int j = i; j < Math.Min(arr.Length, i + k); j++) {
            curMax = Math.Max(curMax, arr[j]);
            int windowSize = j - i + 1;
            res = Math.Max(res, Dfs(j + 1, arr, k, cache) + curMax * windowSize);
        }

        cache[i] = res;
        return res;
    }
}
```

```go
func maxSumAfterPartitioning(arr []int, k int) int {
    cache := make([]int, len(arr)+1)
    for i := range cache {
        cache[i] = -1
    }
    cache[len(arr)] = 0

    var dfs func(i int) int
    dfs = func(i int) int {
        if cache[i] != -1 {
            return cache[i]
        }

        curMax, res := 0, 0
        for j := i; j < min(len(arr), i+k); j++ {
            curMax = max(curMax, arr[j])
            windowSize := j - i + 1
            res = max(res, dfs(j+1)+curMax*windowSize)
        }

        cache[i] = res
        return res
    }

    return dfs(0)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
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
    fun maxSumAfterPartitioning(arr: IntArray, k: Int): Int {
        val cache = IntArray(arr.size + 1) { -1 }
        cache[arr.size] = 0

        fun dfs(i: Int): Int {
            if (cache[i] != -1) {
                return cache[i]
            }

            var curMax = 0
            var res = 0
            for (j in i until minOf(arr.size, i + k)) {
                curMax = maxOf(curMax, arr[j])
                val windowSize = j - i + 1
                res = maxOf(res, dfs(j + 1) + curMax * windowSize)
            }

            cache[i] = res
            return res
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func maxSumAfterPartitioning(_ arr: [Int], _ k: Int) -> Int {
        var cache = [Int](repeating: -1, count: arr.count + 1)
        cache[arr.count] = 0

        func dfs(_ i: Int) -> Int {
            if cache[i] != -1 {
                return cache[i]
            }

            var curMax = 0
            var res = 0
            for j in i..<min(arr.count, i + k) {
                curMax = max(curMax, arr[j])
                let windowSize = j - i + 1
                res = max(res, dfs(j + 1) + curMax * windowSize)
            }

            cache[i] = res
            return res
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n)$

> Where $k$ is the maximum length of the subarray and $n$ is the size of the array $arr$.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def maxSumAfterPartitioning(self, arr: List[int], k: int) -> int:
        n = len(arr)
        dp = [0] * (n + 1)

        for i in range(n - 1, -1, -1):
            cur_max = 0
            for j in range(i, min(n, i + k)):
                cur_max = max(cur_max, arr[j])
                window_size = j - i + 1
                dp[i] = max(dp[i], dp[j + 1] + cur_max * window_size)

        return dp[0]
```

```java
public class Solution {
    public int maxSumAfterPartitioning(int[] arr, int k) {
        int n = arr.length;
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            int cur_max = 0;
            for (int j = i; j < Math.min(n, i + k); j++) {
                cur_max = Math.max(cur_max, arr[j]);
                int window_size = j - i + 1;
                dp[i] = Math.max(dp[i], dp[j + 1] + cur_max * window_size);
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            int cur_max = 0;
            for (int j = i; j < min(n, i + k); j++) {
                cur_max = max(cur_max, arr[j]);
                int window_size = j - i + 1;
                dp[i] = max(dp[i], dp[j + 1] + cur_max * window_size);
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @return {number}
     */
    maxSumAfterPartitioning(arr, k) {
        let n = arr.length;
        let dp = new Array(n + 1).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            let cur_max = 0;
            for (let j = i; j < Math.min(n, i + k); j++) {
                cur_max = Math.max(cur_max, arr[j]);
                let window_size = j - i + 1;
                dp[i] = Math.max(dp[i], dp[j + 1] + cur_max * window_size);
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int MaxSumAfterPartitioning(int[] arr, int k) {
        int n = arr.Length;
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            int curMax = 0;
            for (int j = i; j < Math.Min(n, i + k); j++) {
                curMax = Math.Max(curMax, arr[j]);
                int windowSize = j - i + 1;
                dp[i] = Math.Max(dp[i], dp[j + 1] + curMax * windowSize);
            }
        }

        return dp[0];
    }
}
```

```go
func maxSumAfterPartitioning(arr []int, k int) int {
    n := len(arr)
    dp := make([]int, n+1)

    for i := n - 1; i >= 0; i-- {
        curMax := 0
        for j := i; j < min(n, i+k); j++ {
            curMax = max(curMax, arr[j])
            windowSize := j - i + 1
            dp[i] = max(dp[i], dp[j+1]+curMax*windowSize)
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

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxSumAfterPartitioning(arr: IntArray, k: Int): Int {
        val n = arr.size
        val dp = IntArray(n + 1)

        for (i in n - 1 downTo 0) {
            var curMax = 0
            for (j in i until minOf(n, i + k)) {
                curMax = maxOf(curMax, arr[j])
                val windowSize = j - i + 1
                dp[i] = maxOf(dp[i], dp[j + 1] + curMax * windowSize)
            }
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func maxSumAfterPartitioning(_ arr: [Int], _ k: Int) -> Int {
        let n = arr.count
        var dp = [Int](repeating: 0, count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            var curMax = 0
            for j in i..<min(n, i + k) {
                curMax = max(curMax, arr[j])
                let windowSize = j - i + 1
                dp[i] = max(dp[i], dp[j + 1] + curMax * windowSize)
            }
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n)$

> Where $k$ is the maximum length of the subarray and $n$ is the size of the array $arr$.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def maxSumAfterPartitioning(self, arr: List[int], k: int) -> int:
        dp = [0] * k
        dp[0] = arr[0]

        for i in range(1, len(arr)):
            cur_max = 0
            max_at_i = 0
            for j in range(i, i - k, -1):
                if j < 0:
                    break
                cur_max = max(cur_max, arr[j])
                window_size = i - j + 1
                cur_sum = cur_max * window_size
                sub_sum = dp[(j - 1) % k] if j > 0 else 0
                max_at_i = max(max_at_i, cur_sum + sub_sum)

            dp[i % k] = max_at_i

        return dp[(len(arr) - 1) % k]
```

```java
public class Solution {
    public int maxSumAfterPartitioning(int[] arr, int k) {
        int n = arr.length;
        int[] dp = new int[k];
        dp[0] = arr[0];

        for (int i = 1; i < n; i++) {
            int cur_max = 0, max_at_i = 0;
            for (int j = i; j > i - k; j--) {
                if (j < 0) break;
                cur_max = Math.max(cur_max, arr[j]);
                int window_size = i - j + 1;
                int cur_sum = cur_max * window_size;
                int sub_sum = (j > 0) ? dp[(j - 1) % k] : 0;
                max_at_i = Math.max(max_at_i, cur_sum + sub_sum);
            }
            dp[i % k] = max_at_i;
        }

        return dp[(n - 1) % k];
    }
}
```

```cpp
class Solution {
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> dp(k);
        dp[0] = arr[0];

        for (int i = 1; i < n; i++) {
            int cur_max = 0, max_at_i = 0;
            for (int j = i; j > i - k; j--) {
                if (j < 0) break;
                cur_max = max(cur_max, arr[j]);
                int window_size = i - j + 1;
                int cur_sum = cur_max * window_size;
                int sub_sum = (j > 0) ? dp[(j - 1) % k] : 0;
                max_at_i = max(max_at_i, cur_sum + sub_sum);
            }
            dp[i % k] = max_at_i;
        }

        return dp[(n - 1) % k];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @return {number}
     */
    maxSumAfterPartitioning(arr, k) {
        const n = arr.length;
        const dp = new Array(k).fill(0);
        dp[0] = arr[0];

        for (let i = 1; i < n; i++) {
            let cur_max = 0,
                max_at_i = 0;
            for (let j = i; j > i - k; j--) {
                if (j < 0) break;
                cur_max = Math.max(cur_max, arr[j]);
                let window_size = i - j + 1;
                let cur_sum = cur_max * window_size;
                let sub_sum = j > 0 ? dp[(j - 1) % k] : 0;
                max_at_i = Math.max(max_at_i, cur_sum + sub_sum);
            }
            dp[i % k] = max_at_i;
        }

        return dp[(n - 1) % k];
    }
}
```

```csharp
public class Solution {
    public int MaxSumAfterPartitioning(int[] arr, int k) {
        int n = arr.Length;
        int[] dp = new int[k];
        dp[0] = arr[0];

        for (int i = 1; i < n; i++) {
            int curMax = 0, maxAtI = 0;
            for (int j = i; j > i - k; j--) {
                if (j < 0) break;
                curMax = Math.Max(curMax, arr[j]);
                int windowSize = i - j + 1;
                int curSum = curMax * windowSize;
                int subSum = j > 0 ? dp[(j - 1) % k] : 0;
                maxAtI = Math.Max(maxAtI, curSum + subSum);
            }
            dp[i % k] = maxAtI;
        }

        return dp[(n - 1) % k];
    }
}
```

```go
func maxSumAfterPartitioning(arr []int, k int) int {
    n := len(arr)
    dp := make([]int, k)
    dp[0] = arr[0]

    for i := 1; i < n; i++ {
        curMax, maxAtI := 0, 0
        for j := i; j > i-k; j-- {
            if j < 0 {
                break
            }
            curMax = max(curMax, arr[j])
            windowSize := i - j + 1
            curSum := curMax * windowSize
            subSum := 0
            if j > 0 {
                subSum = dp[(j-1)%k]
            }
            maxAtI = max(maxAtI, curSum+subSum)
        }
        dp[i%k] = maxAtI
    }

    return dp[(n-1)%k]
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
    fun maxSumAfterPartitioning(arr: IntArray, k: Int): Int {
        val n = arr.size
        val dp = IntArray(k)
        dp[0] = arr[0]

        for (i in 1 until n) {
            var curMax = 0
            var maxAtI = 0
            var j = i
            while (j > i - k) {
                if (j < 0) break
                curMax = maxOf(curMax, arr[j])
                val windowSize = i - j + 1
                val curSum = curMax * windowSize
                val subSum = if (j > 0) dp[(j - 1) % k] else 0
                maxAtI = maxOf(maxAtI, curSum + subSum)
                j--
            }
            dp[i % k] = maxAtI
        }

        return dp[(n - 1) % k]
    }
}
```

```swift
class Solution {
    func maxSumAfterPartitioning(_ arr: [Int], _ k: Int) -> Int {
        let n = arr.count
        var dp = [Int](repeating: 0, count: k)
        dp[0] = arr[0]

        for i in 1..<n {
            var curMax = 0
            var maxAtI = 0
            var j = i
            while j > i - k {
                if j < 0 { break }
                curMax = max(curMax, arr[j])
                let windowSize = i - j + 1
                let curSum = curMax * windowSize
                let subSum = j > 0 ? dp[(j - 1) % k] : 0
                maxAtI = max(maxAtI, curSum + subSum)
                j -= 1
            }
            dp[i % k] = maxAtI
        }

        return dp[(n - 1) % k]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(k)$

> Where $k$ is the maximum length of the subarray and $n$ is the size of the array $arr$.
