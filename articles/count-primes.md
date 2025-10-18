## 1. Brute Force

::tabs-start

```python
class Solution:
    def countPrimes(self, n: int) -> int:
        res = 0
        for num in range(2, n):
            isPrime = True
            for i in range(2, int(num ** 0.5) + 1):
                if num % i == 0:
                    isPrime = False
                    break
            if isPrime:
                res += 1
        return res
```

```java
public class Solution {
    public int countPrimes(int n) {
        int res = 0;
        for (int num = 2; num < n; num++) {
            boolean isPrime = true;
            for (int i = 2; i * i <= num; i++) {
                if (num % i == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countPrimes(int n) {
        int res = 0;
        for (int num = 2; num < n; num++) {
            bool isPrime = true;
            for (int i = 2; i * i <= num; i++) {
                if (num % i == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) res++;
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
    countPrimes(n) {
        let res = 0;
        for (let num = 2; num < n; num++) {
            let isPrime = true;
            for (let i = 2; i * i <= num; i++) {
                if (num % i === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) res++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountPrimes(int n) {
        int res = 0;
        for (int num = 2; num < n; num++) {
            bool isPrime = true;
            for (int i = 2; i * i <= num; i++) {
                if (num % i == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                res++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \sqrt {n})$
* Space complexity: $O(1)$

---

## 2. Sieve of Eratosthenes

::tabs-start

```python
class Solution:
    def countPrimes(self, n: int) -> int:
        sieve = [False] * n
        res = 0
        for num in range(2, n):
            if not sieve[num]:
                res += 1
                for i in range(num * num, n, num):
                    sieve[i] = True
        return res
```

```java
public class Solution {
    public int countPrimes(int n) {
        boolean[] sieve = new boolean[n];
        int res = 0;
        for (int num = 2; num < n; num++) {
            if (!sieve[num]) {
                res++;
                for (long i = num * 1L * num; i < n; i += num) {
                    sieve[(int) i] = true;
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
    int countPrimes(int n) {
        vector<bool> sieve(n, false);
        int res = 0;
        for (int num = 2; num < n; num++) {
            if (!sieve[num]) {
                res++;
                for (long long i = 1LL * num * num; i < n; i += num) {
                    sieve[i] = true;
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
     * @return {number}
     */
    countPrimes(n) {
        const sieve = new Array(n).fill(false);
        let res = 0;
        for (let num = 2; num < n; num++) {
            if (!sieve[num]) {
                res++;
                for (let i = num * num; i < n; i += num) {
                    sieve[i] = true;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountPrimes(int n) {
        bool[] sieve = new bool[n];
        int res = 0;
        for (int num = 2; num < n; num++) {
            if (!sieve[num]) {
                res++;
                for (long i = (long)num * num; i < n; i += num) {
                    sieve[(int)i] = true;
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log (\log n))$
* Space complexity: $O(n)$

---

## 3. Sieve of Eratosthenes (Optimal)

::tabs-start

```python
class Solution:
    def countPrimes(self, n: int) -> int:
        if n < 3:
            return 0

        isPrime = [False] * n
        count = n // 2

        for i in range(3, int(n ** 0.5) + 1, 2):
            if not isPrime[i]:
                for j in range(i * i, n, 2 * i):
                    if not isPrime[j]:
                        isPrime[j] = True
                        count -= 1

        return count
```

```java
public class Solution {
    public int countPrimes(int n) {
        if (n < 3) return 0;

        boolean[] isPrime = new boolean[n];
        int count = n / 2;

        for (int i = 3; i * i < n; i += 2) {
            if (!isPrime[i]) {
                for (int j = i * i; j < n; j += 2 * i) {
                    if (!isPrime[j]) {
                        isPrime[j] = true;
                        count--;
                    }
                }
            }
        }

        return count;
    }
}
```

```cpp
class Solution {
public:
    int countPrimes(int n) {
        if (n < 3) return 0;

        vector<bool> isPrime(n, false);
        int count = n / 2;

        for (int i = 3; i * i < n; i += 2) {
            if (!isPrime[i]) {
                for (int j = i * i; j < n; j += 2 * i) {
                    if (!isPrime[j]) {
                        isPrime[j] = true;
                        count--;
                    }
                }
            }
        }

        return count;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countPrimes(n) {
        if (n < 3) return 0;

        const isPrime = new Array(n).fill(false);
        let count = Math.floor(n / 2);

        for (let i = 3; i * i < n; i += 2) {
            if (!isPrime[i]) {
                for (let j = i * i; j < n; j += 2 * i) {
                    if (!isPrime[j]) {
                        isPrime[j] = true;
                        count--;
                    }
                }
            }
        }

        return count;
    }
}
```

```csharp
public class Solution {
    public int CountPrimes(int n) {
        if (n < 3) return 0;

        bool[] isPrime = new bool[n];
        int count = n / 2;

        for (int i = 3; i * i < n; i += 2) {
            if (!isPrime[i]) {
                for (int j = i * i; j < n; j += 2 * i) {
                    if (!isPrime[j]) {
                        isPrime[j] = true;
                        count--;
                    }
                }
            }
        }

        return count;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log (\log n))$
* Space complexity: $O(n)$