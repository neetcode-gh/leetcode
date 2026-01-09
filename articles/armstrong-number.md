## 1. Calculate k by Converting to String

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
