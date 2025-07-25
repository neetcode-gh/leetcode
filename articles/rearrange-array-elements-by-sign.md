## 1. Brute Force

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        n = len(nums)
        for i in range(n):
            if ((i % 2 == 0 and nums[i] > 0) or
                (i % 2 == 1 and nums[i] < 0)):
                continue

            j = i + 1
            while j < n and ((nums[j] > 0) == (nums[i] > 0)):
                j += 1

            tmp = nums[j]
            while j > i:
                nums[j] = nums[j - 1]
                j -= 1
            nums[i] = tmp
        return nums
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            if ((i % 2 == 0 && nums[i] > 0) || (i % 2 == 1 && nums[i] < 0)) {
                continue;
            }

            int j = i + 1;
            while (j < n && ((nums[j] > 0) == (nums[i] > 0))) {
                j++;
            }

            int temp = nums[j];
            while (j > i) {
                nums[j] = nums[j - 1];
                j--;
            }
            nums[i] = temp;
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
        for (int i = 0; i < n; i++) {
            if ((i % 2 == 0 && nums[i] > 0) || (i % 2 == 1 && nums[i] < 0)) {
                continue;
            }

            int j = i + 1;
            while (j < n && ((nums[j] > 0) == (nums[i] > 0))) {
                j++;
            }

            int temp = nums[j];
            while (j > i) {
                nums[j] = nums[j - 1];
                j--;
            }
            nums[i] = temp;
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
        let n = nums.length;
        for (let i = 0; i < n; i++) {
            if ((i % 2 === 0 && nums[i] > 0) || (i % 2 === 1 && nums[i] < 0)) {
                continue;
            }

            let j = i + 1;
            while (j < n && nums[j] > 0 === nums[i] > 0) {
                j++;
            }

            let temp = nums[j];
            while (j > i) {
                nums[j] = nums[j - 1];
                j--;
            }
            nums[i] = temp;
        }
        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Group Numbers Into Two Arrays

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        pos, neg = [], []
        for num in nums:
            if num > 0:
                pos.append(num)
            else:
                neg.append(num)

        i = 0
        while 2 * i < len(nums):
            nums[2 * i] = pos[i]
            nums[2 * i + 1] = neg[i]
            i += 1
        return nums
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        List<Integer> pos = new ArrayList<>();
        List<Integer> neg = new ArrayList<>();
        for (int num : nums) {
            if (num > 0) {
                pos.add(num);
            } else {
                neg.add(num);
            }
        }

        int i = 0;
        while (2 * i < nums.length) {
            nums[2 * i] = pos.get(i);
            nums[2 * i + 1] = neg.get(i);
            i++;
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        vector<int> pos, neg;
        for (int num : nums) {
            if (num > 0) {
                pos.push_back(num);
            } else {
                neg.push_back(num);
            }
        }

        int i = 0;
        while (2 * i < nums.size()) {
            nums[2 * i] = pos[i];
            nums[2 * i + 1] = neg[i];
            i++;
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
        const pos = [],
            neg = [];
        for (const num of nums) {
            if (num > 0) {
                pos.push(num);
            } else {
                neg.push(num);
            }
        }

        let i = 0;
        while (2 * i < nums.length) {
            nums[2 * i] = pos[i];
            nums[2 * i + 1] = neg[i];
            i++;
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

## 3. Two Pointers

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        i, j = 0, 1
        res = [0] * len(nums)
        for k in range(len(nums)):
            if nums[k] > 0:
                res[i] = nums[k]
                i += 2
            else:
                res[j] = nums[k]
                j += 2
        return res
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        int i = 0, j = 1;
        int[] res = new int[nums.length];
        for (int k = 0; k < nums.length; k++) {
            if (nums[k] > 0) {
                res[i] = nums[k];
                i += 2;
            } else {
                res[j] = nums[k];
                j += 2;
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
        int i = 0, j = 1;
        vector<int> res(nums.size());
        for (int k = 0; k < nums.size(); k++) {
            if (nums[k] > 0) {
                res[i] = nums[k];
                i += 2;
            } else {
                res[j] = nums[k];
                j += 2;
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
        let i = 0,
            j = 1;
        const res = new Array(nums.length);
        for (let k = 0; k < nums.length; k++) {
            if (nums[k] > 0) {
                res[i] = nums[k];
                i += 2;
            } else {
                res[j] = nums[k];
                j += 2;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output array.
