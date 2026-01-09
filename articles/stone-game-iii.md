## 1. Dynamic Programming (Top-Down) - I

### Intuition

Alice and Bob take turns picking 1, 2, or 3 stones from the front. Both play optimally: Alice maximizes her score while Bob minimizes Alice's score. We track the score difference (Alice minus Bob) throughout the game. At each state, we know whose turn it is and the current position. Alice adds stone values to the running score, while Bob subtracts them. The final result tells us who wins based on whether the difference is positive, negative, or zero.

### Algorithm

1. Define `dfs(i, alice)` where `i` is the current index and `alice` indicates whose turn it is.
2. Base case: if `i >= n`, return 0.
3. If it's Alice's turn (alice = 1), initialize result to negative infinity. For each choice of 1, 2, or 3 stones, add their values to a running score and maximize `score + dfs(j + 1, 0)`.
4. If it's Bob's turn (alice = 0), initialize result to positive infinity. For each choice, subtract the stone values and minimize `score + dfs(j + 1, 1)`.
5. Memoize using a 2D cache `dp[n][2]`.
6. The final result `dfs(0, 1)` represents Alice's score minus Bob's score. Return "Alice" if positive, "Bob" if negative, "Tie" if zero.

::tabs-start

```python
class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        n = len(stoneValue)
        dp = [[None] * 2 for _ in range(n)]

        def dfs(i, alice):
            if i >= n:
                return 0
            if dp[i][alice] is not None:
                return dp[i][alice]

            res = float("-inf") if alice == 1 else float("inf")
            score = 0
            for j in range(i, min(i + 3, n)):
                if alice == 1:
                    score += stoneValue[j]
                    res = max(res, score + dfs(j + 1, 0))
                else:
                    score -= stoneValue[j]
                    res = min(res, score + dfs(j + 1, 1))

            dp[i][alice] = res
            return res

        result = dfs(0, 1)
        if result == 0:
            return "Tie"
        return "Alice" if result > 0 else "Bob"
```

```java
public class Solution {
    private Integer[][] dp;
    private int n;

    public String stoneGameIII(int[] stoneValue) {
        n = stoneValue.length;
        dp = new Integer[n][2];

        int result = dfs(0, 1, stoneValue);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }

    private int dfs(int i, int alice, int[] stoneValue) {
        if (i >= n) return 0;
        if (dp[i][alice] != null) return dp[i][alice];

        int res = alice == 1 ? Integer.MIN_VALUE : Integer.MAX_VALUE;
        int score = 0;
        for (int j = i; j < Math.min(i + 3, n); j++) {
            if (alice == 1) {
                score += stoneValue[j];
                res = Math.max(res, score + dfs(j + 1, 0, stoneValue));
            } else {
                score -= stoneValue[j];
                res = Math.min(res, score + dfs(j + 1, 1, stoneValue));
            }
        }

        dp[i][alice] = res;
        return res;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;
    int n;

public:
    string stoneGameIII(vector<int>& stoneValue) {
        n = stoneValue.size();
        dp.assign(n, vector<int>(2, INT_MIN));

        int result = dfs(0, 1, stoneValue);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }

private:
    int dfs(int i, int alice, vector<int>& stoneValue) {
        if (i >= n) return 0;
        if (dp[i][alice] != INT_MIN) return dp[i][alice];

        int res = alice == 1 ? INT_MIN : INT_MAX;
        int score = 0;
        for (int j = i; j < min(i + 3, n); j++) {
            if (alice == 1) {
                score += stoneValue[j];
                res = max(res, score + dfs(j + 1, 0, stoneValue));
            } else {
                score -= stoneValue[j];
                res = min(res, score + dfs(j + 1, 1, stoneValue));
            }
        }

        dp[i][alice] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stoneValue
     * @return {string}
     */
    stoneGameIII(stoneValue) {
        const n = stoneValue.length;
        const dp = Array.from({ length: n }, () => [null, null]);

        const dfs = (i, alice) => {
            if (i >= n) return 0;
            if (dp[i][alice] !== null) return dp[i][alice];

            let res = alice === 1 ? -Infinity : Infinity;
            let score = 0;
            for (let j = i; j < Math.min(i + 3, n); j++) {
                if (alice === 1) {
                    score += stoneValue[j];
                    res = Math.max(res, score + dfs(j + 1, 0));
                } else {
                    score -= stoneValue[j];
                    res = Math.min(res, score + dfs(j + 1, 1));
                }
            }

            dp[i][alice] = res;
            return res;
        };

        const result = dfs(0, 1);
        if (result === 0) return 'Tie';
        return result > 0 ? 'Alice' : 'Bob';
    }
}
```

```csharp
public class Solution {
    public string StoneGameIII(int[] stoneValue) {
        int n = stoneValue.Length;
        int?[,] dp = new int?[n, 2];

        int Dfs(int i, int alice) {
            if (i >= n) return 0;
            if (dp[i, alice].HasValue) return dp[i, alice].Value;

            int res = alice == 1 ? int.MinValue : int.MaxValue;
            int score = 0;

            for (int j = i; j < Math.Min(i + 3, n); j++) {
                if (alice == 1) {
                    score += stoneValue[j];
                    res = Math.Max(res, score + Dfs(j + 1, 0));
                } else {
                    score -= stoneValue[j];
                    res = Math.Min(res, score + Dfs(j + 1, 1));
                }
            }

            dp[i, alice] = res;
            return res;
        }

        int result = Dfs(0, 1);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }
}
```

```go
func stoneGameIII(stoneValue []int) string {
    n := len(stoneValue)
    dp := make([][2]*int, n)

    var dfs func(i, alice int) int
    dfs = func(i, alice int) int {
        if i >= n {
            return 0
        }
        if dp[i][alice] != nil {
            return *dp[i][alice]
        }

        var res int
        if alice == 1 {
            res = math.MinInt32
        } else {
            res = math.MaxInt32
        }
        score := 0

        for j := i; j < min(i+3, n); j++ {
            if alice == 1 {
                score += stoneValue[j]
                res = max(res, score+dfs(j+1, 0))
            } else {
                score -= stoneValue[j]
                res = min(res, score+dfs(j+1, 1))
            }
        }

        dp[i][alice] = &res
        return res
    }

    result := dfs(0, 1)
    if result == 0 {
        return "Tie"
    }
    if result > 0 {
        return "Alice"
    }
    return "Bob"
}
```

```kotlin
class Solution {
    fun stoneGameIII(stoneValue: IntArray): String {
        val n = stoneValue.size
        val dp = Array(n) { arrayOfNulls<Int>(2) }

        fun dfs(i: Int, alice: Int): Int {
            if (i >= n) return 0
            dp[i][alice]?.let { return it }

            var res = if (alice == 1) Int.MIN_VALUE else Int.MAX_VALUE
            var score = 0

            for (j in i until minOf(i + 3, n)) {
                if (alice == 1) {
                    score += stoneValue[j]
                    res = maxOf(res, score + dfs(j + 1, 0))
                } else {
                    score -= stoneValue[j]
                    res = minOf(res, score + dfs(j + 1, 1))
                }
            }

            dp[i][alice] = res
            return res
        }

        val result = dfs(0, 1)
        return when {
            result == 0 -> "Tie"
            result > 0 -> "Alice"
            else -> "Bob"
        }
    }
}
```

```swift
class Solution {
    func stoneGameIII(_ stoneValue: [Int]) -> String {
        let n = stoneValue.count
        var dp = [[Int?]](repeating: [nil, nil], count: n)

        func dfs(_ i: Int, _ alice: Int) -> Int {
            if i >= n { return 0 }
            if let cached = dp[i][alice] { return cached }

            var res = alice == 1 ? Int.min : Int.max
            var score = 0

            for j in i..<min(i + 3, n) {
                if alice == 1 {
                    score += stoneValue[j]
                    res = max(res, score + dfs(j + 1, 0))
                } else {
                    score -= stoneValue[j]
                    res = min(res, score + dfs(j + 1, 1))
                }
            }

            dp[i][alice] = res
            return res
        }

        let result = dfs(0, 1)
        if result == 0 { return "Tie" }
        return result > 0 ? "Alice" : "Bob"
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down) - II

### Intuition

We can simplify the recursion by treating both players symmetrically. At any position, the current player wants to maximize their advantage over the opponent. Since the game is zero-sum, if the current player takes some stones with total value T, and the opponent then plays optimally getting result R, the current player's relative advantage is `T - R`. This formulation eliminates the need to track whose turn it is.

### Algorithm

1. Define `dfs(i)` to return the maximum advantage (current player's score minus opponent's score) starting from index `i`.
2. Base case: if `i >= n`, return 0.
3. For each choice of taking 1, 2, or 3 stones, accumulate their total value and compute `total - dfs(j + 1)`. Take the maximum across all choices.
4. Memoize results in a 1D cache of size `n`.
5. The result `dfs(0)` represents Alice's advantage. Return "Alice" if positive, "Bob" if negative, "Tie" if zero.

::tabs-start

```python
class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        n = len(stoneValue)
        dp = {}

        def dfs(i):
            if i >= n:
                return 0
            if i in dp:
                return dp[i]

            res, total = float("-inf"), 0
            for j in range(i, min(i + 3, n)):
                total += stoneValue[j]
                res = max(res, total - dfs(j + 1))

            dp[i] = res
            return res

        result = dfs(0)
        if result == 0:
            return "Tie"
        return "Alice" if result > 0 else "Bob"
```

```java
public class Solution {
    private int[] dp;
    private int n;

    public String stoneGameIII(int[] stoneValue) {
        this.n = stoneValue.length;
        this.dp = new int[n];
        Arrays.fill(dp, Integer.MIN_VALUE);

        int result = dfs(0, stoneValue);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }

    private int dfs(int i, int[] stoneValue) {
        if (i >= n) return 0;
        if (dp[i] != Integer.MIN_VALUE) return dp[i];

        int res = Integer.MIN_VALUE, total = 0;
        for (int j = i; j < Math.min(i + 3, n); j++) {
            total += stoneValue[j];
            res = Math.max(res, total - dfs(j + 1, stoneValue));
        }

        dp[i] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    string stoneGameIII(vector<int>& stoneValue) {
        n = stoneValue.size();
        dp.assign(n, INT_MIN);

        int result = dfs(0, stoneValue);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }

private:
    vector<int> dp;
    int n;

    int dfs(int i, vector<int>& stoneValue) {
        if (i >= n) return 0;
        if (dp[i] != INT_MIN) return dp[i];

        int res = INT_MIN, total = 0;
        for (int j = i; j < min(i + 3, n); j++) {
            total += stoneValue[j];
            res = max(res, total - dfs(j + 1, stoneValue));
        }

        dp[i] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stoneValue
     * @return {string}
     */
    stoneGameIII(stoneValue) {
        const n = stoneValue.length;
        const dp = new Array(n);

        const dfs = (i) => {
            if (i >= n) return 0;
            if (dp[i] !== undefined) return dp[i];

            let res = -Infinity,
                total = 0;
            for (let j = i; j < Math.min(i + 3, n); j++) {
                total += stoneValue[j];
                res = Math.max(res, total - dfs(j + 1));
            }

            dp[i] = res;
            return res;
        };

        const result = dfs(0);
        if (result === 0) return 'Tie';
        return result > 0 ? 'Alice' : 'Bob';
    }
}
```

```csharp
public class Solution {
    public string StoneGameIII(int[] stoneValue) {
        int n = stoneValue.Length;
        Dictionary<int, int> dp = new Dictionary<int, int>();

        int Dfs(int i) {
            if (i >= n) return 0;
            if (dp.ContainsKey(i)) return dp[i];

            int res = int.MinValue, total = 0;
            for (int j = i; j < Math.Min(i + 3, n); j++) {
                total += stoneValue[j];
                res = Math.Max(res, total - Dfs(j + 1));
            }

            dp[i] = res;
            return res;
        }

        int result = Dfs(0);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }
}
```

```go
func stoneGameIII(stoneValue []int) string {
    n := len(stoneValue)
    dp := make(map[int]int)

    var dfs func(i int) int
    dfs = func(i int) int {
        if i >= n {
            return 0
        }
        if val, ok := dp[i]; ok {
            return val
        }

        res := math.MinInt32
        total := 0
        for j := i; j < min(i+3, n); j++ {
            total += stoneValue[j]
            res = max(res, total-dfs(j+1))
        }

        dp[i] = res
        return res
    }

    result := dfs(0)
    if result == 0 {
        return "Tie"
    }
    if result > 0 {
        return "Alice"
    }
    return "Bob"
}
```

```kotlin
class Solution {
    fun stoneGameIII(stoneValue: IntArray): String {
        val n = stoneValue.size
        val dp = HashMap<Int, Int>()

        fun dfs(i: Int): Int {
            if (i >= n) return 0
            dp[i]?.let { return it }

            var res = Int.MIN_VALUE
            var total = 0
            for (j in i until minOf(i + 3, n)) {
                total += stoneValue[j]
                res = maxOf(res, total - dfs(j + 1))
            }

            dp[i] = res
            return res
        }

        val result = dfs(0)
        return when {
            result == 0 -> "Tie"
            result > 0 -> "Alice"
            else -> "Bob"
        }
    }
}
```

```swift
class Solution {
    func stoneGameIII(_ stoneValue: [Int]) -> String {
        let n = stoneValue.count
        var dp = [Int: Int]()

        func dfs(_ i: Int) -> Int {
            if i >= n { return 0 }
            if let cached = dp[i] { return cached }

            var res = Int.min
            var total = 0
            for j in i..<min(i + 3, n) {
                total += stoneValue[j]
                res = max(res, total - dfs(j + 1))
            }

            dp[i] = res
            return res
        }

        let result = dfs(0)
        if result == 0 { return "Tie" }
        return result > 0 ? "Alice" : "Bob"
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

Converting the recursive solution to iterative form, we fill the DP table from right to left. Each position stores the maximum advantage the current player can achieve from that point onward. Since each state only depends on the next three states, we process positions in reverse order to ensure dependencies are resolved.

### Algorithm

1. Create a DP array `dp[n+1]` initialized to negative infinity, with `dp[n] = 0` as the base case.
2. Iterate from `i = n-1` down to 0.
3. For each `i`, try taking 1, 2, or 3 stones. Accumulate the total and compute `dp[i] = max(dp[i], total - dp[j + 1])`.
4. The value `dp[0]` represents Alice's advantage when starting the game. Return "Alice" if positive, "Bob" if negative, "Tie" if zero.

::tabs-start

```python
class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        n = len(stoneValue)
        dp = [float("-inf")] * (n + 1)
        dp[n] = 0

        for i in range(n - 1, -1, -1):
            total = 0
            for j in range(i, min(i + 3, n)):
                total += stoneValue[j]
                dp[i] = max(dp[i], total - dp[j + 1])

        result = dp[0]
        if result == 0:
            return "Tie"
        return "Alice" if result > 0 else "Bob"
```

```java
public class Solution {
    public String stoneGameIII(int[] stoneValue) {
        int n = stoneValue.length;
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MIN_VALUE);
        dp[n] = 0;

        for (int i = n - 1; i >= 0; i--) {
            int total = 0;
            dp[i] = Integer.MIN_VALUE;
            for (int j = i; j < Math.min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i] = Math.max(dp[i], total - dp[j + 1]);
            }
        }

        int result = dp[0];
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }
}
```

```cpp
class Solution {
public:
    string stoneGameIII(vector<int>& stoneValue) {
        int n = stoneValue.size();
        vector<int> dp(n + 1, INT_MIN);
        dp[n] = 0;

        for (int i = n - 1; i >= 0; i--) {
            int total = 0;
            dp[i] = INT_MIN;
            for (int j = i; j < min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i] = max(dp[i], total - dp[j + 1]);
            }
        }

        int result = dp[0];
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stoneValue
     * @return {string}
     */
    stoneGameIII(stoneValue) {
        const n = stoneValue.length;
        const dp = new Array(n + 1).fill(-Infinity);
        dp[n] = 0;

        for (let i = n - 1; i >= 0; i--) {
            let total = 0;
            dp[i] = -Infinity;
            for (let j = i; j < Math.min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i] = Math.max(dp[i], total - dp[j + 1]);
            }
        }

        const result = dp[0];
        if (result === 0) return 'Tie';
        return result > 0 ? 'Alice' : 'Bob';
    }
}
```

```csharp
public class Solution {
    public string StoneGameIII(int[] stoneValue) {
        int n = stoneValue.Length;
        int[] dp = new int[n + 1];
        for (int i = 0; i <= n; i++) dp[i] = int.MinValue;
        dp[n] = 0;

        for (int i = n - 1; i >= 0; i--) {
            int total = 0;
            for (int j = i; j < Math.Min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i] = Math.Max(dp[i], total - dp[j + 1]);
            }
        }

        int result = dp[0];
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }
}
```

```go
func stoneGameIII(stoneValue []int) string {
    n := len(stoneValue)
    dp := make([]int, n+1)
    for i := range dp {
        dp[i] = math.MinInt32
    }
    dp[n] = 0

    for i := n - 1; i >= 0; i-- {
        total := 0
        dp[i] = math.MinInt32
        for j := i; j < min(i+3, n); j++ {
            total += stoneValue[j]
            dp[i] = max(dp[i], total-dp[j+1])
        }
    }

    result := dp[0]
    if result == 0 {
        return "Tie"
    }
    if result > 0 {
        return "Alice"
    }
    return "Bob"
}
```

```kotlin
class Solution {
    fun stoneGameIII(stoneValue: IntArray): String {
        val n = stoneValue.size
        val dp = IntArray(n + 1) { Int.MIN_VALUE }
        dp[n] = 0

        for (i in n - 1 downTo 0) {
            var total = 0
            for (j in i until minOf(i + 3, n)) {
                total += stoneValue[j]
                dp[i] = maxOf(dp[i], total - dp[j + 1])
            }
        }

        val result = dp[0]
        return when {
            result == 0 -> "Tie"
            result > 0 -> "Alice"
            else -> "Bob"
        }
    }
}
```

```swift
class Solution {
    func stoneGameIII(_ stoneValue: [Int]) -> String {
        let n = stoneValue.count
        var dp = [Int](repeating: Int.min, count: n + 1)
        dp[n] = 0

        for i in stride(from: n - 1, through: 0, by: -1) {
            var total = 0
            dp[i] = Int.min
            for j in i..<min(i + 3, n) {
                total += stoneValue[j]
                dp[i] = max(dp[i], total - dp[j + 1])
            }
        }

        let result = dp[0]
        if result == 0 { return "Tie" }
        return result > 0 ? "Alice" : "Bob"
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

Since each state only depends on the next three states (`dp[i+1]`, `dp[i+2]`, `dp[i+3]`), we can reduce space from O(n) to O(1) by using a rolling array of size 4. We use modulo arithmetic to cycle through the array indices as we process positions from right to left.

### Algorithm

1. Create a small DP array `dp[4]` initialized to 0.
2. Iterate from `i = n-1` down to 0.
3. For each `i`, set `dp[i % 4] = negative infinity`. Try taking 1, 2, or 3 stones, accumulating the total and computing `dp[i % 4] = max(dp[i % 4], total - dp[(j + 1) % 4])`.
4. The value `dp[0]` represents Alice's advantage. Return "Alice" if positive, "Bob" if negative, "Tie" if zero.

::tabs-start

```python
class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        n = len(stoneValue)
        dp = [0] * 4

        for i in range(n - 1, -1, -1):
            total = 0
            dp[i % 4] = float("-inf")
            for j in range(i, min(i + 3, n)):
                total += stoneValue[j]
                dp[i % 4] = max(dp[i % 4], total - dp[(j + 1) % 4])

        if dp[0] == 0:
            return "Tie"
        return "Alice" if dp[0] > 0 else "Bob"
```

```java
public class Solution {
    public String stoneGameIII(int[] stoneValue) {
        int n = stoneValue.length;
        int[] dp = new int[4];

        for (int i = n - 1; i >= 0; i--) {
            int total = 0;
            dp[i % 4] = Integer.MIN_VALUE;
            for (int j = i; j < Math.min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i % 4] = Math.max(dp[i % 4], total - dp[(j + 1) % 4]);
            }
        }

        if (dp[0] == 0) return "Tie";
        return dp[0] > 0 ? "Alice" : "Bob";
    }
}
```

```cpp
class Solution {
public:
    string stoneGameIII(vector<int>& stoneValue) {
        int n = stoneValue.size();
        vector<int> dp(4, 0);

        for (int i = n - 1; i >= 0; --i) {
            int total = 0;
            dp[i % 4] = INT_MIN;
            for (int j = i; j < min(i + 3, n); ++j) {
                total += stoneValue[j];
                dp[i % 4] = max(dp[i % 4], total - dp[(j + 1) % 4]);
            }
        }

        if (dp[0] == 0) return "Tie";
        return dp[0] > 0 ? "Alice" : "Bob";
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stoneValue
     * @return {string}
     */
    stoneGameIII(stoneValue) {
        const n = stoneValue.length;
        const dp = new Array(4).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            let total = 0;
            dp[i % 4] = -Infinity;
            for (let j = i; j < Math.min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i % 4] = Math.max(dp[i % 4], total - dp[(j + 1) % 4]);
            }
        }

        if (dp[0] === 0) return 'Tie';
        return dp[0] > 0 ? 'Alice' : 'Bob';
    }
}
```

```csharp
public class Solution {
    public string StoneGameIII(int[] stoneValue) {
        int n = stoneValue.Length;
        int[] dp = new int[4];

        for (int i = n - 1; i >= 0; i--) {
            int total = 0;
            dp[i % 4] = int.MinValue;

            for (int j = i; j < Math.Min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i % 4] = Math.Max(dp[i % 4], total - dp[(j + 1) % 4]);
            }
        }

        if (dp[0] == 0) return "Tie";
        return dp[0] > 0 ? "Alice" : "Bob";
    }
}
```

```go
func stoneGameIII(stoneValue []int) string {
    n := len(stoneValue)
    dp := make([]int, 4)

    for i := n - 1; i >= 0; i-- {
        total := 0
        dp[i%4] = math.MinInt32
        for j := i; j < min(i+3, n); j++ {
            total += stoneValue[j]
            dp[i%4] = max(dp[i%4], total-dp[(j+1)%4])
        }
    }

    if dp[0] == 0 {
        return "Tie"
    }
    if dp[0] > 0 {
        return "Alice"
    }
    return "Bob"
}
```

```kotlin
class Solution {
    fun stoneGameIII(stoneValue: IntArray): String {
        val n = stoneValue.size
        val dp = IntArray(4)

        for (i in n - 1 downTo 0) {
            var total = 0
            dp[i % 4] = Int.MIN_VALUE
            for (j in i until minOf(i + 3, n)) {
                total += stoneValue[j]
                dp[i % 4] = maxOf(dp[i % 4], total - dp[(j + 1) % 4])
            }
        }

        return when {
            dp[0] == 0 -> "Tie"
            dp[0] > 0 -> "Alice"
            else -> "Bob"
        }
    }
}
```

```swift
class Solution {
    func stoneGameIII(_ stoneValue: [Int]) -> String {
        let n = stoneValue.count
        var dp = [Int](repeating: 0, count: 4)

        for i in stride(from: n - 1, through: 0, by: -1) {
            var total = 0
            dp[i % 4] = Int.min
            for j in i..<min(i + 3, n) {
                total += stoneValue[j]
                dp[i % 4] = max(dp[i % 4], total - dp[(j + 1) % 4])
            }
        }

        if dp[0] == 0 { return "Tie" }
        return dp[0] > 0 ? "Alice" : "Bob"
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
