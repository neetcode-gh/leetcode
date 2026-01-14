## 1. Recursion

### Intuition

We are given a number represented as an array of digits, and we need to **add one** to this number.

The challenge comes from handling the **carry**:
- If the last digit is less than `9`, we can simply increment it.
- If the last digit is `9`, it becomes `0` and we need to carry `+1` to the remaining digits.

This recursive solution mirrors how addition works by hand:
- handle the **last digit**
- if there is a carry, recursively solve the smaller subproblem (all digits except the last)
- build the final result while returning from recursion

### Algorithm

1. If the digit list is empty:
   - it means we had a carry beyond the most significant digit
   - return `[1]`
2. If the last digit is less than `9`:
   - increment the last digit by `1`
   - return the updated list
3. Otherwise (last digit is `9`):
   - the last digit becomes `0`
   - recursively call `plusOne` on all digits except the last
   - append `0` to the result
4. Return the final list of digits

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

```swift
class Solution {
    func plusOne(_ digits: [Int]) -> [Int] {
        if digits.isEmpty {
            return [1]
        }

        var digits = digits
        if digits[digits.count - 1] < 9 {
            digits[digits.count - 1] += 1
            return digits
        } else {
            return plusOne(Array(digits.dropLast())) + [0]
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Iteration - I

### Intuition

We are given a number as an array of digits and need to **add one** to it.

The main idea is to simulate manual addition starting from the **least significant digit** (the last digit).
Since addition naturally moves from right to left, this solution:
- reverses the array so we can process digits from left to right
- keeps a variable `one` to represent the **carry** (initially `1`)
- continues updating digits until the carry becomes `0`

This avoids recursion and handles all carry cases, including when the number consists entirely of `9`s (like `[9,9,9]`).

### Algorithm

1. Initialize:
   - `one = 1` (this represents the `+1` we want to add)
   - `i = 0` (index to traverse digits)
2. Reverse the `digits` array so the least significant digit comes first.
3. While there is still a carry (`one == 1`):
   - If `i` is within the array:
     - If `digits[i] == 9`:
       - set `digits[i] = 0` (carry continues)
     - Else:
       - increment `digits[i]` by `1`
       - set `one = 0` (carry resolved)
   - Else (we ran out of digits):
     - append `1` to the array
     - set `one = 0`
   - increment `i`
4. Reverse the array back to its original order.
5. Return the updated `digits`.

::tabs-start

```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        one = 1
        i = 0
        digits.reverse()

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

        digits.reverse()
        return digits
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

```swift
class Solution {
    func plusOne(_ digits: [Int]) -> [Int] {
        var digits = digits
        var one = 1
        var i = 0
        digits.reverse()

        while one > 0 {
            if i < digits.count {
                if digits[i] == 9 {
                    digits[i] = 0
                } else {
                    digits[i] += 1
                    one = 0
                }
            } else {
                digits.append(one)
                one = 0
            }
            i += 1
        }

        digits.reverse()
        return digits
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the language.

---

## 3. Iteration - II

### Intuition

We are given a number represented as an array of digits and need to **add one** to it.

The simplest way to do this is to simulate how addition works from **right to left**:
- start from the least significant digit
- if the digit is less than `9`, we can increment it and stop
- if the digit is `9`, it becomes `0` and we carry `+1` to the next digit on the left

If we finish processing all digits and still have a carry, it means the number was something like `[9, 9, 9]`, and we need to add a new leading `1`.

### Algorithm

1. Let `n` be the number of digits.
2. Traverse the digits from right to left:
3. For each index `i`:
   - If `digits[i] < 9`:
     - increment `digits[i]` by `1`
     - return the updated list immediately (no further carry)
   - Otherwise (`digits[i] == 9`):
     - set `digits[i] = 0` and continue to the next digit on the left
4. If the loop ends, it means all digits were `9`:
   - return `[1] + digits`
5. The returned list is the result of adding one.

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

```swift
class Solution {
    func plusOne(_ digits: [Int]) -> [Int] {
        var digits = digits
        let n = digits.count

        for i in stride(from: n - 1, through: 0, by: -1) {
            if digits[i] < 9 {
                digits[i] += 1
                return digits
            }
            digits[i] = 0
        }

        return [1] + digits
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

## Common Pitfalls

### Forgetting to Handle All-Nines Input

When the input is `[9, 9, 9]`, every digit carries over and you need a new leading digit. Returning `[0, 0, 0]` instead of `[1, 0, 0, 0]` is a common mistake when the carry-out case is not explicitly handled.

### Modifying the Array While Iterating Forward

Starting from index `0` and adding one there ignores how arithmetic carry propagates from the least significant digit. Always process from the last element toward the first to correctly simulate manual addition.
