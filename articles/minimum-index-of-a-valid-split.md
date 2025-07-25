## 1. Brute Force

::tabs-start

```python
class Solution:
    def minimumIndex(self, nums: List[int]) -> int:
        n = len(nums)

        for i in range(n - 1):
            left_cnt = defaultdict(int)
            for l in range(i + 1):
                left_cnt[nums[l]] += 1

            right_cnt = defaultdict(int)
            for r in range(i + 1, n):
                right_cnt[nums[r]] += 1

            for num in left_cnt:
                if left_cnt[num] > (i + 1) // 2 and right_cnt[num] > (n - i - 1) // 2:
                    return i

        return -1
```

```java
public class Solution {
    public int minimumIndex(List<Integer> nums) {
        int n = nums.size();

        for (int i = 0; i < n - 1; i++) {
            Map<Integer, Integer> leftCnt = new HashMap<>();
            for (int l = 0; l <= i; l++) {
                int val = nums.get(l);
                leftCnt.put(val, leftCnt.getOrDefault(val, 0) + 1);
            }

            Map<Integer, Integer> rightCnt = new HashMap<>();
            for (int r = i + 1; r < n; r++) {
                int val = nums.get(r);
                rightCnt.put(val, rightCnt.getOrDefault(val, 0) + 1);
            }

            for (int num : leftCnt.keySet()) {
                if (leftCnt.get(num) > (i + 1) / 2 && rightCnt.getOrDefault(num, 0) > (n - i - 1) / 2) {
                    return i;
                }
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int minimumIndex(vector<int>& nums) {
        int n = nums.size();

        for (int i = 0; i < n - 1; i++) {
            unordered_map<int, int> leftCnt, rightCnt;
            for (int l = 0; l <= i; l++) {
                leftCnt[nums[l]]++;
            }
            for (int r = i + 1; r < n; r++) {
                rightCnt[nums[r]]++;
            }

            for (auto& [num, cnt] : leftCnt) {
                if (cnt > (i + 1) / 2 && rightCnt[num] > (n - i - 1) / 2) {
                    return i;
                }
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minimumIndex(nums) {
        const n = nums.length;

        for (let i = 0; i < n - 1; i++) {
            const leftCnt = {};
            for (let l = 0; l <= i; l++) {
                leftCnt[nums[l]] = (leftCnt[nums[l]] || 0) + 1;
            }

            const rightCnt = {};
            for (let r = i + 1; r < n; r++) {
                rightCnt[nums[r]] = (rightCnt[nums[r]] || 0) + 1;
            }

            for (const num in leftCnt) {
                if (
                    leftCnt[num] > Math.floor((i + 1) / 2) &&
                    (rightCnt[num] || 0) > Math.floor((n - i - 1) / 2)
                ) {
                    return i;
                }
            }
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def minimumIndex(self, nums: List[int]) -> int:
        left = defaultdict(int)
        right = Counter(nums)

        for i in range(len(nums)):
            left[nums[i]] += 1
            right[nums[i]] -= 1

            left_len = i + 1
            right_len = len(nums) - i - 1

            if 2 * left[nums[i]] > left_len and 2 * right[nums[i]] > right_len:
                return i

        return -1
```

```java
public class Solution {
    public int minimumIndex(List<Integer> nums) {
        Map<Integer, Integer> left = new HashMap<>();
        Map<Integer, Integer> right = new HashMap<>();
        int n = nums.size();

        for (int num : nums) {
            right.put(num, right.getOrDefault(num, 0) + 1);
        }

        for (int i = 0; i < n; i++) {
            int num = nums.get(i);
            left.put(num, left.getOrDefault(num, 0) + 1);
            right.put(num, right.get(num) - 1);

            int leftLen = i + 1;
            int rightLen = n - i - 1;

            if (2 * left.get(num) > leftLen && 2 * right.get(num) > rightLen) {
                return i;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int minimumIndex(vector<int>& nums) {
        unordered_map<int, int> left, right;
        int n = nums.size();

        for (int num : nums) {
            right[num]++;
        }

        for (int i = 0; i < n; i++) {
            int num = nums[i];
            left[num]++;
            right[num]--;

            int leftLen = i + 1;
            int rightLen = n - i - 1;

            if (2 * left[num] > leftLen && 2 * right[num] > rightLen) {
                return i;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minimumIndex(nums) {
        const left = {};
        const right = {};
        const n = nums.length;

        for (const num of nums) {
            right[num] = (right[num] || 0) + 1;
        }

        for (let i = 0; i < n; i++) {
            const num = nums[i];
            left[num] = (left[num] || 0) + 1;
            right[num] -= 1;

            const leftLen = i + 1;
            const rightLen = n - i - 1;

            if (2 * left[num] > leftLen && 2 * right[num] > rightLen) {
                return i;
            }
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Boyer-Moore Voting Algorithm

::tabs-start

```python
class Solution:
    def minimumIndex(self, nums: List[int]) -> int:
        majority = count = 0
        for num in nums:
            if count == 0:
                majority = num
            count += (1 if majority == num else -1)

        left_cnt, right_cnt = 0, nums.count(majority)

        for i in range(len(nums)):
            if nums[i] == majority:
                left_cnt += 1
                right_cnt -= 1

            left_len = i + 1
            right_len = len(nums) - i - 1

            if 2 * left_cnt > left_len and 2 * right_cnt > right_len:
                return i

        return -1
```

```java
public class Solution {
    public int minimumIndex(List<Integer> nums) {
        int majority = 0, count = 0;
        for (int num : nums) {
            if (count == 0) majority = num;
            count += (majority == num) ? 1 : -1;
        }

        int leftCnt = 0, rightCnt = 0;
        for (int num : nums) {
            if (num == majority) rightCnt++;
        }

        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if (nums.get(i) == majority) {
                leftCnt++;
                rightCnt--;
            }

            int leftLen = i + 1;
            int rightLen = n - i - 1;

            if (2 * leftCnt > leftLen && 2 * rightCnt > rightLen) {
                return i;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int minimumIndex(vector<int>& nums) {
        int majority = 0, count = 0;
        for (int num : nums) {
            if (count == 0) majority = num;
            count += (num == majority ? 1 : -1);
        }

        int leftCnt = 0, rightCnt = count_if(nums.begin(), nums.end(),
                                             [&](int x) { return x == majority; });

        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if (nums[i] == majority) {
                leftCnt++;
                rightCnt--;
            }

            int leftLen = i + 1;
            int rightLen = n - i - 1;

            if (2 * leftCnt > leftLen && 2 * rightCnt > rightLen) {
                return i;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minimumIndex(nums) {
        let majority = 0,
            count = 0;
        for (let num of nums) {
            if (count === 0) majority = num;
            count += num === majority ? 1 : -1;
        }

        let leftCnt = 0;
        let rightCnt = nums.filter((x) => x === majority).length;
        const n = nums.length;

        for (let i = 0; i < n; i++) {
            if (nums[i] === majority) {
                leftCnt++;
                rightCnt--;
            }

            let leftLen = i + 1;
            let rightLen = n - i - 1;

            if (2 * leftCnt > leftLen && 2 * rightCnt > rightLen) {
                return i;
            }
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
