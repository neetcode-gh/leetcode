## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Digit Extraction** - Using modulo and division to extract individual digits from a number
- **Exponentiation** - Raising numbers to a power
- **Basic Math** - Understanding number properties and digit counting techniques

---

## 1. Calculate k by Converting to String

### Intuition

An Armstrong number equals the sum of its digits each raised to the power of the total digit count. For example, 153 has 3 digits, and 1^3 + 5^3 + 3^3 = 153.

The straightforward approach is to convert the number to a string to count digits, then extract each digit and compute the sum of powers. We compare this sum to the original number.

### Algorithm

1. Convert `n` to a string and get its length `k`.
2. Extract each digit by repeatedly taking `n % 10` and dividing by 10.
3. For each digit, add `digit^k` to a running sum.
4. Return `true` if the sum equals the original number.

::tabs-start

```python
class Solution:
    def isArmstrong(self, n: int) -> bool:
        def getSumOfKthPowerOfDigits(num, k):
            result = 0

            while num != 0:
                result += (num % 10) ** k
                num //= 10

            return result
        
        length = len(str(n))
        
        return getSumOfKthPowerOfDigits(n, length) == n
```

```java
class Solution {
    public int getSumOfKthPowerOfDigits(int n, int k) {
        int result = 0;

        while (n != 0) {
            result += Math.pow(n % 10, k);
            n /= 10;
        }

        return result;
    }

    public boolean isArmstrong(int n) {
        int length = String.valueOf(n).length();

        return getSumOfKthPowerOfDigits(n, length) == n;
    }
}
```

```cpp
class Solution {
public:
    int getSumOfKthPowerOfDigits(int n, int k) {
        int result = 0;

        while (n != 0) {
            result += pow(n % 10, k);
            n /= 10;
        }

        return result;
    }

    bool isArmstrong(int n) {
        int length = to_string(n).length();

        return getSumOfKthPowerOfDigits(n, length) == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isArmstrong(n) {
        const getSumOfKthPowerOfDigits = (num, k) => {
            let result = 0;
            while (num !== 0) {
                result += Math.pow(num % 10, k);
                num = Math.floor(num / 10);
            }
            return result;
        };

        const length = String(n).length;

        return getSumOfKthPowerOfDigits(n, length) === n;
    }
}
```

```csharp
public class Solution {
    private int GetSumOfKthPowerOfDigits(int n, int k) {
        int result = 0;
        while (n != 0) {
            result += (int)Math.Pow(n % 10, k);
            n /= 10;
        }
        return result;
    }

    public bool IsArmstrong(int n) {
        int length = n.ToString().Length;
        return GetSumOfKthPowerOfDigits(n, length) == n;
    }
}
```

```go
func isArmstrong(n int) bool {
    getSumOfKthPowerOfDigits := func(num, k int) int {
        result := 0
        for num != 0 {
            digit := num % 10
            power := 1
            for i := 0; i < k; i++ {
                power *= digit
            }
            result += power
            num /= 10
        }
        return result
    }

    length := len(fmt.Sprintf("%d", n))
    return getSumOfKthPowerOfDigits(n, length) == n
}
```

```kotlin
class Solution {
    private fun getSumOfKthPowerOfDigits(n: Int, k: Int): Int {
        var num = n
        var result = 0
        while (num != 0) {
            result += Math.pow((num % 10).toDouble(), k.toDouble()).toInt()
            num /= 10
        }
        return result
    }

    fun isArmstrong(n: Int): Boolean {
        val length = n.toString().length
        return getSumOfKthPowerOfDigits(n, length) == n
    }
}
```

```swift
class Solution {
    func isArmstrong(_ n: Int) -> Bool {
        func getSumOfKthPowerOfDigits(_ num: Int, _ k: Int) -> Int {
            var num = num
            var result = 0
            while num != 0 {
                var power = 1
                for _ in 0..<k {
                    power *= num % 10
                }
                result += power
                num /= 10
            }
            return result
        }

        let length = String(n).count
        return getSumOfKthPowerOfDigits(n, length) == n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$

- Space complexity: $O(1)$ constant space

>  Where $M$ is the number of digits in the input integer `n`.

---

## 2. Calculate k by Using Log

### Intuition

Instead of converting to a string, we can use logarithms to count digits. The number of digits in a positive integer `n` is `floor(log10(n)) + 1`. This avoids string allocation and can be slightly more efficient.

The rest of the logic remains the same: extract digits, raise each to the power of `k`, sum them up, and compare.

### Algorithm

1. Compute `k = floor(log10(n)) + 1` to get the digit count.
2. Extract each digit using modulo and division.
3. Sum up each digit raised to the power of `k`.
4. Return `true` if the sum equals `n`.

::tabs-start

```python
class Solution:
    def isArmstrong(self, n: int) -> bool:
        def getSumOfKthPowerOfDigits(num, k):
            result = 0

            while num != 0:
                result += (num % 10) ** k
                num //= 10

            return result
        
        length = int(math.log10(n)) + 1
        
        return getSumOfKthPowerOfDigits(n, length) == n
```

```java
class Solution {
    public int getSumOfKthPowerOfDigits(int n, int k) {
        int result = 0;

        while (n != 0) {
            result += Math.pow(n % 10, k);
            n /= 10;
        }

        return result;
    }

    public boolean isArmstrong(int n) {
        int length = (int) Math.log10(n) + 1;

        return getSumOfKthPowerOfDigits(n, length) == n;
    }
}
```

```cpp
class Solution {
public:
    int getSumOfKthPowerOfDigits(int n, int k) {
        int result = 0;

        while (n != 0) {
            result += pow(n % 10, k);
            n /= 10;
        }

        return result;
    }

    bool isArmstrong(int n) {
        int length = log10(n) + 1;

        return getSumOfKthPowerOfDigits(n, length) == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isArmstrong(n) {
        const getSumOfKthPowerOfDigits = (num, k) => {
            let result = 0;

            while (num !== 0) {
                result += Math.pow(num % 10, k);
                num = Math.floor(num / 10);
            }

            return result;
        };

        const length = Math.floor(Math.log10(n)) + 1;

        return getSumOfKthPowerOfDigits(n, length) === n;
    }
}
```

```csharp
public class Solution {
    private int GetSumOfKthPowerOfDigits(int n, int k) {
        int result = 0;
        while (n != 0) {
            result += (int)Math.Pow(n % 10, k);
            n /= 10;
        }
        return result;
    }

    public bool IsArmstrong(int n) {
        int length = (int)Math.Log10(n) + 1;
        return GetSumOfKthPowerOfDigits(n, length) == n;
    }
}
```

```go
func isArmstrong(n int) bool {
    getSumOfKthPowerOfDigits := func(num, k int) int {
        result := 0
        for num != 0 {
            digit := num % 10
            power := 1
            for i := 0; i < k; i++ {
                power *= digit
            }
            result += power
            num /= 10
        }
        return result
    }

    length := int(math.Log10(float64(n))) + 1
    return getSumOfKthPowerOfDigits(n, length) == n
}
```

```kotlin
class Solution {
    private fun getSumOfKthPowerOfDigits(n: Int, k: Int): Int {
        var num = n
        var result = 0
        while (num != 0) {
            result += Math.pow((num % 10).toDouble(), k.toDouble()).toInt()
            num /= 10
        }
        return result
    }

    fun isArmstrong(n: Int): Boolean {
        val length = (Math.log10(n.toDouble()) + 1).toInt()
        return getSumOfKthPowerOfDigits(n, length) == n
    }
}
```

```swift
class Solution {
    func isArmstrong(_ n: Int) -> Bool {
        func getSumOfKthPowerOfDigits(_ num: Int, _ k: Int) -> Int {
            var num = num
            var result = 0
            while num != 0 {
                var power = 1
                for _ in 0..<k {
                    power *= num % 10
                }
                result += power
                num /= 10
            }
            return result
        }

        let length = Int(log10(Double(n))) + 1
        return getSumOfKthPowerOfDigits(n, length) == n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$

- Space complexity: $O(1)$ constant space

>  Where $M$ is the number of digits in the input integer `n`.

---

## 3. Calculate k Without Built-in Methods

### Intuition

We can count digits without any built-in functions by simply dividing the number by 10 until it becomes 0, counting iterations. This approach uses only basic arithmetic and works in any language without library dependencies.

### Algorithm

1. Copy `n` to a temporary variable.
2. Count digits by dividing by 10 until the number becomes 0.
3. Extract each digit from the original number and sum `digit^k`.
4. Return `true` if the sum equals `n`.

::tabs-start

```python
class Solution:
    def isArmstrong(self, n: int) -> bool:
        def getSumOfKthPowerOfDigits(num, k):
            result = 0

            while num != 0:
                result += (num % 10) ** k
                num //= 10
                
            return result

        length = 0
        temp_n = n

        while temp_n != 0:
            length += 1
            temp_n //= 10
        
        return getSumOfKthPowerOfDigits(n, length) == n
```

```java
class Solution {
    public int getSumOfKthPowerOfDigits(int n, int k) {
        int result = 0;

        while(n != 0) {
            result += Math.pow(n % 10, k);
            n /= 10;
        }

        return result;
    }

    public boolean isArmstrong(int n) {
        int length = 0;
        int tempN = n;

        while (tempN != 0) {
            length++;
            tempN /= 10;
        }

        return getSumOfKthPowerOfDigits(n, length) == n;
    }
}
```

```cpp
class Solution {
public:
    int getSumOfKthPowerOfDigits(int n, int k) {
       int result = 0;

        while(n != 0) {
            result += pow(n % 10, k);
            n /= 10;
        }

       return result;
    }

    bool isArmstrong(int n) {
        int length = 0;
        int tempN = n;

        while (tempN) {
            length++;
            tempN /= 10;
        }

        return getSumOfKthPowerOfDigits(n, length) == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isArmstrong(n) {
        const getSumOfKthPowerOfDigits = (num, k) => {
            let result = 0;

            while (num !== 0) {
                result += Math.pow(num % 10, k);
                num = Math.floor(num / 10);
            }

            return result;
        };

        let length = 0;
        let tempN = n;

        while (tempN !== 0) {
            length++;
            tempN = Math.floor(tempN / 10);
        }

        return getSumOfKthPowerOfDigits(n, length) === n;
    }
}
```

```csharp
public class Solution {
    private int GetSumOfKthPowerOfDigits(int n, int k) {
        int result = 0;
        while (n != 0) {
            result += (int)Math.Pow(n % 10, k);
            n /= 10;
        }
        return result;
    }

    public bool IsArmstrong(int n) {
        int length = 0;
        int tempN = n;
        while (tempN != 0) {
            length++;
            tempN /= 10;
        }
        return GetSumOfKthPowerOfDigits(n, length) == n;
    }
}
```

```go
func isArmstrong(n int) bool {
    getSumOfKthPowerOfDigits := func(num, k int) int {
        result := 0
        for num != 0 {
            digit := num % 10
            power := 1
            for i := 0; i < k; i++ {
                power *= digit
            }
            result += power
            num /= 10
        }
        return result
    }

    length := 0
    tempN := n
    for tempN != 0 {
        length++
        tempN /= 10
    }
    return getSumOfKthPowerOfDigits(n, length) == n
}
```

```kotlin
class Solution {
    private fun getSumOfKthPowerOfDigits(n: Int, k: Int): Int {
        var num = n
        var result = 0
        while (num != 0) {
            result += Math.pow((num % 10).toDouble(), k.toDouble()).toInt()
            num /= 10
        }
        return result
    }

    fun isArmstrong(n: Int): Boolean {
        var length = 0
        var tempN = n
        while (tempN != 0) {
            length++
            tempN /= 10
        }
        return getSumOfKthPowerOfDigits(n, length) == n
    }
}
```

```swift
class Solution {
    func isArmstrong(_ n: Int) -> Bool {
        func getSumOfKthPowerOfDigits(_ num: Int, _ k: Int) -> Int {
            var num = num
            var result = 0
            while num != 0 {
                var power = 1
                for _ in 0..<k {
                    power *= num % 10
                }
                result += power
                num /= 10
            }
            return result
        }

        var length = 0
        var tempN = n
        while tempN != 0 {
            length += 1
            tempN /= 10
        }
        return getSumOfKthPowerOfDigits(n, length) == n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$

- Space complexity: $O(1)$ constant space

>  Where $M$ is the number of digits in the input integer `n`.

---

## Common Pitfalls

### Using a Fixed Power Instead of the Digit Count
A common mistake is hardcoding the exponent (e.g., always using 3) instead of dynamically calculating the number of digits. Armstrong numbers are defined with respect to their digit count, so 153 uses power 3, but 1634 uses power 4.
```python
# Wrong: always using power 3
result += digit ** 3
```

### Modifying the Original Number Without Saving It
When extracting digits by repeatedly dividing by 10, the original number gets destroyed. Forgetting to save the original value before the loop means you have nothing to compare the sum against.
```python
# Wrong: n is modified and can't be compared later
while n != 0:
    result += (n % 10) ** k
    n //= 10
return result == n  # n is now 0!
```
