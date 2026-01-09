## 1. Simulation

### Intuition
We can simulate the tournament round by round. In each round, teams are paired up. If the number of teams is even, half play and half are eliminated. If odd, one team gets a bye and the rest pair up. We continue until only one team remains.

### Algorithm
1. Initialize a counter for the total matches played.
2. While more than one team remains:
   - Add `n / 2` matches (the number of pairings).
   - Update `n` to `(n + 1) / 2` (winners plus possibly one bye team).
3. Return the total match count.

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

### Intuition
Every match eliminates exactly one team. To go from `n` teams to `1` winner, we need to eliminate `n - 1` teams. Therefore, exactly `n - 1` matches are played regardless of the tournament bracket structure.

### Algorithm
1. Return `n - 1`.

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
