## 1. Modulo Comparision

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

## 2. Bitwise Comparision

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
