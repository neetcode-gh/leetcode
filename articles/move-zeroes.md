## 1. Extra Space

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Two Pointers (Two Pass)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Two Pointers (One Pass)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
