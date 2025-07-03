## 1. Brute Force

::tabs-start

```python
class Solution:
    def check(self, nums: List[int]) -> bool:
        sortedNums = sorted(nums)
        arr = []

        for i in range(len(nums)):
            arr.insert(0, sortedNums.pop())
            if nums == arr + sortedNums:
                return True

        return False
```

```java
public class Solution {
    public boolean check(int[] nums) {
        int n = nums.length;
        int[] sortedNums = nums.clone();
        Arrays.sort(sortedNums);

        for (int i = 0; i < n; i++) {
            boolean match = true;
            int idx = 0;
            for (int j = n - i; j < n && match; j++) {
                if (nums[idx] != sortedNums[j]) {
                    match = false;
                }
                idx += 1;
            }

            for (int j = 0; j < n - i && match; j++) {
                if (nums[idx] != sortedNums[j]) {
                    match = false;
                }
                idx += 1;
            }

            if (match) return true;
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool check(vector<int>& nums) {
        int n = nums.size();
        vector<int> sortedNums = nums;
        sort(sortedNums.begin(), sortedNums.end());

        for (int i = 0; i < n; i++) {
            bool match = true;
            int idx = 0;
            for (int j = n - i; j < n && match; j++) {
                if (nums[idx] != sortedNums[j]) {
                    match = false;
                }
                idx++;
            }

            for (int j = 0; j < n - i && match; j++) {
                if (nums[idx] != sortedNums[j]) {
                    match = false;
                }
                idx++;
            }

            if (match) return true;
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    check(nums) {
        const n = nums.length;
        const sortedNums = [...nums].sort((a, b) => a - b);

        for (let i = 0; i < n; i++) {
            let match = true;
            let idx = 0;

            for (let j = n - i; j < n && match; j++) {
                if (nums[idx] !== sortedNums[j]) {
                    match = false;
                }
                idx++;
            }

            for (let j = 0; j < n - i && match; j++) {
                if (nums[idx] !== sortedNums[j]) {
                    match = false;
                }
                idx++;
            }

            if (match) return true;
        }

        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Sliding Window

::tabs-start

```python
class Solution:
    def check(self, nums: List[int]) -> bool:
        N = len(nums)
        count = 1

        for i in range(1, 2 * N):
            if nums[(i - 1) % N] <= nums[i % N]:
                count += 1
            else:
                count = 1
            if count == N:
                return True

        return N == 1
```

```java
public class Solution {
    public boolean check(int[] nums) {
        int N = nums.length;
        int count = 1;

        for (int i = 1; i < 2 * N; i++) {
            if (nums[(i - 1) % N] <= nums[i % N]) {
                count++;
            } else {
                count = 1;
            }
            if (count == N) {
                return true;
            }
        }

        return N == 1;
    }
}
```

```cpp
class Solution {
public:
    bool check(vector<int>& nums) {
        int N = nums.size();
        int count = 1;

        for (int i = 1; i < 2 * N; i++) {
            if (nums[(i - 1) % N] <= nums[i % N]) {
                count++;
            } else {
                count = 1;
            }
            if (count == N) {
                return true;
            }
        }

        return N == 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    check(nums) {
        const N = nums.length;
        let count = 1;

        for (let i = 1; i < 2 * N; i++) {
            if (nums[(i - 1) % N] <= nums[i % N]) {
                count++;
            } else {
                count = 1;
            }
            if (count === N) {
                return true;
            }
        }

        return N === 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Iteration

::tabs-start

```python
class Solution:
    def check(self, nums: List[int]) -> bool:
        count, N = 0, len(nums)

        for i in range(N):
            if nums[i] > nums[(i + 1) % N]:
                count += 1
                if count > 1:
                    return False

        return True
```

```java
public class Solution {
    public boolean check(int[] nums) {
        int count = 0, N = nums.length;

        for (int i = 0; i < N; i++) {
            if (nums[i] > nums[(i + 1) % N] && ++count > 1) {
                return false;
            }
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool check(vector<int>& nums) {
        int count = 0, N = nums.size();

        for (int i = 0; i < N; i++) {
            if (nums[i] > nums[(i + 1) % N] && ++count > 1) {
                return false;
            }
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    check(nums) {
        let count = 0,
            N = nums.length;

        for (let i = 0; i < N; i++) {
            if (nums[i] > nums[(i + 1) % N] && ++count > 1) {
                return false;
            }
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
