## 1. Recursion

### Intuition

We need to count strings of length n where each vowel can only be followed by specific vowels. The rules are: 'a' can be followed by 'e'; 'e' can be followed by 'a' or 'i'; 'i' can be followed by any vowel except itself; 'o' can be followed by 'i' or 'u'; 'u' can be followed by 'a'. We can solve this by exploring all valid paths using recursion, starting from each vowel.

### Algorithm

1. Define the transition rules mapping each vowel to its valid successors.
2. Create a recursive function that takes the current position and current vowel.
3. Base case: if position equals `n`, return `1` (found a valid string).
4. For each valid successor of the current vowel, recursively count strings.
5. Sum up the counts from all successors.
6. Start the recursion from position `1` with each of the 5 vowels.
7. Return the total count modulo `10^9 + 7`.

::tabs-start

```python
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        MOD = 10**9 + 7
        follows = {
            'a': ['e'],
            'e': ['a', 'i'],
            'i': ['a', 'e', 'o', 'u'],
            'o': ['i', 'u'],
            'u': ['a']
        }

        def dfs(i, v):
            if i == n:
                return 1

            total = 0
            for nxt in follows[v]:
                total = (total + dfs(i + 1, nxt)) % MOD
            return total

        res = 0
        for vowel in ['a', 'e', 'i', 'o', 'u']:
            res = (res + dfs(1, vowel)) % MOD

        return res
```

```java
public class Solution {
    private final int MOD = 1_000_000_007;
    private final Map<Character, List<Character>> follows = Map.of(
        'a', List.of('e'),
        'e', List.of('a', 'i'),
        'i', List.of('a', 'e', 'o', 'u'),
        'o', List.of('i', 'u'),
        'u', List.of('a')
    );

    public int countVowelPermutation(int n) {
        int res = 0;
        for (char vowel : "aeiou".toCharArray()) {
            res = (res + dfs(1, vowel, n)) % MOD;
        }
        return res;
    }

    private int dfs(int i, char v, int n) {
        if (i == n) {
            return 1;
        }

        int total = 0;
        for (char next : follows.get(v)) {
            total = (total + dfs(i + 1, next, n)) % MOD;
        }
        return total;
    }
}
```

```cpp
class Solution {
    const int MOD = 1e9 + 7;
    unordered_map<char, vector<char>> follows = {
        {'a', {'e'}},
        {'e', {'a', 'i'}},
        {'i', {'a', 'e', 'o', 'u'}},
        {'o', {'i', 'u'}},
        {'u', {'a'}}
    };

public:
    int countVowelPermutation(int n) {

        int res = 0;
        for (char vowel : string("aeiou")) {
            res = (res + dfs(1, vowel, n)) % MOD;
        }
        return res;
    }

private:
    int dfs(int i, char v, int n) {
        if (i == n) {
            return 1;
        }

        int total = 0;
        for (char& next : follows[v]) {
            total = (total + dfs(i + 1, next, n)) % MOD;
        }
        return total;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countVowelPermutation(n) {
        const MOD = 1e9 + 7;

        const follows = {
            a: ['e'],
            e: ['a', 'i'],
            i: ['a', 'e', 'o', 'u'],
            o: ['i', 'u'],
            u: ['a'],
        };

        const dfs = (i, v) => {
            if (i === n) {
                return 1;
            }

            let total = 0;
            for (const next of follows[v]) {
                total = (total + dfs(i + 1, next)) % MOD;
            }
            return total;
        };

        let res = 0;
        for (const vowel of ['a', 'e', 'i', 'o', 'u']) {
            res = (res + dfs(1, vowel)) % MOD;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;
    private Dictionary<char, List<char>> follows = new Dictionary<char, List<char>> {
        {'a', new List<char>{'e'}},
        {'e', new List<char>{'a', 'i'}},
        {'i', new List<char>{'a', 'e', 'o', 'u'}},
        {'o', new List<char>{'i', 'u'}},
        {'u', new List<char>{'a'}}
    };

    public int CountVowelPermutation(int n) {
        int res = 0;
        foreach (char vowel in "aeiou") {
            res = (res + Dfs(1, vowel, n)) % MOD;
        }
        return res;
    }

    private int Dfs(int i, char v, int n) {
        if (i == n) return 1;
        int total = 0;
        foreach (char next in follows[v]) {
            total = (total + Dfs(i + 1, next, n)) % MOD;
        }
        return total;
    }
}
```

```go
func countVowelPermutation(n int) int {
    MOD := int(1e9 + 7)
    follows := map[byte][]byte{
        'a': {'e'},
        'e': {'a', 'i'},
        'i': {'a', 'e', 'o', 'u'},
        'o': {'i', 'u'},
        'u': {'a'},
    }

    var dfs func(i int, v byte) int
    dfs = func(i int, v byte) int {
        if i == n {
            return 1
        }
        total := 0
        for _, next := range follows[v] {
            total = (total + dfs(i+1, next)) % MOD
        }
        return total
    }

    res := 0
    for _, vowel := range "aeiou" {
        res = (res + dfs(1, byte(vowel))) % MOD
    }
    return res
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007
    private val follows = mapOf(
        'a' to listOf('e'),
        'e' to listOf('a', 'i'),
        'i' to listOf('a', 'e', 'o', 'u'),
        'o' to listOf('i', 'u'),
        'u' to listOf('a')
    )

    fun countVowelPermutation(n: Int): Int {
        var res = 0
        for (vowel in "aeiou") {
            res = (res + dfs(1, vowel, n)) % MOD
        }
        return res
    }

    private fun dfs(i: Int, v: Char, n: Int): Int {
        if (i == n) return 1
        var total = 0
        for (next in follows[v]!!) {
            total = (total + dfs(i + 1, next, n)) % MOD
        }
        return total
    }
}
```

```swift
class Solution {
    private let MOD = 1_000_000_007
    private let follows: [Character: [Character]] = [
        "a": ["e"],
        "e": ["a", "i"],
        "i": ["a", "e", "o", "u"],
        "o": ["i", "u"],
        "u": ["a"]
    ]

    func countVowelPermutation(_ n: Int) -> Int {
        var res = 0
        for vowel in "aeiou" {
            res = (res + dfs(1, vowel, n)) % MOD
        }
        return res
    }

    private func dfs(_ i: Int, _ v: Character, _ n: Int) -> Int {
        if i == n { return 1 }
        var total = 0
        for next in follows[v]! {
            total = (total + dfs(i + 1, next, n)) % MOD
        }
        return total
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(4 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The plain recursion recomputes the same subproblems many times. For example, counting strings starting with `'e'` at position `5` is computed multiple times. We can add memoization to cache results for each `(position, vowel)` pair. This reduces the time complexity dramatically since there are only `O(n * 5)` unique states.

### Algorithm

1. Define the transition rules mapping each vowel to its valid successors.
2. Create a memoization cache (2D array or hash map) for states `(position, vowel)`.
3. Create a recursive function that:
   - Returns `1` if position equals `n`.
   - Returns cached result if the state was computed before.
   - Otherwise, computes the sum of counts from all valid successors and caches it.
4. Start the recursion from position `1` with each of the 5 vowels.
5. Return the total count modulo `10^9 + 7`.

::tabs-start

```python
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        MOD = 10**9 + 7
        cache = {}
        follows = {
            'a': ['e'],
            'e': ['a', 'i'],
            'i': ['a', 'e', 'o', 'u'],
            'o': ['i', 'u'],
            'u': ['a']
        }

        def dfs(i, v):
            if i == n:
                return 1
            if (i, v) in cache:
                return cache[(i, v)]

            total = 0
            for nxt in follows[v]:
                total = (total + dfs(i + 1, nxt)) % MOD
            cache[(i, v)] = total
            return total

        res = 0
        for vowel in ['a', 'e', 'i', 'o', 'u']:
            res = (res + dfs(1, vowel)) % MOD

        return res
```

```java
public class Solution {
    private final int MOD = 1_000_000_007;
    private final Map<Integer, List<Integer>> follows = Map.of(
        0, List.of(1),           // 'a' -> 'e'
        1, List.of(0, 2),        // 'e' -> 'a', 'i'
        2, List.of(0, 1, 3, 4),  // 'i' -> 'a', 'e', 'o', 'u'
        3, List.of(2, 4),        // 'o' -> 'i', 'u'
        4, List.of(0)            // 'u' -> 'a'
    );
    private int[][] dp;

    public int countVowelPermutation(int n) {
        dp = new int[n][5];
        for (int i = 0; i < n; i++) {
            Arrays.fill(dp[i], -1);
        }

        int res = 0;
        for (int vowel = 0; vowel < 5; vowel++) {
            res = (res + dfs(1, vowel, n)) % MOD;
        }
        return res;
    }

    private int dfs(int i, int v, int n) {
        if (i == n) {
            return 1;
        }
        if (dp[i][v] != -1) return dp[i][v];

        int total = 0;
        for (int next : follows.get(v)) {
            total = (total + dfs(i + 1, next, n)) % MOD;
        }
        return dp[i][v] = total;
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;
    vector<vector<int>> dp;
    vector<vector<int>> follows = {
        {1},          // 'a' -> 'e'
        {0, 2},       // 'e' -> 'a', 'i'
        {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
        {2, 4},       // 'o' -> 'i', 'u'
        {0}           // 'u' -> 'a'
    };

    int dfs(int i, int v, int n) {
        if (i == n) return 1;
        if (dp[i][v] != -1) return dp[i][v];

        int total = 0;
        for (int next : follows[v]) {
            total = (total + dfs(i + 1, next, n)) % MOD;
        }
        return dp[i][v] = total;
    }

public:
    int countVowelPermutation(int n) {
        dp.assign(n, vector<int>(5, -1));

        int res = 0;
        for (int vowel = 0; vowel < 5; vowel++) {
            res = (res + dfs(1, vowel, n)) % MOD;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countVowelPermutation(n) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n }, () => Array(5).fill(-1));

        const follows = {
            0: [1], // 'a' -> 'e'
            1: [0, 2], // 'e' -> 'a', 'i'
            2: [0, 1, 3, 4], // 'i' -> 'a', 'e', 'o', 'u'
            3: [2, 4], // 'o' -> 'i', 'u'
            4: [0], // 'u' -> 'a'
        };

        const dfs = (i, v) => {
            if (i === n) return 1;
            if (dp[i][v] !== -1) return dp[i][v];

            let total = 0;
            for (const next of follows[v]) {
                total = (total + dfs(i + 1, next)) % MOD;
            }
            dp[i][v] = total;
            return total;
        };

        let res = 0;
        for (let vowel = 0; vowel < 5; vowel++) {
            res = (res + dfs(1, vowel)) % MOD;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;
    private int[][] follows = new int[][] {
        new int[] {1},          // 'a' -> 'e'
        new int[] {0, 2},       // 'e' -> 'a', 'i'
        new int[] {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
        new int[] {2, 4},       // 'o' -> 'i', 'u'
        new int[] {0}           // 'u' -> 'a'
    };
    private int[,] dp;

    public int CountVowelPermutation(int n) {
        dp = new int[n, 5];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < 5; j++) {
                dp[i, j] = -1;
            }
        }

        int res = 0;
        for (int vowel = 0; vowel < 5; vowel++) {
            res = (res + Dfs(1, vowel, n)) % MOD;
        }
        return res;
    }

    private int Dfs(int i, int v, int n) {
        if (i == n) return 1;
        if (dp[i, v] != -1) return dp[i, v];

        int total = 0;
        foreach (int next in follows[v]) {
            total = (total + Dfs(i + 1, next, n)) % MOD;
        }
        return dp[i, v] = total;
    }
}
```

```go
func countVowelPermutation(n int) int {
    MOD := int(1e9 + 7)
    follows := [][]int{
        {1},          // 'a' -> 'e'
        {0, 2},       // 'e' -> 'a', 'i'
        {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
        {2, 4},       // 'o' -> 'i', 'u'
        {0},          // 'u' -> 'a'
    }

    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, 5)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, v int) int
    dfs = func(i, v int) int {
        if i == n {
            return 1
        }
        if dp[i][v] != -1 {
            return dp[i][v]
        }
        total := 0
        for _, next := range follows[v] {
            total = (total + dfs(i+1, next)) % MOD
        }
        dp[i][v] = total
        return total
    }

    res := 0
    for vowel := 0; vowel < 5; vowel++ {
        res = (res + dfs(1, vowel)) % MOD
    }
    return res
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007
    private val follows = arrayOf(
        intArrayOf(1),          // 'a' -> 'e'
        intArrayOf(0, 2),       // 'e' -> 'a', 'i'
        intArrayOf(0, 1, 3, 4), // 'i' -> 'a', 'e', 'o', 'u'
        intArrayOf(2, 4),       // 'o' -> 'i', 'u'
        intArrayOf(0)           // 'u' -> 'a'
    )
    private lateinit var dp: Array<IntArray>

    fun countVowelPermutation(n: Int): Int {
        dp = Array(n) { IntArray(5) { -1 } }

        var res = 0
        for (vowel in 0 until 5) {
            res = (res + dfs(1, vowel, n)) % MOD
        }
        return res
    }

    private fun dfs(i: Int, v: Int, n: Int): Int {
        if (i == n) return 1
        if (dp[i][v] != -1) return dp[i][v]

        var total = 0
        for (next in follows[v]) {
            total = (total + dfs(i + 1, next, n)) % MOD
        }
        dp[i][v] = total
        return total
    }
}
```

```swift
class Solution {
    private let MOD = 1_000_000_007
    private let follows = [
        [1],          // 'a' -> 'e'
        [0, 2],       // 'e' -> 'a', 'i'
        [0, 1, 3, 4], // 'i' -> 'a', 'e', 'o', 'u'
        [2, 4],       // 'o' -> 'i', 'u'
        [0]           // 'u' -> 'a'
    ]
    private var dp: [[Int]] = []

    func countVowelPermutation(_ n: Int) -> Int {
        dp = Array(repeating: Array(repeating: -1, count: 5), count: n)

        var res = 0
        for vowel in 0..<5 {
            res = (res + dfs(1, vowel, n)) % MOD
        }
        return res
    }

    private func dfs(_ i: Int, _ v: Int, _ n: Int) -> Int {
        if i == n { return 1 }
        if dp[i][v] != -1 { return dp[i][v] }

        var total = 0
        for next in follows[v] {
            total = (total + dfs(i + 1, next, n)) % MOD
        }
        dp[i][v] = total
        return total
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

Instead of recursion with memoization, we can build the solution iteratively from the base case. We use a 2D DP table where `dp[i][v]` represents the count of valid strings of length `i` ending with vowel `v`. We start with length `1` (each vowel has count `1`) and build up to length `n` by considering which vowels can precede each vowel.

### Algorithm

1. Create a 2D DP array of size `(n+1) x 5`.
2. Initialize `dp[1][v] = 1` for all vowels (there is one string of length `1` for each vowel).
3. For each length `i` from `2` to `n`:
   - For each vowel `v`, sum up `dp[i-1][prev]` for all vowels `prev` that can precede `v`.
   - Note: we need to reverse the transition rules (find what can come before, not after).
4. Sum `dp[n][v]` for all vowels `v`.
5. Return the result modulo `10^9 + 7`.

::tabs-start

```python
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        MOD = 10**9 + 7
        a, e, i, o, u = 0, 1, 2, 3, 4
        dp = [[0] * 5 for _ in range(n + 1)]
        dp[1] = [1, 1, 1, 1, 1]

        for j in range(2, n + 1):
            dp[j][a] = (dp[j - 1][e] + dp[j - 1][i] + dp[j - 1][u]) % MOD
            dp[j][e] = (dp[j - 1][a] + dp[j - 1][i]) % MOD
            dp[j][i] = (dp[j - 1][e] + dp[j - 1][o]) % MOD
            dp[j][o] = dp[j - 1][i] % MOD
            dp[j][u] = (dp[j - 1][i] + dp[j - 1][o]) % MOD

        return sum(dp[n]) % MOD
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int countVowelPermutation(int n) {
        int[][] dp = new int[n + 1][5];
        int[][] follows = {
            {1},          // 'a' -> 'e'
            {0, 2},       // 'e' -> 'a', 'i'
            {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
            {2, 4},       // 'o' -> 'i', 'u'
            {0}           // 'u' -> 'a'
        };

        for (int v = 0; v < 5; v++) {
            dp[1][v] = 1;
        }

        for (int i = 2; i <= n; i++) {
            for (int v = 0; v < 5; v++) {
                for (int nextV : follows[v]) {
                    dp[i][v] = (dp[i][v] + dp[i - 1][nextV]) % MOD;
                }
            }
        }

        int result = 0;
        for (int v = 0; v < 5; v++) {
            result = (result + dp[n][v]) % MOD;
        }
        return result;
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

public:
    int countVowelPermutation(int n) {
        vector<vector<int>> dp(n + 1, vector<int>(5, 0));
        vector<vector<int>> follows = {
            {1},          // 'a' -> 'e'
            {0, 2},       // 'e' -> 'a', 'i'
            {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
            {2, 4},       // 'o' -> 'i', 'u'
            {0}           // 'u' -> 'a'
        };

        for (int v = 0; v < 5; v++) {
            dp[1][v] = 1;
        }

        for (int i = 2; i <= n; i++) {
            for (int v = 0; v < 5; v++) {
                for (int nextV : follows[v]) {
                    dp[i][v] = (dp[i][v] + dp[i - 1][nextV]) % MOD;
                }
            }
        }

        int result = 0;
        for (int v = 0; v < 5; v++) {
            result = (result + dp[n][v]) % MOD;
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countVowelPermutation(n) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n + 1 }, () => Array(5).fill(0));
        const follows = [
            [1], // 'a' -> 'e'
            [0, 2], // 'e' -> 'a', 'i'
            [0, 1, 3, 4], // 'i' -> 'a', 'e', 'o', 'u'
            [2, 4], // 'o' -> 'i', 'u'
            [0], // 'u' -> 'a'
        ];

        for (let v = 0; v < 5; v++) {
            dp[1][v] = 1;
        }

        for (let i = 2; i <= n; i++) {
            for (let v = 0; v < 5; v++) {
                for (const nextV of follows[v]) {
                    dp[i][v] = (dp[i][v] + dp[i - 1][nextV]) % MOD;
                }
            }
        }

        return dp[n].reduce((sum, val) => (sum + val) % MOD, 0);
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int CountVowelPermutation(int n) {
        int[][] dp = new int[n + 1][];
        for (int i = 0; i <= n; i++) {
            dp[i] = new int[5];
        }

        int[][] follows = new int[][] {
            new int[] {1},          // 'a' -> 'e'
            new int[] {0, 2},       // 'e' -> 'a', 'i'
            new int[] {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
            new int[] {2, 4},       // 'o' -> 'i', 'u'
            new int[] {0}           // 'u' -> 'a'
        };

        for (int v = 0; v < 5; v++) {
            dp[1][v] = 1;
        }

        for (int i = 2; i <= n; i++) {
            for (int v = 0; v < 5; v++) {
                foreach (int nextV in follows[v]) {
                    dp[i][v] = (dp[i][v] + dp[i - 1][nextV]) % MOD;
                }
            }
        }

        int result = 0;
        for (int v = 0; v < 5; v++) {
            result = (result + dp[n][v]) % MOD;
        }
        return result;
    }
}
```

```go
func countVowelPermutation(n int) int {
    MOD := int(1e9 + 7)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, 5)
    }

    follows := [][]int{
        {1},          // 'a' -> 'e'
        {0, 2},       // 'e' -> 'a', 'i'
        {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
        {2, 4},       // 'o' -> 'i', 'u'
        {0},          // 'u' -> 'a'
    }

    for v := 0; v < 5; v++ {
        dp[1][v] = 1
    }

    for i := 2; i <= n; i++ {
        for v := 0; v < 5; v++ {
            for _, nextV := range follows[v] {
                dp[i][v] = (dp[i][v] + dp[i-1][nextV]) % MOD
            }
        }
    }

    result := 0
    for v := 0; v < 5; v++ {
        result = (result + dp[n][v]) % MOD
    }
    return result
}
```

```kotlin
class Solution {
    fun countVowelPermutation(n: Int): Int {
        val MOD = 1_000_000_007
        val dp = Array(n + 1) { IntArray(5) }

        val follows = arrayOf(
            intArrayOf(1),          // 'a' -> 'e'
            intArrayOf(0, 2),       // 'e' -> 'a', 'i'
            intArrayOf(0, 1, 3, 4), // 'i' -> 'a', 'e', 'o', 'u'
            intArrayOf(2, 4),       // 'o' -> 'i', 'u'
            intArrayOf(0)           // 'u' -> 'a'
        )

        for (v in 0 until 5) {
            dp[1][v] = 1
        }

        for (i in 2..n) {
            for (v in 0 until 5) {
                for (nextV in follows[v]) {
                    dp[i][v] = (dp[i][v] + dp[i - 1][nextV]) % MOD
                }
            }
        }

        var result = 0
        for (v in 0 until 5) {
            result = (result + dp[n][v]) % MOD
        }
        return result
    }
}
```

```swift
class Solution {
    func countVowelPermutation(_ n: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = Array(repeating: Array(repeating: 0, count: 5), count: n + 1)

        let follows = [
            [1],          // 'a' -> 'e'
            [0, 2],       // 'e' -> 'a', 'i'
            [0, 1, 3, 4], // 'i' -> 'a', 'e', 'o', 'u'
            [2, 4],       // 'o' -> 'i', 'u'
            [0]           // 'u' -> 'a'
        ]

        for v in 0..<5 {
            dp[1][v] = 1
        }

        for i in 2...n {
            for v in 0..<5 {
                for nextV in follows[v] {
                    dp[i][v] = (dp[i][v] + dp[i - 1][nextV]) % MOD
                }
            }
        }

        var result = 0
        for v in 0..<5 {
            result = (result + dp[n][v]) % MOD
        }
        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

In the bottom-up approach, we only need the previous row to compute the current row. This means we can reduce space from `O(n)` to `O(1)` by using just two arrays of size 5 (or even one array with careful updates). We alternate between the current and previous state arrays.

### Algorithm

1. Initialize an array `dp` of size 5, all set to `1` (representing strings of length `1`).
2. For each length from `2` to `n`:
   - Create a new array `next_dp` of size 5.
   - For each vowel `v`, compute `next_dp[v]` as the sum of `dp[prev]` for all valid predecessors.
   - Replace `dp` with `next_dp`.
3. Sum all values in `dp`.
4. Return the result modulo `10^9 + 7`.

::tabs-start

```python
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        MOD = 10**9 + 7
        follows = [
            [1],           # 'a' -> 'e'
            [0, 2],        # 'e' -> 'a', 'i'
            [0, 1, 3, 4],  # 'i' -> 'a', 'e', 'o', 'u'
            [2, 4],        # 'o' -> 'i', 'u'
            [0]            # 'u' -> 'a'
        ]
        dp = [1] * 5

        for _ in range(2, n + 1):
            next_dp = [0] * 5
            for v in range(5):
                for nextV in follows[v]:
                    next_dp[v] = (next_dp[v] + dp[nextV]) % MOD
            dp = next_dp

        return sum(dp) % MOD
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int countVowelPermutation(int n) {
        int[][] follows = {
            {1},          // 'a' -> 'e'
            {0, 2},       // 'e' -> 'a', 'i'
            {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
            {2, 4},       // 'o' -> 'i', 'u'
            {0}           // 'u' -> 'a'
        };

        int[] dp = {1, 1, 1, 1, 1};

        for (int i = 2; i <= n; i++) {
            int[] nextDp = new int[5];
            for (int v = 0; v < 5; v++) {
                for (int nextV : follows[v]) {
                    nextDp[v] = (nextDp[v] + dp[nextV]) % MOD;
                }
            }
            dp = nextDp;
        }

        int result = 0;
        for (int count : dp) {
            result = (result + count) % MOD;
        }
        return result;
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

public:
    int countVowelPermutation(int n) {
        vector<vector<int>> follows = {
            {1},          // 'a' -> 'e'
            {0, 2},       // 'e' -> 'a', 'i'
            {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
            {2, 4},       // 'o' -> 'i', 'u'
            {0}           // 'u' -> 'a'
        };

        vector<int> dp(5, 1);

        for (int i = 2; i <= n; i++) {
            vector<int> nextDp(5, 0);
            for (int v = 0; v < 5; v++) {
                for (int nextV : follows[v]) {
                    nextDp[v] = (nextDp[v] + dp[nextV]) % MOD;
                }
            }
            dp = nextDp;
        }

        int result = 0;
        for (int count : dp) {
            result = (result + count) % MOD;
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countVowelPermutation(n) {
        const MOD = 1e9 + 7;
        const follows = [
            [1], // 'a' -> 'e'
            [0, 2], // 'e' -> 'a', 'i'
            [0, 1, 3, 4], // 'i' -> 'a', 'e', 'o', 'u'
            [2, 4], // 'o' -> 'i', 'u'
            [0], // 'u' -> 'a'
        ];

        let dp = [1, 1, 1, 1, 1];

        for (let i = 2; i <= n; i++) {
            const nextDp = [0, 0, 0, 0, 0];
            for (let v = 0; v < 5; v++) {
                for (const nextV of follows[v]) {
                    nextDp[v] = (nextDp[v] + dp[nextV]) % MOD;
                }
            }
            dp = nextDp;
        }

        return dp.reduce((sum, count) => (sum + count) % MOD, 0);
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int CountVowelPermutation(int n) {
        int[][] follows = new int[][] {
            new int[] {1},          // 'a' -> 'e'
            new int[] {0, 2},       // 'e' -> 'a', 'i'
            new int[] {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
            new int[] {2, 4},       // 'o' -> 'i', 'u'
            new int[] {0}           // 'u' -> 'a'
        };

        int[] dp = {1, 1, 1, 1, 1};

        for (int i = 2; i <= n; i++) {
            int[] nextDp = new int[5];
            for (int v = 0; v < 5; v++) {
                foreach (int nextV in follows[v]) {
                    nextDp[v] = (nextDp[v] + dp[nextV]) % MOD;
                }
            }
            dp = nextDp;
        }

        int result = 0;
        foreach (int count in dp) {
            result = (result + count) % MOD;
        }
        return result;
    }
}
```

```go
func countVowelPermutation(n int) int {
    MOD := int(1e9 + 7)
    follows := [][]int{
        {1},          // 'a' -> 'e'
        {0, 2},       // 'e' -> 'a', 'i'
        {0, 1, 3, 4}, // 'i' -> 'a', 'e', 'o', 'u'
        {2, 4},       // 'o' -> 'i', 'u'
        {0},          // 'u' -> 'a'
    }

    dp := []int{1, 1, 1, 1, 1}

    for i := 2; i <= n; i++ {
        nextDp := make([]int, 5)
        for v := 0; v < 5; v++ {
            for _, nextV := range follows[v] {
                nextDp[v] = (nextDp[v] + dp[nextV]) % MOD
            }
        }
        dp = nextDp
    }

    result := 0
    for _, count := range dp {
        result = (result + count) % MOD
    }
    return result
}
```

```kotlin
class Solution {
    fun countVowelPermutation(n: Int): Int {
        val MOD = 1_000_000_007
        val follows = arrayOf(
            intArrayOf(1),          // 'a' -> 'e'
            intArrayOf(0, 2),       // 'e' -> 'a', 'i'
            intArrayOf(0, 1, 3, 4), // 'i' -> 'a', 'e', 'o', 'u'
            intArrayOf(2, 4),       // 'o' -> 'i', 'u'
            intArrayOf(0)           // 'u' -> 'a'
        )

        var dp = intArrayOf(1, 1, 1, 1, 1)

        for (i in 2..n) {
            val nextDp = IntArray(5)
            for (v in 0 until 5) {
                for (nextV in follows[v]) {
                    nextDp[v] = (nextDp[v] + dp[nextV]) % MOD
                }
            }
            dp = nextDp
        }

        var result = 0
        for (count in dp) {
            result = (result + count) % MOD
        }
        return result
    }
}
```

```swift
class Solution {
    func countVowelPermutation(_ n: Int) -> Int {
        let MOD = 1_000_000_007
        let follows = [
            [1],          // 'a' -> 'e'
            [0, 2],       // 'e' -> 'a', 'i'
            [0, 1, 3, 4], // 'i' -> 'a', 'e', 'o', 'u'
            [2, 4],       // 'o' -> 'i', 'u'
            [0]           // 'u' -> 'a'
        ]

        var dp = [1, 1, 1, 1, 1]

        for _ in 2...n {
            var nextDp = [0, 0, 0, 0, 0]
            for v in 0..<5 {
                for nextV in follows[v] {
                    nextDp[v] = (nextDp[v] + dp[nextV]) % MOD
                }
            }
            dp = nextDp
        }

        var result = 0
        for count in dp {
            result = (result + count) % MOD
        }
        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we used array of size $5$.

---

## 5. Matrix Exponentiation

### Intuition

The transition between states can be represented as a matrix multiplication. If we define a transition matrix `T` where `T[i][j] = 1` if vowel `j` can follow vowel `i`, then multiplying the state vector by `T` gives the next state. To get the state after `n-1` transitions, we compute `T^(n-1)`. Matrix exponentiation allows us to compute this in `O(log n)` time instead of `O(n)`.

### Algorithm

1. Define the 5x5 transition matrix based on the vowel succession rules.
2. Implement matrix multiplication for 5x5 matrices.
3. Implement matrix exponentiation using binary exponentiation.
4. Compute `T^(n-1)` where `T` is the transition matrix.
5. The result is the sum of all elements in the resulting matrix (since we start with `1` of each vowel).
6. Return the result modulo `10^9 + 7`.

::tabs-start

```python
class Solution:
    MOD = 10**9 + 7

    class M:
        def __init__(self, n):
            self.a = [[0] * n for _ in range(n)]

        def __mul__(self, other):
            n = len(self.a)
            product = Solution.M(n)
            for i in range(n):
                for j in range(n):
                    for k in range(n):
                        product.a[i][k] = (product.a[i][k] + self.a[i][j] * other.a[j][k]) % Solution.MOD
            return product

    def matrixExpo(self, base, exp):
        n = len(base.a)
        result = Solution.M(n)
        for i in range(n):
            result.a[i][i] = 1
        while exp > 0:
            if exp % 2 == 1:
                result = result * base
            base = base * base
            exp //= 2
        return result

    def countVowelPermutation(self, n: int) -> int:
        follows = [
            [0, 1, 0, 0, 0],  # 'a' -> 'e'
            [1, 0, 1, 0, 0],  # 'e' -> 'a', 'i'
            [1, 1, 0, 1, 1],  # 'i' -> 'a', 'e', 'o', 'u'
            [0, 0, 1, 0, 1],  # 'o' -> 'i', 'u'
            [1, 0, 0, 0, 0]   # 'u' -> 'a'
        ]

        base = Solution.M(5)
        base.a = follows

        result = self.matrixExpo(base, n - 1)

        return sum(sum(row) for row in result.a) % self.MOD
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    static class M {
        int[][] a;

        M(int n) {
            a = new int[n][n];
        }

        M multiply(M other) {
            int n = a.length;
            M product = new M(n);

            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    for (int k = 0; k < n; k++) {
                        product.a[i][k] = (int) ((product.a[i][k] + 1L * a[i][j] * other.a[j][k]) % MOD);
                    }
                }
            }
            return product;
        }
    }

    private M matrixExpo(M base, int exp) {
        int n = base.a.length;
        M result = new M(n);
        for (int i = 0; i < n; i++) {
            result.a[i][i] = 1;
        }
        while (exp > 0) {
            if (exp % 2 == 1) {
                result = result.multiply(base);
            }
            base = base.multiply(base);
            exp /= 2;
        }
        return result;
    }

    public int countVowelPermutation(int n) {
        int[][] follows = {
            {0, 1, 0, 0, 0},  // 'a' -> 'e'
            {1, 0, 1, 0, 0},  // 'e' -> 'a', 'i'
            {1, 1, 0, 1, 1},  // 'i' -> 'a', 'e', 'o', 'u'
            {0, 0, 1, 0, 1},  // 'o' -> 'i', 'u'
            {1, 0, 0, 0, 0}   // 'u' -> 'a'
        };

        M base = new M(5);
        base.a = follows;

        M result = matrixExpo(base, n - 1);

        int ans = 0;
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                ans = (ans + result.a[i][j]) % MOD;
            }
        }
        return ans;
    }
}
```

```cpp
class Solution {
    static const int MOD = 1e9 + 7;

    struct M {
        vector<vector<int>> a;

        M(int n) {
            a.resize(n, vector<int>(n, 0));
        }

        M operator*(const M& other) const {
            int n = a.size();
            M product(n);

            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    for (int k = 0; k < n; k++) {
                        product.a[i][k] = (product.a[i][k] + a[i][j] * 1LL * other.a[j][k]) % MOD;
                    }
                }
            }
            return product;
        }
    };

    M matrixExpo(M base, int exp) {
        int n = base.a.size();
        M result(n);

        for (int i = 0; i < n; i++) {
            result.a[i][i] = 1;
        }

        while (exp > 0) {
            if (exp % 2 == 1) {
                result = result * base;
            }
            base = base * base;
            exp /= 2;
        }

        return result;
    }

public:
    int countVowelPermutation(int n) {
        vector<vector<int>> follows = {
            {0, 1, 0, 0, 0},  // 'a' -> 'e'
            {1, 0, 1, 0, 0},  // 'e' -> 'a', 'i'
            {1, 1, 0, 1, 1},  // 'i' -> 'a', 'e', 'o', 'u'
            {0, 0, 1, 0, 1},  // 'o' -> 'i', 'u'
            {1, 0, 0, 0, 0}   // 'u' -> 'a'
        };

        M base(5);
        base.a = follows;

        M result = matrixExpo(base, n - 1);

        int ans = 0;
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                ans = (ans + result.a[i][j]) % MOD;
            }
        }

        return ans;
    }
};
```

```javascript
class M {
    /**
     * @constructor
     * @param {number} n
     */
    constructor(n) {
        this.MOD = 1e9 + 7;
        this.a = Array.from({ length: n }, () => Array(n).fill(0));
    }

    /**
     * @param {M}
     * @return {M}
     */
    multiply(other) {
        const n = this.a.length;
        const product = new M(n);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                let sum = 0n;
                for (let k = 0; k < n; k++) {
                    sum += BigInt(this.a[i][k]) * BigInt(other.a[k][j]);
                }
                product.a[i][j] = Number(sum % BigInt(this.MOD));
            }
        }
        return product;
    }
}

class Solution {
    /**
     * @param {M}
     * @param {number} exp
     * @return {M}
     */
    matrixExpo(base, exp) {
        const n = base.a.length;
        let result = new M(n);
        for (let i = 0; i < n; i++) {
            result.a[i][i] = 1;
        }
        while (exp > 0) {
            if (exp & 1) {
                result = result.multiply(base);
            }
            base = base.multiply(base);
            exp >>= 1;
        }
        return result;
    }

    /**
     * @param {number} n
     * @return {number}
     */
    countVowelPermutation(n) {
        const MOD = 1e9 + 7;
        const follows = [
            [0, 1, 0, 0, 0], // 'a' -> 'e'
            [1, 0, 1, 0, 0], // 'e' -> 'a', 'i'
            [1, 1, 0, 1, 1], // 'i' -> 'a', 'e', 'o', 'u'
            [0, 0, 1, 0, 1], // 'o' -> 'i', 'u'
            [1, 0, 0, 0, 0], // 'u' -> 'a'
        ];
        const base = new M(5);
        base.a = follows;
        const result = this.matrixExpo(base, n - 1);
        let ans = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                ans = (ans + result.a[i][j]) % MOD;
            }
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    private class M {
        public long[,] a;

        public M(int n) {
            a = new long[n, n];
        }

        public M Multiply(M other) {
            int n = a.GetLength(0);
            M product = new M(n);
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    for (int k = 0; k < n; k++) {
                        product.a[i, k] = (product.a[i, k] + a[i, j] * other.a[j, k]) % MOD;
                    }
                }
            }
            return product;
        }
    }

    private M MatrixExpo(M baseM, int exp) {
        int n = baseM.a.GetLength(0);
        M result = new M(n);
        for (int i = 0; i < n; i++) {
            result.a[i, i] = 1;
        }
        while (exp > 0) {
            if (exp % 2 == 1) {
                result = result.Multiply(baseM);
            }
            baseM = baseM.Multiply(baseM);
            exp /= 2;
        }
        return result;
    }

    public int CountVowelPermutation(int n) {
        int[,] follows = {
            {0, 1, 0, 0, 0},  // 'a' -> 'e'
            {1, 0, 1, 0, 0},  // 'e' -> 'a', 'i'
            {1, 1, 0, 1, 1},  // 'i' -> 'a', 'e', 'o', 'u'
            {0, 0, 1, 0, 1},  // 'o' -> 'i', 'u'
            {1, 0, 0, 0, 0}   // 'u' -> 'a'
        };

        M baseM = new M(5);
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                baseM.a[i, j] = follows[i, j];
            }
        }

        M result = MatrixExpo(baseM, n - 1);

        long ans = 0;
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                ans = (ans + result.a[i, j]) % MOD;
            }
        }
        return (int)ans;
    }
}
```

```go
func countVowelPermutation(n int) int {
    MOD := int64(1e9 + 7)

    type M struct {
        a [][]int64
    }

    newMatrix := func(size int) M {
        a := make([][]int64, size)
        for i := range a {
            a[i] = make([]int64, size)
        }
        return M{a: a}
    }

    multiply := func(m1, m2 M) M {
        size := len(m1.a)
        product := newMatrix(size)
        for i := 0; i < size; i++ {
            for j := 0; j < size; j++ {
                for k := 0; k < size; k++ {
                    product.a[i][k] = (product.a[i][k] + m1.a[i][j]*m2.a[j][k]) % MOD
                }
            }
        }
        return product
    }

    matrixExpo := func(base M, exp int) M {
        size := len(base.a)
        result := newMatrix(size)
        for i := 0; i < size; i++ {
            result.a[i][i] = 1
        }
        for exp > 0 {
            if exp%2 == 1 {
                result = multiply(result, base)
            }
            base = multiply(base, base)
            exp /= 2
        }
        return result
    }

    follows := [][]int64{
        {0, 1, 0, 0, 0}, // 'a' -> 'e'
        {1, 0, 1, 0, 0}, // 'e' -> 'a', 'i'
        {1, 1, 0, 1, 1}, // 'i' -> 'a', 'e', 'o', 'u'
        {0, 0, 1, 0, 1}, // 'o' -> 'i', 'u'
        {1, 0, 0, 0, 0}, // 'u' -> 'a'
    }

    base := newMatrix(5)
    base.a = follows

    result := matrixExpo(base, n-1)

    var ans int64
    for i := 0; i < 5; i++ {
        for j := 0; j < 5; j++ {
            ans = (ans + result.a[i][j]) % MOD
        }
    }
    return int(ans)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007L

    private class M(n: Int) {
        val a: Array<LongArray> = Array(n) { LongArray(n) }

        fun multiply(other: M, mod: Long): M {
            val n = a.size
            val product = M(n)
            for (i in 0 until n) {
                for (j in 0 until n) {
                    for (k in 0 until n) {
                        product.a[i][k] = (product.a[i][k] + a[i][j] * other.a[j][k]) % mod
                    }
                }
            }
            return product
        }
    }

    private fun matrixExpo(base: M, exp: Int): M {
        var baseM = base
        var e = exp
        val n = baseM.a.size
        var result = M(n)
        for (i in 0 until n) {
            result.a[i][i] = 1
        }
        while (e > 0) {
            if (e % 2 == 1) {
                result = result.multiply(baseM, MOD)
            }
            baseM = baseM.multiply(baseM, MOD)
            e /= 2
        }
        return result
    }

    fun countVowelPermutation(n: Int): Int {
        val follows = arrayOf(
            longArrayOf(0, 1, 0, 0, 0), // 'a' -> 'e'
            longArrayOf(1, 0, 1, 0, 0), // 'e' -> 'a', 'i'
            longArrayOf(1, 1, 0, 1, 1), // 'i' -> 'a', 'e', 'o', 'u'
            longArrayOf(0, 0, 1, 0, 1), // 'o' -> 'i', 'u'
            longArrayOf(1, 0, 0, 0, 0)  // 'u' -> 'a'
        )

        val base = M(5)
        for (i in 0 until 5) {
            for (j in 0 until 5) {
                base.a[i][j] = follows[i][j]
            }
        }

        val result = matrixExpo(base, n - 1)

        var ans = 0L
        for (i in 0 until 5) {
            for (j in 0 until 5) {
                ans = (ans + result.a[i][j]) % MOD
            }
        }
        return ans.toInt()
    }
}
```

```swift
class Solution {
    private let MOD = 1_000_000_007

    private class M {
        var a: [[Int]]

        init(_ n: Int) {
            a = Array(repeating: Array(repeating: 0, count: n), count: n)
        }

        func multiply(_ other: M, _ mod: Int) -> M {
            let n = a.count
            let product = M(n)
            for i in 0..<n {
                for j in 0..<n {
                    for k in 0..<n {
                        product.a[i][k] = (product.a[i][k] + a[i][j] * other.a[j][k]) % mod
                    }
                }
            }
            return product
        }
    }

    private func matrixExpo(_ base: M, _ exp: Int) -> M {
        var baseM = base
        var e = exp
        let n = baseM.a.count
        let result = M(n)
        for i in 0..<n {
            result.a[i][i] = 1
        }
        var res = result
        while e > 0 {
            if e % 2 == 1 {
                res = res.multiply(baseM, MOD)
            }
            baseM = baseM.multiply(baseM, MOD)
            e /= 2
        }
        return res
    }

    func countVowelPermutation(_ n: Int) -> Int {
        let follows = [
            [0, 1, 0, 0, 0], // 'a' -> 'e'
            [1, 0, 1, 0, 0], // 'e' -> 'a', 'i'
            [1, 1, 0, 1, 1], // 'i' -> 'a', 'e', 'o', 'u'
            [0, 0, 1, 0, 1], // 'o' -> 'i', 'u'
            [1, 0, 0, 0, 0]  // 'u' -> 'a'
        ]

        let base = M(5)
        for i in 0..<5 {
            for j in 0..<5 {
                base.a[i][j] = follows[i][j]
            }
        }

        let result = matrixExpo(base, n - 1)

        var ans = 0
        for i in 0..<5 {
            for j in 0..<5 {
                ans = (ans + result.a[i][j]) % MOD
            }
        }
        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m ^ 3 \log n)$
- Space complexity: $O(m ^ 2)$

> Where $m$ is the size of the matrix used in matrix exponentiation $(5 X 5)$ and $n$ is the length of the permutation.

---

## Common Pitfalls

### Confusing "Follows" vs "Precedes" Transitions

The problem states which vowels can follow each vowel, but the DP recurrence requires knowing which vowels can precede each vowel. Mixing up the direction leads to wrong transition rules.

```python
# Incorrect - using "follows" direction for DP[i][v]
# This computes what can come AFTER v, not what can come BEFORE v
dp[i][a] = dp[i-1][a]  # wrong: 'a' follows 'a'?

# Correct - 'a' can be preceded by 'e', 'i', or 'u'
dp[i][a] = dp[i-1][e] + dp[i-1][i] + dp[i-1][u]
```

### Forgetting Modulo in Intermediate Sums

With large `n`, intermediate sums overflow before taking the final modulo. Apply modulo after each addition to keep values within bounds.

```python
# Incorrect - sum overflows before modulo
total = 0
for next in follows[v]:
    total += dfs(i + 1, next)
return total % MOD

# Correct - apply modulo after each addition
total = 0
for next in follows[v]:
    total = (total + dfs(i + 1, next)) % MOD
return total
```

### Incorrect Matrix Exponentiation Base Case

When using matrix exponentiation, computing `T^n` instead of `T^(n-1)` is a common error. The initial state already represents strings of length 1, so only `n-1` transitions are needed.

```python
# Incorrect - one extra transition
result = matrix_expo(base, n)

# Correct - n-1 transitions from length 1 to length n
result = matrix_expo(base, n - 1)
```

### Not Handling n=1 Edge Case

For `n=1`, the answer is simply 5 (one for each vowel). Some implementations with matrix exponentiation or DP loops may fail if they do not handle this boundary correctly.

```python
# Incorrect - matrix_expo with exp=0 may not return identity
def countVowelPermutation(n):
    return sum_matrix(matrix_expo(base, n - 1))  # fails if n=1 and expo not handled

# Correct - either handle n=1 explicitly or ensure expo(M, 0) returns identity
def countVowelPermutation(n):
    if n == 1:
        return 5
    return sum_matrix(matrix_expo(base, n - 1))
```

### Integer Overflow in Matrix Multiplication

In languages without arbitrary precision integers (like Java, C++), multiplying two large values before taking modulo causes overflow. Cast to a larger type or restructure the multiplication.

```cpp
// Incorrect - integer overflow before modulo
product[i][k] = (product[i][k] + a[i][j] * b[j][k]) % MOD;

// Correct - use long long to prevent overflow
product[i][k] = (product[i][k] + (long long)a[i][j] * b[j][k]) % MOD;
```
