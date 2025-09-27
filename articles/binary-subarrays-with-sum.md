## 1. Brute Force

::tabs-start

```python
class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        n, res = len(nums), 0

        for i in range(n):
            curSum = 0
            for j in range(i, n):
                curSum += nums[j]
                if curSum == goal:
                    res += 1

        return res
```

```java
public class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        int n = nums.length, res = 0;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum == goal) {
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
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        int n = nums.size(), res = 0;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum == goal) {
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
     * @param {number} goal
     * @return {number}
     */
    numSubarraysWithSum(nums, goal) {
        const n = nums.length;
        let res = 0;

        for (let i = 0; i < n; i++) {
            let curSum = 0;
            for (let j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum === goal) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubarraysWithSum(int[] nums, int goal) {
        int n = nums.Length, res = 0;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum == goal) {
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

## 2. Prefix Sum + Hash Map

::tabs-start

```python
class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        prefixSum = 0
        count = { 0 : 1 } # prefixSum -> count
        res = 0

        for num in nums:
            prefixSum += num
            res += count.get(prefixSum - goal, 0)
            count[prefixSum] = count.get(prefixSum, 0) + 1

        return res
```

```java
public class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        int prefixSum = 0, res = 0;
        HashMap<Integer, Integer> count = new HashMap<>();
        count.put(0, 1);

        for (int num : nums) {
            prefixSum += num;
            res += count.getOrDefault(prefixSum - goal, 0);
            count.put(prefixSum, count.getOrDefault(prefixSum, 0) + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        int prefixSum = 0, res = 0;
        unordered_map<int, int> count;
        count[0] = 1;

        for (int& num : nums) {
            prefixSum += num;
            res += count[prefixSum - goal];
            count[prefixSum]++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} goal
     * @return {number}
     */
    numSubarraysWithSum(nums, goal) {
        let prefixSum = 0,
            res = 0;
        const count = new Map();
        count.set(0, 1);

        for (const num of nums) {
            prefixSum += num;
            res += count.get(prefixSum - goal) || 0;
            count.set(prefixSum, (count.get(prefixSum) || 0) + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubarraysWithSum(int[] nums, int goal) {
        int prefixSum = 0, res = 0;
        Dictionary<int, int> count = new Dictionary<int, int>();
        count[0] = 1;

        foreach (int num in nums) {
            prefixSum += num;
            if (count.ContainsKey(prefixSum - goal)) {
                res += count[prefixSum - goal];
            }
            if (!count.ContainsKey(prefixSum)) {
                count[prefixSum] = 0;
            }
            count[prefixSum]++;
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

## 3. Prefix Sum + Array

::tabs-start

```python
class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        n = len(nums)
        count = [0] * (n + 1)
        count[0] = 1
        prefixSum, res = 0, 0

        for num in nums:
            prefixSum += num
            if prefixSum >= goal:
                res += count[prefixSum - goal]
            count[prefixSum] += 1

        return res
```

```java
public class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        int n = nums.length, prefixSum = 0, res = 0;
        int[] count = new int[n + 1];
        count[0] = 1;

        for (int num : nums) {
            prefixSum += num;
            if (prefixSum >= goal) {
                res += count[prefixSum - goal];
            }
            count[prefixSum]++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        int n = nums.size(), prefixSum = 0, res = 0;
        vector<int> count(n + 1, 0);
        count[0] = 1;

        for (int num : nums) {
            prefixSum += num;
            if (prefixSum >= goal) {
                res += count[prefixSum - goal];
            }
            count[prefixSum]++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} goal
     * @return {number}
     */
    numSubarraysWithSum(nums, goal) {
        const n = nums.length;
        const count = Array(n + 1).fill(0);
        count[0] = 1;
        let prefixSum = 0,
            res = 0;

        for (const num of nums) {
            prefixSum += num;
            if (prefixSum >= goal) {
                res += count[prefixSum - goal];
            }
            count[prefixSum]++;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubarraysWithSum(int[] nums, int goal) {
        int n = nums.Length;
        int[] count = new int[n + 1];
        count[0] = 1;
        int prefixSum = 0, res = 0;

        foreach (int num in nums) {
            prefixSum += num;
            if (prefixSum >= goal) {
                res += count[prefixSum - goal];
            }
            count[prefixSum]++;
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

## 4. Sliding Window

::tabs-start

```python
class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        def helper(x):
            if x < 0:
                return 0
            res = l = cur = 0
            for r in range(len(nums)):
                cur += nums[r]
                while cur > x:
                    cur -= nums[l]
                    l += 1
                res += (r - l + 1)
            return res

        return helper(goal) - helper(goal - 1)
```

```java
public class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        return helper(nums, goal) - helper(nums, goal - 1);
    }

    private int helper(int[] nums, int x) {
        if (x < 0) return 0;
        int res = 0, l = 0, cur = 0;
        for (int r = 0; r < nums.length; r++) {
            cur += nums[r];
            while (cur > x) {
                cur -= nums[l];
                l++;
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
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        return helper(nums, goal) - helper(nums, goal - 1);
    }

private:
    int helper(vector<int>& nums, int x) {
        if (x < 0) return 0;
        int res = 0, l = 0, cur = 0;
        for (int r = 0; r < nums.size(); r++) {
            cur += nums[r];
            while (cur > x) {
                cur -= nums[l];
                l++;
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
     * @param {number} goal
     * @return {number}
     */
    numSubarraysWithSum(nums, goal) {
        const helper = (x) => {
            if (x < 0) return 0;
            let res = 0,
                l = 0,
                cur = 0;
            for (let r = 0; r < nums.length; r++) {
                cur += nums[r];
                while (cur > x) {
                    cur -= nums[l];
                    l++;
                }
                res += r - l + 1;
            }
            return res;
        };

        return helper(goal) - helper(goal - 1);
    }
}
```

```csharp
public class Solution {
    public int NumSubarraysWithSum(int[] nums, int goal) {
        int Helper(int x) {
            if (x < 0) return 0;
            int res = 0, l = 0, cur = 0;
            for (int r = 0; r < nums.Length; r++) {
                cur += nums[r];
                while (cur > x) {
                    cur -= nums[l];
                    l++;
                }
                res += (r - l + 1);
            }
            return res;
        }

        return Helper(goal) - Helper(goal - 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
