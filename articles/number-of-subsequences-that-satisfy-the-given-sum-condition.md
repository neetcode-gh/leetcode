## 1. Brute Force (Recursion)

::tabs-start

```python
class Solution:
    def numSubseq(self, nums: List[int], target: int) -> int:
        MOD = 1000000007

        def dfs(maxi, mini, i):
            if i == len(nums):
                if mini != float("inf") and (maxi + mini) <= target:
                    return 1
                return 0

            skip = dfs(maxi, mini, i + 1)
            include = dfs(max(maxi, nums[i]), min(mini, nums[i]), i + 1)
            return (skip + include) % MOD

        return dfs(float("-inf"), float("inf"), 0)
```

```java
public class Solution {
    private static final int MOD = 1000000007;

    public int numSubseq(int[] nums, int target) {
        return dfs(nums, Integer.MIN_VALUE, Integer.MAX_VALUE, 0, target);
    }

    private int dfs(int[] nums, int maxi, int mini, int i, int target) {
        if (i == nums.length) {
            if (mini != Integer.MAX_VALUE && (maxi + mini) <= target) {
                return 1;
            }
            return 0;
        }

        int skip = dfs(nums, maxi, mini, i + 1, target);
        int include = dfs(nums, Math.max(maxi, nums[i]), Math.min(mini, nums[i]), i + 1, target);
        return (skip + include) % MOD;
    }
}
```

```cpp
class Solution {
public:
    const int MOD = 1e9 + 7;

    int numSubseq(vector<int>& nums, int target) {
        return dfs(nums, INT_MIN, INT_MAX, 0, target);
    }

private:
    int dfs(vector<int>& nums, int maxi, int mini, int i, int target) {
        if (i == nums.size()) {
            if (mini != INT_MAX && (maxi + mini) <= target) {
                return 1;
            }
            return 0;
        }

        int skip = dfs(nums, maxi, mini, i + 1, target);
        int include = dfs(nums, max(maxi, nums[i]), min(mini, nums[i]), i + 1, target);
        return (skip + include) % MOD;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    numSubseq(nums, target) {
        const MOD = 1000000007;

        const dfs = (maxi, mini, i) => {
            if (i === nums.length) {
                if (mini !== Infinity && maxi + mini <= target) {
                    return 1;
                }
                return 0;
            }

            const skip = dfs(maxi, mini, i + 1);
            const include = dfs(
                Math.max(maxi, nums[i]),
                Math.min(mini, nums[i]),
                i + 1,
            );
            return (skip + include) % MOD;
        };

        return dfs(-Infinity, Infinity, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def numSubseq(self, nums: List[int], target: int) -> int:
        nums.sort()
        MOD = 1000000007
        res = 0

        for i in range(len(nums)):
            if nums[i] * 2 > target:
                break

            l, r = i, len(nums) - 1
            while l <= r:
                mid = (l + r) // 2
                if nums[i] + nums[mid] <= target:
                    l = mid + 1
                else:
                    r = mid - 1

            count = pow(2, r - i, MOD)
            res = (res + count) % MOD

        return res
```

```java
public class Solution {
    public int numSubseq(int[] nums, int target) {
        Arrays.sort(nums);
        int MOD = 1000000007;
        int res = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] * 2 > target) break;

            int l = i, r = nums.length - 1;
            while (l <= r) {
                int mid = l + (r - l) / 2;
                if (nums[i] + nums[mid] <= target) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }

            long count = pow(2, r - i, MOD);
            res = (int) ((res + count) % MOD);
        }
        return res;
    }

    private long pow(int base, int exp, int mod) {
        long result = 1;
        long b = base;
        while (exp > 0) {
            if ((exp & 1) == 1) result = (result * b) % mod;
            b = (b * b) % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    int numSubseq(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int MOD = 1000000007;
        int res = 0;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] * 2 > target) break;

            int l = i, r = nums.size() - 1;
            while (l <= r) {
                int mid = l + (r - l) / 2;
                if (nums[i] + nums[mid] <= target) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }

            long long count = powMod(2, r - i, MOD);
            res = (res + count) % MOD;
        }
        return res;
    }

private:
    long long powMod(int base, int exp, int mod) {
        long long result = 1, b = base;
        while (exp > 0) {
            if (exp & 1) result = (result * b) % mod;
            b = (b * b) % mod;
            exp >>= 1;
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    numSubseq(nums, target) {
        nums.sort((a, b) => a - b);
        const MOD = BigInt(1000000007);
        let res = 0n;

        const powerMod = (base, exp, mod) => {
            let result = 1n,
                b = BigInt(base);
            while (exp > 0) {
                if (exp & 1) result = (result * b) % mod;
                b = (b * b) % mod;
                exp >>= 1;
            }
            return result;
        };

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] * 2 > target) break;

            let l = i,
                r = nums.length - 1;
            while (l <= r) {
                const mid = Math.floor((l + r) / 2);
                if (nums[i] + nums[mid] <= target) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }

            const count = powerMod(2, r - i, MOD);
            res = (res + count) % MOD;
        }

        return Number(res);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Two Pointers

::tabs-start

```python
class Solution:
    def numSubseq(self, nums: List[int], target: int) -> int:
        nums.sort()
        res = 0
        mod = 10**9 + 7

        r = len(nums) - 1
        for i, left in enumerate(nums):
            while i <= r and left + nums[r] > target:
                r -= 1
            if i <= r:
                res += pow(2, r - i, mod)
                res %= mod

        return res
```

```java
public class Solution {
    public int numSubseq(int[] nums, int target) {
        Arrays.sort(nums);
        int res = 0, mod = 1000000007;
        int r = nums.length - 1;

        for (int i = 0; i < nums.length; i++) {
            while (i <= r && nums[i] + nums[r] > target) {
                r--;
            }
            if (i <= r) {
                res = (res + power(2, r - i, mod)) % mod;
            }
        }
        return res;
    }

    private int power(int base, int exp, int mod) {
        long result = 1, b = base;
        while (exp > 0) {
            if ((exp & 1) == 1) result = (result * b) % mod;
            b = (b * b) % mod;
            exp >>= 1;
        }
        return (int) result;
    }
}
```

```cpp
class Solution {
public:
    int numSubseq(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int res = 0, mod = 1000000007;
        int r = nums.size() - 1;

        for (int i = 0; i < nums.size(); i++) {
            while (i <= r && nums[i] + nums[r] > target) {
                r--;
            }
            if (i <= r) {
                res = (res + power(2, r - i, mod)) % mod;
            }
        }
        return res;
    }

private:
    long long power(int base, int exp, int mod) {
        long long result = 1, b = base;
        while (exp > 0) {
            if (exp & 1) result = (result * b) % mod;
            b = (b * b) % mod;
            exp >>= 1;
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    numSubseq(nums, target) {
        nums.sort((a, b) => a - b);
        const mod = BigInt(1000000007);
        let res = 0n;

        const power = (base, exp, mod) => {
            let result = 1n,
                b = BigInt(base);
            while (exp > 0) {
                if (exp & 1) result = (result * b) % mod;
                b = (b * b) % mod;
                exp >>= 1;
            }
            return result;
        };

        for (let i = 0, r = nums.length - 1; i < nums.length; i++) {
            while (nums[i] + nums[r] > target && i <= r) {
                r--;
            }
            if (i <= r) {
                res = (res + power(2, r - i, mod)) % mod;
            }
        }

        return Number(res);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Two Pointers (Optimal)

::tabs-start

```python
class Solution:
    def numSubseq(self, nums: List[int], target: int) -> int:
        nums.sort()
        MOD = 1000000007
        res = 0
        l, r = 0, len(nums) - 1
        power = [1] * len(nums)

        for i in range(1, len(nums)):
            power[i] = (power[i - 1] * 2) % MOD

        while l <= r:
            if nums[l] + nums[r] <= target:
                res = (res + power[r - l]) % MOD
                l += 1
            else:
                r -= 1

        return res
```

```java
public class Solution {
    public int numSubseq(int[] nums, int target) {
        Arrays.sort(nums);
        int MOD = 1000000007;
        int res = 0, l = 0, r = nums.length - 1;
        int[] power = new int[nums.length];
        power[0] = 1;

        for (int i = 1; i < nums.length; i++) {
            power[i] = (power[i - 1] * 2) % MOD;
        }

        while (l <= r) {
            if (nums[l] + nums[r] <= target) {
                res = (res + power[r - l]) % MOD;
                l++;
            } else {
                r--;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubseq(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int MOD = 1000000007;
        int res = 0, l = 0, r = nums.size() - 1;
        vector<int> power(nums.size(), 1);

        for (int i = 1; i < nums.size(); i++) {
            power[i] = (power[i - 1] * 2) % MOD;
        }

        while (l <= r) {
            if (nums[l] + nums[r] <= target) {
                res = (res + power[r - l]) % MOD;
                l++;
            } else {
                r--;
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
     * @param {number} target
     * @return {number}
     */
    numSubseq(nums, target) {
        nums.sort((a, b) => a - b);
        const MOD = 1000000007;
        let res = 0,
            l = 0,
            r = nums.length - 1;
        const power = Array(nums.length).fill(1);

        for (let i = 1; i < nums.length; i++) {
            power[i] = (power[i - 1] * 2) % MOD;
        }

        while (l <= r) {
            if (nums[l] + nums[r] <= target) {
                res = (res + power[r - l]) % MOD;
                l++;
            } else {
                r--;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
