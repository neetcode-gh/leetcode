## 1. Brute Force (Linear Search)

### Intuition

The simplest approach is to check each version starting from 1 until we find one that is bad. Since all versions after the first bad one are also bad, the first bad version we encounter is our answer.

### Algorithm

1. Iterate through versions from `1` to `n - 1`.
2. For each version, call `isBadVersion()` to check if it's bad.
3. Return the first version that is bad.
4. If no bad version is found in the loop, return `n` (the last version must be the first bad one).

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

### Intuition

Since versions are sorted (all good versions come before all bad versions), we can use binary search to find the boundary between good and bad. If the middle version is bad, the first bad version is at or before the middle. If it's good, the first bad version is after the middle. This reduces our search space by half each time.

### Algorithm

1. Use a recursive helper function with parameters `l` (left bound) and `r` (right bound).
2. Base case: if `l > r`, return `l` as the first bad version.
3. Calculate the middle index `m = l + (r - l) / 2` to avoid overflow.
4. If `isBadVersion(m)` is `true`, search the left half by calling `helper(l, m - 1)`.
5. Otherwise, search the right half by calling `helper(m + 1, r)`.
6. Start the search with `helper(1, n)`.

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

### Intuition

This is the iterative version of binary search. We maintain left and right pointers and repeatedly narrow down the search range. Each time we find a bad version, we record it as a potential answer and continue searching left for an earlier bad version.

### Algorithm

1. Initialize `l = 1`, `r = n`, and `res = -1` to store the result.
2. While `l <= r`:
   - Calculate middle `m = l + (r - l) / 2`.
   - If `isBadVersion(m)` is `true`, store `m` in `res` and search left by setting `r = m - 1`.
   - Otherwise, search right by setting `l = m + 1`.
3. Return `res` as the first bad version.

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

### Intuition

This is a cleaner binary search variant that finds the lower bound. Instead of tracking the result separately, we shrink the search range until `l` and `r` converge to the first bad version. When we find a bad version at `m`, we keep it in our search range by setting `r = m` rather than excluding it.

### Algorithm

1. Initialize `l = 1` and `r = n`.
2. While `l < r`:
   - Calculate middle `m = l + (r - l) / 2`.
   - If `isBadVersion(m)` is `true`, the first bad version is at `m` or earlier, so set `r = m`.
   - Otherwise, the first bad version is after `m`, so set `l = m + 1`.
3. When the loop ends, `l` equals `r` and points to the first bad version.

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
