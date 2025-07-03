## 1. Simulation

::tabs-start

```python
class Solution:
    def totalMoney(self, n: int) -> int:
        day, deposit = 0, 1
        res = 0

        while day < n:
            res += deposit
            deposit += 1
            day += 1

            if day % 7 == 0:
                deposit = 1 + day // 7

        return res
```

```java
public class Solution {
    public int totalMoney(int n) {
        int day = 0, deposit = 1, res = 0;

        while (day < n) {
            res += deposit;
            deposit++;
            day++;

            if (day % 7 == 0) {
                deposit = 1 + day / 7;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int totalMoney(int n) {
        int day = 0, deposit = 1, res = 0;

        while (day < n) {
            res += deposit;
            deposit++;
            day++;

            if (day % 7 == 0) {
                deposit = 1 + day / 7;
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
    totalMoney(n) {
        let day = 0,
            deposit = 1,
            res = 0;

        while (day < n) {
            res += deposit;
            deposit++;
            day++;

            if (day % 7 === 0) {
                deposit = 1 + Math.floor(day / 7);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Math

::tabs-start

```python
class Solution:
    def totalMoney(self, n: int) -> int:
        weeks = n // 7
        low = 28
        high = 28 + 7 * (weeks - 1)
        res = weeks * (low + high) // 2

        monday = weeks + 1
        for i in range(n % 7):
            res += i + monday

        return res
```

```java
public class Solution {
    public int totalMoney(int n) {
        int weeks = n / 7;
        int low = 28;
        int high = 28 + 7 * (weeks - 1);
        int res = weeks * (low + high) / 2;

        int monday = weeks + 1;
        for (int i = 0; i < n % 7; i++) {
            res += i + monday;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int totalMoney(int n) {
        int weeks = n / 7;
        int low = 28;
        int high = 28 + 7 * (weeks - 1);
        int res = weeks * (low + high) / 2;

        int monday = weeks + 1;
        for (int i = 0; i < n % 7; i++) {
            res += i + monday;
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
    totalMoney(n) {
        const weeks = Math.floor(n / 7);
        const low = 28;
        const high = 28 + 7 * (weeks - 1);
        let res = (weeks * (low + high)) / 2;

        const monday = weeks + 1;
        for (let i = 0; i < n % 7; i++) {
            res += i + monday;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 3. Math (Optimal)

::tabs-start

```python
class Solution:
    def totalMoney(self, n: int) -> int:
        SUM = lambda x: (x * (x + 1)) >> 1
        weeks = n // 7
        res = SUM(weeks - 1) * 7 + weeks * SUM(7)
        res += SUM(n % 7) + weeks * (n % 7)
        return res
```

```java
public class Solution {
    public int totalMoney(int n) {
        int weeks = n / 7;
        int res = SUM(weeks - 1) * 7 + weeks * SUM(7);
        res += SUM(n % 7) + weeks * (n % 7);
        return res;
    }

    private int SUM(int n) {
        return (n * (n + 1)) / 2;
    }
}
```

```cpp
class Solution {
public:
    int totalMoney(int n) {
        auto SUM = [](int x) { return (x * (x + 1)) / 2; };

        int weeks = n / 7;
        int res = SUM(weeks - 1) * 7 + weeks * SUM(7);
        res += SUM(n % 7) + weeks * (n % 7);
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
    totalMoney(n) {
        const SUM = (x) => (x * (x + 1)) / 2;

        const weeks = Math.floor(n / 7);
        let res = SUM(weeks - 1) * 7 + weeks * SUM(7);
        res += SUM(n % 7) + weeks * (n % 7);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
