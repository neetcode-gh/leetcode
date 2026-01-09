## 1. Brute Force

::tabs-start

```python
class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        res = 0
        for a in range(limit + 1):
            for b in range(limit + 1):
                for c in range(limit + 1):
                    if a + b + c == n:
                        res += 1
        return res
```

```java
public class Solution {
    public long distributeCandies(int n, int limit) {
        long res = 0;
        for (int a = 0; a <= limit; a++) {
            for (int b = 0; b <= limit; b++) {
                for (int c = 0; c <= limit; c++) {
                    if (a + b + c == n) {
                        res++;
                    }
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
    long long distributeCandies(int n, int limit) {
        long long res = 0;
        for (int a = 0; a <= limit; a++) {
            for (int b = 0; b <= limit; b++) {
                for (int c = 0; c <= limit; c++) {
                    if (a + b + c == n) {
                        res++;
                    }
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
     * @param {number} limit
     * @return {number}
     */
    distributeCandies(n, limit) {
        let res = 0;
        for (let a = 0; a <= limit; a++) {
            for (let b = 0; b <= limit; b++) {
                for (let c = 0; c <= limit; c++) {
                    if (a + b + c === n) {
                        res++;
                    }
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long DistributeCandies(int n, int limit) {
        long res = 0;
        for (int a = 0; a <= limit; a++) {
            for (int b = 0; b <= limit; b++) {
                for (int c = 0; c <= limit; c++) {
                    if (a + b + c == n) {
                        res++;
                    }
                }
            }
        }
        return res;
    }
}
```

```go
func distributeCandies(n int, limit int) int64 {
    var res int64 = 0
    for a := 0; a <= limit; a++ {
        for b := 0; b <= limit; b++ {
            for c := 0; c <= limit; c++ {
                if a+b+c == n {
                    res++
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun distributeCandies(n: Int, limit: Int): Long {
        var res: Long = 0
        for (a in 0..limit) {
            for (b in 0..limit) {
                for (c in 0..limit) {
                    if (a + b + c == n) {
                        res++
                    }
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func distributeCandies(_ n: Int, _ limit: Int) -> Int {
        var res = 0
        for a in 0...limit {
            for b in 0...limit {
                for c in 0...limit {
                    if a + b + c == n {
                        res += 1
                    }
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(l ^ 3)$
- Space complexity: $O(1)$

> Where $l$ is the given limit.

---

## 2. Better Approach

::tabs-start

```python
class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        res = 0
        for a in range(min(n, limit) + 1):
            for b in range(min(n - a, limit) + 1):
                if n - a - b <= limit:
                    res += 1
        return res
```

```java
public class Solution {
    public long distributeCandies(int n, int limit) {
        long res = 0;
        int maxA = Math.min(n, limit);
        for (int a = 0; a <= maxA; a++) {
            int maxB = Math.min(n - a, limit);
            for (int b = 0; b <= maxB; b++) {
                if (n - a - b <= limit) {
                    res++;
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
    long long distributeCandies(int n, int limit) {
        long long res = 0;
        int maxA = min(n, limit);
        for (int a = 0; a <= maxA; a++) {
            int maxB = min(n - a, limit);
            for (int b = 0; b <= maxB; b++) {
                if (n - a - b <= limit) {
                    res++;
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
     * @param {number} limit
     * @return {number}
     */
    distributeCandies(n, limit) {
        let res = 0;
        const maxA = Math.min(n, limit);
        for (let a = 0; a <= maxA; a++) {
            const maxB = Math.min(n - a, limit);
            for (let b = 0; b <= maxB; b++) {
                if (n - a - b <= limit) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long DistributeCandies(int n, int limit) {
        long res = 0;
        int maxA = Math.Min(n, limit);
        for (int a = 0; a <= maxA; a++) {
            int maxB = Math.Min(n - a, limit);
            for (int b = 0; b <= maxB; b++) {
                if (n - a - b <= limit) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```go
func distributeCandies(n int, limit int) int64 {
    var res int64 = 0
    maxA := min(n, limit)
    for a := 0; a <= maxA; a++ {
        maxB := min(n-a, limit)
        for b := 0; b <= maxB; b++ {
            if n-a-b <= limit {
                res++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun distributeCandies(n: Int, limit: Int): Long {
        var res: Long = 0
        val maxA = minOf(n, limit)
        for (a in 0..maxA) {
            val maxB = minOf(n - a, limit)
            for (b in 0..maxB) {
                if (n - a - b <= limit) {
                    res++
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func distributeCandies(_ n: Int, _ limit: Int) -> Int {
        var res = 0
        let maxA = min(n, limit)
        for a in 0...maxA {
            let maxB = min(n - a, limit)
            for b in 0...maxB {
                if n - a - b <= limit {
                    res += 1
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(n, limit) ^ 2)$
- Space complexity: $O(1)$

---

## 3. Enumeration - I

::tabs-start

```python
class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        res = 0
        for a in range(min(n, limit) + 1):
            b_max = min(n - a, limit)
            b_min = max(0, n - a - limit)
            if b_max >= b_min:
                res += b_max - b_min + 1
        return res
```

```java
public class Solution {
    public long distributeCandies(int n, int limit) {
        long res = 0;
        for (int a = 0, aMax = Math.min(n, limit); a <= aMax; a++) {
            int bMax = Math.min(n - a, limit);
            int bMin = Math.max(0, n - a - limit);
            if (bMax >= bMin) {
                res += (long)(bMax - bMin + 1);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long distributeCandies(int n, int limit) {
        long long res = 0;
        int aMax = min(n, limit);
        for (int a = 0; a <= aMax; ++a) {
            int bMax = min(n - a, limit);
            int bMin = max(0, n - a - limit);
            if (bMax >= bMin) {
                res += (long long)(bMax - bMin + 1);
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
     * @param {number} limit
     * @return {number}
     */
    distributeCandies(n, limit) {
        let res = 0;
        const aMax = Math.min(n, limit);
        for (let a = 0; a <= aMax; a++) {
            const bMax = Math.min(n - a, limit);
            const bMin = Math.max(0, n - a - limit);
            if (bMax >= bMin) {
                res += bMax - bMin + 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long DistributeCandies(int n, int limit) {
        long res = 0;
        int aMax = Math.Min(n, limit);
        for (int a = 0; a <= aMax; a++) {
            int bMax = Math.Min(n - a, limit);
            int bMin = Math.Max(0, n - a - limit);
            if (bMax >= bMin) {
                res += (long)(bMax - bMin + 1);
            }
        }
        return res;
    }
}
```

```go
func distributeCandies(n int, limit int) int64 {
    var res int64 = 0
    aMax := min(n, limit)
    for a := 0; a <= aMax; a++ {
        bMax := min(n-a, limit)
        bMin := max(0, n-a-limit)
        if bMax >= bMin {
            res += int64(bMax - bMin + 1)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun distributeCandies(n: Int, limit: Int): Long {
        var res: Long = 0
        val aMax = minOf(n, limit)
        for (a in 0..aMax) {
            val bMax = minOf(n - a, limit)
            val bMin = maxOf(0, n - a - limit)
            if (bMax >= bMin) {
                res += (bMax - bMin + 1).toLong()
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func distributeCandies(_ n: Int, _ limit: Int) -> Int {
        var res = 0
        let aMax = min(n, limit)
        for a in 0...aMax {
            let bMax = min(n - a, limit)
            let bMin = max(0, n - a - limit)
            if bMax >= bMin {
                res += bMax - bMin + 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(n, limit))$
- Space complexity: $O(1)$

---

## 4. Enumeration - II

::tabs-start

```python
class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        res = 0
        for a in range(min(n, limit) + 1):
            if n - a <= 2 * limit:
                res += min(n - a, limit) - max(0, n - a - limit) + 1
        return res
```

```java
public class Solution {
    public long distributeCandies(int n, int limit) {
        long res = 0;
        int maxA = Math.min(n, limit);
        for (int a = 0; a <= maxA; a++) {
            int rem = n - a;
            if (rem <= 2L * limit) {
                int hi = Math.min(rem, limit);
                int lo = Math.max(0, rem - limit);
                res += (hi - lo + 1);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long distributeCandies(int n, int limit) {
        long long res = 0;
        int maxA = min(n, limit);
        for (int a = 0; a <= maxA; ++a) {
            int rem = n - a;
            if (rem <= 2 * limit) {
                int hi = min(rem, limit);
                int lo = max(0, rem - limit);
                res += (long long)(hi - lo + 1);
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
     * @param {number} limit
     * @return {number}
     */
    distributeCandies(n, limit) {
        let res = 0;
        const maxA = Math.min(n, limit);
        for (let a = 0; a <= maxA; a++) {
            const rem = n - a;
            if (rem <= 2 * limit) {
                const hi = Math.min(rem, limit);
                const lo = Math.max(0, rem - limit);
                res += hi - lo + 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long DistributeCandies(int n, int limit) {
        long res = 0;
        int maxA = Math.Min(n, limit);
        for (int a = 0; a <= maxA; a++) {
            int rem = n - a;
            if (rem <= 2 * limit) {
                int hi = Math.Min(rem, limit);
                int lo = Math.Max(0, rem - limit);
                res += (hi - lo + 1);
            }
        }
        return res;
    }
}
```

```go
func distributeCandies(n int, limit int) int64 {
    var res int64 = 0
    maxA := min(n, limit)
    for a := 0; a <= maxA; a++ {
        rem := n - a
        if rem <= 2*limit {
            hi := min(rem, limit)
            lo := max(0, rem-limit)
            res += int64(hi - lo + 1)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun distributeCandies(n: Int, limit: Int): Long {
        var res: Long = 0
        val maxA = minOf(n, limit)
        for (a in 0..maxA) {
            val rem = n - a
            if (rem <= 2 * limit) {
                val hi = minOf(rem, limit)
                val lo = maxOf(0, rem - limit)
                res += (hi - lo + 1).toLong()
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func distributeCandies(_ n: Int, _ limit: Int) -> Int {
        var res = 0
        let maxA = min(n, limit)
        for a in 0...maxA {
            let rem = n - a
            if rem <= 2 * limit {
                let hi = min(rem, limit)
                let lo = max(0, rem - limit)
                res += hi - lo + 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(n, limit))$
- Space complexity: $O(1)$

---

## 5. Inclusion-Exclusion Principle

::tabs-start

```python
class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        C3 = [1, 3, 3, 1]
        res = 0
        for j in range(4):
            m = n - j * (limit + 1)
            if m < 0:
                continue
            ways = (m + 2) * (m + 1) // 2
            sign = -1 if j % 2 else 1
            res += sign * C3[j] * ways
        return res
```

```java
public class Solution {
    public long distributeCandies(int n, int limit) {
        int[] C3 = {1, 3, 3, 1};
        long res = 0;
        for (int j = 0; j < 4; j++) {
            long m = n - j * (limit + 1);
            if (m < 0) continue;
            long ways = (m + 2) * (m + 1) / 2;
            int sign = (j % 2 == 0) ? 1 : -1;
            res += sign * C3[j] * ways;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long distributeCandies(int n, int limit) {
        int C3[4] = {1, 3, 3, 1};
        long long res = 0;
        for (int j = 0; j < 4; j++) {
            long long m = n - j * (limit + 1);
            if (m < 0) continue;
            long long ways = (m + 2) * (m + 1) / 2;
            int sign = (j % 2 == 0 ? 1 : -1);
            res += sign * C3[j] * ways;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} limit
     * @return {number}
     */
    distributeCandies(n, limit) {
        const C3 = [1, 3, 3, 1];
        let res = 0;
        for (let j = 0; j < 4; j++) {
            const m = n - j * (limit + 1);
            if (m < 0) continue;
            const ways = ((m + 2) * (m + 1)) / 2;
            const sign = j % 2 === 0 ? 1 : -1;
            res += sign * C3[j] * ways;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long DistributeCandies(int n, int limit) {
        int[] C3 = {1, 3, 3, 1};
        long res = 0;
        for (int j = 0; j < 4; j++) {
            long m = n - j * (limit + 1);
            if (m < 0) continue;
            long ways = (m + 2) * (m + 1) / 2;
            int sign = (j % 2 == 0 ? 1 : -1);
            res += sign * C3[j] * ways;
        }
        return res;
    }
}
```

```go
func distributeCandies(n int, limit int) int64 {
    C3 := []int64{1, 3, 3, 1}
    var res int64 = 0
    for j := 0; j < 4; j++ {
        m := int64(n - j*(limit+1))
        if m < 0 {
            continue
        }
        ways := (m + 2) * (m + 1) / 2
        sign := int64(1)
        if j%2 != 0 {
            sign = -1
        }
        res += sign * C3[j] * ways
    }
    return res
}
```

```kotlin
class Solution {
    fun distributeCandies(n: Int, limit: Int): Long {
        val C3 = longArrayOf(1, 3, 3, 1)
        var res: Long = 0
        for (j in 0 until 4) {
            val m = n.toLong() - j * (limit + 1)
            if (m < 0) continue
            val ways = (m + 2) * (m + 1) / 2
            val sign = if (j % 2 == 0) 1L else -1L
            res += sign * C3[j] * ways
        }
        return res
    }
}
```

```swift
class Solution {
    func distributeCandies(_ n: Int, _ limit: Int) -> Int {
        let C3 = [1, 3, 3, 1]
        var res = 0
        for j in 0..<4 {
            let m = n - j * (limit + 1)
            if m < 0 { continue }
            let ways = (m + 2) * (m + 1) / 2
            let sign = (j % 2 == 0) ? 1 : -1
            res += sign * C3[j] * ways
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
