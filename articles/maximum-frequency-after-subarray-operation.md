## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        n = len(nums)
        cntK = nums.count(k)
        res = cntK

        for num in range(1, 51):
            if num == k: continue
            for i in range(n):
                tmp, cnt = cntK, 0
                for j in range(i, n):
                    if nums[j] == num:
                        cnt += 1
                    elif nums[j] == k:
                        cntK -= 1
                    res = max(res, cnt + cntK)

                cntK = tmp

        return res
```

```java
public class Solution {
    public int maxFrequency(int[] nums, int k) {
        int n = nums.length;
        int cntK = 0;
        for (int x : nums) if (x == k) cntK++;
        int res = cntK;

        for (int num = 1; num <= 50; num++) {
            if (num == k) continue;
            for (int i = 0; i < n; i++) {
                int tmp = cntK;
                int cnt = 0;
                for (int j = i; j < n; j++) {
                    if (nums[j] == num) {
                        cnt++;
                    } else if (nums[j] == k) {
                        cntK--;
                    }
                    res = Math.max(res, cnt + cntK);
                }
                cntK = tmp;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        int n = nums.size();
        int cntK = 0;
        for (int x : nums) if (x == k) cntK++;
        int res = cntK;

        for (int num = 1; num <= 50; num++) {
            if (num == k) continue;
            for (int i = 0; i < n; i++) {
                int tmp = cntK, cnt = 0;
                for (int j = i; j < n; j++) {
                    if (nums[j] == num) {
                        cnt++;
                    } else if (nums[j] == k) {
                        cntK--;
                    }
                    res = max(res, cnt + cntK);
                }
                cntK = tmp;
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
    maxFrequency(nums, k) {
        const n = nums.length;
        let cntK = nums.filter(x => x === k).length;
        let res = cntK;

        for (let num = 1; num <= 50; num++) {
            if (num === k) continue;
            for (let i = 0; i < n; i++) {
                const tmp = cntK;
                let cnt = 0;
                for (let j = i; j < n; j++) {
                    if (nums[j] === num) {
                        cnt++;
                    } else if (nums[j] === k) {
                        cntK--;
                    }
                    res = Math.max(res, cnt + cntK);
                }
                cntK = tmp;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxFrequency(int[] nums, int k) {
        int n = nums.Length;
        int cntK = 0;
        foreach (var x in nums) if (x == k) cntK++;
        int res = cntK;

        for (int num = 1; num <= 50; num++) {
            if (num == k) continue;
            for (int i = 0; i < n; i++) {
                int tmp = cntK;
                int cnt = 0;
                for (int j = i; j < n; j++) {
                    if (nums[j] == num) {
                        cnt++;
                    } else if (nums[j] == k) {
                        cntK--;
                    }
                    res = Math.Max(res, cnt + cntK);
                }
                cntK = tmp;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(50 * n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Kadane's Algorithm - I

::tabs-start

```python
class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        cntK = nums.count(k)
        res = 0

        for i in range(1, 51):
            if i == k:
                continue
            cnt = 0
            for num in nums:
                if num == i:
                    cnt += 1
                if num == k:
                    cnt -= 1
                cnt = max(cnt, 0)
                res = max(res, cntK + cnt)
        return res
```

```java
public class Solution {
    public int maxFrequency(int[] nums, int k) {
        int cntK = 0;
        for (int num : nums) {
            if (num == k) cntK++;
        }
        int res = 0;

        for (int i = 1; i <= 50; i++) {
            if (i == k) continue;
            int cnt = 0;
            for (int num : nums) {
                if (num == i) cnt++;
                if (num == k) cnt--;
                cnt = Math.max(cnt, 0);
                res = Math.max(res, cntK + cnt);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        int cntK = 0;
        for (int num : nums) {
            if (num == k) cntK++;
        }
        int res = 0;

        for (int i = 1; i <= 50; i++) {
            if (i == k) continue;
            int cnt = 0;
            for (int num : nums) {
                if (num == i) cnt++;
                if (num == k) cnt--;
                cnt = max(cnt, 0);
                res = max(res, cntK + cnt);
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
    maxFrequency(nums, k) {
        let cntK = 0;
        for (const num of nums) {
            if (num === k) cntK++;
        }
        let res = 0;

        for (let i = 1; i <= 50; i++) {
            if (i === k) continue;
            let cnt = 0;
            for (const num of nums) {
                if (num === i) cnt++;
                if (num === k) cnt--;
                cnt = Math.max(cnt, 0);
                res = Math.max(res, cntK + cnt);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxFrequency(int[] nums, int k) {
        int cntK = 0;
        foreach (var num in nums) {
            if (num == k) cntK++;
        }
        int res = 0;

        for (int i = 1; i <= 50; i++) {
            if (i == k) continue;
            int cnt = 0;
            foreach (var num in nums) {
                if (num == i) cnt++;
                if (num == k) cnt--;
                cnt = Math.Max(cnt, 0);
                res = Math.Max(res, cntK + cnt);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(50 * n)$
* Space complexity: $O(1)$

---

## 3. Kadane's Algorithm - II

::tabs-start

```python
class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        cnt = defaultdict(int)
        res = 0
        for num in nums:
            cnt[num] = max(cnt[num], cnt[k]) + 1
            res = max(res, cnt[num] - cnt[k])
        return cnt[k] + res
```

```java
public class Solution {
    public int maxFrequency(int[] nums, int k) {
        Map<Integer, Integer> cnt = new HashMap<>();
        int res = 0;
        for (int num : nums) {
            int prev = Math.max(cnt.getOrDefault(num, 0), cnt.getOrDefault(k, 0));
            cnt.put(num, prev + 1);
            res = Math.max(res, cnt.get(num) - cnt.getOrDefault(k, 0));
        }
        return cnt.getOrDefault(k, 0) + res;
    }
}
```

```cpp
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        unordered_map<int,int> cnt;
        int res = 0;
        for (int num : nums) {
            int prev = max(cnt[num], cnt[k]);
            cnt[num] = prev + 1;
            res = max(res, cnt[num] - cnt[k]);
        }
        return cnt[k] + res;
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
    maxFrequency(nums, k) {
        const cnt = new Map();
        let res = 0;
        for (const num of nums) {
            const prev = Math.max(cnt.get(num) || 0, cnt.get(k) || 0);
            cnt.set(num, prev + 1);
            res = Math.max(res, cnt.get(num) - (cnt.get(k) || 0));
        }
        return (cnt.get(k) || 0) + res;
    }
}
```

```csharp
public class Solution {
    public int MaxFrequency(int[] nums, int k) {
        var cnt = new Dictionary<int,int>();
        int res = 0;
        foreach (var num in nums) {
            int prev = Math.Max(
                cnt.TryGetValue(num, out var cn) ? cn : 0,
                cnt.TryGetValue(k, out var ck) ? ck : 0
            );
            cnt[num] = prev + 1;
            res = Math.Max(res, cnt[num] - (cnt.TryGetValue(k, out ck) ? ck : 0));
        }
        return (cnt.TryGetValue(k, out var ckk) ? ckk : 0) + res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(50)$