## 1. Brute Force

::tabs-start

```python
class Solution:
    def maximumScore(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0

        for i in range(k + 1):
            minEle = nums[i]
            for j in range(i, n):
                minEle = min(minEle, nums[j])
                if j >= k:
                    res = max(res, minEle * (j - i + 1))

        return res
```

```java
public class Solution {
    public int maximumScore(int[] nums, int k) {
        int n = nums.length, res = 0;

        for (int i = 0; i <= k; i++) {
            int minEle = nums[i];
            for (int j = i; j < n; j++) {
                minEle = Math.min(minEle, nums[j]);
                if (j >= k) {
                    res = Math.max(res, minEle * (j - i + 1));
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maximumScore(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;

        for (int i = 0; i <= k; i++) {
            int minEle = nums[i];
            for (int j = i; j < n; j++) {
                minEle = min(minEle, nums[j]);
                if (j >= k) {
                    res = max(res, minEle * (j - i + 1));
                }
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
     * @param {number} k
     * @return {number}
     */
    maximumScore(nums, k) {
        let n = nums.length,
            res = 0;

        for (let i = 0; i <= k; i++) {
            let minEle = nums[i];
            for (let j = i; j < n; j++) {
                minEle = Math.min(minEle, nums[j]);
                if (j >= k) {
                    res = Math.max(res, minEle * (j - i + 1));
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def maximumScore(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0
        arr = nums[:]

        for i in range(k - 1, -1, -1):
            arr[i] = min(arr[i], arr[i + 1])
        for i in range(k + 1, n):
            arr[i] = min(arr[i], arr[i - 1])

        left_arr = arr[:k+1]
        right_arr = arr[k:]

        def find_right(target):
            lo, hi = 0, len(right_arr) - 1
            pos = 0
            while lo <= hi:
                mid = (lo + hi) // 2
                if right_arr[mid] >= target:
                    pos = mid
                    lo = mid + 1
                else:
                    hi = mid - 1
            return pos

        for minVal in set(arr):
            l = bisect_left(left_arr, minVal)
            r = find_right(minVal)
            res = max(res, minVal * (k - l + 1 + r))
        return res
```

```java
public class Solution {
    public int maximumScore(int[] nums, int k) {
        int n = nums.length, res = 0;
        int[] arr = Arrays.copyOf(nums, n);
        Set<Integer> candidates = new HashSet<>();
        candidates.add(arr[k]);

        for (int i = k - 1; i >= 0; i--) {
            arr[i] = Math.min(arr[i], arr[i + 1]);
            candidates.add(arr[i]);
        }
        for (int i = k + 1; i < n; i++) {
            arr[i] = Math.min(arr[i], arr[i - 1]);
            candidates.add(arr[i]);
        }

        int[] leftArr = Arrays.copyOfRange(arr, 0, k + 1);
        int[] rightArr = Arrays.copyOfRange(arr, k, n);

        for (int minVal : candidates) {
            int l = findLeft(leftArr, minVal);
            int r = findRight(rightArr, minVal);
            res = Math.max(res, minVal * (k - l + 1 + r));
        }
        return res;
    }

    private int findLeft(int[] arr, int target) {
        int lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    private int findRight(int[] arr, int target) {
        int lo = 0, hi = arr.length - 1, pos = 0;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] >= target) {
                pos = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return pos;
    }
}
```

```cpp
class Solution {
public:
    int maximumScore(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;
        vector<int> arr = nums;

        for (int i = k - 1; i >= 0; i--) {
            arr[i] = min(arr[i], arr[i + 1]);
        }
        for (int i = k + 1; i < n; i++) {
            arr[i] = min(arr[i], arr[i - 1]);
        }

        vector<int> leftArr(arr.begin(), arr.begin() + k + 1);
        vector<int> rightArr(arr.begin() + k, arr.end());

        set<int> candidates(arr.begin(), arr.end());
        for (int minVal : candidates) {
            int l = lower_bound(leftArr.begin(), leftArr.end(), minVal) - leftArr.begin();
            int r = findRight(rightArr, minVal);
            res = max(res, minVal * (k - l + 1 + r));
        }
        return res;
    }

private:
    int findRight(vector<int>& arr, int target) {
        int lo = 0, hi = arr.size() - 1, pos = 0;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] >= target) {
                pos = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return pos;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    maximumScore(nums, k) {
        let n = nums.length,
            res = 0;
        let arr = [...nums];

        for (let i = k - 1; i >= 0; i--) {
            arr[i] = Math.min(arr[i], arr[i + 1]);
        }
        for (let i = k + 1; i < n; i++) {
            arr[i] = Math.min(arr[i], arr[i - 1]);
        }

        let leftArr = arr.slice(0, k + 1);
        let rightArr = arr.slice(k);

        const findLeft = (target) => {
            let lo = 0,
                hi = leftArr.length - 1;
            while (lo <= hi) {
                let mid = Math.floor((lo + hi) / 2);
                if (leftArr[mid] < target) {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            return lo;
        };

        const findRight = (target) => {
            let lo = 0,
                hi = rightArr.length - 1,
                pos = 0;
            while (lo <= hi) {
                let mid = Math.floor((lo + hi) / 2);
                if (rightArr[mid] >= target) {
                    pos = mid;
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            return pos;
        };

        let candidates = [...new Set(arr)];
        for (let minVal of candidates) {
            let l = findLeft(minVal);
            let r = findRight(minVal);
            res = Math.max(res, minVal * (k - l + 1 + r));
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

## 3. Binary Search (Overwriting the Input)

::tabs-start

```python
class Solution:
    def maximumScore(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0

        for i in range(k - 1, -1, -1):
            nums[i] = min(nums[i], nums[i + 1])
        for i in range(k + 1, n):
            nums[i] = min(nums[i], nums[i - 1])

        def find_left(target):
            lo, hi = 0, k
            while lo <= hi:
                mid = (lo + hi) // 2
                if nums[mid] < target:
                    lo = mid + 1
                else:
                    hi = mid - 1
            return lo

        def find_right(target):
            lo, hi = k, n - 1
            while lo <= hi:
                mid = (lo + hi) // 2
                if nums[mid] >= target:
                    lo = mid + 1
                else:
                    hi = mid - 1
            return hi

        for minVal in set(nums):
            i = find_left(minVal)
            j = find_right(minVal)
            res = max(res, minVal * (j - i + 1))
        return res
```

```java
public class Solution {
    public int maximumScore(int[] nums, int k) {
        int n = nums.length, res = 0;

        for (int i = k - 1; i >= 0; i--) {
            nums[i] = Math.min(nums[i], nums[i + 1]);
        }
        for (int i = k + 1; i < n; i++) {
            nums[i] = Math.min(nums[i], nums[i - 1]);
        }

        Set<Integer> candidates = new TreeSet<>();
        for (int num : nums) {
            candidates.add(num);
        }

        for (int minVal : candidates) {
            int i = findLeft(nums, k, minVal);
            int j = findRight(nums, k, minVal);
            res = Math.max(res, minVal * (j - i + 1));
        }
        return res;
    }

    int findLeft(int[] nums, int k, int target) {
        int lo = 0, hi = k;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    int findRight(int[] nums, int k, int target) {
        int lo = k, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] >= target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return hi;
    }
}
```

```cpp
class Solution {
public:
    int maximumScore(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;

        for (int i = k - 1; i >= 0; i--) {
            nums[i] = min(nums[i], nums[i + 1]);
        }
        for (int i = k + 1; i < n; i++) {
            nums[i] = min(nums[i], nums[i - 1]);
        }

        auto findLeft = [&](int target) {
            int lo = 0, hi = k;
            while (lo <= hi) {
                int mid = (lo + hi) / 2;
                if (nums[mid] < target) {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            return lo;
        };

        auto findRight = [&](int target) {
            int lo = k, hi = n - 1;
            while (lo <= hi) {
                int mid = (lo + hi) / 2;
                if (nums[mid] >= target) {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            return hi;
        };

        set<int> candidates(nums.begin(), nums.end());
        for (int minVal : candidates) {
            int i = findLeft(minVal);
            int j = findRight(minVal);
            res = max(res, minVal * (j - i + 1));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    maximumScore(nums, k) {
        let n = nums.length,
            res = 0;

        for (let i = k - 1; i >= 0; i--) {
            nums[i] = Math.min(nums[i], nums[i + 1]);
        }
        for (let i = k + 1; i < n; i++) {
            nums[i] = Math.min(nums[i], nums[i - 1]);
        }

        const findLeft = (target) => {
            let lo = 0,
                hi = k;
            while (lo <= hi) {
                let mid = Math.floor((lo + hi) / 2);
                if (nums[mid] < target) {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            return lo;
        };

        const findRight = (target) => {
            let lo = k,
                hi = n - 1;
            while (lo <= hi) {
                let mid = Math.floor((lo + hi) / 2);
                if (nums[mid] >= target) {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            return hi;
        };

        let candidates = new Set(nums);
        for (let minVal of candidates) {
            let i = findLeft(minVal);
            let j = findRight(minVal);
            res = Math.max(res, minVal * (j - i + 1));
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

## 4. Monotonic Stack

::tabs-start

```python
class Solution:
    def maximumScore(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0
        stack = []

        for i in range(n + 1):
            while stack and (i == n or nums[stack[-1]] >= nums[i]):
                mini = nums[stack.pop()]
                j = stack[-1] if stack else -1
                if j < k < i:
                    res = max(res, mini * (i - j - 1))
            stack.append(i)

        return res
```

```java
public class Solution {
    public int maximumScore(int[] nums, int k) {
        int n = nums.length, res = 0;
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i <= n; i++) {
            while (!stack.isEmpty() && (i == n || nums[stack.peek()] >= nums[i])) {
                int mini = nums[stack.pop()];
                int j = stack.isEmpty() ? -1 : stack.peek();
                if (j < k && k < i) {
                    res = Math.max(res, mini * (i - j - 1));
                }
            }
            stack.push(i);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maximumScore(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;
        stack<int> stk;

        for (int i = 0; i <= n; i++) {
            while (!stk.empty() && (i == n || nums[stk.top()] >= nums[i])) {
                int mini = nums[stk.top()];
                stk.pop();
                int j = stk.empty() ? -1 : stk.top();
                if (j < k && k < i) {
                    res = max(res, mini * (i - j - 1));
                }
            }
            stk.push(i);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    maximumScore(nums, k) {
        let n = nums.length,
            res = 0;
        let stack = [];

        for (let i = 0; i <= n; i++) {
            while (
                stack.length &&
                (i === n || nums[stack[stack.length - 1]] >= nums[i])
            ) {
                let mini = nums[stack.pop()];
                let j = stack.length ? stack[stack.length - 1] : -1;
                if (j < k && k < i) {
                    res = Math.max(res, mini * (i - j - 1));
                }
            }
            stack.push(i);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Greedy + Two Pointers

::tabs-start

```python
class Solution:
    def maximumScore(self, nums: List[int], k: int) -> int:
        l = r = k
        res = nums[k]
        cur_min = nums[k]

        while l > 0 or r < len(nums) - 1:
            left = nums[l - 1] if l > 0 else 0
            right = nums[r + 1] if r < len(nums) - 1 else 0

            if left > right:
                l -= 1
                cur_min = min(cur_min, left)
            else:
                r += 1
                cur_min = min(cur_min, right)

            res = max(res, cur_min * (r - l + 1))

        return res
```

```java
public class Solution {
    public int maximumScore(int[] nums, int k) {
        int l = k, r = k;
        int res = nums[k];
        int curMin = nums[k];
        int n = nums.length;

        while (l > 0 || r < n - 1) {
            int left = (l > 0) ? nums[l - 1] : 0;
            int right = (r < n - 1) ? nums[r + 1] : 0;

            if (left > right) {
                l--;
                curMin = Math.min(curMin, left);
            } else {
                r++;
                curMin = Math.min(curMin, right);
            }

            res = Math.max(res, curMin * (r - l + 1));
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maximumScore(vector<int>& nums, int k) {
        int l = k, r = k;
        int res = nums[k];
        int curMin = nums[k];
        int n = nums.size();

        while (l > 0 || r < n - 1) {
            int left = (l > 0) ? nums[l - 1] : 0;
            int right = (r < n - 1) ? nums[r + 1] : 0;

            if (left > right) {
                l--;
                curMin = min(curMin, left);
            } else {
                r++;
                curMin = min(curMin, right);
            }

            res = max(res, curMin * (r - l + 1));
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    maximumScore(nums, k) {
        let l = k,
            r = k;
        let res = nums[k];
        let curMin = nums[k];
        let n = nums.length;

        while (l > 0 || r < n - 1) {
            let left = l > 0 ? nums[l - 1] : 0;
            let right = r < n - 1 ? nums[r + 1] : 0;

            if (left > right) {
                l--;
                curMin = Math.min(curMin, left);
            } else {
                r++;
                curMin = Math.min(curMin, right);
            }

            res = Math.max(res, curMin * (r - l + 1));
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
