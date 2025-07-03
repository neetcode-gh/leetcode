## 1. Brute Force

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0
        maxi = max(nums)

        for i in range(n):
            cnt = 0
            for j in range(i, n):
                if nums[j] == maxi:
                    cnt += 1

                if cnt >= k:
                    res += 1

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int n = nums.length;
        long res = 0;
        int maxi = Integer.MIN_VALUE;

        for (int num : nums) {
            maxi = Math.max(maxi, num);
        }

        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == maxi) {
                    cnt++;
                }

                if (cnt >= k) {
                    res++;
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
    long long countSubarrays(vector<int>& nums, int k) {
        int n = nums.size();
        long long res = 0;
        int maxi = *max_element(nums.begin(), nums.end());

        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == maxi) {
                    cnt++;
                }

                if (cnt >= k) {
                    res++;
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
    countSubarrays(nums, k) {
        let n = nums.length,
            res = 0;
        let maxi = Math.max(...nums);

        for (let i = 0; i < n; i++) {
            let cnt = 0;
            for (let j = i; j < n; j++) {
                if (nums[j] === maxi) {
                    cnt++;
                }

                if (cnt >= k) {
                    res++;
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
- Space complexity: $O(1)$

---

## 2. Variable Size Sliding Window

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        max_n, max_cnt = max(nums), 0
        l = 0
        res = 0

        for r in range(len(nums)):
            if nums[r] == max_n:
                max_cnt += 1

            while max_cnt > k or (l <= r and max_cnt == k and nums[l] != max_n):
                if nums[l] == max_n:
                    max_cnt -= 1
                l += 1

            if max_cnt == k:
                res += l + 1

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int maxN = Integer.MIN_VALUE, maxCnt = 0, l = 0;
        long res = 0;
        for (int num : nums) {
            maxN = Math.max(maxN, num);
        }

        for (int r = 0; r < nums.length; r++) {
            if (nums[r] == maxN) {
                maxCnt++;
            }

            while (maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN)) {
                if (nums[l] == maxN) {
                    maxCnt--;
                }
                l++;
            }

            if (maxCnt == k) {
                res += l + 1;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int maxN = *max_element(nums.begin(), nums.end());
        int maxCnt = 0, l = 0;
        long long res = 0;

        for (int r = 0; r < nums.size(); r++) {
            if (nums[r] == maxN) {
                maxCnt++;
            }

            while (maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN)) {
                if (nums[l] == maxN) {
                    maxCnt--;
                }
                l++;
            }

            if (maxCnt == k) {
                res += l + 1;
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
    countSubarrays(nums, k) {
        let maxN = Math.max(...nums);
        let maxCnt = 0,
            l = 0,
            res = 0;

        for (let r = 0; r < nums.length; r++) {
            if (nums[r] === maxN) {
                maxCnt++;
            }

            while (maxCnt > k || (l <= r && maxCnt === k && nums[l] !== maxN)) {
                if (nums[l] === maxN) {
                    maxCnt--;
                }
                l++;
            }

            if (maxCnt === k) {
                res += l + 1;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Variable Size Sliding Window (Optimal)

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        max_n, max_cnt = max(nums), 0
        l = res = 0

        for r in range(len(nums)):
            if nums[r] == max_n:
                max_cnt += 1
            while max_cnt == k:
                if nums[l] == max_n:
                    max_cnt -= 1
                l += 1
            res += l

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int max_n = Integer.MIN_VALUE, max_cnt = 0, l = 0;
        long res = 0;
        for (int num : nums) {
            max_n = Math.max(max_n, num);
        }

        for (int r = 0; r < nums.length; r++) {
            if (nums[r] == max_n) {
                max_cnt++;
            }
            while (max_cnt == k) {
                if (nums[l] == max_n) {
                    max_cnt--;
                }
                l++;
            }
            res += l;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int max_n = *max_element(nums.begin(), nums.end());
        int max_cnt = 0, l = 0;
        long long res = 0;

        for (int r = 0; r < nums.size(); r++) {
            if (nums[r] == max_n) {
                max_cnt++;
            }
            while (max_cnt == k) {
                if (nums[l] == max_n) {
                    max_cnt--;
                }
                l++;
            }
            res += l;
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
    countSubarrays(nums, k) {
        let max_n = Math.max(...nums),
            max_cnt = 0,
            l = 0,
            res = 0;

        for (let r = 0; r < nums.length; r++) {
            if (nums[r] === max_n) {
                max_cnt++;
            }
            while (max_cnt === k) {
                if (nums[l] === max_n) {
                    max_cnt--;
                }
                l++;
            }
            res += l;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Fixed Size Sliding Window + Math

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        n = len(nums)
        max_n = max(nums)
        max_indexes = [-1]
        for i, num in enumerate(nums):
            if num == max_n:
                max_indexes.append(i)

        res = 0
        for i in range(1, len(max_indexes) - k + 1):
            cur = (max_indexes[i] - max_indexes[i - 1])
            cur *= (n - max_indexes[i + k - 1])
            res += cur

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int n = nums.length;
        int max_n = Integer.MIN_VALUE;
        for (int num : nums) {
            max_n = Math.max(max_n, num);
        }

        List<Integer> max_indexes = new ArrayList<>();
        max_indexes.add(-1);
        for (int i = 0; i < n; i++) {
            if (nums[i] == max_n) {
                max_indexes.add(i);
            }
        }

        long res = 0;
        for (int i = 1; i <= max_indexes.size() - k; i++) {
            long cur = (max_indexes.get(i) - max_indexes.get(i - 1));
            cur *= (n - max_indexes.get(i + k - 1));
            res += cur;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int n = nums.size();
        int max_n = *max_element(nums.begin(), nums.end());
        vector<int> max_indexes = {-1};

        for (int i = 0; i < n; i++) {
            if (nums[i] == max_n) {
                max_indexes.push_back(i);
            }
        }

        long long res = 0;
        for (int i = 1; i <= int(max_indexes.size()) - k; i++) {
            long long cur = (max_indexes[i] - max_indexes[i - 1]);
            cur *= (n - max_indexes[i + k - 1]);
            res += cur;
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
    countSubarrays(nums, k) {
        const n = nums.length;
        const max_n = Math.max(...nums);
        const max_indexes = [-1];

        for (let i = 0; i < n; i++) {
            if (nums[i] === max_n) {
                max_indexes.push(i);
            }
        }

        let res = 0;
        for (let i = 1; i <= max_indexes.length - k; i++) {
            res +=
                (max_indexes[i] - max_indexes[i - 1]) *
                (n - max_indexes[i + k - 1]);
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

## 5. Fixed Size Sliding Window (Optimal)

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        max_n = max(nums)
        max_indexes = deque()
        res = 0

        for i, num in enumerate(nums):
            if num == max_n:
                max_indexes.append(i)

            if len(max_indexes) > k:
                max_indexes.popleft()

            if len(max_indexes) == k:
                res += max_indexes[0] + 1

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int maxN = Integer.MIN_VALUE;
        for (int num : nums) {
            maxN = Math.max(maxN, num);
        }

        Queue<Integer> maxIndexes = new LinkedList<>();
        long res = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == maxN) {
                maxIndexes.add(i);
            }

            if (maxIndexes.size() > k) {
                maxIndexes.poll();
            }

            if (maxIndexes.size() == k) {
                res += maxIndexes.peek() + 1;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int maxN = *max_element(nums.begin(), nums.end());
        queue<int> maxIndexes;
        long long res = 0;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == maxN) {
                maxIndexes.push(i);
            }

            if (maxIndexes.size() > k) {
                maxIndexes.pop();
            }

            if (maxIndexes.size() == k) {
                res += maxIndexes.front() + 1;
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
    countSubarrays(nums, k) {
        const maxN = Math.max(...nums);
        const maxIndexes = new Queue();
        let res = 0;

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === maxN) {
                maxIndexes.push(i);
            }

            if (maxIndexes.size() > k) {
                maxIndexes.pop();
            }

            if (maxIndexes.size() === k) {
                res += maxIndexes.front() + 1;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
