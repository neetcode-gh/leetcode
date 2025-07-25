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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
