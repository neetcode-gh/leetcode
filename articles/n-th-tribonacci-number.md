## 1. Recursion

::tabs-start

```python
class Solution:
    def tribonacci(self, n: int) -> int:
        if n <= 2:
            return 1 if n != 0 else 0
        return self.tribonacci(n - 1) + self.tribonacci(n - 2) + self.tribonacci(n - 3)
```

```java
public class Solution {
    public int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }
        return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
    }
}
```

```cpp
class Solution {
public:
    int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }
        return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    tribonacci(n) {
        if (n <= 2) {
            return n === 0 ? 0 : 1;
        }
        return (
            this.tribonacci(n - 1) +
            this.tribonacci(n - 2) +
            this.tribonacci(n - 3)
        );
    }
}
```

```csharp
public class Solution {
    public int Tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        return Tribonacci(n - 1) + Tribonacci(n - 2) + Tribonacci(n - 3);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(3 ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def __init__(self):
        self.dp = {}

    def tribonacci(self, n: int) -> int:
        if n <= 2:
            return 1 if n != 0 else 0
        if n in self.dp:
            return self.dp[n]

        self.dp[n] = self.tribonacci(n - 1) + self.tribonacci(n - 2) + self.tribonacci(n - 3)
        return self.dp[n]
```

```java
public class Solution {
    private HashMap<Integer, Integer> dp = new HashMap<>();

    public int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }
        if (dp.containsKey(n)) {
            return dp.get(n);
        }

        dp.put(n, tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3));
        return dp.get(n);
    }
}
```

```cpp
class Solution {
    unordered_map<int, int> dp;

public:
    int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }
        if (dp.count(n)) return dp[n];

        dp[n] = tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @constructor
     */
    constructor() {
        this.dp = new Map();
    }

    /**
     * @param {number} n
     * @return {number}
     */
    tribonacci(n) {
        if (n <= 2) {
            return n === 0 ? 0 : 1;
        }
        if (this.dp.has(n)) {
            return this.dp.get(n);
        }
        const result =
            this.tribonacci(n - 1) +
            this.tribonacci(n - 2) +
            this.tribonacci(n - 3);
        this.dp.set(n, result);
        return result;
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, int> dp = new Dictionary<int, int>();

    public int Tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        if (dp.ContainsKey(n)) return dp[n];

        dp[n] = Tribonacci(n - 1) + Tribonacci(n - 2) + Tribonacci(n - 3);
        return dp[n];
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
    def tribonacci(self, n: int) -> int:
        if n <= 2:
            return 1 if n != 0 else 0

        dp = [0] * (n + 1)
        dp[1] = dp[2] = 1
        for i in range(3, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]
        return dp[n]
```

```java
public class Solution {
    public int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }

        int[] dp = new int[n + 1];
        dp[1] = dp[2] = 1;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
        }
        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    int tribonacci(int n) {
        if (n <= 2) {
            return n == 0 ? 0 : 1;
        }

        vector<int> dp(n + 1, 0);
        dp[1] = dp[2] = 1;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
        }
        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    tribonacci(n) {
        if (n <= 2) {
            return n === 0 ? 0 : 1;
        }

        const dp = new Array(n + 1).fill(0);
        dp[1] = dp[2] = 1;
        for (let i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
        }
        return dp[n];
    }
}
```

```csharp
public class Solution {
    public int Tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;

        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = dp[2] = 1;

        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
        }

        return dp[n];
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
    def tribonacci(self, n: int) -> int:
        t = [0, 1, 1]

        if n < 3:
            return t[n]

        for i in range(3, n + 1):
            t[i % 3] = sum(t)
        return t[n % 3]
```

```java
public class Solution {
    public int tribonacci(int n) {
        int t[] = {0, 1, 1};
        if (n < 3) return t[n];

        for (int i = 3; i <= n; ++i) {
            t[i % 3] = t[0] + t[1] + t[2];
        }
        return t[n % 3];
    }
}
```

```cpp
class Solution {
public:
    int tribonacci(int n) {
        int t[] = {0, 1, 1};
        if (n < 3) return t[n];

        for (int i = 3; i <= n; ++i) {
            t[i % 3] = t[0] + t[1] + t[2];
        }
        return t[n % 3];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    tribonacci(n) {
        const t = [0, 1, 1];
        if (n < 3) return t[n];

        for (let i = 3; i <= n; ++i) {
            t[i % 3] = t[0] + t[1] + t[2];
        }
        return t[n % 3];
    }
}
```

```csharp
public class Solution {
    public int Tribonacci(int n) {
        int[] t = {0, 1, 1};
        if (n < 3) return t[n];

        for (int i = 3; i <= n; i++) {
            t[i % 3] = t[0] + t[1] + t[2];
        }

        return t[n % 3];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
