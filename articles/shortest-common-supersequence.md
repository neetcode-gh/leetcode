## 1. Dynamic Programming (Top-Down)

### Intuition

A supersequence must contain both strings as subsequences. The shortest one minimizes redundancy by sharing as many characters as possible between the two strings. This is directly related to the Longest Common Subsequence (LCS) problem.

Using recursion with memoization, at each position we have a choice: if the characters match, we include it once and move both pointers. If they differ, we try including either character and pick the shorter result. The base case handles when one string is exhausted, requiring us to append the remainder of the other.

### Algorithm

1. Define a recursive function `dfs(i, j)` that returns the shortest supersequence starting from indices `i` and `j`.
2. Base cases:
   - If `i` reaches the end of `str1`, return the remaining suffix of `str2`.
   - If `j` reaches the end of `str2`, return the remaining suffix of `str1`.
3. Recursive case:
   - If `str1[i] == str2[j]`, include this character once and recurse on `(i+1, j+1)`.
   - Otherwise, try both options: include `str1[i]` and recurse on `(i+1, j)`, or include `str2[j]` and recurse on `(i, j+1)`. Pick the shorter result.
4. Memoize results to avoid recomputation.
5. Return the result of `dfs(0, 0)`.

::tabs-start

```python
class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        cache = [[None] * (len(str2) + 1) for _ in range(len(str1) + 1)]
        str1 = list(str1)
        str2 = list(str2)

        def dfs(i: int, j: int) -> list:
            if cache[i][j] is not None:
                return cache[i][j]
            if i == len(str1):
                cache[i][j] = str2[j:][::-1]
                return cache[i][j]
            if j == len(str2):
                cache[i][j] = str1[i:][::-1]
                return cache[i][j]

            if str1[i] == str2[j]:
                res = dfs(i + 1, j + 1) + [str1[i]]
            else:
                s1 = dfs(i + 1, j)
                s2 = dfs(i, j + 1)
                if len(s1) < len(s2):
                    res = s1 + [str1[i]]
                else:
                    res = s2 + [str2[j]]

            cache[i][j] = res
            return res

        return ''.join(reversed(dfs(0, 0)))
```

```java
public class Solution {
    private List<Character>[][] cache;
    private int n, m;

    public String shortestCommonSupersequence(String str1, String str2) {
        n = str1.length();
        m = str2.length();
        cache = new ArrayList[n + 1][m + 1];

        List<Character> res = dfs(0, 0, str1, str2);
        StringBuilder sb = new StringBuilder();
        for (int k = res.size() - 1; k >= 0; k--) sb.append(res.get(k));
        return sb.toString();
    }

    private List<Character> dfs(int i, int j, String str1, String str2) {
        if (cache[i][j] != null) return cache[i][j];
        if (i == n) {
            List<Character> res = new ArrayList<>();
            for (int k = m - 1; k >= j; k--) {
                res.add(str2.charAt(k));
            }
            cache[i][j] = res;
            return res;
        }
        if (j == m) {
            List<Character> res = new ArrayList<>();
            for (int k = n - 1; k >= i; k--) {
                res.add(str1.charAt(k));
            }
            cache[i][j] = res;
            return res;
        }

        List<Character> res;
        if (str1.charAt(i) == str2.charAt(j)) {
            res = new ArrayList<>(dfs(i + 1, j + 1, str1, str2));
            res.add(str1.charAt(i));
        } else {
            List<Character> s1 = dfs(i + 1, j, str1, str2);
            List<Character> s2 = dfs(i, j + 1, str1, str2);

            if (s1.size() < s2.size()) {
                res = new ArrayList<>(s1);
                res.add(str1.charAt(i));
            } else {
                res = new ArrayList<>(s2);
                res.add(str2.charAt(j));
            }
        }

        cache[i][j] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    string shortestCommonSupersequence(const string &str1, const string &str2) {
        n = str1.size();
        m = str2.size();
        cache.resize(n + 1, vector<string>(m + 1, ""));
        cacheUsed.resize(n + 1, vector<bool>(m + 1, false));

        string res = dfs(0, 0, str1, str2);
        reverse(res.begin(), res.end());
        return res;
    }

private:
    int n, m;
    vector<vector<string>> cache;
    vector<vector<bool>> cacheUsed;

    string dfs(int i, int j, const string &str1, const string &str2) {
        if (cacheUsed[i][j]) {
            return cache[i][j];
        }
        cacheUsed[i][j] = true;

        if (i == n) {
            string tail = str2.substr(j);
            reverse(tail.begin(), tail.end());
            cache[i][j] = tail;
            return tail;
        }
        if (j == m) {
            string tail = str1.substr(i);
            reverse(tail.begin(), tail.end());
            cache[i][j] = tail;
            return tail;
        }

        if (str1[i] == str2[j]) {
            string temp = dfs(i + 1, j + 1, str1, str2);
            temp.push_back(str1[i]);
            cache[i][j] = temp;
        } else {
            string s1 = dfs(i + 1, j, str1, str2);
            string s2 = dfs(i, j + 1, str1, str2);
            if (s1.size() < s2.size()) {
                s1.push_back(str1[i]);
                cache[i][j] = s1;
            } else {
                s2.push_back(str2[j]);
                cache[i][j] = s2;
            }
        }
        return cache[i][j];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} str1
     * @param {string} str2
     * @return {string}
     */
    shortestCommonSupersequence(str1, str2) {
        const n = str1.length,
            m = str2.length;
        const cache = Array.from({ length: n + 1 }, () =>
            Array(m + 1).fill(null),
        );

        const dfs = (i, j) => {
            if (cache[i][j] !== null) return cache[i][j];
            if (i === n) {
                let arr = str2.slice(j).split('');
                arr.reverse();
                cache[i][j] = arr;
                return arr;
            }
            if (j === m) {
                let arr = str1.slice(i).split('');
                arr.reverse();
                cache[i][j] = arr;
                return arr;
            }
            let res;
            if (str1[i] === str2[j]) {
                res = [...dfs(i + 1, j + 1)];
                res.push(str1[i]);
            } else {
                const s1 = dfs(i + 1, j);
                const s2 = dfs(i, j + 1);
                if (s1.length < s2.length) {
                    res = [...s1];
                    res.push(str1[i]);
                } else {
                    res = [...s2];
                    res.push(str2[j]);
                }
            }
            cache[i][j] = res;
            return res;
        };

        return dfs(0, 0).reverse().join('');
    }
}
```

```csharp
public class Solution {
    private List<char>[][] cache;
    private int n, m;

    public string ShortestCommonSupersequence(string str1, string str2) {
        n = str1.Length;
        m = str2.Length;
        cache = new List<char>[n + 1][];
        for (int i = 0; i <= n; i++) {
            cache[i] = new List<char>[m + 1];
        }

        List<char> res = Dfs(0, 0, str1, str2);
        char[] arr = res.ToArray();
        Array.Reverse(arr);
        return new string(arr);
    }

    private List<char> Dfs(int i, int j, string str1, string str2) {
        if (cache[i][j] != null) return cache[i][j];
        if (i == n) {
            List<char> res = new List<char>();
            for (int k = m - 1; k >= j; k--) {
                res.Add(str2[k]);
            }
            cache[i][j] = res;
            return res;
        }
        if (j == m) {
            List<char> res = new List<char>();
            for (int k = n - 1; k >= i; k--) {
                res.Add(str1[k]);
            }
            cache[i][j] = res;
            return res;
        }

        List<char> result;
        if (str1[i] == str2[j]) {
            result = new List<char>(Dfs(i + 1, j + 1, str1, str2));
            result.Add(str1[i]);
        } else {
            List<char> s1 = Dfs(i + 1, j, str1, str2);
            List<char> s2 = Dfs(i, j + 1, str1, str2);

            if (s1.Count < s2.Count) {
                result = new List<char>(s1);
                result.Add(str1[i]);
            } else {
                result = new List<char>(s2);
                result.Add(str2[j]);
            }
        }

        cache[i][j] = result;
        return result;
    }
}
```

```go
func shortestCommonSupersequence(str1 string, str2 string) string {
    n, m := len(str1), len(str2)
    cache := make([][]string, n+1)
    cacheSet := make([][]bool, n+1)
    for i := 0; i <= n; i++ {
        cache[i] = make([]string, m+1)
        cacheSet[i] = make([]bool, m+1)
    }

    var dfs func(i, j int) string
    dfs = func(i, j int) string {
        if cacheSet[i][j] {
            return cache[i][j]
        }
        cacheSet[i][j] = true

        if i == n {
            tail := reverse(str2[j:])
            cache[i][j] = tail
            return tail
        }
        if j == m {
            tail := reverse(str1[i:])
            cache[i][j] = tail
            return tail
        }

        if str1[i] == str2[j] {
            temp := dfs(i+1, j+1) + string(str1[i])
            cache[i][j] = temp
        } else {
            s1 := dfs(i+1, j)
            s2 := dfs(i, j+1)
            if len(s1) < len(s2) {
                cache[i][j] = s1 + string(str1[i])
            } else {
                cache[i][j] = s2 + string(str2[j])
            }
        }
        return cache[i][j]
    }

    res := dfs(0, 0)
    return reverse(res)
}

func reverse(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}
```

```kotlin
class Solution {
    private lateinit var cache: Array<Array<MutableList<Char>?>>
    private var n = 0
    private var m = 0

    fun shortestCommonSupersequence(str1: String, str2: String): String {
        n = str1.length
        m = str2.length
        cache = Array(n + 1) { arrayOfNulls<MutableList<Char>>(m + 1) }

        val res = dfs(0, 0, str1, str2)
        return res.reversed().joinToString("")
    }

    private fun dfs(i: Int, j: Int, str1: String, str2: String): MutableList<Char> {
        cache[i][j]?.let { return it }

        if (i == n) {
            val res = mutableListOf<Char>()
            for (k in m - 1 downTo j) {
                res.add(str2[k])
            }
            cache[i][j] = res
            return res
        }
        if (j == m) {
            val res = mutableListOf<Char>()
            for (k in n - 1 downTo i) {
                res.add(str1[k])
            }
            cache[i][j] = res
            return res
        }

        val result: MutableList<Char>
        if (str1[i] == str2[j]) {
            result = dfs(i + 1, j + 1, str1, str2).toMutableList()
            result.add(str1[i])
        } else {
            val s1 = dfs(i + 1, j, str1, str2)
            val s2 = dfs(i, j + 1, str1, str2)

            if (s1.size < s2.size) {
                result = s1.toMutableList()
                result.add(str1[i])
            } else {
                result = s2.toMutableList()
                result.add(str2[j])
            }
        }

        cache[i][j] = result
        return result
    }
}
```

```swift
class Solution {
    private var cache: [[[Character]?]] = []
    private var n = 0
    private var m = 0

    func shortestCommonSupersequence(_ str1: String, _ str2: String) -> String {
        let s1 = Array(str1)
        let s2 = Array(str2)
        n = s1.count
        m = s2.count
        cache = Array(repeating: Array(repeating: nil, count: m + 1), count: n + 1)

        let res = dfs(0, 0, s1, s2)
        return String(res.reversed())
    }

    private func dfs(_ i: Int, _ j: Int, _ str1: [Character], _ str2: [Character]) -> [Character] {
        if let cached = cache[i][j] {
            return cached
        }

        if i == n {
            var res = [Character]()
            for k in stride(from: m - 1, through: j, by: -1) {
                res.append(str2[k])
            }
            cache[i][j] = res
            return res
        }
        if j == m {
            var res = [Character]()
            for k in stride(from: n - 1, through: i, by: -1) {
                res.append(str1[k])
            }
            cache[i][j] = res
            return res
        }

        var result: [Character]
        if str1[i] == str2[j] {
            result = dfs(i + 1, j + 1, str1, str2)
            result.append(str1[i])
        } else {
            let s1 = dfs(i + 1, j, str1, str2)
            let s2 = dfs(i, j + 1, str1, str2)

            if s1.count < s2.count {
                result = s1
                result.append(str1[i])
            } else {
                result = s2
                result.append(str2[j])
            }
        }

        cache[i][j] = result
        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * min(n, m))$
- Space complexity: $O(n * m * min(n, m))$

> Where $n$ and $m$ are the lengths of the strings $str1$ and $str2$ respectively.

---

## 2. Dynamic Programming (Top-Down) + Tracing

### Intuition

Building the actual string during recursion can be expensive due to string concatenation overhead. A more efficient approach is to first compute only the lengths using DP, then reconstruct the string by tracing back through the DP table.

The DP table stores the length of the shortest supersequence from each state `(i, j)`. After filling the table, we trace from `(0, 0)` to the end, at each step deciding which character to include based on the DP values.

### Algorithm

1. Define a recursive function `dfs(i, j)` that returns the length of the shortest supersequence starting from indices `i` and `j`.
2. Base cases: return `m - j` or `n - i` when one string is exhausted.
3. Recursive case: if characters match, add 1 and recurse on `(i+1, j+1)`. Otherwise, take the minimum of recursing on `(i+1, j)` or `(i, j+1)`, plus 1.
4. After computing the DP table, trace back:
   - Start at `(0, 0)`.
   - If characters match, include it and move both pointers.
   - Otherwise, follow the direction with the smaller DP value.
5. Append any remaining characters from either string.
6. Return the constructed string.

::tabs-start

```python
class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        n, m = len(str1), len(str2)
        dp = [[-1] * (m + 1) for _ in range(n + 1)]

        def dfs(i, j):
            if dp[i][j] != -1:
                return dp[i][j]
            if i == n:
                dp[i][j] = m - j
                return dp[i][j]
            if j == m:
                dp[i][j] = n - i
                return dp[i][j]
            if str1[i] == str2[j]:
                dp[i][j] = 1 + dfs(i + 1, j + 1)
            else:
                dp[i][j] = 1 + min(dfs(i + 1, j), dfs(i, j + 1))
            return dp[i][j]

        dfs(0, 0)

        def build_scs(i, j):
            res = []
            while i < n or j < m:
                if i == n:
                    res.extend(str2[j:])
                    break
                if j == m:
                    res.extend(str1[i:])
                    break
                if str1[i] == str2[j]:
                    res.append(str1[i])
                    i += 1
                    j += 1
                elif dp[i + 1][j] < dp[i][j + 1]:
                    res.append(str1[i])
                    i += 1
                else:
                    res.append(str2[j])
                    j += 1
            return res

        return ''.join(build_scs(0, 0))
```

```java
public class Solution {
    private int[][] dp;
    private int n, m;

    public String shortestCommonSupersequence(String str1, String str2) {
        n = str1.length();
        m = str2.length();
        dp = new int[n + 1][m + 1];

        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        dfs(0, 0, str1, str2);

        return buildSCS(str1, str2);
    }

    private int dfs(int i, int j, String str1, String str2) {
        if (dp[i][j] != -1) return dp[i][j];
        if (i == n) return dp[i][j] = m - j;
        if (j == m) return dp[i][j] = n - i;

        if (str1.charAt(i) == str2.charAt(j)) {
            dp[i][j] = 1 + dfs(i + 1, j + 1, str1, str2);
        } else {
            dp[i][j] = 1 + Math.min(dfs(i + 1, j, str1, str2), dfs(i, j + 1, str1, str2));
        }
        return dp[i][j];
    }

    private String buildSCS(String str1, String str2) {
        StringBuilder res = new StringBuilder();
        int i = 0, j = 0;

        while (i < n || j < m) {
            if (i == n) {
                res.append(str2.substring(j));
                break;
            }
            if (j == m) {
                res.append(str1.substring(i));
                break;
            }
            if (str1.charAt(i) == str2.charAt(j)) {
                res.append(str1.charAt(i));
                i++;
                j++;
            } else if (dp[i + 1][j] < dp[i][j + 1]) {
                res.append(str1.charAt(i));
                i++;
            } else {
                res.append(str2.charAt(j));
                j++;
            }
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;
    int n, m;

    int dfs(int i, int j, const string& str1, const string& str2) {
        if (dp[i][j] != -1) return dp[i][j];
        if (i == n) return dp[i][j] = m - j;
        if (j == m) return dp[i][j] = n - i;

        if (str1[i] == str2[j]) {
            dp[i][j] = 1 + dfs(i + 1, j + 1, str1, str2);
        } else {
            dp[i][j] = 1 + min(dfs(i + 1, j, str1, str2), dfs(i, j + 1, str1, str2));
        }
        return dp[i][j];
    }

    string buildSCS(const string& str1, const string& str2) {
        string res;
        int i = 0, j = 0;

        while (i < n || j < m) {
            if (i == n) {
                res += str2.substr(j);
                break;
            }
            if (j == m) {
                res += str1.substr(i);
                break;
            }
            if (str1[i] == str2[j]) {
                res += str1[i];
                i++;
                j++;
            } else if (dp[i + 1][j] < dp[i][j + 1]) {
                res += str1[i];
                i++;
            } else {
                res += str2[j];
                j++;
            }
        }

        return res;
    }

public:
    string shortestCommonSupersequence(string str1, string str2) {
        n = str1.size();
        m = str2.size();
        dp = vector<vector<int>>(n + 1, vector<int>(m + 1, -1));

        dfs(0, 0, str1, str2);
        return buildSCS(str1, str2);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} str1
     * @param {string} str2
     * @return {string}
     */
    shortestCommonSupersequence(str1, str2) {
        const n = str1.length,
            m = str2.length;
        const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(-1));

        const dfs = (i, j) => {
            if (dp[i][j] !== -1) return dp[i][j];
            if (i === n) return (dp[i][j] = m - j);
            if (j === m) return (dp[i][j] = n - i);

            if (str1[i] === str2[j]) {
                dp[i][j] = 1 + dfs(i + 1, j + 1);
            } else {
                dp[i][j] = 1 + Math.min(dfs(i + 1, j), dfs(i, j + 1));
            }
            return dp[i][j];
        };

        dfs(0, 0);

        const buildSCS = () => {
            const res = [];
            let i = 0,
                j = 0;

            while (i < n || j < m) {
                if (i === n) {
                    res.push(...str2.slice(j));
                    break;
                }
                if (j === m) {
                    res.push(...str1.slice(i));
                    break;
                }
                if (str1[i] === str2[j]) {
                    res.push(str1[i]);
                    i++;
                    j++;
                } else if (dp[i + 1][j] < dp[i][j + 1]) {
                    res.push(str1[i]);
                    i++;
                } else {
                    res.push(str2[j]);
                    j++;
                }
            }

            return res.join('');
        };

        return buildSCS();
    }
}
```

```csharp
public class Solution {
    private int[][] dp;
    private int n, m;

    public string ShortestCommonSupersequence(string str1, string str2) {
        n = str1.Length;
        m = str2.Length;
        dp = new int[n + 1][];
        for (int i = 0; i <= n; i++) {
            dp[i] = new int[m + 1];
            Array.Fill(dp[i], -1);
        }

        Dfs(0, 0, str1, str2);

        return BuildSCS(str1, str2);
    }

    private int Dfs(int i, int j, string str1, string str2) {
        if (dp[i][j] != -1) return dp[i][j];
        if (i == n) return dp[i][j] = m - j;
        if (j == m) return dp[i][j] = n - i;

        if (str1[i] == str2[j]) {
            dp[i][j] = 1 + Dfs(i + 1, j + 1, str1, str2);
        } else {
            dp[i][j] = 1 + Math.Min(Dfs(i + 1, j, str1, str2), Dfs(i, j + 1, str1, str2));
        }
        return dp[i][j];
    }

    private string BuildSCS(string str1, string str2) {
        StringBuilder res = new StringBuilder();
        int i = 0, j = 0;

        while (i < n || j < m) {
            if (i == n) {
                res.Append(str2.Substring(j));
                break;
            }
            if (j == m) {
                res.Append(str1.Substring(i));
                break;
            }
            if (str1[i] == str2[j]) {
                res.Append(str1[i]);
                i++;
                j++;
            } else if (dp[i + 1][j] < dp[i][j + 1]) {
                res.Append(str1[i]);
                i++;
            } else {
                res.Append(str2[j]);
                j++;
            }
        }

        return res.ToString();
    }
}
```

```go
func shortestCommonSupersequence(str1 string, str2 string) string {
    n, m := len(str1), len(str2)
    dp := make([][]int, n+1)
    for i := 0; i <= n; i++ {
        dp[i] = make([]int, m+1)
        for j := 0; j <= m; j++ {
            dp[i][j] = -1
        }
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if dp[i][j] != -1 {
            return dp[i][j]
        }
        if i == n {
            dp[i][j] = m - j
            return dp[i][j]
        }
        if j == m {
            dp[i][j] = n - i
            return dp[i][j]
        }

        if str1[i] == str2[j] {
            dp[i][j] = 1 + dfs(i+1, j+1)
        } else {
            dp[i][j] = 1 + min(dfs(i+1, j), dfs(i, j+1))
        }
        return dp[i][j]
    }

    dfs(0, 0)

    var res strings.Builder
    i, j := 0, 0

    for i < n || j < m {
        if i == n {
            res.WriteString(str2[j:])
            break
        }
        if j == m {
            res.WriteString(str1[i:])
            break
        }
        if str1[i] == str2[j] {
            res.WriteByte(str1[i])
            i++
            j++
        } else if dp[i+1][j] < dp[i][j+1] {
            res.WriteByte(str1[i])
            i++
        } else {
            res.WriteByte(str2[j])
            j++
        }
    }

    return res.String()
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<IntArray>
    private var n = 0
    private var m = 0

    fun shortestCommonSupersequence(str1: String, str2: String): String {
        n = str1.length
        m = str2.length
        dp = Array(n + 1) { IntArray(m + 1) { -1 } }

        dfs(0, 0, str1, str2)

        return buildSCS(str1, str2)
    }

    private fun dfs(i: Int, j: Int, str1: String, str2: String): Int {
        if (dp[i][j] != -1) return dp[i][j]
        if (i == n) {
            dp[i][j] = m - j
            return dp[i][j]
        }
        if (j == m) {
            dp[i][j] = n - i
            return dp[i][j]
        }

        dp[i][j] = if (str1[i] == str2[j]) {
            1 + dfs(i + 1, j + 1, str1, str2)
        } else {
            1 + minOf(dfs(i + 1, j, str1, str2), dfs(i, j + 1, str1, str2))
        }
        return dp[i][j]
    }

    private fun buildSCS(str1: String, str2: String): String {
        val res = StringBuilder()
        var i = 0
        var j = 0

        while (i < n || j < m) {
            if (i == n) {
                res.append(str2.substring(j))
                break
            }
            if (j == m) {
                res.append(str1.substring(i))
                break
            }
            if (str1[i] == str2[j]) {
                res.append(str1[i])
                i++
                j++
            } else if (dp[i + 1][j] < dp[i][j + 1]) {
                res.append(str1[i])
                i++
            } else {
                res.append(str2[j])
                j++
            }
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    private var dp: [[Int]] = []
    private var n = 0
    private var m = 0

    func shortestCommonSupersequence(_ str1: String, _ str2: String) -> String {
        let s1 = Array(str1)
        let s2 = Array(str2)
        n = s1.count
        m = s2.count
        dp = Array(repeating: Array(repeating: -1, count: m + 1), count: n + 1)

        _ = dfs(0, 0, s1, s2)

        return buildSCS(s1, s2)
    }

    private func dfs(_ i: Int, _ j: Int, _ str1: [Character], _ str2: [Character]) -> Int {
        if dp[i][j] != -1 { return dp[i][j] }
        if i == n {
            dp[i][j] = m - j
            return dp[i][j]
        }
        if j == m {
            dp[i][j] = n - i
            return dp[i][j]
        }

        if str1[i] == str2[j] {
            dp[i][j] = 1 + dfs(i + 1, j + 1, str1, str2)
        } else {
            dp[i][j] = 1 + min(dfs(i + 1, j, str1, str2), dfs(i, j + 1, str1, str2))
        }
        return dp[i][j]
    }

    private func buildSCS(_ str1: [Character], _ str2: [Character]) -> String {
        var res = [Character]()
        var i = 0, j = 0

        while i < n || j < m {
            if i == n {
                res.append(contentsOf: str2[j...])
                break
            }
            if j == m {
                res.append(contentsOf: str1[i...])
                break
            }
            if str1[i] == str2[j] {
                res.append(str1[i])
                i += 1
                j += 1
            } else if dp[i + 1][j] < dp[i][j + 1] {
                res.append(str1[i])
                i += 1
            } else {
                res.append(str2[j])
                j += 1
            }
        }

        return String(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ and $m$ are the lengths of the strings $str1$ and $str2$ respectively.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of recursion, we can fill the DP table iteratively from smaller subproblems to larger ones. The entry `dp[i][j]` stores the actual shortest supersequence for the prefixes `str1[0..i-1]` and `str2[0..j-1]`.

The base cases initialize the first row and column with prefixes of each string. For each cell, we either extend by a common character or choose the shorter option when characters differ.

### Algorithm

1. Create a 2D table `dp` of size `(n+1) x (m+1)` to store strings.
2. Fill base cases:
   - `dp[0][j] = str2[0..j-1]` for all j.
   - `dp[i][0] = str1[0..i-1]` for all i.
3. Fill the table row by row:
   - If `str1[i-1] == str2[j-1]`, set `dp[i][j] = dp[i-1][j-1] + str1[i-1]`.
   - Otherwise, pick the shorter of `dp[i-1][j] + str1[i-1]` or `dp[i][j-1] + str2[j-1]`.
4. Return `dp[n][m]`.

::tabs-start

```python
class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        n, m = len(str1), len(str2)
        dp = [[""] * (m + 1) for _ in range(n + 1)]

        for i in range(n + 1):
            for j in range(m + 1):
                if i == 0:
                    dp[i][j] = str2[:j]
                elif j == 0:
                    dp[i][j] = str1[:i]
                elif str1[i - 1] == str2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + str1[i - 1]
                else:
                    if len(dp[i - 1][j]) < len(dp[i][j - 1]):
                        dp[i][j] = dp[i - 1][j] + str1[i - 1]
                    else:
                        dp[i][j] = dp[i][j - 1] + str2[j - 1]

        return dp[n][m]
```

```java
public class Solution {
    public String shortestCommonSupersequence(String str1, String str2) {
        int n = str1.length(), m = str2.length();
        String[][] dp = new String[n + 1][m + 1];

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i == 0) {
                    dp[i][j] = str2.substring(0, j);
                } else if (j == 0) {
                    dp[i][j] = str1.substring(0, i);
                } else if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + str1.charAt(i - 1);
                } else {
                    dp[i][j] = dp[i - 1][j].length() < dp[i][j - 1].length() ?
                        dp[i - 1][j] + str1.charAt(i - 1) :
                        dp[i][j - 1] + str2.charAt(j - 1);
                }
            }
        }

        return dp[n][m];
    }
}
```

```cpp
class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int n = str1.size(), m = str2.size();
        vector<vector<string>> dp(n + 1, vector<string>(m + 1));

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i == 0) {
                    dp[i][j] = str2.substr(0, j);
                } else if (j == 0) {
                    dp[i][j] = str1.substr(0, i);
                } else if (str1[i - 1] == str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + str1[i - 1];
                } else {
                    dp[i][j] = dp[i - 1][j].size() < dp[i][j - 1].size() ?
                               dp[i - 1][j] + str1[i - 1] :
                               dp[i][j - 1] + str2[j - 1];
                }
            }
        }

        return dp[n][m];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} str1
     * @param {string} str2
     * @return {string}
     */
    shortestCommonSupersequence(str1, str2) {
        const n = str1.length,
            m = str2.length;
        const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(''));

        for (let i = 0; i <= n; i++) {
            for (let j = 0; j <= m; j++) {
                if (i === 0) {
                    dp[i][j] = str2.slice(0, j);
                } else if (j === 0) {
                    dp[i][j] = str1.slice(0, i);
                } else if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + str1[i - 1];
                } else {
                    dp[i][j] =
                        dp[i - 1][j].length < dp[i][j - 1].length
                            ? dp[i - 1][j] + str1[i - 1]
                            : dp[i][j - 1] + str2[j - 1];
                }
            }
        }

        return dp[n][m];
    }
}
```

```csharp
public class Solution {
    public string ShortestCommonSupersequence(string str1, string str2) {
        int n = str1.Length, m = str2.Length;
        string[][] dp = new string[n + 1][];
        for (int i = 0; i <= n; i++) {
            dp[i] = new string[m + 1];
        }

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i == 0) {
                    dp[i][j] = str2.Substring(0, j);
                } else if (j == 0) {
                    dp[i][j] = str1.Substring(0, i);
                } else if (str1[i - 1] == str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + str1[i - 1];
                } else {
                    dp[i][j] = dp[i - 1][j].Length < dp[i][j - 1].Length ?
                        dp[i - 1][j] + str1[i - 1] :
                        dp[i][j - 1] + str2[j - 1];
                }
            }
        }

        return dp[n][m];
    }
}
```

```go
func shortestCommonSupersequence(str1 string, str2 string) string {
    n, m := len(str1), len(str2)
    dp := make([][]string, n+1)
    for i := 0; i <= n; i++ {
        dp[i] = make([]string, m+1)
    }

    for i := 0; i <= n; i++ {
        for j := 0; j <= m; j++ {
            if i == 0 {
                dp[i][j] = str2[:j]
            } else if j == 0 {
                dp[i][j] = str1[:i]
            } else if str1[i-1] == str2[j-1] {
                dp[i][j] = dp[i-1][j-1] + string(str1[i-1])
            } else {
                if len(dp[i-1][j]) < len(dp[i][j-1]) {
                    dp[i][j] = dp[i-1][j] + string(str1[i-1])
                } else {
                    dp[i][j] = dp[i][j-1] + string(str2[j-1])
                }
            }
        }
    }

    return dp[n][m]
}
```

```kotlin
class Solution {
    fun shortestCommonSupersequence(str1: String, str2: String): String {
        val n = str1.length
        val m = str2.length
        val dp = Array(n + 1) { Array(m + 1) { "" } }

        for (i in 0..n) {
            for (j in 0..m) {
                if (i == 0) {
                    dp[i][j] = str2.substring(0, j)
                } else if (j == 0) {
                    dp[i][j] = str1.substring(0, i)
                } else if (str1[i - 1] == str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + str1[i - 1]
                } else {
                    dp[i][j] = if (dp[i - 1][j].length < dp[i][j - 1].length) {
                        dp[i - 1][j] + str1[i - 1]
                    } else {
                        dp[i][j - 1] + str2[j - 1]
                    }
                }
            }
        }

        return dp[n][m]
    }
}
```

```swift
class Solution {
    func shortestCommonSupersequence(_ str1: String, _ str2: String) -> String {
        let s1 = Array(str1)
        let s2 = Array(str2)
        let n = s1.count, m = s2.count
        var dp = Array(repeating: Array(repeating: "", count: m + 1), count: n + 1)

        for i in 0...n {
            for j in 0...m {
                if i == 0 {
                    dp[i][j] = String(s2[0..<j])
                } else if j == 0 {
                    dp[i][j] = String(s1[0..<i])
                } else if s1[i - 1] == s2[j - 1] {
                    dp[i][j] = dp[i - 1][j - 1] + String(s1[i - 1])
                } else {
                    dp[i][j] = dp[i - 1][j].count < dp[i][j - 1].count ?
                        dp[i - 1][j] + String(s1[i - 1]) :
                        dp[i][j - 1] + String(s2[j - 1])
                }
            }
        }

        return dp[n][m]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * min(n, m))$
- Space complexity: $O(n * m * min(n, m))$

> Where $n$ and $m$ are the lengths of the strings $str1$ and $str2$ respectively.

---

## 4. Dynamic Programming (Bottom-Up) + Tracing

### Intuition

Storing full strings in the DP table is memory-intensive. A more space-efficient approach stores only the lengths, then reconstructs the string by tracing backward through the table.

This is the standard approach for the problem: compute the DP table of lengths bottom-up, then trace from `(n, m)` back to `(0, 0)`, building the result string in reverse.

### Algorithm

1. Create a 2D table `dp` of size `(n+1) x (m+1)` to store lengths.
2. Fill base cases: `dp[0][j] = j` and `dp[i][0] = i`.
3. Fill the table:
   - If `str1[i-1] == str2[j-1]`, set `dp[i][j] = 1 + dp[i-1][j-1]`.
   - Otherwise, set `dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1])`.
4. Trace back from `(n, m)`:
   - If characters match, include it and move diagonally.
   - Otherwise, follow the smaller value (up or left) and include that character.
5. Append remaining characters from either string.
6. Reverse the result and return.

::tabs-start

```python
class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        n, m = len(str1), len(str2)
        dp = [[0] * (m + 1) for _ in range(n + 1)]

        for i in range(n + 1):
            for j in range(m + 1):
                if i == 0:
                    dp[i][j] = j
                elif j == 0:
                    dp[i][j] = i
                elif str1[i - 1] == str2[j - 1]:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1])

        res = []
        i, j = n, m
        while i > 0 and j > 0:
            if str1[i - 1] == str2[j - 1]:
                res.append(str1[i - 1])
                i -= 1
                j -= 1
            elif dp[i - 1][j] < dp[i][j - 1]:
                res.append(str1[i - 1])
                i -= 1
            else:
                res.append(str2[j - 1])
                j -= 1

        while i > 0:
            res.append(str1[i - 1])
            i -= 1

        while j > 0:
            res.append(str2[j - 1])
            j -= 1

        return ''.join(reversed(res))
```

```java
public class Solution {
    public String shortestCommonSupersequence(String str1, String str2) {
        int n = str1.length(), m = str2.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        StringBuilder res = new StringBuilder();
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                res.append(str1.charAt(i - 1));
                i--;
                j--;
            } else if (dp[i - 1][j] < dp[i][j - 1]) {
                res.append(str1.charAt(i - 1));
                i--;
            } else {
                res.append(str2.charAt(j - 1));
                j--;
            }
        }
        while (i > 0) {
            res.append(str1.charAt(i - 1));
            i--;
        }
        while (j > 0) {
            res.append(str2.charAt(j - 1));
            j--;
        }

        return res.reverse().toString();
    }
}
```

```cpp
class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int n = str1.size(), m = str2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else if (str1[i - 1] == str2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        string res;
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (str1[i - 1] == str2[j - 1]) {
                res.push_back(str1[i - 1]);
                i--;
                j--;
            } else if (dp[i - 1][j] < dp[i][j - 1]) {
                res.push_back(str1[i - 1]);
                i--;
            } else {
                res.push_back(str2[j - 1]);
                j--;
            }
        }

        while (i > 0) {
            res.push_back(str1[i - 1]);
            i--;
        }

        while (j > 0) {
            res.push_back(str2[j - 1]);
            j--;
        }

        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} str1
     * @param {string} str2
     * @return {string}
     */
    shortestCommonSupersequence(str1, str2) {
        const n = str1.length,
            m = str2.length;
        const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

        for (let i = 0; i <= n; i++) {
            for (let j = 0; j <= m; j++) {
                if (i === 0) {
                    dp[i][j] = j;
                } else if (j === 0) {
                    dp[i][j] = i;
                } else if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        const res = [];
        let i = n,
            j = m;
        while (i > 0 && j > 0) {
            if (str1[i - 1] === str2[j - 1]) {
                res.push(str1[i - 1]);
                i--;
                j--;
            } else if (dp[i - 1][j] < dp[i][j - 1]) {
                res.push(str1[i - 1]);
                i--;
            } else {
                res.push(str2[j - 1]);
                j--;
            }
        }

        while (i > 0) {
            res.push(str1[i - 1]);
            i--;
        }

        while (j > 0) {
            res.push(str2[j - 1]);
            j--;
        }

        return res.reverse().join('');
    }
}
```

```csharp
public class Solution {
    public string ShortestCommonSupersequence(string str1, string str2) {
        int n = str1.Length, m = str2.Length;
        int[][] dp = new int[n + 1][];
        for (int x = 0; x <= n; x++) {
            dp[x] = new int[m + 1];
        }

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else if (str1[i - 1] == str2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.Min(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        StringBuilder res = new StringBuilder();
        int ii = n, jj = m;
        while (ii > 0 && jj > 0) {
            if (str1[ii - 1] == str2[jj - 1]) {
                res.Append(str1[ii - 1]);
                ii--;
                jj--;
            } else if (dp[ii - 1][jj] < dp[ii][jj - 1]) {
                res.Append(str1[ii - 1]);
                ii--;
            } else {
                res.Append(str2[jj - 1]);
                jj--;
            }
        }
        while (ii > 0) {
            res.Append(str1[ii - 1]);
            ii--;
        }
        while (jj > 0) {
            res.Append(str2[jj - 1]);
            jj--;
        }

        char[] arr = res.ToString().ToCharArray();
        Array.Reverse(arr);
        return new string(arr);
    }
}
```

```go
func shortestCommonSupersequence(str1 string, str2 string) string {
    n, m := len(str1), len(str2)
    dp := make([][]int, n+1)
    for i := 0; i <= n; i++ {
        dp[i] = make([]int, m+1)
    }

    for i := 0; i <= n; i++ {
        for j := 0; j <= m; j++ {
            if i == 0 {
                dp[i][j] = j
            } else if j == 0 {
                dp[i][j] = i
            } else if str1[i-1] == str2[j-1] {
                dp[i][j] = 1 + dp[i-1][j-1]
            } else {
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1])
            }
        }
    }

    var res []byte
    i, j := n, m
    for i > 0 && j > 0 {
        if str1[i-1] == str2[j-1] {
            res = append(res, str1[i-1])
            i--
            j--
        } else if dp[i-1][j] < dp[i][j-1] {
            res = append(res, str1[i-1])
            i--
        } else {
            res = append(res, str2[j-1])
            j--
        }
    }

    for i > 0 {
        res = append(res, str1[i-1])
        i--
    }

    for j > 0 {
        res = append(res, str2[j-1])
        j--
    }

    for l, r := 0, len(res)-1; l < r; l, r = l+1, r-1 {
        res[l], res[r] = res[r], res[l]
    }
    return string(res)
}
```

```kotlin
class Solution {
    fun shortestCommonSupersequence(str1: String, str2: String): String {
        val n = str1.length
        val m = str2.length
        val dp = Array(n + 1) { IntArray(m + 1) }

        for (i in 0..n) {
            for (j in 0..m) {
                if (i == 0) {
                    dp[i][j] = j
                } else if (j == 0) {
                    dp[i][j] = i
                } else if (str1[i - 1] == str2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                } else {
                    dp[i][j] = 1 + minOf(dp[i - 1][j], dp[i][j - 1])
                }
            }
        }

        val res = StringBuilder()
        var i = n
        var j = m
        while (i > 0 && j > 0) {
            if (str1[i - 1] == str2[j - 1]) {
                res.append(str1[i - 1])
                i--
                j--
            } else if (dp[i - 1][j] < dp[i][j - 1]) {
                res.append(str1[i - 1])
                i--
            } else {
                res.append(str2[j - 1])
                j--
            }
        }

        while (i > 0) {
            res.append(str1[i - 1])
            i--
        }

        while (j > 0) {
            res.append(str2[j - 1])
            j--
        }

        return res.reverse().toString()
    }
}
```

```swift
class Solution {
    func shortestCommonSupersequence(_ str1: String, _ str2: String) -> String {
        let s1 = Array(str1)
        let s2 = Array(str2)
        let n = s1.count, m = s2.count
        var dp = Array(repeating: Array(repeating: 0, count: m + 1), count: n + 1)

        for i in 0...n {
            for j in 0...m {
                if i == 0 {
                    dp[i][j] = j
                } else if j == 0 {
                    dp[i][j] = i
                } else if s1[i - 1] == s2[j - 1] {
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                } else {
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1])
                }
            }
        }

        var res = [Character]()
        var i = n, j = m
        while i > 0 && j > 0 {
            if s1[i - 1] == s2[j - 1] {
                res.append(s1[i - 1])
                i -= 1
                j -= 1
            } else if dp[i - 1][j] < dp[i][j - 1] {
                res.append(s1[i - 1])
                i -= 1
            } else {
                res.append(s2[j - 1])
                j -= 1
            }
        }

        while i > 0 {
            res.append(s1[i - 1])
            i -= 1
        }

        while j > 0 {
            res.append(s2[j - 1])
            j -= 1
        }

        return String(res.reversed())
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ and $m$ are the lengths of the strings $str1$ and $str2$ respectively.
