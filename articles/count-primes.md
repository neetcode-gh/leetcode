## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Prime Number Definition** - Understanding that a prime number has exactly two divisors: 1 and itself
- **Square Root Optimization** - Knowing that factors come in pairs, so checking up to sqrt(n) is sufficient
- **Sieve of Eratosthenes** - Understanding this classic algorithm for efficiently finding all primes up to a limit

---

## 1. Brute Force

### Intuition

The most straightforward way to count primes is to check each number individually. A number is prime if it has no divisors other than 1 and itself. We can optimize the divisibility check by only testing divisors up to the square root of the number, since if a number has a factor larger than its square root, it must also have a corresponding factor smaller than its square root.

### Algorithm

1. Initialize a counter `res` to `0`.
2. For each number from `2` to `n-1`:
    - Assume the number is prime.
    - Check if any number from `2` to the square root of the current number divides it evenly.
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

```rust
impl Solution {
    pub fn count_primes(n: i32) -> i32 {
        let mut res = 0;
        for num in 2..n {
            let mut is_prime = true;
            let mut i = 2;
            while i * i <= num {
                if num % i == 0 {
                    is_prime = false;
                    break;
                }
                i += 1;
            }
            if is_prime {
                res += 1;
            }
        }
        res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \sqrt {n})$
- Space complexity: $O(1)$

---

## 2. Sieve of Eratosthenes

### Intuition

Instead of checking each number for primality, we can use the Sieve of Eratosthenes to efficiently mark composite numbers. The key insight is that when we find a prime number, all of its multiples must be composite. By marking these multiples, we eliminate the need to check them later. We start marking from the square of each prime because smaller multiples would have already been marked by smaller primes.

### Algorithm

1. Create a boolean array `sieve` of size `n`, initialized to `false` (all numbers assumed prime).
2. Initialize a counter `res` to `0`.
3. For each number from `2` to `n-1`:
    - If the number is not marked as composite (`sieve[num]` is `false`):
        - Increment the prime counter.
        - Mark all multiples of this number starting from `num*num` as composite.
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

```rust
impl Solution {
    pub fn count_primes(n: i32) -> i32 {
        let n = n as usize;
        let mut sieve = vec![false; n];
        let mut res = 0;
        for num in 2..n {
            if !sieve[num] {
                res += 1;
                let mut i = num as u64 * num as u64;
                while (i as usize) < n {
                    sieve[i as usize] = true;
                    i += num as u64;
                }
            }
        }
        res
    }
}
```

```rust
impl Solution {
    pub fn count_primes(n: i32) -> i32 {
        if n < 3 {
            return 0;
        }
        let n = n as usize;
        let mut is_prime = vec![false; n];
        let mut count = (n / 2) as i32;

        let mut i = 3;
        while i * i < n {
            if !is_prime[i] {
                let mut j = i * i;
                while j < n {
                    if !is_prime[j] {
                        is_prime[j] = true;
                        count -= 1;
                    }
                    j += 2 * i;
                }
            }
            i += 2;
        }

        count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log (\log n))$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Including n in the Count

The problem asks for primes strictly less than `n`, not less than or equal to. Using `range(2, n + 1)` or `i <= n` will include `n` itself if it's prime.

```python
# Wrong: includes n
for num in range(2, n + 1):
# Correct: excludes n
for num in range(2, n):
```

### Integer Overflow When Computing num \* num

When starting the sieve from `i * i`, this multiplication can overflow for large values. Use `long` or cast before multiplying.

```java
// Overflow risk when i is large
for (int j = i * i; j < n; j += i)
// Safe: use long arithmetic
for (long j = (long) i * i; j < n; j += i)
```

### Forgetting to Handle n < 2

There are no primes less than 2. Failing to handle edge cases like `n = 0`, `n = 1`, or `n = 2` can cause array index errors or incorrect results.
