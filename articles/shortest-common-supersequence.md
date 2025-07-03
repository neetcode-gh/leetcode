## 1. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * min(n, m))$
- Space complexity: $O(n * m * min(n, m))$

> Where $n$ and $m$ are the lengths of the strings $str1$ and $str2$ respectively.

---

## 2. Dynamic Programming (Top-Down) + Tracing

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ and $m$ are the lengths of the strings $str1$ and $str2$ respectively.

---

## 3. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * min(n, m))$
- Space complexity: $O(n * m * min(n, m))$

> Where $n$ and $m$ are the lengths of the strings $str1$ and $str2$ respectively.

---

## 4. Dynamic Programming (Bottom-Up) + Tracing

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ and $m$ are the lengths of the strings $str1$ and $str2$ respectively.
