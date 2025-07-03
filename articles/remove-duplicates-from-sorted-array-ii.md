## 1. Brute Force

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 2:
            return n
        i = 0
        while i < n - 1:
            if nums[i] == nums[i + 1]:
                j = i + 2
                cnt = 0
                while j < n and nums[i] == nums[j]:
                    j += 1
                    cnt += 1
                for k in range(i + 2, n):
                    if j >= n:
                        break
                    nums[k] = nums[j]
                    j += 1
                n -= cnt
                i += 2
            else:
                i += 1
        return n
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        int n = nums.length;
        if (n <= 2) return n;
        int i = 0;
        while (i < n - 1) {
            if (nums[i] == nums[i + 1]) {
                int j = i + 2, cnt = 0;
                while (j < n && nums[i] == nums[j]) {
                    j++;
                    cnt++;
                }
                for (int k = i + 2; k < n; k++) {
                    if (j >= n) break;
                    nums[k] = nums[j++];
                }
                n -= cnt;
                i += 2;
            } else {
                i++;
            }
        }
        return n;
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int n = nums.size();
        if (n <= 2) return n;
        int i = 0;
        while (i < n - 1) {
            if (nums[i] == nums[i + 1]) {
                int j = i + 2, cnt = 0;
                while (j < n && nums[i] == nums[j]) {
                    j++;
                    cnt++;
                }
                for (int k = i + 2; k < n; k++) {
                    if (j >= n) break;
                    nums[k] = nums[j++];
                }
                n -= cnt;
                i += 2;
            } else {
                i++;
            }
        }
        return n;
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
        let n = nums.length;
        if (n <= 2) return n;
        let i = 0;
        while (i < n - 1) {
            if (nums[i] === nums[i + 1]) {
                let j = i + 2,
                    cnt = 0;
                while (j < n && nums[i] === nums[j]) {
                    j++;
                    cnt++;
                }
                for (let k = i + 2; k < n; k++) {
                    if (j >= n) break;
                    nums[k] = nums[j++];
                }
                n -= cnt;
                i += 2;
            } else {
                i++;
            }
        }
        return n;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 2:
            return n

        count = Counter(nums)
        i = 0
        for num in count:
            nums[i] = num
            count[num] -= 1
            i += 1
            if count[num] >= 1:
                nums[i] = num
                count[num] -= 1
                i += 1
        return i
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        List<Integer> arr = new ArrayList<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
            if (count.get(num) == 1) {
                arr.add(num);
            }
        }

        int i = 0;
        for (int num : arr) {
            nums[i++] = num;
            count.put(num, count.get(num) - 1);
            if (count.get(num) >= 1) {
                nums[i++] = num;
                count.put(num, count.get(num) - 1);
            }
        }
        return i;
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        unordered_map<int, int> count;
        vector<int> arr;
        for (int& num : nums) {
            count[num]++;
            if (count[num] == 1) {
                arr.push_back(num);
            }
        }

        int i = 0;
        for (auto& num : arr) {
            int& cnt = count[num];
            nums[i++] = num;
            cnt--;
            if (cnt >= 1) {
                nums[i++] = num;
                cnt--;
            }
        }
        return i;
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
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        let i = 0;
        for (const [num, cnt] of count) {
            nums[i++] = num;
            count.set(num, cnt - 1);
            if (count.get(num) >= 1) {
                nums[i++] = num;
                count.set(num, cnt - 1);
            }
        }
        return i;
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
    def removeDuplicates(self, nums: List[int]) -> int:
        l, r = 0, 0

        while r < len(nums):
            count = 1
            while r + 1 < len(nums) and nums[r] == nums[r + 1]:
                r += 1
                count += 1

            for i in range(min(2, count)):
                nums[l] = nums[r]
                l += 1
            r += 1

        return l
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        int l = 0, r = 0;

        while (r < nums.length) {
            int count = 1;
            while (r + 1 < nums.length && nums[r] == nums[r + 1]) {
                r++;
                count++;
            }

            for (int i = 0; i < Math.min(2, count); i++) {
                nums[l] = nums[r];
                l++;
            }
            r++;
        }

        return l;
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int l = 0, r = 0;

        while (r < nums.size()) {
            int count = 1;
            while (r + 1 < nums.size() && nums[r] == nums[r + 1]) {
                r++;
                count++;
            }

            for (int i = 0; i < min(2, count); i++) {
                nums[l] = nums[r];
                l++;
            }
            r++;
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
        let l = 0,
            r = 0;

        while (r < nums.length) {
            let count = 1;
            while (r + 1 < nums.length && nums[r] === nums[r + 1]) {
                r++;
                count++;
            }

            for (let i = 0; i < Math.min(2, count); i++) {
                nums[l] = nums[r];
                l++;
            }
            r++;
        }

        return l;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Two Pointers (Optimal)

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        l = 0
        for num in nums:
            if l < 2 or num != nums[l - 2]:
                nums[l] = num
                l += 1
        return l
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        int l = 0;
        for (int num : nums) {
            if (l < 2 || num != nums[l - 2]) {
                nums[l] = num;
                l++;
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
        int l = 0;
        for (int num : nums) {
            if (l < 2 || num != nums[l - 2]) {
                nums[l] = num;
                l++;
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
        let l = 0;
        for (let num of nums) {
            if (l < 2 || num !== nums[l - 2]) {
                nums[l] = num;
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
- Space complexity: $O(1)$ extra space.
