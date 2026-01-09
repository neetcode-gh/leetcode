## 1. Backtracking - I

### Intuition
We want to split the string into **pieces**, but we only keep a split if **every piece is a palindrome**.

Think of placing “cuts” in the string:
- Start at some index `j` (start of the next piece).
- Try to extend the end index `i` to form a substring `s[j..i]`.
- If `s[j..i]` is a palindrome, we **choose it** (put it into `part`) and then restart from the next position (`i+1`) to build the next piece.
- Whether or not it was a palindrome, we can also **extend further** by moving `i` to `i+1` (trying a longer substring from the same start `j`).

Backtracking means:
- When we choose a palindrome piece, we go deeper.
- After returning, we remove that piece and try other possibilities.

### Algorithm
1. Keep:
   - `part`: current list of chosen palindrome substrings.
   - `res`: all valid partitions.
2. Use DFS with two pointers:
   - `j` = start index of the current substring we're trying to form.
   - `i` = end index we are expanding.
3. If `i` reaches the end of the string:
   - If `j` is also at the end, it means we perfectly partitioned the whole string → add a copy of `part` to `res`.
   - Return.
4. If substring `s[j..i]` is a palindrome:
   - Add it to `part`.
   - Recurse with next start/end: `dfs(i+1, i+1)`.
   - Backtrack: remove the last added substring.
5. Also try making the substring longer without cutting yet:
   - `dfs(j, i+1)`.
6. Palindrome check (`isPali(l,r)`): two pointers moving inward; if mismatch → return `false`.

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

```swift
class Solution {
    func partition(_ s: String) -> [[String]] {
        var res = [[String]]()
        var part = [String]()
        let sArray = Array(s)

        func dfs(_ j: Int, _ i: Int) {
            if i >= sArray.count {
                if i == j {
                    res.append(part)
                }
                return
            }

            if isPali(sArray, j, i) {
                part.append(String(sArray[j...i]))
                dfs(i + 1, i + 1)
                part.removeLast()
            }

            dfs(j, i + 1)
        }

        func isPali(_ s: [Character], _ l: Int, _ r: Int) -> Bool {
            var l = l, r = r
            while l < r {
                if s[l] != s[r] {
                    return false
                }
                l += 1
                r -= 1
            }
            return true
        }

        dfs(0, 0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(n * 2 ^ n)$ space for the output list.

---

## 2. Backtracking - II

### Intuition
We build the partition **from left to right**.

At any starting index `i`, we have a simple question:
> “Where should I cut next?”

So we try **every possible end index `j`** from `i` to end:
- If `s[i..j]` is a palindrome, it can be the **next piece**.
- Choose it (add to `part`), then recursively solve the rest starting at `j + 1`.
- After coming back, undo the choice (pop) and try a different `j`.

This guarantees:
- We only add **palindrome pieces**.
- We explore **all valid ways** to cut the string.

### Algorithm
1. Maintain:
   - `part`: current list of chosen substrings.
   - `res`: all palindrome partitions.
2. Define DFS `dfs(i)` where `i` is the start index of the next substring.
3. Base case:
   - If `i == len(s)`, the whole string has been partitioned → add a copy of `part` to `res`.
4. For each `j` from `i` to `len(s)-1`:
   - If `s[i..j]` is palindrome:
     - Add `s[i..j]` to `part`.
     - Recurse `dfs(j + 1)`.
     - Backtrack: remove last substring.
5. Palindrome check:
   - Two pointers `l, r` move inward; if mismatch → return `false`.

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

```swift
class Solution {
    func partition(_ s: String) -> [[String]] {
        var res = [[String]]()
        var part = [String]()
        let sArray = Array(s)

        func dfs(_ i: Int) {
            if i >= sArray.count {
                res.append(part)
                return
            }
            for j in i..<sArray.count {
                if isPali(sArray, i, j) {
                    part.append(String(sArray[i...j]))
                    dfs(j + 1)
                    part.removeLast()
                }
            }
        }

        func isPali(_ s: [Character], _ l: Int, _ r: Int) -> Bool {
            var l = l, r = r
            while l < r {
                if s[l] != s[r] {
                    return false
                }
                l += 1
                r -= 1
            }
            return true
        }

        dfs(0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(n * 2 ^ n)$ space for the output list.

---

## 3. Backtracking (DP)

### Intuition
In plain backtracking, we **repeatedly check** whether substrings are palindromes, which costs extra time.  
To optimize this, we **precompute all palindrome substrings once** using Dynamic Programming (DP).

Idea:
- First, build a DP table `dp[i][j]` that tells whether `s[i..j]` is a palindrome.
- Then use backtracking just like before, but instead of checking palindromes on the fly, we **directly look up `dp[i][j]`**.

This makes backtracking faster because palindrome checks become **O(1)**.

### Algorithm

**Step 1: Precompute Palindromes (DP)**
1. Create a 2D table `dp` where:
   - `dp[i][j] = True` if substring `s[i..j]` is a palindrome.
2. Fill it by increasing substring length:
   - Single characters are palindromes.
   - For longer substrings:
     - `s[i] == s[j]` and inner substring is palindrome (or length ≤ 2).

---

**Step 2: Backtracking**
1. Maintain:
   - `part`: current partition.
   - `res`: all valid palindrome partitions.
2. Define `dfs(i)`:
   - `i` = starting index for next substring.
3. Base case:
   - If `i == len(s)`, add a copy of `part` to `res`.
4. Try all `j` from `i` to end:
   - If `dp[i][j]` is `true`:
     - Choose substring `s[i..j]`.
     - Recurse on `dfs(j + 1)`.
     - Backtrack (remove last choice).

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
                dp[i][i + l - 1] =
                    s[i] === s[i + l - 1] &&
                    (i + 1 > i + l - 2 || dp[i + 1][i + l - 2]);
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
        };
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

```swift
class Solution {
    func partition(_ s: String) -> [[String]] {
        let n = s.count
        let sArray = Array(s)
        var dp = Array(repeating: Array(repeating: false, count: n), count: n)

        for l in 1...n {
            for i in 0...(n - l) {
                dp[i][i + l - 1] = (sArray[i] == sArray[i + l - 1] &&
                                    (i + 1 > (i + l - 2) || dp[i + 1][i + l - 2]))
            }
        }

        var res = [[String]]()
        var part = [String]()

        func dfs(_ i: Int) {
            if i >= sArray.count {
                res.append(part)
                return
            }
            for j in i..<sArray.count {
                if dp[i][j] {
                    part.append(String(sArray[i...j]))
                    dfs(j + 1)
                    part.removeLast()
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

- Time complexity: $O(n * 2 ^ n)$
- Space complexity:
    - $O(n ^ 2)$ extra space.
    - $O(n * 2 ^ n)$ space for the output list.

---

## 4. Recursion

### Intuition
This approach combines **Dynamic Programming** and **pure recursion (return-based)**.

- We first **precompute all palindromic substrings** using DP.
- Then we use recursion where each recursive call:
  - **returns all valid palindrome partitions** starting from a given index.
- Instead of maintaining a global result or path, each recursive call builds and **returns its own list of partitions**, which makes the logic clean and declarative.

Think of it as:
> “All partitions starting at index `i` =  
> choose a palindrome `s[i..j]` + all partitions starting at `j + 1`”

### Algorithm

**Step 1: Precompute Palindromes (DP)**
1. Create a 2D table `dp[i][j]`.
2. `dp[i][j] = True` if substring `s[i..j]` is a palindrome.
3. Fill the table by increasing substring length:
   - Characters at ends must match.
   - Inner substring must already be a palindrome (or be empty).

---

**Step 2: Recursive Construction**
1. Define `dfs(i)`:
   - Returns **all palindrome partitions** starting from index `i`.
2. Base case:
   - If `i == len(s)`, return `[[]]` (one empty partition).
3. Recursive case:
   - For every `j` from `i` to end:
     - If `dp[i][j]` is `true`:
       - Recursively get partitions from `dfs(j + 1)`.
       - Prepend `s[i..j]` to each returned partition.
4. Return the collected partitions.

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
                dp[i][i + l - 1] =
                    s[i] === s[i + l - 1] &&
                    (i + 1 > i + l - 2 || dp[i + 1][i + l - 2]);
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

```swift
class Solution {
    func partition(_ s: String) -> [[String]] {
        let n = s.count
        let sArray = Array(s)
        var dp = Array(repeating: Array(repeating: false, count: n), count: n)

        for l in 1...n {
            for i in 0...(n - l) {
                dp[i][i + l - 1] = (sArray[i] == sArray[i + l - 1] &&
                                    (i + 1 > (i + l - 2) || dp[i + 1][i + l - 2]))
            }
        }

        func dfs(_ i: Int) -> [[String]] {
            if i >= n {
                return [[]]
            }

            var ret = [[String]]()
            for j in i..<n {
                if dp[i][j] {
                    let nextPartitions = dfs(j + 1)
                    for part in nextPartitions {
                        var cur = [String]()
                        cur.append(String(sArray[i...j]))
                        cur.append(contentsOf: part)
                        ret.append(cur)
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

- Time complexity: $O(n * 2 ^ n)$
- Space complexity:
    - $O(n ^ 2)$ extra space.
    - $O(n * 2 ^ n)$ space for the output list.
