## 1. Backtracking

::tabs-start

```python
class Solution:
    def subsetXORSum(self, nums: List[int]) -> int:
        res = 0

        def backtrack(i, subset):
            nonlocal res
            xorr = 0
            for num in subset:
                xorr ^= num
            res += xorr

            for j in range(i, len(nums)):
                subset.append(nums[j])
                backtrack(j + 1, subset)
                subset.pop()

        backtrack(0, [])
        return res
```

```java
public class Solution {
    int res = 0;

    public int subsetXORSum(int[] nums) {
        backtrack(0, nums, new ArrayList<>());
        return res;
    }

    private void backtrack(int i, int[] nums, List<Integer> subset) {
        int xorr = 0;
        for (int num : subset) xorr ^= num;
        res += xorr;

        for (int j = i; j < nums.length; j++) {
            subset.add(nums[j]);
            backtrack(j + 1, nums, subset);
            subset.remove(subset.size() - 1);
        }
    }
}
```

```cpp
class Solution {
public:
    int subsetXORSum(vector<int>& nums) {
        int res = 0;
        vector<int> subset;

        function<void(int)> backtrack = [&](int i) {
            int xorr = 0;
            for (int num : subset) xorr ^= num;
            res += xorr;

            for (int j = i; j < nums.size(); ++j) {
                subset.push_back(nums[j]);
                backtrack(j + 1);
                subset.pop_back();
            }
        };

        backtrack(0);
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    subsetXORSum(nums) {
        let res = 0;

        const backtrack = (i, subset) => {
            let xorr = 0;
            for (let num of subset) xorr ^= num;
            res += xorr;

            for (let j = i; j < nums.length; j++) {
                subset.push(nums[j]);
                backtrack(j + 1, subset);
                subset.pop();
            }
        };

        backtrack(0, []);
        return res;
    }
}
```

```csharp
public class Solution {
    private int res = 0;

    public int SubsetXORSum(int[] nums) {
        Backtrack(0, new List<int>(), nums);
        return res;
    }

    private void Backtrack(int i, List<int> subset, int[] nums) {
        int xorr = 0;
        foreach (int num in subset) {
            xorr ^= num;
        }
        res += xorr;

        for (int j = i; j < nums.Length; j++) {
            subset.Add(nums[j]);
            Backtrack(j + 1, subset, nums);
            subset.RemoveAt(subset.Count - 1);
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(n)$

---

## 2. Recursion

::tabs-start

```python
class Solution:
    def subsetXORSum(self, nums: List[int]) -> int:
        def dfs(i, total):
            if i == len(nums):
                return total
            return dfs(i + 1, total ^ nums[i]) + dfs(i + 1, total)

        return dfs(0, 0)
```

```java
public class Solution {
    public int subsetXORSum(int[] nums) {
        return dfs(nums, 0, 0);
    }

    private int dfs(int[] nums, int i, int total) {
        if (i == nums.length) {
            return total;
        }
        return dfs(nums, i + 1, total ^ nums[i]) + dfs(nums, i + 1, total);
    }
}
```

```cpp
class Solution {
public:
    int subsetXORSum(vector<int>& nums) {
        return dfs(nums, 0, 0);
    }

private:
    int dfs(vector<int>& nums, int i, int total) {
        if (i == nums.size()) {
            return total;
        }
        return dfs(nums, i + 1, total ^ nums[i]) + dfs(nums, i + 1, total);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    subsetXORSum(nums) {
        const dfs = (i, total) => {
            if (i === nums.length) {
                return total;
            }
            return dfs(i + 1, total ^ nums[i]) + dfs(i + 1, total);
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int SubsetXORSum(int[] nums) {
        return Dfs(0, 0, nums);
    }

    private int Dfs(int i, int total, int[] nums) {
        if (i == nums.Length) {
            return total;
        }
        return Dfs(i + 1, total ^ nums[i], nums) + Dfs(i + 1, total, nums);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Bit Manipulation

::tabs-start

```python
class Solution:
    def subsetXORSum(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0

        for mask in range(1 << n):
            xorr = 0
            for i in range(n):
                if mask & (1 << i):
                    xorr ^= nums[i]
            res += xorr

        return res
```

```java
public class Solution {
    public int subsetXORSum(int[] nums) {
        int n = nums.length;
        int res = 0;

        for (int mask = 0; mask < (1 << n); mask++) {
            int xorr = 0;
            for (int i = 0; i < n; i++) {
                if ((mask & ( 1 << i)) != 0) {
                    xorr ^= nums[i];
                }
            }
            res += xorr;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subsetXORSum(vector<int>& nums) {
        int n = nums.size();
        int res = 0;

        for (int mask = 0; mask < (1 << n); mask++) {
            int xorr = 0;
            for (int i = 0; i < n; i++) {
                if ((mask & ( 1 << i)) != 0) {
                    xorr ^= nums[i];
                }
            }
            res += xorr;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    subsetXORSum(nums) {
        const n = nums.length;
        let res = 0;

        for (let mask = 0; mask < 1 << n; mask++) {
            let xorr = 0;
            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) !== 0) {
                    xorr ^= nums[i];
                }
            }
            res += xorr;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubsetXORSum(int[] nums) {
        int n = nums.Length;
        int res = 0;

        for (int mask = 0; mask < (1 << n); mask++) {
            int xorr = 0;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    xorr ^= nums[i];
                }
            }
            res += xorr;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Bit Manipulation (Optimal)

::tabs-start

```python
class Solution:
    def subsetXORSum(self, nums: List[int]) -> int:
        res = 0
        for num in nums:
            res |= num
        return res << (len(nums) - 1)
```

```java
public class Solution {
    public int subsetXORSum(int[] nums) {
        int res = 0;
        for (int num : nums) {
            res |= num;
        }
        return res << (nums.length - 1);
    }
}
```

```cpp
class Solution {
public:
    int subsetXORSum(vector<int>& nums) {
        int res = 0;
        for (int& num : nums) {
            res |= num;
        }
        return res << (nums.size() - 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    subsetXORSum(nums) {
        let res = 0;
        for (let num of nums) {
            res |= num;
        }
        return res << (nums.length - 1);
    }
}
```

```csharp
public class Solution {
    public int SubsetXORSum(int[] nums) {
        int res = 0;
        foreach (int num in nums) {
            res |= num;
        }
        return res << (nums.Length - 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
