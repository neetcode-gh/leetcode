## 1. Recursion

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        if n == 1:
            return True
        if n <= 0 or n % 4:
            return False
        return self.isPowerOfFour(n // 4)
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        if (n == 1) {
            return true;
        }
        if (n <= 0 || n % 4 != 0) {
            return false;
        }
        return isPowerOfFour(n / 4);
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        if (n == 1) {
            return true;
        }
        if (n <= 0 || n % 4 != 0) {
            return false;
        }
        return isPowerOfFour(n / 4);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfFour(n) {
        if (n === 1) {
            return true;
        }
        if (n <= 0 || n % 4 !== 0) {
            return false;
        }
        return this.isPowerOfFour(Math.floor(n / 4));
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        if (n == 1) {
            return true;
        }
        if (n <= 0 || n % 4 != 0) {
            return false;
        }
        return IsPowerOfFour(n / 4);
    }
}
```

```go
func isPowerOfFour(n int) bool {
    if n == 1 {
        return true
    }
    if n <= 0 || n%4 != 0 {
        return false
    }
    return isPowerOfFour(n / 4)
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        if (n == 1) {
            return true
        }
        if (n <= 0 || n % 4 != 0) {
            return false
        }
        return isPowerOfFour(n / 4)
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        if n == 1 {
            return true
        }
        if n <= 0 || n % 4 != 0 {
            return false
        }
        return isPowerOfFour(n / 4)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        if n < 0:
            return False

        while n > 1:
            if n % 4:
                return False
            n //= 4

        return n == 1
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        if (n < 0) return false;

        while (n > 1) {
            if (n % 4 != 0) return false;
            n /= 4;
        }

        return n == 1;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        if (n < 0) return false;

        while (n > 1) {
            if (n % 4 != 0) return false;
            n /= 4;
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
    isPowerOfFour(n) {
        if (n < 0) return false;

        while (n > 1) {
            if (n % 4 !== 0) return false;
            n = Math.floor(n / 4);
        }

        return n === 1;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        if (n < 0) return false;

        while (n > 1) {
            if (n % 4 != 0) return false;
            n /= 4;
        }

        return n == 1;
    }
}
```

```go
func isPowerOfFour(n int) bool {
    if n < 0 {
        return false
    }

    for n > 1 {
        if n%4 != 0 {
            return false
        }
        n /= 4
    }

    return n == 1
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        if (n < 0) return false

        var num = n
        while (num > 1) {
            if (num % 4 != 0) return false
            num /= 4
        }

        return num == 1
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        if n < 0 {
            return false
        }

        var num = n
        while num > 1 {
            if num % 4 != 0 {
                return false
            }
            num /= 4
        }

        return num == 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 3. Math

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        return n > 0 and log(n, 4) % 1 == 0
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        return n > 0 && Math.log(n) / Math.log(4) % 1 == 0;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        return n > 0 && fmod(log(n) / log(4), 1) == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfFour(n) {
        return n > 0 && (Math.log(n) / Math.log(4)) % 1 === 0;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        return n > 0 && Math.Log(n) / Math.Log(4) % 1 == 0;
    }
}
```

```go
func isPowerOfFour(n int) bool {
    if n <= 0 {
        return false
    }
    logVal := math.Log(float64(n)) / math.Log(4)
    return math.Mod(logVal, 1) == 0
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        return n > 0 && Math.log(n.toDouble()) / Math.log(4.0) % 1 == 0.0
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        return n > 0 && log(Double(n)) / log(4.0).truncatingRemainder(dividingBy: 1) == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 4. Bit Manipulation

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        if n < 0:
            return False

        for i in range(0, 32, 2):
            if n == (1 << i):
                return True

        return False
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        if (n < 0) return false;

        for (int i = 0; i < 32; i += 2) {
            if (n == (1 << i)) {
                return true;
            }
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        if (n < 0) return false;

        for (int i = 0; i < 32; i += 2) {
            if (n == (1 << i)) {
                return true;
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfFour(n) {
        if (n < 0) return false;

        for (let i = 0; i < 32; i += 2) {
            if (n === 1 << i) {
                return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        if (n < 0) return false;

        for (int i = 0; i < 32; i += 2) {
            if (n == (1 << i)) {
                return true;
            }
        }

        return false;
    }
}
```

```go
func isPowerOfFour(n int) bool {
    if n < 0 {
        return false
    }

    for i := 0; i < 32; i += 2 {
        if n == (1 << i) {
            return true
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        if (n < 0) return false

        for (i in 0 until 32 step 2) {
            if (n == (1 shl i)) {
                return true
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        if n < 0 {
            return false
        }

        for i in stride(from: 0, to: 32, by: 2) {
            if n == (1 << i) {
                return true
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 5. Bit Mask - I

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) == n
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) == n;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfFour(n) {
        return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) === n;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) == n;
    }
}
```

```go
func isPowerOfFour(n int) bool {
    return n > 0 && (n&(n-1)) == 0 && (n&0x55555555) == n
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        return n > 0 && (n and (n - 1)) == 0 && (n and 0x55555555) == n
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) == n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 6. Bit Mask - II

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0 and (n % 3 == 1)
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n % 3 == 1);
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n % 3 == 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfFour(n) {
        return n > 0 && (n & (n - 1)) === 0 && n % 3 == 1;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n % 3 == 1);
    }
}
```

```go
func isPowerOfFour(n int) bool {
    return n > 0 && (n&(n-1)) == 0 && n%3 == 1
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        return n > 0 && (n and (n - 1)) == 0 && n % 3 == 1
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        return n > 0 && (n & (n - 1)) == 0 && n % 3 == 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
