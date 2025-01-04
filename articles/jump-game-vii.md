## 1. Brute Force (Memoization)

::tabs-start

```python
class Solution:
    def canReach(self, s: str, minJump: int, maxJump: int) -> bool:
        n = len(s)
        dp = [None] * n
        dp[n - 1] = True

        def dfs(i):
            if dp[i] is not None:
                return dp[i]

            dp[i] = False
            for j in range(i + minJump, min(n, i + maxJump + 1)):
                if s[j] == '0' and dfs(j):
                    dp[i] = True
                    break

            return dp[i]

        if s[-1] == '1':
            return False
        return dfs(0)
```

```java
public class Solution {
    private Boolean[] dp;
    private int n;

    public boolean canReach(String s, int minJump, int maxJump) {
        this.n = s.length();
        this.dp = new Boolean[n];
        dp[n - 1] = true;

        if (s.charAt(n - 1) == '1') {
            return false;
        }

        return dfs(0, s, minJump, maxJump);
    }

    private boolean dfs(int i, String s, int minJump, int maxJump) {
        if (dp[i] != null) {
            return dp[i];
        }

        dp[i] = false;
        for (int j = i + minJump; j <= Math.min(n - 1, i + maxJump); j++) {
            if (s.charAt(j) == '0' && dfs(j, s, minJump, maxJump)) {
                dp[i] = true;
                break;
            }
        }
        return dp[i];
    }
}
```

```cpp
class Solution {
public:
    int n;
    vector<optional<bool>> dp;

    bool canReach(string s, int minJump, int maxJump) {
        this->n = s.size();
        dp.resize(n, nullopt);
        dp[n - 1] = true;

        if (s[n - 1] == '1') {
            return false;
        }

        return dfs(0, s, minJump, maxJump);
    }

private:
    bool dfs(int i, string& s, int& minJump, int& maxJump) {
        if (dp[i].has_value()) {
            return dp[i].value();
        }

        dp[i] = false;
        for (int j = i + minJump; j <= min(n - 1, i + maxJump); ++j) {
            if (s[j] == '0' && dfs(j, s, minJump, maxJump)) {
                dp[i] = true;
                break;
            }
        }
        return dp[i].value();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} minJump
     * @param {number} maxJump
     * @return {boolean}
     */
    canReach(s, minJump, maxJump) {
        const n = s.length;
        const dp = new Array(n).fill(null);
        dp[n - 1] = true;

        const dfs = (i) => {
            if (dp[i] !== null) {
                return dp[i];
            }

            dp[i] = false;
            for (let j = i + minJump; j <= Math.min(n - 1, i + maxJump); j++) {
                if (s[j] === '0' && dfs(j)) {
                    dp[i] = true;
                    break;
                }
            }
            return dp[i];
        };

        if (s[n - 1] === '1') {
            return false;
        }
        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(n)$

> Where $n$ is the length of the string $s$ and $m$ is the given range of the jump $(maxJump - minJump + 1)$.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def canReach(self, s: str, minJump: int, maxJump: int) -> bool:
        q = deque([0])
        farthest = 0
        
        while q:
            i = q.popleft()
            start = max(i + minJump, farthest + 1)
            for j in range(start, min(i + maxJump + 1, len(s))):
                if s[j] == "0":
                    q.append(j)
                    if j == len(s) - 1:
                        return True
            farthest = i + maxJump
        
        return False
```

```java
public class Solution {
    public boolean canReach(String s, int minJump, int maxJump) {
        Queue<Integer> q = new LinkedList<>();
        q.add(0);
        int farthest = 0;
        int n = s.length();

        while (!q.isEmpty()) {
            int i = q.poll();
            int start = Math.max(i + minJump, farthest + 1);

            for (int j = start; j < Math.min(i + maxJump + 1, n); j++) {
                if (s.charAt(j) == '0') {
                    q.add(j);
                    if (j == n - 1) {
                        return true;
                    }
                }
            }
            farthest = i + maxJump;
        }
        
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool canReach(string s, int minJump, int maxJump) {
        queue<int> q;
        q.push(0);
        int farthest = 0;
        int n = s.size();

        while (!q.empty()) {
            int i = q.front();
            q.pop();
            int start = max(i + minJump, farthest + 1);

            for (int j = start; j < min(i + maxJump + 1, n); ++j) {
                if (s[j] == '0') {
                    q.push(j);
                    if (j == n - 1) {
                        return true;
                    }
                }
            }
            farthest = i + maxJump;
        }
        
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} minJump
     * @param {number} maxJump
     * @return {boolean}
     */
    canReach(s, minJump, maxJump) {
        const q = new Queue();
        q.push(0);
        let farthest = 0;

        while (!q.isEmpty()) {
            const i = q.pop();
            const start = Math.max(i + minJump, farthest + 1);

            for (let j = start; j < Math.min(i + maxJump + 1, s.length); j++) {
                if (s[j] === '0') {
                    q.push(j);
                    if (j === s.length - 1) {
                        return true;
                    }
                }
            }
            farthest = i + maxJump;
        }

        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming (Sliding Window)

::tabs-start

```python
class Solution:
    def canReach(self, s: str, minJump: int, maxJump: int) -> bool:
        n = len(s)
        if s[n - 1] == '1':
            return False
        
        dp = [False] * n
        dp[0] = True
        cnt = 0
        for i in range(1, n):
            if i >= minJump and dp[i - minJump]:
                cnt += 1
            if i > maxJump and dp[i - maxJump - 1]:
                cnt -= 1
            if cnt > 0 and s[i] == '0':
                dp[i] = True
        
        return dp[n - 1]
```

```java
public class Solution {
    public boolean canReach(String s, int minJump, int maxJump) {
        int n = s.length();
        if (s.charAt(n - 1) == '1') {
            return false;
        }

        boolean[] dp = new boolean[n];
        dp[0] = true;
        int cnt = 0;

        for (int i = 1; i < n; i++) {
            if (i >= minJump && dp[i - minJump]) {
                cnt++;
            }
            if (i > maxJump && dp[i - maxJump - 1]) {
                cnt--;
            }
            if (cnt > 0 && s.charAt(i) == '0') {
                dp[i] = true;
            }
        }

        return dp[n - 1];
    }
}
```

```cpp
class Solution {
public:
    bool canReach(string s, int minJump, int maxJump) {
        int n = s.size();
        if (s[n - 1] == '1') {
            return false;
        }

        vector<bool> dp(n, false);
        dp[0] = true;
        int cnt = 0;

        for (int i = 1; i < n; i++) {
            if (i >= minJump && dp[i - minJump]) {
                cnt++;
            }
            if (i > maxJump && dp[i - maxJump - 1]) {
                cnt--;
            }
            if (cnt > 0 && s[i] == '0') {
                dp[i] = true;
            }
        }

        return dp[n - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} minJump
     * @param {number} maxJump
     * @return {boolean}
     */
    canReach(s, minJump, maxJump) {
        const n = s.length;
        if (s[n - 1] === '1') {
            return false;
        }

        const dp = new Array(n).fill(false);
        dp[0] = true;
        let cnt = 0;

        for (let i = 1; i < n; i++) {
            if (i >= minJump && dp[i - minJump]) {
                cnt++;
            }
            if (i > maxJump && dp[i - maxJump - 1]) {
                cnt--;
            }
            if (cnt > 0 && s[i] === '0') {
                dp[i] = true;
            }
        }

        return dp[n - 1];
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Dynamic Programming (Two Pointers)

::tabs-start

```python
class Solution:
    def canReach(self, s: str, minJump: int, maxJump: int) -> bool:
        n = len(s)
        if s[n - 1] == '1':
            return False
        
        dp = [False] * n
        dp[0] = True
        j = 0
        for i in range(n):
            if dp[i] == False:
                continue

            j = max(j, i + minJump)
            while j < min(i + maxJump + 1, n):
                if s[j] == '0':
                    dp[j] = True
                j += 1
        
        return dp[n - 1]
```

```java
public class Solution {
    public boolean canReach(String s, int minJump, int maxJump) {
        int n = s.length();
        if (s.charAt(n - 1) == '1') {
            return false;
        }

        boolean[] dp = new boolean[n];
        dp[0] = true;
        int j = 0;

        for (int i = 0; i < n; i++) {
            if (!dp[i]) {
                continue;
            }
            j = Math.max(j, i + minJump);
            while (j < Math.min(i + maxJump + 1, n)) {
                if (s.charAt(j) == '0') {
                    dp[j] = true;
                }
                j++;
            }
        }

        return dp[n - 1];
    }
}
```

```cpp
class Solution {
public:
    bool canReach(string s, int minJump, int maxJump) {
        int n = s.size();
        if (s[n - 1] == '1') {
            return false;
        }

        vector<bool> dp(n, false);
        dp[0] = true;
        int j = 0;

        for (int i = 0; i < n; i++) {
            if (!dp[i]) {
                continue;
            }
            j = max(j, i + minJump);
            while (j < min(i + maxJump + 1, n)) {
                if (s[j] == '0') {
                    dp[j] = true;
                }
                j++;
            }
        }

        return dp[n - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} minJump
     * @param {number} maxJump
     * @return {boolean}
     */
    canReach(s, minJump, maxJump) {
        const n = s.length;
        if (s[n - 1] === '1') {
            return false;
        }

        const dp = new Array(n).fill(false);
        dp[0] = true;
        let j = 0;

        for (let i = 0; i < n; i++) {
            if (!dp[i]) {
                continue;
            }
            j = Math.max(j, i + minJump);
            while (j < Math.min(i + maxJump + 1, n)) {
                if (s[j] === '0') {
                    dp[j] = true;
                }
                j++;
            }
        }

        return dp[n - 1];
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$