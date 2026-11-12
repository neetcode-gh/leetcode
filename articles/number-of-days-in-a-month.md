## 1. Simulation

::tabs-start

```python
class Solution:
    def numberOfDays(self, year: int, month: int) -> int:
        if month == 2:
            if year % 400 == 0 or (year % 4 == 0 and year % 100 != 0):
                return 29
            return 28
        if month == 4 or month == 6 or month == 9 or month == 11:
            return 30
        return 31
```

```java
public class Solution {
    public int numberOfDays(int year, int month) {
        if (month == 2) {
            if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
                return 29;
            }
            return 28;
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        return 31;
    }
}
```

```cpp
class Solution {
public:
    int numberOfDays(int year, int month) {
        if (month == 2) {
            if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
                return 29;
            }
            return 28;
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        return 31;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} year
     * @param {number} month
     * @return {number}
     */
    numberOfDays(year, month) {
        if (month === 2) {
            if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
                return 29;
            }
            return 28;
        }
        if (month === 4 || month === 6 || month === 9 || month === 11) {
            return 30;
        }
        return 31;
    }
}
```

```csharp
public class Solution {
    public int NumberOfDays(int year, int month) {
        if (month == 2) {
            if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
                return 29;
            }
            return 28;
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        return 31;
    }
}
```

```go
func numberOfDays(year int, month int) int {
    if month == 2 {
        if year%400 == 0 || (year%4 == 0 && year%100 != 0) {
            return 29
        }
        return 28
    }
    if month == 4 || month == 6 || month == 9 || month == 11 {
        return 30
    }
    return 31
}
```

```kotlin
class Solution {
    fun numberOfDays(year: Int, month: Int): Int {
        if (month == 2) {
            if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
                return 29
            }
            return 28
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30
        }
        return 31
    }
}
```

```swift
class Solution {
    func numberOfDays(_ year: Int, _ month: Int) -> Int {
        if month == 2 {
            if year % 400 == 0 || (year % 4 == 0 && year % 100 != 0) {
                return 29
            }
            return 28
        }
        if month == 4 || month == 6 || month == 9 || month == 11 {
            return 30
        }
        return 31
    }
}
```

```rust
impl Solution {
    pub fn number_of_days(year: i32, month: i32) -> i32 {
        if month == 2 {
            if year % 400 == 0 || (year % 4 == 0 && year % 100 != 0) {
                return 29;
            }
            return 28;
        }
        if month == 4 || month == 6 || month == 9 || month == 11 {
            return 30;
        }
        31
    }
}
```

```typescript
class Solution {
    /**
     * @param {number} year
     * @param {number} month
     * @return {number}
     */
    numberOfDays(year: number, month: number): number {
        if (month === 2) {
            if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
                return 29;
            }
            return 28;
        }
        if (month === 4 || month === 6 || month === 9 || month === 11) {
            return 30;
        }
        return 31;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 2. Array

::tabs-start

```python
class Solution:
    def numberOfDays(self, year: int, month: int) -> int:
        days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        isLeap = year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)
        if month == 2 and isLeap:
            return 29
        return days[month - 1]
```

```java
public class Solution {
    public int numberOfDays(int year, int month) {
        int[] days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        boolean isLeap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
        if (month == 2 && isLeap) {
            return 29;
        }
        return days[month - 1];
    }
}
```

```cpp
class Solution {
public:
    int numberOfDays(int year, int month) {
        int days[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        bool isLeap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
        if (month == 2 && isLeap) {
            return 29;
        }
        return days[month - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} year
     * @param {number} month
     * @return {number}
     */
    numberOfDays(year, month) {
        const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const isLeap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
        if (month === 2 && isLeap) {
            return 29;
        }
        return days[month - 1];
    }
}
```

```csharp
public class Solution {
    public int NumberOfDays(int year, int month) {
        int[] days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        bool isLeap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
        if (month == 2 && isLeap) {
            return 29;
        }
        return days[month - 1];
    }
}
```

```go
func numberOfDays(year int, month int) int {
    days := []int{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
    isLeap := year%400 == 0 || (year%4 == 0 && year%100 != 0)
    if month == 2 && isLeap {
        return 29
    }
    return days[month-1]
}
```

```kotlin
class Solution {
    fun numberOfDays(year: Int, month: Int): Int {
        val days = intArrayOf(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        val isLeap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)
        if (month == 2 && isLeap) {
            return 29
        }
        return days[month - 1]
    }
}
```

```swift
class Solution {
    func numberOfDays(_ year: Int, _ month: Int) -> Int {
        let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let isLeap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)
        if month == 2 && isLeap {
            return 29
        }
        return days[month - 1]
    }
}
```

```rust
impl Solution {
    pub fn number_of_days(year: i32, month: i32) -> i32 {
        let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let is_leap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
        if month == 2 && is_leap {
            return 29;
        }
        days[(month - 1) as usize]
    }
}
```

```typescript
class Solution {
    /**
     * @param {number} year
     * @param {number} month
     * @return {number}
     */
    numberOfDays(year: number, month: number): number {
        const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const isLeap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
        if (month === 2 && isLeap) {
            return 29;
        }
        return days[month - 1];
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
    def numberOfDays(self, year: int, month: int) -> int:
        res = 28 + (month + month // 8) % 2 + 2 % month + 2 * (1 // month)
        isLeap = year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)
        if month == 2 and isLeap:
            res += 1
        return res
```

```java
public class Solution {
    public int numberOfDays(int year, int month) {
        int res = 28 + (month + month / 8) % 2 + 2 % month + 2 * (1 / month);
        boolean isLeap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
        if (month == 2 && isLeap) {
            res++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numberOfDays(int year, int month) {
        int res = 28 + (month + month / 8) % 2 + 2 % month + 2 * (1 / month);
        bool isLeap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
        if (month == 2 && isLeap) {
            res++;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} year
     * @param {number} month
     * @return {number}
     */
    numberOfDays(year, month) {
        let res =
            28 +
            ((month + Math.floor(month / 8)) % 2) +
            (2 % month) +
            2 * Math.floor(1 / month);
        const isLeap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
        if (month === 2 && isLeap) {
            res++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumberOfDays(int year, int month) {
        int res = 28 + (month + month / 8) % 2 + 2 % month + 2 * (1 / month);
        bool isLeap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
        if (month == 2 && isLeap) {
            res++;
        }
        return res;
    }
}
```

```go
func numberOfDays(year int, month int) int {
    res := 28 + (month+month/8)%2 + 2%month + 2*(1/month)
    isLeap := year%400 == 0 || (year%4 == 0 && year%100 != 0)
    if month == 2 && isLeap {
        res++
    }
    return res
}
```

```kotlin
class Solution {
    fun numberOfDays(year: Int, month: Int): Int {
        var res = 28 + (month + month / 8) % 2 + 2 % month + 2 * (1 / month)
        val isLeap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)
        if (month == 2 && isLeap) {
            res++
        }
        return res
    }
}
```

```swift
class Solution {
    func numberOfDays(_ year: Int, _ month: Int) -> Int {
        var res = 28 + (month + month / 8) % 2 + 2 % month + 2 * (1 / month)
        let isLeap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)
        if month == 2 && isLeap {
            res += 1
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn number_of_days(year: i32, month: i32) -> i32 {
        let mut res = 28 + (month + month / 8) % 2 + 2 % month + 2 * (1 / month);
        let is_leap = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
        if month == 2 && is_leap {
            res += 1;
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number} year
     * @param {number} month
     * @return {number}
     */
    numberOfDays(year: number, month: number): number {
        let res =
            28 +
            ((month + Math.floor(month / 8)) % 2) +
            (2 % month) +
            2 * Math.floor(1 / month);
        const isLeap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
        if (month === 2 && isLeap) {
            res++;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
