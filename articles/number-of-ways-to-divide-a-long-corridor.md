## 1. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Space Optimized)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Combinatorics

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Combinatorics (Optimal)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
