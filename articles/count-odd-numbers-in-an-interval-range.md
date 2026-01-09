## 1. Brute Force

### Intuition
The simplest approach is to iterate through every number in the range and check if it is odd. We count all numbers where the least significant bit is 1.

### Algorithm
1. Initialize a counter for odd numbers.
2. Loop through every integer from low to high (inclusive).
3. For each number, check if it is odd using bitwise AND with 1.
4. If odd, increment the counter.
5. Return the final count.

::tabs-start

```python
class Solution:
    def countOdds(self, low: int, high: int) -> int:
        odd = 0
        for num in range(low, high + 1):
            if num & 1:
                odd += 1
        return odd
```

```java
public class Solution {
    public int countOdds(int low, int high) {
        int odd = 0;
        for (int num = low; num <= high; num++) {
            if ((num & 1) == 1) {
                odd++;
            }
        }
        return odd;
    }
}
```

```cpp
class Solution {
public:
    int countOdds(int low, int high) {
        int odd = 0;
        for (int num = low; num <= high; num++) {
            if (num & 1) {
                odd++;
            }
        }
        return odd;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @return {number}
     */
    countOdds(low, high) {
        let odd = 0;
        for (let num = low; num <= high; num++) {
            if (num & 1) {
                odd++;
            }
        }
        return odd;
    }
}
```

```csharp
public class Solution {
    public int CountOdds(int low, int high) {
        int odd = 0;
        for (int num = low; num <= high; num++) {
            if ((num & 1) == 1) {
                odd++;
            }
        }
        return odd;
    }
}
```

```go
func countOdds(low int, high int) int {
    odd := 0
    for num := low; num <= high; num++ {
        if num&1 == 1 {
            odd++
        }
    }
    return odd
}
```

```kotlin
class Solution {
    fun countOdds(low: Int, high: Int): Int {
        var odd = 0
        for (num in low..high) {
            if (num and 1 == 1) {
                odd++
            }
        }
        return odd
    }
}
```

```swift
class Solution {
    func countOdds(_ low: Int, _ high: Int) -> Int {
        var odd = 0
        for num in low...high {
            if num & 1 == 1 {
                odd += 1
            }
        }
        return odd
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

> Where $n$ is the number of integers in the given range.

---

## 2. Math

### Intuition
In any range of consecutive integers, odd and even numbers alternate. In a range of length n, there are n/2 odd numbers if n is even. If n is odd, the count depends on whether the range starts with an odd number. Starting with odd gives one extra odd number.

### Algorithm
1. Calculate the length of the range: `high - low + 1`.
2. The base count of odd numbers is `length / 2`.
3. If the length is odd and the starting number (low) is odd, add 1 to include the extra odd.
4. Return the count.

::tabs-start

```python
class Solution:
    def countOdds(self, low: int, high: int) -> int:
        length = high - low + 1
        count = length // 2
        if length % 2 and low % 2:
            count += 1
        return count
```

```java
public class Solution {
    public int countOdds(int low, int high) {
        int length = high - low + 1;
        int count = length / 2;
        if (length % 2 == 1 && low % 2 == 1) {
            count++;
        }
        return count;
    }
}
```

```cpp
class Solution {
public:
    int countOdds(int low, int high) {
        int length = high - low + 1;
        int count = length / 2;
        if (length % 2 == 1 && low % 2 == 1) {
            count++;
        }
        return count;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @return {number}
     */
    countOdds(low, high) {
        let length = high - low + 1;
        let count = Math.floor(length / 2);
        if (length % 2 === 1 && low % 2 === 1) {
            count++;
        }
        return count;
    }
}
```

```csharp
public class Solution {
    public int CountOdds(int low, int high) {
        int length = high - low + 1;
        int count = length / 2;
        if ((length % 2 == 1) && (low % 2 == 1)) {
            count++;
        }
        return count;
    }
}
```

```go
func countOdds(low int, high int) int {
    length := high - low + 1
    count := length / 2
    if length%2 == 1 && low%2 == 1 {
        count++
    }
    return count
}
```

```kotlin
class Solution {
    fun countOdds(low: Int, high: Int): Int {
        val length = high - low + 1
        var count = length / 2
        if (length % 2 == 1 && low % 2 == 1) {
            count++
        }
        return count
    }
}
```

```swift
class Solution {
    func countOdds(_ low: Int, _ high: Int) -> Int {
        let length = high - low + 1
        var count = length / 2
        if length % 2 == 1 && low % 2 == 1 {
            count += 1
        }
        return count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 3. Math (One Liner)

### Intuition
The count of odd numbers from 1 to n is `(n + 1) / 2` (or equivalently `(n + 1) >> 1`). To find odd numbers in range [low, high], we take the count up to high and subtract the count below low. The count below low equals the count up to (low - 1), which is `low / 2` or `low >> 1`.

### Algorithm
1. Compute the number of odd integers from 1 to high: `(high + 1) >> 1`.
2. Compute the number of odd integers from 1 to (low - 1): `low >> 1`.
3. Subtract the second from the first to get odds in [low, high].
4. Return the result.

::tabs-start

```python
class Solution:
    def countOdds(self, low: int, high: int) -> int:
        return ((high + 1) >> 1) - (low >> 1)
```

```java
public class Solution {
    public int countOdds(int low, int high) {
        return ((high + 1) >> 1) - (low >> 1);
    }
}
```

```cpp
class Solution {
public:
    int countOdds(int low, int high) {
        return ((high + 1) >> 1) - (low >> 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @return {number}
     */
    countOdds(low, high) {
        return ((high + 1) >> 1) - (low >> 1);
    }
}
```

```csharp
public class Solution {
    public int CountOdds(int low, int high) {
        return ((high + 1) >> 1) - (low >> 1);
    }
}
```

```go
func countOdds(low int, high int) int {
    return ((high + 1) >> 1) - (low >> 1)
}
```

```kotlin
class Solution {
    fun countOdds(low: Int, high: Int): Int {
        return ((high + 1) shr 1) - (low shr 1)
    }
}
```

```swift
class Solution {
    func countOdds(_ low: Int, _ high: Int) -> Int {
        return ((high + 1) >> 1) - (low >> 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
