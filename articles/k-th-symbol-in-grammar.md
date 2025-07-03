## 1. Brute Force

::tabs-start

```python
class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        prev = ['0']
        for i in range(2, n + 1):
            cur = []
            for c in prev:
                if c == '0':
                    cur.append('0')
                    cur.append('1')
                else:
                    cur.append('1')
                    cur.append('0')
            prev = cur
        return int(prev[k - 1])
```

```java
public class Solution {
    public int kthGrammar(int n, int k) {
        List<Character> prev = new ArrayList<>();
        prev.add('0');
        for (int i = 2; i <= n; i++) {
            List<Character> cur = new ArrayList<>();
            for (char c : prev) {
                if (c == '0') {
                    cur.add('0');
                    cur.add('1');
                } else {
                    cur.add('1');
                    cur.add('0');
                }
            }
            prev = cur;
        }
        return prev.get(k - 1) - '0';
    }
}
```

```cpp
class Solution {
public:
    int kthGrammar(int n, int k) {
        vector<char> prev = {'0'};
        for (int i = 2; i <= n; i++) {
            vector<char> cur;
            for (char c : prev) {
                if (c == '0') {
                    cur.push_back('0');
                    cur.push_back('1');
                } else {
                    cur.push_back('1');
                    cur.push_back('0');
                }
            }
            prev = cur;
        }
        return prev[k - 1] - '0';
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthGrammar(n, k) {
        let prev = ['0'];
        for (let i = 2; i <= n; i++) {
            let cur = [];
            for (let c of prev) {
                if (c === '0') {
                    cur.push('0');
                    cur.push('1');
                } else {
                    cur.push('1');
                    cur.push('0');
                }
            }
            prev = cur;
        }
        return parseInt(prev[k - 1]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(2 ^ n)$

---

## 2. Binary Tree Traversal (Recursion)

::tabs-start

```python
class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        def dfs(n, k, root):
            if n == 1:
                return root

            total = 1 << (n - 1)
            if k > (total // 2):
                return dfs(n - 1, k - (total // 2), root ^ 1)
            else:
                return dfs(n - 1, k, root)

        return dfs(n, k, 0)
```

```java
public class Solution {
    public int kthGrammar(int n, int k) {
        return dfs(n, k, 0);
    }

    private int dfs(int n, int k, int root) {
        if (n == 1) {
            return root;
        }

        int total = 1 << (n - 1);
        if (k > total / 2) {
            return dfs(n - 1, k - total / 2, root ^ 1);
        } else {
            return dfs(n - 1, k, root);
        }
    }
}
```

```cpp
class Solution {
public:
    int kthGrammar(int n, int k) {
        return dfs(n, k, 0);
    }

    int dfs(int n, int k, int root){
        if (n == 1) return root;

        int total = 1 << (n - 1);
        if (k > total / 2) {
            return dfs(n - 1, k - total / 2, root ^ 1);
        } else {
            return dfs(n - 1, k, root);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthGrammar(n, k) {
        const dfs = (n, k, root) => {
            if (n === 1) return root;

            const total = 1 << (n - 1);
            if (k > total / 2) {
                return dfs(n - 1, k - total / 2, root ^ 1);
            } else {
                return dfs(n - 1, k, root);
            }
        };

        return dfs(n, k, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Binary Tree Traversal (Iteration)

::tabs-start

```python
class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        cur = 0
        left, right = 1, 2 ** (n - 1)

        for _ in range(n - 1):
            mid = (left + right) // 2
            if k <= mid:
                right = mid
            else:
                left = mid + 1
                cur = 0 if cur else 1

        return cur
```

```java
public class Solution {
    public int kthGrammar(int n, int k) {
        int cur = 0;
        int left = 1, right = 1 << (n - 1);

        for (int i = 0; i < n - 1; i++) {
            int mid = (left + right) / 2;
            if (k <= mid) {
                right = mid;
            } else {
                left = mid + 1;
                cur = (cur == 0) ? 1 : 0;
            }
        }

        return cur;
    }
}
```

```cpp
class Solution {
public:
    int kthGrammar(int n, int k) {
        int cur = 0;
        int left = 1, right = 1 << (n - 1);

        for (int i = 0; i < n - 1; i++) {
            int mid = (left + right) / 2;
            if (k <= mid) {
                right = mid;
            } else {
                left = mid + 1;
                cur = (cur == 0) ? 1 : 0;
            }
        }

        return cur;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthGrammar(n, k) {
        let cur = 0;
        let left = 1,
            right = 1 << (n - 1);

        for (let i = 0; i < n - 1; i++) {
            let mid = Math.floor((left + right) / 2);
            if (k <= mid) {
                right = mid;
            } else {
                left = mid + 1;
                cur = cur === 0 ? 1 : 0;
            }
        }

        return cur;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Recursion (Traverse Towards Root)

::tabs-start

```python
class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        if n == 1:
            return 0
        if k & 1:
            return self.kthGrammar(n - 1, (k + 1) // 2)
        return self.kthGrammar(n - 1, k // 2) ^ 1
```

```java
public class Solution {
    public int kthGrammar(int n, int k) {
        if (n == 1) {
            return 0;
        }
        if ((k & 1) == 1) {
            return kthGrammar(n - 1, (k + 1) / 2);
        }
        return kthGrammar(n - 1, k / 2) ^ 1;
    }
}
```

```cpp
class Solution {
public:
    int kthGrammar(int n, int k) {
        if (n == 1) {
            return 0;
        }
        if (k & 1) {
            return kthGrammar(n - 1, (k + 1) / 2);
        }
        return kthGrammar(n - 1, k / 2) ^ 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthGrammar(n, k) {
        if (n === 1) {
            return 0;
        }
        if (k % 2 === 1) {
            return this.kthGrammar(n - 1, Math.floor((k + 1) / 2));
        }
        return this.kthGrammar(n - 1, Math.floor(k / 2)) ^ 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 5. Math

::tabs-start

```python
class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        return bin(k - 1).count('1') & 1
```

```java
public class Solution {
    public int kthGrammar(int n, int k) {
        return Integer.bitCount(k - 1) & 1;
    }
}
```

```cpp
class Solution {
public:
    int kthGrammar(int n, int k) {
        return __builtin_popcount(k - 1) & 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kthGrammar(n, k) {
        return ((k - 1).toString(2).split('1').length - 1) & 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$ or $O(\log n)$ depending on the language.
