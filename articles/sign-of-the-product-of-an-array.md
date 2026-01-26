## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Basic Array Iteration** - Traversing an array and examining each element
- **Sign Rules for Multiplication** - Understanding how negative and zero values affect product signs
- **Early Termination** - Returning immediately when a zero is encountered to avoid unnecessary computation

---

## 1. Count Negative Numbers

### Intuition

The sign of a product depends on two things: whether any factor is zero, and whether the count of negative factors is odd or even. If any number is zero, the product is `0`. Otherwise, an even count of negatives gives a positive product (negatives cancel out), and an odd count gives a negative product. We do not need to compute the actual product; just counting negatives is enough.

### Algorithm

1. Initialize a counter `neg = 0` for negative numbers.
2. Iterate through each number in the array:
   - If the number is `0`, return `0` immediately.
   - If the number is negative, increment `neg`.
3. After the loop, if `neg` is even, return `1`; otherwise, return `-1`.

::tabs-start

```python
class Solution:
    def arraySign(self, nums: list[int]) -> int:
        neg = 0
        for num in nums:
            if num == 0:
                return 0
            neg += (1 if num < 0 else 0)
        return -1 if neg % 2 else 1
```

```java
public class Solution {
    public int arraySign(int[] nums) {
        int neg = 0;
        for (int num : nums) {
            if (num == 0) {
                return 0;
            }
            if (num < 0) {
                neg++;
            }
        }
        return neg % 2 == 0 ? 1 : -1;
    }
}
```

```cpp
class Solution {
public:
    int arraySign(vector<int>& nums) {
        int neg = 0;
        for (int num : nums) {
            if (num == 0) {
                return 0;
            }
            if (num < 0) {
                neg++;
            }
        }
        return neg % 2 == 0 ? 1 : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    arraySign(nums) {
        let neg = 0;
        for (const num of nums) {
            if (num === 0) {
                return 0;
            }
            if (num < 0) {
                neg++;
            }
        }
        return neg % 2 === 0 ? 1 : -1;
    }
}
```

```csharp
public class Solution {
    public int ArraySign(int[] nums) {
        int neg = 0;
        foreach (int num in nums) {
            if (num == 0) {
                return 0;
            }
            if (num < 0) {
                neg++;
            }
        }
        return neg % 2 == 0 ? 1 : -1;
    }
}
```

```go
func arraySign(nums []int) int {
    neg := 0
    for _, num := range nums {
        if num == 0 {
            return 0
        }
        if num < 0 {
            neg++
        }
    }
    if neg%2 == 0 {
        return 1
    }
    return -1
}
```

```kotlin
class Solution {
    fun arraySign(nums: IntArray): Int {
        var neg = 0
        for (num in nums) {
            if (num == 0) {
                return 0
            }
            if (num < 0) {
                neg++
            }
        }
        return if (neg % 2 == 0) 1 else -1
    }
}
```

```swift
class Solution {
    func arraySign(_ nums: [Int]) -> Int {
        var neg = 0
        for num in nums {
            if num == 0 {
                return 0
            }
            if num < 0 {
                neg += 1
            }
        }
        return neg % 2 == 0 ? 1 : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Track the Sign of the Product

### Intuition

Instead of counting negatives and checking parity at the end, we can track the running sign directly. Start with a sign of `1` (positive). Each time we encounter a negative number, we flip the sign by multiplying by `-1`. If we encounter zero, the product is immediately `0`. This approach mirrors the actual multiplication process but only tracks the sign.

### Algorithm

1. Initialize `sign = 1`.
2. Iterate through each number in the array:
   - If the number is `0`, return `0` immediately.
   - If the number is negative, flip the sign: `sign *= -1`.
3. Return `sign`.

::tabs-start

```python
class Solution:
    def arraySign(self, nums: list[int]) -> int:
        sign = 1
        for num in nums:
            if num == 0:
                return 0
            if num < 0:
                sign *= -1
        return sign
```

```java
public class Solution {
    public int arraySign(int[] nums) {
        int sign = 1;
        for (int num : nums) {
            if (num == 0) {
                return 0;
            }
            if (num < 0) {
                sign *= -1;
            }
        }
        return sign;
    }
}
```

```cpp
class Solution {
public:
    int arraySign(vector<int>& nums) {
        int sign = 1;
        for (int num : nums) {
            if (num == 0) {
                return 0;
            }
            if (num < 0) {
                sign *= -1;
            }
        }
        return sign;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    arraySign(nums) {
        let sign = 1;
        for (const num of nums) {
            if (num === 0) {
                return 0;
            }
            if (num < 0) {
                sign *= -1;
            }
        }
        return sign;
    }
}
```

```csharp
public class Solution {
    public int ArraySign(int[] nums) {
        int sign = 1;
        foreach (int num in nums) {
            if (num == 0) {
                return 0;
            }
            if (num < 0) {
                sign *= -1;
            }
        }
        return sign;
    }
}
```

```go
func arraySign(nums []int) int {
    sign := 1
    for _, num := range nums {
        if num == 0 {
            return 0
        }
        if num < 0 {
            sign *= -1
        }
    }
    return sign
}
```

```kotlin
class Solution {
    fun arraySign(nums: IntArray): Int {
        var sign = 1
        for (num in nums) {
            if (num == 0) {
                return 0
            }
            if (num < 0) {
                sign *= -1
            }
        }
        return sign
    }
}
```

```swift
class Solution {
    func arraySign(_ nums: [Int]) -> Int {
        var sign = 1
        for num in nums {
            if num == 0 {
                return 0
            }
            if num < 0 {
                sign *= -1
            }
        }
        return sign
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Not Handling Zero as a Special Case

If any element in the array is zero, the entire product is zero, and the function should immediately return `0`. A common mistake is forgetting to check for zeros and only focusing on counting or tracking negative numbers, which leads to returning `1` or `-1` when the answer should be `0`.

### Computing the Actual Product

Attempting to calculate the actual product of all elements is unnecessary and dangerous. For large arrays or large values, the product can overflow even 64-bit integers, causing undefined behavior or incorrect results. The problem only asks for the sign, so you should track sign changes without computing the full product.
