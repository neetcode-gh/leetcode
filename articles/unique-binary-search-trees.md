## 1. Recursion

::tabs-start

```python
class Solution:
    def numTrees(self, n: int) -> int:
        if n <= 1:
            return 1

        res = 0
        for i in range(1, n + 1):
            res += self.numTrees(i - 1) * self.numTrees(n - i)
        return res
```

```java
public class Solution {
    public int numTrees(int n) {
        if (n <= 1) {
            return 1;
        }

        int res = 0;
        for (int i = 1; i <= n; i++) {
            res += numTrees(i - 1) * numTrees(n - i);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numTrees(int n) {
        if (n <= 1) {
            return 1;
        }

        int res = 0;
        for (int i = 1; i <= n; i++) {
            res += numTrees(i - 1) * numTrees(n - i);
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
    numTrees(n) {
        if (n <= 1) {
            return 1;
        }

        let res = 0;
        for (let i = 1; i <= n; i++) {
            res += this.numTrees(i - 1) * this.numTrees(n - i);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(3 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:

    def __init__(self):
        self.dp = {}

    def numTrees(self, n: int) -> int:
        if n <= 1:
            return 1
        if n in self.dp:
            return self.dp[n]

        res = 0
        for i in range(1, n + 1):
            res += self.numTrees(i - 1) * self.numTrees(n - i)

        self.dp[n] = res
        return res
```

```java
public class Solution {
    private Map<Integer, Integer> dp = new HashMap<>();

    public int numTrees(int n) {
        if (n <= 1) {
            return 1;
        }
        if (dp.containsKey(n)) {
            return dp.get(n);
        }

        int res = 0;
        for (int i = 1; i <= n; i++) {
            res += numTrees(i - 1) * numTrees(n - i);
        }

        dp.put(n, res);
        return res;
    }
}
```

```cpp
class Solution {
private:
    unordered_map<int, int> dp;

public:
    int numTrees(int n) {
        if (n <= 1) {
            return 1;
        }
        if (dp.find(n) != dp.end()) {
            return dp[n];
        }

        int res = 0;
        for (int i = 1; i <= n; i++) {
            res += numTrees(i - 1) * numTrees(n - i);
        }

        dp[n] = res;
        return res;
    }
};
```

```javascript
class Solution {
    constructor() {
        this.dp = new Map();
    }

    /**
     * @param {number} n
     * @return {number}
     */
    numTrees(n) {
        if (n <= 1) {
            return 1;
        }
        if (this.dp.has(n)) {
            return this.dp.get(n);
        }

        let res = 0;
        for (let i = 1; i <= n; i++) {
            res += this.numTrees(i - 1) * this.numTrees(n - i);
        }

        this.dp.set(n, res);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def numTrees(self, n: int) -> int:
        numTree = [1] * (n + 1)

        for nodes in range(2, n + 1):
            total = 0
            for root in range(1, nodes + 1):
                left = root - 1
                right = nodes - root
                total += numTree[left] * numTree[right]
            numTree[nodes] = total

        return numTree[n]
```

```java
public class Solution {
    public int numTrees(int n) {
        int[] numTree = new int[n + 1];
        numTree[0] = 1;
        numTree[1] = 1;

        for (int nodes = 2; nodes <= n; nodes++) {
            int total = 0;
            for (int root = 1; root <= nodes; root++) {
                int left = root - 1;
                int right = nodes - root;
                total += numTree[left] * numTree[right];
            }
            numTree[nodes] = total;
        }

        return numTree[n];
    }
}
```

```cpp
class Solution {
public:
    int numTrees(int n) {
        vector<int> numTree(n + 1, 1);

        for (int nodes = 2; nodes <= n; ++nodes) {
            int total = 0;
            for (int root = 1; root <= nodes; ++root) {
                int left = root - 1;
                int right = nodes - root;
                total += numTree[left] * numTree[right];
            }
            numTree[nodes] = total;
        }

        return numTree[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    numTrees(n) {
        const numTree = Array(n + 1).fill(1);

        for (let nodes = 2; nodes <= n; nodes++) {
            let total = 0;
            for (let root = 1; root <= nodes; root++) {
                let left = root - 1;
                let right = nodes - root;
                total += numTree[left] * numTree[right];
            }
            numTree[nodes] = total;
        }

        return numTree[n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Catalan Numbers - I

::tabs-start

```python
class Solution:
    def numTrees(self, n: int) -> int:
        res = 1
        for i in range(1, n):
            res *= (n + i + 1)
            res //= i
        return res // n
```

```java
public class Solution {
    public int numTrees(int n) {
        long res = 1;
        for (int i = 1; i < n; i++) {
            res *= (n + i + 1);
            res /= i;
        }
        return (int) (res / n);
    }
}
```

```cpp
class Solution {
public:
    int numTrees(int n) {
        long long res = 1;
        for (int i = 1; i < n; i++) {
            res *= (n + i + 1);
            res /= i;
        }
        return res / n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    numTrees(n) {
        let res = 1n;
        for (let i = 1n; i < BigInt(n); i++) {
            res *= BigInt(n) + i + 1n;
            res /= i;
        }
        return Number(res / BigInt(n));
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 5. Catalan Numbers - II

::tabs-start

```python
class Solution:
    def numTrees(self, n: int) -> int:
        res = 1
        for i in range(n):
            res *= (4 * i + 2) / (i + 2)
        return int(res)
```

```java
public class Solution {
    public int numTrees(int n) {
        long res = 1;
        for (int i = 0; i < n; i++) {
            res *= (4 * i + 2) / (i + 2.0);
        }
        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int numTrees(int n) {
        long long res = 1;
        for (int i = 0; i < n; i++) {
            res *= (4 * i + 2) / (i + 2.0);
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
    numTrees(n) {
        let res = 1;
        for (let i = 0; i < n; i++) {
            res *= (4 * i + 2) / (i + 2);
        }
        return Math.floor(res);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
