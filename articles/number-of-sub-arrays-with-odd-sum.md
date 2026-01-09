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
