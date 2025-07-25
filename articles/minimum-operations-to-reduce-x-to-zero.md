## 1. Brute Force

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        n = len(nums)
        res = n + 1
        suffixSum = prefixSum = 0

        for i in range(n - 1, -1, -1):
            suffixSum += nums[i]
            if suffixSum == x:
                res = min(res, n - i)

        for i in range(n):
            prefixSum += nums[i]
            suffixSum = 0
            if prefixSum == x:
                res = min(res, i + 1)

            for j in range(n - 1, i, -1):
                suffixSum += nums[j]
                if prefixSum + suffixSum == x:
                    res = min(res, i + 1 + n - j)

        return -1 if res == n + 1 else res
```

```java
public class Solution {
    public int minOperations(int[] nums, int x) {
        int n = nums.length;
        int res = n + 1;
        int suffixSum = 0, prefixSum = 0;

        for (int i = n - 1; i >= 0; i--) {
            suffixSum += nums[i];
            if (suffixSum == x) {
                res = Math.min(res, n - i);
            }
        }

        for (int i = 0; i < n; i++) {
            prefixSum += nums[i];
            suffixSum = 0;
            if (prefixSum == x) {
                res = Math.min(res, i + 1);
            }

            for (int j = n - 1; j > i; j--) {
                suffixSum += nums[j];
                if (prefixSum + suffixSum == x) {
                    res = Math.min(res, i + 1 + n - j);
                }
            }
        }

        return res == n + 1 ? -1 : res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums, int x) {
        int n = nums.size();
        int res = n + 1, suffixSum = 0, prefixSum = 0;

        for (int i = n - 1; i >= 0; i--) {
            suffixSum += nums[i];
            if (suffixSum == x) {
                res = min(res, n - i);
            }
        }

        for (int i = 0; i < n; i++) {
            prefixSum += nums[i];
            suffixSum = 0;
            if (prefixSum == x) {
                res = min(res, i + 1);
            }

            for (int j = n - 1; j > i; j--) {
                suffixSum += nums[j];
                if (prefixSum + suffixSum == x) {
                    res = min(res, i + 1 + n - j);
                }
            }
        }

        return res == n + 1 ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} x
     * @return {number}
     */
    minOperations(nums, x) {
        const n = nums.length;
        let res = n + 1,
            suffixSum = 0,
            prefixSum = 0;

        for (let i = n - 1; i >= 0; i--) {
            suffixSum += nums[i];
            if (suffixSum === x) {
                res = Math.min(res, n - i);
            }
        }

        for (let i = 0; i < n; i++) {
            prefixSum += nums[i];
            suffixSum = 0;
            if (prefixSum === x) {
                res = Math.min(res, i + 1);
            }

            for (let j = n - 1; j > i; j--) {
                suffixSum += nums[j];
                if (prefixSum + suffixSum === x) {
                    res = Math.min(res, i + 1 + n - j);
                }
            }
        }

        return res === n + 1 ? -1 : res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Prefix Sum + Binary Search

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        n = len(nums)
        prefixSum = [0] * (n + 1)
        for i in range(n):
            prefixSum[i + 1] = prefixSum[i] + nums[i]

        if x > prefixSum[n]:
            return -1

        def binarySearch(target, m):
            l, r = 1, m
            index = n + 1

            while l <= r:
                mid = (l + r) >> 1
                if prefixSum[mid] >= target:
                    if prefixSum[mid] == target:
                        index = mid
                    r = mid - 1
                else:
                    l = mid + 1

            return index

        res = binarySearch(x, n)
        suffixSum = 0
        for i in range(n - 1, 0, -1):
            suffixSum += nums[i]
            if suffixSum == x:
                res = min(res, n - i)
                break
            if suffixSum > x: break
            res = min(res, binarySearch(x - suffixSum, i) + n - i)

        return -1 if res == n + 1 else res
```

```java
public class Solution {
    public int minOperations(int[] nums, int x) {
        int n = nums.length;
        int[] prefixSum = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        if (x > prefixSum[n]) {
            return -1;
        }

        int res = binarySearch(prefixSum, x, n);
        int suffixSum = 0;
        for (int i = n - 1; i > 0; i--) {
            suffixSum += nums[i];
            if (suffixSum == x) {
                res = Math.min(res, n - i);
                break;
            }
            if (suffixSum > x) break;
            res = Math.min(res, binarySearch(prefixSum, x - suffixSum, i) + n - i);
        }

        return res == n + 1 ? -1 : res;
    }

    private int binarySearch(int[] prefixSum, int target, int m) {
        int l = 1, r = m;
        int index = prefixSum.length;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (prefixSum[mid] >= target) {
                if (prefixSum[mid] == target) {
                    index = mid;
                }
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return index;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums, int x) {
        int n = nums.size();
        vector<int> prefixSum(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        if (x > prefixSum[n]) {
            return -1;
        }

        auto binarySearch = [&](int target, int m) {
            int l = 1, r = m, index = n + 1;
            while (l <= r) {
                int mid = (l + r) / 2;
                if (prefixSum[mid] >= target) {
                    if (prefixSum[mid] == target) {
                        index = mid;
                    }
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }
            return index;
        };

        int res = binarySearch(x, n);
        int suffixSum = 0;
        for (int i = n - 1; i > 0; i--) {
            suffixSum += nums[i];
            if (suffixSum == x) {
                res = min(res, n - i);
                break;
            }
            if (suffixSum > x) break;
            res = min(res, binarySearch(x - suffixSum, i) + n - i);
        }

        return res == n + 1 ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} x
     * @return {number}
     */
    minOperations(nums, x) {
        const n = nums.length;
        const prefixSum = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        if (x > prefixSum[n]) return -1;

        const binarySearch = (target, m) => {
            let l = 1,
                r = m;
            let index = n + 1;
            while (l <= r) {
                let mid = Math.floor((l + r) / 2);
                if (prefixSum[mid] >= target) {
                    if (prefixSum[mid] === target) {
                        index = mid;
                    }
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }
            return index;
        };

        let res = binarySearch(x, n);
        let suffixSum = 0;
        for (let i = n - 1; i > 0; i--) {
            suffixSum += nums[i];
            if (suffixSum === x) {
                res = Math.min(res, n - i);
                break;
            }
            if (suffixSum > x) break;
            res = Math.min(res, binarySearch(x - suffixSum, i) + n - i);
        }

        return res === n + 1 ? -1 : res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Prefix Sum + Hash Map

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        total = sum(nums)
        if total == x:
            return len(nums)

        target = total - x
        if target < 0:
            return -1

        res = -1
        prefixSum = 0
        prefixMap = {0: -1}  # prefixSum -> index

        for i, num in enumerate(nums):
            prefixSum += num
            if prefixSum - target in prefixMap:
                res = max(res, i - prefixMap[prefixSum - target])
            prefixMap[prefixSum] = i

        return len(nums) - res if res != -1 else -1
```

```java
public class Solution {
    public int minOperations(int[] nums, int x) {
        int total = 0;
        for (int num : nums) total += num;
        if (total == x) return nums.length;

        int target = total - x;
        if (target < 0) return -1;

        Map<Integer, Integer> prefixMap = new HashMap<>();
        prefixMap.put(0, -1);
        int prefixSum = 0, res = -1;

        for (int i = 0; i < nums.length; i++) {
            prefixSum += nums[i];
            if (prefixMap.containsKey(prefixSum - target)) {
                res = Math.max(res, i - prefixMap.get(prefixSum - target));
            }
            prefixMap.put(prefixSum, i);
        }

        return res == -1 ? -1 : nums.length - res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums, int x) {
        int total = 0;
        for (int& num : nums) total += num;
        if (total == x) return nums.size();

        int target = total - x;
        if (target < 0) return -1;

        unordered_map<int, int> prefixMap;
        prefixMap[0] = -1;
        int prefixSum = 0, res = -1;

        for (int i = 0; i < nums.size(); i++) {
            prefixSum += nums[i];
            if (prefixMap.count(prefixSum - target)) {
                res = max(res, i - prefixMap[prefixSum - target]);
            }
            prefixMap[prefixSum] = i;
        }

        return res == -1 ? -1 : nums.size() - res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} x
     * @return {number}
     */
    minOperations(nums, x) {
        const total = nums.reduce((acc, num) => acc + num, 0);
        if (total === x) return nums.length;

        const target = total - x;
        if (target < 0) return -1;

        const prefixMap = new Map();
        prefixMap.set(0, -1);
        let prefixSum = 0,
            res = -1;

        for (let i = 0; i < nums.length; i++) {
            prefixSum += nums[i];
            if (prefixMap.has(prefixSum - target)) {
                res = Math.max(res, i - prefixMap.get(prefixSum - target));
            }
            prefixMap.set(prefixSum, i);
        }

        return res === -1 ? -1 : nums.length - res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Sliding Window

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        target = sum(nums) - x
        cur_sum = 0
        max_window = -1
        l = 0

        for r in range(len(nums)):
            cur_sum += nums[r]

            while l <= r and cur_sum > target:
                cur_sum -= nums[l]
                l += 1

            if cur_sum == target:
                max_window = max(max_window, r - l + 1)

        return -1 if max_window == -1 else len(nums) - max_window
```

```java
public class Solution {
    public int minOperations(int[] nums, int x) {
        int target = 0;
        for (int num : nums) target += num;
        target -= x;

        int curSum = 0, maxWindow = -1, l = 0;

        for (int r = 0; r < nums.length; r++) {
            curSum += nums[r];

            while (l <= r && curSum > target) {
                curSum -= nums[l];
                l++;
            }

            if (curSum == target) {
                maxWindow = Math.max(maxWindow, r - l + 1);
            }
        }

        return maxWindow == -1 ? -1 : nums.length - maxWindow;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums, int x) {
        int target = accumulate(nums.begin(), nums.end(), 0) - x;
        int curSum = 0, maxWindow = -1, l = 0;

        for (int r = 0; r < nums.size(); r++) {
            curSum += nums[r];

            while (l <= r && curSum > target) {
                curSum -= nums[l];
                l++;
            }

            if (curSum == target) {
                maxWindow = max(maxWindow, r - l + 1);
            }
        }

        return maxWindow == -1 ? -1 : nums.size() - maxWindow;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} x
     * @return {number}
     */
    minOperations(nums, x) {
        const target = nums.reduce((acc, num) => acc + num, 0) - x;
        let curSum = 0,
            maxWindow = -1,
            l = 0;

        for (let r = 0; r < nums.length; r++) {
            curSum += nums[r];

            while (l <= r && curSum > target) {
                curSum -= nums[l];
                l++;
            }

            if (curSum === target) {
                maxWindow = Math.max(maxWindow, r - l + 1);
            }
        }

        return maxWindow === -1 ? -1 : nums.length - maxWindow;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
