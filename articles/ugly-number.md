## 1. Math

::tabs-start

```python
class Solution:
    def isUgly(self, n: int) -> bool:
        if n <= 0:
            return False

        for p in [2, 3, 5]:
            while n % p == 0:
                n //= p

        return n == 1
```

```java
public class Solution {
    public boolean isUgly(int n) {
        if (n <= 0) return false;

        for (int p = 2; p <= 5 && n > 0; p++) {
            while (n % p == 0) {
                n /= p;
            }
        }

        return n == 1;
    }
}
```

```cpp
class Solution {
public:
    bool isUgly(int n) {
        if (n <= 0) return false;

        for (int p = 2; p <= 5 && n > 0; p++) {
            while (n % p == 0) {
                n /= p;
            }
        }

        return n == 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isUgly(n) {
        if (n <= 0) return false;

        for (let p of [2, 3, 5]) {
            while (n % p == 0) {
                n /= p;
            }
        }

        return n === 1;
    }
}
```

```csharp
public class Solution {
    public bool IsUgly(int n) {
        if (n <= 0) {
            return false;
        }

        int[] primes = { 2, 3, 5 };
        foreach (int p in primes) {
            while (n % p == 0) {
                n /= p;
            }
        }

        return n == 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
