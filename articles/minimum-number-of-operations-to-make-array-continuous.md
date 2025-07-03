## 1. Brute Force

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        N = len(nums)
        res = float("inf")
        nums = sorted(set(nums))
        n = len(nums)

        for i in range(n):
            noChange = 1
            for j in range(i + 1, n):
                if nums[i] < nums[j] < nums[i] + N:
                    noChange += 1
            res = min(res, N - noChange)

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        int N = nums.length;
        int res = Integer.MAX_VALUE;
        TreeSet<Integer> set = new TreeSet<>();
        for (int num : nums) {
            set.add(num);
        }
        Integer[] sortedNums = set.toArray(new Integer[0]);
        int n = sortedNums.length;

        for (int i = 0; i < n; i++) {
            int noChange = 1;
            for (int j = i + 1; j < n; j++) {
                if (sortedNums[j] < sortedNums[i] + N) {
                    noChange++;
                }
            }
            res = Math.min(res, N - noChange);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        int N = nums.size();
        int res = INT_MAX;
        set<int> uniqueNums(nums.begin(), nums.end());
        vector<int> sortedNums(uniqueNums.begin(), uniqueNums.end());
        int n = sortedNums.size();

        for (int i = 0; i < n; i++) {
            int noChange = 1;
            for (int j = i + 1; j < n; j++) {
                if (sortedNums[j] < sortedNums[i] + N) {
                    noChange++;
                }
            }
            res = min(res, N - noChange);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const N = nums.length;
        let res = Infinity;
        const uniqueNums = Array.from(new Set(nums)).sort((a, b) => a - b);
        const n = uniqueNums.length;

        for (let i = 0; i < n; i++) {
            let noChange = 1;
            for (let j = i + 1; j < n; j++) {
                if (uniqueNums[j] < uniqueNums[i] + N) {
                    noChange++;
                }
            }
            res = Math.min(res, N - noChange);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        N = len(nums)
        res = float("inf")
        nums = sorted(set(nums))
        n = len(nums)

        for i in range(n):
            l, r = i, n
            while l < r:
                mid = (l + r) // 2
                if nums[mid] < nums[i] + N:
                    l = mid + 1
                else:
                    r = mid
            noChange = l - i
            res = min(res, N - noChange)

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        int N = nums.length;
        int res = Integer.MAX_VALUE;
        TreeSet<Integer> set = new TreeSet<>();
        for (int num : nums) {
            set.add(num);
        }
        Integer[] sortedNums = set.toArray(new Integer[0]);
        int n = sortedNums.length;

        for (int i = 0; i < n; i++) {
            int l = i, r = n;
            while (l < r) {
                int mid = l + (r - l) / 2;
                if (sortedNums[mid] < sortedNums[i] + N) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            int noChange = l - i;
            res = Math.min(res, N - noChange);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        int N = nums.size();
        int res = INT_MAX;
        set<int> uniqueNums(nums.begin(), nums.end());
        vector<int> sortedNums(uniqueNums.begin(), uniqueNums.end());
        int n = sortedNums.size();

        for (int i = 0; i < n; i++) {
            int l = i, r = n;
            while (l < r) {
                int mid = l + (r - l) / 2;
                if (sortedNums[mid] < sortedNums[i] + N) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            int noChange = l - i;
            res = min(res, N - noChange);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const N = nums.length;
        let res = Infinity;
        const uniqueNums = Array.from(new Set(nums)).sort((a, b) => a - b);
        const n = uniqueNums.length;

        for (let i = 0; i < n; i++) {
            let l = i,
                r = n;
            while (l < r) {
                const mid = Math.floor((l + r) / 2);
                if (uniqueNums[mid] < uniqueNums[i] + N) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            const noChange = l - i;
            res = Math.min(res, N - noChange);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Sliding Window

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        length = len(nums)
        nums = sorted(set(nums))
        res = length
        r = 0

        for l in range(len(nums)):
            while r < len(nums) and nums[r] < nums[l] + length:
                r += 1
            window = r - l
            res = min(res, length - window)

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        int length = nums.length;
        TreeSet<Integer> set = new TreeSet<>();
        for (int num : nums) {
            set.add(num);
        }
        List<Integer> sortedNums = new ArrayList<>(set);
        int res = length, r = 0;

        for (int l = 0; l < sortedNums.size(); l++) {
            while (r < sortedNums.size() && sortedNums.get(r) < sortedNums.get(l) + length) {
                r++;
            }
            int window = r - l;
            res = Math.min(res, length - window);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        int length = nums.size();
        set<int> uniqueNums(nums.begin(), nums.end());
        vector<int> sortedNums(uniqueNums.begin(), uniqueNums.end());
        int res = length, r = 0;

        for (int l = 0; l < sortedNums.size(); l++) {
            while (r < sortedNums.size() && sortedNums[r] < sortedNums[l] + length) {
                r++;
            }
            int window = r - l;
            res = min(res, length - window);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const length = nums.length;
        const uniqueNums = Array.from(new Set(nums)).sort((a, b) => a - b);
        let res = length,
            r = 0;

        for (let l = 0; l < uniqueNums.length; l++) {
            while (
                r < uniqueNums.length &&
                uniqueNums[r] < uniqueNums[l] + length
            ) {
                r++;
            }
            const window = r - l;
            res = Math.min(res, length - window);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Sliding Window (Optimal)

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        length = len(nums)
        nums.sort()
        res = length
        n = 1

        for i in range(1, length):
            if nums[i] != nums[i - 1]:
                nums[n] = nums[i]
                n += 1

        l = 0
        for r in range(n):
            l += (nums[r] - nums[l] > length - 1)

        return length - (n - l)
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        int length = nums.length;
        Arrays.sort(nums);
        int n = 1;

        for (int i = 1; i < length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[n] = nums[i];
                n++;
            }
        }

        int l = 0;
        for (int r = 0; r < n; r++) {
            if (nums[r] - nums[l] > length - 1) {
                l++;
            }
        }

        return length - (n - l);
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        int length = nums.size();
        sort(nums.begin(), nums.end());
        int n = 1;

        for (int i = 1; i < length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[n] = nums[i];
                n++;
            }
        }

        int l = 0;
        for (int r = 0; r < n; r++) {
            if (nums[r] - nums[l] > length - 1) {
                l++;
            }
        }

        return length - (n - l);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const length = nums.length;
        nums.sort((a, b) => a - b);
        let n = 1;

        for (let i = 1; i < length; i++) {
            if (nums[i] !== nums[i - 1]) {
                nums[n] = nums[i];
                n++;
            }
        }

        let l = 0;
        for (let r = 0; r < n; r++) {
            if (nums[r] - nums[l] > length - 1) {
                l++;
            }
        }

        return length - (n - l);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
