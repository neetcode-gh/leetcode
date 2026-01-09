## 1. Dynamic Programming (Top-Down)

### Intuition

We need to divide the corridor so each section has exactly two seats. The key insight is that after placing two seats in a section, we have a choice: place the divider immediately after the second seat, or delay it through any number of plants. Each plant between the second seat of one section and the first seat of the next section represents a possible divider position.

### Algorithm

1. Define a recursive function `dfs(i, seats)` where `i` is the current index and `seats` counts how many seats are in the current section (0, 1, or 2).
2. Base case: If we reach the end of the corridor, return 1 if we have exactly 2 seats (valid section), otherwise 0.
3. If we already have 2 seats in the current section:
   - If the current position is a seat, we must start a new section (reset seats to 1).
   - If it's a plant, we can either place the divider here (reset to 0) or continue without dividing (keep at 2).
4. If we have fewer than 2 seats, count the seat if present and continue.
5. Use memoization to cache results.

::tabs-start

```python
class Solution:
    def numberOfWays(self, corridor: str) -> int:
        mod = 10**9 + 7
        cache = [[-1] * 3 for i in range(len(corridor))]  # (i, seats) -> count

        def dfs(i, seats):
            if i == len(corridor):
                return 1 if seats == 2 else 0
            if cache[i][seats] != -1:
                return cache[i][seats]

            res = 0
            if seats == 2:
                if corridor[i] == "S":
                    res = dfs(i + 1, 1)
                else:
                    res = (dfs(i + 1, 0) + dfs(i + 1, 2)) % mod
            else:
                if corridor[i] == "S":
                    res = dfs(i + 1, seats + 1)
                else:
                    res = dfs(i + 1, seats)

            cache[i][seats] = res
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;
    private int[][] dp;

    public int numberOfWays(String corridor) {
        int n = corridor.length();
        dp = new int[n][3];
        for (int i = 0; i < n; i++) {
            Arrays.fill(dp[i], -1);
        }
        return dfs(0, 0, corridor);
    }

    private int dfs(int i, int seats, String corridor) {
        if (i == corridor.length()) {
            return seats == 2 ? 1 : 0;
        }
        if (dp[i][seats] != -1) {
            return dp[i][seats];
        }

        int res = 0;
        if (seats == 2) {
            if (corridor.charAt(i) == 'S') {
                res = dfs(i + 1, 1, corridor);
            } else {
                res = (dfs(i + 1, 0, corridor) + dfs(i + 1, 2, corridor)) % MOD;
            }
        } else {
            if (corridor.charAt(i) == 'S') {
                res = dfs(i + 1, seats + 1, corridor);
            } else {
                res = dfs(i + 1, seats, corridor);
            }
        }

        return dp[i][seats] = res;
    }
}
```

```cpp
class Solution {
public:
    static constexpr int MOD = 1'000'000'007;
    vector<vector<int>> dp;

    int numberOfWays(string corridor) {
        int n = corridor.size();
        dp.assign(n, vector<int>(3, -1));
        return dfs(0, 0, corridor);
    }

    int dfs(int i, int seats, string& corridor) {
        if (i == corridor.size()) {
            return seats == 2 ? 1 : 0;
        }
        if (dp[i][seats] != -1) {
            return dp[i][seats];
        }

        int res = 0;
        if (seats == 2) {
            if (corridor[i] == 'S') {
                res = dfs(i + 1, 1, corridor);
            } else {
                res = (dfs(i + 1, 0, corridor) + dfs(i + 1, 2, corridor)) % MOD;
            }
        } else {
            if (corridor[i] == 'S') {
                res = dfs(i + 1, seats + 1, corridor);
            } else {
                res = dfs(i + 1, seats, corridor);
            }
        }

        return dp[i][seats] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} corridor
     * @return {number}
     */
    numberOfWays(corridor) {
        const MOD = 1_000_000_007;
        const n = corridor.length;
        const dp = Array.from({ length: n }, () => Array(3).fill(-1));

        const dfs = (i, seats) => {
            if (i === n) return seats === 2 ? 1 : 0;
            if (dp[i][seats] !== -1) return dp[i][seats];

            let res = 0;
            if (seats === 2) {
                if (corridor[i] === 'S') {
                    res = dfs(i + 1, 1);
                } else {
                    res = (dfs(i + 1, 0) + dfs(i + 1, 2)) % MOD;
                }
            } else {
                if (corridor[i] === 'S') {
                    res = dfs(i + 1, seats + 1);
                } else {
                    res = dfs(i + 1, seats);
                }
            }

            return (dp[i][seats] = res);
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;
    private int[,] dp;

    public int NumberOfWays(string corridor) {
        int n = corridor.Length;
        dp = new int[n, 3];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < 3; j++) {
                dp[i, j] = -1;
            }
        }
        return Dfs(0, 0, corridor);
    }

    private int Dfs(int i, int seats, string corridor) {
        if (i == corridor.Length) {
            return seats == 2 ? 1 : 0;
        }
        if (dp[i, seats] != -1) {
            return dp[i, seats];
        }

        int res = 0;
        if (seats == 2) {
            if (corridor[i] == 'S') {
                res = Dfs(i + 1, 1, corridor);
            } else {
                res = (Dfs(i + 1, 0, corridor) + Dfs(i + 1, 2, corridor)) % MOD;
            }
        } else {
            if (corridor[i] == 'S') {
                res = Dfs(i + 1, seats + 1, corridor);
            } else {
                res = Dfs(i + 1, seats, corridor);
            }
        }

        return dp[i, seats] = res;
    }
}
```

```go
func numberOfWays(corridor string) int {
    MOD := 1_000_000_007
    n := len(corridor)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = []int{-1, -1, -1}
    }

    var dfs func(i, seats int) int
    dfs = func(i, seats int) int {
        if i == n {
            if seats == 2 {
                return 1
            }
            return 0
        }
        if dp[i][seats] != -1 {
            return dp[i][seats]
        }

        res := 0
        if seats == 2 {
            if corridor[i] == 'S' {
                res = dfs(i+1, 1)
            } else {
                res = (dfs(i+1, 0) + dfs(i+1, 2)) % MOD
            }
        } else {
            if corridor[i] == 'S' {
                res = dfs(i+1, seats+1)
            } else {
                res = dfs(i+1, seats)
            }
        }

        dp[i][seats] = res
        return res
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007
    private lateinit var dp: Array<IntArray>

    fun numberOfWays(corridor: String): Int {
        val n = corridor.length
        dp = Array(n) { IntArray(3) { -1 } }
        return dfs(0, 0, corridor)
    }

    private fun dfs(i: Int, seats: Int, corridor: String): Int {
        if (i == corridor.length) {
            return if (seats == 2) 1 else 0
        }
        if (dp[i][seats] != -1) {
            return dp[i][seats]
        }

        val res: Int
        if (seats == 2) {
            res = if (corridor[i] == 'S') {
                dfs(i + 1, 1, corridor)
            } else {
                (dfs(i + 1, 0, corridor) + dfs(i + 1, 2, corridor)) % MOD
            }
        } else {
            res = if (corridor[i] == 'S') {
                dfs(i + 1, seats + 1, corridor)
            } else {
                dfs(i + 1, seats, corridor)
            }
        }

        dp[i][seats] = res
        return res
    }
}
```

```swift
class Solution {
    func numberOfWays(_ corridor: String) -> Int {
        let MOD = 1_000_000_007
        let n = corridor.count
        let chars = Array(corridor)
        var dp = [[Int]](repeating: [-1, -1, -1], count: n)

        func dfs(_ i: Int, _ seats: Int) -> Int {
            if i == n {
                return seats == 2 ? 1 : 0
            }
            if dp[i][seats] != -1 {
                return dp[i][seats]
            }

            var res = 0
            if seats == 2 {
                if chars[i] == "S" {
                    res = dfs(i + 1, 1)
                } else {
                    res = (dfs(i + 1, 0) + dfs(i + 1, 2)) % MOD
                }
            } else {
                if chars[i] == "S" {
                    res = dfs(i + 1, seats + 1)
                } else {
                    res = dfs(i + 1, seats)
                }
            }

            dp[i][seats] = res
            return res
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Bottom-Up)

### Intuition

We can convert the top-down approach to bottom-up by iterating from the end of the corridor to the beginning. For each position, we compute the number of ways based on whether we have 0, 1, or 2 seats in the current section.

### Algorithm

1. Create a DP table where `dp[i][seats]` represents the number of ways to divide from index `i` onward with `seats` seats in the current section.
2. Initialize `dp[n][2] = 1` (reaching the end with exactly 2 seats is one valid way).
3. Iterate backward through the corridor:
   - For each position and seat count, apply the same transitions as the top-down approach.
4. Return `dp[0][0]` (starting from index 0 with 0 seats).

::tabs-start

```python
class Solution:
    def numberOfWays(self, corridor: str) -> int:
        MOD = 1000000007
        n = len(corridor)
        dp = [[0] * 3 for _ in range(n + 1)]
        dp[n][2] = 1

        for i in range(n - 1, -1, -1):
            for seats in range(3):
                if seats == 2:
                    if corridor[i] == 'S':
                        dp[i][seats] = dp[i + 1][1]
                    else:
                        dp[i][seats] = (dp[i + 1][0] + dp[i + 1][2]) % MOD
                else:
                    if corridor[i] == 'S':
                        dp[i][seats] = dp[i + 1][seats + 1]
                    else:
                        dp[i][seats] = dp[i + 1][seats]

        return dp[0][0]
```

```java
public class Solution {
    public int numberOfWays(String corridor) {
        int MOD = 1000000007;
        int n = corridor.length();
        int[][] dp = new int[n + 1][3];
        dp[n][2] = 1;

        for (int i = n - 1; i >= 0; i--) {
            for (int seats = 0; seats < 3; seats++) {
                if (seats == 2) {
                    if (corridor.charAt(i) == 'S') {
                        dp[i][seats] = dp[i + 1][1];
                    } else {
                        dp[i][seats] = (dp[i + 1][0] + dp[i + 1][2]) % MOD;
                    }
                } else {
                    if (corridor.charAt(i) == 'S') {
                        dp[i][seats] = dp[i + 1][seats + 1];
                    } else {
                        dp[i][seats] = dp[i + 1][seats];
                    }
                }
            }
        }
        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    int numberOfWays(string corridor) {
        int MOD = 1000000007;
        int n = corridor.size();
        vector<vector<int>> dp(n + 1, vector<int>(3, 0));
        dp[n][2] = 1;

        for (int i = n - 1; i >= 0; i--) {
            for (int seats = 0; seats < 3; seats++) {
                if (seats == 2) {
                    if (corridor[i] == 'S') {
                        dp[i][seats] = dp[i + 1][1];
                    } else {
                        dp[i][seats] = (dp[i + 1][0] + dp[i + 1][2]) % MOD;
                    }
                } else {
                    if (corridor[i] == 'S') {
                        dp[i][seats] = dp[i + 1][seats + 1];
                    } else {
                        dp[i][seats] = dp[i + 1][seats];
                    }
                }
            }
        }
        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} corridor
     * @return {number}
     */
    numberOfWays(corridor) {
        const MOD = 1000000007;
        const n = corridor.length;
        let dp = Array.from({ length: n + 1 }, () => Array(3).fill(0));
        dp[n][2] = 1;

        for (let i = n - 1; i >= 0; i--) {
            for (let seats = 0; seats < 3; seats++) {
                if (seats === 2) {
                    if (corridor[i] === 'S') {
                        dp[i][seats] = dp[i + 1][1];
                    } else {
                        dp[i][seats] = (dp[i + 1][0] + dp[i + 1][2]) % MOD;
                    }
                } else {
                    if (corridor[i] === 'S') {
                        dp[i][seats] = dp[i + 1][seats + 1];
                    } else {
                        dp[i][seats] = dp[i + 1][seats];
                    }
                }
            }
        }
        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int NumberOfWays(string corridor) {
        int MOD = 1000000007;
        int n = corridor.Length;
        int[,] dp = new int[n + 1, 3];
        dp[n, 2] = 1;

        for (int i = n - 1; i >= 0; i--) {
            for (int seats = 0; seats < 3; seats++) {
                if (seats == 2) {
                    if (corridor[i] == 'S') {
                        dp[i, seats] = dp[i + 1, 1];
                    } else {
                        dp[i, seats] = (dp[i + 1, 0] + dp[i + 1, 2]) % MOD;
                    }
                } else {
                    if (corridor[i] == 'S') {
                        dp[i, seats] = dp[i + 1, seats + 1];
                    } else {
                        dp[i, seats] = dp[i + 1, seats];
                    }
                }
            }
        }
        return dp[0, 0];
    }
}
```

```go
func numberOfWays(corridor string) int {
    MOD := 1000000007
    n := len(corridor)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, 3)
    }
    dp[n][2] = 1

    for i := n - 1; i >= 0; i-- {
        for seats := 0; seats < 3; seats++ {
            if seats == 2 {
                if corridor[i] == 'S' {
                    dp[i][seats] = dp[i+1][1]
                } else {
                    dp[i][seats] = (dp[i+1][0] + dp[i+1][2]) % MOD
                }
            } else {
                if corridor[i] == 'S' {
                    dp[i][seats] = dp[i+1][seats+1]
                } else {
                    dp[i][seats] = dp[i+1][seats]
                }
            }
        }
    }
    return dp[0][0]
}
```

```kotlin
class Solution {
    fun numberOfWays(corridor: String): Int {
        val MOD = 1000000007
        val n = corridor.length
        val dp = Array(n + 1) { IntArray(3) }
        dp[n][2] = 1

        for (i in n - 1 downTo 0) {
            for (seats in 0 until 3) {
                if (seats == 2) {
                    if (corridor[i] == 'S') {
                        dp[i][seats] = dp[i + 1][1]
                    } else {
                        dp[i][seats] = (dp[i + 1][0] + dp[i + 1][2]) % MOD
                    }
                } else {
                    if (corridor[i] == 'S') {
                        dp[i][seats] = dp[i + 1][seats + 1]
                    } else {
                        dp[i][seats] = dp[i + 1][seats]
                    }
                }
            }
        }
        return dp[0][0]
    }
}
```

```swift
class Solution {
    func numberOfWays(_ corridor: String) -> Int {
        let MOD = 1000000007
        let n = corridor.count
        let chars = Array(corridor)
        var dp = [[Int]](repeating: [0, 0, 0], count: n + 1)
        dp[n][2] = 1

        for i in stride(from: n - 1, through: 0, by: -1) {
            for seats in 0..<3 {
                if seats == 2 {
                    if chars[i] == "S" {
                        dp[i][seats] = dp[i + 1][1]
                    } else {
                        dp[i][seats] = (dp[i + 1][0] + dp[i + 1][2]) % MOD
                    }
                } else {
                    if chars[i] == "S" {
                        dp[i][seats] = dp[i + 1][seats + 1]
                    } else {
                        dp[i][seats] = dp[i + 1][seats]
                    }
                }
            }
        }
        return dp[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Space Optimized)

### Intuition

Since each row of the DP table only depends on the next row, we can reduce space by maintaining just a single array of size 3 (for the three possible seat counts).

### Algorithm

1. Initialize a DP array of size 3 with `dp[2] = 1`.
2. Iterate backward through the corridor:
   - Create a new DP array and compute transitions based on whether the current position is a seat or plant.
   - Replace the old DP array with the new one.
3. Return `dp[0]`.

::tabs-start

```python
class Solution:
    def numberOfWays(self, corridor: str) -> int:
        MOD = 1000000007
        dp = [0, 0, 1]

        for i in reversed(corridor):
            new_dp = [0] * 3
            for seats in range(3):
                if seats == 2:
                    new_dp[seats] = dp[1] if i == 'S' else (dp[0] + dp[2]) % MOD
                else:
                    new_dp[seats] = dp[seats + 1] if i == 'S' else dp[seats]
            dp = new_dp

        return dp[0]
```

```java
public class Solution {
    public int numberOfWays(String corridor) {
        int MOD = 1000000007;
        int[] dp = {0, 0, 1};

        for (int i = corridor.length() - 1; i >= 0; i--) {
            int[] new_dp = new int[3];
            for (int seats = 0; seats < 3; seats++) {
                if (seats == 2) {
                    new_dp[seats] = corridor.charAt(i) == 'S' ? dp[1] : (dp[0] + dp[2]) % MOD;
                } else {
                    new_dp[seats] = corridor.charAt(i) == 'S' ? dp[seats + 1] : dp[seats];
                }
            }
            dp = new_dp;
        }
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int numberOfWays(string corridor) {
        const int MOD = 1000000007;
        vector<int> dp = {0, 0, 1};

        for (int i = corridor.length() - 1; i >= 0; i--) {
            vector<int> new_dp(3, 0);
            for (int seats = 0; seats < 3; seats++) {
                if (seats == 2) {
                    new_dp[seats] = (corridor[i] == 'S') ? dp[1] : (dp[0] + dp[2]) % MOD;
                } else {
                    new_dp[seats] = (corridor[i] == 'S') ? dp[seats + 1] : dp[seats];
                }
            }
            dp = new_dp;
        }
        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} corridor
     * @return {number}
     */
    numberOfWays(corridor) {
        const MOD = 1000000007;
        let dp = [0, 0, 1];

        for (let i = corridor.length - 1; i >= 0; i--) {
            let new_dp = [0, 0, 0];
            for (let seats = 0; seats < 3; seats++) {
                if (seats === 2) {
                    new_dp[seats] =
                        corridor[i] === 'S' ? dp[1] : (dp[0] + dp[2]) % MOD;
                } else {
                    new_dp[seats] =
                        corridor[i] === 'S' ? dp[seats + 1] : dp[seats];
                }
            }
            dp = new_dp;
        }
        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int NumberOfWays(string corridor) {
        int MOD = 1000000007;
        int[] dp = { 0, 0, 1 };

        for (int i = corridor.Length - 1; i >= 0; i--) {
            int[] new_dp = new int[3];
            for (int seats = 0; seats < 3; seats++) {
                if (seats == 2) {
                    new_dp[seats] = corridor[i] == 'S' ? dp[1] : (dp[0] + dp[2]) % MOD;
                } else {
                    new_dp[seats] = corridor[i] == 'S' ? dp[seats + 1] : dp[seats];
                }
            }
            dp = new_dp;
        }
        return dp[0];
    }
}
```

```go
func numberOfWays(corridor string) int {
    MOD := 1000000007
    dp := []int{0, 0, 1}

    for i := len(corridor) - 1; i >= 0; i-- {
        newDp := make([]int, 3)
        for seats := 0; seats < 3; seats++ {
            if seats == 2 {
                if corridor[i] == 'S' {
                    newDp[seats] = dp[1]
                } else {
                    newDp[seats] = (dp[0] + dp[2]) % MOD
                }
            } else {
                if corridor[i] == 'S' {
                    newDp[seats] = dp[seats+1]
                } else {
                    newDp[seats] = dp[seats]
                }
            }
        }
        dp = newDp
    }
    return dp[0]
}
```

```kotlin
class Solution {
    fun numberOfWays(corridor: String): Int {
        val MOD = 1000000007
        var dp = intArrayOf(0, 0, 1)

        for (i in corridor.length - 1 downTo 0) {
            val newDp = IntArray(3)
            for (seats in 0 until 3) {
                if (seats == 2) {
                    newDp[seats] = if (corridor[i] == 'S') dp[1] else (dp[0] + dp[2]) % MOD
                } else {
                    newDp[seats] = if (corridor[i] == 'S') dp[seats + 1] else dp[seats]
                }
            }
            dp = newDp
        }
        return dp[0]
    }
}
```

```swift
class Solution {
    func numberOfWays(_ corridor: String) -> Int {
        let MOD = 1000000007
        let chars = Array(corridor)
        var dp = [0, 0, 1]

        for i in stride(from: chars.count - 1, through: 0, by: -1) {
            var newDp = [0, 0, 0]
            for seats in 0..<3 {
                if seats == 2 {
                    newDp[seats] = chars[i] == "S" ? dp[1] : (dp[0] + dp[2]) % MOD
                } else {
                    newDp[seats] = chars[i] == "S" ? dp[seats + 1] : dp[seats]
                }
            }
            dp = newDp
        }
        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Combinatorics

### Intuition

Instead of DP, we can think combinatorially. First, collect all seat positions. If the count isn't even or is less than 2, there's no valid way. Otherwise, between every pair of seats (the 2nd and 3rd, 4th and 5th, etc.), we can place the divider at any position including those occupied by plants. The number of choices at each gap is the distance between consecutive pairs of seats.

### Algorithm

1. Collect the indices of all seats in a list.
2. If the seat count is less than 2 or odd, return 0.
3. For every pair of adjacent seat groups (positions 1 and 2, positions 3 and 4, etc.), multiply the result by the gap size `seats[i+1] - seats[i]`.
4. Return the result modulo 10^9 + 7.

::tabs-start

```python
class Solution:
    def numberOfWays(self, corridor: str) -> int:
        mod = 10**9 + 7
        seats = [i for i, c in enumerate(corridor) if c == "S"]

        length = len(seats)
        if length < 2 or length % 2 == 1:
            return 0

        res = 1
        for i in range(1, length - 1, 2):
            res = (res * (seats[i + 1] - seats[i])) % mod

        return res
```

```java
public class Solution {
    public int numberOfWays(String corridor) {
        int mod = 1_000_000_007;
        List<Integer> seats = new ArrayList<>();

        for (int i = 0; i < corridor.length(); i++) {
            if (corridor.charAt(i) == 'S') {
                seats.add(i);
            }
        }

        int length = seats.size();
        if (length < 2 || length % 2 == 1) {
            return 0;
        }

        long res = 1;
        for (int i = 1; i < length - 1; i += 2) {
            res = (res * (seats.get(i + 1) - seats.get(i))) % mod;
        }

        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int numberOfWays(string corridor) {
        int mod = 1'000'000'007;
        vector<int> seats;

        for (int i = 0; i < corridor.size(); i++) {
            if (corridor[i] == 'S') {
                seats.push_back(i);
            }
        }

        int length = seats.size();
        if (length < 2 || length % 2 == 1) {
            return 0;
        }

        long long res = 1;
        for (int i = 1; i < length - 1; i += 2) {
            res = (res * (seats[i + 1] - seats[i])) % mod;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} corridor
     * @return {number}
     */
    numberOfWays(corridor) {
        const mod = 1_000_000_007;
        const seats = [];

        for (let i = 0; i < corridor.length; i++) {
            if (corridor[i] === 'S') {
                seats.push(i);
            }
        }

        const length = seats.length;
        if (length < 2 || length % 2 === 1) {
            return 0;
        }

        let res = 1;
        for (let i = 1; i < length - 1; i += 2) {
            res = (res * (seats[i + 1] - seats[i])) % mod;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumberOfWays(string corridor) {
        int mod = 1_000_000_007;
        var seats = new List<int>();

        for (int i = 0; i < corridor.Length; i++) {
            if (corridor[i] == 'S') {
                seats.Add(i);
            }
        }

        int length = seats.Count;
        if (length < 2 || length % 2 == 1) {
            return 0;
        }

        long res = 1;
        for (int i = 1; i < length - 1; i += 2) {
            res = (res * (seats[i + 1] - seats[i])) % mod;
        }

        return (int)res;
    }
}
```

```go
func numberOfWays(corridor string) int {
    mod := 1_000_000_007
    seats := []int{}

    for i := 0; i < len(corridor); i++ {
        if corridor[i] == 'S' {
            seats = append(seats, i)
        }
    }

    length := len(seats)
    if length < 2 || length%2 == 1 {
        return 0
    }

    res := 1
    for i := 1; i < length-1; i += 2 {
        res = (res * (seats[i+1] - seats[i])) % mod
    }

    return res
}
```

```kotlin
class Solution {
    fun numberOfWays(corridor: String): Int {
        val mod = 1_000_000_007
        val seats = mutableListOf<Int>()

        for (i in corridor.indices) {
            if (corridor[i] == 'S') {
                seats.add(i)
            }
        }

        val length = seats.size
        if (length < 2 || length % 2 == 1) {
            return 0
        }

        var res = 1L
        for (i in 1 until length - 1 step 2) {
            res = (res * (seats[i + 1] - seats[i])) % mod
        }

        return res.toInt()
    }
}
```

```swift
class Solution {
    func numberOfWays(_ corridor: String) -> Int {
        let mod = 1_000_000_007
        var seats = [Int]()
        let chars = Array(corridor)

        for i in 0..<chars.count {
            if chars[i] == "S" {
                seats.append(i)
            }
        }

        let length = seats.count
        if length < 2 || length % 2 == 1 {
            return 0
        }

        var res = 1
        for i in stride(from: 1, to: length - 1, by: 2) {
            res = (res * (seats[i + 1] - seats[i])) % mod
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Combinatorics (Optimal)

### Intuition

We can optimize the combinatorics approach by not storing all seat positions. Instead, we track the count of seats and the position of the previous seat. Whenever we complete a pair (seat count becomes even and greater than 2), we multiply by the gap between the current seat and the previous one.

### Algorithm

1. Initialize `count = 0`, `res = 1`, and `prev = -1` to track the position of the last seat.
2. Iterate through the corridor:
   - When a seat is found, increment the count.
   - If the count is greater than 2 and odd (meaning we just started a new section), multiply `res` by the distance from the previous seat.
   - Update `prev` to the current position.
3. If the count is at least 2 and even, return `res`; otherwise return 0.

::tabs-start

```python
class Solution:
    def numberOfWays(self, corridor: str) -> int:
        mod = 1_000_000_007
        count = 0
        res = 1
        prev = -1

        for i, c in enumerate(corridor):
            if c == 'S':
                count += 1
                if count > 2 and count % 2 == 1:
                    res = (res * (i - prev)) % mod
                prev = i

        return res if count >= 2 and count % 2 == 0 else 0
```

```java
public class Solution {
    public int numberOfWays(String corridor) {
        int mod = 1_000_000_007;
        int count = 0, res = 1, prev = -1;

        for (int i = 0; i < corridor.length(); i++) {
            if (corridor.charAt(i) == 'S') {
                count++;
                if (count > 2 && count % 2 == 1) {
                    res = (int)((res * (long)(i - prev)) % mod);
                }
                prev = i;
            }
        }

        return (count >= 2 && count % 2 == 0) ? res : 0;
    }
}
```

```cpp
class Solution {
public:
    int numberOfWays(string corridor) {
        int mod = 1'000'000'007, count = 0, res = 1, prev = -1;

        for (int i = 0; i < corridor.size(); i++) {
            if (corridor[i] == 'S') {
                count++;
                if (count > 2 && count % 2 == 1) {
                    res = (1LL * res * (i - prev)) % mod;
                }
                prev = i;
            }
        }

        return (count >= 2 && count % 2 == 0) ? res : 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} corridor
     * @return {number}
     */
    numberOfWays(corridor) {
        const mod = 1_000_000_007;
        let count = 0,
            res = 1,
            prev = -1;

        for (let i = 0; i < corridor.length; i++) {
            if (corridor[i] === 'S') {
                count++;
                if (count > 2 && count % 2 === 1) {
                    res = (res * (i - prev)) % mod;
                }
                prev = i;
            }
        }

        return count >= 2 && count % 2 === 0 ? res : 0;
    }
}
```

```csharp
public class Solution {
    public int NumberOfWays(string corridor) {
        int mod = 1_000_000_007;
        int count = 0, prev = -1;
        long res = 1;

        for (int i = 0; i < corridor.Length; i++) {
            if (corridor[i] == 'S') {
                count++;
                if (count > 2 && count % 2 == 1) {
                    res = (res * (i - prev)) % mod;
                }
                prev = i;
            }
        }

        return (count >= 2 && count % 2 == 0) ? (int)res : 0;
    }
}
```

```go
func numberOfWays(corridor string) int {
    mod := 1_000_000_007
    count, res, prev := 0, 1, -1

    for i := 0; i < len(corridor); i++ {
        if corridor[i] == 'S' {
            count++
            if count > 2 && count%2 == 1 {
                res = (res * (i - prev)) % mod
            }
            prev = i
        }
    }

    if count >= 2 && count%2 == 0 {
        return res
    }
    return 0
}
```

```kotlin
class Solution {
    fun numberOfWays(corridor: String): Int {
        val mod = 1_000_000_007
        var count = 0
        var res = 1L
        var prev = -1

        for (i in corridor.indices) {
            if (corridor[i] == 'S') {
                count++
                if (count > 2 && count % 2 == 1) {
                    res = (res * (i - prev)) % mod
                }
                prev = i
            }
        }

        return if (count >= 2 && count % 2 == 0) res.toInt() else 0
    }
}
```

```swift
class Solution {
    func numberOfWays(_ corridor: String) -> Int {
        let mod = 1_000_000_007
        var count = 0
        var res = 1
        var prev = -1
        let chars = Array(corridor)

        for i in 0..<chars.count {
            if chars[i] == "S" {
                count += 1
                if count > 2 && count % 2 == 1 {
                    res = (res * (i - prev)) % mod
                }
                prev = i
            }
        }

        return (count >= 2 && count % 2 == 0) ? res : 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
