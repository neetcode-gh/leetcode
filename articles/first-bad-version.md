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

```csharp
/* The isBadVersion API is defined in the parent class VersionControl.
      bool IsBadVersion(int version); */

public class Solution : VersionControl {
    public int FirstBadVersion(int n) {
        for (int i = 1; i < n; i++) {
            if (IsBadVersion(i)) {
                return i;
            }
        }
        return n;
    }
}
```

```go
/**
 * Forward declaration of isBadVersion API.
 * @param   version   your guess about first bad version
 * @return            true if current version is bad
 *                    false if current version is good
 * func isBadVersion(version int) bool;
 */

func firstBadVersion(n int) int {
    for i := 1; i < n; i++ {
        if isBadVersion(i) {
            return i
        }
    }
    return n
}
```

```kotlin
/* The isBadVersion API is defined in the parent class VersionControl.
      fun isBadVersion(version: Int): Boolean {} */

class Solution: VersionControl() {
    override fun firstBadVersion(n: Int): Int {
        for (i in 1 until n) {
            if (isBadVersion(i)) {
                return i
            }
        }
        return n
    }
}
```

```swift
/**
 * The knows API is defined in the parent class VersionControl.
 *     func isBadVersion(_ version: Int) -> Bool {}
 */

class Solution : VersionControl {
    func firstBadVersion(_ n: Int) -> Int {
        for i in 1..<n {
            if isBadVersion(i) {
                return i
            }
        }
        return n
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

```csharp
/* The isBadVersion API is defined in the parent class VersionControl.
      bool IsBadVersion(int version); */

public class Solution : VersionControl {
    public int FirstBadVersion(int n) {
        return Helper(1, n);
    }

    private int Helper(int l, int r) {
        if (l > r) {
            return l;
        }
        int m = l + (r - l) / 2;
        if (IsBadVersion(m)) {
            return Helper(l, m - 1);
        } else {
            return Helper(m + 1, r);
        }
    }
}
```

```go
/**
 * Forward declaration of isBadVersion API.
 * @param   version   your guess about first bad version
 * @return            true if current version is bad
 *                    false if current version is good
 * func isBadVersion(version int) bool;
 */

func firstBadVersion(n int) int {
    var helper func(l, r int) int
    helper = func(l, r int) int {
        if l > r {
            return l
        }
        m := l + (r-l)/2
        if isBadVersion(m) {
            return helper(l, m-1)
        } else {
            return helper(m+1, r)
        }
    }
    return helper(1, n)
}
```

```kotlin
/* The isBadVersion API is defined in the parent class VersionControl.
      fun isBadVersion(version: Int): Boolean {} */

class Solution: VersionControl() {
    override fun firstBadVersion(n: Int): Int {
        return helper(1, n)
    }

    private fun helper(l: Int, r: Int): Int {
        if (l > r) {
            return l
        }
        val m = l + (r - l) / 2
        return if (isBadVersion(m)) {
            helper(l, m - 1)
        } else {
            helper(m + 1, r)
        }
    }
}
```

```swift
/**
 * The knows API is defined in the parent class VersionControl.
 *     func isBadVersion(_ version: Int) -> Bool {}
 */

class Solution : VersionControl {
    func firstBadVersion(_ n: Int) -> Int {
        return helper(1, n)
    }

    private func helper(_ l: Int, _ r: Int) -> Int {
        if l > r {
            return l
        }
        let m = l + (r - l) / 2
        if isBadVersion(m) {
            return helper(l, m - 1)
        } else {
            return helper(m + 1, r)
        }
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

```csharp
/* The isBadVersion API is defined in the parent class VersionControl.
      bool IsBadVersion(int version); */

public class Solution : VersionControl {
    public int FirstBadVersion(int n) {
        int l = 1, r = n, res = -1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (IsBadVersion(m)) {
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

```go
/**
 * Forward declaration of isBadVersion API.
 * @param   version   your guess about first bad version
 * @return            true if current version is bad
 *                    false if current version is good
 * func isBadVersion(version int) bool;
 */

func firstBadVersion(n int) int {
    l, r, res := 1, n, -1
    for l <= r {
        m := l + (r-l)/2
        if isBadVersion(m) {
            res = m
            r = m - 1
        } else {
            l = m + 1
        }
    }
    return res
}
```

```kotlin
/* The isBadVersion API is defined in the parent class VersionControl.
      fun isBadVersion(version: Int): Boolean {} */

class Solution: VersionControl() {
    override fun firstBadVersion(n: Int): Int {
        var l = 1
        var r = n
        var res = -1
        while (l <= r) {
            val m = l + (r - l) / 2
            if (isBadVersion(m)) {
                res = m
                r = m - 1
            } else {
                l = m + 1
            }
        }
        return res
    }
}
```

```swift
/**
 * The knows API is defined in the parent class VersionControl.
 *     func isBadVersion(_ version: Int) -> Bool {}
 */

class Solution : VersionControl {
    func firstBadVersion(_ n: Int) -> Int {
        var l = 1
        var r = n
        var res = -1
        while l <= r {
            let m = l + (r - l) / 2
            if isBadVersion(m) {
                res = m
                r = m - 1
            } else {
                l = m + 1
            }
        }
        return res
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

```csharp
/* The isBadVersion API is defined in the parent class VersionControl.
      bool IsBadVersion(int version); */

public class Solution : VersionControl {
    public int FirstBadVersion(int n) {
        int l = 1, r = n;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (IsBadVersion(m)) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return r;
    }
}
```

```go
/**
 * Forward declaration of isBadVersion API.
 * @param   version   your guess about first bad version
 * @return            true if current version is bad
 *                    false if current version is good
 * func isBadVersion(version int) bool;
 */

func firstBadVersion(n int) int {
    l, r := 1, n
    for l < r {
        m := l + (r-l)/2
        if isBadVersion(m) {
            r = m
        } else {
            l = m + 1
        }
    }
    return r
}
```

```kotlin
/* The isBadVersion API is defined in the parent class VersionControl.
      fun isBadVersion(version: Int): Boolean {} */

class Solution: VersionControl() {
    override fun firstBadVersion(n: Int): Int {
        var l = 1
        var r = n
        while (l < r) {
            val m = l + (r - l) / 2
            if (isBadVersion(m)) {
                r = m
            } else {
                l = m + 1
            }
        }
        return r
    }
}
```

```swift
/**
 * The knows API is defined in the parent class VersionControl.
 *     func isBadVersion(_ version: Int) -> Bool {}
 */

class Solution : VersionControl {
    func firstBadVersion(_ n: Int) -> Int {
        var l = 1
        var r = n
        while l < r {
            let m = l + (r - l) / 2
            if isBadVersion(m) {
                r = m
            } else {
                l = m + 1
            }
        }
        return r
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
