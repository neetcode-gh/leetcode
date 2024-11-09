## 1. Hash Set

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(\log n)$

---

## 2. Fast And Slow Pointers - I

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(1)$

---

## 3. Fast And Slow Pointers - II

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
        let power = 1, lam = 1;

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(1)$