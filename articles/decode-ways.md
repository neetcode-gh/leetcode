## 1. Recursion

::tabs-start

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        
        def dfs(i):
            if i == len(s):
                return 1
            if s[i] == '0':
                return 0

            res = dfs(i + 1)
            if i < len(s) - 1:
                if (s[i] == '1' or 
                   (s[i] == '2' and s[i + 1] < '7')):
                    res += dfs(i + 2)

            return res

        return dfs(0)
```

```java
public class Solution {
    private int dfs(int i, String s) {
        if (i == s.length()) return 1;
        if (s.charAt(i) == '0') return 0;

        int res = dfs(i + 1, s);
        if (i < s.length() - 1) {
            if (s.charAt(i) == '1' || 
               (s.charAt(i) == '2' && s.charAt(i + 1) < '7')) {
                res += dfs(i + 2, s);
            }
        }
        return res;
    }

    public int numDecodings(String s) {
        return dfs(0, s);
    }
}
```

```cpp
class Solution {
public:
    int dfs(int i, string& s) {
        if (i == s.size()) return 1;
        if (s[i] == '0') return 0;
        
        int res = dfs(i + 1, s);
        if (i < s.size() - 1) {
            if (s[i] == '1' || 
               (s[i] == '2' && s[i + 1] < '7')) {
                res += dfs(i + 2, s);
            }
        }
        return res;
    }

    int numDecodings(string s) {
        return dfs(0, s);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    numDecodings(s) {
        
        const dfs = (i) => {
            if (i === s.length) return 1;
            if (s[i] === '0') return 0;

            let res = dfs(i + 1);
            if (i < s.length - 1) {
                if (s[i] === '1' || 
                   (s[i] === '2' && s[i + 1] < '7')) {
                    res += dfs(i + 2);
                }
            }
            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public int NumDecodings(string s) {
        int Dfs(int i) {
            if (i == s.Length) return 1;
            if (s[i] == '0') return 0;

            int res = Dfs(i + 1);
            if (i < s.Length - 1) {
                if (s[i] == '1' || 
                   (s[i] == '2' && s[i + 1] < '7')) {
                    res += Dfs(i + 2);
                }
            }
            return res;
        }

        return Dfs(0);
    }
}
```

```go
func numDecodings(s string) int {
    return dfs(s, 0)
}

func dfs(s string, i int) int {
    if i == len(s) {
        return 1
    }
    if s[i] == '0' {
        return 0
    }
    res := dfs(s, i+1)
    if i < len(s)-1 {
        if s[i] == '1' || (s[i] == '2' && s[i+1] < '7') {
            res += dfs(s, i+2)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun numDecodings(s: String): Int {
        return dfs(s, 0)
    }

    fun dfs(s: String, i: Int): Int {
        if (i == s.length) {
            return 1
        }
        if (s[i] == '0') {
            return 0
        }
        var res = dfs(s, i + 1)
        if (i < s.length - 1) {
            if (s[i] == '1' || (s[i] == '2' && s[i + 1] < '7')) {
                res += dfs(s, i + 2)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ n)$
* Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        dp = {len(s) : 1}

        def dfs(i):
            if i in dp:
                return dp[i]
            if s[i] == "0":
                return 0

            res = dfs(i + 1)
            if i + 1 < len(s) and (
                s[i] == "1" or s[i] == "2" and
                s[i + 1] in "0123456"
            ):
                res += dfs(i + 2)
            dp[i] = res
            return res

        return dfs(0)
```

```java
public class Solution {
    
    public int numDecodings(String s) {
        Map<Integer, Integer> dp = new HashMap<>();
        dp.put(s.length(), 1);

        return dfs(s, 0, dp);
    }

    private int dfs(String s, int i, Map<Integer, Integer> dp) {
        if (dp.containsKey(i)) {
            return dp.get(i);
        }
        if (s.charAt(i) == '0') {
            return 0;
        }

        int res = dfs(s, i + 1, dp);
        if (i + 1 < s.length() && (s.charAt(i) == '1' || 
           s.charAt(i) == '2' && s.charAt(i + 1) < '7')) {
            res += dfs(s, i + 2, dp);
        }
        dp.put(i, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numDecodings(string s) {
        unordered_map<int, int> dp;
        dp[s.size()] = 1;
        return dfs(s, 0, dp);
    }

private:
    int dfs(string s, int i, unordered_map<int, int>& dp) {
        if (dp.count(i)) {
            return dp[i];
        }
        if (s[i] == '0') {
            return 0;
        }

        int res = dfs(s, i + 1, dp);
        if (i + 1 < s.size() && (s[i] == '1' || 
            s[i] == '2' && s[i + 1] < '7')) {
            res += dfs(s, i + 2, dp);
        }
        dp[i] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    numDecodings(s) {
        const dp = new Map();
        dp.set(s.length, 1);

        return this.dfs(s, 0, dp);
    }

    /**
     * @param {string} s
     * @param {number} i
     * @param {Map} dp
     * @return {number}
     */
    dfs(s, i, dp) {
        if (dp.has(i)) {
            return dp.get(i);
        }
        if (s.charAt(i) === '0') {
            return 0;
        }

        let res = this.dfs(s, i + 1, dp);
        if (i + 1 < s.length && (s.charAt(i) === '1' ||
           (s.charAt(i) === '2' && s.charAt(i + 1) < '7'))) {
            res += this.dfs(s, i + 2, dp);
        }
        dp.set(i, res);
        return res;
    }
}
```

```csharp
public class Solution {

    public int NumDecodings(string s) {
        Dictionary<int, int> dp = new Dictionary<int, int>();
        dp[s.Length] = 1;
        return Dfs(s, 0, dp);
    }

    private int Dfs(string s, int i, Dictionary<int, int> dp) {
        if (dp.ContainsKey(i)) {
            return dp[i];
        }
        if (s[i] == '0') {
            return 0;
        }

        int res = Dfs(s, i + 1, dp);
        if (i + 1 < s.Length && (s[i] == '1' || 
            s[i] == '2' && s[i + 1] < '7')) {
            res += Dfs(s, i + 2, dp);
        }
        dp[i] = res;
        return res;
    }
}
```

```go
func numDecodings(s string) int {
    return dfs(s, 0, map[int]int{len(s): 1})
}

func dfs(s string, i int, dp map[int]int) int {
    if val, ok := dp[i]; ok {
        return val
    }
    if i == len(s) {
        return 1
    }
    if s[i] == '0' {
        return 0
    }
    res := dfs(s, i+1, dp)
    if i+1 < len(s) && (s[i] == '1' || 
       (s[i] == '2' && s[i+1] <= '6')) {
        res += dfs(s, i+2, dp)
    }
    dp[i] = res
    return res
}
```

```kotlin
class Solution {
    fun numDecodings(s: String): Int {
        return dfs(s, 0, hashMapOf(s.length to 1))
    }

    fun dfs(s: String, i: Int, dp: HashMap<Int, Int>): Int {
        if (i in dp) {
            return dp[i]!!
        }
        if (i == s.length) {
            return 1
        }
        if (s[i] == '0') {
            return 0
        }
        var res = dfs(s, i + 1, dp)
        if (i + 1 < s.length && (s[i] == '1' || 
           (s[i] == '2' && s[i + 1] <= '6'))) {
            res += dfs(s, i + 2, dp)
        }
        dp[i] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        dp = {len(s): 1}
        for i in range(len(s) - 1, -1, -1):
            if s[i] == "0":
                dp[i] = 0
            else:
                dp[i] = dp[i + 1]

            if i + 1 < len(s) and (s[i] == "1" or
               s[i] == "2" and s[i + 1] in "0123456"
            ):
                dp[i] += dp[i + 2]
        return dp[0]
```

```java
public class Solution {
    public int numDecodings(String s) {    
        int[] dp = new int[s.length() + 1];
        dp[s.length()] = 1;
        for (int i = s.length() - 1; i >= 0; i--) {
            if (s.charAt(i) == '0') {
                dp[i] = 0;
            } else {
                dp[i] = dp[i + 1];
                if (i + 1 < s.length() && (s.charAt(i) == '1' || 
                    s.charAt(i) == '2' && s.charAt(i + 1) < '7')) {
                    dp[i] += dp[i + 2];
                }
            }
        }
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int numDecodings(string s) {
        vector<int> dp(s.size() + 1);
        dp[s.size()] = 1;
        for (int i = s.size() - 1; i >= 0; i--) {
            if (s[i] == '0') {
                dp[i] = 0;
            } else {
                dp[i] = dp[i + 1];
                if (i + 1 < s.size() && (s[i] == '1' || 
                    s[i] == '2' && s[i + 1] < '7')) {
                    dp[i] += dp[i + 2];
                }
            }
        }
        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    numDecodings(s) {
        let dp = new Array(s.length + 1).fill(0);
        dp[s.length] = 1;
        for (let i = s.length - 1; i >= 0; i--) {
            if (s.charAt(i) === '0') {
                dp[i] = 0;
            } else {
                dp[i] = dp[i + 1];
                if (i + 1 < s.length && (s.charAt(i) === '1' ||
                   (s.charAt(i) === '2' && s.charAt(i + 1) < '7'))) {
                   dp[i] += dp[i + 2];
                }
            }
        }
        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int NumDecodings(string s) {
        int[] dp = new int[s.Length + 1];
        dp[s.Length] = 1;
        for (int i = s.Length - 1; i >= 0; i--) {
            if (s[i] == '0') {
                dp[i] = 0;
            } else {
                dp[i] = dp[i + 1];
                if (i + 1 < s.Length && (s[i] == '1' || 
                    s[i] == '2' && s[i + 1] < '7')) {
                    dp[i] += dp[i + 2];
                }
            }
        }
        return dp[0];
    }
}
```

```go
func numDecodings(s string) int {
    dp := make(map[int]int)
    dp[len(s)] = 1
    for i := len(s) - 1; i >= 0; i-- {
        if s[i] == '0' {
            dp[i] = 0
        } else {
            dp[i] = dp[i+1]
            if i+1 < len(s) && (s[i] == '1' || 
               (s[i] == '2' && s[i+1] <= '6')) {
                dp[i] += dp[i+2]
            }
        }
    }
    return dp[0]
}
```

```kotlin
class Solution {
    fun numDecodings(s: String): Int {
        val dp = mutableMapOf(s.length to 1)
        for (i in s.length - 1 downTo 0) {
            if (s[i] == '0') {
                dp[i] = 0
            } else {
                dp[i] = dp[i + 1] ?: 0
                if (i + 1 < s.length && (s[i] == '1' || 
                   (s[i] == '2' && s[i + 1] <= '6'))) {
                    dp[i] = dp[i]!! + (dp[i + 2] ?: 0)
                }
            }
        }
        return dp[0] ?: 0
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        dp = dp2 = 0
        dp1 = 1
        for i in range(len(s) - 1, -1, -1):
            if s[i] == "0":
                dp = 0
            else:
                dp = dp1

            if i + 1 < len(s) and (s[i] == "1" or
               s[i] == "2" and s[i + 1] in "0123456"
            ):
                dp += dp2
            dp, dp1, dp2 = 0, dp, dp1
        return dp1
```

```java
public class Solution {
    public int numDecodings(String s) {    
        int dp = 0, dp2 = 0;
        int dp1 = 1;
        for (int i = s.length() - 1; i >= 0; i--) {
            if (s.charAt(i) == '0') {
                dp = 0;
            } else {
                dp = dp1;
                if (i + 1 < s.length() && (s.charAt(i) == '1' || 
                    s.charAt(i) == '2' && s.charAt(i + 1) < '7')) {
                    dp += dp2;
                }
            }
            dp2 = dp1;
            dp1 = dp;
            dp = 0;
        }
        return dp1;
    }
}
```

```cpp
class Solution {
public:
    int numDecodings(string s) {
        int dp = 0, dp2 = 0;
        int dp1 = 1;
        for (int i = s.size() - 1; i >= 0; i--) {
            if (s[i] == '0') {
                dp = 0;
            } else {
                dp = dp1;
                if (i + 1 < s.size() && (s[i] == '1' || 
                    s[i] == '2' && s[i + 1] < '7')) {
                    dp += dp2;
                }
            }
            dp2 = dp1;
            dp1 = dp;
            dp = 0;
        }
        return dp1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    numDecodings(s) {
        let dp2 = 0, dp = 0;
        let dp1 = 1;
        for (let i = s.length - 1; i >= 0; i--) {
            if (s.charAt(i) === '0') {
                dp = 0;
            } else {
                dp = dp1;
                if (i + 1 < s.length && (s.charAt(i) === '1' ||
                   (s.charAt(i) === '2' && s.charAt(i + 1) < '7'))) {
                   dp += dp2;
                }
            }
            dp2 = dp1;
            dp1 = dp;
            dp = 0;
        }
        return dp1;
    }
}
```

```csharp
public class Solution {
    public int NumDecodings(string s) {
        int dp = 0, dp1 = 1, dp2 = 0;
        for (int i = s.Length - 1; i >= 0; i--) {
            if (s[i] == '0') {
                dp = 0;
            } else {
                dp = dp1;
                if (i + 1 < s.Length && (s[i] == '1' || 
                    s[i] == '2' && s[i + 1] < '7')) {
                    dp += dp2;
                }
            }
            dp2 = dp1;
            dp1 = dp;
            dp = 0;
        }
        return dp1;
    }
}
```

```go
func numDecodings(s string) int {
    dp, dp2 := 0, 0
    dp1 := 1
    for i := len(s) - 1; i >= 0; i-- {
        if s[i] == '0' {
            dp = 0
        } else {
            dp = dp1
        }
        if i+1 < len(s) && (s[i] == '1' || 
           s[i] == '2' && s[i+1] <= '6') {
            dp += dp2
        }
        dp2 = dp1
        dp1 = dp
        dp = 0
    }
    return dp1
}
```

```kotlin
class Solution {
    fun numDecodings(s: String): Int {
        var dp = 0
        var dp2 = 0
        var dp1 = 1
        for (i in s.length - 1 downTo 0) {
            if (s[i] == '0') {
                dp = 0
            } else {
                dp = dp1
            }
            if (i + 1 < s.length && (s[i] == '1' || 
               (s[i] == '2' && s[i + 1] <= '6'))) {
                dp += dp2
            }
            dp2 = dp1
            dp1 = dp
        }
        return dp1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$