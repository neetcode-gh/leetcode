## 1. Recursion

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
                return dfs(i + 1, open) || 
                    dfs(i + 1, open + 1) || 
                    dfs(i + 1, open - 1);
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

```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(3 ^ n)$
* Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

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
                     Array(n + 1).fill(null));

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
                result = dfs(i + 1, open) || 
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

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
                   Array(n + 1).fill(false));
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized)

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
                    newDp[open] = dp[open + 1] || 
                                  (open > 0 && dp[open - 1]) || dp[open];
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 5. Stack

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 6. Greedy

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$