## 1. Recursion

::tabs-start

```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        if not digits:
            return [1]

        if digits[-1] < 9:
            digits[-1] += 1
            return digits
        else:
            return self.plusOne(digits[:-1]) + [0]
```

```java
public class Solution {
    public int[] plusOne(int[] digits) {
        if (digits.length == 0)
            return new int[]{1};

        if (digits[digits.length - 1] < 9) {
            digits[digits.length - 1] += 1;
            return digits;
        } else {
            int[] newDigits = new int[digits.length - 1];
            System.arraycopy(digits, 0, newDigits, 0, digits.length - 1);
            int[] result = plusOne(newDigits);
            result = java.util.Arrays.copyOf(result, result.length + 1);
            result[result.length - 1] = 0;
            return result;
        }
    }
}
```

```cpp
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        if (digits.empty())
            return {1};

        if (digits.back() < 9) {
            digits.back() += 1;
            return digits;
        } else {
            digits.pop_back();
            vector<int> result = plusOne(digits);
            result.push_back(0);
            return result;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} digits
     * @return {number[]}
     */
    plusOne(digits) {
        if (digits.length === 0) {
            return [1];
        }

        if (digits[digits.length - 1] < 9) {
            digits[digits.length - 1] += 1;
            return digits;
        } else {
            return [...this.plusOne(digits.slice(0, digits.length - 1)), 0];
        }
    }
}
```

```csharp
public class Solution {
    public int[] PlusOne(int[] digits) {
        if (digits.Length == 0)
            return new int[] { 1 };

        if (digits[digits.Length - 1] < 9) {
            digits[digits.Length - 1] += 1;
            return digits;
        } else {
            int[] newDigits = new int[digits.Length - 1];
            Array.Copy(digits, 0, newDigits, 0, digits.Length - 1);
            int[] result = PlusOne(newDigits);
            Array.Resize(ref result, result.Length + 1);
            result[result.Length - 1] = 0;
            return result;
        }
    }
}
```

```go
func plusOne(digits []int) []int {
    if len(digits) == 0 {
        return []int{1}
    }

    if digits[len(digits)-1] < 9 {
        digits[len(digits)-1]++
        return digits
    } else {
        return append(plusOne(digits[:len(digits)-1]), 0)
    }
}
```

```kotlin
class Solution {
    fun plusOne(digits: IntArray): IntArray {
        if (digits.isEmpty()) {
            return intArrayOf(1)
        }

        if (digits[digits.size - 1] < 9) {
            digits[digits.size - 1]++
            return digits
        } else {
            return plusOne(digits.copyOfRange(0, digits.size - 1)) + intArrayOf(0)
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        one = 1
        i = 0
        digits = digits[::-1]

        while one:
            if i < len(digits):
                if digits[i] == 9:
                    digits[i] = 0
                else:
                    digits[i] += 1
                    one = 0
            else:
                digits.append(one)
                one = 0
            i += 1
        return digits[::-1]
```

```java
public class Solution {
    public int[] plusOne(int[] digits) {
        int one = 1;
        int i = 0;
        boolean carry = true;

        for (int j = digits.length - 1; j >= 0; j--) {
            if (carry) {
                if (digits[j] == 9) {
                    digits[j] = 0;
                } else {
                    digits[j]++;
                    carry = false;
                }
            }
        }
        if (carry) {
            int[] result = new int[digits.length + 1];
            result[0] = 1;
            System.arraycopy(digits, 0, result, 1, digits.length);
            return result;
        }
        return digits;
    }
}
```

```cpp
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int one = 1;
        int i = 0;
        reverse(digits.begin(), digits.end());

        while (one) {
            if (i < digits.size()) {
                if (digits[i] == 9) {
                    digits[i] = 0;
                } else {
                    digits[i] += 1;
                    one = 0;
                }
            } else {
                digits.push_back(one);
                one = 0;
            }
            i++;
        }
        reverse(digits.begin(), digits.end());
        return digits;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} digits
     * @return {number[]}
     */
    plusOne(digits) {
        let one = 1;
        let i = 0;
        digits.reverse();

        while (one) {
            if (i < digits.length) {
                if (digits[i] === 9) {
                    digits[i] = 0;
                } else {
                    digits[i] += 1;
                    one = 0;
                }
            } else {
                digits.push(one);
                one = 0;
            }
            i++;
        }
        digits.reverse();
        return digits;
    }
}
```

```csharp
public class Solution {
    public int[] PlusOne(int[] digits) {
        int one = 1;
        int i = 0;
        bool carry = true;

        for (int j = digits.Length - 1; j >= 0; j--) {
            if (carry) {
                if (digits[j] == 9) {
                    digits[j] = 0;
                } else {
                    digits[j]++;
                    carry = false;
                }
            }
        }
        if (carry) {
            int[] result = new int[digits.Length + 1];
            result[0] = 1;
            for (int j = 0; j < digits.Length; j++) {
                result[j + 1] = digits[j];
            }
            return result;
        }
        return digits;
    }
}
```

```go
func plusOne(digits []int) []int {
    one := 1
    i := 0
    digits = reverse(digits)

    for one != 0 {
        if i < len(digits) {
            if digits[i] == 9 {
                digits[i] = 0
            } else {
                digits[i] += 1
                one = 0
            }
        } else {
            digits = append(digits, one)
            one = 0
        }
        i++
    }
    return reverse(digits)
}

func reverse(digits []int) []int {
    for i, j := 0, len(digits)-1; i < j; i, j = i+1, j-1 {
        digits[i], digits[j] = digits[j], digits[i]
    }
    return digits
}
```

```kotlin
class Solution {
    fun plusOne(digits: IntArray): IntArray {
        var one = 1
        var i = 0
        val reversedDigits = digits.reversed().toMutableList()

        while (one != 0) {
            if (i < reversedDigits.size) {
                if (reversedDigits[i] == 9) {
                    reversedDigits[i] = 0
                } else {
                    reversedDigits[i] += 1
                    one = 0
                }
            } else {
                reversedDigits.add(one)
                one = 0
            }
            i++
        }

        return reversedDigits.reversed().toIntArray()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 3. Iteration (Optimal)

::tabs-start

```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        n = len(digits)
        for i in range(n - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        
        return [1] + digits
```

```java
class Solution {
    public int[] plusOne(int[] digits) {
        int n = digits.length;
        for (int i = n - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        int[] result = new int[n + 1];
        result[0] = 1;
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int n = digits.size();
        for (int i = n - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        vector<int> result(n + 1);
        result[0] = 1;
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} digits
     * @return {number[]}
     */
    plusOne(digits) {
        const n = digits.length;
        for (let i = n - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        const result = new Array(n + 1).fill(0);
        result[0] = 1;
        return result;
    }
}
```

```csharp
public class Solution {
    public int[] PlusOne(int[] digits) {
        int n = digits.Length;
        for (int i = n - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        int[] result = new int[n + 1];
        result[0] = 1;
        return result;
    }
}
```

```go
func plusOne(digits []int) []int {
    n := len(digits)
    for i := n - 1; i >= 0; i-- {
        if digits[i] < 9 {
            digits[i]++
            return digits
        }
        digits[i] = 0
    }

    return append([]int{1}, digits...)
}
```

```kotlin
class Solution {
    fun plusOne(digits: IntArray): IntArray {
        val n = digits.size
        for (i in n - 1 downTo 0) {
            if (digits[i] < 9) {
                digits[i]++
                return digits
            }
            digits[i] = 0
        }

        return intArrayOf(1) + digits
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$