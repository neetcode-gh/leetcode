## 1. Simulation

::tabs-start

```python
class Solution:
    def numberOfMatches(self, n: int) -> int:
        res = 0

        while n > 1:
            res += n // 2
            n = (n + 1) // 2

        return res
```

```java
public class Solution {
    public int numberOfMatches(int n) {
        int res = 0;

        while (n > 1) {
            res += n / 2;
            n = (n + 1) / 2;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numberOfMatches(int n) {
        int res = 0;

        while (n > 1) {
            res += n / 2;
            n = (n + 1) / 2;
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
    numberOfMatches(n) {
        let res = 0;

        while (n > 1) {
            res += Math.floor(n / 2);
            n = Math.ceil(n / 2);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumberOfMatches(int n) {
        int res = 0;

        while (n > 1) {
            res += n / 2;
            n = (n + 1) / 2;
        }

        return res;
    }
}
```

```go
func numberOfMatches(n int) int {
    res := 0

    for n > 1 {
        res += n / 2
        n = (n + 1) / 2
    }

    return res
}
```

```kotlin
class Solution {
    fun numberOfMatches(n: Int): Int {
        var n = n
        var res = 0

        while (n > 1) {
            res += n / 2
            n = (n + 1) / 2
        }

        return res
    }
}
```

```swift
class Solution {
    func numberOfMatches(_ n: Int) -> Int {
        var n = n
        var res = 0

        while n > 1 {
            res += n / 2
            n = (n + 1) / 2
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 2. Math

::tabs-start

```python
class Solution:
    def numberOfMatches(self, n: int) -> int:
        return n - 1
```

```java
public class Solution {
    public int numberOfMatches(int n) {
        return n - 1;
    }
}
```

```cpp
class Solution {
public:
    int numberOfMatches(int n) {
        return n - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    numberOfMatches(n) {
        return n - 1;
    }
}
```

```csharp
public class Solution {
    public int NumberOfMatches(int n) {
        return n - 1;
    }
}
```

```go
func numberOfMatches(n int) int {
    return n - 1
}
```

```kotlin
class Solution {
    fun numberOfMatches(n: Int): Int {
        return n - 1
    }
}
```

```swift
class Solution {
    func numberOfMatches(_ n: Int) -> Int {
        return n - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
