## 1. Recursion

::tabs-start

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        
        def dfs(i):
            if i >= n:
                return i == n
            return dfs(i + 1) + dfs(i + 2)
            
        return dfs(0)
```

```java
public class Solution {
    public int climbStairs(int n) {
        return dfs(n, 0); 
    }

    public int dfs(int n, int i) {
        if (i >= n) return i == n ? 1 : 0;
        return dfs(n, i + 1) + dfs(n, i + 2);
    }
}
```

```cpp
class Solution {
public:
    int climbStairs(int n) {
        return dfs(n, 0);
    }

    int dfs(int n, int i) {
        if (i >= n) return i == n;
        return dfs(n, i + 1) + dfs(n, i + 2);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    climbStairs(n) {

        const dfs = (i) => {
            if (i >= n) return i == n;
            return dfs(i + 1) + dfs(i + 2);
        }
        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public int ClimbStairs(int n) {     
        return Dfs(n, 0);
    }

    public int Dfs(int n, int i) {
        if (i >= n) return i == n ? 1 : 0;
        return Dfs(n, i + 1) + Dfs(n, i + 2);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ n)$
* Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        cache = [-1] * n
        def dfs(i):
            if i >= n:
                return i == n
            if cache[i] != -1:
                return cache[i]
            cache[i] = dfs(i + 1) + dfs(i + 2)
            return cache[i]
            
        return dfs(0)
```

```java
public class Solution {
    int[] cache;
    public int climbStairs(int n) {
        cache = new int[n];
        for (int i = 0; i < n; i++) {
            cache[i] = -1;
        }
        return dfs(n, 0); 
    }

    public int dfs(int n, int i) {
        if (i >= n) return i == n ? 1 : 0;
        if (cache[i] != -1) return cache[i];
        return cache[i] = dfs(n, i + 1) + dfs(n, i + 2);
    }
}
```

```cpp
class Solution {
public:
    vector<int> cache;
    int climbStairs(int n) {
        cache.resize(n, -1);
        return dfs(n, 0);
    }

    int dfs(int n, int i) {
        if (i >= n) return i == n;
        if (cache[i] != -1) return cache[i];
        return cache[i] = dfs(n, i + 1) + dfs(n, i + 2);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    climbStairs(n) {
        const cache = new Int32Array(n).fill(-1);
        const dfs = (i) => {
            if (i >= n) return i == n;
            if (cache[i] != -1) return cache[i];
            return cache[i] = dfs(i + 1) + dfs(i + 2);
        }
        return dfs(0);
    }
}
```

```csharp
public class Solution {
    int[] cache;
    public int ClimbStairs(int n) { 
        cache = new int[n];
        for (int i = 0; i < n; i++) {
            cache[i] = -1;
        }    
        return Dfs(n, 0);
    }

    public int Dfs(int n, int i) {
        if (i >= n) return i == n ? 1 : 0;
        if (cache[i] != -1) return cache[i];
        return cache[i] = Dfs(n, i + 1) + Dfs(n, i + 2);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        dp = [0] * (n + 1)
        dp[1], dp[2] = 1, 2
        for i in range(3, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]
        return dp[n]
```

```java
public class Solution {
    public int climbStairs(int n) {
        if (n <= 2) {
            return n;
        }
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) {
            return n;
        }
        vector<int> dp(n + 1);
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
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
    climbStairs(n) {
        if (n <= 2) {
            return n;
        }
        let dp = new Array(n + 1).fill(0);
        dp[1] = 1;
        dp[2] = 2;
        for (let i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}
```

```csharp
public class Solution {
    public int ClimbStairs(int n) {
        if (n <= 2) {
            return n;
        }
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        one, two = 1, 1

        for i in range(n - 1):
            temp = one
            one = one + two
            two = temp
        
        return one
```

```java
public class Solution {
    public int climbStairs(int n) {
        int one = 1, two = 1;
        
        for (int i = 0; i < n - 1; i++) {
            int temp = one;
            one = one + two;
            two = temp;
        }
        
        return one;
    }
}
```

```cpp
class Solution {
public:
    int climbStairs(int n) {
        int one = 1, two = 1;
        
        for (int i = 0; i < n - 1; i++) {
            int temp = one;
            one = one + two;
            two = temp;
        }
        
        return one;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    climbStairs(n) {
        let one = 1, two = 1;
    
        for (let i = 0; i < n - 1; i++) {
            let temp = one;
            one = one + two;
            two = temp;
        }
        
        return one;
    }
}
```

```csharp
public class Solution {
    public int ClimbStairs(int n) {
        int one = 1, two = 1;
        
        for (int i = 0; i < n - 1; i++) {
            int temp = one;
            one = one + two;
            two = temp;
        }
        
        return one;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 5. Matrix Exponentiation

::tabs-start

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n == 1:
            return 1

        def matrix_mult(A, B):
            return [[A[0][0] * B[0][0] + A[0][1] * B[1][0], 
                     A[0][0] * B[0][1] + A[0][1] * B[1][1]],
                    [A[1][0] * B[0][0] + A[1][1] * B[1][0], 
                     A[1][0] * B[0][1] + A[1][1] * B[1][1]]]

        def matrix_pow(M, p):
            result = [[1, 0], [0, 1]]  
            base = M

            while p:
                if p % 2 == 1:
                    result = matrix_mult(result, base)
                base = matrix_mult(base, base)
                p //= 2

            return result

        M = [[1, 1], [1, 0]]
        result = matrix_pow(M, n)
        return result[0][0]
```

```java
public class Solution {
    public int climbStairs(int n) {
        if (n == 1) return 1;

        int[][] M = {{1, 1}, {1, 0}};
        int[][] result = matrixPow(M, n);

        return result[0][0];
    }

    private int[][] matrixMult(int[][] A, int[][] B) {
        return new int[][] {
            {A[0][0] * B[0][0] + A[0][1] * B[1][0],
             A[0][0] * B[0][1] + A[0][1] * B[1][1]},
            {A[1][0] * B[0][0] + A[1][1] * B[1][0],
             A[1][0] * B[0][1] + A[1][1] * B[1][1]}
        };
    }

    private int[][] matrixPow(int[][] M, int p) {
        int[][] result = {{1, 0}, {0, 1}};  
        int[][] base = M;

        while (p > 0) {
            if (p % 2 == 1) {
                result = matrixMult(result, base);
            }
            base = matrixMult(base, base);
            p /= 2;
        }

        return result;
    }
}
```

```cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n == 1) return 1;
        
        vector<vector<int>> M = {{1, 1}, {1, 0}};
        vector<vector<int>> result = matrixPow(M, n);

        return result[0][0];
    }
    
private:
    vector<vector<int>> matrixMult(vector<vector<int>>& A, vector<vector<int>>& B) {
        return {{A[0][0] * B[0][0] + A[0][1] * B[1][0],
                 A[0][0] * B[0][1] + A[0][1] * B[1][1]},
                {A[1][0] * B[0][0] + A[1][1] * B[1][0],
                 A[1][0] * B[0][1] + A[1][1] * B[1][1]}};
    }

    vector<vector<int>> matrixPow(vector<vector<int>>& M, int p) {
        vector<vector<int>> result = {{1, 0}, {0, 1}};  
        vector<vector<int>> base = M;

        while (p > 0) {
            if (p % 2 == 1) {
                result = matrixMult(result, base);
            }
            base = matrixMult(base, base);
            p /= 2;
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
    climbStairs(n) {
        if (n === 1) return 1;

        const matrixMult = (A, B) => {
            return [
                [A[0][0] * B[0][0] + A[0][1] * B[1][0],
                 A[0][0] * B[0][1] + A[0][1] * B[1][1]],
                [A[1][0] * B[0][0] + A[1][1] * B[1][0],
                 A[1][0] * B[0][1] + A[1][1] * B[1][1]]
            ];
        };

        const matrixPow = (M, p) => {
            let result = [[1, 0], [0, 1]];  
            let base = M;

            while (p > 0) {
                if (p % 2 === 1) {
                    result = matrixMult(result, base);
                }
                base = matrixMult(base, base);
                p = Math.floor(p / 2);
            }

            return result;
        };

        const M = [[1, 1], [1, 0]];
        const result = matrixPow(M, n);

        return result[0][0];
    }
}
```

```csharp
public class Solution {
    public int ClimbStairs(int n) {
        if (n == 1) return 1;

        int[,] M = new int[,] {{1, 1}, {1, 0}};
        int[,] result = MatrixPow(M, n);

        return result[0, 0];
    }

    private int[,] MatrixMult(int[,] A, int[,] B) {
        return new int[,] {
            {A[0, 0] * B[0, 0] + A[0, 1] * B[1, 0],
             A[0, 0] * B[0, 1] + A[0, 1] * B[1, 1]},
            {A[1, 0] * B[0, 0] + A[1, 1] * B[1, 0],
             A[1, 0] * B[0, 1] + A[1, 1] * B[1, 1]}
        };
    }

    private int[,] MatrixPow(int[,] M, int p) {
        int[,] result = new int[,] {{1, 0}, {0, 1}};  
        int[,] baseM = M;

        while (p > 0) {
            if (p % 2 == 1) {
                result = MatrixMult(result, baseM);
            }
            baseM = MatrixMult(baseM, baseM);
            p /= 2;
        }

        return result;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(1)$

---

## 6. Math

::tabs-start

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        sqrt5 = math.sqrt(5)
        phi = (1 + sqrt5) / 2
        psi = (1 - sqrt5) / 2
        n += 1
        return round((phi**n - psi**n) / sqrt5)
```

```java
public class Solution {
    public int climbStairs(int n) {
        double sqrt5 = Math.sqrt(5);
        double phi = (1 + sqrt5) / 2;
        double psi = (1 - sqrt5) / 2;
        n++;
        return (int) Math.round((Math.pow(phi, n) -
                     Math.pow(psi, n)) / sqrt5);
    }
}
```

```cpp
class Solution {
public:
    int climbStairs(int n) {
        double sqrt5 = sqrt(5);
        double phi = (1 + sqrt5) / 2;
        double psi = (1 - sqrt5) / 2;
        n++;
        return round((pow(phi, n) - pow(psi, n)) / sqrt5);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    climbStairs(n) {
        let sqrt5 = Math.sqrt(5);
        let phi = (1 + sqrt5) / 2;
        let psi = (1 - sqrt5) / 2;
        n++;
        return Math.round((Math.pow(phi, n) - 
               Math.pow(psi, n)) / sqrt5);
    }
}
```

```csharp
public class Solution {
    public int ClimbStairs(int n) {     
        double sqrt5 = Math.Sqrt(5);
        double phi = (1 + sqrt5) / 2;
        double psi = (1 - sqrt5) / 2;
        n++;
        return (int) Math.Round((Math.Pow(phi, n) -
                     Math.Pow(psi, n)) / sqrt5);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(1)$