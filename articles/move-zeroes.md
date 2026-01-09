## 1. Extra Space

### Intuition

The simplest approach is to separate non-zero elements from zeros using extra storage. We collect all non-zero elements first, then write them back to the original array, filling the remaining positions with zeros. This guarantees the relative order of non-zero elements is preserved.

### Algorithm

1. Create a temporary list `tmp` and add all non-zero elements from `nums`.
2. Iterate through the original array:
   - For indices less than `tmp.length`, copy the value from `tmp`.
   - For remaining indices, set the value to `0`.

::tabs-start

```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        tmp = []
        for num in nums:
            if num != 0:
                tmp.append(num)

        for i in range(len(nums)):
            if i < len(tmp):
                nums[i] = tmp[i]
            else:
                nums[i] = 0
```

```java
public class Solution {
    public void moveZeroes(int[] nums) {
        List<Integer> tmp = new ArrayList<>();
        for (int num : nums) {
            if (num != 0) {
                tmp.add(num);
            }
        }

        for (int i = 0; i < nums.length; i++) {
            if (i < tmp.size()) {
                nums[i] = tmp.get(i);
            } else {
                nums[i] = 0;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        vector<int> tmp;
        for (int num : nums) {
            if (num != 0) {
                tmp.push_back(num);
            }
        }

        for (int i = 0; i < nums.size(); ++i) {
            if (i < tmp.size()) {
                nums[i] = tmp[i];
            } else {
                nums[i] = 0;
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    moveZeroes(nums) {
        let tmp = [];
        for (let num of nums) {
            if (num !== 0) {
                tmp.push(num);
            }
        }

        for (let i = 0; i < nums.length; i++) {
            if (i < tmp.length) {
                nums[i] = tmp[i];
            } else {
                nums[i] = 0;
            }
        }
    }
}
```

```csharp
public class Solution {
    public void MoveZeroes(int[] nums) {
        var tmp = new List<int>();
        foreach (var num in nums) {
            if (num != 0) {
                tmp.Add(num);
            }
        }
        for (int i = 0; i < nums.Length; i++) {
            if (i < tmp.Count) {
                nums[i] = tmp[i];
            } else {
                nums[i] = 0;
            }
        }
    }
}
```

```go
func moveZeroes(nums []int) {
    tmp := []int{}
    for _, num := range nums {
        if num != 0 {
            tmp = append(tmp, num)
        }
    }

    for i := 0; i < len(nums); i++ {
        if i < len(tmp) {
            nums[i] = tmp[i]
        } else {
            nums[i] = 0
        }
    }
}
```

```kotlin
class Solution {
    fun moveZeroes(nums: IntArray) {
        val tmp = mutableListOf<Int>()
        for (num in nums) {
            if (num != 0) {
                tmp.add(num)
            }
        }

        for (i in nums.indices) {
            if (i < tmp.size) {
                nums[i] = tmp[i]
            } else {
                nums[i] = 0
            }
        }
    }
}
```

```swift
class Solution {
    func moveZeroes(_ nums: inout [Int]) {
        var tmp = [Int]()
        for num in nums {
            if num != 0 {
                tmp.append(num)
            }
        }

        for i in 0..<nums.count {
            if i < tmp.count {
                nums[i] = tmp[i]
            } else {
                nums[i] = 0
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Two Pointers (Two Pass)

### Intuition

We can avoid extra space by overwriting the array in place. Use a left pointer to track where the next non-zero element should go. As we scan with a right pointer, each non-zero element gets copied to the left pointer's position. After the first pass, all non-zero elements are at the front in order. A second pass fills the remaining positions with zeros.

### Algorithm

1. Initialize `l = 0` to track the position for the next non-zero element.
2. First pass: Iterate through the array with pointer `r`. For each non-zero element, copy it to `nums[l]` and increment `l`.
3. Second pass: Fill positions from `l` to the end with `0`.

::tabs-start

```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        l = 0
        for r in range(len(nums)):
            if nums[r] != 0:
                nums[l] = nums[r]
                l += 1

        while l < len(nums):
            nums[l] = 0
            l += 1
```

```java
public class Solution {
    public void moveZeroes(int[] nums) {
        int l = 0;
        for (int r = 0; r < nums.length; r++) {
            if (nums[r] != 0) {
                nums[l++] = nums[r];
            }
        }

        while (l < nums.length) {
            nums[l++] = 0;
        }
    }
}
```

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int l = 0;
        for (int r = 0; r < nums.size(); r++) {
            if (nums[r] != 0) {
                nums[l++] = nums[r];
            }
        }

        while (l < nums.size()) {
            nums[l++] = 0;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    moveZeroes(nums) {
        let l = 0;
        for (let r = 0; r < nums.length; r++) {
            if (nums[r] != 0) {
                nums[l++] = nums[r];
            }
        }

        while (l < nums.length) {
            nums[l++] = 0;
        }
    }
}
```

```csharp
public class Solution {
    public void MoveZeroes(int[] nums) {
        int l = 0;
        for (int r = 0; r < nums.Length; r++) {
            if (nums[r] != 0) {
                nums[l] = nums[r];
                l++;
            }
        }
        while (l < nums.Length) {
            nums[l] = 0;
            l++;
        }
    }
}
```

```go
func moveZeroes(nums []int) {
    l := 0
    for r := 0; r < len(nums); r++ {
        if nums[r] != 0 {
            nums[l] = nums[r]
            l++
        }
    }

    for l < len(nums) {
        nums[l] = 0
        l++
    }
}
```

```kotlin
class Solution {
    fun moveZeroes(nums: IntArray) {
        var l = 0
        for (r in nums.indices) {
            if (nums[r] != 0) {
                nums[l++] = nums[r]
            }
        }

        while (l < nums.size) {
            nums[l++] = 0
        }
    }
}
```

```swift
class Solution {
    func moveZeroes(_ nums: inout [Int]) {
        var l = 0
        for r in 0..<nums.count {
            if nums[r] != 0 {
                nums[l] = nums[r]
                l += 1
            }
        }

        while l < nums.count {
            nums[l] = 0
            l += 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Two Pointers (One Pass)

### Intuition

Instead of copying values and then filling zeros separately, we can swap elements in a single pass. The left pointer marks the boundary between processed non-zero elements and unprocessed elements. When we encounter a non-zero element with the right pointer, we swap it with the element at the left pointer. This naturally pushes `0` to the right while keeping non-zero elements in their relative order.

### Algorithm

1. Initialize `l = 0` to track the swap position.
2. Iterate through the array with pointer `r`. For each non-zero element:
   - Swap `nums[l]` and `nums[r]`.
   - Increment `l`.
3. After the loop, all non-zero elements are at the front and zeros are at the end.

::tabs-start

```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        l = 0
        for r in range(len(nums)):
            if nums[r]:
                nums[l], nums[r] = nums[r], nums[l]
                l += 1
```

```java
public class Solution {
    public void moveZeroes(int[] nums) {
        int l = 0;
        for (int r = 0; r < nums.length; r++) {
            if (nums[r] != 0) {
                int temp = nums[l];
                nums[l] = nums[r];
                nums[r] = temp;
                l++;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        for (int l = 0, r = 0; r < nums.size(); r++) {
            if (nums[r]) {
                swap(nums[l++], nums[r]);
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    moveZeroes(nums) {
        for (let l = 0, r = 0; r < nums.length; r++) {
            if (nums[r] !== 0) {
                [nums[l], nums[r]] = [nums[r], nums[l]];
                l++;
            }
        }
    }
}
```

```csharp
public class Solution {
    public void MoveZeroes(int[] nums) {
        int l = 0;
        for (int r = 0; r < nums.Length; r++) {
            if (nums[r] != 0) {
                int temp = nums[l];
                nums[l] = nums[r];
                nums[r] = temp;
                l++;
            }
        }
    }
}
```

```go
func moveZeroes(nums []int) {
    l := 0
    for r := 0; r < len(nums); r++ {
        if nums[r] != 0 {
            nums[l], nums[r] = nums[r], nums[l]
            l++
        }
    }
}
```

```kotlin
class Solution {
    fun moveZeroes(nums: IntArray) {
        var l = 0
        for (r in nums.indices) {
            if (nums[r] != 0) {
                val temp = nums[l]
                nums[l] = nums[r]
                nums[r] = temp
                l++
            }
        }
    }
}
```

```swift
class Solution {
    func moveZeroes(_ nums: inout [Int]) {
        var l = 0
        for r in 0..<nums.count {
            if nums[r] != 0 {
                nums.swapAt(l, r)
                l += 1
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
