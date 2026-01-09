## 1. Dynamic Programming (Top-Down)

### Intuition

This problem asks for the probability of ending with a score between `k` and `n` (inclusive). Alice draws cards with values 1 to `maxPts` with equal probability until her score reaches `k` or more.

We can think recursively: from a given score, what is the probability of eventually ending at or below `n`? If our score is already >= `k`, we stop drawing. The outcome is successful (probability `1`) if `score <= n`, and failed (probability `0`) if `score > n`.

For scores below `k`, we draw one of `maxPts` values with equal probability `1/maxPts`, so the probability at score `s` is the average of probabilities at scores `s+1`, `s+2`, ..., `s+maxPts`.

### Algorithm

1. Define `dfs(score)` that returns the probability of ending with a final score <= `n`.
2. Base case: if `score >= k`, return `1` if `score <= n`, else return `0`.
3. For `score < k`, sum up `dfs(score + i)` for `i` from 1 to `maxPts`, then divide by `maxPts`.
4. Use memoization to cache computed values.
5. Return `dfs(0)`.

::tabs-start

```python
class Solution:
    def new21Game(self, n: int, k: int, maxPts: int) -> float:
        cache = {}

        def dfs(score):
            if score >= k:
                return 1 if score <= n else 0
            if score in cache:
                return cache[score]

            prob = 0
            for i in range(1, maxPts + 1):
                prob += dfs(score + i)

            cache[score] = prob / maxPts
            return cache[score]

        return dfs(0)
```

```java
public class Solution {
    private double[] dp;

    public double new21Game(int n, int k, int maxPts) {
        dp = new double[k];
        for (int i = 0; i < dp.length; i++) dp[i] = -1.0;
        return dfs(0, n, k, maxPts);
    }

    private double dfs(int score, int n, int k, int maxPts) {
        if (score >= k) {
            return score <= n ? 1.0 : 0.0;
        }
        if (dp[score] != -1.0) {
            return dp[score];
        }

        double prob = 0;
        for (int i = 1; i <= maxPts; i++) {
            prob += dfs(score + i, n, k, maxPts);
        }

        dp[score] = prob / maxPts;
        return dp[score];
    }
}
```

```cpp
class Solution {
private:
    vector<double> dp;

public:
    double new21Game(int n, int k, int maxPts) {
        dp.resize(k, -1.0);
        return dfs(0, n, k, maxPts);
    }

private:
    double dfs(int score, int n, int k, int maxPts) {
        if (score >= k) {
            return score <= n ? 1.0 : 0.0;
        }
        if (dp[score] != -1.0) {
            return dp[score];
        }

        double prob = 0;
        for (int i = 1; i <= maxPts; i++) {
            prob += dfs(score + i, n, k, maxPts);
        }

        dp[score] = prob / maxPts;
        return dp[score];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @param {number} maxPts
     * @return {number}
     */
    new21Game(n, k, maxPts) {
        const dp = new Array(k).fill(-1);

        const dfs = (score) => {
            if (score >= k) {
                return score <= n ? 1 : 0;
            }
            if (dp[score] !== -1) {
                return dp[score];
            }

            let prob = 0;
            for (let i = 1; i <= maxPts; i++) {
                prob += dfs(score + i);
            }

            dp[score] = prob / maxPts;
            return dp[score];
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    private double[] dp;

    public double New21Game(int n, int k, int maxPts) {
        dp = new double[k];
        for (int i = 0; i < dp.Length; i++) dp[i] = -1.0;
        return Dfs(0, n, k, maxPts);
    }

    private double Dfs(int score, int n, int k, int maxPts) {
        if (score >= k) {
            return score <= n ? 1.0 : 0.0;
        }
        if (dp[score] != -1.0) {
            return dp[score];
        }

        double prob = 0;
        for (int i = 1; i <= maxPts; i++) {
            prob += Dfs(score + i, n, k, maxPts);
        }

        dp[score] = prob / maxPts;
        return dp[score];
    }
}
```

```go
func new21Game(n int, k int, maxPts int) float64 {
    if k == 0 {
        return 1.0
    }
    dp := make([]float64, k)
    for i := range dp {
        dp[i] = -1.0
    }

    var dfs func(score int) float64
    dfs = func(score int) float64 {
        if score >= k {
            if score <= n {
                return 1.0
            }
            return 0.0
        }
        if dp[score] != -1.0 {
            return dp[score]
        }

        prob := 0.0
        for i := 1; i <= maxPts; i++ {
            prob += dfs(score + i)
        }

        dp[score] = prob / float64(maxPts)
        return dp[score]
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    private lateinit var dp: DoubleArray

    fun new21Game(n: Int, k: Int, maxPts: Int): Double {
        if (k == 0) return 1.0
        dp = DoubleArray(k) { -1.0 }
        return dfs(0, n, k, maxPts)
    }

    private fun dfs(score: Int, n: Int, k: Int, maxPts: Int): Double {
        if (score >= k) {
            return if (score <= n) 1.0 else 0.0
        }
        if (dp[score] != -1.0) {
            return dp[score]
        }

        var prob = 0.0
        for (i in 1..maxPts) {
            prob += dfs(score + i, n, k, maxPts)
        }

        dp[score] = prob / maxPts
        return dp[score]
    }
}
```

```swift
class Solution {
    var dp: [Double] = []

    func new21Game(_ n: Int, _ k: Int, _ maxPts: Int) -> Double {
        if k == 0 { return 1.0 }
        dp = Array(repeating: -1.0, count: k)
        return dfs(0, n, k, maxPts)
    }

    private func dfs(_ score: Int, _ n: Int, _ k: Int, _ maxPts: Int) -> Double {
        if score >= k {
            return score <= n ? 1.0 : 0.0
        }
        if dp[score] != -1.0 {
            return dp[score]
        }

        var prob = 0.0
        for i in 1...maxPts {
            prob += dfs(score + i, n, k, maxPts)
        }

        dp[score] = prob / Double(maxPts)
        return dp[score]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * m)$
- Space complexity: $O(k)$

> Where $k$ is the threshold score, $m$ is the maximum points per draw and $n$ is the upper bound on score.

---

## 2. Dynamic Programming (Top-Down Optimized)

### Intuition

The basic top-down approach sums over `maxPts` values at each state, leading to O(k * maxPts) time. We can optimize by noticing that consecutive states have overlapping sums.

The probability at score `s` equals the sum of probabilities from `s+1` to `s+maxPts` divided by `maxPts`. The probability at `s` can be expressed in terms of `s+1`'s probability using a sliding window technique: `dp[s] = dp[s+1]` minus the difference caused by the window shifting.

The boundary at `k-1` needs special handling since it is the last score where we still draw cards.

### Algorithm

1. Handle edge case: if `score` is `k-1`, directly compute probability based on how many outcomes land within `n`.
2. If `score > n`, return `0`. If `score >= k` and `score <= n`, return `1`.
3. Use the recurrence: `dp[score] = dp[score+1]` minus `(dp[score+1+maxPts] - dp[score+1]) / maxPts`.
4. Memoize results and return `dp[0]`.

::tabs-start

```python
class Solution:
    def new21Game(self, n: int, k: int, maxPts: int) -> float:
        cache = {}

        def dfs(score):
            if score == k - 1:
                return min(n - k + 1, maxPts) / maxPts
            if score > n:
                return 0
            if score >= k:
                return 1.0

            if score in cache:
                return cache[score]

            cache[score] = dfs(score + 1)
            cache[score] -= (dfs(score + 1 + maxPts) - dfs(score + 1)) / maxPts
            return cache[score]

        return dfs(0)
```

```java
public class Solution {
    private double[] dp;

    public double new21Game(int n, int k, int maxPts) {
        dp = new double[k + maxPts];
        for (int i = 0; i < dp.length; i++) dp[i] = -1.0;
        return dfs(0, n, k, maxPts);
    }

    private double dfs(int score, int n, int k, int maxPts) {
        if (score == k - 1) {
            return Math.min(n - k + 1, maxPts) / (double) maxPts;
        }
        if (score > n) {
            return 0.0;
        }
        if (score >= k) {
            return 1.0;
        }
        if (dp[score] != -1.0) {
            return dp[score];
        }

        dp[score] = dfs(score + 1, n, k, maxPts);
        dp[score] -= (dfs(score + 1 + maxPts, n, k, maxPts) - dfs(score + 1, n, k, maxPts)) / maxPts;
        return dp[score];
    }
}
```

```cpp
class Solution {
private:
    vector<double> dp;

public:
    double new21Game(int n, int k, int maxPts) {
        dp.resize(k + maxPts, -1.0);
        return dfs(0, n, k, maxPts);
    }

private:
    double dfs(int score, int n, int k, int maxPts) {
        if (score == k - 1) {
            return min(n - k + 1, maxPts) / (double)maxPts;
        }
        if (score > n) {
            return 0.0;
        }
        if (score >= k) {
            return 1.0;
        }
        if (dp[score] != -1.0) {
            return dp[score];
        }

        dp[score] = dfs(score + 1, n, k, maxPts);
        dp[score] -= (dfs(score + 1 + maxPts, n, k, maxPts) - dfs(score + 1, n, k, maxPts)) / maxPts;
        return dp[score];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @param {number} maxPts
     * @return {number}
     */
    new21Game(n, k, maxPts) {
        const dp = new Array(k + maxPts).fill(-1);

        const dfs = (score) => {
            if (score === k - 1) {
                return Math.min(n - k + 1, maxPts) / maxPts;
            }
            if (score > n) {
                return 0;
            }
            if (score >= k) {
                return 1.0;
            }
            if (dp[score] !== -1) {
                return dp[score];
            }

            dp[score] = dfs(score + 1);
            dp[score] -= (dfs(score + 1 + maxPts) - dfs(score + 1)) / maxPts;
            return dp[score];
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    private double[] dp;

    public double New21Game(int n, int k, int maxPts) {
        dp = new double[k + maxPts];
        for (int i = 0; i < dp.Length; i++) dp[i] = -1.0;
        return Dfs(0, n, k, maxPts);
    }

    private double Dfs(int score, int n, int k, int maxPts) {
        if (score == k - 1) {
            return Math.Min(n - k + 1, maxPts) / (double)maxPts;
        }
        if (score > n) {
            return 0.0;
        }
        if (score >= k) {
            return 1.0;
        }
        if (dp[score] != -1.0) {
            return dp[score];
        }

        dp[score] = Dfs(score + 1, n, k, maxPts);
        dp[score] -= (Dfs(score + 1 + maxPts, n, k, maxPts) - Dfs(score + 1, n, k, maxPts)) / maxPts;
        return dp[score];
    }
}
```

```go
func new21Game(n int, k int, maxPts int) float64 {
    if k == 0 {
        return 1.0
    }
    dp := make([]float64, k+maxPts)
    for i := range dp {
        dp[i] = -1.0
    }

    var dfs func(score int) float64
    dfs = func(score int) float64 {
        if score == k-1 {
            return float64(min(n-k+1, maxPts)) / float64(maxPts)
        }
        if score > n {
            return 0.0
        }
        if score >= k {
            return 1.0
        }
        if dp[score] != -1.0 {
            return dp[score]
        }

        dp[score] = dfs(score + 1)
        dp[score] -= (dfs(score+1+maxPts) - dfs(score+1)) / float64(maxPts)
        return dp[score]
    }

    return dfs(0)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var dp: DoubleArray

    fun new21Game(n: Int, k: Int, maxPts: Int): Double {
        if (k == 0) return 1.0
        dp = DoubleArray(k + maxPts) { -1.0 }
        return dfs(0, n, k, maxPts)
    }

    private fun dfs(score: Int, n: Int, k: Int, maxPts: Int): Double {
        if (score == k - 1) {
            return minOf(n - k + 1, maxPts).toDouble() / maxPts
        }
        if (score > n) {
            return 0.0
        }
        if (score >= k) {
            return 1.0
        }
        if (dp[score] != -1.0) {
            return dp[score]
        }

        dp[score] = dfs(score + 1, n, k, maxPts)
        dp[score] -= (dfs(score + 1 + maxPts, n, k, maxPts) - dfs(score + 1, n, k, maxPts)) / maxPts
        return dp[score]
    }
}
```

```swift
class Solution {
    var dp: [Double] = []

    func new21Game(_ n: Int, _ k: Int, _ maxPts: Int) -> Double {
        if k == 0 { return 1.0 }
        dp = Array(repeating: -1.0, count: k + maxPts)
        return dfs(0, n, k, maxPts)
    }

    private func dfs(_ score: Int, _ n: Int, _ k: Int, _ maxPts: Int) -> Double {
        if score == k - 1 {
            return Double(min(n - k + 1, maxPts)) / Double(maxPts)
        }
        if score > n {
            return 0.0
        }
        if score >= k {
            return 1.0
        }
        if dp[score] != -1.0 {
            return dp[score]
        }

        dp[score] = dfs(score + 1, n, k, maxPts)
        dp[score] -= (dfs(score + 1 + maxPts, n, k, maxPts) - dfs(score + 1, n, k, maxPts)) / Double(maxPts)
        return dp[score]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k + m)$
- Space complexity: $O(n)$

> Where $k$ is the threshold score, $m$ is the maximum points per draw and $n$ is the upper bound on score.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of computing probabilities of success from each score, we compute the probability of reaching each score. `dp[score]` represents the probability of landing on exactly that score at some point during the game.

We start at score `0` with probability `1`. For each score from `0` to `k-1` (the scores where we keep drawing), we distribute probability to scores reachable by drawing `1` to `maxPts`. Each draw has probability `1/maxPts`.

The answer is the sum of `dp[score]` for all scores from `k` to `n` (valid ending scores).

### Algorithm

1. Create `dp` array of size `n+1`, set `dp[0] = 1`.
2. For each score from `1` to `n`:
   - For each `draw` value from `1` to `maxPts`:
     - If `score - draw` is in range `[0, k-1]`, add `dp[score - draw] / maxPts` to `dp[score]`.
3. Sum `dp[k]` through `dp[n]` and return the result.

::tabs-start

```python
class Solution:
    def new21Game(self, n: int, k: int, maxPts: int) -> float:
        dp = [0] * (n + 1)
        dp[0] = 1.0

        for score in range(1, n + 1):
            for draw in range(1, maxPts + 1):
                if score - draw >= 0 and score - draw < k:
                    dp[score] += dp[score - draw] / maxPts

        return sum(dp[k:n + 1])
```

```java
public class Solution {
    public double new21Game(int n, int k, int maxPts) {
        double[] dp = new double[n + 1];
        dp[0] = 1.0;

        for (int score = 1; score <= n; score++) {
            for (int draw = 1; draw <= maxPts; draw++) {
                if (score - draw >= 0 && score - draw < k) {
                    dp[score] += dp[score - draw] / maxPts;
                }
            }
        }

        double result = 0.0;
        for (int i = k; i <= n; i++) {
            result += dp[i];
        }

        return result;
    }
}
```

```cpp
class Solution {
public:
    double new21Game(int n, int k, int maxPts) {
        vector<double> dp(n + 1, 0.0);
        dp[0] = 1.0;

        for (int score = 1; score <= n; score++) {
            for (int draw = 1; draw <= maxPts; draw++) {
                if (score - draw >= 0 && score - draw < k) {
                    dp[score] += dp[score - draw] / maxPts;
                }
            }
        }

        double result = 0.0;
        for (int i = k; i <= n; i++) {
            result += dp[i];
        }

        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @param {number} maxPts
     * @return {number}
     */
    new21Game(n, k, maxPts) {
        const dp = new Array(n + 1).fill(0);
        dp[0] = 1.0;

        for (let score = 1; score <= n; score++) {
            for (let draw = 1; draw <= maxPts; draw++) {
                if (score - draw >= 0 && score - draw < k) {
                    dp[score] += dp[score - draw] / maxPts;
                }
            }
        }

        let result = 0.0;
        for (let i = k; i <= n; i++) {
            result += dp[i];
        }

        return result;
    }
}
```

```csharp
public class Solution {
    public double New21Game(int n, int k, int maxPts) {
        double[] dp = new double[n + 1];
        dp[0] = 1.0;

        for (int score = 1; score <= n; score++) {
            for (int draw = 1; draw <= maxPts; draw++) {
                if (score - draw >= 0 && score - draw < k) {
                    dp[score] += dp[score - draw] / maxPts;
                }
            }
        }

        double result = 0.0;
        for (int i = k; i <= n; i++) {
            result += dp[i];
        }

        return result;
    }
}
```

```go
func new21Game(n int, k int, maxPts int) float64 {
    dp := make([]float64, n+1)
    dp[0] = 1.0

    for score := 1; score <= n; score++ {
        for draw := 1; draw <= maxPts; draw++ {
            if score-draw >= 0 && score-draw < k {
                dp[score] += dp[score-draw] / float64(maxPts)
            }
        }
    }

    result := 0.0
    for i := k; i <= n; i++ {
        result += dp[i]
    }

    return result
}
```

```kotlin
class Solution {
    fun new21Game(n: Int, k: Int, maxPts: Int): Double {
        val dp = DoubleArray(n + 1)
        dp[0] = 1.0

        for (score in 1..n) {
            for (draw in 1..maxPts) {
                if (score - draw >= 0 && score - draw < k) {
                    dp[score] += dp[score - draw] / maxPts
                }
            }
        }

        var result = 0.0
        for (i in k..n) {
            result += dp[i]
        }

        return result
    }
}
```

```swift
class Solution {
    func new21Game(_ n: Int, _ k: Int, _ maxPts: Int) -> Double {
        var dp = Array(repeating: 0.0, count: n + 1)
        dp[0] = 1.0

        for score in 1...n {
            for draw in 1...maxPts {
                if score - draw >= 0 && score - draw < k {
                    dp[score] += dp[score - draw] / Double(maxPts)
                }
            }
        }

        var result = 0.0
        for i in k...n {
            result += dp[i]
        }

        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $k$ is the threshold score, $m$ is the maximum points per draw and $n$ is the upper bound on score.

---

## 4. Dynamic Programming (Sliding Window)

### Intuition

We can optimize the bottom-up approach using a sliding window. Notice that `dp[i]` depends on the sum of `dp` values from `dp[i-maxPts]` to `dp[i-1]`, but only those in the range `[0, k-1]`. Instead of recomputing this sum each time, we maintain a running window sum.

Working backwards from `k-1` to `0`, we compute `dp[i]` as `windowSum / maxPts`. The window initially covers scores from `k` to `k+maxPts-1`. For scores >= `k` and <= `n`, the probability of success is `1` (we already stopped and the score is valid). As we move the window, we add the newly computed `dp` value and remove the value that slides out.

### Algorithm

1. If `k` is `0`, return `1.0` (already done, score `0` is valid).
2. Initialize `windowSum` as the count of scores from `k` to `k+maxPts-1` that are <= `n`.
3. Iterate from `k-1` down to `0`:
   - Set `dp[i] = windowSum / maxPts`.
   - Update `windowSum`: add `dp[i]` and subtract the value sliding out of the window (if it exists and is <= `n`).
4. Return `dp[0]`.

::tabs-start

```python
class Solution:
    def new21Game(self, n: int, k: int, maxPts: int) -> float:
        if k == 0:
            return 1.0

        windowSum = 0
        for i in range(k, k + maxPts):
            windowSum += 1 if i <= n else 0

        dp = {}
        for i in range(k - 1, -1, -1):
            dp[i] = windowSum / maxPts
            remove = 0
            if i + maxPts <= n:
                remove = dp.get(i + maxPts, 1)
            windowSum += dp[i] - remove
        return dp[0]
```

```java
class Solution {
    public double new21Game(int n, int k, int maxPts) {
        if (k == 0) {
            return 1.0;
        }
        double windowSum = 0.0;
        for (int i = k; i < k + maxPts; i++) {
            windowSum += (i <= n) ? 1.0 : 0.0;
        }
        HashMap<Integer, Double> dp = new HashMap<>();
        for (int i = k - 1; i >= 0; i--) {
            dp.put(i, windowSum / maxPts);
            double remove = 0.0;
            if (i + maxPts <= n) {
                remove = dp.getOrDefault(i + maxPts, 1.0);
            }
            windowSum += dp.get(i) - remove;
        }
        return dp.get(0);
    }
}
```

```cpp
class Solution {
public:
    double new21Game(int n, int k, int maxPts) {
        if (k == 0) {
            return 1.0;
        }
        double windowSum = 0.0;
        for (int i = k; i < k + maxPts; i++) {
            windowSum += (i <= n) ? 1.0 : 0.0;
        }
        unordered_map<int, double> dp;
        for (int i = k - 1; i >= 0; i--) {
            dp[i] = windowSum / maxPts;
            double remove = 0.0;
            if (i + maxPts <= n) {
                remove = (dp.find(i + maxPts) != dp.end()) ? dp[i + maxPts] : 1.0;
            }
            windowSum += dp[i] - remove;
        }
        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @param {number} maxPts
     * @return {number}
     */
    new21Game(n, k, maxPts) {
        if (k === 0) {
            return 1.0;
        }
        let windowSum = 0.0;
        for (let i = k; i < k + maxPts; i++) {
            windowSum += i <= n ? 1.0 : 0.0;
        }
        let dp = {};
        for (let i = k - 1; i >= 0; i--) {
            dp[i] = windowSum / maxPts;
            let remove = 0.0;
            if (i + maxPts <= n) {
                remove = dp[i + maxPts] !== undefined ? dp[i + maxPts] : 1.0;
            }
            windowSum += dp[i] - remove;
        }
        return dp[0];
    }
}
```

```csharp
public class Solution {
    public double New21Game(int n, int k, int maxPts) {
        if (k == 0) {
            return 1.0;
        }
        double windowSum = 0.0;
        for (int i = k; i < k + maxPts; i++) {
            windowSum += (i <= n) ? 1.0 : 0.0;
        }
        Dictionary<int, double> dp = new Dictionary<int, double>();
        for (int i = k - 1; i >= 0; i--) {
            dp[i] = windowSum / maxPts;
            double remove = 0.0;
            if (i + maxPts <= n) {
                remove = dp.ContainsKey(i + maxPts) ? dp[i + maxPts] : 1.0;
            }
            windowSum += dp[i] - remove;
        }
        return dp[0];
    }
}
```

```go
func new21Game(n int, k int, maxPts int) float64 {
    if k == 0 {
        return 1.0
    }
    windowSum := 0.0
    for i := k; i < k+maxPts; i++ {
        if i <= n {
            windowSum += 1.0
        }
    }
    dp := make(map[int]float64)
    for i := k - 1; i >= 0; i-- {
        dp[i] = windowSum / float64(maxPts)
        remove := 0.0
        if i+maxPts <= n {
            if val, ok := dp[i+maxPts]; ok {
                remove = val
            } else {
                remove = 1.0
            }
        }
        windowSum += dp[i] - remove
    }
    return dp[0]
}
```

```kotlin
class Solution {
    fun new21Game(n: Int, k: Int, maxPts: Int): Double {
        if (k == 0) {
            return 1.0
        }
        var windowSum = 0.0
        for (i in k until k + maxPts) {
            windowSum += if (i <= n) 1.0 else 0.0
        }
        val dp = HashMap<Int, Double>()
        for (i in k - 1 downTo 0) {
            dp[i] = windowSum / maxPts
            var remove = 0.0
            if (i + maxPts <= n) {
                remove = dp[i + maxPts] ?: 1.0
            }
            windowSum += dp[i]!! - remove
        }
        return dp[0]!!
    }
}
```

```swift
class Solution {
    func new21Game(_ n: Int, _ k: Int, _ maxPts: Int) -> Double {
        if k == 0 {
            return 1.0
        }
        var windowSum = 0.0
        for i in k..<(k + maxPts) {
            windowSum += i <= n ? 1.0 : 0.0
        }
        var dp = [Int: Double]()
        for i in stride(from: k - 1, through: 0, by: -1) {
            dp[i] = windowSum / Double(maxPts)
            var remove = 0.0
            if i + maxPts <= n {
                remove = dp[i + maxPts] ?? 1.0
            }
            windowSum += dp[i]! - remove
        }
        return dp[0]!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k + m)$
- Space complexity: $O(n)$

> Where $k$ is the threshold score, $m$ is the maximum points per draw and $n$ is the upper bound on score.
