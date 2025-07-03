## 1. Recursion

::tabs-start

```python
class Solution:
    def countGoodStrings(self, low: int, high: int, zero: int, one: int) -> int:
        mod = 10**9 + 7

        def dfs(length):
            if length > high:
                return 0
            res = 1 if length >= low else 0
            res += dfs(length + zero) + dfs(length + one)
            return res % mod

        return dfs(0)
```

```java
public class Solution {
    final int mod = 1_000_000_007;

    public int countGoodStrings(int low, int high, int zero, int one) {
        return dfs(low, high, zero, one, 0);
    }

    private int dfs(int low, int high, int zero, int one, int length) {
        if (length > high) return 0;
        int res = (length >= low) ? 1 : 0;
        res = (res + dfs(low, high, zero, one, length + zero)) % mod;
        res = (res + dfs(low, high, zero, one, length + one)) % mod;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countGoodStrings(int low, int high, int zero, int one) {
        const int mod = 1e9 + 7;

        function<int(int)> dfs = [&](int length) {
            if (length > high) return 0;
            int res = (length >= low) ? 1 : 0;
            res = (res + dfs(length + zero)) % mod;
            res = (res + dfs(length + one)) % mod;
            return res;
        };

        return dfs(0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @param {number} zero
     * @param {number} one
     * @return {number}
     */
    countGoodStrings(low, high, zero, one) {
        const mod = 1e9 + 7;

        const dfs = (length) => {
            if (length > high) return 0;
            let res = length >= low ? 1 : 0;
            res = (res + dfs(length + zero)) % mod;
            res = (res + dfs(length + one)) % mod;
            return res;
        };

        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

> Where $n$ is equal to the given $high$ value.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def countGoodStrings(self, low: int, high: int, zero: int, one: int) -> int:
        mod = 10**9 + 7
        dp = {}

        def dfs(length):
            if length > high:
                return 0
            if length in dp:
                return dp[length]

            dp[length] = 1 if length >= low else 0
            dp[length] += dfs(length + zero) + dfs(length + one)
            return dp[length] % mod

        return dfs(0)
```

```java
public class Solution {
    final int mod = 1_000_000_007;
    private int[] dp;

    public int countGoodStrings(int low, int high, int zero, int one) {
        dp = new int[high + 1];
        Arrays.fill(dp, -1);
        return dfs(low, high, zero, one, 0);
    }

    private int dfs(int low, int high, int zero, int one, int length) {
        if (length > high) return 0;
        if (dp[length] != -1) return dp[length];

        dp[length] = (length >= low) ? 1 : 0;
        dp[length] = (dp[length] + dfs(low, high, zero, one, length + zero)) % mod;
        dp[length] = (dp[length] + dfs(low, high, zero, one, length + one)) % mod;
        return dp[length];
    }
}
```

```cpp
class Solution {
    const int mod = 1e9 + 7;
    vector<int> dp;

public:
    int countGoodStrings(int low, int high, int zero, int one) {
        dp.assign(high + 1, -1);
        return dfs(low, high, zero, one, 0);
    }

private:
    int dfs(int low, int high, int zero, int one, int length) {
        if (length > high) return 0;
        if (dp[length] != -1) return dp[length];
        dp[length] = (length >= low) ? 1 : 0;
        dp[length] = (dp[length] + dfs(low, high, zero, one, length + zero)) % mod;
        dp[length] = (dp[length] + dfs(low, high, zero, one, length + one)) % mod;
        return dp[length];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @param {number} zero
     * @param {number} one
     * @return {number}
     */
    countGoodStrings(low, high, zero, one) {
        const mod = 1e9 + 7;
        const dp = new Array(high + 1).fill(-1);

        const dfs = (length) => {
            if (length > high) return 0;
            if (dp[length] !== -1) return dp[length];
            dp[length] = length >= low ? 1 : 0;
            dp[length] = (dp[length] + dfs(length + zero)) % mod;
            dp[length] = (dp[length] + dfs(length + one)) % mod;
            return dp[length];
        };

        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is equal to the given $high$ value.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def countGoodStrings(self, low: int, high: int, zero: int, one: int) -> int:
        dp = { 0 : 1 }
        mod = 10**9 + 7

        for i in range(1, high + 1):
            dp[i] = (dp.get(i - one, 0) + dp.get(i - zero, 0)) % mod

        return sum(dp[i] for i in range(low, high + 1)) % mod
```

```java
public class Solution {
    public int countGoodStrings(int low, int high, int zero, int one) {
        int[] dp = new int[high + 1];
        int mod = 1_000_000_007, res = 0;
        dp[0] = 1;

        for (int i = 1; i <= high; i++) {
            if (i >= zero) dp[i] = (dp[i] + dp[i - zero]) % mod;
            if (i >= one) dp[i] = (dp[i] + dp[i - one]) % mod;
            if (i >= low) res = (res + dp[i]) % mod;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countGoodStrings(int low, int high, int zero, int one) {
        vector<int> dp(high + 1);
        int mod = 1e9 + 7, res = 0;
        dp[0] = 1;

        for (int i = 1; i <= high; i++) {
            if (i >= zero) dp[i] = (dp[i] + dp[i - zero]) % mod;
            if (i >= one) dp[i] = (dp[i] + dp[i - one]) % mod;
            if (i >= low) res = (res + dp[i]) % mod;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @param {number} zero
     * @param {number} one
     * @return {number}
     */
    countGoodStrings(low, high, zero, one) {
        const mod = 1e9 + 7;
        const dp = new Int32Array(high + 1);
        let res = 0;
        dp[0] = 1;

        for (let i = 1; i <= high; i++) {
            if (i >= zero) dp[i] = (dp[i] + dp[i - zero]) % mod;
            if (i >= one) dp[i] = (dp[i] + dp[i - one]) % mod;
            if (i >= low) res = (res + dp[i]) % mod;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is equal to the given $high$ value.
