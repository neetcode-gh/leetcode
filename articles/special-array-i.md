## 1. Modulo Comparison

### Intuition

An array is special if every pair of adjacent elements has different parity (one is even, one is odd). To check this, we compare the parity of each element with its neighbor. Using the modulo operator, we can determine if a number is even (remainder 0 when divided by 2) or odd (remainder 1). If any two adjacent elements have the same parity, the array is not special.

### Algorithm

1. Iterate through the array starting from index `1`.
2. For each index, compare the parity of the current element with the previous element using modulo `2`.
3. If both elements have the same parity (both even or both odd), return `false`.
4. If the loop completes without finding adjacent elements of the same parity, return `true`.

::tabs-start

```python
class Solution:
    def isArraySpecial(self, nums: List[int]) -> bool:
        for i in range(1, len(nums)):
            if nums[i - 1] % 2 == nums[i] % 2:
                return False
        return True
```

```java
public class Solution {
    public boolean isArraySpecial(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            if (nums[i - 1] % 2 == nums[i] % 2) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isArraySpecial(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i - 1] % 2 == nums[i] % 2) {
                return false;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    isArraySpecial(nums) {
        for (let i = 1; i < nums.length; i++) {
            if (nums[i - 1] % 2 === nums[i] % 2) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsArraySpecial(int[] nums) {
        for (int i = 1; i < nums.Length; i++) {
            if (nums[i - 1] % 2 == nums[i] % 2) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func isArraySpecial(nums []int) bool {
    for i := 1; i < len(nums); i++ {
        if nums[i-1]%2 == nums[i]%2 {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isArraySpecial(nums: IntArray): Boolean {
        for (i in 1 until nums.size) {
            if (nums[i - 1] % 2 == nums[i] % 2) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isArraySpecial(_ nums: [Int]) -> Bool {
        for i in 1..<nums.count {
            if nums[i - 1] % 2 == nums[i] % 2 {
                return false
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Bitwise Comparison

### Intuition

Instead of using the modulo operator to check parity, we can use bitwise AND with 1. The least significant bit of a number determines its parity: if the bit is 1, the number is odd; if the bit is 0, the number is even. Bitwise operations are typically faster than modulo operations, making this approach slightly more efficient.

### Algorithm

1. Iterate through the array starting from index `1`.
2. For each index, extract the least significant bit of the current and previous elements using bitwise AND with `1`.
3. If both bits are the same, the elements have the same parity, so return `false`.
4. If all adjacent pairs have different parities, return `true`.

::tabs-start

```python
class Solution:
    def isArraySpecial(self, nums: List[int]) -> bool:
        for i in range(1, len(nums)):
            if nums[i - 1] & 1 == nums[i] & 1:
                return False
        return True
```

```java
public class Solution {
    public boolean isArraySpecial(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            if ((nums[i - 1] & 1) == (nums[i] & 1)) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isArraySpecial(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i++) {
            if ((nums[i - 1] & 1) == (nums[i] & 1)) {
                return false;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    isArraySpecial(nums) {
        for (let i = 1; i < nums.length; i++) {
            if ((nums[i - 1] & 1) === (nums[i] & 1)) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsArraySpecial(int[] nums) {
        for (int i = 1; i < nums.Length; i++) {
            if ((nums[i - 1] & 1) == (nums[i] & 1)) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func isArraySpecial(nums []int) bool {
    for i := 1; i < len(nums); i++ {
        if (nums[i-1] & 1) == (nums[i] & 1) {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isArraySpecial(nums: IntArray): Boolean {
        for (i in 1 until nums.size) {
            if ((nums[i - 1] and 1) == (nums[i] and 1)) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isArraySpecial(_ nums: [Int]) -> Bool {
        for i in 1..<nums.count {
            if (nums[i - 1] & 1) == (nums[i] & 1) {
                return false
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Off-by-One Errors in Loop Bounds

When iterating to compare adjacent elements, starting from index `0` instead of `1` can cause an out-of-bounds access when checking `nums[i-1]`. Always start from index `1` when comparing each element with its previous neighbor.

### Forgetting Single-Element Arrays

An array with only one element has no adjacent pairs to check, so it is trivially special. Forgetting this edge case can lead to incorrect logic or unnecessary iterations. The loop naturally handles this since iterating from `1` to `len(nums)` produces zero iterations when `len(nums) == 1`.
