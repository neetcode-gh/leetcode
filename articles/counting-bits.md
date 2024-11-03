## 1. Bit Manipulation - I

::tabs-start

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        res = []
        for num in range(n + 1):
            one = 0
            for i in range(32):
                if num & (1 << i):
                    one += 1
            res.append(one)
        return res
```

```java
public class Solution {
    public int[] countBits(int n) {
        int[] res = new int[n + 1];
        for (int num = 1; num <= n; num++) {
            for (int i = 0; i < 32; i++) {
                if ((num & (1 << i)) != 0) {
                    res[num]++;
                }
            }
        }       
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> res(n + 1);
        for (int num = 1; num <= n; num++) {
            for (int i = 0; i < 32; i++) {
                if (num & (1 << i)) {
                    res[num]++;
                }
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[]}
     */
    countBits(n) {
        let res = [];
        for (let num = 0; num <= n; num++) {
            let one = 0;
            for (let i = 0; i < 32; i++) {
                if ((num & (1 << i)) != 0) {
                    one++;
                }
            }
            res.push(one);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] CountBits(int n) {
        int[] res = new int[n + 1];
        for (int num = 1; num <= n; num++) {
            for (int i = 0; i < 32; i++) {
                if ((num & (1 << i)) != 0) {
                    res[num]++;
                }
            }
        }       
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 2. Bit Manipulation - II

::tabs-start

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        res = [0] * (n + 1)
        for i in range(1, n + 1):
            num = i
            while num != 0:
                res[i] += 1
                num &= (num - 1)
        return res
```

```java
public class Solution {
    public int[] countBits(int n) {
        int[] res = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int num = i;
            while (num != 0) {
                res[i]++;
                num &= (num - 1);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> res(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            int num = i;
            while (num != 0) {
                res[i]++;
                num &= (num - 1);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[]}
     */
    countBits(n) {
        let res = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            let num = i;
            while (num !== 0) {
                res[i]++;
                num &= (num - 1);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] CountBits(int n) {
        int[] res = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int num = i;
            while (num != 0) {
                res[i]++;
                num &= (num - 1);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 3. In-Built Function

::tabs-start

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        return [bin(i).count('1') for i in range(n + 1)]
```

```java
public class Solution {
    public int[] countBits(int n) {
        int[] res = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            res[i] = Integer.bitCount(i);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> res(n + 1, 0);
        for (int i = 0; i <= n; i++) {
            res[i] = __builtin_popcount(i);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[]}
     */
    countBits(n) {
        let res = [];
        for (let i = 0; i <= n; i++) {
            res.push(i.toString(2).split('1').length - 1);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] CountBits(int n) {
        int[] res = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            res[i] = Convert.ToString(i, 2).Count(c => c == '1');
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 4. Bit Manipulation (DP)

::tabs-start

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        offset = 1

        for i in range(1, n + 1):
            if offset * 2 == i:
                offset = i
            dp[i] = 1 + dp[i - offset]
        return dp
```

```java
public class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        int offset = 1;

        for (int i = 1; i <= n; i++) {
            if (offset * 2 == i) {
                offset = i;
            }
            dp[i] = 1 + dp[i - offset];
        }
        return dp;
    }
}
```

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1);
        int offset = 1;

        for (int i = 1; i <= n; i++) {
            if (offset * 2 == i) {
                offset = i;
            }
            dp[i] = 1 + dp[i - offset];
        }
        return dp;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[]}
     */
    countBits(n) {
        const dp = new Array(n + 1).fill(0);
        let offset = 1;

        for (let i = 1; i <= n; i++) {
            if (offset * 2 == i) {
                offset = i;
            }
            dp[i] = 1 + dp[i - offset];
        }
        return dp;
    }
}
```

```csharp
public class Solution {
    public int[] CountBits(int n) {
        int[] dp = new int[n + 1];
        int offset = 1;

        for (int i = 1; i <= n; i++) {
            if (offset * 2 == i) {
                offset = i;
            }
            dp[i] = 1 + dp[i - offset];
        }
        return dp;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 5. Bit Manipulation (Optimal)

::tabs-start

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        for i in range(n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp  
```

```java
public class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}
```

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1);
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[]}
     */
    countBits(n) {
        let dp = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}
```

```csharp
public class Solution {
    public int[] CountBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$