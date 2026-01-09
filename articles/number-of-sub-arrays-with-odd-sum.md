## 1. Brute Force

### Intuition

For each possible subarray, compute its sum and check if it is odd. We try every starting index and extend to every possible ending index, accumulating the sum incrementally.

### Algorithm

1. For each starting index `i`, initialize a running sum.
2. Extend the subarray by adding elements one at a time up to index `n-1`.
3. After each addition, check if the current sum is odd and increment `res` if so.
4. Return the total count modulo 10^9 + 7.

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

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr) {
        int n = arr.Length, res = 0;
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

```go
func numOfSubarrays(arr []int) int {
    n := len(arr)
    res := 0
    mod := int(1e9 + 7)

    for i := 0; i < n; i++ {
        curSum := 0
        for j := i; j < n; j++ {
            curSum += arr[j]
            if curSum%2 != 0 {
                res = (res + 1) % mod
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun numOfSubarrays(arr: IntArray): Int {
        val n = arr.size
        var res = 0
        val mod = 1_000_000_007

        for (i in 0 until n) {
            var curSum = 0
            for (j in i until n) {
                curSum += arr[j]
                if (curSum % 2 != 0) {
                    res = (res + 1) % mod
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func numOfSubarrays(_ arr: [Int]) -> Int {
        let n = arr.count
        var res = 0
        let mod = 1_000_000_007

        for i in 0..<n {
            var curSum = 0
            for j in i..<n {
                curSum += arr[j]
                if curSum % 2 != 0 {
                    res = (res + 1) % mod
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Dynamic Programming (Top-Down)

### Intuition

We use memoization to count subarrays ending at each position. For a subarray starting at index `i`, the parity of its sum depends on the running parity as we extend rightward. By caching results for each `(index, parity)` state, we avoid redundant calculations.

### Algorithm

1. Define `dfs(i, parity)` returning the count of odd-sum subarrays starting at index `i` with the given running parity.
2. At each step, update the parity by adding the current element modulo 2.
3. Add `1` to the count if the new parity is odd, then recurse to the next index.
4. Sum up `dfs(i, 0)` for all starting indices to get the total.

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

```csharp
public class Solution {
    private int[][] memo;
    private int[] arr;
    private int mod = (int)1e9 + 7;

    public int NumOfSubarrays(int[] arr) {
        int n = arr.Length;
        this.arr = arr;
        memo = new int[n][];
        for (int i = 0; i < n; i++) {
            memo[i] = new int[] { -1, -1 };
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            res = (res + Dp(i, 0)) % mod;
        }
        return res;
    }

    private int Dp(int i, int parity) {
        if (i == arr.Length) return 0;
        if (memo[i][parity] != -1) return memo[i][parity];

        int newParity = (parity + arr[i]) % 2;
        int res = newParity + Dp(i + 1, newParity);
        return memo[i][parity] = res % mod;
    }
}
```

```go
func numOfSubarrays(arr []int) int {
    mod := int(1e9 + 7)
    n := len(arr)
    memo := make([][]int, n)
    for i := range memo {
        memo[i] = []int{-1, -1}
    }

    var dp func(i, parity int) int
    dp = func(i, parity int) int {
        if i == n {
            return 0
        }
        if memo[i][parity] != -1 {
            return memo[i][parity]
        }

        newParity := (parity + arr[i]) % 2
        res := newParity + dp(i+1, newParity)
        memo[i][parity] = res % mod
        return memo[i][parity]
    }

    res := 0
    for i := 0; i < n; i++ {
        res = (res + dp(i, 0)) % mod
    }
    return res
}
```

```kotlin
class Solution {
    fun numOfSubarrays(arr: IntArray): Int {
        val mod = 1_000_000_007
        val n = arr.size
        val memo = Array(n) { IntArray(2) { -1 } }

        fun dp(i: Int, parity: Int): Int {
            if (i == n) return 0
            if (memo[i][parity] != -1) return memo[i][parity]

            val newParity = (parity + arr[i]) % 2
            val res = newParity + dp(i + 1, newParity)
            memo[i][parity] = res % mod
            return memo[i][parity]
        }

        var res = 0
        for (i in 0 until n) {
            res = (res + dp(i, 0)) % mod
        }
        return res
    }
}
```

```swift
class Solution {
    func numOfSubarrays(_ arr: [Int]) -> Int {
        let mod = 1_000_000_007
        let n = arr.count
        var memo = [[Int]](repeating: [-1, -1], count: n)

        func dp(_ i: Int, _ parity: Int) -> Int {
            if i == n { return 0 }
            if memo[i][parity] != -1 { return memo[i][parity] }

            let newParity = (parity + arr[i]) % 2
            let res = newParity + dp(i + 1, newParity)
            memo[i][parity] = res % mod
            return memo[i][parity]
        }

        var res = 0
        for i in 0..<n {
            res = (res + dp(i, 0)) % mod
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We can convert the top-down approach to bottom-up by processing indices from right to left. For each position, we compute how many odd-sum subarrays can be formed starting there, given either even or odd running parity.

### Algorithm

1. Create a 2D array `dp[i][parity]` representing counts from index `i` with given parity.
2. Iterate from the last index to the first.
3. For each parity, compute the new parity after including the current element and fill in the `dp` value.
4. Sum `dp[i][0]` for all indices to get the final answer.

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

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr) {
        int n = arr.Length;
        int mod = (int)1e9 + 7;
        int[][] dp = new int[n + 1][];
        for (int i = 0; i <= n; i++) {
            dp[i] = new int[] { 0, 0 };
        }

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

```go
func numOfSubarrays(arr []int) int {
    n := len(arr)
    mod := int(1e9 + 7)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = []int{0, 0}
    }

    for i := n - 1; i >= 0; i-- {
        for parity := 0; parity <= 1; parity++ {
            newParity := (parity + arr[i]) % 2
            dp[i][parity] = (newParity + dp[i+1][newParity]) % mod
        }
    }

    res := 0
    for i := 0; i < n; i++ {
        res = (res + dp[i][0]) % mod
    }
    return res
}
```

```kotlin
class Solution {
    fun numOfSubarrays(arr: IntArray): Int {
        val n = arr.size
        val mod = 1_000_000_007
        val dp = Array(n + 1) { IntArray(2) }

        for (i in n - 1 downTo 0) {
            for (parity in 0..1) {
                val newParity = (parity + arr[i]) % 2
                dp[i][parity] = (newParity + dp[i + 1][newParity]) % mod
            }
        }

        var res = 0
        for (i in 0 until n) {
            res = (res + dp[i][0]) % mod
        }
        return res
    }
}
```

```swift
class Solution {
    func numOfSubarrays(_ arr: [Int]) -> Int {
        let n = arr.count
        let mod = 1_000_000_007
        var dp = [[Int]](repeating: [0, 0], count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            for parity in 0...1 {
                let newParity = (parity + arr[i]) % 2
                dp[i][parity] = (newParity + dp[i + 1][newParity]) % mod
            }
        }

        var res = 0
        for i in 0..<n {
            res = (res + dp[i][0]) % mod
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Prefix Sum - I

### Intuition

A subarray has an odd sum when its prefix sum parity differs from the prefix sum at its starting point. If the current prefix sum is odd, pairing it with any previous even prefix sum yields an odd subarray. We track counts of odd and even prefix sums seen so far.

### Algorithm

1. Maintain counters for odd and even prefix sums encountered.
2. For each element, update the running prefix sum.
3. If the prefix sum is odd, add `1` (for the subarray from the start) plus the count of previous even prefix sums.
4. If even, add the count of previous odd prefix sums.
5. Update the appropriate counter and return `res`.

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

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr) {
        int curSum = 0, oddCnt = 0, evenCnt = 0, res = 0;
        int MOD = (int)1e9 + 7;

        foreach (int n in arr) {
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

```go
func numOfSubarrays(arr []int) int {
    curSum, oddCnt, evenCnt, res := 0, 0, 0, 0
    mod := int(1e9 + 7)

    for _, n := range arr {
        curSum += n
        if curSum%2 != 0 {
            res = (res + 1 + evenCnt) % mod
            oddCnt++
        } else {
            res = (res + oddCnt) % mod
            evenCnt++
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun numOfSubarrays(arr: IntArray): Int {
        var curSum = 0
        var oddCnt = 0
        var evenCnt = 0
        var res = 0
        val mod = 1_000_000_007

        for (n in arr) {
            curSum += n
            if (curSum % 2 != 0) {
                res = (res + 1 + evenCnt) % mod
                oddCnt++
            } else {
                res = (res + oddCnt) % mod
                evenCnt++
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func numOfSubarrays(_ arr: [Int]) -> Int {
        var curSum = 0, oddCnt = 0, evenCnt = 0, res = 0
        let mod = 1_000_000_007

        for n in arr {
            curSum += n
            if curSum % 2 != 0 {
                res = (res + 1 + evenCnt) % mod
                oddCnt += 1
            } else {
                res = (res + oddCnt) % mod
                evenCnt += 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 5. Prefix Sum - II

### Intuition

We only need to track the parity of the prefix sum (`0` for even, `1` for odd). A count array of size `2` stores how many prefix sums of each parity we have seen. For each new element, we look up the count of the opposite parity to find valid subarrays.

### Algorithm

1. Initialize `count[0] = 1` to represent the empty prefix (sum `0`, which is even).
2. For each element, toggle the prefix parity by adding the element modulo `2`.
3. Add `count[1 - prefix]` to the result (subarrays ending here with odd sum).
4. Increment `count[prefix]` and continue.
5. Return the final result.

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

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr) {
        int[] count = { 1, 0 };
        int prefix = 0, res = 0;
        int MOD = (int)1e9 + 7;

        foreach (int num in arr) {
            prefix = (prefix + num) % 2;
            res = (res + count[1 - prefix]) % MOD;
            count[prefix]++;
        }

        return res;
    }
}
```

```go
func numOfSubarrays(arr []int) int {
    count := []int{1, 0}
    prefix, res := 0, 0
    mod := int(1e9 + 7)

    for _, num := range arr {
        prefix = (prefix + num) % 2
        res = (res + count[1-prefix]) % mod
        count[prefix]++
    }

    return res
}
```

```kotlin
class Solution {
    fun numOfSubarrays(arr: IntArray): Int {
        val count = intArrayOf(1, 0)
        var prefix = 0
        var res = 0
        val mod = 1_000_000_007

        for (num in arr) {
            prefix = (prefix + num) % 2
            res = (res + count[1 - prefix]) % mod
            count[prefix]++
        }

        return res
    }
}
```

```swift
class Solution {
    func numOfSubarrays(_ arr: [Int]) -> Int {
        var count = [1, 0]
        var prefix = 0
        var res = 0
        let mod = 1_000_000_007

        for num in arr {
            prefix = (prefix + num) % 2
            res = (res + count[1 - prefix]) % mod
            count[prefix] += 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
