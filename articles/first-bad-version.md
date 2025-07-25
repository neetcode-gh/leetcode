## 1. Brute Force (Linear Search)

::tabs-start

```python
# The isBadVersion API is already defined for you.
# def isBadVersion(version: int) -> bool:

class Solution:
    def firstBadVersion(self, n: int) -> int:
        for i in range(1, n):
            if isBadVersion(i):
                return i
        return n
```

```java
/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */

public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        for (int i = 1; i < n; i++) {
            if (isBadVersion(i)) {
                return i;
            }
        }
        return n;
    }
}
```

```cpp
// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

class Solution {
public:
    int firstBadVersion(int n) {
        for (int i = 1; i < n; i++) {
            if (isBadVersion(i)) {
                return i;
            }
        }
        return n;
    }
};
```

```javascript
// The isBadVersion API is already defined in the VersionControl class.
// isBadVersion(version: number): boolean

class Solution extends VersionControl {
    /**
     * @param {number} n Total versions
     * @return {number} The first bad version
     */
    firstBadVersion(n) {
        for (let i = 1; i < n; i++) {
            if (this.isBadVersion(i)) {
                return i;
            }
        }
        return n;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 2. Recursive Binary Search

::tabs-start

```python
# The isBadVersion API is already defined for you.
# def isBadVersion(version: int) -> bool:

class Solution:
    def firstBadVersion(self, n: int) -> int:
        def helper(l, r):
            if l > r:
                return l
            m = l + (r - l) // 2
            if isBadVersion(m):
                return helper(l, m - 1)
            else:
                return helper(m + 1, r)

        return helper(1, n)
```

```java
/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */

public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        return helper(1, n);
    }

    private int helper(int l, int r) {
        if (l > r) {
            return l;
        }
        int m = l + (r - l) / 2;
        if (isBadVersion(m)) {
            return helper(l, m - 1);
        } else {
            return helper(m + 1, r);
        }
    }
}
```

```cpp
// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

class Solution {
public:
    int firstBadVersion(int n) {
        return helper(1, n);
    }

private:
    int helper(int l, int r) {
        if (l > r) {
            return l;
        }
        int m = l + (r - l) / 2;
        if (isBadVersion(m)) {
            return helper(l, m - 1);
        } else {
            return helper(m + 1, r);
        }
    }
};
```

```javascript
// The isBadVersion API is already defined in the VersionControl class.
// isBadVersion(version: number): boolean

class Solution extends VersionControl {
    /**
     * @param {number} n Total versions
     * @return {number} The first bad version
     */
    firstBadVersion(n) {
        const helper = (l, r) => {
            if (l > r) {
                return l;
            }
            const m = Math.floor(l + (r - l) / 2);
            if (this.isBadVersion(m)) {
                return helper(l, m - 1);
            } else {
                return helper(m + 1, r);
            }
        };
        return helper(1, n);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## 3. Iterative Binary Search

::tabs-start

```python
# The isBadVersion API is already defined for you.
# def isBadVersion(version: int) -> bool:

class Solution:
    def firstBadVersion(self, n: int) -> int:
        l, r = 1, n
        res = -1
        while l <= r:
            m = l + (r - l) // 2
            if isBadVersion(m):
                res = m
                r = m - 1
            else:
                l = m + 1
        return res
```

```java
/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */

public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        int l = 1, r = n, res = -1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (isBadVersion(m)) {
                res = m;
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
        return res;
    }
}
```

```cpp
// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

class Solution {
public:
    int firstBadVersion(int n) {
        int l = 1, r = n, res = -1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (isBadVersion(m)) {
                res = m;
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
        return res;
    }
};
```

```javascript
// The isBadVersion API is already defined in the VersionControl class.
// isBadVersion(version: number): boolean

class Solution extends VersionControl {
    /**
     * @param {number} n Total versions
     * @return {number} The first bad version
     */
    firstBadVersion(n) {
        let l = 1,
            r = n,
            res = -1;
        while (l <= r) {
            const m = Math.floor(l + (r - l) / 2);
            if (this.isBadVersion(m)) {
                res = m;
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. Iterative Binary Search (Lower Bound)

::tabs-start

```python
# The isBadVersion API is already defined for you.
# def isBadVersion(version: int) -> bool:

class Solution:
    def firstBadVersion(self, n: int) -> int:
        l, r = 1, n
        while l < r:
            m = l + (r - l) // 2
            if isBadVersion(m):
                r = m
            else:
                l = m + 1
        return l
```

```java
/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */

public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        int l = 1, r = n;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (isBadVersion(m)) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return r;
    }
}
```

```cpp
// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

class Solution {
public:
    int firstBadVersion(int n) {
        int l = 1, r = n;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (isBadVersion(m)) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return r;
    }
};
```

```javascript
// The isBadVersion API is already defined in the VersionControl class.
// isBadVersion(version: number): boolean

class Solution extends VersionControl {
    /**
     * @param {number} n Total versions
     * @return {number} The first bad version
     */
    firstBadVersion(n) {
        let l = 1,
            r = n;
        while (l < r) {
            const m = Math.floor(l + (r - l) / 2);
            if (this.isBadVersion(m)) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return r;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
