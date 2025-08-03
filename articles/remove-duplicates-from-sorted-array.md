## 1. Sorted Set

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        unique = sorted(set(nums))
        nums[:len(unique)] = unique
        return len(unique)
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        TreeSet<Integer> unique = new TreeSet<>();
        for (int num : nums) {
            unique.add(num);
        }
        int i = 0;
        for (int num : unique) {
            nums[i++] = num;
        }
        return unique.size();
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        set<int> unique(nums.begin(), nums.end());
        int i = 0;
        for (int num : unique) {
            nums[i++] = num;
        }
        return unique.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    removeDuplicates(nums) {
        const unique = Array.from(new Set(nums)).sort((a, b) => a - b);
        for (let i = 0; i < unique.length; i++) {
            nums[i] = unique[i];
        }
        return unique.length;
    }
}
```

```csharp
public class Solution {
    public int RemoveDuplicates(int[] nums) {
        int[] unique = nums.Distinct().OrderBy(x => x).ToArray();
        Array.Copy(unique, nums, unique.Length);
        return unique.Length;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Two Pointers - I

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        n = len(nums)
        l = r = 0
        while r < n:
            nums[l] = nums[r]
            while r < n and nums[r] == nums[l]:
                r += 1
            l += 1
        return l
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        int n = nums.length, l = 0, r = 0;
        while (r < n) {
            nums[l] = nums[r];
            while (r < n && nums[r] == nums[l]) {
                r++;
            }
            l++;
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int n = nums.size(), l = 0, r = 0;
        while (r < n) {
            nums[l] = nums[r];
            while (r < n && nums[r] == nums[l]) {
                r++;
            }
            l++;
        }
        return l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    removeDuplicates(nums) {
        let n = nums.length,
            l = 0,
            r = 0;
        while (r < n) {
            nums[l] = nums[r];
            while (r < n && nums[r] === nums[l]) {
                r++;
            }
            l++;
        }
        return l;
    }
}
```

```csharp
public class Solution {
    public int RemoveDuplicates(int[] nums) {
        int n = nums.Length;
        int l = 0, r = 0;

        while (r < n) {
            nums[l] = nums[r];
            while (r < n && nums[r] == nums[l]) {
                r++;
            }
            l++;
        }

        return l;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Two Pointers - II

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        l = 1
        for r in range(1, len(nums)):
            if nums[r] != nums[r - 1]:
                nums[l] = nums[r]
                l += 1
        return l
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        int l = 1;
        for (int r = 1; r < nums.length; r++) {
            if (nums[r] != nums[r - 1]) {
                nums[l++] = nums[r];
            }
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int l = 1;
        for (int r = 1; r < nums.size(); r++) {
            if (nums[r] != nums[r - 1]) {
                nums[l++] = nums[r];
            }
        }
        return l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    removeDuplicates(nums) {
        let l = 1;
        for (let r = 1; r < nums.length; r++) {
            if (nums[r] !== nums[r - 1]) {
                nums[l++] = nums[r];
            }
        }
        return l;
    }
}
```

```csharp
public class Solution {
    public int RemoveDuplicates(int[] nums) {
        int l = 1;
        for (int r = 1; r < nums.Length; r++) {
            if (nums[r] != nums[r - 1]) {
                nums[l] = nums[r];
                l++;
            }
        }

        return l;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
