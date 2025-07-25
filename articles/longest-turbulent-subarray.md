## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxTurbulenceSize(self, arr: List[int]) -> int:
        n = len(arr)
        res = 1

        for i in range(n - 1):
            if arr[i] == arr[i + 1]:
                continue

            sign = 1 if arr[i] > arr[i + 1] else 0
            j = i + 1
            while j < n - 1:
                if arr[j] == arr[j + 1]:
                    break
                curSign = 1 if arr[j] > arr[j + 1] else 0
                if sign == curSign:
                    break
                sign = curSign
                j += 1

            res = max(res, j - i + 1)

        return res
```

```java
public class Solution {
    public int maxTurbulenceSize(int[] arr) {
        int n = arr.length;
        int res = 1;

        for (int i = 0; i < n - 1; i++) {
            if (arr[i] == arr[i + 1]) continue;

            int sign = arr[i] > arr[i + 1] ? 1 : 0;
            int j = i + 1;

            while (j < n - 1) {
                if (arr[j] == arr[j + 1]) break;

                int curSign = arr[j] > arr[j + 1] ? 1 : 0;
                if (sign == curSign) break;

                sign = curSign;
                j++;
            }

            res = Math.max(res, j - i + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxTurbulenceSize(vector<int>& arr) {
        int n = arr.size();
        int res = 1;

        for (int i = 0; i < n - 1; i++) {
            if (arr[i] == arr[i + 1]) continue;

            int sign = arr[i] > arr[i + 1] ? 1 : 0;
            int j = i + 1;

            while (j < n - 1) {
                if (arr[j] == arr[j + 1]) break;

                int curSign = arr[j] > arr[j + 1] ? 1 : 0;
                if (sign == curSign) break;

                sign = curSign;
                j++;
            }

            res = max(res, j - i + 1);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    maxTurbulenceSize(arr) {
        const n = arr.length;
        let res = 1;

        for (let i = 0; i < n - 1; i++) {
            if (arr[i] === arr[i + 1]) continue;

            let sign = arr[i] > arr[i + 1] ? 1 : 0;
            let j = i + 1;

            while (j < n - 1) {
                if (arr[j] === arr[j + 1]) break;

                let curSign = arr[j] > arr[j + 1] ? 1 : 0;
                if (sign === curSign) break;

                sign = curSign;
                j++;
            }

            res = Math.max(res, j - i + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxTurbulenceSize(int[] arr) {
        int n = arr.Length;
        int res = 1;

        for (int i = 0; i < n - 1; i++) {
            if (arr[i] == arr[i + 1]) continue;

            int sign = arr[i] > arr[i + 1] ? 1 : 0;
            int j = i + 1;

            while (j < n - 1) {
                if (arr[j] == arr[j + 1]) break;

                int curSign = arr[j] > arr[j + 1] ? 1 : 0;
                if (sign == curSign) break;

                sign = curSign;
                j++;
            }

            res = Math.Max(res, j - i + 1);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def maxTurbulenceSize(self, arr: List[int]) -> int:
        n = len(arr)
        memo = {}

        def dfs(i, sign):
            if i == n - 1:
                return 1
            if (i, sign) in memo:
                return memo[(i, sign)]

            res = 1
            if ((sign and arr[i] > arr[i + 1]) or
                (not sign and arr[i] < arr[i + 1])
            ):
                res = 1 + dfs(i + 1, not sign)

            memo[(i, sign)] = res
            return res

        max_len = 1
        for i in range(n):
            max_len = max(max_len, dfs(i, True), dfs(i, False))

        return max_len
```

```java
public class Solution {
    private int[][] memo;

    public int maxTurbulenceSize(int[] arr) {
        int n = arr.length;
        memo = new int[n][2];

        for (int i = 0; i < n; i++) {
            memo[i][0] = -1;
            memo[i][1] = -1;
        }

        int maxLen = 1;
        for (int i = 0; i < n; i++) {
            maxLen = Math.max(maxLen, dfs(i, true, arr));
            maxLen = Math.max(maxLen, dfs(i, false, arr));
        }

        return maxLen;
    }

    private int dfs(int i, boolean sign, int[] arr) {
        int signIndex = sign ? 1 : 0;
        if (i == arr.length - 1) return 1;
        if (memo[i][signIndex] != -1) {
            return memo[i][signIndex];
        }

        int res = 1;
        if ((sign && arr[i] > arr[i + 1]) ||
            (!sign && arr[i] < arr[i + 1])) {
            res = 1 + dfs(i + 1, !sign, arr);
        }

        memo[i][signIndex] = res;
        return res;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> memo;

public:
    int maxTurbulenceSize(vector<int>& arr) {
        int n = arr.size();
        memo.assign(n, vector<int>(2, -1));

        int maxLen = 1;
        for (int i = 0; i < n; i++) {
            maxLen = max(maxLen, dfs(i, true, arr));
            maxLen = max(maxLen, dfs(i, false, arr));
        }

        return maxLen;
    }

    int dfs(int i, bool sign, vector<int>& arr) {
        int signIndex = sign ? 1 : 0;
        if (i == arr.size() - 1) return 1;
        if (memo[i][signIndex] != -1) {
            return memo[i][signIndex];
        }

        int res = 1;
        if ((sign && arr[i] > arr[i + 1]) ||
            (!sign && arr[i] < arr[i + 1])) {
            res = 1 + dfs(i + 1, !sign, arr);
        }

        memo[i][signIndex] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    maxTurbulenceSize(arr) {
        const n = arr.length;
        const memo = Array.from({ length: n }, () => [-1, -1]);

        const dfs = (i, sign) => {
            const signIndex = sign ? 1 : 0;
            if (i === n - 1) return 1;
            if (memo[i][signIndex] !== -1) {
                return memo[i][signIndex];
            }

            let res = 1;
            if (
                (sign && arr[i] > arr[i + 1]) ||
                (!sign && arr[i] < arr[i + 1])
            ) {
                res = 1 + dfs(i + 1, !sign);
            }

            memo[i][signIndex] = res;
            return res;
        };

        let maxLen = 1;
        for (let i = 0; i < n; i++) {
            maxLen = Math.max(maxLen, dfs(i, true), dfs(i, false));
        }

        return maxLen;
    }
}
```

```csharp
public class Solution {
    private int[] arr;
    private int n;
    private Dictionary<(int, bool), int> memo;

    public int MaxTurbulenceSize(int[] arr) {
        this.arr = arr;
        this.n = arr.Length;
        this.memo = new Dictionary<(int, bool), int>();

        int maxLen = 1;
        for (int i = 0; i < n; i++) {
            maxLen = Math.Max(maxLen, Dfs(i, true));
            maxLen = Math.Max(maxLen, Dfs(i, false));
        }

        return maxLen;
    }

    private int Dfs(int i, bool sign) {
        if (i == n - 1) return 1;
        if (memo.ContainsKey((i, sign))) return memo[(i, sign)];

        int res = 1;
        if ((sign && arr[i] > arr[i + 1]) || (!sign && arr[i] < arr[i + 1])) {
            res = 1 + Dfs(i + 1, !sign);
        }

        memo[(i, sign)] = res;
        return res;
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
    def maxTurbulenceSize(self, arr: List[int]) -> int:
        n = len(arr)
        if n == 1:
            return 1

        dp = [[1] * 2 for _ in range(n)]

        max_len = 1
        for i in range(1, n):
            if arr[i] > arr[i - 1]:
                dp[i][1] = dp[i - 1][0] + 1
            elif arr[i] < arr[i - 1]:
                dp[i][0] = dp[i - 1][1] + 1

            max_len = max(max_len, dp[i][0], dp[i][1])

        return max_len
```

```java
public class Solution {
    public int maxTurbulenceSize(int[] arr) {
        int n = arr.length;
        if (n == 1) return 1;

        int[][] dp = new int[n][2];
        for (int i = 0; i < n; i++) {
            dp[i][0] = dp[i][1] = 1;
        }

        int maxLen = 1;
        for (int i = 1; i < n; i++) {
            if (arr[i] > arr[i - 1]) {
                dp[i][1] = dp[i - 1][0] + 1;
            } else if (arr[i] < arr[i - 1]) {
                dp[i][0] = dp[i - 1][1] + 1;
            }
            maxLen = Math.max(maxLen, dp[i][0]);
            maxLen = Math.max(maxLen, dp[i][1]);
        }

        return maxLen;
    }
}
```

```cpp
class Solution {
public:
    int maxTurbulenceSize(vector<int>& arr) {
        int n = arr.size();
        if (n == 1) return 1;

        vector<vector<int>> dp(n, vector<int>(2, 1));
        int maxLen = 1;

        for (int i = 1; i < n; ++i) {
            if (arr[i] > arr[i - 1]) {
                dp[i][1] = dp[i - 1][0] + 1;
            } else if (arr[i] < arr[i - 1]) {
                dp[i][0] = dp[i - 1][1] + 1;
            }
            maxLen = max(maxLen, max(dp[i][0], dp[i][1]));
        }

        return maxLen;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    maxTurbulenceSize(arr) {
        const n = arr.length;
        if (n === 1) return 1;

        const dp = Array.from({ length: n }, () => [1, 1]);

        let maxLen = 1;
        for (let i = 1; i < n; i++) {
            if (arr[i] > arr[i - 1]) {
                dp[i][1] = dp[i - 1][0] + 1;
            } else if (arr[i] < arr[i - 1]) {
                dp[i][0] = dp[i - 1][1] + 1;
            }
            maxLen = Math.max(maxLen, dp[i][0], dp[i][1]);
        }

        return maxLen;
    }
}
```

```csharp
public class Solution {
    public int MaxTurbulenceSize(int[] arr) {
        int n = arr.Length;
        if (n == 1) return 1;

        int[,] dp = new int[n, 2];
        for (int i = 0; i < n; i++) {
            dp[i, 0] = 1;
            dp[i, 1] = 1;
        }

        int maxLen = 1;
        for (int i = 1; i < n; i++) {
            if (arr[i] > arr[i - 1]) {
                dp[i, 1] = dp[i - 1, 0] + 1;
            } else if (arr[i] < arr[i - 1]) {
                dp[i, 0] = dp[i - 1, 1] + 1;
            }

            maxLen = Math.Max(maxLen, Math.Max(dp[i, 0], dp[i, 1]));
        }

        return maxLen;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Sliding Window

::tabs-start

```python
class Solution:
    def maxTurbulenceSize(self, arr: List[int]) -> int:
        l, r, res, prev = 0, 1, 1, ""

        while r < len(arr):
            if arr[r - 1] > arr[r] and prev != ">":
                res = max(res, r - l + 1)
                r += 1
                prev = ">"
            elif arr[r - 1] < arr[r] and prev != "<":
                res = max(res, r - l + 1)
                r += 1
                prev = "<"
            else:
                r = r + 1 if arr[r] == arr[r - 1] else r
                l = r - 1
                prev = ""

        return res
```

```java
public class Solution {
    public int maxTurbulenceSize(int[] arr) {
        int l = 0, r = 1, res = 1;
        String prev = "";

        while (r < arr.length) {
            if (arr[r - 1] > arr[r] && !">".equals(prev)) {
                res = Math.max(res, r - l + 1);
                r++;
                prev = ">";
            } else if (arr[r - 1] < arr[r] && !"<".equals(prev)) {
                res = Math.max(res, r - l + 1);
                r++;
                prev = "<";
            } else {
                r = (arr[r] == arr[r - 1]) ? r + 1 : r;
                l = r - 1;
                prev = "";
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxTurbulenceSize(vector<int>& arr) {
        int l = 0, r = 1, res = 1;
        string prev = "";

        while (r < arr.size()) {
            if (arr[r - 1] > arr[r] && prev != ">") {
                res = max(res, r - l + 1);
                r++;
                prev = ">";
            } else if (arr[r - 1] < arr[r] && prev != "<") {
                res = max(res, r - l + 1);
                r++;
                prev = "<";
            } else {
                r = (arr[r] == arr[r - 1]) ? r + 1 : r;
                l = r - 1;
                prev = "";
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    maxTurbulenceSize(arr) {
        let l = 0,
            r = 1,
            res = 1,
            prev = '';

        while (r < arr.length) {
            if (arr[r - 1] > arr[r] && prev !== '>') {
                res = Math.max(res, r - l + 1);
                r++;
                prev = '>';
            } else if (arr[r - 1] < arr[r] && prev !== '<') {
                res = Math.max(res, r - l + 1);
                r++;
                prev = '<';
            } else {
                r = arr[r] === arr[r - 1] ? r + 1 : r;
                l = r - 1;
                prev = '';
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxTurbulenceSize(int[] arr) {
        int l = 0, r = 1, res = 1;
        string prev = "";

        while (r < arr.Length) {
            if (arr[r - 1] > arr[r] && prev != ">") {
                res = Math.Max(res, r - l + 1);
                r++;
                prev = ">";
            } else if (arr[r - 1] < arr[r] && prev != "<") {
                res = Math.Max(res, r - l + 1);
                r++;
                prev = "<";
            } else {
                r = (arr[r] == arr[r - 1]) ? r + 1 : r;
                l = r - 1;
                prev = "";
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

---

## 5. Iteration

::tabs-start

```python
class Solution:
    def maxTurbulenceSize(self, arr: List[int]) -> int:
        n = len(arr)
        res = cnt = 0
        sign = -1

        for i in range(n - 1):
            if arr[i] > arr[i + 1]:
                cnt = cnt + 1 if sign == 0 else 1
                sign = 1
            elif arr[i] < arr[i + 1]:
                cnt = cnt + 1 if sign == 1 else 1
                sign = 0
            else:
                cnt = 0
                sign = -1

            res = max(res, cnt)

        return res + 1
```

```java
public class Solution {
    public int maxTurbulenceSize(int[] arr) {
        int n = arr.length;
        int res = 0, cnt = 0, sign = -1;

        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                cnt = (sign == 0) ? cnt + 1 : 1;
                sign = 1;
            } else if (arr[i] < arr[i + 1]) {
                cnt = (sign == 1) ? cnt + 1 : 1;
                sign = 0;
            } else {
                cnt = 0;
                sign = -1;
            }

            res = Math.max(res, cnt);
        }

        return res + 1;
    }
}
```

```cpp
class Solution {
public:
    int maxTurbulenceSize(vector<int>& arr) {
        int n = arr.size();
        int res = 0, cnt = 0, sign = -1;

        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                cnt = (sign == 0) ? cnt + 1 : 1;
                sign = 1;
            } else if (arr[i] < arr[i + 1]) {
                cnt = (sign == 1) ? cnt + 1 : 1;
                sign = 0;
            } else {
                cnt = 0;
                sign = -1;
            }

            res = max(res, cnt);
        }

        return res + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    maxTurbulenceSize(arr) {
        const n = arr.length;
        let res = 0,
            cnt = 0,
            sign = -1;

        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                cnt = sign === 0 ? cnt + 1 : 1;
                sign = 1;
            } else if (arr[i] < arr[i + 1]) {
                cnt = sign === 1 ? cnt + 1 : 1;
                sign = 0;
            } else {
                cnt = 0;
                sign = -1;
            }

            res = Math.max(res, cnt);
        }

        return res + 1;
    }
}
```

```csharp
public class Solution {
    public int MaxTurbulenceSize(int[] arr) {
        int n = arr.Length;
        int res = 0, cnt = 0, sign = -1;

        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                cnt = (sign == 0) ? cnt + 1 : 1;
                sign = 1;
            } else if (arr[i] < arr[i + 1]) {
                cnt = (sign == 1) ? cnt + 1 : 1;
                sign = 0;
            } else {
                cnt = 0;
                sign = -1;
            }

            res = Math.Max(res, cnt);
        }

        return res + 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
