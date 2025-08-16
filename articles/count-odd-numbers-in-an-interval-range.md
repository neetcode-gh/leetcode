## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

> Where $n$ is the number of integers in the given range.

---

## 2. Math

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 3. Math (One Liner)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
