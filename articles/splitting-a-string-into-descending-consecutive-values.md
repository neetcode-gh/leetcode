## 1. Backtracking

::tabs-start

```python
class Solution:
    def splitString(self, s: str) -> bool:
        n = len(s)

        def isValid(splits):
            for i in range(1, len(splits)):
                if splits[i] != splits[i - 1] - 1:
                    return False
            return len(splits) > 1

        def dfs(i, splits):
            if i == n:
                return isValid(splits)
            num = 0
            for j in range(i, n):
                num = num * 10 + int(s[j])
                splits.append(num)
                if dfs(j + 1, splits):
                    return True
                splits.pop()
            return False

        return dfs(0, [])
```

```java
public class Solution {
    public boolean splitString(String s) {
        return dfs(s, 0, new ArrayList<>());
    }

    private boolean isValid(List<Long> splits) {
        for (int i = 1; i < splits.size(); i++) {
            if (splits.get(i) != splits.get(i - 1) - 1) {
                return false;
            }
        }
        return splits.size() > 1;
    }

    private boolean dfs(String s, int i, List<Long> splits) {
        if (i == s.length()) {
            return isValid(splits);
        }
        long num = 0;
        for (int j = i; j < s.length(); j++) {
            num = num * 10 + (s.charAt(j) - '0');
            splits.add(num);
            if (dfs(s, j + 1, splits)) {
                return true;
            }
            splits.remove(splits.size() - 1);
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitString(string s) {
        vector<long long> splits;
        return dfs(s, 0, splits);
    }

private:
    bool isValid(vector<long long>& splits) {
        for (int i = 1; i < splits.size(); i++) {
            if (splits[i] != splits[i - 1] - 1) {
                return false;
            }
        }
        return splits.size() > 1;
    }

    bool dfs(string& s, int i, vector<long long>& splits) {
        if (i == s.size()) {
            return isValid(splits);
        }
        unsigned long long num = 0;
        for (int j = i; j < s.size(); j++) {
            num = num * 10 + (s[j] - '0');
            splits.push_back(num);
            if (dfs(s, j + 1, splits)) {
                return true;
            }
            splits.pop_back();
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    splitString(s) {
        const n = s.length;

        const isValid = (splits) => {
            for (let i = 1; i < splits.length; i++) {
                if (splits[i] !== splits[i - 1] - 1) {
                    return false;
                }
            }
            return splits.length > 1;
        };

        const dfs = (i, splits) => {
            if (i === n) {
                return isValid(splits);
            }
            let num = 0;
            for (let j = i; j < n; j++) {
                num = num * 10 + Number(s[j]);
                splits.push(num);
                if (dfs(j + 1, splits)) {
                    return true;
                }
                splits.pop();
            }
            return false;
        };

        return dfs(0, []);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ n)$
- Space complexity: $O(n)$

---

## 2. Recursion - I

::tabs-start

```python
class Solution:
    def splitString(self, s: str) -> bool:
        def dfs(index, prev):
            if index == len(s):
                return True
            num = 0
            for j in range(index, len(s)):
                num = num * 10 + int(s[j])
                if num + 1 == prev and dfs(j + 1, num):
                    return True
            return False

        val = 0
        for i in range(len(s) - 1):
            val = val * 10 + int(s[i])
            if dfs(i + 1, val):
                return True

        return False
```

```java
public class Solution {
    public boolean splitString(String s) {
        int n = s.length();
        long val = 0;
        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s.charAt(i) - '0');
            if (dfs(s, i + 1, val)) {
                return true;
            }
        }
        return false;
    }

    private boolean dfs(String s, int index, long prev) {
        if (index == s.length()) {
            return true;
        }
        long num = 0;
        for (int j = index; j < s.length(); j++) {
            num = num * 10 + (s.charAt(j) - '0');
            if (num + 1 == prev && dfs(s, j + 1, num)) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitString(string s) {
        int n = s.size();
        unsigned long long val = 0;
        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s[i] - '0');
            if (dfs(s, i + 1, val)) {
                return true;
            }
        }
        return false;
    }

private:
    bool dfs(string& s, int index, long long prev) {
        if (index == s.size()) {
            return true;
        }
        unsigned long long num = 0;
        for (int j = index; j < s.size(); j++) {
            num = num * 10 + (s[j] - '0');
            if (num + 1 == prev && dfs(s, j + 1, num)) {
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    splitString(s) {
        const n = s.length;

        const dfs = (index, prev) => {
            if (index === n) {
                return true;
            }
            let num = 0;
            for (let j = index; j < n; j++) {
                num = num * 10 + Number(s[j]);
                if (num + 1 === prev && dfs(j + 1, num)) {
                    return true;
                }
            }
            return false;
        };

        let val = 0;
        for (let i = 0; i < n - 1; i++) {
            val = val * 10 + Number(s[i]);
            if (dfs(i + 1, val)) {
                return true;
            }
        }

        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Recursion - II

::tabs-start

```python
class Solution:
    def splitString(self, s: str) -> bool:
        def dfs(index, prev):
            if index == len(s):
                return True
            num = 0
            for j in range(index, len(s)):
                num = num * 10 + int(s[j])
                if num + 1 == prev and dfs(j + 1, num):
                    return True
                if num >= prev:
                    break
            return False

        val = 0
        for i in range(len(s) - 1):
            val = val * 10 + int(s[i])
            if dfs(i + 1, val):
                return True

        return False
```

```java
public class Solution {
    public boolean splitString(String s) {
        int n = s.length();
        long val = 0;
        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s.charAt(i) - '0');
            if (dfs(s, i + 1, val)) {
                return true;
            }
        }
        return false;
    }

    private boolean dfs(String s, int index, long prev) {
        if (index == s.length()) {
            return true;
        }
        long num = 0;
        for (int j = index; j < s.length(); j++) {
            num = num * 10 + (s.charAt(j) - '0');
            if (num + 1 == prev && dfs(s, j + 1, num)) {
                return true;
            }
            if (num >= prev) {
                break;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitString(string s) {
        int n = s.size();
        unsigned long long val = 0;
        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s[i] - '0');
            if (dfs(s, i + 1, val)) {
                return true;
            }
        }
        return false;
    }

private:
    bool dfs(string& s, int index, long long prev) {
        if (index == s.size()) {
            return true;
        }
        unsigned long long num = 0;
        for (int j = index; j < s.size(); j++) {
            num = num * 10 + (s[j] - '0');
            if (num + 1 == prev && dfs(s, j + 1, num)) {
                return true;
            }
            if (num >= prev) {
                break;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    splitString(s) {
        const n = s.length;

        const dfs = (index, prev) => {
            if (index === n) {
                return true;
            }
            let num = 0;
            for (let j = index; j < n; j++) {
                num = num * 10 + Number(s[j]);
                if (num + 1 === prev && dfs(j + 1, num)) {
                    return true;
                }
                if (num >= prev) {
                    break;
                }
            }
            return false;
        };

        let val = 0;
        for (let i = 0; i < n - 1; i++) {
            val = val * 10 + Number(s[i]);
            if (dfs(i + 1, val)) {
                return true;
            }
        }

        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for recursion stack.

---

## 4. Stack

::tabs-start

```python
class Solution:
    def splitString(self, s: str) -> bool:
        n = len(s)
        stack = []
        val = 0

        for i in range(n - 1):
            val = val * 10 + int(s[i])
            stack.append((i + 1, val))

            while stack:
                index, prev = stack.pop()
                num = 0
                for j in range(index, n):
                    num = num * 10 + int(s[j])
                    if num + 1 == prev:
                        if j + 1 == n:
                            return True
                        stack.append((j + 1, num))
                    elif num >= prev:
                        break

        return False
```

```java
public class Solution {
    public boolean splitString(String s) {
        int n = s.length();
        Stack<long[]> stack = new Stack<>();
        long val = 0;

        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s.charAt(i) - '0');
            stack.push(new long[]{i + 1, val});

            while (!stack.isEmpty()) {
                long[] top = stack.pop();
                int index = (int) top[0];
                long prev = top[1];
                long num = 0;

                for (int j = index; j < n; j++) {
                    num = num * 10 + (s.charAt(j) - '0');
                    if (num + 1 == prev) {
                        if (j + 1 == n) {
                            return true;
                        }
                        stack.push(new long[]{j + 1, num});
                    } else if (num >= prev) {
                        break;
                    }
                }
            }
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitString(string s) {
        int n = s.size();
        stack<pair<int, long long>> stack;
        unsigned long long val = 0;

        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s[i] - '0');
            stack.push({i + 1, val});

            while (!stack.empty()) {
                auto [index, prev] = stack.top();
                stack.pop();
                unsigned long long num = 0;

                for (int j = index; j < n; j++) {
                    num = num * 10 + (s[j] - '0');
                    if (num + 1 == prev) {
                        if (j + 1 == n) {
                            return true;
                        }
                        stack.push({j + 1, num});
                    } else if (num >= prev) {
                        break;
                    }
                }
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    splitString(s) {
        const n = s.length;
        let stack = [];
        let val = 0;

        for (let i = 0; i < n - 1; i++) {
            val = val * 10 + Number(s[i]);
            stack.push([i + 1, val]);

            while (stack.length) {
                let [index, prev] = stack.pop();
                let num = 0;

                for (let j = index; j < n; j++) {
                    num = num * 10 + Number(s[j]);
                    if (num + 1 === prev) {
                        if (j + 1 === n) {
                            return true;
                        }
                        stack.push([j + 1, num]);
                    } else if (num >= prev) {
                        break;
                    }
                }
            }
        }

        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$
