## 1. Backtracking

::tabs-start

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        if sum(nums) % k != 0:
            return False

        nums.sort(reverse=True)
        target = sum(nums) // k
        used = [False] * len(nums)

        def backtrack(i, k, subsetSum):
            if k == 0:
                return True
            if subsetSum == target:
                return backtrack(0, k - 1, 0)
            for j in range(i, len(nums)):
                if used[j] or subsetSum + nums[j] > target:
                    continue
                used[j] = True
                if backtrack(j + 1, k, subsetSum + nums[j]):
                    return True
                used[j] = False
            return False

        return backtrack(0, k, 0)
```

```java
public class Solution {
    private boolean[] used;
    private int target;
    private int n;

    public boolean canPartitionKSubsets(int[] nums, int k) {
        int sum = 0;
        for (int num : nums) sum += num;
        if (sum % k != 0) return false;

        this.target = sum / k;
        this.n = nums.length;
        Arrays.sort(nums);
        for (int i = 0; i < n / 2; i++) {
            int tmp = nums[i];
            nums[i] = nums[n - i - 1];
            nums[n - i - 1] = tmp;
        }
        used = new boolean[n];
        return backtrack(nums, k, 0, 0);
    }

    private boolean backtrack(int[] nums, int k, int currentSum, int start) {
        if (k == 0) return true;
        if (currentSum == target) return backtrack(nums, k - 1, 0, 0);

        for (int i = start; i < n; i++) {
            if (used[i] || currentSum + nums[i] > target) continue;
            used[i] = true;
            if (backtrack(nums, k, currentSum + nums[i], i + 1)) return true;
            used[i] = false;
        }
        return false;
    }
}
```

```cpp
class Solution {
    vector<bool> used;
    int target;

public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % k != 0) return false;

        target = sum / k;
        sort(nums.rbegin(), nums.rend());
        used.assign(nums.size(), false);
        return backtrack(nums, k, 0, 0);
    }

private:
    bool backtrack(vector<int>& nums, int k, int currentSum, int start) {
        if (k == 0) return true;
        if (currentSum == target) return backtrack(nums, k - 1, 0, 0);

        for (int i = start; i < nums.size(); i++) {
            if (used[i] || currentSum + nums[i] > target) continue;
            used[i] = true;
            if (backtrack(nums, k, currentSum + nums[i], i + 1)) return true;
            used[i] = false;
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
    canPartitionKSubsets(nums, k) {
        const sum = nums.reduce((a, b) => a + b, 0);
        if (sum % k !== 0) return false;

        const target = sum / k;
        nums.sort((a, b) => b - a);
        const used = Array(nums.length).fill(false);

        const backtrack = (i, k, subsetSum) => {
            if (k === 0) return true;
            if (subsetSum === target) return backtrack(0, k - 1, 0);

            for (let j = i; j < nums.length; j++) {
                if (used[j] || subsetSum + nums[j] > target) continue;
                used[j] = true;
                if (backtrack(j + 1, k, subsetSum + nums[j])) return true;
                used[j] = false;
            }
            return false;
        };

        return backtrack(0, k, 0);
    }
}
```

```csharp
public class Solution {
    public bool CanPartitionKSubsets(int[] nums, int k) {
        int totalSum = nums.Sum();
        if (totalSum % k != 0) return false;

        int target = totalSum / k;
        Array.Sort(nums);
        Array.Reverse(nums);

        bool[] used = new bool[nums.Length];

        bool Backtrack(int i, int kRemaining, int subsetSum) {
            if (kRemaining == 0) return true;
            if (subsetSum == target) return Backtrack(0, kRemaining - 1, 0);

            for (int j = i; j < nums.Length; j++) {
                if (used[j] || subsetSum + nums[j] > target) continue;

                used[j] = true;
                if (Backtrack(j + 1, kRemaining, subsetSum + nums[j])) return true;
                used[j] = false;
            }

            return false;
        }

        return Backtrack(0, k, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * 2 ^ n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $k$ is the number of subsets.

---

## 2. Backtracking (Pruning)

::tabs-start

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k != 0:
            return False

        nums.sort(reverse=True)
        target = total // k
        used = [False] * len(nums)

        def backtrack(i, k, subsetSum):
            if k == 0:
                return True
            if subsetSum == target:
                return backtrack(0, k - 1, 0)
            for j in range(i, len(nums)):
                if used[j] or subsetSum + nums[j] > target:
                    continue
                used[j] = True
                if backtrack(j + 1, k, subsetSum + nums[j]):
                    return True
                used[j] = False

                if subsetSum == 0: # Pruning
                    return False

            return False

        return backtrack(0, k, 0)
```

```java
public class Solution {
    private boolean[] used;
    private int target;
    private int n;

    public boolean canPartitionKSubsets(int[] nums, int k) {
        int sum = 0;
        for (int num : nums) sum += num;
        if (sum % k != 0) return false;

        this.target = sum / k;
        this.n = nums.length;
        Arrays.sort(nums);
        for (int i = 0; i < n / 2; i++) {
            int tmp = nums[i];
            nums[i] = nums[n - i - 1];
            nums[n - i - 1] = tmp;
        }
        used = new boolean[n];
        return backtrack(nums, k, 0, 0);
    }

    private boolean backtrack(int[] nums, int k, int currentSum, int start) {
        if (k == 0) return true;
        if (currentSum == target) return backtrack(nums, k - 1, 0, 0);

        for (int i = start; i < n; i++) {
            if (used[i] || currentSum + nums[i] > target) continue;
            used[i] = true;
            if (backtrack(nums, k, currentSum + nums[i], i + 1)) return true;
            used[i] = false;
            if (currentSum == 0) {  // Pruning
                return false;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
    vector<bool> used;
    int target;

public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % k != 0) return false;

        target = sum / k;
        sort(nums.rbegin(), nums.rend());
        used.assign(nums.size(), false);
        return backtrack(nums, k, 0, 0);
    }

private:
    bool backtrack(vector<int>& nums, int k, int currentSum, int start) {
        if (k == 0) return true;
        if (currentSum == target) return backtrack(nums, k - 1, 0, 0);

        for (int i = start; i < nums.size(); i++) {
            if (used[i] || currentSum + nums[i] > target) continue;
            used[i] = true;
            if (backtrack(nums, k, currentSum + nums[i], i + 1)) return true;
            used[i] = false;
            if (currentSum == 0) {  // Pruning
                return false;
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
    canPartitionKSubsets(nums, k) {
        const sum = nums.reduce((a, b) => a + b, 0);
        if (sum % k !== 0) return false;

        const target = sum / k;
        nums.sort((a, b) => b - a);
        const used = Array(nums.length).fill(false);

        const backtrack = (i, k, subsetSum) => {
            if (k === 0) return true;
            if (subsetSum === target) return backtrack(0, k - 1, 0);

            for (let j = i; j < nums.length; j++) {
                if (used[j] || subsetSum + nums[j] > target) continue;
                used[j] = true;
                if (backtrack(j + 1, k, subsetSum + nums[j])) return true;
                used[j] = false;
                if (subsetSum === 0) {
                    // Pruning
                    return false;
                }
            }
            return false;
        };

        return backtrack(0, k, 0);
    }
}
```

```csharp
public class Solution {
    public bool CanPartitionKSubsets(int[] nums, int k) {
        int total = nums.Sum();
        if (total % k != 0) return false;

        Array.Sort(nums);
        Array.Reverse(nums);
        int target = total / k;
        bool[] used = new bool[nums.Length];

        bool Backtrack(int i, int kRemaining, int subsetSum) {
            if (kRemaining == 0) return true;
            if (subsetSum == target) return Backtrack(0, kRemaining - 1, 0);

            for (int j = i; j < nums.Length; j++) {
                if (used[j] || subsetSum + nums[j] > target) continue;

                used[j] = true;
                if (Backtrack(j + 1, kRemaining, subsetSum + nums[j])) return true;
                used[j] = false;

                if (subsetSum == 0) return false; // Pruning
            }

            return false;
        }

        return Backtrack(0, k, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * 2 ^ n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $k$ is the number of subsets.

---

## 3. Backtracking (Bit Mask + Pruning)

::tabs-start

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k != 0:
            return False

        nums.sort(reverse=True)
        target = total // k
        n = len(nums)

        def backtrack(i, k, subsetSum, mask):
            if k == 0:
                return True
            if subsetSum == target:
                return backtrack(0, k - 1, 0, mask)
            for j in range(i, n):
                if (mask & (1 << j)) == 0 or subsetSum + nums[j] > target:
                    continue
                if backtrack(j + 1, k, subsetSum + nums[j], mask ^ (1 << j)):
                    return True
                if subsetSum == 0:
                    return False
            return False

        return backtrack(0, k, 0, (1 << n) - 1)
```

```java
public class Solution {
    private int target;
    private int n;

    public boolean canPartitionKSubsets(int[] nums, int k) {
        int total = 0;
        for (int num : nums) total += num;
        if (total % k != 0) return false;

        this.target = total / k;
        this.n = nums.length;
        Arrays.sort(nums);
        reverse(nums);

        return backtrack(nums, 0, k, 0, (1 << this.n) - 1);
    }

    private boolean backtrack(int[] nums, int i, int k, int subsetSum, int mask) {
        if (k == 0) return true;
        if (subsetSum == target) return backtrack(nums, 0, k - 1, 0, mask);
        for (int j = i; j < n; j++) {
            if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;
            if (backtrack(nums, j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                return true;
            }
            if (subsetSum == 0) return false;
        }
        return false;
    }

    private void reverse(int[] nums) {
        int l = 0, r = n - 1;
        while (l < r) {
            int temp = nums[l];
            nums[l++] = nums[r];
            nums[r--] = temp;
        }
    }
}
```

```cpp
class Solution {
    int target, n;

public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (total % k != 0) return false;

        target = total / k;
        n = nums.size();
        sort(nums.rbegin(), nums.rend());
        return backtrack(nums, 0, k, 0, (1 << n) - 1);
    }

private:
    bool backtrack(vector<int>& nums, int i, int k, int subsetSum, int mask) {
        if (k == 0) return true;
        if (subsetSum == target) return backtrack(nums, 0, k - 1, 0, mask);
        for (int j = i; j < nums.size(); j++) {
            if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;
            if (backtrack(nums, j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                return true;
            }
            if (subsetSum == 0) return false;
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
    canPartitionKSubsets(nums, k) {
        const total = nums.reduce((a, b) => a + b, 0);
        if (total % k !== 0) return false;

        const target = total / k;
        const n = nums.length;
        nums.sort((a, b) => b - a);

        const backtrack = (i, k, subsetSum, mask) => {
            if (k === 0) return true;
            if (subsetSum === target) return backtrack(0, k - 1, 0, mask);
            for (let j = i; j < n; j++) {
                if ((mask & (1 << j)) === 0 || subsetSum + nums[j] > target) {
                    continue;
                }
                if (backtrack(j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                    return true;
                }
                if (subsetSum === 0) return false;
            }
            return false;
        };

        return backtrack(0, k, 0, (1 << n) - 1);
    }
}
```

```csharp
public class Solution {
    public bool CanPartitionKSubsets(int[] nums, int k) {
        int total = nums.Sum();
        if (total % k != 0) return false;

        Array.Sort(nums);
        Array.Reverse(nums);
        int target = total / k;
        int n = nums.Length;

        bool Backtrack(int i, int kRemaining, int subsetSum, int mask) {
            if (kRemaining == 0) return true;
            if (subsetSum == target) return Backtrack(0, kRemaining - 1, 0, mask);

            for (int j = i; j < n; j++) {
                if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;

                if (Backtrack(j + 1, kRemaining, subsetSum + nums[j], mask ^ (1 << j)))
                    return true;

                if (subsetSum == 0) return false;
            }

            return false;
        }

        return Backtrack(0, k, 0, (1 << n) - 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * 2 ^ n)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(n)$ for the recursion stack.

> Where $n$ is the size of the array $nums$ and $k$ is the number of subsets.

---

## 4. Dynamic Programming (Top-Down) + Bit Mask

::tabs-start

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k != 0:
            return False

        nums.sort(reverse=True)
        target = total // k
        n = len(nums)
        dp = [None] * (1 << n)

        def backtrack(i, k, subsetSum, mask):
            if dp[mask] != None:
                return dp[mask]
            if k == 0:
                dp[mask] = True
                return True
            if subsetSum == target:
                dp[mask] = backtrack(0, k - 1, 0, mask)
                return dp[mask]

            for j in range(i, n):
                if (mask & (1 << j)) == 0 or subsetSum + nums[j] > target:
                    continue
                if backtrack(j + 1, k, subsetSum + nums[j], mask ^ (1 << j)):
                    dp[mask] = True
                    return True
                if subsetSum == 0:
                    dp[mask] = False
                    return dp[mask]
            dp[mask] = False
            return False

        return backtrack(0, k, 0, (1 << n) - 1)
```

```java
public class Solution {
    private int target;
    private int n;
    private Boolean[] dp;

    public boolean canPartitionKSubsets(int[] nums, int k) {
        int total = 0;
        for (int num : nums) total += num;
        if (total % k != 0) return false;

        this.target = total / k;
        this.n = nums.length;
        Arrays.sort(nums);
        reverse(nums);
        dp = new Boolean[1 << this.n];

        return backtrack(nums, 0, k, 0, (1 << this.n) - 1);
    }

    private boolean backtrack(int[] nums, int i, int k, int subsetSum, int mask) {
        if (dp[mask] != null) return dp[mask];
        if (k == 0) {
            dp[mask] = true;
            return dp[mask];
        }
        if (subsetSum == target) {
            dp[mask] = backtrack(nums, 0, k - 1, 0, mask);
            return dp[mask];
        }
        for (int j = i; j < n; j++) {
            if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;
            if (backtrack(nums, j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                dp[mask] = true;
                return true;
            }
            if (subsetSum == 0) {
                dp[mask] = false;
                return false;
            }
        }
        dp[mask] = false;
        return false;
    }

    private void reverse(int[] nums) {
        int l = 0, r = n - 1;
        while (l < r) {
            int temp = nums[l];
            nums[l++] = nums[r];
            nums[r--] = temp;
        }
    }
}
```

```cpp
class Solution {
    int target, n;
    vector<int> dp;

public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (total % k != 0) return false;

        target = total / k;
        n = nums.size();
        dp.assign(1 << n, -1);
        sort(nums.rbegin(), nums.rend());
        return backtrack(nums, 0, k, 0, (1 << n) - 1);
    }

private:
    int backtrack(vector<int>& nums, int i, int k, int subsetSum, int mask) {
        if (dp[mask] != -1) return dp[mask];
        if (k == 0) {
            dp[mask] = 1;
            return 1;
        }
        if (subsetSum == target) {
            dp[mask] = backtrack(nums, 0, k - 1, 0, mask);
            return dp[mask];
        }
        for (int j = i; j < nums.size(); j++) {
            if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;
            if (backtrack(nums, j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                dp[mask] = 1;
                return 1;
            }
            if (subsetSum == 0) {
                break;
            }
        }
        dp[mask] = 0;
        return 0;
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
    canPartitionKSubsets(nums, k) {
        const total = nums.reduce((a, b) => a + b, 0);
        if (total % k !== 0) return false;

        const target = total / k;
        const n = nums.length;
        const dp = new Array(1 << n);
        nums.sort((a, b) => b - a);

        const backtrack = (i, k, subsetSum, mask) => {
            if (dp[mask] !== undefined) return dp[mask];
            if (k === 0) {
                dp[mask] = true;
                return true;
            }
            if (subsetSum === target) {
                dp[mask] = backtrack(0, k - 1, 0, mask);
                return dp[mask];
            }
            for (let j = i; j < n; j++) {
                if ((mask & (1 << j)) === 0 || subsetSum + nums[j] > target) {
                    continue;
                }
                if (backtrack(j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                    dp[mask] = true;
                    return true;
                }
                if (subsetSum === 0) break;
            }
            dp[mask] = false;
            return false;
        };

        return backtrack(0, k, 0, (1 << n) - 1);
    }
}
```

```csharp
public class Solution {
    public bool CanPartitionKSubsets(int[] nums, int k) {
        int total = nums.Sum();
        if (total % k != 0) return false;

        Array.Sort(nums);
        Array.Reverse(nums);

        int target = total / k;
        int n = nums.Length;
        bool?[] dp = new bool?[1 << n];

        bool Backtrack(int i, int kRemaining, int subsetSum, int mask) {
            if (dp[mask].HasValue) return (bool)dp[mask];
            if (kRemaining == 0) {
                dp[mask] = true;
                return true;
            }
            if (subsetSum == target) {
                dp[mask] = Backtrack(0, kRemaining - 1, 0, mask);
                return (bool)dp[mask];
            }

            for (int j = i; j < n; j++) {
                if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;

                if (Backtrack(j + 1, kRemaining, subsetSum + nums[j], mask ^ (1 << j))) {
                    dp[mask] = true;
                    return true;
                }

                if (subsetSum == 0) {
                    dp[mask] = false;
                    return false;
                }
            }

            dp[mask] = false;
            return false;
        }

        return Backtrack(0, k, 0, (1 << n) - 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(2 ^ n)$

---

## 5. Dynamic Programming (Bottom-Up) + Bit Mask

::tabs-start

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k != 0:
            return False

        target = total // k
        n = len(nums)
        N = 1 << n
        dp = [0] + [-1] * (N - 1)

        for mask in range(N):
            if dp[mask] == -1:
                continue
            for i in range(n):
                if (mask & (1 << i)) == 0 and dp[mask] + nums[i] <= target:
                    dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target

        return dp[N - 1] == 0
```

```java
public class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        int total = 0;
        for (int num : nums) total += num;
        if (total % k != 0) return false;

        int target = total / k;
        int n = nums.length;
        int N = 1 << n;
        int[] dp = new int[N];
        Arrays.fill(dp, -1);
        dp[0] = 0;

        for (int mask = 0; mask < N; mask++) {
            if (dp[mask] == -1) continue;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) == 0 && dp[mask] + nums[i] <= target) {
                    dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target;
                }
            }
        }

        return dp[N - 1] == 0;
    }
}
```

```cpp
class Solution {
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (total % k != 0) return false;

        int target = total / k;
        int n = nums.size();
        int N = 1 << n;
        vector<int> dp(N, -1);
        dp[0] = 0;

        for (int mask = 0; mask < N; mask++) {
            if (dp[mask] == -1) continue;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) == 0 && dp[mask] + nums[i] <= target) {
                    dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target;
                }
            }
        }

        return dp[N - 1] == 0;
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
    canPartitionKSubsets(nums, k) {
        const total = nums.reduce((a, b) => a + b, 0);
        if (total % k !== 0) return false;

        const target = total / k;
        nums.sort((a, b) => b - a);

        const n = nums.length;
        const N = 1 << n;
        const dp = new Array(N).fill(-1);
        dp[0] = 0;

        for (let mask = 0; mask < N; mask++) {
            if (dp[mask] === -1) continue;
            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) === 0 && dp[mask] + nums[i] <= target) {
                    dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target;
                }
            }
        }

        return dp[N - 1] === 0;
    }
}
```

```csharp
public class Solution {
    public bool CanPartitionKSubsets(int[] nums, int k) {
        int total = nums.Sum();
        if (total % k != 0) return false;

        int target = total / k;
        int n = nums.Length;
        int N = 1 << n;
        int[] dp = new int[N];
        for (int i = 1; i < N; i++) {
            dp[i] = -1;
        }

        for (int mask = 0; mask < N; mask++) {
            if (dp[mask] == -1) continue;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) == 0 && dp[mask] + nums[i] <= target) {
                    int nextMask = mask | (1 << i);
                    dp[nextMask] = (dp[mask] + nums[i]) % target;
                }
            }
        }

        return dp[N - 1] == 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(2 ^ n)$
