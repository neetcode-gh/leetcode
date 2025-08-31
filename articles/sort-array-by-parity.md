## 1. Sorting

::tabs-start

```python
class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        nums.sort(key = lambda x: x & 1)
        return nums
```

```java
public class Solution {
    public int[] sortArrayByParity(int[] nums) {
        Integer[] A = Arrays.stream(nums).boxed().toArray(Integer[]::new);
        Arrays.sort(A, (a, b) -> (a & 1) - (b & 1));
        return Arrays.stream(A).mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortArrayByParity(vector<int>& nums) {
        sort(nums.begin(), nums.end(), [&](int& a, int& b) {
            return (a & 1) < (b & 1);
        });
        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortArrayByParity(nums) {
        return nums.sort((a, b) => (a & 1) - (b & 1));
    }
}
```

```csharp
public class Solution {
    public int[] SortArrayByParity(int[] nums) {
        Array.Sort(nums, (a, b) => (a & 1).CompareTo(b & 1));
        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Array

::tabs-start

```python
class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        even, odd = [], []
        for num in nums:
            if num & 1:
                odd.append(num)
            else:
                even.append(num)

        idx = 0
        for e in even:
            nums[idx] = e
            idx += 1
        for o in odd:
            nums[idx] = o
            idx += 1
        return nums
```

```java
public class Solution {
    public int[] sortArrayByParity(int[] nums) {
        List<Integer> even = new ArrayList<>();
        List<Integer> odd = new ArrayList<>();

        for (int num : nums) {
            if ((num & 1) == 1) {
                odd.add(num);
            } else {
                even.add(num);
            }
        }

        int idx = 0;
        for (int e : even) {
            nums[idx++] = e;
        }
        for (int o : odd) {
            nums[idx++] = o;
        }

        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortArrayByParity(vector<int>& nums) {
        vector<int> even, odd;

        for (int& num : nums) {
            if (num & 1) {
                odd.push_back(num);
            } else {
                even.push_back(num);
            }
        }

        int idx = 0;
        for (int& e : even) {
            nums[idx++] = e;
        }
        for (int& o : odd) {
            nums[idx++] = o;
        }

        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortArrayByParity(nums) {
        const even = [];
        const odd = [];

        for (let num of nums) {
            if (num % 2) {
                odd.push(num);
            } else {
                even.push(num);
            }
        }

        let idx = 0;
        for (let e of even) {
            nums[idx++] = e;
        }
        for (let o of odd) {
            nums[idx++] = o;
        }

        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] SortArrayByParity(int[] nums) {
        List<int> even = new List<int>();
        List<int> odd = new List<int>();

        foreach (int num in nums) {
            if ((num & 1) == 1) {
                odd.Add(num);
            } else {
                even.Add(num);
            }
        }

        int idx = 0;
        foreach (int e in even) {
            nums[idx++] = e;
        }
        foreach (int o in odd) {
            nums[idx++] = o;
        }

        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Two Pointers - I

::tabs-start

```python
class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        i, j = 0, len(nums) - 1
        while i < j:
            if nums[i] & 1:
                nums[i], nums[j] = nums[j], nums[i]
                j -= 1
            else:
                i += 1
        return nums
```

```java
public class Solution {
    public int[] sortArrayByParity(int[] nums) {
        int i = 0, j = nums.length - 1;
        while (i < j) {
            if ((nums[i] & 1) == 1) {
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j--] = temp;
            } else {
                i++;
            }
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortArrayByParity(vector<int>& nums) {
        int i = 0, j = nums.size() - 1;
        while (i < j) {
            if ((nums[i] & 1) == 1) {
                swap(nums[i], nums[j]);
                j--;
            } else {
                i++;
            }
        }
        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortArrayByParity(nums) {
        let i = 0,
            j = nums.length - 1;
        while (i < j) {
            if ((nums[i] & 1) == 1) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                j--;
            } else {
                i++;
            }
        }
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] SortArrayByParity(int[] nums) {
        int i = 0, j = nums.Length - 1;
        while (i < j) {
            if ((nums[i] & 1) == 1) {
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
                j--;
            } else {
                i++;
            }
        }
        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Two Pointers - II

::tabs-start

```python
class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        l = 0
        for r in range(len(nums)):
            if nums[r] % 2 == 0:
                nums[l], nums[r] = nums[r], nums[l]
                l += 1
        return nums
```

```java
public class Solution {
    public int[] sortArrayByParity(int[] nums) {
        for (int l = 0, r = 0; r < nums.length; r++) {
            if (nums[r] % 2 == 0) {
                int temp = nums[l];
                nums[l] = nums[r];
                nums[r] = temp;
                l++;
            }
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortArrayByParity(vector<int>& nums) {
        for (int l = 0, r = 0; r < nums.size(); r++) {
            if (nums[r] % 2 == 0) {
                swap(nums[l], nums[r]);
                l++;
            }
        }
        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortArrayByParity(nums) {
        for (let l = 0, r = 0; r < nums.length; r++) {
            if (nums[r] % 2 == 0) {
                [nums[l], nums[r]] = [nums[r], nums[l]];
                l++;
            }
        }
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] SortArrayByParity(int[] nums) {
        int l = 0;
        for (int r = 0; r < nums.Length; r++) {
            if (nums[r] % 2 == 0) {
                int temp = nums[l];
                nums[l] = nums[r];
                nums[r] = temp;
                l++;
            }
        }
        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
