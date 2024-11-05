## 1. Backtracking (Pick / Not Pick)

::tabs-start

```python
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        res, part = [], []

        def dfs(j, i):
            if i >= len(s):
                if i == j:
                    res.append(part.copy())
                return
            
            if self.isPali(s, j, i):
                part.append(s[j : i + 1])
                dfs(i + 1, i + 1)
                part.pop()
            
            dfs(j, i + 1)
        
        dfs(0, 0)
        return res

    def isPali(self, s, l, r):
        while l < r:
            if s[l] != s[r]:
                return False
            l, r = l + 1, r - 1
        return True
```

```java
public class Solution {
    private List<List<String>> res = new ArrayList<>();
    private List<String> part = new ArrayList<>();

    public List<List<String>> partition(String s) {
        dfs(0, 0, s);
        return res;
    }

    private void dfs(int j, int i, String s) {
        if (i >= s.length()) {
            if (i == j) {
                res.add(new ArrayList<>(part));
            }
            return;
        }
        
        if (isPali(s, j, i)) {
            part.add(s.substring(j, i + 1));
            dfs(i + 1, i + 1, s);
            part.remove(part.size() - 1);
        }
        
        dfs(j, i + 1, s);
    }

    private boolean isPali(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```cpp
class Solution {
    vector<vector<string>> res;
public:
    vector<vector<string>> partition(string s) {
        vector<string> part;
        dfs(0, 0, s, part);
        return res;
    }

    void dfs(int j, int i, string &s, vector<string> &part) {
        if (i >= s.size()) {
            if (i == j) {
                res.push_back(part);
            }
            return;
        }
        
        if (isPali(s, j, i)) {
            part.push_back(s.substr(j, i - j + 1));
            dfs(i + 1, i + 1, s, part);
            part.pop_back();
        }
        
        dfs(j, i + 1, s, part);
    }

    bool isPali(string &s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[][]}
     */
    partition(s) {
        const res = [];
        const part = [];

        const dfs = (j, i) => {
            if (i >= s.length) {
                if (i === j) {
                    res.push([...part]);
                }
                return;
            }

            if (this.isPali(s, j, i)) {
                part.push(s.substring(j, i + 1));
                dfs(i + 1, i + 1);
                part.pop();
            }

            dfs(j, i + 1);
        };

        dfs(0, 0);
        return res;
    }

    /**
     * @param {string} s
     * @param {number} l
     * @param {number} r
     * @return {boolean}
     */
    isPali(s, l, r) {
        while (l < r) {
            if (s[l] !== s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```csharp
public class Solution {
    private List<List<string>> res = new List<List<string>>();
    private List<string> part = new List<string>();

    public List<List<string>> Partition(string s) {
        dfs(0, 0, s);
        return res;
    }

    private void dfs(int j, int i, string s) {
        if (i >= s.Length) {
            if (i == j) {
                res.Add(new List<string>(part));
            }
            return;
        }

        if (isPali(s, j, i)) {
            part.Add(s.Substring(j, i - j + 1));
            dfs(i + 1, i + 1, s);
            part.RemoveAt(part.Count - 1);
        }

        dfs(j, i + 1, s);
    }

    private bool isPali(string s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```go
func partition(s string) [][]string {
    res := [][]string{}
    part := []string{}

    var dfs func(j, i int)
    dfs = func(j, i int) {
        if i >= len(s) {
            if i == j {
                res = append(res, append([]string{}, part...))
            }
            return
        }

        if isPali(s, j, i) {
            part = append(part, s[j:i+1])
            dfs(i+1, i+1)
            part = part[:len(part)-1]
        }

        dfs(j, i+1)
    }

    dfs(0, 0)
    return res
}

func isPali(s string, l, r int) bool {
    for l < r {
        if s[l] != s[r] {
            return false
        }
        l++
        r--
    }
    return true
}
```

```kotlin
class Solution {
    fun partition(s: String): List<List<String>> {
        val res = mutableListOf<List<String>>()
        val part = mutableListOf<String>()

        fun dfs(j: Int, i: Int) {
            if (i >= s.length) {
                if (i == j) {
                    res.add(part.toList())
                }
                return
            }

            if (isPali(s, j, i)) {
                part.add(s.substring(j, i + 1))
                dfs(i + 1, i + 1)
                part.removeAt(part.size - 1)
            }

            dfs(j, i + 1)
        }

        dfs(0, 0)
        return res
    }

    private fun isPali(s: String, l: Int, r: Int): Boolean {
        var left = l
        var right = r
        while (left < right) {
            if (s[left] != s[right]) {
                return false
            }
            left++
            right--
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(n)$

---

## 2. Backtracking

::tabs-start

```python
class Solution:
    
    def partition(self, s: str) -> List[List[str]]:
        res, part = [], []

        def dfs(i):
            if i >= len(s):
                res.append(part.copy())
                return
            for j in range(i, len(s)):
                if self.isPali(s, i, j):
                    part.append(s[i : j + 1])
                    dfs(j + 1)
                    part.pop()

        dfs(0)
        return res

    def isPali(self, s, l, r):
        while l < r:
            if s[l] != s[r]:
                return False
            l, r = l + 1, r - 1
        return True
```

```java
public class Solution {
    
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        List<String> part = new ArrayList<>();
        dfs(0, s, part, res);
        return res;
    }

    private void dfs(int i, String s, List<String> part, List<List<String>> res) {
        if (i >= s.length()) {
            res.add(new ArrayList<>(part));
            return;
        }
        for (int j = i; j < s.length(); j++) {
            if (isPali(s, i, j)) {
                part.add(s.substring(i, j + 1));
                dfs(j + 1, s, part, res);
                part.remove(part.size() - 1);
            }
        }
    }

    private boolean isPali(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        vector<string> part;
        dfs(0, s, part, res);
        return res;
    }

private:
    void dfs(int i, const string& s, vector<string>& part, vector<vector<string>>& res) {
        if (i >= s.length()) {
            res.push_back(part);
            return;
        }
        for (int j = i; j < s.length(); j++) {
            if (isPali(s, i, j)) {
                part.push_back(s.substr(i, j - i + 1));
                dfs(j + 1, s, part, res);
                part.pop_back();
            }
        }
    }

    bool isPali(const string& s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[][]}
     */
    partition(s) {
        const res = [];
        const part = [];
        this.dfs(0, s, part, res);
        return res;
    }

    /**
     * @param {number} i
     * @param {string} s
     * @param {string[]} part
     * @param {string[][]} res
     * @return {void}
     */
    dfs(i, s, part, res) {
        if (i >= s.length) {
            res.push([...part]);
            return;
        }
        for (let j = i; j < s.length; j++) {
            if (this.isPali(s, i, j)) {
                part.push(s.substring(i, j + 1));
                this.dfs(j + 1, s, part, res);
                part.pop();
            }
        }
    }

    /**
     * @param {string} s
     * @param {number} l
     * @param {number} r
     * @return {boolean}
     */
    isPali(s, l, r) {
        while (l < r) {
            if (s[l] !== s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```csharp
public class Solution {
    
    public List<List<string>> Partition(string s) {
        List<List<string>> res = new List<List<string>>();
        List<string> part = new List<string>();
        Dfs(0, s, part, res);
        return res;
    }

    private void Dfs(int i, string s, List<string> part, List<List<string>> res) {
        if (i >= s.Length) {
            res.Add(new List<string>(part));
            return;
        }
        for (int j = i; j < s.Length; j++) {
            if (IsPali(s, i, j)) {
                part.Add(s.Substring(i, j - i + 1));
                Dfs(j + 1, s, part, res);
                part.RemoveAt(part.Count - 1);
            }
        }
    }

    private bool IsPali(string s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```go
func partition(s string) [][]string {
    res := [][]string{}
    part := []string{}

    var dfs func(i int)
    dfs = func(i int) {
        if i >= len(s) {
            res = append(res, append([]string{}, part...))
            return
        }
        for j := i; j < len(s); j++ {
            if isPali(s, i, j) {
                part = append(part, s[i:j+1])
                dfs(j + 1)
                part = part[:len(part)-1]
            }
        }
    }

    dfs(0)
    return res
}

func isPali(s string, l, r int) bool {
    for l < r {
        if s[l] != s[r] {
            return false
        }
        l++
        r--
    }
    return true
}
```

```kotlin
class Solution {
    fun partition(s: String): List<List<String>> {
        val res = mutableListOf<List<String>>()
        val part = mutableListOf<String>()

        fun dfs(i: Int) {
            if (i >= s.length) {
                res.add(part.toList())
                return
            }
            for (j in i until s.length) {
                if (isPali(s, i, j)) {
                    part.add(s.substring(i, j + 1))
                    dfs(j + 1)
                    part.removeAt(part.size - 1)
                }
            }
        }

        dfs(0)
        return res
    }

    private fun isPali(s: String, l: Int, r: Int): Boolean {
        var left = l
        var right = r
        while (left < right) {
            if (s[left] != s[right]) {
                return false
            }
            left++
            right--
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(n)$

---

## 3. Backtracking (DP)

::tabs-start

```python
class Solution:
    
    def partition(self, s: str) -> List[List[str]]:
        n = len(s)
        dp = [[False] * n for _ in range(n)]
        for l in range(1, n + 1):
            for i in range(n - l + 1):
                dp[i][i + l - 1] = (s[i] == s[i + l - 1] and
                                    (i + 1 > (i + l - 2) or
                                    dp[i + 1][i + l - 2]))

        res, part = [], []
        def dfs(i):
            if i >= len(s):
                res.append(part.copy())
                return
            for j in range(i, len(s)):
                if dp[i][j]:
                    part.append(s[i : j + 1])
                    dfs(j + 1)
                    part.pop()

        dfs(0)
        return res
```

```java
public class Solution {
    boolean[][] dp;
    public List<List<String>> partition(String s) {
        int n = s.length();
        dp = new boolean[n][n];
        for (int l = 1; l <= n; l++) {
            for (int i = 0; i <= n - l; i++) {
                dp[i][i + l - 1] = (s.charAt(i) == s.charAt(i + l - 1) && 
                                    (i + 1 > (i + l - 2) || 
                                    dp[i + 1][i + l - 2]));
            }
        }
        
        List<List<String>> res = new ArrayList<>();
        List<String> part = new ArrayList<>();
        dfs(0, s, part, res);
        return res;
    }

    private void dfs(int i, String s, List<String> part, List<List<String>> res) {
        if (i >= s.length()) {
            res.add(new ArrayList<>(part));
            return;
        }
        for (int j = i; j < s.length(); j++) {
            if (dp[i][j]) {
                part.add(s.substring(i, j + 1));
                dfs(j + 1, s, part, res);
                part.remove(part.size() - 1);
            }
        }
    }
}
```

```cpp
class Solution {
    vector<vector<bool>> dp;
public:
    vector<vector<string>> partition(string s) {
        int n = s.length();
        dp.resize(n, vector<bool>(n));
        for (int l = 1; l <= n; l++) {
            for (int i = 0; i <= n - l; i++) {
                dp[i][i + l - 1] = (s[i] == s[i + l - 1] && 
                                    (i + 1 > (i + l - 2) || 
                                    dp[i + 1][i + l - 2]));
            }
        }

        vector<vector<string>> res;
        vector<string> part;
        dfs(0, s, part, res);
        return res;
    }

private:
    void dfs(int i, const string& s, vector<string>& part, vector<vector<string>>& res) {
        if (i >= s.length()) {
            res.push_back(part);
            return;
        }
        for (int j = i; j < s.length(); j++) {
            if (dp[i][j]) {
                part.push_back(s.substr(i, j - i + 1));
                dfs(j + 1, s, part, res);
                part.pop_back();
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[][]}
     */
    partition(s) {
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(false));
        for (let l = 1; l <= n; l++) {
            for (let i = 0; i <= n - l; i++) {
                dp[i][i + l - 1] = (s[i] === s[i + l - 1] && 
                                    (i + 1 > (i + l - 2) || 
                                    dp[i + 1][i + l - 2]));
            }
        }

        const res = [];
        const part = [];
        const dfs = (i) => {
            if (i >= s.length) {
                res.push([...part]);
                return;
            }
            for (let j = i; j < s.length; j++) {
                if (dp[i][j]) {
                    part.push(s.substring(i, j + 1));
                    dfs(j + 1, s, part, res);
                    part.pop();
                }
            }
        }
        dfs(0);
        return res;
    }
}
```

```csharp
public class Solution {
    
    public List<List<string>> Partition(string s) {
        int n = s.Length;
        bool[,] dp = new bool[n, n];
        for (int l = 1; l <= n; l++) {
            for (int i = 0; i <= n - l; i++) {
                dp[i, i + l - 1] = (s[i] == s[i + l - 1] && 
                                    (i + 1 > (i + l - 2) || 
                                    dp[i + 1, i + l - 2]));
            }
        }
        
        List<List<string>> res = new List<List<string>>();
        List<string> part = new List<string>();
        Dfs(0, s, part, res, dp);
        return res;
    }

    private void Dfs(int i, string s, List<string> part, List<List<string>> res, bool[,] dp) {
        if (i >= s.Length) {
            res.Add(new List<string>(part));
            return;
        }
        for (int j = i; j < s.Length; j++) {
            if (dp[i, j]) {
                part.Add(s.Substring(i, j - i + 1));
                Dfs(j + 1, s, part, res, dp);
                part.RemoveAt(part.Count - 1);
            }
        }
    }
}
```

```go
func partition(s string) [][]string {
    n := len(s)
    dp := make([][]bool, n)
    for i := range dp {
        dp[i] = make([]bool, n)
    }

    for l := 1; l <= n; l++ {
        for i := 0; i <= n-l; i++ {
            dp[i][i+l-1] = (s[i] == s[i+l-1] && (i+1 > (i+l-2) || dp[i+1][i+l-2]))
        }
    }

    res := [][]string{}
    part := []string{}

    var dfs func(i int)
    dfs = func(i int) {
        if i >= len(s) {
            res = append(res, append([]string{}, part...))
            return
        }
        for j := i; j < len(s); j++ {
            if dp[i][j] {
                part = append(part, s[i:j+1])
                dfs(j + 1)
                part = part[:len(part)-1]
            }
        }
    }

    dfs(0)
    return res
}
```

```kotlin
class Solution {
    fun partition(s: String): List<List<String>> {
        val n = s.length
        val dp = Array(n) { BooleanArray(n) }

        for (l in 1..n) {
            for (i in 0..n - l) {
                dp[i][i + l - 1] = s[i] == s[i + l - 1] && 
                                   (i + 1 > (i + l - 2) || dp[i + 1][i + l - 2])
            }
        }

        val res = mutableListOf<List<String>>()
        val part = mutableListOf<String>()

        fun dfs(i: Int) {
            if (i >= s.length) {
                res.add(part.toList())
                return
            }
            for (j in i until s.length) {
                if (dp[i][j]) {
                    part.add(s.substring(i, j + 1))
                    dfs(j + 1)
                    part.removeAt(part.size - 1)
                }
            }
        }

        dfs(0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(n ^ 2)$

---

## 4. Recursion

::tabs-start

```python
class Solution:
    
    def partition(self, s: str) -> List[List[str]]:
        n = len(s)
        dp = [[False] * n for _ in range(n)]
        for l in range(1, n + 1):
            for i in range(n - l + 1):
                dp[i][i + l - 1] = (s[i] == s[i + l - 1] and
                                    (i + 1 > (i + l - 2) or
                                    dp[i + 1][i + l - 2]))
        
        def dfs(i):
            if i >= n:
                return [[]]  
            
            ret = []
            for j in range(i, n):
                if dp[i][j]:
                    nxt = dfs(j + 1)
                    for part in nxt:
                        cur = [s[i : j + 1]] + part  
                        ret.append(cur)
            return ret
        
        return dfs(0)
```

```java
public class Solution {
    
    public List<List<String>> partition(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n][n];
        for (int l = 1; l <= n; l++) {
            for (int i = 0; i <= n - l; i++) {
                dp[i][i + l - 1] = (s.charAt(i) == s.charAt(i + l - 1) && 
                                    (i + 1 > (i + l - 2) || 
                                    dp[i + 1][i + l - 2]));
            }
        }
        
        return dfs(s, dp, 0);
    }

    private List<List<String>> dfs(String s, boolean[][] dp, int i) {
        if (i >= s.length()) {
            return new ArrayList<List<String>>() {{ add(new ArrayList<>()); }};
        }

        List<List<String>> ret = new ArrayList<>();
        for (int j = i; j < s.length(); j++) {
            if (dp[i][j]) {
                List<List<String>> nxt = dfs(s, dp, j + 1);
                for (List<String> part : nxt) {
                    List<String> cur = new ArrayList<>();
                    cur.add(s.substring(i, j + 1));
                    cur.addAll(part);
                    ret.add(cur);
                }
            }
        }
        return ret;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<string>> partition(string s) {
        int n = s.size();
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        for (int l = 1; l <= n; l++) {
            for (int i = 0; i <= n - l; i++) {
                dp[i][i + l - 1] = (s[i] == s[i + l - 1] && 
                                    (i + 1 > (i + l - 2) || 
                                    dp[i + 1][i + l - 2]));
            }
        }
        
        return dfs(s, dp, 0);
    }

    vector<vector<string>> dfs(string& s, vector<vector<bool>>& dp, int i) {
        if (i >= s.size()) {
            return {{}};
        }

        vector<vector<string>> ret;
        for (int j = i; j < s.size(); j++) {
            if (dp[i][j]) {
                auto nxt = dfs(s, dp, j + 1);
                for (auto& part : nxt) {
                    vector<string> cur;
                    cur.push_back(s.substr(i, j - i + 1));
                    cur.insert(cur.end(), part.begin(), part.end());
                    ret.push_back(cur);
                }
            }
        }
        return ret;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[][]}
     */
    partition(s) {
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(false));
        for (let l = 1; l <= n; l++) {
            for (let i = 0; i <= n - l; i++) {
                dp[i][i + l - 1] = (s[i] === s[i + l - 1] && 
                                    (i + 1 > (i + l - 2) || 
                                    dp[i + 1][i + l - 2]));
            }
        }
        
        const dfs = (i) => {
            if (i >= s.length) {
                return [[]];
            }

            const ret = [];
            for (let j = i; j < s.length; j++) {
                if (dp[i][j]) {
                    const nxt = dfs(j + 1);
                    for (const part of nxt) {
                        const cur = [s.slice(i, j + 1), ...part];
                        ret.push(cur);
                    }
                }
            }
            return ret;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    
    public List<List<string>> Partition(string s) {
        int n = s.Length;
        bool[,] dp = new bool[n, n];
        for (int l = 1; l <= n; l++) {
            for (int i = 0; i <= n - l; i++) {
                dp[i, i + l - 1] = (s[i] == s[i + l - 1] && 
                                    (i + 1 > (i + l - 2) || 
                                    dp[i + 1, i + l - 2]));
            }
        }
        
        return Dfs(s, dp, 0);
    }

    private List<List<string>> Dfs(string s, bool[,] dp, int i) {
        if (i >= s.Length) {
            return new List<List<string>> { new List<string>() };
        }

        var ret = new List<List<string>>();
        for (int j = i; j < s.Length; j++) {
            if (dp[i, j]) {
                var nxt = Dfs(s, dp, j + 1);
                foreach (var part in nxt) {
                    var cur = new List<string> { s.Substring(i, j - i + 1) };
                    cur.AddRange(part);
                    ret.Add(cur);
                }
            }
        }
        return ret;
    }
}
```

```go
func partition(s string) [][]string {
    n := len(s)
    dp := make([][]bool, n)
    for i := range dp {
        dp[i] = make([]bool, n)
    }

    for l := 1; l <= n; l++ {
        for i := 0; i <= n-l; i++ {
            dp[i][i+l-1] = (s[i] == s[i+l-1] && 
                           (i+1 > (i+l-2) || dp[i+1][i+l-2]))
        }
    }

    var dfs func(i int) [][]string
    dfs = func(i int) [][]string {
        if i >= n {
            return [][]string{{}}
        }

        ret := [][]string{}
        for j := i; j < n; j++ {
            if dp[i][j] {
                nxt := dfs(j + 1)
                for _, part := range nxt {
                    cur := append([]string{s[i : j+1]}, part...)
                    ret = append(ret, cur)
                }
            }
        }
        return ret
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun partition(s: String): List<List<String>> {
        val n = s.length
        val dp = Array(n) { BooleanArray(n) }

        for (l in 1..n) {
            for (i in 0..n - l) {
                dp[i][i + l - 1] = s[i] == s[i + l - 1] && 
                                   (i + 1 > (i + l - 2) || dp[i + 1][i + l - 2])
            }
        }

        fun dfs(i: Int): List<List<String>> {
            if (i >= n) {
                return listOf(emptyList())
            }

            val ret = mutableListOf<List<String>>()
            for (j in i until n) {
                if (dp[i][j]) {
                    val nxt = dfs(j + 1)
                    for (part in nxt) {
                        val cur = listOf(s.substring(i, j + 1)) + part
                        ret.add(cur)
                    }
                }
            }
            return ret
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(n ^ 2)$