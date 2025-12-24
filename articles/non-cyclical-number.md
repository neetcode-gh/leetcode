## 1. Hash Set

### Intuition

A number is called **happy** if repeatedly replacing it with the **sum of the squares of its digits** eventually leads to `1`.

While doing this process, only two things can happen:
- we eventually reach `1` → the number is happy
- we fall into a **cycle** and repeat numbers forever → the number is not happy

So the key problem is **cycle detection**.

A simple and beginner-friendly way to detect a cycle is to:
- keep a **set** of numbers we have already seen
- if a number repeats, we are stuck in a loop and will never reach `1`

### Algorithm

1. Initialize an empty set `visit` to store numbers we have already seen.
2. While `n` is not in `visit`:
   - add `n` to `visit`
   - replace `n` with the sum of the squares of its digits
   - if `n` becomes `1`, return `True`
3. If we exit the loop, it means `n` repeated:
   - a cycle is detected
   - return `False`

**Helper Function (Sum of Squares)**

To compute the next number:
1. Initialize `output = 0`
2. While `n > 0`:
   - extract the last digit using `n % 10`
   - square it and add to `output`
   - remove the digit using `n //= 10`
3. Return `output`

::tabs-start

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        visit = set()

        while n not in visit:
            visit.add(n)
            n = self.sumOfSquares(n)
            if n == 1:
                return True
        return False

    def sumOfSquares(self, n: int) -> int:
        output = 0

        while n:
            digit = n % 10
            digit = digit ** 2
            output += digit
            n = n // 10
        return output
```

```java
public class Solution {
    public boolean isHappy(int n) {
        Set<Integer> visit = new HashSet<>();

        while (!visit.contains(n)) {
            visit.add(n);
            n = sumOfSquares(n);
            if (n == 1) {
                return true;
            }
        }
        return false;
    }

    private int sumOfSquares(int n) {
        int output = 0;

        while (n > 0) {
            int digit = n % 10;
            digit = digit * digit;
            output += digit;
            n /= 10;
        }
        return output;
    }
}
```

```cpp
class Solution {
public:
    bool isHappy(int n) {
        unordered_set<int> visit;

        while (visit.find(n) == visit.end()) {
            visit.insert(n);
            n = sumOfSquares(n);
            if (n == 1) {
                return true;
            }
        }
        return false;
    }

private:
    int sumOfSquares(int n) {
        int output = 0;

        while (n > 0) {
            int digit = n % 10;
            digit = digit * digit;
            output += digit;
            n /= 10;
        }
        return output;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isHappy(n) {
        const visit = new Set();

        while (!visit.has(n)) {
            visit.add(n);
            n = this.sumOfSquares(n);
            if (n === 1) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {number} n
     * @return {number}
     */
    sumOfSquares(n) {
        let output = 0;

        while (n > 0) {
            let digit = n % 10;
            digit = digit * digit;
            output += digit;
            n = Math.floor(n / 10);
        }
        return output;
    }
}
```

```csharp
public class Solution {
    public bool IsHappy(int n) {
        HashSet<int> visit = new HashSet<int>();

        while (!visit.Contains(n)) {
            visit.Add(n);
            n = SumOfSquares(n);
            if (n == 1) {
                return true;
            }
        }
        return false;
    }

    private int SumOfSquares(int n) {
        int output = 0;

        while (n > 0) {
            int digit = n % 10;
            digit = digit * digit;
            output += digit;
            n /= 10;
        }
        return output;
    }
}
```

```go
func isHappy(n int) bool {
    visit := make(map[int]bool)

    for !visit[n] {
        visit[n] = true
        n = sumOfSquares(n)
        if n == 1 {
            return true
        }
    }
    return false
}

func sumOfSquares(n int) int {
    output := 0
    for n > 0 {
        digit := n % 10
        digit = digit * digit
        output += digit
        n = n / 10
    }
    return output
}
```

```kotlin
class Solution {
    fun isHappy(n: Int): Boolean {
        val visit = HashSet<Int>()

        var num = n
        while (num !in visit) {
            visit.add(num)
            num = sumOfSquares(num)
            if (num == 1) {
                return true
            }
        }
        return false
    }

    fun sumOfSquares(n: Int): Int {
        var output = 0
        var num = n
        while (num > 0) {
            val digit = num % 10
            output += digit * digit
            num /= 10
        }
        return output
    }
}
```

```swift
class Solution {
    func isHappy(_ n: Int) -> Bool {
        var visit = Set<Int>()
        var num = n

        while !visit.contains(num) {
            visit.insert(num)
            num = sumOfSquares(num)
            if num == 1 {
                return true
            }
        }
        return false
    }

    private func sumOfSquares(_ n: Int) -> Int {
        var num = n
        var output = 0

        while num > 0 {
            let digit = num % 10
            output += digit * digit
            num /= 10
        }
        return output
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

---

## 2. Fast And Slow Pointers - I

### Intuition

A number is **happy** if repeatedly replacing it with the **sum of the squares of its digits** eventually reaches `1`.

Just like the hash set approach, the process can:
- reach `1` → happy number
- fall into a **cycle** → not a happy number

Instead of storing all visited numbers, we can detect a cycle using the **fast and slow pointers technique** (also known as Floyd’s cycle detection).

The idea:
- treat the transformation `n → sumOfSquares(n)` like moving through a linked list
- use two pointers:
  - `slow` moves **one step at a time**
  - `fast` moves **two steps at a time**
- if there is a cycle, `slow` and `fast` will eventually meet
- if the cycle includes `1`, then the number is happy

This avoids extra memory and still reliably detects cycles.

### Algorithm

1. Initialize:
   - `slow = n`
   - `fast = sumOfSquares(n)`
2. While `slow != fast`:
   - move `slow` one step:
     - `slow = sumOfSquares(slow)`
   - move `fast` two steps:
     - `fast = sumOfSquares(sumOfSquares(fast))`
3. When the loop ends, a cycle is detected.
4. If `fast == 1`:
   - the cycle ends at `1`
   - return `True`
5. Otherwise:
   - the cycle does not include `1`
   - return `False`

---

**Helper Function (Sum of Squares)**

To compute the next number:
1. Initialize `output = 0`
2. While `n > 0`:
   - extract the last digit using `n % 10`
   - square it and add to `output`
   - remove the digit using `n //= 10`
3. Return `output`

::tabs-start

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        slow, fast = n, self.sumOfSquares(n)

        while slow != fast:
            fast = self.sumOfSquares(fast)
            fast = self.sumOfSquares(fast)
            slow = self.sumOfSquares(slow)
        return True if fast == 1 else False

    def sumOfSquares(self, n: int) -> int:
        output = 0

        while n:
            digit = n % 10
            digit = digit ** 2
            output += digit
            n = n // 10
        return output
```

```java
public class Solution {
    public boolean isHappy(int n) {
        int slow = n, fast = sumOfSquares(n);

        while (slow != fast) {
            fast = sumOfSquares(fast);
            fast = sumOfSquares(fast);
            slow = sumOfSquares(slow);
        }

        return fast == 1;
    }

    private int sumOfSquares(int n) {
        int output = 0;
        while (n != 0) {
            output += (n % 10) * (n % 10);
            n /= 10;
        }
        return output;
    }
}
```

```cpp
class Solution {
public:
    bool isHappy(int n) {
        int slow = n, fast = sumOfSquares(n);

        while (slow != fast) {
            fast = sumOfSquares(fast);
            fast = sumOfSquares(fast);
            slow = sumOfSquares(slow);
        }

        return fast == 1;
    }

private:
    int sumOfSquares(int n) {
        int output = 0;
        while (n != 0) {
            output += (n % 10) * (n % 10);
            n /= 10;
        }
        return output;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isHappy(n) {
        let slow = n;
        let fast = this.sumOfSquares(n);

        while (slow !== fast) {
            fast = this.sumOfSquares(fast);
            fast = this.sumOfSquares(fast);
            slow = this.sumOfSquares(slow);
        }

        return fast === 1;
    }

    /**
     * @param {number} n
     * @return {number}
     */
    sumOfSquares(n) {
        let output = 0;
        while (n !== 0) {
            output += (n % 10) ** 2;
            n = Math.floor(n / 10);
        }
        return output;
    }
}
```

```csharp
public class Solution {
    public bool IsHappy(int n) {
        int slow = n, fast = sumOfSquares(n);

        while (slow != fast) {
            fast = sumOfSquares(fast);
            fast = sumOfSquares(fast);
            slow = sumOfSquares(slow);
        }

        return fast == 1;
    }

    private int sumOfSquares(int n) {
        int output = 0;
        while (n != 0) {
            output += (n % 10) * (n % 10);
            n /= 10;
        }
        return output;
    }
}
```

```go
func isHappy(n int) bool {
    slow, fast := n, sumOfSquares(n)

    for slow != fast {
        fast = sumOfSquares(fast)
        fast = sumOfSquares(fast)
        slow = sumOfSquares(slow)
    }

    return fast == 1
}

func sumOfSquares(n int) int {
    output := 0
    for n > 0 {
        digit := n % 10
        output += digit * digit
        n = n / 10
    }
    return output
}
```

```kotlin
class Solution {
    fun isHappy(n: Int): Boolean {
        var slow = n
        var fast = sumOfSquares(n)

        while (slow != fast) {
            fast = sumOfSquares(fast)
            fast = sumOfSquares(fast)
            slow = sumOfSquares(slow)
        }

        return fast == 1
    }

    fun sumOfSquares(n: Int): Int {
        var output = 0
        var num = n
        while (num > 0) {
            val digit = num % 10
            output += digit * digit
            num /= 10
        }
        return output
    }
}
```

```swift
class Solution {
    func isHappy(_ n: Int) -> Bool {
        var slow = n
        var fast = sumOfSquares(n)

        while slow != fast {
            fast = sumOfSquares(fast)
            fast = sumOfSquares(fast)
            slow = sumOfSquares(slow)
        }
        return fast == 1
    }

    private func sumOfSquares(_ n: Int) -> Int {
        var num = n
        var output = 0

        while num > 0 {
            let digit = num % 10
            output += digit * digit
            num /= 10
        }
        return output
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 3. Fast And Slow Pointers - II

### Intuition

A number is **happy** if repeatedly replacing it with the **sum of the squares of its digits** eventually reaches `1`.

Just like before, this process either:
- reaches `1` → happy number
- falls into a **cycle** → not a happy number

This solution uses a different cycle detection method called **Brent’s Algorithm**, which is another form of fast–slow pointer technique.

Key idea:
- We still move through the sequence `n → sumOfSquares(n)`
- But instead of moving one pointer twice as fast every step, we:
  - increase the distance between comparisons in **powers of two**
- This reduces the number of comparisons and still guarantees cycle detection

We keep track of:
- `slow` → a checkpoint value
- `fast` → the moving value
- `power` → how far we go before resetting `slow`
- `lam` → current distance since last reset

If `fast` ever equals `slow`, a cycle is detected.

### Algorithm

1. Initialize:
   - `slow = n`
   - `fast = sumOfSquares(n)`
   - `power = 1` (current block size)
   - `lam = 1` (steps taken in current block)
2. While `slow != fast`:
3. If `power == lam`:
   - move the checkpoint:
     - `slow = fast`
   - double the block size:
     - `power *= 2`
   - reset step counter:
     - `lam = 0`
4. Move `fast` one step forward:
   - `fast = sumOfSquares(fast)`
5. Increment `lam` by 1.
6. When the loop ends, a cycle is detected.
7. If `fast == 1`:
   - the cycle ends at `1`
   - return `True`
8. Otherwise:
   - return `False`

---

**Helper Function (Sum of Squares)**

To compute the next number:
1. Initialize `output = 0`
2. While `n > 0`:
   - extract the last digit using `n % 10`
   - square it and add to `output`
   - remove the digit using `n //= 10`
3. Return `output`

::tabs-start

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        slow, fast = n, self.sumOfSquares(n)
        power = lam = 1

        while slow != fast:
            if power == lam:
                slow = fast
                power *= 2
                lam = 0
            fast = self.sumOfSquares(fast)
            lam += 1
        return True if fast == 1 else False

    def sumOfSquares(self, n: int) -> int:
        output = 0

        while n:
            digit = n % 10
            digit = digit ** 2
            output += digit
            n = n // 10
        return output
```

```java
public class Solution {
    public boolean isHappy(int n) {
        int slow = n, fast = sumOfSquares(n);
        int power = 1, lam = 1;
        while (slow != fast) {
            if (power == lam) {
                slow = fast;
                power *= 2;
                lam = 0;
            }
            lam++;
            fast = sumOfSquares(fast);
        }

        return fast == 1;
    }

    private int sumOfSquares(int n) {
        int output = 0;
        while (n != 0) {
            output += (n % 10) * (n % 10);
            n /= 10;
        }
        return output;
    }
}
```

```cpp
class Solution {
public:
    bool isHappy(int n) {
        int slow = n, fast = sumOfSquares(n);
        int power = 1, lam = 1;

        while (slow != fast) {
            if (power == lam) {
                slow = fast;
                power *= 2;
                lam = 0;
            }
            lam++;
            fast = sumOfSquares(fast);
        }

        return fast == 1;
    }

private:
    int sumOfSquares(int n) {
        int output = 0;
        while (n != 0) {
            output += (n % 10) * (n % 10);
            n /= 10;
        }
        return output;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isHappy(n) {
        let slow = n;
        let fast = this.sumOfSquares(n);
        let power = 1,
            lam = 1;

        while (slow !== fast) {
            if (power === lam) {
                slow = fast;
                power *= 2;
                lam = 0;
            }
            lam++;
            fast = this.sumOfSquares(fast);
        }

        return fast === 1;
    }

    /**
     * @param {number} n
     * @return {number}
     */
    sumOfSquares(n) {
        let output = 0;
        while (n !== 0) {
            output += (n % 10) ** 2;
            n = Math.floor(n / 10);
        }
        return output;
    }
}
```

```csharp
public class Solution {
    public bool IsHappy(int n) {
        int slow = n, fast = sumOfSquares(n);
        int power = 1, lam = 1;

        while (slow != fast) {
            if (power == lam) {
                slow = fast;
                power *= 2;
                lam = 0;
            }
            lam++;
            fast = sumOfSquares(fast);
        }

        return fast == 1;
    }

    private int sumOfSquares(int n) {
        int output = 0;
        while (n != 0) {
            output += (n % 10) * (n % 10);
            n /= 10;
        }
        return output;
    }
}
```

```go
func isHappy(n int) bool {
    slow, fast := n, sumOfSquares(n)
    power, lam := 1, 1

    for slow != fast {
        if power == lam {
            slow = fast
            power *= 2
            lam = 0
        }
        fast = sumOfSquares(fast)
        lam++
    }

    return fast == 1
}

func sumOfSquares(n int) int {
    output := 0
    for n > 0 {
        digit := n % 10
        output += digit * digit
        n = n / 10
    }
    return output
}
```

```kotlin
class Solution {
    fun isHappy(n: Int): Boolean {
        var slow = n
        var fast = sumOfSquares(n)
        var power = 1
        var lam = 1

        while (slow != fast) {
            if (power == lam) {
                slow = fast
                power *= 2
                lam = 0
            }
            fast = sumOfSquares(fast)
            lam++
        }

        return fast == 1
    }

    fun sumOfSquares(n: Int): Int {
        var output = 0
        var num = n
        while (num > 0) {
            val digit = num % 10
            output += digit * digit
            num /= 10
        }
        return output
    }
}
```

```swift
class Solution {
    func isHappy(_ n: Int) -> Bool {
        var slow = n
        var fast = sumOfSquares(n)
        var power = 1
        var lam = 1

        while slow != fast {
            if power == lam {
                slow = fast
                power *= 2
                lam = 0
            }
            fast = sumOfSquares(fast)
            lam += 1
        }
        return fast == 1
    }

    private func sumOfSquares(_ n: Int) -> Int {
        var num = n
        var output = 0

        while num > 0 {
            let digit = num % 10
            output += digit * digit
            num /= 10
        }
        return output
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
