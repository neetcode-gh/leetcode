## 1. Brute Force

::tabs-start

```python
class Solution:
    def checkSubarraySum(self, nums: List[int], k: int) -> bool:
        for i in range(len(nums) - 1):
            sum = nums[i]
            for j in range(i + 1, len(nums)):
                sum += nums[j]
                if sum % k == 0:
                    return True
        return False
```

```java
public class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        for (int i = 0; i < nums.length - 1; i++) {
            int sum = nums[i];
            for (int j = i + 1; j < nums.length; j++) {
                sum += nums[j];
                if (sum % k == 0) return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        for (int i = 0; i < nums.size() - 1; i++) {
            int sum = nums[i];
            for (int j = i + 1; j < nums.size(); j++) {
                sum += nums[j];
                if (sum % k == 0) return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    checkSubarraySum(nums, k) {
        for (let i = 0; i < nums.length - 1; i++) {
            let sum = nums[i];
            for (let j = i + 1; j < nums.length; j++) {
                sum += nums[j];
                if (sum % k == 0) return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool CheckSubarraySum(int[] nums, int k) {
        for (int i = 0; i < nums.Length - 1; i++) {
            int sum = nums[i];
            for (int j = i + 1; j < nums.Length; j++) {
                sum += nums[j];
                if (sum % k == 0) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Prefix SUm + Hash Map

::tabs-start

```python
class Solution:
    def checkSubarraySum(self, nums: List[int], k: int) -> bool:
        remainder = {0: -1}  # remainder -> end index
        total = 0

        for i, num in enumerate(nums):
            total += num
            r = total % k
            if r not in remainder:
                remainder[r] = i
            elif i - remainder[r] > 1:
                return True

        return False
```

```java
public class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        HashMap<Integer, Integer> remainder = new HashMap<>();
        remainder.put(0, -1);
        int total = 0;

        for (int i = 0; i < nums.length; i++) {
            total += nums[i];
            int r = total % k;
            if (!remainder.containsKey(r)) {
                remainder.put(r, i);
            } else if (i - remainder.get(r) > 1) {
                return true;
            }
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> remainder;
        remainder[0] = -1;
        int total = 0;

        for (int i = 0; i < nums.size(); i++) {
            total += nums[i];
            int r = total % k;
            if (remainder.find(r) == remainder.end()) {
                remainder[r] = i;
            } else if (i - remainder[r] > 1) {
                return true;
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    checkSubarraySum(nums, k) {
        const remainder = new Map();
        remainder.set(0, -1);
        let total = 0;

        for (let i = 0; i < nums.length; i++) {
            total += nums[i];
            let r = total % k;
            if (!remainder.has(r)) {
                remainder.set(r, i);
            } else if (i - remainder.get(r) > 1) {
                return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool CheckSubarraySum(int[] nums, int k) {
        Dictionary<int, int> remainder = new Dictionary<int, int>();
        remainder[0] = -1;
        int total = 0;

        for (int i = 0; i < nums.Length; i++) {
            total += nums[i];
            int r = total % k;
            if (!remainder.ContainsKey(r)) {
                remainder[r] = i;
            } else if (i - remainder[r] > 1) {
                return true;
            }
        }

        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(k)$

> Where $n$ is the size of the array $nums$ and $k$ is the number that a subarray sum needs to be multiple of.
