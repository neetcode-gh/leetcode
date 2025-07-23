## 1. Brute Force

::tabs-start

```python
class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        res = 0
        for l in range(len(nums)):
            cnt, r = 0, l
            while r < len(nums):
                if nums[r] == 0:
                    if cnt == k:
                        break
                    cnt += 1
                r += 1
            res = max(res, r - l)
        return res
```

```java
public class Solution {
    public int longestOnes(int[] nums, int k) {
        int res = 0;
        for (int l = 0; l < nums.length; l++) {
            int cnt = 0, r = l;
            while (r < nums.length) {
                if (nums[r] == 0) {
                    if (cnt == k) break;
                    cnt++;
                }
                r++;
            }
            res = Math.max(res, r - l);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int res = 0;
        for (int l = 0; l < nums.size(); l++) {
            int cnt = 0, r = l;
            while (r < nums.size()) {
                if (nums[r] == 0) {
                    if (cnt == k) break;
                    cnt++;
                }
                r++;
            }
            res = max(res, r - l);
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
    longestOnes(nums, k) {
        let res = 0;
        for (let l = 0; l < nums.length; l++) {
            let cnt = 0, r = l;
            while (r < nums.length) {
                if (nums[r] === 0) {
                    if (cnt === k) break;
                    cnt++;
                }
                r++;
            }
            res = Math.max(res, r - l);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestOnes(int[] nums, int k) {
        int res = 0;
        for (int l = 0; l < nums.Length; l++) {
            int cnt = 0, r = l;
            while (r < nums.Length) {
                if (nums[r] == 0) {
                    if (cnt == k) break;
                    cnt++;
                }
                r++;
            }
            res = Math.Max(res, r - l);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Binary Search + Prefix Sum

::tabs-start

```python
class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        prefix = [0]
        for num in nums:
            prefix.append(prefix[-1] + (1 if num == 0 else 0))
        
        res = 0
        for l in range(len(nums)):
            low, high = l, len(nums)
            while low < high:
                mid = (low + high) // 2
                if prefix[mid + 1] - prefix[l] <= k:
                    low = mid + 1
                else:
                    high = mid
            res = max(res, low - l)
        return res
```

```java
public class Solution {
    public int longestOnes(int[] nums, int k) {
        int[] prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + (nums[i] == 0 ? 1 : 0);
        }

        int res = 0;
        for (int l = 0; l < nums.length; l++) {
            int low = l, high = nums.length;
            while (low < high) {
                int mid = (low + high) / 2;
                if (prefix[mid + 1] - prefix[l] <= k) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            res = Math.max(res, low - l);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        vector<int> prefix(nums.size() + 1, 0);
        for (int i = 0; i < nums.size(); ++i) {
            prefix[i + 1] = prefix[i] + (nums[i] == 0 ? 1 : 0);
        }

        int res = 0;
        for (int l = 0; l < nums.size(); ++l) {
            int low = l, high = nums.size();
            while (low < high) {
                int mid = (low + high) / 2;
                if (prefix[mid + 1] - prefix[l] <= k) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            res = max(res, low - l);
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
    longestOnes(nums, k) {
        const prefix = [0];
        for (let i = 0; i < nums.length; i++) {
            prefix.push(prefix[prefix.length - 1] + (nums[i] === 0 ? 1 : 0));
        }

        let res = 0;
        for (let l = 0; l < nums.length; l++) {
            let low = l, high = nums.length;
            while (low < high) {
                let mid = Math.floor((low + high) / 2);
                if (prefix[mid + 1] - prefix[l] <= k) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            res = Math.max(res, low - l);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestOnes(int[] nums, int k) {
        int[] prefix = new int[nums.Length + 1];
        for (int i = 0; i < nums.Length; i++) {
            prefix[i + 1] = prefix[i] + (nums[i] == 0 ? 1 : 0);
        }

        int res = 0;
        for (int l = 0; l < nums.Length; l++) {
            int low = l, high = nums.Length;
            while (low < high) {
                int mid = (low + high) / 2;
                if (prefix[mid + 1] - prefix[l] <= k) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            res = Math.Max(res, low - l);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 3. Sliding Window

::tabs-start

```python
class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        l = res = 0
        for r in range(len(nums)):
            k -= (1 if nums[r] == 0 else 0)
            while k < 0:
                k += (1 if nums[l] == 0 else 0)
                l += 1
            res = max(res, r - l + 1)
        return res
```

```java
public class Solution {
    public int longestOnes(int[] nums, int k) {
        int l = 0, res = 0;
        for (int r = 0; r < nums.length; r++) {
            k -= (nums[r] == 0 ? 1 : 0);
            while (k < 0) {
                k += (nums[l] == 0 ? 1 : 0);
                l++;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int l = 0, res = 0;
        for (int r = 0; r < nums.size(); ++r) {
            k -= (nums[r] == 0 ? 1 : 0);
            while (k < 0) {
                k += (nums[l] == 0 ? 1 : 0);
                ++l;
            }
            res = max(res, r - l + 1);
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
    longestOnes(nums, k) {
        let l = 0, res = 0;
        for (let r = 0; r < nums.length; r++) {
            k -= (nums[r] === 0 ? 1 : 0);
            while (k < 0) {
                k += (nums[l] === 0 ? 1 : 0);
                l++;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestOnes(int[] nums, int k) {
        int l = 0, res = 0;
        for (int r = 0; r < nums.Length; r++) {
            k -= (nums[r] == 0 ? 1 : 0);
            while (k < 0) {
                k += (nums[l] == 0 ? 1 : 0);
                l++;
            }
            res = Math.Max(res, r - l + 1);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$