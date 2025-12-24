## 1. Recursion

### Intuition

This problem asks whether a string containing `'('`, `')'`, and `'*'` can be interpreted as a **valid parentheses string**.

The tricky part is `'*'`, because it can represent:
- `'('`
- `')'`
- an empty string `''`

Using recursion, we try **all valid interpretations** of the string while keeping track of how many opening parentheses are currently unmatched.

The recursive function answers:  
**“Is it possible to make the substring starting at index `i` valid, given that we currently have `open` unmatched `'('`?”**

Important rules:
- The number of open parentheses (`open`) should **never be negative**
- At the end of the string, all open parentheses must be closed (`open == 0`)

### Algorithm

1. Define a recursive function `dfs(i, open)`:
   - `i` is the current index in the string
   - `open` is the number of unmatched `'('` seen so far
2. If `open < 0`:
   - Too many closing parentheses, return `False`
3. If `i` reaches the end of the string:
   - Return `True` only if `open == 0`
4. If `s[i] == '('`:
   - Recurse with `dfs(i + 1, open + 1)`
5. If `s[i] == ')'`:
   - Recurse with `dfs(i + 1, open - 1)`
6. If `s[i] == '*'`:
   - Try all three possibilities:
     - treat `'*'` as empty → `dfs(i + 1, open)`
     - treat `'*'` as `'('` → `dfs(i + 1, open + 1)`
     - treat `'*'` as `')'` → `dfs(i + 1, open - 1)`
   - If any option returns `True`, return `True`
7. Start the recursion with `dfs(0, 0)`
8. Return the final result

::tabs-start

```python
class Solution:
    def checkValidString(self, s: str) -> bool:

        def dfs(i, open):
            if open < 0:
                return False
            if i == len(s):
                return open == 0

            if s[i] == '(':
                return dfs(i + 1, open + 1)
            elif s[i] == ')':
                return dfs(i + 1, open - 1)
            else:
                return (dfs(i + 1, open) or
                        dfs(i + 1, open + 1) or
                        dfs(i + 1, open - 1))
        return dfs(0, 0)
```

```java
public class Solution {
    public boolean checkValidString(String s) {

        return dfs(0, 0, s);
    }

    private boolean dfs(int i, int open, String s) {
        if (open < 0) return false;
        if (i == s.length()) return open == 0;

        if (s.charAt(i) == '(') {
            return dfs(i + 1, open + 1, s);
        } else if (s.charAt(i) == ')') {
            return dfs(i + 1, open - 1, s);
        } else {
            return dfs(i + 1, open, s) ||
                   dfs(i + 1, open + 1, s) ||
                   dfs(i + 1, open - 1, s);
        }
    }
}
```

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        return dfs(0, 0, s);
    }

private:
    bool dfs(int i, int open, const string& s) {
        if (open < 0) return false;
        if (i == s.size()) return open == 0;

        if (s[i] == '(') {
            return dfs(i + 1, open + 1, s);
        } else if (s[i] == ')') {
            return dfs(i + 1, open - 1, s);
        } else {
            return dfs(i + 1, open, s) ||
                   dfs(i + 1, open + 1, s) ||
                   dfs(i + 1, open - 1, s);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        function dfs(i, open) {
            if (open < 0) return false;
            if (i === s.length) return open === 0;

            if (s[i] === '(') {
                return dfs(i + 1, open + 1);
            } else if (s[i] === ')') {
                return dfs(i + 1, open - 1);
            } else {
                return (
                    dfs(i + 1, open) ||
                    dfs(i + 1, open + 1) ||
                    dfs(i + 1, open - 1)
                );
            }
        }

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public bool CheckValidString(string s) {
        return Dfs(0, 0, s);
    }

    private bool Dfs(int i, int open, string s) {
        if (open < 0) return false;
        if (i == s.Length) return open == 0;

        if (s[i] == '(') {
            return Dfs(i + 1, open + 1, s);
        } else if (s[i] == ')') {
            return Dfs(i + 1, open - 1, s);
        } else {
            return Dfs(i + 1, open, s) ||
                   Dfs(i + 1, open + 1, s) ||
                   Dfs(i + 1, open - 1, s);
        }
    }
}
```

```go
func checkValidString(s string) bool {
    var dfs func(i, open int) bool
    dfs = func(i, open int) bool {
        if open < 0 {
            return false
        }
        if i == len(s) {
            return open == 0
        }

        if s[i] == '(' {
            return dfs(i+1, open+1)
        } else if s[i] == ')' {
            return dfs(i+1, open-1)
        } else {
            return (dfs(i+1, open) ||
                    dfs(i+1, open+1) ||
                    dfs(i+1, open-1))
        }
    }
    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun checkValidString(s: String): Boolean {

        fun dfs(i: Int, open: Int): Boolean {
            if (open < 0) {
                return false
            }
            if (i == s.length) {
                return open == 0
            }

            return when (s[i]) {
                '(' -> dfs(i + 1, open + 1)
                ')' -> dfs(i + 1, open - 1)
                else -> dfs(i + 1, open) || dfs(i + 1, open + 1) || dfs(i + 1, open - 1)
            }
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func checkValidString(_ s: String) -> Bool {
        let chars = Array(s)

        func dfs(_ i: Int, _ open: Int) -> Bool {
            if open < 0 { return false }
            if i == chars.count { return open == 0 }

            if chars[i] == "(" {
                return dfs(i + 1, open + 1)
            } else if chars[i] == ")" {
                return dfs(i + 1, open - 1)
            } else {
                return dfs(i + 1, open) ||
                       dfs(i + 1, open + 1) ||
                       dfs(i + 1, open - 1)
            }
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(3 ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

### Intuition

We need to decide if a string containing `'('`, `')'`, and `'*'` can be turned into a **valid parentheses string**.

The character `'*'` is flexible and can act as:
- `'('`
- `')'`
- empty `''`

A brute-force recursion tries all possibilities, but it repeats the same work for the same positions and open counts.  
To avoid that, we use **top-down dynamic programming (memoization)**.

We track two things:
- `i`: where we are in the string
- `open`: how many `'('` are currently unmatched

The function `dfs(i, open)` answers:  
**“Can the substring `s[i:]` be made valid if we currently have `open` unmatched opening parentheses?”**

Rules:
- `open` must never go below `0`
- when we reach the end, we need `open == 0`

### Algorithm

1. Let `n = len(s)`.
2. Create a 2D memo table `memo` where:
   - `memo[i][open]` stores whether `dfs(i, open)` is `True` or `False`
3. Define a recursive function `dfs(i, open)`:
   - If `open < 0`, return `False` (too many `')'`)
   - If `i == n`, return `True` only if `open == 0`
   - If `memo[i][open]` is already computed, return it
4. Transition based on `s[i]`:
   - If `'('`: move forward with `open + 1`
   - If `')'`: move forward with `open - 1`
   - If `'*'`: try all three options:
     - treat as empty → `dfs(i + 1, open)`
     - treat as `'('` → `dfs(i + 1, open + 1)`
     - treat as `')'` → `dfs(i + 1, open - 1)`
     - if any option works, the result is `True`
5. Store the result in `memo[i][open]` and return it
6. Start with `dfs(0, 0)` and return the final answer

::tabs-start

```python
class Solution:
    def checkValidString(self, s: str) -> bool:
        n = len(s)
        memo = [[None] * (n + 1) for _ in range(n + 1)]

        def dfs(i, open):
            if open < 0:
                return False
            if i == n:
                return open == 0
            if memo[i][open] is not None:
                return memo[i][open]

            if s[i] == '(':
                result = dfs(i + 1, open + 1)
            elif s[i] == ')':
                result = dfs(i + 1, open - 1)
            else:
                result = (dfs(i + 1, open) or
                          dfs(i + 1, open + 1) or
                          dfs(i + 1, open - 1))

            memo[i][open] = result
            return result

        return dfs(0, 0)
```

```java
public class Solution {
    public boolean checkValidString(String s) {
        int n = s.length();
        Boolean[][] memo = new Boolean[n + 1][n + 1];
        return dfs(0, 0, s, memo);
    }

    private boolean dfs(int i, int open, String s, Boolean[][] memo) {
        if (open < 0) return false;
        if (i == s.length()) return open == 0;

        if (memo[i][open] != null) return memo[i][open];

        boolean result;
        if (s.charAt(i) == '(') {
            result = dfs(i + 1, open + 1, s, memo);
        } else if (s.charAt(i) == ')') {
            result = dfs(i + 1, open - 1, s, memo);
        } else {
            result = (dfs(i + 1, open, s, memo) ||
                      dfs(i + 1, open + 1, s, memo) ||
                      dfs(i + 1, open - 1, s, memo));
        }

        memo[i][open] = result;
        return result;
    }
}
```

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        int n = s.size();
        memo = vector<vector<int>>(n + 1, vector<int>(n + 1, -1));
        return dfs(0, 0, s);
    }

private:
    vector<vector<int>> memo;

    bool dfs(int i, int open, const string& s) {
        if (open < 0) return false;
        if (i == s.size()) return open == 0;

        if (memo[i][open] != -1) return memo[i][open] == 1;

        bool result;
        if (s[i] == '(') {
            result = dfs(i + 1, open + 1, s);
        } else if (s[i] == ')') {
            result = dfs(i + 1, open - 1, s);
        } else {
            result = (dfs(i + 1, open, s) ||
                      dfs(i + 1, open + 1, s) ||
                      dfs(i + 1, open - 1, s));
        }

        memo[i][open] = result ? 1 : 0;
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        const n = s.length;
        const memo = Array.from({ length: n + 1 }, () =>
            Array(n + 1).fill(null),
        );

        function dfs(i, open) {
            if (open < 0) return false;
            if (i === n) return open === 0;

            if (memo[i][open] !== null) return memo[i][open];

            let result;
            if (s[i] === '(') {
                result = dfs(i + 1, open + 1);
            } else if (s[i] === ')') {
                result = dfs(i + 1, open - 1);
            } else {
                result =
                    dfs(i + 1, open) ||
                    dfs(i + 1, open + 1) ||
                    dfs(i + 1, open - 1);
            }

            memo[i][open] = result;
            return result;
        }

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public bool CheckValidString(string s) {
        int n = s.Length;
        bool?[,] memo = new bool?[n + 1, n + 1];
        return Dfs(0, 0, s, memo);
    }

    private bool Dfs(int i, int open, string s, bool?[,] memo) {
        if (open < 0) return false;
        if (i == s.Length) return open == 0;

        if (memo[i, open].HasValue) return memo[i, open].Value;

        bool result;
        if (s[i] == '(') {
            result = Dfs(i + 1, open + 1, s, memo);
        } else if (s[i] == ')') {
            result = Dfs(i + 1, open - 1, s, memo);
        } else {
            result = Dfs(i + 1, open, s, memo) ||
                     Dfs(i + 1, open + 1, s, memo) ||
                     Dfs(i + 1, open - 1, s, memo);
        }

        memo[i, open] = result;
        return result;
    }
}
```

```go
func checkValidString(s string) bool {
    memo := make([][]int, len(s)+1)
    for i := range memo {
        memo[i] = make([]int, len(s)+1)
        for j := range memo[i] {
            memo[i][j] = -1
        }
    }

    var dfs func(i, open int) bool
    dfs = func(i, open int) bool {
        if open < 0 {
            return false
        }
        if i == len(s) {
            return open == 0
        }
        if memo[i][open] != -1 {
            return memo[i][open] == 1
        }

        result := false
        if s[i] == '(' {
            result = dfs(i+1, open+1)
        } else if s[i] == ')' {
            result = dfs(i+1, open-1)
        } else {
            result = (dfs(i+1, open) ||
                      dfs(i+1, open+1) ||
                      dfs(i+1, open-1))
        }

        memo[i][open] = 1
        if !result {
            memo[i][open] = 0
        }
        return result
    }
    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun checkValidString(s: String): Boolean {
        val memo = Array(s.length + 1) { IntArray(s.length + 1) { -1 } }

        fun dfs(i: Int, open: Int): Boolean {
            if (open < 0) return false
            if (i == s.length) return open == 0
            if (memo[i][open] != -1) return memo[i][open] == 1

            val result = when (s[i]) {
                '(' -> dfs(i + 1, open + 1)
                ')' -> dfs(i + 1, open - 1)
                else -> (dfs(i + 1, open) ||
                         dfs(i + 1, open + 1) ||
                         dfs(i + 1, open - 1))
            }

            memo[i][open] = if (result) 1 else 0
            return result
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func checkValidString(_ s: String) -> Bool {
        let n = s.count
        let sArr = Array(s)
        var memo = Array(
            repeating: Array<Bool?>(repeating: nil, count: n + 1),
            count: n + 1
        )

        func dfs(_ i: Int, _ open: Int) -> Bool {
            if open < 0 {
                return false
            }
            if i == n {
                return open == 0
            }
            if let memoized = memo[i][open] {
                return memoized
            }

            let result: Bool
            if sArr[i] == "(" {
                result = dfs(i + 1, open + 1)
            } else if sArr[i] == ")" {
                result = dfs(i + 1, open - 1)
            } else {
                result = dfs(i + 1, open) ||
                         dfs(i + 1, open + 1) ||
                         dfs(i + 1, open - 1)
            }

            memo[i][open] = result
            return result
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We need to check if a string containing `'('`, `')'`, and `'*'` can be interpreted as a **valid parentheses string**.

A helpful way to solve this is to track how many opening parentheses are currently unmatched:
- `open` = number of `'('` we still need to close

The tricky character is `'*'`, because it can act as:
- `'('` (increase `open`)
- `')'` (decrease `open`)
- empty (keep `open` the same)

In bottom-up DP, we build answers for smaller suffixes first.

We define:
- `dp[i][open]` = whether it is possible to make `s[i:]` valid if we currently have `open` unmatched `'('`

We fill this table from the end of the string back to the start.

### Algorithm

1. Let `n = len(s)`.
2. Create a 2D table `dp` of size `(n + 1) × (n + 1)` initialized to `False`.
3. Base case:
   - `dp[n][0] = True`  
     (when we are past the end of the string, it is valid only if there are no unmatched `'('`)
4. Fill the table backwards:
   - iterate `i` from `n - 1` down to `0`
   - iterate `open` from `0` up to `n - 1`
5. For each state `(i, open)`, compute whether we can match `s[i]`:
   - If `s[i] == '*'`:
     - treat as `'('` → check `dp[i + 1][open + 1]`
     - treat as `')'` → check `dp[i + 1][open - 1]` (only if `open > 0`)
     - treat as empty → check `dp[i + 1][open]`
     - if any is `True`, set `dp[i][open] = True`
   - If `s[i] == '('`:
     - must increase open → check `dp[i + 1][open + 1]`
   - If `s[i] == ')'`:
     - must decrease open → only possible if `open > 0`, check `dp[i + 1][open - 1]`
6. The final answer is `dp[0][0]`:
   - starting from the beginning with `0` unmatched `'('`
7. Return `dp[0][0]`

::tabs-start

```python
class Solution:
    def checkValidString(self, s: str) -> bool:
        n = len(s)
        dp = [[False] * (n + 1) for _ in range(n + 1)]
        dp[n][0] = True

        for i in range(n - 1, -1, -1):
            for open in range(n):
                res = False
                if s[i] == '*':
                    res |= dp[i + 1][open + 1]
                    if open > 0:
                        res |= dp[i + 1][open - 1]
                    res |= dp[i + 1][open]
                else:
                    if s[i] == '(':
                        res |= dp[i + 1][open + 1]
                    elif open > 0:
                        res |= dp[i + 1][open - 1]
                dp[i][open] = res

        return dp[0][0]
```

```java
public class Solution {
    public boolean checkValidString(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n + 1][n + 1];
        dp[n][0] = true;

        for (int i = n - 1; i >= 0; i--) {
            for (int open = 0; open < n; open++) {
                boolean res = false;
                if (s.charAt(i) == '*') {
                    res |= dp[i + 1][open + 1];
                    if (open > 0) res |= dp[i + 1][open - 1];
                    res |= dp[i + 1][open];
                } else {
                    if (s.charAt(i) == '(') {
                        res |= dp[i + 1][open + 1];
                    } else if (open > 0) {
                        res |= dp[i + 1][open - 1];
                    }
                }
                dp[i][open] = res;
            }
        }
        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        int n = s.size();
        vector<vector<bool>> dp(n + 1, vector<bool>(n + 1, false));
        dp[n][0] = true;

        for (int i = n - 1; i >= 0; --i) {
            for (int open = 0; open < n; ++open) {
                bool res = false;
                if (s[i] == '*') {
                    res |= dp[i + 1][open + 1];
                    if (open > 0) res |= dp[i + 1][open - 1];
                    res |= dp[i + 1][open];
                } else {
                    if (s[i] == '(') {
                        res |= dp[i + 1][open + 1];
                    } else if (open > 0) {
                        res |= dp[i + 1][open - 1];
                    }
                }
                dp[i][open] = res;
            }
        }
        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        const n = s.length;
        const dp = Array.from({ length: n + 1 }, () =>
            Array(n + 1).fill(false),
        );
        dp[n][0] = true;

        for (let i = n - 1; i >= 0; i--) {
            for (let open = 0; open < n; open++) {
                let res = false;
                if (s[i] === '*') {
                    res ||= dp[i + 1][open + 1];
                    if (open > 0) res ||= dp[i + 1][open - 1];
                    res ||= dp[i + 1][open];
                } else {
                    if (s[i] === '(') {
                        res ||= dp[i + 1][open + 1];
                    } else if (open > 0) {
                        res ||= dp[i + 1][open - 1];
                    }
                }
                dp[i][open] = res;
            }
        }
        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public bool CheckValidString(string s) {
        int n = s.Length;
        bool[,] dp = new bool[n + 1, n + 1];
        dp[n, 0] = true;

        for (int i = n - 1; i >= 0; i--) {
            for (int open = 0; open < n; open++) {
                bool res = false;
                if (s[i] == '*') {
                    res |= dp[i + 1, open + 1];
                    if (open > 0) res |= dp[i + 1, open - 1];
                    res |= dp[i + 1, open];
                } else {
                    if (s[i] == '(') {
                        res |= dp[i + 1, open + 1];
                    } else if (open > 0) {
                        res |= dp[i + 1, open - 1];
                    }
                }
                dp[i, open] = res;
            }
        }
        return dp[0, 0];
    }
}
```

```go
func checkValidString(s string) bool {
    n := len(s)
    dp := make([][]bool, n+1)
    for i := range dp {
        dp[i] = make([]bool, n+1)
    }
    dp[n][0] = true

    for i := n - 1; i >= 0; i-- {
        for open := 0; open < n; open++ {
            res := false
            if s[i] == '*' {
                res = dp[i+1][open+1]
                if open > 0 {
                    res = res || dp[i+1][open-1]
                }
                res = res || dp[i+1][open]
            } else {
                if s[i] == '(' {
                    res = dp[i+1][open+1]
                } else if open > 0 {
                    res = dp[i+1][open-1]
                }
            }
            dp[i][open] = res
        }
    }
    return dp[0][0]
}
```

```kotlin
class Solution {
    fun checkValidString(s: String): Boolean {
        val n = s.length
        val dp = Array(n + 1) { BooleanArray(n + 1) }
        dp[n][0] = true

        for (i in n - 1 downTo 0) {
            for (open in 0 until n) {
                var res = false
                if (s[i] == '*') {
                    res = dp[i + 1][open + 1]
                    if (open > 0) {
                        res = res || dp[i + 1][open - 1]
                    }
                    res = res || dp[i + 1][open]
                } else {
                    if (s[i] == '(') {
                        res = dp[i + 1][open + 1]
                    } else if (open > 0) {
                        res = dp[i + 1][open - 1]
                    }
                }
                dp[i][open] = res
            }
        }
        return dp[0][0]
    }
}
```

```swift
class Solution {
    func checkValidString(_ s: String) -> Bool {
        let n = s.count
        var dp = Array(repeating: Array(repeating: false, count: n + 1), count: n + 1)
        dp[n][0] = true

        let chars = Array(s)

        for i in stride(from: n - 1, through: 0, by: -1) {
            for open in 0..<n {
                var res = false
                if chars[i] == "*" {
                    res = res || dp[i + 1][open + 1]
                    if open > 0 {
                        res = res || dp[i + 1][open - 1]
                    }
                    res = res || dp[i + 1][open]
                } else {
                    if chars[i] == "(" {
                        res = res || dp[i + 1][open + 1]
                    } else if open > 0 {
                        res = res || dp[i + 1][open - 1]
                    }
                }
                dp[i][open] = res
            }
        }

        return dp[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

We need to check if a string containing `'('`, `')'`, and `'*'` can be interpreted as a **valid parentheses string**.

A common DP idea is to track how many opening parentheses are currently unmatched:
- `open` = number of `'('` that still need to be closed

In the 2D bottom-up DP version:
- `dp[i][open]` told us whether `s[i:]` can be valid with `open` unmatched `'('`

But notice something important:
- to compute values for position `i`, we only need values from position `i + 1`

So we don’t need the full 2D table. We can keep just one 1D array for the “next row” and build a new one for the “current row”.

Here:
- `dp[open]` represents the answer for the suffix starting at `i + 1`
- `new_dp[open]` represents the answer for the suffix starting at `i`

### Algorithm

1. Let `n = len(s)`.
2. Create a boolean array `dp` of size `n + 1`:
   - `dp[open]` represents whether `s[i+1:]` can be valid with `open` unmatched `'('`
3. Initialize the base case (when we are past the end of the string):
   - `dp[0] = True` (empty string is valid if `open == 0`)
   - all other `dp[open]` are `False`
4. Iterate `i` from `n - 1` down to `0`:
   - Create a fresh array `new_dp` of size `n + 1` initialized to `False`
5. For each possible `open` from `0` to `n - 1`, update based on `s[i]`:
   - If `s[i] == '*'`, we try all three options:
     - treat as `'('` → check `dp[open + 1]`
     - treat as `')'` → check `dp[open - 1]` (only if `open > 0`)
     - treat as empty → check `dp[open]`
     - set `new_dp[open]` to `True` if any option works
   - If `s[i] == '('`:
     - it increases the unmatched count → check `dp[open + 1]`
   - If `s[i] == ')'`:
     - it decreases the unmatched count → only possible if `open > 0`, check `dp[open - 1]`
6. After filling `new_dp`, assign `dp = new_dp`
7. The final answer is `dp[0]` (start from the beginning with zero unmatched `'('`)
8. Return `dp[0]`

::tabs-start

```python
class Solution:
    def checkValidString(self, s: str) -> bool:
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True

        for i in range(n - 1, -1, -1):
            new_dp = [False] * (n + 1)
            for open in range(n):
                if s[i] == '*':
                    new_dp[open] = (dp[open + 1] or
                                    (open > 0 and dp[open - 1]) or
                                    dp[open])
                elif s[i] == '(':
                    new_dp[open] = dp[open + 1]
                elif open > 0:
                    new_dp[open] = dp[open - 1]
            dp = new_dp

        return dp[0]
```

```java
public class Solution {
    public boolean checkValidString(String s) {
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;

        for (int i = n - 1; i >= 0; i--) {
            boolean[] newDp = new boolean[n + 1];
            for (int open = 0; open < n; open++) {
                if (s.charAt(i) == '*') {
                    newDp[open] = dp[open + 1] ||
                                  (open > 0 && dp[open - 1]) || dp[open];
                } else if (s.charAt(i) == '(') {
                    newDp[open] = dp[open + 1];
                } else if (open > 0) {
                    newDp[open] = dp[open - 1];
                }
            }
            dp = newDp;
        }
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true;

        for (int i = n - 1; i >= 0; --i) {
            vector<bool> newDp(n + 1, false);
            for (int open = 0; open < n; ++open) {
                if (s[i] == '*') {
                    newDp[open] = dp[open + 1] ||
                                  (open > 0 && dp[open - 1]) || dp[open];
                } else if (s[i] == '(') {
                    newDp[open] = dp[open + 1];
                } else if (open > 0) {
                    newDp[open] = dp[open - 1];
                }
            }
            dp = newDp;
        }
        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        const n = s.length;
        let dp = Array(n + 1).fill(false);
        dp[0] = true;

        for (let i = n - 1; i >= 0; i--) {
            const newDp = Array(n + 1).fill(false);
            for (let open = 0; open < n; open++) {
                if (s[i] === '*') {
                    newDp[open] =
                        dp[open + 1] || (open > 0 && dp[open - 1]) || dp[open];
                } else if (s[i] === '(') {
                    newDp[open] = dp[open + 1];
                } else if (open > 0) {
                    newDp[open] = dp[open - 1];
                }
            }
            dp = newDp;
        }
        return dp[0];
    }
}
```

```csharp
public class Solution {
    public bool CheckValidString(string s) {
        int n = s.Length;
        bool[] dp = new bool[n + 1];
        dp[0] = true;

        for (int i = n - 1; i >= 0; i--) {
            bool[] newDp = new bool[n + 1];
            for (int open = 0; open < n; open++) {
                if (s[i] == '*') {
                    newDp[open] = dp[open + 1] ||
                                  (open > 0 && dp[open - 1]) || dp[open];
                } else if (s[i] == '(') {
                    newDp[open] = dp[open + 1];
                } else if (open > 0) {
                    newDp[open] = dp[open - 1];
                }
            }
            dp = newDp;
        }
        return dp[0];
    }
}
```

```go
func checkValidString(s string) bool {
    n := len(s)
    dp := make([]bool, n+1)
    dp[0] = true

    for i := n - 1; i >= 0; i-- {
        newDp := make([]bool, n+1)
        for open := 0; open < n; open++ {
            if s[i] == '*' {
                newDp[open] = (dp[open+1] ||
                               (open > 0 && dp[open-1]) ||
                               dp[open])
            } else if s[i] == '(' {
                newDp[open] = dp[open+1]
            } else if open > 0 {
                newDp[open] = dp[open-1]
            }
        }
        dp = newDp
    }
    return dp[0]
}
```

```kotlin
class Solution {
    fun checkValidString(s: String): Boolean {
        val n = s.length
        var dp = BooleanArray(n + 1)
        dp[0] = true

        for (i in n - 1 downTo 0) {
            val newDp = BooleanArray(n + 1)
            for (open in 0 until n) {
                newDp[open] = when (s[i]) {
                    '*' -> (dp[open + 1] ||
                            (open > 0 && dp[open - 1]) ||
                            dp[open])
                    '(' -> dp[open + 1]
                    else -> open > 0 && dp[open - 1]
                }
            }
            dp = newDp
        }
        return dp[0]
    }
}
```

```swift
class Solution {
    func checkValidString(_ s: String) -> Bool {
        let n = s.count
        var dp = Array(repeating: false, count: n + 1)
        dp[0] = true

        let chars = Array(s)

        for i in stride(from: n - 1, through: 0, by: -1) {
            var new_dp = Array(repeating: false, count: n + 1)
            for open in 0..<n {
                if chars[i] == "*" {
                    new_dp[open] = dp[open + 1] || (open > 0 && dp[open - 1]) || dp[open]
                } else if chars[i] == "(" {
                    new_dp[open] = dp[open + 1]
                } else if open > 0 {
                    new_dp[open] = dp[open - 1]
                }
            }
            dp = new_dp
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 5. Stack

### Intuition

We want to check whether a string containing `'('`, `')'`, and `'*'` can be interpreted as a **valid parentheses string**.

The character `'*'` is flexible and can act as:
- `'('`
- `')'`
- or an empty string

A stack-based approach works well because:
- parentheses validity depends on **order**
- `'*'` can be used later to fix mismatches if needed

The key idea is to:
- keep track of indices of unmatched `'('`
- keep track of indices of `'*'`
- use `'*'` as a backup when we encounter an unmatched `')'`

At the end, we must also ensure that any remaining `'('` can be matched with a `'*'` **that appears after it**.

### Algorithm

1. Initialize two stacks:
   - `left` → stores indices of `'('`
   - `star` → stores indices of `'*'`
2. Traverse the string from left to right:
3. For each character:
   - If `'('`:
     - push its index into `left`
   - If `'*'`:
     - push its index into `star`
   - If `')'`:
     - If `left` is not empty:
       - pop one `'('` from `left` to match this `')'`
     - Else if `star` is not empty:
       - pop one `'*'` and treat it as `'('`
     - Else:
       - no way to match this `')'`, return `False`
4. After processing all characters:
   - Some `'('` may still be unmatched
5. Try to match remaining `'('` with `'*'`:
   - While both stacks are non-empty:
     - pop one index from `left` and one from `star`
     - if the `'('` index is **greater** than the `'*'` index:
       - `'*'` appears before `'('` and cannot act as `')'`
       - return `False`
6. If there are still unmatched `'('` left:
   - return `False`
7. Otherwise:
   - return `True`

::tabs-start

```python
class Solution:
    def checkValidString(self, s: str) -> bool:
        left = []
        star = []
        for i, ch in enumerate(s):
            if ch == '(':
                left.append(i)
            elif ch == '*':
                star.append(i)
            else:
                if not left and not star:
                    return False
                if left:
                    left.pop()
                else:
                    star.pop()

        while left and star:
            if left.pop() > star.pop():
                return False
        return not left
```

```java
public class Solution {
        public boolean checkValidString(String s) {
        Stack<Integer> left = new Stack<>();
        Stack<Integer> star = new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '(') {
                left.push(i);
            } else if (ch == '*') {
                star.push(i);
            } else {
                if (left.isEmpty() && star.isEmpty()) return false;
                if (!left.isEmpty()) {
                    left.pop();
                } else{
                    star.pop();
                }
            }
        }
        while (!left.isEmpty() && !star.isEmpty()) {
            if (left.pop() > star.pop())
                return false;
        }
        return left.isEmpty();
    }
}
```

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        stack<int> left, star;
        for (int i = 0; i < s.size(); ++i) {
            if (s[i] == '(') {
                left.push(i);
            } else if (s[i] == '*') {
                star.push(i);
            } else {
                if (left.empty() && star.empty()) return false;
                if (!left.empty()) {
                    left.pop();
                } else {
                    star.pop();
                }
            }
        }

        while (!left.empty() && !star.empty()) {
            if (left.top() > star.top()) return false;
            left.pop();
            star.pop();
        }
        return left.empty();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        const left = [];
        const star = [];
        for (let i = 0; i < s.length; i++) {
            const ch = s[i];
            if (ch === '(') {
                left.push(i);
            } else if (ch === '*') {
                star.push(i);
            } else {
                if (left.length === 0 && star.length === 0) {
                    return false;
                }
                if (left.length > 0) {
                    left.pop();
                } else {
                    star.pop();
                }
            }
        }

        while (left.length > 0 && star.length > 0) {
            if (left.pop() > star.pop()) return false;
        }
        return left.length === 0;
    }
}
```

```csharp
public class Solution {
    public bool CheckValidString(string s) {
        Stack<int> left = new Stack<int>();
        Stack<int> star = new Stack<int>();
        for (int i = 0; i < s.Length; i++) {
            char ch = s[i];
            if (ch == '(') {
                left.Push(i);
            } else if (ch == '*') {
                star.Push(i);
            } else {
                if (left.Count == 0 && star.Count == 0) return false;
                if (left.Count > 0) {
                    left.Pop();
                } else {
                    star.Pop();
                }
            }
        }

        while (left.Count > 0 && star.Count > 0) {
            if (left.Pop() > star.Pop()) return false;
        }
        return left.Count == 0;
    }
}
```

```go
func checkValidString(s string) bool {
    var left, star []int
    for i, ch := range s {
        if ch == '(' {
            left = append(left, i)
        } else if ch == '*' {
            star = append(star, i)
        } else {
            if len(left) == 0 && len(star) == 0 {
                return false
            }
            if len(left) > 0 {
                left = left[:len(left)-1]
            } else {
                star = star[:len(star)-1]
            }
        }
    }

    for len(left) > 0 && len(star) > 0 {
        if left[len(left)-1] > star[len(star)-1] {
            return false
        }
        left = left[:len(left)-1]
        star = star[:len(star)-1]
    }
    return len(left) == 0
}
```

```kotlin
class Solution {
    fun checkValidString(s: String): Boolean {
        val left = ArrayDeque<Int>()
        val star = ArrayDeque<Int>()

        for ((i, ch) in s.withIndex()) {
            when (ch) {
                '(' -> left.addLast(i)
                '*' -> star.addLast(i)
                ')' -> {
                    if (left.isEmpty() && star.isEmpty()) return false
                    if (left.isNotEmpty()) left.removeLast()
                    else star.removeLast()
                }
            }
        }

        while (left.isNotEmpty() && star.isNotEmpty()) {
            if (left.last() > star.last()) return false
            left.removeLast()
            star.removeLast()
        }
        return left.isEmpty()
    }
}
```

```swift
class Solution {
    func checkValidString(_ s: String) -> Bool {
        var left = [Int]()
        var star = [Int]()

        let chars = Array(s)

        for (i, ch) in chars.enumerated() {
            if ch == "(" {
                left.append(i)
            } else if ch == "*" {
                star.append(i)
            } else {
                if left.isEmpty && star.isEmpty {
                    return false
                }
                if !left.isEmpty {
                    left.popLast()
                } else {
                    star.popLast()
                }
            }
        }

        while !left.isEmpty && !star.isEmpty {
            if left.last! > star.last! {
                return false
            }
            left.popLast()
            star.popLast()
        }

        return left.isEmpty
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 6. Greedy

### Intuition

We want to check whether a string containing `'('`, `')'`, and `'*'` can be interpreted as a **valid parentheses string**.

Instead of trying all possibilities or using stacks, we can solve this greedily by tracking a **range** of possible unmatched `'('` counts.

Think of it this way:
- At any point, we don’t need the exact number of open parentheses
- We only need to know the **minimum** and **maximum** number of `'('` that *could* be open

Why this works:
- `'('` always increases the number of open parentheses
- `')'` always decreases it
- `'*'` is flexible and can:
  - decrease open count (act as `')'`)
  - increase open count (act as `'('`)
  - keep it unchanged (act as empty)

So we maintain:
- `leftMin` → the **minimum possible** number of unmatched `'('`
- `leftMax` → the **maximum possible** number of unmatched `'('`

If at any point the maximum possible opens becomes negative, the string is invalid.
At the end, if the minimum possible opens is zero, the string can be valid.

### Algorithm

1. Initialize two counters:
   - `leftMin = 0`
   - `leftMax = 0`
2. Traverse the string character by character:
3. For each character `c`:
   - If `c == '('`:
     - increment both `leftMin` and `leftMax`
   - If `c == ')'`:
     - decrement both `leftMin` and `leftMax`
   - If `c == '*'`:
     - treat it flexibly:
       - `leftMin -= 1` (as `')'`)
       - `leftMax += 1` (as `'('`)
4. If `leftMax < 0` at any point:
   - return `False` (too many closing parentheses)
5. If `leftMin < 0`:
   - reset `leftMin = 0` (we can treat extra closings as empty)
6. After processing the entire string:
   - return `True` if `leftMin == 0`, else `False`

::tabs-start

```python
class Solution:
    def checkValidString(self, s: str) -> bool:
        leftMin, leftMax = 0, 0

        for c in s:
            if c == "(":
                leftMin, leftMax = leftMin + 1, leftMax + 1
            elif c == ")":
                leftMin, leftMax = leftMin - 1, leftMax - 1
            else:
                leftMin, leftMax = leftMin - 1, leftMax + 1
            if leftMax < 0:
                return False
            if leftMin < 0:
                leftMin = 0
        return leftMin == 0
```

```java
public class Solution {
    public boolean checkValidString(String s) {
        int leftMin = 0, leftMax = 0;

        for (char c : s.toCharArray()) {
            if (c == '(') {
                leftMin++;
                leftMax++;
            } else if (c == ')') {
                leftMin--;
                leftMax--;
            } else {
                leftMin--;
                leftMax++;
            }
            if (leftMax < 0) {
                return false;
            }
            if (leftMin < 0) {
                leftMin = 0;
            }
        }
        return leftMin == 0;
    }
}
```

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        int leftMin = 0, leftMax = 0;

        for (char c : s) {
            if (c == '(') {
                leftMin++;
                leftMax++;
            } else if (c == ')') {
                leftMin--;
                leftMax--;
            } else {
                leftMin--;
                leftMax++;
            }
            if (leftMax < 0) {
                return false;
            }
            if (leftMin < 0) {
                leftMin = 0;
            }
        }
        return leftMin == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        let leftMin = 0;
        let leftMax = 0;

        for (const c of s) {
            if (c === '(') {
                leftMin++;
                leftMax++;
            } else if (c === ')') {
                leftMin--;
                leftMax--;
            } else {
                leftMin--;
                leftMax++;
            }
            if (leftMax < 0) {
                return false;
            }
            if (leftMin < 0) {
                leftMin = 0;
            }
        }
        return leftMin === 0;
    }
}
```

```csharp
public class Solution {
    public bool CheckValidString(string s) {
        int leftMin = 0, leftMax = 0;

        foreach (char c in s) {
            if (c == '(') {
                leftMin++;
                leftMax++;
            } else if (c == ')') {
                leftMin--;
                leftMax--;
            } else {
                leftMin--;
                leftMax++;
            }
            if (leftMax < 0) {
                return false;
            }
            if (leftMin < 0) {
                leftMin = 0;
            }
        }
        return leftMin == 0;
    }
}
```

```go
func checkValidString(s string) bool {
    leftMin, leftMax := 0, 0

    for _, c := range s {
        if c == '(' {
            leftMin, leftMax = leftMin+1, leftMax+1
        } else if c == ')' {
            leftMin, leftMax = leftMin-1, leftMax-1
        } else {
            leftMin, leftMax = leftMin-1, leftMax+1
        }
        if leftMax < 0 {
            return false
        }
        if leftMin < 0 {
            leftMin = 0
        }
    }
    return leftMin == 0
}
```

```kotlin
class Solution {
    fun checkValidString(s: String): Boolean {
        var leftMin = 0
        var leftMax = 0

        for (c in s) {
            when (c) {
                '(' -> {
                    leftMin++
                    leftMax++
                }
                ')' -> {
                    leftMin--
                    leftMax--
                }
                else -> {
                    leftMin--
                    leftMax++
                }
            }
            if (leftMax < 0) return false
            if (leftMin < 0) leftMin = 0
        }
        return leftMin == 0
    }
}
```

```swift
class Solution {
    func checkValidString(_ s: String) -> Bool {
        var leftMin = 0
        var leftMax = 0

        for c in s {
            if c == "(" {
                leftMin += 1
                leftMax += 1
            } else if c == ")" {
                leftMin -= 1
                leftMax -= 1
            } else {
                leftMin -= 1
                leftMax += 1
            }
            if leftMax < 0 {
                return false
            }
            if leftMin < 0 {
                leftMin = 0
            }
        }
        return leftMin == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
