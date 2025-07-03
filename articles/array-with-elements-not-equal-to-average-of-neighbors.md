## 1. Greedy

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        nums.sort()
        res = []
        l, r = 0, len(nums) - 1
        while len(res) != len(nums):
            res.append(nums[l])
            l += 1
            if l <= r:
                res.append(nums[r])
                r -= 1
        return res
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        Arrays.sort(nums);
        int[] res = new int[nums.length];
        int l = 0, r = nums.length - 1;
        int idx = 0;

        while (idx != nums.length) {
            res[idx++] = nums[l++];
            if (l <= r) {
                res[idx++] = nums[r--];
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> res;
        int l = 0, r = nums.size() - 1;

        while (res.size() != nums.size()) {
            res.push_back(nums[l++]);
            if (l <= r) {
                res.push_back(nums[r--]);
            }
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
    rearrangeArray(nums) {
        nums.sort((a, b) => a - b);
        const res = [];
        let l = 0,
            r = nums.length - 1;

        while (res.length !== nums.length) {
            res.push(nums[l++]);
            if (l <= r) {
                res.push(nums[r--]);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n)$
- Space complexity: $O(n)$

---

## 2. Greedy (Space Optimized)

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        nums.sort()
        for i in range(1, len(nums), 2):
            nums[i], nums[i - 1] = nums[i - 1], nums[i]
        return nums
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        Arrays.sort(nums);
        for (int i = 1; i < nums.length; i += 2) {
            int temp = nums[i];
            nums[i] = nums[i - 1];
            nums[i - 1] = temp;
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for (int i = 1; i < nums.size(); i += 2) {
            swap(nums[i], nums[i - 1]);
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
    rearrangeArray(nums) {
        nums.sort((a, b) => a - b);
        for (let i = 1; i < nums.length; i += 2) {
            [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
        }
        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Greedy (Optimal) - I

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        n = len(nums)

        for i in range(1, n - 1):
            if 2 * nums[i] == (nums[i - 1] + nums[i + 1]):
                nums[i], nums[i + 1] = nums[i + 1], nums[i]

        for i in range(n - 2, 0, -1):
            if 2 * nums[i] == (nums[i - 1] + nums[i + 1]):
                nums[i], nums[i - 1] = nums[i - 1], nums[i]

        return nums
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        int n = nums.length;

        for (int i = 1; i < n - 1; i++) {
            if (2 * nums[i] == (nums[i - 1] + nums[i + 1])) {
                int temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i + 1] = temp;
            }
        }

        for (int i = n - 2; i > 0; i--) {
            if (2 * nums[i] == (nums[i - 1] + nums[i + 1])) {
                int temp = nums[i];
                nums[i] = nums[i - 1];
                nums[i - 1] = temp;
            }
        }

        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        int n = nums.size();

        for (int i = 1; i < n - 1; i++) {
            if (2 * nums[i] == (nums[i - 1] + nums[i + 1])) {
                swap(nums[i], nums[i + 1]);
            }
        }

        for (int i = n - 2; i > 0; i--) {
            if (2 * nums[i] == (nums[i - 1] + nums[i + 1])) {
                swap(nums[i], nums[i - 1]);
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
    rearrangeArray(nums) {
        const n = nums.length;

        for (let i = 1; i < n - 1; i++) {
            if (2 * nums[i] === nums[i - 1] + nums[i + 1]) {
                [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
            }
        }

        for (let i = n - 2; i > 0; i--) {
            if (2 * nums[i] === nums[i - 1] + nums[i + 1]) {
                [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
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

## 4. Greedy Optimal - II

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        increase = nums[0] < nums[1]
        for i in range(1, len(nums) - 1):
            if ((increase and nums[i] < nums[i + 1]) or
                (not increase and nums[i] > nums[i + 1])
            ):
                nums[i], nums[i + 1] = nums[i + 1], nums[i]
            increase = not increase
        return nums
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        boolean increase = nums[0] < nums[1];
        for (int i = 1; i < nums.length - 1; i++) {
            if ((increase && nums[i] < nums[i + 1]) ||
                (!increase && nums[i] > nums[i + 1])) {
                int temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i + 1] = temp;
            }
            increase = !increase;
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        bool increase = nums[0] < nums[1];
        for (int i = 1; i < nums.size() - 1; i++) {
            if ((increase && nums[i] < nums[i + 1]) ||
                (!increase && nums[i] > nums[i + 1])) {
                swap(nums[i], nums[i + 1]);
            }
            increase = !increase;
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
    rearrangeArray(nums) {
        let increase = nums[0] < nums[1];
        for (let i = 1; i < nums.length - 1; i++) {
            if (
                (increase && nums[i] < nums[i + 1]) ||
                (!increase && nums[i] > nums[i + 1])
            ) {
                [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
            }
            increase = !increase;
        }
        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
