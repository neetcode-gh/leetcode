## 1. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        dp = {}

        def dfs(i, mono):
            if (i, mono) in dp:
                return dp[(i, mono)]
            if i == len(s):
                return 0

            if mono and s[i] == "0":
                dp[(i, mono)] = min(1 + dfs(i + 1, False), dfs(i + 1, mono))
            elif mono and s[i] == "1":
                dp[(i, mono)] = min(1 + dfs(i + 1, mono), dfs(i + 1, False))
            elif not mono and s[i] == "1":
                dp[(i, mono)] = dfs(i + 1, mono)
            else:
                dp[(i, mono)] = 1 + dfs(i + 1, mono)

            return dp[(i, mono)]

        return dfs(0, True)
```

```java
public class Solution {
    private int[][] dp;

    public int minFlipsMonoIncr(String s) {
        int n = s.length();
        dp = new int[n][2];
        for (int i = 0; i < n; i++) {
            dp[i][0] = dp[i][1] = -1;
        }
        return dfs(0, 1, s);
    }

    private int dfs(int i, int mono, String s) {
        if (i == s.length()) return 0;
        if (dp[i][mono] != -1) return dp[i][mono];

        if (mono == 1 && s.charAt(i) == '0') {
            dp[i][mono] = Math.min(1 + dfs(i + 1, 0, s), dfs(i + 1, mono, s));
        } else if (mono == 1 && s.charAt(i) == '1') {
            dp[i][mono] = Math.min(1 + dfs(i + 1, mono, s), dfs(i + 1, 0, s));
        } else if (mono == 0 && s.charAt(i) == '1') {
            dp[i][mono] = dfs(i + 1, mono, s);
        } else {
            dp[i][mono] = 1 + dfs(i + 1, mono, s);
        }
        return dp[i][mono];
    }
}
```

```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int n = s.length();
        vector<vector<int>> dp(n, vector<int>(2, -1));
        return dfs(0, 1, s, dp);
    }

private:
    int dfs(int i, int mono, const string& s, vector<vector<int>>& dp) {
        if (i == s.length()) return 0;
        if (dp[i][mono] != -1) return dp[i][mono];

        if (mono == 1 && s[i] == '0') {
            dp[i][mono] = min(1 + dfs(i + 1, 0, s, dp), dfs(i + 1, mono, s, dp));
        } else if (mono == 1 && s[i] == '1') {
            dp[i][mono] = min(1 + dfs(i + 1, mono, s, dp), dfs(i + 1, 0, s, dp));
        } else if (mono == 0 && s[i] == '1') {
            dp[i][mono] = dfs(i + 1, mono, s, dp);
        } else {
            dp[i][mono] = 1 + dfs(i + 1, mono, s, dp);
        }
        return dp[i][mono];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlipsMonoIncr(s) {
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(2).fill(-1));

        const dfs = (i, mono) => {
            if (i === n) return 0;
            if (dp[i][mono] !== -1) return dp[i][mono];

            if (mono === 1 && s[i] === '0') {
                dp[i][mono] = Math.min(1 + dfs(i + 1, 0), dfs(i + 1, mono));
            } else if (mono === 1 && s[i] === '1') {
                dp[i][mono] = Math.min(1 + dfs(i + 1, mono), dfs(i + 1, 0));
            } else if (mono === 0 && s[i] === '1') {
                dp[i][mono] = dfs(i + 1, mono);
            } else {
                dp[i][mono] = 1 + dfs(i + 1, mono);
            }
            return dp[i][mono];
        };

        return dfs(0, 1);
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
    def minFlipsMonoIncr(self, s: str) -> int:
        n = len(s)
        dp = [[0] * 2 for _ in range(n + 1)]

        for i in range(n - 1, -1, -1):
            if s[i] == '0':
                dp[i][1] = min(1 + dp[i + 1][0], dp[i + 1][1])
                dp[i][0] = 1 + dp[i + 1][0]
            else:  # s[i] == '1'
                dp[i][1] = min(1 + dp[i + 1][1], dp[i + 1][0])
                dp[i][0] = dp[i + 1][0]

        return dp[0][1]
```

```java
public class Solution {
    public int minFlipsMonoIncr(String s) {
        int n = s.length();
        int[][] dp = new int[n + 1][2];

        for (int i = n - 1; i >= 0; i--) {
            if (s.charAt(i) == '0') {
                dp[i][1] = Math.min(1 + dp[i + 1][0], dp[i + 1][1]);
                dp[i][0] = 1 + dp[i + 1][0];
            } else { // s.charAt(i) == '1'
                dp[i][1] = Math.min(1 + dp[i + 1][1], dp[i + 1][0]);
                dp[i][0] = dp[i + 1][0];
            }
        }

        return dp[0][1];
    }
}
```

```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int n = s.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));

        for (int i = n - 1; i >= 0; i--) {
            if (s[i] == '0') {
                dp[i][1] = min(1 + dp[i + 1][0], dp[i + 1][1]);
                dp[i][0] = 1 + dp[i + 1][0];
            } else { // s[i] == '1'
                dp[i][1] = min(1 + dp[i + 1][1], dp[i + 1][0]);
                dp[i][0] = dp[i + 1][0];
            }
        }

        return dp[0][1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlipsMonoIncr(s) {
        const n = s.length;
        const dp = Array.from({ length: n + 1 }, () => [0, 0]);

        for (let i = n - 1; i >= 0; i--) {
            if (s[i] === '0') {
                dp[i][1] = Math.min(1 + dp[i + 1][0], dp[i + 1][1]);
                dp[i][0] = 1 + dp[i + 1][0];
            } else {
                // s[i] === '1'
                dp[i][1] = Math.min(1 + dp[i + 1][1], dp[i + 1][0]);
                dp[i][0] = dp[i + 1][0];
            }
        }

        return dp[0][1];
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
    def minFlipsMonoIncr(self, s: str) -> int:
        n = len(s)
        dp = [0, 0]

        for i in range(n - 1, -1, -1):
            if s[i] == '0':
                new_dp_1 = min(1 + dp[0], dp[1])
                new_dp_0 = dp[0] + 1
            else:  # s[i] == '1'
                new_dp_1 = min(dp[1] + 1, dp[0])
                new_dp_0 = dp[0]

            dp[1] = new_dp_1
            dp[0] = new_dp_0

        return dp[1]
```

```java
public class Solution {
    public int minFlipsMonoIncr(String s) {
        int[] dp = new int[2];

        for (int i = s.length() - 1; i >= 0; i--) {
            int newDp1, newDp0;
            if (s.charAt(i) == '0') {
                newDp1 = Math.min(1 + dp[0], dp[1]);
                newDp0 = 1 + dp[0];
            } else { // s[i] == '1'
                newDp1 = Math.min(1 + dp[1], dp[0]);
                newDp0 = dp[0];
            }

            dp[1] = newDp1;
            dp[0] = newDp0;
        }

        return dp[1];
    }
}
```

```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        vector<int> dp(2, 0);

        for (int i = s.length() - 1; i >= 0; i--) {
            int newDp1, newDp0;
            if (s[i] == '0') {
                newDp1 = min(1 + dp[0], dp[1]);
                newDp0 = dp[0] + 1;
            } else { // s[i] == '1'
                newDp1 = min(1 + dp[1], dp[0]);
                newDp0 = dp[0];
            }

            dp[1] = newDp1;
            dp[0] = newDp0;
        }

        return dp[1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlipsMonoIncr(s) {
        let dp = [0, 0];

        for (let i = s.length - 1; i >= 0; i--) {
            let newDp1, newDp0;
            if (s[i] === '0') {
                newDp1 = Math.min(1 + dp[0], dp[1]);
                newDp0 = dp[0] + 1;
            } else {
                // s[i] === '1'
                newDp1 = Math.min(1 + dp[1], dp[0]);
                newDp0 = dp[0];
            }

            dp[1] = newDp1;
            dp[0] = newDp0;
        }

        return dp[1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Prefix & Suffix Arrays

::tabs-start

```python
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        n = len(s)
        left_ones = [0] * (n + 1)
        right_zeros = [0] * (n + 1)

        for i in range(n):
            left_ones[i + 1] = left_ones[i] + (1 if s[i] == '1' else 0)

        for i in range(n - 1, -1, -1):
            right_zeros[i] = right_zeros[i + 1] + (1 if s[i] == '0' else 0)

        res = float('inf')
        for i in range(n + 1):
            res = min(res, left_ones[i] + right_zeros[i])

        return res
```

```java
public class Solution {
    public int minFlipsMonoIncr(String s) {
        int n = s.length();
        int[] leftOnes = new int[n + 1];
        int[] rightZeros = new int[n + 1];

        for (int i = 0; i < n; i++) {
            leftOnes[i + 1] = leftOnes[i] + (s.charAt(i) == '1' ? 1 : 0);
        }

        for (int i = n - 1; i >= 0; i--) {
            rightZeros[i] = rightZeros[i + 1] + (s.charAt(i) == '0' ? 1 : 0);
        }

        int res = Integer.MAX_VALUE;
        for (int i = 0; i <= n; i++) {
            res = Math.min(res, leftOnes[i] + rightZeros[i]);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int n = s.size();
        vector<int> leftOnes(n + 1, 0), rightZeros(n + 1, 0);

        for (int i = 0; i < n; i++) {
            leftOnes[i + 1] = leftOnes[i] + (s[i] == '1' ? 1 : 0);
        }

        for (int i = n - 1; i >= 0; i--) {
            rightZeros[i] = rightZeros[i + 1] + (s[i] == '0' ? 1 : 0);
        }

        int res = INT_MAX;
        for (int i = 0; i <= n; i++) {
            res = min(res, leftOnes[i] + rightZeros[i]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlipsMonoIncr(s) {
        const n = s.length;
        const leftOnes = Array(n + 1).fill(0);
        const rightZeros = Array(n + 1).fill(0);

        for (let i = 0; i < n; i++) {
            leftOnes[i + 1] = leftOnes[i] + (s[i] === '1' ? 1 : 0);
        }

        for (let i = n - 1; i >= 0; i--) {
            rightZeros[i] = rightZeros[i + 1] + (s[i] === '0' ? 1 : 0);
        }

        let res = Infinity;
        for (let i = 0; i <= n; i++) {
            res = Math.min(res, leftOnes[i] + rightZeros[i]);
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

## 5. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        res  = cntOne = 0
        for c in s:
            if c == '1':
                cntOne += 1
            else:
                res = min(res + 1, cntOne)
        return res
```

```java
public class Solution {
    public int minFlipsMonoIncr(String s) {
        int res = 0, cntOne = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '1') {
                cntOne++;
            } else {
                res = Math.min(res + 1, cntOne);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int res = 0, cntOne = 0;
        for (char& c : s) {
            if (c == '1') {
                cntOne++;
            } else {
                res = min(res + 1, cntOne);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlipsMonoIncr(s) {
        let res = 0,
            cntOne = 0;
        for (let c of s) {
            if (c === '1') {
                cntOne++;
            } else {
                res = Math.min(res + 1, cntOne);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
