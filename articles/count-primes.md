## 1. Brute Force

### Intuition

The most straightforward way to count primes is to check each number individually. A number is prime if it has no divisors other than 1 and itself. We can optimize the divisibility check by only testing divisors up to the square root of the number, since if a number has a factor larger than its square root, it must also have a corresponding factor smaller than its square root.

### Algorithm

1. Initialize a counter `res` to 0.
2. For each number from 2 to n-1:
   - Assume the number is prime.
   - Check if any number from 2 to the square root of the current number divides it evenly.
   - If a divisor is found, mark it as not prime.
   - If no divisor is found, increment the counter.
3. Return the count of primes.

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

```go
func countPrimes(n int) int {
    res := 0
    for num := 2; num < n; num++ {
        isPrime := true
        for i := 2; i*i <= num; i++ {
            if num%i == 0 {
                isPrime = false
                break
            }
        }
        if isPrime {
            res++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countPrimes(n: Int): Int {
        var res = 0
        for (num in 2 until n) {
            var isPrime = true
            var i = 2
            while (i * i <= num) {
                if (num % i == 0) {
                    isPrime = false
                    break
                }
                i++
            }
            if (isPrime) {
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countPrimes(_ n: Int) -> Int {
        var res = 0
        for num in 2..<n {
            var isPrime = true
            var i = 2
            while i * i <= num {
                if num % i == 0 {
                    isPrime = false
                    break
                }
                i += 1
            }
            if isPrime {
                res += 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \sqrt {n})$
* Space complexity: $O(1)$

---

## 2. Sieve of Eratosthenes

### Intuition

Instead of checking each number for primality, we can use the Sieve of Eratosthenes to efficiently mark composite numbers. The key insight is that when we find a prime number, all of its multiples must be composite. By marking these multiples, we eliminate the need to check them later. We start marking from the square of each prime because smaller multiples would have already been marked by smaller primes.

### Algorithm

1. Create a boolean array `sieve` of size n, initialized to false (all numbers assumed prime).
2. Initialize a counter `res` to 0.
3. For each number from 2 to n-1:
   - If the number is not marked as composite (sieve[num] is false):
     - Increment the prime counter.
     - Mark all multiples of this number starting from num*num as composite.
4. Return the count of primes.

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

### Intuition

We can optimize the sieve by observing that 2 is the only even prime. Instead of processing all numbers, we start by assuming half the numbers (all odd numbers plus 2) are prime, then only sieve odd numbers starting from 3. When marking multiples, we skip even multiples since they are already excluded. This cuts the work roughly in half.

### Algorithm

1. If n < 3, return 0 (no primes less than 2).
2. Initialize count to n/2 (assuming 2 and all odd numbers are prime).
3. Create a boolean array `isPrime` of size n.
4. For each odd number i from 3 up to sqrt(n):
   - If i is not marked as composite:
     - Mark all odd multiples of i starting from i*i as composite.
     - Decrement count for each newly marked composite.
5. Return the final count.

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