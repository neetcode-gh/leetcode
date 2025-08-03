## 1. Sorting

::tabs-start

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        for i in range(len(nums)):
            nums[i] *= nums[i]
        nums.sort()
        return nums
```

```java
public class Solution {
    public int[] sortedSquares(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            nums[i] *= nums[i];
        }
        Arrays.sort(nums);
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            nums[i] *= nums[i];
        }
        sort(nums.begin(), nums.end());
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
    sortedSquares(nums) {
        for (let i = 0; i < nums.length; i++) {
            nums[i] *= nums[i];
        }
        nums.sort((a, b) => a - b);
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] SortedSquares(int[] nums) {
        for (int i = 0; i < nums.Length; i++) {
            nums[i] = nums[i] * nums[i];
        }
        Array.Sort(nums);
        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Two Pointers - I

::tabs-start

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        l, r, res = 0, len(nums) - 1, []

        while l <= r:
            if (nums[l] * nums[l]) > (nums[r] * nums[r]):
                res.append(nums[l] * nums[l])
                l += 1
            else:
                res.append(nums[r] * nums[r])
                r -= 1

        return res[::-1]
```

```java
public class Solution {
    public int[] sortedSquares(int[] nums) {
        int l = 0, r = nums.length - 1;
        ArrayList<Integer> res = new ArrayList<>();

        while (l <= r) {
            if (nums[l] * nums[l] > nums[r] * nums[r]) {
                res.add(nums[l] * nums[l]);
                l++;
            } else {
                res.add(nums[r] * nums[r]);
                r--;
            }
        }

        Collections.reverse(res);
        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        vector<int> res;

        while (l <= r) {
            if (nums[l] * nums[l] > nums[r] * nums[r]) {
                res.push_back(nums[l] * nums[l]);
                l++;
            } else {
                res.push_back(nums[r] * nums[r]);
                r--;
            }
        }

        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortedSquares(nums) {
        let l = 0,
            r = nums.length - 1;
        const res = [];

        while (l <= r) {
            if (nums[l] * nums[l] > nums[r] * nums[r]) {
                res.push(nums[l] * nums[l]);
                l++;
            } else {
                res.push(nums[r] * nums[r]);
                r--;
            }
        }

        return res.reverse();
    }
}
```

```csharp
public class Solution {
    public int[] SortedSquares(int[] nums) {
        int l = 0, r = nums.Length - 1;
        var res = new List<int>();

        while (l <= r) {
            int leftSq = nums[l] * nums[l];
            int rightSq = nums[r] * nums[r];
            if (leftSq > rightSq) {
                res.Add(leftSq);
                l++;
            } else {
                res.Add(rightSq);
                r--;
            }
        }

        res.Reverse();
        return res.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output array.

---

## 3. Two Pointers - II

::tabs-start

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n
        l, r = 0, n - 1
        res_index = n - 1

        while l <= r:
            if abs(nums[l]) > abs(nums[r]):
                res[res_index] = nums[l] * nums[l]
                l += 1
            else:
                res[res_index] = nums[r] * nums[r]
                r -= 1
            res_index -= 1

        return res
```

```java
public class Solution {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        int l = 0, r = n - 1, resIndex = n - 1;

        while (l <= r) {
            if (Math.abs(nums[l]) > Math.abs(nums[r])) {
                res[resIndex] = nums[l] * nums[l];
                l++;
            } else {
                res[resIndex] = nums[r] * nums[r];
                r--;
            }
            resIndex--;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);
        int l = 0, r = n - 1, resIndex = n - 1;

        while (l <= r) {
            if (abs(nums[l]) > abs(nums[r])) {
                res[resIndex] = nums[l] * nums[l];
                l++;
            } else {
                res[resIndex] = nums[r] * nums[r];
                r--;
            }
            resIndex--;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortedSquares(nums) {
        const n = nums.length;
        const res = new Array(n);
        let l = 0,
            r = n - 1,
            resIndex = n - 1;

        while (l <= r) {
            if (Math.abs(nums[l]) > Math.abs(nums[r])) {
                res[resIndex] = nums[l] * nums[l];
                l++;
            } else {
                res[resIndex] = nums[r] * nums[r];
                r--;
            }
            resIndex--;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] SortedSquares(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];
        int l = 0, r = n - 1, resIndex = n - 1;

        while (l <= r) {
            if (Math.Abs(nums[l]) > Math.Abs(nums[r])) {
                res[resIndex] = nums[l] * nums[l];
                l++;
            } else {
                res[resIndex] = nums[r] * nums[r];
                r--;
            }
            resIndex--;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output array.
