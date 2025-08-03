## 1. Brute Force

::tabs-start

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        nums.sort()
```

```java
public class Solution {
    public void sortColors(int[] nums) {
        Arrays.sort(nums);
    }
}
```

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        sort(nums.begin(), nums.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    sortColors(nums) {
        nums.sort((a, b) => a - b);
    }
}
```

```csharp
public class Solution {
    public void SortColors(int[] nums) {
        Array.Sort(nums);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Counting Sort

::tabs-start

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        count = [0] * 3
        for num in nums:
            count[num] += 1

        index = 0
        for i in range(3):
            while count[i]:
                count[i] -= 1
                nums[index] = i
                index += 1
```

```java
public class Solution {
    public void sortColors(int[] nums) {
        int[] count = new int[3];
        for (int num : nums) {
            count[num]++;
        }

        int index = 0;
        for (int i = 0; i < 3; i++) {
            while (count[i]-- > 0) {
                nums[index++] = i;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        vector<int> count(3);
        for (int& num : nums) {
            count[num]++;
        }

        int index = 0;
        for (int i = 0; i < 3; i++) {
            while (count[i]-- > 0) {
                nums[index++] = i;
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
    sortColors(nums) {
        const count = new Int32Array(3);
        for (let num of nums) {
            count[num]++;
        }

        let index = 0;
        for (let i = 0; i < 3; i++) {
            while (count[i]-- > 0) {
                nums[index++] = i;
            }
        }
    }
}
```

```csharp
public class Solution {
    public void SortColors(int[] nums) {
        int[] count = new int[3];
        foreach (int num in nums) {
            count[num]++;
        }

        int index = 0;
        for (int i = 0; i < 3; i++) {
            while (count[i]-- > 0) {
                nums[index++] = i;
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Three Pointers - I

::tabs-start

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        l, r = 0, len(nums) - 1
        i = 0

        def swap(i, j):
            temp = nums[i]
            nums[i] = nums[j]
            nums[j] = temp

        while i <= r:
            if nums[i] == 0:
                swap(l, i)
                l += 1
            elif nums[i] == 2:
                swap(i, r)
                r -= 1
                i -= 1
            i += 1
```

```java
public class Solution {
    public void sortColors(int[] nums) {
        int i = 0, l = 0, r = nums.length - 1;
        while (i <= r) {
            if (nums[i] == 0) {
                swap(nums, l, i);
                l++;
            } else if (nums[i] == 2) {
                swap(nums, i, r);
                r--;
                i--;
            }
            i++;
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int i = 0, l = 0, r = nums.size() - 1;
        while (i <= r) {
            if (nums[i] == 0) {
                swap(nums[l], nums[i]);
                l++;
            } else if (nums[i] == 2) {
                swap(nums[i], nums[r]);
                r--;
                i--;
            }
            i++;
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
    sortColors(nums) {
        let i = 0,
            l = 0,
            r = nums.length - 1;
        while (i <= r) {
            if (nums[i] == 0) {
                [nums[l], nums[i]] = [nums[i], nums[l]];
                l++;
            } else if (nums[i] == 2) {
                [nums[i], nums[r]] = [nums[r], nums[i]];
                r--;
                i--;
            }
            i++;
        }
    }
}
```

```csharp
public class Solution {
    public void SortColors(int[] nums) {
        int i = 0, l = 0, r = nums.Length - 1;

        while (i <= r) {
            if (nums[i] == 0) {
                Swap(nums, l, i);
                l++;
            } else if (nums[i] == 2) {
                Swap(nums, i, r);
                r--;
                i--;
            }
            i++;
        }
    }

    private void Swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Three Pointers - II

::tabs-start

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        zero = one = two = 0
        for i in range(len(nums)):
            if nums[i] == 0:
                nums[two] = 2
                nums[one] = 1
                nums[zero] = 0
                two += 1
                one += 1
                zero += 1
            elif nums[i] == 1:
                nums[two] = 2
                nums[one] = 1
                two += 1
                one += 1
            else:
                nums[two] = 2
                two += 1
```

```java
public class Solution {
    public void sortColors(int[] nums) {
        int zero = 0, one = 0, two = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                nums[two++] = 2;
                nums[one++] = 1;
                nums[zero++] = 0;
            } else if (nums[i] == 1) {
                nums[two++] = 2;
                nums[one++] = 1;
            } else {
                nums[two++] = 2;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int zero = 0, one = 0, two = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == 0) {
                nums[two++] = 2;
                nums[one++] = 1;
                nums[zero++] = 0;
            } else if (nums[i] == 1) {
                nums[two++] = 2;
                nums[one++] = 1;
            } else {
                nums[two++] = 2;
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
    sortColors(nums) {
        let zero = 0,
            one = 0,
            two = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                nums[two++] = 2;
                nums[one++] = 1;
                nums[zero++] = 0;
            } else if (nums[i] == 1) {
                nums[two++] = 2;
                nums[one++] = 1;
            } else {
                nums[two++] = 2;
            }
        }
    }
}
```

```csharp
public class Solution {
    public void SortColors(int[] nums) {
        int zero = 0, one = 0, two = 0;

        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] == 0) {
                nums[two++] = 2;
                nums[one++] = 1;
                nums[zero++] = 0;
            } else if (nums[i] == 1) {
                nums[two++] = 2;
                nums[one++] = 1;
            } else {
                nums[two++] = 2;
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 5. Three Pointers - III

::tabs-start

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        zero = one = 0
        for two in range(len(nums)):
            tmp = nums[two]
            nums[two] = 2
            if tmp < 2:
                nums[one] = 1
                one += 1
            if tmp < 1:
                nums[zero] = 0
                zero += 1
```

```java
public class Solution {
    public void sortColors(int[] nums) {
        int zero = 0, one = 0;
        for (int two = 0; two < nums.length; two++) {
            int tmp = nums[two];
            nums[two] = 2;
            if (tmp < 2) {
                nums[one++] = 1;
            }
            if (tmp < 1) {
                nums[zero++] = 0;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int zero = 0, one = 0;
        for (int two = 0; two < nums.size(); two++) {
            int tmp = nums[two];
            nums[two] = 2;
            if (tmp < 2) {
                nums[one++] = 1;
            }
            if (tmp < 1) {
                nums[zero++] = 0;
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
    sortColors(nums) {
        let zero = 0,
            one = 0;
        for (let two = 0; two < nums.length; two++) {
            let tmp = nums[two];
            nums[two] = 2;
            if (tmp < 2) {
                nums[one++] = 1;
            }
            if (tmp < 1) {
                nums[zero++] = 0;
            }
        }
    }
}
```

```csharp
public class Solution {
    public void SortColors(int[] nums) {
        int zero = 0, one = 0;

        for (int two = 0; two < nums.Length; two++) {
            int tmp = nums[two];
            nums[two] = 2;

            if (tmp < 2) {
                nums[one++] = 1;
            }
            if (tmp < 1) {
                nums[zero++] = 0;
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
