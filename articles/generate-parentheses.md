## 1. Brute Force

::tabs-start

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []

        def valid(s: str):
            open = 0
            for c in s:
                open += 1 if c == '(' else -1
                if open < 0:
                    return False
            return not open

        def dfs(s: str):
            if n * 2 == len(s):
                if valid(s):
                    res.append(s)
                return
            
            dfs(s + '(')
            dfs(s + ')')
        
        dfs("")
        return res
```

```java
public class Solution {
    public boolean valid(String s) {
        int open = 0;
        for (char c : s.toCharArray()) {
            open += c == '(' ? 1 : -1;
            if (open < 0) return false;
        }
        return open == 0;
    }

    void dfs(String s, List<String> res, int n) {
        if (n * 2 == s.length()) {
            if (valid(s)) res.add(s);
            return;
        }
        dfs(s + '(', res, n);
        dfs(s + ')', res, n);
    }

    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        dfs("", res, n);
        return res;
    }
}
```

```cpp
class Solution {
public:
    bool valid(const string& s) {
        int open = 0;
        for (char c : s) {
            open += (c == '(') ? 1 : -1;
            if (open < 0) return false;
        }
        return open == 0;
    }

    void dfs(string s, vector<string>& res, int n) {
        if (s.length() == 2 * n) {
            if (valid(s)) res.push_back(s);
            return;
        }
        dfs(s + '(', res, n);
        dfs(s + ')', res, n);
    }

    vector<string> generateParenthesis(int n) {
        vector<string> res;
        dfs("", res, n);
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    valid(s) {
        let open = 0;
        for (const c of s) {
            open += c === '(' ? 1 : -1;
            if (open < 0) return false;
        }
        return open === 0;
    }

    /**
     * @param {string} s
     * @param {string[]}
     * @param {number} n 
     */
    dfs(s, res, n) {
        if (s.length === 2 * n) {
            if (this.valid(s)) res.push(s);
            return;
        }
        this.dfs(s + '(', res, n);
        this.dfs(s + ')', res, n);
    }

    /**
     * @param {number} n
     * @return {string[]}
     */
    generateParenthesis(n) {
        const res = [];
        this.dfs("", res, n);
        return res;
    }
}
```

```csharp
public class Solution {
    public bool Valid(string s) {
        int open = 0;
        foreach (char c in s) {
            open += (c == '(') ? 1 : -1;
            if (open < 0) return false;
        }
        return open == 0;
    }

    public void Dfs(string s, List<string> res, int n) {
        if (s.Length == 2 * n) {
            if (Valid(s)) res.Add(s);
            return;
        }
        Dfs(s + '(', res, n);
        Dfs(s + ')', res, n);
    }

    public List<string> GenerateParenthesis(int n) {
        List<string> res = new List<string>();
        Dfs("", res, n);
        return res;
    }
}
```

```go
func generateParenthesis(n int) []string {
   res := make([]string, 0)
   
   var valid func(string) bool
   valid = func(s string) bool {
       open := 0
       for _, c := range s {
           if c == '(' {
               open++
           } else {
               open--
           }
           if open < 0 {
               return false
           }
       }
       return open == 0
   }
   
   var dfs func(string)
   dfs = func(s string) {
       if len(s) == n*2 {
           if valid(s) {
               res = append(res, s)
           }
           return
       }
       
       dfs(s + "(")
       dfs(s + ")")
   }
   
   dfs("")
   return res
}
```

```kotlin
class Solution {
    fun generateParenthesis(n: Int): List<String> {
        val res = mutableListOf<String>()
        
        fun valid(s: String): Boolean {
            var open = 0
            for (c in s) {
                if (c == '(') open++ else open--
                if (open < 0) return false
            }
            return open == 0
        }
        
        fun dfs(s: String) {
            if (s.length == n * 2) {
                if (valid(s)) {
                    res.add(s)
                }
                return
            }
            
            dfs(s + "(")
            dfs(s + ")")
        }
        
        dfs("")
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ {2n} * n)$
* Space complexity: $O(2 ^ {2n} * n)$

---

## 2. Backtracking

::tabs-start

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        stack = []
        res = []

        def backtrack(openN, closedN):
            if openN == closedN == n:
                res.append("".join(stack))
                return

            if openN < n:
                stack.append("(")
                backtrack(openN + 1, closedN)
                stack.pop()
            if closedN < openN:
                stack.append(")")
                backtrack(openN, closedN + 1)
                stack.pop()

        backtrack(0, 0)
        return res
```

```java
public class Solution {
    private void backtrack(int openN, int closedN, int n, List<String> res, StringBuilder stack) {
        if (openN == closedN && openN == n) {
            res.add(stack.toString());
            return;
        }

        if (openN < n) {
            stack.append('(');
            backtrack(openN + 1, closedN, n, res, stack);
            stack.deleteCharAt(stack.length() - 1);
        }
        if (closedN < openN) {
            stack.append(')');
            backtrack(openN, closedN + 1, n, res, stack);
            stack.deleteCharAt(stack.length() - 1);
        }
    }

    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        StringBuilder stack = new StringBuilder();
        backtrack(0, 0, n, res, stack);
        return res;
    }
}
```

```cpp
class Solution {
public:
    void backtrack(int openN, int closedN, int n, vector<string>& res, string& stack) {
        if (openN == closedN && openN == n) {
            res.push_back(stack);
            return;
        }

        if (openN < n) {
            stack += '(';
            backtrack(openN + 1, closedN, n, res, stack);
            stack.pop_back();
        }
        if (closedN < openN) {
            stack += ')';
            backtrack(openN, closedN + 1, n, res, stack);
            stack.pop_back();
        }
    }

    vector<string> generateParenthesis(int n) {
        vector<string> res;
        string stack;
        backtrack(0, 0, n, res, stack);
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} openN
     * @param {number} closeN
     * @param {number} n
     * @param {string[]} res
     * @param {string} stack
     */
    backtrack(openN, closedN, n, res, stack) {
        if (openN === closedN && openN === n) {
            res.push(stack);
            return;
        }

        if (openN < n) {
            this.backtrack(openN + 1, closedN, n, res, stack + '(');
        }
        if (closedN < openN) {
            this.backtrack(openN, closedN + 1, n, res, stack + ')');
        }
    }

    /**
     * @param {number} n
     * @return {string[]}
     */
    generateParenthesis(n) {
        const res = [];
        this.backtrack(0, 0, n, res, '');
        return res;
    }
}
```

```csharp
public class Solution {
    public void Backtrack(int openN, int closedN, int n, List<string> res, string stack) {
        if (openN == closedN && openN == n) {
            res.Add(stack);
            return;
        }

        if (openN < n) {
            Backtrack(openN + 1, closedN, n, res, stack + '(');
        }

        if (closedN < openN) {
            Backtrack(openN, closedN + 1, n, res, stack + ')');
        }
    }

    public List<string> GenerateParenthesis(int n) {
        List<string> res = new List<string>();
        string stack = ""; 
        Backtrack(0, 0, n, res, stack);
        return res;  
    }
}
```

```go
func generateParenthesis(n int) []string {
   stack := make([]string, 0)
   res := make([]string, 0)
   
   var backtrack func(int, int)
   backtrack = func(openN, closedN int) {
       if openN == n && closedN == n {
           res = append(res, strings.Join(stack, ""))
           return
       }
       
       if openN < n {
           stack = append(stack, "(")
           backtrack(openN+1, closedN)
           stack = stack[:len(stack)-1]
       }
       
       if closedN < openN {
           stack = append(stack, ")")
           backtrack(openN, closedN+1)
           stack = stack[:len(stack)-1]
       }
   }
   
   backtrack(0, 0)
   return res
}
```

```kotlin
class Solution {
    fun generateParenthesis(n: Int): List<String> {
        val stack = mutableListOf<String>()
        val res = mutableListOf<String>()
        
        fun backtrack(openN: Int, closedN: Int) {
            if (openN == n && closedN == n) {
                res.add(stack.joinToString(""))
                return
            }
            
            if (openN < n) {
                stack.add("(")
                backtrack(openN + 1, closedN)
                stack.removeAt(stack.lastIndex)
            }
            
            if (closedN < openN) {
                stack.add(")")
                backtrack(openN, closedN + 1)
                stack.removeAt(stack.lastIndex)
            }
        }
        
        backtrack(0, 0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\frac{4^n}{\sqrt{n}})$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming

::tabs-start

```python
class Solution:
    def generateParenthesis(self, n):
        res = [[] for _ in range(n+1)]
        res[0] = [""]
        
        for k in range(n + 1):
            for i in range(k):
                for left in res[i]:
                    for right in res[k-i-1]:
                        res[k].append("(" + left + ")" + right)
        
        return res[-1]
```

```java
public class Solution {
    public List<String> generateParenthesis(int n) {
        List<List<String>> res = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            res.add(new ArrayList<>());
        }
        res.get(0).add("");

        for (int k = 0; k <= n; k++) {
            for (int i = 0; i < k; i++) {
                for (String left : res.get(i)) {
                    for (String right : res.get(k - i - 1)) {
                        res.get(k).add("(" + left + ")" + right);
                    }
                }
            }
        }

        return res.get(n);
    }
}
```

```cpp
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<vector<string>> res(n + 1);
        res[0] = {""};

        for (int k = 0; k <= n; ++k) {
            for (int i = 0; i < k; ++i) {
                for (const string& left : res[i]) {
                    for (const string& right : res[k - i - 1]) {
                        res[k].push_back("(" + left + ")" + right);
                    }
                }
            }
        }

        return res[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {string[]}
     */
    generateParenthesis(n) {
        const res = Array.from({ length: n + 1 }, () => []);
        res[0] = [""];

        for (let k = 0; k <= n; k++) {
            for (let i = 0; i < k; i++) {
                for (const left of res[i]) {
                    for (const right of res[k - i - 1]) {
                        res[k].push("(" + left + ")" + right);
                    }
                }
            }
        }

        return res[n];
    }
}
```

```csharp
public class Solution {
    public List<string> GenerateParenthesis(int n) {
        List<List<string>> res = new List<List<string>>();
        for (int i = 0; i <= n; i++) {
            res.Add(new List<string>());
        }
        res[0].Add("");

        for (int k = 0; k <= n; k++) {
            for (int i = 0; i < k; i++) {
                foreach (string left in res[i]) {
                    foreach (string right in res[k - i - 1]) {
                        res[k].Add("(" + left + ")" + right);
                    }
                }
            }
        }

        return res[n];
    }
}
```

```go
func generateParenthesis(n int) []string {
   res := make([][]string, n+1)
   res[0] = []string{""}
   
   for k := 1; k <= n; k++ {
       res[k] = make([]string, 0)
       for i := 0; i < k; i++ {
           for _, left := range res[i] {
               for _, right := range res[k-i-1] {
                   res[k] = append(res[k], "(" + left + ")" + right)
               }
           }
       }
   }
   
   return res[n]
}
```

```kotlin
class Solution {
    fun generateParenthesis(n: Int): List<String> {
        val res = Array(n + 1) { mutableListOf<String>() }
        res[0] = mutableListOf("")
        
        for (k in 1..n) {
            for (i in 0 until k) {
                for (left in res[i]) {
                    for (right in res[k-i-1]) {
                        res[k].add("(" + left + ")" + right)
                    }
                }
            }
        }
        
        return res[n]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\frac{4^n}{\sqrt{n}})$
* Space complexity: $O(n)$