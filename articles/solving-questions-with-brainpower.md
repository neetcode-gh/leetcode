## 1. Recursion

::tabs-start

```python
class Solution:
    def mostPoints(self, questions: List[List[int]]) -> int:
        def dfs(i):
            if i >= len(questions):
                return 0
            return max(dfs(i + 1), questions[i][0] + dfs(i + 1 + questions[i][1]))
        return dfs(0)
```

```java
public class Solution {
    public long mostPoints(int[][] questions) {
        return dfs(0, questions);
    }

    private long dfs(int i, int[][] questions) {
        if (i >= questions.length) return 0;
        return Math.max(dfs(i + 1, questions), questions[i][0] + dfs(i + 1 + questions[i][1], questions));
    }
}
```

```cpp
class Solution {
public:
    long long mostPoints(vector<vector<int>>& questions) {
        return dfs(0, questions);
    }

private:
    long long dfs(int i, vector<vector<int>>& questions) {
        if (i >= questions.size()) return 0;
        return max(dfs(i + 1, questions), questions[i][0] + dfs(i + 1 + questions[i][1], questions));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} questions
     * @return {number}
     */
    mostPoints(questions) {
        const dfs = (i) => {
            if (i >= questions.length) return 0;
            return Math.max(
                dfs(i + 1),
                questions[i][0] + dfs(i + 1 + questions[i][1]),
            );
        };
        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def mostPoints(self, questions: List[List[int]]) -> int:
        dp = {}
        def dfs(i):
            if i >= len(questions):
                return 0
            if i in dp:
                return dp[i]
            dp[i] = max(dfs(i + 1), questions[i][0] + dfs(i + 1 + questions[i][1]))
            return dp[i]
        return dfs(0)
```

```java
public class Solution {
    private long[] dp;

    public long mostPoints(int[][] questions) {
        dp = new long[questions.length];
        return dfs(0, questions);
    }

    private long dfs(int i, int[][] questions) {
        if (i >= questions.length) return 0;
        if (dp[i] != 0) return dp[i];
        dp[i] = Math.max(dfs(i + 1, questions), questions[i][0] + dfs(i + 1 + questions[i][1], questions));
        return dp[i];
    }
}

```

```cpp
class Solution {
    vector<long long> dp;

public:
    long long mostPoints(vector<vector<int>>& questions) {
        dp.assign(questions.size(), 0);
        return dfs(0, questions);
    }

private:
    long long dfs(int i, vector<vector<int>>& questions) {
        if (i >= questions.size()) return 0;
        if (dp[i] != 0) return dp[i];
        dp[i] = max(dfs(i + 1, questions), questions[i][0] + dfs(i + 1 + questions[i][1], questions));
        return dp[i];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} questions
     * @return {number}
     */
    mostPoints(questions) {
        const dp = new Array(questions.length).fill(-1);

        const dfs = (i) => {
            if (i >= questions.length) return 0;
            if (dp[i] !== -1) return dp[i];
            dp[i] = Math.max(
                dfs(i + 1),
                questions[i][0] + dfs(i + 1 + questions[i][1]),
            );
            return dp[i];
        };

        return dfs(0);
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
    def mostPoints(self, questions: List[List[int]]) -> int:
        dp = {}

        for i in range(len(questions) - 1, -1, -1):
            dp[i] = max(
                questions[i][0] + dp.get(i + 1 + questions[i][1], 0),
                dp.get(i + 1, 0)
            )
        return dp.get(0)
```

```java
public class Solution {
    public long mostPoints(int[][] questions) {
        int n = questions.length;
        long[] dp = new long[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = Math.max(
                questions[i][0] + (i + 1 + questions[i][1] < n ? dp[i + 1 + questions[i][1]] : 0),
                dp[i + 1]
            );
        }
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    long long mostPoints(vector<vector<int>>& questions) {
        int n = questions.size();
        vector<long long> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = max(
                (long long)questions[i][0] + (i + 1 + questions[i][1] < n ? dp[i + 1 + questions[i][1]] : 0),
                dp[i + 1]
            );
        }
        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} questions
     * @return {number}
     */
    mostPoints(questions) {
        const n = questions.length;
        const dp = new Array(n + 1).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = Math.max(
                questions[i][0] +
                    (i + 1 + questions[i][1] < n
                        ? dp[i + 1 + questions[i][1]]
                        : 0),
                dp[i + 1],
            );
        }
        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
