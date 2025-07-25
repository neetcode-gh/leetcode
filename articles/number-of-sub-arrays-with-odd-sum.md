## 1. Brute Force

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int]) -> int:
        n, res = len(arr), 0
        mod = int(1e9 + 7)

        for i in range(n):
            curSum = 0
            for j in range(i, n):
                curSum += arr[j]
                if curSum % 2:
                    res = (res + 1) % mod

        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr) {
        int n = arr.length, res = 0;
        int mod = (int)1e9 + 7;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += arr[j];
                if (curSum % 2 != 0) {
                    res = (res + 1) % mod;
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
    int numOfSubarrays(vector<int>& arr) {
        int n = arr.size(), res = 0;
        int mod = 1e9 + 7;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += arr[j];
                if (curSum % 2 != 0) {
                    res = (res + 1) % mod;
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
     * @param {number[]} arr
     * @return {number}
     */
    numOfSubarrays(arr) {
        const n = arr.length;
        let res = 0;
        const mod = 1e9 + 7;

        for (let i = 0; i < n; i++) {
            let curSum = 0;
            for (let j = i; j < n; j++) {
                curSum += arr[j];
                if (curSum % 2 !== 0) {
                    res = (res + 1) % mod;
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

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int]) -> int:
        mod = 10**9 + 7
        n = len(arr)
        memo = {}

        def dp(i: int, parity: int) -> int:
            if i == n:
                return 0

            if (i, parity) in memo:
                return memo[(i, parity)]

            new_parity = (parity + arr[i]) % 2
            res = new_parity + dp(i + 1, new_parity)
            memo[(i, parity)] = res % mod
            return memo[(i, parity)]

        ans = 0
        for i in range(n):
            ans = (ans + dp(i, 0)) % mod

        return ans
```

```java
public class Solution {
    int[][] memo;
    int[] arr;
    int mod = (int)1e9 + 7;

    public int numOfSubarrays(int[] arr) {
        int n = arr.length;
        this.arr = arr;
        memo = new int[n][2];
        for (int i = 0; i < n; i++) {
            memo[i][0] = -1;
            memo[i][1] = -1;
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            res = (res + dp(i, 0)) % mod;
        }
        return res;
    }

    private int dp(int i, int parity) {
        if (i == arr.length) return 0;
        if (memo[i][parity] != -1) return memo[i][parity];

        int newParity = (parity + arr[i]) % 2;
        int res = newParity + dp(i + 1, newParity);
        return memo[i][parity] = res % mod;
    }
}
```

```cpp
class Solution {
public:
    int mod = 1e9 + 7;
    vector<vector<int>> memo;
    vector<int> arr;

    int numOfSubarrays(vector<int>& arr) {
        this->arr = arr;
        int n = arr.size();
        memo.assign(n, vector<int>(2, -1));

        int res = 0;
        for (int i = 0; i < n; i++) {
            res = (res + dp(i, 0)) % mod;
        }
        return res;
    }

    int dp(int i, int parity) {
        if (i == arr.size()) return 0;
        if (memo[i][parity] != -1) return memo[i][parity];

        int newParity = (parity + arr[i]) % 2;
        int res = newParity + dp(i + 1, newParity);
        return memo[i][parity] = res % mod;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    numOfSubarrays(arr) {
        const mod = 1e9 + 7;
        const n = arr.length;
        const memo = Array.from({ length: n }, () => Array(2).fill(-1));

        const dp = (i, parity) => {
            if (i === n) return 0;
            if (memo[i][parity] !== -1) return memo[i][parity];

            const newParity = (parity + arr[i]) % 2;
            const res = newParity + dp(i + 1, newParity);
            return (memo[i][parity] = res % mod);
        };

        let res = 0;
        for (let i = 0; i < n; i++) {
            res = (res + dp(i, 0)) % mod;
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

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int]) -> int:
        n = len(arr)
        mod = 10**9 + 7
        dp = [[0] * 2 for _ in range(n + 1)]

        for i in range(n - 1, -1, -1):
            for parity in range(2):
                new_parity = (parity + arr[i]) % 2
                dp[i][parity] = (new_parity + dp[i + 1][new_parity]) % mod

        res = 0
        for i in range(n):
            res = (res + dp[i][0]) % mod
        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr) {
        int n = arr.length;
        int mod = (int)1e9 + 7;
        int[][] dp = new int[n + 1][2];

        for (int i = n - 1; i >= 0; i--) {
            for (int parity = 0; parity <= 1; parity++) {
                int newParity = (parity + arr[i]) % 2;
                dp[i][parity] = (newParity + dp[i + 1][newParity]) % mod;
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            res = (res + dp[i][0]) % mod;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfSubarrays(vector<int>& arr) {
        int n = arr.size(), mod = 1e9 + 7;
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));

        for (int i = n - 1; i >= 0; i--) {
            for (int parity = 0; parity <= 1; parity++) {
                int newParity = (parity + arr[i]) % 2;
                dp[i][parity] = (newParity + dp[i + 1][newParity]) % mod;
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            res = (res + dp[i][0]) % mod;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    numOfSubarrays(arr) {
        const n = arr.length;
        const mod = 1e9 + 7;
        const dp = Array.from({ length: n + 1 }, () => [0, 0]);

        for (let i = n - 1; i >= 0; i--) {
            for (let parity = 0; parity <= 1; parity++) {
                const newParity = (parity + arr[i]) % 2;
                dp[i][parity] = (newParity + dp[i + 1][newParity]) % mod;
            }
        }

        let res = 0;
        for (let i = 0; i < n; i++) {
            res = (res + dp[i][0]) % mod;
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

## 4. Prefix Sum - I

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int]) -> int:
        cur_sum = odd_cnt = even_cnt = res = 0
        MOD = 10**9 + 7

        for n in arr:
            cur_sum += n
            if cur_sum % 2:
                res = (res + 1 + even_cnt) % MOD
                odd_cnt += 1
            else:
                res = (res + odd_cnt) % MOD
                even_cnt += 1

        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr) {
        int curSum = 0, oddCnt = 0, evenCnt = 0, res = 0;
        int MOD = (int)1e9 + 7;

        for (int n : arr) {
            curSum += n;
            if (curSum % 2 != 0) {
                res = (res + 1 + evenCnt) % MOD;
                oddCnt++;
            } else {
                res = (res + oddCnt) % MOD;
                evenCnt++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfSubarrays(vector<int>& arr) {
        long long curSum = 0, oddCnt = 0, evenCnt = 0, res = 0;
        const int MOD = 1e9 + 7;

        for (int n : arr) {
            curSum += n;
            if (curSum % 2 != 0) {
                res = (res + 1 + evenCnt) % MOD;
                oddCnt++;
            } else {
                res = (res + oddCnt) % MOD;
                evenCnt++;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    numOfSubarrays(arr) {
        let curSum = 0,
            oddCnt = 0,
            evenCnt = 0,
            res = 0;
        const MOD = 1e9 + 7;

        for (let n of arr) {
            curSum += n;
            if (curSum % 2 !== 0) {
                res = (res + 1 + evenCnt) % MOD;
                oddCnt++;
            } else {
                res = (res + oddCnt) % MOD;
                evenCnt++;
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

## 5. Prefix Sum - II

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int]) -> int:
        count = [1, 0]
        prefix = res = 0
        MOD = 10**9 + 7

        for num in arr:
            prefix = (prefix + num) % 2
            res = (res + count[1 - prefix]) % MOD
            count[prefix] += 1

        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr) {
        int[] count = {1, 0};
        int prefix = 0, res = 0;
        int MOD = (int)1e9 + 7;

        for (int num : arr) {
            prefix = (prefix + num) % 2;
            res = (res + count[1 - prefix]) % MOD;
            count[prefix]++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfSubarrays(vector<int>& arr) {
        int count[2] = {1, 0};
        int prefix = 0, res = 0;
        const int MOD = 1e9 + 7;

        for (int num : arr) {
            prefix = (prefix + num) % 2;
            res = (res + count[1 - prefix]) % MOD;
            count[prefix]++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    numOfSubarrays(arr) {
        const count = [1, 0];
        let prefix = 0,
            res = 0;
        const MOD = 1e9 + 7;

        for (const num of arr) {
            prefix = (prefix + num) % 2;
            res = (res + count[1 - prefix]) % MOD;
            count[prefix]++;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
