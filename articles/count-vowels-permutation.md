## 1. Recursion

::tabs-start

```python
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        MOD = 10**9 + 7
        follows = {
            'a': ['e'],
            'e': ['a', 'i'],
            'i': ['a', 'e', 'o', 'u'],
            'o': ['i', 'u'],
            'u': ['a']
        }

        def dfs(i, v):
            if i == n:
                return 1

            total = 0
            for nxt in follows[v]:
                total = (total + dfs(i + 1, nxt)) % MOD
            return total

        res = 0
        for vowel in ['a', 'e', 'i', 'o', 'u']:
            res = (res + dfs(1, vowel)) % MOD

        return res
```

```java
public class Solution {
    private final int MOD = 1_000_000_007;
    private final Map<Character, List<Character>> follows = Map.of(
        'a', List.of('e'),
        'e', List.of('a', 'i'),
        'i', List.of('a', 'e', 'o', 'u'),
        'o', List.of('i', 'u'),
        'u', List.of('a')
    );

    public int countVowelPermutation(int n) {
        int res = 0;
        for (char vowel : "aeiou".toCharArray()) {
            res = (res + dfs(1, vowel, n)) % MOD;
        }
        return res;
    }

    private int dfs(int i, char v, int n) {
        if (i == n) {
            return 1;
        }

        int total = 0;
        for (char next : follows.get(v)) {
            total = (total + dfs(i + 1, next, n)) % MOD;
        }
        return total;
    }
}
```

```cpp
class Solution {
    const int MOD = 1e9 + 7;
    unordered_map<char, vector<char>> follows = {
        {'a', {'e'}},
        {'e', {'a', 'i'}},
        {'i', {'a', 'e', 'o', 'u'}},
        {'o', {'i', 'u'}},
        {'u', {'a'}}
    };

public:
    int countVowelPermutation(int n) {

        int res = 0;
        for (char vowel : string("aeiou")) {
            res = (res + dfs(1, vowel, n)) % MOD;
        }
        return res;
    }

private:
    int dfs(int i, char v, int n) {
        if (i == n) {
            return 1;
        }

        int total = 0;
        for (char& next : follows[v]) {
            total = (total + dfs(i + 1, next, n)) % MOD;
        }
        return total;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countVowelPermutation(n) {
        const MOD = 1e9 + 7;

        const follows = {
            a: ['e'],
            e: ['a', 'i'],
            i: ['a', 'e', 'o', 'u'],
            o: ['i', 'u'],
            u: ['a'],
        };

        const dfs = (i, v) => {
            if (i === n) {
                return 1;
            }

            let total = 0;
            for (const next of follows[v]) {
                total = (total + dfs(i + 1, next)) % MOD;
            }
            return total;
        };

        let res = 0;
        for (const vowel of ['a', 'e', 'i', 'o', 'u']) {
            res = (res + dfs(1, vowel)) % MOD;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(4 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        MOD = 10**9 + 7
        cache = {}
        follows = {
            'a': ['e'],
            'e': ['a', 'i'],
            'i': ['a', 'e', 'o', 'u'],
            'o': ['i', 'u'],
            'u': ['a']
        }

        def dfs(i, v):
            if i == n:
                return 1
            if (i, v) in cache:
                return cache[(i, v)]

            total = 0
            for nxt in follows[v]:
                total = (total + dfs(i + 1, nxt)) % MOD
            cache[(i, v)] = total
            return total

        res = 0
        for vowel in ['a', 'e', 'i', 'o', 'u']:
            res = (res + dfs(1, vowel)) % MOD

        return res
```

```java
public class Solution {
    private final int MOD = 1_000_000_007;
    private final Map<Integer, List<Integer>> follows = Map.of(
        0, List.of(1),           // 'a' -> 'e'
        1, List.of(0, 2),        // 'e' -> 'a', 'i'
        2, List.of(0, 1, 3, 4),  // 'i' -> 'a', 'e', 'o', 'u'
        3, List.of(2, 4),        // 'o' -> 'i', 'u'
        4, List.of(0)            // 'u' -> 'a'
    );
    private int[][] dp;

    public int countVowelPermutation(int n) {
        dp = new int[n][5];
        for (int i = 0; i < n; i++) {
            Arrays.fill(dp[i], -1);
        }

        int res = 0;
        for (int vowel = 0; vowel < 5; vowel++) {
            res = (res + dfs(1, vowel, n)) % MOD;
        }
        return res;
    }

    private int dfs(int i, int v, int n) {
        if (i == n) {
            return 1;
        }
        if (dp[i][v] != -1) return dp[i][v];

        int total = 0;
        for (int next : follows.get(v)) {
            total = (total + dfs(i + 1, next, n)) % MOD;
        }
        return dp[i][v] = total;
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;
    vector<vector<int>> dp;
    vector<vector<int>> follows = {
        {1},          // 'a' -> 'e'
        {0, 2},       // 'e' -> 'a', 'i'
        {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
        {2, 4},       // 'o' -> 'i', 'u'
        {0}           // 'u' -> 'a'
    };

    int dfs(int i, int v, int n) {
        if (i == n) return 1;
        if (dp[i][v] != -1) return dp[i][v];

        int total = 0;
        for (int next : follows[v]) {
            total = (total + dfs(i + 1, next, n)) % MOD;
        }
        return dp[i][v] = total;
    }

public:
    int countVowelPermutation(int n) {
        dp.assign(n, vector<int>(5, -1));

        int res = 0;
        for (int vowel = 0; vowel < 5; vowel++) {
            res = (res + dfs(1, vowel, n)) % MOD;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countVowelPermutation(n) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n }, () => Array(5).fill(-1));

        const follows = {
            0: [1], // 'a' -> 'e'
            1: [0, 2], // 'e' -> 'a', 'i'
            2: [0, 1, 3, 4], // 'i' -> 'a', 'e', 'o', 'u'
            3: [2, 4], // 'o' -> 'i', 'u'
            4: [0], // 'u' -> 'a'
        };

        const dfs = (i, v) => {
            if (i === n) return 1;
            if (dp[i][v] !== -1) return dp[i][v];

            let total = 0;
            for (const next of follows[v]) {
                total = (total + dfs(i + 1, next)) % MOD;
            }
            dp[i][v] = total;
            return total;
        };

        let res = 0;
        for (let vowel = 0; vowel < 5; vowel++) {
            res = (res + dfs(1, vowel)) % MOD;
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

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        MOD = 10**9 + 7
        a, e, i, o, u = 0, 1, 2, 3, 4
        dp = [[0] * 5 for _ in range(n + 1)]
        dp[1] = [1, 1, 1, 1, 1]

        for j in range(2, n + 1):
            dp[j][a] = (dp[j - 1][e] + dp[j - 1][i] + dp[j - 1][u]) % MOD
            dp[j][e] = (dp[j - 1][a] + dp[j - 1][i]) % MOD
            dp[j][i] = (dp[j - 1][e] + dp[j - 1][o]) % MOD
            dp[j][o] = dp[j - 1][i] % MOD
            dp[j][u] = (dp[j - 1][i] + dp[j - 1][o]) % MOD

        return sum(dp[n]) % MOD
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int countVowelPermutation(int n) {
        int[][] dp = new int[n + 1][5];
        int[][] follows = {
            {1},          // 'a' -> 'e'
            {0, 2},       // 'e' -> 'a', 'i'
            {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
            {2, 4},       // 'o' -> 'i', 'u'
            {0}           // 'u' -> 'a'
        };

        for (int v = 0; v < 5; v++) {
            dp[1][v] = 1;
        }

        for (int i = 2; i <= n; i++) {
            for (int v = 0; v < 5; v++) {
                for (int nextV : follows[v]) {
                    dp[i][v] = (dp[i][v] + dp[i - 1][nextV]) % MOD;
                }
            }
        }

        int result = 0;
        for (int v = 0; v < 5; v++) {
            result = (result + dp[n][v]) % MOD;
        }
        return result;
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

public:
    int countVowelPermutation(int n) {
        vector<vector<int>> dp(n + 1, vector<int>(5, 0));
        vector<vector<int>> follows = {
            {1},          // 'a' -> 'e'
            {0, 2},       // 'e' -> 'a', 'i'
            {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
            {2, 4},       // 'o' -> 'i', 'u'
            {0}           // 'u' -> 'a'
        };

        for (int v = 0; v < 5; v++) {
            dp[1][v] = 1;
        }

        for (int i = 2; i <= n; i++) {
            for (int v = 0; v < 5; v++) {
                for (int nextV : follows[v]) {
                    dp[i][v] = (dp[i][v] + dp[i - 1][nextV]) % MOD;
                }
            }
        }

        int result = 0;
        for (int v = 0; v < 5; v++) {
            result = (result + dp[n][v]) % MOD;
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countVowelPermutation(n) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n + 1 }, () => Array(5).fill(0));
        const follows = [
            [1], // 'a' -> 'e'
            [0, 2], // 'e' -> 'a', 'i'
            [0, 1, 3, 4], // 'i' -> 'a', 'e', 'o', 'u'
            [2, 4], // 'o' -> 'i', 'u'
            [0], // 'u' -> 'a'
        ];

        for (let v = 0; v < 5; v++) {
            dp[1][v] = 1;
        }

        for (let i = 2; i <= n; i++) {
            for (let v = 0; v < 5; v++) {
                for (const nextV of follows[v]) {
                    dp[i][v] = (dp[i][v] + dp[i - 1][nextV]) % MOD;
                }
            }
        }

        return dp[n].reduce((sum, val) => (sum + val) % MOD, 0);
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
    def countVowelPermutation(self, n: int) -> int:
        MOD = 10**9 + 7
        follows = [
            [1],           # 'a' -> 'e'
            [0, 2],        # 'e' -> 'a', 'i'
            [0, 1, 3, 4],  # 'i' -> 'a', 'e', 'o', 'u'
            [2, 4],        # 'o' -> 'i', 'u'
            [0]            # 'u' -> 'a'
        ]
        dp = [1] * 5

        for _ in range(2, n + 1):
            next_dp = [0] * 5
            for v in range(5):
                for nextV in follows[v]:
                    next_dp[v] = (next_dp[v] + dp[nextV]) % MOD
            dp = next_dp

        return sum(dp) % MOD
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int countVowelPermutation(int n) {
        int[][] follows = {
            {1},          // 'a' -> 'e'
            {0, 2},       // 'e' -> 'a', 'i'
            {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
            {2, 4},       // 'o' -> 'i', 'u'
            {0}           // 'u' -> 'a'
        };

        int[] dp = {1, 1, 1, 1, 1};

        for (int i = 2; i <= n; i++) {
            int[] nextDp = new int[5];
            for (int v = 0; v < 5; v++) {
                for (int nextV : follows[v]) {
                    nextDp[v] = (nextDp[v] + dp[nextV]) % MOD;
                }
            }
            dp = nextDp;
        }

        int result = 0;
        for (int count : dp) {
            result = (result + count) % MOD;
        }
        return result;
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

public:
    int countVowelPermutation(int n) {
        vector<vector<int>> follows = {
            {1},          // 'a' -> 'e'
            {0, 2},       // 'e' -> 'a', 'i'
            {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
            {2, 4},       // 'o' -> 'i', 'u'
            {0}           // 'u' -> 'a'
        };

        vector<int> dp(5, 1);

        for (int i = 2; i <= n; i++) {
            vector<int> nextDp(5, 0);
            for (int v = 0; v < 5; v++) {
                for (int nextV : follows[v]) {
                    nextDp[v] = (nextDp[v] + dp[nextV]) % MOD;
                }
            }
            dp = nextDp;
        }

        int result = 0;
        for (int count : dp) {
            result = (result + count) % MOD;
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countVowelPermutation(n) {
        const MOD = 1e9 + 7;
        const follows = [
            [1], // 'a' -> 'e'
            [0, 2], // 'e' -> 'a', 'i'
            [0, 1, 3, 4], // 'i' -> 'a', 'e', 'o', 'u'
            [2, 4], // 'o' -> 'i', 'u'
            [0], // 'u' -> 'a'
        ];

        let dp = [1, 1, 1, 1, 1];

        for (let i = 2; i <= n; i++) {
            const nextDp = [0, 0, 0, 0, 0];
            for (let v = 0; v < 5; v++) {
                for (const nextV of follows[v]) {
                    nextDp[v] = (nextDp[v] + dp[nextV]) % MOD;
                }
            }
            dp = nextDp;
        }

        return dp.reduce((sum, count) => (sum + count) % MOD, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we used array of size $5$.

---

## 5. Matrix Exponentiation

::tabs-start

```python
class Solution:
    MOD = 10**9 + 7

    class M:
        def __init__(self, n):
            self.a = [[0] * n for _ in range(n)]

        def __mul__(self, other):
            n = len(self.a)
            product = Solution.M(n)
            for i in range(n):
                for j in range(n):
                    for k in range(n):
                        product.a[i][k] = (product.a[i][k] + self.a[i][j] * other.a[j][k]) % Solution.MOD
            return product

    def matrixExpo(self, base, exp):
        n = len(base.a)
        result = Solution.M(n)
        for i in range(n):
            result.a[i][i] = 1
        while exp > 0:
            if exp % 2 == 1:
                result = result * base
            base = base * base
            exp //= 2
        return result

    def countVowelPermutation(self, n: int) -> int:
        follows = [
            [0, 1, 0, 0, 0],  # 'a' -> 'e'
            [1, 0, 1, 0, 0],  # 'e' -> 'a', 'i'
            [1, 1, 0, 1, 1],  # 'i' -> 'a', 'e', 'o', 'u'
            [0, 0, 1, 0, 1],  # 'o' -> 'i', 'u'
            [1, 0, 0, 0, 0]   # 'u' -> 'a'
        ]

        base = Solution.M(5)
        base.a = follows

        result = self.matrixExpo(base, n - 1)

        return sum(sum(row) for row in result.a) % self.MOD
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    static class M {
        int[][] a;

        M(int n) {
            a = new int[n][n];
        }

        M multiply(M other) {
            int n = a.length;
            M product = new M(n);

            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    for (int k = 0; k < n; k++) {
                        product.a[i][k] = (int) ((product.a[i][k] + 1L * a[i][j] * other.a[j][k]) % MOD);
                    }
                }
            }
            return product;
        }
    }

    private M matrixExpo(M base, int exp) {
        int n = base.a.length;
        M result = new M(n);
        for (int i = 0; i < n; i++) {
            result.a[i][i] = 1;
        }
        while (exp > 0) {
            if (exp % 2 == 1) {
                result = result.multiply(base);
            }
            base = base.multiply(base);
            exp /= 2;
        }
        return result;
    }

    public int countVowelPermutation(int n) {
        int[][] follows = {
            {0, 1, 0, 0, 0},  // 'a' -> 'e'
            {1, 0, 1, 0, 0},  // 'e' -> 'a', 'i'
            {1, 1, 0, 1, 1},  // 'i' -> 'a', 'e', 'o', 'u'
            {0, 0, 1, 0, 1},  // 'o' -> 'i', 'u'
            {1, 0, 0, 0, 0}   // 'u' -> 'a'
        };

        M base = new M(5);
        base.a = follows;

        M result = matrixExpo(base, n - 1);

        int ans = 0;
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                ans = (ans + result.a[i][j]) % MOD;
            }
        }
        return ans;
    }
}
```

```cpp
class Solution {
    static const int MOD = 1e9 + 7;

    struct M {
        vector<vector<int>> a;

        M(int n) {
            a.resize(n, vector<int>(n, 0));
        }

        M operator*(const M& other) const {
            int n = a.size();
            M product(n);

            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    for (int k = 0; k < n; k++) {
                        product.a[i][k] = (product.a[i][k] + a[i][j] * 1LL * other.a[j][k]) % MOD;
                    }
                }
            }
            return product;
        }
    };

    M matrixExpo(M base, int exp) {
        int n = base.a.size();
        M result(n);

        for (int i = 0; i < n; i++) {
            result.a[i][i] = 1;
        }

        while (exp > 0) {
            if (exp % 2 == 1) {
                result = result * base;
            }
            base = base * base;
            exp /= 2;
        }

        return result;
    }

public:
    int countVowelPermutation(int n) {
        vector<vector<int>> follows = {
            {0, 1, 0, 0, 0},  // 'a' -> 'e'
            {1, 0, 1, 0, 0},  // 'e' -> 'a', 'i'
            {1, 1, 0, 1, 1},  // 'i' -> 'a', 'e', 'o', 'u'
            {0, 0, 1, 0, 1},  // 'o' -> 'i', 'u'
            {1, 0, 0, 0, 0}   // 'u' -> 'a'
        };

        M base(5);
        base.a = follows;

        M result = matrixExpo(base, n - 1);

        int ans = 0;
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                ans = (ans + result.a[i][j]) % MOD;
            }
        }

        return ans;
    }
};
```

```javascript
class M {
    /**
     * @constructor
     * @param {number} n
     */
    constructor(n) {
        this.MOD = 1e9 + 7;
        this.a = Array.from({ length: n }, () => Array(n).fill(0));
    }

    /**
     * @param {M}
     * @return {M}
     */
    multiply(other) {
        const n = this.a.length;
        const product = new M(n);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                let sum = 0n;
                for (let k = 0; k < n; k++) {
                    sum += BigInt(this.a[i][k]) * BigInt(other.a[k][j]);
                }
                product.a[i][j] = Number(sum % BigInt(this.MOD));
            }
        }
        return product;
    }
}

class Solution {
    /**
     * @param {M}
     * @param {number} exp
     * @return {M}
     */
    matrixExpo(base, exp) {
        const n = base.a.length;
        let result = new M(n);
        for (let i = 0; i < n; i++) {
            result.a[i][i] = 1;
        }
        while (exp > 0) {
            if (exp & 1) {
                result = result.multiply(base);
            }
            base = base.multiply(base);
            exp >>= 1;
        }
        return result;
    }

    /**
     * @param {number} n
     * @return {number}
     */
    countVowelPermutation(n) {
        const MOD = 1e9 + 7;
        const follows = [
            [0, 1, 0, 0, 0], // 'a' -> 'e'
            [1, 0, 1, 0, 0], // 'e' -> 'a', 'i'
            [1, 1, 0, 1, 1], // 'i' -> 'a', 'e', 'o', 'u'
            [0, 0, 1, 0, 1], // 'o' -> 'i', 'u'
            [1, 0, 0, 0, 0], // 'u' -> 'a'
        ];
        const base = new M(5);
        base.a = follows;
        const result = this.matrixExpo(base, n - 1);
        let ans = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                ans = (ans + result.a[i][j]) % MOD;
            }
        }
        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m ^ 3 \log n)$
- Space complexity: $O(m ^ 2)$

> Where $m$ is the size of the matrix used in matrix exponentiation $(5 X 5)$ and $n$ is the length of the permutation.
