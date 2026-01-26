## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Basic Loops** - Iterating through sequences and tracking state across iterations
- **Arithmetic Series** - Understanding how to sum sequences like 1+2+3+...+n
- **Math Formulas** - Using closed-form expressions to compute sums efficiently

---

## 1. Simulation

### Intuition
The deposit pattern follows a simple rule: each day we deposit one more dollar than the previous day, but every Monday we reset to deposit one more dollar than we did on the previous Monday. We can simulate this process day by day, tracking when each week ends to reset the starting deposit for the new week.

### Algorithm
1. Initialize variables to track the current day, the current deposit amount (starting at `1`), and the total result.
2. Loop through each day from `0` to `n-1`.
3. Add the current deposit to the result, then increment the deposit for the next day.
4. After every 7 days (when day is divisible by 7), reset the deposit to the week number plus `1` (so week 1 starts with `1`, week 2 starts with `2`, etc.).
5. Return the total accumulated result.

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

```csharp
public class Solution {
    public int TotalMoney(int n) {
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

```go
func totalMoney(n int) int {
    day, deposit, res := 0, 1, 0

    for day < n {
        res += deposit
        deposit++
        day++

        if day%7 == 0 {
            deposit = 1 + day/7
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun totalMoney(n: Int): Int {
        var day = 0
        var deposit = 1
        var res = 0

        while (day < n) {
            res += deposit
            deposit++
            day++

            if (day % 7 == 0) {
                deposit = 1 + day / 7
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func totalMoney(_ n: Int) -> Int {
        var day = 0, deposit = 1, res = 0

        while day < n {
            res += deposit
            deposit += 1
            day += 1

            if day % 7 == 0 {
                deposit = 1 + day / 7
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Math

### Intuition
Instead of simulating each day, we can use arithmetic series formulas. Each complete week deposits a fixed sum: week 1 deposits 1+2+3+4+5+6+7=28, week 2 deposits 2+3+4+5+6+7+8=35, and so on. The weekly sums form an arithmetic sequence with common difference 7. For the remaining days after complete weeks, we just add the deposits for those partial days.

### Algorithm
1. Calculate the number of complete weeks as `n/7`.
2. The first week contributes `28`, and each subsequent week adds `7` more. Use the arithmetic series sum formula: `weeks * (low + high) / 2`, where `low = 28` and `high = 28 + 7 * (weeks - 1)`.
3. For the remaining days (`n % 7`), the Monday deposit is `weeks + 1`. Add the deposits for each remaining day (`monday`, `monday+1`, `monday+2`, ...).
4. Return the total sum.

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

```csharp
public class Solution {
    public int TotalMoney(int n) {
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

```go
func totalMoney(n int) int {
    weeks := n / 7
    low := 28
    high := 28 + 7*(weeks-1)
    res := weeks * (low + high) / 2

    monday := weeks + 1
    for i := 0; i < n%7; i++ {
        res += i + monday
    }

    return res
}
```

```kotlin
class Solution {
    fun totalMoney(n: Int): Int {
        val weeks = n / 7
        val low = 28
        val high = 28 + 7 * (weeks - 1)
        var res = weeks * (low + high) / 2

        val monday = weeks + 1
        for (i in 0 until n % 7) {
            res += i + monday
        }

        return res
    }
}
```

```swift
class Solution {
    func totalMoney(_ n: Int) -> Int {
        let weeks = n / 7
        let low = 28
        let high = 28 + 7 * (weeks - 1)
        var res = weeks * (low + high) / 2

        let monday = weeks + 1
        for i in 0..<(n % 7) {
            res += i + monday
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 3. Math (Optimal)

### Intuition
We can derive a closed-form formula using the sum of first `k` natural numbers: `SUM(k) = k*(k+1)/2`. Each week's extra contribution above the base week follows a pattern, and the remaining days also follow an arithmetic progression. This eliminates the loop needed for remaining days in the previous approach.

### Algorithm
1. Define a helper function `SUM(x) = x*(x+1)/2` which gives the sum of first `x` natural numbers.
2. Calculate the number of complete weeks.
3. The contribution from complete weeks is: `SUM(weeks-1) * 7 + weeks * SUM(7)`. This accounts for the increasing weekly base and the standard week pattern.
4. The contribution from remaining days is: `SUM(n % 7) + weeks * (n % 7)`. This adds the base daily progression plus the offset from the current week.
5. Return the total sum.

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

```csharp
public class Solution {
    public int TotalMoney(int n) {
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

```go
func totalMoney(n int) int {
    SUM := func(x int) int {
        return (x * (x + 1)) / 2
    }

    weeks := n / 7
    res := SUM(weeks-1)*7 + weeks*SUM(7)
    res += SUM(n%7) + weeks*(n%7)
    return res
}
```

```kotlin
class Solution {
    fun totalMoney(n: Int): Int {
        fun SUM(x: Int) = (x * (x + 1)) / 2

        val weeks = n / 7
        var res = SUM(weeks - 1) * 7 + weeks * SUM(7)
        res += SUM(n % 7) + weeks * (n % 7)
        return res
    }
}
```

```swift
class Solution {
    func totalMoney(_ n: Int) -> Int {
        func SUM(_ x: Int) -> Int {
            return (x * (x + 1)) / 2
        }

        let weeks = n / 7
        var res = SUM(weeks - 1) * 7 + weeks * SUM(7)
        res += SUM(n % 7) + weeks * (n % 7)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Using Wrong Starting Deposit for Each Week
Each Monday starts with `week_number` dollars (week 1 starts with 1, week 2 starts with 2, etc.), not always 1. Forgetting to increment the Monday deposit each week gives incorrect totals.
```python
# Wrong: always starting at 1
if day % 7 == 0:
    deposit = 1  # Should be 1 + (day // 7)
```

### Off-by-One in Week Calculation
When computing complete weeks, using `(n + 6) // 7` instead of `n // 7` overcounts partial weeks as complete, leading to incorrect sums in the math-based approach.
