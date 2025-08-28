## 1. Brute Force

::tabs-start

```python
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0

        for i in range(n):
            curProd = 1
            for j in range(i, n):
                curProd *= nums[j]
                if curProd >= k:
                    break
                res += 1

        return res
```

```java
public class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        int n = nums.length, res = 0;

        for (int i = 0; i < n; i++) {
            int curProd = 1;
            for (int j = i; j < n; j++) {
                curProd *= nums[j];
                if (curProd >= k) break;
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;

        for (int i = 0; i < n; i++) {
            int curProd = 1;
            for (int j = i; j < n; j++) {
                curProd *= nums[j];
                if (curProd >= k) break;
                res++;
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
    numSubarrayProductLessThanK(nums, k) {
        let n = nums.length,
            res = 0;

        for (let i = 0; i < n; i++) {
            let curProd = 1;
            for (let j = i; j < n; j++) {
                curProd *= nums[j];
                if (curProd >= k) break;
                res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubarrayProductLessThanK(int[] nums, int k) {
        int n = nums.Length, res = 0;

        for (int i = 0; i < n; i++) {
            long curProd = 1;
            for (int j = i; j < n; j++) {
                curProd *= nums[j];
                if (curProd >= k) break;
                res++;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        if k <= 1:
            return 0

        n = len(nums)
        res = 0
        logs = [0] * (n + 1)
        logK = log(k)
        for i in range(n):
            logs[i + 1] = logs[i] + log(nums[i])

        for i in range(n):
            l, r = i + 1, n + 1
            while l < r:
                mid = (l + r) >> 1
                if logs[mid] < logs[i] + logK - 1e-9:
                    l = mid + 1
                else:
                    r = mid
            res += l - (i + 1)

        return res
```

```java
public class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) return 0;
        int n = nums.length;
        double[] logs = new double[n + 1];
        double logK = Math.log(k);
        for (int i = 0; i < n; i++) {
            logs[i + 1] = logs[i] + Math.log(nums[i]);
        }
        int res = 0;
        for (int i = 0; i < n; i++) {
            int l = i + 1, r = n + 1;
            while (l < r) {
                int mid = (l + r) >> 1;
                if (logs[mid] < logs[i] + logK - 1e-12) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            res += l - (i + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k <= 1) return 0;
        int n = nums.size();
        vector<double> logs(n + 1, 0.0);
        double logK = log(k);
        for (int i = 0; i < n; i++) {
            logs[i + 1] = logs[i] + log(nums[i]);
        }
        int res = 0;
        for (int i = 0; i < n; i++) {
            int l = i + 1, r = n + 1;
            while (l < r) {
                int mid = (l + r) >> 1;
                if (logs[mid] < logs[i] + logK - 1e-12) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            res += l - (i + 1);
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
    numSubarrayProductLessThanK(nums, k) {
        if (k <= 1) return 0;
        const n = nums.length;
        const logs = new Array(n + 1).fill(0);
        const logK = Math.log(k);
        for (let i = 0; i < n; i++) {
            logs[i + 1] = logs[i] + Math.log(nums[i]);
        }
        let res = 0;
        for (let i = 0; i < n; i++) {
            let l = i + 1, r = n + 1;
            while (l < r) {
                let mid = (l + r) >> 1;
                if (logs[mid] < logs[i] + logK - 1e-12) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            res += l - (i + 1);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) return 0;
        int n = nums.Length;
        double[] logs = new double[n + 1];
        double logK = Math.Log(k);
        for (int i = 0; i < n; i++) {
            logs[i + 1] = logs[i] + Math.Log(nums[i]);
        }
        int res = 0;
        for (int i = 0; i < n; i++) {
            int l = i + 1, r = n + 1;
            while (l < r) {
                int mid = (l + r) >> 1;
                if (logs[mid] < logs[i] + logK - 1e-12) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            res += l - (i + 1);
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
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        res = 0
        l = 0
        product = 1
        for r in range(len(nums)):
            product *= nums[r]
            while l <= r and product >= k:
                product //= nums[l]
                l += 1
            res += (r - l + 1)
        return res
```

```java
public class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        int res = 0, l = 0;
        long product = 1;
        for (int r = 0; r < nums.length; r++) {
            product *= nums[r];
            while (l <= r && product >= k) {
                product /= nums[l++];
            }
            res += (r - l + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        int res = 0, l = 0;
        long long product = 1;
        for (int r = 0; r < nums.size(); r++) {
            product *= nums[r];
            while (l <= r && product >= k) {
                product /= nums[l++];
            }
            res += (r - l + 1);
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
    numSubarrayProductLessThanK(nums, k) {
        let res = 0,
            l = 0,
            product = 1;
        for (let r = 0; r < nums.length; r++) {
            product *= nums[r];
            while (l <= r && product >= k) {
                product = Math.floor(product / nums[l++]);
            }
            res += r - l + 1;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubarrayProductLessThanK(int[] nums, int k) {
        int res = 0;
        int l = 0;
        long product = 1;
        for (int r = 0; r < nums.Length; r++) {
            product *= nums[r];
            while (l <= r && product >= k) {
                product /= nums[l];
                l++;
            }
            res += (r - l + 1);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$