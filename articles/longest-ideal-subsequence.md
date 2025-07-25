## 1. Recursion

::tabs-start

```python
class Solution:
    def longestIdealString(self, s: str, k: int) -> int:
        def dfs(i, prev):
            if i == len(s):
                return 0
            skip = dfs(i + 1, prev)
            include = 0
            if prev == "" or abs(ord(s[i]) - ord(prev)) <= k:
                include = 1 + dfs(i + 1, s[i])
            return max(skip, include)

        return dfs(0, "")
```

```java
public class Solution {
    public int longestIdealString(String s, int k) {
        return dfs(0, -1, s, k);
    }

    private int dfs(int i, int prev, String s, int k) {
        if (i == s.length()) {
            return 0;
        }
        int skip = dfs(i + 1, prev, s, k);
        int include = 0;
        if (prev == -1 || Math.abs(s.charAt(i) - prev) <= k) {
            include = 1 + dfs(i + 1, s.charAt(i), s, k);
        }
        return Math.max(skip, include);
    }
}
```

```cpp
class Solution {
public:
    int longestIdealString(string s, int k) {
        return dfs(0, -1, s, k);
    }

private:
    int dfs(int i, int prev, const string &s, int k) {
        if (i == s.size()) {
            return 0;
        }
        int skip = dfs(i + 1, prev, s, k);
        int include = 0;
        if (prev == -1 || abs(s[i] - prev) <= k) {
            include = 1 + dfs(i + 1, s[i], s, k);
        }
        return max(skip, include);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    longestIdealString(s, k) {
        const dfs = (i, prev) => {
            if (i === s.length) {
                return 0;
            }
            const skip = dfs(i + 1, prev);
            let include = 0;
            if (prev === -1 || Math.abs(s.charCodeAt(i) - prev) <= k) {
                include = 1 + dfs(i + 1, s.charCodeAt(i));
            }
            return Math.max(skip, include);
        };

        return dfs(0, -1);
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
    def longestIdealString(self, s: str, k: int) -> int:
        cache = [[-1] * 27 for _ in range(len(s))]

        def dfs(i, prev):
            if i == len(s):
                return 0
            if cache[i][prev + 1] != -1:
                return cache[i][prev + 1]

            skip = dfs(i + 1, prev)
            include = 0
            c = ord(s[i]) - ord('a')
            if prev == -1 or abs(c - prev) <= k:
                include = 1 + dfs(i + 1, c)
            cache[i][prev + 1] = max(skip, include)
            return cache[i][prev + 1]

        return dfs(0, -1)
```

```java
public class Solution {
    private int[][] dp;

    public int longestIdealString(String s, int k) {
        dp = new int[s.length()][27];
        for (int i = 0; i < s.length(); i++) {
            for (int j = 0; j < 27; j++) {
                dp[i][j] = -1;
            }
        }
        return dfs(0, -1, s, k);
    }

    private int dfs(int i, int prev, String s, int k) {
        if (i == s.length()) {
            return 0;
        }
        if (dp[i][prev + 1] != -1) {
            return dp[i][prev + 1];
        }
        int skip = dfs(i + 1, prev, s, k);
        int include = 0;
        if (prev == -1 || Math.abs(s.charAt(i) - ('a' + prev)) <= k) {
            include = 1 + dfs(i + 1, s.charAt(i) - 'a', s, k);
        }
        dp[i][prev + 1] = Math.max(skip, include);
        return Math.max(skip, include);
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int longestIdealString(string s, int k) {
        dp = vector<vector<int>>(s.size(), vector<int>(27, -1));
        return dfs(0, -1, s, k);
    }

private:
    int dfs(int i, int prev, const string &s, int k) {
        if (i == s.size()) {
            return 0;
        }
        if (dp[i][prev + 1] != -1) {
            return dp[i][prev + 1];
        }
        int skip = dfs(i + 1, prev, s, k);
        int include = 0;
        if (prev == -1 || abs(s[i] - ('a' + prev)) <= k) {
            include = 1 + dfs(i + 1, s[i] - 'a', s, k);
        }
        dp[i][prev + 1] = max(skip, include);
        return max(skip, include);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    longestIdealString(s, k) {
        const dp = Array.from({ length: s.length }, () => Array(27).fill(-1));

        const dfs = (i, prev) => {
            if (i === s.length) {
                return 0;
            }
            if (dp[i][prev + 1] !== -1) {
                return dp[i][prev + 1];
            }
            const skip = dfs(i + 1, prev);
            let include = 0;
            if (
                prev === -1 ||
                Math.abs(s.charCodeAt(i) - ('a'.charCodeAt(0) + prev)) <= k
            ) {
                include = 1 + dfs(i + 1, s.charCodeAt(i) - 'a'.charCodeAt(0));
            }
            dp[i][prev + 1] = Math.max(skip, include);
            return Math.max(skip, include);
        };

        return dfs(0, -1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def longestIdealString(self, s: str, k: int) -> int:
        dp = [[0] * 26 for _ in range(len(s) + 1)]

        for i in range(1, len(s) + 1):
            curr = ord(s[i - 1]) - ord('a')
            for prev in range(26):
                dp[i][prev] = max(dp[i][prev], dp[i - 1][prev])
                if abs(curr - prev) <= k:
                    dp[i][curr] = max(dp[i][curr], 1 + dp[i - 1][prev])

        return max(dp[len(s)])
```

```java
public class Solution {
    public int longestIdealString(String s, int k) {
        int n = s.length();
        int[][] dp = new int[n + 1][26];

        for (int i = 1; i <= n; i++) {
            int curr = s.charAt(i - 1) - 'a';
            for (int prev = 0; prev < 26; prev++) {
                dp[i][prev] = Math.max(dp[i][prev], dp[i - 1][prev]);
                if (Math.abs(curr - prev) <= k) {
                    dp[i][curr] = Math.max(dp[i][curr], 1 + dp[i - 1][prev]);
                }
            }
        }

        int max = 0;
        for (int val : dp[n]) {
            max = Math.max(max, val);
        }
        return max;
    }
}
```

```cpp
class Solution {
public:
    int longestIdealString(string s, int k) {
        int n = s.size();
        vector<vector<int>> dp(n + 1, vector<int>(26, 0));

        for (int i = 1; i <= n; i++) {
            int curr = s[i - 1] - 'a';
            for (int prev = 0; prev < 26; prev++) {
                dp[i][prev] = max(dp[i][prev], dp[i - 1][prev]);
                if (abs(curr - prev) <= k) {
                    dp[i][curr] = max(dp[i][curr], 1 + dp[i - 1][prev]);
                }
            }
        }

        return *max_element(dp[n].begin(), dp[n].end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    longestIdealString(s, k) {
        const n = s.length;
        const dp = Array.from({ length: n + 1 }, () => Array(26).fill(0));

        for (let i = 1; i <= n; i++) {
            const curr = s.charCodeAt(i - 1) - 'a'.charCodeAt(0);
            for (let prev = 0; prev < 26; prev++) {
                dp[i][prev] = Math.max(dp[i][prev], dp[i - 1][prev]);
                if (Math.abs(curr - prev) <= k) {
                    dp[i][curr] = Math.max(dp[i][curr], 1 + dp[i - 1][prev]);
                }
            }
        }
        return Math.max(...dp[n]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def longestIdealString(self, s: str, k: int) -> int:
        dp = [0] * 26

        for c in s:
            curr = ord(c) - ord('a')
            longest = 1
            for prev in range(26):
                if abs(curr - prev) <= k:
                    longest = max(longest, 1 + dp[prev])
            dp[curr] = max(dp[curr], longest)

        return max(dp)
```

```java
public class Solution {
    public int longestIdealString(String s, int k) {
        int[] dp = new int[26];

        for (char c : s.toCharArray()) {
            int curr = c - 'a'; // 0-25
            int longest = 1;
            for (int prev = 0; prev < 26; prev++) {
                if (Math.abs(curr - prev) <= k) {
                    longest = Math.max(longest, 1 + dp[prev]);
                }
            }
            dp[curr] = Math.max(dp[curr], longest);
        }

        int max = 0;
        for (int val : dp) {
            max = Math.max(max, val);
        }
        return max;
    }
}
```

```cpp
class Solution {
public:
    int longestIdealString(string s, int k) {
        vector<int> dp(26, 0);

        for (char c : s) {
            int curr = c - 'a';
            int longest = 1;
            for (int prev = 0; prev < 26; prev++) {
                if (abs(curr - prev) <= k) {
                    longest = max(longest, 1 + dp[prev]);
                }
            }
            dp[curr] = max(dp[curr], longest);
        }

        return *max_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    longestIdealString(s, k) {
        const dp = Array(26).fill(0);

        for (const c of s) {
            const curr = c.charCodeAt(0) - 'a'.charCodeAt(0);
            let longest = 1;
            for (let prev = 0; prev < 26; prev++) {
                if (Math.abs(curr - prev) <= k) {
                    longest = Math.max(longest, 1 + dp[prev]);
                }
            }
            dp[curr] = Math.max(dp[curr], longest);
        }

        return Math.max(...dp);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most 26 different characters.
